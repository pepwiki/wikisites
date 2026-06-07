# Memory Management Design

## Overview

Memory management for KP Wikisites is constrained by three environments: Cloudflare Workers (128MB limit per invocation), Cloudflare Pages edge nodes (similar limits), and client browsers (variable but target budget-aware). This document defines allocation budgets, cleanup strategies, and monitoring approaches across all three layers.

## 1. Client-Side Memory Budgets

### Per-Page Budget

Total JavaScript heap target: **8MB** for a fully-loaded page, broken down as follows:

| Component Category | Budget | Rationale |
|---|---|---|
| Framework runtime (SolidJS + signals) | 500KB | Core runtime with signal graph |
| Application state (stores, context) | 1MB | Wiki content cache, UI state, search index |
| Route-level components | 1.5MB | Active route's component tree + data |
| Shared UI components | 1MB | Header, sidebar, footer, nav |
| Markdown rendering pipeline | 1.5MB | Parser, AST, renderer, syntax highlighting |
| Search index (in-memory subset) | 1.5MB | Fuzzy search index for current wiki |
| Utility libraries | 500KB | Date formatting, URL handling, etc. |

### Per-Component Budget

Each component must not exceed these heap allocations:

- **Simple components** (buttons, labels, icons): <10KB
- **List components** (table rows, card grids): <100KB per rendered batch
- **Editor components** (markdown editor, search): <500KB
- **Media components** (image viewer, video player): <2MB (excluding media data)

### Dynamic Allocation Rules

1. Components exceeding 500KB must implement explicit cleanup via `onCleanup()`
2. Components holding references to DOM nodes must null them in disposal
3. Long-lived subscriptions (SSE, WebSocket) require `AbortController` integration
4. Any `setTimeout`/`setInterval` must be tracked and cleared on disposal

## 2. SolidJS Signal Cleanup and Disposal

### Signal Lifecycle Management

```typescript
// Pattern: Scoped signal with automatic cleanup
function createScopedSignal<T>(initial: T, options?: { cleanup?: (value: T) => void }) {
  const [value, setValue] = createSignal(initial);
  
  onCleanup(() => {
    const current = value();
    options?.cleanup?.(current);
    setValue(null as unknown as T);
  });
  
  return [value, setValue] as const;
}
```

### Disposal Patterns

**Component-level disposal:**
- All `createSignal`, `createMemo`, `createEffect` calls are automatically tracked by SolidJS
- Manual disposal is only required for external resources (caches, subscriptions, timers)

**Store-level disposal:**
```typescript
function createWikiStore(wikiId: string) {
  const store = createStore<WikiState>({
    pages: {},
    searchIndex: null,
    navigation: null,
  });

  // Dispose on wiki change
  onCleanup(() => {
    store[disposeSymbols.STORE](true); // Deep dispose
  });

  return store;
}
```

**Batch disposal for route transitions:**
```typescript
// In router configuration
onRouteChange(async (from, to) => {
  // Dispose resources from previous route
  disposeRouteResources(from.route);
  
  // Pre-allocate resources for new route
  await allocateRouteResources(to.route);
});
```

### Signal Graph Optimization

- Maximum signal dependency depth: 10 levels (prevent deep chains)
- Memo signal fanout limit: 50 consumers per source signal
- Effect batching window: 16ms (single frame) to prevent cascade recomputation
- Use `untrack()` for read-only derivations that don't need reactivity tracking

## 3. Web Worker Memory Isolation

### Worker Architecture

Two dedicated workers with isolated memory spaces:

**Search Worker (`search.worker.ts`):**
- Memory budget: 16MB
- Holds: Fuzzy search index, tokenization cache, stop word lists
- Communication: `postMessage` with structured clone transfer
- Lifecycle: Created on first search, idle timeout 60 seconds, terminate on memory pressure

**Markdown Worker (`markdown.worker.ts`):**
- Memory budget: 8MB
- Holds: Markdown parser state, AST cache (max 10 recent parses)
- Communication: `postMessage` with `Transferable` for large buffers
- Lifecycle: Created on first render, idle timeout 30 seconds

