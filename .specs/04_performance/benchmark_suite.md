# Benchmark Suite Design

## Overview

Benchmark suite for Wikisites covering page load, component render, search latency, graph rendering, editor responsiveness, and memory usage. Designed to detect regressions from P0-P4 component additions.

## 1. Page Load Benchmarks

### Test Pages

| Page | URL Pattern | Tier Coverage |
|---|---|---|
| Homepage | `/` | Base shell only |
| Wiki page | `/wiki/:slug` | P0 (breadcrumbs, shortcuts) |
| Wiki page + search | `/wiki/:slug` | P0 + P1 (regex search) |
| Wiki page + math | `/wiki/:slug` | P0 + P1 (KaTeX) |
| Wiki page + graph | `/wiki/:slug` | P0 + P1 (force-graph) |
| Edit mode | `/wiki/:slug/edit` | P0 + P3 (TipTap, Diff) |
| Comments | `/wiki/:slug#comments` | P0 + P2 (Giscus) |
| Settings | `/settings` | P0 + P4 (Settings, Theme) |

### Load Benchmark Parameters

```typescript
interface PageLoadBenchmark {
  url: string;
  tiers: string[];
  metrics: {
    ttfb: { target: number; max: number };
    fcp: { target: number; max: number };
    lcp: { target: number; max: number };
    cls: { target: number; max: number };
    tbt: { target: number; max: number };
    si: { target: number; max: number };
    tti: { target: number; max: number };
    totalSize: { target: number; max: number };
    jsSize: { target: number; max: number };
    cssSize: { target: number; max: number };
  };
}

const PAGE_LOAD_BENCHMARKS: PageLoadBenchmark[] = [
  {
    url: '/',
    tiers: ['base'],
    metrics: {
      ttfb: { target: 50, max: 100 },
      fcp: { target: 800, max: 1200 },
      lcp: { target: 1200, max: 1800 },
      cls: { target: 0.02, max: 0.05 },
      tbt: { target: 50, max: 100 },
      si: { target: 1000, max: 1800 },
      tti: { target: 1200, max: 2000 },
      totalSize: { target: 80000, max: 120000 },
      jsSize: { target: 60000, max: 100000 },
      cssSize: { target: 15000, max: 25000 },
    },
  },
  {
    url: '/wiki/test-wiki',
    tiers: ['base', 'P0'],
    metrics: {
      ttfb: { target: 50, max: 100 },
      fcp: { target: 800, max: 1200 },
      lcp: { target: 1200, max: 1800 },
      cls: { target: 0.02, max: 0.05 },
      tbt: { target: 60, max: 120 },
      si: { target: 1100, max: 1800 },
      tti: { target: 1300, max: 2000 },
      totalSize: { target: 92000, max: 140000 },
      jsSize: { target: 68000, max: 112000 },
      cssSize: { target: 17000, max: 28000 },
    },
  },
  {
    url: '/wiki/test-wiki?page=math-heavy',
    tiers: ['base', 'P0', 'P1-katex'],
    metrics: {
      ttfb: { target: 50, max: 100 },
      fcp: { target: 800, max: 1200 },
      lcp: { target: 1500, max: 2200 },
      cls: { target: 0.03, max: 0.08 },
      tbt: { target: 100, max: 200 },
      si: { target: 1500, max: 2500 },
      tti: { target: 1800, max: 2800 },
      totalSize: { target: 400000, max: 500000 },
      jsSize: { target: 370000, max: 450000 },
      cssSize: { target: 25000, max: 40000 },
    },
  },
  {
    url: '/wiki/test-wiki/edit',
    tiers: ['base', 'P0', 'P3-tiptap'],
    metrics: {
      ttfb: { target: 60, max: 120 },
      fcp: { target: 900, max: 1400 },
      lcp: { target: 1800, max: 2500 },
      cls: { target: 0.03, max: 0.08 },
      tbt: { target: 150, max: 250 },
      si: { target: 2000, max: 3000 },
      tti: { target: 2200, max: 3200 },
      totalSize: { target: 310000, max: 420000 },
      jsSize: { target: 280000, max: 380000 },
      cssSize: { target: 20000, max: 35000 },
    },
  },
];
```

