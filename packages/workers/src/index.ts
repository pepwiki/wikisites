import { withSecurityHeaders, checkRateLimit } from "./security";
import { runMigrations } from "./db/migrate";
import { handleAnnotations } from "./routes/annotations";
import { handleComments } from "./routes/comments";
import { handleProgress } from "./routes/progress";
import { handleSearchApi } from "./routes/search-api";
import { handleAdmin } from "./routes/admin";
import { handlePushNotifications } from "./routes/push-notifications";
import { handleHealthCheck } from "./routes/health-check";

export interface Env {
  readonly ASSETS: { readonly fetch: typeof fetch };
  readonly DB: D1Database;
  readonly JWT_SECRET?: string;
  readonly VAPID_PUBLIC_KEY?: string;
  readonly VAPID_PRIVATE_KEY?: string;
  readonly VAPID_SUBJECT?: string;
  readonly PUSH_SUBSCRIPTIONS: KVNamespace;
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

type RouteHandler = (request: Request, env: Env) => Promise<Response | null>;

const routeHandlers: RouteHandler[] = [
  handleAnnotations,
  handleComments,
  handleProgress,
  handleSearchApi,
  handleAdmin,
  handlePushNotifications,
  handleHealthCheck,
];

async function handleApi(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);

  // API Explorer (Scalar)
  if (url.pathname === "/api/explorer") {
    const explorerHtml = await import("./api/explorer.html", { type: "file" });
    return new Response(explorerHtml, {
      headers: { "Content-Type": "text/html;charset=utf-8" },
    });
  }

  // OpenAPI spec
  if (url.pathname === "/api/openapi.yaml") {
    const spec = await import("./api/openapi.yaml", { type: "file" });
    return new Response(spec, {
      headers: { "Content-Type": "text/yaml;charset=utf-8" },
    });
  }

  // Health check
  if (url.pathname === "/api/health") {
    return jsonResponse({ status: "ok", timestamp: Date.now() });
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
        (SELECT COUNT(*) FROM annotations) AS total_annotations,
        (SELECT COUNT(*) FROM comments) AS total_comments
    `,
    ).first();
    return jsonResponse(stats ?? {});
  }

  // Rate limiting for search
  if (url.pathname === "/api/search" && request.method === "GET") {
    const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
    const rateLimitResult = checkRateLimit(`search:${ip}`, {
      windowMs: 60_000,
      maxRequests: 30,
    });

    if (!rateLimitResult.allowed) {
      const response = jsonResponse({ error: "Rate limit exceeded. Try again later." }, 429);
      response.headers.set("X-RateLimit-Remaining", String(rateLimitResult.remaining));
      response.headers.set("X-RateLimit-Reset", String(Math.ceil(rateLimitResult.resetAt / 1000)));
      return response;
    }
  }

  // Delegate to route handlers
  for (const handler of routeHandlers) {
    const response = await handler(request, env);
    if (response !== null) {
      return response;
    }
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