### Worker Memory Management

```typescript
// Worker memory budget enforcement
class WorkerMemoryGuard {
  private budget: number;
  private currentUsage: number = 0;

  constructor(budgetMB: number) {
    this.budget = budgetMB * 1024 * 1024;
    this.setupMemoryPressureListener();
  }

  canAllocate(bytes: number): boolean {
    if (this.currentUsage + bytes > this.budget) {
      this.evictOldest(bytes);
    }
    this.currentUsage += bytes;
    return true;
  }

  private evictOldest(needed: number) {
    // LRU eviction of cached data
    // Terminate worker if eviction insufficient
  }
}
```

### Worker Communication Protocol

All messages between main thread and workers use a typed protocol:

```typescript
interface WorkerMessage<T = unknown> {
  id: string;
  type: 'request' | 'response' | 'error' | 'cancel';
  payload: T;
  transferables?: Transferable[];
}

// Memory-safe transfer pattern
worker.postMessage(message, message.transferables);
// Main thread loses reference to transferred buffers
```

### Worker Failure Recovery

1. Worker crash detection via `onerror` and `onmessageerror`
2. Automatic restart with clean state on crash
3. Pending work queue preserved and re-queued on restart
4. Maximum 3 restart attempts within 60 seconds before disabling feature

## 4. Image/Video Lazy Loading Memory Impact

### Image Memory Budget

| Image Type | Max Dimensions | Max Memory/Instance | Max Concurrent |
|---|---|---|---|
| Thumbnail | 200x200 | 160KB | 20 |
| Content image | 1200x800 | 3.8MB | 8 |
| Full-resolution | 2400x1600 | 15MB | 2 |
| Avatar | 64x64 | 16KB | 50 |

### Lazy Loading Strategy

```typescript
function createLazyImage(src: string, options: LazyImageOptions) {
  const [isVisible, setIsVisible] = createSignal(false);
  const [isLoaded, setIsLoaded] = createSignal(false);

  // Intersection Observer with 200px root margin
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    },
    { rootMargin: '200px 0px', threshold: 0.01 }
  );

  // Memory-conscious loading
  onCleanup(() => {
    observer.disconnect();
    if (isLoaded()) {
      // Release decoded image data from memory
      releaseImageMemory(src);
    }
  });

  return { isVisible, isLoaded };
}
```

### Image Memory Tracking

```typescript
class ImageMemoryTracker {
  private loadedImages: Map<string, ImageMemoryEntry> = new Map();
  private totalMemory: number = 0;
  private budget: number = 50 * 1024 * 1024; // 50MB

  track(src: string, width: number, height: number) {
    const bytes = width * height * 4; // RGBA
    this.totalMemory += bytes;
    this.loadedImages.set(src, { bytes, lastAccess: Date.now() });
    
    if (this.totalMemory > this.budget) {
      this.evictLeastRecentlyUsed();
    }
  }

  private evictLeastRecentlyUsed() {
    const entries = Array.from(this.loadedImages.entries())
      .sort((a, b) => a[1].lastAccess - b[1].lastAccess);
    
    while (this.totalMemory > this.budget * 0.8 && entries.length > 0) {
      const [src, entry] = entries.shift()!;
      this.totalMemory -= entry.bytes;
      this.loadedImages.delete(src);
      // Trigger actual image element cleanup
      document.querySelector(`img[src="${src}"]`)?.remove();
    }
  }
}
```

### Video Memory Management

- Videos are never loaded into memory; only played via `<video>` element
- Maximum concurrent video elements: 2
- Video elements removed from DOM when off-screen > 5 seconds
- Preload attribute set to `none` by default, `metadata` on hover

## 5. Search Index Memory Footprint

### Index Structure

The search index for a single wiki with 10,000 pages:

| Component | Memory | Notes |
|---|---|---|
| Title index | 400KB | Trigram index with frequency data |
| Content index | 800KB | Tokenized content with positional data |
| Fuzzy match data | 200KB | Levenshtein distance matrix |
| Stop word list | 20KB | Common English words |
| Synonym graph | 50KB | Related term mappings |
| **Total per wiki** | **1.47MB** | Fits within 1.5MB budget |

