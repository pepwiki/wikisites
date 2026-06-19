import { describe, it, expect } from "vitest";
import { signJWT, verifyJWT, getAuthContext, optionalAuth } from "../middleware/auth";
import type { AppEnv } from "../types";

const TEST_SECRET = "test-secret-key-for-jwt-signing-operations";

function makeEnv(overrides: Partial<AppEnv> = {}): AppEnv {
  return {
    ASSETS: {
      fetch: (() => Promise.resolve(new Response("ok"))) as typeof fetch,
    },
    DB: {
      prepare: () => ({
        bind: () => ({
          first: async () => null,
          run: async () => ({}),
          all: async () => ({ results: [] }),
        }),
        first: async () => null,
        all: async () => ({ results: [] }),
      }),
      exec: async () => ({}),
      batch: async () => [],
    } as unknown as AppEnv["DB"],
    JWT_SECRET: TEST_SECRET,
    ...overrides,
  };
}

function makeAuthRequest(token?: string): Request {
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return new Request("https://example.com/api/test", { headers });
}

describe("JWT Auth Middleware", () => {
  describe("signJWT", () => {
    it("returns a valid JWT string", async () => {
      const token = await signJWT({ sub: "user1", role: "reader" }, TEST_SECRET);
      expect(token).toBeTypeOf("string");
      expect(token.split(".")).toHaveLength(3);
    });

    it("includes correct header algorithm", async () => {
      const token = await signJWT({ sub: "user1", role: "reader" }, TEST_SECRET);
      const headerB64 = token.split(".")[0] ?? "";
      const header = JSON.parse(atob(headerB64.replace(/-/g, "+").replace(/_/g, "/")));
      expect(header.alg).toBe("HS256");
      expect(header.typ).toBe("JWT");
    });

    it("includes expiration and issued-at claims", async () => {
      const token = await signJWT({ sub: "user1", role: "reader" }, TEST_SECRET);
      const payloadB64 = token.split(".")[1] ?? "";
      const payload = JSON.parse(atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/")));
      expect(payload.iat).toBeTypeOf("number");
      expect(payload.exp).toBeTypeOf("number");
      expect(payload.exp).toBeGreaterThan(payload.iat);
    });
  });

  describe("verifyJWT", () => {
    it("verifies a valid token", async () => {
      const token = await signJWT({ sub: "user1", role: "admin" }, TEST_SECRET);
      const payload = await verifyJWT(token, TEST_SECRET);
      expect(payload).not.toBeNull();
      expect(payload?.sub).toBe("user1");
      expect(payload?.role).toBe("admin");
    });

    it("rejects token with wrong secret", async () => {
      const token = await signJWT({ sub: "user1", role: "reader" }, TEST_SECRET);
      const payload = await verifyJWT(token, "wrong-secret");
      expect(payload).toBeNull();
    });

    it("rejects malformed token", async () => {
      const payload = await verifyJWT("not.a.valid.token", TEST_SECRET);
      expect(payload).toBeNull();
    });

    it("rejects empty token", async () => {
      const payload = await verifyJWT("", TEST_SECRET);
      expect(payload).toBeNull();
    });

    it("rejects token with only two parts", async () => {
      const payload = await verifyJWT("header.payload", TEST_SECRET);
      expect(payload).toBeNull();
    });

    it("rejects expired token", async () => {
      const token = await signJWT({ sub: "user1", role: "reader" }, TEST_SECRET, -1);
      const payload = await verifyJWT(token, TEST_SECRET);
      expect(payload).toBeNull();
    });
  });

  describe("getAuthContext", () => {
    it("returns 401 when no Authorization header", async () => {
      const env = makeEnv();
      const request = makeAuthRequest();
      const result = await getAuthContext(request, env);
      expect(result).toBeInstanceOf(Response);
      expect((result as Response).status).toBe(401);
    });

    it("returns 401 for invalid token format", async () => {
      const env = makeEnv();
      const request = makeAuthRequest("invalid-token");
      const result = await getAuthContext(request, env);
      expect(result).toBeInstanceOf(Response);
      expect((result as Response).status).toBe(401);
    });

    it("returns AuthContext for valid token", async () => {
      const env = makeEnv();
      const token = await signJWT({ sub: "user123", role: "contributor" }, TEST_SECRET);
      const request = makeAuthRequest(token);
      const result = await getAuthContext(request, env);
      expect(result).not.toBeInstanceOf(Response);
      expect((result as { userId: string }).userId).toBe("user123");
      expect((result as { role: string }).role).toBe("contributor");
    });

    it("returns 500 when JWT_SECRET is not configured", async () => {
      const env = makeEnv({ JWT_SECRET: undefined });
      const token = await signJWT({ sub: "user1", role: "reader" }, "any-secret");
      const request = makeAuthRequest(token);
      const result = await getAuthContext(request, env);
      expect(result).toBeInstanceOf(Response);
      expect((result as Response).status).toBe(500);
    });

    it("rejects token with invalid role", async () => {
      const env = makeEnv();
      const token = await signJWT({ sub: "user1", role: "superadmin" }, TEST_SECRET);
      const request = makeAuthRequest(token);
      const result = await getAuthContext(request, env);
      expect(result).toBeInstanceOf(Response);
      expect((result as Response).status).toBe(401);
    });
  });

  describe("optionalAuth", () => {
    it("returns null when no token provided", async () => {
      const env = makeEnv();
      const request = makeAuthRequest();
      const result = await optionalAuth(request, env);
      expect(result).toBeNull();
    });

    it("returns null for invalid token", async () => {
      const env = makeEnv();
      const request = makeAuthRequest("bad-token");
      const result = await optionalAuth(request, env);
      expect(result).toBeNull();
    });

    it("returns AuthContext for valid token", async () => {
      const env = makeEnv();
      const token = await signJWT({ sub: "user456", role: "moderator" }, TEST_SECRET);
      const request = makeAuthRequest(token);
      const result = await optionalAuth(request, env);
      expect(result).not.toBeNull();
      expect(result?.userId).toBe("user456");
      expect(result?.role).toBe("moderator");
    });

    it("returns null when JWT_SECRET is missing", async () => {
      const env = makeEnv({ JWT_SECRET: undefined });
      const token = await signJWT({ sub: "user1", role: "reader" }, "any");
      const request = makeAuthRequest(token);
      const result = await optionalAuth(request, env);
      expect(result).toBeNull();
    });
  });
});
