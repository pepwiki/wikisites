import { describe, it, expect } from "vitest";
import { handleSearchApi } from "../routes/search-api";
import type { AppEnv } from "../types";

function makeEnv(searchResults: unknown[] = [], totalCount: number = 0): AppEnv {
  let callCount = 0;
  return {
    ASSETS: {
      fetch: (() => Promise.resolve(new Response("ok"))) as typeof fetch,
    },
    DB: {
      prepare: (_sql: string) => ({
        bind: () => ({
          first: async () => {
            callCount++;
            if (callCount === 2) return { count: totalCount };
            return null;
          },
          all: async () => {
            callCount++;
            if (callCount === 1) return { results: searchResults };
            return { results: [] };
          },
          run: async () => ({}),
        }),
        first: async () => ({ count: totalCount }),
        all: async () => ({ results: searchResults }),
      }),
      exec: async () => ({}),
      batch: async () => [],
    } as unknown as AppEnv["DB"],
  };
}

function makeRequest(path: string, method: string = "GET"): Request {
  return new Request(`https://example.com${path}`, { method });
}

describe("Search API Routes", () => {
  describe("GET /api/search", () => {
    it("returns search results", async () => {
      const results = [
        { id: 1, title: "Glutathione", snippet: "An important <mark>antioxidant</mark>", rank: 0.5 },
      ];
      const env = makeEnv(results, 1);
      const request = makeRequest("/api/search?q=antioxidant");
      const response = await handleSearchApi(request, env);
      expect(response).not.toBeNull();
      const body = await response!.json<{
        query: string;
        results: unknown[];
        total: number;
      }>();
      expect(body.query).toBe("antioxidant");
      expect(body.results).toHaveLength(1);
      expect(body.total).toBe(1);
    });

    it("returns 400 when query is missing", async () => {
      const env = makeEnv();
      const request = makeRequest("/api/search");
      const response = await handleSearchApi(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(400);
    });

    it("returns 400 when query is empty", async () => {
      const env = makeEnv();
      const request = makeRequest("/api/search?q=");
      const response = await handleSearchApi(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(400);
    });

    it("returns empty results gracefully on FTS error", async () => {
      const env = makeEnv();
      env.DB.prepare = (() => ({
        bind: () => ({
          first: async () => { throw new Error("FTS not available"); },
          all: async () => { throw new Error("FTS not available"); },
          run: async () => ({}),
        }),
        first: async () => { throw new Error("FTS not available"); },
        all: async () => { throw new Error("FTS not available"); },
      })) as typeof env.DB.prepare;

      const request = makeRequest("/api/search?q=test");
      const response = await handleSearchApi(request, env);
      expect(response).not.toBeNull();
      const body = await response!.json<{ results: unknown[]; message?: string }>();
      expect(body.results).toHaveLength(0);
      expect(body.message).toBe("Search index not available");
    });

    it("returns null for non-search routes", async () => {
      const env = makeEnv();
      const request = makeRequest("/api/other");
      const response = await handleSearchApi(request, env);
      expect(response).toBeNull();
    });

    it("returns null for POST to /api/search", async () => {
      const env = makeEnv();
      const request = makeRequest("/api/search?q=test", "POST");
      const response = await handleSearchApi(request, env);
      expect(response).toBeNull();
    });

    it("respects limit and offset params", async () => {
      const env = makeEnv([], 0);
      const request = makeRequest("/api/search?q=test&limit=5&offset=10");
      const response = await handleSearchApi(request, env);
      expect(response).not.toBeNull();
      const body = await response!.json<{ limit: number; offset: number }>();
      expect(body.limit).toBe(5);
      expect(body.offset).toBe(10);
    });

    it("caps limit at 100", async () => {
      const env = makeEnv();
      const request = makeRequest("/api/search?q=test&limit=200");
      const response = await handleSearchApi(request, env);
      expect(response).not.toBeNull();
      const body = await response!.json<{ limit: number }>();
      expect(body.limit).toBe(100);
    });
  });
});
