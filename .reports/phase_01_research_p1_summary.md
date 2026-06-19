# Phase 01 Research Report — P1 Content Tools

**Report ID:** RPT-PHASE01-P1-001
**Version:** 1.0.0
**Date:** 2026-06-19
**Status:** DRAFT
**Author:** DeepThought (Researcher)

---

## Executive Summary

Phase 1 Epistemological Discovery for P1 Content Tools produced 4 Yellow Papers, 124 test vectors, and 1 domain constraint set covering the four content tool features that transform Wikisites into a "VS Code for content."

---

## Deliverables

### Yellow Papers

| ID | Title | Status | Sections | Key Decision |
|----|-------|--------|----------|--------------|
| YP-CONTENT-LATEX-001 | LaTeX/KaTeX Math Rendering | DRAFT | 10 | KaTeX chosen over MathJax (6x faster, 4x smaller) |
| YP-CONTENT-GRAPH-VIEW-001 | Knowledge Graph View | DRAFT | 10 | force-graph library chosen (45KB gzip, 1000+ nodes at 60fps) |
| YP-UI-SPLIT-VIEWS-001 | Split/Multi-Pane Views | DRAFT | 10 | Custom CSS Grid + JS (0KB library overhead) |
| YP-CONTENT-REGEX-SEARCH-001 | Regex Search | DRAFT | 10 | Browser-native RegExp + safety layer (0KB engine overhead) |

### Supporting Files

| File | Description |
|------|-------------|
| `yellow_paper_registry_p1.toml` | TOML registry with 4 papers, 4 test vector sets, 4 domain constraint sets, 16 cross-references |
| `test_vectors/test_vectors_content_tools.toml` | 124 test vectors across 24 categories |
| `domain_constraints/domain_constraints_content.toml` | Performance, bundle, accessibility, and security constraints for all P1 features |

---

## Key Technical Decisions

### 1. KaTeX over MathJax

**Decision**: KaTeX is the math rendering engine.

**Rationale**:
- **Performance**: 6x faster rendering (~50ms vs ~300ms for 100 expressions)
- **Bundle Size**: 7KB core (gzipped) vs 30KB MathJax
- **SSR**: Node API enables build-time rendering (zero client JS for static math)
- **Astro Integration**: remark-math + rehype-katex plugins available
- **Chemistry**: mhchem extension supports molecular formula notation

**Risk**: KaTeX lacks `\require{}` and full MathML output. Mitigated by sufficient built-in features and ARIA labels.

### 2. Force-Graph for Knowledge Visualization

**Decision**: force-graph library (Canvas-based) for graph rendering.

**Rationale**:
- **Performance**: Canvas rendering handles 1000+ nodes at 60fps
- **Bundle Size**: 45KB gzip (vs 75KB Cytoscape.js)
- **Built-in Features**: Hover, click, zoom, pan, drag all included
- **Extensible**: Custom node rendering via `nodeCanvasObject`
- **TypeScript**: Built-in type definitions

**Risk**: No built-in hierarchical/radial layouts. Mitigated by d3-hierarchy pre-processing.

### 3. Custom CSS Grid for Split Views

**Decision**: Custom implementation using CSS Grid + SolidJS signals (no layout library).

**Rationale**:
- **Bundle Size**: 0KB (vs 12-30KB for allotment/react-split-pane)
- **Simplicity**: Binary splits are straightforward with CSS Grid
- **Control**: Full control over resize behavior, snap, accessibility
- **Consistency**: Matches existing component patterns

**Risk**: More implementation effort. Mitigated by well-defined algorithm specification.

### 4. Browser-Native RegExp with Safety Layer

**Decision**: Use browser-native `RegExp` with ReDoS prevention layers.

**Rationale**:
- **Bundle Size**: 0KB (vs 500KB for re2 WASM)
- **Full Syntax**: All ECMAScript regex features available
- **Performance**: Native engine fastest for simple patterns
- **ReDoS Defense**: Static analysis + timeout + result limits

**Risk**: ReDoS vulnerability in native engine. Mitigated by 4-layer defense strategy.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Wikisites Content Tools                   │
├──────────────┬──────────────┬──────────────┬────────────────┤
│  LaTeX/KaTeX │  Knowledge   │  Split/Multi │  Regex Search  │
│  Math Render │  Graph View  │  Pane Views  │                │
├──────────────┼──────────────┼──────────────┼────────────────┤
│  SSR at      │  Canvas      │  CSS Grid    │  Pagefind +    │
│  build time  │  rendering   │  + SolidJS   │  RegExp        │
│  + CSR island│  + force-    │  signals     │  + safety      │
│              │    graph     │              │    layer       │
├──────────────┼──────────────┼──────────────┼────────────────┤
│  remark/     │  Build-time  │  localStorage│  Build-time    │
│  rehype      │  graph JSON  │  persistence │  augmented     │
│  plugins     │  generation  │              │  Pagefind idx  │
└──────────────┴──────────────┴──────────────┴────────────────┘
```

---

## Integration with Existing Architecture

### Content Pipeline Integration

```
Current:  MDX → Astro MDX → Shiki → HTML
P1 Add:   MDX → remark-math → rehype-katex → Astro MDX → Shiki → HTML
```

### SolidJS Island Integration

```
Existing: MWCalculator (client:load), QuizEmbed (client:visible)
P1 Add:   DynamicMath (client:load), KnowledgeGraphView (client:visible),
          PaneContainer (client:load), SearchPanel (client:load)