### Before/After Each Tier Measurement

```typescript
interface TierBenchmark {
  tier: string;
  before: PageMetrics;
  after: PageMetrics;
  delta: {
    jsSize: number;      // bytes
    cssSize: number;
    lcpDelta: number;    // ms
    tbtDelta: number;
    totalLoadDelta: number;
  };
  withinBudget: boolean;
}

// Run benchmark before and after adding each tier
async function benchmarkTier(tier: string, url: string): Promise<TierBenchmark> {
  const before = await measurePage(url);
  // Add tier code
  const after = await measurePage(url);

  return {
    tier,
    before,
    after,
    delta: {
      jsSize: after.jsSize - before.jsSize,
      cssSize: after.cssSize - before.cssSize,
      lcpDelta: after.lcp - before.lcp,
      tbtDelta: after.tbt - before.tbt,
      totalLoadDelta: after.totalLoad - before.totalLoad,
    },
    withinBudget: (after.jsSize - before.jsSize) < TIER_BUDGETS[tier].jsMax,
  };
}
```

## 2. Component Render Benchmarks

### Render Timing

```typescript
interface ComponentRenderBenchmark {
  component: string;
  tier: string;
  metrics: {
    firstRender: { target: number; max: number };    // ms
    reRender: { target: number; max: number };       // ms
    memoryDelta: { target: number; max: number };    // KB
    domNodes: { target: number; max: number };
  };
}

const COMPONENT_BENCHMARKS: ComponentRenderBenchmark[] = [
  {
    component: 'CommandPalette',
    tier: 'P0',
    metrics: {
      firstRender: { target: 8, max: 20 },
      reRender: { target: 2, max: 5 },
      memoryDelta: { target: 50, max: 150 },
      domNodes: { target: 50, max: 100 },
    },
  },
  {
    component: 'OutlinePanel',
    tier: 'P0',
    metrics: {
      firstRender: { target: 10, max: 25 },
      reRender: { target: 3, max: 8 },
      memoryDelta: { target: 40, max: 120 },
      domNodes: { target: 80, max: 150 },
    },
  },
  {
    component: 'KaTeXRenderer',
    tier: 'P1',
    metrics: {
      firstRender: { target: 50, max: 150 },
      reRender: { target: 10, max: 30 },
      memoryDelta: { target: 500, max: 1500 },
      domNodes: { target: 200, max: 500 },
    },
  },
  {
    component: 'ForceGraph',
    tier: 'P1',
    metrics: {
      firstRender: { target: 100, max: 300 },
      reRender: { target: 30, max: 80 },
      memoryDelta: { target: 1000, max: 3000 },
      domNodes: { target: 300, max: 800 },
    },
  },
  {
    component: 'TipTapEditor',
    tier: 'P3',
    metrics: {
      firstRender: { target: 80, max: 200 },
      reRender: { target: 5, max: 15 },
      memoryDelta: { target: 800, max: 2000 },
      domNodes: { target: 150, max: 400 },
    },
  },
  {
    component: 'DiffViewer',
    tier: 'P3',
    metrics: {
      firstRender: { target: 30, max: 80 },
      reRender: { target: 10, max: 25 },
      memoryDelta: { target: 200, max: 600 },
      domNodes: { target: 100, max: 300 },
    },
  },
  {
    component: 'GiscusWidget',
    tier: 'P2',
    metrics: {
      firstRender: { target: 50, max: 120 },
      reRender: { target: 5, max: 15 },
      memoryDelta: { target: 300, max: 800 },
      domNodes: { target: 80, max: 200 },
    },
  },
];
```

### Render Benchmark Script

