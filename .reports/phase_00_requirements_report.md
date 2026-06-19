# Phase 0: Requirements Engineering — Report

**Version:** 1.0.0
**Date:** 2026-06-19
**Status:** Complete

---

## Executive Summary

Phase 0 produced a comprehensive requirements specification for transforming Wikisites from content-heavy static sites into a maximal, power-user viewer ("VS Code for content"). The specification defines **44 requirements** across 5 feature tiers, with detailed acceptance criteria, stakeholder analysis, and tool requirements.

**Key Decisions:**
- 24 requirements are **Must** priority (non-negotiable for v2.0)
- 13 are **Should** (important but deferrable)
- 7 are **Could** (nice-to-have, stretch goals)
- Zero **Won't** in this phase (deferred to future phases)

---

## Deliverables

| File | Description | Contents |
|------|-------------|----------|
| `.specs/00_requirements/requirements.md` | EARS-format requirements | 44 requirements across P0-P4 + cross-cutting |
| `.specs/00_requirements/acceptance_criteria.md` | Testable acceptance criteria | Given/When/Then tables for all 24 Must requirements |
| `.specs/00_requirements/stakeholder_analysis.md` | Stakeholder profiles and priorities | 5 stakeholder types with concerns, metrics, feature mapping |
| `.specs/00_requirements/tool_requirements.toml` | Tool/library requirements | 30 tools with version constraints and bundle impact estimates |
| `.reports/phase_00_requirements_report.md` | This report | Summary, coverage analysis, risks, recommendations |

---

## Requirements Coverage

### By Tier

| Tier | Total | Must | Should | Could | Coverage |
|------|-------|------|--------|-------|----------|
| P0: Power User Shell | 10 | 9 | 1 | 0 | Complete |
| P1: Content Tools | 7 | 1 | 4 | 2 | Complete |
| P2: Social Layer | 5 | 0 | 2 | 3 | Complete |
| P3: Editor | 3 | 0 | 1 | 2 | Complete |
| P4: Extensibility | 4 | 0 | 1 | 3 | Complete |
| Cross-Cutting | 15 | 13 | 2 | 0 | Complete |
| **Total** | **44** | **24** | **13** | **7** | **100%** |

### By Category

| Category | Requirements | Key IDs |
|----------|-------------|---------|
| Command Palette | 4 | REQ-P0-001 to REQ-P0-004 |
| Keyboard Shortcuts | 2 | REQ-P0-005, REQ-P0-006 |
| Navigation | 3 | REQ-P0-007, REQ-P0-008, REQ-P0-010 |
| Focus Management | 1 | REQ-P0-009 |
| Content Tools | 5 | REQ-P1-001 to REQ-P1-005 |
| Social | 5 | REQ-P2-001 to REQ-P2-005 |
| Editor | 3 | REQ-P3-001 to REQ-P3-003 |
| Extensibility | 4 | REQ-P4-001 to REQ-P4-004 |
| Performance | 4 | REQ-PERF-001 to REQ-PERF-004 |
| Accessibility | 3 | REQ-A11Y-001 to REQ-A11Y-003 |
| Security | 4 | REQ-SEC-001 to REQ-SEC-004 |
| i18n | 2 | REQ-I18N-001, REQ-I18N-002 |
| Offline | 2 | REQ-OFFL-001, REQ-OFFL-002 |

---

## Competitive Advantage Mapping

The following existing competitive advantages are explicitly protected by this specification:

| Advantage | Protecting Requirements | Risk Level |
|-----------|----------------------|------------|
| FSRS v4 spaced repetition | REQ-OFFL-001 (offline parity) | Low — no changes to FSRS core |
| 680+ quizzes + 502+ flashcards | REQ-PERF-001 (performance), REQ-OFFL-001 (offline) | Low — maintaining existing |
| 3D molecular viewer | REQ-PERF-001 (bundle budget) | Medium — new features must not regress |
| Static-first + PWA | REQ-OFFL-001, REQ-OFFL-002 | Medium — new features must maintain offline |
| OpenAPI + SDK | REQ-SEC-001 (CSP), REQ-SEC-003 (rate limiting) | Low — API stability maintained |
| Dark mode + i18n | REQ-I18N-001, REQ-A11Y-002 | Low — all new features must support both |
| Cloudflare edge performance | REQ-PERF-001, REQ-PERF-004 | Medium — bundle size must stay under budget |

