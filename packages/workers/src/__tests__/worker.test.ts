import { describe, it, expect } from "vitest";
import worker from "../index";
import type { Env } from "../index";

// ---------------------------------------------------------------------------
// Mock Environment
// ---------------------------------------------------------------------------
const mockEnv: Env = {
  ASSETS: {
    fetch: ((request: Request) =>
      Promise.resolve(
        new Response(`Asset: ${new URL(request.url).pathname}`, {
          status: 200,
        }),
      )) as typeof fetch,
  },
  DB: {
    prepare: () => ({ bind: () => ({ all: () => Promise.resolve({ results: [] }), first: () => Promise.resolve(null), run: () => Promise.resolve({}) }) }),
    exec: () => Promise.resolve({}),
  } as unknown as D1Database,
};

// ---------------------------------------------------------------------------
// Helper: create Request
// ---------------------------------------------------------------------------
function makeRequest(path: string, method = "GET", searchParams?: Record<string, string>): Request {
  const url = new URL(path, "https://example.com");
  if (searchParams) {
    for (const [k, v] of Object.entries(searchParams)) {
      url.searchParams.set(k, v);
    }
  }
  return new Request(url.toString(), { method });
}

// ---------------------------------------------------------------------------
// Worker: fetch handler
// ---------------------------------------------------------------------------
describe("Worker fetch handler", () => {
  describe("static asset fallback", () => {
    it("delegates non-API routes to ASSETS.fetch", async () => {
      const request = makeRequest("/");
      const response = await worker.fetch(request, mockEnv);
      const body = await response.text();
      expect(body).toContain("Asset: /");
    });

    it("delegates non-API subpaths to ASSETS.fetch", async () => {
      const request = makeRequest("/peptides/glutathione");
      const response = await worker.fetch(request, mockEnv);
      const body = await response.text();
      expect(body).toContain("Asset: /peptides/glutathione");
    });
  });

  describe("API: /api/health", () => {
    it("returns status ok with JSON", async () => {
      const request = makeRequest("https://example.com/api/health");
      const response = await worker.fetch(request, mockEnv);
      expect(response.status).toBe(200);
      const body = await response.json<{ status: string; timestamp: number }>();
      expect(body.status).toBe("ok");
      expect(body.timestamp).toBeTypeOf("number");
    });

    it("returns Content-Type application/json", async () => {
      const request = makeRequest("https://example.com/api/health");
      const response = await worker.fetch(request, mockEnv);
      expect(response.headers.get("Content-Type")).toBe("application/json");
    });

    it("includes CORS header", async () => {
      const request = makeRequest("https://example.com/api/health");
      const response = await worker.fetch(request, mockEnv);
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    });

    it("includes cache control header", async () => {
      const request = makeRequest("https://example.com/api/health");
      const response = await worker.fetch(request, mockEnv);
      expect(response.headers.get("Cache-Control")).toBe("public, max-age=3600");
    });
  });

  describe("API: /api/search", () => {
    it("returns rate limit response for search", async () => {
      const request = makeRequest("https://example.com/api/search", "GET", { q: "glutathione" });
      const response = await worker.fetch(request, mockEnv);
      expect(response.status).toBe(200);
      const body = await response.json<{ status: string; message: string }>();
      expect(body.status).toBe("ok");
    });
  });

  describe("API: unknown routes", () => {
    it("returns 404 for unknown API paths", async () => {
      const request = makeRequest("https://example.com/api/unknown");
      const response = await worker.fetch(request, mockEnv);
      expect(response.status).toBe(404);
      const body = await response.json<{ error: string }>();
      expect(body.error).toBe("Not found");
    });

    it("returns Content-Type json for 404", async () => {
      const request = makeRequest("https://example.com/api/unknown");
      const response = await worker.fetch(request, mockEnv);
      expect(response.headers.get("Content-Type")).toBe("application/json");
    });
  });
});
