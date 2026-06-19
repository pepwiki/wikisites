# Phase -1: Context Discovery Report — Power-User Viewer

**Document ID:** RPT-PHASE--1-002
**Version:** 2.0.0
**Date:** 2026-06-19
**Status:** Active
**Project:** Wikisites — Power-User Viewer Transformation
**Phase:** -1 (Context Discovery — Power-User Viewer)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Domain Analysis Summary](#2-domain-analysis-summary)
3. [Standards Mapping Summary](#3-standards-mapping-summary)
4. [Capability Assessment](#4-capability-assessment)
5. [Multi-lingual Strategy](#5-multi-lingual-strategy)
6. [Risk Register Summary](#6-risk-register-summary)
7. [Recommended Next Steps for Phase 0](#7-recommended-next-steps-for-phase-0)
8. [Quality Gate Status](#8-quality-gate-status)

---

## 1. Executive Summary

Wikisites is an established monorepo containing two educational oligopeptide sites — Encyclopeptide (encyclopeptide.com) and Wikipept (wikipept.com) — built on Astro 5.x, SolidJS 1.9, Tailwind CSS 4.x, TypeScript 5.9, and deployed to Cloudflare Pages + Workers. The project shipped v1.0.0 with 158 articles, 680 quizzes, 502 flashcards, 12 learn lessons, 218 tests, and full CI/CD.

This Phase -1 report covers the transformation into a **maximal, power-user viewer** — "VS Code for content." The power-user viewer paradigm shifts the user experience from passive reading to active, keyboard-driven, density-optimized exploration.

**Key Deliverables This Phase:**

| Document | Version | Scope |
|----------|---------|-------|
| `domain_analysis.md` | 2.0.0 | Domain scope, personas, risks, multi-lingual requirements |
| `applicable_standards.md` | 2.0.0 | All applicable standards with clause-level detail |
| `capability_requirements.md` | 2.0.0 | Feature tiers, tools, integration points, performance constraints |

### 1.1 Transformation Summary

| Dimension | Current | Target |
|-----------|---------|--------|
| Navigation | Sidebar + search | Command palette + keyboard shortcuts + graph |
| Layout | Single-column | Multi-panel, split-view, customizable |
| Density | Standard web | Compact/power-user density option |
| Cross-refs | Inline links | Bidirectional links, backlinks, graph |
| Interaction | Click-driven | Keyboard-first, mouse-optional |
| Data | localStorage | localStorage + edge sync (KV/D1) |
| Offline | PWA shell | Full offline article/quiz/graph access |

### 1.2 Competitive Positioning

The power-user viewer addresses gaps identified in competitive benchmark:

| Gap | Competitor | Power-User Viewer Fix | Tier |
|-----|-----------|----------------------|------|
| 3D molecular visualization | RCSB PDB | Mol* viewer integration | P1 |
| Peptide property calculator | Peptide2.com | Full property suite | P1 |
| Sequence search | UniProt | Faceted/fuzzy search | P0 |
| API access | RCSB PDB | REST + OpenAPI | P2 |
| Dense data views | UniProt | Power-user density mode | P1 |

---

## 2. Domain Analysis Summary

### 2.1 Primary Domain

- **Primary:** Educational content platform / scientific reference
- **Secondary:** Oligopeptide biochemistry knowledge base
- **Tertiary:** Community-driven learning system with spaced repetition

### 2.2 Domain Ontology (Power-User Viewer)

The power-user viewer requires a formal knowledge graph:

| Node Type | Examples | Power-User Viewer Usage |
|-----------|---------|------------------------|
| Peptide | Glutathione, Oxytocin, Insulin | Article links, graph nodes |
| Amino Acid | Leucine, Cysteine, Glycine | Composition data, graph edges |
| Receptor | GPCR, Ion Channel, Nuclear Receptor | Binding data, graph edges |
| Pathway | NF-κB, MAPK, PI3K/Akt | Functional classification |
| Disease | Cancer, Diabetes, Neurodegeneration | Therapeutic application |
| Publication | DOI-linked papers | Citations, graph edges |

### 2.3 User Personas

| Persona | Goals | Power-User Features | Frequency |
|---------|------|---------------------|-----------|
| Power-User Researcher | Quick lookup, cross-refs, citations | Cmd palette, graph, multi-panel, dense | Daily |
| Power-User Student | Learn, review, track progress | Unified dashboard, keyboard review, spaced rep | Daily |
| Power-User Contributor | Edit, annotate, review | Quick-edit, inline diff, batch ops | Weekly |
| Casual Reader | Read articles | Standard mode (default) | Occasional |

---

## 3. Standards Mapping Summary

### 3.1 Standards by Domain

| Domain | Standards | P0 Requirements |
|--------|-----------|-----------------|
| Accessibility | WCAG 2.1 AA/AAA, Section 508, ARIA 1.2 | Full keyboard access, ARIA roles, contrast |
| Privacy | GDPR, CCPA | Consent, data minimization, export |
| Security | OWASP Top 10, NIST SP 800-53, CSP Level 3 | XSS prevention, CSRF, input sanitization |
| Web | HTML5, CSS3, ES2024, URL Standard | Semantic HTML, CSS variables, modern JS |
| Content | Dublin Core, Schema.org, IMS CC, LTI | Metadata, structured data |
| Quality | ISO/IEC 25010, ISO/IEC 25012 | Software quality, data quality |
| Educational | SCORM, xAPI, IEEE 1484.12.1 | Learning records, content packaging |
| i18n | ICU, CLDR, BCP 47, UAX #9 | Locale support, RTL, bidirectional |

### 3.2 Compliance Baseline

Existing compliance ✅:

- WCAG 2.1 AA (axe-core E2E tests)
- GDPR (cookie consent, privacy policy)
- CSP Level 2 (CSP headers in Workers)
- HSTS (security headers)
- Rate limiting (Cloudflare Workers)
- Input sanitization (Zod validation)
- Dark mode (prefers-color-scheme + toggle)
- i18n (4 locales: en, zh, ja, ar)
- RTL support (Arabic)
- prefers-reduced-motion (all animations)

### 3.3 Standards-to-Tier Coverage

| Tier | Standards Coverage | Gap |
|------|-------------------|-----|
| P0 | Full (all mandatory standards) | None |
| P1 | Full + selected AAA criteria | WCAG AAA for dense mode |
| P2 | Full + data portability (GDPR Art. 15-20) | Export functionality |
| P3 | LTI, SCORM, xAPI integration | Enterprise features |
| P4 | AI, voice, AR (emerging standards) | Vision features |

---

## 4. Capability Assessment

### 4.1 Existing Capabilities (Power-User Viewer Ready)

| Capability | Status | Component | Power-User Ready |
|------------|--------|-----------|-----------------|
| Dark mode | ✅ | ThemeToggle.tsx | Yes |
| Basic keyboard shortcuts | ✅ | KeyboardShortcuts.tsx | Partial (expand) |
| FSRS v4 spaced repetition | ✅ | @wikisites/query | Yes |
| Quiz engine | ✅ | Quiz.tsx | Yes |
| Flashcard system | ✅ | Flashcard.tsx | Yes |
| Pagefind search | ✅ | @wikisites/query | Augment |
| i18n (4 locales) | ✅ | astro-i18next | Yes |
| RTL support | ✅ | Tailwind rtl: | Yes |
| PWA | ✅ | Service worker | Extend |
| WCAG 2.1 AA | ✅ | axe-core E2E | Yes |
| prefers-reduced-motion | ✅ | CSS media query | Yes |
| Molecule viewer | ✅ | MoleculeViewer.tsx | Extend for 3D |
| Error boundary | ✅ | ErrorBoundary.tsx | Yes |
| Session stats | ✅ | SessionStats.tsx | Extend for dashboard |

### 4.2 New Capabilities Required

| Capability | Tier | Priority | Effort |
|------------|------|----------|--------|
| Command palette | P0 | Must | 1 week |
| Keyboard shortcut registry | P0 | Must | 3 days |
| Faceted search | P0 | Must | 3 days |
| Responsive multi-panel layout | P1 | Should | 1 week |
| Graph visualization | P1 | Should | 2 weeks |
| Dense mode | P1 | Should | 3 days |
| Progress dashboard | P1 | Should | 1 week |
| Graph data collection | P1 | Should | 3 days |
| Inline editor | P2 | Could | 2 weeks |
| Batch operations | P2 | Could | 1 week |
| Offline graph | P2 | Could | 3 days |
| Citation system | P2 | Could | 1 week |
| Real-time collaboration | P3 | Won't yet | 4 weeks |
| LTI integration | P3 | Won't yet | 3 weeks |
| SCORM export | P3 | Won't yet | 2 weeks |
| xAPI statements | P3 | Won't yet | 2 weeks |
| AI-powered search | P4 | Nice to have | 4 weeks |
| Voice commands | P4 | Nice to have | 2 weeks |
| AR peptide viewer | P4 | Nice to have | 4 weeks |

### 4.3 New Dependencies Required

| Package | Tier | Bundle Impact |
|---------|------|---------------|
| `fuse.js` | P0 | ~10KB gzipped |
| `d3-force`, `d3-selection`, `d3-zoom`, `d3-drag` | P1 | ~31KB gzipped |
| `chart.js` | P1 | ~20KB gzipped (tree-shakeable) |
| `diff-match-patch` | P2 | ~10KB gzipped |
| `markdown-it` | P2 | ~15KB gzipped |
| `idb` | P2 | ~3KB gzipped |

---

## 5. Multi-lingual Strategy

### 5.1 Current Locale Support

| Locale | Language | Script | Direction | Status |
|--------|----------|--------|-----------|--------|
| en | English | Latin | LTR | Primary |
| zh | Chinese (Simplified) | Han | LTR | Active |
| ja | Japanese | Han + Hiragana + Katakana | LTR | Active |
| ar | Arabic | Arabic | RTL | Active |

### 5.2 Power-User Viewer i18n Requirements

| Requirement | Tier | Notes |
|-------------|------|-------|
| Command palette labels localized | P0 | All command names, categories |
| Keyboard shortcut names localized | P1 | Display in user's locale |
| Graph node labels localized | P1 | Peptide names, pathway names |
| Search queries support CJK input | P0 | IME composition for zh/ja |
| RTL layout for command palette | P0 | Full mirroring for Arabic |
| Date/number formatting per locale | P1 | ICU-based formatting |
| Locale-aware sorting in lists | P2 | CLDR collation rules |

### 5.3 RTL Implementation

- Tailwind `rtl:` variant for directional styles
- `dir="rtl"` attribute on HTML element
- Bidi isolation for mixed LTR/RTL content (peptide names)
- Command palette mirroring for Arabic
- Graph node label alignment for RTL

---

## 6. Risk Register Summary

### 6.1 Top 5 Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Command palette keyboard conflicts | HIGH | Check OS/browser shortcuts; allow remapping |
| Scientific inaccuracy in community content | CRITICAL | Editorial review queue; expert moderation |
| Graph viz bundle size on mobile | MEDIUM | Lazy-load, Canvas rendering, 2D fallback |
| Feature learning curve | HIGH | Progressive disclosure; standard mode default |
| XSS via command palette input | HIGH | Input sanitization; CSP enforcement |

### 6.2 Risk Distribution

| Severity | Count | Mitigation Status |
|----------|-------|-------------------|
| CRITICAL | 1 | Active mitigation (editorial queue) |
| HIGH | 4 | Active mitigation planned |
| MEDIUM | 6 | Deferred to P2+ |
| LOW | 2 | Monitor |

---

## 7. Recommended Next Steps for Phase 0

### 7.1 Immediate Actions (Week 1)

| Action | Owner | Effort | Dependencies |
|--------|-------|--------|-------------|
| Create command palette component | Frontend | 5 days | Fuse.js install |
| Create keyboard shortcut registry | Frontend | 3 days | None |
| Extend existing KeyboardShortcuts.tsx | Frontend | 2 days | Registry |
| Add Fuse.js dependency | DevOps | 0.5 days | None |
| Update Tailwind config for dense mode tokens | Frontend | 1 day | None |
| Create graph data collection schema | Content | 2 days | Zod schema |
| Add P0 ARIA roles to new components | Frontend | 2 days | Components |

### 7.2 Sprint 1-2 (Weeks 2-4)

| Action | Owner | Effort | Dependencies |
|--------|-------|--------|-------------|
| Implement faceted search | Frontend | 3 days | Fuse.js |
| Create multi-panel layout | Frontend | 5 days | None |
| Implement dense mode | Frontend | 3 days | Tailwind tokens |
| Create graph visualization (basic) | Frontend | 10 days | D3 install |
| Create progress dashboard | Frontend | 5 days | FSRS data |
| E2E tests for power-user features | QA | 5 days | Components |

### 7.3 Sprint 3-4 (Weeks 5-8)

| Action | Owner | Effort | Dependencies |
|--------|-------|--------|-------------|
| Implement inline editor | Frontend | 10 days | markdown-it |
| Add batch operations | Frontend | 5 days | Multi-panel |
| Offline graph caching | Frontend | 3 days | IndexedDB |
| Citation resolution API | Backend | 5 days | CrossRef/NCBI APIs |
| xAPI statement tracking | Backend | 5 days | LRS setup |

### 7.4 Quality Gates

| Gate | Criteria | Status |
|------|----------|--------|
| Accessibility | WCAG 2.1 AA (all new features) | Pending |
| Performance | Command palette < 100ms, graph < 500ms | Pending |
| Bundle size | < 30KB gzipped (P0), < 55KB (P0+P1) | Pending |
| Test coverage | 80%+ for new components | Pending |
| i18n | All P0 strings localized in 4 locales | Pending |
| Security | No XSS/CSRF in new features | Pending |

---

## 8. Quality Gate Status

### 8.1 Current Compliance

| Gate | Status | Evidence |
|------|--------|----------|
| WCAG 2.1 AA | ✅ Pass | axe-core E2E tests |
| GDPR | ✅ Pass | Cookie consent, privacy policy |
| OWASP Top 10 | ✅ Pass | CSP, HSTS, rate limiting |
| TypeScript strict | ✅ Pass | `tsc --noEmit` zero errors |
| ESLint | ✅ Pass | Zero lint errors |
| Test coverage 80% | ✅ Pass | V8 coverage report |
| Build success | ✅ Pass | `astro build` completes |
| E2E dark mode | ✅ Pass | Playwright tests |
| E2E visual regression | ✅ Pass | Baseline screenshots |
| Lighthouse 90+ | ✅ Pass | CI pipeline |

### 8.2 Power-User Viewer Quality Gates (Pending)

| Gate | Target | Status |
|------|--------|--------|
| Command palette keyboard navigation | Full keyboard access | Pending |
| Multi-panel screen reader support | ARIA tablist/tab/tabpanel | Pending |
| Graph text alternative | Adjacency list for AT | Pending |
| Dense mode contrast | 7:1 ratio (AAA) | Pending |
| Graph animation frame rate | 60fps | Pending |
| Command palette load time | < 100ms | Pending |
| Offline graph availability | IndexedDB cache | Pending |
| Shortcut remapping | Settings panel | Pending |

---

**Document Status:** Complete
**Next Action:** Proceed to Phase 0 (Scaffold) — implement P0 features (command palette, keyboard shortcuts, faceted search)
**Owner:** Wikisites Development Team
**Review Cycle:** Update after each sprint