---

## Risk Assessment

### High Risk

| Risk | Impact | Mitigation |
|------|--------|------------|
| Bundle size exceeds 300KB budget | Performance regression; mobile users leave | Strict code splitting; lazy loading for P1+ features; CI bundle size checks |
| Command palette conflicts with browser shortcuts | User frustration; feature unusable | Extensive cross-browser testing; document conflicts; allow customization |
| Graph viewer performance with 500+ nodes | Slow rendering; mobile unusability | Canvas rendering; node density threshold; lazy loading; pagination |

### Medium Risk

| Risk | Impact | Mitigation |
|------|--------|------------|
| KaTeX bundle size (30KB) on non-math pages | Unnecessary weight for most users | Dynamic import; load only on pages with math content |
| CodeMirror bundle size (40KB) for editor | Large impact on editor pages only | Lazy load; consider simpler textarea for initial version |
| Plugin API security (sandboxing) | Plugins could access sensitive data | Sandboxed execution context; strict API surface; security audit |

### Low Risk

| Risk | Impact | Mitigation |
|------|--------|------------|
| Giscus dependency on GitHub | Service availability | Document fallback to custom comments system |
| i18n translation coverage for new features | Partial locale support | CI translation coverage check; community translation pipeline |
| Accessibility regressions in new UI | WCAG compliance gap | axe-core in CI; manual screen reader testing per release |

---

## Existing Codebase Integration Points

The specification leverages existing infrastructure:

| Existing Component | Integration | Requirements |
|-------------------|-------------|-------------|
| `KeyboardShortcuts.tsx` | Extend with global shortcuts | REQ-P0-005 |
| `ReadingProgress.tsx` | Extend for scroll spy | REQ-P0-007, REQ-P1-006 |
| `@wikisites/query` (FSRS) | Maintain offline capability | REQ-OFFL-001 |
| `@wikisites/workers` (API) | Add rate limiting, CSRF | REQ-SEC-003, REQ-SEC-004 |
| `@wikisites/shared` (Zod) | Validate settings/plugins | REQ-P4-004 |
| Pagefind search | Extend for regex/filters | REQ-P1-004, REQ-P1-005 |
| Dark mode system | Extend to new components | All P0-P1 UI requirements |
| i18n framework | Extend to new features | REQ-I18N-001 |
| Service worker | Extend for new features | REQ-OFFL-001 |
| E2E tests (Playwright) | Extend for new UI | All acceptance criteria |

---

## Recommended Implementation Order

### Phase 1: P0 Foundation (Weeks 1-3)

**Goal:** Ship the power-user shell; immediate identity differentiation.

1. **Command Palette** (REQ-P0-001 to REQ-P0-004) — Week 1
   - Implement command registry and palette UI
   - Add fuzzy search with categories
   - Wire up command execution

2. **Keyboard Shortcuts** (REQ-P0-005, REQ-P0-006) — Week 2
   - Implement shortcut system with tinykeys
   - Add shortcut reference panel
   - Document all shortcuts

3. **Navigation** (REQ-P0-007, REQ-P0-008, REQ-P0-010) — Week 3
   - Outline panel with scroll spy
   - Breadcrumb navigation
   - Skip links
   - Focus management audit

### Phase 2: P1 Content Tools (Weeks 4-6)

**Goal:** Add research-grade content tools.

1. **KaTeX** (REQ-P1-001) — Week 4
   - Dynamic import, dark mode, accessibility

2. **Search Enhancement** (REQ-P1-004, REQ-P1-005) — Week 5
   - Regex search mode
   - Advanced filters (type, tag, difficulty)

3. **Knowledge Graph** (REQ-P1-002) — Week 6
   - Force-directed graph with Canvas rendering
   - Node filtering, zoom/pan

### Phase 3: P2 Social + P3 Editor (Weeks 7-10)

**Goal:** Enable community contribution.

