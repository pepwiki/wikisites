import { z } from "zod";
import type { AppEnv } from "../types";
import { getAuthContext } from "../middleware/auth";
import { requireRole } from "../middleware/rbac";

interface PushEnv extends AppEnv {
  readonly VAPID_PUBLIC_KEY?: string;
  readonly VAPID_PRIVATE_KEY?: string;
  readonly VAPID_SUBJECT?: string;
  readonly PUSH_SUBSCRIPTIONS: KVNamespace;
}

const SubscribeSchema = z.object({
  endpoint: z.string().url(),
  keys: z.object({
    p256dh: z.string().min(1),
    auth: z.string().min(1),
  }),
});

const SendSchema = z.object({
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(1000),
  url: z.string().url().optional(),
  userIds: z.array(z.string()).optional(),
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

interface PushSubscription {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  userId: string;
  createdAt: string;
}

async function storeSubscription(
  env: PushEnv,
  subscription: z.infer<typeof SubscribeSchema>,
  userId: string,
): Promise<void> {
  const record: PushSubscription = {
    endpoint: subscription.endpoint,
    keys: subscription.keys,
    userId,
    createdAt: new Date().toISOString(),
  };
  await env.PUSH_SUBSCRIPTIONS.put(
    `sub:${subscription.endpoint}`,
    JSON.stringify(record),
    { expirationTtl: 60 * 60 * 24 * 90 },
  );
}

async function removeSubscription(
  env: PushEnv,
  endpoint: string,
): Promise<boolean> {
  const existing = await env.PUSH_SUBSCRIPTIONS.get(`sub:${endpoint}`);
  if (!existing) return false;
  await env.PUSH_SUBSCRIPTIONS.delete(`sub:${endpoint}`);
  return true;
}

async function sendWebPush(
  subscription: PushSubscription,
  payload: string,
  _vapidPublicKey: string,
  _vapidPrivateKey: string,
  _vapidSubject: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(subscription.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
        TTL: "86400",
      },
      body: payload,
    });

    if (!response.ok) {
      return { success: false, error: `Push failed: ${response.status}` };
    }
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: message };
  }
}

export async function handlePushNotifications(
  request: Request,
  env: PushEnv,
): Promise<Response | null> {
  const url = new URL(request.url);

  if (url.pathname === "/api/push/subscribe" && request.method === "POST") {
    return handleSubscribe(request, env);
  }

  if (url.pathname === "/api/push/unsubscribe" && request.method === "POST") {
    return handleUnsubscribe(request, env);
  }

  if (url.pathname === "/api/push/send" && request.method === "POST") {
    return handleSend(request, env);
  }

  return null;
}

async function handleSubscribe(
  request: Request,
  env: PushEnv,
): Promise<Response> {
  const auth = await getAuthContext(request, env);
  if (auth instanceof Response) return auth;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const parsed = SubscribeSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Validation failed", 400);
  }

  await storeSubscription(env, parsed.data, auth.userId);

  return jsonResponse({ status: "subscribed" }, 201);
}

async function handleUnsubscribe(
  request: Request,
  env: PushEnv,
): Promise<Response> {
  const auth = await getAuthContext(request, env);
  if (auth instanceof Response) return auth;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const parsed = z.object({ endpoint: z.string().url() }).safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Validation failed", 400);
  }

  const removed = await removeSubscription(env, parsed.data.endpoint);
  if (!removed) {
    return jsonError("Subscription not found", 404);
  }

  return jsonResponse({ status: "unsubscribed" });
}

async function handleSend(
  request: Request,
  env: PushEnv,
): Promise<Response> {
  const auth = await getAuthContext(request, env);
  if (auth instanceof Response) return auth;

  const roleError = requireRole(auth, "admin");
  if (roleError) return roleError;

  if (!env.VAPID_PUBLIC_KEY || !env.VAPID_PRIVATE_KEY || !env.VAPID_SUBJECT) {
    return jsonError("VAPID keys not configured", 500);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const parsed = SendSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(parsed.error.issues[0]?.message ?? "Validation failed", 400);
  }

  const { title, body: msgBody, url: msgUrl, userIds } = parsed.data;

  const listResult = await env.PUSH_SUBSCRIPTIONS.list({ prefix: "sub:" });
  let subscriptions: PushSubscription[] = [];

  for (const key of listResult.keys) {
    if (!key.name) continue;
    const raw = await env.PUSH_SUBSCRIPTIONS.get(key.name);
    if (!raw) continue;
    const sub = JSON.parse(raw) as PushSubscription;
    if (userIds && userIds.length > 0) {
      if (userIds.includes(sub.userId)) {
        subscriptions.push(sub);
      }
    } else {
      subscriptions.push(sub);
    }
  }

  const payload = JSON.stringify({
    title,
    body: msgBody,
    url: msgUrl ?? "/",
  });

  let sent = 0;
  let failed = 0;

  for (const sub of subscriptions) {
    const result = await sendWebPush(
      sub,
      payload,
      env.VAPID_PUBLIC_KEY,
      env.VAPID_PRIVATE_KEY,
      env.VAPID_SUBJECT,
    );
    if (result.success) {
      sent++;
    } else {
      failed++;
      if (result.error?.includes("404") || result.error?.includes("410")) {
        await removeSubscription(env, sub.endpoint);
      }
    }
  }

  return jsonResponse({ sent, failed, total: subscriptions.length });
}
