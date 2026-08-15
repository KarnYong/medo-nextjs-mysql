import "server-only";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { q, type UserRow } from "@/db";

export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;
  const expected = Buffer.from(hashHex, "hex");
  const actual = scryptSync(password, Buffer.from(saltHex, "hex"), expected.length);
  return timingSafeEqual(expected, actual);
}

const COOKIE = "session";
// ponytail: signed userId cookie, not a session table — add DB-backed sessions if you need revocation
const SECRET = process.env.AUTH_SECRET ?? "dev-secret-change-me";

function sign(userId: number): string {
  const mac = scryptSync(String(userId), SECRET, 32);
  return `${userId}.${mac.toString("hex")}`;
}

function unsign(token: string | undefined): number | null {
  if (!token) return null;
  const [idStr, macHex] = token.split(".");
  const id = Number(idStr);
  if (!Number.isInteger(id) || id <= 0 || !macHex) return null;
  const expected = scryptSync(idStr, SECRET, 32);
  const actual = Buffer.from(macHex, "hex");
  return actual.length === expected.length && timingSafeEqual(expected, actual) ? id : null;
}

export async function createSession(userId: number) {
  (await cookies()).set(COOKIE, sign(userId), {
    httpOnly: true,
    // ponytail: no `secure` flag so plain-HTTP (bare IP) works too; add it back if this ever serves sensitive data
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
}

export async function deleteSession() {
  (await cookies()).delete(COOKIE);
}

export async function getCurrentUser(): Promise<Pick<UserRow, "id" | "email" | "name"> | null> {
  const id = unsign((await cookies()).get(COOKIE)?.value);
  if (!id) return null;
  const users = await q<Pick<UserRow, "id" | "email" | "name">>(
    "SELECT id, email, name FROM users WHERE id = ?",
    [id]
  );
  return users[0] ?? null;
}
