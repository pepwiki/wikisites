import { z } from "zod";
import type { AppEnv } from "../types";
import { getAuthContext } from "../middleware/auth";
import { requireRole } from "../middleware/rbac";

const CreateCommentSchema = z.object({
  site: z.enum(["encp", "wiki"]),
  content: z.string().min(1).max(5000),
  parent_id: z.number().int().positive().optional(),
});

const UpdateCommentSchema = z.object({
  content: z.string().min(1).max(5000),
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

interface CommentRow {
  id: number;
  user_id: string;
  article_slug: string;
  site: string;
  content: string;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
}

export async function handleComments(
  request: Request,
  env: AppEnv,
): Promise<Response | null> {
  const url = new URL(request.url);

  const listMatch = url.pathname.match(/^\/api\/comments\/([^/]+)$/);
  const updateMatch = url.pathname.match(/^\/api\/comments\/(\d+)$/);

  if (request.method === "GET" && listMatch) {
    const articleSlug = listMatch[1];
    if (!articleSlug) return null;
    return handleListComments(request, env, articleSlug);
  }

  if (request.method === "POST" && listMatch) {
    const articleSlug = listMatch[1];
    if (!articleSlug) return null;
    return handleCreateComment(request, env, articleSlug);
  }

  if (request.method === "PUT" && updateMatch) {
    const id = updateMatch[1];
    if (!id) return null;
    return handleUpdateComment(request, env, id);
  }

  if (request.method === "DELETE" && updateMatch) {
    const id = updateMatch[1];
    if (!id) return null;
    return handleDeleteComment(request, env, id);
  }

  return null;
}

function buildCommentTree(comments: CommentRow[]): Array<CommentRow & { replies: Array<CommentRow & { replies: unknown[] }> }> {
  const map = new Map<number, CommentRow & { replies: Array<CommentRow & { replies: unknown[] }> }>();
  const roots: Array<CommentRow & { replies: Array<CommentRow & { replies: unknown[] }> }> = [];

  for (const comment of comments) {
    map.set(comment.id, { ...comment, replies: [] });
  }

  for (const comment of comments) {
    const node = map.get(comment.id);
    if (!node) continue;

    if (comment.parent_id !== null) {
      const parent = map.get(comment.parent_id);
      if (parent) {
        parent.replies.push(node);
      } else {
        roots.push(node);
      }
    } else {
      roots.push(node);
    }
  }

  return roots;
}

async function handleListComments(
  request: Request,
  env: AppEnv,
  articleSlug: string,
): Promise<Response> {
  const url = new URL(request.url);
  const site = url.searchParams.get("site");
  const threaded = url.searchParams.get("threaded") === "true";

  let query = "SELECT * FROM comments WHERE article_slug = ?";
  const bindings: unknown[] = [articleSlug];

  if (site) {
    query += " AND site = ?";
    bindings.push(site);
  }

  query += " ORDER BY created_at ASC";

  const stmt = env.DB.prepare(query).bind(...bindings);
  const result = await stmt.all<CommentRow>();

  if (threaded) {
    const tree = buildCommentTree(result.results);
    return jsonResponse({ comments: tree });
  }

  return jsonResponse({ comments: result.results });
}

async function handleCreateComment(
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

  const parsed = CreateCommentSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Validation failed", 400);
  }

  const { site, content, parent_id } = parsed.data;

  if (parent_id !== undefined) {
    const parent = await env.DB.prepare("SELECT id FROM comments WHERE id = ?")
      .bind(parent_id)
      .first<{ id: number }>();
    if (!parent) {
      return jsonError("Parent comment not found", 404);
    }
  }

  const result = await env.DB.prepare(
    "INSERT INTO comments (user_id, article_slug, site, content, parent_id) VALUES (?, ?, ?, ?, ?) RETURNING *",
  )
    .bind(auth.userId, articleSlug, site, content, parent_id ?? null)
    .first<CommentRow>();

  return jsonResponse({ comment: result }, 201);
}

async function handleUpdateComment(
  request: Request,
  env: AppEnv,
  id: string,
): Promise<Response> {
  const auth = await getAuthContext(request, env);
  if (auth instanceof Response) return auth;

  const existing = await env.DB.prepare("SELECT * FROM comments WHERE id = ?")
    .bind(id)
    .first<CommentRow>();

  if (!existing) {
    return jsonError("Comment not found", 404);
  }

  if (existing.user_id !== auth.userId) {
    return requireRole(auth, "moderator") ?? jsonError("Can only edit own comments", 403);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const parsed = UpdateCommentSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Validation failed", 400);
  }

  const result = await env.DB.prepare(
    "UPDATE comments SET content = ?, updated_at = datetime('now') WHERE id = ? RETURNING *",
  )
    .bind(parsed.data.content, id)
    .first<CommentRow>();

  return jsonResponse({ comment: result });
}

async function handleDeleteComment(
  request: Request,
  env: AppEnv,
  id: string,
): Promise<Response> {
  const auth = await getAuthContext(request, env);
  if (auth instanceof Response) return auth;

  const existing = await env.DB.prepare("SELECT * FROM comments WHERE id = ?")
    .bind(id)
    .first<CommentRow>();

  if (!existing) {
    return jsonError("Comment not found", 404);
  }

  const isOwner = existing.user_id === auth.userId;
  const roleError = requireRole(auth, isOwner ? "contributor" : "moderator");
  if (roleError) return roleError;

  await env.DB.prepare("DELETE FROM comments WHERE id = ?").bind(id).run();

  return jsonResponse({ deleted: true });
}
