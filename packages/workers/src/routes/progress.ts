import { z } from "zod";
import type { AppEnv } from "../types";
import { getAuthContext } from "../middleware/auth";

const SyncProgressSchema = z.object({
  site: z.enum(["encp", "wiki"]),
  deck_id: z.string().min(1),
  card_id: z.string().min(1),
  difficulty: z.number().min(0),
  stability: z.number().min(0),
  elapsed_days: z.number().int().min(0),
  scheduled_days: z.number().int().min(0),
  repetitions: z.number().int().min(0),
  lapses: z.number().int().min(0),
  last_review: z.string().min(1),
});

const SyncBatchSchema = z.object({
  cards: z.array(SyncProgressSchema).min(1).max(100),
});

const QuizResultSchema = z.object({
  quiz_card_id: z.string().min(1),
  site: z.enum(["encp", "wiki"]),
  correct: z.number().int().min(0),
  total: z.number().int().min(1),
  time_ms: z.number().int().min(0).optional(),
});

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

function jsonError(error: string, status: number): Response {
  return jsonResponse({ error }, status);
}

interface ReviewProgressRow {
  id: number;
  user_id: string;
  site: string;
  deck_id: string;
  card_id: string;
  difficulty: number;
  stability: number;
  elapsed_days: number;
  scheduled_days: number;
  repetitions: number;
  lapses: number;
  last_review: string;
  created_at: string;
  updated_at: string;
}

interface QuizResultRow {
  id: number;
  user_id: string;
  quiz_card_id: string;
  site: string;
  correct: number;
  total: number;
  time_ms: number | null;
  completed_at: string;
}

interface SessionStatsRow {
  id: number;
  user_id: string;
  total_reviews: number;
  total_quizzes: number;
  total_correct: number;
  current_streak: number;
  best_streak: number;
  last_review_date: string | null;
  updated_at: string;
}

export async function handleProgress(
  request: Request,
  env: AppEnv,
): Promise<Response | null> {
  const url = new URL(request.url);

  if (url.pathname === "/api/progress" && request.method === "GET") {
    return handleGetProgress(request, env);
  }

  if (url.pathname === "/api/progress/sync" && request.method === "POST") {
    return handleSyncProgress(request, env);
  }

  if (url.pathname === "/api/progress/quiz" && request.method === "POST") {
    return handleQuizResult(request, env);
  }

  return null;
}

async function handleGetProgress(
  request: Request,
  env: AppEnv,
): Promise<Response> {
  const auth = await getAuthContext(request, env);
  if (auth instanceof Response) return auth;

  const [reviewProgress, quizResults, sessionStats] = await Promise.all([
    env.DB.prepare("SELECT * FROM review_progress WHERE user_id = ?")
      .bind(auth.userId)
      .all<ReviewProgressRow>(),
    env.DB.prepare(
      "SELECT * FROM quiz_results WHERE user_id = ? ORDER BY completed_at DESC LIMIT 50",
    )
      .bind(auth.userId)
      .all<QuizResultRow>(),
    env.DB.prepare("SELECT * FROM session_stats WHERE user_id = ?")
      .bind(auth.userId)
      .first<SessionStatsRow>(),
  ]);

  return jsonResponse({
    review_progress: reviewProgress.results,
    quiz_history: quizResults.results,
    session_stats: sessionStats ?? {
      total_reviews: 0,
      total_quizzes: 0,
      total_correct: 0,
      current_streak: 0,
      best_streak: 0,
      last_review_date: null,
    },
  });
}

async function handleSyncProgress(
  request: Request,
  env: AppEnv,
): Promise<Response> {
  const auth = await getAuthContext(request, env);
  if (auth instanceof Response) return auth;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const parsed = SyncBatchSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Validation failed", 400);
  }

  const statements = parsed.data.cards.map((card) =>
    env.DB.prepare(
      `INSERT INTO review_progress (user_id, site, deck_id, card_id, difficulty, stability, elapsed_days, scheduled_days, repetitions, lapses, last_review)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(user_id, site, deck_id, card_id) DO UPDATE SET
         difficulty = excluded.difficulty,
         stability = excluded.stability,
         elapsed_days = excluded.elapsed_days,
         scheduled_days = excluded.scheduled_days,
         repetitions = excluded.repetitions,
         lapses = excluded.lapses,
         last_review = excluded.last_review,
         updated_at = datetime('now')`,
    ).bind(
      auth.userId,
      card.site,
      card.deck_id,
      card.card_id,
      card.difficulty,
      card.stability,
      card.elapsed_days,
      card.scheduled_days,
      card.repetitions,
      card.lapses,
      card.last_review,
    ),
  );

  await env.DB.batch(statements);

  return jsonResponse({ synced: parsed.data.cards.length });
}

async function handleQuizResult(
  request: Request,
  env: AppEnv,
): Promise<Response> {
  const auth = await getAuthContext(request, env);
  if (auth instanceof Response) return auth;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const parsed = QuizResultSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Validation failed", 400);
  }

  const { quiz_card_id, site, correct, total, time_ms } = parsed.data;

  const result = await env.DB.prepare(
    "INSERT INTO quiz_results (user_id, quiz_card_id, site, correct, total, time_ms) VALUES (?, ?, ?, ?, ?, ?) RETURNING *",
  )
    .bind(auth.userId, quiz_card_id, site, correct, total, time_ms ?? null)
    .first<QuizResultRow>();

  await env.DB.prepare(
    `INSERT INTO session_stats (user_id, total_reviews, total_quizzes, total_correct, current_streak, best_streak, last_review_date)
     VALUES (?, 0, 1, ?, CASE WHEN ? > 0 THEN 1 ELSE 0 END, CASE WHEN ? > 0 THEN 1 ELSE 0 END, date('now'))
     ON CONFLICT(user_id) DO UPDATE SET
       total_quizzes = total_quizzes + 1,
       total_correct = total_correct + excluded.total_correct,
       current_streak = CASE WHEN ? > 0 THEN current_streak + 1 ELSE 0 END,
       best_streak = MAX(best_streak, CASE WHEN ? > 0 THEN current_streak + 1 ELSE 0 END),
       last_review_date = date('now'),
       updated_at = datetime('now')`,
  )
    .bind(auth.userId, correct, correct, correct, correct, correct)
    .run();

  return jsonResponse({ quiz_result: result }, 201);
}
