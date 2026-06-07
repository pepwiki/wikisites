# Phase 04: Performance Engineering Report

## Executive Summary

Phase 4 establishes the performance engineering framework for KP Wikisites, defining measurable requirements across Core Web Vitals, server metrics, and resource budgets. The phase includes a comprehensive benchmark suite (Lighthouse CI, WebPageTest, custom markers), regression detection, and a four-phase optimization roadmap from static optimization through advanced edge techniques. All specifications target sub-2-second page loads with global edge delivery.

## Deliverables

### Phase 3.5: Resource Management (3 files)

| File                   | Coverage                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| `memory_management.md` | Client budgets, SolidJS cleanup, worker isolation, image memory, search index memory, cache eviction |
| `handle_management.md` | D1 connections, R2 streams, WebSocket lifecycle, event listeners, abort controllers                  |
| `resource_limits.md`   | Workers CPU, Pages build, R2 storage, KV quotas, D1 limits, client budgets                           |

### Phase 4: Performance Engineering (3 files)

| File                          | Coverage                                                                                              |
| ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| `performance_requirements.md` | Core Web Vitals targets, TTFB, page weight, build time, search/API latency, Lighthouse scores         |
| `benchmark_suite.md`          | Lighthouse CI config, WebPageTest automation, custom markers, regression detection, test environments |
| `optimization_roadmap.md`     | 4-phase roadmap: static, dynamic, edge, advanced (ISR, streaming, partial hydration)                  |

## Architecture Decisions

### 1. Memory Management Strategy

**Decision:** Client-side memory budgets enforced at component level with LRU cache eviction.

**Rationale:**

- SolidJS signals are automatically tracked but external resources (images, workers, search indexes) need manual lifecycle management
- Web Workers provide memory isolation for expensive operations (search, markdown parsing)
- LRU eviction with memory pressure response prevents browser OOM on low-end devices

**Impact:** Components exceeding 500KB must implement explicit cleanup. Search index loaded on-demand with 5-minute idle eviction.

### 2. Handle Lifecycle Pattern

**Decision:** AbortController-based cleanup with `onCleanup()` registration for all handles.

**Rationale:**

- Every event listener, fetch request, and subscription must have a deterministic release path
- AbortController composition (`AbortSignal.any()`) enables unified lifecycle management
- D1's serverless model eliminates connection pooling but requires statement-scoped usage

**Impact:** Zero tolerance for leaked event listeners. All fetch operations use timeout + abort patterns.

### 3. Resource Limit Strategy

**Decision:** Conservative budgets with monitoring thresholds at 80% of limits.

**Rationale:**

- Cloudflare Workers free tier (10ms CPU) is extremely constrained; paid tier (30s) provides headroom
- KV eventually consistent writes (1-60s) require stale-while-revalidate patterns
- D1 row read budget (5M/day free) requires aggressive caching to stay within limits

**Impact:** Most page views served from KV cache (sub-50ms TTFB). D1 queries limited to cache misses.

### 4. Performance Targets

**Decision:** LCP <2.5s, CLS <0.1, INP <200ms, TTFB <200ms, total page weight <500KB.

**Rationale:**

- Targets aligned with Google's "good" thresholds for Core Web Vitals
- Sub-500KB initial load ensures fast delivery on 3G connections
- Search response time under 100ms maintains instant-feel UX

**Impact:** All pages must pass Lighthouse CI with scores above 90 before merge to main.

### 5. Optimization Phasing

**Decision:** Four-phase optimization roadmap (static -> dynamic -> edge -> advanced).

**Rationale:**

- Each phase builds on previous phase gains and infrastructure
- Phase 1 (static) provides immediate wins with low complexity
- Phase 4 (ISR, streaming, partial hydration) requires Phase 3 edge infrastructure

**Impact:** Total optimization timeline is 10-13 weeks. Each phase has measurable success criteria before proceeding.

## Cross-References

| Spec Phase              | Depends On                               | Provides To               |
| ----------------------- | ---------------------------------------- | ------------------------- |
| 3.5 Resource Management | 02 Architecture, 02.5 Concurrency        | 04 Performance            |
| 04 Performance          | 02 Architecture, 3.5 Resource Management | Phase 05 Testing (future) |

| Spec File                     | References                                                                         |
| ----------------------------- | ---------------------------------------------------------------------------------- |
| `memory_management.md`        | `handle_management.md` (cleanup patterns), `resource_limits.md` (budgets)          |
| `handle_management.md`        | `resource_limits.md` (D1, R2 limits), `performance_requirements.md` (latency)      |
| `resource_limits.md`          | `performance_requirements.md` (targets), `benchmark_suite.md` (monitoring)         |
| `performance_requirements.md` | `benchmark_suite.md` (measurement), `optimization_roadmap.md` (remediation)        |
| `benchmark_suite.md`          | `performance_requirements.md` (thresholds), `optimization_roadmap.md` (validation) |
| `optimization_roadmap.md`     | `performance_requirements.md` (targets), `resource_limits.md` (constraints)        |

## Key Metrics Summary

| Metric            | Target                        | Constraint                              |
| ----------------- | ----------------------------- | --------------------------------------- |
| LCP (P75)         | <1.8s (target), <2.5s (max)   | Cloudflare Workers CPU, KV latency      |
| CLS (P75)         | <0.05 (target), <0.1 (max)    | Image dimensions, layout stability      |
| INP (P98)         | <150ms (target), <200ms (max) | Main thread blocking, worker offloading |
| TTFB (P75)        | <100ms (target), <200ms (max) | Edge proximity, cache hit rate          |
| Search latency    | <50ms (target), <100ms (max)  | Index size, KV read latency             |
| API P95           | <120ms (target), <200ms (max) | D1 query time, cache strategy           |
| Total page weight | <300KB (target), <500KB (max) | Image optimization, code splitting      |
| Build time        | <3m (target), <5m (max)       | Pipeline optimization                   |
| Client heap       | <8MB                          | Component budgets, image limits         |
| Cache hit rate    | >95%                          | TTL strategy, invalidation              |
