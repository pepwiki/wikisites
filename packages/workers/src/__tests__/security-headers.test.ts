import { describe, it, expect } from "vitest";
import { securityHeaders, withSecurityHeaders } from "../security/headers";

describe("securityHeaders", () => {
  it("returns Content-Security-Policy header", () => {
    const headers = securityHeaders();
    expect(headers["Content-Security-Policy"]).toBeDefined();
    expect(headers["Content-Security-Policy"]).toContain("default-src 'self'");
  });

  it("includes frame-ancestors none in CSP", () => {
    const headers = securityHeaders();
    expect(headers["Content-Security-Policy"]).toContain("frame-ancestors 'none'");
  });

  it("returns X-Content-Type-Options nosniff", () => {
    const headers = securityHeaders();
    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
  });

  it("returns X-Frame-Options DENY", () => {
    const headers = securityHeaders();
    expect(headers["X-Frame-Options"]).toBe("DENY");
  });

  it("returns Strict-Transport-Security with preload", () => {
    const headers = securityHeaders();
    expect(headers["Strict-Transport-Security"]).toContain("max-age=31536000");
    expect(headers["Strict-Transport-Security"]).toContain("includeSubDomains");
    expect(headers["Strict-Transport-Security"]).toContain("preload");
  });

  it("returns Referrer-Policy strict-origin-when-cross-origin", () => {
    const headers = securityHeaders();
    expect(headers["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
  });

  it("returns Permissions-Policy restricting camera, microphone, geolocation", () => {
    const headers = securityHeaders();
    expect(headers["Permissions-Policy"]).toContain("camera=()");
    expect(headers["Permissions-Policy"]).toContain("microphone=()");
    expect(headers["Permissions-Policy"]).toContain("geolocation=()");
  });
});

describe("withSecurityHeaders", () => {
  it("applies all security headers to a Response", () => {
    const original = new Response('{"status":"ok"}', {
      headers: { "Content-Type": "application/json" },
    });
    const wrapped = withSecurityHeaders(original);

    expect(wrapped.headers.get("Content-Security-Policy")).toBeDefined();
    expect(wrapped.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(wrapped.headers.get("X-Frame-Options")).toBe("DENY");
    expect(wrapped.headers.get("Strict-Transport-Security")).toBeDefined();
    expect(wrapped.headers.get("Content-Type")).toBe("application/json");
  });

  it("preserves response body", () => {
    const body = JSON.stringify({ test: true });
    const original = new Response(body);
    const wrapped = withSecurityHeaders(original);
    expect(wrapped.body).not.toBeNull();
  });
});
