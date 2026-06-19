# Domain Analysis: Wikisites Power-User Viewer Transformation

**Document ID:** DOM-ANALYSIS-002
**Version:** 2.0.0
**Date:** 2026-06-19
**Status:** Active
**Scope:** encyclopeptide.com and wikipept.com — Power-User Viewer Upgrade
**Phase:** -1 (Context Discovery — Power-User Viewer)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Transformation Context](#2-transformation-context)
3. [Primary Domain](#3-primary-domain)
4. [Applicable Standards](#4-applicable-standards)
5. [Multi-lingual Requirements](#5-multi-lingual-requirements)
6. [Domain-Specific Risks](#6-domain-specific-risks)
7. [Target User Personas](#7-target-user-personas)
8. [Power-User Viewer Scope](#8-power-user-viewer-scope)

---

## 1. Executive Summary

Wikisites is an established monorepo containing two educational oligopeptide sites — Encyclopeptide (encyclopeptide.com) and Wikipept (wikipept.com) — built on Astro 5.x, SolidJS 1.9, Tailwind CSS 4.x, TypeScript 5.9, and deployed to Cloudflare Pages + Workers. The project has shipped v1.0.0 with 158 articles, 680 quizzes, 502 flashcards, 12 learn lessons, 218 tests, and full CI/CD.

This domain analysis covers the transformation from content-heavy static sites into a **maximal, power-user viewer** — "VS Code for content." The power-user viewer paradigm shifts the user experience from passive reading to active, keyboard-driven, density-optimized exploration with command palettes, multi-panel layouts, graph visualization, and deep cross-referencing.

---

## 2. Transformation Context

### 2.1 Current State

| Dimension | Current | Target |
|-----------|---------|--------|
| Content | 158 articles, 680 quizzes, 502 flashcards | Same + 200 articles by month 6 |
| Navigation | Sidebar + search | Command palette + keyboard shortcuts + graph viz |
| Layout | Single-column reading | Multi-panel, split-view, customizable |
| Density | Standard web typography | Compact/power-user density option |
| Cross-refs | Inline links only | Bidirectional links, backlinks, graph |
| Interaction | Click-driven | Keyboard-first, mouse-optional |
| Data | Client-side (localStorage) | Client + edge sync (KV/D1) |
| Offline | PWA shell | Full offline article/quiz/graph access |

### 2.2 Competitive Positioning

From competitive benchmark (RCSB PDB, UniProt, Pepedia, Peptide2.com):

| Competitor Advantage | Wikipept Gap | Power-User Viewer Fix |
|---------------------|-------------|----------------------|
| 3D molecular visualization (RCSB PDB) | None | Mol* viewer integration |
| Peptide property calculator (Peptide2.com) | MW calculator only | Full property suite |
| Sequence search (UniProt) | Basic Pagefind | Filtered/faceted search |
| API access (RCSB PDB) | No API | REST + OpenAPI |
| Dense data views (UniProt) | Standard web | Power-user density mode |

---

## 3. Primary Domain

### 3.1 Domain Classification

- **Primary:** Educational content platform / scientific reference
- **Secondary:** Oligopeptide biochemistry knowledge base
- **Tertiary:** Community-driven learning system with spaced repetition

### 3.2 Domain Ontology

The oligopeptide domain maps to:

1. **Chemical classification** — chain length, chemical class, structural features
2. **Functional classification** — antimicrobial, hormonal, neuropeptides, immunomodulatory
3. **Source organism** — mammalian, microbial, marine, plant, synthetic
4. **Therapeutic application** — oncology, infectious disease, neurology, metabolic disorders
5. **Educational taxonomy** — foundational → intermediate → advanced → expert

### 3.3 Knowledge Graph Structure (Power-User Viewer)

The power-user viewer requires a formal knowledge graph:

- **Nodes:** Peptides, Amino Acids, Organisms, Diseases, Receptors, Pathways, Publications
- **Edges:** binds-to, inhibits, activates, derived-from, treats, references, similar-to
- **Properties:** affinity (Ki/IC50), molecular weight, charge, hydrophobicity, length

---

## 4. Applicable Standards

### 4.1 Accessibility Standards

| Standard | Clauses | Applicability |
|----------|---------|---------------|
| WCAG 2.1 AA | All success criteria | Mandatory — current compliance baseline |
| WCAG 2.1 AAA | 1.4.6 Contrast (Enhanced), 2.4.9 Link Purpose, 2.4.10 Section Headings | Target for power-user viewer (high-density mode needs enhanced contrast) |
| Section 508 | 1194.22 (Web-based) | US federal accessibility requirement |
| EN 301 549 | 4-13 (Accessibility requirements) | EU European Standard |
| ARIA 1.2 | All roles, states, properties | Command palette, keyboard navigation, focus management |

**Power-User Viewer Specifics:**
- Command palette must be keyboard-navigable (arrow keys, type-ahead, Enter/Esc)
- Multi-panel layouts must support screen reader panel switching
- Keyboard shortcut overlay must be WCAG compliant (no reliance on visual indicators alone)
- Graph visualization must have text-based alternative (adjacency list)

### 4.2 Privacy Standards

| Standard | Clauses | Applicability |
|----------|---------|---------------|
| GDPR | Arts. 5-6 (Principles), 12-14 (Transparency), 15-22 (Data Subject Rights), 25 (Privacy by Design), 32 (Security) | EU user data protection |
| CCPA | §1798.100-119 | California user privacy |
| ePrivacy Directive | Art. 5(3) | Cookie consent (already implemented) |

**Power-User Viewer Specifics:**
- localStorage data (FSRS progress, quiz history, preferences) subject to data portability (GDPR Art. 20)
- User preferences sync to cloud must be opt-in (GDPR Art. 6(1)(a))
- Command palette usage analytics must be anonymized

### 4.3 Security Standards

| Standard | Clauses | Applicability |
|----------|---------|---------------|
| OWASP Top 10 (2021) | A01-A10 | All web application security risks |
| NIST SP 800-53 Rev. 5 | AC (Access Control), AU (Audit), SC (System & Comm Protection) | Security controls |
| CSP Level 3 | Directives | Already implemented (CSP headers in Workers) |
| HSTS | Max-age, includeSubDomains | Already implemented |

**Power-User Viewer Specifics:**
- Command palette input must be sanitized (XSS prevention — OWASP A03)
- User-contributed annotations/comments require CSRF protection
- WebSocket connections (if used for real-time collab) require authentication

### 4.4 Web Standards

| Standard | Clauses | Applicability |
|----------|---------|---------------|
| HTML5 | Living Standard | Semantic markup, ARIA, microdata |
| CSS3 | Multiple modules | Tailwind CSS 4.x compliance |
| ES2024 | ECMAScript specification | TypeScript 5.9 target |
| URL Standard | URL parsing, history API | Multi-panel routing |
| Web Components | v1 | Potential for command palette widget |
| View Transitions API | Level 1 | Page transitions (Astro built-in) |
| Web Keyboard API | KeyboardEvent | Power-user viewer keyboard shortcuts |

### 4.5 Content Standards

| Standard | Clauses | Applicability |
|----------|---------|---------------|
| Dublin Core | All 15 elements | Article metadata (title, creator, subject, etc.) |
| Schema.org | CreativeWork, Article, Course | Structured data for SEO |
| IMS Common Cartridge | 1.0, 1.1 | Export quiz/flashcard content |
| LTI | 1.3 | Integration with LMS platforms |
| OpenURL | Z39.88 | Citation linking |

### 4.6 Educational Standards

| Standard | Clauses | Applicability |
|----------|---------|---------------|
| SCORM | 2004 4th Ed, cmi5 | Content packaging (future) |
| xAPI (Experience API) | Statement format, activity profiles | Learning record tracking |
| IEEE 1484.12.1 | LOM (Learning Object Metadata) | Content metadata |
| IMS QTI | 3.0 | Quiz/assessment interchange |

### 4.7 Quality Standards

| Standard | Clauses | Applicability |
|----------|---------|---------------|
| ISO/IEC 25010:2011 | 8 quality characteristics, 31 subcharacteristics | Software quality model |
| ISO/IEC 25012 | Data quality model | Content data quality |
| ISO 9001:2015 | Quality management system | Process quality |

### 4.8 Internationalization Standards

| Standard | Clauses | Applicability |
|----------|---------|---------------|
| ICU | MessageFormat, plural rules | i18n message formatting |
| CLDR | Locale data | Locale-specific formatting |
| BCP 47 | Language tags | Locale identifiers (en, zh, ja, ar) |
| UAX #9 | Unicode Bidirectional Algorithm | RTL for Arabic |
| UTS #35 | Unicode Locale Data | Locale-specific collation, date/time |

---

## 5. Multi-lingual Requirements

### 5.1 Current Locale Support

| Locale | Language | Script | Direction | Status |
|--------|----------|--------|-----------|--------|
| en | English | Latin | LTR | Primary |
| zh | Chinese (Simplified) | Han | LTR | Active |
| ja | Japanese | Han + Hiragana + Katakana | LTR | Active |
| ar | Arabic | Arabic | RTL | Active |

### 5.2 Power-User Viewer i18n Requirements

| Requirement | Priority | Notes |
|-------------|----------|-------|
| Command palette labels localized | P0 | All command names, categories, descriptions |
| Keyboard shortcut names localized | P1 | Display in user's locale |
| Graph node labels localized | P1 | Peptide names, pathway names |
| Search queries support CJK input | P0 | IME composition for zh/ja |
| RTL layout for command palette | P0 | Full mirroring for Arabic |
| Date/number formatting per locale | P1 | ICU-based formatting |
| Content direction detection | P2 | Auto-detect mixed LTR/RTL content |
| Locale-aware sorting in lists | P2 | CLDR collation rules |

### 5.3 Translation Pipeline

- Content translation via MDX frontmatter locale variants
- UI string extraction and translation via i18n framework
- RTL layout via Tailwind CSS `rtl:` variant + `dir="rtl"` attribute
- Locale switching persisted in `localStorage` + URL path prefix

---

## 6. Domain-Specific Risks

### 6.1 Risk Register

| Risk ID | Category | Risk | Likelihood | Impact | Severity | Priority |
|---------|----------|------|------------|--------|----------|----------|
| R-001 | Technical | 3D viewer performance on mobile | High | High | HIGH | P0 |
| R-002 | Technical | Search at scale (10K+ articles) | Medium | High | HIGH | P1 |
| R-003 | Technical | Edge sync data conflicts | Medium | Medium | MEDIUM | P2 |
| R-004 | Technical | Command palette keyboard conflicts | High | Medium | HIGH | P1 |
| R-005 | Technical | Graph viz bundle size on mobile | Medium | Medium | MEDIUM | P2 |
| R-006 | Content | Scientific inaccuracy in community content | High | High | CRITICAL | P0 |
| R-007 | Content | IP/licensing of imported data | Medium | High | HIGH | P1 |
| R-008 | Content | Stale/contradictory cross-references | Medium | Medium | MEDIUM | P2 |
| R-009 | UX | Feature learning curve (power-user viewer) | High | Medium | HIGH | P1 |
| R-010 | UX | Information overload (dense mode) | Medium | Medium | MEDIUM | P2 |
| R-011 | Operational | Data loss during edge sync | Low | High | MEDIUM | P2 |
| R-012 | Operational | Supply chain compromise (npm) | Low | High | MEDIUM | P1 |
| R-013 | Regulatory | GDPR non-compliance (data export) | Low | High | MEDIUM | P2 |
| R-014 | Security | XSS via command palette input | Medium | High | HIGH | P0 |
| R-015 | Security | CSRF on annotation endpoints | Medium | High | HIGH | P0 |

### 6.2 Mitigation Strategies

- **R-001:** Lazy-load 3D viewer, provide 2D fallback, limit to desktop by default
- **R-004:** Command palette uses Cmd/Ctrl+K; check for conflicts with OS/browser shortcuts; allow shortcut remapping
- **R-006:** Editorial review queue for community content; expert moderation; fact-checking pipeline
- **R-009:** Progressive disclosure — power-user features available but not required; "standard" mode as default
- **R-014:** Input sanitization on all command palette queries; CSP `script-src` enforcement

---

## 7. Target User Personas

### 7.1 Power-User Researcher

| Attribute | Value |
|-----------|-------|
| **Role** | Academic researcher, bioinformatician |
| **Goals** | Quick peptide lookup, cross-reference exploration, citation gathering |
| **Pain Points** | Slow navigation, can't compare multiple articles, no keyboard shortcuts |
| **Power-User Features** | Command palette, multi-panel view, graph visualization, keyboard shortcuts, dense mode |
| **Tech Comfort** | High — uses VS Code, terminal, keyboard-heavy workflows |
| **Frequency** | Daily |
| **Languages** | EN primary, may use ZH/JA |

### 7.2 Power-User Student

| Attribute | Value |
|-----------|-------|
| **Role** | Graduate/undergraduate student studying biochemistry |
| **Goals** | Learn peptide biology, prepare for exams, review with spaced repetition |
| **Pain Points** | Fragmented learning across quizzes/flashcards/articles, no unified progress view |
| **Power-User Features** | Unified dashboard, keyboard-driven review, progress analytics, spaced repetition scheduling |
| **Tech Comfort** | Medium-high — comfortable with web apps, some keyboard shortcuts |
| **Frequency** | Daily during study periods |
| **Languages** | EN, ZH, JA |

### 7.3 Power-User Contributor

| Attribute | Value |
|-----------|-------|
| **Role** | Subject matter expert contributing content |
| **Goals** | Edit articles, add annotations, review community content |
| **Pain Points** | Slow editorial workflow, no quick-edit capability, limited diff visualization |
| **Power-User Features** | Quick-edit command, inline diff, citation auto-complete, batch operations |
| **Tech Comfort** | High — familiar with markdown, git-like workflows |
| **Frequency** | Weekly |
| **Languages** | EN |

### 7.4 Casual Reader

| Attribute | Value |
|-----------|-------|
| **Role** | Science enthusiast, general public |
| **Goals** | Learn about peptides casually, read articles |
| **Pain Points** | Overwhelmed by advanced features, prefers simple reading experience |
| **Power-User Features** | Standard mode (default), search, basic navigation |
| **Tech Comfort** | Low-medium — standard web browsing |
| **Frequency** | Occasional |
| **Languages** | EN |

### 7.5 Persona-to-Feature Matrix

| Feature | Researcher | Student | Contributor | Casual |
|---------|-----------|---------|-------------|--------|
| Command palette | Primary | Secondary | Primary | Avoid |
| Keyboard shortcuts | Primary | Secondary | Primary | Avoid |
| Multi-panel view | Primary | Secondary | Secondary | Avoid |
| Graph visualization | Primary | Secondary | Secondary | Avoid |
| Dense mode | Primary | Optional | Primary | Avoid |
| Standard mode | Avoid | Primary | Avoid | Primary |
| Search + filters | Primary | Primary | Primary | Primary |
| Spaced repetition | Avoid | Primary | Avoid | Avoid |
| Inline editing | Optional | Avoid | Primary | Avoid |
| Progress dashboard | Optional | Primary | Avoid | Avoid |

---

## 8. Power-User Viewer Scope

### 8.1 Feature Tiers

| Tier | Features | Target Users | Priority |
|------|----------|-------------|----------|
| **P0** (Must Have) | Command palette, keyboard shortcuts, search improvements, responsive layout | All | Launch blocker |
| **P1** (Should Have) | Multi-panel view, graph visualization, dense mode, progress dashboard | Power users | Sprint 1-2 |
| **P2** (Could Have) | Inline editing, citation auto-complete, batch operations, offline graph | Contributors | Sprint 3-4 |
| **P3** (Won't Have Yet) | Real-time collaboration, LMS integration (LTI), SCORM export | Enterprise | Future |
| **P4** (Nice to Have) | AI-powered search, voice commands, AR peptide viewer | All | Vision |

### 8.2 Integration Points with Existing Architecture

| Integration Point | Current Component | Power-User Viewer Addition |
|-------------------|-------------------|---------------------------|
| Astro pages | `src/pages/*.astro` | Multi-panel route layout, command palette overlay |
| SolidJS components | `src/components/*.tsx` | CommandPalette.tsx, MultiPanel.tsx, GraphView.tsx, DenseMode.tsx |
| Keyboard shortcuts | `KeyboardShortcuts.tsx` | Expanded shortcut system, shortcut registry, Cmd+K palette |
| Search | Pagefind | Faceted search, filters, Cmd+K quick search |
| Tailwind CSS | `tailwind.config.*` | Dense mode tokens, multi-panel grid, graph styles |
| i18n | `astro-i18next` | Localized command labels, RTL palette |
| State management | localStorage + SolidJS signals | Persistent user preferences, panel state, shortcut remapping |
| Cloudflare Workers | `@wikisites/workers` | User preference sync API, annotation endpoints |
| Cloudflare KV/D1 | D1 schema | User preferences storage, panel layout persistence |

### 8.3 Performance Constraints

| Constraint | Target | Rationale |
|------------|--------|-----------|
| TTFB | < 100ms | Edge deployment, static-first |
| LCP | < 2.5s | Core Web Vitals |
| CLS | < 0.1 | Core Web Vitals |
| FID | < 100ms | Core Web Vitals |
| Total JS per page | < 50KB gzipped | Power-user components must not bloat bundle |
| Command palette load | < 100ms | Must feel instant |
| Graph render (100 nodes) | < 500ms | Interactive graph visualization |
| 3D viewer initial load | < 2s (lazy) | Heavy component, deferred |
| Offline article cache | < 50MB per site | PWA service worker storage limit |
| Build time | < 30s (158 articles) | CI/CD pipeline constraint |

### 8.4 Browser Compatibility

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 100+ | Primary development target |
| Firefox | 100+ | Secondary target |
| Safari | 16+ | iOS Safari critical for mobile |
| Edge | 100+ | Chromium-based, same as Chrome |
| iOS Safari | 16+ | PWA support, service worker |
| Samsung Internet | 20+ | Android market share |

### 8.5 Accessibility Targets for Power-User Viewer

| Target | Standard | Notes |
|--------|----------|-------|
| WCAG 2.1 AA | Baseline | All existing + new features |
| WCAG 2.1 AAA | 1.4.6, 2.4.9, 2.4.10 | Contrast, link purpose, section headings |
| ARIA 1.2 | All applicable | Command palette, graph viz, multi-panel |
| Keyboard-only navigation | Full | Every action accessible without mouse |
| Screen reader compatibility | NVDA, VoiceOver, JAWS | All interactive elements |

---

**Document Status:** Complete
**Next Action:** Proceed to Phase 0 (Scaffold) with power-user viewer feature specifications
**Owner:** Wikisites Development Team
**Review Cycle:** Update after each sprint
