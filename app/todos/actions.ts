"use server";

import { revalidatePath } from "next/cache";
import { q } from "@/db";
import { getCurrentUser } from "@/lib/auth";

async function requireUserId(): Promise<number> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");
  return user.id;
}

// ponytail: no per-action return values; revalidate + error throw keeps the UI one server component
export async function addTodo(formData: FormData) {
  const userId = await requireUserId();
  const title = String(formData.get("title") ?? "").trim();
  if (title.length < 1 || title.length > 255) return;
  await q("INSERT INTO todos (user_id, title) VALUES (?, ?)", [userId, title]);
  revalidatePath("/todos");
}

export async function toggleTodo(formData: FormData) {
  const userId = await requireUserId();
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;
  await q("UPDATE todos SET done = NOT done WHERE id = ? AND user_id = ?", [id, userId]);
  revalidatePath("/todos");
}

export async function deleteTodo(formData: FormData) {
  const userId = await requireUserId();
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;
  await q("DELETE FROM todos WHERE id = ? AND user_id = ?", [id, userId]);
  revalidatePath("/todos");
}
