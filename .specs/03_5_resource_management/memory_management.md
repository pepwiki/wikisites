# Memory Management Design

## Overview

Memory management for Wikisites is constrained by three environments: Cloudflare Workers (128MB limit per invocation), Cloudflare Pages edge nodes (similar limits), and client browsers (variable but target budget-aware). This document defines allocation budgets, cleanup strategies, and monitoring approaches across all three layers, including analysis for all new components: Command Palette, Keyboard Shortcuts, Outline Panel, Breadcrumbs, LaTeX/KaTeX Renderer, Graph View, Split Pane, Regex Search, Comments/Annotations, User Accounts, MDX Editor (TipTap), Version History, Plugin API (Web Workers), Theme Engine, and Settings Manager.

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

### New Component Budget Allocation

| Component | Memory Budget | Notes |
|---|---|---|
| Command Palette | 200KB | Fuzzy search index, command registry, render cache |
| Keyboard Shortcuts | 50KB | Shortcut map, key sequence buffer |
| Outline Panel | 300KB | Parsed heading tree, IntersectionObserver state |
| Breadcrumbs | 20KB | Trivial; path string array |
| KaTeX Renderer | 800KB | Expression cache (LRU, max 200), macro table, font metrics |
| Graph View (force-graph) | 2MB | Node/edge arrays for 1000 nodes, simulation state |
| Split Pane | 30KB | Drag state, pane dimensions |
| Regex Search | 400KB | Compiled regex cache, match highlight data |
| Comments/Annotations | 150KB | Comment tree, resolved/unresolved index |
| User Accounts | 50KB | Session profile, permission bitmask |
| TipTap MDX Editor | 500KB | Document model, ProseMirror state, schema |
| Version History | 600KB | Diff patches (max 50 revisions in memory), snapshot index |
| Plugin API (Workers) | 100KB | Worker handles, message buffer, capability map |
| Theme Engine | 100KB | CSS variable map, compiled theme overrides |
| Settings Manager | 30KB | Schema defaults, current overrides |

### Per-Component Budget

Each component must not exceed these heap allocations:

- **Simple components** (buttons, labels, icons): <10KB
- **List components** (table rows, card grids): <100KB per rendered batch
- **Editor components** (markdown editor, search): <500KB
- **Media components** (image viewer, video player): <2MB (excluding media data)
- **Heavy visualizations** (Graph View): <2MB (excluding media data)

### Dynamic Allocation Rules

1. Components exceeding 500KB must implement explicit cleanup via `onCleanup()`
2. Components holding references to DOM nodes must null them in disposal
3. Long-lived subscriptions (SSE, WebSocket) require `AbortController` integration
4. Any `setTimeout`/`setInterval` must be tracked and cleared on disposal
5. Web Workers spawned by Plugin API must have termination handles stored and cleaned up
6. Graph View simulation loops must be paused/destroyed on component unmount

## 2. SolidJS Signal Cleanup and Disposal

### Signal Lifecycle Management

```typescript
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

  onCleanup(() => {
    store[disposeSymbols.STORE](true);
  });

  return store;
}
```

**Batch disposal for route transitions:**
```typescript
onRouteChange(async (from, to) => {
  disposeRouteResources(from.route);
  await allocateRouteResources(to.route);
});
```

### Signal Graph Optimization

- Maximum signal dependency depth: 10 levels (prevent deep chains)
- Memo signal fanout limit: 50 consumers per source signal
- Effect batching window: 16ms (single frame) to prevent cascade recomputation
- Use `untrack()` for read-only derivations that don't need reactivity tracking

## 3. KaTeX Expression Caching

### Cache Architecture

KaTeX rendering is CPU-intensive. Expressions must be cached to avoid re-rendering.

```typescript
class KaTeXCache {
  private cache: LRUCache<string, string>; // latex -> rendered HTML
  private macroCache: Map<string, string>; // shared macro definitions
  private metricsCache: Map<string, KaTeXMetrics>; // bounding box cache

  constructor(maxEntries = 200) {
    this.cache = new LRUCache(maxEntries, 300_000); // 5 min TTL
    this.macroCache = new Map();
    this.metricsCache = new Map();
  }

  render(latex: string, displayMode: boolean): string {
    const key = `${displayMode ? 'd' : 'i'}:${latex}`;
    const cached = this.cache.get(key);
    if (cached) return cached;

    const html = katex.renderToString(latex, { displayMode, throwOnError: false });
    this.cache.set(key, html);
    return html;
  }

  clear(): void {
    this.cache.clear();
    this.macroCache.clear();
    this.metricsCache.clear();
  }
}
```

