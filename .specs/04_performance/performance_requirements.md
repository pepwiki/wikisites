# Performance Requirements

## Overview

Performance budgets and targets for Wikisites (Astro 5.x + SolidJS 1.9 + Cloudflare Pages). All new components are tiered by impact and lazy-loaded. Budgets enforce that no tier degrades the user experience below threshold.

## 1. Core Web Vitals Targets

| Metric | Target | Max | Measurement |
|---|---|---|---|
| LCP (P75) | <1.8s | <2.5s | Navigation start → largest contentful element |
| CLS (P75) | <0.05 | <0.1 | Session window (5s, 1s gap) |
| INP (P98) | <150ms | <200ms | All interactions, 98th percentile |
| FID (P75) | <50ms | <100ms | First input delay |

**TTFB targets by content type:**

| Content | Target | Cache Strategy |
|---|---|---|
| Static wiki page | <50ms | KV cache, 5 min TTL |
| Uncached wiki page | <150ms | D1 query + KV cache |
| Search results | <80ms | Pre-built index in KV |
| Static assets | <15ms | CDN edge, immutable |
| API responses | <100ms | Stale-while-revalidate |

## 2. Bundle Size Budgets Per Tier

### Tier Budgets (gzipped)

| Tier | Components | JS Budget | CSS Budget | Total Budget | Loading |
|---|---|---|---|---|---|
| **P0** | Command Palette, Keyboard Shortcuts, Outline Panel, Breadcrumbs | 12KB | 3KB | 15KB | Palette/Outline lazy, Shortcuts/Breadcrumbs eager |
| **P1** | KaTeX, force-graph, Split Pane, Regex Search | 340KB | 10KB | 350KB | All lazy, on-demand |
| **P2** | Giscus, Annotations, User Accounts | 30KB | 5KB | 35KB | All lazy, on user action |
| **P3** | TipTap, Diff Viewer | 210KB | 5KB | 215KB | All lazy, on edit mode |
| **P4** | Plugin API, Theme Engine, Settings | 8KB | 2KB | 10KB | Theme eager, rest lazy |

### Cumulative Budget

| Metric | Target | Maximum |
|---|---|---|
| Base app (no new components) | 60KB JS | 100KB JS |
| P0 added | +72KB | +85KB |
| P0+P1 added | +212KB | +250KB |
| P0+P1+P2 added | +242KB | +295KB |
| P0+P1+P2+P3 added | +442KB | +510KB |
| All tiers loaded | +450KB | +520KB |
| **Total with all tiers** | **<500KB** | **<600KB** |
| Total CSS | <30KB | <50KB |
| Total page weight (all resources) | <500KB | <750KB |

### Per-Component Budgets

| Component | Size (gzipped) | Max | Loading Strategy |
|---|---|---|---|
| Command Palette | ~5KB | 7KB | Lazy, dynamic import on Cmd+K |
| Keyboard Shortcuts | ~1KB | 2KB | Eager, bundled with app shell |
| Outline Panel | ~5KB | 7KB | Lazy, dynamic import on toggle |
| Breadcrumbs | ~1KB | 2KB | Eager, static content |
| KaTeX | ~300KB | 320KB | Lazy, dynamic import on math block |
| force-graph | ~45KB | 55KB | Lazy, dynamic import on graph view |
| Split Pane | ~0KB | 1KB | Lazy, near-zero (CSS only) |
| Regex Search | ~0KB | 1KB | Lazy, near-zero (logic only) |
| Giscus | ~15KB | 20KB | Lazy, dynamic import on scroll to comments |
| Annotations | ~10KB | 15KB | Lazy, dynamic import on annotation trigger |
| User Accounts | ~5KB | 8KB | Lazy, dynamic import on login click |
| TipTap | ~200KB | 220KB | Lazy, dynamic import on edit mode |
| Diff Viewer | ~10KB | 15KB | Lazy, dynamic import on diff view |
| Plugin API | ~5KB | 8KB | Lazy, dynamic import on plugin load |
| Theme Engine | ~2KB | 3KB | Eager, applied on page load |
| Settings | ~1KB | 2KB | Lazy, dynamic import on settings open |

## 3. Lazy Loading Strategy

### Loading Classification

