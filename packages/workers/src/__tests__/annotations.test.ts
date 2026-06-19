import { describe, it, expect } from "vitest";
import { handleAnnotations } from "../routes/annotations";
import { signJWT } from "../middleware/auth";
import type { AppEnv } from "../types";

const TEST_SECRET = "test-secret-for-annotations";

function makeToken(role: string = "contributor"): string {
  return signJWT({ sub: "user-1", role }, TEST_SECRET);
}

function makeEnv(dbOverrides: Record<string, unknown> = {}): AppEnv {
  return {
    ASSETS: {
      fetch: (() => Promise.resolve(new Response("ok"))) as typeof fetch,
    },
    DB: {
      prepare: (sql: string) => {
        const chain = {
          bind: (..._args: unknown[]) => ({
            first: async () => dbOverrides.first ?? null,
            all: async () => ({ results: dbOverrides.all ?? [] }),
            run: async () => ({}),
          }),
          first: async () => dbOverrides.first ?? null,
          all: async () => ({ results: dbOverrides.all ?? [] }),
          run: async () => ({}),
        };
        return chain;
      },
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

describe("Annotations Routes", () => {
  describe("GET /api/annotations/:articleId", () => {
    it("returns annotations for an article", async () => {
      const annotations = [
        { id: 1, user_id: "user-1", article_slug: "glutathione", site: "wiki", content: "Test note" },
      ];
      const env = makeEnv({ all: annotations });
      const request = makeRequest("/api/annotations/glutathione");
      const response = await handleAnnotations(request, env);
      expect(response).not.toBeNull();
      const body = await response!.json<{ annotations: unknown[] }>();
      expect(body.annotations).toHaveLength(1);
    });

    it("filters by site query param", async () => {
      const env = makeEnv({ all: [] });
      const request = makeRequest("/api/annotations/glutathione?site=encp");
      const response = await handleAnnotations(request, env);
      expect(response).not.toBeNull();
    });

    it("returns null for non-matching routes", async () => {
      const env = makeEnv();
      const request = makeRequest("/api/other/route");
      const response = await handleAnnotations(request, env);
      expect(response).toBeNull();
    });
  });

  describe("POST /api/annotations/:articleId", () => {
    it("creates an annotation when authenticated", async () => {
      const created = {
        id: 1,
        user_id: "user-1",
        article_slug: "glutathione",
        site: "wiki",
        content: "Important point",
        position_selector: null,
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z",
      };
      const env = makeEnv({ first: created });
      const token = await makeToken("contributor");
      const request = makeRequest(
        "/api/annotations/glutathione",
        "POST",
        { site: "wiki", content: "Important point" },
        token,
      );
      const response = await handleAnnotations(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(201);
      const body = await response!.json<{ annotation: { id: number } }>();
      expect(body.annotation.id).toBe(1);
    });

    it("returns 401 when not authenticated", async () => {
      const env = makeEnv();
      const request = makeRequest(
        "/api/annotations/glutathione",
        "POST",
        { site: "wiki", content: "Test" },
      );
      const response = await handleAnnotations(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(401);
    });

    it("returns 400 for invalid body", async () => {
      const env = makeEnv();
      const token = await makeToken();
      const request = makeRequest(
        "/api/annotations/glutathione",
        "POST",
        { site: "invalid" },
        token,
      );
      const response = await handleAnnotations(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(400);
    });

    it("returns 400 when content is empty", async () => {
      const env = makeEnv();
      const token = await makeToken();
      const request = makeRequest(
        "/api/annotations/glutathione",
        "POST",
        { site: "wiki", content: "" },
        token,
      );
      const response = await handleAnnotations(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(400);
    });
  });

  describe("PUT /api/annotations/:id", () => {
    it("updates own annotation", async () => {
      const existing = {
        id: 1,
        user_id: "user-1",
        article_slug: "glutathione",
        site: "wiki",
        content: "Old content",
      };
      const updated = { ...existing, content: "Updated content" };
      const env = makeEnv({ first: existing });
      const token = await makeToken("contributor");
      const request = makeRequest(
        "/api/annotations/1",
        "PUT",
        { content: "Updated content" },
        token,
      );

      // Override DB to return updated on second call
      let callCount = 0;
      env.DB.prepare = ((sql: string) => {
        callCount++;
        if (callCount === 1) {
          return {
            bind: () => ({ first: async () => existing }),
          };
        }
        return {
          bind: () => ({ first: async () => updated }),
        };
      }) as typeof env.DB.prepare;

      const response = await handleAnnotations(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(200);
    });

    it("returns 404 when annotation not found", async () => {
      const env = makeEnv({ first: null });
      const token = await makeToken();
      const request = makeRequest("/api/annotations/999", "PUT", { content: "Test" }, token);
      const response = await handleAnnotations(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(404);
    });
  });

  describe("DELETE /api/annotations/:id", () => {
    it("deletes own annotation", async () => {
      const existing = { id: 1, user_id: "user-1" };
      const env = makeEnv();
      env.DB.prepare = ((sql: string) => {
        if (sql.includes("DELETE")) {
          return { bind: () => ({ run: async () => ({}) }) };
        }
        return { bind: () => ({ first: async () => existing }) };
      }) as typeof env.DB.prepare;
      const token = await makeToken("contributor");
      const request = makeRequest("/api/annotations/1", "DELETE", undefined, token);
      const response = await handleAnnotations(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(200);
    });
  });
});