### Memory Impact

| Metric | Value |
|---|---|
| Average rendered HTML size | ~2KB per expression |
| Max cached expressions | 200 |
| Max cache memory | 400KB |
| Macro table | ~10KB |
| Metrics cache (200 entries) | ~20KB |
| **Total KaTeX memory** | **~430KB** |

### Cleanup Strategy

- LRU eviction at 200 entries
- Full clear on wiki switch
- Partial eviction (oldest 25%) when memory pressure detected
- Cache shared across page navigations via module-level singleton

## 4. Graph View Node Memory

### Force-Directed Graph Memory Model

The Graph View renders wiki page relationships using `force-graph`. For a wiki with 1000+ pages:

```typescript
interface GraphNode {
  id: string;          // 8 bytes (reference)
  label: string;       // ~50 bytes avg (page title)
  x: number;           // 8 bytes
  y: number;           // 8 bytes
  vx: number;          // 8 bytes
  vy: number;          // 8 bytes
  size: number;        // 8 bytes
  color: string;       // 8 bytes (reference)
  // ProseMirror/force-graph internal: ~200 bytes
}

interface GraphEdge {
  source: string;      // 8 bytes (reference)
  target: string;      // 8 bytes (reference)
  weight: number;      // 8 bytes
  // Internal: ~50 bytes
}
```

### Memory Budget for 1000 Nodes

| Component | Per Item | Count | Total |
|---|---|---|---|
| Node objects | ~300 bytes | 1,000 | 300KB |
| Edge objects | ~80 bytes | 2,000 | 160KB |
| Canvas pixel buffer | ~4MB | 1 | 4MB |
| Simulation state | ~50KB | 1 | 50KB |
| Label render cache | ~200KB | 1 | 200KB |
| **Total** | | | **~4.7MB** |

### Graph View Memory Management

```typescript
class GraphViewMemory {
  private maxNodes = 1000;
  private nodeBudget = 2 * 1024 * 1024; // 2MB for node/edge data
  private canvasBudget = 4 * 1024 * 1024; // 4MB for rendering

  pruneGraph(nodes: GraphNode[], edges: GraphEdge[]): { nodes: GraphNode[]; edges: GraphEdge[] } {
    if (nodes.length <= this.maxNodes) return { nodes, edges };

    // Keep nodes with highest connection count (degree centrality)
    const degree = new Map<string, number>();
    for (const e of edges) {
      degree.set(e.source, (degree.get(e.source) || 0) + 1);
      degree.set(e.target, (degree.get(e.target) || 0) + 1);
    }

    const sorted = nodes
      .map(n => ({ node: n, deg: degree.get(n.id) || 0 }))
      .sort((a, b) => b.deg - a.deg)
      .slice(0, this.maxNodes);

    const keptIds = new Set(sorted.map(s => s.node.id));
    return {
      nodes: sorted.map(s => s.node),
      edges: edges.filter(e => keptIds.has(e.source) && keptIds.has(e.target)),
    };
  }

  pauseSimulation(simulation: d3.Simulation): void {
    simulation.stop();
  }

  destroyCanvas(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = 0;
    canvas.height = 0;
  }
}
```

### Adaptive Loading Strategy

1. **<200 nodes**: Render all, full force simulation
2. **200–500 nodes**: Render all, reduced simulation iterations
3. **500–1000 nodes**: Render top-500 by degree, lazy-load rest on zoom
4. **>1000 nodes**: Cluster by category, render cluster representatives; expand on click

## 5. TipTap Editor Document Memory

### Document Model Memory

TipTap (ProseMirror-based) document state memory:

```typescript
interface TipTapMemoryProfile {
  documentJSON: number;    // Serialized document: ~1KB per 1KB of text
  editorState: number;     // ProseMirror state: ~50KB base
  history: number;         // Undo/redo stack: ~5KB per edit step
  schema: number;          // Schema definition: ~10KB
  extensions: number;      // Extension state: ~20KB base + per-extension
}
```

### Memory by Document Size

