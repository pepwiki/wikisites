# Optimization Roadmap

## Overview

This document defines a four-phase optimization roadmap for KP Wikisites, progressing from foundational static optimizations through advanced edge and rendering techniques. Each phase has clear deliverables, success criteria, and dependencies.

## Phase 1: Static Optimization

### Duration: 2-3 weeks
### Goal: Minimize initial payload and enable efficient caching

### 1.1 Image Optimization

**Objective:** Reduce image payload by 70% while maintaining visual quality.

| Task | Approach | Expected Impact |
|---|---|---|
| Format migration | Convert PNG/JPEG to WebP with AVIF fallback | 40-60% size reduction |
| Responsive images | Generate srcset for 3 breakpoints (400w, 800w, 1200w) | 30-50% per-viewport savings |
| Lazy loading | IntersectionObserver with 200px rootMargin | Defer off-screen images |
| Blur-up placeholders | Generate 20px wide placeholder on upload | Perceived performance |
| Image CDN | Cloudflare Image Resizing for dynamic optimization | Automatic format/size |

**Implementation:**
```typescript
// Image optimization pipeline
interface OptimizedImage {
  original: string;          // Original R2 path
  webp: {                    // WebP variants
    sm: string;              // 400px wide
    md: string;              // 800px wide
    lg: string;              // 1200px wide
  };
  avif?: {                   // AVIF variants (modern browsers)
    sm: string;
    md: string;
    lg: string;
  };
  placeholder: string;       // Base64 blur-up
  width: number;
  height: number;
  alt: string;
}

// Upload processing
async function processImage(file: File): Promise<OptimizedImage> {
  const buffer = await file.arrayBuffer();
  
  // Generate variants using Cloudflare Image Resizing
  const variants = await Promise.all([
    resizeImage(buffer, { width: 400, format: 'webp' }),
    resizeImage(buffer, { width: 800, format: 'webp' }),
    resizeImage(buffer, { width: 1200, format: 'webp' }),
    resizeImage(buffer, { width: 20, format: 'webp', blur: 10 }),
  ]);
  
  return {
    original: await uploadToR2(file, 'original'),
    webp: { sm: variants[0], md: variants[1], lg: variants[2] },
    placeholder: variants[3],
    width: 0, // Extract from metadata
    height: 0,
    alt: file.name,
  };
}
```

### 1.2 Code Splitting

**Objective:** Reduce initial JavaScript payload to under 100KB.

| Strategy | Target | Implementation |
|---|---|---|
| Route-based splitting | 15KB per route chunk | SolidJS lazy() for routes |
| Component-level splitting | 5-10KB per feature chunk | Dynamic imports for editors, search |
| Vendor isolation | Separate chunk for dependencies | Manual chunks in Vite config |
| Tree shaking | Remove unused code | ESM-only imports; sideEffects: false |

**Vite configuration:**
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-solid': ['solid-js'],
          'vendor-router': ['@solidjs/router'],
          'vendor-markdown': ['marked', 'highlight.js'],
          'vendor-search': ['fuse.js'],
        },
        // Chunk naming convention
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Target modern browsers for smaller output
    target: 'es2022',
    // Source maps for production debugging
    sourcemap: true,
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
```

### 1.3 CSS Optimization

**Objective:** Reduce CSS payload to under 40KB.

| Task | Approach | Expected Impact |
|---|---|---|
| Critical CSS inlining | Inline above-fold CSS in HTML | Eliminate render-blocking CSS |
| PurgeCSS | Remove unused CSS classes | 20-40% CSS reduction |
| CSS minification | Terser CSS minification | 10-15% reduction |
| CSS containment | Use `contain` for layout isolation | Reduce layout recalculations |

```typescript
// Critical CSS extraction
async function extractCriticalCSS(html: string, css: string): Promise<string> {
  const { critical } = await penthouse({
    url: html,
    css: css,
    width: 1920,
    height: 1080,
    timeout: 30000,
    renderWaitTime: 1000,
  });
  return critical;
}
```

### 1.4 Font Strategy

**Objective:** Zero external font requests; use system font stack.

```css
/* System font stack - no network requests */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
}

