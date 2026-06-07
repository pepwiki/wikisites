---
document_id: BP-INFRA-CF-001
title: "Cloudflare Infrastructure"
version: "1.0.0"
date: "2026-06-07"
status: DRAFT
authors:
  - name: "Wikisites Architecture Team"
    role: "Primary Authors"
classification: "Internal — Phase 2 Architectural Specification"
ieee_standard: "IEEE 1016-2024"
applicable_sites:
  - SHARED
abstract: >-
  IEEE 1016 compliant architectural specification for the Cloudflare infrastructure
  layer. Covers Pages configuration, Workers routes, R2 storage for assets, KV
  for caching, D1 for database, Durable Objects for wiki collaboration, DNS
  configuration, SSL/TLS setup, and edge computing topology.
yellow_paper_refs:
  - "YP-WEB-TECH-001"
---

# Blue Paper: Cloudflare Infrastructure

**Document ID:** BP-INFRA-CF-001
**Version:** 1.0.0
**Date:** 2026-06-07
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

The Cloudflare Infrastructure layer provides the global edge computing, storage, and networking foundation for both encyclopeptide.com and wikipept.com. It delivers static content via Cloudflare Pages, executes dynamic logic via Cloudflare Workers, provides eventually-consistent caching via KV, strongly-consistent database via D1, object storage via R2, and real-time collaboration via Durable Objects. The infrastructure is designed for zero-downtime, globally distributed, low-latency operation across 300+ edge locations.

### 1.2 System Scope

1. **Cloudflare Pages**: Static site hosting with Git integration, build pipeline, preview deployments
2. **Cloudflare Workers**: Serverless edge compute for API routes, middleware, edge logic
3. **Cloudflare KV**: Eventually-consistent key-value store for caching, sessions, feature flags
4. **Cloudflare D1**: Edge-native SQLite database for persistent structured data
5. **Cloudflare R2**: S3-compatible object storage for molecular structure files, images, downloads
6. **Cloudflare Durable Objects**: Strongly-consistent edge compute with persistence for wiki collaboration
7. **DNS**: Cloudflare-managed DNS with automatic record creation
8. **SSL/TLS**: Full (strict) SSL mode with HSTS, Certificate Transparency

### 1.3 Stakeholders

| Stakeholder | Role | Primary Concern |
|-------------|------|-----------------|
| End Users | Site visitors | Fast loading, global availability |
| Developers | Build/deploy engineers | CI/CD pipeline, preview deploys |
| DevOps | Infrastructure operators | Monitoring, scaling, cost management |
| Security | Trust and safety | DDoS protection, WAF, SSL |
| Content Authors | Indirect | Preview deploys for draft content |