| Document Size | JSON Model | History (50 steps) | Total |
|---|---|---|---|
| 1KB (short note) | 1KB | 50KB | ~55KB |
| 10KB (typical page) | 10KB | 100KB | ~130KB |
| 50KB (long page) | 50KB | 250KB | ~320KB |
| 100KB (max) | 100KB | 500KB | ~630KB |

### Editor Memory Limits

```typescript
class TipTapMemoryGuard {
  private maxDocumentSize = 100 * 1024; // 100KB
  private maxHistorySteps = 50;
  private warningThreshold = 80 * 1024; // 80KB

  validateDocumentSize(json: object): boolean {
    const size = new Blob([JSON.stringify(json)]).size;
    if (size > this.maxDocumentSize) {
      throw new Error(`Document exceeds ${this.maxDocumentSize} bytes: ${size}`);
    }
    if (size > this.warningThreshold) {
      console.warn(`Document approaching size limit: ${size}/${this.maxDocumentSize}`);
    }
    return true;
  }

  trimHistory(history: HistoryState): HistoryState {
    if (history.steps.length > this.maxHistorySteps) {
      return {
        ...history,
        steps: history.steps.slice(-this.maxHistorySteps),
      };
    }
    return history;
  }

  onCleanup(): void {
    // Release ProseMirror view
    // Null document reference
    // Clear history stack
  }
}
```

### Version History Memory

Version history stores diffs, not full snapshots:

```typescript
interface VersionEntry {
  id: string;
  timestamp: number;
  author: string;
  diff: string;          // Compact diff format
  patchSize: number;     // Estimated memory
}

// Budget: max 50 revisions in memory, rest in IndexedDB
const VERSION_HISTORY_BUDGET = 50;
const VERSION_HISTORY_MEMORY = 600 * 1024; // 600KB max in-memory
```

### Editor Cleanup Pattern

```typescript
function useTipTapEditor(content: string) {
  let editor: Editor | undefined;

  onMount(() => {
    editor = new Editor({
      content,
      extensions: [...],
    });
  });

  onCleanup(() => {
    if (editor) {
      editor.destroy(); // Releases ProseMirror state, history, DOM
      editor = undefined;
    }
  });

  return editor;
}
```

## 6. Web Worker Memory Isolation

### Worker Architecture

Three dedicated workers with isolated memory spaces:

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

**Plugin Worker (`plugin.worker.ts`):**
- Memory budget: 8MB per plugin instance
- Holds: Plugin sandbox, message buffer, capability map
- Communication: `postMessage` with serialized plugin API
- Lifecycle: Created when plugin loads, terminated on plugin disable/uninstall

### Plugin API Worker Isolation

```typescript
class PluginWorkerManager {
  private workers: Map<string, WorkerHandle> = new Map();
  private maxConcurrent = 3;
  private perWorkerBudget = 8 * 1024 * 1024; // 8MB

  async spawnPlugin(pluginId: string, config: PluginConfig): Promise<WorkerHandle> {
    if (this.workers.size >= this.maxConcurrent) {
      await this.terminateOldest();
    }

    const worker = new Worker(new URL('./plugin.worker.ts', import.meta.url), {
      type: 'module',
    });

    const handle: WorkerHandle = {
      id: pluginId,
      worker,
      memoryBudget: this.perWorkerBudget,
      lastActivity: Date.now(),
      messageQueue: [],
    };

    this.workers.set(pluginId, handle);
    return handle;
  }

  private async terminateOldest(): Promise<void> {
    const oldest = Array.from(this.workers.values())
      .sort((a, b) => a.lastActivity - b.lastActivity)[0];

    if (oldest) {
      oldest.worker.postMessage({ type: 'shutdown' });
      // Give plugin 1s to cleanup, then force terminate
      setTimeout(() => {
        oldest.worker.terminate();
        this.workers.delete(oldest.id);
      }, 1000);
    }
  }

  terminateAll(): void {
    for (const [id, handle] of this.workers) {
      handle.worker.terminate();
    }
    this.workers.clear();
  }
}
```

### Worker Memory Management

```typescript
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

worker.postMessage(message, message.transferables);
```

### Worker Failure Recovery

1. Worker crash detection via `onerror` and `onmessageerror`
2. Automatic restart with clean state on crash
3. Pending work queue preserved and re-queued on restart
4. Maximum 3 restart attempts within 60 seconds before disabling feature

