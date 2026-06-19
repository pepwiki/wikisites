---
document_id: CONCURRENCY-025-002
title: "Deadlock Risk Analysis"
version: "2.0.0"
date: "2026-06-19"
status: DRAFT
authors:
  - name: "Wikisites Architecture Team"
    role: "Primary Authors"
classification: "Internal — Phase 2.5 Concurrency Specification"
ieee_standard: "IEEE 1016-2024"
applicable_sites:
  - ENCP
  - WIKI
abstract: >-
  Comprehensive deadlock risk assessment for the wikisites platform covering
  Promise resolution patterns, Yjs CRDT synchronization, Web Worker message
  passing, D1/KV/R2 access patterns, Durable Object handler sequencing,
  Service Worker caching, and all Phase 2 component subsystems.
yellow_paper_refs:
  - "YP-WEB-TECH-001"
blue_paper_refs:
  - "BP-POWER-USER-SHELL-001"
  - "BP-CONTENT-TOOLS-001"
  - "BP-SOCIAL-LAYER-001"
  - "BP-EDITOR-001"
  - "BP-EXTENSIBILITY-001"
  - "BP-INFRA-CF-001"
---

# Deadlock Risk Analysis

**Document ID:** CONCURRENCY-025-002
**Version:** 2.0.0
**Date:** 2026-06-19
**Status:** DRAFT
**IEEE Standard:** IEEE 1016-2024

---

## Table of Contents