```typescript
// Benchmark component render time
async function benchmarkComponentRender(
  componentFactory: () => HTMLElement,
  name: string
): Promise<{ firstRender: number; reRender: number; memory: number }> {
  // Force GC if available
  if (globalThis.gc) globalThis.gc();

  const memBefore = (performance as any).memory?.usedJSHeapSize ?? 0;

  // First render
  const t0 = performance.now();
  const el = componentFactory();
  document.body.appendChild(el);
  const firstRender = performance.now() - t0;

  // Re-render (update state)
  const t1 = performance.now();
  el.dispatchEvent(new CustomEvent('re-render'));
  // Wait for microtask
  await new Promise(r => setTimeout(r, 0));
  const reRender = performance.now() - t1;

  const memAfter = (performance as any).memory?.usedJSHeapSize ?? 0;
  const memory = (memAfter - memBefore) / 1024; // KB

  // Cleanup
  el.remove();

  return { firstRender, reRender, memory };
}
```

## 3. Search Latency Benchmarks

### Search Pipeline Budget

| Stage | Target | Max | Method |
|---|---|---|---|
| Query parsing | <2ms | <5ms | Tokenize + normalize |
| Index lookup | <10ms | <20ms | Trigram in KV |
| Fuzzy matching | <20ms | <40ms | Levenshtein with pruning |
| Ranking | <5ms | <10ms | TF-IDF + recency |
| Snippet generation | <5ms | <10ms | Content extraction |
| Serialization | <2ms | <5ms | JSON |
| **Total server** | **<44ms** | **<90ms** | — |
| Network (edge) | <10ms | <20ms | KV proximity |
| **Total client** | **<54ms** | **<110ms** | — |

### Search Benchmark Parameters

```typescript
interface SearchBenchmark {
  query: string;
  type: 'exact' | 'fuzzy' | 'regex' | 'prefix';
  indexSize: number;     // pages
  expectedResults: number;
  metrics: {
    queryParse: { target: number; max: number };
    indexLookup: { target: number; max: number };
    fuzzyMatch: { target: number; max: number };
    ranking: { target: number; max: number };
    totalServer: { target: number; max: number };
    totalClient: { target: number; max: number };
    renderResults: { target: number; max: number };
  };
}

const SEARCH_BENCHMARKS: SearchBenchmark[] = [
  {
    query: 'getting started',
    type: 'exact',
    indexSize: 100,
    expectedResults: 5,
    metrics: {
      queryParse: { target: 1, max: 3 },
      indexLookup: { target: 5, max: 10 },
      fuzzyMatch: { target: 0, max: 0 },
      ranking: { target: 2, max: 5 },
      totalServer: { target: 20, max: 40 },
      totalClient: { target: 30, max: 60 },
      renderResults: { target: 5, max: 15 },
    },
  },
  {
    query: 'getingstarted',
    type: 'fuzzy',
    indexSize: 100,
    expectedResults: 3,
    metrics: {
      queryParse: { target: 1, max: 3 },
      indexLookup: { target: 5, max: 10 },
      fuzzyMatch: { target: 10, max: 25 },
      ranking: { target: 3, max: 7 },
      totalServer: { target: 30, max: 60 },
      totalClient: { target: 40, max: 80 },
      renderResults: { target: 5, max: 15 },
    },
  },
  {
    query: '/\\bapi\\b/i',
    type: 'regex',
    indexSize: 500,
    expectedResults: 20,
    metrics: {
      queryParse: { target: 2, max: 5 },
      indexLookup: { target: 10, max: 20 },
      fuzzyMatch: { target: 15, max: 35 },
      ranking: { target: 5, max: 10 },
      totalServer: { target: 40, max: 80 },
      totalClient: { target: 50, max: 100 },
      renderResults: { target: 8, max: 20 },
    },
  },
  {
    query: 'get',
    type: 'prefix',
    indexSize: 1000,
    expectedResults: 50,
    metrics: {
      queryParse: { target: 1, max: 2 },
      indexLookup: { target: 8, max: 15 },
      fuzzyMatch: { target: 5, max: 12 },
      ranking: { target: 3, max: 8 },
      totalServer: { target: 25, max: 50 },
      totalClient: { target: 35, max: 70 },
      renderResults: { target: 10, max: 25 },
    },
  },
];
```

## 4. Graph Rendering Benchmarks

### Force-Graph Metrics

