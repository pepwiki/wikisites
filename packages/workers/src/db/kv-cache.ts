interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

declare global {
  // Cloudflare KV binding
  var CACHE: KVNamespace | undefined;
}

export class KVCache<T> {
  private kv: KVNamespace | undefined;
  private memoryFallback: Map<string, CacheEntry<T>> = new Map();

  constructor(kvNamespace?: KVNamespace) {
    this.kv = kvNamespace ?? (typeof CACHE !== "undefined" ? CACHE : undefined);
  }

  async get(key: string): Promise<T | null> {
    // Try KV first
    if (this.kv) {
      try {
        const raw = await this.kv.get(key, "json");
        if (raw === null) return null;
        const entry = raw as CacheEntry<T>;
        if (Date.now() > entry.expiresAt) {
          await this.kv.delete(key);
          return null;
        }
        return entry.value;
      } catch {
        // KV unavailable, fall through to memory
      }
    }

    // Memory fallback
    const entry = this.memoryFallback.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.memoryFallback.delete(key);
      return null;
    }
    return entry.value;
  }

  async set(key: string, value: T, ttlSeconds: number): Promise<void> {
    const entry: CacheEntry<T> = {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    };

    // Try KV first
    if (this.kv) {
      try {
        await this.kv.put(key, JSON.stringify(entry), {
          expirationTtl: ttlSeconds,
        });
        return;
      } catch {
        // KV unavailable, fall through to memory
      }
    }

    // Memory fallback
    this.memoryFallback.set(key, entry);
  }

  async delete(key: string): Promise<void> {
    if (this.kv) {
      try {
        await this.kv.delete(key);
      } catch {
        // KV unavailable
      }
    }
    this.memoryFallback.delete(key);
  }
}
