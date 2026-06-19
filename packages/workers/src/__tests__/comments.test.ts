import { describe, it, expect } from "vitest";
import { handleComments } from "../routes/comments";
import { signJWT } from "../middleware/auth";
import type { AppEnv } from "../types";

const TEST_SECRET = "test-secret-for-comments";

function makeToken(role: string = "contributor"): string {
  return signJWT({ sub: "user-1", role }, TEST_SECRET);
}

function makeEnv(firstResult: unknown = null, allResults: unknown[] = []): AppEnv {
  return {
    ASSETS: {
      fetch: (() => Promise.resolve(new Response("ok"))) as typeof fetch,
    },
    DB: {
      prepare: () => ({
        bind: () => ({
          first: async () => firstResult,
          all: async () => ({ results: allResults }),
          run: async () => ({}),
        }),
        first: async () => firstResult,
        all: async () => ({ results: allResults }),
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

describe("Comments Routes", () => {
  describe("GET /api/comments/:articleId", () => {
    it("returns comments for an article", async () => {
      const comments = [
        { id: 1, user_id: "user-1", article_slug: "glutathione", site: "wiki", content: "Great article!", parent_id: null },
      ];
      const env = makeEnv(null, comments);
      const request = makeRequest("/api/comments/glutathione");
      const response = await handleComments(request, env);
      expect(response).not.toBeNull();
      const body = await response!.json<{ comments: unknown[] }>();
      expect(body.comments).toHaveLength(1);
    });

    it("returns threaded comments when threaded=true", async () => {
      const comments = [
        { id: 1, user_id: "user-1", article_slug: "test", site: "wiki", content: "Root", parent_id: null },
        { id: 2, user_id: "user-2", article_slug: "test", site: "wiki", content: "Reply", parent_id: 1 },
      ];
      const env = makeEnv(null, comments);
      const request = makeRequest("/api/comments/test?threaded=true");
      const response = await handleComments(request, env);
      expect(response).not.toBeNull();
      const body = await response!.json<{ comments: Array<{ replies: unknown[] }> }>();
      expect(body.comments).toHaveLength(1);
      expect(body.comments[0]?.replies).toHaveLength(1);
    });

    it("returns null for non-matching routes", async () => {
      const env = makeEnv();
      const request = makeRequest("/api/other");
      const response = await handleComments(request, env);
      expect(response).toBeNull();
    });
  });

  describe("POST /api/comments/:articleId", () => {
    it("creates a comment when authenticated", async () => {
      const created = {
        id: 1,
        user_id: "user-1",
        article_slug: "glutathione",
        site: "wiki",
        content: "Nice!",
        parent_id: null,
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z",
      };
      const env = makeEnv(created);
      const token = await makeToken();
      const request = makeRequest(
        "/api/comments/glutathione",
        "POST",
        { site: "wiki", content: "Nice!" },
        token,
      );
      const response = await handleComments(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(201);
    });

    it("returns 401 when not authenticated", async () => {
      const env = makeEnv();
      const request = makeRequest(
        "/api/comments/glutathione",
        "POST",
        { site: "wiki", content: "Test" },
      );
      const response = await handleComments(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(401);
    });

    it("returns 400 for invalid body", async () => {
      const env = makeEnv();
      const token = await makeToken();
      const request = makeRequest(
        "/api/comments/glutathione",
        "POST",
        { site: "invalid" },
        token,
      );
      const response = await handleComments(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(400);
    });

    it("creates a reply with parent_id", async () => {
      const created = {
        id: 2,
        user_id: "user-1",
        article_slug: "glutathione",
        site: "wiki",
        content: "Reply",
        parent_id: 1,
      };
      const parentExists = { id: 1 };
      const env = makeEnv();
      env.DB.prepare = ((sql: string) => {
        if (sql.includes("SELECT id FROM comments WHERE id")) {
          return { bind: () => ({ first: async () => parentExists }) };
        }
        return { bind: () => ({ first: async () => created }) };
      }) as typeof env.DB.prepare;

      const token = await makeToken();
      const request = makeRequest(
        "/api/comments/glutathione",
        "POST",
        { site: "wiki", content: "Reply", parent_id: 1 },
        token,
      );
      const response = await handleComments(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(201);
    });

    it("returns 404 when parent comment not found", async () => {
      const env = makeEnv(null);
      const token = await makeToken();
      const request = makeRequest(
        "/api/comments/glutathione",
        "POST",
        { site: "wiki", content: "Reply", parent_id: 999 },
        token,
      );
      const response = await handleComments(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(404);
    });
  });

  describe("PUT /api/comments/:id", () => {
    it("updates own comment", async () => {
      const existing = { id: 1, user_id: "user-1", content: "Old" };
      const updated = { id: 1, user_id: "user-1", content: "New" };
      const env = makeEnv();
      let callCount = 0;
      env.DB.prepare = (() => {
        callCount++;
        if (callCount === 1) {
          return { bind: () => ({ first: async () => existing }) };
        }
        return { bind: () => ({ first: async () => updated }) };
      }) as typeof env.DB.prepare;

      const token = await makeToken();
      const request = makeRequest("/api/comments/1", "PUT", { content: "New" }, token);
      const response = await handleComments(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(200);
    });

    it("returns 404 when comment not found", async () => {
      const env = makeEnv(null);
      const token = await makeToken();
      const request = makeRequest("/api/comments/999", "PUT", { content: "Test" }, token);
      const response = await handleComments(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(404);
    });

    it("returns 403 when updating another user's comment", async () => {
      const existing = { id: 1, user_id: "user-other", content: "Old" };
      const env = makeEnv(existing);
      const token = await makeToken("contributor");
      const request = makeRequest("/api/comments/1", "PUT", { content: "Hack" }, token);
      const response = await handleComments(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(403);
    });
  });

  describe("DELETE /api/comments/:id", () => {
    it("deletes own comment", async () => {
      const existing = { id: 1, user_id: "user-1" };
      const env = makeEnv();
      env.DB.prepare = ((sql: string) => {
        if (sql.includes("DELETE")) {
          return { bind: () => ({ run: async () => ({}) }) };
        }
        return { bind: () => ({ first: async () => existing }) };
      }) as typeof env.DB.prepare;

      const token = await makeToken();
      const request = makeRequest("/api/comments/1", "DELETE", undefined, token);
      const response = await handleComments(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(200);
    });

    it("returns 404 when comment not found", async () => {
      const env = makeEnv(null);
      const token = await makeToken();
      const request = makeRequest("/api/comments/999", "DELETE", undefined, token);
      const response = await handleComments(request, env);
      expect(response).not.toBeNull();
      expect(response!.status).toBe(404);
    });
  });
});
