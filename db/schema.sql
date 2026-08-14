-- Me Do — database schema + seed data
-- Run with your own credentials, e.g.:
--   mysql -h <DB_HOST> -P <DB_PORT> -u <DB_USER> -p < db/schema.sql

CREATE DATABASE IF NOT EXISTS medo
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE medo;

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL, -- scrypt: salt:hash hex
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS todos (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  title VARCHAR(255) NOT NULL,
  done TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_todos_user (user_id)
) ENGINE=InnoDB;

-- Seed: password for both demo users is "password123"
-- scrypt(N=16384, r=8, p=1, 64-byte key), format "salt:hash" hex.
INSERT INTO users (email, name, password_hash) VALUES
('demo@medo.app', 'Demo User',
 'a3f1c9d82e4b7a0516f8d3c2e9b4a7d8:9f2c4e8a1d6b3f7c0e5a9d2b6f1c8e4a3d7b0f6c9e2a5d8b1f4c7a0e3d6b9f2c5'),
('karn@medo.app', 'Karn',
 'b7e2a4f8c1d9306e5a8b2f4c7d1e9a3b:4c8a2e6b0d9f3c7a1e5b8d2f6a0c4e8b2d6f9a3c7e1b4d8f0a2c6e9b3d5f');

INSERT INTO todos (user_id, title, done) VALUES
(1, 'Ship the landing page', 1),
(1, 'Review pull requests', 1),
(1, '30-min run', 1),
(1, 'Plan tomorrow', 0),
(1, 'Call mom', 0),
(2, 'Set up MySQL on port 3307', 1),
(2, 'Write auth system', 0),
(2, 'Write todo CRUD', 0);
