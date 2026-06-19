---
document_id: SEC-TEST-001
title: "Comprehensive Security Test Plan"
version: "2.0.0"
date: "2026-06-19"
status: DRAFT
authors:
  - name: "Wikisites Security Team"
    role: "Primary Authors"
classification: "Internal — Phase 3 Security Engineering"
applicable_sites:
  - SHARED
  - ENCP
  - WIKI
abstract: >-
  Comprehensive security test plan covering static analysis, dynamic analysis,
  dependency scanning, penetration testing, fuzzing, CSP validation, and
  authentication/authorization testing for both encyclopeptide.com and wikipept.com.
  Version 2.0 adds test cases for Phase 2 components: Command Palette, Keyboard
  Shortcuts, Graph View, LaTeX Renderer, Regex Search (ReDoS), Comments, Annotations,
  User Accounts, MDX Editor, Plugin API, Theme Engine, and Settings Manager.
applicable_standards:
  - "OWASP ASVS 4.0"
  - "OWASP Top 10 2021"
  - "NIST SP 800-53 Rev. 5"
  - "PCI DSS v4.0 (where applicable)"
---

# Comprehensive Security Test Plan

**Document ID:** SEC-TEST-001
**Version:** 2.0.0
**Date:** 2026-06-19
**Status:** DRAFT
**Applicable Sites:** encyclopeptide.com, wikipept.com

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Test Strategy Overview](#2-test-strategy-overview)
3. [Static Application Security Testing (SAST)](#3-static-application-security-testing-sast)
4. [Dynamic Application Security Testing (DAST)](#4-dynamic-application-security-testing-dast)
5. [Dependency Scanning](#5-dependency-scanning)
6. [Penetration Testing Checklist](#6-penetration-testing-checklist)
7. [Fuzzing Strategy](#7-fuzzing-strategy)
8. [Content Security Policy Validation](#8-content-security-policy-validation)
9. [Authentication and Authorization Testing](#9-authentication-and-authorization-testing)
10. [Cryptographic Testing](#10-cryptographic-testing)
11. [API Security Testing](#11-api-security-testing)
12. [Client-Side Security Testing](#12-client-side-security-testing)
13. [Infrastructure Security Testing](#13-infrastructure-security-testing)
14. [Phase 2 Component Security Testing](#14-phase-2-component-security-testing)
15. [Test Environment and Tooling](#15-test-environment-and-tooling)
16. [Test Execution and Reporting](#16-test-execution-and-reporting)

---

## 1. Executive Summary

### 1.1 Purpose

This document defines the comprehensive security test plan for both wikisites. It covers all security testing activities from static analysis through penetration testing, providing executable test cases with pass/fail criteria aligned to OWASP ASVS 4.0, OWASP Top 10 2021, and NIST SP 800-53 Rev. 5. Version 2.0 adds dedicated test cases for all Phase 2 new components.

### 1.2 Scope

| Test Category | Tools | Frequency | Gate |
|--------------|-------|-----------|------|
| Static Analysis (SAST) | ESLint security, TypeScript strict | Every commit | CI/CD pipeline |
| Dynamic Analysis (DAST) | OWASP ZAP, Burp Suite | Weekly + pre-release | Security review |
| Dependency Scanning | npm audit, Snyk | Every build | CI/CD pipeline |
| Penetration Testing | Manual + automated | Quarterly | Security audit |
| Fuzzing | Custom + OWASP ZAP + property-based | Weekly | Automated |
| CSP Validation | Header audit | Every deployment | CI/CD pipeline |
| Auth/AuthZ Testing | Custom test suite | Every commit | CI/CD pipeline |
| **Phase 2 Component Testing** | **Custom + property-based** | **Every commit** | **CI/CD pipeline** |

---

## 2. Test Strategy Overview

### 2.1 Security Testing Pyramid

```
                    /\
                   /  \
                  / PT \        Penetration Testing (Quarterly, Manual)
                 /------\
                /  DAST  \     Dynamic Analysis (Weekly, Semi-automated)
               /----------\
              /    SAST    \   Static Analysis (Every commit, Automated)
             /--------------\
            /    Dependency   \ Dependency Scanning (Every build, Automated)
           /------------------\
          /     Unit Tests     \ Security Unit Tests (Every commit, Automated)
         /----------------------\
        /   Component Tests     \ Phase 2 Component Security (Every commit)
       /--------------------------\
```

### 2.2 Threat-Driven Test Coverage

| STRIDE Category | Test Methods | Coverage Target |
|----------------|-------------|-----------------|
| Spoofing | Auth testing, JWT validation, OAuth flow testing | 100% of auth endpoints |
| Tampering | XSS injection, SQL injection, CSRF testing, input validation | 100% of input points |
| Repudiation | Audit log verification, action attribution testing | 100% of state-changing operations |
| Information Disclosure | API response audit, data leakage testing, header analysis | 100% of API endpoints |
| Denial of Service | Rate limiting testing, resource exhaustion testing, ReDoS | 100% of public endpoints |
| Elevation of Privilege | RBAC testing, role escalation testing, IDOR testing | 100% of authorization checks |

---

## 3. Static Application Security Testing (SAST)

### 3.1 ESLint Security Rules

**Tool:** ESLint with security plugins
**Configuration:** `.eslintrc.security.js`
**Frequency:** Every commit (pre-commit hook + CI)

#### 3.1.1 Required ESLint Security Rules

| Rule | Description | Severity | OWASP Mapping |
|------|-------------|----------|---------------|
| `no-eval` | Prohibit eval() usage | Error | A03:2021 Injection |
| `no-implied-eval` | Prohibit implied eval | Error | A03:2021 Injection |
| `no-new-func` | Prohibit Function constructor | Error | A03:2021 Injection |
| `no-script-url` | Prohibit javascript: URLs | Error | A03:2021 Injection |
| `no-caller` | Prohibit arguments.caller | Error | A03:2021 Injection |
| `no-octal` | Prohibit octal literals | Error | A03:2021 Injection |
| `no-extend-native` | Prohibit native object extension | Error | A08:2021 Integrity |
| `no-global-assign` | Prohibit global variable mutation | Error | A08:2021 Integrity |
| `no-implicit-globals` | Prohibit implicit globals | Error | A05:2021 Misconfiguration |
| `no-labels` | Prohibit labels (anti-pattern) | Warning | Code quality |
| `no-proto` | Prohibit __proto__ | Error | A08:2021 Integrity |
| `no-void` | Prohibit void operator | Warning | Code quality |
| `no-with` | Prohibit with statement | Error | A03:2021 Injection |
| `radix` | Require radix parameter for parseInt | Error | A03:2021 Injection |

### 3.2 Custom Security Lint Rules

| Rule ID | Description | Pattern | Severity |
|---------|-------------|---------|----------|
| SEC-001 | No hardcoded secrets | `(password\|secret\|api[_-]?key\|token)\s*[:=]\s*['"`]` | Error |
| SEC-002 | No SQL string concatenation | `(SELECT\|INSERT\|UPDATE\|DELETE).*\+\s*[a-zA-Z]` | Error |
| SEC-003 | No innerHTML assignment | `\.innerHTML\s*=` | Error |
| SEC-004 | No document.write | `document\.write\(` | Error |
| SEC-005 | No eval-like functions | `(eval\|Function\|setTimeout\|setInterval)\s*\(` | Error |
| SEC-006 | No HTTP URLs in code | `http://[a-zA-Z]` (except localhost) | Warning |
| SEC-007 | No console.log in production | `console\.(log\|debug\|info)\(` | Warning |
| SEC-008 | DOMPurify required before innerHTML | `.innerHTML\s*=\s*(?!DOMPurify)` | Error |
| SEC-009 | JWT secret not in code | `JWT_SECRET\|SIGNING_KEY` in source | Error |
| SEC-010 | Parameterized query required | D1 `.prepare(` without `.bind(` | Error |
| SEC-011 | Web Worker postMessage origin check | `onmessage` without `origin` validation | Error |
| SEC-012 | No CSS expression() | `expression\(` in CSS/theme code | Error |
| SEC-013 | No CSS url() in theme tokens | `url\(` in ThemeTokens values | Error |
| SEC-014 | ReDoS pattern detection | Nested quantifiers `(a+)+` in regex source | Warning |

### 3.3 TypeScript Strict Mode Configuration

**tsconfig.json strict settings:**

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noPropertyAccessFromIndexSignature": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

---

## 4. Dynamic Application Security Testing (DAST)

### 4.1 OWASP ZAP Configuration

**Tool:** OWASP ZAP (Zed Attack Proxy)
**Mode:** Automated scan + manual verification
**Frequency:** Weekly automated + pre-release manual

### 4.2 DAST Test Cases

#### 4.2.1 XSS Test Cases

| Test ID | Description | Input | Expected Result | Severity |
|---------|-------------|-------|-----------------|----------|
| DAST-XSS-001 | Script tag in wiki content | `<script>alert(1)</script>` | Blocked by DOMPurify | Critical |
| DAST-XSS-002 | Event handler in wiki content | `<img onerror=alert(1) src=x>` | Blocked by DOMPurify | Critical |
| DAST-XSS-003 | javascript: URI in wiki content | `<a href="javascript:alert(1)">` | Blocked by DOMPurify | Critical |
| DAST-XSS-004 | SVG XSS in wiki content | `<svg onload=alert(1)>` | Blocked by DOMPurify | Critical |
| DAST-XSS-005 | Reflected XSS in search | `?q=<script>alert(1)</script>` | HTML-encoded in output | Critical |
| DAST-XSS-006 | Stored XSS in annotation | `<script>alert(1)</script>` | Sanitized on storage | Critical |
| DAST-XSS-007 | DOM XSS via URL hash | `#<script>alert(1)</script>` | Not rendered as HTML | High |
| DAST-XSS-008 | Template injection in MDX | `{{7*7}}` | Rendered as literal text | High |
| DAST-XSS-009 | CSS injection | `<style>body{background:red}</style>` | Blocked by DOMPurify | Medium |
| DAST-XSS-010 | Mutation XSS | `<noscript><p title="</noscript><script>alert(1)</script>">` | Blocked by DOMPurify | High |
| DAST-XSS-011 | MDX editor JSX injection (NEW) | Inject `<script>` via MDX editor | Blocked by MDX whitelist | Critical |
| DAST-XSS-012 | Comment body stored XSS (NEW) | `<img onerror=alert(1) src=x>` in comment | Blocked by DOMPurify | Critical |
| DAST-XSS-013 | Plugin postMessage XSS (NEW) | Forge postMessage with XSS payload | Blocked by origin check | High |
| DAST-XSS-014 | Annotation XPath injection (NEW) | Malicious XPath selector in annotation | XPath validation rejects | High |
| DAST-XSS-015 | LaTeX expression XSS (NEW) | `\href{javascript:alert(1)}{click}` | Blocked by KaTeX sanitization | Medium |
| DAST-XSS-016 | Regex search result XSS (NEW) | Pattern matching HTML in results | HTML-encoded output | Medium |

#### 4.2.2 SQL Injection Test Cases

| Test ID | Description | Input | Expected Result | Severity |
|---------|-------------|-------|-----------------|----------|
| DAST-SQLI-001 | Basic UNION injection | `' UNION SELECT * FROM users--` | Error or no data returned | Critical |
| DAST-SQLI-002 | Boolean-based blind | `' OR 1=1--` | No data leakage | Critical |
| DAST-SQLI-003 | Time-based blind | `' OR SLEEP(5)--` | No delay in response | Critical |
| DAST-SQLI-004 | Stacked queries | `'; DROP TABLE users;--` | Error, no table dropped | Critical |
| DAST-SQLI-005 | Error-based injection | `' AND 1=CONVERT(int,(SELECT @@version))--` | Generic error message | Critical |
| DAST-SQLI-006 | Second-order injection | User registration with `'` in username | Stored safely, not executed on login | Critical |
| DAST-SQLI-007 | D1 parameter binding | All API endpoints with DB queries | Parameterized queries only | Critical |

#### 4.2.3 CSRF Test Cases

| Test ID | Description | Method | Expected Result | Severity |
|---------|-------------|--------|-----------------|----------|
| DAST-CSRF-001 | Cross-origin POST to edit endpoint | POST /api/v1/pages/{slug}/edit | 403 Forbidden | High |
| DAST-CSRF-002 | Missing CSRF token | POST without CSRF header | 403 Forbidden | High |
| DAST-CSRF-003 | Invalid CSRF token | POST with invalid token | 403 Forbidden | High |
| DAST-CSRF-004 | Reused CSRF token | POST with used token | 403 Forbidden | High |
| DAST-CSRF-005 | SameSite cookie bypass | POST from cross-origin | Request blocked by cookie | High |
| DAST-CSRF-006 | Comment submission CSRF (NEW) | POST /api/v1/comments without token | 403 Forbidden | High |
| DAST-CSRF-007 | Annotation creation CSRF (NEW) | POST /api/v1/annotations without token | 403 Forbidden | High |
| DAST-CSRF-008 | MDX editor save CSRF (NEW) | POST /api/v1/pages/{slug}/edit without token | 403 Forbidden | High |
| DAST-CSRF-009 | Settings sync CSRF (NEW) | POST /api/v1/settings without token | 403 Forbidden | High |

---

## 5. Dependency Scanning

### 5.1 npm Audit Configuration

**Tool:** npm audit (built-in) + Snyk
**Frequency:** Every build (CI) + weekly full scan
**Fail threshold:** High severity or above

### 5.2 Dependency Scanning Test Cases

| Test ID | Description | Expected Result | Severity |
|---------|-------------|-----------------|----------|
| DEP-001 | pnpm audit on clean install | Zero high/critical findings | High |
| DEP-002 | Snyk test on clean install | Zero high/critical findings | High |
| DEP-003 | Lockfile integrity check | pnpm-lock.yaml matches package.json | High |
| DEP-004 | Deprecated package detection | No deprecated packages in production | Medium |
| DEP-005 | License compliance | No GPL-3.0 or AGPL-3.0 in production | Medium |
| DEP-006 | Unknown package detection | All packages from trusted registries | High |
| DEP-007 | Transitive dependency audit | No known vulnerabilities in transitive deps | High |
| DEP-008 | KaTeX vulnerability scan (NEW) | No known ReDoS or XSS in KaTeX | High |
| DEP-009 | TipTap/ProseMirror audit (NEW) | No known XSS in editor framework | High |
| DEP-010 | Yjs dependency audit (NEW) | No known vulnerabilities in CRDT lib | High |
| DEP-011 | DOMPurify version check (NEW) | Using latest patched version | High |

---

## 6. Penetration Testing Checklist

### 6.1 Pre-Engagement

| Item | Status | Notes |
|------|--------|-------|
| Scope document signed | | |
| Rules of engagement defined | | |
| Test accounts created | | |
| Staging environment isolated from production | | |
| Data backup completed | | |
| Incident response contacts identified | | |

### 6.2 Authentication Testing

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| PT-AUTH-001 | Brute-force login with common passwords | Account lockout after 5 attempts | |
| PT-AUTH-002 | Credential stuffing with leaked databases | Rate limiting + account lockout | |
| PT-AUTH-003 | Password spray (one password, many accounts) | Account lockout + alert | |
| PT-AUTH-004 | Session fixation | New session ID after login | |
| PT-AUTH-005 | Session hijacking via XSS | HttpOnly cookies prevent theft | |
| PT-AUTH-006 | JWT token manipulation | Signature verification rejects forged tokens | |
| PT-AUTH-007 | JWT token expiration | Expired tokens rejected | |
| PT-AUTH-008 | OAuth state parameter replay | State parameter rejected on replay | |
| PT-AUTH-009 | OAuth callback manipulation | Invalid state/callback rejected | |
| PT-AUTH-010 | Password reset flow | Secure token, expiration, single-use | |
| PT-AUTH-011 | Multi-factor authentication bypass | MFA required for admin actions | |
| PT-AUTH-012 | Session token in URL | No tokens in URLs | |

### 6.3 Authorization Testing

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| PT-AUTHZ-001 | IDOR on user profile (read other user) | 403 Forbidden | |
| PT-AUTHZ-002 | IDOR on user progress (read other user) | 403 Forbidden | |
| PT-AUTHZ-003 | IDOR on quiz session (access other user) | 403 Forbidden | |
| PT-AUTHZ-004 | IDOR on flashcard deck (access other user) | 403 Forbidden | |
| PT-AUTHZ-005 | Privilege escalation (contributor to moderator) | 403 Forbidden | |
| PT-AUTHZ-006 | Privilege escalation (contributor to admin) | 403 Forbidden | |
| PT-AUTHZ-007 | Access admin endpoint with contributor token | 403 Forbidden | |
| PT-AUTHZ-008 | Access moderator endpoint with contributor token | 403 Forbidden | |
| PT-AUTHZ-009 | Edit page without authentication | 401 Unauthorized | |
| PT-AUTHZ-010 | Delete page without admin role | 403 Forbidden | |
| PT-AUTHZ-011 | Bypass moderation queue | Queue enforced for rep < 10 | |
| PT-AUTHZ-012 | Access mastery-gated content without prerequisite | 403 Forbidden | |
| PT-AUTHZ-013 | Plugin access unauthorized capabilities (NEW) | 403 Forbidden | |
| PT-AUTHZ-014 | Theme override security-critical CSS (NEW) | Blocked by schema | |
| PT-AUTHZ-015 | Settings override server-only fields (NEW) | Stripped by validator | |

### 6.4 Input Validation Testing

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| PT-INPUT-001 | SQL injection on search endpoint | Parameterized queries, no injection | |
| PT-INPUT-002 | SQL injection on edit endpoint | Parameterized queries, no injection | |
| PT-INPUT-003 | XSS via wiki content | DOMPurify sanitization | |
| PT-INPUT-004 | XSS via annotations | DOMPurify sanitization | |
| PT-INPUT-005 | XSS via search parameters | HTML encoding | |
| PT-INPUT-006 | Path traversal in file upload | Filename sanitization | |
| PT-INPUT-007 | Oversized file upload | Size limit enforced | |
| PT-INPUT-008 | Invalid file type upload | Type validation enforced | |
| PT-INPUT-009 | NoSQL injection | Input validation | |
| PT-INPUT-010 | LDAP injection | Input validation | |
| PT-INPUT-011 | XML External Entity (XXE) | XML parsing restricted | |
| PT-INPUT-012 | Server-Side Request Forgery (SSRF) | URL validation + allowlist | |
| PT-INPUT-013 | Header injection | Header validation | |
| PT-INPUT-014 | HTTP response splitting | Output encoding | |
| PT-INPUT-015 | Prototype pollution | Object.freeze on prototype | |
| PT-INPUT-016 | ReDoS in regex search (NEW) | 4-layer defense, timeout | |
| PT-INPUT-017 | LaTeX expression injection (NEW) | Length limit, KaTeX sanitization | |
| PT-INPUT-018 | Settings import prototype pollution (NEW) | __proto__ rejected | |
| PT-INPUT-019 | Theme token CSS injection (NEW) | Zod schema validation | |
| PT-INPUT-020 | Plugin manifest tampering (NEW) | Schema validation, signature check | |

---

## 7. Fuzzing Strategy

### 7.1 Fuzzing Scope

| Target | Input Type | Fuzzer | Duration |
|--------|-----------|--------|----------|
| Search API | Query parameters | OWASP ZAP Fuzzer | 2 hours |
| Wiki Edit API | Content body | Custom + Burp Intruder | 4 hours |
| File Upload | File content | Custom fuzzer | 2 hours |
| API Endpoints | All parameters | OWASP ZAP + Turbo Intruder | 8 hours |
| URL Paths | Path segments | DirBuster + custom | 2 hours |
| HTTP Headers | All headers | OWASP ZAP | 1 hour |
| Regex Search Patterns (NEW) | Pattern strings | Custom + property-based | 4 hours |
| LaTeX Expressions (NEW) | Math expressions | Custom + property-based | 2 hours |
| Settings Import (NEW) | JSON files | Custom + AFL++ | 4 hours |
| Plugin postMessage (NEW) | Message objects | Custom fuzzer | 4 hours |

### 7.2 Property-Based Fuzzing (NEW)

Property-based testing generates random inputs to verify invariants hold across the entire input space.

#### 7.2.1 Regex Search Properties

```typescript
// Property: ReDoS defender never allows execution > 100ms
fc.assert(
  fc.property(
    fc.string({ minLength: 1, maxLength: 256 }),
    (pattern) => {
      const start = Date.now();
      const result = analyzePatternComplexity(pattern);
      const elapsed = Date.now() - start;
      // Complexity analysis itself must be fast
      expect(elapsed).toBeLessThan(50);
      // If pattern is accepted, execution must be safe
      if (result.safe) {
        const execStart = Date.now();
        try {
          new RegExp(pattern).test('test input string');
          const execElapsed = Date.now() - execStart;
          expect(execElapsed).toBeLessThan(100);
        } catch (e) {
          // Invalid regex is acceptable
        }
      }
    }
  ),
  { numRuns: 10000 }
);
```

#### 7.2.2 Settings Import Properties

```typescript
// Property: Imported settings never contain __proto__ pollution
fc.assert(
  fc.property(
    fc.jsonValue(),
    (input) => {
      const result = validateSettingsImport(input);
      if (result.success) {
        expect(result.settings).not.toHaveProperty('__proto__');
        expect(result.settings).not.toHaveProperty('constructor');
        expect(result.settings).not.toHaveProperty('prototype');
        // Verify prototype chain is intact
        expect(Object.getPrototypeOf(result.settings)).toBe(Object.prototype);
      }
    }
  ),
  { numRuns: 10000 }
);
```

#### 7.2.3 Theme Token Properties

```typescript
// Property: Theme tokens never contain url(), expression(), or behavior
fc.assert(
  fc.property(
    fc.record({
      'color-primary': fc.hexColor(),
      'font-sans': fc.constantFrom('Arial', 'Helvetica', 'sans-serif'),
      // ... other token fields
    }),
    (tokens) => {
      const result = validateThemeTokens(tokens);
      if (result.success) {
        for (const [key, value] of Object.entries(result.tokens)) {
          expect(String(value)).not.toMatch(/url\(/i);
          expect(String(value)).not.toMatch(/expression\(/i);
          expect(String(value)).not.toMatch(/behavior:/i);
          expect(String(value)).not.toMatch(/-moz-binding/i);
        }
      }
    }
  ),
  { numRuns: 10000 }
);
```

### 7.3 Fuzzing Payloads

#### 7.3.1 XSS Fuzzing Payloads

```
<script>alert(1)</script>
<img src=x onerror=alert(1)>
<svg onload=alert(1)>
<iframe src="javascript:alert(1)">
<body onload=alert(1)>
<input onfocus=alert(1) autofocus>
<marquee onstart=alert(1)>
<details open ontoggle=alert(1)>
<video><source onerror=alert(1)>
<audio src=x onerror=alert(1)>
```

#### 7.3.2 ReDoS Fuzzing Payloads (NEW)

```
(a+)+$
(a|a)+$
(a|aa)+$
(a|aaa)+$
(a|b|ab)+$
(a|b|ba)+$
(a|b|a)+$
(a|ab|b)+$
(a+b?)+$
(a|b?)+$
(a|b|c|ab)+$
(a|b|c|bc)+$
(a|b|c|abc)+$
((a|b)*(a|b)*b)*$
(a|b|ab)*$
```

#### 7.3.3 Settings Import Fuzzing Payloads (NEW)

```json
{"__proto__": {"polluted": true}}
{"constructor": {"prototype": {"polluted": true}}}
{"settings": {"__proto__": {"isAdmin": true}}}
{"theme": {"color-primary": "url(https://evil.com/steal)"}}
{"shortcuts": {"a".repeat(10000): "b"}}
{"version": 999999, "data": {}}
```

---

## 8. Content Security Policy Validation

### 8.1 CSP Directives

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{random}' 'strict-dynamic';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://api.wikipept.com https://api.encyclopeptide.com;
  media-src 'self';
  object-src 'none';
  child-src 'self';
  frame-src 'none';
  frame-ancestors 'none';
  form-action 'self';
  base-uri 'self';
  manifest-src 'self';
  worker-src 'self';
  prefetch-src 'self';
  upgrade-insecure-requests;
  block-all-mixed-content;
  report-uri /csp-report;
  report-to csp-endpoint;
```

### 8.2 CSP Test Cases

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| CSP-001 | CSP header present on all responses | Header present with correct directives | |
| CSP-002 | script-src blocks inline scripts | Inline script execution blocked | |
| CSP-003 | script-src blocks eval() | eval() execution blocked | |
| CSP-004 | script-src allows nonce-based scripts | Nonce-verified scripts execute | |
| CSP-005 | object-src 'none' blocks plugins | Plugin execution blocked | |
| CSP-006 | frame-src 'none' blocks iframes | iframe embedding blocked | |
| CSP-007 | frame-ancestors 'none' prevents framing | Site cannot be framed | |
| CSP-008 | form-action 'self' restricts form targets | Forms only submit to self | |
| CSP-009 | base-uri 'self' prevents base tag injection | Base tag injection blocked | |
| CSP-010 | connect-src restricts XHR/fetch | Only allowed origins connected | |
| CSP-011 | CSP violation reports generated | Reports sent to report-uri | |
| CSP-012 | upgrade-insecure-requests works | HTTP upgraded to HTTPS | |
| CSP-013 | block-all-mixed-content works | Mixed content blocked | |
| CSP-014 | worker-src 'self' blocks cross-origin Workers (NEW) | Plugin Workers same-origin only | |
| CSP-015 | Plugin Worker CSP inherits parent (NEW) | Plugin cannot bypass CSP | |

---

## 9. Authentication and Authorization Testing

### 9.1 Authentication Test Cases

| Test ID | Test Case | Input | Expected Result | Status |
|---------|-----------|-------|-----------------|--------|
| AUTH-001 | Valid login | Correct credentials | 200 + session token | |
| AUTH-002 | Invalid password | Wrong password | 401 Unauthorized | |
| AUTH-003 | Non-existent user | Unknown email | 401 Unauthorized (same as wrong password) | |
| AUTH-004 | Empty credentials | Empty body | 400 Bad Request | |
| AUTH-005 | SQL injection in login | `' OR 1=1--` | 401 Unauthorized | |
| AUTH-006 | XSS in login field | `<script>alert(1)</script>` | Input sanitized | |
| AUTH-007 | Brute force protection | 6 rapid login attempts | 429 Too Many Requests | |
| AUTH-008 | Account lockout | 5 failed attempts | Account locked for 15 minutes | |
| AUTH-009 | Session token format | Inspect token | JWT format, valid signature | |
| AUTH-010 | Session expiration | Wait 15 minutes | Token expired, 401 | |
| AUTH-011 | Refresh token flow | Use refresh token | New access token issued | |
| AUTH-012 | Refresh token reuse | Use same refresh token twice | Second use rejected | |
| AUTH-013 | Logout invalidates session | Logout then use token | 401 Unauthorized | |
| AUTH-014 | OAuth login flow | Initiate OAuth | Redirect to provider | |
| AUTH-015 | OAuth callback validation | Forge callback | Invalid state rejected | |
| AUTH-016 | OAuth token exchange | Valid code | Session created | |
| AUTH-017 | Password in transit | Monitor network | HTTPS only, no plaintext | |
| AUTH-018 | Token in storage | Check localStorage | HttpOnly cookie, not localStorage | |
| AUTH-019 | Concurrent sessions | Login twice | Both sessions valid | |
| AUTH-020 | Session fixation prevention | Check session ID pre/post login | Session ID changes after login | |

### 9.2 Authorization Test Cases

| Test ID | Test Case | Role | Target | Expected Result | Status |
|---------|-----------|------|--------|-----------------|--------|
| AUTHZ-001 | Read own profile | contributor | /api/v1/users/me | 200 OK | |
| AUTHZ-002 | Read other profile | contributor | /api/v1/users/{other} | 200 OK (public) or 403 | |
| AUTHZ-003 | Edit own wiki page | contributor | /api/v1/pages/{own}/edit | 200 OK (or 202 for queue) | |
| AUTHZ-004 | Edit other wiki page | contributor | /api/v1/pages/{other}/edit | 200 OK (or 202 for queue) | |
| AUTHZ-005 | Delete wiki page | contributor | /api/v1/pages/{slug} | 403 Forbidden | |
| AUTHZ-006 | Delete wiki page | moderator | /api/v1/pages/{slug} | 200 OK | |
| AUTHZ-007 | Approve moderation | contributor | /api/v1/moderation/approve | 403 Forbidden | |
| AUTHZ-008 | Approve moderation | moderator | /api/v1/moderation/approve | 200 OK | |
| AUTHZ-009 | Manage users | contributor | /api/v1/users/manage | 403 Forbidden | |
| AUTHZ-010 | Manage users | admin | /api/v1/users/manage | 200 OK | |

### 9.3 RBAC Permission Matrix

| Permission | Contributor | Reviewer | Moderator | Admin |
|-----------|-------------|----------|-----------|-------|
| page:create | Yes | Yes | Yes | Yes |
| page:edit | Yes | Yes | Yes | Yes |
| page:delete | No | No | Yes | Yes |
| page:review | No | Yes | Yes | Yes |
| quiz:create | Yes | Yes | Yes | Yes |
| quiz:moderate | No | No | Yes | Yes |
| annotation:create | Yes | Yes | Yes | Yes |
| annotation:moderate | No | No | Yes | Yes |
| comment:create | Yes | Yes | Yes | Yes |
| comment:moderate | No | No | Yes | Yes |
| plugin:install | Yes | Yes | Yes | Yes |
| plugin:publish | No | No | Yes | Yes |
| theme:install | Yes | Yes | Yes | Yes |
| theme:publish | No | No | Yes | Yes |
| settings:manage | Yes | Yes | Yes | Yes |
| user:manage | No | No | No | Yes |
| analytics:view | No | No | Yes | Yes |
| moderation:approve | No | No | Yes | Yes |
| moderation:reject | No | No | Yes | Yes |

---

## 10. Cryptographic Testing

### 10.1 JWT Security Tests

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| CRYPTO-001 | JWT uses strong algorithm | RS256 or ES256 (not HS256 with weak secret) | |
| CRYPTO-002 | JWT secret not in code | Secret in environment variable only | |
| CRYPTO-003 | JWT expiration enforced | Tokens expire after 15 minutes | |
| CRYPTO-004 | JWT signature verification | Forged signatures rejected | |
| CRYPTO-005 | JWT algorithm confusion | none algorithm rejected | |
| CRYPTO-006 | JWT kid header injection | kid parameter validated | |
| CRYPTO-007 | JWT jku header injection | jku parameter validated | |
| CRYPTO-008 | Refresh token rotation | Old refresh tokens rejected | |

---

## 11. API Security Testing

### 11.1 API Endpoint Security Matrix

| Endpoint | Method | Auth Required | Rate Limited | Input Validated | Output Sanitized |
|----------|--------|---------------|-------------|-----------------|------------------|
| /api/v1/peptides | GET | No | Yes (100/min) | Yes | Yes |
| /api/v1/peptides/{id} | GET | No | Yes (100/min) | Yes | Yes |
| /api/v1/pages/{slug}/edit | POST | Yes | Yes (300/min) | Yes | Yes |
| /api/v1/pages/{slug}/annotations | POST | Yes | Yes (300/min) | Yes | Yes |
| /api/v1/comments | POST | Yes | Yes (300/min) | Yes | Yes |
| /api/v1/auth/login | POST | No | Yes (10/min) | Yes | Yes |
| /api/v1/auth/refresh | POST | Yes | Yes (100/min) | Yes | Yes |
| /api/v1/settings/sync | POST | Yes | Yes (100/min) | Yes | Yes |
| /api/v1/plugins/install | POST | Yes | Yes (10/min) | Yes | Yes |
| /api/v1/themes/install | POST | Yes | Yes (10/min) | Yes | Yes |

---

## 12. Client-Side Security Testing

### 12.1 DOM-Based Security Tests

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| CLIENT-001 | DOMPurify applied to user content | All HTML sanitized before DOM insertion | |
| CLIENT-002 | No innerHTML with user data | innerHTML only with sanitized content | |
| CLIENT-003 | No document.write with user data | document.write not used | |
| CLIENT-004 | No eval with user data | eval not used | |
| CLIENT-005 | No setTimeout/setInterval with strings | Functions used instead of strings | |
| CLIENT-006 | No URL-based JavaScript execution | javascript: URIs blocked | |
| CLIENT-007 | localStorage does not contain tokens | HttpOnly cookies used | |
| CLIENT-008 | sessionStorage does not contain sensitive data | No tokens in sessionStorage | |
| CLIENT-009 | No prototype pollution | Object.freeze on shared prototypes | |
| CLIENT-010 | No postMessage without origin check | Event listeners validate origin | |
| CLIENT-011 | No dynamic import with user input | Import paths are static | |
| CLIENT-012 | No Service Worker cache poisoning | SW scope restricted | |
| CLIENT-013 | Plugin Worker isolated from DOM (NEW) | No DOM access from Worker | |
| CLIENT-014 | Plugin postMessage validated (NEW) | Origin + schema check on messages | |
| CLIENT-015 | Theme CSS applied safely (NEW) | CSS custom properties only | |
| CLIENT-016 | Regex search timeout enforced (NEW) | Execution killed after 100ms | |

---

## 13. Infrastructure Security Testing

### 13.1 Cloudflare Configuration Tests

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| INFRA-001 | SSL/TLS mode | Full (strict) | |
| INFRA-002 | Minimum TLS version | 1.2 | |
| INFRA-003 | WAF managed rules | Enabled | |
| INFRA-004 | Bot Fight Mode | Enabled | |
| INFRA-005 | Rate limiting rules | Configured (100/min unauth, 300/min auth) | |
| INFRA-006 | DNSSEC | Enabled | |
| INFRA-007 | Always Use HTTPS | Enabled | |
| INFRA-008 | Automatic HTTPS Rewrites | Enabled | |
| INFRA-009 | Security Level | Medium or High | |
| INFRA-010 | Browser Integrity Check | Enabled | |

---

## 14. Phase 2 Component Security Testing (NEW)

### 14.1 Command Palette Security Tests

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| CP-001 | XSS via command input | Command palette rejects HTML/script input | |
| CP-002 | Command injection via input | Only whitelisted commands executable | |
| CP-003 | Focus trap escape | Focus returns to main content on Escape | |
| CP-004 | Input history not persisted to server | History stored in localStorage only | |
| CP-005 | Keyboard shortcut collision | Conflict detection warns user | |

### 14.2 Keyboard Shortcuts Security Tests

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| KS-001 | Global keydown listener scope | Only active when command palette or shortcut mode enabled | |
| KS-002 | Shortcut remapping persistence | Only stored in localStorage, not sent to server | |
| KS-003 | Shortcut conflict with browser defaults | Critical browser shortcuts not overridden | |
| KS-004 | Shortcut input in form fields | Shortcuts disabled when input focused | |

### 14.3 Graph View Security Tests

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| GV-001 | Node count limit | Max 500 nodes enforced | |
| GV-002 | Edge count limit | Max 2000 edges enforced | |
| GV-003 | Graph data from build-time only | No user input in graph data | |
| GV-004 | Canvas click handler origin check | Click events from same origin only | |
| GV-005 | Memory usage with max-size graph | Within 50MB budget | |
| GV-006 | Force layout termination | Simulation stops within 300 iterations | |

### 14.4 LaTeX Renderer Security Tests

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| LATEX-001 | Expression length limit | Max 1000 characters enforced | |
| LATEX-002 | Render timeout | Execution killed after 500ms | |
| LATEX-003 | Malformed expression handling | Graceful error message, no crash | |
| LATEX-004 | XSS via LaTeX `\href` | javascript: URIs blocked by KaTeX | |
| LATEX-005 | XSS via LaTeX `\includegraphics` | File:// URIs blocked | |
| LATEX-006 | SSR rendering correctness | Build-time output matches expected | |

### 14.5 Regex Search Security Tests (CRITICAL)

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| REGEX-001 | Pattern length limit | Max 256 characters enforced | |
| REGEX-002 | Known ReDoS pattern `(a+)+$` | Timeout within 100ms | |
| REGEX-003 | Known ReDoS pattern `(a|a)+$` | Timeout within 100ms | |
| REGEX-004 | Known ReDoS pattern `(a|aa)+$` | Timeout within 100ms | |
| REGEX-005 | Known ReDoS pattern `(a|b|ab)+$` | Timeout within 100ms | |
| REGEX-006 | Nested quantifiers detection | redos-analyzer flags pattern | |
| REGEX-007 | Overlapping alternations detection | redos-analyzer flags pattern | |
| REGEX-008 | Execution timeout | RegExp.test() killed after 100ms | |
| REGEX-009 | Fallback to linear scan | Timeout triggers safe fallback | |
| REGEX-010 | Unicode pattern handling | No bypass via Unicode characters | |
| REGEX-011 | Browser responsiveness during search | UI remains interactive | |
| REGEX-012 | Property-based ReDoS invariant | All patterns execute within 100ms | |

### 14.6 Comments Security Tests

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| COMM-001 | XSS in comment body (custom store) | DOMPurify sanitization | |
| COMM-002 | CSRF on comment submission | CSRF token validated | |
| COMM-003 | Comment author spoofing | Author derived from JWT, not client | |
| COMM-004 | Rate limiting on comment creation | 10 comments/hour per user | |
| COMM-005 | Giscus iframe sandbox | iframe sandboxed, no parent access | |
| COMM-006 | Comment depth limit | Max nesting depth enforced | |
| COMM-007 | Spam detection | SpamGuard rate limiting active | |

### 14.7 Annotations Security Tests

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| ANNO-001 | XSS in annotation body | DOMPurify sanitization | |
| ANNO-002 | CSRF on annotation creation | CSRF token validated | |
| ANNO-003 | Annotation author spoofing | Author derived from JWT, not client | |
| ANNO-004 | XPath selector injection | XPath validated against whitelist | |
| ANNO-005 | Annotation visibility bypass | Visibility enforced server-side | |
| ANNO-006 | W3C data model compliance | Structured body, no raw HTML | |
| ANNO-007 | Annotation count limit per page | Max 100 annotations per page | |

### 14.8 User Accounts Security Tests

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| ACCT-001 | OAuth redirect URI validation | Only registered URIs accepted | |
| ACCT-002 | JWT token theft via XSS | HttpOnly cookies prevent access | |
| ACCT-003 | Session fixation | New session after login | |
| ACCT-004 | Role escalation via API | Server-side RBAC enforced | |
| ACCT-005 | Account enumeration | Same error for invalid email/password | |
| ACCT-006 | Passkey registration security | WebAuthn challenge validated | |
| ACCT-007 | GDPR data export | All user data included | |
| ACCT-008 | GDPR account deletion | All data removed from D1, KV, R2 | |

### 14.9 MDX Editor Security Tests

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| MDX-001 | Stored XSS via MDX output | MDX whitelist + DOMPurify | |
| MDX-002 | CSRF on editor save | CSRF token validated | |
| MDX-003 | Preview renderer isolation | Sandboxed iframe for preview | |
| MDX-004 | Collaboration WebSocket auth | JWT required for Yjs connection | |
| MDX-005 | Frontmatter injection | YAML parsed safely, no code exec | |
| MDX-006 | Version history attribution | Author from JWT, not client | |
| MDX-007 | Diff rendering XSS | Output encoded, not rendered as HTML | |

### 14.10 Plugin API Security Tests (CRITICAL)

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| PLUG-001 | DOM access from Worker | SecurityError thrown | |
| PLUG-002 | postMessage origin validation | Only same-origin messages accepted | |
| PLUG-003 | Capability escalation | Capabilities immutable after install | |
| PLUG-004 | Plugin crash isolation | Host continues unaffected | |
| PLUG-005 | Plugin memory limit | Worker killed at 16MB | |
| PLUG-006 | Plugin CPU time limit | Worker killed at 50ms per message | |
| PLUG-007 | Network exfiltration without capability | fetch blocked without network:fetch | |
| PLUG-008 | Plugin manifest tampering | Schema validation rejects | |
| PLUG-009 | Plugin bundle signing | Unsigned bundles rejected | |
| PLUG-010 | Plugin sandbox escape (fuzz) | No escape found in 10000 iterations | |
| PLUG-011 | Plugin storage isolation | Plugins cannot access other plugins' storage | |
| PLUG-012 | Plugin lifecycle audit logging | All events logged to D1 | |

### 14.11 Theme Engine Security Tests

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| THEME-001 | CSS expression() injection | Zod schema rejects | |
| THEME-002 | CSS url() data exfiltration | Zod schema rejects | |
| THEME-003 | CSS -moz-binding injection | Zod schema rejects | |
| THEME-004 | Theme cannot override security CSS | Focus indicators not overridable | |
| THEME-005 | Theme marketplace automated scan | Malicious CSS detected | |
| THEME-006 | Theme loading from same-origin | No cross-origin theme CSS | |
| THEME-007 | Dark/light mode toggle | System preference respected | |
| THEME-008 | Theme inheritance security | Plugin themes cannot escalate | |

### 14.12 Settings Manager Security Tests

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| SET-001 | Import __proto__ pollution | Key rejected by validator | |
| SET-002 | Import constructor pollution | Key rejected by validator | |
| SET-003 | Import prototype pollution | Key rejected by validator | |
| SET-004 | Server-only field override | Fields stripped on import | |
| SET-005 | Schema version migration | Old formats migrated safely | |
| SET-006 | Import size limit | Max 100KB enforced | |
| SET-007 | Settings sync CSRF | CSRF token validated | |
| SET-008 | Export sensitive data exclusion | No tokens/keys in export | |
| SET-009 | Conflict resolution safety | Deep merge does not pollute | |
| SET-010 | localStorage quota handling | Graceful degradation on full storage | |

### 14.13 Service Worker Security Tests

| Test ID | Test Case | Expected Result | Status |
|---------|-----------|-----------------|--------|
| SW-001 | SW registration same-origin only | Cross-origin registration blocked | |
| SW-002 | Cache versioning | Cache-busting hashes on assets | |
| SW-003 | Cache poisoning detection | Modified assets rejected | |
| SW-004 | SW scope restriction | Scope limited to origin | |
| SW-005 | Offline XSS prevention | Cached pages cannot execute injected scripts | |

---

## 15. Test Environment and Tooling

### 15.1 Required Tools

| Tool | Version | Purpose | License |
|------|---------|---------|---------|
| ESLint | Latest | Static analysis | MIT |
| @typescript-eslint/parser | Latest | TypeScript linting | BSD-2 |
| eslint-plugin-security | Latest | Security rules | Apache-2 |
| OWASP ZAP | Latest stable | DAST | Apache-2 |
| Burp Suite Professional | Latest | Penetration testing | Commercial |
| Snyk CLI | Latest | Dependency scanning | Free tier |
| npm audit | Built-in | Dependency auditing | MIT |
| Vitest | Latest | Unit testing | MIT |
| Playwright | Latest | E2E testing | Apache-2 |
| Lighthouse CI | Latest | Performance + security | Apache-2 |
| axe-core | Latest | Accessibility | MPL-2 |
| DOMPurify | Latest | HTML sanitization | Apache-2 |
| jsSHA | Latest | Hashing | BSD-3 |
| fast-check | Latest | Property-based testing | MIT |
| AFL++ | Latest | Binary fuzzing | Apache-2 |

---

## 16. Test Execution and Reporting

### 16.1 Test Execution Schedule

| Test Type | Frequency | Owner | Gate |
|-----------|-----------|-------|------|
| SAST (ESLint + TypeScript) | Every commit | Developer | CI/CD |
| Dependency scan (npm audit) | Every build | CI/CD | CI/CD |
| DAST (ZAP automated) | Weekly | Security Team | Report |
| Penetration test | Quarterly | External | Security audit |
| Fuzzing | Weekly | Security Team | Report |
| CSP validation | Every deployment | CI/CD | CI/CD |
| Auth/AuthZ tests | Every commit | Developer | CI/CD |
| Header audit | Every deployment | CI/CD | CI/CD |
| Phase 2 component tests | Every commit | Developer | CI/CD |
| Property-based tests | Every commit | Developer | CI/CD |

### 16.2 Defect Classification

| Severity | Description | SLA |
|----------|-------------|-----|
| Critical | Remote code execution, authentication bypass, SQL injection, ReDoS, sandbox escape | Fix within 24 hours |
| High | XSS, CSRF, IDOR, privilege escalation, plugin capability escalation | Fix within 7 days |
| Medium | Missing security headers, information disclosure, CSS injection | Fix within 30 days |
| Low | Verbose errors, missing best practices | Fix within 90 days |
| Informational | Code quality, optimization suggestions | Backlog |

---

**End of Document**
**Document Status:** DRAFT — Pending security review
**Owner:** Wikisites Security Team
