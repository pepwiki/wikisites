import type { AuthContext, AppEnv } from "../types";

function stringToBuffer(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

function bufferToBase64url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function base64urlToBuffer(base64url: string): Uint8Array {
  let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    stringToBuffer(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function signJWT(
  payload: Record<string, unknown>,
  secret: string,
  expiresInSec: number = 3600,
): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const fullPayload = { ...payload, iat: now, exp: now + expiresInSec };

  const headerB64 = bufferToBase64url(stringToBuffer(JSON.stringify(header)));
  const payloadB64 = bufferToBase64url(stringToBuffer(JSON.stringify(fullPayload)));
  const unsignedToken = `${headerB64}.${payloadB64}`;

  const key = await importKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, stringToBuffer(unsignedToken));
  const sigB64 = bufferToBase64url(signature);

  return `${unsignedToken}.${sigB64}`;
}

export async function verifyJWT(
  token: string,
  secret: string,
): Promise<Record<string, unknown> | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [headerB64, payloadB64, sigB64] = parts;
  if (!headerB64 || !payloadB64 || !sigB64) return null;

  const unsignedToken = `${headerB64}.${payloadB64}`;

  const key = await importKey(secret);
  const signature = base64urlToBuffer(sigB64);
  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    signature,
    stringToBuffer(unsignedToken),
  );

  if (!valid) return null;

  try {
    const payloadStr = atob(
      payloadB64.replace(/-/g, "+").replace(/_/g, "/"),
    );
    const payload = JSON.parse(payloadStr) as Record<string, unknown>;

    if (typeof payload.exp === "number" && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

function extractToken(request: Request): string | null {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) return null;
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") return null;
  return parts[1] ?? null;
}

function jsonResponse(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export async function getAuthContext(
  request: Request,
  env: Pick<AppEnv, "JWT_SECRET">,
): Promise<AuthContext | Response> {
  const secret = env.JWT_SECRET;
  if (!secret) {
    return jsonResponse({ error: "JWT_SECRET not configured" }, 500);
  }

  const token = extractToken(request);
  if (!token) {
    return jsonResponse({ error: "Missing authorization token" }, 401);
  }

  const payload = await verifyJWT(token, secret);
  if (!payload) {
    return jsonResponse({ error: "Invalid or expired token" }, 401);
  }

  const userId = typeof payload.sub === "string" ? payload.sub : null;
  const role = typeof payload.role === "string" ? payload.role : null;

  if (!userId || !role) {
    return jsonResponse({ error: "Invalid token payload" }, 401);
  }

  const validRoles = ["reader", "contributor", "moderator", "admin"] as const;
  if (!(validRoles as readonly string[]).includes(role)) {
    return jsonResponse({ error: "Invalid role in token" }, 401);
  }

  return { userId, role: role as AuthContext["role"] };
}

export async function optionalAuth(
  request: Request,
  env: Pick<AppEnv, "JWT_SECRET">,
): Promise<AuthContext | null> {
  const secret = env.JWT_SECRET;
  if (!secret) return null;

  const token = extractToken(request);
  if (!token) return null;

  const payload = await verifyJWT(token, secret);
  if (!payload) return null;

  const userId = typeof payload.sub === "string" ? payload.sub : null;
  const role = typeof payload.role === "string" ? payload.role : null;

  if (!userId || !role) return null;

  const validRoles = ["reader", "contributor", "moderator", "admin"] as const;
  if (!(validRoles as readonly string[]).includes(role)) return null;

  return { userId, role: role as AuthContext["role"] };
}
