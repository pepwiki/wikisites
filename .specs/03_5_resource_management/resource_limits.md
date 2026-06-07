# Resource Limit Specifications

## Overview

This document defines the resource limits for all Cloudflare platform services and client-side budgets. Every limit includes current tier values, monitoring thresholds, and mitigation strategies for approaching or exceeding limits.

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
| `/api/auth/*` | 5ms | 15ms | Session validation in KV |
| `/api/upload` | 10ms | 25ms | Stream to R2; background processing |

### CPU Time Monitoring

```typescript
// Worker-level CPU time tracking
const cpuStart = performance.now();

// After request processing
const cpuTime = performance.now() - cpuStart;

// Report if approaching limit
if (cpuTime > 8) { // 80% of free tier limit
  console.warn(`High CPU time: ${cpuTime.toFixed(1)}ms`);
  
  // Emit metric
  emitMetric('worker.cpu_time', cpuTime, {
    route: request.url,
    tier: 'free',
    warning: cpuTime > 8,
    critical: cpuTime > 9.5,
  });
}
```

### CPU Time Optimization Techniques

1. **Pre-computation**: Move expensive operations to build time or background jobs
2. **Caching**: Store computed results in KV with appropriate TTL
3. **Lazy computation**: Defer expensive calculations until response is sent
4. **Algorithm optimization**: Use efficient data structures (Map over Object for dynamic keys)
5. **Early returns**: Short-circuit on common cases (cache hits, auth failures)

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

### Build Optimization Strategy

```json
// wrangler.toml build configuration
[build]
command = "npm run build"
upload_dir = "dist"
compatibility_date = "2024-01-01"

[build.environment]
NODE_OPTIONS = "--max-old-space-size=2048"
NPM_CONFIG_CACHE = ".npm-cache"
```

### Build Monitoring

Track build metrics:
- Total build time (target: <5 minutes)
- Bundle size per output (target: <500KB total)
- Number of chunks generated (target: <20)
- Asset count (target: <100)

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
| Max multipart parts | 10,000 | 10,000 | Per upload |
| Multipart part size | 5MB–5GB | 5MB–5GB | Recommended: 100MB |

### R2 Budget Allocation

| Content Type | Estimated Size | Monthly Growth | Annual Total |
|---|---|---|---|
| Wiki page content | 50MB | 5MB | 110MB |
| Images (uploaded) | 2GB | 200MB | 4.4GB |
| Search indexes | 100MB | 10MB | 220MB |
| Backups | 500MB | 50MB | 1.1GB |
| Static assets | 200MB | 20MB | 440MB |
| **Total** | **2.85GB** | **285MB** | **6.26GB** |

### R2 Usage Monitoring

```typescript
// Track R2 operations
async function trackedR2Put(bucket: R2Bucket, key: string, body: ReadableStream | ArrayBuffer): Promise<R2Object> {
  const start = performance.now();
  try {
    const result = await bucket.put(key, body);
    const duration = performance.now() - start;
    
    emitMetric('r2.put', duration, {
      key_prefix: key.split('/')[0],
      size: result.size,
    });
    
    return result;
  } catch (error) {
    emitMetric('r2.put.error', 1, { error: (error as Error).message });
    throw error;
  }
}
```

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
| Max metadata | 1KB | 1KB | Per key-value pair |
| Write latency | 1–60 seconds | 1–60 seconds | Eventually consistent |
| Read latency | <10ms (edge) | <10ms (edge) | Cached at edge |

### KV Namespace Allocation

| Namespace | Purpose | Estimated Reads/Day | Estimated Writes/Day |
|---|---|---|---|
| `SESSIONS` | Auth sessions | 10,000 | 500 |
| `CACHE` | API response cache | 50,000 | 5,000 |
| `CONFIG` | Wiki configuration | 2,000 | 100 |
| `PAGES` | Page content cache | 30,000 | 2,000 |
| `SEARCH` | Search index fragments | 5,000 | 200 |
| **Total** | — | **97,000** | **7,800** |

### KV Caching Strategy

