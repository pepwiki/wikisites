# Resource Limit Specifications

## Overview

This document defines the resource limits for all Cloudflare platform services, client-side budgets, and per-component limits for all new features: Command Palette, Keyboard Shortcuts, Outline Panel, Breadcrumbs, KaTeX Renderer, Graph View, Split Pane, Regex Search, Comments/Annotations, User Accounts, TipTap MDX Editor, Version History, Plugin API (Web Workers), Theme Engine, and Settings Manager.

## 1. Cloudflare Workers CPU Time Limits

### CPU Time Budgets

| Plan | CPU Time Limit | Wall Clock Limit | Memory Limit |
|---|---|---|---|
| Free | 10ms per request | 30 seconds | 128MB |
| Paid ($5/mo) | 30 seconds per request | 30 seconds | 128MB |
| Enterprise | 30 seconds per request | 30 seconds | 128MB |

### CPU Time Allocation by Route

| Route | Target CPU | Max CPU | Strategy |
|---|---|---|---|
| `/` (homepage) | 3ms | 8ms | Pre-compute in KV; edge cache |
| `/wiki/:slug` (page view) | 5ms | 15ms | KV cache; stream response |
| `/wiki/:slug/edit` (page edit) | 8ms | 25ms | Defer non-critical computation |
| `/api/search` | 15ms | 28ms | Pre-built search index in KV |
| `/api/search/regex` | 20ms | 28ms | Precompiled patterns; bounded scan |
| `/api/auth/*` | 5ms | 15ms | Session validation in KV |
| `/api/upload` | 10ms | 25ms | Stream to R2; background processing |
| `/api/comments` | 5ms | 15ms | KV-backed; batch reads |
| `/api/versions/:id` | 8ms | 20ms | D1 indexed queries |
| `/api/plugins/*` | 5ms | 15ms | Sandboxed; capability-gated |

### CPU Time Monitoring

```typescript
const cpuStart = performance.now();

// After request processing
const cpuTime = performance.now() - cpuStart;
if (cpuTime > 8) {
  console.warn(`High CPU time: ${cpuTime.toFixed(1)}ms`);
  emitMetric('worker.cpu_time', cpuTime, {
    route: request.url,
    warning: cpuTime > 8,
    critical: cpuTime > 9.5,
  });
}
```

### CPU Time Optimization Techniques

1. Pre-computation: Move expensive operations to build time or background jobs
2. Caching: Store computed results in KV with appropriate TTL
3. Lazy computation: Defer expensive calculations until response is sent
4. Algorithm optimization: Use efficient data structures (Map over Object for dynamic keys)
5. Early returns: Short-circuit on common cases (cache hits, auth failures)

## 2. Cloudflare Pages Build Limits

### Build Configuration

| Limit | Free Tier | Paid Tier | Mitigation |
|---|---|---|---|
| Build minutes per month | 500 | 5,000 | Optimize build pipeline |
| Concurrent builds | 1 | 5 | Queue non-urgent builds |
| Max build time | 30 minutes | 30 minutes | Aggressive code splitting |
| Max output size | 1GB | 1GB | Asset optimization |
| Max functions per deployment | 100 | 100 | Consolidate functions |
| Deployments per day | 100 | 100 | Batch non-critical deploys |

### Build Time Budget

Target: **Under 5 minutes** for production builds.

| Phase | Target Time | Max Time | Optimization |
|---|---|---|---|
| Install dependencies | 30s | 60s | Lock file; minimal deps |
| TypeScript compilation | 45s | 90s | Incremental compilation |
| SolidJS compilation | 30s | 60s | Tree-shake at build time |
| Asset optimization | 60s | 120s | Parallel processing |
| Bundle generation | 30s | 60s | Chunk optimization |
| Asset hashing | 10s | 30s | Content-hash naming |
| **Total** | **3m 25s** | **6m 00s** | — |

## 3. R2 Storage Limits

### R2 Quotas

| Limit | Free Tier | Paid Tier | Notes |
|---|---|---|---|
| Storage included | 10GB | 10GB | Per account |
| Storage cost | $0.015/GB/mo | $0.015/GB/mo | After included |
| Class A operations (writes) | 1M free/month | 1M free/month | $4.50/million after |
| Class B operations (reads) | 10M free/month | 10M free/month | $0.36/million after |
| Egress | Free | Free | No egress fees |
| Max object size | 5TB | 5TB | Single PUT |
| Max object name length | 1024 bytes | 1024 bytes | UTF-8 encoded |

### R2 Budget Allocation