## 7. Service Worker Cache Limits

### Cache Tier Strategy

| Tier | Storage | Size Limit | TTL | Eviction |
|---|---|---|---|---|
| L1: Active data | JS heap | 2MB | 5 min | Time-based |
| L2: Session data | localStorage | 5MB | Session | LRU |
| L3: Persistent | IndexedDB | 50MB | 30 days | LRU + size |
| L4: Edge cache | Cloudflare KV | 1GB | Configurable | TTL + manual |
| L5: Origin | D1 database | Unlimited | Permanent | Manual cleanup |

### Service Worker Cache Budget

```typescript
const SW_CACHE_LIMITS = {
  staticAssets: 10 * 1024 * 1024,   // 10MB - JS, CSS, fonts
  pageContent: 20 * 1024 * 1024,     // 20MB - cached wiki pages
  images: 30 * 1024 * 1024,          // 30MB - cached images
  searchIndex: 5 * 1024 * 1024,      // 5MB - search index fragments
  total: 50 * 1024 * 1024,           // 50MB - hard limit
};
```

### Cache Eviction on Pressure

```typescript
// Listen for storage pressure
if ('storage' in navigator && 'estimate' in navigator.storage) {
  const estimate = await navigator.storage.estimate();
  const usageRatio = estimate.usage / estimate.quota;

  if (usageRatio > 0.8) {
    await caches.delete('images');
    await caches.delete('searchIndex');
  } else if (usageRatio > 0.6) {
    await evictOldestCacheEntries('images', 0.3);
  }
}
```

## 8. localStorage Limits and Strategies

### localStorage Budget

Browser localStorage limit: **5MB** (varies by browser; 5MB is the safe minimum).

| Key Prefix | Purpose | Max Size | TTL |
|---|---|---|---|
| `ws_settings_*` | User settings/preferences | 50KB | Indefinite |
| `ws_theme_*` | Theme overrides | 20KB | Indefinite |
| `ws_shortcuts_*` | Keyboard shortcut overrides | 5KB | Indefinite |
| `ws_recent_*` | Recent pages/sessions | 50KB | 30 days |
| `ws_cache_*` | Temporary API cache | 100KB | 24 hours |
| `ws_*` (total) | All Wikisites data | 500KB | — |

### localStorage Management

```typescript
class SafeLocalStorage {
  private prefix = 'ws_';
  private maxSize = 500 * 1024; // 500KB budget

  set(key: string, value: unknown, ttlMs?: number): boolean {
    try {
      const entry = {
        value,
        timestamp: Date.now(),
        ttl: ttlMs,
      };
      const serialized = JSON.stringify(entry);

      // Check size before writing
      if (serialized.length > 10 * 1024) {
        console.warn(`localStorage entry too large: ${key} (${serialized.length} bytes)`);
        return false;
      }

      localStorage.setItem(this.prefix + key, serialized);
      this.enforceBudget();
      return true;
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        this.evictOldest();
        return this.set(key, value, ttlMs); // Retry once
      }
      return false;
    }
  }

  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(this.prefix + key);
      if (!raw) return null;

      const entry = JSON.parse(raw);
      if (entry.ttl && Date.now() - entry.timestamp > entry.ttl) {
        localStorage.removeItem(this.prefix + key);
        return null;
      }
      return entry.value as T;
    } catch {
      return null;
    }
  }

  private enforceBudget(): void {
    let totalSize = 0;
    const entries: [string, number][] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(this.prefix)) {
        const size = localStorage.getItem(key)?.length || 0;
        totalSize += size;
        entries.push([key, size]);
      }
    }

    if (totalSize > this.maxSize) {
      // Evict oldest entries until under 80% budget
      entries.sort((a, b) => a[0].localeCompare(b[0])); // Lexicographic = roughly chronological
      while (totalSize > this.maxSize * 0.8 && entries.length > 0) {
        const [key, size] = entries.shift()!;
        localStorage.removeItem(key);
        totalSize -= size;
      }
    }
  }

  private evictOldest(): void {
    const entries: [string, number][] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(this.prefix)) {
        entries.push([key, localStorage.getItem(key)?.length || 0]);
      }
    }
    entries.sort((a, b) => a[0].localeCompare(b[0]));
    // Remove oldest 25%
    const removeCount = Math.ceil(entries.length * 0.25);
    for (let i = 0; i < removeCount; i++) {
      localStorage.removeItem(entries[i][0]);
    }
  }
}
```

