import type { AuthContext, UserRole } from "../types";

const ROLE_HIERARCHY: Record<UserRole, number> = {
  reader: 0,
  contributor: 1,
  moderator: 2,
  admin: 3,
};

export const ROLE_PERMISSIONS: Record<UserRole, readonly string[]> = {
  reader: ["read:articles", "read:annotations", "read:comments"],
  contributor: [
    "read:articles",
    "read:annotations",
    "read:comments",
    "create:annotations",
    "update:own:annotations",
    "create:comments",
    "update:own:comments",
    "create:quiz_results",
  ],
  moderator: [
    "read:articles",
    "read:annotations",
    "read:comments",
    "create:annotations",
    "update:own:annotations",
    "update:any:annotations",
    "delete:own:annotations",
    "delete:any:annotations",
    "create:comments",
    "update:own:comments",
    "update:any:comments",
    "delete:own:comments",
    "delete:any:comments",
    "create:quiz_results",
  ],
  admin: [
    "read:articles",
    "read:annotations",
    "read:comments",
    "create:annotations",
    "update:own:annotations",
    "update:any:annotations",
    "delete:own:annotations",
    "delete:any:annotations",
    "create:comments",
    "update:own:comments",
    "update:any:comments",
    "delete:own:comments",
    "delete:any:comments",
    "create:quiz_results",
    "manage:users",
    "manage:stats",
    "manage:backup",
    "validate:content",
  ],
} as const;

function jsonResponse(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export function hasRole(auth: AuthContext, minRole: UserRole): boolean {
  return ROLE_HIERARCHY[auth.role] >= ROLE_HIERARCHY[minRole];
}

export function requireRole(
  auth: AuthContext | null,
  minRole: UserRole,
): Response | null {
  if (!auth) {
    return jsonResponse({ error: "Authentication required" }, 401);
  }
  if (!hasRole(auth, minRole)) {
    return jsonResponse(
      { error: `Requires ${minRole} role or higher` },
      403,
    );
  }
  return null;
}

export function hasPermission(auth: AuthContext, permission: string): boolean {
  const perms = ROLE_PERMISSIONS[auth.role];
  return perms.includes(permission);
}
