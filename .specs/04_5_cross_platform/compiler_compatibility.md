---
document_id: XP-COMPILER-001
title: "Compiler and Toolchain Compatibility"
version: "1.0.0"
date: "2026-06-07"
status: DRAFT
authors:
  - name: "Wikisites Platform Engineering Team"
    role: "Primary Authors"
classification: "Internal — Phase 4.5 Cross-Platform Compatibility"
applicable_sites:
  - SHARED
  - ENCP
  - WIKI
abstract: >-
  Compiler and toolchain compatibility analysis for KP Wikisites. Covers Vite
  (esbuild/Rollup) target environments, TypeScript strict mode compatibility,
  SolidJS JSX transform requirements, Astro compiler targets, and Cloudflare
  Workers V8 engine compatibility. Defines build configuration, transpilation
  targets, and runtime environment constraints.
depends_on:
  - "04_performance/optimization_roadmap.md"
  - "01_research/YP-WEB-TECH-001.md"
  - "01_research/domain_constraints/domain_constraints_web.toml"
  - "02_architecture/BP-INFRA-CF-001.md"
---

# Compiler and Toolchain Compatibility

**Document ID:** XP-COMPILER-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** DRAFT

---

## Table of Contents

1. [Overview](#1-overview)
2. [Vite Build System](#2-vite-build-system)
3. [TypeScript Strict Mode](#3-typescript-strict-mode)
4. [SolidJS JSX Transform](#4-solidjs-jsx-transform)
5. [Astro Compiler](#5-astro-compiler)
6. [Cloudflare Workers V8 Engine](#6-cloudflare-workers-v8-engine)
7. [esbuild Compatibility](#7-esbuild-compatibility)
8. [Rollup Plugin Compatibility](#8-rollup-plugin-compatibility)
9. [PostCSS and Tailwind](#9-postcss-and-tailwind)
10. [ESLint and Linting](#10-eslint-and-linting)
11. [Build Output Analysis](#11-build-output-analysis)
12. [Environment-Specific Configurations](#12-environment-specific-configurations)

---

## 1. Overview

### 1.1 Purpose

This document defines the complete compiler and toolchain compatibility landscape for KP Wikisites. It specifies exact versions, configurations, target environments, and known limitations for every tool in the build pipeline. The goal is to ensure deterministic builds across all development environments and correct output for all target runtime environments.

### 1.2 Toolchain Inventory

| Tool | Version (Pinned) | Role | Target |
|------|-------------------|------|--------|
| Node.js | 20.x (LTS) | Runtime for build tools | Development/CI |
| TypeScript | 5.4+ | Type checking | Build-time |
| Vite | 5.x | Dev server + build tool | Build-time |
| esbuild | 0.20+ | Fast transpilation (via Vite) | Build-time |
| Rollup | 4.x | Bundle generation (via Vite) | Build-time |
| Astro | 4.x | Static site generation + islands | Build-time |
| SolidJS | 1.8+ | UI runtime | Client + SSR |
| Tailwind CSS | 4.x | Utility-first CSS | Build-time |
| PostCSS | 8.x | CSS transformation | Build-time |
| Vitest | 1.x | Unit/integration testing | Build-time |
| Playwright | 1.x | E2E testing | Build-time |
| Wrangler | 3.x | Cloudflare Workers deployment | Build-time |

### 1.3 Target Environments

| Environment | Runtime | JS Engine | ES Target | Notes |
|-------------|---------|-----------|-----------|-------|
| Client (modern browsers) | Browser | V8/SpiderMonkey/JSC | ES2022 | Main client bundle |
| Client (fallback) | Browser | V8/SpiderMonkey/JSC | ES2020 | Fallback for older browsers |
| Cloudflare Worker | V8 Isolate | V8 12.x | ES2022 | Edge compute |
| Cloudflare Pages | Static | N/A (pre-rendered) | ES2022 | Static HTML/CSS/JS |
| Node.js (build) | Node.js | V8 | ES2022 | Build pipeline only |
| Node.js (test) | Node.js | V8 | ES2022 | Test runner |

---

## 2. Vite Build System

### 2.1 Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],

  build: {
    // Target: last 2 major versions of all supported browsers
    target: 'es2022',

    // Module format: ESM for modern browsers
    modulePreload: {
      polyfill: true, // Polyfill for module preload in older browsers
    },

    // Output configuration
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,

    // Rollup-specific options
    rollupOptions: {
      output: {
        // Manual chunk splitting
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

    // Minification
    minify: 'esbuild', // Use esbuild for faster builds (Rollup fallback for production)

    // CSS code splitting
    cssCodeSplit: true,

    // Report compressed size
    reportCompressedSize: true,

    // Chunk size warning limit (bytes)
    chunkSizeWarningLimit: 100000, // 100KB
  },

  // SSR configuration for Cloudflare Workers
  ssr: {
    // External dependencies that should not be bundled for SSR
    external: ['cloudflare:workers'],

    // Target for SSR output
    target: 'node',
  },
});
```

### 2.2 Vite Target Environment Details

| Target | ES Version | Features Included | Browser Coverage |
|--------|-----------|-------------------|------------------|
| `es2022` | ES2022 | Top-level await, `Array.at()`, `Object.hasOwn()`, `Error.cause`, class fields | Chrome 108+, Firefox 109+, Safari 16.4+, Edge 108+ |
| `es2021` | ES2021 | `String.replaceAll()`, `Promise.any()`, `WeakRef` | Chrome 85+, Firefox 79+, Safari 14+, Edge 85+ |
| `es2020` | ES2020 | `BigInt`, `globalThis`, `import.meta`, `Promise.allSettled()` | Chrome 80+, Firefox 72+, Safari 13+, Edge 80+ |

### 2.3 Vite Plugin Compatibility

| Plugin | Version | Vite Compatibility | Notes |
|--------|---------|-------------------|-------|
| `vite-plugin-solid` | 2.x | Vite 5.x | SolidJS JSX transform integration |
| `@astrojs/solid-js` | 4.x | Astro 4.x | Astro island integration |
| `vite-plugin-pwa` | 0.19+ | Vite 5.x | Service worker generation |
| `rollup-plugin-visualizer` | 0.10+ | Rollup 4.x | Bundle analysis |
| `vite-plugin-compression` | 0.5+ | Vite 5.x | Brotli/Gzip pre-compression |
| `@tailwindcss/vite` | 4.x | Vite 5.x | Tailwind CSS integration |

### 2.4 Known Vite Issues

| ID | Issue | Impact | Workaround |
|----|-------|--------|------------|
| VI-001 | Vite 5 HMR may cause SolidJS state loss during fast refresh | Development only | Full page reload for complex state changes |
| VI-002 | `ssrExternal` does not handle all Cloudflare Workers bindings | SSR build | Use `ssr.noExternal` for specific packages |
| VI-003 | Rollup 4 may produce slightly different chunk boundaries than Rollup 3 | Build output | Acceptable; no functional difference |

---

## 3. TypeScript Strict Mode

### 3.1 TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    // Language and environment
    "target": "ES2022",
    "module": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable", "WebWorker"],
    "moduleResolution": "bundler",

    // Strict mode — ALL flags enabled
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": false, // Incompatible with some library types
    "noPropertyAccessFromIndexSignature": true,

    // Build and output
    "outDir": "./dist",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,

    // Module resolution
    "resolveJsonModule": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,

    // Astro compatibility
    "jsx": "preserve",
    "jsxImportSource": "solid-js",

    // Path aliases
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@lib/*": ["./src/lib/*"],
      "@styles/*": ["./src/styles/*"]
    }
  },
  "include": ["src/**/*", "astro.config.ts"],
  "exclude": ["node_modules", "dist"]
}
```

### 3.2 Strict Mode Flags and Impact

| Flag | Enabled | Impact | Library Compatibility |
|------|---------|--------|----------------------|
| `strictNullChecks` | Yes | Catches null/undefined errors at compile time | All target libraries compatible |
| `strictFunctionTypes` | Yes | Prevents unsafe function type contravariance | All target libraries compatible |
| `strictBindCallApply` | Yes | Type-checks `bind`, `call`, `apply` arguments | All target libraries compatible |
| `noImplicitAny` | Yes | Requires explicit type annotations | All target libraries provide types |
| `noImplicitThis` | Yes | Errors on `this` with implicit `any` type | All target libraries compatible |
| `alwaysStrict` | Yes | Emits `"use strict"` in every output file | ES modules are strict by default |
| `useUnknownInCatchVariables` | Yes | Types caught errors as `unknown` instead of `any` | Requires explicit type narrowing |
| `noUncheckedIndexedAccess` | Yes | Index signatures return `T | undefined` | Some library type definitions may need `!` assertion |
| `noImplicitOverride` | Yes | Requires `override` keyword on overridden methods | All target libraries compatible |

### 3.3 SolidJS TypeScript Compatibility

| SolidJS Feature | TypeScript Support | Notes |
|-----------------|-------------------|-------|
| JSX/TSX components | Full | `jsxImportSource: "solid-js"` required |
| `createSignal<T>()` | Full | Generic type inference works |
| `createEffect()` | Full | Effect dependencies typed automatically |
| `createResource()` | Full | Return type inferred from fetcher |
| `JSX.Element` | Full | Proper JSX type definitions |
| `Component<Props>` | Full | Props type inference works |
| `FlowComponent` | Full | Flow control components typed |
| Store reactivity (`createStore`) | Full | Deep proxy types handled |
| `For`, `Show`, `Switch` | Full | Component prop types correct |
| `lazy()` | Full | Returns typed lazy component |
| `Suspense` | Full | Fallback and children typed |

### 3.4 TypeScript Version-Specific Features

| Feature | TS Version | Used In | Notes |
|---------|-----------|---------|-------|
| `satisfies` operator | 4.9+ | Config objects | Runtime-safe type checking |
| `const` type parameters | 5.0+ | Utility types | Inferred literal types |
| `#private` fields | 5.0+ | Class internals | ECMAScript private fields |
| Decorator metadata | 5.2+ | Not yet used | Reserved for future use |
| `isolatedDeclarations` | 5.5+ | Not yet used | Faster declaration emit |

### 3.5 Strict Mode Build Verification

```bash
# TypeScript strict mode compilation check
tsc --noEmit --strict

# Expected output: zero errors
# This command runs in CI on every PR
# Build fails if any type errors are introduced
```

---

## 4. SolidJS JSX Transform

### 4.1 JSX Configuration

SolidJS uses a custom JSX transform that differs significantly from React's JSX transform. The transform must be correctly configured for both Astro and Vite.

| Configuration | Value | Notes |
|---------------|-------|-------|
| `jsx` | `"preserve"` | Pass JSX through to Vite/SolidJS plugin |
| `jsxImportSource` | `"solid-js"` | Import source for JSX types |
| `jsxRuntime` | `"automatic"` | Use automatic JSX runtime (no manual `import { h }`) |
| `development` | `false` in prod, `true` in dev | Enables development warnings |

### 4.2 SolidJS JSX Transform Behavior

```typescript
// What SolidJS JSX transform does:
// Input:
<div class="foo" onClick={() => console.log('clicked')}>
  <Show when={condition()}>
    <p>{message()}</p>
  </Show>
</div>

// Output (after transform):
_$createElement("div", {
  get class() { return "foo"; },  // Getter for reactive tracking
  get onClick() { return () => console.log('clicked'); }
}, () => [
  _$createComponent(Show, {
    get when() { return condition(); }
  }, () => [
    () => _$createElement("p", null, () => message())
  ])
]);
```

### 4.3 Astro SolidJS Island Configuration

```typescript
// astro.config.ts
import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';

export default defineConfig({
  integrations: [
    solid({
      // Include: which files to treat as SolidJS components
      include: ['**/*.tsx', '**/*.jsx'],

      // Exclude: files that should NOT be processed by SolidJS
      exclude: [],

      // Devtools: enable in development only
      devtools: process.env.NODE_ENV === 'development',

      // JSX options
      jsxImportSource: 'solid-js',
    }),
  ],
});
```

### 4.4 Astro Islands Hydration

| Hydration Strategy | Directive | When JS Loads | When JS Executes | Use Case |
|-------------------|-----------|---------------|------------------|----------|
| Immediate | `client:load` | On page load | Immediately | Critical interactive components (search, nav) |
| Visible | `client:visible` | When scrolled into view | On intersection | Molecular viewer, quiz interface |
| Idle | `client:idle` | When browser is idle | After `requestIdleCallback` | Non-critical interactive elements |
| Media query | `client:media` | When media query matches | On match | Responsive components (mobile nav) |
| Never | (none) | Never | Never | Static content (headings, paragraphs) |

### 4.5 Known SolidJS JSX Transform Issues

| ID | Issue | Impact | Workaround |
|----|-------|--------|------------|
| SJ-001 | SolidJS JSX transform may emit unnecessary getters for non-reactive props | Minor bundle size increase | Acceptable; Vite optimizes dead code |
| SJ-002 | `Show` component with `fallback` prop creates extra DOM node when condition is false | Minor DOM overhead | Use ternary in template when performance-critical |
| SJ-003 | `For` component keying may cause unnecessary re-renders with complex keys | Performance on large lists | Use simple, stable keys (IDs, not indexes) |
| SJ-004 | Astro's JSX transform may conflict with SolidJS if both are loaded | Build error | Ensure only one JSX framework is active per component |

---

## 5. Astro Compiler

### 5.1 Astro Configuration

```typescript
// astro.config.ts
import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import tailwind from '@tailwindcss/vite';
import { vitePluginCompression } from 'vite-plugin-compression';

export default defineConfig({
  // Output: static for most pages, server for dynamic routes
  output: 'static',

  // Adapter: Cloudflare for edge deployment
  // adapter: cloudflare(), // Uncomment when deploying

  // Integrations
  integrations: [
    solid(),
  ],

  // Vite plugins
  vite: {
    plugins: [
      tailwind(),
      vitePluginCompression({ algorithm: 'brotliCompress' }),
      vitePluginCompression({ algorithm: 'gzip' }),
    ],
    build: {
      target: 'es2022',
    },
  },

  // Markdown configuration
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
    remarkPlugins: [],
    rehypePlugins: [],
  },

  // Build configuration
  build: {
    // Inline small assets (< 4KB)
    inlineStylesheets: 'auto',

    // Format for output files
    format: 'file', // Produces .html files instead of /index.html
  },

  // HTML head tags
  vite: {
    css: {
      preprocessorOptions: {},
    },
  },
});
```

### 5.2 Astro Output Modes

| Mode | Description | Use Case | Build Output |
|------|-------------|----------|--------------|
| `static` | Pre-rendered HTML at build time | Most pages (wiki content, monographs) | `.html` files |
| `server` | Rendered on request at edge | Dynamic pages (search results, user dashboards) | Worker script |
| `hybrid` | Mix of static and server | Static content with dynamic islands | Both HTML and Worker |

### 5.3 Astro Content Collections

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const wikiPages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    locale: z.enum(['en', 'es', 'fr', 'de', 'zh', 'ja']),
    tags: z.array(z.string()),
    category: z.enum(['tutorial', 'reference', 'guide']),
    lastUpdated: z.date(),
    authors: z.array(z.string()),
  }),
});

const monographs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    iupacName: z.string(),
    aliases: z.array(z.string()),
    casNumber: z.string().optional(),
    chainLength: z.enum(['di', 'tri', 'tetra', 'penta', 'hexa', 'hepta', 'octa', 'nona', 'deca', 'other']),
    functionalCategory: z.array(z.string()),
    pdbId: z.string().optional(),
    smiles: z.string().optional(),
  }),
});

export const collections = {
  'wiki-pages': wikiPages,
  'monographs': monographs,
};
```

### 5.4 Astro Build Pipeline

```
┌─────────────────────────────────────┐
│  1. Content Collection Processing   │
│  - MDX parsing and validation       │
│  - Frontmatter schema validation    │
│  - Content indexing for search      │
│  Target: <10s                       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  2. Page Generation                 │
│  - Static pages (pre-render)        │
│  - Dynamic routes (deferred)        │
│  - Sitemap generation               │
│  Target: <30s                       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  3. SolidJS Island Compilation      │
│  - JSX transform (esbuild)          │
│  - Component tree shaking           │
│  - Hydration manifest generation    │
│  Target: <20s                       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  4. Asset Optimization              │
│  - Image optimization (Sharp)       │
│  - CSS purging (Tailwind)           │
│  - JS minification (esbuild)       │
│  - Brotli/Gzip compression          │
│  Target: <30s                       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  5. Output Generation               │
│  - HTML files                       │
│  - Hashed asset files               │
│  - Source maps                      │
│  - Build manifest                   │
│  Target: <20s                       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│  6. Post-Build Validation           │
│  - HTML validation                  │
│  - Link checking                    │
│  - Bundle size analysis             │
│  - Lighthouse CI                    │
│  Target: <30s                       │
└─────────────────────────────────────┘
```

### 5.5 Known Astro Issues

| ID | Issue | Impact | Workaround |
|----|-------|--------|------------|
| AS-001 | Astro 4.x may generate incorrect `hreflang` tags for non-default locales | SEO | Validate hreflang in post-build; manual correction if needed |
| AS-002 | Content collection type inference may be slow for large collections (>1000 entries) | Build time | Use `--verbose` flag to monitor; split collections if needed |
| AS-003 | Astro's `client:visible` may hydrate components before they are actually visible (IntersectionObserver margin) | Performance | Set explicit `rootMargin` in component config |

---

## 6. Cloudflare Workers V8 Engine

### 6.1 V8 Engine Version

| Cloudflare Workers Runtime | V8 Version | ES Features |
|---------------------------|------------|-------------|
| Current stable | V8 12.x | ES2023+ |
| Edge runtime | V8 12.x | ES2023+ |

### 6.2 V8 Isolate Constraints

| Constraint | Value | Impact |
|-----------|-------|--------|
| CPU time (free) | 10ms per request | Worker logic must complete quickly |
| CPU time (paid) | 30s per request | Allows complex operations |
| Memory | 128MB per isolate | Limits data structures in memory |
| Worker script size | 1MB (compressed) after minification | Must keep codebase small |
| Subrequests | 50 (free), 1000 (paid) | Limits external API calls |
| KV reads | 1000/s per key | Limits concurrent KV access |
| KV writes | 1/s per key | Limits write frequency |
| D1 reads | 1M/day (free) | Limits query volume |
| D1 writes | 100K/day (free) | Limits write volume |
| R2 storage | 10GB (free) | Limits asset storage |
| R2 Class A ops | 1M/month (free) | Limits read operations |
| R2 Class B ops | 10M/month (free) | Limits write operations |

### 6.3 V8 Feature Support on Workers

| Feature | Support | Notes |
|---------|---------|-------|
| ES2022 | Full | Top-level await supported |
| ES2023 | Full | `Array.findLast()`, `HasOwn` |
| `import.meta` | Full | Available in ES modules |
| `import()` | Full | Dynamic imports supported |
| Web Workers API | Limited | Isolates are single-threaded |
| `fetch()` | Full | Standard `fetch` available |
| `Cache API` | Full | `caches.default` available |
| `Web Crypto` | Full | `crypto.subtle` available |
| `WebSocket` | Full | Client WebSocket supported |
| `HTMLRewriter` | Full | Cloudflare-specific API |
| `Durable Objects` | Full | Cloudflare-specific API |
| `KV` | Full | Cloudflare-specific API |
| `D1` | Full | Cloudflare-specific API |
| `R2` | Full | Cloudflare-specific API |
| Node.js builtins | Partial | `node:buffer`, `node:crypto` partially supported |
| `process.env` | No | Use `env` parameter instead |
| `fs` / `path` | No | No filesystem access in isolates |

### 6.4 Workers Bundle Format

```typescript
// Workers entry point format
export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    // env contains bindings: KV, D1, R2, Durable Objects
    // ctx.waitUntil() for background tasks
    // ctx.passThroughOnException() for error handling
    return new Response('Hello World');
  },

  // Optional: scheduled handler for cron triggers
  async scheduled(
    event: ScheduledEvent,
    env: Env,
    ctx: ExecutionContext
  ): Promise<void> {
    // Scheduled tasks (e.g., search index rebuild)
  },
};

// Type definitions for bindings
interface Env {
  KV: KVNamespace;
  DB: D1Database;
  R2: R2Bucket;
  WIKI_COLLABORATOR: DurableObjectNamespace;
  API_KEY: string;
}
```

### 6.5 Workers Limitations and Workarounds

| Limitation | Workaround | Affected Feature |
|-----------|------------|------------------|
| 128MB memory limit | Stream large responses; paginate results | Large wiki page rendering |
| 10ms CPU (free tier) | Use paid tier for dynamic routes; optimize algorithms | All worker-based features |
| No filesystem | Bundle all assets at build time; use R2 for runtime data | Static assets, configuration |
| No `process.env` | Use `env` bindings; define secrets via `wrangler secret` | API keys, configuration |
| No `node:*` builtins | Use web-standard APIs; polyfill if needed | Node.js-specific library code |
| Single-threaded isolates | Use Durable Objects for shared state; avoid CPU-heavy operations | Wiki collaboration |
| 1MB script size | Code splitting; lazy load routes; tree shaking | Bundle optimization |

---

## 7. esbuild Compatibility

### 7.1 esbuild Configuration

| Option | Value | Notes |
|--------|-------|-------|
| Target | `es2022` | Matches Vite build target |
| JSX | `preserve` | Pass JSX through for SolidJS plugin |
| JSX factory | N/A | Handled by SolidJS plugin |
| JSX fragment | N/A | Handled by SolidJS plugin |
| Format | `esm` | ES modules output |
| Bundle | `true` | Bundle all dependencies |
| Minify | `true` | Minify output for production |
| Sourcemap | `true` | Generate source maps for debugging |
| Tree shaking | `enabled` | Remove unused code |

### 7.2 esbuild Feature Support

| Feature | Support | Notes |
|---------|---------|-------|
| TypeScript | Full | Transpiles TS/TSX natively |
| JSX | Full | Automatic JSX transform |
| ES2022 | Full | Target syntax supported |
| CSS modules | Full | CSS module support |
| JSON imports | Full | `import data from './data.json'` |
| Dynamic imports | Full | `import('./lazy-module')` |
| `define` | Full | Build-time constant replacement |
| `alias` | Full | Path aliasing |
| `external` | Full | Exclude dependencies from bundle |

### 7.3 esbuild vs Rollup Trade-offs

| Criterion | esbuild | Rollup | Winner |
|-----------|---------|--------|--------|
| Build speed | 10-100x faster | Standard | esbuild |
| Plugin ecosystem | Limited | Extensive | Rollup |
| Code splitting | Basic | Advanced | Rollup |
| Tree shaking | Good | Excellent | Rollup |
| Source maps | Good | Excellent | Rollup |
| CSS handling | Basic | Advanced | Rollup |
| Output optimization | Good | Excellent | Rollup |
| Use case in Vite | Dev server, initial build | Production build | Complementary |

---

## 8. Rollup Plugin Compatibility

### 8.1 Required Rollup Plugins

| Plugin | Version | Purpose | Vite Integration |
|--------|---------|---------|------------------|
| `@rollup/plugin-node-resolve` | 15.x | Resolve node_modules | Built into Vite |
| `@rollup/plugin-commonjs` | 25.x | Convert CJS to ESM | Built into Vite |
| `@rollup/plugin-json` | 6.x | Import JSON files | Built into Vite |
| `@rollup/plugin-terser` | 0.4+ | Minification | Via Vite `minify` option |
| `rollup-plugin-visualizer` | 0.10+ | Bundle analysis | Manual integration |
| `@solidjs/vite-plugin-solid` | 2.x | SolidJS JSX transform | Vite plugin |
| `vite-plugin-compression` | 0.5+ | Brotli/Gzip compression | Vite plugin |

### 8.2 Rollup Output Configuration

```typescript
// Rollup output options (via Vite)
rollupOptions: {
  output: {
    // Manual chunk splitting
    manualChunks(id) {
      if (id.includes('node_modules/solid-js')) {
        return 'vendor-solid';
      }
      if (id.includes('node_modules/@solidjs')) {
        return 'vendor-solid-router';
      }
      if (id.includes('node_modules/marked') || id.includes('node_modules/highlight.js')) {
        return 'vendor-markdown';
      }
      if (id.includes('node_modules/fuse.js')) {
        return 'vendor-search';
      }
    },

    // Chunk naming
    chunkFileNames: (chunkInfo) => {
      if (chunkInfo.isDynamicEntry) {
        return 'assets/js/[name]-[hash].js';
      }
      return 'assets/js/vendor-[name]-[hash].js';
    },

    // Entry point naming
    entryFileNames: 'assets/js/[name]-[hash].js',

    // Asset naming
    assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
  },
},
```

---

## 9. PostCSS and Tailwind

### 9.1 PostCSS Configuration

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/vite': {},
    autoprefixer: {
      // Only add prefixes for browsers that need them
      overrideBrowserslist: [
        'last 2 Chrome versions',
        'last 2 Firefox versions',
        'last 2 Safari versions',
        'last 2 Edge versions',
        'last 2 Samsung versions',
      ],
    },
  },
};
```

### 9.2 Tailwind CSS v4 Configuration

| Configuration | Value | Notes |
|---------------|-------|-------|
| Content sources | `./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}` | Scan all template files |
| Theme | Extended with custom design tokens | Oligopeptide brand colors |
| Dark mode | `class` | Toggle via `dark` class on `<html>` |
| Prefix | None | Default Tailwind utility classes |
| important | `false` | Avoid specificity wars |

### 9.3 CSS Output Budget

| Output | Budget | Measurement |
|--------|--------|-------------|
| Tailwind base | 4KB | `@tailwind base` |
| Tailwind components | 2KB | `@tailwind components` |
| Tailwind utilities | 12KB | Purged, only used utilities |
| Custom CSS | 8KB | Component styles, layout |
| **Total CSS** | **26KB** | **Within 40KB budget** |

---

## 10. ESLint and Linting

### 10.1 ESLint Configuration

```javascript
// eslint.config.js
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import solidPlugin from 'eslint-plugin-solid';
import astroPlugin from 'eslint-plugin-astro';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      solid: solidPlugin,
    },
    rules: {
      // TypeScript strict rules
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',

      // SolidJS rules
      'solid/jsx-no-undef': 'error',
      'solid/jsx-no-duplicate-props': 'error',
      'solid/jsx-no-script-url': 'error',
      'solid/no-destructure': 'error',
      'solid/no-react-specific-props': 'error',
      'solid/prefer-for': 'error',
      'solid/components-return-once': 'warn',
      'solid/no-unknown-namespaces': 'warn',
    },
  },
  {
    files: ['**/*.astro'],
    plugins: {
      astro: astroPlugin,
    },
    rules: {
      'astro/no-set-html-directive': 'warn',
    },
  },
];
```

### 10.2 Lint Rules Summary

| Category | Rules | Enforcement |
|----------|-------|-------------|
| TypeScript strict | `no-explicit-any`, `strict-boolean-expressions`, `no-floating-promises` | Error |
| SolidJS best practices | `no-destructure`, `prefer-for`, `components-return-once` | Error/Warn |
| Code quality | `no-unused-vars`, `no-console` (prod), `prefer-const` | Error |
| Security | `no-eval`, `no-implied-eval` | Error |
| Accessibility | `jsx-a11y/*` rules | Error |

---

## 11. Build Output Analysis

### 11.1 Expected Output Structure

```
dist/
├── _astro/
│   ├── js/
│   │   ├── app-[hash].js          # Main app bundle (~64KB)
│   │   ├── vendor-solid-[hash].js  # SolidJS core (~7KB)
│   │   ├── vendor-router-[hash].js # Router (~5KB)
│   │   ├── vendor-markdown-[hash].js # Markdown rendering (~15KB)
│   │   └── vendor-search-[hash].js # Search (~8KB)
│   ├── css/
│   │   └── app-[hash].css          # Compiled CSS (~26KB)
│   ├── images/
│   │   ├── [name]-[hash].webp      # Optimized images
│   │   └── [name]-[hash].avif      # AVIF variants
│   └── fonts/
│       └── [name]-[hash].woff2     # Self-hosted fonts (if any)
├── index.html                      # Homepage
├── wiki/
│   ├── index.html                  # Wiki index
│   └── [slug]/
│       └── index.html              # Individual wiki pages
├── en/
│   ├── index.html                  # English homepage
│   └── ...
├── manifest.json                   # PWA manifest
├── sw.js                           # Service worker
├── sitemap.xml                     # Sitemap
└── robots.txt                      # Robots file
```

### 11.2 Bundle Size Budgets

| Asset | Budget | Current Estimate | Status |
|-------|--------|------------------|--------|
| Main JS bundle | <64KB | 55KB | PASS |
| SolidJS core | <10KB | 7KB | PASS |
| Router | <10KB | 5KB | PASS |
| Markdown renderer | <20KB | 15KB | PASS |
| Search library | <15KB | 8KB | PASS |
| **Total JS** | **<150KB** | **90KB** | **PASS** |
| CSS | <40KB | 26KB | PASS |
| **Total page weight** | **<500KB** | **~400KB** | **PASS** |

### 11.3 Compression Ratios

| Format | Expected Ratio | After Compression |
|--------|---------------|-------------------|
| Brotli (JS) | 80% | ~18KB from 90KB |
| Brotli (CSS) | 85% | ~4KB from 26KB |
| Brotli (HTML) | 80% | ~4KB from 20KB |
| **Total compressed** | — | **~26KB** |

---

## 12. Environment-Specific Configurations

### 12.1 Development Configuration

```typescript
// vite.config.ts (development overrides)
export default defineConfig({
  mode: 'development',
  build: {
    sourcemap: true,
    minify: false, // No minification for debugging
    target: 'esnext', // Latest features for dev browser
  },
  server: {
    host: true, // Listen on all interfaces
    port: 4321,
    strictPort: false,
  },
});
```

### 12.2 Production Configuration

```typescript
// vite.config.ts (production overrides)
export default defineConfig({
  mode: 'production',
  build: {
    sourcemap: true, // Generate source maps for error reporting
    minify: 'esbuild', // Fast minification
    target: 'es2022', // Target supported browsers
    rollupOptions: {
      output: {
        manualChunks: { /* ... */ },
      },
    },
  },
});
```

### 12.3 CI Configuration

```typescript
// vite.config.ts (CI overrides)
export default defineConfig({
  mode: 'production',
  build: {
    sourcemap: false, // No source maps in CI (faster)
    minify: 'esbuild',
    target: 'es2022',
  },
  esbuild: {
    // Drop console/debugger in CI builds
    drop: ['console', 'debugger'],
  },
});
```

### 12.4 Cloudflare Workers Configuration

```typescript
// wrangler.toml
name = "kp-wikisites"
main = "src/worker.ts"
compatibility_date = "2024-12-01"
compatibility_flags = ["nodejs_compat"]

# Routes
routes = [
  { pattern = "encyclopeptide.com/api/*", zone_name = "encyclopeptide.com" },
  { pattern = "wikipept.com/api/*", zone_name = "wikipept.com" },
]

# KV namespace
[[kv_namespaces]]
binding = "KV"
id = "kv-namespace-id"

# D1 database
[[d1_databases]]
binding = "DB"
database_name = "kp-wikisites-db"
database_id = "d1-database-id"

# R2 bucket
[[r2_buckets]]
binding = "R2"
bucket_name = "kp-wikisites-assets"

# Durable Objects
[[durable_objects.bindings]]
name = "WIKI_COLLABORATOR"
class_name = "WikiCollaborator"

# Environment variables
[vars]
ENVIRONMENT = "production"

# Secrets (set via wrangler secret put)
# API_KEY, JWT_SECRET, etc.
```

---

## Cross-References

| Spec File | Relationship |
|-----------|-------------|
| `os_compatibility.md` | Browser support targets define Vite build target |
| `testing_matrix.md` | Build environments define CI test matrix |
| `performance_requirements.md` | Build time and bundle size budgets |
| `optimization_roadmap.md` | Phase 1-4 optimization builds on correct compiler config |
| `BP-INFRA-CF-001.md` | Cloudflare infrastructure defines Workers constraints |
| `domain_constraints_web.toml` | Bundle size and build time constraints |

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-06-07 | Platform Engineering Team | Initial release |