1. **Comments** (REQ-P2-001) — Week 7
   - Giscus integration or custom D1 backend

2. **User Accounts** (REQ-P2-003) — Week 8
   - OAuth integration, role-based access

3. **Web Editor** (REQ-P3-001, REQ-P3-002) — Weeks 9-10
   - CodeMirror-based MDX editor
   - Version history with visual diff

### Phase 4: P4 Extensibility (Weeks 11-12)

**Goal:** Open the platform for community extensions.

1. **Plugin API** (REQ-P4-001) — Week 11
   - Plugin registry, sandboxed execution

2. **Theme System** (REQ-P4-002, REQ-P4-003) — Week 12
   - CSS custom property editor, export/import

---

## Acceptance Criteria Summary

All 24 Must requirements have detailed acceptance criteria:

| Requirement | Test Scenarios | Test Type |
|------------|---------------|-----------|
| REQ-P0-001 | 7 scenarios | E2E (Playwright) |
| REQ-P0-002 | 6 scenarios | E2E + Unit |
| REQ-P0-003 | 5 scenarios | E2E |
| REQ-P0-005 | 8 scenarios | E2E |
| REQ-P0-006 | 6 scenarios | E2E |
| REQ-P0-007 | 7 scenarios | E2E |
| REQ-P0-008 | 7 scenarios | E2E + Unit |
| REQ-P0-009 | 6 scenarios | E2E |
| REQ-P0-010 | 6 scenarios | E2E |
| REQ-P1-001 | 6 scenarios | E2E + Unit |
| REQ-PERF-001 | 5 scenarios | Lighthouse CI |
| REQ-PERF-002 | 4 scenarios | Unit + E2E |
| REQ-PERF-003 | 3 scenarios | E2E + Performance |
| REQ-A11Y-001 | 6 scenarios | axe-core + Manual |
| REQ-A11Y-002 | 4 scenarios | E2E |
| REQ-SEC-001 | 5 scenarios | Integration + E2E |
| REQ-SEC-002 | 5 scenarios | Unit + Integration |
| REQ-SEC-003 | 5 scenarios | Integration |
| REQ-SEC-004 | 5 scenarios | Integration |
| REQ-I18N-001 | 5 scenarios | Unit + E2E |
| REQ-OFFL-001 | 7 scenarios | E2E (service worker) |
| REQ-OFFL-002 | 5 scenarios | Integration + E2E |
| REQ-P4-004 | 4 scenarios | Unit |

**Total test scenarios:** 126

---

## Tool Dependency Summary

| Category | New Dependencies | Existing | Total |
|----------|-----------------|----------|-------|
| UI Components | 2 (cmdk, kmenu) | 0 | 2 |
| Utility | 2 (tinykeys, intersection-observer) | 0 | 2 |
| Rendering | 2 (katex, marked) | 0 | 2 |
| Visualization | 2 (d3-force, force-graph) | 0 | 2 |
| Editor | 3 (codemirror, lang-markdown, prosemirror) | 0 | 3 |
| Search | 1 (flexsearch) | 1 (pagefind) | 2 |
| Security | 2 (sanitize-html, dompurify) | 0 | 2 |
| Social | 1 (giscus) | 0 | 1 |
| Validation | 0 | 1 (zod) | 1 |
| Testing | 0 | 3 (vitest, playwright, axe-core) | 3 |
| Monitoring | 1 (web-vitals) | 1 (lighthouse) | 2 |
| Diff | 2 (diff, diff-match-patch) | 0 | 2 |

**New bundle impact estimate (P0 + P1 only):** ~65KB gzipped
**Total estimated bundle impact (all tiers):** ~200KB gzipped (within 300KB budget with code splitting)

---

## Next Steps

1. **Approve requirements** — Review with stakeholders; adjust priorities if needed
2. **Create architecture spec** — Technical design for command palette, outline panel, and shortcut system
3. **Spike on command palette** — Evaluate cmdk vs kmenu vs custom SolidJS implementation
4. **Set up bundle size CI** — Add bundle size regression check before any feature work
5. **Extend E2E test suite** — Add test stubs for all P0 acceptance criteria
6. **Begin Phase 1 implementation** — Command palette as first deliverable