/* Monospace for code blocks */
code, pre {
  font-family: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono',
    'Lucida Console', Monaco, monospace;
}
```

### Phase 1 Success Criteria

| Metric | Baseline | Target |
|---|---|---|
| Total page weight | 800KB | <300KB |
| Initial JS bundle | 150KB | <64KB |
| CSS total | 60KB | <20KB |
| Image payload | 400KB | <100KB |
| Lighthouse score | 75 | >90 |
| LCP | 3.2s | <2.0s |

---

## Phase 2: Dynamic Optimization

### Duration: 2-3 weeks
### Goal: Optimize runtime behavior and data loading patterns

### 2.1 Lazy Loading

**Objective:** Defer non-critical resources until needed.

| Resource | Strategy | Threshold |
|---|---|---|
| Route components | `lazy()` with `<Suspense>` | On navigation |
| Images below fold | IntersectionObserver | 200px before viewport |
| Search index | Dynamic import on first search | User interaction |
| Markdown editor | Dynamic import on edit mode | User click |
| Syntax highlighting | Dynamic import on code block | Content render |

```typescript
// Route-level lazy loading
const HomePage = lazy(() => import('./pages/Home'));
const WikiPage = lazy(() => import('./pages/Wiki'));
const SearchPage = lazy(() => import('./pages/Search'));

// Component-level lazy loading
const MarkdownEditor = lazy(() => import('./components/MarkdownEditor'));
const ImageGallery = lazy(() => import('./components/ImageGallery'));

// Usage with Suspense and fallback
<Show when={isEditing()}>
  <Suspense fallback={<EditorSkeleton />}>
    <MarkdownEditor content={pageContent()} />
  </Suspense>
</Show>
```

### 2.2 Prefetching

**Objective:** Predict and preload resources before user requests them.

| Trigger | Prefetch Target | Method |
|---|---|---|
| Hover over link | Next route chunk | `<link rel="prefetch">` |
| Focus on search input | Search index | Dynamic import |
| View page list | Next 5 pages | Background fetch |
| Enter edit mode | Editor chunk | Dynamic import |

```typescript
// Link prefetching on hover
function PrefetchLink(props: { href: string; children: JSX.Element }) {
  const [triggered, setTriggered] = createSignal(false);
  
  const prefetch = () => {
    if (triggered()) return;
    setTriggered(true);
    
    // Prefetch route chunk
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = `/assets/js/${props.href.replace(/\//g, '-')}.js`;
    document.head.appendChild(link);
  };
  
  return (
    <a
      href={props.href}
      onMouseEnter={prefetch}
      onFocus={prefetch}
    >
      {props.children}
    </a>
  );
}

// Search index prefetching
function SearchInput() {
  const [focused, setFocused] = createSignal(false);
  
  // Prefetch search index when input is focused
  createEffect(() => {
    if (focused()) {
      import('./lib/search-index').then(module => {
        module.preloadIndex(currentWikiId());
      });
    }
  });
  
  return (
    <input
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder="Search..."
    />
  );
}
```

### 2.3 Service Worker

**Objective:** Enable offline-first capability and intelligent caching.

```typescript
// sw.ts - Service Worker
const CACHE_NAME = 'kp-wikisites-v1';
const STATIC_ASSETS = [
  '/',
  '/assets/js/app-[hash].js',
  '/assets/css/app-[hash].css',
];

// Install: Cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Fetch: Cache-first for static, network-first for API
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Static assets: Cache-first
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(request).then(cached => {
        return cached || fetch(request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }
  
  // API calls: Network-first with cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }
  
  // HTML pages: Network-first
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match('/offline.html'))
    );
    return;
  }
});

// Activate: Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});
```

### 2.4 Data Prefetching Strategy

```typescript
// Predictive data loading
class DataPrefetcher {
  private prefetchQueue: Map<string, Promise<unknown>> = new Map();
  private observedPatterns: Map<string, string[]> = new Map();
  