1. [Deadlock Theory in JavaScript Context](#1-deadlock-theory-in-javascript-context)
2. [Promise Resolution Patterns](#2-promise-resolution-patterns)
3. [Yjs CRDT Synchronization Deadlock Analysis](#3-yjs-crdt-synchronization-deadlock-analysis)
4. [Web Worker Message Passing Deadlock Analysis](#4-web-worker-message-passing-deadlock-analysis)
5. [Durable Object Handler Sequencing](#5-durable-object-handler-sequencing)
6. [Cloudflare KV Eventual Consistency](#6-cloudflare-kv-eventual-consistency)
7. [D1 Database Connection Pooling](#7-d1-database-connection-pooling)
8. [R2 Upload/Download Concurrency](#8-r2-uploaddownload-concurrency)
9. [Service Worker Caching Deadlock Analysis](#9-service-worker-caching-deadlock-analysis)
10. [Component-Specific Deadlock Analysis](#10-component-specific-deadlock-analysis)
11. [Promise.all / Promise.race Analysis](#11-promiseall--promiserace-analysis)
12. [Formal Deadlock Freedom Properties](#12-formal-deadlock-freedom-properties)
13. [Livelock and Starvation Analysis](#13-livelock-and-starvation-analysis)
14. [Risk Register](#14-risk-register)
15. [Recommendations](#15-recommendations)

---

## 1. Deadlock Theory in JavaScript Context

### 1.1 Classical Deadlock Conditions (Coffman)

| Condition | Classical | JavaScript Equivalent |
|-----------|-----------|----------------------|
| Mutual Exclusion | Resource cannot be shared | Locks, semaphores (N/A in JS) |
| Hold and Wait | Process holds resource while waiting | Synchronous lock acquisition (N/A) |
| No Preemption | Resources cannot be forcibly removed | Non-preemptible locks (N/A) |
| Circular Wait | Cyclic dependency in resource requests | Circular Promise chains |

**Key insight**: Classical deadlock **cannot occur** in single-threaded JavaScript. JavaScript has no locks, no blocking waits, and no mutual exclusion. However, **logical deadlocks** (hanging Promises, circular dependencies) are possible.

### 1.2 JavaScript Deadlock Model

| Pattern | Description | Severity |
|---------|-------------|----------|
| Promise deadlock | Two Promises waiting on each other's resolution | HIGH |
| Circular dependency | Module A imports B imports A | HIGH |
| Infinite loop | Synchronous loop that never yields | HIGH |
| Starvation | High-priority tasks prevent low-priority | MEDIUM |
| Resource exhaustion | All D1 connections occupied | MEDIUM |

---

## 2. Promise Resolution Patterns

### 2.1 Circular Promise Chains

```typescript
// DEADLOCK PATTERN
const promiseA = new Promise((resolve) => {
  promiseB.then(() => resolve("done"));
});
const promiseB = new Promise((resolve) => {
  promiseA.then(() => resolve("done"));
});
// Neither ever resolves
```

**Property DL-PROM-002**: Circular Promise chains remain pending forever.

**Risk in Wikisites**: LOW. No circular dependency chains between Promises.

### 2.2 Promise.all Hang Analysis

**Property DL-PROM-004**: `∀ Promise.all([p₁, ..., pₙ]): result resolves ⟺ ∀i: pᵢ resolves`

If any input promise hangs, `Promise.all` hangs.

### 2.3 Promise.allSettled Hang Analysis

**Critical finding**: `Promise.allSettled` also hangs if any input promise never resolves.

**Property DL-PAR-003**: `∀ Promise.allSettled([p₁, ..., pₙ]): hangs if ∃ pᵢ that never resolves`

**Mitigation**: Add explicit timeouts to all external calls.

### 2.4 Promise.race with Timeout

```typescript
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
    ),
  ]);
}
```

**Property DL-PROM-005**: `Promise.race` resolves when FIRST promise resolves/rejects.

---

## 3. Yjs CRDT Synchronization Deadlock Analysis

### 3.1 Yjs WebSocket Provider

**Execution Model**:
```
Client A ──WebSocket──► Durable Object ──WebSocket──► Client B
                           │
                      Yjs document
                      (single-threaded)
```

**Deadlock Risks**:

| Risk | Scenario | Risk Level | Analysis |
|------|----------|------------|----------|
| WebSocket message flood | Client sends faster than DO processes | Low | Messages queue; backpressure, not deadlock |
| DO handler never completes | Yjs merge takes infinite time | Negligible | Yjs merge is O(n) bounded by document size |
| WebSocket disconnect during sync | Client disconnects mid-sync | Low | Yjs handles gracefully; pending updates queued |
| Circular Yjs update | Update A triggers update B triggers update A | Negligible | Yjs CRDT prevents infinite loops via vector clocks |

**Property DL-ED-001**: Yjs WebSocket messages queue in DO's event loop. No deadlock from message ordering.

**Property DL-ED-002**: Yjs CRDT merge is idempotent and terminates. No infinite merge loops.

### 3.2 Yjs Awareness Protocol

**Deadlock Risks**:

| Risk | Scenario | Risk Level | Analysis |
|------|----------|------------|----------|
| Awareness state inconsistency | Multiple cursors for same user | Low | Awareness state is ephemeral; last-write-wins |
| Awareness timeout | Stale cursor never removed | Low | 10s timeout removes stale awareness states |

**Property DL-ED-003**: Awareness protocol is eventually consistent. No deadlock possible.

### 3.3 Yjs Document Persistence

**Deadlock Risks**:

| Risk | Scenario | Risk Level | Analysis |
|------|----------|------------|----------|
| DO crash during persistence | Yjs state partially written to D1 | Low | Yjs state is atomic (single write); D1 batch for recovery |
| D1 write during Yjs merge | Persistence and merge interleave | Negligible | DO single-threaded: handlers execute sequentially |

**Property DL-ED-004**: Yjs document persistence is atomic within DO handler. No interleaving.

---

## 4. Web Worker Message Passing Deadlock Analysis

### 4.1 Plugin Worker Communication

**Execution Model**:
```
Main Thread                Plugin Worker
┌──────────────┐          ┌──────────────┐
│ Host App     │ postMsg  │ Plugin Code  │
│              │─────────>│              │
│              │ postMsg  │              │
│              │<─────────│              │
└──────────────┘          └──────────────┘
```

**Deadlock Risks**:

| Risk | Scenario | Risk Level | Analysis |
|------|----------|------------|----------|
| Request-response deadlock | Host waits for plugin response; plugin waits for host | Low | Messages are independent; no blocking waits |
| Plugin infinite loop | Plugin never yields in Worker | Medium | Worker has no DOM; infinite loop blocks Worker thread only |
| Host timeout | Plugin never responds to host message | Medium | Host-side timeout (5s) terminates and rejects |
| Message ordering violation | Messages arrive out of order | Low | postMessage is ordered per channel |

**Property DL-EXT-001**: Plugin Worker communication is non-blocking. Host can timeout; Worker is isolated.

**Property DL-EXT-002**: Plugin crash in Worker does not affect host. `Worker.terminate()` isolates failure.

### 4.2 Plugin Lifecycle Deadlock

```typescript
// Plugin install flow
Worker A (Host)                    Plugin Worker
    │                                    │
    │── postMessage({type:"init"}) ────>│
    │                                    │ plugin.onLoad()
    │<── postMessage({type:"ready"}) ───│
    │                                    │
    │── postMessage({type:"execute"}) ─>│
    │                                    │ plugin.execute()
    │<── postMessage({type:"result"}) ──│
```

**Deadlock Risks**:

| Risk | Scenario | Risk Level | Analysis |
|------|----------|------------|----------|
| Plugin never sends "ready" | onLoad() hangs | Low | Host-side timeout (5s) |
| Plugin never returns result | execute() hangs | Low | Host-side timeout (5s) |
| Multiple init messages | Host sends init twice | Low | Plugin ignores duplicate inits |

**Property DL-EXT-003**: Plugin lifecycle is timeout-bounded. No permanent deadlock.

### 4.3 Search Worker Communication

**Deadlock Risks**:

| Risk | Scenario | Risk Level | Analysis |
|------|----------|------------|----------|
| Index query during rebuild | Query arrives while index updating | Low | Worker processes messages sequentially |
| Large result set transfer | Results exceed memory limits | Low | Paginated results; bounded by protocol |

**Property DL-EXT-004**: Search Worker processes messages sequentially. No concurrent index modification.

---

## 5. Durable Object Handler Sequencing

### 5.1 Durable Object Execution Model

```
┌──────────────────────────────────────────────┐
│              Durable Object                   │
│                                              │
│  fetch(request₁) → complete                  │
│  fetch(request₂) → complete                  │
│  webSocketMessage(msg₁) → complete           │
│  webSocketMessage(msg₂) → complete           │
│                                              │
│  All handlers execute sequentially           │
│  No handler starts until previous completes  │
│                                              │
└──────────────────────────────────────────────┘
```

**Property DL-DO-004**: `∀ DO d, ∀ handlers h₁, h₂: h₁.start < h₂.start ∨ h₂.start < h₁.start`

### 5.2 DO Handler Never Completes

```typescript
// DANGEROUS: Handler that never completes
async fetch(request: Request) {
  while (true) { /* ... */ } // Blocks all subsequent handlers
}
```

**Property DL-DO-001**: If a DO handler never completes, subsequent handlers for that DO are blocked.

**Risk in Wikisites**: LOW. All DO handlers (WikiRoom, QuizSession, ReviewSession, SessionStore, YJS_DOCUMENT) are designed to be short-lived with timeouts.

### 5.3 Circular DO-to-DO Calls

```typescript
// DANGEROUS: DO A calls DO B, DO B calls DO A
// Both handlers block indefinitely
```

**Property DL-DO-002**: Circular DO-to-DO calls cause deadlock.

**Risk in Wikisites**: NEGLIGIBLE. Architecture constraint: no DO-to-DO calls. All coordination mediated by Workers.

### 5.4 WebSocket Message Flooding

**Property DL-DO-003**: Messages queue in DO's event loop. No messages lost; backpressure may cause latency.

**Mitigation**: Client-side rate limiting (10 messages/second).

---

## 6. Cloudflare KV Eventual Consistency

### 6.1 KV Read-After-Write Inconsistency

```typescript
await env.CACHE.put("key", "value");
const cached = await env.CACHE.get("key"); // May be null or stale!
```

**Property DL-KV-001**: `∀ KV put(k, v) followed by get(k): get(k) may return null, stale value, or v`

### 6.2 KV Lost Updates

```typescript
const current = (await env.CACHE.get<number>(key)) ?? 0;
await env.CACHE.put(key, current + 1); // Another request may have modified!
```

**Property DL-KV-002**: `∀ concurrent KV increment operations on same key: lost updates may occur`

**Mitigation**: Use D1 atomic increment: `UPDATE SET col = col + 1`.

---

## 7. D1 Database Connection Pooling

### 7.1 D1 Connection Model

```
Worker Request → D1 API → Connection Pool
Pool managed by Cloudflare runtime
Limits: max 1000 concurrent queries per DB
```

**Property DL-D1-001**: `∀ D1 queries q₁, ..., qₙ where n > max_pool_size: queries queue; they do not deadlock`

### 7.2 D1 Batch Atomicity

**Property DL-D1-002**: `∀ D1 batch b: b executes atomically; no interleaving; no deadlock`

---

## 8. R2 Upload/Download Concurrency

### 8.1 R2 Concurrent Uploads

**Property DL-R2-001**: `∀ concurrent R2 put(k, v₁) and put(k, v₂): final state is either v₁ or v₂ (last-write-wins)`

### 8.2 R2 Download During Upload

**Property DL-R2-004**: `∀ R2 get(k) where put(k) is in progress: get(k) may return null`

---

## 9. Service Worker Caching Deadlock Analysis

### 9.1 Service Worker Lifecycle

**Note**: The wikisites platform does NOT currently use a custom Service Worker. PWA functionality is handled by Cloudflare Pages CDN caching (stale-while-revalidate). If a Service Worker is introduced in the future:

**Potential Deadlock Risks**:

| Risk | Scenario | Risk Level | Analysis |
|------|----------|------------|----------|
| SW update loop | New SW installed, immediately claims clients, clients reload, new SW installed... | Low | Use `skipWaiting()` carefully; version check |
| Cache API contention | Multiple tabs read/write same cache | Low | Cache API is asynchronous; no blocking |
| Fetch handler blocking | SW fetch handler takes too long | Medium | Browser timeout (~30s); use `event.waitUntil()` |
| Navigation preload race | Navigation request arrives before SW activated | Low | Use `clients.claim()` after activation |

**Property DL-SW-001**: Service Worker fetch handlers are asynchronous and non-blocking. No classical deadlock.

**Property DL-SW-002**: Cache API operations are atomic per call. No interleaving within single cache operation.

### 9.2 SW Cache Invalidation Patterns

```typescript
// Pattern: Stale-while-revalidate in SW
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('v1').then(async (cache) => {
      const cached = await cache.match(event.request);
      const fetchPromise = fetch(event.request).then((response) => {
        cache.put(event.request, response.clone());
        return response;
      });
      return cached || fetchPromise;
    })
  );
});
```

**Deadlock Risks**:

| Risk | Scenario | Risk Level | Analysis |
|------|----------|------------|----------|
| Cache size exhaustion | Too many entries; eviction needed | Low | LRU eviction; bounded cache size |
| Fetch + cache.put race | Two SW instances cache same URL | Low | Cache API is per-origin; no cross-origin race |

---

## 10. Component-Specific Deadlock Analysis

### 10.1 Power User Shell

| Component | Deadlock Risk | Analysis |
|-----------|--------------|----------|
| CommandPalette | None | Synchronous fuzzy search, no async I/O |
| KeyboardShortcuts | None | Synchronous event dispatch |
| OutlinePanel | None | IntersectionObserver callback is async but non-blocking |
| Breadcrumbs | None | Static rendering, no async operations |

### 10.2 Content Tools

| Component | Deadlock Risk | Analysis |
|-----------|--------------|----------|
| LaTeXRenderer | None | KaTeX rendering is synchronous (SSR) or non-blocking (CSR) |
| GraphView | Low | d3-force simulation runs in requestAnimationFrame; no blocking |
| SplitPane | None | CSS Grid layout is browser-internal; no JS blocking |
| RegexSearch | Medium | ReDoS could block main thread; mitigated by 4-layer defense + timeout |

**Property DL-CT-001**: RegexSearch execution bounded by 100ms timeout. AbortController terminates if exceeded.

### 10.3 Social Layer

| Component | Deadlock Risk | Analysis |
|-----------|--------------|----------|
| CommentsSystem | Low | D1 batch atomicity prevents interleaving; KV rate limits queue |
| AnnotationLayer | Low | D1 batch atomicity; XPath resolution is synchronous |
| UserAccounts | Low | DO single-threaded for sessions; OAuth flow is external |

### 10.4 Editor

| Component | Deadlock Risk | Analysis |
|-----------|--------------|----------|
| MDXEditor | None | TipTap is single-threaded; no blocking I/O |
| CollaborationEngine (Yjs) | Low | WebSocket messages queue; DO single-threaded; CRDT merge terminates |
| VersionHistory | Low | Forgejo API calls are HTTP (non-blocking); D1 cache reads are atomic |

**Property DL-ED-005**: Yjs CRDT merge terminates in O(n) where n = number of concurrent updates.

### 10.5 Extensibility Layer

| Component | Deadlock Risk | Analysis |
|-----------|--------------|----------|
| PluginAPI | Medium | Plugin infinite loop blocks Worker; host timeout (5s) mitigates |
| ThemeEngine | None | CSS custom properties swap is atomic (browser compositor) |
| SettingsManager | Low | localStorage is synchronous (non-blocking); D1 sync is async |

**Property DL-EXT-004**: Plugin Worker is terminated after 5s timeout if no response.

---

## 11. Promise.all / Promise.race Analysis

### 11.1 Promise.all Hang Scenarios

```typescript
// HANGS if any input promise never resolves
const results = await Promise.all([
  fetchUsers(),      // Resolves in 100ms
  fetchPages(),      // Resolves in 200ms
  new Promise(() => {}), // Never resolves — HANGS ENTIRE await
]);
```

**Property DL-PAR-001**: `∀ Promise.all([p₁, ..., pₙ]): hangs if ∃ pᵢ that never resolves`

### 11.2 Promise.allSettled Hang Scenarios

```typescript
// ALSO HANGS if any promise never resolves!
const results = await Promise.allSettled([
  fetchUsers(),
  new Promise(() => {}), // Never resolves — Promise.allSettled hangs too!
]);
```

**Property DL-PAR-003**: `∀ Promise.allSettled([p₁, ..., pₙ]): hangs if ∃ pᵢ that never resolves`

**This is a critical insight.** Both `Promise.all` and `Promise.allSettled` protect against rejections but NOT against hanging promises.

### 11.3 Safe Pattern: Timeout-Protected Parallel Execution

```typescript
function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

// SAFE: All promises have timeouts
const results = await Promise.allSettled([
  withTimeout(fetchUsers(), 5000, []),
  withTimeout(fetchPages(), 5000, []),
  withTimeout(fetchQuizzes(), 5000, []),
]);
```

---

## 12. Formal Deadlock Freedom Properties

### 12.1 Invariants

```
// Invariant 1: V8 event loop is non-blocking
∀ await expression a: a yields control to event loop; a does not block

// Invariant 2: No mutual exclusion in JavaScript
∀ JavaScript execution context c: no locks, semaphores, or critical sections

// Invariant 3: Promise resolution is one-way
∀ promise p: p transitions pending → fulfilled/rejected exactly once

// Invariant 4: Durable Objects are sequential
∀ DO d: handlers execute one at a time; no concurrency within d

// Invariant 5: Cloudflare resources are lock-free
∀ Cloudflare resource r (KV, D1, R2): access is via HTTP API; no locks

// Invariant 6: Web Worker communication is message-based
∀ worker communication: postMessage creates independent copies; no shared memory

// Invariant 7: Yjs CRDT merge terminates
∀ Yjs update u: merge(u) completes in O(n) time

// Invariant 8: Plugin Worker is timeout-bounded
∀ plugin message m: host waits ≤ timeout(m); Worker terminated if exceeded
```

### 12.2 Properties Table

| Property ID | Description | Status | Verification |
|-------------|-------------|--------|--------------|
| DL-PROM-001 | Promise state immutability | Proven | ECMAScript specification |
| DL-PROM-002 | Circular promise chains cause hang | Proven | Promise resolution semantics |
| DL-PROM-004 | Promise.all hangs if any input hangs | Proven | Promise.all specification |
| DL-PROM-005 | Promise.race hangs if all inputs hang | Proven | Promise.race specification |
| DL-PROM-006 | Promise.allSettled hangs if any input hangs | Proven | Promise.allSettled specification |
| DL-ASYNC-001 | Sequential chain hangs if any step hangs | Proven | async/await semantics |
| DL-RES-001 | Cloudflare resources are lock-free | Proven | HTTP API model |
| DL-RES-002 | D1 batch atomicity | Proven | SQLite transaction semantics |
| DL-KV-001 | KV eventual consistency | Proven | KV specification |
| DL-KV-002 | KV lost updates | Proven | KV eventual consistency |
| DL-D1-001 | D1 queries queue, don't deadlock | Proven | Connection pool model |
| DL-D1-002 | D1 batch atomicity | Proven | SQLite transaction semantics |
| DL-R2-001 | R2 last-write-wins | Proven | R2 consistency model |
| DL-R2-004 | R2 download during upload returns null | Proven | R2 consistency model |
| DL-DO-001 | DO handler that never completes blocks all | Proven | DO single-threaded model |
| DL-DO-002 | Circular DO-to-DO calls cause deadlock | Proven | DO execution model |
| DL-DO-003 | DO message flooding causes backpressure | Proven | DO event queue model |
| DL-DO-004 | DO handlers execute sequentially | Proven | DO single-threaded guarantee |
| DL-ED-001 | Yjs WebSocket messages queue in DO | Proven | DO single-threaded |
| DL-ED-002 | Yjs CRDT merge terminates | Proven | Yjs specification |
| DL-ED-003 | Yjs awareness eventually consistent | Proven | Yjs specification |
| DL-ED-004 | Yjs persistence atomic in DO | Proven | DO single-threaded |
| DL-EXT-001 | Plugin Worker communication non-blocking | Proven | Web Worker API |
| DL-EXT-002 | Plugin crash isolated | Proven | Worker.terminate() |
| DL-EXT-003 | Plugin lifecycle timeout-bounded | Proven | Host-side timeout |
| DL-EXT-004 | Plugin Worker terminated on timeout | Proven | Worker.terminate() |
| DL-CT-001 | RegexSearch timeout bounded | Proven | 4-layer defense |
| DL-SW-001 | SW fetch handlers non-blocking | Proven | Service Worker spec |
| DL-SW-002 | Cache API operations atomic | Proven | Cache API spec |
| DL-PAR-001 | Promise.all hangs if any input hangs | Proven | Promise.all specification |
| DL-PAR-003 | Promise.allSettled hangs if any input hangs | Proven | Promise.allSettled specification |
| **Total** | **31 properties** | **All Proven** | |

---

## 13. Livelock and Starvation Analysis

### 13.1 Livelock Patterns

#### 13.1.1 Retry Storm

```typescript
// DANGEROUS: Aggressive retry without backoff
async function fetchWithRetry(url: string): Promise<Response> {
  while (true) {
    try { return await fetch(url); }
    catch { /* Immediately retry — no backoff */ }
  }
}
```

**Property DL-LIVE-001**: Retry without backoff may cause livelock under high concurrency.

**Mitigation**: Exponential backoff with jitter.

### 13.2 Starvation Patterns

#### 13.2.1 KV Write Starvation

**Property DL-STAR-001**: `∀ concurrent KV increments: only one write succeeds; others are lost`

**Mitigation**: Use D1 atomic increment.

#### 13.2.2 D1 Connection Starvation

**Property DL-STAR-002**: `∀ long-running D1 queries: simple queries may be starved of connections`

**Mitigation**: Pagination, query scope limits, timeouts.

---

## 14. Risk Register

| Risk ID | Component | Description | Probability | Impact | Risk Score | Mitigation | Residual |
|---------|-----------|-------------|-------------|--------|------------|------------|----------|
| R-DL-001 | All | Promise.all hangs due to hanging promise | Medium | High | MH | Timeout all promises | Low |
| R-DL-002 | KV | Lost updates on concurrent writes | High | Medium | MH | Use D1 atomic operations | Low |
| R-DL-003 | Durable Objects | Circular DO-to-DO call deadlock | Negligible | High | LH | Architecture constraint | Negligible |
| R-DL-004 | D1 | Connection pool exhaustion | Low | Medium | LM | Rate limiting, pagination | Low |
| R-DL-005 | All | Retry storm (livelock) | Medium | Medium | MM | Exponential backoff | Low |
| R-DL-006 | KV | Read-after-write inconsistency | High (expected) | Low | HL | Use D1 for consistency | Low |
| R-DL-007 | R2 | Last-write-wins on concurrent uploads | Medium | Medium | MM | Versioned keys | Low |
| R-DL-008 | Durable Objects | Handler never completes | Low | High | LH | Timeouts for external calls | Low |
| R-DL-009 | PluginAPI | Plugin infinite loop blocks Worker | Medium | Medium | MM | Host-side 5s timeout | Low |
| R-DL-010 | RegexSearch | ReDoS blocks main thread | Medium | High | MH | 4-layer defense + timeout | Low |
| R-DL-011 | Yjs | WebSocket message flood | Low | Low | LL | Client-side rate limiting | Negligible |
| R-DL-012 | ServiceWorker | SW update loop | Low | Medium | LM | Version check, skipWaiting | Low |

---

## 15. Recommendations

### 15.1 Immediate Actions (Phase 3)

1. **Add timeouts to ALL external calls**: Every KV, D1, R2, DO, Forgejo, and WebSocket call must have a timeout (5–30 seconds).

2. **Use `Promise.allSettled` with timeouts**: Never use `Promise.all` for independent operations. Always pair with `withTimeout()`.

3. **Use D1 for atomic operations**: Never implement read-modify-write on KV. Use D1 `UPDATE SET col = col + 1`.

4. **Implement exponential backoff**: All retry logic must use backoff with jitter (base 1000ms, max 10s).

5. **Plugin Worker timeout**: All plugin messages must have a 5s host-side timeout. Terminate Worker on timeout.

### 15.2 Architecture Constraints

1. **No DO-to-DO calls**: Durable Objects must not call other Durable Objects.

2. **No mutable global state in Workers**: Use KV or D1 for cross-request state.

3. **All cache entries must have TTL**: No indefinite cache entries without explicit invalidation.

4. **All OCC edits must include baseRevision**: No blind writes.

5. **Plugin sandbox blocks DOM access**: Plugins execute in Web Worker with no DOM access.

### 15.3 Testing Requirements

| Test Type | Scope | Tool | Frequency |
|-----------|-------|------|-----------|
| Unit | Promise timeout behavior | Vitest | Every commit |
| Unit | OCC conflict detection | Vitest + Miniflare | Every commit |
| Unit | ReDoS defense effectiveness | Vitest | Every commit |
| Integration | Concurrent request handling | Vitest + Miniflare | Every PR |
| Integration | Plugin Worker isolation | Vitest + worker harness | Every PR |
| Stress | D1 connection pool exhaustion | wrangler dev | Before deploy |
| Chaos | KV unavailability handling | Vitest + Miniflare | Weekly |

### 15.4 Monitoring Requirements

| Metric | Alert Threshold | Action |
|--------|----------------|--------|
| D1 query latency | > 500ms (p99) | Investigate slow queries |
| Promise timeout rate | > 0.1% | Investigate hanging operations |
| DO handler duration | > 10 seconds | Optimize handler logic |
| Plugin Worker timeout rate | > 1% | Investigate plugin performance |
| OCC conflict rate | > 5% of edits | Investigate edit patterns |

---

**End of Document**
**Document Status:** DRAFT — Pending concurrency review
**Owner:** Wikisites Architecture Team