### 1.4 Context Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLOUDFLARE EDGE NETWORK                        │
│                    (300+ Points of Presence)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    DNS Layer                              │   │
│  │  encyclopeptide.com → Cloudflare Pages                   │   │
│  │  wikipept.com       → Cloudflare Pages                   │   │
│  │  api.encyclopeptide.com → Cloudflare Workers             │   │
│  │  api.wikipept.com       → Cloudflare Workers             │   │
│  └──────────────────────┬──────────────────────────────────┘   │
│                         │                                        │
│                         ▼                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    SSL/TLS Termination                    │   │
│  │  Full (strict) mode                                       │   │
│  │  HSTS: includeSubDomains, preload, max-age=63072000     │   │
│  │  Certificate Transparency logging                        │   │
│  └──────────────────────┬──────────────────────────────────┘   │
│                         │                                        │
│                         ▼                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    WAF / DDoS Protection                  │   │
│  │  Cloudflare managed rules                                 │   │
│  │  Rate limiting rules                                      │   │
│  │  Bot management                                           │   │
│  └──────────────────────┬──────────────────────────────────┘   │
│                         │                                        │
│                         ▼                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    CDN / Cache Layer                       │   │
│  │  Static assets: immutable cache                           │   │
│  │  HTML pages: stale-while-revalidate                       │   │
│  │  API responses: short TTL cache                           │   │
│  └──────────────────────┬──────────────────────────────────┘   │
│                         │                                        │
│                         ▼                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Cloudflare Pages                        │   │
│  │  encyclopeptide.com (static site)                         │   │
│  │  wikipept.com (static + dynamic routes)                   │   │
│  └──────────────────────┬──────────────────────────────────┘   │
│                         │                                        │
│                         ▼                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Cloudflare Workers                      │   │
│  │  /api/* routes                                            │   │
│  │  Middleware (auth, rate limiting, headers)                 │   │
│  │  Edge compute (search, calculations)                      │   │
│  └──────┬──────────────┬──────────────┬───────────────────┘   │
│         │              │              │                         │
│         ▼              ▼              ▼                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                    │
│  │   KV     │  │   D1     │  │   R2     │                    │
│  │ (Cache)  │  │ (SQLite) │  │ (Object) │                    │
│  └──────────┘  └──────────┘  └──────────┘                    │
│         │              │              │                         │
│         ▼              ▼              ▼                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Durable Objects                         │   │
│  │  Wiki collaboration rooms                                 │   │
│  │  Quiz session state                                       │   │
│  │  Flashcard review state                                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## BP-2: Design Decomposition

### 2.1 Component Hierarchy

```
Cloudflare Infrastructure
├── DNS Configuration
│   ├── Zone: encyclopeptide.com
│   │   ├── A/AAAA records → Pages
│   │   ├── CNAME records → custom subdomains
│   │   └── TXT records → domain verification
│   └── Zone: wikipept.com
│       ├── A/AAAA records → Pages
│       ├── CNAME records → custom subdomains
│       └── TXT records → domain verification
├── SSL/TLS Configuration
│   ├── Mode: Full (strict)
│   ├── HSTS: includeSubDomains, preload
│   ├── Min TLS version: 1.2
│   ├── Certificate: Universal SSL
│   └── Edge Certificates: managed
├── WAF & Security
│   ├── Managed Rulesets (OWASP Top 10)
│   ├── Rate Limiting Rules
│   ├── Bot Fight Mode
│   └── Custom Firewall Rules
├── Cloudflare Pages Projects
│   ├── encyclopeptide-pages
│   │   ├── Production branch: main
│   │   ├── Build command: bun run build
│   │   ├── Build output: dist
│   │   ├── Environment variables: [encrypted]
│   │   └── Preview deployments: per PR
│   └── wikipept-pages
│       ├── Production branch: main
│       ├── Build command: pnpm build
│       ├── Build output: dist
│       ├── Environment variables: [encrypted]
│       └── Preview deployments: per PR
├── Cloudflare Workers
│   ├── encyclopeptide-api
│   │   ├── Routes: api.encyclopeptide.com/*
│   │   ├── Bindings: KV, R2, D1
│   │   └── Cron: daily DOI validation
│   └── wikipept-api
│       ├── Routes: api.wikipept.com/*
│       ├── Bindings: KV, R2, D1, Durable Objects
│       └── Cron: hourly index refresh
├── KV Namespaces
│   ├── ENCP_CACHE (encyclopeptide.com)
│   ├── ENCP_SESSION (encyclopeptide.com sessions)
│   ├── WIKI_CACHE (wikipept.com)
│   ├── WIKI_SESSION (wikipept.com sessions)
│   ├── WIKI_SEARCH (wikipept.com search index)
│   └── WIKI_FEATURES (feature flags)
├── R2 Buckets
│   ├── encyclopeptide-assets (molecular structures, images)
│   └── wikipept-uploads (user uploads, imported decks)
├── D1 Databases
│   ├── wikipept-users (user accounts, auth)
│   ├── wikipept-content (wiki pages, revisions)
│   ├── wikipept-quiz (quiz sessions, questions)
│   ├── wikipept-flashcards (flashcard decks, FSRS state)
│   ├── wikipept-progress (learning metrics)
│   └── wikipept-reputation (reputation scores)
├── Durable Objects
│   ├── WikiRoom (wiki collaboration)
│   │   ├── Namespace: WIKI_ROOM
│   │   └── Persistence: D1 or in-memory
│   ├── QuizSession (quiz state)
│   │   ├── Namespace: QUIZ_SESSION
│   │   └── Persistence: D1
│   └── ReviewSession (flashcard review)
│       ├── Namespace: REVIEW_SESSION
│       └── Persistence: D1
├── Cron Triggers
│   ├── doi-validation: 0 2 * * * (daily at 2 AM UTC)
│   ├── index-refresh: */15 * * * * (every 15 minutes for wiki)
│   ├── backup-d1: 0 3 * * * (daily at 3 AM UTC)
│   └── analytics-rollup: 0 * * * * (hourly)
└── Analytics
    ├── Cloudflare Web Analytics (both sites)
    └── Cloudflare Log Analytics (Workers)
