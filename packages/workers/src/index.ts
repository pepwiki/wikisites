import { withSecurityHeaders, checkRateLimit } from "./security";

export interface Env {
  readonly ASSETS: { readonly fetch: typeof fetch };
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

async function handleApi(request: Request, _env: Env): Promise<Response> {
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

    return jsonResponse({
      status: "ok",
      message: "Search is handled client-side via Pagefind. This endpoint is for rate limiting only.",
    });
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
