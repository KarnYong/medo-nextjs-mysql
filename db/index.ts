import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.DB_HOST ?? "127.0.0.1",
  port: Number(process.env.DB_PORT ?? 3307),
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "medo",
});

// ponytail: plain object rows, no ORM mapper needed at this size
export async function q<T>(sql: string, params: unknown[] = []): Promise<T[]> {
  const [rows] = await pool.query(sql, params);
  return rows as T[];
}

export interface UserRow {
  id: number;
  email: string;
  name: string;
  password_hash: string;
}

export interface TodoRow {
  id: number;
  user_id: number;
  title: string;
  done: 0 | 1;
  created_at: string;
}
