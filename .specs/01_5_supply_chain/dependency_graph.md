# Dependency Graph — Updated with Phase 1 Research Dependencies

**Project:** wikisites
**Phase:** 1.5 Supply Chain Hardening (Updated)
**Date:** 2026-06-19

---

## 1. Current Dependency Graph

```
wikisites (root)
├── @wikisites/shared ← zod
├── @wikisites/query ← @wikisites/shared, zod
├── @wikisites/encp ← @wikisites/shared, @wikisites/query
├── @wikisites/wiki ← @wikisites/shared, @wikisites/query
├── @wikisites/sdk (empty)
└── @wikisites/workers ← @cloudflare/workers-types, wrangler
```

### 1.1 Current Direct Dependencies (43 packages)

| Layer | Packages | Total |
|-------|----------|-------|
| Core Framework | astro, vite, typescript, esbuild, rollup | 5 |
| SolidJS | solid-js, @solidjs/routing/meta/start, @astrojs/solid-js | 5 |
| Styling | tailwindcss, @tailwindcss/vite, postcss, autoprefixer | 4 |
| Content/Build | @astrojs/mdx, vinxi, nitropack, unbuild | 4 |
| Validation | zod, shiki | 2 |
| Utilities | consola, exsolve, pathe, ufo, ofetch, uncrypto, confbox, klona, defu, c12, unenv | 10 |
| Server | serve-static, js-yaml | 2 |
| Deploy | @astrojs/netlify/cloudflare/vercel, netlify-lambda | 4 |
| Logging | pino, pino-pretty | 2 |
| Testing | vitest, playwright, cypress | 3 |
| Linting | eslint, prettier, globals, @typescript-eslint/parser, lint-staged, husky, @commitlint/cli | 7 |
| Security | xss, isomorphic-dompurify, csurf* | 3 |

---

## 2. New Dependencies — Where They Fit

### 2.1 Updated Dependency Graph

```
wikisites (root)
├── @wikisites/shared ← zod
├── @wikisites/query ← @wikisites/shared, zod
│
├── @wikisites/encp ← @wikisites/shared, @wikisites/query
│   ├── P1: katex, remark-math, rehype-katex (math rendering)
│   ├── P1: force-graph, three (graph visualization)
│   ├── P2: giscus (comments — via CDN)
│   ├── P3: diff (version history)
│   └── P4: zod (settings — already present)
│
├── @wikisites/wiki ← @wikisites/shared, @wikisites/query
│   ├── P1: katex, remark-math, rehype-katex (math rendering)
│   ├── P1: force-graph, three (graph visualization)
│   ├── P2: giscus (comments — via CDN)
│   └── P3: diff (version history)
│
├── @wikisites/sdk ← (plugin API — Web Worker sandbox, no npm deps)
│
└── @wikisites/workers ← @cloudflare/workers-types, wrangler
```

### 2.2 Shared vs Site-Specific

| Package | Used By | Install Location |
|---------|---------|-----------------|
| katex | encp + wiki | Root devDependencies |
| remark-math | encp + wiki | Root devDependencies |
| rehype-katex | encp + wiki | Root devDependencies |
| force-graph | encp + wiki | Root devDependencies |
| three | encp + wiki (via force-graph) | Transitive |
| giscus | encp + wiki | CDN — no install |
| diff | encp + wiki | Root devDependencies |
| TipTap + extensions | encp + wiki | Root devDependencies |
| jose | workers (JWT) | Root devDependencies |

---

## 3. Bundle Size Budget Analysis

### 3.1 Current Bundle (Estimated)

| Site | Framework | JS (gzip) | CSS (gzip) | Fonts | Total |
|------|-----------|-----------|------------|-------|-------|
| encp | Astro + SolidJS | ~85 KB | ~25 KB | 0 | ~110 KB |
| wiki | Astro + SolidJS + Starlight | ~120 KB | ~35 KB | 0 | ~155 KB |

### 3.2 New Bundle Impact

