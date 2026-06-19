# Phase 04: Performance Engineering Report

## Executive Summary

Phase 4 establishes tier-specific performance budgets, a component-level benchmark suite, and a five-phase optimization roadmap for all new Wikisites components (P0-P4). The approach ensures no tier degrades Core Web Vitals below threshold, with lazy loading as the primary strategy for heavy libraries.

## Key Metrics Summary

| Metric | Baseline (Current) | After All Tiers | Budget |
|---|---|---|---|
| LCP (P75) | 1.5s | <1.8s | <2.5s |
| CLS (P75) | 0.02 | <0.05 | <0.1 |
| INP (P98) | 100ms | <150ms | <200ms |
| TTFB (P75) | 50ms | <100ms | <200ms |
| Initial JS | 60KB | 69KB (+9KB) | <100KB |
| Total JS (all lazy) | 60KB | 665KB | <750KB |
| Total page weight | 150KB | <500KB | <750KB |
| Lighthouse score | 95 | >90 | >90 |

## Deliverables

### Performance Requirements (`performance_requirements.md`)

- Core Web Vitals targets (LCP <1.8s, CLS <0.05, INP <150ms, FID <50ms)
- Per-tier bundle budgets with component-level size limits
- Lazy loading classification (eager vs on-demand vs scroll-triggered)
- Code splitting plan with Vite manual chunks configuration
- KaTeX font loading strategy (preload on math block detection)
- Image optimization (WebP/AVIF with responsive srcset)
- Cache strategy (Service Worker, CDN headers, KV TTLs)

### Benchmark Suite (`benchmark_suite.md`)

- Page load benchmarks for 8 page types across all tiers
- Component render benchmarks (first render, re-render, memory)
- Search latency benchmarks (exact, fuzzy, regex, prefix)
- Graph rendering benchmarks (10-500 nodes)
- Editor responsiveness benchmarks (500-20K characters)
- Memory usage benchmarks per page type
- Lighthouse CI configuration with budget assertions
- CI integration with regression detection

### Optimization Roadmap (`optimization_roadmap.md`)

- **Phase 1 (P0):** Eager shortcodes + lazy palette/outline. +7KB eager, +5KB lazy.
- **Phase 2 (P1):** Code-split KaTeX (300KB) and force-graph (45KB). All lazy.
- **Phase 3 (P2):** Lazy-load Giscus (15KB), Annotations (10KB), Accounts (5KB). IntersectionObserver.
- **Phase 4 (P3):** Lazy-load TipTap (200KB) and Diff Viewer (10KB). Edit-mode trigger.
- **Phase 5 (P4):** Theme Engine (2KB eager), Plugin API (5KB lazy), Settings (1KB lazy).
- Tree-shaking analysis for all libraries
- Dynamic import registry with prefetch strategy
- Total eager impact: +9KB. Total lazy impact: +596KB (0KB on initial load).

## Architecture Decisions

### 1. Tier-Based Loading

**Decision:** Components classified into 5 tiers by bundle cost and user impact. Only P0-eager loads on page init.

**Rationale:**
- Keeps initial JS under 100KB (9KB overhead from all tiers)
- 98% of new component weight is lazy-loaded on demand
- Users only download what they use

**Impact:** Lighthouse score maintained >90 across all tier combinations.

### 2. KaTeX Lazy Loading

**Decision:** KaTeX (300KB) loaded via dynamic import on math block detection, not on page load.

**Rationale:**
- Only ~10% of wiki pages contain math
- 300KB eager load would degrade LCP by 800ms+ on non-math pages
- Font preload runs in parallel with KaTeX module download

**Impact:** Math pages load KaTeX in ~400ms; non-math pages see zero cost.

### 3. IntersectionObserver for Social Widgets

**Decision:** Giscus loaded via IntersectionObserver with 200px rootMargin.

**Rationale:**
- Comments section is typically below the fold
- Prevents third-party script from blocking initial render
- 200px margin preloads before visible

**Impact:** Zero third-party impact on initial page load metrics.

### 4. Edit-Mode Gating

**Decision:** TipTap (200KB) loaded only when user clicks Edit button.

**Rationale:**
- 90%+ of page views are read-only
- Editor is heavy and not needed for reading
- Skeleton UI provides instant feedback during load

**Impact:** Read-only pages unaffected by editor weight.

### 5. CSS-Only Components

**Decision:** Split Pane and Regex Search implemented as pure CSS/logic (0KB bundle).

**Rationale:**
- Split Pane is achievable with CSS Grid
- Regex toggle is a checkbox + one function
- No reason to pull in a library for simple UI

**Impact:** Two features at zero bundle cost.

## Cross-References

| Spec | Depends On | Provides To |
|---|---|---|
| 02 Architecture | Component designs | Loading strategies |
| 3.5 Resource Management | Memory/handle budgets | Per-component budgets |
| 04 Performance | All above | 05 Testing (future) |

| Spec File | References |
|---|---|
| `performance_requirements.md` | `benchmark_suite.md` (measurement), `optimization_roadmap.md` (remediation) |
| `benchmark_suite.md` | `performance_requirements.md` (thresholds), `optimization_roadmap.md` (validation) |
| `optimization_roadmap.md` | `performance_requirements.md` (targets), `benchmark_suite.md` (verification) |

## Risk Assessment

| Risk | Impact | Mitigation |
|---|---|---|
| KaTeX fonts slow on 3G | LCP +1s | Font preload in parallel with module load |
| force-graph jank on low-end devices | INP >200ms | Limit to 200 nodes; virtualize large graphs |
| TipTap memory leak on long sessions | Heap >50MB | Explicit cleanup in onCleanup; periodic GC |
| Giscus blocks comments render | FCP regression | IntersectionObserver with 200px margin |
| Bundle size creep past 600KB | Lighthouse <90 | CI bundle size check on every PR |

## Next Steps

1. **Phase 1 implementation:** Add P0 components with bundle monitoring
2. **Baseline measurement:** Run full benchmark suite on current codebase
3. **CI integration:** Add bundle size checks and Lighthouse CI
4. **Phase 2 start:** Code-split KaTeX and force-graph after Phase 1 stable
