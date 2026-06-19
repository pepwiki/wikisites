import type { AppEnv } from "../types";

interface HealthCheckResult {
  status: "ok" | "degraded" | "error";
  timestamp: number;
  checks: {
    d1: ServiceCheck;
    kv: ServiceCheck;
  };
}

interface ServiceCheck {
  status: "ok" | "error" | "skipped";
  latencyMs?: number;
  error?: string;
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store",
    },
  });
}

interface DetailedEnv extends AppEnv {
  readonly PUSH_SUBSCRIPTIONS?: KVNamespace;
}

async function checkD1(db: D1Database): Promise<ServiceCheck> {
  const start = Date.now();
  try {
    await db.prepare("SELECT 1").first();
    return { status: "ok", latencyMs: Date.now() - start };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { status: "error", latencyMs: Date.now() - start, error: message };
  }
}

async function checkKV(kv?: KVNamespace): Promise<ServiceCheck> {
  if (!kv) {
    return { status: "skipped" };
  }
  const start = Date.now();
  try {
    await kv.get("__health_check");
    return { status: "ok", latencyMs: Date.now() - start };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { status: "error", latencyMs: Date.now() - start, error: message };
  }
}

export async function handleHealthCheck(
  request: Request,
  env: DetailedEnv,
): Promise<Response | null> {
  const url = new URL(request.url);

  if (url.pathname === "/api/health/detailed" && request.method === "GET") {
    const [d1Check, kvCheck] = await Promise.all([
      checkD1(env.DB),
      checkKV(env.PUSH_SUBSCRIPTIONS),
    ]);

    const checks = { d1: d1Check, kv: kvCheck };
    const hasError = d1Check.status === "error" || kvCheck.status === "error";
    const hasSkipped = kvCheck.status === "skipped";

    let status: HealthCheckResult["status"];
    if (hasError) {
      status = "error";
    } else if (hasSkipped && d1Check.status === "ok") {
      status = "ok";
    } else if (d1Check.status === "ok" && kvCheck.status === "ok") {
      status = "ok";
    } else {
      status = "degraded";
    }

    const result: HealthCheckResult = {
      status,
      timestamp: Date.now(),
      checks,
    };

    return jsonResponse(result, status === "error" ? 503 : 200);
  }

  return null;
}
