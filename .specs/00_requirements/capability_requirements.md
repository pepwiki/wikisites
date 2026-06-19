# Capability Requirements — Power-User Viewer

**Document ID:** CAP-REQ-002
**Version:** 2.0.0
**Date:** 2026-06-19
**Status:** Active
**Scope:** encyclopeptide.com and wikipept.com — Power-User Viewer Upgrade

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Required Capabilities by Feature Tier](#2-required-capabilities-by-feature-tier)
3. [Tools and Libraries](#3-tools-and-libraries)
4. [Integration Points](#4-integration-points)
5. [Performance Constraints](#5-performance-constraints)
6. [Browser Compatibility](#6-browser-compatibility)
7. [Capability Gap Analysis](#7-capability-gap-analysis)

---

## 1. Executive Summary

This document defines all capability requirements for transforming Wikisites into a maximal, power-user viewer. Capabilities are organized by feature tier (P0–P4), with specific tools, libraries, integration points, and constraints for each. The power-user viewer adds command palette, keyboard shortcuts, multi-panel layout, graph visualization, dense mode, and deep cross-referencing to the existing Astro + SolidJS + Tailwind CSS architecture.

---

## 2. Required Capabilities by Feature Tier

### 2.1 P0 — Must Have (Launch Blockers)

#### 2.1.1 Command Palette

| Capability | Description | Tool/Library | Integration Point |
|------------|-------------|-------------|-------------------|
| Keyboard-triggered search overlay | Cmd/Ctrl+K opens full-screen search palette | Custom SolidJS component | `src/components/CommandPalette.tsx` |
| Fuzzy search across all content | Articles, quizzes, flashcards, glossary terms | FlexSearch or Fuse.js | `@wikisites/query` package |
| Keyboard navigation | Arrow keys, Enter, Esc, type-ahead | SolidJS keyboard event handling | `CommandPalette.tsx` |
| Categorized results | Group by type (article, quiz, flashcard, glossary) | Custom grouping logic | `CommandPalette.tsx` |
| Quick actions | Navigate to page, toggle theme, toggle dense mode | Action registry pattern | `src/lib/command-registry.ts` |
| Recent/frequent items | Show recently visited pages | localStorage persistence | `@wikisites/query` review store |
| ARIA compliance | `role="combobox"`, `role="listbox"`, `role="option"` | ARIA 1.2 | `CommandPalette.tsx` |
| Locale-aware labels | Translated command names per locale | `astro-i18next` | `src/i18n/` |

**Keyboard Shortcut System:**

| Shortcut | Action | Scope |
|----------|--------|-------|
| `Cmd/Ctrl+K` | Open command palette | Global |
| `Cmd/Ctrl+Shift+K` | Open quick actions | Global |
| `Cmd/Ctrl+P` | Quick page navigation | Global |
| `Cmd/Ctrl+G` | Open graph view | Article page |
| `Cmd/Ctrl+D` | Toggle dense mode | Global |
| `Cmd/Ctrl+\\` | Toggle multi-panel | Global |
| `Cmd/Ctrl+J` | Toggle dark mode | Global |
| `Cmd/Ctrl+/` | Show keyboard shortcuts | Global |
| `Esc` | Close overlay / panel | Global |
| `?` | Show help | Global (when not in input) |
| `1-9` | Switch panels | Multi-panel mode |
| `Tab` | Cycle panels | Multi-panel mode |
| `Arrow keys` | Navigate graph | Graph view |
| `Enter` | Select graph node | Graph view |
| `Backspace` | Go back in graph history | Graph view |

**Implementation Requirements:**

- Shortcut registry must be centralized and queryable
- Shortcuts must be remappable via settings panel
- Shortcuts must be displayable in user's locale
- No conflicts with browser shortcuts (Cmd+T, Cmd+W, etc.)
- No conflicts with OS shortcuts
- Must work on macOS (Cmd) and Windows/Linux (Ctrl)

#### 2.1.2 Keyboard-First Navigation

| Capability | Description | Tool/Library | Integration Point |
|------------|-------------|-------------|-------------------|
| Full keyboard accessibility | All features accessible without mouse | ARIA 1.2, custom focus management | All components |
| Focus management | Logical tab order, focus trapping in modals | SolidJS + ARIA | All interactive components |
| Skip links | Skip to main content, skip to search | HTML `<a>` with `href="#main"` | Layout components |
| Breadcrumb navigation | Keyboard-accessible breadcrumbs | `nav[aria-label="Breadcrumb"]` | Layout components |
| Focus indicators | Visible focus ring on all interactive elements | Tailwind `focus-visible:` | All components |

#### 2.1.3 Search Improvements

| Capability | Description | Tool/Library | Integration Point |
|------------|-------------|-------------|-------------------|
| Faceted search | Filter by type, topic, difficulty, locale | FlexSearch + custom facets | `@wikisites/query` |
| Search highlighting | Highlight query terms in results | FlexSearch highlight option | `CommandPalette.tsx` |
| Search analytics | Query logging, click tracking | Cloudflare Workers | `@wikisites/workers` |
| Autocomplete | Type-ahead suggestions | FlexSearch prefix search | `CommandPalette.tsx` |
| Search history | Recent searches stored locally | localStorage | `@wikisites/query` |

#### 2.1.4 Responsive Layout

| Capability | Description | Tool/Library | Integration Point |
|------------|-------------|-------------|-------------------|
| Fluid grid system | Responsive multi-panel layout | Tailwind CSS Grid + Container Queries | `src/layouts/` |
| Panel resizing | Drag-to-resize panels | Custom SolidJS component | `src/components/MultiPanel.tsx` |
| Mobile fallback | Single-column on mobile (<768px) | Tailwind responsive utilities | `MultiPanel.tsx` |
| Persistent layout | Panel state saved in URL + localStorage | URL hash + localStorage | `@wikisites/query` |

---

### 2.2 P1 — Should Have (Sprint 1-2)

#### 2.2.1 Multi-Panel View

| Capability | Description | Tool/Library | Integration Point |
|------------|-------------|-------------|-------------------|
| Split view | View 2-4 articles side-by-side | Custom SolidJS component | `MultiPanel.tsx` |
| Panel types | Article, quiz, flashcard, graph, reference | Panel type registry | `src/lib/panel-types.ts` |
| Panel sync | Scroll sync between panels (optional) | Custom sync logic | `MultiPanel.tsx` |
| Panel state persistence | Restore panels on page reload | localStorage | `@wikisites/query` |
| Panel keyboard shortcuts | Cmd+1-4 to switch panels | Keyboard shortcut registry | `src/lib/command-registry.ts` |
| Tab management | Open/close/reorder tabs | Custom tab component | `MultiPanel.tsx` |

#### 2.2.2 Graph Visualization

| Capability | Description | Tool/Library | Integration Point |
|------------|-------------|-------------|-------------------|
| Knowledge graph rendering | Interactive node-link diagram | D3.js force-directed or vis-network | `src/components/GraphView.tsx` |
| Node types | Peptide, amino acid, receptor, pathway, disease, publication | Custom node renderers | `GraphView.tsx` |
| Edge types | binds-to, inhibits, activates, treats, references | Custom edge renderers | `GraphView.tsx` |
| Graph interaction | Click, zoom, pan, drag, search | D3.js / vis-network interaction | `GraphView.tsx` |
| Graph filtering | Filter by node/edge type | Custom filter UI | `GraphView.tsx` |
| Graph data source | Static JSON generated at build time | Astro content collections | `src/content/graph/` |
| Graph text alternative | Adjacency list for screen readers | ARIA `role="img"` with `aria-label` | `GraphView.tsx` |
| Performance | 100 nodes in <500ms | Canvas rendering (not SVG for large graphs) | `GraphView.tsx` |
| Mobile fallback | Simplified graph or list view | Responsive component | `GraphView.tsx` |

**Graph Data Schema:**

```typescript
interface GraphNode {
  id: string;
  type: 'peptide' | 'amino_acid' | 'receptor' | 'pathway' | 'disease' | 'publication';
  label: string;
  properties: Record<string, unknown>;
  locale: string;
}

interface GraphEdge {
  source: string;
  target: string;
  type: string;
  weight?: number;
  properties?: Record<string, unknown>;
}

interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
```

#### 2.2.3 Dense Mode

| Capability | Description | Tool/Library | Integration Point |
|------------|-------------|-------------|-------------------|
| Compact typography | Reduced line-height, smaller font-size | Tailwind CSS tokens | `src/styles/dense.css` |
| Tighter spacing | Reduced padding/margins | Tailwind CSS tokens | `src/styles/dense.css` |
| Information density | More content visible per viewport | CSS custom properties | `src/styles/dense.css` |
| Toggle mechanism | Cmd+D or settings panel | SolidJS signal | `DenseMode.tsx` |
| Persistent preference | Saved in localStorage | localStorage | `@wikisites/query` |
| Auto-activation | Respect `prefers-contrast: more` | CSS media query | `src/styles/dense.css` |
| WCAG compliance | 7:1 contrast ratio in dense mode | Tailwind color tokens | `tailwind.config.*` |

**Dense Mode CSS Tokens:**

```css
:root {
  --density-normal-line-height: 1.6;
  --density-dense-line-height: 1.3;
  --density-normal-font-size: 1rem;
  --density-dense-font-size: 0.875rem;
  --density-normal-padding: 1.5rem;
  --density-dense-padding: 0.75rem;
}

[data-density="dense"] {
  line-height: var(--density-dense-line-height);
  font-size: var(--density-dense-font-size);
}
```

#### 2.2.4 Progress Dashboard

| Capability | Description | Tool/Library | Integration Point |
|------------|-------------|-------------|-------------------|
| Unified progress view | Articles read, quizzes taken, flashcards reviewed | SolidJS component | `src/components/ProgressDashboard.tsx` |
| FSRS analytics | Next review, retention rate, overdue count | `@wikisites/query` FSRS v4 | `ProgressDashboard.tsx` |
| Quiz performance | Score trends, weak areas, mastery levels | `@wikisites/query` review store | `ProgressDashboard.tsx` |
| Streak tracking | Daily login/review streaks | localStorage + edge sync | `ProgressDashboard.tsx` |
| Data visualization | Charts for progress over time | Chart.js or lightweight alternative | `ProgressDashboard.tsx` |
| Data export | Export progress as JSON/CSV | Custom export logic | `ProgressDashboard.tsx` |

---

### 2.3 P2 — Could Have (Sprint 3-4)

#### 2.3.1 Inline Editing

| Capability | Description | Tool/Library | Integration Point |
|------------|-------------|-------------|-------------------|
| Quick-edit mode | Edit article content in-place | `contenteditable` + SolidJS | `src/components/InlineEditor.tsx` |
| Markdown preview | Live markdown preview while editing | Markdown-it or remark | `InlineEditor.tsx` |
| Diff visualization | Show changes before saving | Custom diff algorithm or diff-match-patch | `InlineEditor.tsx` |
| Citation auto-complete | Type `[` to search for references | FlexSearch + citation DB | `InlineEditor.tsx` |
| Save to edge | Persist changes via Cloudflare Workers | REST API | `@wikisites/workers` |
| Version history | View previous versions of articles | D1 storage | `@wikisites/workers` |

#### 2.3.2 Batch Operations

| Capability | Description | Tool/Library | Integration Point |
|------------|-------------|-------------|-------------------|
| Multi-select | Select multiple articles/quizzes | SolidJS signal + checkbox UI | `BatchOperations.tsx` |
| Bulk flashcard creation | Create flashcards from selected text | Custom logic | `BatchOperations.tsx` |
| Bulk quiz export | Export selected quizzes as JSON | Custom export logic | `BatchOperations.tsx` |
| Bulk tag assignment | Add tags to multiple articles | REST API | `@wikisites/workers` |

#### 2.3.3 Offline Graph

| Capability | Description | Tool/Library | Integration Point |
|------------|-------------|-------------|-------------------|
| Cached graph data | Store graph JSON in IndexedDB | idb or localForage | Service worker |
| Offline graph rendering | Render graph without network | D3.js/vis-network + cached data | `GraphView.tsx` |
| Sync on reconnect | Update graph when online | Service worker + REST API | Service worker |

#### 2.3.4 Citation System

| Capability | Description | Tool/Library | Integration Point |
|------------|-------------|-------------|-------------------|
| DOI resolution | Fetch metadata from DOI | CrossRef API | `@wikisites/workers` |
| PMID resolution | Fetch metadata from PubMed | NCBI E-utilities API | `@wikisites/workers` |
| Citation formatting | APA, MLA, Chicago styles | Custom formatter | `src/lib/citations.ts` |
| Citation graph | Show citation relationships | Graph data + visualization | `GraphView.tsx` |

---

### 2.4 P3 — Won't Have Yet (Future)

| Capability | Description | Tool/Library | Integration Point |
|------------|-------------|-------------|-------------------|
| Real-time collaboration | Multiple users editing simultaneously | Yjs + WebSockets or CRDT | `@wikisites/workers` |
| LMS integration (LTI 1.3) | Embed in Canvas/Moodle | LTI 1.3 library | `@wikisites/workers` |
| SCORM export | Package quizzes as SCORM content | SCORM library | Custom export |
| xAPI statements | Send learning statements to LRS | xAPI library | `@wikisites/workers` |
| Version branching | Git-like branching for content | D1 + custom logic | `@wikisites/workers` |
| Peer review workflow | Formal review queue for contributions | Custom workflow engine | `@wikisites/workers` |

---

### 2.5 P4 — Nice to Have (Vision)

| Capability | Description | Tool/Library | Integration Point |
|------------|-------------|-------------|-------------------|
| AI-powered search | Semantic search using embeddings | OpenAI embeddings or local model | `@wikisites/workers` |
| Voice commands | Navigate via voice input | Web Speech API | `src/components/VoiceCommand.tsx` |
| AR peptide viewer | Augmented reality 3D peptide display | WebXR API | `src/components/ARViewer.tsx` |
| Collaborative annotations | Real-time annotation highlighting | Yjs + CRDT | `@wikisites/workers` |
| Personalized learning paths | AI-adapted study sequences | ML model + xAPI data | `@wikisites/workers` |

---

## 3. Tools and Libraries

### 3.1 New Dependencies (Power-User Viewer)

| Package | Version | Purpose | Tier | Bundle Impact |
|---------|---------|---------|------|---------------|
| `fuse.js` | ^7.0.0 | Fuzzy search for command palette | P0 | ~10KB gzipped |
| `@unocss/preset-icons` or custom | — | Keyboard shortcut icons | P0 | ~5KB gzipped |
| `d3-force` | ^3.0.0 | Graph force-directed layout | P1 | ~15KB gzipped |
| `d3-selection` | ^3.0.0 | Graph DOM manipulation | P1 | ~8KB gzipped |
| `d3-zoom` | ^3.0.0 | Graph zoom/pan | P1 | ~5KB gzipped |
| `d3-drag` | ^3.0.0 | Graph node dragging | P1 | ~3KB gzipped |
| `diff-match-patch` | ^1.0.0 | Text diffing for inline editor | P2 | ~10KB gzipped |
| `markdown-it` | ^14.0.0 | Markdown preview in editor | P2 | ~15KB gzipped |
| `chart.js` | ^4.0.0 | Progress dashboard charts | P1 | ~20KB gzipped (tree-shakeable) |
| `idb` | ^8.0.0 | IndexedDB for offline graph | P2 | ~3KB gzipped |

### 3.2 Existing Dependencies (Already Installed)

| Package | Version | Power-User Viewer Usage |
|---------|---------|------------------------|
| `solid-js` | 1.9.x | All interactive components |
| `tailwindcss` | 4.x | Styling, dense mode tokens |
| `astro` | 5.x | Static generation, content collections |
| `zod` | 3.x | Graph data schema validation |
| `pagefind` | 1.x | Search index (augmented by Fuse.js) |
| `@wikisites/query` | local | FSRS v4, review store, session stats |
| `@wikisites/shared` | local | Zod schemas, theme utilities |
| `@wikisites/workers` | local | API endpoints, KV/D1 access |

### 3.3 Dev Dependencies (Power-User Viewer)

| Package | Version | Purpose |
|---------|---------|---------|
| `@types/d3-force` | ^3.0.0 | TypeScript types for D3 |
| `@types/d3-selection` | ^3.0.0 | TypeScript types for D3 |
| `@types/diff-match-patch` | ^1.0.0 | TypeScript types |
| `@types/markdown-it` | ^14.0.0 | TypeScript types |
| `vitest` | 3.x | Unit tests for new components |
| `@solidjs/testing-library` | ^1.0.0 | SolidJS component tests |
| `@playwright/test` | 1.x | E2E tests for power-user features |

---

## 4. Integration Points

### 4.1 Astro Integration

| Integration Point | Current State | Power-User Viewer Addition |
|-------------------|---------------|---------------------------|
| `astro.config.mjs` | Configured with SolidJS, Tailwind, Starlight | No changes needed (SolidJS handles interactive components) |
| Content Collections | Articles, quizzes, flashcards | Add `graph` collection for knowledge graph data |
| View Transitions | Enabled | Extend for multi-panel navigation |
| Static Output | `output: 'static'` | Keep static; power-user viewer runs client-side |
| MDX | Articles in MDX | Add `<GraphView>`, `<CommandPalette>` MDX components |

### 4.2 SolidJS Integration

| Integration Point | Current State | Power-User Viewer Addition |
|-------------------|---------------|---------------------------|
| `client:load` | Hydrates interactive components | CommandPalette, MultiPanel, GraphView, DenseMode, ProgressDashboard |
| `client:idle` | Hydrates non-critical components | KeyboardShortcuts overlay, HelpDialog |
| `client:visible` | Hydrates on scroll | GraphView (lazy) |
| Signals | createSignal, createEffect | Panel state, dense mode, shortcuts, graph selection |
| Context | SolidJS context | User preferences context, command registry context |
| Suspense | Async data loading | Graph data, search results |

### 4.3 Tailwind CSS Integration

| Integration Point | Current State | Power-User Viewer Addition |
|-------------------|---------------|---------------------------|
| `tailwind.config.*` | Design tokens, dark mode | Dense mode tokens, graph colors, panel colors |
| CSS Custom Properties | `--color-*` tokens | `--density-*` tokens, `--graph-*` tokens |
| `@apply` | Component styles | Dense mode mixins |
| Responsive utilities | `sm:`, `md:`, `lg:` | Panel breakpoint utilities |
| `dark:` variant | Dark mode | Graph dark mode styles |

### 4.4 @wikisites/query Integration

| Integration Point | Current State | Power-User Viewer Addition |
|-------------------|---------------|---------------------------|
| FSRS v4 | Spaced repetition algorithm | Progress dashboard analytics |
| Review store | localStorage-based | Add command palette recent items |
| Search engine | Pagefind integration | Faceted search augmentation |
| Session stats | Quiz/session statistics | Progress dashboard data source |

### 4.5 @wikisites/workers Integration

| Integration Point | Current State | Power-User Viewer Addition |
|-------------------|---------------|---------------------------|
| Health endpoint | `/api/health` | No change |
| Search endpoint | `/api/search` | Faceted search API |
| Rate limiter | Existing | No change (command palette is client-side) |
| KV namespace | Not yet created | User preferences storage |
| D1 database | Schema defined | User preferences, panel layouts, search history |

### 4.6 Service Worker Integration

| Integration Point | Current State | Power-User Viewer Addition |
|-------------------|---------------|---------------------------|
| PWA manifest | Wikipept only | Add power-user viewer icons |
| Offline fallback | Basic shell | Cache graph data, command palette index |
| Cache strategy | Network-first | Graph data: cache-first; articles: stale-while-revalidate |

---

## 5. Performance Constraints

### 5.1 Bundle Size Budgets

| Component | Max Gzipped | Rationale |
|-----------|-------------|-----------|
| Command palette (Fuse.js + component) | 15KB | Must load fast, feels instant |
| Keyboard shortcuts (registry + overlay) | 5KB | Always available |
| Multi-panel layout | 10KB | Layout logic only |
| Graph visualization (D3 modules) | 25KB | Heavy but lazy-loaded |
| Dense mode (CSS only) | 2KB | Pure CSS |
| Progress dashboard (Chart.js) | 20KB | Lazy-loaded |
| Inline editor (markdown-it + diff) | 25KB | Lazy-loaded, P2 |
| **Total per page (P0 features)** | **<30KB** | Must meet Core Web Vitals |
| **Total per page (P0+P1 features)** | **<55KB** | Lazy-loaded P1 |
| **Total per page (all features)** | **<80KB** | Heavy features lazy-loaded |

### 5.2 Load Time Budgets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Command palette open | < 100ms | From keypress to visible |
| Graph render (100 nodes) | < 500ms | From data load to interactive |
| Dense mode toggle | < 50ms | CSS class swap |
| Panel open/switch | < 100ms | Panel visibility change |
| Search results | < 200ms | From keystroke to results |
| Full page load (article) | < 2s | LCP target |
| TTFB | < 100ms | Edge deployment |

### 5.3 Memory Budgets

| Resource | Max Memory | Rationale |
|----------|-----------|-----------|
| Graph data (1000 nodes) | 5MB | JSON parsing, force layout |
| Search index (10K articles) | 10MB | FlexSearch in-memory |
| Command palette cache | 2MB | Recent + frequent items |
| Panel state | 1MB | Multiple panel contents |
| Offline cache (IndexedDB) | 50MB | Service worker storage |

### 5.4 Runtime Performance

| Metric | Target | Rationale |
|--------|--------|-----------|
| Frame rate during graph animation | 60fps | Smooth interaction |
| Input latency (command palette) | < 16ms | Per-frame budget |
| GC pauses | < 50ms | No jank during interaction |
| Memory leak rate | 0 | Long-running sessions |

---

## 6. Browser Compatibility

### 6.1 Browser Support Matrix

| Browser | Min Version | Tier | Notes |
|---------|------------|------|-------|
| Chrome | 100+ | Primary | Development target, full API support |
| Firefox | 100+ | Secondary | Full support |
| Safari | 16+ | Critical | iOS Safari critical for mobile PWA |
| Edge | 100+ | Secondary | Chromium-based, same as Chrome |
| iOS Safari | 16+ | Critical | PWA support, service worker |
| Samsung Internet | 20+ | Tertiary | Android market share |

### 6.2 API Compatibility

| API | Chrome | Firefox | Safari | Polyfill |
|-----|--------|---------|--------|----------|
| Command palette (`<dialog>`) | 37+ | 98+ | 15.4+ | None needed |
| FlexSearch | 100+ | 100+ | 16+ | None needed |
| Canvas (graph rendering) | 100+ | 100+ | 16+ | None needed |
| CSS Container Queries | 105+ | 110+ | 16+ | None needed |
| `structuredClone` | 98+ | 94+ | 15.4+ | None needed |
| `Array.prototype.groupBy` | 117+ | 119+ | 17.4+ | `core-js` (optional) |
| `Temporal` API | 114+ (flag) | 114+ (flag) | 17+ (partial) | `@js-temporal/polyfill` |
| Web Keyboard API | 100+ | 100+ | 16+ | None needed |
| Intersection Observer | 100+ | 100+ | 16+ | None needed |
| ResizeObserver | 100+ | 100+ | 16+ | None needed |
| IndexedDB | 100+ | 100+ | 16+ | None needed |

### 6.3 Feature Detection Strategy

- Use `@supports` for CSS features (container queries, `:has()`)
- Use `typeof` checks for JS features (Temporal, groupBy)
- Provide graceful fallbacks for all P1+ features
- P0 features must work in all supported browsers without polyfills

---

## 7. Capability Gap Analysis

### 7.1 Gaps to Fill (Power-User Viewer)

| Gap ID | Missing Capability | Impact | Tier | Resolution |
|--------|-------------------|--------|------|------------|
| PU-001 | No command palette component | Core power-user feature missing | P0 | Create `CommandPalette.tsx` |
| PU-002 | No centralized keyboard shortcut system | Shortcuts ad-hoc | P0 | Create `src/lib/command-registry.ts` |
| PU-003 | No fuzzy search library | Search not interactive | P0 | Install `fuse.js` |
| PU-004 | No multi-panel layout | No split view | P1 | Create `MultiPanel.tsx` |
| PU-005 | No graph visualization | No knowledge graph | P1 | Install D3 modules, create `GraphView.tsx` |
| PU-006 | No dense mode | No compact view | P1 | Create `src/styles/dense.css` |
| PU-007 | No progress dashboard | No unified analytics | P1 | Create `ProgressDashboard.tsx` |
| PU-008 | No graph data collection | No graph data source | P1 | Create `src/content/graph/` collection |
| PU-009 | No inline editor | No quick editing | P2 | Create `InlineEditor.tsx` |
| PU-010 | No batch operations | No multi-select | P2 | Create `BatchOperations.tsx` |
| PU-011 | No offline graph data | No offline graph | P2 | Implement IndexedDB caching |
| PU-012 | No citation resolution | No DOI/PMID lookup | P2 | Create `src/lib/citations.ts` |

### 7.2 Gaps Already Filled (Existing)

| Capability | Status | Location |
|------------|--------|----------|
| Dark mode | ✅ Complete | `src/components/ThemeToggle.tsx` |
| Basic search | ✅ Complete | Pagefind integration |
| Keyboard shortcuts (basic) | ✅ Complete | `src/components/KeyboardShortcuts.tsx` |
| FSRS v4 spaced repetition | ✅ Complete | `@wikisites/query` |
| Quiz engine | ✅ Complete | `src/components/Quiz.tsx` |
| Flashcard system | ✅ Complete | `src/components/Flashcard.tsx` |
| i18n (4 locales) | ✅ Complete | `astro-i18next` |
| RTL support | ✅ Complete | Tailwind `rtl:` variant |
| PWA | ✅ Complete | Service worker, manifest |
| Accessibility (WCAG 2.1 AA) | ✅ Complete | axe-core E2E tests |
| Dark mode persistence | ✅ Complete | Cross-subdomain cookie |
| prefers-reduced-motion | ✅ Complete | CSS media query |

---

**Document Status:** Complete
**Next Action:** Proceed to Phase 0 (Scaffold) implementation
**Owner:** Wikisites Development Team
**Review Cycle:** Update after each sprint
