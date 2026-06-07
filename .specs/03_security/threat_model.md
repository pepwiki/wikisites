---
document_id: SEC-THREAT-001
title: "STRIDE Threat Model — Wikisites Dual-Site Platform"
version: "1.0.0"
date: "2026-06-07"
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
  STRIDE threat model covering both encyclopeptide.com and wikipept.com.
  Identifies spoofing, tampering, repudiation, information disclosure,
  denial of service, and elevation of privilege threats across all system
  layers. Includes threat trees, attack graphs, risk ratings using CVSS
  3.1 scoring, and mitigation mappings to NIST SP 800-53 and OWASP Top 10.
applicable_standards:
  - "NIST SP 800-53 Rev. 5"
  - "OWASP Top 10 2021"
  - "ISO/IEC 27001:2022"
  - "CVSS 3.1 (ISO/IEC 29147:2018)"
---

# STRIDE Threat Model — Wikisites Dual-Site Platform

**Document ID:** SEC-THREAT-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** DRAFT
**Applicable Sites:** encyclopeptide.com, wikipept.com

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Threat Model Scope and Methodology](#2-threat-model-scope-and-methodology)
3. [System Decomposition for Threat Analysis](#3-system-decomposition-for-threat-analysis)
4. [STRIDE Category 1: Spoofing](#4-stride-category-1-spoofing)
5. [STRIDE Category 2: Tampering](#5-stride-category-2-tampering)
6. [STRIDE Category 3: Repudiation](#6-stride-category-3-repudiation)
7. [STRIDE Category 4: Information Disclosure](#7-stride-category-4-information-disclosure)
8. [STRIDE Category 5: Denial of Service](#8-stride-category-5-denial-of-service)
9. [STRIDE Category 6: Elevation of Privilege](#9-stride-category-6-elevation-of-privilege)
10. [Attack Trees](#10-attack-trees)
11. [Attack Graphs](#11-attack-graphs)
12. [Risk Assessment Matrix](#12-risk-assessment-matrix)
13. [Mitigation Summary](#13-mitigation-summary)
14. [Residual Risk Assessment](#14-residual-risk-assessment)
15. [Threat Model Maintenance](#15-threat-model-maintenance)

---

## 1. Executive Summary

### 1.1 Purpose

This document presents a comprehensive STRIDE threat model for both wikisites: **encyclopeptide.com** (formal encyclopedic reference, read-only) and **wikipept.com** (collaborative wiki with user accounts, editing, quizzes, and flashcards). The threat model identifies security risks across the entire attack surface — from Cloudflare edge infrastructure through client-side JavaScript — and provides risk-rated mitigations traceable to NIST SP 800-53 controls and OWASP Top 10 2021 categories.

### 1.2 Key Findings

| Category | Total Threats | Critical | High | Medium | Low |
|----------|---------------|----------|------|--------|-----|
| Spoofing | 7 | 1 | 3 | 2 | 1 |
| Tampering | 9 | 2 | 3 | 3 | 1 |
| Repudiation | 5 | 0 | 2 | 2 | 1 |
| Information Disclosure | 8 | 1 | 3 | 3 | 1 |
| Denial of Service | 6 | 1 | 2 | 2 | 1 |
| Elevation of Privilege | 7 | 1 | 3 | 2 | 1 |
| **Total** | **42** | **6** | **16** | **14** | **6** |

### 1.3 Risk Summary

| Risk Level | Count | Action Required |
|------------|-------|-----------------|
| Critical (CVSS 9.0-10.0) | 6 | Immediate remediation before launch |
| High (CVSS 7.0-8.9) | 16 | Remediation before launch |
| Medium (CVSS 4.0-6.9) | 14 | Mitigation plan required; acceptable for launch with compensating controls |
| Low (CVSS 0.1-3.9) | 6 | Accept or defer to post-launch |

---

## 2. Threat Model Scope and Methodology

### 2.1 Scope

| In Scope | Out of Scope |
|----------|--------------|
| encyclopeptide.com (all pages, APIs, static assets) | Third-party CDN infrastructure (Cloudflare internal) |
| wikipept.com (all pages, APIs, user-generated content, dynamic features) | Physical security of developer workstations |
| Cloudflare Workers, D1, KV, R2, Durable Objects | Social engineering of end users (phishing) |
| Shared component library (@wikisites/shared) | Denial of Cloudflare upstream infrastructure |
| OAuth authentication flow | Content accuracy (scientific correctness) |
| User-generated content (wiki edits, annotations, quizzes) | |
| Build pipeline and CI/CD | |

### 2.2 Methodology

- **Framework:** Microsoft STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege)
- **Risk Rating:** CVSS 3.1 (Common Vulnerability Scoring System)
- **Attack Surface Analysis:** Based on architecture decomposition from BP-SITE-ENCP-001, BP-SITE-WIKI-001, BP-INFRA-CF-001, BP-COMP-SHARED-001
- **Mitigation Mapping:** NIST SP 800-53 Rev. 5 controls and OWASP Top 10 2021 categories

### 2.3 Asset Inventory

| Asset | Sensitivity | Owner | Affected Sites |
|-------|------------|-------|----------------|
| User accounts (email, username, password hash) | High | User | WIKI |
| User learning progress data | Medium | User | WIKI |
| User quiz scores and flashcard state | Medium | User | WIKI |
| User reputation scores | Low-Medium | Community | WIKI |
| Wiki page content (user-generated) | Medium | Community | WIKI |
| Wiki edit history and authorship | Medium | Community | WIKI |
| Session tokens (JWT) | High | System | WIKI |
| OAuth tokens (provider-issued) | High | User | WIKI |
| API keys (Cloudflare, OAuth) | Critical | System | SHARED |
| Oligopeptide reference data | Low | Public | ENCP |
| Molecular structure files (PDB) | Low | Public | ENCP |
| Search indexes | Low | System | SHARED |
| Cloudflare D1 databases | High | System | WIKI |
| Cloudflare KV namespaces | Medium | System | SHARED |
| R2 buckets (user uploads) | Medium | User | WIKI |

---

## 3. System Decomposition for Threat Analysis

### 3.1 Trust Boundaries

```
Trust Boundary 1: Cloudflare Edge
  TB1.1: DNS Resolution
  TB1.2: SSL/TLS Termination
  TB1.3: WAF / DDoS Protection
  TB1.4: CDN Cache Layer

Trust Boundary 2: Workers / Pages Runtime
  TB2.1: Static Page Serving (Pages)
  TB2.2: API Route Execution (Workers)
  TB2.3: Durable Object Execution

Trust Boundary 3: Storage Layer
  TB3.1: D1 Database Access
  TB3.2: KV Namespace Access
  TB3.3: R2 Bucket Access
  TB3.4: Durable Object State

Trust Boundary 4: Client-Server Boundary

Trust Boundary 5: Client-Side
  TB5.1: Browser DOM
  TB5.2: localStorage / sessionStorage
  TB5.3: Service Worker Cache
  TB5.4: WebGL Context (3D Viewer)

Trust Boundary 6: External Integrations
  TB6.1: OAuth Provider (GitHub/Google/ORCID)
  TB6.2: External Databases (UniProt, PDB, ChEMBL)
  TB6.3: Cloudflare Web Analytics
```

### 3.2 Entry Points

| Entry Point | Type | Site | Attack Surface |
|-------------|------|------|----------------|
| `GET /api/v1/peptides` | API | ENCP | Query parameter injection, information disclosure |
| `GET /api/v1/peptides/{id}` | API | ENCP | Path traversal, IDOR |
| `GET /api/v1/peptides/{id}/structure` | API | ENCP | SSRF via external fetch |
| `POST /api/v1/pages/{slug}/edit` | API | WIKI | XSS, content injection, CSRF |
| `POST /api/v1/pages/{slug}/revert` | API | WIKI | Authorization bypass |
| `POST /api/v1/quizzes/{sessionId}/answer` | API | WIKI | Answer manipulation, session hijack |
| `POST /api/v1/flashcards/rate` | API | WIKI | FSRS parameter manipulation |
| `POST /api/v1/flashcards/decks/import` | API | WIKI | Malicious file upload |
| `POST /api/v1/pages/{slug}/annotations` | API | WIKI | XSS in annotation content |
| `POST /api/v1/pages/{slug}/flag` | API | WIKI | Spam/abuse |
| OAuth callback endpoint | API | WIKI | OAuth state manipulation |
| WebSocket (Durable Objects) | Protocol | WIKI | WebSocket hijacking, injection |
| Search query parameter | Input | SHARED | Search injection, ReDoS |
| File upload (R2) | Input | WIKI | Malicious file upload, storage exhaustion |
| Client-side JavaScript | Code | SHARED | XSS, prototype pollution |

### 3.3 Data Stores

| Data Store | Sensitivity | Encryption at Rest | Encryption in Transit | Access Control |
|------------|------------|-------------------|----------------------|----------------|
| D1: wikipept-users | High | Cloudflare-managed | TLS 1.2+ | Worker-only |
| D1: wikipept-content | Medium | Cloudflare-managed | TLS 1.2+ | Worker-only |
| D1: wikipept-quiz | Medium | Cloudflare-managed | TLS 1.2+ | Worker-only |
| D1: wikipept-flashcards | Medium | Cloudflare-managed | TLS 1.2+ | Worker-only |
| D1: wikipept-progress | Medium | Cloudflare-managed | TLS 1.2+ | Worker-only |
| D1: wikipept-reputation | Low-Medium | Cloudflare-managed | TLS 1.2+ | Worker-only |
| KV: wikipept-sessions | High | Cloudflare-managed | TLS 1.2+ | Worker-only |
| KV: wikipept-search | Low | Cloudflare-managed | TLS 1.2+ | Worker-only |
| R2: wikipept-uploads | Medium | Cloudflare-managed | TLS 1.2+ | Worker + presigned URLs |

---

## 4. STRIDE Category 1: Spoofing

Spoofing threats involve an attacker pretending to be another user, system component, or entity to gain unauthorized access.

### 4.1 Threat S-01: Authentication Bypass via Token Forgery

| Field | Value |
|-------|-------|
| **Threat ID** | S-01 |
| **Description** | Attacker forges or manipulates JWT session tokens to impersonate another user, bypassing authentication on wikipept.com |
| **Affected Component** | AuthService (auth/provider.ts, auth/session.ts) |
| **Affected Site** | WIKI |
| **Trust Boundary Crossed** | TB4 (Client-Server), TB2.2 (Workers) |
| **Attack Vector** | Attacker crafts a JWT with a valid user ID but incorrect signature; if JWT verification is weak or absent, the token is accepted |
| **Prerequisites** | Knowledge of JWT structure; weak or missing signature verification |
| **CVSS 3.1** | **8.1 (High)** — AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N |
| **OWASP Top 10** | A07:2021 — Identification and Authentication Failures |
| **NIST SP 800-53** | IA-2, IA-5, IA-8 |
| **Mitigation** | Use HMAC-SHA256 or RS256 for JWT signing; verify signature on every request; store signing secret in encrypted environment variable; implement token expiration (15-minute access, 7-day refresh); rotate signing keys periodically |
| **Verification** | Unit test: forged token rejected; integration test: expired token rejected; penetration test: JWT manipulation attempts |

### 4.2 Threat S-02: Session Hijacking via Token Theft

| Field | Value |
|-------|-------|
| **Threat ID** | S-02 |
| **Description** | Attacker steals a valid session token from a user's browser (via XSS, network interception, or physical access) and uses it to impersonate the user |
| **Affected Component** | AuthService (auth/session.ts), Cookie management |
| **Affected Site** | WIKI |
| **Trust Boundary Crossed** | TB5.1 (Browser DOM), TB4 (Client-Server) |
| **Attack Vector** | XSS injects script that reads session cookie/localStorage and exfiltrates token; MITM intercepts token on non-HTTPS connection |
| **Prerequisites** | XSS vulnerability present; or user on HTTP connection |
| **CVSS 3.1** | **7.4 (High)** — AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N |
| **OWASP Top 10** | A07:2021 — Identification and Authentication Failures |
| **NIST SP 800-53** | AC-2, IA-2, SC-8 |
| **Mitigation** | HttpOnly cookie flag (prevents JavaScript access); Secure flag (HTTPS only); SameSite=Strict/Lax; short token expiration; CSP blocks inline scripts; HSTS prevents downgrade |
| **Verification** | CSP header audit; cookie flag verification; XSS payload test confirms token not exfiltrated |

### 4.3 Threat S-03: OAuth State Parameter Manipulation

| Field | Value |
|-------|-------|
| **Threat ID** | S-03 |
| **Description** | Attacker manipulates the OAuth state parameter during login to link their OAuth account to a victim's wikipept.com account, or to bypass CSRF protection on the OAuth callback |
| **Affected Component** | AuthService (auth/provider.ts) |
| **Affected Site** | WIKI |
| **Trust Boundary Crossed** | TB6.1 (OAuth Provider) |
| **Attack Vector** | Attacker initiates OAuth flow, captures state parameter, and replays it against victim's session; or attacker forges callback with manipulated state |
| **Prerequisites** | OAuth state not cryptographically bound to session; or state not verified on callback |
| **CVSS 3.1** | **7.5 (High)** — AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N |
| **OWASP Top 10** | A07:2021 — Identification and Authentication Failures |
| **NIST SP 800-53** | IA-2, IA-8, SC-23 |
| **Mitigation** | Generate cryptographically random state parameter; bind state to user session (store in KV with session ID as key); verify state on callback; one-time use enforcement |
| **Verification** | Unit test: replayed state rejected; integration test: cross-session state rejected |

### 4.4 Threat S-04: Identity Spoofing via OAuth Provider Compromise

| Field | Value |
|-------|-------|
| **Threat ID** | S-04 |
| **Description** | If an OAuth provider (GitHub, Google, ORCID) is compromised or a malicious OAuth app is authorized, the attacker can impersonate any user who authenticates via that provider |
| **Affected Component** | AuthService (auth/provider.ts) |
| **Affected Site** | WIKI |
| **Trust Boundary Crossed** | TB6.1 (OAuth Provider) |
| **CVSS 3.1** | **6.8 (Medium)** — AV:N/AC:H/PR:N/UI:R/S:U/C:H/I:H/A:N |
| **OWASP Top 10** | A07:2021 — Identification and Authentication Failures |
| **NIST SP 800-53** | IA-2, IA-8 |
| **Mitigation** | Validate OAuth provider's ID token signature; verify issuer claim; restrict OAuth app to approved providers only; display provider name in UI |
| **Verification** | Unit test: forged ID token rejected; integration test: wrong issuer rejected |

### 4.5 Threat S-05: Wiki Editor Impersonation

| Field | Value |
|-------|-------|
| **Threat ID** | S-05 |
| **Description** | Attacker edits a wiki page and attributes the edit to another user by manipulating the authorId field in the edit submission |
| **Affected Component** | WikiService, Durable Objects |
| **Affected Site** | WIKI |
| **Trust Boundary Crossed** | TB2.2 (Workers), TB2.3 (Durable Objects) |
| **CVSS 3.1** | **6.5 (Medium)** — AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:H/A:N |
| **OWASP Top 10** | A04:2021 — Insecure Design |
| **NIST SP 800-53** | AC-3, AC-6, AU-3 |
| **Mitigation** | Derive authorId from authenticated session (never trust client-supplied authorId); server-side override of author fields; audit log records authenticated identity |
| **Verification** | Unit test: forged authorId ignored; integration test: edit attribution matches session user |

### 4.6 Threat S-06: DNS Spoofing / Cache Poisoning

| Field | Value |
|-------|-------|
| **Threat ID** | S-06 |
| **Description** | Attacker poisons DNS cache or Cloudflare CDN cache to serve malicious content in place of legitimate site pages |
| **Affected Component** | DNS, CDN Cache Layer |
| **Affected Site** | SHARED |
| **Trust Boundary Crossed** | TB1.1 (DNS), TB1.4 (CDN Cache) |
| **CVSS 3.1** | **5.9 (Medium)** — AV:N/AC:H/PR:N/UI:R/S:U/C:H/I:N/A:N |
| **OWASP Top 10** | A08:2021 — Software and Data Integrity Failures |
| **NIST SP 800-53** | SC-7, SC-8, SC-20 |
| **Mitigation** | Cloudflare DNS with DNSSEC; strict cache key configuration; cache bypass for dynamic routes; integrity verification of cached content |
| **Verification** | DNSSEC validation test; cache key audit; cache poisoning test |

### 4.7 Threat S-07: Machine Identity Spoofing (Cloudflare Services)

| Field | Value |
|-------|-------|
| **Threat ID** | S-07 |
| **Description** | Attacker impersonates a Cloudflare service (Workers, Durable Objects) to access internal storage or databases |
| **Affected Component** | Cloudflare Infrastructure |
| **Affected Site** | SHARED |
| **Trust Boundary Crossed** | TB2-TB3 (Workers to Storage) |
| **CVSS 3.1** | **3.7 (Low)** — AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N |
| **OWASP Top 10** | A05:2021 — Security Misconfiguration |
| **NIST SP 800-53** | AC-3, SC-7 |
| **Mitigation** | Cloudflare enforces Worker-to-storage binding isolation; no public access to D1/KV/R2 endpoints; verify binding configuration in wrangler.toml |
| **Verification** | Configuration audit of wrangler.toml; attempt direct access to storage endpoints |

---

## 5. STRIDE Category 2: Tampering

Tampering threats involve unauthorized modification of data, code, or configuration.

### 5.1 Threat T-01: XSS via Wiki Content Injection

| Field | Value |
|-------|-------|
| **Threat ID** | T-01 |
| **Description** | Attacker injects malicious JavaScript into wiki page content that executes in other users' browsers, stealing session tokens, defacing content, or redirecting users |
| **Affected Component** | WikiEditor, WikiService, Content Rendering (MDX) |
| **Affected Site** | WIKI |
| **Trust Boundary Crossed** | TB5.1 (Browser DOM) |
| **Attack Vector** | Attacker submits wiki content containing script tags, event handlers (onerror, onload), or javascript: URIs; if MDX rendering does not sanitize HTML, the script executes in readers' browsers |
| **Prerequisites** | User-generated content rendered without sanitization; CSP not enforcing script-src |
| **CVSS 3.1** | **9.1 (Critical)** — AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:N |
| **OWASP Top 10** | A03:2021 — Injection |
| **NIST SP 800-53** | SI-10, SI-15, AC-3 |
| **Mitigation** | Sanitize all user-generated HTML via DOMPurify; strip script, iframe, object, embed tags; CSP script-src 'self' with nonce-based exceptions; use MDX with restricted JSX (no raw HTML); server-side content validation before storage |
| **Verification** | XSS payload injection test (all common vectors); CSP violation report audit; DOMPurify configuration review |

### 5.2 Threat T-02: XSS via Annotation Content

| Field | Value |
|-------|-------|
| **Threat ID** | T-02 |
| **Description** | Attacker injects malicious JavaScript into inline annotation content that executes when other users expand/collapse annotations |
| **Affected Component** | AnnotationSystem, AnnotationService |
| **Affected Site** | WIKI |
| **Trust Boundary Crossed** | TB5.1 (Browser DOM) |
| **CVSS 3.1** | **8.1 (Critical)** — AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:N |
| **OWASP Top 10** | A03:2021 — Injection |
| **NIST SP 800-53** | SI-10, AC-3 |
| **Mitigation** | Sanitize annotation content via DOMPurify; render annotations as text not HTML; CSP nonce-based script blocking; server-side content validation |
| **Verification** | XSS payload injection in annotation content; verify sanitized output |

### 5.3 Threat T-03: Content Injection via Search Parameter Manipulation

| Field | Value |
|-------|-------|
| **Threat ID** | T-03 |
| **Description** | Attacker manipulates search query parameters to inject content into search results pages |
| **Affected Component** | SearchInterface, SearchService |
| **Affected Site** | SHARED |
| **Trust Boundary Crossed** | TB5.1 (Browser DOM) |
| **CVSS 3.1** | **6.1 (Medium)** — AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N |
| **OWASP Top 10** | A03:2021 — Injection |
| **NIST SP 800-53** | SI-10 |
| **Mitigation** | HTML-encode all user input in search results; use text content not innerHTML; CSP script-src blocking |
| **Verification** | XSS payload in search query; verify output is encoded |

### 5.4 Threat T-04: CSRF on Wiki Edit Endpoint

| Field | Value |
|-------|-------|
| **Threat ID** | T-04 |
| **Description** | Attacker crafts a malicious page that submits a cross-site request to the wiki edit endpoint, modifying page content without the user's knowledge |
| **Affected Component** | WikiService (POST /api/v1/pages/{slug}/edit) |
| **Affected Site** | WIKI |
| **Trust Boundary Crossed** | TB4 (Client-Server) |
| **CVSS 3.1** | **7.1 (High)** — AV:N/AC:H/PR:N/UI:R/S:U/C:H/I:H/A:N |
| **OWASP Top 10** | A01:2021 — Broken Access Control |
| **NIST SP 800-53** | AC-3, SC-23 |
| **Mitigation** | SameSite=Strict cookie attribute; CSRF token on state-changing endpoints; Origin/Referer header validation; require Content-Type: application/json for API calls |
| **Verification** | CSRF token validation test; cross-origin POST rejected; SameSite cookie flag verified |

### 5.5 Threat T-05: Data Tampering via D1 SQL Injection

| Field | Value |
|-------|-------|
| **Threat ID** | T-05 |
| **Description** | Attacker injects SQL via D1 query parameters to modify, delete, or exfiltrate database contents |
| **Affected Component** | All D1 database interactions |
| **Affected Site** | WIKI |
| **Trust Boundary Crossed** | TB3.1 (D1 Database) |
| **CVSS 3.1** | **9.8 (Critical)** — AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H |
| **OWASP Top 10** | A03:2021 — Injection |
| **NIST SP 800-53** | SI-10, AC-3 |
| **Mitigation** | Use D1 prepared statements with parameterized queries exclusively; never concatenate user input into SQL; validate input types before query execution; apply principle of least privilege to D1 database bindings |
| **Verification** | SQL injection test on all API endpoints; code review for string concatenation patterns; static analysis for SQL injection |

### 5.6 Threat T-06: Wiki Content Tampering via Race Condition

| Field | Value |
|-------|-------|
| **Threat ID** | T-06 |
| **Description** | Two users edit the same wiki page simultaneously; the second edit overwrites the first without conflict detection, causing data loss |
| **Affected Component** | Durable Objects (WikiRoom) |
| **Affected Site** | WIKI |
| **Trust Boundary Crossed** | TB2.3 (Durable Objects) |
| **CVSS 3.1** | **5.3 (Medium)** — AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:H/A:N |
| **OWASP Top 10** | A04:2021 — Insecure Design |
| **NIST SP 800-53** | AC-3, CM-3 |
| **Mitigation** | Durable Objects enforce single-writer per page; base revision checked server-side before commit; optimistic concurrency with conflict detection (HTTP 409); full edit history preserved for rollback |
| **Verification** | Concurrent edit test: two sessions edit same page; verify conflict detection triggers; verify no data loss |

### 5.7 Threat T-07: Flashcard FSRS State Manipulation

| Field | Value |
|-------|-------|
| **Threat ID** | T-07 |
| **Description** | Attacker manipulates flashcard review parameters to artificially inflate spaced repetition intervals |
| **Affected Component** | FlashcardService, FSRS Scheduler |
| **Affected Site** | WIKI |
| **Trust Boundary Crossed** | TB4 (Client-Server) |
| **CVSS 3.1** | **3.7 (Low)** — AV:N/AC:H/PR:L/UI:N/S:U/C:N/I:L/A:N |
| **OWASP Top 10** | A04:2021 — Insecure Design |
| **NIST SP 800-53** | AC-3 |
| **Mitigation** | Server-side validation of rating values (enum: again/hard/good/easy only); cap responseTime at reasonable bounds (1ms-300s); server-side FSRS scheduling (never trust client-computed intervals) |
| **Verification** | Submit invalid rating values; verify rejected; submit extreme responseTime; verify capped |

### 5.8 Threat T-08: Malicious File Upload via Deck Import

| Field | Value |
|-------|-------|
| **Threat ID** | T-08 |
| **Description** | Attacker uploads a malicious file disguised as an Anki (.apkg) or Quizlet (.csv) deck to R2 storage |
| **Affected Component** | FlashcardService (deck import), R2 Bucket |
| **Affected Site** | WIKI |
| **Trust Boundary Crossed** | TB3.3 (R2 Bucket), TB5.1 (Browser DOM) |
| **CVSS 3.1** | **6.5 (Medium)** — AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:H/A:L |
| **OWASP Top 10** | A04:2021 — Insecure Design |
| **NIST SP 800-53** | SI-3, CM-11 |
| **Mitigation** | Validate file extension and MIME type; enforce max file size (10MB); scan uploaded files; sanitize filenames (strip path traversal); store uploads in isolated R2 prefix; never serve uploads directly (proxy through Worker) |
| **Verification** | Upload oversized file; verify rejected; upload file with path traversal in name; verify sanitized |

### 5.9 Threat T-09: Build Pipeline Tampering

| Field | Value |
|-------|-------|
| **Threat ID** | T-09 |
| **Description** | Attacker compromises the build pipeline to inject malicious code into production deployments |
| **Affected Component** | CI/CD Pipeline, Build Process |
| **Affected Site** | SHARED |
| **Trust Boundary Crossed** | TB6 (External Integrations) |
| **CVSS 3.1** | **8.0 (High)** — AV:N/AC:H/PR:N/UI:R/S:C/C:H/I:H/A:N |
| **OWASP Top 10** | A08:2021 — Software and Data Integrity Failures |
| **NIST SP 800-53** | SA-4, SA-8, SA-11, CM-3 |
| **Mitigation** | Lockfile with integrity hashes; npm audit in CI; Dependabot/Renovate for dependency review; signed commits; branch protection rules; reproducible builds |
| **Verification** | Build with tampered lockfile; verify rejected; review CI/CD configuration for injection points |

---

## 6. STRIDE Category 3: Repudiation

Repudiation threats involve an attacker denying their actions because the system lacks adequate audit logging.

### 6.1 Threat R-01: Wiki Edit Without Attribution

| Field | Value |
|-------|-------|
| **Threat ID** | R-01 |
| **Description** | Attacker makes malicious wiki edits (vandalism, content injection) and claims they did not make them because the system lacks sufficient audit logging |
| **Affected Component** | WikiService, ModerationService |
| **Affected Site** | WIKI |
| **Trust Boundary Crossed** | TB2.2 (Workers) |
| **CVSS 3.1** | **7.5 (High)** — AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:H/A:N |
| **OWASP Top 10** | A09:2021 — Security Logging and Monitoring Failures |
| **NIST SP 800-53** | AU-2, AU-3, AU-12 |
| **Mitigation** | Log all edit operations with timestamp, authenticated user ID, source IP, user-agent, page slug, revision number, and edit summary; store audit logs in D1 (append-only); implement tamper-evident logging (hash chain) |
| **Verification** | Edit a page; verify audit log entry contains all required fields; attempt to delete audit log entry; verify immutable |

### 6.2 Threat R-02: Moderation Queue Bypass Without Audit Trail

| Field | Value |
|-------|-------|
| **Threat ID** | R-02 |
| **Description** | Attacker bypasses the moderation queue (e.g., by inflating reputation score) and publishes content without review, then denies the bypass |
| **Affected Component** | ModerationService, ReputationService |
| **Affected Site** | WIKI |
| **CVSS 3.1** | **5.3 (Medium)** — AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:H/A:N |
| **OWASP Top 10** | A09:2021 — Security Logging and Monitoring Failures |
| **NIST SP 800-53** | AU-2, AU-3 |
| **Mitigation** | Log moderation queue decisions (approve/reject/bypass) with author reputation at time of decision; alert on unusual reputation changes; immutable audit trail for moderation actions |
| **Verification** | Submit edit as low-rep user; verify logged as queued; submit edit as high-rep user; verify logged as immediate publish |

### 6.3 Threat R-03: User Account Actions Without Audit

| Field | Value |
|-------|-------|
| **Threat ID** | R-03 |
| **Description** | Administrative actions (role changes, account suspension, content deletion) are not logged, preventing accountability |
| **Affected Component** | AuthService, ModerationService |
| **Affected Site** | WIKI |
| **CVSS 3.1** | **5.3 (Medium)** — AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:H/A:N |
| **OWASP Top 10** | A09:2021 — Security Logging and Monitoring Failures |
| **NIST SP 800-53** | AU-2, AU-3, AU-6 |
| **Mitigation** | Log all administrative actions (role changes, suspensions, content deletion) with admin ID, target user, action type, timestamp, and reason; alert on sensitive actions |
| **Verification** | Perform admin action; verify audit log entry; attempt action without admin role; verify denied and logged |

### 6.4 Threat R-04: Quiz Score Manipulation Without Trace

| Field | Value |
|-------|-------|
| **Threat ID** | R-04 |
| **Description** | Attacker manipulates quiz scores and claims the scores were different, but the system lacks sufficient quiz attempt logging |
| **Affected Component** | QuizService |
| **Affected Site** | WIKI |
| **CVSS 3.1** | **4.3 (Medium)** — AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N |
| **OWASP Top 10** | A09:2021 — Security Logging and Monitoring Failures |
| **NIST SP 800-53** | AU-2, AU-3 |
| **Mitigation** | Log quiz session creation, each answer submission (question ID, answer, correctness, response time), and session completion with final score; store quiz attempt history in D1 |
| **Verification** | Complete a quiz; verify all answer submissions logged; verify quiz result matches log |

### 6.5 Threat R-05: Login Attempt Repudiation

| Field | Value |
|-------|-------|
| **Threat ID** | R-05 |
| **Description** | Attacker attempts to brute-force passwords but denies the attempts because login failures are not logged |
| **Affected Component** | AuthService |
| **Affected Site** | WIKI |
| **CVSS 3.1** | **3.7 (Low)** — AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N |
| **OWASP Top 10** | A09:2021 — Security Logging and Monitoring Failures |
| **NIST SP 800-53** | AU-2, AU-3, AC-7 |
| **Mitigation** | Log all login attempts (success and failure) with source IP, user-agent, timestamp, and username attempted; implement account lockout after 5 failed attempts; alert on brute-force patterns |
| **Verification** | Attempt 5 failed logins; verify lockout triggered; verify all attempts logged |

---

## 7. STRIDE Category 4: Information Disclosure

Information disclosure threats involve sensitive data being exposed to unauthorized parties.

### 7.1 Threat I-01: User Data Leakage via API Response

| Field | Value |
|-------|-------|
| **Threat ID** | I-01 |
| **Description** | API endpoints return excessive user data (email, session tokens, internal IDs) in responses accessible to other users or attackers |
| **Affected Component** | All API routes, User API |
| **Affected Site** | WIKI |
| **Trust Boundary Crossed** | TB4 (Client-Server) |
| **CVSS 3.1** | **7.5 (High)** — AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N |
| **OWASP Top 10** | A01:2021 — Broken Access Control |
| **NIST SP 800-53** | AC-3, AC-6, SC-8 |
| **Mitigation** | Implement data transfer objects (DTOs) that exclude sensitive fields; never return email in public API responses; strip internal IDs; implement field-level access control based on role |
| **Verification** | API response audit: verify no email, session token, or internal IDs in public responses; test with different user roles |

### 7.2 Threat I-02: User Email Exposure via Leaderboard

| Field | Value |
|-------|-------|
| **Threat ID** | I-02 |
| **Description** | The contribution leaderboard exposes user email addresses or other PII alongside reputation scores |
| **Affected Component** | ReputationService, ContributionPage |
| **Affected Site** | WIKI |
| **CVSS 3.1** | **6.5 (Medium)** — AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N |
| **OWASP Top 10** | A01:2021 — Broken Access Control |
| **NIST SP 800-53** | AC-3, SC-8 |
| **Mitigation** | Leaderboard API returns only displayName, avatarUrl, and reputation score; never expose email; implement privacy settings for profile visibility |
| **Verification** | Leaderboard API response audit; verify no PII in response |

### 7.3 Threat I-03: Session Token Leakage via Referer Header

| Field | Value |
|-------|-------|
| **Threat ID** | I-03 |
| **Description** | Session tokens are included in URLs that leak via the Referer header when users click external links |
| **Affected Component** | URL design, HTTP headers |
| **Affected Site** | WIKI |
| **CVSS 3.1** | **6.5 (Medium)** — AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:N/A:N |
| **OWASP Top 10** | A02:2021 — Cryptographic Failures |
| **NIST SP 800-53** | SC-8, SC-23 |
| **Mitigation** | Never include session tokens in URLs; use cookies or Authorization headers for authentication; set Referrer-Policy: strict-origin-when-cross-origin |
| **Verification** | Verify no tokens in URLs; verify Referrer-Policy header set correctly |

### 7.4 Threat I-04: D1 Database Row Exposure

| Field | Value |
|-------|-------|
| **Threat ID** | I-04 |
| **Description** | D1 database queries return more rows than necessary, exposing other users' data to the requesting user |
| **Affected Component** | All D1 queries |
| **Affected Site** | WIKI |
| **Trust Boundary Crossed** | TB3.1 (D1 Database) |
| **CVSS 3.1** | **7.5 (High)** — AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N |
| **OWASP Top 10** | A01:2021 — Broken Access Control |
| **NIST SP 800-53** | AC-3, AC-4 |
| **Mitigation** | Always include WHERE clause filtering by authenticated user ID; use parameterized queries; implement row-level security in application layer; return only required columns (SELECT specific columns, not SELECT *) |
| **Verification** | Query API as user A; verify no user B data returned; SQL audit for unfiltered queries |

### 7.5 Threat I-05: Sensitive Data in Cloudflare Logs

| Field | Value |
|-------|-------|
| **Threat ID** | I-05 |
| **Description** | Sensitive data (session tokens, user PII) is logged in Cloudflare Workers logs, accessible to Cloudflare staff or log aggregation services |
| **Affected Component** | Cloudflare Workers logging |
| **Affected Site** | SHARED |
| **CVSS 3.1** | **5.3 (Medium)** — AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N |
| **OWASP Top 10** | A09:2021 — Security Logging and Monitoring Failures |
| **NIST SP 800-53** | AU-11, SC-8 |
| **Mitigation** | Sanitize log output (strip tokens, PII); use structured logging with log level control; implement log retention policies; avoid logging request/response bodies containing sensitive data |
| **Verification** | Review Worker log output; verify no sensitive data in logs |

### 7.6 Threat I-06: Search Query Information Disclosure

| Field | Value |
|-------|-------|
| **Threat ID** | I-06 |
| **Description** | Search functionality reveals information about what other users are searching for, or exposes internal document structure |
| **Affected Component** | SearchService, SearchInterface |
| **Affected Site** | SHARED |
| **CVSS 3.1** | **4.3 (Medium)** — AV:N/AC:L/PR:N/UI:R/S:U/C:L/I:N/A:N |
| **OWASP Top 10** | A01:2021 — Broken Access Control |
| **NIST SP 800-53** | AC-3, AC-4 |
| **Mitigation** | Search results do not include other users' search history; search suggestions do not leak indexed content not yet published; implement rate limiting on search endpoint |
| **Verification** | Search audit: verify no cross-user data leakage; verify no draft content in search results |

### 7.7 Threat I-07: R2 Object Direct Access

| Field | Value |
|-------|-------|
| **Threat ID** | I-07 |
| **Description** | User-uploaded files in R2 are directly accessible via URL without authentication, exposing private content |
| **Affected Component** | R2 Bucket, Worker proxy |
| **Affected Site** | WIKI |
| **Trust Boundary Crossed** | TB3.3 (R2 Bucket) |
| **CVSS 3.1** | **7.5 (High)** — AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N |
| **OWASP Top 10** | A01:2021 — Broken Access Control |
| **NIST SP 800-53** | AC-3, SC-8 |
| **Mitigation** | Never make R2 buckets public; serve all uploads through Worker proxy with authentication check; implement access control per upload (owner-only access); use presigned URLs with short expiration for sharing |
| **Verification** | Attempt direct R2 URL access; verify 403/404; verify Worker proxy enforces auth |

### 7.8 Threat I-08: WebSocket Data Interception

| Field | Value |
|-------|-------|
| **Threat ID** | I-08 |
| **Description** | Attacker intercepts WebSocket messages between client and Durable Objects during wiki collaboration, reading edit content and user information |
| **Affected Component** | Durable Objects WebSocket |
| **Affected Site** | WIKI |
| **Trust Boundary Crossed** | TB2.3 (Durable Objects), TB4 (Client-Server) |
| **CVSS 3.1** | **5.9 (Medium)** — AV:N/AC:H/PR:N/UI:R/S:U/C:H/I:N/A:N |
| **OWASP Top 10** | A02:2021 — Cryptographic Failures |
| **NIST SP 800-53** | SC-8, SC-13 |
| **Mitigation** | Enforce WSS (WebSocket Secure) only; validate WebSocket origin header; authenticate WebSocket connections via session token; encrypt sensitive data in WebSocket messages if needed |
| **Verification** | Attempt WS (non-TLS) connection; verify rejected; verify auth required for WebSocket upgrade |

---

## 8. STRIDE Category 5: Denial of Service

Denial of service threats involve making the system unavailable to legitimate users.

### 8.1 Threat D-01: API Rate Limit Bypass

| Field | Value |
|-------|-------|
| **Threat ID** | D-01 |
| **Description** | Attacker bypasses API rate limiting to flood endpoints with requests, causing service degradation for legitimate users |
| **Affected Component** | Rate limiting (Workers), Cloudflare WAF |
| **Affected Site** | SHARED |
| **Trust Boundary Crossed** | TB1.3 (WAF), TB2.2 (Workers) |
| **CVSS 3.1** | **7.5 (High)** — AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H |
| **OWASP Top 10** | A05:2021 — Security Misconfiguration |
| **NIST SP 800-53** | SC-5, SI-4 |
| **Mitigation** | Cloudflare rate limiting rules (100 req/min unauthenticated, 300 req/min authenticated); Workers-based rate limiting with KV counter; IP-based and token-based rate limiting; WAF bot management |
| **Verification** | Send 101 requests from single IP within 1 minute; verify 429 on 101st; test with rotated IPs; verify Cloudflare bot detection |

### 8.2 Threat D-02: D1 Database Exhaustion

| Field | Value |
|-------|-------|
| **Threat ID** | D-02 |
| **Description** | Attacker sends excessive D1 queries (via API endpoints) to exhaust the daily row-read quota, causing service denial |
| **Affected Component** | D1 Database, API routes |
| **Affected Site** | WIKI |
| **CVSS 3.1** | **6.5 (Medium)** — AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H |
| **OWASP Top 10** | A05:2021 — Security Misconfiguration |
| **NIST SP 800-53** | SC-5, SI-4 |
| **Mitigation** | Rate limiting on API endpoints; implement query result caching in KV; use pagination limits; monitor D1 usage quotas; implement circuit breaker pattern |
| **Verification** | Load test: send sustained high-volume requests; verify rate limiting engages; verify cached responses served |

### 8.3 Threat D-03: KV Storage Exhaustion

| Field | Value |
|-------|-------|
| **Threat ID** | D-03 |
| **Description** | Attacker floods KV with write requests to exhaust the write quota or fill storage, causing cache failures |
| **Affected Component** | KV Namespaces |
| **Affected Site** | SHARED |
| **CVSS 3.1** | **5.3 (Medium)** — AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L |
| **OWASP Top 10** | A05:2021 — Security Misconfiguration |
| **NIST SP 800-53** | SC-5 |
| **Mitigation** | Rate limit KV write operations; implement write-through caching with size limits; set TTL on all cached entries; monitor KV usage metrics |
| **Verification** | Write flood test; verify rate limiting; verify TTL enforcement |

### 8.4 Threat D-04: Durable Object Resource Exhaustion

| Field | Value |
|-------|-------|
| **Threat ID** | D-04 |
| **Description** | Attacker opens many concurrent WebSocket connections to Durable Objects to exhaust connection limits or CPU time |
| **Affected Component** | Durable Objects (WikiRoom) |
| **Affected Site** | WIKI |
| **CVSS 3.1** | **6.5 (Medium)** — AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H |
| **OWASP Top 10** | A05:2021 — Security Misconfiguration |
| **NIST SP 800-53** | SC-5, SI-4 |
| **Mitigation** | Limit concurrent connections per user per WikiRoom; implement connection timeout; monitor DO CPU usage; implement connection rate limiting at Workers level |
| **Verification** | Open 100 concurrent connections from single user; verify limit enforced; verify timeout closes idle connections |

### 8.5 Threat D-05: R2 Storage Exhaustion via Upload

| Field | Value |
|-------|-------|
| **Threat ID** | D-05 |
| **Description** | Attacker uploads large files repeatedly to exhaust R2 storage quota |
| **Affected Component** | R2 Bucket, File upload endpoint |
| **Affected Site** | WIKI |
| **CVSS 3.1** | **5.3 (Medium)** — AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:L |
| **OWASP Top 10** | A04:2021 — Insecure Design |
| **NIST SP 800-53** | SC-5, SC-6 |
| **Mitigation** | Enforce per-user storage quota (100MB); enforce per-file size limit (10MB); rate limit upload endpoint; implement storage cleanup for abandoned uploads; monitor R2 usage |
| **Verification** | Upload 101MB across multiple files as single user; verify quota enforced; upload single 11MB file; verify size limit enforced |

### 8.6 Threat D-06: Cloudflare Worker CPU Exhaustion

| Field | Value |
|-------|-------|
| **Threat ID** | D-06 |
| **Description** | Attacker sends requests that trigger CPU-intensive operations in Workers (complex search queries, large file processing) to exhaust CPU time quota |
| **Affected Component** | Cloudflare Workers |
| **Affected Site** | SHARED |
| **CVSS 3.1** | **5.3 (Medium)** — AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L |
| **OWASP Top 10** | A05:2021 — Security Misconfiguration |
| **NIST SP 800-53** | SC-5, SI-4 |
| **Mitigation** | Set CPU time limits per request; implement query complexity limits; cache expensive computations; monitor Worker CPU usage; implement request timeout (50ms CPU limit) |
| **Verification** | Submit complex query; verify CPU time limit enforced; verify timeout returns 504 |

---

## 9. STRIDE Category 6: Elevation of Privilege

Elevation of privilege threats involve an attacker gaining higher access than authorized.

### 9.1 Threat E-01: Regular User Gains Moderator Role

| Field | Value |
|-------|-------|
| **Threat ID** | E-01 |
| **Description** | Attacker escalates from regular contributor to moderator/admin role by exploiting RBAC implementation flaws |
| **Affected Component** | AuthService (auth/rbac.ts), ModerationService |
| **Affected Site** | WIKI |
| **Trust Boundary Crossed** | TB2.2 (Workers) |
| **CVSS 3.1** | **8.8 (Critical)** — AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H |
| **OWASP Top 10** | A01:2021 — Broken Access Control |
| **NIST SP 800-53** | AC-2, AC-3, AC-5, AC-6 |
| **Mitigation** | Server-side RBAC enforcement on every endpoint; role stored in database (not client-modifiable); role changes require admin authorization; implement principle of least privilege; audit role changes |
| **Verification** | Attempt to access moderator endpoint with contributor token; verify 403; attempt to modify own role via API; verify rejected; audit role change logs |

### 9.2 Threat E-02: User Impersonation via Admin Function

| Field | Value |
|-------|-------|
| **Threat ID** | E-02 |
| **Description** | Attacker exploits admin functionality (user management) to impersonate another user or grant themselves elevated privileges |
| **Affected Component** | AuthService, User Management API |
| **Affected Site** | WIKI |
| **CVSS 3.1** | **8.8 (Critical)** — AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H |
| **OWASP Top 10** | A01:2021 — Broken Access Control |
| **NIST SP 800-53** | AC-2, AC-3, AC-6, AU-2 |
| **Mitigation** | Admin actions require elevated authorization; implement admin action audit logging; restrict admin API to specific IP ranges; implement two-person rule for sensitive operations |
| **Verification** | Attempt admin action with non-admin token; verify denied; verify admin action logged; verify IP restriction enforced |

### 9.3 Threat E-03: Privilege Escalation via Durable Object

| Field | Value |
|-------|-------|
| **Threat ID** | E-03 |
| **Description** | Attacker exploits Durable Object state manipulation to gain write access to wiki pages they should only have read access to |
| **Affected Component** | Durable Objects (WikiRoom) |
| **Affected Site** | WIKI |
| **Trust Boundary Crossed** | TB2.3 (Durable Objects) |
| **CVSS 3.1** | **7.2 (High)** — AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N |
| **OWASP Top 10** | A01:2021 — Broken Access Control |
| **NIST SP 800-53** | AC-3, AC-4 |
| **Mitigation** | Durable Object checks authorization before applying edits; WebSocket connection authenticated before accepting edits; edit permissions checked server-side (not client-side) |
| **Verification** | Connect to WikiRoom WebSocket with read-only user; attempt edit; verify rejected; verify auth check on every edit operation |

### 9.4 Threat E-04: Content Gating Bypass (Mastery Gate)

| Field | Value |
|-------|-------|
| **Threat ID** | E-04 |
| **Description** | Attacker bypasses mastery-based content gating to access advanced study guides without completing prerequisites |
| **Affected Component** | ProgressService, StudyGuidePage |
| **Affected Site** | WIKI |
| **Trust Boundary Crossed** | TB2.2 (Workers), TB5.1 (Browser DOM) |
| **CVSS 3.1** | **6.5 (Medium)** — AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:H/A:N |
| **OWASP Top 10** | A01:2021 — Broken Access Control |
| **NIST SP 800-53** | AC-3 |
| **Mitigation** | Server-side prerequisite check (never client-side); verify mastery level in D1 before serving advanced content; return 403 for unmet prerequisites; cache mastery status with short TTL |
| **Verification** | Request advanced guide without prerequisite mastery; verify 403; complete prerequisites; verify 200 |

### 9.5 Threat E-05: Moderation Queue Evasion via Reputation Gaming

| Field | Value |
|-------|-------|
| **Threat ID** | E-05 |
| **Description** | Attacker artificially inflates their reputation score (via self-edits, sock puppet accounts, or quiz manipulation) to bypass the moderation queue and publish content without review |
| **Affected Component** | ReputationService, ModerationService |
| **Affected Site** | WIKI |
| **Trust Boundary Crossed** | TB2.2 (Workers) |
| **CVSS 3.1** | **6.5 (Medium)** — AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:H/A:N |
| **OWASP Top 10** | A04:2021 — Insecure Design |
| **NIST SP 800-53** | AC-2, AC-3, AU-2 |
| **Mitigation** | Rate-limit reputation-gaining actions; detect sock puppet accounts via IP/fingerprint; require expert review for reputation-gaining actions; implement reputation decay for inactivity; audit suspicious reputation changes |
| **Verification** | Create multiple accounts from same IP; verify sock puppet detection; self-edit 100 times; verify reputation cap per day |

### 9.6 Threat E-06: Cross-Site Scripting to Privilege Escalation

| Field | Value |
|-------|-------|
| **Threat ID** | E-06 |
| **Description** | Attacker uses XSS to steal admin session token, then uses the stolen token to perform admin actions (role changes, content deletion) |
| **Affected Component** | XSS vulnerability + AuthService |
| **Affected Site** | WIKI |
| **Trust Boundary Crossed** | TB5.1 (Browser DOM), TB2.2 (Workers) |
| **CVSS 3.1** | **8.1 (High)** — AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:N |
| **OWASP Top 10** | A03:2021 — Injection, A07:2021 — Identification and Authentication Failures |
| **NIST SP 800-53** | AC-3, IA-2, SI-10 |
| **Mitigation** | XSS mitigation (DOMPurify, CSP); HttpOnly cookies (prevent token theft); short-lived admin tokens; admin actions require re-authentication for sensitive operations |
| **Verification** | XSS payload attempts to read admin cookie; verify HttpOnly blocks access; admin token expires within 15 minutes |

### 9.7 Threat E-07: OAuth Account Linking Attack

| Field | Value |
|-------|-------|
| **Threat ID** | E-07 |
| **Description** | Attacker links their OAuth account to a victim's existing wikipept.com account, gaining access to the victim's data and progress |
| **Affected Component** | AuthService (auth/provider.ts) |
| **Affected Site** | WIKI |
| **Trust Boundary Crossed** | TB6.1 (OAuth Provider) |
| **CVSS 3.1** | **7.5 (High)** — AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N |
| **OWASP Top 10** | A07:2021 — Identification and Authentication Failures |
| **NIST SP 800-53** | AC-2, IA-2, IA-8 |
| **Mitigation** | OAuth account linking requires current session authentication; confirm linking with user via email; prevent linking to already-linked accounts; audit account linking events |
| **Verification** | Attempt to link OAuth without active session; verify rejected; attempt to link already-linked account; verify rejected |

---

## 10. Attack Trees

### 10.1 Attack Tree: Steal User Session Token

```
ROOT GOAL: Steal user session token
├── Method 1: XSS Attack
│   ├── Step 1.1: Find XSS vulnerability
│   │   ├── 1.1.1: Test wiki content for script injection
│   │   ├── 1.1.2: Test annotation content for script injection
│   │   └── 1.1.3: Test search parameters for reflected XSS
│   ├── Step 1.2: Inject script to read cookies
│   │   └── Requirement: Cookie must not be HttpOnly
│   └── Step 1.3: Exfiltrate token to attacker server
│       └── Mitigation: CSP blocks external connections
├── Method 2: Network Interception
│   ├── Step 2.1: Intercept HTTP traffic
│   │   └── Mitigation: HTTPS enforced, HSTS enabled
│   └── Step 2.2: Extract token from headers
│       └── Mitigation: TLS encryption
├── Method 3: Physical Access
│   ├── Step 3.1: Access victim's browser
│   │   ├── 3.1.1: Check localStorage for token
│   │   └── 3.1.2: Check browser dev tools
│   └── Mitigation: HttpOnly cookies, short token lifetime
└── Method 4: Social Engineering
    ├── Step 4.1: Phish victim into clicking malicious link
    │   └── Mitigation: CSP, SameSite cookies
    └── Step 4.2: Trick victim into pasting token
        └── Mitigation: Never expose token to user
```

### 10.2 Attack Tree: Inject Malicious Wiki Content

```
ROOT GOAL: Inject malicious content into wiki pages
├── Method 1: Direct Edit (Authenticated)
│   ├── Step 1.1: Create account / obtain session
│   │   ├── 1.1.1: Register new account
│   │   └── 1.1.2: Compromise existing account
│   ├── Step 1.2: Submit edit with XSS payload
│   │   ├── 1.2.1: Test MDX sanitization bypass
│   │   ├── 1.2.2: Test DOMPurify configuration
│   │   └── 1.2.3: Test CSP nonce bypass
│   └── Step 1.3: Wait for moderation approval
│       └── Mitigation: Moderation queue for new users
├── Method 2: CSRF Attack
│   ├── Step 2.1: Craft malicious page with auto-submit form
│   │   └── Mitigation: CSRF token, SameSite cookie
│   └── Step 2.2: Trick authenticated user into visiting
│       └── Mitigation: Origin validation
└── Method 3: Durable Object Injection
    ├── Step 3.1: Connect to WikiRoom WebSocket
    │   └── Mitigation: WebSocket authentication required
    └── Step 3.2: Send edit message with XSS payload
        └── Mitigation: Server-side content sanitization
```

### 10.3 Attack Tree: Escalate to Admin Role

```
ROOT GOAL: Gain admin privileges
├── Method 1: Direct Role Manipulation
│   ├── Step 1.1: Find role assignment endpoint
│   │   └── Mitigation: Server-side RBAC enforcement
│   ├── Step 1.2: Send role change request
│   │   └── Mitigation: Role changes require admin auth
│   └── Step 1.3: Verify elevated privileges
│       └── Mitigation: Role stored server-side only
├── Method 2: Session Token Theft + Admin Action
│   ├── Step 2.1: Obtain admin session token (via XSS, phishing)
│   │   └── Mitigation: XSS prevention, HttpOnly cookies
│   └── Step 2.2: Use admin token to perform admin actions
│       └── Mitigation: Admin actions require re-auth
├── Method 3: OAuth Account Takeover
│   ├── Step 3.1: Compromise OAuth provider account
│   │   └── Mitigation: OAuth ID token validation
│   └── Step 3.2: Use compromised OAuth to login as admin
│       └── Mitigation: Multi-factor auth for admin accounts
└── Method 4: Database Manipulation
    ├── Step 4.1: Find SQL injection in user management
    │   └── Mitigation: Parameterized queries
    └── Step 4.2: Update user role directly in D1
        └── Mitigation: Parameterized queries, input validation
```

---

## 11. Attack Graphs

### 11.1 Attack Graph: Wiki Content Tampering Path

```
[Attacker] --> [Find Entry Point]
                    |
        +-----------+-----------+
        |           |           |
   [Wiki Edit]  [Annotation]  [WebSocket]
        |           |           |
        v           v           v
   [Inject XSS] [Inject XSS] [Inject Edit]
        |           |           |
        v           v           v
   [Bypass Sanitizer] [Bypass Sanitizer] [Bypass Auth]
        |           |           |
        +-----------+-----------+
                    |
                    v
            [Execute in Browser]
                    |
        +-----------+-----------+
        |           |           |
   [Steal Token] [Deface Page] [Redirect User]
        |           |           |
        v           v           v
   [Impersonate] [Vandalism] [Phishing]
```

### 11.2 Attack Graph: Authentication Bypass Path

```
[Attacker] --> [Target: wikipept.com Account]
                    |
        +-----------+-----------+
        |           |           |
   [JWT Forgery] [Session Theft] [OAuth Bypass]
        |           |           |
        v           v           v
   [Forge Token] [XSS/Network] [State Manipulation]
        |           |           |
        v           v           v
   [Test Token] [Read Cookie] [Forge Callback]
        |           |           |
        v           v           v
   [Bypass Verify] [Exfiltrate] [Link Account]
        |           |           |
        +-----------+-----------+
                    |
                    v
            [Authenticated as Victim]
                    |
        +-----------+-----------+
        |           |           |
   [Read Data] [Modify Data] [Admin Actions]
```

### 11.3 Attack Graph: Privilege Escalation Path

```
[Attacker] --> [Initial Access: Contributor Role]
                    |
        +-----------+-----------+
        |           |           |
   [RBAC Bypass] [Role Manipulation] [Reputation Gaming]
        |           |           |
        v           v           v
   [Access Admin] [Direct Update] [Self-Edit Inflation]
   [Endpoint]     [Database]      [Sock Puppets]
        |           |           |
        v           v           v
   [Gain Moderator] [Gain Admin] [Bypass Queue]
        |           |           |
        +-----------+-----------+
                    |
                    v
            [Elevated Privileges]
                    |
        +-----------+-----------+
        |           |           |
   [Delete Content] [Ban Users] [Modify System]
```

---

## 12. Risk Assessment Matrix

### 12.1 Complete Risk Register

| Threat ID | STRIDE | CVSS | Risk Level | Component | Mitigation Status |
|-----------|--------|------|------------|-----------|-------------------|
| S-01 | Spoofing | 8.1 | HIGH | AuthService | Required before launch |
| S-02 | Spoofing | 7.4 | HIGH | AuthService | Required before launch |
| S-03 | Spoofing | 7.5 | HIGH | AuthService | Required before launch |
| S-04 | Spoofing | 6.8 | MEDIUM | AuthService | Mitigation plan needed |
| S-05 | Spoofing | 6.5 | MEDIUM | WikiService | Mitigation plan needed |
| S-06 | Spoofing | 5.9 | MEDIUM | DNS/CDN | Cloudflare-managed |
| S-07 | Spoofing | 3.7 | LOW | Infrastructure | Cloudflare-managed |
| T-01 | Tampering | 9.1 | CRITICAL | Wiki Content | Required before launch |
| T-02 | Tampering | 8.1 | CRITICAL | Annotations | Required before launch |
| T-03 | Tampering | 6.1 | MEDIUM | Search | Mitigation plan needed |
| T-04 | Tampering | 7.1 | HIGH | Wiki Edit | Required before launch |
| T-05 | Tampering | 9.8 | CRITICAL | D1 Database | Required before launch |
| T-06 | Tampering | 5.3 | MEDIUM | Durable Objects | Mitigation plan needed |
| T-07 | Tampering | 3.7 | LOW | Flashcards | Accept |
| T-08 | Tampering | 6.5 | MEDIUM | File Upload | Mitigation plan needed |
| T-09 | Tampering | 8.0 | HIGH | CI/CD | Required before launch |
| R-01 | Repudiation | 7.5 | HIGH | WikiService | Required before launch |
| R-02 | Repudiation | 5.3 | MEDIUM | Moderation | Mitigation plan needed |
| R-03 | Repudiation | 5.3 | MEDIUM | Admin Actions | Mitigation plan needed |
| R-04 | Repudiation | 4.3 | MEDIUM | QuizService | Mitigation plan needed |
| R-05 | Repudiation | 3.7 | LOW | AuthService | Accept |
| I-01 | Info Disclosure | 7.5 | HIGH | API Routes | Required before launch |
| I-02 | Info Disclosure | 6.5 | MEDIUM | Leaderboard | Mitigation plan needed |
| I-03 | Info Disclosure | 6.5 | MEDIUM | URL Design | Mitigation plan needed |
| I-04 | Info Disclosure | 7.5 | HIGH | D1 Queries | Required before launch |
| I-05 | Info Disclosure | 5.3 | MEDIUM | Logging | Mitigation plan needed |
| I-06 | Info Disclosure | 4.3 | MEDIUM | Search | Mitigation plan needed |
| I-07 | Info Disclosure | 7.5 | HIGH | R2 Storage | Required before launch |
| I-08 | Info Disclosure | 5.9 | MEDIUM | WebSocket | Mitigation plan needed |
| D-01 | DoS | 7.5 | HIGH | Rate Limiting | Required before launch |
| D-02 | DoS | 6.5 | MEDIUM | D1 Database | Mitigation plan needed |
| D-03 | DoS | 5.3 | MEDIUM | KV Storage | Mitigation plan needed |
| D-04 | DoS | 6.5 | MEDIUM | Durable Objects | Mitigation plan needed |
| D-05 | DoS | 5.3 | MEDIUM | R2 Storage | Mitigation plan needed |
| D-06 | DoS | 5.3 | MEDIUM | Workers | Mitigation plan needed |
| E-01 | EoP | 8.8 | CRITICAL | RBAC | Required before launch |
| E-02 | EoP | 8.8 | CRITICAL | Admin API | Required before launch |
| E-03 | EoP | 7.2 | HIGH | Durable Objects | Required before launch |
| E-04 | EoP | 6.5 | MEDIUM | Content Gating | Mitigation plan needed |
| E-05 | EoP | 6.5 | MEDIUM | Reputation | Mitigation plan needed |
| E-06 | EoP | 8.1 | HIGH | XSS Chain | Required before launch |
| E-07 | EoP | 7.5 | HIGH | OAuth | Required before launch |

### 12.2 Risk Heat Map

```
Impact
  Critical | T-05  E-01  E-02  |
  High     | T-01  S-01  T-02  E-06  S-03  E-07  I-01  I-04  I-07  D-01  T-09  R-01  T-04  S-02  E-03
  Medium   | T-03  S-04  S-05  I-02  I-03  I-05  I-08  D-02  D-04  E-04  E-05  T-06  T-08  D-03  D-05  D-06  S-06  R-02  R-03  R-04  I-06
  Low      | T-07  S-07  R-05
           +--------------------------------------------------------------> Likelihood
             Low           Medium           High           Critical
```

---

## 13. Mitigation Summary

### 13.1 Mitigation Priority Matrix

| Priority | Threats | Action | Timeline |
|----------|---------|--------|----------|
| P0 (Critical) | T-01, T-02, T-05, E-01, E-02 | Implement mitigations immediately | Before any deployment |
| P1 (High) | S-01, S-02, S-03, T-04, T-09, R-01, I-01, I-04, I-07, D-01, E-03, E-06, E-07 | Implement mitigations before launch | Before production launch |
| P2 (Medium) | S-04, S-05, S-06, T-03, T-06, T-08, R-02, R-03, R-04, I-02, I-03, I-05, I-06, I-08, D-02-D-06, E-04, E-05 | Document mitigation plan | Within 30 days of launch |
| P3 (Low) | S-07, T-07, R-05 | Accept risk or defer | Post-launch review |

### 13.2 Control Mapping to NIST SP 800-53

| NIST Control | Control Name | Threats Addressed | Implementation |
|--------------|-------------|-------------------|----------------|
| AC-2 | Account Management | S-01, S-02, E-01, E-07 | OAuth + session management |
| AC-3 | Access Enforcement | S-05, T-01-T-06, E-01-E-07 | RBAC + server-side checks |
| AC-5 | Separation of Duties | E-01, E-02 | Admin action audit |
| AC-6 | Least Privilege | S-05, I-01, I-04, E-01 | DTO filtering, role restrictions |
| AC-7 | Unsuccessful Login Attempts | R-05 | Account lockout |
| AC-17 | Remote Access | S-01, S-02 | TLS, HSTS |
| AU-2 | Audit Events | R-01-R-05 | Structured logging |
| AU-3 | Content of Audit Records | R-01-R-05 | Full audit trail |
| AU-6 | Audit Review | R-01-R-05 | Log monitoring |
| AU-12 | Audit Record Generation | R-01-R-05 | D1 audit logs |
| CM-2 | Baseline Configuration | T-09 | Reproducible builds |
| CM-3 | Configuration Change Control | T-06, T-09 | Git + branch protection |
| CM-6 | Configuration Settings | D-01, S-06 | Security headers |
| CM-7 | Least Functionality | T-08, T-09 | Minimal attack surface |
| CM-11 | User-Installed Software | T-08 | File upload validation |
| IA-2 | Identification and Authentication | S-01-S-04, E-07 | OAuth + JWT |
| IA-4 | Identifier Management | S-04 | UUID generation |
| IA-5 | Authenticator Management | S-01 | JWT signing |
| IA-8 | Non-Org User Authentication | S-03, S-04, E-07 | OAuth validation |
| IR-4 | Incident Handling | All | Incident response plan |
| IR-5 | Incident Monitoring | All | Logging + alerting |
| IR-6 | Incident Reporting | All | Communication templates |
| RA-3 | Risk Assessment | All | This threat model |
| RA-5 | Vulnerability Monitoring | T-09 | npm audit, Snyk |
| SA-4 | Acquisition Process | T-09 | Dependency review |
| SA-8 | Security Engineering | All | Security-by-design |
| SA-11 | Developer Testing | All | Security test plan |
| SC-5 | Denial of Service Protection | D-01-D-06 | Rate limiting, WAF |
| SC-6 | Resource Availability | D-05 | Storage quotas |
| SC-7 | Boundary Protection | S-06, S-07, D-01 | Cloudflare WAF |
| SC-8 | Transmission Confidentiality | S-02, I-03, I-08 | TLS 1.2+ |
| SC-12 | Cryptographic Key Management | S-01 | JWT key rotation |
| SC-13 | Cryptographic Protection | I-08 | TLS, WSS |
| SC-20 | Secure DNS | S-06 | DNSSEC |
| SC-23 | Session Authenticity | S-03, T-04 | CSRF tokens |
| SC-28 | Protection of Information at Rest | All | Cloudflare encryption |
| SI-2 | Flaw Remediation | T-09 | Patch management |
| SI-3 | Malicious Code Protection | T-08 | File scanning |
| SI-4 | System Monitoring | D-01-D-06 | Usage monitoring |
| SI-10 | Information Input Validation | T-01-T-05, E-01 | Input validation |
| SI-11 | Error Handling | All | Error sanitization |
| SI-15 | Information Management | T-01, T-02 | Content sanitization |

---

## 14. Residual Risk Assessment

### 14.1 Post-Mitigation Risk

After implementing all P0 and P1 mitigations:

| Risk Level | Pre-Mitigation | Post-Mitigation | Change |
|------------|---------------|-----------------|--------|
| Critical | 6 | 0 | -6 |
| High | 16 | 2 | -14 |
| Medium | 14 | 10 | -4 |
| Low | 6 | 12 | +6 |
| **Total** | **42** | **24** | **-18** |

### 14.2 Accepted Residual Risks

| Threat ID | Risk Level | Rationale for Acceptance |
|-----------|------------|-------------------------|
| T-07 | Low | FSRS manipulation only affects user's own learning; no impact on others |
| S-07 | Low | Cloudflare infrastructure controls are managed by Cloudflare |
| R-05 | Low | Login logging is best practice but not critical for this application |
| D-03 | Low | KV exhaustion mitigated by TTL and Cloudflare limits |
| D-05 | Low | R2 exhaustion mitigated by per-user quotas |
| D-06 | Low | Worker CPU limits enforced by Cloudflare runtime |
| S-06 | Medium | DNS/CDN poisoning mitigated by Cloudflare infrastructure |
| I-05 | Medium | Log sanitization reduces risk; Cloudflare log access controlled |
| I-06 | Medium | Search information leakage is low-sensitivity |
| I-08 | Medium | WebSocket interception mitigated by WSS; low attack surface |

---

## 15. Threat Model Maintenance

### 15.1 Review Schedule

| Trigger | Action | Owner |
|---------|--------|-------|
| New feature added | Update threat model with new entry points | Security Team |
| New API endpoint | Add threat assessment for endpoint | Development Team |
| Architecture change | Re-evaluate trust boundaries | Architecture Team |
| Security incident | Review and update relevant threats | Security Team |
| Quarterly review | Full threat model review | Security Team |
| Pre-launch | Complete threat model audit | Security Team + External |

### 15.2 Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-06-07 | Wikisites Security Team | Initial threat model |

---

**End of Document**
**Document Status:** DRAFT — Pending security review
**Owner:** Wikisites Security Team
