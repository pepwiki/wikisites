/**
 * Simple in-memory rate limiter for Cloudflare Workers.
 * Uses a Map with TTL-based eviction.
 *
 * In production, replace with Cloudflare KV or D1 for distributed rate limiting.
 * Note: Module-level setInterval is not available in Cloudflare Workers runtime.
 * Eviction is handled lazily on each checkRateLimit call instead.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

/**
 * Lazily evict expired entries to avoid requiring setInterval.
 * Called on every rate limit check with bounded iteration.
 */
function evictExpired(now: number): void {
  if (store.size <= 64) return; // Skip eviction for small maps
  for (const [key, entry] of store) {
    if (entry.resetAt < now) {
      store.delete(key);
    }
  }
}

export function checkRateLimit(
  key: string,
  config: RateLimitConfig = { windowMs: 60_000, maxRequests: 60 },
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  evictExpired(now);

  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    const resetAt = now + config.windowMs;
    store.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: config.maxRequests - 1, resetAt };
  }

  entry.count++;
  const remaining = Math.max(0, config.maxRequests - entry.count);
  return {
    allowed: entry.count <= config.maxRequests,
    remaining,
    resetAt: entry.resetAt,
  };
}