| Content Type | Estimated Size | Monthly Growth | Annual Total |
|---|---|---|---|
| Wiki page content | 50MB | 5MB | 110MB |
| Images (uploaded) | 2GB | 200MB | 4.4GB |
| Search indexes | 100MB | 10MB | 220MB |
| Backups | 500MB | 50MB | 1.1GB |
| Static assets | 200MB | 20MB | 440MB |
| **Total** | **2.85GB** | **285MB** | **6.26GB** |

### R2 Cleanup Policy

| Content | Retention | Cleanup Strategy |
|---|---|---|
| Wiki pages | Indefinite | Soft delete; archive after 1 year inactive |
| Uploaded images | Indefinite | Reference counting; delete orphaned |
| Search indexes | Regenerated | Rebuild on schema change; delete old versions |
| Backups | 90 days | Rotate; keep 12 monthly snapshots |
| Temporary uploads | 24 hours | Delete incomplete multipart uploads |

## 4. KV Read/Write Limits

### KV Quotas

| Limit | Free Tier | Paid Tier | Notes |
|---|---|---|---|
| Reads | 100K/day | 10M/month | Included in plan |
| Writes | 1K/day | 1M/month | Included in plan |
| Deletes | 1K/day | 1M/month | Included in plan |
| Lists | 1K/day | 1M/month | Included in plan |
| Storage | 1GB | 1GB per namespace | Additional at $0.50/GB/mo |
| Max value size | 25MB | 25MB | Compressed recommended |
| Max key length | 512 bytes | 512 bytes | UTF-8 encoded |

### KV Namespace Allocation

| Namespace | Purpose | Estimated Reads/Day | Estimated Writes/Day |
|---|---|---|---|
| `SESSIONS` | Auth sessions | 10,000 | 500 |
| `CACHE` | API response cache | 50,000 | 5,000 |
| `CONFIG` | Wiki configuration | 2,000 | 100 |
| `PAGES` | Page content cache | 30,000 | 2,000 |
| `SEARCH` | Search index fragments | 5,000 | 200 |
| `COMMENTS` | Comment/annotation data | 8,000 | 1,000 |
| `VERSIONS` | Version history metadata | 3,000 | 500 |
| `THEMES` | Theme definitions | 1,000 | 50 |
| `PLUGINS` | Plugin registry/metadata | 500 | 100 |
| **Total** | — | **109,500** | **9,450** |

### KV Rate Limit Protection

```typescript
async function checkRateLimit(
  kv: KVNamespace,
  identifier: string,
  limit: number,
  windowSeconds: number
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const key = `ratelimit:${identifier}:${Math.floor(Date.now() / (windowSeconds * 1000))}`;
  const current = await kv.get(key, { type: 'json' }) as { count: number } | null;
  const count = (current?.count ?? 0) + 1;

  if (count > limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: (Math.floor(Date.now() / (windowSeconds * 1000)) + 1) * windowSeconds * 1000,
    };
  }

  kv.put(key, JSON.stringify({ count }), {
    expirationTtl: windowSeconds * 2,
  });

  return {
    allowed: true,
    remaining: limit - count,
    resetAt: (Math.floor(Date.now() / (windowSeconds * 1000)) + 1) * windowSeconds * 1000,
  };
}
```

## 5. D1 Query Limits

### D1 Quotas

| Limit | Free Tier | Paid Tier | Notes |
|---|---|---|---|
| Rows read | 5M/day | 25M/month | Billable |
| Rows written | 100K/day | 50M/month | Billable |
| Storage per database | 5GB | 10GB | Additional at $0.20/GB/mo |
| Max database size | 10GB | 10GB | Hard limit |
| Max batch size | 50 statements | 50 statements | Per batch call |
| Query timeout | 30 seconds | 30 seconds | Worker limit applies |

### D1 Query Budget

| Query Type | Estimated Rows Read | Frequency | Daily Total |
|---|---|---|---|
| Page fetch (single) | 3 rows | 50,000 | 150,000 |
| Page list (paginated) | 20 rows | 10,000 | 200,000 |
| Search (title) | 100 rows | 5,000 | 500,000 |
| User auth check | 2 rows | 20,000 | 40,000 |
| Wiki config | 5 rows | 5,000 | 25,000 |
| Category tree | 50 rows | 2,000 | 100,000 |
| Comment thread | 10 rows | 3,000 | 30,000 |
| Version history | 5 rows | 1,000 | 5,000 |
| Plugin registry | 3 rows | 500 | 1,500 |
| **Total** | — | — | **1,051,500** |