```
Eager (bundled with shell, ~2KB total):
  - Keyboard Shortcuts (1KB)
  - Breadcrumbs (1KB)
  - Theme Engine (2KB)

Lazy - UI Components (on user trigger):
  - Command Palette (5KB) → Cmd+K / Ctrl+K
  - Outline Panel (5KB) → Toggle button click
  - Settings (1KB) → Settings icon click
  - User Accounts (5KB) → Login button click

Lazy - Content Renderers (on content need):
  - KaTeX (300KB) → Math block detection in markdown
  - force-graph (45KB) → Graph view toggle
  - Regex Search (0KB) → Search input focus + regex mode
  - Split Pane (0KB) → Split view toggle

Lazy - Heavy Editors (on edit mode):
  - TipTap (200KB) → Edit button click
  - Diff Viewer (10KB) → Diff view toggle

Lazy - Social/External (on scroll):
  - Giscus (15KB) → Scroll to comments section
  - Annotations (10KB) → Annotation trigger

Lazy - Extensions:
  - Plugin API (5KB) → First plugin load
```

### Dynamic Import Pattern

```typescript
// Astro island pattern for lazy components
// src/components/islands/CommandPaletteIsland.tsx
import { lazy, Suspense } from 'solid-js';

const CommandPalette = lazy(() => import('../CommandPalette'));

export function CommandPaletteIsland() {
  return (
    <Suspense fallback={null}>
      <CommandPalette />
    </Suspense>
  );
}
```

### Loading Priority Map

| Priority | Trigger | Components | Max Wait |
|---|---|---|---|
| P0-critical | Page load | Shortcuts, Breadcrumbs, Theme | 0ms (eager) |
| P0-interactive | User input | Command Palette, Outline Panel | 100ms |
| P1-content | Content render | KaTeX, force-graph, Regex | 200ms |
| P2-social | Scroll/trigger | Giscus, Annotations, Accounts | 500ms |
| P3-editor | Edit mode | TipTap, Diff Viewer | 1000ms |
| P4-extension | Plugin load | Plugin API, Settings | 500ms |

## 4. Code Splitting Plan

### Vite Manual Chunks

```typescript
// astro.config.mjs - vite config
vite: {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core app shell
          'app-core': ['solid-js', 'solid-js/web'],
          // Heavy libraries (each in own chunk)
          'vendor-katex': ['katex'],
          'vendor-tiptap': ['@tiptap/core', '@tiptap/starter-kit'],
          'vendor-force-graph': ['force-graph'],
          'vendor-giscus': ['@giscus/react'],
          // Shared utilities
          'utils-search': ['./src/lib/search'],
          'utils-markdown': ['./src/lib/markdown'],
        },
      },
    },
    target: 'es2022',
  },
}
```

### Chunk Naming Convention

```
assets/js/
├── app-[hash].js           # Core shell (60KB)
├── vendor-katex-[hash].js  # KaTeX (300KB)
├── vendor-tiptap-[hash].js # TipTap (200KB)
├── vendor-force-[hash].js  # force-graph (45KB)
├── ui-palette-[hash].js    # Command Palette (5KB)
├── ui-outline-[hash].js    # Outline Panel (5KB)
├── ui-diff-[hash].js       # Diff Viewer (10KB)
├── social-giscus-[hash].js # Giscus (15KB)
├── ext-plugins-[hash].js   # Plugin API (5KB)
└── shared-[hash].js        # Shared utilities (10KB)
```

### Astro Islands Configuration

```astro
---
// Each tier-1+ component gets its own island
// Only the eagerly-needed islands are included in the base HTML
import CommandPalette from '../components/islands/CommandPaletteIsland';
import OutlinePanel from '../components/islands/OutlinePanelIsland';

// Tier-0 components that are eager
import Breadcrumbs from '../components/Breadcrumbs';
import KeyboardShortcuts from '../components/KeyboardShortcuts';
import ThemeEngine from '../components/ThemeEngine';
---

<Layout>
  <Breadcrumbs />
  <KeyboardShortcuts />
  <ThemeEngine />
  <!-- Lazy islands loaded via client:idle or client:visible -->
  <CommandPalette client:idle />
  <OutlinePanel client:visible />
</Layout>
```

## 5. Font Loading Strategy

### KaTeX Fonts

KaTeX requires math fonts. Strategy: load on-demand when first math block is detected.

```typescript
// Font loading for KaTeX
let katexFontsLoaded = false;

async function loadKaTeXFonts() {
  if (katexFontsLoaded) return;

  // Preload critical KaTeX font files
  const fonts = [
    '/fonts/KaTeX_Main-Regular.woff2',
    '/fonts/KaTeX_Math-Italic.woff2',
    '/fonts/KaTeX_Size1-Regular.woff2',
  ];

  await Promise.all(
    fonts.map(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    })
  );

  katexFontsLoaded = true;
}

// Load fonts when KaTeX component is loaded
const KaTeX = lazy(async () => {
  await loadKaTeXFonts();
  return import('./KaTeXRenderer');
});
```

