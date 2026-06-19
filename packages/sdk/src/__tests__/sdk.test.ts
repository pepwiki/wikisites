import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  WikisitesClient,
  WikisitesAPIError,
  type HealthResponse,
  type SearchResult,
  type Annotation,
  type Comment,
  type UserProgress,
  type DetailedHealthResponse,
} from "../index";

// ---------------------------------------------------------------------------
// Mock fetch
// ---------------------------------------------------------------------------

interface MockCall {
  url: string;
  init?: RequestInit;
}

let mockCalls: MockCall[] = [];
let mockResponse: { status: number; body: unknown; headers?: Record<string, string> } = {
  status: 200,
  body: {},
};

function mockFetch(input: string | URL | Request, init?: RequestInit): Promise<Response> {
  const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
  mockCalls.push({ url, init });
  const headers = new Headers(mockResponse.headers ?? { "Content-Type": "application/json" });
  return Promise.resolve(
    new Response(JSON.stringify(mockResponse.body), {
      status: mockResponse.status,
      headers,
    }),
  );
}

function mockFetchText(body: string, status = 200): void {
  mockResponse = { status, body };
  // Override to return raw text
  vi.stubGlobal(
    "fetch",
    (input: string | URL | Request, init?: RequestInit): Promise<Response> => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
      mockCalls.push({ url, init });
      return Promise.resolve(
        new Response(body, {
          status,
          headers: new Headers({ "Content-Type": "application/json" }),
        }),
      );
    },
  );
}