### D1 Write Budget

| Operation | Rows Written | Frequency | Daily Total |
|---|---|---|---|
| Create page | 1 | 100 | 100 |
| Update page | 2 | 500 | 1,000 |
| Delete page (soft) | 1 | 50 | 50 |
| User login | 1 | 1,000 | 1,000 |
| Wiki settings update | 1 | 10 | 10 |
| Create comment | 1 | 200 | 200 |
| Resolve comment | 1 | 100 | 100 |
| Create version | 2 | 300 | 600 |
| Plugin install/uninstall | 2 | 10 | 20 |
| **Total** | — | — | **3,080** |

## 6. Client-Side Resource Budgets

### JavaScript Bundle Budget

| Bundle | Target Size | Max Size | Compression |
|---|---|---|---|
| Framework (SolidJS) | 8KB | 12KB | Brotli |
| Router | 4KB | 6KB | Brotli |
| State management | 2KB | 4KB | Brotli |
| UI components (shared) | 15KB | 25KB | Brotli |
| Markdown renderer | 20KB | 30KB | Brotli |
| Search engine | 10KB | 15KB | Brotli |
| Utilities | 5KB | 8KB | Brotli |
| **Initial load total** | **64KB** | **100KB** | **Brotli** |

### Lazy-Loaded Component Bundles

| Component | Target Size | Max Size | Loading Strategy |
|---|---|---|---|
| Command Palette | 8KB | 12KB | `client:idle` |
| Keyboard Shortcuts | 3KB | 5KB | Eager (small) |
| Outline Panel | 5KB | 8KB | `client:visible` |
| Breadcrumbs | 2KB | 3KB | Eager (small) |
| KaTeX Renderer | 30KB | 40KB | `client:idle` + dynamic import |
| Graph View | 40KB | 60KB | `client:visible` + dynamic import |
| Split Pane | 4KB | 6KB | `client:visible` |
| Regex Search | 8KB | 12KB | `client:idle` |
| Comments/Annotations | 10KB | 15KB | `client:idle` |
| User Accounts | 5KB | 8KB | `client:idle` |
| TipTap MDX Editor | 50KB | 70KB | `client:idle` + dynamic import |
| Version History | 8KB | 12KB | `client:idle` |
| Plugin API | 10KB | 15KB | `client: idle` |
| Theme Engine | 5KB | 8KB | Eager (small) |
| Settings Manager | 5KB | 8KB | Eager (small) |

### CSS Budget

| Category | Target Size | Max Size |
|---|---|---|
| Reset/base | 2KB | 4KB |
| Layout | 3KB | 6KB |
| Components | 10KB | 20KB |
| Utilities | 2KB | 4KB |
| Dark mode | 3KB | 5KB |
| **Total** | **20KB** | **39KB** |

### Image Budget

| Image Type | Max Dimensions | Max File Size | Format |
|---|---|---|---|
| Logo/branding | 200x60 | 10KB | SVG |
| Favicon | 32x32 | 2KB | ICO/PNG |
| Thumbnail | 200x200 | 30KB | WebP |
| Content image | 1200x800 | 150KB | WebP |
| Hero/banner | 1600x400 | 100KB | WebP |
| Avatar | 64x64 | 5KB | WebP |

### Network Budget

| Metric | Target | Maximum |
|---|---|---|
| Initial page weight | 300KB | 500KB |
| Total transfer (first visit) | 500KB | 1MB |
| Total transfer (return visit) | 100KB | 200KB |
| DNS lookups | 1 | 3 |
| TLS handshakes | 1 | 1 |
| HTTP requests (initial) | 5 | 10 |

## 7. Runtime Memory Budgets

### Per-Page Heap Budget

Total JavaScript heap target: **<100MB** (absolute maximum), **<8MB** target.

| Component | Budget | Eviction Policy |
|---|---|---|
| JavaScript heap (framework) | 500KB | GC + manual cleanup |
| Application state | 1MB | onCleanup |
| Route components | 1.5MB | Route transition |
| Shared UI | 1MB | Page unload |
| Markdown rendering | 1.5MB | AST cache LRU |
| Search index | 1.5MB | Idle timeout |
| Command Palette | 200KB | Close/unmount |
| Outline Panel | 300KB | Route change |
| KaTeX Renderer | 430KB | LRU (200 entries) |
| Graph View | 4.7MB | Pause + destroy |
| TipTap Editor | 630KB | Editor.destroy() |
| Version History | 600KB | LRU (50 revisions) |
| Comments/Annotations | 150KB | Route change |
| Theme Engine | 100KB | Theme switch |
| Settings Manager | 30KB | Persist to localStorage |
| Plugin Workers (3×8MB) | 24MB | Terminate on unload |
| Service Worker cache | 50MB | LRU + pressure |
| **Total (without workers)** | **~14MB** | |
| **Total (with 3 workers)** | **~38MB** | |
| **Absolute maximum** | **<100MB** | |

