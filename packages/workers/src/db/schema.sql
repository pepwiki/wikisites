-- Wikisites D1 Database Schema v1.0.0

-- Users table (for future authentication)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'reader' CHECK(role IN ('reader', 'contributor', 'moderator', 'admin')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- User review progress (mirrors localStorage FSRS state for cross-device sync)
CREATE TABLE IF NOT EXISTS review_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  site TEXT NOT NULL CHECK(site IN ('encp', 'wiki')),
  deck_id TEXT NOT NULL,
  card_id TEXT NOT NULL,
  difficulty REAL NOT NULL DEFAULT 1.0,
  stability REAL NOT NULL DEFAULT 1.0,
  elapsed_days INTEGER NOT NULL DEFAULT 0,
  scheduled_days INTEGER NOT NULL DEFAULT 0,
  repetitions INTEGER NOT NULL DEFAULT 0,
  lapses INTEGER NOT NULL DEFAULT 0,
  last_review TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, site, deck_id, card_id)
);

-- Annotations on articles
CREATE TABLE IF NOT EXISTS annotations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  article_slug TEXT NOT NULL,
  site TEXT NOT NULL CHECK(site IN ('encp', 'wiki')),
  content TEXT NOT NULL,
  position_selector TEXT, -- CSS selector for text position
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Quiz results history
CREATE TABLE IF NOT EXISTS quiz_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quiz_card_id TEXT NOT NULL,
  site TEXT NOT NULL CHECK(site IN ('encp', 'wiki')),
  correct INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  time_ms INTEGER,
  completed_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Session statistics (aggregated)
CREATE TABLE IF NOT EXISTS session_stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_reviews INTEGER NOT NULL DEFAULT 0,
  total_quizzes INTEGER NOT NULL DEFAULT 0,
  total_correct INTEGER NOT NULL DEFAULT 0,
  current_streak INTEGER NOT NULL DEFAULT 0,
  best_streak INTEGER NOT NULL DEFAULT 0,
  last_review_date TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id)
);

-- Indexes
-- Comments on articles (threaded replies)
CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  article_slug TEXT NOT NULL,
  site TEXT NOT NULL CHECK(site IN ('encp', 'wiki')),
  content TEXT NOT NULL,
  parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_review_progress_user ON review_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_review_progress_deck ON review_progress(site, deck_id);
CREATE INDEX IF NOT EXISTS idx_annotations_article ON annotations(site, article_slug);
CREATE INDEX IF NOT EXISTS idx_quiz_results_user ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_article ON comments(site, article_slug);
CREATE INDEX IF NOT EXISTS idx_comments_parent ON comments(parent_id);
