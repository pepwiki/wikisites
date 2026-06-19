# Cross-Lingual Knowledge Integration: Conflict Resolution

**Document ID:** KI-01-25-CR  
**Version:** 1.0.0  
**Date:** 2026-06-19  
**Status:** COMPLETE  
**Classification:** Internal — Phase 1.25 Conflict Resolution

---

## Executive Summary

This document records all conflicts identified during cross-lingual knowledge integration, presents both positions, documents resolution rationale, and references Architecture Decision Records (ADRs).

**Total Conflicts:** 4  
**All Resolved:** Yes  
**Reopened:** 0

---

## 1. KaTeX vs MathJax

### Conflict Summary

| Field | Value |
|-------|-------|
| **Conflict ID** | CR-001 |
| **Domain** | Content (P1) |
| **YP Reference** | YP-CONTENT-LATEX-001 |
| **Status** | RESOLVED |
| **Resolution Date** | 2026-06-19 |

### Position A: KaTeX

**Arguments:**
1. **Performance:** 6x faster rendering (~50ms for 100 expressions vs ~300ms for MathJax)
2. **Bundle Size:** ~7KB core vs ~30KB MathJax — fits within 50KB/island budget
3. **SSR Support:** `katex` npm package provides `renderToString()` for build-time rendering
4. **Astro Integration:** remark/rehype plugins exist for KaTeX in MDX pipelines
5. **Sufficient Feature Set:** Covers all needed notation (fractions, superscripts, Greek letters, operators, matrices)
6. **Chemistry Notation:** `\ce{}` extension covers molecular formulas

**Limitations Acknowledged:**
- No `\require{}` packages (not needed for Wikisites content)
- No MathML output (use `aria-label` for accessibility)
- No RTL text support (content is English-only in Phase 1)

### Position B: MathJax

**Arguments:**
1. **RTL Support:** Native right-to-left text rendering
2. **`\require{}` Packages:** Access to mhchem, AMS math, and other extensions
3. **MathML Output:** Full MathML support for accessibility
4. **MathML Input:** Can parse MathML directly

**Limitations Acknowledged:**
- 30KB bundle size (3x larger than KaTeX)
- ~300ms render time (6x slower than KaTeX)
- Less mature SSR support
- More complex Astro integration

### Resolution

**Decision:** KaTeX chosen over MathJax.

**Rationale:**
1. Performance is critical for pages with many expressions (pharmacokinetic equations)
2. Bundle size fits within project budget constraints
3. SSR support enables zero-JS static math rendering
4. Missing features (RTL, `\require{}`) are acceptable for Phase 1 English-only content
5. RTL limitation noted as revisitable for Phase 2 Arabic content

**Mitigation for Missing Features:**
- MathML output not required — use `aria-label` on rendered HTML for accessibility
- RTL not required — content is English-only in Phase 1
- `\require{}` not needed — all needed packages are built-in or loadable as extensions

**ADR Reference:** ADR-CONTENT-001 (Math Rendering Engine Selection)

### Cross-Lingual Impact

| Language | Impact | Notes |
|----------|--------|-------|
| EN | None | KaTeX fully supports English math |
| ZH | None | KaTeX handles Chinese text in math contexts |
| JA | None | KaTeX handles Japanese text in math contexts |
| AR | **HIGH** | KaTeX lacks RTL support; may require MathJax fallback for Arabic math content |

---

## 2. force-graph vs Cytoscape.js

### Conflict Summary

| Field | Value |
|-------|-------|
| **Conflict ID** | CR-002 |
| **Domain** | Content (P1) |
| **YP Reference** | YP-CONTENT-GRAPH-VIEW-001 |
| **Status** | RESOLVED |
| **Resolution Date** | 2026-06-19 |

### Position A: force-graph

**Arguments:**
1. **Performance:** Canvas rendering, 1000+ nodes at 60fps
2. **Bundle Size:** ~45KB gzip (lowest among options)
3. **Built-in Interactions:** Hover, click, zoom, pan, drag — no manual wiring
4. **Force-Directed:** Primary layout matches Obsidian-style exploration
5. **Extensible:** Custom node rendering via `nodeCanvasObject` callback
6. **Active Maintenance:** Regular releases, TypeScript support

