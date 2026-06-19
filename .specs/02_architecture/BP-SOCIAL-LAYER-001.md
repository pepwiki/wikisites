---
document_id: BP-SOCIAL-LAYER-001
title: "Social Layer"
version: "1.0.0"
date: "2026-06-19"
status: DRAFT
authors:
  - name: "Wikisites Architecture Team"
    role: "Primary Authors"
classification: "Internal — Phase 2 Architectural Specification"
ieee_standard: "IEEE 1016-2024"
applicable_sites:
  - ENCP
  - WIKI
abstract: >-
  IEEE 1016 compliant architectural specification for the social layer component
  encompassing comments system, annotation layer, and user accounts. Covers Giscus
  integration with GitHub Discussions, W3C Web Annotation data model, OAuth/JWT/Passkey
  authentication, RBAC enforcement, D1 storage schema, GDPR compliance, and interface
  contracts for all cross-component boundaries.
yellow_paper_refs:
  - "YP-SOCIAL-COMMENTS-001"
  - "YP-SOCIAL-ANNOTATIONS-001"
  - "YP-SOCIAL-ACCOUNTS-001"
---

# Blue Paper: Social Layer

**Document ID:** BP-SOCIAL-LAYER-001
**Version:** 1.0.0
**Date:** 2026-06-19
**Status:** DRAFT
**IEEE Standard:** IEEE 1016-2024

---

## Table of Contents

