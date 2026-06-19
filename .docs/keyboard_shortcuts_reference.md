# Wikisites Keyboard Shortcuts Reference

> **Version:** 2.0.0 | **Last Updated:** 2026-06-19

Complete keyboard shortcuts reference for Wikipept and Encyclopeptide.

---

## Table of Contents

1. [Global Shortcuts](#1-global-shortcuts)
2. [Command Palette](#2-command-palette)
3. [Article Navigation](#3-article-navigation)
4. [Quiz and Flashcard Shortcuts](#4-quiz-and-flashcard-shortcuts)
5. [Search Shortcuts](#5-search-shortcuts)
6. [Editor Shortcuts](#6-editor-shortcuts-future)
7. [Accessibility Shortcuts](#7-accessibility-shortcuts)

---

## 1. Global Shortcuts

These shortcuts work on every page.

| Key | Action | Context |
|-----|--------|---------|
| `Ctrl+Shift+P` | Open command palette | Global |
| `Ctrl+K` | Focus search | Global |
| `Ctrl+K` then `Ctrl+C` | Toggle dark/light theme | Global |
| `?` | Show keyboard shortcuts help | Global |
| `Escape` | Close panel / cancel current action | Global |
| `g` then `h` | Navigate to home | Global |
| `g` then `l` | Navigate to learn section | Global |
| `g` then `q` | Navigate to quizzes | Global |
| `g` then `f` | Navigate to flashcards | Global |
| `g` then `d` | Navigate to daily challenge | Global |
| `g` then `r` | Navigate to review dashboard | Global |

---

## 2. Command Palette

Accessible via `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac).

| Key | Action | Context |
|-----|--------|---------|
| `↑` / `↓` | Navigate results | Command palette open |
| `Enter` | Execute selected command | Command palette open |
| `Escape` | Close command palette | Command palette open |
| `Tab` | Autocomplete selected suggestion | Command palette open |

### Common Command Palette Queries

| Query | Action |
|-------|--------|
| `theme` | Toggle or select theme |
| `language` | Switch language |
| `export` | Export settings |
| `import` | Import settings |
| `split` | Open split pane |
| `graph` | Show knowledge graph |
| `quiz` | Start a quiz |
| `flashcard` | Open flashcard deck |
| `daily` | Start daily challenge |
| `review` | Open review dashboard |
| `plugin` | Manage plugins |

---

## 3. Article Navigation

| Key | Action | Context |
|-----|--------|---------|
| `→` | Next article in series | Article page |
| `←` | Previous article in series | Article page |
| `Tab` | Cycle through outline headings | Article page (sidebar) |
| `Enter` | Jump to selected heading | Article outline focused |
| `t` | Scroll to top of article | Article page |
| `b` | Scroll to bottom of article | Article page |
| `Home` | Jump to page top | Article page |
| `End` | Jump to page bottom | Article page |
| `Page Up` | Scroll up one viewport | Article page |
| `Page Down` | Scroll down one viewport | Article page |

---

## 4. Quiz and Flashcard Shortcuts

### Flashcard Review

| Key | Action | Context |
|-----|--------|---------|
| `Space` | Flip card (show answer) | Flashcard focused |
| `1` | Rate: Again (reset interval) | Flashcard answer shown |
| `2` | Rate: Hard (short interval) | Flashcard answer shown |
| `3` | Rate: Good (standard interval) | Flashcard answer shown |
| `4` | Rate: Easy (long interval) | Flashcard answer shown |
| `→` | Next card in deck | Flashcard review |
| `←` | Previous card | Flashcard review |
| `r` | Reset current card | Flashcard review |
| `s` | Skip current card | Flashcard review |

### Quiz Session

| Key | Action | Context |
|-----|--------|---------|
| `1` | Select answer A | Quiz active |
| `2` | Select answer B | Quiz active |
| `3` | Select answer C | Quiz active |
| `4` | Select answer D | Quiz active |
| `Enter` | Submit answer / confirm | Quiz active |
| `→` | Next question | Quiz answer shown |
| `←` | Previous question | Quiz review mode |
| `Escape` | Exit quiz | Quiz active |

### Daily Challenge

| Key | Action | Context |
|-----|--------|---------|
| `1`–`4` | Select answer | Daily challenge active |
| `Enter` | Submit answer | Daily challenge active |
| `→` | Next question | Daily challenge active |

---

## 5. Search Shortcuts

| Key | Action | Context |
|-----|--------|---------|
| `Ctrl+K` or `/` | Focus search input | Global |
| `Escape` | Clear search / close results | Search focused |
| `↑` / `↓` | Navigate search results | Search results shown |
| `Enter` | Navigate to selected result | Search results shown |

### Search Input Syntax

| Syntax | Effect |
|--------|--------|
| `title:glycine` | Search article titles only |
| `body:amino acid` | Search article body content |
| `quiz:peptide bond` | Search quiz questions |
| `flashcard:sequence` | Search flashcard content |
| `"exact phrase"` | Exact phrase matching |
| `amino\|peptide` | OR search (either term) |
| `^gly` | Terms starting with "gly" |
| `acid$` | Terms ending with "acid" |

---

## 6. Editor Shortcuts (Future)

> These shortcuts are planned for P3 (Web-based MDX Editor).

| Key | Action | Context |
|-----|--------|---------|
| `Ctrl+S` | Save current draft | Editor active |
| `Ctrl+Z` | Undo | Editor active |
| `Ctrl+Shift+Z` | Redo | Editor active |
| `Ctrl+B` | Bold text | Editor active |
| `Ctrl+I` | Italic text | Editor active |
| `Ctrl+Shift+K` | Insert link | Editor active |
| `Tab` | Indent | Editor active |
| `Shift+Tab` | Outdent | Editor active |

---

## 7. Accessibility Shortcuts

| Key | Action | Context |
|-----|--------|---------|
| `Tab` | Move focus to next interactive element | Global |
| `Shift+Tab` | Move focus to previous interactive element | Global |
| `Enter` | Activate focused element | Global |
| `Space` | Activate focused button or toggle | Global |
| `Escape` | Return focus to previous context | Modal/panel open |
| `?` | Show all keyboard shortcuts | Global |

### Screen Reader Support

All interactive elements announce their purpose and state:

- Buttons include `aria-label` describing the action.
- State changes (card flip, panel toggle) use `aria-live` regions.
- Progress indicators include `role="progressbar"` with `aria-valuenow`.

### Reduced Motion

When `prefers-reduced-motion: reduce` is active:

- All animations are disabled.
- Transitions use instant timing.
- Card flips snap without animation.
- Graph view loads without entrance animation.

---

## Notes

- **Windows/Linux:** Use `Ctrl` as the modifier key.
- **Mac:** Use `Cmd` as the modifier key (e.g., `Cmd+Shift+P` instead of `Ctrl+Shift+P`).
- Shortcuts are disabled when focus is inside an `<input>` or `<textarea>` element, except for `Escape`.
- All shortcuts are discoverable by pressing `?` on any page.

---

*Wikisites Keyboard Shortcuts Reference — Encyclopeptide & Wikipept*