  // Learn navigation patterns
  recordNavigation(from: string, to: string) {
    const patterns = this.observedPatterns.get(from) ?? [];
    patterns.push(to);
    this.observedPatterns.set(from, patterns.slice(-10)); // Keep last 10
  }
  
  // Prefetch based on patterns
  async prefetch(currentPage: string) {
    const likelyNext = this.observedPatterns.get(currentPage);
    if (!likelyNext) return;
    
    // Prefetch most common next pages
    const topPages = this.getTopPages(likelyNext, 3);
    await Promise.all(
      topPages.map(page => this.prefetchPage(page))
    );
  }
  
  private async prefetchPage(pageId: string) {
    if (this.prefetchQueue.has(pageId)) return;
    
    const promise = fetch(`/api/pages/${pageId}`)
      .then(res => res.json())
      .then(data => {
        // Cache in memory for quick access
        this.pageCache.set(pageId, data);
        return data;
      });
    
    this.prefetchQueue.set(pageId, promise);
  }
}
```

### Phase 2 Success Criteria

| Metric | Phase 1 Result | Target |
|---|---|---|
| LCP | 2.0s | <1.8s |
| TBT | 250ms | <150ms |
| TTI | 3.5s | <2.5s |
| Repeat visit weight | 300KB | <100KB |
| Offline capability | None | Basic offline |
| Search latency | 150ms | <80ms |

---

## Phase 3: Edge Optimization

### Duration: 2-3 weeks
### Goal: Leverage Cloudflare edge for global low-latency delivery

### 3.1 Workers Edge Computing

**Objective:** Move computation to the edge for sub-100ms responses.

| Route | Edge Strategy | Expected Latency |
|---|---|---|
| Page views | KV cache + edge render | <50ms TTFB |
| Search | Pre-built index in KV | <80ms |
| API responses | Edge caching + stale-while-revalidate | <60ms |
| Static assets | CDN edge cache | <20ms |
| Authentication | Session validation in KV | <30ms |

```typescript
// Worker with edge caching
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    // Check edge cache first
    const cache = caches.default;
    const cacheKey = new Request(url.toString(), request);
    const cached = await cache.match(cacheKey);
    
    if (cached) {
      // Return cached response with fresh headers
      const response = new Response(cached.body, cached);
      response.headers.set('X-Cache', 'HIT');
      response.headers.set('X-Cache-TTL', getRemainingTTL(cached));
      return response;
    }
    
    // Cache miss: compute response
    const response = await handleRequest(request, env);
    
    // Cache for 5 minutes (or custom TTL)
    const ttl = getRouteTTL(url.pathname);
    if (ttl > 0) {
      const responseToCache = new Response(response.body, response);
      responseToCache.headers.set('Cache-Control', `s-maxage=${ttl}`);
      responseToCache.headers.set('X-Cache', 'MISS');
      await cache.put(cacheKey, responseToCache);
    }
    
    return response;
  },
};
```

### 3.2 KV Caching Strategy

**Objective:** Achieve 95%+ cache hit rate for read-heavy operations.

| Content Type | Cache TTL | Invalidation | Strategy |
|---|---|---|---|
| Wiki pages | 5 minutes | On edit | Stale-while-revalidate |
| Page lists | 2 minutes | On create/delete | Cache + background refresh |
| Search index | 1 hour | On content change | Periodic rebuild |
| User sessions | 24 hours | On logout | Direct KV lookup |
| Wiki config | 1 hour | On settings change | Cache + event invalidation |

```typescript
// Stale-while-revalidate pattern
async function staleWhileRevalidate<T>(
  kv: KVNamespace,
  key: string,
  fetcher: () => Promise<T>,
  options: { ttl: number; staleTtl: number }
): Promise<{ data: T; source: 'cache' | 'fresh' | 'revalidated' }> {
  const cached = await kv.getWithMetadata<T>(key);
  
  if (cached.value) {
    const age = Date.now() - (cached.metadata as any)?.timestamp;
    
    // Fresh cache: return immediately
    if (age < options.ttl * 1000) {
      return { data: cached.value, source: 'cache' };
    }
    
    // Stale but usable: return stale, revalidate in background
    if (age < (options.ttl + options.staleTtl) * 1000) {
      // Background revalidation (non-blocking)
      fetcher().then(fresh => {
        kv.put(key, JSON.stringify(fresh), {
          metadata: { timestamp: Date.now() },
          expirationTtl: options.ttl + options.staleTtl,
        });
      });
      
      return { data: cached.value, source: 'revalidated' };
    }
  }
  
  // Cache miss or expired: fetch fresh
  const fresh = await fetcher();
  await kv.put(key, JSON.stringify(fresh), {
    metadata: { timestamp: Date.now() },
    expirationTtl: options.ttl + options.staleTtl,
  });
  
  return { data: fresh, source: 'fresh' };
}
```

### 3.3 R2 Edge Storage

**Objective:** Serve all assets from R2 for zero-egress global delivery.

| Asset Type | R2 Path | Cache Headers | Edge Strategy |
|---|---|---|---|
| Page content | `content/{wikiId}/{pageId}.json` | s-maxage=300 | KV cache + R2 fallback |
| Images | `images/{wikiId}/{hash}.{ext}` | max-age=31536000, immutable | CDN edge |
| Search indexes | `indexes/{wikiId}/search.json` | s-maxage=3600 | KV cache |
| Backups | `backups/{wikiId}/{date}.json` | no-cache | Direct access |
| User uploads | `uploads/{wikiId}/{userId}/{hash}.{ext}` | max-age=86400 | CDN edge |

```typescript
// R2 with edge caching and range requests
async function serveR2Object(
  bucket: R2Bucket,
  request: Request,
  key: string
): Promise<Response> {
  // Check cache
  const cache = caches.default;
  const cacheKey = new Request(new URL(key, request.url).toString(), request);
  const cached = await cache.match(cacheKey);
  
  if (cached && request.headers.get('Range')) {
    // Cache doesn't support range requests; fetch from R2
  } else if (cached) {
    return cached;
  }
  
  // Fetch from R2
  const object = await bucket.get(key, {
    range: request.headers.get('Range') ? parseRange(request.headers.get('Range')!) : undefined,
  });
  
  if (!object) {
    return new Response('Not Found', { status: 404 });
  }
  
  const response = new Response(object.body, {
    headers: {
      'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
      'Content-Length': object.size.toString(),
      'ETag': object.httpEtag,
      'Cache-Control': getCacheControl(key),
    },
  });
  
  // Cache successful responses
  if (response.ok) {
    const responseToCache = response.clone();
    await cache.put(cacheKey, responseToCache);
  }
  
  return response;
}
```

### 3.4 Edge Search

**Objective:** Sub-100ms search response from edge.

```typescript
// Edge search implementation
async function edgeSearch(
  request: Request,
  env: Env
): Promise<SearchResults> {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';
  const wikiId = url.searchParams.get('wiki') || '';
  
  // Get search index from KV (cached at edge)
  const indexKey = `search:${wikiId}`;
  const index = await env.KV.get(indexKey, { type: 'json' }) as SearchIndex;
  
  if (!index) {
    // Fallback: query D1 directly
    return d1Search(env.DB, wikiId, query);
  }
  
  // Perform search in-memory at edge
  const results = performSearch(index, query, {
    maxResults: 20,
    fuzzyThreshold: 0.3,
    boostTitle: 2.0,
    boostRecency: 1.5,
  });
  
  return {
    results: results.hits,
    total: results.total,
    query,
    duration: results.duration,
  };
}

