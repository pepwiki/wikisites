import { describe, it, expect } from "vitest";
import { handleProgress } from "../routes/progress";
import { signJWT } from "../middleware/auth";
import type { AppEnv } from "../types";

const TEST_SECRET = "test-secret-for-progress";

async function makeToken(): Promise<string> {
  return signJWT({ sub: "user-1", role: "contributor" }, TEST_SECRET);
}

function makeEnv(options: {
  reviewProgress?: unknown[];
  quizHistory?: unknown[];
  sessionStats?: unknown;
} = {}): AppEnv {
  const { reviewProgress = [], quizHistory = [], sessionStats = null } = options;

  return {
    ASSETS: {
      fetch: (() => Promise.resolve(new Response("ok"))) as typeof fetch,
    },
    DB: {
      prepare: (sql: string) => ({
        bind: () => ({
          first: async () => {
            if (sql.includes("session_stats")) return sessionStats;
            return null;
          },
          all: async () => {
            if (sql.includes("review_progress")) return { results: reviewProgress };
            if (sql.includes("quiz_results")) return { results: quizHistory };
            return { results: [] };
          },
          run: async () => ({}),
        }),
        first: async () => {
          if (sql.includes("session_stats")) return sessionStats;
          return null;
        },
        all: async () => {
          if (sql.includes("review_progress")) return { results: reviewProgress };
          if (sql.includes("quiz_results")) return { results: quizHistory };
          return { results: [] };
        },
      }),
      exec: async () => ({}),
      batch: async () => [],
    } as unknown as AppEnv["DB"],
    JWT_SECRET: TEST_SECRET,
  };
}

function makeRequest(
  path: string,
  method: string = "GET",
  body?: Record<string, unknown>,
  token?: string,
): Request {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return new Request(`https://example.com${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
}

describe("Progress Routes", () => {
  describe("GET /api/progress", () => {
    it("returns user progress when authenticated", async () => {
      const env = makeEnv({
        reviewProgress: [{ id: 1, card_id: "card-1" }],
        quizHistory: [{ id: 1, correct: 1, total: 1 }],
        sessionStats: { total_reviews: 10, total_quizzes: 5 },
      });
      const token = await makeToken();
      const request = makeRequest("/api/progress", "GET", undefined, token);
      const response = await handleProgress(request, env);
      expect(response).not.toBeNull();
      const body = await response!.json<{
        review_progress: unknown[];
        quiz_history: unknown[];
        session_stats: { total_reviews: number };
      }>();
      expect(body.review_progress).toHaveLength(1);
      expect(body.quiz_history).toHaveLength(1);
      expect(body.session_stats.total_reviews).toBe(10);
    });

    it("returns 401 when not authenticated", async () => {
      const env = makeEnv();
      const request = makeRequest("/api/progress");
      const response = await handleProgress(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(401);
    });

    it("returns default stats when no session stats exist", async () => {
      const env = makeEnv({ sessionStats: null });
      const token = await makeToken();
      const request = makeRequest("/api/progress", "GET", undefined, token);
      const response = await handleProgress(request, env);
      expect(response).not.toBeNull();
      const body = await response!.json<{ session_stats: { total_reviews: number } }>();
      expect(body.session_stats.total_reviews).toBe(0);
    });
  });

  describe("POST /api/progress/sync", () => {
    it("syncs FSRS state when authenticated", async () => {
      const env = makeEnv();
      const token = await makeToken();
      const request = makeRequest(
        "/api/progress/sync",
        "POST",
        {
          cards: [
            {
              site: "wiki",
              deck_id: "deck-1",
              card_id: "card-1",
              difficulty: 2.5,
              stability: 1.0,
              elapsed_days: 0,
              scheduled_days: 1,
              repetitions: 0,
              lapses: 0,
              last_review: "2026-01-01",
            },
          ],
        },
        token,
      );
      const response = await handleProgress(request, env);
      expect(response).not.toBeNull();
      const body = await response!.json<{ synced: number }>();
      expect(body.synced).toBe(1);
    });

    it("returns 401 when not authenticated", async () => {
      const env = makeEnv();
      const request = makeRequest(
        "/api/progress/sync",
        "POST",
        { cards: [] },
      );
      const response = await handleProgress(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(401);
    });

    it("returns 400 for invalid body", async () => {
      const env = makeEnv();
      const token = await makeToken();
      const request = makeRequest(
        "/api/progress/sync",
        "POST",
        { cards: "not-array" },
        token,
      );
      const response = await handleProgress(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(400);
    });
  });

  describe("POST /api/progress/quiz", () => {
    it("records quiz result when authenticated", async () => {
      const created = {
        id: 1,
        user_id: "user-1",
        quiz_card_id: "quiz-1",
        site: "wiki",
        correct: 1,
        total: 1,
        time_ms: 5000,
        completed_at: "2026-01-01T00:00:00Z",
      };
      const env = makeEnv();
      env.DB.prepare = ((sql: string) => {
        if (sql.includes("INSERT INTO quiz_results")) {
          return { bind: () => ({ first: async () => created }) };
        }
        return { bind: () => ({ run: async () => ({}) }) };
      }) as typeof env.DB.prepare;

      const token = await makeToken();
      const request = makeRequest(
        "/api/progress/quiz",
        "POST",
        { quiz_card_id: "quiz-1", site: "wiki", correct: 1, total: 1, time_ms: 5000 },
        token,
      );
      const response = await handleProgress(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(201);
    });

    it("returns 400 for invalid quiz data", async () => {
      const env = makeEnv();
      const token = await makeToken();
      const request = makeRequest(
        "/api/progress/quiz",
        "POST",
        { quiz_card_id: "quiz-1", correct: 1, total: 0 },
        token,
      );
      const response = await handleProgress(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(400);
    });
  });

  describe("route matching", () => {
    it("returns null for non-matching routes", async () => {
      const env = makeEnv();
      const token = await makeToken();
      const request = makeRequest("/api/other", "GET", undefined, token);
      const response = await handleProgress(request, env);
      expect(response).toBeNull();
    });
  });
});