### Index Compression

```typescript
// Index entry structure optimized for memory
interface IndexEntry {
  pageId: number;        // 4 bytes (compressed from UUID)
  titleTokens: Uint16Array;  // Token IDs
  contentTokens: Uint16Array;
  frequency: Float32Array;   // TF-IDF scores
}

// Shared string table for deduplication
class StringTable {
  private strings: string[] = [];
  private lookup: Map<string, number> = new Map();
  
  intern(str: string): number {
    let id = this.lookup.get(str);
    if (id === undefined) {
      id = this.strings.length;
      this.strings.push(str);
      this.lookup.set(str, id);
    }
    return id;
  }
}
```

### Index Loading Strategy

1. **On-demand loading**: Index loaded only when user initiates search
2. **Progressive loading**: Title index first (100ms), content index background (500ms)
3. **Shared index**: If multiple tabs open same wiki, index shared via `BroadcastChannel`
4. **Eviction**: Index evicted after 5 minutes of no search activity

### Multi-Wiki Index Management

When user can access multiple wikis:
- Only the active wiki's index is fully loaded
- Other wiki titles cached (50KB each) for quick switching
- Maximum 3 wiki indexes in memory simultaneously
- LRU eviction when 4th wiki accessed

## 6. Cache Eviction Strategies

### Cache Tiers

| Tier | Storage | Size Limit | TTL | Eviction |
|---|---|---|---|---|
| L1: Active data | JS heap | 2MB | 5 min | Time-based |
| L2: Session data | localStorage | 5MB | Session | LRU |
| L3: Persistent | IndexedDB | 50MB | 30 days | LRU + size |
| L4: Edge cache | Cloudflare KV | 1GB | Configurable | TTL + manual |
| L5: Origin | D1 database | Unlimited | Permanent | Manual cleanup |

### LRU Cache Implementation

```typescript
class LRUCache<K, V> {
  private cache: Map<K, { value: V; lastAccess: number }> = new Map();
  private maxSize: number;
  private ttl: number;

  constructor(maxSize: number, ttlMs: number) {
    this.maxSize = maxSize;
    this.ttl = ttlMs;
  }

  get(key: K): V | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    
    if (Date.now() - entry.lastAccess > this.ttl) {
      this.cache.delete(key);
      return undefined;
    }
    
    entry.lastAccess = Date.now();
    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }

  set(key: K, value: V) {
    if (this.cache.size >= this.maxSize) {
      // Evict oldest
      const oldest = this.cache.keys().next().value;
      this.cache.delete(oldest);
    }
    this.cache.set(key, { value, lastAccess: Date.now() });
  }

  cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.cache) {
      if (now - entry.lastAccess > this.ttl) {
        this.cache.delete(key);
      }
    }
  }
}
```

### Memory Pressure Response

When browser reports memory pressure (via `performance.memory` or device memory hints):

1. **Level 1 (80% budget)**: Stop pre-fetching, delay non-critical renders
2. **Level 2 (90% budget)**: Evict L1 cache, release non-visible images, pause search indexing
3. **Level 3 (95% budget)**: Evict L2 cache, terminate idle workers, release all non-essential memory
4. **Level 4 (critical)**: Navigate to low-memory mode (minimal UI, no search, no previews)

### Cache Warm-up Strategy

On page load, pre-warm caches in priority order:
1. Current page content (immediate)
2. Navigation tree (within 100ms)
3. Search index for current wiki (within 500ms)
4. Adjacent pages in navigation (within 2s)
5. Recent search results (background)

### Eviction Hooks

```typescript
interface EvictionCallback {
  onEvict: (key: string, value: unknown) => void;
  onEvictAll: () => void;
  onMemoryPressure: (level: 'warning' | 'critical') => void;
}

// Register eviction hooks for cleanup
const cache = new LRUCache(1000, 300000);
cache.onEvict = (key, value) => {
  if (value instanceof HTMLElement) {
    value.remove();
  }
  if (value instanceof AbortController) {
    value.abort();
  }
};
```