// Build search index in background
async function buildSearchIndex(wikiId: string, env: Env): Promise<void> {
  const pages = await env.DB.prepare(
    'SELECT id, title, content, updated_at FROM pages WHERE wiki_id = ? AND deleted_at IS NULL'
  ).bind(wikiId).all();
  
  const index: SearchIndex = {
    wikiId,
    builtAt: Date.now(),
    pages: pages.results.map(page => ({
      id: page.id,
      title: page.title,
      tokens: tokenize(page.title + ' ' + page.content),
      updatedAt: page.updated_at,
    })),
  };
  
  // Store in KV
  await env.KV.put(`search:${wikiId}`, JSON.stringify(index), {
    expirationTtl: 3600,
  });
}
```

### Phase 3 Success Criteria

| Metric | Phase 2 Result | Target |
|---|---|---|
| TTFB (global) | 150ms | <80ms |
| TTFB (cached) | 100ms | <50ms |
| Cache hit rate | 80% | >95% |
| Search latency | 80ms | <50ms |
| API P95 | 200ms | <120ms |
| Offline support | Basic | Full offline read |

---

## Phase 4: Advanced Optimization

### Duration: 3-4 weeks
### Goal: Cutting-edge performance through ISR, streaming, and partial hydration

### 4.1 Incremental Static Regeneration (ISR)

**Objective:** Serve static pages with dynamic updates without full rebuilds.

```typescript
// ISR implementation with Cloudflare
interface ISRConfig {
  revalidate: number;    // Seconds between revalidations
  staleWhileRevalidate: number;  // Serve stale while rebuilding
  tags: string[];        // Cache tags for targeted invalidation
}

