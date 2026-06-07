# Performance Requirements

## Overview

This document defines measurable performance requirements for KP Wikisites across all user-facing and system-facing metrics. Every requirement includes its target value, measurement methodology, acceptance criteria, and remediation path when targets are not met.

## 1. Core Web Vitals Targets

### Largest Contentful Paint (LCP)

| Metric | Target | Acceptable | Unacceptable |
|---|---|---|---|
| LCP | <1.8s | <2.5s | >2.5s |

**Measurement:**
- Measured from navigation start to largest contentful element render
- Largest element is typically a hero image, heading, or content block
- Measured at 75th percentile across all page loads

**Optimization levers:**
1. Server-side render critical content (SolidJS SSR)
2. Preload hero images with `<link rel="preload" as="image">`
3. Use `fetchpriority="high"` on LCP element
4. Inline critical CSS for above-the-fold content
5. Serve assets from Cloudflare edge (low TTFB)

**Monitoring:**
```typescript
// Performance observer for LCP
const lcpObserver = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lastEntry = entries[entries.length - 1];
  
  emitMetric('web_vitals.lcp', lastEntry.startTime, {
    element: lastEntry.element?.tagName,
    url: window.location.pathname,
  });
});

lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
```

### Cumulative Layout Shift (CLS)

| Metric | Target | Acceptable | Unacceptable |
|---|---|---|---|
| CLS | <0.05 | <0.1 | >0.1 |

**Measurement:**
- Sum of all layout shift scores within session window
- Session window: maximum 5 seconds, gap threshold 1 second
- Only counts unexpected shifts (not user-initiated)

**Optimization levers:**
1. Set explicit `width` and `height` on all images and video
2. Use `aspect-ratio` CSS property for responsive media
3. Reserve space for dynamic content (skeleton screens, ad slots)
4. Use CSS `contain` for layout boundaries
5. Avoid inserting content above existing content after load

**Monitoring:**
```typescript
const clsObserver = new PerformanceObserver((list) => {
  let clsValue = 0;
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {
      clsValue += entry.value;
    }
  }
  
  emitMetric('web_vitals.cls', clsValue, {
    url: window.location.pathname,
  });
});

clsObserver.observe({ type: 'layout-shift', buffered: true });
```

### First Input Delay (FID)

| Metric | Target | Acceptable | Unacceptable |
|---|---|---|---|
| FID | <50ms | <100ms | >100ms |

**Measurement:**
- Time from first user interaction to browser event handler execution
- Only measured on first interaction
- Superseded by INP in practice but still tracked for historical comparison

**Optimization levers:**
1. Defer non-critical JavaScript execution
2. Use `requestIdleCallback` for low-priority work
3. Break long tasks (>50ms) into smaller chunks
4. Minimize main thread work during initial load
5. Use Web Workers for expensive computation

### Interaction to Next Paint (INP)

| Metric | Target | Acceptable | Unacceptable |
|---|---|---|---|
| INP | <150ms | <200ms | >200ms |

**Measurement:**
- Latency of all interactions (clicks, taps, key presses) throughout page lifecycle
- P98 of all interaction latencies
- Most critical for perceived responsiveness

**Optimization levers:**
1. Keep event handlers under 50ms
2. Use `startTransition()` for non-urgent state updates in SolidJS
3. Debounce input handlers (search, form validation)
4. Offload heavy computation to Web Workers
5. Use CSS `will-change` for animated properties

**Monitoring:**
```typescript
const inpObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    emitMetric('web_vitals.inp', entry.duration, {
      interactionType: entry.name,
      url: window.location.pathname,
    });
  }
});

inpObserver.observe({ type: 'event', buffered: true });
```

## 2. Time to First Byte (TTFB)

| Metric | Target | Acceptable | Unacceptable |
|---|---|---|---|
| TTFB | <100ms | <200ms | >200ms |

**Measurement:**
- Time from request start to first byte received
- Measured by `PerformanceNavigationTiming.responseStart`
- Critical for perceived responsiveness

**Optimization levers:**
1. Cloudflare Workers at edge (global PoP network)
2. KV cache for frequently accessed content
3. Minimize worker startup time (avoid heavy imports)
4. Stream response headers immediately
5. Use `cf: { cacheTtl: 300 }` for cacheable responses