```typescript
interface GraphBenchmark {
  graphSize: number;     // nodes
  edgeCount: number;
  metrics: {
    layoutCompute: { target: number; max: number };   // ms
    svgRender: { target: number; max: number };       // ms
    interactionLatency: { target: number; max: number }; // ms (click/hover)
    memoryUsage: { target: number; max: number };     // KB
    fps: { target: number; min: number };             // frames per second
  };
}

const GRAPH_BENCHMARKS: GraphBenchmark[] = [
  {
    graphSize: 10,
    edgeCount: 15,
    metrics: {
      layoutCompute: { target: 50, max: 100 },
      svgRender: { target: 20, max: 50 },
      interactionLatency: { target: 5, max: 15 },
      memoryUsage: { target: 200, max: 500 },
      fps: { target: 60, min: 55 },
    },
  },
  {
    graphSize: 50,
    edgeCount: 100,
    metrics: {
      layoutCompute: { target: 200, max: 500 },
      svgRender: { target: 80, max: 200 },
      interactionLatency: { target: 15, max: 40 },
      memoryUsage: { target: 800, max: 2000 },
      fps: { target: 55, min: 45 },
    },
  },
  {
    graphSize: 200,
    edgeCount: 500,
    metrics: {
      layoutCompute: { target: 800, max: 2000 },
      svgRender: { target: 300, max: 800 },
      interactionLatency: { target: 30, max: 80 },
      memoryUsage: { target: 3000, max: 8000 },
      fps: { target: 45, min: 30 },
    },
  },
  {
    graphSize: 500,
    edgeCount: 1500,
    metrics: {
      layoutCompute: { target: 2000, max: 5000 },
      svgRender: { target: 800, max: 2000 },
      interactionLatency: { target: 50, max: 150 },
      memoryUsage: { target: 8000, max: 20000 },
      fps: { target: 30, min: 20 },
    },
  },
];
```

## 5. Editor Responsiveness Benchmarks

### TipTap Editor Metrics

```typescript
interface EditorBenchmark {
  contentSize: number;   // characters
  metrics: {
    loadTime: { target: number; max: number };
    keystrokeLatency: { target: number; max: number };
    selectionLatency: { target: number; max: number };
    formatAction: { target: number; max: number };
    saveTime: { target: number; max: number };
    undoRedoLatency: { target: number; max: number };
    memoryUsage: { target: number; max: number };
    fps: { target: number; min: number };
  };
}

const EDITOR_BENCHMARKS: EditorBenchmark[] = [
  {
    contentSize: 500,
    metrics: {
      loadTime: { target: 80, max: 200 },
      keystrokeLatency: { target: 2, max: 8 },
      selectionLatency: { target: 3, max: 10 },
      formatAction: { target: 5, max: 15 },
      saveTime: { target: 50, max: 150 },
      undoRedoLatency: { target: 5, max: 15 },
      memoryUsage: { target: 500, max: 1200 },
      fps: { target: 60, min: 55 },
    },
  },
  {
    contentSize: 5000,
    metrics: {
      loadTime: { target: 120, max: 300 },
      keystrokeLatency: { target: 4, max: 12 },
      selectionLatency: { target: 5, max: 15 },
      formatAction: { target: 8, max: 25 },
      saveTime: { target: 80, max: 200 },
      undoRedoLatency: { target: 8, max: 20 },
      memoryUsage: { target: 1000, max: 2500 },
      fps: { target: 55, min: 45 },
    },
  },
  {
    contentSize: 20000,
    metrics: {
      loadTime: { target: 200, max: 500 },
      keystrokeLatency: { target: 8, max: 25 },
      selectionLatency: { target: 10, max: 30 },
      formatAction: { target: 15, max: 40 },
      saveTime: { target: 150, max: 400 },
      undoRedoLatency: { target: 12, max: 30 },
      memoryUsage: { target: 3000, max: 8000 },
      fps: { target: 45, min: 30 },
    },
  },
];
```

## 6. Memory Usage Benchmarks

### Per-Page Memory Budget

