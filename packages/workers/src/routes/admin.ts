import { z } from "zod";
import type { AppEnv } from "../types";
import { getAuthContext } from "../middleware/auth";
import { requireRole } from "../middleware/rbac";

const ValidateContentSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  site: z.enum(["encp", "wiki"]),
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

interface StatsResult {
  total_users: number;
  total_reviews: number;
  total_quizzes: number;
  total_annotations: number;
  total_comments: number;
}

export async function handleAdmin(
  request: Request,
  env: AppEnv,
): Promise<Response | null> {
  const url = new URL(request.url);

  if (url.pathname === "/api/admin/stats" && request.method === "GET") {
    return handleStats(request, env);
  }

  if (url.pathname === "/api/admin/content/validate" && request.method === "POST") {
    return handleValidateContent(request, env);
  }

  if (url.pathname === "/api/admin/backup" && request.method === "POST") {
    return handleBackup(request, env);
  }

  return null;
}

async function handleStats(
  request: Request,
  env: AppEnv,
): Promise<Response> {
  const auth = await getAuthContext(request, env);
  if (auth instanceof Response) return auth;

  const roleError = requireRole(auth, "admin");
  if (roleError) return roleError;

  const stats = await env.DB.prepare(
    `SELECT
       (SELECT COUNT(*) FROM users) AS total_users,
       (SELECT COUNT(*) FROM review_progress) AS total_reviews,
       (SELECT COUNT(*) FROM quiz_results) AS total_quizzes,
       (SELECT COUNT(*) FROM annotations) AS total_annotations,
       (SELECT COUNT(*) FROM comments) AS total_comments`,
  ).first<StatsResult>();

  return jsonResponse(stats ?? {});
}

interface ContentIssue {
  field: string;
  message: string;
}

function validateArticleContent(
  title: string,
  content: string,
): ContentIssue[] {
  const issues: ContentIssue[] = [];

  if (title.trim().length === 0) {
    issues.push({ field: "title", message: "Title cannot be empty" });
  }

  if (content.trim().length === 0) {
    issues.push({ field: "content", message: "Content cannot be empty" });
  }

  if (content.length > 500000) {
    issues.push({ field: "content", message: "Content exceeds maximum length of 500,000 characters" });
  }

  const scriptTagCount = (content.match(/<script/gi) ?? []).length;
  if (scriptTagCount > 0) {
    issues.push({ field: "content", message: "Content contains script tags" });
  }

  const linkCount = (content.match(/<a\s/gi) ?? []).length;
  if (linkCount > 50) {
    issues.push({ field: "content", message: "Content has too many links (>50)" });
  }

  return issues;
}

async function handleValidateContent(
  request: Request,
  env: AppEnv,
): Promise<Response> {
  const auth = await getAuthContext(request, env);
  if (auth instanceof Response) return auth;

  const roleError = requireRole(auth, "admin");
  if (roleError) return roleError;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const parsed = ValidateContentSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Validation failed", 400);
  }

  const { title, content, site } = parsed.data;
  const issues = validateArticleContent(title, content);

  return jsonResponse({
    valid: issues.length === 0,
    issues,
    site,
    word_count: content.split(/\s+/).filter((w) => w.length > 0).length,
  });
}

async function handleBackup(
  request: Request,
  env: AppEnv,
): Promise<Response> {
  const auth = await getAuthContext(request, env);
  if (auth instanceof Response) return auth;

  const roleError = requireRole(auth, "admin");
  if (roleError) return roleError;

  const tables = [
    "users",
    "review_progress",
    "annotations",
    "quiz_results",
    "session_stats",
    "comments",
  ] as const;

  const backup: Record<string, unknown[]> = {};

  for (const table of tables) {
    try {
      const result = await env.DB.prepare(`SELECT * FROM ${table}`).all();
      backup[table] = result.results;
    } catch {
      backup[table] = [];
    }
  }

  return jsonResponse({
    backup,
    exported_at: new Date().toISOString(),
    tables: Object.keys(backup),
  });
}