**TTFB by content type:**

| Content | TTFB Target | Caching Strategy |
|---|---|---|
| Wiki page (cached) | <50ms | KV cache, 5 min TTL |
| Wiki page (uncached) | <150ms | D1 query + KV cache |
| Search results | <100ms | Pre-built index in KV |
| Static assets | <20ms | CDN edge cache, immutable |
| API responses | <100ms | KV cache, varies by endpoint |

## 3. Total Page Weight

### Initial Load Budget

| Resource Type | Target | Maximum |
|---|---|---|
| HTML | 10KB | 20KB |
| JavaScript (initial) | 64KB | 100KB |
| CSS | 20KB | 40KB |
| Images (above fold) | 50KB | 100KB |
| Fonts | 0KB | 0KB (system fonts) |
| **Total initial** | **144KB** | **260KB** |

### Full Page Budget

| Resource Type | Target | Maximum |
|---|---|---|
| All JavaScript | 150KB | 250KB |
| All CSS | 40KB | 80KB |
| All images (loaded) | 200KB | 400KB |
| Fonts | 0KB | 0KB |
| Other (icons, data) | 10KB | 30KB |
| **Total page** | **400KB** | **760KB** |

### Compression Targets

| Format | Target Ratio | Applicable Resources |
|---|---|---|
| Brotli | 80% | JS, CSS, HTML, SVG, JSON |
| Gzip | 70% | Fallback for older browsers |
| WebP | 75% | Photographs |
| AVIF | 85% | Photographs (modern browsers) |
| SVG | 60% | Icons, illustrations |

## 4. Build Time

| Metric | Target | Maximum | Critical |
|---|---|---|---|
| Total build time | <3 minutes | <5 minutes | >5 minutes |
| Cold start build | <4 minutes | <6 minutes | >6 minutes |
| Incremental build | <30 seconds | <60 seconds | >60 seconds |
| Type checking | <20 seconds | <40 seconds | >40 seconds |
| Linting | <10 seconds | <20 seconds | >20 seconds |
| Testing | <60 seconds | <120 seconds | >120 seconds |

### Build Pipeline Stages

```
┌─────────────────┐
│  Install deps   │  Target: 30s
│  (npm ci)       │  Max: 60s
└────────┬────────┘
         │
┌────────▼────────┐
│  Type check     │  Target: 20s
│  (tsc --noEmit) │  Max: 40s
└────────┬────────┘
         │
┌────────▼────────┐
│  Lint           │  Target: 10s
│  (eslint)       │  Max: 20s
└────────┬────────┘
         │
┌────────▼────────┐
│  Test           │  Target: 60s
│  (vitest run)   │  Max: 120s
└────────┬────────┘
         │
┌────────▼────────┐
│  Build          │  Target: 90s
│  (vite build)   │  Max: 150s
└────────┬────────┘
         │
┌────────▼────────┐
│  Optimize       │  Target: 30s
│  (minify, hash) │  Max: 60s
└────────┬────────┘
         │
┌────────▼────────┐
│  Deploy         │  Target: 20s
│  (wrangler)     │  Max: 40s
└─────────────────┘
```

## 5. Search Response Time

| Metric | Target | Acceptable | Unacceptable |
|---|---|---|---|
| Search response (client) | <50ms | <100ms | >100ms |
| Search response (server) | <80ms | <150ms | >150ms |
| Search index load | <200ms | <500ms | >500ms |
| Search result render | <16ms | <33ms | >33ms |

### Search Pipeline Budget

| Stage | Target | Method |
|---|---|---|
| Query parsing | <2ms | Tokenize + normalize |
| Index lookup | <10ms | Trigram index in KV |
| Fuzzy matching | <20ms | Levenshtein with pruning |
| Ranking | <5ms | TF-IDF + recency boost |
| Snippet generation | <5ms | Extract from content |
| Serialization | <3ms | JSON response |
| **Total server** | **<45ms** | — |
| Network (edge) | <10ms | KV proximity |
| **Total client** | **<55ms** | — |

### Search UX Requirements