1. [BP-1: Design Overview](#bp-1-design-overview)
2. [BP-2: Design Decomposition](#bp-2-design-decomposition)
3. [BP-3: Design Rationale](#bp-3-design-rationale)
4. [BP-4: Traceability](#bp-4-traceability)
5. [BP-5: Interface Design](#bp-5-interface-design)
6. [BP-6: Data Design](#bp-6-data-design)
7. [BP-7: Component Design](#bp-7-component-design)
8. [BP-8: Deployment Design](#bp-8-deployment-design)
9. [BP-9: Formal Verification](#bp-9-formal-verification)
10. [BP-10: HAL Specification](#bp-10-hal-specification)
11. [BP-11: Compliance Matrix](#bp-11-compliance-matrix)
12. [BP-12: Quality Checklist](#bp-12-quality-checklist)

---

## BP-1: Design Overview

### 1.1 System Purpose

The Social Layer provides community interaction primitives for both encyclopeptide.com (formal reference) and wikipept.com (collaborative wiki). It unifies comments, inline annotations, and user identity under a single architectural boundary with consistent interface contracts, shared storage schemas, and a unified RBAC model. The layer is split across `packages/shared` (types, schemas), `packages/workers` (API endpoints, D1 access), and site-level components (`packages/encp`, `packages/wiki`).

### 1.2 System Scope

1. **CommentsSystem**: Page-level threaded discussions powered by Giscus (GitHub Discussions backend) with fallback to a custom D1/KV implementation for wiki-native commenting
2. **AnnotationLayer**: Inline text annotations following the W3C Web Annotation Data Model, with XPath-based text anchoring, public/private/shared visibility, and reply threads
3. **UserAccounts**: Authentication (OAuth via GitHub/Google, passkeys via WebAuthn), JWT session management via Durable Objects, RBAC (reader, contributor, moderator, admin), profile management, and GDPR compliance (data export, right to deletion)

### 1.3 Context Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                         SOCIAL LAYER                                 │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │ CommentsSystem   │  │ AnnotationLayer   │  │ UserAccounts     │  │
│  │                  │  │                   │  │                  │  │
│  │ ┌──────────────┐ │  │ ┌───────────────┐ │  │ ┌──────────────┐│  │
│  │ │ Giscus       │ │  │ │ W3C Annot     │ │  │ │ OAuth        ││  │
│  │ │ Integration  │ │  │ │ Data Model    │ │  │ │ (GitHub,     ││  │
│  │ └──────────────┘ │  │ └───────────────┘ │  │ │  Google)     ││  │
│  │ ┌──────────────┐ │  │ ┌───────────────┐ │  │ └──────────────┘│  │
│  │ │ Custom D1    │ │  │ │ XPath Anchor  │ │  │ ┌──────────────┐│  │
│  │ │ Comments     │ │  │ │ Engine        │ │  │ │ JWT Session  ││  │
│  │ └──────────────┘ │  │ └───────────────┘ │  │ │ (Durable Obj)││  │
│  │ ┌──────────────┐ │  │ ┌───────────────┐ │  │ └──────────────┘│  │
│  │ │ Thread       │ │  │ │ Visibility    │ │  │ ┌──────────────┐│  │
│  │ │ Manager      │ │  │ │ Controller    │ │  │ │ RBAC         ││  │
│  │ └──────────────┘ │  │ └───────────────┘ │  │ │ Enforcer     ││  │
│  └──────────────────┘  └──────────────────┘  │ └──────────────┘│  │
│                                               │ ┌──────────────┐│  │
│                                               │ │ GDPR         ││  │
│                                               │ │ Compliance   ││  │
│                                               │ └──────────────┘│  │
│                                               └──────────────────┘  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
         │                        │                        │
         ▼                        ▼                        ▼
   ┌──────────┐            ┌──────────┐            ┌──────────┐
   │ GitHub   │            │ Cloudflare│           │ Cloudflare│
   │Discuss.  │            │ D1 + KV  │            │ Durable  │
   │ API      │            │          │            │ Objects  │
   └──────────┘            └──────────┘            └──────────┘
```

---

## BP-2: Design Decomposition

### 2.1 Component Hierarchy

```
packages/shared/src/social/
├── comments/
│   ├── giscusAdapter.ts          (Giscus ↔ internal comment model mapping)
│   ├── customCommentStore.ts     (D1-backed comment CRUD)
│   ├── threadManager.ts          (Thread nesting, reply management)
│   └── spamGuard.ts              (Rate limiting, content filtering)
├── annotations/
│   ├── annotationModel.ts        (W3C Web Annotation data model types)
│   ├── anchorEngine.ts           (XPath/text-position anchoring)
│   ├── visibilityController.ts   (public/private/shared visibility)
│   └── annotationStore.ts        (D1-backed annotation CRUD)
├── accounts/
│   ├── oauthHandler.ts           (GitHub, Google OAuth flows)
│   ├── passkeyHandler.ts         (WebAuthn/FIDO2 registration/assertion)
│   ├── jwtSession.ts             (JWT issuance, validation, refresh)
│   ├── rbacEnforcer.ts           (Role-based permission checks)
│   ├── profileManager.ts         (Profile CRUD, preferences)
│   └── gdprCompliance.ts         (Data export, deletion, consent)
└── shared/
    ├── socialSchemas.ts          (Zod schemas for all social entities)
    └── socialTypes.ts            (TypeScript type definitions)

packages/workers/src/routes/social/
├── comments.ts                   (REST: /api/comments/*)
├── annotations.ts                (REST: /api/annotations/*)
├── auth.ts                       (REST: /api/auth/*)
├── users.ts                      (REST: /api/users/*)
└── gdpr.ts                       (REST: /api/gdpr/*)

packages/encp/src/components/social/
├── GiscusComments.astro          (Giscus wrapper for encp)
├── AnnotationOverlay.tsx         (SolidJS annotation rendering)
└── UserProfileBadge.tsx          (User avatar + name display)

packages/wiki/src/components/social/
├── WikiComments.tsx              (Custom D1 comments for wiki)
├── AnnotationToolbar.tsx         (SolidJS annotation creation UI)
└── ContributorList.tsx           (Wiki contributor sidebar)
```

### 2.2 Component Descriptions

| Component | Module | Responsibility | Dependencies |
|-----------|--------|----------------|--------------|
| GiscusAdapter | comments/ | Map Giscus events to internal Comment model | GitHub Discussions API |
| CustomCommentStore | comments/ | CRUD for D1-backed comments | Cloudflare D1 |
| ThreadManager | comments/ | Nesting, reply threading, depth limits | CustomCommentStore |
| SpamGuard | comments/ | Rate limiting, content filtering | KV (rate limit counters) |
| AnnotationModel | annotations/ | W3C Web Annotation typed structures | None (pure types) |
| AnchorEngine | annotations/ | Compute and resolve text anchors | None (DOM algorithms) |
| VisibilityController | annotations/ | Enforce public/private/shared access | RBACEnforcer |
| AnnotationStore | annotations/ | CRUD for D1-backed annotations | Cloudflare D1 |
| OAuthHandler | accounts/ | OAuth 2.0 authorization code flow | Provider APIs |
| PasskeyHandler | accounts/ | WebAuthn registration and assertion | WebAuthn API |
| JWTSession | accounts/ | Issue, validate, refresh JWT sessions | Cloudflare Durable Objects |
| RBACEnforcer | accounts/ | Permission checks against role matrix | JWTSession |
| ProfileManager | accounts/ | User profile CRUD, preference storage | Cloudflare D1 |
| GDPRCompliance | accounts/ | Data export, right to deletion, consent | D1, R2 |

---

## BP-3: Design Rationale

### 3.1 Giscus vs Custom Comments

| Criterion | Giscus Only | Custom D1 Only | Hybrid (Both) | Decision |
|-----------|-------------|-----------------|---------------|----------|
| Setup effort | Minimal | High | Medium | — |
| Wiki-native editing | No (GitHub redirect) | Yes | Custom for wiki | — |
| Auth model | GitHub only | Flexible | Both | — |
| Moderation tools | GitHub Discussions | Custom build | Both | — |
| Offline/sync | Impossible | Possible | Custom path | — |
| Data ownership | GitHub-hosted | Full control | Hybrid | — |

**Decision**: Giscus for encyclopeptide.com (formal, read-heavy, low edit frequency). Custom D1/KV for wikipept.com (collaborative, requires inline editing, wiki-native auth). Shared `Comment` interface abstracts both backends.

### 3.2 W3C Web Annotation Over Custom Model

| Criterion | Custom Model | W3C Web Annotation | Decision |
|-----------|-------------|-------------------|----------|
| Interoperability | None | Standard | W3C — future-proof |
| Complexity | Low | Medium | Acceptable |
| Tooling ecosystem | None | Hypothesis, etc. | W3C — reusable |
| XPath anchoring | Custom | Spec-defined | W3C — well-specified |

**Decision**: W3C Web Annotation Data Model for annotation structures. XPath-based selectors for text anchoring (aligned with W3C selectors spec). Custom extensions for visibility (public/private/shared) as `custom` fields in the annotation body.

### 3.3 JWT Sessions via Durable Objects

| Criterion | KV-only Sessions | Durable Objects | Decision |
|-----------|-------------------|-----------------|----------|
| Consistency | Eventual | Strong | DO — auth requires strong consistency |
| Cold start | Fast | ~50ms | Acceptable for auth flows |
| Scalability | Global | Per-object | DO — natural session affinity |
| Stateful operations | Manual | Built-in | DO — simpler code |

**Decision**: Durable Objects for session management. Each user session maps to a Durable Object instance keyed by session ID. Enables strong-consistency token validation and real-time session revocation.

### 3.4 RBAC Role Hierarchy

| Role | Permissions | Use Case |
|------|-------------|----------|
| reader | Read pages, read annotations, read comments | Default for anonymous/authenticated users |
| contributor | reader + create annotations, create comments, edit own content | Active community members |
| moderator | contributor + moderate comments/annotations, review edits | Trusted community leaders |
| admin | moderator + manage users, manage settings, analytics | Platform operators |

---

## BP-4: Traceability

| Requirement ID | Component | Verification |
|----------------|-----------|--------------|
| FR-031 | CommentsSystem.GiscusAdapter | Giscus event → Comment model mapping test |
| FR-032 | CommentsSystem.CustomCommentStore | D1 CRUD roundtrip test |
| FR-033 | CommentsSystem.ThreadManager | Thread depth ≤ 5 enforcement test |
| FR-034 | CommentsSystem.SpamGuard | Rate limit > threshold → rejection test |
| FR-035 | AnnotationLayer.AnnotationModel | W3C JSON-LD serialization test |
| FR-036 | AnnotationLayer.AnchorEngine | XPath resolve → correct text range test |
| FR-037 | AnnotationLayer.VisibilityController | Private annotation invisible to non-owner test |
| FR-038 | UserAccounts.OAuthHandler | OAuth code → token → user profile test |
| FR-039 | UserAccounts.PasskeyHandler | WebAuthn register → authenticate roundtrip |
| FR-040 | UserAccounts.JWTSession | JWT issue → validate → refresh lifecycle test |
| FR-041 | UserAccounts.RBACEnforcer | Permission denied for insufficient role test |
| FR-042 | UserAccounts.GDPRCompliance | Data export contains all user data test |
| FR-043 | UserAccounts.GDPRCompliance | Deletion removes all PII test |
| FR-044 | UserAccounts.ProfileManager | Profile update roundtrip test |
| FR-045 | UserAccounts.ProfileManager | Preference sync across devices test |

---

## BP-5: Interface Design

### 5.1 IF-COMMENT-001: Comment Interface

```typescript
interface Comment {
  id: string;                       // UUID v7
  pageId: string;                   // Page this comment belongs to
  parentId: string | null;          // null = top-level, else reply target
  authorId: string;                 // User UUID
  authorName: string;               // Display name (denormalized)
  authorAvatar: string | null;      // Avatar URL (denormalized)
  body: string;                     // Markdown content (max 5000 chars)
  createdAt: string;                // ISO 8601
  updatedAt: string;                // ISO 8601
  edited: boolean;                  // Has been edited after creation
  deleted: boolean;                 // Soft-deleted (author or moderator)
  depth: number;                    // Thread depth (0 = top-level, max 5)
  reactionCounts: Record<string, number>; // e.g. { "👍": 3, "🎓": 1 }
  provider: "giscus" | "custom";    // Backend provider
}

interface CreateCommentRequest {
  pageId: string;
  parentId: string | null;
  body: string;                     // max 5000 chars
}

interface UpdateCommentRequest {
  body: string;                     // max 5000 chars
}

interface CommentListRequest {
  pageId: string;
  parentId?: string;                // Filter by thread
  limit?: number;                   // Default: 50, max: 200
  offset?: number;                  // Default: 0
  sort?: "newest" | "oldest" | "most_reactions";
}

interface CommentListResponse {
  comments: Comment[];
  total: number;
  hasMore: boolean;
}
```

### 5.2 IF-ANNOT-001: Annotation Interface

```typescript
interface Annotation {
  id: string;                       // UUID v7
  type: "Annotation";               // W3C type
  pageId: string;                   // Page this annotation targets
  authorId: string;
  authorName: string;
  body: AnnotationBody;
  target: AnnotationTarget;
  visibility: "public" | "private" | "shared";
  sharedWith: string[];             // User IDs (for "shared" visibility)
  createdAt: string;
  updatedAt: string;
  replies: AnnotationReply[];
  tags: string[];                   // User-defined tags
}

interface AnnotationBody {
  type: "TextualBody";
  value: string;                    // Annotation text (max 2000 chars)
  format: "text/markdown";
  purpose: "commenting" | "highlighting" | "question" | "correction";
}

interface AnnotationTarget {
  source: string;                   // Page URL or ID
  selector: TextSelector;
}

interface TextSelector {
  type: "XPathSelector" | "TextPositionSelector";
  // XPath variant
  startContainer?: string;          // XPath to start node
  startOffset?: number;
  endContainer?: string;            // XPath to end node
  endOffset?: number;
  // TextPosition variant (fallback)
  start?: number;                   // Character offset from start
  end?: number;
  exact?: string;                   // Exact text for verification
  prefix?: string;                  // Context before (for fuzzy matching)
  suffix?: string;                  // Context after (for fuzzy matching)
}

interface AnnotationReply {
  id: string;
  authorId: string;
  authorName: string;
  body: string;                     // max 2000 chars
  createdAt: string;
}

interface CreateAnnotationRequest {
  pageId: string;
  body: AnnotationBody;
  target: AnnotationTarget;
  visibility: "public" | "private" | "shared";
  sharedWith?: string[];
  tags?: string[];
}

interface AnnotationListRequest {
  pageId: string;
  visibility?: "public" | "private" | "shared" | "all";
  authorId?: string;
  limit?: number;
  offset?: number;
}

interface AnnotationListResponse {
  annotations: Annotation[];
  total: number;
  hasMore: boolean;
}
```

### 5.3 IF-USER-001: User Accounts Interface

```typescript
interface User {
  id: string;                       // UUID v7
  email: string;
  displayName: string;              // min 1, max 100
  avatarUrl: string | null;
  role: UserRole;
  authProvider: "github" | "google" | "passkey";
  createdAt: string;
  lastLoginAt: string;
  preferences: UserPreferences;
  gdprConsent: GDPRConsent;
}

type UserRole = "reader" | "contributor" | "moderator" | "admin";

interface UserPreferences {
  locale: string;                   // ISO 639-1, default "en"
  theme: "light" | "dark" | "system";
  editorFontSize: number;           // 12–24, default 16
  showAnnotations: boolean;         // Default true
  emailNotifications: boolean;     // Default true
}

interface GDPRConsent {
  analytics: boolean;               // Consent to analytics tracking
  marketing: boolean;               // Consent to marketing emails
  consentedAt: string;              // ISO 8601
  lastUpdated: string;
}

interface AuthSession {
  accessToken: string;              // JWT, expires in 15 min
  refreshToken: string;             // Opaque, expires in 30 days
  expiresAt: string;                // ISO 8601
  user: User;
}

interface OAuthCallbackRequest {
  provider: "github" | "google";
  code: string;
  state: string;                    // CSRF protection
}

interface PasskeyRegistrationRequest {
  username: string;
  displayName: string;
}

interface PasskeyAuthenticationRequest {
  credentialId: string;
  authenticatorData: string;
  clientDataJSON: string;
  signature: string;
}

interface UserProfileUpdateRequest {
  displayName?: string;
  avatarUrl?: string;
  preferences?: Partial<UserPreferences>;
}

interface DataExportResponse {
  user: User;
  comments: Comment[];
  annotations: Annotation[];
  exportedAt: string;
  formatVersion: string;
}
```

---

## BP-6: Data Design

### 6.1 D1 Schema: Comments

```sql
CREATE TABLE comments (
  id TEXT PRIMARY KEY,              -- UUID v7
  page_id TEXT NOT NULL,
  parent_id TEXT REFERENCES comments(id),
  author_id TEXT NOT NULL,
  author_name TEXT NOT NULL,        -- Denormalized for read performance
  author_avatar TEXT,
  body TEXT NOT NULL,               -- Markdown, max 5000 chars
  depth INTEGER NOT NULL DEFAULT 0,
  deleted INTEGER NOT NULL DEFAULT 0,
  edited INTEGER NOT NULL DEFAULT 0,
  provider TEXT NOT NULL DEFAULT 'custom',
  created_at TEXT NOT NULL,         -- ISO 8601
  updated_at TEXT NOT NULL
);

CREATE INDEX idx_comments_page ON comments(page_id);
CREATE INDEX idx_comments_parent ON comments(parent_id);
CREATE INDEX idx_comments_author ON comments(author_id);

CREATE TABLE comment_reactions (
  id TEXT PRIMARY KEY,
  comment_id TEXT NOT NULL REFERENCES comments(id),
  user_id TEXT NOT NULL,
  emoji TEXT NOT NULL,              -- Unicode emoji
  created_at TEXT NOT NULL,
  UNIQUE(comment_id, user_id, emoji)
);

CREATE INDEX idx_reactions_comment ON comment_reactions(comment_id);
```

### 6.2 D1 Schema: Annotations

```sql
CREATE TABLE annotations (
  id TEXT PRIMARY KEY,              -- UUID v7
  page_id TEXT NOT NULL,
  author_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  body_value TEXT NOT NULL,         -- Markdown, max 2000 chars
  body_purpose TEXT NOT NULL DEFAULT 'commenting',
  target_source TEXT NOT NULL,
  selector_type TEXT NOT NULL,      -- 'XPathSelector' | 'TextPositionSelector'
  selector_json TEXT NOT NULL,      -- Serialized selector as JSON
  visibility TEXT NOT NULL DEFAULT 'public',
  tags TEXT NOT NULL DEFAULT '[]',  -- JSON array of tags
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX idx_annotations_page ON annotations(page_id);
CREATE INDEX idx_annotations_author ON annotations(author_id);
CREATE INDEX idx_annotations_page_vis ON annotations(page_id, visibility);

CREATE TABLE annotation_shared_with (
  annotation_id TEXT NOT NULL REFERENCES annotations(id),
  user_id TEXT NOT NULL,
  PRIMARY KEY (annotation_id, user_id)
);

CREATE TABLE annotation_replies (
  id TEXT PRIMARY KEY,
  annotation_id TEXT NOT NULL REFERENCES annotations(id),
  author_id TEXT NOT NULL,
  author_name TEXT NOT NULL,
  body TEXT NOT NULL,               -- max 2000 chars
  created_at TEXT NOT NULL
);

CREATE INDEX idx_replies_annotation ON annotation_replies(annotation_id);
```

### 6.3 D1 Schema: Users

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,              -- UUID v7
  email TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'reader',
  auth_provider TEXT NOT NULL,
  auth_provider_id TEXT NOT NULL,   -- Provider-specific user ID
  created_at TEXT NOT NULL,
  last_login_at TEXT NOT NULL,
  preferences TEXT NOT NULL DEFAULT '{}',  -- JSON
  gdpr_consent TEXT NOT NULL DEFAULT '{}', -- JSON
  deleted_at TEXT,                  -- Soft delete for GDPR
  UNIQUE(auth_provider, auth_provider_id)
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

### 6.4 Durable Object: Session Store

```typescript
interface SessionStore {
  sessions: Map<string, {
    userId: string;
    accessToken: string;
    refreshToken: string;
    createdAt: string;
    expiresAt: string;
    ipAddress: string;
    userAgent: string;
  }>;
  // Strong consistency for token validation
  validateToken(token: string): Promise<User | null>;
  createSession(userId: string, ip: string, ua: string): Promise<AuthSession>;
  revokeSession(sessionId: string): Promise<void>;
  revokeAllSessions(userId: string): Promise<void>;
}
```

---

## BP-7: Component Design

### 7.1 OAuth Authentication Flow

```
User          Browser        Worker         OAuth Provider    Durable Object
  │              │              │                │                │
  │ click login  │              │                │                │
  │─────────────>│              │                │                │
  │              │ GET /auth/   │                │                │
  │              │  github/     │                │                │
  │              │  login       │                │                │
  │              │─────────────>│                │                │
  │              │              │ generate state │                │
  │              │              │ (CSRF token)   │                │
  │              │              │──────────────────────────────>  │
  │              │              │                │  store state   │
  │              │ 302 redirect │                │                │
  │              │<─────────────│                │                │
  │              │              │                │                │
  │              │ redirect to  │                │                │
  │              │ github.com/  │                │                │
  │              │  login       │                │                │
  │              │─────────────────────────────>│                │
  │              │              │                │ user authenticates
  │              │              │                │                │
  │              │ redirect to  │                │                │
  │              │ /auth/       │                │                │
  │              │  callback    │                │                │
  │              │─────────────>│                │                │
  │              │              │ exchange code  │                │
  │              │              │ for token      │                │
  │              │              │─────────────────────────────>   │
  │              │              │                │                │
  │              │              │ validate state │                │
  │              │              │<──────────────────────────────  │
  │              │              │                │                │
  │              │              │ get/create user│                │
  │              │              │─────────────>  │                │
  │              │              │                │                │
  │              │              │ create session │                │
  │              │              │──────────────────────────────>  │
  │              │              │                │  AuthSession   │
  │              │ set cookies  │<──────────────────────────────  │
  │              │<─────────────│                │                │
  │              │              │                │                │
```

### 7.2 Annotation Creation Flow

```
User          AnnotationToolbar   AnchorEngine   AnnotationStore   D1
  │                │                  │                │              │
  │ select text    │                  │                │              │
  │───────────────>│                  │                │              │
  │                │                  │                │              │
  │ click annot.   │                  │                │              │
  │ button         │                  │                │              │
  │───────────────>│                  │                │              │
  │                │ computeXPath()   │                │              │
  │                │─────────────────>│                │              │
  │                │ XPath selector   │                │              │
  │                │<─────────────────│                │              │
  │                │                  │                │              │
  │                │ POST /annotations│                │              │
  │                │──────────────────────────────────>│              │
  │                │                  │                │ INSERT       │
  │                │                  │                │─────────────>│
  │                │                  │                │ annotation_id│
  │                │                  │                │<─────────────│
  │                │ {annotation}     │                │              │
  │                │<──────────────────────────────────│              │
  │                │                  │                │              │
  │ highlight text │                  │                │              │
  │<───────────────│                  │                │              │
```

### 7.3 RBAC Enforcement Flow

```
Request          RBACEnforcer     JWTSession      Permission Matrix
  │                  │                │                │
  │ Authorization    │                │                │
  │ Header: Bearer   │                │                │
  │─────────────────>│                │                │
  │                  │ validate(token)│                │
  │                  │───────────────>│                │
  │                  │ {userId, role} │                │
  │                  │<───────────────│                │
  │                  │                │                │
  │                  │ check(         │                │
  │                  │   role,        │                │
  │                  │   "page:edit"  │                │
  │                  │ )              │                │
  │                  │───────────────────────────────>│
  │                  │ allowed/denied │                │
  │                  │<───────────────────────────────│
  │                  │                │                │
  │ 200 OK or       │                │                │
  │ 403 Forbidden   │                │                │
  │<─────────────────│                │                │
```

---

## BP-8: Deployment Design

### 8.1 Worker Route Topology

```
┌─────────────────────────────────────────────────────────┐
│                  CLOUDFLARE WORKERS                       │
│                                                           │
│  Routes:                                                  │
│  ├── /api/auth/github/login      → OAuthHandler          │
│  ├── /api/auth/github/callback   → OAuthHandler          │
│  ├── /api/auth/google/login      → OAuthHandler          │
│  ├── /api/auth/google/callback   → OAuthHandler          │
│  ├── /api/auth/passkey/*         → PasskeyHandler        │
│  ├── /api/auth/session           → JWTSession            │
│  ├── /api/auth/logout            → JWTSession            │
│  │                                                        │
│  ├── /api/comments/*             → CommentsSystem        │
│  ├── /api/annotations/*          → AnnotationLayer       │
│  │                                                        │
│  ├── /api/users/me               → ProfileManager        │
│  ├── /api/users/:id              → ProfileManager (public)│
│  │                                                        │
│  └── /api/gdpr/export            → GDPRCompliance        │
│      /api/gdpr/delete            → GDPRCompliance        │
│                                                           │
│  D1 Bindings:                                             │
│  ├── WIKISITES_DB (comments, annotations, users)         │
│                                                           │
│  KV Bindings:                                             │
│  ├── RATE_LIMITS (spam prevention counters)              │
│  ├── OAUTH_STATES (CSRF state tokens, TTL: 10 min)      │
│                                                           │
│  Durable Object Bindings:                                 │
│  ├── SESSION_STORE (per-session strong consistency)       │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### 8.2 Resource Requirements

| Resource | Comments | Annotations | Sessions |
|----------|----------|-------------|----------|
| D1 rows (10k users) | ~50,000 | ~20,000 | N/A |
| D1 reads/day | ~10,000 | ~5,000 | N/A |
| D1 writes/day | ~1,000 | ~500 | N/A |
| KV reads/day | ~5,000 (rate limits) | ~2,000 | N/A |
| KV writes/day | ~1,000 | ~500 | N/A |
| DO instances | N/A | N/A | ~100 active |
| Latency (p95) | <100ms | <100ms | <50ms |

---

## BP-9: Formal Verification

| Property ID | Property Description | Proof Method | Status |
|-------------|---------------------|--------------|--------|
| FV-SOCIAL-001 | Comment depth never exceeds 5 | Property test: ∀ comment, depth ≤ 5 | Pending |
| FV-SOCIAL-002 | Private annotations invisible to non-owners | Access control test: ∀ annotation, if visibility=private then author ≠ requestingUser → 403 | Pending |
| FV-SOCIAL-003 | JWT tokens are validated before RBAC check | Sequence test: validate → check order | Pending |
| FV-SOCIAL-004 | OAuth state tokens are single-use | State machine: used → invalidated | Pending |
| FV-SOCIAL-005 | GDPR deletion removes all PII | Completeness test: export after delete = empty user | Pending |
| FV-SOCIAL-006 | RBAC hierarchy is monotonic | Property test: admin ⊃ moderator ⊃ contributor ⊃ reader | Pending |
| FV-SOCIAL-007 | Rate limits are per-user per-endpoint | Property test: same user, same endpoint, > limit → 429 | Pending |
| FV-SOCIAL-008 | Annotation replies inherit parent visibility | Property test: reply.visibility = parent.visibility | Pending |

---

## BP-10: HAL Specification

```typescript
interface SocialLayerHAL {
  // Comments
  comments: {
    list(pageId: string, opts?: CommentListRequest): Promise<CommentListResponse>;
    create(req: CreateCommentRequest): Promise<Comment>;
    update(id: string, req: UpdateCommentRequest): Promise<Comment>;
    delete(id: string): Promise<void>;
    react(id: string, emoji: string): Promise<void>;
    unreact(id: string, emoji: string): Promise<void>;
  };

  // Annotations
  annotations: {
    list(pageId: string, opts?: AnnotationListRequest): Promise<AnnotationListResponse>;
    create(req: CreateAnnotationRequest): Promise<Annotation>;
    update(id: string, body: AnnotationBody): Promise<Annotation>;
    delete(id: string): Promise<void>;
    reply(annotationId: string, body: string): Promise<AnnotationReply>;
    resolve(anchor: TextSelector): Promise<ResolvedAnchor | null>;
  };

  // Authentication
  auth: {
    githubLoginUrl(state: string): string;
    googleLoginUrl(state: string): string;
    handleCallback(provider: string, code: string, state: string): Promise<AuthSession>;
    passkeyRegister(username: string): Promise<PasskeyChallenge>;
    passkeyAuthenticate(): Promise<PasskeyChallenge>;
    validateToken(token: string): Promise<User | null>;
    refreshSession(refreshToken: string): Promise<AuthSession>;
    logout(sessionId: string): Promise<void>;
  };

  // User Management
  users: {
    getProfile(userId: string): Promise<User>;
    updateProfile(userId: string, req: UserProfileUpdateRequest): Promise<User>;
    checkPermission(userId: string, permission: string): Promise<boolean>;
  };

  // GDPR
  gdpr: {
    exportData(userId: string): Promise<DataExportResponse>;
    deleteAccount(userId: string): Promise<void>;
    updateConsent(userId: string, consent: Partial<GDPRConsent>): Promise<void>;
  };
}
```

---

## BP-11: Compliance Matrix

| Standard | Requirement | Component | Status |
|----------|------------|-----------|--------|
| IEEE 1016-2024 | Software design description | This document | Compliant |
| W3C Web Annotation | Data model conformance | AnnotationLayer | Target |
| OAuth 2.0 | Authorization code flow | OAuthHandler | Target |
| RFC 7519 (JWT) | Session token format | JWTSession | Target |
| WebAuthn Level 3 | Passkey registration/assertion | PasskeyHandler | Target |
| GDPR Art. 17 | Right to erasure | GDPRCompliance | Target |
| GDPR Art. 20 | Right to data portability | GDPRCompliance | Target |
| WCAG 2.1 AA | Accessibility of social components | All UI components | Target |

---

## BP-12: Quality Checklist

### 12.1 Component Completeness

- [ ] CommentsSystem: Giscus adapter + custom D1 store + thread manager + spam guard
- [ ] AnnotationLayer: W3C model + XPath anchor engine + visibility controller + D1 store
- [ ] UserAccounts: OAuth (GitHub, Google) + passkeys + JWT sessions + RBAC + profiles + GDPR

### 12.2 Interface Completeness

- [ ] IF-COMMENT-001: Comment, CreateCommentRequest, CommentListRequest/Response
- [ ] IF-ANNOT-001: Annotation, AnnotationBody, AnnotationTarget, TextSelector, CreateAnnotationRequest
- [ ] IF-USER-001: User, AuthSession, OAuthCallbackRequest, DataExportResponse

### 12.3 Security

- [ ] OAuth state tokens are cryptographically random and single-use
- [ ] JWT tokens have 15-minute expiry with refresh rotation
- [ ] RBAC enforcement on all mutating endpoints
- [ ] Rate limiting on comment/annotation creation (10/min per user)
- [ ] Content sanitization on all user-generated Markdown

### 12.4 Privacy

- [ ] GDPR data export includes all user data (comments, annotations, profile)
- [ ] GDPR deletion removes PII and soft-deletes account
- [ ] Private annotations are never returned in public API responses
- [ ] Email addresses are never exposed in public API responses

### 12.5 Performance

- [ ] Comment list for page < 200ms (p95)
- [ ] Annotation list for page < 200ms (p95)
- [ ] Authentication flow < 500ms (p95, excluding provider latency)
- [ ] JWT validation < 20ms (p95)

---

**End of Document**
**Document Status:** DRAFT — Pending architecture review
**Owner:** Wikisites Architecture Team
