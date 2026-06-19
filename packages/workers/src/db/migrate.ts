/**
 * D1 database migration runner.
 * Applies schema changes and tracks applied migrations.
 */

const SCHEMA = `
CREATE TABLE IF NOT EXISTS _migrations (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  applied_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'reader' CHECK(role IN ('reader', 'contributor', 'moderator', 'admin')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

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

CREATE TABLE IF NOT EXISTS annotations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  article_slug TEXT NOT NULL,
  site TEXT NOT NULL CHECK(site IN ('encp', 'wiki')),
  content TEXT NOT NULL,
  position_selector TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

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

CREATE INDEX IF NOT EXISTS idx_review_progress_user ON review_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_review_progress_deck ON review_progress(site, deck_id);
CREATE INDEX IF NOT EXISTS idx_annotations_article ON annotations(site, article_slug);
CREATE INDEX IF NOT EXISTS idx_quiz_results_user ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_article ON comments(site, article_slug);
CREATE INDEX IF NOT EXISTS idx_comments_parent ON comments(parent_id);
`;

export async function runMigrations(db: {
  exec: (sql: string) => Promise<unknown>;
  prepare: (sql: string) => {
    bind: (...args: unknown[]) => {
      first: () => Promise<unknown>;
      run: () => Promise<unknown>;
    };
    first: () => Promise<unknown>;
  };
}): Promise<void> {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  const applied = (await db
    .prepare("SELECT name FROM _migrations WHERE name = ?")
    .bind("001_initial")
    .first()) as { name: string } | null;

  if (!applied) {
    const statements = SCHEMA.split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith("--"));
    for (const stmt of statements) {
      await db.exec(stmt);
    }

    await db.prepare("INSERT INTO _migrations (name) VALUES (?)").bind("001_initial").run();
  }
}