```

### 2.2 Component Descriptions

| Component | Service | Responsibility | Configuration |
|-----------|---------|----------------|---------------|
| DNS | Cloudflare DNS | Resolve domain names to edge | A, AAAA, CNAME, TXT records |
| SSL/TLS | Cloudflare Edge | Encrypt connections, HSTS | Full strict, min TLS 1.2 |
| WAF | Cloudflare WAF | Block malicious requests | OWASP managed rules, rate limits |
| Pages | Cloudflare Pages | Host static sites | Git integration, build pipeline |
| Workers | Cloudflare Workers | Execute edge compute | Routes, bindings, cron |
| KV | Cloudflare KV | Eventually-consistent cache | Namespaces per site |
| D1 | Cloudflare D1 | Edge SQLite database | Databases per feature |
| R2 | Cloudflare R2 | Object storage | Buckets per site |
| Durable Objects | Cloudflare DO | Stateful edge compute | Namespaces per collaboration type |
| Cron | Cron Triggers | Scheduled tasks | Periodic jobs |

---

## BP-3: Design Rationale

### 3.1 Cloudflare Over AWS/GCP/Azure

| Criterion | Cloudflare | AWS | GCP | Decision |
|-----------|------------|-----|-----|----------|
| Edge locations | 300+ | 90+ | 40+ | Cloudflare — global reach |
| Cold start | <5ms | 100–500ms | 100–500ms | Cloudflare — instant |
| Pricing | Generous free tier | Pay-per-use | Pay-per-use | Cloudflare — predictable |
| Egress fees | Zero (R2) | $0.09/GB | $0.12/GB | Cloudflare — zero egress |
| D1 (SQLite at edge) | Native | — | — | Cloudflare — unique |
| Durable Objects | Native | — | — | Cloudflare — unique |
| WAF included | Yes | Extra cost | Extra cost | Cloudflare — built-in |
| DDoS protection | Included | Shield ($$$) | Cloud Armor | Cloudflare — included |

**Decision**: Cloudflare for cost predictability, global edge, unique services (D1, DO), and zero egress.

### 3.2 D1 Over External Database

| Criterion | D1 (SQLite at edge) | External DB (PlanetScale, Supabase) | Decision |
|-----------|---------------------|-------------------------------------|----------|
| Latency | ~50ms (edge) | 100–200ms (centralized) | D1 — lower latency |
| Consistency | Strongly consistent | Depends on provider | D1 — SQLite consistency |
| Operations | Fully managed | Partially managed | D1 — simpler ops |
| Cost | Free tier generous | Monthly fee | D1 — cost-effective |
| Limitations | 10GB, 10M rows | Larger capacity | Acceptable for wiki |

**Decision**: D1 for all structured data — edge latency, managed operations, cost.

### 3.3 Durable Objects Over WebSockets + External State

| Criterion | Durable Objects | WebSockets + Redis | Decision |
|-----------|----------------|-------------------|----------|
| Consistency | Strongly consistent | Eventual consistency | DO — wiki needs consistency |
| State management | Built-in persistence | External service | DO — simpler |
| Leader election | Automatic | Manual | DO — built-in |
| Scalability | Per-room isolation | Connection limits | DO — better isolation |
| Cost | Pay-per-request | Redis hosting fee | DO — more predictable |

**Decision**: Durable Objects for wiki collaboration and quiz/flashcard sessions.

---

## BP-4: Traceability

| Requirement ID | Infrastructure Component | Verification |
|----------------|------------------------|--------------|
| NFR-012 | SSL/TLS (Full strict, HSTS) | Header verification |
| NFR-013 | WAF (CSP headers) | CSP header audit |
| NFR-014 | Workers (rate limiting) | Rate limit test |
| NFR-015 | Pages + Workers (scalability) | Load test |
| NFR-016 | Pages (99.9% uptime) | Cloudflare uptime monitoring |
| NFR-020 | KV (session storage) | Session persistence test |
| FR-031 | Durable Objects (wiki editing) | Collaborative editing test |
| FR-032 | D1 (version history) | Revision storage test |
| FR-034 | Durable Objects (conflict resolution) | Concurrent edit test |
| FR-040 | D1 + KV (FSRS scheduling) | Spaced repetition test |

---

## BP-5: Interface Design

### 5.1 Workers Route Configuration

```toml
# wrangler.toml (encyclopeptide-api)
name = "encyclopeptide-api"
main = "src/workers/encyclopeptide-api.ts"
compatibility_date = "2026-06-07"
routes = [
  { pattern = "api.encyclopeptide.com/*", zone_name = "encyclopeptide.com" }
]