### System Font Stack (Primary)

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
}
code, pre {
  font-family: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono',
    'Lucida Console', Monaco, monospace;
}
```

### KaTeX Font Fallback

```css
.katex { font-family: 'KaTeX_Main', 'Times New Roman', serif; }
.katex-math italic { font-family: 'KaTeX_Math', serif; font-style: italic; }
```

## 6. Image Optimization

| Format | Target | Fallback |
|---|---|---|
| WebP | Primary format | JPEG/PNG |
| AVIF | Modern browsers | WebP |
| SVG | Icons, diagrams | N/A |

```astro
---
// Astro image component with responsive srcset
const { src, alt, width, height } = Astro.props;
---

<picture>
  <source srcset={`${src}?w=400&f=avif`} type="image/avif" />
  <source srcset={`${src}?w=400&f=webp`} type="image/webp" />
  <img
    src={`${src}?w=800`}
    alt={alt}
    width={width}
    height={height}
    loading="lazy"
    decoding="async"
    fetchpriority="low"
  />
</picture>
```

### Image Budget

| Resource | Budget | Max |
|---|---|---|
| Above-fold images | 50KB | 100KB |
| Below-fold images | 150KB | 300KB |
| Icons | 5KB | 10KB |
| Placeholders | 2KB | 5KB |

## 7. Cache Strategy

### Service Worker

```typescript
// sw.ts - Workbox-based service worker
const CACHE_VERSION = 'v1';

// Static assets: Cache-first, immutable
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const STATIC_ASSETS = [
  '/assets/js/app-*.js',
  '/assets/css/app-*.css',
  '/assets/fonts/*.woff2',
];

// HTML pages: Network-first, offline fallback
const PAGE_CACHE = `pages-${CACHE_VERSION}`;

// API: Stale-while-revalidate
const API_CACHE = `api-${CACHE_VERSION}`;
```

### Cache TTL by Resource Type

| Resource | TTL | Strategy |
|---|---|---|
| JS/CSS bundles | 1 year | Immutable (hash in filename) |
| Fonts | 1 year | Immutable |
| HTML pages | 5 min | Stale-while-revalidate |
| API responses | 1 min | Stale-while-revalidate |
| Images | 30 days | Cache-first |
| Search index | 1 hour | Background refresh |
| Giscus widget | Session | Network-first |

### CDN Headers (Cloudflare Pages)

```
/_astro/*:
  Cache-Control: public, max-age=31536000, immutable

/*.html:
  Cache-Control: public, s-maxage=300, stale-while-revalidate=600

/assets/js/vendor-*:
  Cache-Control: public, max-age=31536000, immutable
```

## 8. Performance Monitoring

### Alert Thresholds

| Metric | Warning | Critical | Action |
|---|---|---|---|
| LCP P75 | >2.0s | >2.5s | Investigate LCP element |
| CLS P75 | >0.08 | >0.1 | Fix layout shifts |
| TTFB P75 | >120ms | >200ms | Check cache hit rate |
| Bundle size | >500KB | >600KB | Audit new components |
| INP P98 | >150ms | >200ms | Profile event handlers |
| Error rate | >1% | >5% | Investigate errors |

### Regression Detection

```typescript
// 10% regression threshold on any metric
function checkRegression(current: number, baseline: number): 'pass' | 'warn' | 'fail' {
  const change = (current - baseline) / baseline;
  if (change > 0.25) return 'fail';
  if (change > 0.10) return 'warn';
  return 'pass';
}
```

### CI Integration

```yaml
# Bundle size check on every PR
- name: Check bundle size
  run: |
    npx bundlesize --config .bundlesizerc.json
    # Fail if any chunk exceeds budget
```

```json
// .bundlesizerc.json
{
  "files": [
    { "path": "dist/assets/js/app-*.js", "maxSize": "100kb" },
    { "path": "dist/assets/js/vendor-katex-*.js", "maxSize": "320kb" },
    { "path": "dist/assets/js/vendor-tiptap-*.js", "maxSize": "220kb" },
    { "path": "dist/assets/css/app-*.css", "maxSize": "30kb" }
  ]
}
```