async function ISRHandler(
  request: Request,
  env: Env,
  config: ISRConfig
): Promise<Response> {
  const url = new URL(request.url);
  const cacheKey = `isr:${url.pathname}`;
  
  // Check cache
  const cached = await env.KV.getWithMetadata<ISRPage>(cacheKey);
  
  if (cached.value) {
    const age = (Date.now() - (cached.metadata as ISRMetadata).generatedAt) / 1000;
    
    // Fresh: serve from cache
    if (age < config.revalidate) {
      return new Response(cached.value.html, {
        headers: {
          'Content-Type': 'text/html',
          'X-ISR-Status': 'fresh',
          'X-ISR-Age': age.toFixed(0),
        },
      });
    }
    
    // Stale: serve stale, trigger background revalidation
    if (age < config.revalidate + config.staleWhileRevalidate) {
      // Non-blocking revalidation
      revalidatePage(url.pathname, env, config).catch(console.error);
      
      return new Response(cached.value.html, {
        headers: {
          'Content-Type': 'text/html',
          'X-ISR-Status': 'stale',
          'X-ISR-Age': age.toFixed(0),
        },
      });
    }
  }
  
  // Cache miss or expired: generate fresh page
  const page = await generatePage(url.pathname, env);
  
  await env.KV.put(cacheKey, JSON.stringify(page), {
    metadata: { generatedAt: Date.now(), tags: config.tags },
    expirationTtl: config.revalidate + config.staleWhileRevalidate,
  });
  
  return new Response(page.html, {
    headers: {
      'Content-Type': 'text/html',
      'X-ISR-Status': 'fresh',
    },
  });
}

// Targeted invalidation by tag
async function invalidateISR(
  env: Env,
  tags: string[]
): Promise<void> {
  // List all ISR cache entries
  const keys = await env.KV.list({ prefix: 'isr:' });
  
  for (const key of keys.keys) {
    const metadata = await env.KV.getWithMetadata(key.name);
    const entryTags = (metadata.metadata as ISRMetadata)?.tags ?? [];
    
    // If any tag matches, invalidate
    if (tags.some(tag => entryTags.includes(tag))) {
      await env.KV.delete(key.name);
    }
  }
}
```

### 4.2 Partial Hydration

**Objective:** Hydrate only interactive components; keep static content server-rendered.

```typescript
// Partial hydration strategy
const HYDRATION_LEVELS = {
  // No hydration needed (pure content)
  static: 'none',
  
  // Hydrate only on interaction
  interactive: 'lazy',
  
  // Hydrate immediately
  dynamic: 'eager',
};

// Component metadata for hydration decisions
interface HydrationManifest {
  components: {
    [id: string]: {
      level: 'none' | 'lazy' | 'eager';
      chunk: string;
      props: Record<string, unknown>;
    };
  };
}

