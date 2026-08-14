import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "127.0.0.1",
  port: 3307,
  user: "root",
  password: "1234",
  database: "medo",
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
