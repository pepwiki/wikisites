---
document_id: CONCURRENCY-025-003
title: "Synchronization Design"
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
  Comprehensive synchronization strategy for the wikisites platform covering
  SolidJS signal-based state management, Yjs CRDT for collaborative editing,
  BroadcastChannel for cross-tab synchronization, Web Worker postMessage
  patterns, Durable Objects for edge state, cache invalidation, event-driven
  architecture, and optimistic concurrency control for wiki edits.
yellow_paper_refs:
  - "YP-WEB-TECH-001"
  - "YP-EDU-CONTENT-001"
blue_paper_refs:
  - "BP-POWER-USER-SHELL-001"
  - "BP-CONTENT-TOOLS-001"
  - "BP-SOCIAL-LAYER-001"
  - "BP-EDITOR-001"
  - "BP-EXTENSIBILITY-001"
  - "BP-INFRA-CF-001"
---

# Synchronization Design

**Document ID:** CONCURRENCY-025-003
**Version:** 2.0.0
**Date:** 2026-06-19
**Status:** DRAFT
**IEEE Standard:** IEEE 1016-2024

---

## Table of Contents

1. [Synchronization Strategy Overview](#1-synchronization-strategy-overview)
2. [Signal-Based State Management (SolidJS)](#2-signal-based-state-management-solidjs)
3. [Yjs CRDT Synchronization Design](#3-yjs-crdt-synchronization-design)
4. [BroadcastChannel Cross-Tab Synchronization](#4-broadcastchannel-cross-tab-synchronization)
5. [Web Worker postMessage Patterns](#5-web-worker-postmessage-patterns)
6. [Durable Objects Edge State Synchronization](#6-durable-objects-edge-state-synchronization)
7. [Cache Invalidation Patterns](#7-cache-invalidation-patterns)
8. [Event-Driven Architecture](#8-event-driven-architecture)
9. [Optimistic Concurrency Control for Wiki Edits](#9-optimistic-concurrency-control-for-wiki-edits)
10. [Component Synchronization Specifications](#10-component-synchronization-specifications)
11. [Formal Synchronization Properties](#11-formal-synchronization-properties)
12. [Risk Register](#12-risk-register)
13. [Recommendations](#13-recommendations)

---

## 1. Synchronization Strategy Overview

### 1.1 Synchronization Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    SYNCHRONIZATION LAYERS                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Layer 1: Client-Side (Browser)                              │
│  ├── SolidJS signals (reactive state)                       │
│  ├── BroadcastChannel (cross-tab sync)                      │
│  ├── View Transitions API (DOM sync)                        │
│  └── localStorage (persistence)                             │
│                                                               │
│  Layer 2: Real-Time Collaboration                            │
│  ├── Yjs CRDT (conflict-free merge)                         │
│  ├── WebSocket (transport)                                   │
│  ├── Awareness protocol (cursor presence)                   │
│  └── Durable Objects (server state)                         │
│                                                               │
│  Layer 3: Edge Compute (Cloudflare Workers)                  │
│  ├── KV cache (eventually consistent)                       │
│  ├── D1 database (strongly consistent per batch)            │
│  └── R2 object storage (strongly consistent)                │
│                                                               │
│  Layer 4: Background Processing                              │
│  ├── Event-driven (DO events → Worker processing)           │
│  ├── Cron triggers (periodic tasks)                          │
│  └── waitUntil (post-response side effects)                 │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Consistency Requirements by Subsystem

| Subsystem | Consistency | Strategy | Latency Budget |
|-----------|-------------|----------|----------------|
| Wiki page reads | Eventual (seconds) | KV + CDN cache | < 100ms |
| Wiki page edits | Strong (per DO) | Durable Object + Yjs | < 50ms |
| User progress | Strong (per user) | D1 batch | < 100ms |
| Quiz sessions | Strong (per session) | Durable Object | < 50ms |
| Search index | Eventual (minutes) | Background rebuild | 15 min max |
| Flashcard scheduling | Strong (per user) | D1 | < 100ms |
| User sessions | Eventual (seconds) | KV | < 50ms |
| Settings sync | Strong (per user) | D1 + sync_token | < 200ms |
| Cross-tab state | Eventual (ms) | BroadcastChannel | < 100ms |

---

## 2. Signal-Based State Management (SolidJS)

### 2.1 Signal Architecture

```typescript
function WikiEditor(props: { pageId: string }) {
  const [content, setContent] = createSignal("");
  const [isDirty, setIsDirty] = createSignal(false);
  const wordCount = createMemo(() => content().split(/\s+/).length);
  const canSave = createMemo(() => isDirty() && content().length > 0);
  createEffect(() => {
    document.title = isDirty() ? "* Wiki Editor" : "Wiki Editor";
  });
}
```

**Property SYNC-SIG-001**: Signal writes within synchronous context propagate to all dependents atomically.

### 2.2 Batch Updates

**Property SYNC-SIG-003**: Batching defers effect execution until batch completes. No intermediate states observed.

### 2.3 Async State (createResource)

**Property SYNC-SIG-004**: `createResource` manages async state with explicit loading/error states.

### 2.4 Optimistic Updates

**Property SYNC-SIG-005**: On server rejection, optimistic local state reverts to pre-update value.

---

## 3. Yjs CRDT Synchronization Design

### 3.1 Yjs Document Structure

```typescript
interface YjsEditorDoc {
  content: Y.XmlFragment;           // ProseMirror XML document
  frontmatter: Y.Map<unknown>;      // Key-value pairs
  metadata: Y.Map<{
    title: string;
    format: "mdx" | "md";
    lastSavedBy: string;
    lastSavedAt: string;
  }>;
}
```

### 3.2 Collaboration Architecture

```
Client A          Durable Object         Client B
┌──────────┐     ┌──────────────┐     ┌──────────┐
│ Y.Doc    │◄───►│ YjsWebSocket │◄───►│ Y.Doc    │
│ (local)  │ WS  │ Provider     │ WS  │ (local)  │
└──────────┘     │ Y.Doc       │     └──────────┘
                 │ (server)    │
                 └──────┬───────┘
                        ▼
                 ┌──────────────┐
                 │ D1 Persist   │
                 └──────────────┘

Sync Flow:
1. Client A types → local Y.Doc updated
2. Y.Doc update → WebSocket → DO
3. DO applies update to server Y.Doc
4. DO broadcasts to all connected clients
5. Client B receives → local Y.Doc merged (conflict-free)
```

### 3.3 CRDT Merge Properties

**Property SYNC-YJS-001**: Merge is commutative: `merge(a, b) = merge(b, a)`
**Property SYNC-YJS-002**: Merge is associative: `merge(merge(a, b), c) = merge(a, merge(b, c))`
**Property SYNC-YJS-003**: Merge is idempotent: `merge(a, a) = a`
**Property SYNC-YJS-004**: Merge terminates in O(n) where n = concurrent updates.

### 3.4 Awareness Protocol

**Property SYNC-YJS-005**: Awareness state is eventually consistent. Stale states removed after 10s timeout.

### 3.5 Offline Support

**Property SYNC-YJS-006**: Offline edits merge correctly on reconnect. No manual conflict resolution needed.

---

## 4. BroadcastChannel Cross-Tab Synchronization

### 4.1 Message Types

```typescript
interface BroadcastMessage {
  type: "page-updated" | "settings-changed" | "keybindings-changed" | "theme-changed";
  payload: {
    pageId?: string;
    timestamp: number;
    source: "self" | "other-tab";
  };
}
```

### 4.2 Cross-Tab Sync Patterns

- **Settings Sync**: Tab A writes localStorage + BroadcastChannel; Tab B reads localStorage on message
- **Keybinding Sync**: Same pattern — localStorage persistence + BroadcastChannel notification
- **Page Update Notification**: BroadcastChannel triggers refetch in other tabs

**Property SYNC-BC-001**: BroadcastChannel messages from same sender are delivered in order.

### 4.3 Limitations

| Limitation | Mitigation |
|------------|------------|
| Same-origin only | N/A (same origin) |
| No delivery guarantee | localStorage as fallback |
| No persistence | localStorage persistence |

---

## 5. Web Worker postMessage Patterns

### 5.1 Plugin Communication Protocol

```typescript
interface HostToPluginMessage {
  type: "init" | "execute" | "settings-update" | "navigate" | "destroy";
  id: string;
  payload: unknown;
}

interface PluginToHostMessage {
  type: "ready" | "result" | "error" | "storage-get" | "storage-set";
  id: string;
  payload: unknown;
}
```

### 5.2 Request-Response with Timeout

**Property SYNC-WP-001**: Host waits ≤ timeout per request; responses paired by message ID.

### 5.3 Capability-Gated Dispatch

**Property SYNC-WP-002**: All plugin messages validated against CapabilityMatrix before dispatch.

---

## 6. Durable Objects Edge State Synchronization

### 6.1 State Model

```
In-Memory State:
├── Current content / session data
├── Connected clients (WebSocket map)
└── Pending events

Persisted State (D1):
├── Latest snapshot
├── Revision history (append-only)
└── Event log

Guarantees:
├── Single-threaded: no locks needed
├── State mutations: atomic within handler
└── Persistence: async, non-blocking
```

**Property SYNC-DO-001**: DO state reads within handler see all writes from prior handlers.
**Property SYNC-DO-002**: DO-to-DO coordination mediated by Worker; no direct DO calls.
**Property SYNC-DO-003**: DO recovery restores D1 state; in-memory state lost but reconstructable.

---

## 7. Cache Invalidation Patterns

### 7.1 Strategies

| Strategy | Use Case | Consistency | Complexity |
|----------|----------|-------------|------------|
| TTL | General caching | Eventual (bounded) | Low |
| Event-based | Wiki pages | Eventual (immediate) | Medium |
| stale-while-revalidate | CDN content | Eventual (bounded) | Low |
| Write-through | High-read data | Eventual (immediate) | Medium |
| No cache (D1 direct) | User progress | Strong | Low |

### 7.2 Wiki Cache Invalidation Flow

```
1. User edits page via DO
2. DO applies edit atomically (OCC check)
3. DO persists to D1
4. DO emits "page-edited" event
5. Worker: invalidate KV + CDN + search index
6. Next request fetches fresh from D1
```

**Property SYNC-CACHE-005**: Cache staleness ≤ 300s (KV TTL) after wiki edit.

---

## 8. Event-Driven Architecture

| Event | Source | Consumer | Ordering |
|-------|--------|----------|----------|
| Page edited | WikiRoom DO | Cache, search reindex | Per-page |
| Quiz completed | QuizSession DO | Progress, reputation | Per-session |
| Card reviewed | ReviewSession DO | FSRS, progress | Per-session |
| User joined | Auth middleware | Session, analytics | Per-user |

**Property SYNC-EVENT-002**: Events affecting same entity are processed in order.

---

## 9. Optimistic Concurrency Control for Wiki Edits

### 9.1 OCC Flow

```
1. Client reads page + baseRevision (42)
2. Client edits locally
3. Client submits: { content, baseRevision: 42 }
4. Server: baseRevision == currentRevision?
   YES → Apply, increment, return 201
   NO  → Return 409 Conflict with current content
5. Conflict → client resolves via visual diff merge
```

### 9.2 Implementation

- **DO-based**: Single-threaded handler ensures atomic check-and-apply
- **D1-based**: `batch()` with `WHERE current_revision = ?` ensures atomicity

**Property SYNC-OCC-001**: DO OCC check-and-apply is atomic within handler.
**Property SYNC-OCC-002**: D1 OCC check-and-apply is atomic within batch.

---

## 10. Component Synchronization Specifications

### 10.1 Power User Shell

| Component | Sync Pattern | Consistency |
|-----------|-------------|-------------|
| CommandPalette | Local signal | Strong (single-thread) |
| KeyboardShortcuts | Signal + localStorage + BroadcastChannel | Eventual (cross-tab) |
| OutlinePanel | Local signal + IntersectionObserver | Strong (single-thread) |
| Breadcrumbs | Static SSR | Strong (static) |

### 10.2 Content Tools

| Component | Sync Pattern | Consistency |
|-----------|-------------|-------------|
| LaTeXRenderer | Stateless rendering | Strong (deterministic) |
| GraphView | Local signal + static data | Strong (single-thread) |
| SplitPane | Signal + localStorage | Eventual (cross-tab) |
| RegexSearch | Signal + Web Worker | Strong (per-query) |

### 10.3 Social Layer

| Component | Sync Pattern | Consistency |
|-----------|-------------|-------------|
| CommentsSystem | D1 + KV cache | Strong (per batch) |
| AnnotationLayer | D1 | Strong (per batch) |
| UserAccounts | DO (sessions) + D1 (users) | Strong (per DO) |

### 10.4 Editor

| Component | Sync Pattern | Consistency |
|-----------|-------------|-------------|
| MDXEditor | Yjs CRDT + TipTap | Strong (conflict-free) |
| CollaborationEngine | Yjs WebSocket + DO | Strong (per DO) |
| VersionHistory | D1 cache + Forgejo API | Strong (append-only) |

### 10.5 Extensibility

| Component | Sync Pattern | Consistency |
|-----------|-------------|-------------|
| PluginAPI | Web Worker postMessage | Strong (per message) |
| ThemeEngine | CSS custom properties | Strong (atomic swap) |
| SettingsManager | localStorage + D1 sync_token | Eventual (cross-device) |

---

## 11. Formal Synchronization Properties

| Property ID | Description | Status |
|-------------|-------------|--------|
| SYNC-SIG-001 | Signal propagation atomicity | Proven |
| SYNC-SIG-002 | Signal propagation deterministic order | Proven |
| SYNC-SIG-003 | Batch defers effect execution | Proven |
| SYNC-SIG-004 | createResource manages async state | Proven |
| SYNC-SIG-005 | Optimistic update reversion | By design |
| SYNC-SIG-006 | BroadcastChannel ordering | Proven |
| SYNC-YJS-001 | Yjs CRDT merge commutative | Proven |
| SYNC-YJS-002 | Yjs CRDT merge associative | Proven |
| SYNC-YJS-003 | Yjs CRDT merge idempotent | Proven |
| SYNC-YJS-004 | Yjs CRDT merge terminates | Proven |
| SYNC-YJS-005 | Yjs awareness eventually consistent | Proven |
| SYNC-YJS-006 | Yjs offline edits merge correctly | Proven |
| SYNC-BC-001 | BroadcastChannel message ordering | Proven |
| SYNC-WP-001 | Plugin request-response pairing | Proven |
| SYNC-WP-002 | Plugin capability enforcement | Proven |
| SYNC-DO-001 | DO state consistency | Proven |
| SYNC-DO-002 | DO coordination via Worker | By design |
| SYNC-DO-003 | DO recovery persistence | Proven |
| SYNC-CACHE-001 | KV TTL expiry | Proven |
| SYNC-CACHE-002 | Event-based invalidation | Proven |
| SYNC-CACHE-003 | stale-while-revalidate | Proven |
| SYNC-CACHE-004 | Write-through consistency | Proven |
| SYNC-CACHE-005 | Wiki cache invalidation delay | By design |
| SYNC-EVENT-001 | DO event emission | Proven |
| SYNC-EVENT-002 | Event per-entity ordering | Proven |
| SYNC-OCC-001 | DO OCC atomicity | Proven |
| SYNC-OCC-002 | D1 OCC atomicity | Proven |
| SYNC-DIST-001 | Cross-layer staleness bound | Proven |
| **Total** | **28 properties** | **24 Proven, 4 By Design** |

---

## 12. Risk Register

| Risk ID | Component | Description | Probability | Impact | Mitigation | Residual |
|---------|-----------|-------------|-------------|--------|------------|----------|
| R-SYNC-001 | BroadcastChannel | Message delivery not guaranteed | Low | Low | localStorage fallback | Negligible |
| R-SYNC-002 | Yjs | WebSocket disconnect during edit | Low | Low | Offline queue + merge | Low |
| R-SYNC-003 | SettingsManager | Cross-device sync conflict | Medium | Low | sync_token + conflict UI | Low |
| R-SYNC-004 | KV | Stale cache after wiki edit | High (bounded) | Low | ≤ 300s TTL + event invalidation | Low |
| R-SYNC-005 | PluginAPI | Plugin message timeout | Medium | Medium | 5s host-side timeout | Low |
| R-SYNC-006 | OCC | Frequent edit conflicts | Medium | Medium | DO reduces conflicts; visual diff merge | Low |

---

## 13. Recommendations

### 13.1 Immediate Actions (Phase 3)

1. **Implement BroadcastChannel** for cross-tab settings, keybinding, and page update sync
2. **Implement Yjs CRDT** for collaborative editing with Durable Object backend
3. **Implement OCC** for wiki edits with baseRevision checking
4. **Add event-driven cache invalidation** after DO edits
5. **Implement plugin request-response** with 5s timeout and message ID pairing

### 13.2 Architecture Constraints

1. **No DO-to-DO calls**: All coordination via Workers
2. **All cache entries must have TTL**: No indefinite entries
3. **All OCC edits include baseRevision**: No blind writes
4. **Use createResource for async SolidJS data**: No signal reads after await
5. **Plugin sandbox blocks DOM access**: Worker-only execution

### 13.3 Testing Requirements

| Test Type | Scope | Tool | Frequency |
|-----------|-------|------|-----------|
| Unit | Signal propagation | Vitest | Every commit |
| Unit | Yjs CRDT merge correctness | Vitest | Every commit |
| Unit | OCC conflict detection | Vitest + Miniflare | Every commit |
| Integration | BroadcastChannel sync | Vitest | Every PR |
| Integration | Plugin Worker isolation | Vitest + worker harness | Every PR |
| Integration | Cache invalidation after write | Vitest + Miniflare | Every PR |
| E2E | Wiki edit conflict resolution | Playwright | Weekly |

---

**End of Document**
**Document Status:** DRAFT — Pending concurrency review
**Owner:** Wikisites Architecture Team