// Server-side: Generate hydration manifest
function generateManifest(tree: ComponentTree): HydrationManifest {
  const manifest: HydrationManifest = { components: {} };
  
  function walk(node: ComponentNode, depth: number) {
    const hydrationLevel = classifyHydration(node);
    
    if (hydrationLevel !== 'none') {
      manifest.components[node.id] = {
        level: hydrationLevel,
        chunk: getChunkName(node.type),
        props: serializeProps(node.props),
      };
    }
    
    for (const child of node.children) {
      walk(child, depth + 1);
    }
  }
  
  walk(tree.root, 0);
  return manifest;
}

function classifyHydration(node: ComponentNode): 'none' | 'lazy' | 'eager' {
  // Static content: headings, paragraphs, lists
  if (isStaticComponent(node.type)) return 'none';
  
  // Interactive: search, forms, toggles
  if (isInteractiveComponent(node.type)) return 'lazy';
  
  // Dynamic: real-time data, animations
  if (isDynamicComponent(node.type)) return 'eager';
  
  return 'lazy'; // Default to lazy
}

// Client-side: Selective hydration
async function selectiveHydration(manifest: HydrationManifest) {
  // Eager: hydrate immediately
  for (const [id, config] of Object.entries(manifest.components)) {
    if (config.level === 'eager') {
      hydrateComponent(id, config);
    }
  }
  
  // Lazy: hydrate on interaction
  for (const [id, config] of Object.entries(manifest.components)) {
    if (config.level === 'lazy') {
      const element = document.getElementById(id);
      if (!element) continue;
      
      const interactionHandler = () => {
        hydrateComponent(id, config);
        element.removeEventListener('mouseenter', interactionHandler);
        element.removeEventListener('focusin', interactionHandler);
      };
      
      element.addEventListener('mouseenter', interactionHandler, { once: true });
      element.addEventListener('focusin', interactionHandler, { once: true });
    }
  }
  
  // None: skip hydration entirely
}
```

### 4.3 Streaming SSR

**Objective:** Stream HTML to client for faster TTFB and FCP.

```typescript
// Streaming SSR with SolidJS
async function streamSSR(request: Request, env: Env): Promise<Response> {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();
  
  // Start streaming HTML shell
  await writer.write(encoder.encode(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="/assets/css/app.css">
  <link rel="preload" href="/assets/js/app.js" as="script">
</head>
<body>
  <div id="app">`));
  
  // Stream content progressively
  const stream = renderToStream(() => <App request={request} env={env} />);
  
  // Write shell while content streams
  stream.onData((chunk) => {
    writer.write(encoder.encode(chunk));
  });
  
  // Close HTML after streaming completes
  stream.onEnd(async () => {
    await writer.write(encoder.encode(`
    </div>
    <script src="/assets/js/app.js" defer></script>
    <script>
      // Hydration data
      window.__SSR_DATA__ = ${JSON.stringify(getSSRData(request))};
    </script>
  </body>
</html>`));
    await writer.close();
  });
  
  stream.onError((error) => {
    console.error('SSR stream error:', error);
    writer.close();
  });
  
  return new Response(readable, {
    headers: {
      'Content-Type': 'text/html',
      'Transfer-Encoding': 'chunked',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
```

### 4.4 Edge-Side Includes (ESI)

**Objective:** Compose pages from multiple edge-cached fragments.

```typescript
// ESI-like composition at edge
async function composePage(
  request: Request,
  env: Env
): Promise<Response> {
  const url = new URL(request.url);
  
  // Fetch page fragments in parallel
  const [header, content, sidebar, footer] = await Promise.all([
    env.KV.get('fragment:header', { type: 'text' }),
    getPageContent(url.pathname, env),
    env.KV.get('fragment:sidebar', { type: 'text' }),
    env.KV.get('fragment:footer', { type: 'text' }),
  ]);
  
  // Compose final HTML
  const html = `<!DOCTYPE html>
<html lang="en">
<head>${getHead(url)}</head>
<body>
  <header>${header}</header>
  <main>${content}</main>
  <aside>${sidebar}</aside>
  <footer>${footer}</footer>
  <script src="/assets/js/app.js" defer></script>
</body>
</html>`;
  
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
```

### 4.5 Advanced Caching Patterns

```typescript
// Multi-tier caching with intelligent invalidation
class AdvancedCache {
  private l1: Map<string, CacheEntry>;  // In-memory (per-request)
  private l2: KVNamespace;              // Edge KV (global)
  private l3: R2Bucket;                 // Persistent storage
  
  async get<T>(
    key: string,
    options?: { l1?: boolean; l2?: boolean; l3?: boolean }
  ): Promise<{ data: T; source: 'l1' | 'l2' | 'l3' | 'miss' } | null> {
    const opts = { l1: true, l2: true, l3: true, ...options };
    
    // L1: In-memory (fastest)
    if (opts.l1) {
      const l1Entry = this.l1.get(key);
      if (l1Entry && !l1Entry.expired) {
        return { data: l1Entry.data, source: 'l1' };
      }
    }
    
    // L2: Edge KV (fast)
    if (opts.l2) {
      const l2Entry = await this.l2.getWithMetadata<T>(key);
      if (l2Entry.value) {
        // Promote to L1
        if (opts.l1) {
          this.l1.set(key, {
            data: l2Entry.value,
            timestamp: Date.now(),
            ttl: 60_000, // 1 minute in L1
          });
        }
        return { data: l2Entry.value, source: 'l2' };
      }
    }
    
    // L3: R2 (slower but persistent)
    if (opts.l3) {
      const l3Object = await this.l3.get(key);
      if (l3Object) {
        const data = await l3Object.json<T>() as T;
        // Promote to L2 and L1
        await this.l2.put(key, JSON.stringify(data), {
          expirationTtl: 300,
        });
        if (opts.l1) {
          this.l1.set(key, {
            data,
            timestamp: Date.now(),
            ttl: 60_000,
          });
        }
        return { data, source: 'l3' };
      }
    }
    
    return null;
  }
  
  async invalidate(key: string): Promise<void> {
    this.l1.delete(key);
    await this.l2.delete(key);
    // R2 cleanup is async and deferred
    this.l3.delete(key).catch(console.error);
  }
  
  async invalidatePattern(pattern: string): Promise<void> {
    const regex = new RegExp(pattern);
    
    // Invalidate L1
    for (const key of this.l1.keys()) {
      if (regex.test(key)) this.l1.delete(key);
    }
    
    // Invalidate L2
    const l2Keys = await this.l2.list();
    for (const key of l2Keys.keys) {
      if (regex.test(key.name)) {
        await this.l2.delete(key.name);
      }
    }
  }
}
```

### Phase 4 Success Criteria

| Metric | Phase 3 Result | Target |
|---|---|---|
| TTFB (global) | 80ms | <50ms |
| LCP (P75) | 1.8s | <1.5s |
| INP (P95) | 200ms | <150ms |
| TTI | 2.5s | <2.0s |
| Time to interactive | 2.5s | <1.5s |
| Cache hit rate | 95% | >98% |
| ISR revalidation | N/A | <30s |
| Streaming TTFB | N/A | <100ms |

---

## Overall Roadmap Timeline

```
Phase 1: Static Optimization (Weeks 1-3)
├── Image optimization
├── Code splitting
├── CSS optimization
└── Font strategy

Phase 2: Dynamic Optimization (Weeks 4-6)
├── Lazy loading
├── Prefetching
├── Service worker
└── Data prefetching

Phase 3: Edge Optimization (Weeks 7-9)
├── Workers edge computing
├── KV caching strategy
├── R2 edge storage
└── Edge search

Phase 4: Advanced (Weeks 10-13)
├── ISR
├── Partial hydration
├── Streaming SSR
└── ESI composition
```

## Dependencies and Prerequisites

| Phase | Prerequisites | Dependencies |
|---|---|---|
| Phase 1 | SolidJS setup, Vite config | None |
| Phase 2 | Phase 1 complete | Service worker registration |
| Phase 3 | Cloudflare account, Workers setup | D1 database, KV namespaces, R2 bucket |
| Phase 4 | Phase 3 complete | Streaming support, ISR infrastructure |
