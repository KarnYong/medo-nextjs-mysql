"use server";

import { redirect } from "next/navigation";
import mysql from "mysql2/promise";
import { pool, q, type UserRow } from "@/db";
import { createSession, deleteSession, hashPassword, verifyPassword } from "@/lib/auth";

export interface AuthState {
  error?: string;
}

export async function register(_state: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a valid email." };
  if (name.length < 1) return { error: "Enter your name." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  const existing = await q<UserRow>("SELECT id FROM users WHERE email = ?", [email]);
  if (existing.length > 0) return { error: "An account with this email already exists." };

  const [result] = await pool.query<mysql.ResultSetHeader>(
    "INSERT INTO users (email, name, password_hash) VALUES (?, ?, ?)",
    [email, name, hashPassword(password)]
  );
  await createSession(result.insertId);
  redirect("/todos");
}

export async function login(_state: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const users = await q<UserRow>("SELECT * FROM users WHERE email = ?", [email]);
  const user = users[0];
  if (!user || !verifyPassword(password, user.password_hash)) {
    return { error: "Invalid email or password." };
  }

  await createSession(user.id);
  redirect("/todos");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
