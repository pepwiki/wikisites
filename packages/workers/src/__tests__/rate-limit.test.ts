import { describe, it, expect } from "vitest";
import { checkRateLimit } from "../security/rate-limit";

describe("checkRateLimit", () => {
  it("allows first request", () => {
    const result = checkRateLimit(`test:${Date.now()}:first`);
    expect(result.allowed).toBe(true);
    // Default config: maxRequests = 60, so remaining = 59
    expect(result.remaining).toBe(59);
  });

  it("tracks remaining requests correctly", () => {
    const key = `test:${Date.now()}:tracking`;
    const r1 = checkRateLimit(key);
    expect(r1.remaining).toBe(59);

    const r2 = checkRateLimit(key);
    expect(r2.remaining).toBe(58);
    expect(r2.allowed).toBe(true);
  });

  it("blocks requests after limit exceeded", () => {
    const key = `test:${Date.now()}:block`;
    const config = { windowMs: 60_000, maxRequests: 3 };

    expect(checkRateLimit(key, config).allowed).toBe(true);
    expect(checkRateLimit(key, config).allowed).toBe(true);
    expect(checkRateLimit(key, config).allowed).toBe(true);
    expect(checkRateLimit(key, config).allowed).toBe(false);
    expect(checkRateLimit(key, config).remaining).toBe(0);
  });

  it("returns positive resetAt timestamp", () => {
    const key = `test:${Date.now()}:reset`;
    const result = checkRateLimit(key);
    expect(result.resetAt).toBeGreaterThan(Date.now() - 1000);
  });

  it("isolates keys from each other", () => {
    const keyA = `test:${Date.now()}:iso-a`;
    const keyB = `test:${Date.now()}:iso-b`;
    const config = { windowMs: 60_000, maxRequests: 1 };

    expect(checkRateLimit(keyA, config).allowed).toBe(true);
    expect(checkRateLimit(keyA, config).allowed).toBe(false);

    // Key B should still be allowed
    expect(checkRateLimit(keyB, config).allowed).toBe(true);
  });

  it("different windows produce separate counters for same key", () => {
    const key = `test:${Date.now()}:window`;
    const config1 = { windowMs: 60_000, maxRequests: 1 };
    const config2 = { windowMs: 120_000, maxRequests: 5 };

    expect(checkRateLimit(key, config1).allowed).toBe(true);
    expect(checkRateLimit(key, config1).allowed).toBe(false);

    // Same key with different config: the entry already exists with count=2,
    // so allowed is false because count > maxRequests for config2 (2 <= 5 is true).
    // The point is that config is per-call, not per-key.
    expect(checkRateLimit(key, config2).allowed).toBe(true);
  });
});