---

## Appendix: Requirement Traceability

| Requirement | Acceptance Criteria | Tool(s) | Test Type | Implementation Phase |
|-------------|-------------------|---------|-----------|---------------------|
| REQ-P0-001 | 7 scenarios | cmdk/kmenu, tinykeys | E2E | Phase 1 |
| REQ-P0-002 | 6 scenarios | cmdk/kmenu | E2E + Unit | Phase 1 |
| REQ-P0-003 | 5 scenarios | cmdk/kmenu | E2E | Phase 1 |
| REQ-P0-004 | N/A (Should) | — | — | Phase 1 |
| REQ-P0-005 | 8 scenarios | tinykeys | E2E | Phase 1 |
| REQ-P0-006 | 6 scenarios | tinykeys | E2E | Phase 1 |
| REQ-P0-007 | 7 scenarios | intersection-observer | E2E | Phase 1 |
| REQ-P0-008 | 7 scenarios | — | E2E + Unit | Phase 1 |
| REQ-P0-009 | 6 scenarios | — | E2E | Phase 1 |
| REQ-P0-010 | 6 scenarios | — | E2E | Phase 1 |
| REQ-P1-001 | 6 scenarios | katex | E2E + Unit | Phase 2 |
| REQ-P1-002 | N/A (Should) | d3-force, force-graph | — | Phase 2 |
| REQ-P1-003 | N/A (Should) | — | — | Phase 2 |
| REQ-P1-004 | N/A (Should) | flexsearch | — | Phase 2 |
| REQ-P1-005 | N/A (Should) | pagefind | — | Phase 2 |
| REQ-P1-006 | N/A (Should) | intersection-observer | — | Phase 2 |
| REQ-P1-007 | N/A (Could) | — | — | Phase 2 |
| REQ-P2-001 | N/A (Should) | giscus or custom | — | Phase 3 |
| REQ-P2-002 | N/A (Could) | — | — | Phase 3 |
| REQ-P2-003 | N/A (Should) | — | — | Phase 3 |
| REQ-P2-004 | N/A (Could) | — | — | Phase 3 |
| REQ-P2-005 | N/A (Could) | — | — | Phase 3 |
| REQ-P3-001 | N/A (Could) | codemirror | — | Phase 3 |
| REQ-P3-002 | N/A (Could) | diff, diff-match-patch | — | Phase 3 |
| REQ-P3-003 | N/A (Should) | zod | — | Phase 3 |
| REQ-P4-001 | N/A (Could) | zod | — | Phase 4 |
| REQ-P4-002 | N/A (Could) | — | — | Phase 4 |
| REQ-P4-003 | N/A (Could) | — | — | Phase 4 |
| REQ-P4-004 | N/A (Should) | zod | Unit | Phase 4 |
| REQ-PERF-001 | 5 scenarios | lighthouse, web-vitals | Lighthouse CI | All phases |
| REQ-PERF-002 | 4 scenarios | pagefind | Unit + E2E | Phase 2 |
| REQ-PERF-003 | 3 scenarios | — | E2E + Perf | Phase 1 |
| REQ-PERF-004 | N/A (Should) | — | CI | All phases |
| REQ-A11Y-001 | 6 scenarios | axe-core | axe-core + Manual | All phases |
| REQ-A11Y-002 | 4 scenarios | — | E2E | All phases |
| REQ-A11Y-003 | N/A (Should) | — | — | Phase 2 |
| REQ-SEC-001 | 5 scenarios | — | Integration + E2E | All phases |
| REQ-SEC-002 | 5 scenarios | sanitize-html, dompurify | Unit + Integration | Phase 3 |
| REQ-SEC-003 | 5 scenarios | — | Integration | All phases |
| REQ-SEC-004 | 5 scenarios | — | Integration | Phase 3 |
| REQ-I18N-001 | 5 scenarios | — | Unit + E2E | All phases |
| REQ-I18N-002 | N/A (Should) | — | — | Phase 2 |
| REQ-OFFL-001 | 7 scenarios | — | E2E (SW) | All phases |
| REQ-OFFL-002 | 5 scenarios | — | Integration + E2E | Phase 3 |