### DOM Node Budget

| Resource | Budget | Enforcement |
|---|---|---|
| Total DOM nodes | 1,500 | Virtual scrolling |
| Active event listeners | 50 | Cleanup on unmount |
| Active timers | 10 | Clear on unmount |
| Concurrent network requests | 5 | Queue; abort stale |
| Active Web Workers | 3 | Terminate idle |
| Cache entries (all types) | 1,000 | LRU |

### localStorage Budget

| Key Prefix | Max Size | TTL |
|---|---|---|
| `ws_settings_*` | 50KB | Indefinite |
| `ws_theme_*` | 20KB | Indefinite |
| `ws_shortcuts_*` | 5KB | Indefinite |
| `ws_recent_*` | 50KB | 30 days |
| `ws_cache_*` | 100KB | 24 hours |
| **Total `ws_*`** | **500KB** | — |
| Browser limit | **5MB** | — |

### Service Worker Cache Budget

| Cache Name | Max Size | Eviction |
|---|---|---|
| `static-assets` | 10MB | LRU, 30-day TTL |
| `page-content` | 20MB | LRU, 7-day TTL |
| `images` | 30MB | LRU, 30-day TTL |
| `search-index` | 5MB | LRU, 24-hour TTL |
| **Total** | **50MB** | Pressure-based |

## 8. Per-Component Resource Limits

### Command Palette

| Resource | Limit | Notes |
|---|---|---|
| Registered commands | 200 | Hard limit for fuzzy search perf |
| Fuzzy search index | 200KB | In-memory |
| Rendered items (DOM) | 20 virtual | Virtualized list |
| Open/close transitions | 150ms | 60fps animation |
| Keyboard shortcut capture | 3s timeout | Abort after 3s |

### Outline Panel

| Resource | Limit | Notes |
|---|---|---|
| Parsed headings | 100 | Hard limit; deeper ignored |
| IntersectionObserver elements | 50 | Headings tracked |
| Scroll sync frequency | 60fps | Debounced to frame |
| Nesting depth | 6 levels | h1–h6 |

### KaTeX Renderer

| Resource | Limit | Notes |
|---|---|---|
| Cached expressions | 200 | LRU eviction |
| Expression size | 10KB | Truncate beyond |
| Render timeout | 100ms | Fall back to plain text |
| Font metric cache | 200 entries | Per font family |

### Graph View

| Resource | Limit | Notes |
|---|---|---|
| Maximum nodes rendered | 1,000 | Prune by degree centrality |
| Maximum edges rendered | 2,000 | Derived from nodes |
| Canvas resolution | 2x DPR | Max 2x for memory |
| Simulation tick rate | 30fps | Reduced from 60fps |
| Node label cache | 200KB | LRU |
| Pause when off-screen | 5s idle | IntersectionObserver trigger |

### Split Pane

| Resource | Limit | Notes |
|---|---|---|
| Minimum pane width | 200px | Hard floor |
| Maximum panes | 3 | Vertical split only |
| Drag event frequency | 60fps | requestAnimationFrame |
| Persist dimensions | localStorage | 5KB budget |

### Regex Search

| Resource | Limit | Notes |
|---|---|---|
| Compiled regex cache | 50 | LRU eviction |
| Regex complexity | 1000 steps | Backtracking limit |
| Max pattern length | 200 chars | Truncate beyond |
| Max results returned | 1,000 | Paginate beyond |
| Search timeout | 5s | Abort + show partial |

### Comments / Annotations

| Resource | Limit | Notes |
|---|---|---|
| Comments per page | 500 | Pagination beyond |
| Nested reply depth | 5 levels | Hard limit |
| Comment body size | 10KB | Truncate display |
| Annotation regions per page | 100 | Virtualize beyond |
| Attachment size per comment | 1MB | R2 storage |

### TipTap MDX Editor

| Resource | Limit | Notes |
|---|---|---|
| Document size | 100KB | Hard limit; warn at 80KB |
| History undo steps | 50 | Trim beyond |
| Active extensions | 20 | Limit loaded extensions |
| Collaborative cursors | 10 | Prune oldest |
| Autosave debounce | 1s | Abort previous on new edit |
| Cursor blink rate | 530ms | Standard blink |

