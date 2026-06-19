import { z } from "zod";
import type { AppEnv } from "../types";
import { getAuthContext } from "../middleware/auth";
import { requireRole } from "../middleware/rbac";

const CreateAnnotationSchema = z.object({
  site: z.enum(["encp", "wiki"]),
  content: z.string().min(1).max(10000),
  position_selector: z.string().max(500).optional(),
});

const UpdateAnnotationSchema = z.object({
  content: z.string().min(1).max(10000).optional(),
  position_selector: z.string().max(500).optional(),
});

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

interface AnnotationRow {
  id: number;
  user_id: string;
  article_slug: string;
  site: string;
  content: string;
  position_selector: string | null;
  created_at: string;
  updated_at: string;
}

export async function handleAnnotations(
  request: Request,
  env: AppEnv,
): Promise<Response | null> {
  const url = new URL(request.url);

  const listMatch = url.pathname.match(/^\/api\/annotations\/([^/]+)$/);
  const updateMatch = url.pathname.match(/^\/api\/annotations\/(\d+)$/);

  if (request.method === "GET" && listMatch) {
    const articleSlug = listMatch[1];
    if (!articleSlug) return null;
    return handleListAnnotations(request, env, articleSlug);
  }

  if (request.method === "POST" && listMatch) {
    const articleSlug = listMatch[1];
    if (!articleSlug) return null;
    return handleCreateAnnotation(request, env, articleSlug);
  }

  if (request.method === "PUT" && updateMatch) {
    const id = updateMatch[1];
    if (!id) return null;
    return handleUpdateAnnotation(request, env, id);
  }

  if (request.method === "DELETE" && updateMatch) {
    const id = updateMatch[1];
    if (!id) return null;
    return handleDeleteAnnotation(request, env, id);
  }

  return null;
}

async function handleListAnnotations(
  request: Request,
  env: AppEnv,
  articleSlug: string,
): Promise<Response> {
  const url = new URL(request.url);
  const site = url.searchParams.get("site");

  let query = "SELECT * FROM annotations WHERE article_slug = ?";
  const bindings: unknown[] = [articleSlug];

  if (site) {
    query += " AND site = ?";
    bindings.push(site);
  }

  query += " ORDER BY created_at DESC";

  const stmt = env.DB.prepare(query).bind(...bindings);
  const result = await stmt.all<AnnotationRow>();

  return jsonResponse({ annotations: result.results });
}

async function handleCreateAnnotation(
  request: Request,
  env: AppEnv,
  articleSlug: string,
): Promise<Response> {
  const auth = await getAuthContext(request, env);
  if (auth instanceof Response) return auth;

  const roleError = requireRole(auth, "contributor");
  if (roleError) return roleError;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const parsed = CreateAnnotationSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Validation failed", 400);
  }

  const { site, content, position_selector } = parsed.data;

  const result = await env.DB.prepare(
    "INSERT INTO annotations (user_id, article_slug, site, content, position_selector) VALUES (?, ?, ?, ?, ?) RETURNING *",
  )
    .bind(auth.userId, articleSlug, site, content, position_selector ?? null)
    .first<AnnotationRow>();

  return jsonResponse({ annotation: result }, 201);
}

async function handleUpdateAnnotation(
  request: Request,
  env: AppEnv,
  id: string,
): Promise<Response> {
  const auth = await getAuthContext(request, env);
  if (auth instanceof Response) return auth;

  const existing = await env.DB.prepare("SELECT * FROM annotations WHERE id = ?")
    .bind(id)
    .first<AnnotationRow>();

  if (!existing) {
    return jsonError("Annotation not found", 404);
  }

  const isOwner = existing.user_id === auth.userId;
  const roleError = requireRole(auth, isOwner ? "contributor" : "moderator");
  if (roleError) return roleError;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const parsed = UpdateAnnotationSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Validation failed", 400);
  }

  const updates: string[] = [];
  const bindings: unknown[] = [];

  if (parsed.data.content !== undefined) {
    updates.push("content = ?");
    bindings.push(parsed.data.content);
  }
  if (parsed.data.position_selector !== undefined) {
    updates.push("position_selector = ?");
    bindings.push(parsed.data.position_selector);
  }

  if (updates.length === 0) {
    return jsonError("No fields to update", 400);
  }

  updates.push("updated_at = datetime('now')");
  bindings.push(id);

  const result = await env.DB.prepare(
    `UPDATE annotations SET ${updates.join(", ")} WHERE id = ? RETURNING *`,
  )
    .bind(...bindings)
    .first<AnnotationRow>();

  return jsonResponse({ annotation: result });
}

async function handleDeleteAnnotation(
  request: Request,
  env: AppEnv,
  id: string,
): Promise<Response> {
  const auth = await getAuthContext(request, env);
  if (auth instanceof Response) return auth;

  const existing = await env.DB.prepare("SELECT * FROM annotations WHERE id = ?")
    .bind(id)
    .first<AnnotationRow>();

  if (!existing) {
    return jsonError("Annotation not found", 404);
  }

  const isOwner = existing.user_id === auth.userId;
  const roleError = requireRole(auth, isOwner ? "contributor" : "admin");
  if (roleError) return roleError;

  await env.DB.prepare("DELETE FROM annotations WHERE id = ?").bind(id).run();

  return jsonResponse({ deleted: true });
}