```typescript
// Tiered caching pattern
async function getCached<T>(
  kv: KVNamespace,
  key: string,
  fetcher: () => Promise<T>,
  options?: { ttl?: number; cacheFirst?: boolean }
): Promise<T> {
  const ttl = options?.ttl ?? 300; // Default 5 minutes
  
  // Try KV cache first
  if (options?.cacheFirst !== false) {
    const cached = await kv.get(key, { type: 'json' });
    if (cached) {
      emitMetric('kv.cache.hit', 1, { key_prefix: key.split(':')[0] });
      return cached as T;
    }
  }
  
  // Fetch fresh data
  const data = await fetcher();
  
  // Write to KV cache (non-blocking)
  kv.put(key, JSON.stringify(data), { expirationTtl: ttl }).catch(err => {
    console.error('KV write failed:', err);
  });
  
  emitMetric('kv.cache.miss', 1, { key_prefix: key.split(':')[0] });
  return data;
}
```

### KV Rate Limit Protection

```typescript
// Implement rate limiting using KV
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
  
  // Write updated count (non-blocking)
  kv.put(key, JSON.stringify({ count }), {
    expirationTtl: windowSeconds * 2, // Extra buffer for clock skew
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
| Concurrent databases | 1 | 5 | Per account |
| Databases per account | 50 | 50 | Soft limit |

### D1 Query Budget

| Query Type | Estimated Rows Read | Frequency | Daily Total |
|---|---|---|---|
| Page fetch (single) | 3 rows | 50,000 | 150,000 |
| Page list (paginated) | 20 rows | 10,000 | 200,000 |
| Search (title) | 100 rows | 5,000 | 500,000 |
| User auth check | 2 rows | 20,000 | 40,000 |
| Wiki config | 5 rows | 5,000 | 25,000 |
| Category tree | 50 rows | 2,000 | 100,000 |
| **Total** | — | — | **1,015,000** |

### D1 Write Budget

| Operation | Rows Written | Frequency | Daily Total |
|---|---|---|---|
| Create page | 1 | 100 | 100 |
| Update page | 2 | 500 | 1,000 |
| Delete page (soft) | 1 | 50 | 50 |
| User login | 1 | 1,000 | 1,000 |
| Wiki settings update | 1 | 10 | 10 |
| **Total** | — | — | **2,160** |

### D1 Optimization Strategies

1. **Index optimization**: Ensure all frequently queried columns are indexed
2. **Query batching**: Combine related reads into batch operations
3. **Connection caching**: Cache query results in KV for hot paths
4. **Pagination**: Use cursor-based pagination for large result sets
5. **Soft deletes**: Mark rows as deleted instead of removing (avoids write amplification)

## 6. Client-Side Resource Budgets

### JavaScript Bundle Budget

| Bundle | Target Size | Max Size | Compression |
|---|---|---|---|
| Framework (SolidJS) | 8KB | 12KB | Brotli |
| Router | 4KB | 6KB | Brotli |
| State management | 2KB | 4KB | Brotli |
| UI components | 15KB | 25KB | Brotli |
| Markdown renderer | 20KB | 30KB | Brotli |
| Search engine | 10KB | 15KB | Brotli |
| Utilities | 5KB | 8KB | Brotli |
| **Initial load total** | **64KB** | **100KB** | **Brotli** |
| Route chunks (avg) | 8KB | 15KB | Brotli |

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

### Runtime Memory Budget

| Component | Budget | Eviction Policy |
|---|---|---|
| JavaScript heap | 8MB | GC + manual cleanup |
| DOM nodes | 1,500 | Virtual scrolling |
| Event listeners | 50 | Cleanup on unmount |
| Active timers | 10 | Clear on unmount |
| Network requests | 5 concurrent | Queue; abort stale |
| Web Workers | 2 | Terminate idle |
| Cache entries | 1,000 | LRU |

### Performance Budget Enforcement

```json
// lighthouserc.json
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

### Budget Monitoring Dashboard

```typescript
// Track budget adherence
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
}

function checkBudgets(report: BudgetReport): BudgetViolation[] {
  const violations: BudgetViolation[] = [];
  
  if (report.totalSize > 500_000) {
    violations.push({ metric: 'totalSize', actual: report.totalSize, limit: 500_000 });
  }
  
  if (report.lcp > 2500) {
    violations.push({ metric: 'lcp', actual: report.lcp, limit: 2500 });
  }
  
  if (report.cls > 0.1) {
    violations.push({ metric: 'cls', actual: report.cls, limit: 0.1 });
  }
  
  return violations;
}
```
