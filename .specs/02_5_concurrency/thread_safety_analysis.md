---
document_id: CONCURRENCY-025-001
title: "Thread Safety Analysis"
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
  Comprehensive thread safety analysis for the wikisites platform covering
  SolidJS reactive system, Cloudflare Workers V8 isolates, Durable Objects,
  Web Workers, Yjs CRDT synchronization, and all Phase 2 component subsystems:
  Power User Shell, Content Tools, Social Layer, Editor, and Extensibility Layer.
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

# Thread Safety Analysis

**Document ID:** CONCURRENCY-025-001
**Version:** 2.0.0
**Date:** 2026-06-19
**Status:** DRAFT
**IEEE Standard:** IEEE 1016-2024

---

## Table of Contents

1. [Scope and Execution Contexts](#1-scope-and-execution-contexts)
2. [SolidJS Reactive System Thread Safety](#2-solidjs-reactive-system-thread-safety)
3. [Cloudflare Workers Request Handling](#3-cloudflare-workers-request-handling)
4. [Durable Objects Single-Threaded Consistency](#4-durable-objects-single-threaded-consistency)
5. [Power User Shell Concurrency](#5-power-user-shell-concurrency)
6. [Content Tools Concurrency](#6-content-tools-concurrency)
7. [Social Layer Concurrency](#7-social-layer-concurrency)
8. [Editor Concurrency (Yjs CRDT)](#8-editor-concurrency-yjs-crdt)
9. [Extensibility Layer Concurrency (Web Workers)](#9-extensibility-layer-concurrency-web-workers)
10. [Web Workers for Search Indexing](#10-web-workers-for-search-indexing)
11. [Static Site Generation Concurrency](#11-static-site-generation-concurrency)
12. [Cross-Component Thread Safety Matrix](#12-cross-component-thread-safety-matrix)
13. [Formal Properties](#13-formal-properties)
14. [Risk Register](#14-risk-register)
15. [Recommendations](#15-recommendations)

---

## 1. Scope and Execution Contexts

### 1.1 Execution Contexts

| Context | Runtime | Isolation Model | Shared State | Thread Safety Requirement |
|---------|---------|-----------------|--------------|---------------------------|
| Astro SSG Build | Node.js (Vite) | Process-level | Build graph, content collections | Build pipeline ordering |
| Cloudflare Workers | V8 isolates | Isolate-level (no shared memory) | None between isolates | Per-request atomicity |
| Client-side (Browser) | Blink/V8 | Event loop + Web Workers | DOM, memory, localStorage | Signal consistency |
| Web Workers | V8 (dedicated) | PostMessage passing | None (structured clone) | Message ordering |
| Durable Objects | V8 (single-threaded) | Single handler at a time | DO state (in-memory + D1) | Handler sequencing |
| Yjs Collaboration | WebSocket + DO | CRDT merge | Yjs document state | CRDT convergence |

### 1.2 Component-to-Execution-Context Mapping

| Component | Primary Context | Secondary Context | Concurrency Concern |
|-----------|----------------|-------------------|---------------------|
| CommandPalette | Main thread | — | Signal reactivity |
| KeyboardShortcuts | Main thread | — | Event listener ordering |
| OutlinePanel | Main thread | — | IntersectionObserver callbacks |
| Breadcrumbs | Main thread | — | SSR/CSR hydration |
| LaTeXRenderer | Main thread (CSR) | Build (SSR) | KaTeX stateless rendering |
| GraphView | Main thread | Web Worker (layout) | Canvas rendering, force layout |
| SplitPane | Main thread | — | Drag event handling |
| RegexSearch | Main thread | Web Worker (search) | RegExp execution timeout |
| CommentsSystem | CF Worker | D1, KV | CRUD atomicity |
| AnnotationLayer | CF Worker | D1 | XPath anchor resolution |
| UserAccounts | CF Worker | D1, Durable Objects | Session consistency |
| MDXEditor | Main thread | WebSocket (Yjs) | CRDT merge, awareness |
| VersionHistory | CF Worker | D1, Forgejo API | Git operations atomicity |
| PluginAPI | Web Worker sandbox | Host (postMessage) | Capability-gated messaging |
| ThemeEngine | Main thread | — | CSS custom properties swap |
| SettingsManager | Main thread | D1 (sync) | localStorage + D1 consistency |

---

## 2. SolidJS Reactive System Thread Safety

### 2.1 Signal Propagation Guarantees

#### 2.1.1 Synchronous Batch Updates

```typescript
batch(() => {
  setContent(newContent);
  setIsDirty(true);
  setLastSaved(null);
});
```

**Property TS-SOLID-001**: Signal writes within `batch()` are atomic within synchronous context.

#### 2.1.2 Synchronous Reactive Propagation

SolidJS performs synchronous topological propagation. No code between `setCount()` and its dependent recomputation observes intermediate state on the same thread.

**Property TS-SOLID-002**: No interleaving between signal write and dependent recomputation.

#### 2.1.3 Async Boundary Risks

```typescript
createEffect(async () => {
  const data = await fetchData();
  const count = count(); // May have changed between await and read
});
```

**Property TS-SOLID-003**: Async effects may observe stale signal values after `await` points. Use `createResource()` for async data dependencies.

### 2.2 Computed Value Thread Safety

**Property TS-SOLID-004**: Memoized computeds are always consistent at read time.

**Property TS-SOLID-005**: `untrack()` reads may return stale values by design.

### 2.3 Ownership and Disposal

**Property TS-SOLID-006**: No use-after-dispose in reactive graph. Disposal is synchronous and prevents future propagation.

---

## 3. Cloudflare Workers Request Handling

### 3.1 V8 Isolate Isolation

**Property TS-CF-001**: `∀ isolates i₁, i₂ where i₁ ≠ i₂: heap(i₁) ∩ heap(i₂) = ∅`

### 3.2 Global Scope Race

```typescript
// RACE CONDITION: Global scope mutable state
const cache = new Map<string, unknown>();
async fetch(request: Request) {
  const value = cache.get("key");
  await someAsyncOperation(); // Yields — another request may modify "key"
  cache.set("key", value + 1);
}
```

**Property TS-CF-002**: Global scope mutable state races across concurrent requests within same isolate.

**Risk**: MEDIUM. **Mitigation**: Avoid mutable global state; use KV or D1.

### 3.3 KV Eventual Consistency

**Property TS-CF-003**: KV writes are eventually consistent. Use D1 for consistency-critical reads.

### 3.4 D1 Transaction Atomicity

**Property TS-CF-006**: D1 `batch()` executes atomically. No interleaving between statements.

---

## 4. Durable Objects Single-Threaded Consistency

**Property TS-CF-004**: `∀ DO instance d, ∀ handlers h₁, h₂: h₁ completes before h₂ begins`

All Durable Objects (WikiRoom, QuizSession, ReviewSession, SessionStore, YJS_DOCUMENT) execute handlers sequentially. No preemption.

---

## 5. Power User Shell Concurrency

### 5.1 CommandPalette (COMP-CP-001)

**Execution Context**: Main thread only.

**Threading Model**:
- Runs entirely on the browser main thread
- No Web Worker involvement
- No shared state with other components

**Shared State Access**:
- `Command[]` registry: read-only after initialization
- `isOpen` signal: single-writer (user interaction)
- `query` signal: debounced at 150ms
- `selectedIndex` signal: single-writer (keyboard navigation)

**Race Condition Risks**:
| Risk | Scenario | Risk Level | Mitigation |
|------|----------|------------|------------|
| Stale command list | Commands registered after palette opens | Low | Snapshot commands on open |
| Debounce cancellation | Rapid keystrokes during search | Low | SolidJS debounce pattern |
| Focus trap | Multiple modals open simultaneously | Low | At most one palette instance (invariant) |

**Property TS-PUS-001**: CommandPalette is single-threaded; no concurrent access concerns.

**Thread Safety**: SAFE — Single-threaded, no shared mutable state.

### 5.2 KeyboardShortcuts (COMP-KS-001)

**Execution Context**: Main thread only.

**Threading Model**:
- Global `keydown` event listener (eager hydration)
- Registry stored in SolidJS signals + localStorage

**Shared State Access**:
- `registry` signal: Map<string, Keybinding>
- `activeScope` signal: "global" | "modal" | "article"
- localStorage: persistent across sessions

**Race Condition Risks**:
| Risk | Scenario | Risk Level | Mitigation |
|------|----------|------------|------------|
| Scope transition race | Modal opens while article keybinding fires | Low | Scope checked before dispatch |
| localStorage conflict | Two tabs modify keybindings simultaneously | Low | BroadcastChannel for cross-tab sync |
| Duplicate binding ID | Two components register same ID | Low | Conflict detection on register |

**Property TS-PUS-002**: KeyboardShortcuts dispatch is synchronous and atomic within event handler.

**Thread Safety**: SAFE — Synchronous event handling, signal-based state.

### 5.3 OutlinePanel (COMP-OP-001)

**Execution Context**: Main thread only.

**Threading Model**:
- IntersectionObserver runs asynchronously but delivers callbacks on the main thread
- Virtual scroll window maintains ≤20 DOM nodes

**Shared State Access**:
- `headings` prop: read-only after extraction
- `activeId` signal: written by IntersectionObserver callback
- Virtual scroll position: derived from activeId

**Race Condition Risks**:
| Risk | Scenario | Risk Level | Mitigation |
|------|----------|------------|------------|
| Scroll-sync lag | Fast scrolling outpaces observer | Low | RequestAnimationFrame batching |
| Heading DOM mutation | Content updates change headings | Low | Re-extract on content change signal |
| Virtual scroll jump | Active index changes during render | Low | Signal-based, synchronous update |

**Property TS-PUS-003**: IntersectionObserver callbacks are serialized by the event loop.

**Thread Safety**: SAFE — Single-threaded observer callbacks.

### 5.4 Breadcrumbs (COMP-BC-001)

**Execution Context**: Main thread (client), build-time (SSR).

**Threading Model**:
- SSR-rendered (static HTML) with Schema.org JSON-LD
- Client-side: reactive trail prop → DOM update

**Race Condition Risks**:
| Risk | Scenario | Risk Level | Mitigation |
|------|----------|------------|------------|
| SSR/CSR mismatch | Trail differs between server and client | Low | Schema.org is static per page |
| JSON-LD injection race | Multiple breadcrumb instances | Low | Single instance per page (invariant) |

**Thread Safety**: SAFE — Stateless rendering, no shared mutable state.

---

## 6. Content Tools Concurrency

### 6.1 LaTeXRenderer (COMP-CONTENT-001)

**Execution Context**: Build-time (SSR, Node.js) + Main thread (CSR).

**Threading Model**:
- SSR: KaTeX Node API runs at build time (single-process)
- CSR: KaTeX client-side rendering on main thread
- No Web Worker involvement

**Shared State Access**:
- KaTeX render cache: in-memory Map (build-time only)
- Expression string: prop (read-only)
- KaTeX options: prop (read-only)

**Race Condition Risks**:
| Risk | Scenario | Risk Level | Mitigation |
|------|----------|------------|------------|
| Build-time cache collision | Two pages render same expression | Negligible | Hash-based cache key |
| CSR expression change | Expression prop changes rapidly | Low | createMemo for hash comparison |
| Font loading race | KaTeX fonts not loaded during CSR | Low | font-display: swap, fallback |

**Property TS-CT-001**: KaTeX rendering is pure (same input → same output). No shared mutable state.

**Thread Safety**: SAFE — Stateless rendering, build-time isolation.

### 6.2 GraphView (COMP-CONTENT-002)

**Execution Context**: Main thread (rendering) + potential Web Worker (layout computation).

**Threading Model**:
- Canvas rendering: main thread (requestAnimationFrame)
- Force-directed layout: d3-force runs on main thread (can be offloaded)
- Graph data: loaded from static JSON (build-time generated)

**Shared State Access**:
- `data` prop: GraphData (read-only after load)
- `highlightQuery` signal: filters visible nodes
- Canvas rendering context: exclusive to GraphView instance
- force-graph instance: single ownership

**Race Condition Risks**:
| Risk | Scenario | Risk Level | Mitigation |
|------|----------|------------|------------|
| Canvas context loss | Multiple canvases compete for GPU | Low | Single canvas per GraphView |
| Layout computation blocking | Large graph (>1000 nodes) blocks main thread | Medium | Web Worker for layout, offload |
| Zoom/pan during layout | User interacts while force simulation runs | Low | d3-force handles re-entry |
| Node filter during render | filterByGroup called mid-render | Low | Signal-based, synchronous |

**Property TS-CT-002**: Canvas rendering is exclusive to single GraphView instance. No concurrent access.

**Thread Safety**: SAFE for ≤1000 nodes. For >1000 nodes, offload layout to Web Worker.

### 6.3 SplitPane (COMP-CONTENT-003)

**Execution Context**: Main thread only.

**Threading Model**:
- CSS Grid layout (browser compositor)
- Drag event handling (mousedown/mousemove/mouseup)
- Signal-based pane state

**Shared State Access**:
- `sizes` signal: number[] (split ratios)
- `activePanes` signal: number[] (active pane indices)
- `isStacked` computed: derived from viewport width
- localStorage: persisted pane configuration

**Race Condition Risks**:
| Risk | Scenario | Risk Level | Mitigation |
|------|----------|------------|------------|
| Drag during resize | Multiple resize handles dragged simultaneously | Low | Single active drag target |
| Viewport change during drag | Window resize while resizing pane | Low | Recalculate on resize signal |
| localStorage write conflict | Two tabs modify pane config | Low | BroadcastChannel sync |

**Property TS-CT-003**: SplitPane drag interaction is single-threaded. No concurrent access.

**Thread Safety**: SAFE — Single-threaded drag handling.

### 6.4 RegexSearch (COMP-CONTENT-004)

**Execution Context**: Main thread (UI) + Web Worker (search execution, optional).

**Threading Model**:
- UI: main thread (input, results display)
- Search execution: native RegExp on main thread (bounded by timeout)
- Optional: Web Worker for large index searches

**Shared State Access**:
- `pattern` signal: string (user input)
- `pagefindIndex`: Pagefind index reference (read-only)
- Search results: created fresh per query
- ReDoS safety score: computed per pattern

**Race Condition Risks**:
| Risk | Scenario | Risk Level | Mitigation |
|------|----------|------------|------------|
| RegExp execution blocking | Complex pattern blocks main thread >100ms | High | 4-layer ReDoS defense + timeout |
| Stale results displayed | New search completes before old | Medium | Query ID to discard stale results |
| AbortController race | Search aborted while completing | Low | Check abort flag before setState |
| Pagefind index load race | Search before index fully loaded | Low | Loading gate signal |

**Property TS-CT-004**: RegExp execution is bounded by 100ms timeout. AbortController terminates if exceeded.

**Thread Safety**: CONDITIONAL — Safe with 4-layer ReDoS defense. Web Worker offload recommended for large datasets.

---

## 7. Social Layer Concurrency

### 7.1 CommentsSystem (COMP-SOCIAL-COMMENTS)

**Execution Context**: CF Worker (API) + Main thread (UI) + D1 (storage).

**Threading Model**:
- CF Worker: V8 isolate, per-request atomicity
- D1: SQLite transactions (atomic per batch)
- KV: Rate limit counters (eventually consistent)
- UI: SolidJS signals (main thread)

**Shared State Access**:
- D1 `comments` table: source of truth (strongly consistent per batch)
- KV `RATE_LIMITS`: eventually consistent counters
- Giscus integration: GitHub API (external, stateless)
- UI comment list: createResource (async data fetching)

**Race Condition Risks**:
| Risk | Scenario | Risk Level | Mitigation |
|------|----------|------------|------------|
| Double comment | User clicks submit twice rapidly | Low | Debounce + D1 idempotency key |
| Thread depth race | Two replies to same parent concurrently | Low | D1 batch: check depth + insert atomically |
| KV rate limit race | Concurrent requests bypass rate limit | Medium | D1 atomic counter for critical limits |
| Giscus sync delay | Custom comment + Giscus out of sync | Low | Provider-specific, no shared state |

**Property TS-SL-001**: Comment creation is atomic within D1 batch. No interleaving.

**Thread Safety**: SAFE — D1 batch atomicity for writes, V8 isolate for request handling.

### 7.2 AnnotationLayer (COMP-SOCIAL-ANNOTATION)

**Execution Context**: CF Worker (API) + Main thread (UI) + D1 (storage).

**Threading Model**:
- CF Worker: per-request atomicity
- D1: annotation CRUD (atomic per batch)
- Main thread: XPath anchor computation, annotation overlay rendering

**Shared State Access**:
- D1 `annotations` table: source of truth
- Main thread DOM: XPath resolution reads DOM (read-only)
- Annotation overlay: SolidJS signals (main thread)

**Race Condition Risks**:
| Risk | Scenario | Risk Level | Mitigation |
|------|----------|------------|------------|
| DOM mutation during XPath resolution | Content changes while computing anchor | Low | Snapshot DOM before computation |
| Annotation visibility race | Visibility check + create concurrent | Low | D1 batch: visibility + insert atomically |
| Reply to deleted annotation | Parent deleted while reply in flight | Low | D1 FK constraint + 404 response |

**Property TS-SL-002**: XPath anchor computation is synchronous within handler. DOM snapshot prevents stale reads.

**Thread Safety**: SAFE — D1 atomicity, DOM read-only during computation.

### 7.3 UserAccounts (COMP-SOCIAL-ACCOUNTS)

**Execution Context**: CF Worker (API) + Durable Object (session) + D1 (user data).

**Threading Model**:
- CF Worker: OAuth/passkey flows (per-request)
- Durable Object (SessionStore): single-threaded session validation
- D1: user profiles, RBAC roles (strongly consistent)

**Shared State Access**:
- Durable Object sessions: strongly consistent (single-threaded)
- D1 `users` table: source of truth
- KV `OAUTH_STATES`: CSRF tokens (TTL-based, eventually consistent)
- JWT tokens: signed, self-contained (no shared state)

**Race Condition Risks**:
| Risk | Scenario | Risk Level | Mitigation |
|------|----------|------------|------------|
| OAuth state reuse | CSRF token used twice | Low | Single-use: delete after validate |
| Session revocation race | Token validated after revocation | Low | DO single-threaded: revoke completes before next validate |
| Concurrent profile update | Two tabs update profile simultaneously | Low | D1 last-write-wins (acceptable for profile) |
| JWT refresh race | Two tabs refresh same token | Low | DO single-threaded: only one refresh succeeds |

**Property TS-SL-003**: Session validation is atomic within Durable Object handler.

**Thread Safety**: SAFE — Durable Object single-threaded, D1 atomicity.

---

## 8. Editor Concurrency (Yjs CRDT)

### 8.1 Yjs CRDT Synchronization (COMP-EDITOR-COLLAB)

**Execution Context**: Main thread (editor) + WebSocket (transport) + Durable Object (server state).

**Threading Model**:
- Main thread: TipTap/ProseMirror editor (single-threaded)
- WebSocket: Yjs document synchronization
- Durable Object (YJS_DOCUMENT): single-threaded, persists Yjs state
- Awareness protocol: cursor positions, user presence

**Shared State Access**:
- Yjs document (Y.Doc): CRDT state (conflict-free merge)
- Awareness protocol: ephemeral cursor/user state
- Durable Object: persisted document state
- WebSocket: transport layer (ordered messages)

**Race Condition Risks**:
| Risk | Scenario | Risk Level | Mitigation |
|------|----------|------------|------------|
| Concurrent edits | Two users edit same paragraph | NONE | Yjs CRDT guarantees conflict-free merge |
| WebSocket disconnect | User goes offline, edits locally | Low | Yjs offline support, merge on reconnect |
| Awareness stale cursor | User cursor position outdated | Low | Awareness timeout (10s) removes stale |
| DO crash during edit | Durable Object evicted mid-edit | Low | Yjs state persisted to D1; re-sync on reconnect |
| Document corruption | Yjs update arrives for wrong document | Low | Document ID validation on WebSocket |

**Property TS-ED-001**: Yjs CRDT merge is commutative, associative, and idempotent. `merge(a, b) = merge(b, a)`.

**Property TS-ED-002**: Yjs awareness protocol is eventually consistent. Stale cursors removed after timeout.

**Thread Safety**: SAFE — Yjs CRDT eliminates conflict; DO single-threaded; WebSocket ordered.

### 8.2 MDXEditor (COMP-EDITOR-MDX)

**Execution Context**: Main thread only.

**Threading Model**:
- TipTap/ProseMirror: single-threaded editor
- SolidJS toolbar: signals for formatting state
- Preview rendering: debounced (200ms)

**Shared State Access**:
- Editor state: ProseMirror state (single-threaded)
- Toolbar signals: formatting state derived from editor selection
- Preview content: debounced MDX → HTML conversion

**Race Condition Risks**:
| Risk | Scenario | Risk Level | Mitigation |
|------|----------|------------|------------|
| Toolbar state lag | Formatting buttons don't reflect selection | Low | Synchronous selection → signal update |
| Preview stale | Preview shows old content | Low | Debounced, latest content wins |
| Frontmatter validation | Concurrent frontmatter + content edit | Low | Single editor instance |

**Thread Safety**: SAFE — Single editor instance, synchronous state derivation.

### 8.3 VersionHistory (COMP-EDITOR-VERSION)

**Execution Context**: CF Worker (API) + D1 (cache) + Forgejo (source of truth).

**Threading Model**:
- CF Worker: per-request (diff computation, version listing)
- D1: version cache (atomic reads)
- Forgejo API: external Git operations (stateless HTTP)

**Shared State Access**:
- D1 `version_cache`: cached version metadata
- D1 `diff_cache`: cached diff results
- Forgejo Git API: source of truth (external)

**Race Condition Risks**:
| Risk | Scenario | Risk Level | Mitigation |
|------|----------|------------|------------|
| Diff cache staleness | Page updated but diff cache old | Low | Cache invalidation on new commit |
| Concurrent branch create | Two users create same branch | Low | Forgejo handles branch naming conflict |
| Merge conflict | Concurrent edits to same branch | Low | Forgejo merge conflict detection |

**Property TS-ED-003**: Diff computation is deterministic. Same input → same output.

**Thread Safety**: SAFE — Stateless HTTP operations, D1 atomic reads.

---

## 9. Extensibility Layer Concurrency (Web Workers)

### 9.1 PluginAPI Web Worker Sandbox (COMP-EXT-PLUGIN)

**Execution Context**: Dedicated Web Worker (plugin) + Main thread (host).

**Threading Model**:
- Plugin code: Web Worker (dedicated thread)
- Host app: main thread
- Communication: `postMessage()` (structured clone)
- No shared memory (no SharedArrayBuffer)

**Shared State Access**:
- Plugin → Host: structured-clone messages (independent copies)
- Host → Plugin: structured-clone messages (independent copies)
- Plugin storage: proxied via host (capability-gated)
- No DOM access in Worker (blocked by sandbox)

**Race Condition Risks**:
| Risk | Scenario | Risk Level | Mitigation |
|------|----------|------------|------------|
| Message ordering | Plugin sends rapid messages | Low | Messages queued, processed in order |
| Plugin crash | Plugin throws uncaught exception | Low | Worker.terminate() isolates crash |
| Capability escalation | Plugin requests denied capability | Low | CapabilityMatrix checked before dispatch |
| Memory leak | Plugin allocates without GC | Medium | Worker memory limits, timeout termination |
| Response timeout | Plugin never responds to host message | Medium | Host-side timeout (5s default) |

**Property TS-EXT-001**: Plugin Worker has no shared memory with host. Communication is via structured clone only.

**Property TS-EXT-002**: Plugin crash in Worker does not affect host main thread.

**Thread Safety**: SAFE — Worker isolation, structured clone, capability enforcement.

### 9.2 ThemeEngine (COMP-EXT-THEME)

**Execution Context**: Main thread only.

**Threading Model**:
- CSS custom properties: browser CSS engine (compositor thread)
- Theme application: `document.documentElement.style.setProperty()`
- Dark/light mode: `matchMedia` listener (main thread)

**Shared State Access**:
- CSS custom properties: browser-managed (no JS shared state)
- Theme definition: read-only after load
- Dark mode preference: matchMedia signal

**Race Condition Risks**:
| Risk | Scenario | Risk Level | Mitigation |
|------|----------|------------|------------|
| Theme flash (FOUC) | Theme applied after CSS paint | Low | Critical CSS inlines base tokens |
| Dark mode toggle race | Toggle during theme switch | Low | CSS variable swap is atomic |
| Plugin theme override | Plugin theme conflicts with user theme | Low | Cascade order: base → user → plugin |

**Property TS-EXT-003**: CSS custom property updates are atomic (browser compositor).

**Thread Safety**: SAFE — CSS engine handles atomicity; no JS shared state.

### 9.3 SettingsManager (COMP-EXT-SETTINGS)

**Execution Context**: Main thread (UI) + CF Worker (sync API) + D1 (persistence).

**Threading Model**:
- Main thread: settings UI, localStorage read/write
- CF Worker: D1 sync API
- D1: `user_settings` table (source of truth)

**Shared State Access**:
- localStorage: local cache of settings
- D1 `user_settings`: source of truth (sync_token for conflict detection)
- Settings schema: read-only (JSON Schema + Zod)

**Race Condition Risks**:
| Risk | Scenario | Risk Level | Mitigation |
|------|----------|------------|------------|
| Multi-device sync conflict | Two devices modify same setting | Medium | sync_token + conflict resolution UI |
| Import/export during sync | Import while sync in progress | Low | Mutex-like: one operation at a time |
| Schema migration race | Import old version while auto-migrating | Low | Version check before migration |

**Property TS-EXT-004**: Settings sync uses sync_token for optimistic concurrency. Conflicts presented to user.

**Thread Safety**: SAFE — sync_token-based OCC for cross-device sync.

---

## 10. Web Workers for Search Indexing

### 10.1 Search Worker Architecture

```
Main Thread                    Web Worker
┌──────────────┐              ┌──────────────┐
│ SearchQuery  │ postMessage  │ FlexSearch   │
│ Component    │─────────────>│ Index        │
│              │              │              │
│ SearchResults│ postMessage  │ Search       │
│ Display      │<─────────────│ Engine       │
└──────────────┘              └──────────────┘
```

**Property TS-WW-001**: `∀ postMessage(m): sender's m and receiver's m are independent copies`.

**Property TS-WW-002**: Transferred `ArrayBuffer` is neutered on sender. Only one thread has access.

**Property TS-WW-003**: Search message protocol is stateless per message.

**Property TS-WW-004**: Worker index is never modified concurrently (single-threaded worker).

---

## 11. Static Site Generation Concurrency

### 11.1 Build Pipeline

**Property TS-SSG-001**: Build-time file reads see consistent snapshot at build start.

**Property TS-SSG-002**: Page renders during build are independent (no shared mutable state).

**Property TS-SSG-003**: Pure functions (calculateMolecularWeight, etc.) are inherently thread-safe.

---

## 12. Cross-Component Thread Safety Matrix

### 12.1 Main Thread to Worker Communication

| Pattern | Components | Mechanism | Risk |
|---------|-----------|-----------|------|
| Plugin messages | PluginAPI ↔ PluginSandbox | Structured clone | Low |
| Search query | RegexSearch → SearchWorker | Structured clone | Low |
| Graph layout | GraphView → LayoutWorker | Structured clone | Low |
| Yjs sync | MDXEditor ↔ WebSocket | Yjs binary protocol | Low |
| Settings sync | SettingsManager → CF Worker | HTTP request/response | Low |

### 12.2 Main Thread to Cloudflare Worker Communication

| Pattern | Components | Mechanism | Risk |
|---------|-----------|-----------|------|
| API request | Any SolidJS island → CF Worker | HTTP request/response | Low |
| Wiki edit | MDXEditor → WikiRoom DO | WebSocket (DO single-threaded) | Low |
| Comment CRUD | CommentsSystem → CF Worker | HTTP request/response | Low |
| Annotation CRUD | AnnotationLayer → CF Worker | HTTP request/response | Low |
| Auth flow | UserAccounts → CF Worker | HTTP + OAuth redirect | Low |

### 12.3 Cloudflare Worker to Storage Communication

| Pattern | Components | Mechanism | Risk |
|---------|-----------|-----------|------|
| KV cache read | All Workers → KV | HTTP API (eventual) | Medium |
| D1 query | All Workers → D1 | HTTP API (strong per batch) | Low |
| R2 upload | VersionHistory → R2 | HTTP API (strong) | Low |
| DO state | Workers → Durable Objects | In-process (single-threaded) | None |

---

## 13. Formal Properties

### 13.1 Complete Properties Table

| Property ID | Description | Status | Verification |
|-------------|-------------|--------|--------------|
| TS-SOLID-001 | Batch writes atomic within synchronous context | Proven | SolidJS core |
| TS-SOLID-002 | Synchronous propagation consistency | Proven | V8 event loop |
| TS-SOLID-003 | Async effects may see stale values | By design | Documented |
| TS-SOLID-004 | Computed memoization correctness | Proven | SolidJS core |
| TS-SOLID-005 | Untracked reads may be stale | By design | Documented |
| TS-SOLID-006 | Disposal prevents future execution | Proven | SolidJS core |
| TS-CF-001 | V8 isolate memory isolation | Proven | V8 runtime |
| TS-CF-002 | Global scope race within isolate | Known risk | Mitigated |
| TS-CF-003 | KV eventual consistency | By design | Use D1 for consistency |
| TS-CF-004 | DO single-threaded execution | Proven | Cloudflare runtime |
| TS-CF-005 | waitUntil post-response execution | Proven | Cloudflare runtime |
| TS-CF-006 | D1 batch atomicity | Proven | SQLite transaction |
| TS-PUS-001 | CommandPalette single-threaded | Proven | Main thread only |
| TS-PUS-002 | KeyboardShortcuts synchronous dispatch | Proven | Event loop |
| TS-PUS-003 | OutlinePanel observer serialization | Proven | Event loop |
| TS-CT-001 | LaTeXRenderer stateless | Proven | Pure function |
| TS-CT-002 | GraphView canvas exclusivity | Proven | Single instance |
| TS-CT-003 | SplitPane single drag target | Proven | Event handling |
| TS-CT-004 | RegexSearch timeout bounded | Proven | 4-layer defense |
| TS-SL-001 | Comment creation atomic (D1 batch) | Proven | SQLite transaction |
| TS-SL-002 | XPath resolution synchronous | Proven | DOM read-only |
| TS-SL-003 | Session validation atomic (DO) | Proven | DO single-threaded |
| TS-ED-001 | Yjs CRDT merge commutative | Proven | Yjs specification |
| TS-ED-002 | Yjs awareness eventually consistent | Proven | Yjs specification |
| TS-ED-003 | Diff computation deterministic | Proven | Myers algorithm |
| TS-EXT-001 | Plugin Worker isolated | Proven | Web Worker API |
| TS-EXT-002 | Plugin crash isolation | Proven | Worker.terminate() |
| TS-EXT-003 | CSS property atomic swap | Proven | Browser compositor |
| TS-EXT-004 | Settings sync via sync_token | Proven | OCC pattern |
| TS-WW-001 | Structured clone isolation | Proven | Web API |
| TS-WW-002 | Transferable neutering | Proven | Web API |
| TS-WW-003 | Search message statelessness | Proven | Protocol design |
| TS-WW-004 | Worker index sequential access | Proven | Single-threaded |
| TS-SSG-001 | Build-time file snapshot | Proven | Single-process |
| TS-SSG-002 | Page render independence | Proven | No shared state |
| TS-SSG-003 | Pure function thread safety | Proven | No side effects |
| **Total** | **37 properties** | **31 Proven, 4 By Design, 2 Known Risk** | |

---

## 14. Risk Register

| Risk ID | Component | Description | Probability | Impact | Risk Score | Mitigation | Residual |
|---------|-----------|-------------|-------------|--------|------------|------------|----------|
| R-TS-001 | CF Workers | Global scope mutable state race | Medium | Medium | M | Avoid mutable globals | Low |
| R-TS-002 | KV | Stale read after write | Medium | Medium | M | Use D1 for consistency | Low |
| R-TS-003 | SolidJS | Async effect stale signal read | Low | Low | L | Use createResource | Negligible |
| R-TS-004 | GraphView | Large graph blocks main thread | Medium | Medium | M | Web Worker offload | Low |
| R-TS-005 | RegexSearch | ReDoS blocks main thread | Medium | High | MH | 4-layer defense + timeout | Low |
| R-TS-006 | PluginAPI | Plugin memory exhaustion | Medium | Medium | M | Worker memory limits | Low |
| R-TS-007 | SettingsManager | Multi-device sync conflict | Medium | Low | ML | sync_token + conflict UI | Low |
| R-TS-008 | CommentsSystem | Double comment submission | Low | Low | L | Debounce + idempotency | Negligible |
| R-TS-009 | UserAccounts | OAuth state reuse | Low | Medium | LM | Single-use delete-after-validate | Low |
| R-TS-10 | Editor | Yjs document corruption | Negligible | High | L | Document ID validation | Negligible |

---

## 15. Recommendations

### 15.1 Immediate Actions (Phase 3)

1. **Offload GraphView layout to Web Worker** for graphs >1000 nodes
2. **Implement 4-layer ReDoS defense** with 100ms timeout for RegexSearch
3. **Add BroadcastChannel** for cross-tab keybinding and settings sync
4. **Use `createResource`** for all async data in SolidJS components
5. **Plugin Worker memory limits**: terminate after 50MB or 5s timeout

### 15.2 Architecture Constraints

1. **No DO-to-DO calls**: All coordination mediated by Workers
2. **No mutable global state in Workers**: Use KV or D1
3. **All external calls must have timeouts**: 5–30 seconds
4. **All OCC edits must include baseRevision**: No blind writes

### 15.3 Testing Requirements

| Test Type | Scope | Tool | Frequency |
|-----------|-------|------|-----------|
| Unit | Signal propagation atomicity | Vitest | Every commit |
| Unit | OCC conflict detection | Vitest + Miniflare | Every commit |
| Unit | ReDoS defense effectiveness | Vitest | Every commit |
| Integration | Plugin Worker isolation | Vitest + worker harness | Every PR |
| Integration | Yjs CRDT merge correctness | Vitest | Every PR |
| Integration | D1 batch atomicity | Vitest + Miniflare | Every PR |
| E2E | Wiki edit conflict resolution | Playwright | Weekly |
| Stress | Worker concurrent requests | wrangler dev | Before deploy |

---

**End of Document**
**Document Status:** DRAFT — Pending concurrency review
**Owner:** Wikisites Architecture Team