### Version History

| Resource | Limit | Notes |
|---|---|---|
| In-memory revisions | 50 | LRU; rest in IndexedDB |
| Diff patch size | 10KB | Compress larger |
| Snapshot interval | 5 min | Minimum between snapshots |
| Max diff chain depth | 10 | Re-base beyond |

### Plugin API (Web Workers)

| Resource | Limit | Notes |
|---|---|---|
| Concurrent workers | 3 | Global limit |
| Per-plugin worker memory | 8MB | Terminated on breach |
| Message queue depth | 100 | Drop oldest beyond |
| Worker idle timeout | 60s | Auto-terminate |
| Plugin capabilities | 10 | Capability-gated |
| Plugin registry size | 50 plugins | Max installed |

### Theme Engine

| Resource | Limit | Notes |
|---|---|---|
| CSS variables | 100 | Hard limit |
| Theme overrides | 200 | Per custom theme |
| Theme file size | 50KB | Compressed |
| Apply transition | 100ms | No jank |
| localStorage for themes | 20KB | Budget-managed |

### Settings Manager

| Resource | Limit | Notes |
|---|---|---|
| Setting keys | 200 | Indexed access |
| Setting value size | 10KB | Truncate beyond |
| Schema validation | Zod | Compile-time + runtime |
| Sync frequency | 5s debounce | Cross-tab via BroadcastChannel |
| localStorage for settings | 50KB | Budget-managed |

## 9. Performance Budget Enforcement

### Lighthouse CI Assertions

```json
{
  "ci": {
    "assert": {
      "assertions": {
        "resource-summary:script:size": ["error", { "maxNumericValue": 100000 }],
        "resource-summary:stylesheet:size": ["error", { "maxNumericValue": 40000 }],
        "resource-summary:image:size": ["error", { "maxNumericValue": 500000 }],
        "resource-summary:total:size": ["error", { "maxNumericValue": 500000 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-blocking-time": ["error", { "maxNumericValue": 200 }],
        "server-response-time": ["error", { "maxNumericValue": 200 }]
      }
    }
  }
}
```

### Budget Monitoring

```typescript
interface BudgetReport {
  timestamp: string;
  jsSize: number;
  cssSize: number;
  totalSize: number;
  lcp: number;
  cls: number;
  tbt: number;
  ttfb: number;
  heapUsed: number;
  domNodes: number;
  workerCount: number;
  cacheSize: number;
}

function checkBudgets(report: BudgetReport): BudgetViolation[] {
  const violations: BudgetViolation[] = [];

  if (report.totalSize > 500_000)
    violations.push({ metric: 'totalSize', actual: report.totalSize, limit: 500_000 });
  if (report.heapUsed > 100 * 1024 * 1024)
    violations.push({ metric: 'heapUsed', actual: report.heapUsed, limit: 100 * 1024 * 1024 });
  if (report.domNodes > 1500)
    violations.push({ metric: 'domNodes', actual: report.domNodes, limit: 1500 });
  if (report.workerCount > 3)
    violations.push({ metric: 'workerCount', actual: report.workerCount, limit: 3 });
  if (report.lcp > 2500)
    violations.push({ metric: 'lcp', actual: report.lcp, limit: 2500 });
  if (report.cls > 0.1)
    violations.push({ metric: 'cls', actual: report.cls, limit: 0.1 });

  return violations;
}
```

## 10. Summary Limits Table

### Absolute Maximums

| Resource | Hard Limit | Target | Mitigation |
|---|---|---|---|
| JS heap per page | 100MB | 8MB | GC, eviction, workers |
| localStorage | 5MB | 500KB | LRU, quota-aware |
| Service Worker cache | 50MB | 50MB | LRU + pressure |
| Concurrent Workers | 3 | 3 | Terminate oldest |
| Graph nodes | 1,000 | 1,000 | Prune by centrality |
| TipTap document | 100KB | 80KB warn | Truncate, split |
| KaTeX expressions | 200 | 200 | LRU eviction |
| DOM nodes | 1,500 | 1,500 | Virtual scrolling |
| Event listeners | 50 | 50 | Cleanup on unmount |
| KV reads/day | 10M | 109,500 | Cache, batch |
| D1 rows read/day | 25M | 1,051,500 | Index, cache |
| R2 storage | 10GB | 2.85GB | Cleanup policy |
| Workers CPU (paid) | 30s | 20ms | Early return, cache |
