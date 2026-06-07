---
document_id: CONCURRENCY-025-003
title: "Synchronization Design"
version: "1.0.0"
date: "2026-06-07"
status: DRAFT
authors:
  - name: "Wikisites Architecture Team"
    role: "Primary Authors"
classification: "Internal — Phase 2.5 Concurrency Specification"
ieee_standard: "IEEE 1016-2024"
applicable_sites:
  - SHARED
abstract: >-
  Synchronization strategy for the wikisites platform covering signal-based
  state management in SolidJS, cache invalidation patterns for KV and CDN,
  event-driven architecture design, message passing between workers, and
  optimistic concurrency control for wiki edits.
yellow_paper_refs:
  - "YP-WEB-TECH-001"
  - "YP-EDU-CONTENT-001"
---

# Synchronization Design

**Document ID:** CONCURRENCY-025-003
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** DRAFT
**IEEE Standard:** IEEE 1016-2024

---

## Table of Contents

1. [Synchronization Strategy Overview](#1-synchronization-strategy-overview)
2. [Signal-Based State Management (SolidJS)](#2-signal-based-state-management-solidjs)
3. [Cache Invalidation Patterns](#3-cache-invalidation-patterns)
4. [Event-Driven Architecture](#4-event-driven-architecture)
5. [Message Passing Between Workers](#5-message-passing-between-workers)
6. [Optimistic Concurrency Control for Wiki Edits](#6-optimistic-concurrency-control-for-wiki-edits)
7. [Durable Object Synchronization](#7-durable-object-synchronization)
8. [Distributed State Coordination](#8-distributed-state-coordination)
9. [Formal Synchronization Properties](#9-formal-synchronization-properties)
10. [Implementation Specifications](#10-implementation-specifications)
11. [Risk Register](#11-risk-register)
12. [Recommendations](#12-recommendations)

---

## 1. Synchronization Strategy Overview

### 1.1 Synchronization Layers

The wikisites platform uses a layered synchronization approach:

```
┌─────────────────────────────────────────────────────────────┐
│                    SYNCHRONIZATION LAYERS                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Layer 1: Client-Side (Browser)                              │
│  ├── SolidJS signals (reactive state)                       │
│  ├── View Transitions API (DOM sync)                        │
│  └── localStorage (persistence)                             │
│                                                               │
│  Layer 2: Edge Compute (Cloudflare Workers)                  │
│  ├── KV cache (eventually consistent)                       │
│  ├── D1 database (strongly consistent per batch)            │
│  └── R2 object storage (strongly consistent)                │
│                                                               │
│  Layer 3: Real-Time Collaboration (Durable Objects)          │
│  ├── Single-threaded execution (no locks needed)            │
│  ├── WebSocket message ordering (FIFO)                      │
│  └── State persistence (D1 backing)                         │
│                                                               │
│  Layer 4: Background Processing (Cron + waitUntil)           │
│  ├── Search index rebuild (periodic)                         │
│  ├── Cache warming (periodic)                                │
│  └── Analytics aggregation (periodic)                        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Consistency Requirements by Subsystem

| Subsystem            | Consistency Requirement | Strategy               | Latency Budget       |
| -------------------- | ----------------------- | ---------------------- | -------------------- |
| Wiki page reads      | Eventual (seconds)      | KV + CDN cache         | < 100ms              |
| Wiki page edits      | Strong (per DO)         | Durable Object         | < 50ms               |
| User progress        | Strong (per user)       | D1 batch               | < 100ms              |
| Quiz sessions        | Strong (per session)    | Durable Object         | < 50ms               |
| Search index         | Eventual (minutes)      | Background rebuild     | 15 min max staleness |
| Flashcard scheduling | Strong (per user)       | D1                     | < 100ms              |
| User sessions        | Eventual (seconds)      | KV                     | < 50ms               |
| Analytics            | Eventual (minutes)      | Background aggregation | 1 hour max staleness |

### 1.3 Synchronization Patterns

| Pattern                 | Use Case              | Consistency            | Complexity |
| ----------------------- | --------------------- | ---------------------- | ---------- |
| Signal-based reactivity | Client UI state       | Strong (single-thread) | Low        |
| Cache-aside             | KV reads              | Eventual               | Low        |
| Write-through           | D1 + KV sync          | Eventual               | Medium     |
| Optimistic concurrency  | Wiki edits            | Strong (per DO)        | Medium     |
| Event sourcing          | Wiki revision history | Strong (append-only)   | Medium     |
| Message passing         | Worker communication  | Eventually consistent  | Low        |
| Periodic rebuild        | Search index          | Eventual (bounded)     | Low        |

---

## 2. Signal-Based State Management (SolidJS)

### 2.1 Signal Architecture

SolidJS signals provide fine-grained, synchronous reactivity within a single execution context (browser main thread).

#### 2.1.1 Signal Creation and Ownership

```typescript
// Component scope: signals are owned by the component
function WikiEditor(props: { pageId: string }) {
  const [content, setContent] = createSignal("");
  const [isDirty, setIsDirty] = createSignal(false);
  const [lastSaved, setLastSaved] = createSignal<Date | null>(null);

  // Computed values (derived from signals)
  const wordCount = createMemo(() => content().split(/\s+/).length);
  const canSave = createMemo(() => isDirty() && content().length > 0);

  // Effects (side effects triggered by signals)
  createEffect(() => {
    document.title = isDirty() ? "* Wiki Editor" : "Wiki Editor";
  });

  // ...
}
```

**Synchronization Property**: Signals are synchronous. When `setContent()` is called, all dependent computeds and effects update synchronously within the same microtask.

**Property ID**: SYNC-SIG-001
**Statement**: `∀ signal write s: all dependent computeds and effects update synchronously before control returns`

#### 2.1.2 Signal Propagation Order

When a signal changes, SolidJS propagates in topological order:

```
Signal A changes
    │
    ├──► Computed B (depends on A) ──► Effect C (depends on B)
    │
    └──► Computed D (depends on A) ──► Effect E (depends on D)
```

1. Computed B recomputes.
2. Effect C runs (if B changed).
3. Computed D recomputes.
4. Effect E runs (if D changed).

**Synchronization Property**: Propagation is deterministic. The order of recomputation is determined by the dependency graph, not by the order of signal writes.

**Property ID**: SYNC-SIG-002
**Statement**: `∀ signal changes: propagation follows topological order of dependency graph; order is deterministic`

#### 2.1.3 Batch Updates

```typescript
// All three signals update, but effects run once after batch completes
batch(() => {
  setContent(newContent);
  setIsDirty(true);
  setLastSaved(null);
});
// Effects that depend on content, isDirty, or lastSaved run ONCE
```

**Synchronization Property**: Batching defers effect execution until the batch completes. This prevents intermediate inconsistent states.

**Property ID**: SYNC-SIG-003
**Statement**: `∀ batch b: effects within b's dependency graph execute once after b completes; no intermediate states are observed`

### 2.2 Async State Synchronization

#### 2.2.1 createResource Pattern

```typescript
// Async data fetching with loading/error states
const [page, { mutate, refetch }] = createResource(
  () => props.pageId,
  async (pageId) => {
    const response = await fetch(`/api/v1/pages/${pageId}`);
    return response.json();
  }
);

// Usage in template
<Show when={page()} fallback={<Loading />}>
  <div>{page().content}</div>
</Show>
```

**Synchronization Property**: `createResource` manages async state with a signal-based interface. The resource value is `undefined` while loading, which is handled by `<Show>`.

**Property ID**: SYNC-SIG-004
**Statement**: `∀ createResource r: r() returns value or undefined; loading state is explicit; error state is explicit`

#### 2.2.2 Optimistic Updates

```typescript
// Optimistic update: update UI immediately, reconcile with server
async function savePage(newContent: string) {
  const previousContent = content();

  // Optimistic: update UI immediately
  setContent(newContent);
  setIsDirty(false);

  try {
    // Actual: save to server
    await api.savePage(props.pageId, newContent, previousContent);
    setLastSaved(new Date());
  } catch (error) {
    // Revert on failure
    setContent(previousContent);
    setIsDirty(true);
    showError(error.message);
  }
}
```

**Synchronization Property**: Optimistic updates provide immediate UI feedback. Reversion occurs on failure. During the optimistic window, the local state may differ from the server state.

**Property ID**: SYNC-SIG-005
**Statement**: `∀ optimistic update u: local state = u.new_value until server confirms or rejects; on rejection, local state reverts to u.old_value`

### 2.3 Signal Synchronization Hazards

| Hazard               | Scenario                                       | Risk   | Mitigation                                    |
| -------------------- | ---------------------------------------------- | ------ | --------------------------------------------- |
| Stale async data     | Resource not refetched after mutation          | Medium | Call `mutate()` or `refetch()` after mutation |
| Concurrent mutations | Two tabs editing same page                     | Medium | BroadcastChannel or WebSocket                 |
| Effect disposal race | Async effect completes after component unmount | Low    | AbortController in createResource             |
| Memory leak          | Effects not disposed on unmount                | Low    | SolidJS ownership tracking                    |

### 2.4 Cross-Tab Synchronization

```typescript
// BroadcastChannel for cross-tab sync
const channel = new BroadcastChannel("wiki-updates");

function notifyUpdate(pageId: string) {
  channel.postMessage({ type: "page-updated", pageId });
}

// Listen for updates from other tabs
channel.onmessage = (event) => {
  if (event.data.type === "page-updated") {
    refetchPage(event.data.pageId);
  }
};
```

**Synchronization Property**: BroadcastChannel provides same-origin, cross-tab message passing. Messages are delivered asynchronously but in order.

**Property ID**: SYNC-SIG-006
**Statement**: `∀ BroadcastChannel messages m₁, m₂ from same sender: m₁ delivered before m₂`

---

## 3. Cache Invalidation Patterns

### 3.1 Cache Hierarchy

```
┌─────────────────────────────────────────────────────┐
│                  CACHE HIERARCHY                       │
│                                                       │
│  Browser Cache (HTTP)                                 │
│  ├── CDN Cache (Cloudflare)                          │
│  │   ├── Edge Cache (per PoP)                        │
│  │   └── Origin Cache                                │
│  │                                                    │
│  KV Cache (Application-level)                        │
│  ├── Session Cache                                   │
│  ├── Search Index Cache                              │
│  └── Feature Flag Cache                              │
│                                                       │
│  D1 (Source of Truth)                                │
│  └── Strongly consistent                             │
│                                                       │
└─────────────────────────────────────────────────────┘
```

### 3.2 Cache Invalidation Strategies

#### 3.2.1 Time-Based Invalidation (TTL)

```typescript
// KV TTL-based cache
await env.CACHE.put(`page:${pageId}`, JSON.stringify(page), {
  expirationTtl: 300, // 5 minutes
});
```

**Strategy**: Set TTL based on content freshness requirements:

| Content Type         | TTL          | Rationale                         |
| -------------------- | ------------ | --------------------------------- |
| Wiki page content    | 300s (5 min) | Balance freshness vs. performance |
| User session         | 86400s (24h) | Session lifetime                  |
| Search index         | 3600s (1h)   | Rebuilt every 15 min anyway       |
| Feature flags        | 60s (1 min)  | Quick propagation of flag changes |
| Static page metadata | 86400s (24h) | Changes infrequently              |

**Synchronization Property**: TTL-based cache expires after the specified duration. Reads after expiration return null, triggering a cache miss and re-fetch from D1.

**Property ID**: SYNC-CACHE-001
**Statement**: `∀ KV entry e with TTL t: e is accessible for ≤ t seconds; after t, e returns null`

#### 3.2.2 Event-Based Invalidation

```typescript
// Invalidate cache on write
async function savePage(pageId: string, content: string) {
  // 1. Write to D1 (source of truth)
  await env.DB.prepare("UPDATE pages SET content = ? WHERE id = ?").bind(content, pageId).run();

  // 2. Invalidate KV cache
  await env.CACHE.delete(`page:${pageId}`);

  // 3. Invalidate CDN cache (via purge API or stale-while-revalidate)
  // Cloudflare Pages: use Cache-Control headers
}
```

**Synchronization Property**: Event-based invalidation removes stale cache entries immediately after the source of truth is updated.

**Property ID**: SYNC-CACHE-002
**Statement**: `∀ cache invalidation inv: after inv completes, subsequent reads fetch from source of truth`

#### 3.2.3 Stale-While-Revalidate Pattern

```
CDN-Cache-Control: s-maxage=3600, stale-while-revalidate=86400

Timeline:
t=0:    CDN caches page (fresh for 3600s)
t=3600: CDN serves stale page, revalidates in background
t=3601: CDN serves fresh page from origin
```

**Strategy**: Serve stale content immediately while refreshing in background. Provides:

1. Fast response (no waiting for origin).
2. Eventually fresh content.
3. Graceful degradation if origin is down.

**Property ID**: SYNC-CACHE-003
**Statement**: `∀ stale-while-revalidate entry e: client receives e immediately; e is refreshed in background; subsequent reads receive fresh e`

#### 3.2.4 Write-Through Cache

```typescript
// Write-through: write to both D1 and KV simultaneously
async function updatePage(pageId: string, content: string) {
  // Write to D1 (source of truth)
  await env.DB.prepare("UPDATE pages SET content = ? WHERE id = ?").bind(content, pageId).run();

  // Write to KV (cache)
  const page = await env.DB.prepare("SELECT * FROM pages WHERE id = ?").bind(pageId).first();
  await env.CACHE.put(`page:${pageId}`, JSON.stringify(page), {
    expirationTtl: 300,
  });
}
```

**Synchronization Property**: Write-through ensures KV cache is always up-to-date after a write. No cache miss on next read.

**Property ID**: SYNC-CACHE-004
**Statement**: `∀ write-through w: after w completes, KV cache = D1 value (within KV consistency window)`

### 3.3 Cache Invalidation for Wiki Collaboration

Wiki pages are edited via Durable Objects. Cache invalidation must coordinate with DO state:

```
┌─────────────────────────────────────────────────────────┐
│              Wiki Cache Invalidation Flow                  │
│                                                           │
│  1. User A edits page via DO                             │
│  2. DO applies edit atomically                           │
│  3. DO notifies Worker (via WebSocket or fetch)          │
│  4. Worker invalidates KV cache                          │
│  5. Worker invalidates CDN cache (via headers)           │
│  6. Next read fetches fresh content from D1              │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**Synchronization Property**: Cache invalidation is triggered by the DO after the edit is committed. There is a window (seconds) between the edit and cache invalidation during which stale content may be served.

**Property ID**: SYNC-CACHE-005
**Statement**: `∀ wiki edit e: cache invalidation occurs after e.commit(); staleness window ≤ 300s (TTL)`

### 3.4 CDN Cache Invalidation

Cloudflare CDN uses `Cache-Control` headers for cache management:

```typescript
// Worker response headers
const headers = new Headers({
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  "CDN-Cache-Control": "max-age=3600",
  "Surrogate-Control": "max-age=3600",
});
```

**Strategy by content type**:

| Content                | Cache-Control                                         | CDN-Cache-Control  | Rationale                            |
| ---------------------- | ----------------------------------------------------- | ------------------ | ------------------------------------ |
| Static assets (hashed) | `public, max-age=31536000, immutable`                 | `max-age=31536000` | Immutable, never changes             |
| Wiki page HTML         | `public, s-maxage=3600, stale-while-revalidate=86400` | `max-age=3600`     | Fresh for 1 hour, stale for 24 hours |
| API responses          | `private, no-cache`                                   | —                  | Never cached (user-specific)         |
| User dashboard         | `private, no-store`                                   | —                  | Never cached                         |

### 3.5 Cache Invalidation Risk Summary

| Pattern                | Consistency          | Performance | Complexity | Use Case                  |
| ---------------------- | -------------------- | ----------- | ---------- | ------------------------- |
| TTL                    | Eventual (bounded)   | High        | Low        | General caching           |
| Event-based            | Eventual (immediate) | High        | Medium     | Wiki pages                |
| Stale-while-revalidate | Eventual (bounded)   | Very High   | Low        | CDN content               |
| Write-through          | Eventual (immediate) | Medium      | Medium     | High-read data            |
| No cache (D1 direct)   | Strong               | Medium      | Low        | User progress, quiz state |

---

## 4. Event-Driven Architecture

### 4.1 Event Types

The wikisites platform uses events for decoupled communication:

| Event Type      | Source           | Consumers                          | Delivery                | Ordering            |
| --------------- | ---------------- | ---------------------------------- | ----------------------- | ------------------- |
| Page edited     | WikiRoom DO      | Cache invalidation, search reindex | Async (WebSocket/fetch) | Per-page ordered    |
| Quiz completed  | QuizSession DO   | Progress update, reputation update | Async (D1 write)        | Per-session ordered |
| Card reviewed   | ReviewSession DO | FSRS update, progress update       | Async (D1 write)        | Per-session ordered |
| User joined     | Auth middleware  | Session creation, analytics        | Sync (D1 write)         | Per-user ordered    |
| Content flagged | ModerationTools  | Moderation queue, notification     | Async (D1 write)        | Per-content ordered |

### 4.2 Event Production

#### 4.2.1 Durable Object Event Emission

```typescript
// WikiRoom Durable Object
class WikiRoom {
  async fetch(request: Request): Promise<Response> {
    const { type, payload } = await request.json();

    switch (type) {
      case "edit": {
        // Apply edit atomically
        const editResult = this.applyEdit(payload);

        // Emit event: page edited
        this.emitEvent("page-edited", {
          pageId: this.state.pageId,
          revision: editResult.revision,
          authorId: payload.authorId,
          timestamp: Date.now(),
        });

        // Broadcast to connected clients
        this.broadcast({
          type: "edit-applied",
          revision: editResult.revision,
          content: editResult.content,
        });

        return new Response(JSON.stringify(editResult));
      }
    }
  }

  private emitEvent(type: string, payload: unknown) {
    // Store event for async processing
    this.state.events.push({ type, payload, timestamp: Date.now() });
  }
}
```

**Synchronization Property**: Events are emitted synchronously within the DO handler. They are stored in the DO's state for async processing by Workers.

**Property ID**: SYNC-EVENT-001
**Statement**: `∀ DO event e: e is emitted during handler execution; e is processed asynchronously by Workers`

#### 4.2.2 Worker Event Processing

```typescript
// Worker: process DO events
async function processEvents(env: Env) {
  // Fetch events from all active DOs
  // Process in order: cache invalidation, search reindex, analytics
  // ...
}
```

### 4.3 Event Consumption

#### 4.3.1 Cache Invalidation Event Handler

```typescript
// Event handler: invalidate cache on page edit
async function handlePageEdited(event: PageEditedEvent, env: Env) {
  // 1. Invalidate KV cache
  await env.CACHE.delete(`page:${event.pageId}`);

  // 2. Invalidate CDN cache
  await env.CACHE.put(`purge:${event.pageId}`, "1", {
    expirationTtl: 60,
  });

  // 3. Log analytics
  await env.DB.prepare(
    `
    INSERT INTO analytics_events (type, page_id, revision, timestamp)
    VALUES (?, ?, ?, ?)
  `,
  )
    .bind("page-edited", event.pageId, event.revision, event.timestamp)
    .run();
}
```

#### 4.3.2 Search Reindex Event Handler

```typescript
// Event handler: update search index on page edit
async function handlePageEdited(event: PageEditedEvent, env: Env) {
  // 1. Fetch updated page content from D1
  const page = await env.DB.prepare("SELECT * FROM pages WHERE id = ?").bind(event.pageId).first();

  // 2. Update search index in KV
  const searchIndex = (await env.SEARCH_INDEX.get("index")) ?? {};
  searchIndex[event.pageId] = {
    title: page.title,
    content: page.content,
    tags: page.tags,
    updated: event.timestamp,
  };
  await env.SEARCH_INDEX.put("index", JSON.stringify(searchIndex));

  // 3. Rebuild Pagefind index (async)
  await rebuildSearchIndex(env);
}
```

### 4.4 Event Ordering Guarantees

| Guarantee            | Scope                   | Implementation                 | Limitation                             |
| -------------------- | ----------------------- | ------------------------------ | -------------------------------------- |
| Per-page ordering    | Single page edits       | Durable Object single-threaded | Cross-page edits may interleave        |
| Per-user ordering    | Single user actions     | User ID-based routing          | Multiple tabs may interleave           |
| Per-session ordering | Quiz/flashcard sessions | Durable Object single-threaded | Session restart may reorder            |
| Global ordering      | Not guaranteed          | —                              | Use timestamp for approximate ordering |

**Synchronization Property**: Event ordering is guaranteed per entity (page, user, session) but not globally. Consumers must handle out-of-order events for different entities.

**Property ID**: SYNC-EVENT-002
**Statement**: `∀ events e₁, e₂ affecting same entity: e₁ processed before e₂; ∀ events e₁, e₂ affecting different entities: no ordering guarantee`

### 4.5 Event-Driven Architecture Risk Summary

| Pattern                 | Consistency         | Ordering           | Complexity | Use Case                 |
| ----------------------- | ------------------- | ------------------ | ---------- | ------------------------ |
| DO event emission       | Strong (per entity) | Per-entity ordered | Medium     | Wiki collaboration       |
| Worker event processing | Eventual            | Per-entity ordered | Medium     | Background tasks         |
| Cache invalidation      | Eventual (seconds)  | N/A                | Low        | Performance optimization |
| Search reindex          | Eventual (minutes)  | N/A                | Low        | Search freshness         |

---

## 5. Message Passing Between Workers

### 5.1 Worker Communication Patterns

Cloudflare Workers communicate via:

1. **HTTP fetch**: Worker-to-Worker, Worker-to-DO, Worker-to-external
2. **KV read/write**: Indirect communication via shared KV namespace
3. **D1 read/write**: Indirect communication via shared D1 database
4. **Durable Objects**: Worker-to-DO fetch, DO-to-Worker (via fetch)
5. **WebSocket**: Client-to-DO, DO-to-client

### 5.2 Worker-to-Worker HTTP Communication

```typescript
// Worker A calls Worker B
async function callWorkerB(env: Env, payload: unknown): Promise<Response> {
  return fetch("https://api.wikipept.com/v1/internal/process", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.INTERNAL_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });
}
```

**Synchronization Property**: Worker-to-Worker HTTP calls are synchronous request-response. No shared state is exchanged. Each worker maintains its own execution context.

**Property ID**: SYNC-WORKER-001
**Statement**: `∀ worker-to-worker HTTP calls: no shared mutable state; communication is via request/response only`

### 5.3 Indirect Communication via KV

```typescript
// Worker A writes to KV
await env.CACHE.put("task:123", JSON.stringify({ status: "pending", result: null }));

// Worker B polls KV for result
const task = await env.CACHE.get("task:123");
if (task?.status === "completed") {
  // Process result
}
```

**Synchronization Property**: KV-based communication is eventually consistent. Worker B may read stale data. Use polling or webhooks for timely notification.

**Property ID**: SYNC-WORKER-002
**Statement**: `∀ KV-based worker communication: delivery is eventually consistent; latency ≤ KV consistency window`

### 5.4 Indirect Communication via D1

```typescript
// Worker A writes to D1
await env.DB.prepare("INSERT INTO task_queue (id, status, payload) VALUES (?, 'pending', ?)")
  .bind(taskId, JSON.stringify(payload))
  .run();

// Worker B (cron worker) polls D1
const pendingTasks = await env.DB.prepare(
  "SELECT * FROM task_queue WHERE status = 'pending'",
).all();
```

**Synchronization Property**: D1-based communication is strongly consistent (within batch). Worker B sees Worker A's writes immediately (within D1 consistency window).

**Property ID**: SYNC-WORKER-003
**Statement**: `∀ D1-based worker communication: delivery is strongly consistent; Worker B sees Worker A's writes after D1 batch commit`

### 5.5 Worker Message Ordering

| Pattern               | Ordering Guarantee           | Implementation        |
| --------------------- | ---------------------------- | --------------------- |
| HTTP request-response | Per-request ordered          | TCP ordering          |
| KV read/write         | Eventually ordered           | KV consistency model  |
| D1 read/write         | Strongly ordered (per batch) | SQLite transaction    |
| DO fetch              | Per-DO ordered               | DO single-threaded    |
| Cron triggers         | Not ordered                  | Independent execution |

### 5.6 Worker Communication Risk Summary

| Pattern       | Consistency     | Ordering           | Complexity | Use Case                  |
| ------------- | --------------- | ------------------ | ---------- | ------------------------- |
| HTTP fetch    | Strong          | Per-request        | Low        | Synchronous calls         |
| KV read/write | Eventual        | Eventually ordered | Low        | Decoupled communication   |
| D1 read/write | Strong (batch)  | Strongly ordered   | Low        | Task queues, shared state |
| DO fetch      | Strong (per DO) | Per-DO ordered     | Medium     | Real-time collaboration   |
| Cron triggers | Eventual        | Not ordered        | Low        | Background jobs           |

---

## 6. Optimistic Concurrency Control for Wiki Edits

### 6.1 Optimistic Concurrency Control (OCC) Design

Wiki edits use Optimistic Concurrency Control (OCC) to detect and resolve conflicts:

#### 6.1.1 Edit Submission Flow

```
┌─────────────────────────────────────────────────────────┐
│              Wiki Edit OCC Flow                           │
│                                                           │
│  1. Client reads page content + revision number           │
│     GET /api/v1/pages/{slug}                              │
│     Response: { content, revision: 42 }                   │
│                                                           │
│  2. Client edits content locally                          │
│     // No server interaction                              │
│                                                           │
│  3. Client submits edit with base revision                │
│     POST /api/v1/pages/{slug}/edit                        │
│     Body: { content, editSummary, baseRevision: 42 }      │
│                                                           │
│  4. Server checks base revision                           │
│     IF baseRevision == currentRevision:                   │
│       // No conflict — apply edit                         │
│       currentRevision = 43                                │
│       Save new content to D1                              │
│       Return 201 Created                                  │
│     ELSE:                                                 │
│       // Conflict detected                                │
│       Return 409 Conflict                                 │
│       Body: { currentRevision: 43, currentContent }       │
│                                                           │
│  5. On conflict: client resolves                          │
│     a. Show visual diff                                   │
│     b. User merges changes                                │
│     c. Re-submit with new baseRevision                    │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

#### 6.1.2 OCC State Machine

```
┌─────────────┐
│  Reading    │ ← Client reads page + revision
└──────┬──────┘
       │ Client edits locally
       ▼
┌─────────────┐
│  Editing    │ ← Local state only
└──────┬──────┘
       │ Client submits
       ▼
┌─────────────┐     ┌─────────────┐
│  Checking   │────>│  Conflict   │ ← baseRevision ≠ currentRevision
└──────┬──────┘     │  Detected   │
       │             └──────┬──────┘
       │ No conflict        │ User resolves
       ▼                    ▼
┌─────────────┐     ┌─────────────┐
│  Applied    │     │  Resolving  │
└──────┬──────┘     └──────┬──────┘
       │                    │ User re-submits
       │                    ▼
       │             ┌─────────────┐
       │             │  Checking   │
       │             └──────┬──────┘
       │                    │
       │                    ├──► Conflict (loop)
       │                    │
       │                    └──► Applied
       ▼
┌─────────────┐
│  Published  │
└─────────────┘
```

### 6.2 OCC Implementation

#### 6.2.1 Durable Object Implementation

```typescript
class WikiRoom {
  private state: {
    pageId: string;
    content: string;
    currentRevision: number;
  };

  async fetch(request: Request): Promise<Response> {
    const { type, payload } = await request.json();

    if (type === "edit") {
      return this.handleSubmitEdit(payload);
    }

    if (type === "get-content") {
      return this.handleGetContent();
    }

    return new Response("Not Found", { status: 404 });
  }

  private handleSubmitEdit(payload: {
    content: string;
    editSummary: string;
    baseRevision: number;
    authorId: string;
  }): Response {
    // OCC: Check base revision
    if (payload.baseRevision !== this.state.currentRevision) {
      // Conflict detected
      return new Response(
        JSON.stringify({
          error: "conflict",
          currentRevision: this.state.currentRevision,
          currentContent: this.state.content,
        }),
        { status: 409 },
      );
    }

    // No conflict — apply edit
    this.state.currentRevision += 1;
    this.state.content = payload.content;

    // Persist to D1 (async)
    this.persistToD1();

    return new Response(
      JSON.stringify({
        revision: this.state.currentRevision,
        content: this.state.content,
      }),
      { status: 201 },
    );
  }

  private handleGetContent(): Response {
    return new Response(
      JSON.stringify({
        content: this.state.content,
        revision: this.state.currentRevision,
      }),
    );
  }

  private async persistToD1() {
    // Persist current state to D1 for durability
    // This is async and does not affect the response
    // ...
  }
}
```

**Synchronization Property**: The DO's single-threaded execution ensures that OCC check-and-apply is atomic. No two edits can interleave between the check and the apply.

**Property ID**: SYNC-OCC-001
**Statement**: `∀ OCC check-and-apply in DO: check and apply execute atomically within single handler; no interleaving`

#### 6.2.2 D1-Based OCC (for non-DO paths)

```typescript
// D1-based OCC for non-collaborative edits
async function editPage(env: Env, pageId: string, newContent: string, baseRevision: number) {
  // D1 batch: check revision and apply atomically
  const result = await env.DB.batch([
    env.DB.prepare("SELECT current_revision FROM pages WHERE id = ?").bind(pageId),
  ]);

  const currentRevision = result[0].results[0]?.current_revision;

  if (currentRevision !== baseRevision) {
    // Conflict
    return { error: "conflict", currentRevision };
  }

  // Apply edit atomically
  await env.DB.batch([
    env.DB.prepare(
      "UPDATE pages SET content = ?, current_revision = current_revision + 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND current_revision = ?",
    ).bind(newContent, pageId, baseRevision),
    env.DB.prepare(
      "INSERT INTO revisions (page_id, revision_number, content, author_id, edit_summary) VALUES (?, ?, ?, ?, ?)",
    ).bind(pageId, baseRevision + 1, newContent, "user-id", "Edit summary"),
  ]);

  return { revision: baseRevision + 1 };
}
```

**Synchronization Property**: D1 batch ensures atomicity of the check-and-apply operation. No other request can interleave.

**Property ID**: SYNC-OCC-002
**Statement**: `∀ D1-based OCC check-and-apply: check and apply execute atomically within D1 batch`

### 6.3 Conflict Resolution Strategies

| Strategy          | Description                           | Complexity | Use Case           |
| ----------------- | ------------------------------------- | ---------- | ------------------ |
| Last-write-wins   | Server accepts latest submission      | Low        | Non-critical edits |
| Visual diff merge | Show diff, user manually merges       | Medium     | Wiki collaboration |
| Three-way merge   | Automatic merge with base as ancestor | High       | Programmatic merge |
| CRDT merge        | Conflict-free replicated data type    | Very High  | Future enhancement |

**Decision**: Use visual diff merge for wiki collaboration (current implementation). Three-way merge may be added later.

### 6.4 OCC Risk Summary

| Risk                       | Scenario                            | Impact | Mitigation                       |
| -------------------------- | ----------------------------------- | ------ | -------------------------------- |
| Stale base revision        | Client edits stale version          | Medium | OCC conflict detection           |
| Lost work                  | User closes browser without saving  | Low    | Auto-save to localStorage        |
| Conflict fatigue           | Frequent edits cause many conflicts | Medium | Durable Objects reduce conflicts |
| DO single point of failure | DO crashes during edit              | Low    | DO persistence to D1             |

---

## 7. Durable Object Synchronization

### 7.1 Durable Object State Management

Durable Objects provide single-threaded, strongly consistent state management:

```
┌─────────────────────────────────────────────────────────┐
│              Durable Object State Model                    │
│                                                           │
│  In-Memory State:                                         │
│  ├── Current content (text)                              │
│  ├── Current revision (number)                           │
│  ├── Connected clients (Map<id, WebSocket>)              │
│  └── Pending events (Array<Event>)                       │
│                                                           │
│  Persisted State (D1):                                    │
│  ├── Page content (latest snapshot)                      │
│  ├── Revision history (append-only log)                  │
│  ├── Client connections (for recovery)                   │
│  └── Event log (for async processing)                    │
│                                                           │
│  Synchronization:                                         │
│  ├── Single-threaded: no locks needed                    │
│  ├── State mutations: atomic within handler              │
│  └── Persistence: async, non-blocking                    │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### 7.2 DO State Consistency

**Synchronization Property**: Durable Object state is strongly consistent within the DO. All reads see the most recent write. No concurrent access is possible within a single DO.

**Property ID**: SYNC-DO-001
**Statement**: `∀ DO state reads r within handler h: r sees all writes from handlers that completed before h`

### 7.3 DO-to-DO Coordination

Durable Objects do NOT call other Durable Objects directly. This avoids circular dependencies.

Instead, coordination happens via:

1. **Worker-mediated**: Worker receives request, calls DO A, then DO B.
2. **Event-driven**: DO A emits event, Worker processes event, calls DO B.
3. **Shared D1**: Both DOs read/write the same D1 database.

```
DO A ──► Worker ──► DO B
         (mediator)
```

**Synchronization Property**: DO-to-DO coordination is mediated by Workers or shared state. No direct DO-to-DO calls.

**Property ID**: SYNC-DO-002
**Statement**: `∀ DO coordination: coordination is mediated by Worker or shared D1; no direct DO-to-DO calls`

### 7.4 DO Recovery and Consistency

If a DO crashes or is evicted:

1. Cloudflare reconstructs the DO from persisted state.
2. In-memory state is lost but D1 state is preserved.
3. Connected WebSockets are disconnected (clients reconnect).

**Synchronization Property**: DO recovery preserves D1-persisted state. In-memory state (e.g., connected clients) is lost but reconstructable.

**Property ID**: SYNC-DO-003
**Statement**: `∀ DO recovery r: D1-preserved state is restored; in-memory state is lost but reconstructable`

---

## 8. Distributed State Coordination

### 8.1 State Distribution Model

```
┌─────────────────────────────────────────────────────────────┐
│                  DISTRIBUTED STATE MODEL                       │
│                                                               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │ Client State  │    │ Edge State   │    │ Origin State │  │
│  │ (SolidJS)    │    │ (KV/CDN)     │    │ (D1)         │  │
│  │              │    │              │    │              │  │
│  │ Signals      │    │ Cache        │    │ Database     │  │
│  │ LocalStorage │    │ Sessions     │    │ Source of    │  │
│  │ IndexedDB    │    │ Search Index │    │ Truth        │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│         │                   │                   │            │
│         └───────────────────┴───────────────────┘            │
│                         │                                    │
│              Synchronization Layer                           │
│              (OCC, Event-driven, TTL)                        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 State Consistency by Layer

| Layer            | Consistency            | Conflict Resolution    | staleness        |
| ---------------- | ---------------------- | ---------------------- | ---------------- |
| Client (SolidJS) | Strong (single-thread) | N/A (single editor)    | 0                |
| KV Cache         | Eventual               | TTL expiry             | ≤ 300s           |
| CDN Cache        | Eventual               | stale-while-revalidate | ≤ 86400s         |
| D1 Database      | Strong (per batch)     | OCC for wiki edits     | 0 (within batch) |
| Durable Objects  | Strong (per DO)        | OCC within DO          | 0 (within DO)    |

### 8.3 Cross-Layer Synchronization

```
Client Signal Change
    │
    ▼
Optimistic UI Update (immediate)
    │
    ▼
API Request to Worker
    │
    ▼
Worker processes request
    │
    ├──► D1 write (strongly consistent)
    │
    ├──► KV invalidation (eventually consistent)
    │
    └──► DO broadcast (WebSocket, real-time)
         │
         ▼
    Other clients receive update
    │
    ▼
Client Signal Update (via WebSocket message)
    │
    ▼
UI re-renders (synchronous)
```

**Synchronization Property**: Cross-layer synchronization provides eventual consistency with bounded staleness. The staleness window is determined by:

1. KV TTL (≤ 300s for wiki pages).
2. WebSocket delivery (≤ 1s for connected clients).
3. CDN stale-while-revalidate (≤ 86400s for static pages).

**Property ID**: SYNC-DIST-001
**Statement**: `∀ cross-layer synchronization: staleness ≤ max(KV_TTL, WebSocket_latency, CDN_TTL)`

---

## 9. Formal Synchronization Properties

### 9.1 Invariants

```
// Invariant 1: Signal propagation is synchronous and atomic
∀ signal s, ∀ batch b: all dependent effects execute after b completes

// Invariant 2: OCC detects all conflicts
∀ concurrent edits e₁, e₂ on same page: if e₁.baseRevision = e₂.baseRevision, then one receives 409

// Invariant 3: DO execution is sequential
∀ DO d, ∀ handlers h₁, h₂: h₁ completes before h₂ starts

// Invariant 4: D1 batch is atomic
∀ D1 batch b: no interleaving between b's statements

// Invariant 5: Cache invalidation follows write
∀ write w followed by cache invalidation inv: inv happens after w completes

// Invariant 6: Event ordering is per-entity
∀ events e₁, e₂ affecting same entity: e₁ processed before e₂

// Invariant 7: No direct DO-to-DO calls
∀ DO d₁, d₂: no fetch() from d₁ to d₂
```

### 9.2 Properties Table

| Property ID     | Description                            | Status    | Verification                |
| --------------- | -------------------------------------- | --------- | --------------------------- |
| SYNC-SIG-001    | Signal propagation atomicity           | Proven    | SolidJS implementation      |
| SYNC-SIG-002    | Signal propagation deterministic order | Proven    | Dependency graph topology   |
| SYNC-SIG-003    | Batch defers effect execution          | Proven    | SolidJS implementation      |
| SYNC-SIG-004    | createResource manages async state     | Proven    | SolidJS implementation      |
| SYNC-SIG-005    | Optimistic update reversion            | By design | Implementation pattern      |
| SYNC-SIG-006    | BroadcastChannel ordering              | Proven    | Web API specification       |
| SYNC-CACHE-001  | KV TTL expiry                          | Proven    | KV specification            |
| SYNC-CACHE-002  | Event-based invalidation               | Proven    | Implementation pattern      |
| SYNC-CACHE-003  | stale-while-revalidate                 | Proven    | HTTP specification          |
| SYNC-CACHE-004  | Write-through consistency              | Proven    | Implementation pattern      |
| SYNC-CACHE-005  | Wiki cache invalidation delay          | By design | ≤ 300s staleness            |
| SYNC-EVENT-001  | DO event emission                      | Proven    | DO implementation           |
| SYNC-EVENT-002  | Event per-entity ordering              | Proven    | DO single-threaded          |
| SYNC-WORKER-001 | Worker HTTP isolation                  | Proven    | HTTP model                  |
| SYNC-WORKER-002 | KV eventual consistency                | Proven    | KV specification            |
| SYNC-WORKER-003 | D1 batch consistency                   | Proven    | SQLite transaction          |
| SYNC-OCC-001    | DO OCC atomicity                       | Proven    | DO single-threaded          |
| SYNC-OCC-002    | D1 OCC atomicity                       | Proven    | D1 batch atomicity          |
| SYNC-DO-001     | DO state consistency                   | Proven    | DO single-threaded          |
| SYNC-DO-002     | DO coordination via Worker             | By design | Architecture constraint     |
| SYNC-DO-003     | DO recovery persistence                | Proven    | Cloudflare DO specification |
| SYNC-DIST-001   | Cross-layer staleness bound            | Proven    | System design               |

---

## 10. Implementation Specifications

### 10.1 SolidJS Signal Patterns

#### 10.1.1 Wiki Editor State Management

```typescript
// File: src/components/WikiEditor.tsx
import { createSignal, createMemo, createResource, batch } from "solid-js";

interface WikiEditorProps {
  pageId: string;
}

export function WikiEditor(props: WikiEditorProps) {
  const [content, setContent] = createSignal("");
  const [editSummary, setEditSummary] = createSignal("");
  const [isDirty, setIsDirty] = createSignal(false);
  const [isSaving, setIsSaving] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  const [page, { mutate, refetch }] = createResource(
    () => props.pageId,
    async (pageId) => {
      const response = await fetch(`/api/v1/pages/${pageId}`);
      if (!response.ok) throw new Error("Failed to load page");
      return response.json();
    }
  );

  const wordCount = createMemo(() => content().split(/\s+/).filter(Boolean).length);
  const canSave = createMemo(() => isDirty() && !isSaving() && content().length > 0);
  const currentRevision = createMemo(() => page()?.revision ?? 0);

  async function handleSave() {
    if (!canSave()) return;

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/v1/pages/${props.pageId}/edit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content(),
          editSummary: editSummary(),
          baseRevision: currentRevision(),
        }),
      });

      if (response.status === 409) {
        const conflict = await response.json();
        handleConflict(conflict);
        return;
      }

      if (!response.ok) throw new Error("Save failed");

      const result = await response.json();
      batch(() => {
        setIsDirty(false);
        setEditSummary("");
        mutate((prev) => ({ ...prev, revision: result.revision, content: content() }));
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  function handleConflict(conflict: { currentRevision: number; currentContent: string }) {
    // Show conflict resolution UI
    // User merges changes manually
  }

  return (
    <div>
      <textarea
        value={content()}
        onInput={(e) => {
          setContent(e.currentTarget.value);
          setIsDirty(true);
        }}
      />
      <div>Words: {wordCount()}</div>
      <div>Revision: {currentRevision()}</div>
      <button onClick={handleSave} disabled={!canSave()}>
        {isSaving() ? "Saving..." : "Save"}
      </button>
      {error() && <div class="error">{error()}</div>}
    </div>
  );
}
```

### 10.2 Cache Invalidation Implementation

```typescript
// File: src/workers/cache-invalidation.ts
export async function invalidatePageCache(env: Env, pageId: string): Promise<void> {
  // 1. Delete KV cache
  await env.CACHE.delete(`page:${pageId}`);
  await env.CACHE.delete(`page:meta:${pageId}`);

  // 2. Add purge marker for CDN
  await env.CACHE.put(`purge:${pageId}`, Date.now().toString(), {
    expirationTtl: 60,
  });

  // 3. Log invalidation event
  await env.DB.prepare(
    `
    INSERT INTO cache_events (page_id, event_type, timestamp)
    VALUES (?, 'invalidated', ?)
  `,
  )
    .bind(pageId, Date.now())
    .run();
}
```

### 10.3 OCC Edit Handler

```typescript
// File: src/workers/handlers/edit.ts
export async function handlePageEdit(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const pageId = url.pathname.split("/")[3];
  const { content, editSummary, baseRevision } = await request.json();

  // OCC: Check and apply atomically via D1 batch
  const result = await env.DB.batch([
    env.DB.prepare("SELECT current_revision FROM pages WHERE id = ?").bind(pageId),
  ]);

  const currentRevision = result[0].results[0]?.current_revision;

  if (currentRevision !== baseRevision) {
    // Get current content for conflict resolution
    const currentPage = await env.DB.prepare("SELECT content FROM pages WHERE id = ?")
      .bind(pageId)
      .first();

    return new Response(
      JSON.stringify({
        error: "conflict",
        currentRevision,
        currentContent: currentPage?.content,
      }),
      { status: 409 },
    );
  }

  // Apply edit
  const newRevision = baseRevision + 1;
  await env.DB.batch([
    env.DB.prepare(
      `
      UPDATE pages
      SET content = ?, current_revision = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND current_revision = ?
    `,
    ).bind(content, newRevision, pageId, baseRevision),
    env.DB.prepare(
      `
      INSERT INTO revisions (id, page_id, revision_number, content, author_id, edit_summary)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    ).bind(crypto.randomUUID(), pageId, newRevision, content, "user-id", editSummary),
  ]);

  // Invalidate cache (async)
  await invalidatePageCache(env, pageId);

  return new Response(
    JSON.stringify({
      revision: newRevision,
      content,
    }),
    { status: 201 },
  );
}
```

---

## 11. Risk Register

| Risk ID    | Description                                  | Probability     | Impact | Risk Score | Mitigation                            | Residual Risk |
| ---------- | -------------------------------------------- | --------------- | ------ | ---------- | ------------------------------------- | ------------- |
| R-SYNC-001 | Stale cache served after edit                | High (bounded)  | Low    | HL         | TTL + event invalidation              | Low           |
| R-SYNC-002 | OCC conflict during high edit rate           | Medium          | Low    | ML         | DO reduces contention                 | Low           |
| R-SYNC-003 | KV eventual consistency causes inconsistency | High (expected) | Low    | HL         | Use D1 for consistency-critical reads | Low           |
| R-SYNC-004 | Cross-tab state inconsistency                | Medium          | Low    | ML         | BroadcastChannel sync                 | Low           |
| R-SYNC-005 | DO recovery loses in-memory state            | Low             | Medium | LM         | D1 persistence for critical state     | Low           |
| R-SYNC-006 | Event ordering across entities               | High (expected) | Low    | HL         | Per-entity ordering is sufficient     | Low           |
| R-SYNC-007 | Cache invalidation delay                     | High (bounded)  | Low    | HL         | Accept staleness bound                | Low           |

---

## 12. Recommendations

### 12.1 Immediate Actions

1. **Implement OCC for all wiki edits**: Every edit must include `baseRevision` and server must validate before applying.

2. **Add cache invalidation after every D1 write**: No D1 write should occur without corresponding KV cache invalidation.

3. **Use `createResource` for all async data in SolidJS**: Never manually manage loading/error states.

4. **Implement BroadcastChannel for cross-tab sync**: Detect concurrent edits across browser tabs.

### 12.2 Architecture Constraints

1. **No direct DO-to-DO calls**: All DO coordination must be mediated by Workers.

2. **No mutable global state in Workers**: Use KV or D1 for cross-request state.

3. **All cache entries must have TTL**: No indefinite cache entries without explicit invalidation.

4. **All OCC edits must include baseRevision**: No blind writes to wiki content.

### 12.3 Testing Requirements

| Test Type        | Scope                          | Tool               | Frequency    |
| ---------------- | ------------------------------ | ------------------ | ------------ |
| Unit test        | Signal propagation order       | Vitest             | Every commit |
| Unit test        | OCC conflict detection         | Vitest + Miniflare | Every commit |
| Integration test | Cache invalidation after write | Vitest + Miniflare | Every PR     |
| Integration test | DO single-threaded execution   | Vitest + Miniflare | Every PR     |
| E2E test         | Wiki edit conflict resolution  | Playwright         | Weekly       |

### 12.4 Monitoring Requirements

| Metric                   | Alert Threshold | Action                       |
| ------------------------ | --------------- | ---------------------------- |
| OCC conflict rate        | > 5% of edits   | Investigate edit patterns    |
| Cache hit rate           | < 80%           | Review TTL settings          |
| Cache invalidation delay | > 300s          | Investigate event processing |
| DO handler duration      | > 10 seconds    | Optimize handler logic       |

---

**End of Document**
**Document Status:** DRAFT — Pending concurrency review
**Owner:** Wikisites Architecture Team
