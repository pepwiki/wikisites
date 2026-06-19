export type UserRole = "reader" | "contributor" | "moderator" | "admin";

export interface AuthContext {
  readonly userId: string;
  readonly role: UserRole;
}

export interface AppEnv {
  readonly ASSETS: { readonly fetch: typeof fetch };
  readonly DB: D1Database;
  readonly JWT_SECRET?: string;
}
