-- Migration: add comments table
CREATE TABLE IF NOT EXISTS comment (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