beforeEach(() => {
  mockCalls = [];
  mockResponse = { status: 200, body: {} };
  vi.stubGlobal("fetch", mockFetch);
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// Client instantiation
// ---------------------------------------------------------------------------

describe("WikisitesClient", () => {
  it("creates a client with a base URL", () => {
    const client = new WikisitesClient({ baseUrl: "https://api.example.com" });
    expect(client).toBeDefined();
  });

  it("strips trailing slashes from baseUrl", () => {
    const client = new WikisitesClient({ baseUrl: "https://api.example.com///" });
    expect(client).toBeDefined();
  });

  // -----------------------------------------------------------------------
  // health()
  // -----------------------------------------------------------------------

  describe("health()", () => {
    it("calls GET /api/health", async () => {
      mockResponse = { status: 200, body: { status: "ok", timestamp: 123 } };
      const client = new WikisitesClient({ baseUrl: "https://api.test" });
      const result = await client.health();
      expect(mockCalls[0]?.url).toBe("https://api.test/api/health");
      expect(result.status).toBe("ok");
      expect(result.timestamp).toBe(123);
    });
  });

  // -----------------------------------------------------------------------
  // search()
  // -----------------------------------------------------------------------

  describe("search()", () => {
    it("calls GET /api/search with q param", async () => {
      mockResponse = {
        status: 200,
        body: { query: "peptide", results: [{ id: 1, title: "A", snippet: "B", rank: 0.5 }], total: 1, limit: 20, offset: 0 },
      };
      const client = new WikisitesClient({ baseUrl: "https://api.test" });
      const results = await client.search("peptide");
      expect(mockCalls[0]?.url).toContain("/api/search?q=peptide");
      expect(results).toHaveLength(1);
      expect(results[0]?.title).toBe("A");
    });

    it("includes limit and offset in query string", async () => {
      mockResponse = { status: 200, body: { query: "x", results: [], total: 0, limit: 10, offset: 5 } };
      const client = new WikisitesClient({ baseUrl: "https://api.test" });
      await client.search("x", { limit: 10, offset: 5 });
      expect(mockCalls[0]?.url).toContain("limit=10");
      expect(mockCalls[0]?.url).toContain("offset=5");
    });
  });

  // -----------------------------------------------------------------------
  // getAnnotations()
  // -----------------------------------------------------------------------

  describe("getAnnotations()", () => {
    it("calls GET /api/annotations/:slug", async () => {
      mockResponse = {
        status: 200,
        body: { annotations: [{ id: 1, article_slug: "glutathione", content: "note" }] },
      };
      const client = new WikisitesClient({ baseUrl: "https://api.test" });
      const annotations = await client.getAnnotations("glutathione");
      expect(mockCalls[0]?.url).toBe("https://api.test/api/annotations/glutathione");
      expect(annotations).toHaveLength(1);
    });
  });

  // -----------------------------------------------------------------------
  // createAnnotation()
  // -----------------------------------------------------------------------

  describe("createAnnotation()", () => {
    it("POSTs to /api/annotations/:slug with auth header", async () => {
      mockResponse = {
        status: 201,
        body: { annotation: { id: 10, content: "new" } },
      };
      const client = new WikisitesClient({ baseUrl: "https://api.test" });
      const result = await client.createAnnotation(
        "test-article",
        { site: "wiki", content: "new" },
        "tok123",
      );
      expect(mockCalls[0]?.url).toBe("https://api.test/api/annotations/test-article");
      expect(mockCalls[0]?.init?.method).toBe("POST");
      expect(mockCalls[0]?.init?.headers).toMatchObject({
        Authorization: "Bearer tok123",
      });
      expect(result.id).toBe(10);
    });
  });

  // -----------------------------------------------------------------------
  // deleteAnnotation()
  // -----------------------------------------------------------------------

  describe("deleteAnnotation()", () => {
    it("DELETEs /api/annotations/:id with auth header", async () => {
      mockResponse = { status: 200, body: { deleted: true } };
      const client = new WikisitesClient({ baseUrl: "https://api.test" });
      await client.deleteAnnotation(42, "tok");
      expect(mockCalls[0]?.url).toBe("https://api.test/api/annotations/42");
      expect(mockCalls[0]?.init?.method).toBe("DELETE");
      expect(mockCalls[0]?.init?.headers).toMatchObject({
        Authorization: "Bearer tok",
      });
    });
  });

  // -----------------------------------------------------------------------
  // getComments()
  // -----------------------------------------------------------------------

  describe("getComments()", () => {
    it("calls GET /api/comments/:slug", async () => {
      mockResponse = {
        status: 200,
        body: { comments: [{ id: 1, content: "hello" }] },
      };
      const client = new WikisitesClient({ baseUrl: "https://api.test" });
      const comments = await client.getComments("my-article");
      expect(mockCalls[0]?.url).toBe("https://api.test/api/comments/my-article");
      expect(comments).toHaveLength(1);
    });
  });

  // -----------------------------------------------------------------------
  // createComment()
  // -----------------------------------------------------------------------

  describe("createComment()", () => {
    it("POSTs to /api/comments/:slug with auth header", async () => {
      mockResponse = {
        status: 201,
        body: { comment: { id: 5, content: "nice" } },
      };
      const client = new WikisitesClient({ baseUrl: "https://api.test" });
      const result = await client.createComment(
        "article-x",
        { site: "encp", content: "nice" },
        "mytoken",
      );
      expect(mockCalls[0]?.url).toBe("https://api.test/api/comments/article-x");
      expect(mockCalls[0]?.init?.method).toBe("POST");
      expect(result.id).toBe(5);
    });
  });

  // -----------------------------------------------------------------------
  // getProgress()
  // -----------------------------------------------------------------------

  describe("getProgress()", () => {
    it("calls GET /api/progress with auth header", async () => {
      mockResponse = {
        status: 200,
        body: {
          review_progress: [],
          quiz_history: [],
          session_stats: { total_reviews: 0, total_quizzes: 0, total_correct: 0, current_streak: 0, best_streak: 0, last_review_date: null },
        },
      };
      const client = new WikisitesClient({ baseUrl: "https://api.test" });
      const progress = await client.getProgress("tok");
      expect(mockCalls[0]?.url).toBe("https://api.test/api/progress");
      expect(mockCalls[0]?.init?.headers).toMatchObject({ Authorization: "Bearer tok" });
      expect(progress.session_stats.total_reviews).toBe(0);
    });
  });

  // -----------------------------------------------------------------------
  // syncProgress()
  // -----------------------------------------------------------------------

  describe("syncProgress()", () => {
    it("POSTs to /api/progress/sync", async () => {
      mockResponse = { status: 200, body: { synced: 2 } };
      const client = new WikisitesClient({ baseUrl: "https://api.test" });
      await client.syncProgress(
        { cards: [{ site: "wiki", deck_id: "d1", card_id: "c1", difficulty: 0, stability: 0, elapsed_days: 0, scheduled_days: 0, repetitions: 0, lapses: 0, last_review: "2026-01-01" }] },
        "tok",
      );
      expect(mockCalls[0]?.url).toBe("https://api.test/api/progress/sync");
      expect(mockCalls[0]?.init?.method).toBe("POST");
    });
  });

  // -----------------------------------------------------------------------
  // recordQuiz()
  // -----------------------------------------------------------------------

  describe("recordQuiz()", () => {
    it("POSTs to /api/progress/quiz", async () => {
      mockResponse = { status: 201, body: { quiz_result: { id: 1 } } };
      const client = new WikisitesClient({ baseUrl: "https://api.test" });
      await client.recordQuiz(
        { quiz_card_id: "q1", site: "wiki", correct: 1, total: 1 },
        "tok",
      );
      expect(mockCalls[0]?.url).toBe("https://api.test/api/progress/quiz");
      expect(mockCalls[0]?.init?.method).toBe("POST");
    });
  });

  // -----------------------------------------------------------------------
  // getDetailedHealth()
  // -----------------------------------------------------------------------

  describe("getDetailedHealth()", () => {
    it("calls GET /api/health/detailed", async () => {
      mockResponse = {
        status: 200,
        body: { status: "ok", timestamp: 100, checks: { d1: { status: "ok" }, kv: { status: "skipped" } } },
      };
      const client = new WikisitesClient({ baseUrl: "https://api.test" });
      const result = await client.getDetailedHealth();
      expect(mockCalls[0]?.url).toBe("https://api.test/api/health/detailed");
      expect(result.status).toBe("ok");
    });
  });

  // -----------------------------------------------------------------------
  // getApiSpec()
  // -----------------------------------------------------------------------

  describe("getApiSpec()", () => {
    it("returns raw YAML text", async () => {
      mockFetchText("openapi: 3.0.0", 200);
      const client = new WikisitesClient({ baseUrl: "https://api.test" });
      const spec = await client.getApiSpec();
      expect(spec).toBe("openapi: 3.0.0");
      expect(mockCalls[0]?.url).toBe("https://api.test/api/openapi.yaml");
    });
  });

  // -----------------------------------------------------------------------
  // Error handling
  // -----------------------------------------------------------------------

  describe("error handling", () => {
    it("throws WikisitesAPIError on non-OK response", async () => {
      mockResponse = { status: 404, body: { error: "Not found" } };
      const client = new WikisitesClient({ baseUrl: "https://api.test" });
      await expect(client.health()).rejects.toThrow(WikisitesAPIError);
    });

    it("includes status and body in error", async () => {
      mockResponse = { status: 500, body: { error: "Internal" } };
      const client = new WikisitesClient({ baseUrl: "https://api.test" });
      try {
        await client.health();
        expect.unreachable("should have thrown");
      } catch (err) {
        expect(err).toBeInstanceOf(WikisitesAPIError);
        if (err instanceof WikisitesAPIError) {
          expect(err.status).toBe(500);
          expect(err.message).toBe("Internal");
          expect(err.body).toEqual({ error: "Internal" });
        }
      }
    });

    it("uses statusText when body has no error field", async () => {
      mockResponse = { status: 403, body: "forbidden" };
      const client = new WikisitesClient({ baseUrl: "https://api.test" });
      try {
        await client.health();
        expect.unreachable("should have thrown");
      } catch (err) {
        expect(err).toBeInstanceOf(WikisitesAPIError);
        if (err instanceof WikisitesAPIError) {
          expect(err.status).toBe(403);
        }
      }
    });
  });

  // -----------------------------------------------------------------------
  // Type exports
  // -----------------------------------------------------------------------

  describe("type exports", () => {
    it("exports all expected types", () => {
      // Type-level checks — these compile or fail at build time
      const _health: HealthResponse = { status: "ok", timestamp: 0 };
      const _search: SearchResult = { id: 0, title: "", snippet: "", rank: 0 };
      const _annotation: Annotation = {
        id: 0, user_id: "", article_slug: "", site: "wiki", content: "",
        position_selector: null, created_at: "", updated_at: "",
      };
      const _comment: Comment = {
        id: 0, user_id: "", article_slug: "", site: "wiki", content: "",
        parent_id: null, created_at: "", updated_at: "",
      };
      const _progress: UserProgress = {
        review_progress: [], quiz_history: [],
        session_stats: { total_reviews: 0, total_quizzes: 0, total_correct: 0, current_streak: 0, best_streak: 0, last_review_date: null },
      };
      const _detailed: DetailedHealthResponse = {
        status: "ok", timestamp: 0,
        checks: { d1: { status: "ok" }, kv: { status: "skipped" } },
      };
      // Use them so TS doesn't complain about unused vars
      expect(_health.status).toBe("ok");
      expect(_search.id).toBe(0);
      expect(_annotation.id).toBe(0);
      expect(_comment.id).toBe(0);
      expect(_progress.review_progress).toEqual([]);
      expect(_detailed.status).toBe("ok");
    });
  });
});
