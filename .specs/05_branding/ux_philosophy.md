# Shared UX Philosophy — Wikisites Platform

**Document ID:** UX-PHILO-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** Final
**Project:** Wikisites — Dual-Site Oligopeptide Educational Platform

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Design Principles](#2-design-principles)
3. [Interaction Patterns](#3-interaction-patterns)
4. [Navigation Architecture](#4-navigation-architecture)
5. [Responsive Design Strategy](#5-responsive-design-strategy)
6. [Dark Mode Implementation](#6-dark-mode-implementation)
7. [Animation Philosophy](#7-animation-philosophy)
8. [Error State Design](#8-error-state-design)

---

## 1. Executive Summary

This document defines the shared UX philosophy that unifies encyclopeptide.com and wikipept.com under a coherent design language while respecting each site's distinct brand identity. Despite serving different audiences with different tones, both sites share core principles of clarity, accessibility, performance, and delight that inform every interaction pattern, navigation decision, and visual treatment.

**Shared Principles Across Both Sites:**

| Principle | encyclopeptide.com | wikipept.com |
|-----------|-------------------|--------------|
| Clarity | Data density without confusion | Simplicity without shallowness |
| Accessibility | WCAG 2.1 AA minimum | WCAG 2.1 AA minimum |
| Performance | < 2.5s LCP | < 2.0s LCP |
| Delight | Elegant precision | Friendly encouragement |

---

## 2. Design Principles

### 2.1 Clarity

**"Every element earns its place on screen."**

Clarity is the foundational principle. Both sites deal with complex scientific information — the design must reduce cognitive load, not add to it.

| Sub-Principle | Description | encyclopeptide.com | wikipept.com |
|---------------|-------------|-------------------|--------------|
| **Visual hierarchy** | Most important elements are visually dominant; scanning is effortless | Monograph title → sequence → key data → full content | Learning objective → key concept → interactive element → details |
| **Information scent** | Users always know where they are, where they can go, and what happens next | Breadcrumbs, table of contents, "Related entries" links | Progress bars, module map, "Up next" prompts |
| **Progressive disclosure** | Reveal complexity only when the user requests or needs it | Collapsible sections; expandable data tables; "Show more" for long references | Difficulty levels; expandable explanations; "Go deeper" links |
| **Consistency** | Similar elements behave similarly across both sites | Same modal patterns, same toast notification style, same search interaction | Same card patterns, same quiz flow, same progress indicators |
| **Minimal decoration** | Visual elements serve functional or brand purposes only | No decorative illustrations; molecular diagrams are data, not decoration | Icons communicate function; illustrations support understanding |

### 2.2 Accessibility

**"If it's not accessible, it's not done."**

Accessibility is not a feature — it's a quality requirement. Both sites must be usable by everyone, regardless of ability.

| Sub-Principle | Description | Implementation |
|---------------|-------------|----------------|
| **Universal access** | Every user can access every piece of content | Screen reader compatibility; keyboard navigation; voice control support |
| **Equitable experience** | Accessibility features provide equivalent value, not degraded experience | 3D viewer has 2D fallback with full data; quizzes work with screen readers |
| **Proactive compliance** | Build accessibility in; don't retrofit | Accessibility linting in CI/CD; automated axe-core testing; manual audit per release |
| **Assistive technology** | Support current and emerging assistive technologies | ARIA live regions for dynamic content; semantic HTML; proper heading hierarchy |
| **Cognitive accessibility** | Design for diverse cognitive abilities | Clear language; consistent navigation; predictable interactions; error prevention |

**Accessibility Checklist (Both Sites):**

| # | Check | Standard | Automated | Manual |
|---|-------|----------|-----------|--------|
| 1 | Color contrast ≥ 4.5:1 (text) | WCAG 1.4.3 | axe-core | Spot check |
| 2 | All images have alt text | WCAG 1.1.1 | axe-core | Review |
| 3 | Full keyboard navigation | WCAG 2.1.1 | Keyboard testing | User testing |
| 4 | Focus visible on all interactive elements | WCAG 2.4.7 | Visual inspection | User testing |
| 5 | Heading hierarchy valid | WCAG 1.3.1 | axe-core | — |
| 6 | ARIA labels on interactive elements | WCAG 4.1.2 | axe-core | Screen reader test |
| 7 | Form inputs have associated labels | WCAG 1.3.1 | axe-core | — |
| 8 | Error messages linked to inputs | WCAG 3.3.1 | axe-core | — |
| 9 | No auto-playing media | WCAG 1.4.2 | Manual | — |
| 10 | Reduced motion supported | WCAG 2.3.3 | Manual | User testing |

### 2.3 Performance

**"Speed is a feature. Slow is broken."**

Performance directly impacts learning outcomes and user retention. Every millisecond of load time is a barrier between the user and the knowledge they seek.

| Sub-Principle | Description | Implementation |
|---------------|-------------|----------------|
| **Perceived performance** | Make the site feel fast even when loading | Skeleton screens; optimistic updates; progressive image loading |
| **Actual performance** | Be fast on real devices and networks | Static generation; minimal JS; lazy loading; code splitting |
| **Performance budgets** | Enforce limits in CI/CD | Bundle size thresholds; Lighthouse score gates; build time limits |
| **Device awareness** | Respect device capabilities and constraints | Reduce animation on low-power devices; lower image quality on slow connections |
| **Offline support** | Core functionality available without network | Service workers for cached content; local quiz progress; offline flashcard review |

**Performance Targets:**

| Metric | encyclopeptide.com | wikipept.com |
|--------|-------------------|--------------|
| LCP | < 2.5s | < 2.0s |
| FID | < 100ms | < 100ms |
| CLS | < 0.1 | < 0.1 |
| INP | < 200ms | < 200ms |
| TTFB | < 200ms | < 200ms |
| Total page weight | < 500KB | < 400KB |
| JS bundle (initial) | < 150KB | < 120KB |
| Time to Interactive | < 3.0s | < 2.5s |

### 2.4 Delight

**"Science is beautiful. Let the design reflect that."**

Delight is not about decoration — it's about creating moments that reward attention, celebrate progress, and make the experience of engaging with scientific content genuinely enjoyable.

| Sub-Principle | Description | encyclopeptide.com | wikipept.com |
|---------------|-------------|-------------------|--------------|
| **Microinteractions** | Small, meaningful animations that confirm actions | Smooth table sort transitions; elegant citation expand; clean search result highlight | Satisfying card flip; confetti on quiz completion; streak celebration |
| **Visual polish** | Precise spacing, consistent alignment, refined typography | Journal-quality layout; crisp data tables; refined molecular visualization | Clean card layouts; friendly iconography; warm color transitions |
| **Mastery moments** | Celebrate user achievement and knowledge growth | "New monograph added to your reading list" | "You've mastered 50 amino acid flashcards!" |
| **Surprise and reward** | Unexpected positive moments that exceed expectations | Auto-generated citation in user's preferred format | Random "Did you know?" facts between quiz questions |
| **Craftsmanship** | Attention to detail that communicates quality | Perfectly aligned data columns; consistent citation formatting | Pixel-perfect card shadows; smooth loading transitions |

---

## 3. Interaction Patterns

### 3.1 Universal Patterns

These patterns are shared across both sites with brand-appropriate styling.

#### 3.1.1 Search

| Property | Value |
|----------|-------|
| Trigger | Search icon in navigation; `/` keyboard shortcut |
| Placement | Top navigation bar, centered |
| Behavior | Typeahead with debounced results (200ms delay) |
| Results display | Dropdown cards below input; max 10 results; "View all X results" link |
| Keyboard | Arrow keys to navigate; Enter to select; Escape to close |
| ENCP result card | Peptide name, sequence snippet, classification tags, match score |
| WIKI result card | Module title, difficulty badge, match snippet, estimated time |

#### 3.1.2 Modal/Dialog

| Property | Value |
|----------|-------|
| Trigger | Explicit user action (button click); never auto-open |
| Overlay | Semi-transparent dark background (rgba(0,0,0,0.5)) |
| Positioning | Centered vertically and horizontally; max-width 600px |
| Focus trap | Tab cycles within modal; Escape closes |
| Close | X button (top-right); clicking overlay; Escape key |
| Animation | Fade in + scale (200ms ease-out); reverse on close |

#### 3.1.3 Toast Notifications

| Property | Value |
|----------|-------|
| Position | Bottom-right (desktop); bottom-center (mobile) |
| Duration | 5s (info); 8s (success); 10s (error); persistent (critical) |
| Dismiss | Click X or swipe (mobile); auto-dismiss after duration |
| Max visible | 3 (stacked vertically, newest at bottom) |
| ENCP style | Dark Navy background; White text; Gold accent border |
| WIKI style | White background; Gray 900 text; Teal or Coral accent border |

#### 3.1.4 Loading States

| Pattern | Usage | ENCP Implementation | WIKI Implementation |
|---------|-------|---------------------|---------------------|
| Skeleton screen | Page load; data fetch | Dark Navy shimmer on Navy Light background | Teal shimmer on White background |
| Spinner | Inline loading; button actions | Gold spinning circle | Teal spinning circle |
| Progress bar | Determinate operations | Gold fill on Navy track | Teal fill on Gray 200 track |
| Content placeholder | Async content areas | Monograph layout skeleton with data table | Card grid skeleton with progress bars |

### 3.2 Site-Specific Patterns

#### 3.2.1 encyclopeptide.com Specific

| Pattern | Description |
|---------|-------------|
| **Citation hover** | Hover over citation number → popup shows full reference with DOI link |
| **Data table interaction** | Click column header to sort; shift+click for multi-sort; right-click for column menu |
| **Molecular viewer** | Click-and-drag to rotate; scroll to zoom; double-click to reset; controls overlay |
| **Cross-reference navigation** | Click peptide name in text → inline expansion with key data; click again to navigate to full monograph |
| **Version diff view** | Toggle between current and previous version; additions highlighted in Green; deletions in Red; inline comments |

#### 3.2.2 wikipept.com Specific

| Pattern | Description |
|---------|-------------|
| **Flashcard review** | Swipe right = "Know it"; swipe left = "Don't know"; tap to flip; keyboard: Y/N |
| **Quiz flow** | Select answer → immediate feedback → "Next" button → progress bar updates → end screen with score |
| **Progress celebration** | Module completion: confetti animation + achievement badge unlock + "Share" button |
| **Community annotation** | Hover over paragraph → "Annotate" icon appears → click opens inline editor → save → "Pending review" badge |
| **Learning path navigation** | Module map shows completed (Green), current (Teal), locked (Gray) states; click to navigate |

---

## 4. Navigation Architecture

### 4.1 Global Navigation

Both sites share a consistent navigation structure with brand-appropriate styling.

#### 4.1.1 Desktop Navigation

```
┌─────────────────────────────────────────────────────────┐
│  Logo    [Search ─────────────────]    Nav Items  [⚙️]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                   Content Area                          │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                     Footer                              │
└─────────────────────────────────────────────────────────┘
```

| Element | ENCP | WIKI |
|---------|------|------|
| Logo | Text: "encyclopeptide" (Playfair Display) | Icon + Text: "wikipept" (Plus Jakarta Sans) |
| Search | Prominent, centered, persistent | Prominent, centered, persistent |
| Primary nav | Browse, Search, Data, About | Learn, Quizzes, Flashcards, Community |
| User menu | Sign In, API Access, Settings | Sign In, My Progress, Settings |
| Footer | About, API Docs, Citation Guide, Contact | About, For Educators, Contribute, Contact |

#### 4.1.2 Mobile Navigation

```
┌───────────────────────┐
│  Logo    [🔍]  [☰]   │
├───────────────────────┤
│                       │
│    Content Area       │
│                       │
├───────────────────────┤
│ 🏠  📚  🎯  👤       │
└───────────────────────┘
```

| Element | ENCP | WIKI |
|---------|------|------|
| Hamburger | Opens slide-out panel with full nav | Opens slide-out panel with full nav |
| Bottom nav | Not used (academic audience, desktop-primary) | Home, Learn, Quiz, Profile |
| Search | Full-width in header | Full-width in header |

### 4.2 Content Navigation

#### 4.2.1 encyclopeptide.com Content Hierarchy

```
encyclopeptide.com/
├── /browse/
│   ├── /browse/classification/     ← Faceted navigation
│   ├── /browse/function/           ← Functional categories
│   ├── /browse/source/             ← Source organism
│   └── /browse/therapeutic/        ← Therapeutic areas
├── /search/                        ← Full-text + structure search
├── /monograph/[peptide-slug]/      ← Individual entries
│   ├── Overview                    ← Summary + key data
│   ├── Structure                   ← Sequence + 2D/3D viewer
│   ├── Biological Activity         ← Targets + affinities
│   ├── Pharmacology                ← PK/PD + safety
│   ├── Synthesis                   ← Routes + protocols
│   ├── Characterization            ← MS, HPLC, NMR data
│   ├── References                  ← DOI-linked citations
│   └── Revision History            ← Version diff view
├── /data/                          ← Reference tables
│   ├── /data/amino-acids/
│   ├── /data/peptide-bonds/
│   └── /data/modifications/
├── /api/                           ← API documentation
└── /about/                         ← Editorial board + methodology
```

#### 4.2.2 wikipept.com Content Hierarchy

```
wikipept.com/
├── /learn/
│   ├── /learn/[pathway-slug]/      ← Learning pathway
│   │   ├── /learn/[pathway]/[module-slug]/  ← Individual module
│   │   │   ├── Overview            ← Objectives + estimated time
│   │   │   ├── Lesson              ← Main content (progressive depth)
│   │   │   ├── Quiz                ← Interactive assessment
│   │   │   ├── Flashcards          ← Key terms deck
│   │   │   └── Discussion          ← Community thread
├── /quizzes/                       ← Browse all quizzes
│   ├── /quizzes/browse/            ← By topic/difficulty
│   └── /quizzes/attempt/[id]/      ← Active quiz session
├── /flashcards/                    ← Browse all decks
│   ├── /flashcards/browse/         ← By topic/difficulty
│   └── /flashcards/review/[id]/    ← Active review session
├── /community/                     ← Community hub
│   ├── /community/contributions/   ← Recent edits/annotations
│   ├── /community/leaderboard/     ← Top contributors
│   └── /community/discussions/     ← Discussion forums
├── /progress/                      ← Personal learning dashboard
│   ├── /progress/overview/         ← Summary stats
│   ├── /progress/pathways/         ← Per-pathway progress
│   └── /progress/achievements/     ← Badges and milestones
└── /about/                         ← About + educator resources
```

### 4.3 Cross-Site Navigation

Both sites include clear pathways to the other:

| From | To | Mechanism |
|------|----|-----------|
| encyclopeptide.com | wikipept.com | "Learn more about this topic →" links on monographs; footer link to wikipept.com |
| wikipept.com | encyclopeptide.com | "Full reference →" links on study guide pages; footer link to encyclopeptide.com |
| Shared | Both | Consistent "encyclopeptide" / "wikipept" brand linking in footer |

### 4.4 Breadcrumb Strategy

| Site | Breadcrumb Style |
|------|-----------------|
| encyclopeptide.com | `Home > Browse > [Category] > [Subcategory] > [Peptide Name]` |
| wikipept.com | `Home > Learn > [Pathway] > [Module] > [Section]` |

Both sites render breadcrumbs as: clickable links for all items except the last (current page, plain text).

---

## 5. Responsive Design Strategy

### 5.1 Breakpoints

| Name | Min Width | Max Width | Target Devices |
|------|-----------|-----------|----------------|
| Mobile S | 0 | 639px | Small phones |
| Mobile L | 640px | 767px | Large phones |
| Tablet | 768px | 1023px | Tablets, small laptops |
| Desktop | 1024px | 1439px | Standard desktops |
| Wide | 1440px | — | Large monitors |

### 5.2 Layout Strategy

| Breakpoint | ENCP Layout | WIKI Layout |
|------------|-------------|-------------|
| Mobile | Single column; stacked data tables; horizontal scroll for wide tables | Single column; full-width cards; bottom navigation |
| Tablet | Two-column where appropriate; collapsible sidebar | Two-column card grid; collapsible sidebar |
| Desktop | Sidebar (TOC + metadata) + content area | Sidebar (module map) + content area |
| Wide | Max-width 1200px; centered; wider data tables | Max-width 1200px; centered; wider card grid |

### 5.3 Content Priority by Viewport

| Content | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| ENCP: Monograph title + sequence | Above fold | Above fold | Above fold |
| ENCP: Key data table | Below fold (scroll) | Below fold (scroll) | Sidebar |
| ENCP: 3D viewer | Lazy-loaded; 2D fallback | Lazy-loaded | Lazy-loaded |
| WIKI: Learning objectives | Above fold | Above fold | Above fold |
| WIKI: Quiz/flashcard | Full-width card | Centered card | Centered card with sidebar |
| WIKI: Progress bar | Full-width | Full-width | Sidebar + content |

### 5.4 Touch Targets

| Element | Minimum Size | Recommended Size |
|---------|-------------|-----------------|
| Button | 44×44px | 48×48px |
| Link (in text) | 44px tall | 48px tall |
| Icon button | 44×44px | 48×48px |
| Form input | 44px tall | 48px tall |
| Flashcard | Full-width card | Full-width card |

### 5.5 Mobile-Specific Adaptations

| Pattern | Desktop | Mobile |
|---------|---------|--------|
| Data tables (ENCP) | Full width with all columns | Horizontal scroll with sticky first column; or collapse to card layout |
| Sidebar navigation (both) | Persistent sidebar | Slide-out drawer; triggered by hamburger icon |
| Quiz options (WIKI) | Side-by-side or grid | Stacked vertically; full-width options |
| Molecular viewer (ENCP) | Inline with controls | Full-screen overlay with touch gestures |
| Flashcard swipe (WIKI) | Click buttons | Swipe gestures |

---

## 6. Dark Mode Implementation

### 6.1 Strategy

Dark mode is implemented as a user preference with system-level detection and manual override.

| Aspect | Implementation |
|--------|---------------|
| Detection | `prefers-color-scheme` media query for automatic selection |
| Manual toggle | Sun/Moon icon in navigation bar; persists to localStorage |
| Persistence | User preference saved in localStorage; survives session |
| Default | Respects system preference; no forced default |
| Scope | All UI components; molecular viewer; code blocks; data tables |

### 6.2 Dark Mode Color Tokens

#### encyclopeptide.com Dark Mode

Dark mode is the **default** for encyclopeptide.com, consistent with its academic/journal aesthetic. A light mode variant is available.

| Token | Light Mode | Dark Mode (Default) |
|-------|------------|---------------------|
| `--encp-bg-primary` | `#FFFFFF` | `#0A1628` |
| `--encp-bg-surface` | `#F8FAFC` | `#131F36` |
| `--encp-bg-elevated` | `#FFFFFF` | `#1E2D4A` |
| `--encp-text-primary` | `#0F172A` | `#FFFFFF` |
| `--encp-text-secondary` | `#475569` | `#94A3B8` |
| `--encp-border` | `#E2E8F0` | `#1E2D4A` |
| `--encp-accent` | `#C9A84C` | `#C9A84C` |
| `--encp-accent-hover` | `#B8943A` | `#D4B85E` |

#### wikipept.com Dark Mode

Dark mode is an **option** for wikipept.com, activated by user preference or system setting.

| Token | Light Mode (Default) | Dark Mode |
|-------|---------------------|-----------|
| `--wiki-bg-primary` | `#FFFFFF` | `#0F172A` |
| `--wiki-bg-surface` | `#F8FAFC` | `#1E293B` |
| `--wiki-bg-elevated` | `#FFFFFF` | `#334155` |
| `--wiki-text-primary` | `#0F172A` | `#F8FAFC` |
| `--wiki-text-secondary` | `#475569` | `#94A3B8` |
| `--wiki-border` | `#E2E8F0` | `#334155` |
| `--wiki-accent-primary` | `#0D9488` | `#14B8A6` |
| `--wiki-accent-secondary` | `#F97316` | `#FB923C` |

### 6.3 Dark Mode Rules

| Rule | Description |
|------|-------------|
| No pure black | Never use `#000000` as background; always use dark navy/slate tones to reduce eye strain |
| Elevated = lighter | In dark mode, elevated surfaces are lighter (not darker) than base surfaces |
| Accent brightness | Accent colors are brightened by one step in dark mode for contrast |
| Image handling | Images with transparent backgrounds must include dark-mode variants or have explicit backgrounds |
| Molecular viewer | Viewer background shifts to dark; atom colors adjusted for dark backgrounds |
| Code blocks | Background: `#1E293B`; syntax highlighting colors adjusted for dark backgrounds |

### 6.4 CSS Implementation

```css
/* System preference detection */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* Apply dark mode tokens */
  }
}

/* Manual override */
:root[data-theme="dark"] {
  /* Apply dark mode tokens */
}

:root[data-theme="light"] {
  /* Apply light mode tokens */
}
```

---

## 7. Animation Philosophy

### 7.1 Core Principles

| Principle | Description |
|-----------|-------------|
| **Purposeful** | Every animation communicates something: state change, spatial relationship, causality |
| **Subtle** | Animations enhance understanding without demanding attention |
| **Performant** | Animations use only `transform` and `opacity` (GPU-accelerated properties) |
| **Respectful** | Honor `prefers-reduced-motion` with instant transitions as fallback |
| **Consistent** | Same timing and easing across both sites |

### 7.2 Timing & Easing

| Category | Duration | Easing | Usage |
|----------|----------|--------|-------|
| Micro | 100-200ms | `ease-out` | Button hover, focus change, icon rotation |
| Small | 200-300ms | `ease-in-out` | Card expand/collapse, dropdown open, tooltip appear |
| Medium | 300-500ms | `ease-in-out` | Page transition, modal appear, toast slide-in |
| Large | 500-700ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Flashcard flip, confetti, progress fill |
| Celebration | 700-1200ms | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Achievement unlock, milestone reached |

### 7.3 Animation Catalog

| Animation | ENCP | WIKI | Duration |
|-----------|------|------|----------|
| Page content fade-in | Yes (subtle) | Yes (warm) | 300ms ease-out |
| Card hover elevation | Shadow shift | Shadow + translate-y | 200ms ease-out |
| Dropdown open | Fade + slide-down | Fade + slide-down | 200ms ease-out |
| Toast notification | Slide-in from right | Slide-in from bottom-right | 300ms ease-out |
| Search results appear | Staggered fade-in | Staggered fade-in | 150ms per item |
| Modal appear | Scale + fade | Scale + fade | 200ms ease-out |
| Data table sort | Row reorder | N/A | 300ms ease-in-out |
| Flashcard flip | N/A | 3D rotate Y | 400ms ease-in-out |
| Progress bar fill | Smooth width transition | Smooth width + label count-up | 500ms ease-out |
| Confetti | N/A | Particle burst on quiz completion | 1200ms ease-out |
| Achievement badge | N/A | Scale bounce + glow | 700ms cubic-bezier |

### 7.4 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**When reduced motion is active:**
- All animations become instant state changes
- Flashcard flip becomes instant swap (no 3D rotation)
- Progress bar jumps to final value (no smooth fill)
- Confetti is replaced by a static achievement badge
- Page transitions are instant (no fade)
- Micro-interactions are disabled (no hover elevation)

---

## 8. Error State Design

### 8.1 Error Taxonomy

| Level | Severity | Example | User Impact |
|-------|----------|---------|-------------|
| **Info** | Low | "Search returned 0 results; showing similar entries" | Informational; no action required |
| **Warning** | Medium | "Your progress couldn't be saved; retrying..." | Temporary issue; automatic recovery expected |
| **Error** | High | "Failed to load quiz questions. Please try again." | Feature unavailable; user action needed |
| **Critical** | Very High | "Service unavailable. Please check your connection." | Site-wide failure; user must wait or retry |

### 8.2 Error State Components

#### 8.2.1 Inline Error (Field-Level)

| Property | ENCP | WIKI |
|----------|------|------|
| Border | 2px solid Error Red (#DC2626) | 2px solid Red (#EF4444) |
| Background | Error Red tint (`rgba(220, 38, 38, 0.05)`) | Red 50 (#FEF2F2) |
| Icon | ⚠ Error Red | ⚠ Red |
| Text | Error Red, 14px | Red 500, 14px |
| Message | Below input, linked via `aria-describedby` | Below input, linked via `aria-describedby` |

#### 8.2.2 Error Banner (Page-Level)

```
┌──────────────────────────────────────────┐
│  ⚠  [Error Title]                        │
│     [Error description with action]      │
│     [Retry Button]  [Cancel Button]      │
└──────────────────────────────────────────┘
```

| Property | ENCP | WIKI |
|----------|------|------|
| Background | Navy Light with Error Red left border | Red 50 with Red 500 left border |
| Border | 4px solid Error Red (left only) | 4px solid Red 500 (left only) |
| Title | Bold, Error Red, 16px | Bold, Red 500, 16px |
| Description | Slate, 14px | Gray 600, 14px |
| Primary action | Gold button ("Retry") | Teal button ("Try Again") |
| Secondary action | Slate text link ("Cancel") | Gray 600 text link ("Go Back") |

#### 8.2.3 Empty State

| Property | ENCP | WIKI |
|----------|------|------|
| Icon | Muted scientific illustration (atom/molecule) | Friendly illustration (book/lightbulb) |
| Title | "No results found" (Playfair Display, 20px) | "Nothing here yet!" (Plus Jakarta Sans, 20px) |
| Description | "Try broadening your search or browse by classification." | "Start your learning journey by picking a module below." |
| Action | Gold button ("Browse All Entries") | Teal button ("Explore Modules") |

#### 8.2.4 404 Page

| Property | ENCP | WIKI |
|----------|------|------|
| Title | "Page Not Found" | "Oops! Lost in the peptide chain?" |
| Description | "The requested resource does not exist or has been moved." | "This page seems to have folded into the wrong conformation." |
| Search | Inline search bar | Inline search bar |
| Primary action | Gold button ("Return to Home") | Teal button ("Back to Home") |
| Secondary action | Link to sitemap | Link to learning pathways |
| Tone | Formal, direct | Friendly, playful |

#### 8.2.5 Offline State

| Property | Value |
|----------|-------|
| Detection | Service Worker `online` event; `navigator.onLine` |
| Banner | Persistent top banner: "You're offline. Some features may be unavailable." |
| ENCP offline | Cached monographs accessible; search disabled; data export unavailable |
| WIKI offline | Cached study guides accessible; flashcard review works; quizzes unavailable; progress syncs when online |
| Reconnection | Banner updates: "Back online. Syncing your progress..." |

### 8.3 Error Recovery Patterns

| Error | Recovery | User Message |
|-------|----------|--------------|
| Network timeout | Auto-retry 3 times with exponential backoff (1s, 2s, 4s) | "Connection issue. Retrying..." → "Still trying..." → "Connection failed. Check your network." |
| API error (5xx) | Auto-retry once; then show error banner | "Something went wrong on our end. Please try again." |
| API error (4xx) | Show error banner immediately | "The request couldn't be completed. [Details]" |
| Auth expired | Redirect to sign-in; preserve intended destination | "Your session expired. Please sign in again to continue." |
| Save failure (WIKI) | Queue for retry; show warning toast; retry on next interaction | "Progress couldn't be saved. We'll try again automatically." |
| Quiz submission failure | Preserve answers locally; retry submission; offer manual retry | "Submission failed. Your answers are saved. Retry?" |

### 8.4 Error Prevention

| Strategy | Implementation |
|----------|---------------|
| Confirmation dialogs | Before destructive actions (delete, discard changes) |
| Input validation | Real-time validation on blur; inline feedback before submission |
| Auto-save | Every 30 seconds and on significant state change (WIKI) |
| Progress preservation | Quiz answers saved to localStorage on every selection (WIKI) |
| Graceful degradation | Core content always available; interactive features enhance but aren't required |
| Undo | "Undo" toast for destructive actions with 5-second timeout |

---

*Document generated: 2026-06-07T00:00:00Z*
*Phase status: APPROVED*
*Classification: Internal*
