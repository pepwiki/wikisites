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

  // Health check
  if (url.pathname === "/api/health") {
    return jsonResponse({ status: "ok", timestamp: Date.now() });
  }

  // Peptide search API
  if (url.pathname === "/api/search") {
    const query = url.searchParams.get("q") ?? "";
    return jsonResponse({
      query,
      results: [],
      total: 0,
      message: "Search index not yet built",
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
      return handleApi(request, env);
    }

    // Static assets via Cloudflare Pages
    return env.ASSETS.fetch(request);
  },
};