**Limitations Acknowledged:**
- No built-in hierarchical/radial layouts (implement via d3-hierarchy pre-processing)
- No built-in clustering (implement via custom force in d3Force API)

### Position B: Cytoscape.js

**Arguments:**
1. **Built-in Layouts:** Force, hierarchical, radial, and more
2. **Built-in Clustering:** Tag-based clustering native
3. **Larger Ecosystem:** More plugins and extensions
4. **Academic Roots:** Strong graph theory foundation

**Limitations Acknowledged:**
- ~75KB bundle size (1.7x larger than force-graph)
- More complex API surface
- Canvas rendering but with higher overhead

### Resolution

**Decision:** force-graph chosen over Cytoscape.js.

**Rationale:**
1. Bundle size is critical for static site performance (45KB vs 75KB)
2. Performance meets requirements (1000+ nodes at 60fps)
3. Built-in interactions reduce implementation complexity
4. Hierarchical/radial layouts achievable via d3-hierarchy pre-processing
5. Clustering achievable via custom force in force-graph's d3Force API

**Mitigation for Limitations:**
- No built-in hierarchical/radial: implement custom layout pre-processing with d3-hierarchy, feed coordinates as initial positions to force-graph
- No built-in clustering: implement tag-based clustering via custom force in force-graph's `d3Force` API

**ADR Reference:** ADR-CONTENT-002 (Graph Visualization Library Selection)

### Cross-Lingual Impact

| Language | Impact | Notes |
|----------|--------|-------|
| EN | None | Library selection is implementation-level |
| ZH | None | Library selection is implementation-level |
| JA | None | Library selection is implementation-level |
| AR | None | Library selection is implementation-level |

---

## 3. Giscus vs Custom Comments System

### Conflict Summary

| Field | Value |
|-------|-------|
| **Conflict ID** | CR-003 |
| **Domain** | Social (P2) |
| **YP Reference** | YP-SOCIAL-COMMENTS-001 |
| **Status** | RESOLVED |
| **Resolution Date** | 2026-06-19 |

### Position A: Giscus (GitHub Discussions)

**Arguments:**
1. **Zero Backend:** No database or API to maintain
2. **Free Hosting:** GitHub Discussions storage
3. **Moderation:** Native GitHub moderation tools
4. **Spam Prevention:** GitHub's built-in spam detection
5. **Authentication:** GitHub OAuth for commenters
6. **Custom Themes:** CSS theme support

**Limitations Acknowledged:**
- GitHub dependency (reliability, API limits)
- Public repository required (Discussions must be publicly accessible)
- No custom authentication (only GitHub accounts)
- Limited customization (UI constrained by Giscus iframe)
- No inline comments (page-level comments only)
- English-only UI (no i18n support)

### Position B: Custom D1/KV System

**Arguments:**
1. **Full Control:** Complete customization of UI, auth, moderation
2. **Multi-Auth:** OAuth (GitHub, Google), magic links, passkeys
3. **i18n Support:** Full internationalization capability
4. **Inline Comments:** Support for annotation-level comments
5. **Data Ownership:** All data stored in Cloudflare D1
6. **No GitHub Dependency:** Independent of GitHub availability

**Limitations Acknowledged:**
- Backend infrastructure required (D1, KV, Workers)
- Custom spam prevention needed
- Custom moderation tools needed
- Higher implementation complexity

### Resolution

**Decision:** Giscus chosen as first implementation, custom D1/KV system as future upgrade path.

**Rationale:**
1. Giscus enables rapid launch with zero backend overhead
2. Free hosting reduces operational costs during initial launch
3. GitHub's moderation tools provide adequate spam prevention
4. Custom system can be built incrementally while Giscus handles comments
5. Migration path from Giscus to custom system is well-defined

**Phased Approach:**
- **Phase 2:** Giscus integration (zero backend,快速 launch)
- **Phase 3:** Custom D1/KV system (full control, i18n, inline comments)
- **Phase 4:** Migration from Giscus to custom system

**ADR Reference:** ADR-SOCIAL-001 (Comments System Architecture)

### Cross-Lingual Impact

