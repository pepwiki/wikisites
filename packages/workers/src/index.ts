import { withSecurityHeaders, checkRateLimit } from "./security";
import { runMigrations } from "./db/migrate";

export interface Env {
  readonly ASSETS: { readonly fetch: typeof fetch };
  readonly DB: D1Database;
}

const JSON_HEADERS: Readonly<Record<string, string>> = Object.freeze({
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "public, max-age=3600",
});

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: JSON_HEADERS,
  });
}

async function handleApi(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);

  // Health check
  if (url.pathname === "/api/health") {
    return jsonResponse({ status: "ok", timestamp: Date.now() });
  }

  // Peptide search API
  if (url.pathname === "/api/search") {
    const query = url.searchParams.get("q") ?? "";
    const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
    const rateLimitResult = checkRateLimit(`search:${ip}`, {
      windowMs: 60_000,
      maxRequests: 30,
    });

    if (!rateLimitResult.allowed) {
      return jsonResponse({ error: "Rate limit exceeded. Try again later." }, 429);
    }

    const response = jsonResponse({
      query,
      results: [],
      total: 0,
      message: "Search index not yet built",
    });
    response.headers.set("X-RateLimit-Remaining", String(rateLimitResult.remaining));
    response.headers.set("X-RateLimit-Reset", String(Math.ceil(rateLimitResult.resetAt / 1000)));
    return response;
  }

  // Database migration endpoint
  if (url.pathname === "/api/migrate") {
    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405);
    }
    await runMigrations(env.DB);
    return jsonResponse({ status: "migrations applied" });
  }

  // Aggregate stats from D1
  if (url.pathname === "/api/stats") {
    const stats = await env.DB.prepare(
      `
      SELECT
        (SELECT COUNT(*) FROM users) AS total_users,
        (SELECT COUNT(*) FROM review_progress) AS total_reviews,
        (SELECT COUNT(*) FROM quiz_results) AS total_quizzes,
        (SELECT COUNT(*) FROM annotations) AS total_annotations
    `,
    ).first();
    return jsonResponse(stats ?? {});
  }

  // 404 for unknown API routes
  return jsonResponse({ error: "Not found" }, 404);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // API routes
    if (url.pathname.startsWith("/api/")) {
      return withSecurityHeaders(await handleApi(request, env));
    }

    // Static assets via Cloudflare Pages
    return withSecurityHeaders(await env.ASSETS.fetch(request));
  },
};