```

### Bundle Impact Analysis

| Feature | JS Budget | CSS Budget | Fonts | Total |
|---------|-----------|------------|-------|-------|
| LaTeX (static only) | 0KB | 25KB | 60KB | 85KB |
| LaTeX (with dynamic) | 12KB | 25KB | 60KB | 97KB |
| Graph View | 45KB | 0KB | 0KB | 45KB |
| Split Views | 3KB | 0KB | 0KB | 3KB |
| Regex Search | 0KB | 0KB | 0KB | 0KB |
| **Worst Case (all on one page)** | **60KB** | **25KB** | **60KB** | **145KB** |

**Note**: Worst case assumes all features on a single page. In practice, features are distributed across routes. The 200KB JS budget is sufficient.

---

## Test Vector Summary

| Paper | Categories | Vectors | Coverage |
|-------|-----------|---------|----------|
| YP-CONTENT-LATEX-001 | 7 | 40 | Inline, display, complex, chemistry, accessibility, error, dark mode |
| YP-CONTENT-GRAPH-VIEW-001 | 6 | 27 | Construction, layout, search, interaction, performance, accessibility |
| YP-UI-SPLIT-VIEWS-001 | 5 | 23 | Resize, tabs, state, responsive, accessibility |
| YP-CONTENT-REGEX-SEARCH-001 | 6 | 34 | Basic, complex, fields, boolean, ReDoS, performance |
| **Total** | **24** | **124** | |

---

## Domain Constraints Summary

| Category | Key Constraints |
|----------|----------------|
| **Bundle Size** | Max 200KB JS/page (60KB gzip). P1 features share this budget. |
| **Render Time** | KaTeX SSR <200ms. Graph layout <2s. Resize response <16ms. |
| **Graph Size** | Max 1000 nodes (desktop), 300 (mobile). Max 5000 edges. |
| **ReDoS Security** | Complexity score <50. Timeout 100ms. Pattern length <200 chars. |
| **Accessibility** | WCAG 2.1 AA. Keyboard navigation. Screen reader support. |
| **Core Web Vitals** | LCP <2.5s. CLS <0.1. INP <200ms. Lighthouse ≥90. |

---

## Open Questions for Phase 2

1. **LaTeX**: Should we pre-render all math at build time, or defer some to client for interactive expressions?
2. **Graph**: Should the graph view be a dedicated `/graph` route or a modal overlay on article pages?
3. **Split Views**: Should split view state sync across browser tabs via BroadcastChannel?
4. **Regex Search**: Should we add a Web Worker for complex regex execution to avoid main thread blocking?

---

## Traceability Matrix

| P1 Feature | Yellow Paper | Test Vectors | Domain Constraints | Depends On |
|------------|-------------|-------------|-------------------|------------|
| LaTeX/KaTeX | YP-CONTENT-LATEX-001 | TVS-CONTENT-001 | DCS-CONTENT-001 | YP-WEB-TECH-001 |
| Knowledge Graph | YP-CONTENT-GRAPH-VIEW-001 | TVS-GRAPH-001 | DCS-GRAPH-001 | YP-EDU-CONTENT-001, YP-WEB-TECH-001 |
| Split Views | YP-UI-SPLIT-VIEWS-001 | TVS-SPLIT-001 | DCS-SPLIT-001 | YP-WEB-TECH-001 |
| Regex Search | YP-CONTENT-REGEX-SEARCH-001 | TVS-REGEX-001 | DCS-REGEX-001 | YP-WEB-TECH-001 |

---

## Bibliography

All citations are included within each Yellow Paper's Bibliography section. Key references:

- KaTeX: https://katex.org
- MathJax: https://docs.mathjax.org
- d3-force: https://d3js.org/d3-force
- force-graph: https://github.com/vasturiano/force-graph
- Cytoscape.js: https://js.cytoscape.org
- Pagefind: https://pagefind.app
- WAI-ARIA: https://www.w3.org/WAI/ARIA/apg/
- SolidJS: https://www.solidjs.com
- OWASP ReDoS: https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS

---

*Report generated by DeepThought (Researcher) for the Wikisites project.*