[kv_namespaces]
  { binding = "CACHE", id = "encp-cache-id" }
  { binding = "SESSION", id = "encp-session-id" }

[r2_buckets]
  { binding = "ASSETS", bucket_name = "encyclopeptide-assets" }

[d1_databases]
  { binding = "DB", database_name = "encyclopeptide-db", database_id = "encp-db-id" }

[env.production]
routes = [
  { pattern = "api.encyclopeptide.com/*", zone_name = "encyclopeptide.com" }
]

[env.preview]
routes = []
```

```toml
# wrangler.toml (wikipept-api)
name = "wikipept-api"
main = "src/workers/wikipept-api.ts"
compatibility_date = "2026-06-07"
routes = [
  { pattern = "api.wikipept.com/*", zone_name = "wikipept.com" }
]

[kv_namespaces]
  { binding = "CACHE", id = "wiki-cache-id" }
  { binding = "SESSION", id = "wiki-session-id" }
  { binding = "SEARCH_INDEX", id = "wiki-search-id" }
  { binding = "FEATURES", id = "wiki-features-id" }

[r2_buckets]
  { binding = "UPLOADS", bucket_name = "wikipept-uploads" }

[d1_databases]
  { binding = "USERS_DB", database_name = "wikipept-users", database_id = "wiki-users-id" }
  { binding = "CONTENT_DB", database_name = "wikipept-content", database_id = "wiki-content-id" }
  { binding = "QUIZ_DB", database_name = "wikipept-quiz", database_id = "wiki-quiz-id" }
  { binding = "FLASHCARDS_DB", database_name = "wikipept-flashcards", database_id = "wiki-flashcards-id" }
  { binding = "PROGRESS_DB", database_name = "wikipept-progress", database_id = "wiki-progress-id" }
  { binding = "REPUTATION_DB", database_name = "wikipept-reputation", database_id = "wiki-reputation-id" }

[durable_objects]
  { name = "WIKI_ROOM", class_name = "WikiRoom" }
  { name = "QUIZ_SESSION", class_name = "QuizSession" }
  { name = "REVIEW_SESSION", class_name = "ReviewSession" }

[[migrations]]
  tag = "v1"
  new_classes = ["WikiRoom", "QuizSession", "ReviewSession"]
```

### 5.2 KV Interface

```typescript
interface KVInterface {
  get<T>(key: string, type?: "text" | "json" | "arrayBuffer" | "stream"): Promise<T | null>;
  put(key: string, value: string | ReadableStream | ArrayBuffer, options?: KVPutOptions): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: KVListOptions): Promise<KVListResult>;
  getWithMetadata<T>(key: string): Promise<{ value: T | null; metadata: unknown }>;
}

