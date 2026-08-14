// Seeds/updates demo users with real scrypt hashes + demo todos.
// Run after schema.sql: node db/seed.mjs
import { randomBytes, scryptSync } from "node:crypto";
import mysql from "mysql2/promise";

// Reads DB_HOST/DB_PORT/DB_USER/DB_PASSWORD/DB_NAME from .env (Next.js loads it;
// plain node needs: node --env-file=db/../.env db/seed.mjs)
const hashPassword = (password) => {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 64);
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
};

const pool = mysql.createPool({
  host: process.env.DB_HOST ?? "127.0.0.1",
  port: Number(process.env.DB_PORT ?? 3307),
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "medo",
});

for (const [email, name] of [
  ["demo@medo.app", "Demo User"],
  ["karn@medo.app", "Karn"],
]) {
  await pool.query(
    "INSERT INTO users (email, name, password_hash) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)",
    [email, name, hashPassword("password123")]
  );
}

const [todos] = await pool.query("SELECT COUNT(*) AS n FROM todos");
if (todos[0].n === 0) {
  await pool.query(`INSERT INTO todos (user_id, title, done) VALUES
    (1, 'Ship the landing page', 1), (1, 'Review pull requests', 1), (1, '30-min run', 1),
    (1, 'Plan tomorrow', 0), (1, 'Call mom', 0),
    (2, 'Set up MySQL on port 3307', 1), (2, 'Write auth system', 0), (2, 'Write todo CRUD', 0)`);
}

console.log("Seeded. Login: demo@medo.app / password123");
await pool.end();