```typescript
interface MemoryBenchmark {
  page: string;
  tiers: string[];
  metrics: {
    heapUsed: { target: number; max: number };      // MB
    heapTotal: { target: number; max: number };     // MB
    domNodes: { target: number; max: number };
    eventListeners: { target: number; max: number };
    timers: { target: number; max: number };
  };
}

const MEMORY_BENCHMARKS: MemoryBenchmark[] = [
  {
    page: 'Homepage',
    tiers: ['base'],
    metrics: {
      heapUsed: { target: 5, max: 10 },
      heapTotal: { target: 15, max: 25 },
      domNodes: { target: 200, max: 500 },
      eventListeners: { target: 20, max: 50 },
      timers: { target: 2, max: 5 },
    },
  },
  {
    page: 'Wiki + All Components',
    tiers: ['base', 'P0', 'P1', 'P2', 'P3', 'P4'],
    metrics: {
      heapUsed: { target: 15, max: 30 },
      heapTotal: { target: 40, max: 80 },
      domNodes: { target: 800, max: 2000 },
      eventListeners: { target: 60, max: 150 },
      timers: { target: 5, max: 15 },
    },
  },
  {
    page: 'Graph View (large)',
    tiers: ['base', 'P0', 'P1-force-graph'],
    metrics: {
      heapUsed: { target: 20, max: 40 },
      heapTotal: { target: 50, max: 100 },
      domNodes: { target: 1500, max: 4000 },
      eventListeners: { target: 40, max: 100 },
      timers: { target: 3, max: 8 },
    },
  },
  {
    page: 'TipTap Editor (large doc)',
    tiers: ['base', 'P0', 'P3-tiptap'],
    metrics: {
      heapUsed: { target: 25, max: 50 },
      heapTotal: { target: 60, max: 120 },
      domNodes: { target: 1000, max: 3000 },
      eventListeners: { target: 50, max: 120 },
      timers: { target: 4, max: 10 },
    },
  },
];
```

### Memory Leak Detection

```typescript
// Detect memory leaks across navigation
async function detectMemoryLeaks(pages: string[]): Promise<LeakReport[]> {
  const reports: LeakReport[] = [];

  for (let i = 0; i < pages.length; i++) {
    const before = getMemorySnapshot();
    await navigateTo(pages[i]);
    await waitForIdle();
    const after = getMemorySnapshot();

    const delta = after.heapUsed - before.heapUsed;
    if (delta > 1_000_000) { // >1MB growth
      reports.push({
        page: pages[i],
        heapGrowth: delta,
        domNodeGrowth: after.domNodes - before.domNodes,
        listenerGrowth: after.eventListeners - before.eventListeners,
        severity: delta > 5_000_000 ? 'critical' : 'warning',
      });
    }
  }

  return reports;
}
```

## 7. Lighthouse CI Configuration

```typescript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: [
        'http://localhost:4173/',
        'http://localhost:4173/wiki/test-wiki',
        'http://localhost:4173/wiki/test-wiki?page=math-heavy',
        'http://localhost:4173/wiki/test-wiki/edit',
      ],
      settings: {
        preset: 'desktop',
        throttling: { cpuSlowdownMultiplier: 1 },
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        'resource-summary:script:size': ['error', { maxNumericValue: 500000 }],
        'resource-summary:total:size': ['error', { maxNumericValue: 750000 }],
      },
    },
  },
};
```

## 8. Benchmark Execution

### Run Commands

```bash
# Full benchmark suite
bun run perf:bench

# Page load benchmarks only
bun run perf:bench:page-load

# Component render benchmarks
bun run perf:bench:render

# Search latency benchmarks
bun run perf:bench:search

# Graph rendering benchmarks
bun run perf:bench:graph

# Editor responsiveness benchmarks
bun run perf:bench:editor

# Memory usage benchmarks
bun run perf:bench:memory

# Lighthouse CI
bun run perf:lighthouse

# Compare against baseline
bun run perf:compare --baseline=main --current=feature-branch
```

### CI Integration

```yaml
# .github/workflows/perf-bench.yml
name: Performance Benchmarks
on:
  pull_request:
    branches: [main]

jobs:
  benchmark:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: bun install
      - run: bun run build
      - run: bun run preview &
      - run: bun run perf:bench
      - run: bun run perf:compare --fail-on-regression
      - uses: actions/upload-artifact@v4
        with:
          name: perf-results
          path: .perf-results/
```