interface KVPutOptions {
  expiration?: number;            // TTL in seconds
  expirationTtl?: number;         // TTL in seconds (alternative)
  metadata?: Record<string, unknown>;
}
```

### 5.3 D1 Interface

```typescript
interface D1Interface {
  prepare(sql: string, ...bindings: unknown[]): D1PreparedStatement;
  exec(sql: string): Promise<D1ExecResult>;
  batch<T>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  dump(): Promise<ArrayBuffer>;
}

interface D1PreparedStatement {
  bind(...bindings: unknown[]): D1PreparedStatement;
  first<T>(col?: string): Promise<T | null>;
  all<T>(): Promise<D1Result<T>>;
  run(): Promise<D1ExecResult>;
}
```

### 5.4 R2 Interface

```typescript
interface R2Interface {
  get(key: string): Promise<R2ObjectBody | null>;
  put(key: string, body: ReadableStream | string | ArrayBuffer, options?: R2PutOptions): Promise<R2Object>;
  delete(key: string): Promise<void>;
  list(options?: R2ListOptions): Promise<R2Objects>;
  head(key: string): Promise<R2Object | null>;
  createMultipartUpload(key: string, options?: R2MultipartOptions): Promise<R2MultipartUpload>;
}

interface R2PutOptions {
  httpMetadata?: R2HTTPMetadata;
  customMetadata?: Record<string, string>;
  md5?: ArrayBuffer | string;
}
```

### 5.5 Durable Objects Interface

```typescript
interface DurableObjectInterface {
  // WikiRoom methods
  fetch(request: Request): Promise<Response>;

  // Internal state
  getState(): WikiRoomState;
  applyEdit(edit: WikiEdit): Promise<void>;
  broadcast(message: EditMessage): void;
}

interface WikiRoomState {
  pageId: string;
  currentContent: string;
  currentRevision: number;
  connectedClients: Map<string, WebSocket>;
  editHistory: WikiEdit[];
}
```

---

## BP-6: Data Design

### 6.1 D1 Schema (wikipept-content)

```sql
CREATE TABLE pages (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author_id TEXT NOT NULL,
  current_revision INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  review_status TEXT DEFAULT 'pending',
  quality_score REAL DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  edit_count INTEGER DEFAULT 0
);

CREATE TABLE revisions (
  id TEXT PRIMARY KEY,
  page_id TEXT NOT NULL,
  revision_number INTEGER NOT NULL,
  content TEXT NOT NULL,
  author_id TEXT NOT NULL,
  edit_summary TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  is_revert BOOLEAN DEFAULT FALSE,
  revert_of_revision INTEGER,
  FOREIGN KEY (page_id) REFERENCES pages(id),
  UNIQUE(page_id, revision_number)
);

CREATE TABLE annotations (
  id TEXT PRIMARY KEY,
  page_id TEXT NOT NULL,
  author_id TEXT NOT NULL,
  paragraph_index INTEGER NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  FOREIGN KEY (page_id) REFERENCES pages(id)
);

CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_category ON pages(category);
CREATE INDEX idx_revisions_page ON revisions(page_id, revision_number);
CREATE INDEX idx_annotations_page ON annotations(page_id);
```

### 6.2 D1 Schema (wikipept-users)

```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT DEFAULT 'contributor',
  reputation REAL DEFAULT 0,
  joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_active_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_expires ON sessions(expires_at);
