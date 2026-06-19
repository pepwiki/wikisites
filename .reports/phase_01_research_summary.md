---
document_id: RPT-PHASE-01-UI-001
title: "Phase 1 Research Summary: Power User Shell UI Features"
version: "1.0.0"
date: "2026-06-19"
status: Final
project: "Wikisites — Dual-Site Oligopeptide Educational Platform"
---

# Phase 1 Research Summary: Power User Shell UI Features

**Document ID:** RPT-PHASE-01-UI-001
**Version:** 1.0.0
**Date:** 2026-06-19
**Status:** Final
**Project:** Wikisites — Dual-Site Oligopeptide Educational Platform

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Research Scope](#2-research-scope)
3. [Yellow Papers Produced](#3-yellow-papers-produced)
4. [Key Design Decisions](#4-key-design-decisions)
5. [Accessibility Compliance](#5-accessibility-compliance)
6. [Performance Budget](#6-performance-budget)
7. [Research Sources](#7-research-sources)
8. [Deliverables Inventory](#8-deliverables-inventory)
9. [Risk Assessment](#9-risk-assessment)
10. [Recommendations for Implementation](#10-recommendations-for-implementation)

---

## 1. Executive Summary

### 1.1 Research Completion Assessment

Phase 1 Epistemological Discovery for P0 Power User Shell features has been completed. Four Yellow Papers have been produced covering the Command Palette, Keyboard Shortcuts, Outline/Minimap Panel, and Breadcrumb Navigation features.

### 1.2 Key Metrics

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Yellow Papers produced | 4 | 4 | PASS |
| Test vector sets | 4 | 4 | PASS |
| Domain constraint sets | 1 | 1 | PASS |
| ARIA patterns documented | 4 | 4 | PASS |
| Bibliography citations | 20+ | 32 | PASS |

### 1.3 Summary of Findings

The research identifies established patterns from VS Code, Obsidian, cmdk, kbar, and WAI-ARIA Authoring Practices Guide. Key technical decisions include:

- **Command Palette:** fzy-style fuzzy matching with O(n·m) complexity, WAI-ARIA Combobox pattern
- **Keyboard Shortcuts:** Priority-based conflict resolution, chord sequence support, platform-aware modifiers
- **Outline Panel:** IntersectionObserver scroll-sync, CSS-only minimap, WAI-ARIA Tree View pattern
- **Breadcrumbs:** Schema.org BreadcrumbList, responsive overflow, WAI-ARIA Breadcrumb pattern

---

## 2. Research Scope

### 2.1 P0 Features Under Investigation

| Feature | Priority | Description |
|---------|----------|-------------|
| Command Palette | P0 | Universal action launcher (Ctrl+Shift+P) |
| Keyboard Shortcuts | P0 | Full site navigation without mouse |
| Outline/Minimap Panel | P0 | Document overview navigation |
| Breadcrumbs | P0 | Deep hierarchy navigation |

### 2.2 Research Methodology

1. **Literature Review:** WAI-ARIA APG patterns, academic fuzzy matching algorithms
2. **Implementation Analysis:** cmdk, kbar, VS Code source patterns
3. **Framework Research:** SolidJS patterns, Kobalte accessible components
4. **Performance Analysis:** Core Web Vitals constraints, bundle size budgets

---

## 3. Yellow Papers Produced

### 3.1 YP-UI-COMMAND-PALETTE-001

**Scope:** Command Palette — Universal Action Launcher

**Key Specifications:**
- Fuzzy matching via fzy-style scoring algorithm
- WAI-ARIA Combobox pattern with `aria-activedescendant`
- Portal-based rendering with focus trap
- Maximum 2000 commands before virtualization required
- <20ms latency budget for fuzzy matching

**Algorithm:**
- Consecutive character bonus: +10 per match
- Word boundary bonus: +15
- CamelCase bonus: +12
- First character bonus: +5
- Long item penalty: -0.5 per character

### 3.2 YP-UI-KEYBOARD-SHORTCUTS-001

**Scope:** Keyboard Shortcut System

**Key Specifications:**
- Remappable keybinding registry
- Priority-based conflict resolution (scope > priority > recency)
- Chord sequence support with 1000ms timeout
- Platform-aware modifiers (⌘ on Mac, Ctrl on Windows/Linux)
- ARIA live region for shortcut announcements

**Conflict Resolution:**
1. Scope precedence: component > page > global
2. Priority precedence: higher number wins
3. Recency precedence: most recently registered wins
4. Platform override: user customizations override defaults

### 3.3 YP-UI-OUTLINE-PANEL-001

**Scope:** Outline/Minimap Panel

**Key Specifications:**
- AST-based heading extraction from Astro content collections
- IntersectionObserver scroll-sync (not scroll events)
- CSS-only minimap (no canvas overhead)
- Virtual scrolling for 100+ headings
- WAI-ARIA Tree View pattern

**Scroll Sync:**
- Root margin: `-10% 0px -80% 0px`
- Trigger near top of viewport
- 16ms debounce (60fps frame budget)

### 3.4 YP-UI-BREADCRUMBS-001

**Scope:** Breadcrumb Navigation

**Key Specifications:**
- Schema.org BreadcrumbList structured data
- WAI-ARIA breadcrumb pattern with `aria-current="page"`
- Responsive collapse at 480px viewport
- Maximum 5 visible items
- URL-based hierarchy resolution

**Responsive Behavior:**
- Desktop (≥768px): Full trail visible
- Tablet (480-767px): First + ellipsis + last
- Mobile (<480px): Back button with previous item

---

## 4. Key Design Decisions

### 4.1 Command Palette Architecture

**Decision:** Use fzy-style scoring over Smith-Waterman alignment
**Rationale:** O(n·m) complexity sufficient for <2000 commands; Smith-Waterman overkill
**Trade-off:** Slightly lower accuracy for large typo tolerance, but 10x faster

### 4.2 Keyboard Shortcut System

**Decision:** Modal shortcuts (Vim-like) as opt-in power user feature
**Rationale:** Most users prefer modeless; power users want modal efficiency
**Trade-off:** Added complexity, but default modeless keeps simple path

### 4.3 Outline Panel Rendering

**Decision:** CSS-only minimap over canvas rendering
**Rationale:** Hardware-accelerated, no JavaScript overhead, automatically updates
**Trade-off:** Less control over rendering, but sufficient for document overview

### 4.4 Breadcrumb Hierarchy

**Decision:** URL-based resolution over content-based parsing
**Rationale:** Simpler implementation, works with any content structure
**Trade-off:** Requires consistent URL structure, but Astro collections enforce this

---

## 5. Accessibility Compliance

### 5.1 WCAG 2.1 Level AA Requirements

| Requirement | Feature | Implementation |
|-------------|---------|----------------|
| 1.1.1 Non-text Content | All | Icons have alt text |
| 1.3.1 Info and Relationships | All | ARIA roles and properties |
| 1.4.3 Contrast Minimum | All | 4.5:1 ratio enforced |
| 2.1.1 Keyboard | All | Full keyboard operability |
| 2.1.2 No Keyboard Trap | Palette | Escape dismisses |
| 2.4.7 Focus Visible | All | Visible focus indicators |
| 4.1.2 Name, Role, Value | All | ARIA semantics |

### 5.2 ARIA Patterns Implemented

| Pattern | Reference | Components |
|---------|-----------|------------|
| Combobox | WAI-ARIA APG | Command Palette |
| Tree View | WAI-ARIA APG | Outline Panel |
| Breadcrumb | WAI-ARIA APG | Breadcrumb Navigation |
| Dialog | WAI-ARIA APG | Command Palette Modal |
| Live Region | WAI-ARIA APG | Shortcut Announcements |

---

## 6. Performance Budget

### 6.1 Bundle Size

| Component | Max (KB) | Gzipped (KB) | Loading |
|-----------|----------|--------------|---------|
| Command Palette | 15 | 5 | Lazy |
| Keyboard Shortcuts | 8 | 3 | Critical |
| Outline Panel | 12 | 4 | Lazy |
| Breadcrumbs | 3 | 1 | Critical |
| **Total** | **38** | **13** | — |

### 6.2 Latency Targets

| Operation | Target (ms) | Max (ms) |
|-----------|-------------|----------|
| Palette open | 50 | 100 |
| Fuzzy match (100 cmds) | 5 | 10 |
| Fuzzy match (1000 cmds) | 20 | 30 |
| Shortcut detection | 1 | 5 |
| Scroll sync | 16 | 32 |

### 6.3 Core Web Vitals Impact

| Metric | Max Impact | Rationale |
|--------|------------|-----------|
| LCP | +50ms | UI must not delay LCP |
| FID | +10ms | Minimal main thread blocking |
| CLS | +0.05 | No layout shift |
| INP | +50ms | Interaction budget |

---

## 7. Research Sources

### 7.1 Primary Sources

| # | Source | URL | Relevance |
|---|--------|-----|-----------|
| 1 | WAI-ARIA Combobox Pattern | https://www.w3.org/WAI/ARIA/apg/patterns/combobox/ | Command Palette accessibility |
| 2 | WAI-ARIA Tree View Pattern | https://www.w3.org/WAI/ARIA/apg/patterns/treeview/ | Outline Panel accessibility |
| 3 | WAI-ARIA Breadcrumb Pattern | https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/ | Breadcrumb accessibility |
| 4 | cmdk (Paco Coursey) | https://github.com/pacocoursey/cmdk | React command palette reference |
| 5 | kbar (Tim Chang) | https://github.com/timc1/kbar | Action registry pattern |
| 6 | VS Code Command Palette | https://code.visualstudio.com/docs/getstarted/userinterface#command-palette | UX paradigm |
| 7 | fzf Algorithm | https://github.com/junegunn/fzf | Fuzzy matching reference |
| 8 | SolidJS Documentation | https://docs.solidjs.com/ | Framework reference |
| 9 | Kobalte | https://kobalte.dev/ | SolidJS accessible components |
| 10 | Core Web Vitals | https://web.dev/vitals/ | Performance budget |

### 7.2 Secondary Sources

| # | Source | URL | Relevance |
|---|--------|-----|-----------|
| 11 | hotkeys.js | https://github.com/jaywcjlove/hotkeys | JavaScript key handling |
| 12 | Virtual Scrolling Patterns | https://www.patterns.dev/posts/virtual-listing/ | Performance pattern |
| 13 | Schema.org BreadcrumbList | https://schema.org/BreadcrumbList | Structured data |
| 14 | Google Breadcrumb Guidelines | https://developers.google.com/search/docs/appearance/structured-data/breadcrumb | SEO |
| 15 | Astro Content Collections | https://docs.astro.build/en/guides/content-collections/ | Build-time extraction |
| 16 | CSS Transforms Performance | https://web.dev/stick-to-compositor-friendly-properties/ | Rendering optimization |
| 17 | IntersectionObserver MDN | https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver | Scroll sync |
| 18 | Vim Modal Editing | https://vimdoc.sourceforge.net/ | Modal interaction model |
| 19 | Web Keyboard Shortcuts | https://web.dev/keyboard-shortcuts/ | Best practices |
| 20 | ARIA Keyboard Patterns | https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/ | Accessibility patterns |

---

## 8. Deliverables Inventory

### 8.1 Yellow Papers

| Document ID | Title | Status | File |
|-------------|-------|--------|------|
| YP-UI-COMMAND-PALETTE-001 | Command Palette | DRAFT | .specs/01_research/YP-UI-COMMAND-PALETTE-001.md |
| YP-UI-KEYBOARD-SHORTCUTS-001 | Keyboard Shortcuts | DRAFT | .specs/01_research/YP-UI-KEYBOARD-SHORTCUTS-001.md |
| YP-UI-OUTLINE-PANEL-001 | Outline/Minimap Panel | DRAFT | .specs/01_research/YP-UI-OUTLINE-PANEL-001.md |
| YP-UI-BREADCRUMBS-001 | Breadcrumb Navigation | DRAFT | .specs/01_research/YP-UI-BREADCRUMBS-001.md |

### 8.2 Supporting Documents

| Document ID | Title | Status | File |
|-------------|-------|--------|------|
| TVS-UI-COMMANDS-001 | UI Commands Test Vectors | DRAFT | .specs/01_research/test_vectors/test_vectors_ui_commands.toml |
| DCS-UI-001 | UI Domain Constraints | DRAFT | .specs/01_research/domain_constraints/domain_constraints_ui.toml |
| YP-REGISTRY-001 | Yellow Paper Registry | UPDATED | .specs/01_research/yellow_paper_registry.toml |

---

## 9. Risk Assessment

### 9.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Fuzzy match performance with 2000+ commands | Medium | High | Virtual scrolling fallback |
| Chord sequence conflicts with browser shortcuts | High | Medium | Reserved shortcut list |
| IntersectionObserver browser support | Low | Medium | Scroll event fallback |
| Bundle size exceeding budget | Medium | High | Code splitting, lazy loading |

### 9.2 Accessibility Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Screen reader testing incomplete | Medium | High | Manual testing with NVDA/VoiceOver |
| Focus trap issues in palette | Low | High | Radix UI Dialog reference |
| Keyboard navigation edge cases | Medium | Medium | Comprehensive test vectors |

---

## 10. Recommendations for Implementation

### 10.1 Implementation Order

1. **Phase 2.1:** Keyboard Shortcuts (foundational, enables power user testing)
2. **Phase 2.2:** Command Palette (depends on shortcut registry)
3. **Phase 2.3:** Breadcrumbs (simple, high value)
4. **Phase 2.4:** Outline Panel (most complex, benefits from other components)

### 10.2 Library Selection

| Component | Recommended | Rationale |
|-----------|-------------|-----------|
| Command Palette | Custom (based on cmdk patterns) | SolidJS compatibility, bundle control |
| Keyboard Shortcuts | Custom (hotkeys.js patterns) | Full control over chord sequences |
| Accessible Components | Kobalte | SolidJS-native, WAI-ARIA compliant |
| Focus Management | Custom + Kobalte | Modal/focus trap requirements |

### 10.3 Testing Strategy

1. **Unit Tests:** Fuzzy match scoring, conflict resolution, hierarchy resolution
2. **Component Tests:** SolidJS Testing Library for all components
3. **Accessibility Tests:** axe-core automated + manual screen reader testing
4. **E2E Tests:** Playwright for keyboard navigation and integration
5. **Performance Tests:** Bundle size monitoring, latency benchmarks

---

## Appendix A: Glossary

| Term | Definition |
|------|-----------|
| Chord | Multi-key sequence (e.g., Ctrl+K, Ctrl+C) |
| Combobox | ARIA pattern combining input with popup listbox |
| Focus Trap | Keyboard confinement within modal dialog |
| Fuzzy Match | Scoring algorithm for partial string matching |
| IntersectionObserver | Browser API for detecting element visibility |
| Minimap | Scaled visual representation of document structure |
| Modal | State where specific shortcuts are active |
| Tree View | Expandable/collapsible hierarchical list pattern |

---

**Document Status:** Final  
**Next Phase:** Phase 2 — Architecture Design  
**Reviewer:** Pending  
**Approval:** Pending
