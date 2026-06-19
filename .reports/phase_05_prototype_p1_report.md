# Phase 05 — Prototype P1: Content Tools

**Date:** 2026-06-19
**Status:** COMPLETE
**Prototypes:** 4/4 created

---

## Prototypes Delivered

| # | File | Component | LOC | Feasible |
|---|------|-----------|-----|----------|
| 1 | `.specs/06_prototypes/latex-renderer/LaTeXRenderer.tsx` | LaTeXRenderer | ~230 | YES |
| 2 | `.specs/06_prototypes/graph-view/GraphView.tsx` | GraphView | ~240 | YES |
| 3 | `.specs/06_prototypes/split-pane/SplitPane.tsx` | SplitPane | ~240 | YES |
| 4 | `.specs/06_prototypes/regex-search/RegexSearch.ts` | RegexSearch | ~320 | YES |

## Architecture Feasibility Proven

### 1. LaTeXRenderer — KaTeX SSR+CSR Hybrid
- **SSR path:** `renderLatexSSR()` exports for remark/rehype build pipeline. Returns `{html, mathml, success}`.
- **CSR path:** Lazy `import("katex")` triggers code-split. SolidJS `createResource` manages loading state.
- **Detection:** `detectMathSegments()` parses `$...$` and `$$...$$` from raw content.
- **Accessibility:** `role="math"` + `aria-label` with source expression. MathML output via `output: "htmlAndMathml"`.
- **Error fallback:** Displays raw LaTeX in red when KaTeX fails, never crashes.
- **Zod schemas:** `LatexRendererPropsSchema`, `LatexExpressionSchema`, `LatexSSRResultSchema`.

### 2. GraphView — force-graph SolidJS Wrapper
- **Lazy loading:** `import("force-graph")` in `createResource` — 45KB chunk only loads when component mounts.
- **Truncation:** `truncateData()` sorts by degree, keeps top N nodes, removes orphan edges. Proves Property G3.
- **Filtering:** `activeGroups()` signal toggles groups. Memo recomputes filtered data.
- **Responsive:** `ResizeObserver` updates canvas dimensions. `zoomToFit()` re-centers on filter change.
- **Interactions:** `onNodeClick` navigates via `href`, `onNodeHover` shows tooltip.
- **Zod schemas:** `GraphDataSchema`, `GraphNodeSchema`, `GraphEdgeSchema`, `GraphViewPropsSchema`.

### 3. SplitPane — CSS Grid + SolidJS Signals
- **Zero dependencies:** Pure CSS Grid (`1fr` ratios) + SolidJS signals. 0KB external.
- **Drag resize:** `mousedown` → `mousemove` → `mouseup` loop. Clamps to `minPaneSize / total`.
- **Keyboard:** `Ctrl+Alt+Arrow` adjusts adjacent pane ratios by 5% step.
- **Persistence:** `localStorage` read/write on every size change. Silently degrades if unavailable.
- **Responsive:** `matchMedia("(max-width: 768px)")` switches to stacked single-column.
- **Invariant proof:** `normalizeSizes()` always produces arrays summing to 1.0 (Property S2).
- **Zod schemas:** `SplitPanePropsSchema`, `PaneConfigSchema`, `SplitPaneStateSchema`.

### 4. RegexSearch — 4-Layer ReDoS Defense
- **Layer 1:** Pattern length capped at 200 chars.
- **Layer 2:** `analyzeComplexity()` static analysis scores 0–100. Nested quantifiers, alternation depth, backreferences. Score >50 → blocked.
- **Layer 3:** `compilePattern()` catches syntax errors before execution.
- **Layer 4:** `executeWithTimeout()` chunks RegExp execution with `performance.now()` deadline. 100ms hard cap.
- **Search:** Field-specific (`title`, `body`, `tags`), paginated results, highlight generation with offsets.
- **Zod schemas:** `RegexSearchQuerySchema`, `RegexSearchResultSchema`, `ReDoSSafetyScoreSchema`, `SearchableDocumentSchema`.

## Bundle Impact

| Prototype | External Deps | JS (gzip est.) | CSS | Total |
|-----------|---------------|-----------------|-----|-------|
| LaTeXRenderer | KaTeX (lazy) | 7KB core + 12KB CSR | 25KB fonts+CSS | ~44KB |
| GraphView | force-graph (lazy) | 45KB | 0KB | ~45KB |
| SplitPane | none | ~3KB | 0KB | ~3KB |
| RegexSearch | none | 0KB | 0KB | 0KB |

**Worst-case all-on-page:** ~92KB JS + 25KB CSS = ~117KB (within 200KB budget).

## Test Vectors

See `.specs/06_prototypes/test_vectors_content.toml` — 35 test vectors covering:
- LaTeX: expression detection, SSR rendering, error handling, mhchem, unicode
- Graph: truncation, filtering, empty data, large graphs
- Split: min size enforcement, persistence, responsive, keyboard, normalization
- Regex: ReDoS defense, field search, pagination, case sensitivity, highlights
- Integration: cross-component workflows

## Risks Identified

1. **KaTeX fonts:** 60KB woff2 loaded via `<link>` in `<head>`. Must use `font-display: swap` to avoid FOIT.
2. **force-graph SSR:** Canvas not available at build time. GraphView must be CSR-only (`client:visible`).
3. **RegExp timeout:** `performance.now()` chunking is cooperative — a single massive match could still block. Mitigated by complexity pre-screening.
4. **localStorage:** ~5MB limit. Split pane state is small (~100 bytes) but should handle `QuotaExceededError`.

## Next Steps

- Wire LaTeXRenderer into remark/rehype pipeline for build-time SSR.
- Generate `graph.json` at build time from MDX link graph.
- Add Playwright E2E tests for drag-resize and regex search.
- Bundle analysis with `bun build --analyze` to verify budgets.