## 9. Memory Leak Detection Patterns

### Leak Detection in Development

```typescript
// Development-only memory tracking
if (import.meta.env.DEV) {
  const memorySnapshots: { label: string; heap: number; timestamp: number }[] = [];

  export function snapshotMemory(label: string) {
    if ('memory' in performance) {
      const mem = (performance as any).memory;
      memorySnapshots.push({
        label,
        heap: mem.usedJSHeapSize,
        timestamp: Date.now(),
      });

      if (memorySnapshots.length > 100) {
        const first = memorySnapshots[0];
        const last = memorySnapshots[memorySnapshots.length - 1];
        const growth = last.heap - first.heap;
        if (growth > 1024 * 1024) { // >1MB growth
          console.warn(`Memory growth detected: ${(growth / 1024 / 1024).toFixed(2)}MB over ${memorySnapshots.length} snapshots`);
          console.table(memorySnapshots.slice(-10));
        }
      }
    }
  }
}
```

### Common Leak Patterns to Detect

| Pattern | Detection | Prevention |
|---|---|---|
| Unremoved event listeners | Listener count audit in DEV | `onCleanup` mandatory |
| Unclosed Observers | Observer registry tracking | Disconnect in `onCleanup` |
| Orphaned timers | Timer registry in DEV | Clear in `onCleanup` |
| Unreleased image memory | Image tracker audit | LRU eviction + size budget |
| Worker memory growth | Worker `performance.memory` | Budget guard + termination |
| Cache unbounded growth | Cache size monitoring | LRU with max entries |
| Signal chain depth | DevTools signal graph | Max depth limit |

### Memory Leak Test Pattern

```typescript
// Automated leak detection for components
function detectLeaks(componentName: string, renderFn: () => void, destroyFn: () => void) {
  const heapBefore = (performance as any).memory?.usedJSHeapSize || 0;

  // Render and destroy 100 times
  for (let i = 0; i < 100; i++) {
    renderFn();
    destroyFn();
  }

  // Force GC if available
  if ('gc' in globalThis) (globalThis as any).gc();

  const heapAfter = (performance as any).memory?.usedJSHeapSize || 0;
  const growth = heapAfter - heapBefore;

  if (growth > 100 * 1024) { // >100KB growth after 100 cycles
    throw new Error(`Memory leak in ${componentName}: ${(growth / 1024).toFixed(1)}KB growth over 100 render/destroy cycles`);
  }
}
```

## 10. Summary Memory Map

### Complete Client-Side Memory Budget

| Layer | Budget | Eviction |
|---|---|---|
| SolidJS runtime + signals | 500KB | Automatic GC |
| Application state stores | 1MB | onCleanup |
| Route components (active) | 1.5MB | Route transition |
| Shared UI components | 1MB | Page unload |
| Markdown rendering | 1.5MB | AST cache LRU |
| Search index | 1.5MB | Idle timeout |
| Command Palette | 200KB | Close/unmount |
| Outline Panel | 300KB | Route change |
| KaTeX cache | 430KB | LRU (200 entries) |
| Graph View | 4.7MB | Pause + destroy on unmount |
| TipTap Editor | 630KB | Editor.destroy() |
| Version History | 600KB | LRU (50 revisions) |
| Comments/Annotations | 150KB | Route change |
| Theme Engine | 100KB | Theme switch |
| Settings Manager | 30KB | Persist to localStorage |
| Plugin Workers (3×8MB) | 24MB | Terminate on unload |
| Service Worker cache | 50MB | LRU + pressure |
| **Total (without workers)** | **~14MB** | |
| **Total (with 3 workers)** | **~38MB** | |
| **Target max** | **<100MB** | |

### Memory Pressure Response

1. **Level 1 (80% budget)**: Stop pre-fetching, delay non-critical renders
2. **Level 2 (90% budget)**: Evict L1 cache, release non-visible images, pause search indexing
3. **Level 3 (95% budget)**: Evict L2 cache, terminate idle workers, release all non-essential memory
4. **Level 4 (critical)**: Navigate to low-memory mode (minimal UI, no search, no previews)
