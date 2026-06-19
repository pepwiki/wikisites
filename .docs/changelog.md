# Wikisites Changelog

> **Version:** 2.0.0 | **Release Date:** 2026-06-19

---

## Table of Contents

1. [v2.0.0 — Power User Viewer](#v200--power-user-viewer)
2. [New Features by Tier](#new-features-by-tier)
3. [Breaking Changes](#breaking-changes)
4. [Migration Guide](#migration-guide)
5. [Known Issues](#known-issues)

---

## v2.0.0 — Power User Viewer

**Codename:** "VS Code for content"

This major release transforms Wikisites from content-heavy static sites into a maximal power-user viewer. The focus is on keyboard-driven navigation, interactive tools, and community features.

### Highlights

- Command palette for keyboard-first navigation
- Full keyboard shortcut system across all features
- Graph view for exploring article relationships
- LaTeX/KaTeX math rendering in articles
- Split pane viewing for side-by-side comparison
- User authentication via GitHub and Google OAuth
- Annotations and comments system
- Settings sync across devices
- Plugin system for extensibility
- Custom theme support with CSS variable overrides

---

## New Features by Tier

### P0: Power User Shell

| Feature | Status | Description |
|---------|--------|-------------|
| Command Palette | Shipped | `Ctrl+Shift+P` to access all features via fuzzy search |
| Keyboard Shortcuts | Shipped | Comprehensive shortcut system (see [Keyboard Reference](./keyboard_shortcuts_reference.md)) |
| Outline Panel | Shipped | Sidebar heading navigation with active state tracking |
| Breadcrumb Navigation | Shipped | Hierarchical content location display |
| Reading Progress | Shipped | Top-of-page progress bar with `aria-live` announcements |

### P1: Content Tools

| Feature | Status | Description |
|---------|--------|-------------|
| LaTeX Rendering | Shipped | KaTeX-powered math expressions (inline and block) |
| Graph View | Shipped | Interactive knowledge graph with node relationships |
| Split Panes | Shipped | Side-by-side article viewing |
| Regex Search | Shipped | Pagefind with regex support and content type filters |
| Syntax Highlighting | Shipped | Shiki-powered code blocks with language detection |
| Molecular Viewer | Shipped | 3Dmol.js-powered molecular structure rendering |

### P2: Social Layer

| Feature | Status | Description |
|---------|--------|-------------|
| User Authentication | Shipped | OAuth 2.0 via GitHub and Google |
| Annotations | Shipped | Section-level notes on articles with moderation |
| Comments | Shipped | Threaded discussions on articles |
| User Profiles | Shipped | Profile pages with contribution history |
| Like System | Shipped | Upvote annotations and comments |

### P3: Editor (Planned)

| Feature | Status | Description |
|---------|--------|-------------|
| MDX Editor | In Progress | Web-based content editor with live preview |
| Version History | Planned | Track changes to user-submitted content |
| Draft Auto-save | Planned | Local draft persistence before publishing |
| Rich Formatting | Planned | Toolbar with formatting shortcuts |

### P4: Extensibility

| Feature | Status | Description |
|---------|--------|-------------|
| Plugin Registry | Shipped | Browse and install community plugins |
| Custom Themes | Shipped | CSS variable overrides via settings |
| Settings Export | Shipped | JSON export of all user preferences |
| Settings Import | Shipped | Merge-import from exported JSON |
| Settings Sync | Shipped | Cloud sync for authenticated users |
| Plugin API | Shipped | Permission-scoped plugin system |

---

## Breaking Changes

### v2.0.0

| Change | Impact | Migration |
|--------|--------|-----------|
| Settings storage format changed from `localStorage` flat keys to namespaced JSON | Low | Automatic — localStorage migrated on first load |
| Flashcard review state schema updated with `lastRating` field | Low | Automatic — existing state merged with defaults |
| OAuth required for annotations and comments | Medium | Create an account to contribute |
| Search index now built via Pagefind (replaces FlexSearch) | Low | No action — Pagefind is fully client-side |

---

## Migration Guide

### From v1.x to v2.0.0

#### Automatic Migration (No Action Required)

- **Theme preference:** Existing `starlight-theme` and `encp-theme` localStorage keys are automatically migrated to the new namespaced format.
- **Flashcard state:** Existing FSRS cards are preserved and augmented with default values for new fields.
- **Quiz history:** Existing quiz scores are preserved in the new schema.

#### Manual Migration Required

None for end users.

#### Developer Migration

If you have custom code that interacts with the Wikisites API:

1. **Authentication:** All mutation endpoints now require a Bearer token. Update any API calls to include the `Authorization` header.

2. **Search:** The search API endpoint now returns results in the standardized format:

```json
{
  "results": [...],
  "total": 42,
  "query": "search term"
}
```

3. **Settings:** The settings endpoint returns a flat object. If your code expected nested `preferences`, update to use the top-level keys.

4. **Plugins:** Plugin manifest must include the `permissions` array. Existing plugins without permissions will be disabled on install until updated.

---

## Known Issues

### v2.0.0

| Issue | Severity | Status | Workaround |
|-------|----------|--------|------------|
| Graph view may not load on slow connections | Low | Open | Refresh the page after a few seconds |
| LaTeX rendering may flash briefly before KaTeX loads | Low | Open | Enable `prefers-reduced-motion` to suppress animation |
| Plugin API does not yet support hot-reload | Low | Open | Refresh the page after installing a plugin |
| Split pane not saved in URL state | Low | Open | Reopen split panes after navigation |
| Settings sync may have latency on cold D1 connections | Low | Open | Retry sync after a few seconds |
| Safari: Breadcrumb truncation may not ellipsis correctly | Low | Open | Use landscape orientation or desktop view |

### Accessibility Notes

- All features comply with WCAG 2.1 AA.
- Known low-severity issues do not affect keyboard navigation or screen reader functionality.
- If you encounter an accessibility issue, please report it via the [community page](https://wikipept.com/community).

---

## Previous Releases

### v1.0.0 (2026-06-07)

Initial production release of both Wikipept and Encyclopeptide sites.

- 158 articles across both sites
- 680 quiz questions
- 502 flashcards
- FSRS v4 spaced repetition
- Dark mode with cross-subdomain persistence
- Pagefind full-text search
- PWA support on Wikipept
- i18n support (English, Chinese, Japanese, Arabic)
- 218 unit tests, E2E via Playwright
- CI/CD via GitHub Actions
- Cloudflare Pages deployment

---

*Wikisites Changelog — Encyclopeptide & Wikipept*