1. Results appear within 100ms of keystroke
2. Debounce input at 150ms (prevents excessive queries)
3. Show loading indicator if response >50ms
4. Cache last 10 queries with results
5. Support incremental/prefix search

## 6. API Response Time

| Endpoint Category | Target | Maximum | Measurement |
|---|---|---|---|
| Authentication | <50ms | <100ms | P95 |
| Page CRUD | <100ms | <200ms | P95 |
| Search | <50ms | <100ms | P95 |
| File upload (init) | <100ms | <200ms | P95 |
| File upload (transfer) | N/A | N/A | Depends on file size |
| Wiki settings | <80ms | <150ms | P95 |
| User profile | <60ms | <120ms | P95 |

### API Latency Distribution

Target distribution for all API endpoints:

| Percentile | Target | Maximum |
|---|---|---|
| P50 | <50ms | <100ms |
| P75 | <80ms | <150ms |
| P90 | <100ms | <200ms |
| P95 | <120ms | <250ms |
| P99 | <200ms | <500ms |

### API Response Structure

```typescript
interface APIResponse<T> {
  data: T;
  meta: {
    requestId: string;    // Trace ID for debugging
    duration: number;     // Server processing time in ms
    cached: boolean;      // Whether response was served from cache
    timestamp: string;    // ISO 8601 timestamp
  };
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}
```

## 7. Lighthouse Score Targets

| Category | Target | Minimum |
|---|---|---|
| Performance | >95 | >90 |
| Accessibility | >98 | >95 |
| Best Practices | >95 | >90 |
| SEO | >100 | >95 |
| PWA | N/A | N/A |

### Lighthouse Metrics

| Metric | Target | Maximum |
|---|---|---|
| First Contentful Paint | <1.0s | <1.8s |
| Largest Contentful Paint | <1.8s | <2.5s |
| Total Blocking Time | <100ms | <200ms |
| Cumulative Layout Shift | <0.05 | <0.1 |
| Speed Index | <2.0s | <3.0s |
| Time to Interactive | <2.5s | <3.5s |

## 8. Performance Monitoring and Alerting

### Monitoring Stack

| Tool | Purpose | Frequency |
|---|---|---|
| Lighthouse CI | Automated performance testing | Every PR + daily |
| WebPageTest | Deep performance analysis | Weekly |
| Custom RUM | Real user monitoring | Continuous |
| Cloudflare Analytics | Edge performance | Continuous |
| Sentry Performance | Error + performance tracking | Continuous |

### Alert Thresholds

| Metric | Warning | Critical | Action |
|---|---|---|---|
| LCP P75 | >2.0s | >2.5s | Investigate LCP element |
| CLS P75 | >0.08 | >0.1 | Fix layout shifts |
| TTFB P75 | >150ms | >200ms | Check cache hit rate |
| API P95 | >200ms | >500ms | Profile slow queries |
| Error rate | >1% | >5% | Investigate errors |
| Build time | >4min | >6min | Optimize pipeline |

### Performance Regression Detection

```typescript
// Automated regression detection
interface PerformanceBaseline {
  metric: string;
  p50: number;
  p75: number;
  p95: number;
  samples: number;
  lastUpdated: string;
}

function checkRegression(
  current: PerformanceBaseline,
  baseline: PerformanceBaseline
): Regression[] {
  const regressions: Regression[] = [];
  
  // 10% regression threshold
  const threshold = 1.10;
  
  if (current.p75 > baseline.p75 * threshold) {
    regressions.push({
      metric: current.metric,
      baseline: baseline.p75,
      current: current.p75,
      change: ((current.p75 - baseline.p75) / baseline.p75) * 100,
      severity: current.p75 > baseline.p75 * 1.25 ? 'critical' : 'warning',
    });
  }
  
  return regressions;
}
```

## 9. Performance Testing Schedule

| Test Type | Frequency | Environment | Duration |
|---|---|---|---|
| Lighthouse CI | Every PR | Local + staging | 2 minutes |
| Bundle size check | Every PR | CI | 30 seconds |
| Load test (k6) | Weekly | Staging | 10 minutes |
| Stress test | Monthly | Staging | 30 minutes |
| Real user monitoring | Continuous | Production | Ongoing |
| Synthetic monitoring | Every 5 minutes | Production | 30 seconds per test |
