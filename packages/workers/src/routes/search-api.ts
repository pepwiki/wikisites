import type { AppEnv } from "../types";

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

function jsonError(error: string, status: number): Response {
  return jsonResponse({ error }, status);
}

interface SearchResult {
  id: number;
  title: string;
  snippet: string;
  rank: number;
}

export async function handleSearchApi(
  request: Request,
  env: AppEnv,
): Promise<Response | null> {
  const url = new URL(request.url);

  if (url.pathname !== "/api/search" || request.method !== "GET") {
    return null;
  }

  const query = url.searchParams.get("q");
  if (!query || query.trim().length === 0) {
    return jsonError("Missing search query parameter 'q'", 400);
  }

  const limit = Math.min(
    Math.max(parseInt(url.searchParams.get("limit") ?? "20", 10) || 20, 1),
    100,
  );
  const offset = Math.max(parseInt(url.searchParams.get("offset") ?? "0", 10) || 0, 0);

  try {
    const sanitizedQuery = query.replace(/[^\w\s]/g, " ").trim();
    if (sanitizedQuery.length === 0) {
      return jsonResponse({ query, results: [], total: 0 });
    }

    const ftsQuery = sanitizedQuery
      .split(/\s+/)
      .filter((w) => w.length > 0)
      .map((w) => `"${w}"`)
      .join(" OR ");

    const result = await env.DB.prepare(
      `SELECT id, title, snippet(articles_fts, 1, '<mark>', '</mark>', '...', 32) as snippet,
              rank
       FROM articles_fts
       WHERE articles_fts MATCH ?
       ORDER BY rank
       LIMIT ? OFFSET ?`,
    )
      .bind(ftsQuery, limit, offset)
      .all<SearchResult>();

    const countResult = await env.DB.prepare(
      "SELECT COUNT(*) as count FROM articles_fts WHERE articles_fts MATCH ?",
    )
      .bind(ftsQuery)
      .first<{ count: number }>();

    return jsonResponse({
      query,
      results: result.results,
      total: countResult?.count ?? 0,
      limit,
      offset,
    });
  } catch {
    return jsonResponse({
      query,
      results: [],
      total: 0,
      message: "Search index not available",
    });
  }
}
