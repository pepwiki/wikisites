---
document_id: CONCURRENCY-025-001
title: "Thread Safety Analysis"
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
  Thread safety analysis for the wikisites platform covering SolidJS reactive
  system fine-grained reactivity, Cloudflare Workers V8 isolate request handling,
  static site generation build-time concurrency, client-side view transitions
  API navigation, Web Worker search indexing, and SharedArrayBuffer usage
  assessment.
yellow_paper_refs:
  - "YP-WEB-TECH-001"
---

# Thread Safety Analysis

**Document ID:** CONCURRENCY-025-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** DRAFT
**IEEE Standard:** IEEE 1016-2024

---

## Table of Contents

1. [Scope and Definitions](#1-scope-and-definitions)
2. [SolidJS Reactive System Thread Safety](#2-solidjs-reactive-system-thread-safety)
3. [Cloudflare Workers Request Handling](#3-cloudflare-workers-request-handling)
4. [Static Site Generation Concurrency](#4-static-site-generation-concurrency)
5. [Client-Side Navigation and View Transitions](#5-client-side-navigation-and-view-transitions)
6. [Web Workers for Search Indexing](#6-web-workers-for-search-indexing)
7. [SharedArrayBuffer Assessment](#7-sharedarraybuffer-assessment)
8. [Cross-Component Thread Safety](#8-cross-component-thread-safety)
9. [Formal Properties](#9-formal-properties)
10. [Risk Register](#10-risk-register)
11. [Recommendations](#11-recommendations)

---

## 1. Scope and Definitions

### 1.1 Execution Contexts

The wikisites platform operates across four distinct execution contexts, each with different threading and concurrency guarantees:

| Context | Runtime | Isolation Model | Shared State | Thread Safety Requirement |
|---------|---------|-----------------|--------------|---------------------------|
| Astro SSG Build | Node.js (Vite) | Process-level (single-threaded event loop) | Build graph, content collections | Build pipeline ordering |
| Cloudflare Workers | V8 isolates | Isolate-level (no shared memory) | None between isolates | Per-request atomicity |
| Client-side (Browser) | Blink/V8 | Event loop + Web Workers | DOM, memory, localStorage | Signal consistency |
| Web Workers | V8 (dedicated/shared) | PostMessage passing | SharedArrayBuffer (if opted in) | Message ordering |

### 1.2 Concurrency Hazards in Scope

| Hazard Type | Description | Applicable Contexts |
|-------------|-------------|---------------------|
| Race condition | Non-deterministic ordering of reads/writes to shared state | Client-side, Web Workers |
| Data race | Unsynchronized concurrent access to the same memory location | Client-side, SharedArrayBuffer |
| Signal glitch | Inconsistent intermediate state observed during signal propagation | SolidJS reactive system |
| Torn read/write | Partial read of a value being written | V8 isolate boundaries, KV eventual consistency |
| Deadlock | Circular waiting for locks | Not applicable (no locks in V8 isolates) |
| Livelock | Continuous state changes without progress | Signal propagation loops |
| Starvation | A task never completes due to resource contention | Worker thread scheduling |

### 1.3 Definitions

- **Signal**: SolidJS reactive primitive that notifies dependents on value change.
- **Computed**: Derived value that recomputes when dependencies change.
- **Effect**: Side effect that re-runs when dependencies change.
- **Isolate**: V8 execution context in Cloudflare Workers; no shared heap with other isolates.
- **Reactive graph**: Directed acyclic graph (DAG) of signal → computed → effect dependencies.

---

## 2. SolidJS Reactive System Thread Safety

### 2.1 Fine-Grained Reactivity Architecture

SolidJS implements a push-pull reactive system where:

1. **Signals** are read via `createSignal()` and return `[getter, setter]`.
2. **Computeds** are derived values created via `createMemo()`.
3. **Effects** are side effects created via `createEffect()` or `createRenderEffect()`.
4. The **Owner** context tracks the reactive graph per-component lifecycle.

```
Signal A ─────┬──► Computed B ──► Effect C
              │
              └──► Computed D ──► Effect E
```

### 2.2 Signal Propagation Guarantees

#### 2.2.1 Synchronous Batch Updates

SolidJS batches signal updates within `batch()` or inside event handlers:

```typescript
// Within a single synchronous execution context:
const [count, setCount] = createSignal(0);
const [name, setName] = createSignal("initial");

// These two writes trigger one recomputation of dependents
batch(() => {
  setCount(1);
  setName("updated");
});
```

**Thread Safety Property**: Signal updates within a single JavaScript execution context (single event loop tick) are atomic. There is no preemption within synchronous code in the browser's main thread.

**Property ID**: TS-SOLID-001
**Statement**: `∀ synchronous batch: all signal writes within batch() complete before any dependent recomputation begins`
**Proof**: SolidJS implementation uses a queue-based batching mechanism; effects are deferred to microtask resolution.
**Status**: Implemented in SolidJS core.

#### 2.2.2 Synchronous Reactive Propagation

When a signal setter is called outside a batch:

```typescript
setCount(1);  // Triggers synchronous recomputation of Computed B, Effect C
```

SolidJS performs synchronous topological propagation of the reactive graph. This means:

1. When `count` changes, `Computed B` recomputes synchronously.
2. If `Computed B` is a dependency of `Effect C`, `Effect C` runs synchronously.
3. The entire propagation completes within a single microtask.

**Thread Safety Property**: Reactive propagation is synchronous and single-threaded. No other code can observe an intermediate state between a signal write and its dependent recomputation on the same thread.

**Property ID**: TS-SOLID-002
**Statement**: `∀ signal write s: no code between s.write() and s.propagate() observes inconsistent derived state on the same thread`
**Proof**: V8 event loop is single-threaded; synchronous propagation completes without yield points.

#### 2.2.3 Async Boundary Risks

When reactive code crosses async boundaries (Promises, setTimeout, event handlers), the batch guarantee is lost:

```typescript
createEffect(async () => {
  const data = await fetchData();          // Yields control
  const count = count();                   // Re-reads signal (may have changed)
  // Between await and read, another event could have modified count
  setData(data);
});
```

**Thread Safety Property**: Async effects may observe inconsistent state if signals change between `await` points. This is by design and not a bug.

**Property ID**: TS-SOLID-003
**Statement**: `∀ async effect e: e may observe stale signal values after await points`
**Mitigation**: Use `createResource()` for async data dependencies; signals only control when to refetch, not data consistency.

### 2.3 Computed Value Thread Safety

#### 2.3.1 Memoization and Staleness

`createMemo()` caches derived values and only recomputes when dependencies change:

```typescript
const doubled = createMemo(() => count() * 2);
```

**Thread Safety Property**: Memoized computeds are always consistent with their dependencies at the time of read. SolidJS guarantees that a computed never returns a stale value when read synchronously after a dependency change.

**Property ID**: TS-SOLID-004
**Statement**: `∀ computed c at read time t: c.value(t) = f(deps(t))`
**Status**: Implemented in SolidJS core.

#### 2.3.2 Untracked Reads

`untrack()` suppresses dependency tracking:

```typescript
const value = untrack(() => otherSignal());
```

**Thread Safety Property**: `untrack()` reads are safe but may observe stale values. This is intentional for performance-critical paths where the read does not define a dependency.

**Property ID**: TS-SOLID-005
**Statement**: `∀ untracked read u: u may return stale value; u does not create dependency edge`

### 2.4 Ownership and Disposal

SolidJS tracks reactive ownership per-component. When a component is disposed:

1. All child effects are cancelled.
2. All child computeds are garbage collected.
3. No further propagation occurs for disposed nodes.

**Thread Safety Property**: No use-after-dispose in reactive graph because disposal is synchronous and prevents future propagation.

**Property ID**: TS-SOLID-006
**Statement**: `∀ component disposal d: no effect or computed in d's tree executes after d completes`

### 2.5 Concurrency Hazards in SolidJS

| Hazard | Scenario | Risk Level | Mitigation |
|--------|----------|------------|------------|
| Stale async reads | `await` in `createEffect` reads signal after change | Low | Use `createResource` |
| Foreign object mutation | Mutating external state in reactive context | Medium | Immutable data patterns |
| Untracked reactivity loss | `untrack()` when dependency tracking needed | Low | Avoid unless profiling |
| Owner context leak | Creating reactive context outside component | Medium | Strict component boundaries |
| Effect disposal race | Async effect continues after component unmount | Low | AbortController pattern |

---

## 3. Cloudflare Workers Request Handling

### 3.1 V8 Isolate Isolation Model

Cloudflare Workers use V8 isolates as the isolation primitive. Key properties:

| Property | Guarantee | Implication |
|----------|-----------|-------------|
| Memory isolation | Each isolate has its own heap | No shared memory between requests |
| No shared state | Isolates cannot reference each other's objects | No data races between requests |
| Single-threaded execution | Each isolate runs on a single thread | No preemption within a request |
| Deterministic execution | Same input → same output (for pure functions) | No non-determinism from concurrency |
| Statefulness | Isolates can persist state in global scope | State is per-isolate, not per-request |

#### 3.1.1 Isolate Lifecycle

```
Request arrives
    │
    ▼
┌──────────────────┐
│ Isolate allocated│ ← May be reused from pool
│ (or cold start)  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Global scope     │ ← Executes once per isolate (NOT per request)
│ initialization   │   KV/D1/R2 bindings cached here
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ fetch() handler  │ ← Executes per request
│ (request-level)  │   Isolated heap, no shared memory
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Response sent    │ ← Isolate may be reused for next request
└──────────────────┘
```

**Thread Safety Property**: Since isolates have no shared memory, two requests handled by different isolates cannot interfere with each other. Each request sees only its own heap state.

**Property ID**: TS-CF-001
**Statement**: `∀ isolates i₁, i₂ where i₁ ≠ i₂: no shared mutable state exists between i₁ and i₂`

#### 3.1.2 Global Scope State

Cloudflare Workers can persist state in the global scope:

```typescript
// This runs once per isolate, NOT per request
const cache = new Map<string, unknown>();

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // `cache` is shared across requests hitting THIS isolate
    // But NOT across isolates
    const key = new URL(request.url).pathname;
    if (cache.has(key)) {
      return new Response(JSON.stringify(cache.get(key)));
    }
    // ... fetch and cache
  },
};
```

**Thread Safety Property**: Global scope state is shared across requests within a single isolate but NOT across isolates. Requests within the same isolate are single-threaded (no preemption), so global scope mutations are safe as long as:

1. No `await` between read and write of global state creates a window for another request to interleave.

Wait — V8 is single-threaded even with async/await. Within a single isolate, the event loop processes one task at a time. When an `await` yields, the next task in the queue runs. This means:

```typescript
async fetch(request: Request) {
  const value = globalCache.get("key"); // Read
  await someAsyncOperation();            // Yields to event loop
  globalCache.set("key", value + 1);     // Another request may have modified "key"!
}
```

**This is a real race condition within a single isolate across concurrent requests.**

**Property ID**: TS-CF-002
**Statement**: `∀ isolate i with concurrent requests r₁, r₂: if r₁.await() yields between read and write of global state, r₂ may interleave`
**Risk**: MEDIUM
**Mitigation**: Either (a) use `waitUntil()` for global state mutations, (b) avoid global state mutations in request handlers, or (c) use KV/D1 for cross-request state.

#### 3.1.3 KV Eventual Consistency and Isolate State

```typescript
async fetch(request: Request, env: Env) {
  // KV write
  await env.CACHE.put("key", "value");
  
  // KV read — may NOT return "value" immediately
  const value = await env.CACHE.get("key");
  // value could be null, stale, or "value"
}
```

**Thread Safety Property**: KV provides eventual consistency. Writes are not guaranteed to be visible to subsequent reads, even within the same isolate.

**Property ID**: TS-CF-003
**Statement**: `∀ KV put(k, v) at time t: ∃ t' ≥ t where get(k) at t' returns v; but ∀ t'' where t ≤ t'' < t': get(k) at t'' may return stale value`
**Risk**: MEDIUM
**Mitigation**: Use D1 for strong consistency; use KV for caching only.

### 3.2 Durable Objects Single-Threaded Consistency

Durable Objects provide a single-threaded execution guarantee:

```
┌──────────────────────────────────────────────┐
│              Durable Object                   │
│                                              │
│  Single-threaded event loop                  │
│  All handlers execute sequentially           │
│  State mutations are atomic within handler   │
│                                              │
│  WebSocket messages processed one at a time  │
│  No preemption between handlers              │
│                                              │
└──────────────────────────────────────────────┘
```

**Thread Safety Property**: Durable Objects guarantee single-threaded execution. All `fetch()` and `webSocketMessage()` handlers for a single Durable Object instance execute sequentially. No two handlers run concurrently.

**Property ID**: TS-CF-004
**Statement**: `∀ DO instance d, ∀ handlers h₁, h₂: h₁ completes before h₂ begins`
**Status**: Implemented by Cloudflare runtime.

### 3.3 Request-Level Concurrency Patterns

#### 3.3.1 Fan-Out with `waitUntil()`

```typescript
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const response = await handleRequest(request, env);
    
    // Fire-and-forget: runs after response is sent
    ctx.waitUntil(
      env.CACHE.put(cacheKey, response.clone())
    );
    
    return response;
  },
};
```

**Thread Safety Property**: `waitUntil()` tasks execute after the response is sent but do not block the response. They are safe for side effects (cache writes, analytics) but must not depend on request-scoped state that may be garbage collected.

**Property ID**: TS-CF-005
**Statement**: `∀ waitUntil task t: t executes after response send; t does not have access to request-scoped state after response`

#### 3.3.2 D1 Transaction Atomicity

```typescript
async function transferCredits(env: Env, fromId: string, toId: string, amount: number) {
  await env.DB.batch([
    env.DB.prepare("UPDATE users SET credits = credits - ? WHERE id = ?").bind(amount, fromId),
    env.DB.prepare("UPDATE users SET credits = credits + ? WHERE id = ?").bind(amount, toId),
  ]);
}
```

**Thread Safety Property**: D1 `batch()` executes multiple statements atomically within a single database transaction. No other request can interleave between the statements.

**Property ID**: TS-CF-006
**Statement**: `∀ D1 batch b: all statements in b execute atomically; no other request observes intermediate state`

### 3.4 Concurrency Hazard Matrix

| Hazard | Component | Risk | Mitigation |
|--------|-----------|------|------------|
| Global scope race | Worker `Map`/`Set` | Medium | Avoid mutable global state; use KV |
| KV stale read | All KV operations | Medium | Use D1 for consistency-critical reads |
| DO message ordering | WebSocket handlers | Low | DO single-threaded guarantee |
| R2 eventual consistency | R2 `put` then `get` | Low | R2 is strongly consistent for same-key operations |
| D1 connection limits | High-concurrency writes | Low | D1 connection pooling is managed by Cloudflare |
| Cron trigger overlap | Cron jobs | Low | Cloudflare guarantees non-overlapping cron execution per worker |

---

## 4. Static Site Generation Concurrency

### 4.1 Astro Build Pipeline

Astro's build pipeline uses Vite, which orchestrates page generation concurrently:

```
┌──────────────────────────────────────────────┐
│              Astro Build Pipeline              │
│                                              │
│  1. Content Collection Processing            │
│     ├── Parallel: read all .md/.mdx files    │
│     └── Sequential: validate schemas         │
│                                              │
│  2. Route Resolution                         │
│     └── Sequential: compute page routes      │
│                                              │
│  3. Page Rendering                           │
│     ├── Concurrent: render pages in batches  │
│     │   (Node.js worker_threads or async)    │
│     └── Sequential: per-page dependency      │
│         resolution                           │
│                                              │
│  4. Static Asset Generation                  │
│     ├── Concurrent: hash and write files     │
│     └── Sequential: manifest generation      │
│                                              │
└──────────────────────────────────────────────┘
```

### 4.2 Build-Time Concurrency Analysis

#### 4.2.1 Content Collection Reads

During build, content collections are read from the filesystem:

```typescript
// Astro content collection API
const guides = await getCollection("study-guides");
```

**Thread Safety Property**: Filesystem reads during build are safe because:
1. Build runs in a single process (no concurrent file modifications during build).
2. The build output directory (`dist/`) is clean before build starts.
3. No other process modifies content files during build.

**Property ID**: TS-SSG-001
**Statement**: `∀ build-time file reads r: r sees consistent snapshot of content at build start time`
**Risk**: LOW (build-time only)

#### 4.2.2 Page Rendering Concurrency

Astro renders pages using Vite's dev server (in dev mode) or Rollup (in production). Pages are rendered in batches:

```typescript
// Simplified Astro build internals
async function renderPages(routes: Route[]) {
  // Pages are rendered concurrently in batches of N
  const batchSize = os.cpus().length || 4;
  for (let i = 0; i < routes.length; i += batchSize) {
    const batch = routes.slice(i, i + batchSize);
    await Promise.all(batch.map(route => renderPage(route)));
  }
}
```

**Thread Safety Property**: Each page render is independent. SolidJS hydration scripts are embedded as static JS bundles. No shared state exists between page renders.

**Property ID**: TS-SSG-002
**Statement**: `∀ page renders r₁, r₂ during build: r₁ and r₂ are independent; no shared mutable state`

#### 4.2.3 Shared Component Library During Build

The `@wikisites/shared` library is imported by both sites at build time. Calculations (MW, charge, pI) are pure functions:

```typescript
// Pure functions are safe for concurrent invocation
const mw1 = calculateMolecularWeight("ACDEF");
const mw2 = calculateMolecularWeight("GHIKL");
// No shared state, no side effects, no concurrency hazard
```

**Thread Safety Property**: Pure calculation functions are inherently thread-safe. They operate on input parameters only and produce deterministic output.

**Property ID**: TS-SSG-003
**Statement**: `∀ pure function calls f(a) and f(b): f(a) || f(b) is equivalent to sequential execution`

### 4.3 Build-Time Concurrency Hazards

| Hazard | Scenario | Risk | Mitigation |
|--------|----------|------|------------|
| Filesystem contention | Parallel file reads during build | Low | Vite handles I/O scheduling |
| Memory pressure | Large content collections exhaust memory | Medium | Paginated content collection loading |
| Source map conflicts | Multiple pages writing source maps | Low | Vite manages output files |
| Content hash collisions | Two files producing identical hashes | Negligible | SHA-256 hash collision probability is negligible |
| Missing dependency | Page A imports component that depends on Page B's build output | Low | Astro dependency graph resolution |

---

## 5. Client-Side Navigation and View Transitions

### 5.1 View Transitions API

The View Transitions API (Chrome 111+) enables animated transitions between DOM states:

```typescript
// SolidJS integration with View Transitions
function navigate(path: string) {
  if (!document.startViewTransition) {
    // Fallback: immediate navigation
    router.navigate(path);
    return;
  }

  const transition = document.startViewTransition(() => {
    // This callback updates the DOM
    router.navigate(path);
  });

  // transition.finished resolves when animation completes
  await transition.finished;
}
```

### 5.2 Thread Safety Analysis

#### 5.2.1 DOM Mutation During Transition

The View Transitions API captures old and new DOM states. During the transition callback:

**Thread Safety Property**: `document.startViewTransition()` captures the old DOM state before the callback executes. The callback must synchronously update the DOM. No other DOM mutations should occur between capture and update.

**Property ID**: TS-VT-001
**Statement**: `∀ transition t: old state captured before callback; new state captured after callback; no interleaving mutations`

**Risk**: If a SolidJS effect runs between capture and update, it could mutate the DOM, causing inconsistent captured states.

**Mitigation**: Ensure the transition callback is synchronous (no `await` before DOM update). SolidJS renders synchronously within a component boundary, so this is safe for standard navigation.

#### 5.2.2 Concurrent Signal Updates During Navigation

When navigation triggers route changes, multiple SolidJS components may unmount/mount:

```typescript
// Route A unmounts, Route B mounts
// Effects from A are disposed, effects from B are created
// All within a single synchronous batch
```

**Thread Safety Property**: SolidJS component disposal and creation during navigation is synchronous and atomic within a single event loop tick. No interleaving of effects from old and new routes.

**Property ID**: TS-VT-002
**Statement**: `∀ navigation n: effects from old route are fully disposed before effects from new route execute`

#### 5.2.3 `popstate` and `hashchange` Event Ordering

```typescript
// Browser fires popstate on back/forward navigation
window.addEventListener("popstate", () => {
  // This fires synchronously
  // Router updates signals, which triggers re-render
  // View transition captures old state, updates, captures new state
});
```

**Thread Safety Property**: `popstate` events are processed by the event loop sequentially. No two `popstate` events can interleave.

**Property ID**: TS-VT-003
**Statement**: `∀ popstate events e₁, e₂: e₁ handler completes before e₂ handler begins`

### 5.3 Client-Side Navigation Hazards

| Hazard | Scenario | Risk | Mitigation |
|--------|----------|------|------------|
| Stale route state | Navigation during async data fetch | Medium | Abort pending fetches on navigation |
| Double render | Fast back/forward clicking | Low | View Transition cancellation handling |
| Scroll position race | `scrollTo` before DOM update | Low | Use `viewTransition.updateCallbackDone` |
| Transition name conflict | Multiple elements with same `view-transition-name` | Low | Unique names per route |

---

## 6. Web Workers for Search Indexing

### 6.1 Search Worker Architecture

FlexSearch and Pagefind indexing run in Web Workers to avoid blocking the main thread:

```
┌─────────────────────────────────────────────────────────────┐
│                      Main Thread                              │
│                                                              │
│  ┌──────────────┐         ┌──────────────┐                  │
│  │ SearchQuery  │ ──────► │ SearchWorker │                  │
│  │ Component    │ postMsg │ (FlexSearch) │                  │
│  └──────────────┘         └──────┬───────┘                  │
│                                  │ postMessage               │
│  ┌──────────────┐         ┌──────▼───────┐                  │
│  │ SearchResults│ ◄────── │ Results      │                  │
│  │ Display      │ postMsg │ (Scored)     │                  │
│  └──────────────┘         └──────────────┘                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Message Passing Safety

#### 6.2.1 Structured Clone Algorithm

`postMessage()` uses the [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) to copy data between threads:

**Thread Safety Property**: Data passed via `postMessage()` is deep-cloned. The sender and receiver cannot share mutable references (except `ArrayBuffer` with transferable semantics).

**Property ID**: TS-WW-001
**Statement**: `∀ postMessage(m): sender's m and receiver's m are independent copies; mutation of one does not affect the other`

#### 6.2.2 Transferable Objects

`ArrayBuffer` can be transferred (not cloned) for zero-copy performance:

```typescript
const buffer = new ArrayBuffer(1024 * 1024);
worker.postMessage({ data: buffer }, [buffer]);
// buffer is now neutered (detached) on the main thread
// Only the worker has access
```

**Thread Safety Property**: Transferred `ArrayBuffer` is neutered on the sender side. No concurrent access is possible.

**Property ID**: TS-WW-002
**Statement**: `∀ transfer t: buffer is neutered on sender after transfer; only one thread has access at any time`

#### 6.2.3 Search Index Message Protocol

```typescript
// Main thread → Worker
interface SearchMessage {
  type: "index" | "query" | "update" | "reset";
  payload: unknown;
}

// Worker → Main thread
interface SearchResultMessage {
  type: "results";
  payload: {
    results: SearchResult[];
    queryTime: number;
  };
}

// Worker → Main thread (error)
interface SearchErrorMessage {
  type: "error";
  payload: {
    message: string;
    code: string;
  };
}
```

**Thread Safety Property**: Message protocol is stateless per message. Each query message produces an independent result. No shared state between messages.

**Property ID**: TS-WW-003
**Statement**: `∀ messages m₁, m₂: result(m₁) is independent of result(m₂); no shared mutable state between queries`

### 6.3 FlexSearch Worker Internal Concurrency

FlexSearch maintains an inverted index in the worker's memory:

```typescript
// Inside Search Worker
const index = new FlexSearch.Document({
  document: {
    id: "id",
    index: ["title", "content", "tags"],
    store: ["title", "url", "category"],
  },
});

// index.add() is synchronous within the worker
// index.search() is synchronous within the worker
// Worker processes messages sequentially (event loop)
```

**Thread Safety Property**: The search index exists only in the worker's memory. The worker processes messages sequentially. No concurrent modification of the index is possible.

**Property ID**: TS-WW-004
**Statement**: `∀ worker w with index i: message handlers execute sequentially; i is never modified concurrently`

### 6.4 Search Worker Hazards

| Hazard | Scenario | Risk | Mitigation |
|--------|----------|------|------------|
| Index staleness | New content published while index is stale | Medium | Periodic re-index via `postMessage({ type: "update" })` |
| Large payload transfer | Index data exceeds memory limits | Low | Paginated results, limit index size |
| Worker crash | Out-of-memory in worker | Low | Restart worker, rebuild index |
| Message ordering | Rapid queries arrive out of order | Low | Use query ID to discard stale results |
| Transferable detachment | Accidentally using detached ArrayBuffer | Low | Defensive checks before transfer |

---

## 7. SharedArrayBuffer Assessment

### 7.1 Current Usage Assessment

**Finding**: The wikisites platform does **NOT** currently use `SharedArrayBuffer` (SAB).

Rationale:

1. **SolidJS does not require SAB**: Reactive primitives operate within a single thread (main thread or Web Worker).
2. **Cloudflare Workers do not support SAB**: V8 isolates have no shared memory between isolates.
3. **Search indexing uses message passing**: FlexSearch in Web Workers communicates via `postMessage()`, not shared memory.
4. **No computationally intensive shared-memory algorithms**: The platform's compute-bound tasks (molecular weight calculation, search ranking) are not parallelized across threads with shared memory.

### 7.2 SharedArrayBuffer Requirements for Cross-Origin Isolation

If SAB were needed, the page must be cross-origin isolated:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

**Impact**: These headers would:
1. Break third-party scripts (analytics, ads) unless they opt in via `crossorigin` attribute.
2. Require Cloudflare Pages to set these headers globally.
3. May break embedded content (YouTube, molecular viewers from external sources).

### 7.3 Potential Future SAB Use Cases

| Use Case | Description | SAB Benefit | Alternative |
|----------|-------------|-------------|-------------|
| Parallel sequence alignment | Align two peptide sequences in Web Workers | Shared input buffer | Message passing (sufficient) |
| Parallel search indexing | Build index across multiple workers | Shared index memory | Sequential (fast enough) |
| Real-time collaboration | Multiple editors on same document | Shared document buffer | Durable Objects (chosen) |
| Molecular dynamics simulation | Client-side MD simulation | Shared particle data | Not in scope |

### 7.4 Recommendation

**Do not introduce SharedArrayBuffer** at this time. The platform's concurrency requirements are fully met by:
1. SolidJS synchronous reactive propagation (main thread).
2. Web Worker message passing (search indexing).
3. Durable Objects single-threaded consistency (collaboration).
4. V8 isolate isolation (Workers request handling).

If future requirements demand SAB (e.g., parallel sequence alignment), introduce it behind a feature flag with cross-origin isolation headers applied only to specific routes, not globally.

---

## 8. Cross-Component Thread Safety

### 8.1 Main Thread to Worker Communication Patterns

| Pattern | Components | Thread Safety Mechanism | Risk |
|---------|-----------|------------------------|------|
| Search query | SearchInterface → SearchWorker | Structured clone | Low |
| Search results | SearchWorker → SearchInterface | Structured clone | Low |
| Index update | Cron/Build → SearchWorker | Structured clone | Low |
| Analytics event | Tracker → AnalyticsWorker | Structured clone | Low |
| Dark mode toggle | DarkModeToggle → CSS (main thread) | Synchronous DOM | None |

### 8.2 Main Thread to Cloudflare Worker Communication

| Pattern | Components | Thread Safety Mechanism | Risk |
|---------|-----------|------------------------|------|
| API request | SolidJS island → CF Worker | HTTP request/response | Low |
| Wiki edit | WikiEditor → WikiRoom DO | WebSocket (DO single-threaded) | Low |
| Quiz session | QuizEngine → QuizSession DO | HTTP to DO | Low |
| File upload | FlashcardReviewer → R2 | HTTP multipart | Low |

### 8.3 Cloudflare Worker to Storage Communication

| Pattern | Components | Thread Safety Mechanism | Risk |
|---------|-----------|------------------------|------|
| KV cache read | Worker → KV | HTTP API (eventually consistent) | Medium |
| D1 query | Worker → D1 | HTTP API (strongly consistent per batch) | Low |
| R2 upload | Worker → R2 | HTTP API (strongly consistent) | Low |
| DO state read | Worker → DO | In-process (single-threaded) | None |

---

## 9. Formal Properties

### 9.1 Thread Safety Invariants

```
// Invariant 1: SolidJS signal writes are atomic within synchronous context
∀ signal s, ∀ batch b: writes within b are invisible to code outside b until b completes

// Invariant 2: V8 isolate memory isolation
∀ isolates i₁, i₂ where i₁ ≠ i₂: heap(i₁) ∩ heap(i₂) = ∅

// Invariant 3: Durable Object sequential execution
∀ DO d, ∀ handlers h₁, h₂: h₁.start < h₂.start ∨ h₂.start < h₁.start

// Invariant 4: Web Worker message isolation
∀ postMessage(m): sender(m) ≠ receiver(m) in memory

// Invariant 5: Build-time file consistency
∀ build b: all file reads during b see the same filesystem snapshot

// Invariant 6: View Transition atomicity
∀ transition t: DOM mutation happens between old-state capture and new-state capture

// Invariant 7: No shared mutable state across execution contexts
∀ contexts c₁, c₂: shared_mutable(c₁, c₂) = ∅
```

### 9.2 Properties Table

| Property ID | Description | Status | Verification |
|-------------|-------------|--------|--------------|
| TS-SOLID-001 | Batch writes atomic | Proven | SolidJS core implementation |
| TS-SOLID-002 | Synchronous propagation consistency | Proven | V8 event loop guarantee |
| TS-SOLID-003 | Async effects may see stale values | By design | Documented |
| TS-SOLID-004 | Computed memoization correctness | Proven | SolidJS core implementation |
| TS-SOLID-005 | Untracked reads may be stale | By design | Documented |
| TS-SOLID-006 | Disposal prevents future execution | Proven | SolidJS core implementation |
| TS-CF-001 | Isolate memory isolation | Proven | V8 runtime guarantee |
| TS-CF-002 | Global scope race within isolate | Known risk | Mitigated via design |
| TS-CF-003 | KV eventual consistency | By design | Use D1 for strong consistency |
| TS-CF-004 | DO single-threaded execution | Proven | Cloudflare runtime guarantee |
| TS-CF-005 | waitUntil post-response execution | Proven | Cloudflare runtime guarantee |
| TS-CF-006 | D1 batch atomicity | Proven | SQLite transaction guarantee |
| TS-SSG-001 | Build-time file snapshot consistency | Proven | Single-process build |
| TS-SSG-002 | Page render independence | Proven | No shared state between pages |
| TS-SSG-003 | Pure function thread safety | Proven | No side effects, no shared state |
| TS-VT-001 | View Transition DOM atomicity | Proven | Browser API guarantee |
| TS-VT-002 | Navigation effect disposal atomicity | Proven | SolidJS disposal mechanism |
| TS-VT-003 | popstate event sequential processing | Proven | Event loop guarantee |
| TS-WW-001 | Structured clone isolation | Proven | Web API guarantee |
| TS-WW-002 | Transferable neutering | Proven | Web API guarantee |
| TS-WW-003 | Search message statelessness | Proven | Protocol design |
| TS-WW-004 | Worker index sequential access | Proven | Single-threaded worker |

---

## 10. Risk Register

| Risk ID | Description | Probability | Impact | Risk Score | Mitigation | Residual Risk |
|---------|-------------|-------------|--------|------------|------------|---------------|
| R-TS-001 | Global scope race in CF Worker | Medium | Medium | M | Avoid mutable global state | Low |
| R-TS-002 | KV stale read after write | Medium | Medium | M | Use D1 for consistency-critical reads | Low |
| R-TS-003 | Async effect stale signal read | Low | Low | L | Use createResource for async data | Negligible |
| R-TS-004 | View Transition DOM interleaving | Low | Low | L | Synchronous DOM updates in callback | Negligible |
| R-TS-005 | Search worker index staleness | Medium | Low | L | Periodic re-index | Low |
| R-TS-006 | SAB introduction breaking COOP/COEP | Negligible | High | L | Do not introduce SAB | Negligible |
| R-TS-007 | D1 connection pool exhaustion | Low | Medium | L | Cloudflare-managed pooling | Low |

---

## 11. Recommendations

### 11.1 Immediate Actions

1. **Avoid mutable global state in Workers**: Use KV or D1 for cross-request state. If a `Map` in global scope is needed, treat it as a per-isolate cache with TTL eviction.

2. **Use `createResource` for async data in SolidJS**: Never read signals after `await` points in effects. Use `createResource` which handles loading states correctly.

3. **Add `Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy` headers only if SAB is required**: Currently, do not add these headers.

### 11.2 Testing Requirements

| Test Type | Scope | Tool | Frequency |
|-----------|-------|------|-----------|
| Unit test | Signal propagation atomicity | Vitest | Every commit |
| Unit test | Pure function idempotency | Vitest | Every commit |
| Integration test | KV consistency behavior | Vitest + Miniflare | Every PR |
| Integration test | D1 batch atomicity | Vitest + Miniflare | Every PR |
| E2E test | View Transition rendering | Playwright | Weekly |
| Stress test | Worker concurrent request handling | wrangler dev | Before deploy |

### 11.3 Documentation Requirements

1. Document all global scope state in Workers with thread safety notes.
2. Document async effect patterns in SolidJS components.
3. Document Web Worker message protocols.

---

**End of Document**
**Document Status:** DRAFT — Pending concurrency review
**Owner:** Wikisites Architecture Team