| Package | Raw (KB) | Gzipped (KB) | Category | Sites |
|---------|----------|-------------|----------|-------|
| katex JS | 270 | 85 | P1 | Both |
| katex CSS | 237 | 42 | P1 | Both |
| katex fonts | ~800 | ~200 | P1 | Both |
| remark/rehype | 15 | 5 | P1 | Both |
| force-graph | 95 | 45 | P1 | Both |
| three.js | 600 | 180 | P1 | Both (via force-graph) |
| giscus | 15 | 15 | P2 | Both (CDN) |
| TipTap core | 85 | 25 | P3 | Both |
| TipTap starter-kit | 120 | 60 | P3 | Both |
| TipTap PM bundle | 160 | 80 | P3 | Both |
| TipTap extensions (8) | 80 | 40 | P3 | Both |
| diff | 22 | 10 | P3 | Both |
| jose | 70 | 35 | P2 | Workers only |

### 3.3 Post-Implementation Bundle

| Site | Current | + Katex | + Graph | + Editor | + Comments | Total |
|------|---------|---------|---------|----------|------------|-------|
| encp | 110 KB | +332 | +225 | +205 | +15 | ~887 KB |
| wiki | 155 KB | +332 | +225 | +205 | +15 | ~932 KB |

### 3.4 Budget Assessment

| Metric | Budget | Actual (est.) | Status |
|--------|--------|---------------|--------|
| Total JS per page | < 500 KB | ~400 KB | PASS |
| Total CSS per page | < 150 KB | ~120 KB | PASS |
| Total fonts per page | < 200 KB | ~200 KB | AT LIMIT |
| Total payload per page | < 800 KB | ~887 KB | OVER |

**Assessment:** Bundle budget is tight. Mitigation strategies required.

---

## 4. Tree-Shaking Potential

### 4.1 High Tree-Shaking (Good)

| Package | Savings Potential | Strategy |
|---------|------------------|----------|
| katex | 40–60% | Import only `renderToString`, not full library |
| TipTap | 50–70% | Import individual extensions, not starter-kit |
| three.js | 30–50% | Use `three/examples/jsm/` selective imports |
| diff | 80–90% | Import only `diffChars` / `diffLines` |
| jose | 60–70% | Import only JWT sign/verify |

### 4.2 Low Tree-Shaking (Poor)

| Package | Issue | Mitigation |
|---------|-------|------------|
| force-graph | Bundles three.js internally | Use dynamic import, code-split |
| giscus | External script tag | No tree-shaking possible |
| TipTap PM | ProseMirror monolithic bundle | Accept as necessary |

### 4.3 Optimization Strategies

```
1. Dynamic Imports (Code Splitting)
   ─────────────────────────────────
   - katex: Only on pages with math content
   - force-graph: Only on graph view page
   - TipTap: Only in editor mode
   - giscus: Lazy-load after content renders

2. Selective Imports
   ─────────────────
   - katex: import { renderToString } from 'katex'
   - TipTap: import StarterKit from '@tiptap/starter-kit' vs individual extensions
   - three: import { Scene, WebGLRenderer } from 'three' (subset)

3. CDN Offloading
   ───────────────
   - katex fonts: Serve from CDN with preconnect
   - giscus: Already CDN
   - three.js: NOT recommended for CDN (version coupling)

4. SSR Elimination
   ────────────────
   - TipTap: Client-only (SolidJS on:mount)
   - force-graph: Client-only (Canvas)
   - katex: SSR possible via renderToString (already planned)
```

---

## 5. Import Map Strategy

```json
{
  "imports": {
    "katex": "katex/dist/katex.mjs",
    "katex/css": "katex/dist/katex.min.css",
    "@tiptap/core": "@tiptap/core/dist/index.cjs",
    "@tiptap/starter-kit": "@tiptap/starter-kit/dist/index.cjs",
    "force-graph": "force-graph/dist/force-graph.mjs",
    "diff": "diff/lib/index.mjs"
  }
}
```

---

## 6. Code-Splitting Plan

```
Initial Load (Critical Path)
├── Astro runtime
├── SolidJS runtime
├── Tailwind base CSS
└── Page-specific SolidJS island

Lazy Load (Dynamic Import)
├── katex (only on /articles/* with math)
├── force-graph (only on /graph/*)
├── TipTap (only in editor mode)
├── giscus (only after content render)
└── three.js (only with force-graph)
```

---

_Graph generated: 2026-06-19T00:00:00Z_
_Classification: Internal_
