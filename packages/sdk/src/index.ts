// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface HealthResponse {
  readonly status: "ok";
  readonly timestamp: number;
}

export interface DetailedHealthResponse {
  readonly status: "ok" | "degraded" | "error";
  readonly timestamp: number;
  readonly checks: {
    readonly d1: ServiceCheck;
    readonly kv: ServiceCheck;
  };
}

export interface ServiceCheck {
  readonly status: "ok" | "error" | "skipped";
  readonly latencyMs?: number;
  readonly error?: string;
}

export interface SearchResult {
  readonly id: number;
  readonly title: string;
  readonly snippet: string;
  readonly rank: number;
}

export interface SearchResponse {
  readonly query: string;
  readonly results: readonly SearchResult[];
  readonly total: number;
  readonly limit: number;
  readonly offset: number;
}

export interface SearchOptions {
  readonly limit?: number;
  readonly offset?: number;
}

export interface Annotation {
  readonly id: number;
  readonly user_id: string;
  readonly article_slug: string;
  readonly site: string;
  readonly content: string;
  readonly position_selector: string | null;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface CreateAnnotationInput {
  readonly site: "encp" | "wiki";
  readonly content: string;
  readonly position_selector?: string;
}

export interface Comment {
  readonly id: number;
  readonly user_id: string;
  readonly article_slug: string;
  readonly site: string;
  readonly content: string;
  readonly parent_id: number | null;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface CreateCommentInput {
  readonly site: "encp" | "wiki";
  readonly content: string;
  readonly parent_id?: number;
}

export interface ReviewProgress {
  readonly id: number;
  readonly user_id: string;
  readonly site: string;
  readonly deck_id: string;
  readonly card_id: string;
  readonly difficulty: number;
  readonly stability: number;
  readonly elapsed_days: number;
  readonly scheduled_days: number;
  readonly repetitions: number;
  readonly lapses: number;
  readonly last_review: string;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface QuizHistoryEntry {
  readonly id: number;
  readonly user_id: string;
  readonly quiz_card_id: string;
  readonly site: string;
  readonly correct: number;
  readonly total: number;
  readonly time_ms: number | null;
  readonly completed_at: string;
}

export interface SessionStats {
  readonly total_reviews: number;
  readonly total_quizzes: number;
  readonly total_correct: number;
  readonly current_streak: number;
  readonly best_streak: number;
  readonly last_review_date: string | null;
}

export interface UserProgress {
  readonly review_progress: readonly ReviewProgress[];
  readonly quiz_history: readonly QuizHistoryEntry[];
  readonly session_stats: SessionStats;
}

export interface SyncProgressCard {
  readonly site: "encp" | "wiki";
  readonly deck_id: string;
  readonly card_id: string;
  readonly difficulty: number;
  readonly stability: number;
  readonly elapsed_days: number;
  readonly scheduled_days: number;
  readonly repetitions: number;
  readonly lapses: number;
  readonly last_review: string;
}

export interface SyncProgressInput {
  readonly cards: readonly SyncProgressCard[];
}

export interface QuizResultInput {
  readonly quiz_card_id: string;
  readonly site: "encp" | "wiki";
  readonly correct: number;
  readonly total: number;
  readonly time_ms?: number;
}

// ---------------------------------------------------------------------------
// Error
// ---------------------------------------------------------------------------

export class WikisitesAPIError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, message: string, body?: unknown) {
    super(message);
    this.name = "WikisitesAPIError";
    this.status = status;
    this.body = body;
  }
}

// ---------------------------------------------------------------------------
// MW Calculator
// ---------------------------------------------------------------------------

export { calculateMolecularWeight, calculateMolecularFormula } from "./mw-calculator";

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------

export interface WikisitesClientOptions {
  readonly baseUrl: string;
  readonly fetch?: typeof globalThis.fetch;
}

async function parseJsonBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

export class WikisitesClient {
  private readonly baseUrl: string;
  private readonly _fetch: typeof globalThis.fetch;

  constructor(options: WikisitesClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/+$/, "");
    this._fetch = options.fetch ?? globalThis.fetch;
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const response = await this._fetch(url, init);

    if (!response.ok) {
      const body = await parseJsonBody(response);
      const message =
        typeof body === "object" && body !== null && "error" in body
          ? String((body as Record<string, unknown>)["error"])
          : response.statusText;
      throw new WikisitesAPIError(response.status, message, body);
    }

    const text = await response.text();
    if (!text) return undefined as T;
    return JSON.parse(text) as T;
  }

  async health(): Promise<HealthResponse> {
    return this.request<HealthResponse>("/api/health");
  }

  async search(query: string, options?: SearchOptions): Promise<readonly SearchResult[]> {
    const params = new URLSearchParams({ q: query });
    if (options?.limit !== undefined) params.set("limit", String(options.limit));
    if (options?.offset !== undefined) params.set("offset", String(options.offset));
    const data = await this.request<SearchResponse>(`/api/search?${params.toString()}`);
    return data.results;
  }

  async getAnnotations(articleSlug: string): Promise<readonly Annotation[]> {
    const data = await this.request<{ readonly annotations: readonly Annotation[] }>(
      `/api/annotations/${encodeURIComponent(articleSlug)}`,
    );
    return data.annotations;
  }

  async createAnnotation(
    articleSlug: string,
    data: CreateAnnotationInput,
    token: string,
  ): Promise<Annotation> {
    const result = await this.request<{ readonly annotation: Annotation }>(
      `/api/annotations/${encodeURIComponent(articleSlug)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );
    return result.annotation;
  }

  async deleteAnnotation(id: number, token: string): Promise<void> {
    await this.request<unknown>(`/api/annotations/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getComments(articleSlug: string): Promise<readonly Comment[]> {
    const data = await this.request<{ readonly comments: readonly Comment[] }>(
      `/api/comments/${encodeURIComponent(articleSlug)}`,
    );
    return data.comments;
  }

  async createComment(
    articleSlug: string,
    data: CreateCommentInput,
    token: string,
  ): Promise<Comment> {
    const result = await this.request<{ readonly comment: Comment }>(
      `/api/comments/${encodeURIComponent(articleSlug)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );
    return result.comment;
  }

  async getProgress(token: string): Promise<UserProgress> {
    return this.request<UserProgress>("/api/progress", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async syncProgress(data: SyncProgressInput, token: string): Promise<void> {
    await this.request<unknown>("/api/progress/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  async recordQuiz(data: QuizResultInput, token: string): Promise<void> {
    await this.request<unknown>("/api/progress/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  async getDetailedHealth(): Promise<DetailedHealthResponse> {
    return this.request<DetailedHealthResponse>("/api/health/detailed");
  }

  async getApiSpec(): Promise<string> {
    const url = `${this.baseUrl}/api/openapi.yaml`;
    const response = await this._fetch(url);
    if (!response.ok) {
      throw new WikisitesAPIError(response.status, response.statusText);
    }
    return response.text();
  }
}