```

### 6.3 D1 Schema (wikipept-progress)

```sql
CREATE TABLE quiz_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  quiz_id TEXT NOT NULL,
  status TEXT DEFAULT 'in_progress',
  current_question_index INTEGER DEFAULT 0,
  score REAL,
  time_started DATETIME DEFAULT CURRENT_TIMESTAMP,
  time_completed DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE flashcard_reviews (
  id TEXT PRIMARY KEY,
  card_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  state TEXT DEFAULT 'new',
  stability REAL DEFAULT 0,
  difficulty REAL DEFAULT 0,
  elapsed_days INTEGER DEFAULT 0,
  scheduled_days INTEGER DEFAULT 0,
  reps INTEGER DEFAULT 0,
  lapses INTEGER DEFAULT 0,
  last_review DATETIME,
  next_review DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE learning_progress (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  topic_id TEXT NOT NULL,
  mastery_level TEXT DEFAULT 'not_started',
  score REAL DEFAULT 0,
  last_studied DATETIME,
  study_count INTEGER DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE(user_id, topic_id)
);

CREATE INDEX idx_flashcard_reviews_user ON flashcard_reviews(user_id, next_review);
CREATE INDEX idx_quiz_sessions_user ON quiz_sessions(user_id);
CREATE INDEX idx_learning_progress_user ON learning_progress(user_id);
```

---

## BP-7: Component Design

### 7.1 Request Flow State Machine

```
Request arrives at Cloudflare Edge
        │
        ▼
┌──────────────┐
│ DNS Resolve  │ → Domain → Cloudflare IP
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ SSL/TLS      │ → Full (strict) termination
│ Termination  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ WAF Check    │ → OWASP rules, rate limiting
└──────┬───────┘
       │ Pass
       ▼
┌──────────────┐
│ CDN Cache    │ → Check cache for static assets
│ Check        │
└──────┬───────┘
       │ Cache Hit → Serve from edge
       │ Cache Miss
       ▼
┌──────────────┐
│ Pages/Workers│ → Route to appropriate handler
│ Routing      │
└──────┬───────┘
       │
       ├── Static page → Pages serves HTML
       │
       └── API route → Workers execute
                │
                ▼
       ┌──────────────┐
       │ Worker       │ → Auth, rate limiting, business logic
       │ Execution    │
       └──────┬───────┘
              │
              ├── KV read → Check cache
              ├── D1 query → Database lookup
              ├── R2 get → Object retrieval
              └── DO fetch → Durable Object call
              │
              ▼
       ┌──────────────┐
       │ Response     │ → JSON/HTML response
       │ + Headers    │ → Cache-Control, CSP, HSTS
       └──────────────┘
```

### 7.2 Durable Object WikiRoom Flow

```
Client A connects        Client B connects
      │                       │
      ▼                       ▼
┌──────────┐            ┌──────────┐
│ WebSocket│            │ WebSocket│
│ Connect  │            │ Connect  │
└────┬─────┘            └────┬─────┘
     │                       │
     ▼                       ▼
┌──────────────────────────────────┐
│        WikiRoom (DO)              │
│                                    │
│  State: {                         │
│    pageId: "angiotensin-ii",      │
│    content: "# Angiotensin II\n..",│
│    revision: 42,                  │
│    clients: {A, B}               │
│  }                                │
│                                    │
│  Operations:                      │
│  1. get_content() → current state │
│  2. submit_edit() → apply + broadcast │
│  3. get_diff() → compute diff     │
│  4. resolve_conflict() → merge    │
└──────────────────────────────────┘
     │                       │
     ▼                       ▼
┌──────────┐            ┌──────────┐
│ Broadcast│            │ Broadcast│
│ to all   │            │ to all   │
│ clients  │            │ clients  │
└──────────┘            └──────────┘
```

---

## BP-8: Deployment Design

### 8.1 Production Topology

```
┌─────────────────────────────────────────────────────────────┐
│                 PRODUCTION ENVIRONMENT                        │
│                                                               │
│  Domain: encyclopeptide.com                                  │
│  ├── Pages project: encyclopeptide-pages                    │
│  ├── Worker: encyclopeptide-api                             │
│  ├── KV: ENCP_CACHE, ENCP_SESSION                           │
│  ├── R2: encyclopeptide-assets                              │
│  └── DNS: A → Pages, api → Workers                          │
│                                                               │
│  Domain: wikipept.com                                        │
│  ├── Pages project: wikipept-pages                          │
│  ├── Worker: wikipept-api                                   │
│  ├── KV: WIKI_CACHE, WIKI_SESSION, WIKI_SEARCH              │
│  ├── R2: wikipept-uploads                                   │
│  ├── D1: wikipept-users, wikipept-content, wikipept-quiz,   │
│  │        wikipept-flashcards, wikipept-progress,            │
│  │        wikipept-reputation                                │
│  ├── DO: WikiRoom, QuizSession, ReviewSession               │
│  └── DNS: A → Pages, api → Workers                          │
│                                                               │
│  Shared:                                                     │
│  ├── Cloudflare WAF (managed rules)                         │
│  ├── Cloudflare DDoS protection                             │
│  ├── Cloudflare Bot Fight Mode                              │
│  └── Cloudflare Web Analytics                               │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 Preview Environment

```
┌─────────────────────────────────────────────────────────────┐
│                 PREVIEW ENVIRONMENT                           │
│                                                               │
│  PR #42 → encyclopeptide-pages.preview.encyclopeptide.pages.dev│
│  PR #43 → wikipept-pages.preview.wikipept.pages.dev          │
│                                                               │
│  Features:                                                   │
│  ├── Auto-generated on every PR                              │
│  ├── Same Workers bindings (preview KV/D1/R2 namespaces)     │
│  ├── Isolated D1 databases (per-preview)                    │
│  ├── Shared R2 bucket (same assets)                          │
│  └── Auto-deleted on PR merge/close                         │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 8.3 Environment Variables

| Variable | Scope | Description | Encrypted |
|----------|-------|-------------|-----------|
| CLOUDFLARE_API_TOKEN | CI/CD | Deployment token | Yes |
| OAUTH_CLIENT_ID | Worker | OAuth provider client ID | Yes |
| OAUTH_CLIENT_SECRET | Worker | OAuth provider client secret | Yes |
| JWT_SECRET | Worker | JWT signing secret | Yes |
| ANALYTICS_TOKEN | Worker | Analytics API token | Yes |

### 8.4 Resource Limits

| Service | Free Tier | Paid Tier | Our Usage (Year 1) |
|---------|-----------|-----------|-------------------|
| Pages builds | 500/month | 5,000/month | ~100/month |
| Workers CPU | 10ms/req | 50ms/req | ~5ms/req avg |
| KV reads | 100K/day | 10M/day | ~50K/day |
| KV writes | 1K/day | 100K/day | ~1K/day |
| D1 rows read | 5M/day | 50M/day | ~1M/day |
| D1 writes | 100K/day | 5M/day | ~20K/day |
| R2 storage | 10GB | 100GB+ | ~5GB |
| R2 Class A ops | 1M/month | 10M/month | ~100K/month |
| R2 Class B ops | 10M/month | 100M/month | ~1M/month |
| DO requests | 1M/day | 10M/day | ~200K/day |
| DO duration | 400K sec/day | 10M sec/day | ~50K sec/day |

---

## BP-9: Formal Verification

| Property ID | Property Description | Proof Method | Status |
|-------------|---------------------|--------------|--------|
| FV-INFRA-001 | DNS resolves to correct IPs | Automated DNS check | Pending |
| FV-INFRA-002 | SSL cert is valid and not expiring within 30 days | Certificate transparency check | Pending |
| FV-INFRA-003 | HSTS header present on all responses | Header audit | Pending |
| FV-INFRA-004 | CSP header present with correct directives | Header audit | Pending |
| FV-INFRA-005 | Rate limiting blocks at threshold | Stress test | Pending |
| FV-INFRA-006 | KV reads succeed within 50ms | Performance test | Pending |
| FV-INFRA-007 | D1 queries succeed within 100ms | Performance test | Pending |
| FV-INFRA-008 | R2 object retrieval succeeds | Integration test | Pending |
| FV-INFRA-009 | Durable Object consistency maintained | Concurrent edit test | Pending |
| FV-INFRA-010 | Cron triggers execute on schedule | Cron log verification | Pending |

---

## BP-10: HAL Specification

```typescript
interface CloudflareInfraHAL {
  // Pages
  pages: {
    deploy(project: string, branch: string, dist: string): Promise<void>;
    listDeploys(project: string): Promise<Deploy[]>;
    getDeploy(project: string, deployId: string): Promise<Deploy>;
  };

  // Workers
  workers: {
    deploy(name: string, script: string, bindings: Bindings): Promise<void>;
    tail(name: string, options?: TailOptions): Promise<TailEntry[]>;
  };

  // KV
  kv: {
    get<T>(namespace: string, key: string): Promise<T | null>;
    put<T>(namespace: string, key: string, value: T, options?: KVOptions): Promise<void>;
    delete(namespace: string, key: string): Promise<void>;
    list(namespace: string, options?: ListOptions): Promise<ListResult>;
  };

  // D1
  d1: {
    query<T>(database: string, sql: string, bindings?: unknown[]): Promise<D1Result<T>>;
    exec(database: string, sql: string): Promise<D1ExecResult>;
    batch<T>(database: string, statements: D1Statement[]): Promise<D1Result<T>[]>;
  };

  // R2
  r2: {
    get(bucket: string, key: string): Promise<ReadableStream | null>;
    put(bucket: string, key: string, body: ReadableStream): Promise<void>;
    delete(bucket: string, key: string): Promise<void>;
    list(bucket: string, options?: R2ListOptions): Promise<R2Object[]>;
  };

  // Durable Objects
  durableObjects: {
    get(namespace: string, id: string): Promise<DurableObjectStub>;
    idFromName(namespace: string, name: string): DurableObjectId;
  };

  // DNS
  dns: {
    listRecords(zone: string): Promise<DNSRecord[]>;
    createRecord(zone: string, record: DNSRecord): Promise<void>;
    deleteRecord(zone: string, recordId: string): Promise<void>;
  };
}
```

---

## BP-11: Compliance Matrix

| Standard | Requirement | Component | Status |
|----------|------------|-----------|--------|
| IEEE 1016-2024 | Software design description | This document | Compliant |
| OWASP Top 10 | Security | WAF, Workers | Target |
| SOC 2 Type II | Cloudflare compliance | All services | Cloudflare certified |
| GDPR | Data residency | D1 (select regions) | Target |
| PCI DSS | Payment security | N/A (no payments) | Not applicable |
| Core Web Vitals | Performance | Pages, CDN | Target |

---

## BP-12: Quality Checklist

### 12.1 Infrastructure Completeness

- [ ] DNS zones configured for both domains
- [ ] SSL/TLS full strict mode enabled
- [ ] HSTS with includeSubDomains and preload
- [ ] WAF managed rules enabled
- [ ] Rate limiting rules configured
- [ ] Pages projects created for both sites
- [ ] Workers deployed for API routes
- [ ] KV namespaces created (production + preview)
- [ ] D1 databases created with schemas
- [ ] R2 buckets created
- [ ] Durable Objects configured
- [ ] Cron triggers configured

### 12.2 Security

- [ ] All secrets encrypted in environment variables
- [ ] No secrets in client-side code
- [ ] CSP header blocks inline scripts
- [ ] CORS configured for API endpoints
- [ ] Rate limiting active on all API routes
- [ ] Bot fight mode enabled
- [ ] OWASP managed rules active
- [ ] SSL cert auto-renewal configured

### 12.3 Performance

- [ ] CDN cache hit rate > 80%
- [ ] KV read latency < 50ms
- [ ] D1 query latency < 100ms
- [ ] R2 object retrieval < 200ms
- [ ] Workers CPU time < 10ms average
- [ ] Pages build time < 5 minutes

### 12.4 Reliability

- [ ] 99.9% uptime SLA target
- [ ] D1 backup configured (daily)
- [ ] R2 versioning enabled
- [ ] Durable Object persistence configured
- [ ] Cron triggers for scheduled jobs
- [ ] Error tracking configured (Sentry)

### 12.5 Monitoring

- [ ] Cloudflare Web Analytics enabled
- [ ] Workers tail logs configured
- [ ] D1 query logging enabled
- [ ] Uptime monitoring configured
- [ ] Alert thresholds defined

---

**End of Document**
**Document Status:** DRAFT — Pending infrastructure review
**Owner:** Wikisites Architecture Team
