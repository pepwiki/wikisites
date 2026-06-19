interface PoolConfig {
  readonly timeoutMs: number;
  readonly maxRetries: number;
  readonly baseDelayMs: number;
}

const DEFAULT_CONFIG: PoolConfig = {
  timeoutMs: 10_000,
  maxRetries: 3,
  baseDelayMs: 100,
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function jsonResponse(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export class D1Pool {
  private readonly db: D1Database;
  private readonly config: PoolConfig;
  private readonly statementCache = new Map<string, D1PreparedStatement>();

  constructor(db: D1Database, config: Partial<PoolConfig> = {}) {
    this.db = db;
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  private getCachedStatement(sql: string): D1PreparedStatement {
    let stmt = this.statementCache.get(sql);
    if (!stmt) {
      stmt = this.db.prepare(sql);
      this.statementCache.set(sql, stmt);
      if (this.statementCache.size > 256) {
        const firstKey = this.statementCache.keys().next().value;
        if (firstKey !== undefined) {
          this.statementCache.delete(firstKey);
        }
      }
    }
    return stmt;
  }

  async queryFirst<T>(
    sql: string,
    ...bindings: unknown[]
  ): Promise<T | null> {
    return this.withRetry(async () => {
      const stmt = this.getCachedStatement(sql).bind(...bindings);
      return this.withTimeout(stmt.first<T>());
    });
  }

  async queryAll<T>(
    sql: string,
    ...bindings: unknown[]
  ): Promise<T[]> {
    return this.withRetry(async () => {
      const stmt = this.getCachedStatement(sql).bind(...bindings);
      const result = await this.withTimeout(stmt.all<T>());
      return result.results;
    });
  }

  async execute(
    sql: string,
    ...bindings: unknown[]
  ): Promise<D1ExecResult> {
    return this.withRetry(async () => {
      const stmt = this.getCachedStatement(sql).bind(...bindings);
      return this.withTimeout(stmt.run());
    });
  }

  async batch<T>(
    statements: D1PreparedStatement[],
  ): Promise<D1Result<T>[]> {
    return this.withRetry(() => {
      return this.withTimeout(this.db.batch<T>(statements));
    });
  }

  private async withTimeout<T>(promise: Promise<T>): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) =>
        setTimeout(
          () => reject(new Error(`Query timed out after ${this.config.timeoutMs}ms`)),
          this.config.timeoutMs,
        ),
      ),
    ]);
  }

  private async withRetry<T>(fn: () => Promise<T>): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        return await fn();
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));

        if (attempt < this.config.maxRetries) {
          const backoffMs = this.config.baseDelayMs * Math.pow(2, attempt);
          await delay(backoffMs);
        }
      }
    }

    throw lastError ?? new Error("Query failed after retries");
  }

  clearCache(): void {
    this.statementCache.clear();
  }
}

export function createPool(
  db: D1Database,
  config?: Partial<PoolConfig>,
): D1Pool {
  return new D1Pool(db, config);
}

export function errorResponse(error: string, status: number): Response {
  return jsonResponse({ error }, status);
}