| Language | Impact | Notes |
|----------|--------|-------|
| EN | None | Giscus fully supports English |
| ZH | Low | Giscus UI is English-only; custom system needed for full Chinese support |
| JA | Low | Giscus UI is English-only; custom system needed for full Japanese support |
| AR | **HIGH** | Giscus UI is English-only; custom system needed for Arabic support; RTL layout required |

---

## 4. TipTap vs CodeMirror 6

### Conflict Summary

| Field | Value |
|-------|-------|
| **Conflict ID** | CR-004 |
| **Domain** | Editor (P3) |
| **YP Reference** | YP-EDITOR-MDX-001 |
| **Status** | RESOLVED |
| **Resolution Date** | 2026-06-19 |

### Position A: TipTap

**Arguments:**
1. **Headless UI:** Framework agnostic, works with SolidJS
2. **WYSIWYG Editing:** Visual editing experience for content authors
3. **Extension System:** Excellent plugin architecture
4. **Collaboration:** Built-in Hocuspocus collaboration backend
5. **SolidJS Integration:** Best integration among options
6. **Active Development:** YC-backed, regular releases

**Limitations Acknowledged:**
- Collaboration features require paid Pro license for cloud
- Less control than raw ProseMirror
- Larger than CodeMirror (~250KB vs ~150KB)

### Position B: CodeMirror 6

**Arguments:**
1. **Smaller Bundle:** ~150KB core + markdown (vs ~250KB TipTap)
2. **Performance:** Virtual document, handles million-line files
3. **Modular Architecture:** Only load what you need
4. **Custom Language Support:** Lezer parser for MDX syntax
5. **Built-in Collaboration:** Yjs integration available

**Limitations Acknowledged:**
- No built-in WYSIWYG mode
- Steeper learning curve for extension system
- Smaller ecosystem than TipTap

### Resolution

**Decision:** TipTap chosen as primary editor, CodeMirror 6 as lightweight fallback.

**Rationale:**
1. TipTap provides WYSIWYG editing essential for content authors (non-developers)
2. Best SolidJS integration among options
3. Extension system enables MDX-specific features (JSX component insertion, frontmatter editing)
4. Collaboration support via Hocuspocus aligns with project requirements
5. CodeMirror retained as fallback for quick edits and power users

**Mitigation for Limitations:**
- Bundle size: Lazy-load editor bundle only when user navigates to edit mode
- Collaboration: Use Yjs + Hocuspocus (open source) for collaboration backend
- Pro license: Self-host Hocuspocus server (no cloud dependency)

**ADR Reference:** ADR-EDITOR-001 (MDX Editor Engine Selection)

### Cross-Lingual Impact

| Language | Impact | Notes |
|----------|--------|-------|
| EN | None | Both editors fully support English |
| ZH | Low | TipTap has better CJK text handling than CodeMirror |
| JA | Low | TipTap has better CJK text handling than CodeMirror |
| AR | Medium | TipTap has better RTL support than CodeMirror; CodeMirror RTL is experimental |

---

## 5. Conflict Resolution Process

### 5.1 Resolution Criteria

All conflicts were resolved using the following criteria:

1. **Performance:** Bundle size, render time, runtime performance
2. **Feature Fit:** Alignment with project requirements
3. **Integration:** Compatibility with Astro, SolidJS, TypeScript
4. **Maintenance:** Active development, community support
5. **i18n Support:** Internationalization and RTL capabilities
6. **Cost:** Development effort, operational costs

### 5.2 Resolution Confidence

| Conflict | Confidence | Rationale |
|----------|-----------|-----------|
| CR-001 (KaTeX) | 0.95 | Performance data definitive; RTL limitation acknowledged |
| CR-002 (force-graph) | 0.90 | Bundle size and performance data clear |
| CR-003 (Giscus) | 0.85 | Phased approach mitigates limitations |
| CR-004 (TipTap) | 0.85 | WYSIWYG requirement is decisive for content author use case |

### 5.3 ADR References

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| ADR-CONTENT-001 | Math Rendering Engine Selection | Accepted | 2026-06-19 |
| ADR-CONTENT-002 | Graph Visualization Library Selection | Accepted | 2026-06-19 |
| ADR-SOCIAL-001 | Comments System Architecture | Accepted | 2026-06-19 |
| ADR-EDITOR-001 | MDX Editor Engine Selection | Accepted | 2026-06-19 |
