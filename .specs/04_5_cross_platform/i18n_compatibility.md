---
document_id: XP-I18N-001
title: "Internationalization Compatibility"
version: "1.0.0"
date: "2026-06-19"
status: DRAFT
authors:
  - name: "Wikisites Platform Engineering Team"
    role: "Primary Authors"
classification: "Internal — Phase 4.5 Cross-Platform Compatibility"
applicable_sites:
  - SHARED
  - ENCP
  - WIKI
abstract: >-
  Internationalization compatibility analysis for KP Wikisites covering
  RTL layout for Arabic, CJK text rendering for Chinese and Japanese,
  Unicode support in regex search, keyboard layout variations across
  locales, date/time/number formatting via ICU, and IME support for the
  MDX Editor. Defines per-locale behavior, fallback strategies, and
  component-specific i18n considerations.
depends_on:
  - "04_5_cross_platform/os_compatibility.md"
  - "04_5_cross_platform/browser_compatibility.md"
  - "00_requirements/functional_requirements.md"
---

# Internationalization Compatibility

**Document ID:** XP-I18N-001
**Version:** 1.0.0
**Date:** 2026-06-19
**Status:** DRAFT

---

## Table of Contents

1. [Overview](#1-overview)
2. [Locale Support Matrix](#2-locale-support-matrix)
3. [RTL Layout for Arabic](#3-rtl-layout-for-arabic)
4. [CJK Text Rendering](#4-cjk-text-rendering)
5. [Unicode Support in Regex Search](#5-unicode-support-in-regex-search)
6. [Keyboard Layout Variations](#6-keyboard-layout-variations)
7. [Date/Time/Number Formatting (ICU)](#7-datetime-number-formatting-icu)
8. [IME Support for MDX Editor](#8-ime-support-for-mdx-editor)
9. [Component-Specific i18n](#9-component-specific-i18n)
10. [Locale-Aware CSS Patterns](#10-locale-aware-css-patterns)
11. [Known i18n Issues](#11-known-i18n-issues)
12. [Testing Protocol](#12-testing-protocol)

---

## 1. Overview

### 1.1 Purpose

This document defines the internationalization compatibility landscape for KP Wikisites, covering all four supported locales (en, zh, ja, ar). It specifies how each locale interacts with the platform's interactive components, identifies browser-specific i18n quirks, and defines fallback strategies for locale-dependent features.

### 1.2 Current Locale Configuration

| Locale | Language | Script | Direction | User Share | Tier |
|--------|----------|--------|-----------|------------|------|
| `en` | English | Latin | LTR | 60% | Tier 1 |
| `zh` | Simplified Chinese | Han (CJK) | LTR | 20% | Tier 1 |
| `ja` | Japanese | Han + Hiragana + Katakana | LTR | 15% | Tier 1 |
| `ar` | Arabic | Arabic (RTL) | RTL | 5% | Tier 1 |

### 1.3 i18n Stack

| Component | Implementation | Location |
|-----------|---------------|----------|
| Translation system | Custom `@wikisites/shared/i18n` | `packages/shared/src/i18n/index.ts` |
| Locale detection | `navigator.language` + localStorage | `packages/shared/src/i18n/index.ts` |
| RTL support | `document.documentElement.dir` | `packages/shared/src/i18n/index.ts` |
| Number formatting | `Intl.NumberFormat` | `packages/shared/src/i18n/index.ts` |
| Date formatting | `Intl.DateTimeFormat` | `packages/shared/src/i18n/index.ts` |
| Text segmentation | `Intl.Segmenter` (where available) | Browser native |
| Directional CSS | Logical properties + `dir` attribute | Tailwind CSS |

---

## 2. Locale Support Matrix

### 2.1 Locale Feature Support

| Feature | en | zh | ja | ar | Notes |
|---------|----|----|----|----|-------|
| LTR layout | Full | Full | Full | N/A | Arabic uses RTL |
| RTL layout | N/A | N/A | N/A | Full | `dir="rtl"` on `<html>` |
| CJK text wrapping | N/A | Full | Full | N/A | `word-break: break-all` or `overflow-wrap: break-word` |
| Vertical text | N/A | Partial | Partial | N/A | Not used in current design |
| `Intl.NumberFormat` | Full | Full | Full | Full | Locale-specific digit grouping |
| `Intl.DateTimeFormat` | Full | Full | Full | Full | Locale-specific date patterns |
| `Intl.DisplayNames` | Full | Full | Full | Full | Language/region name display |
| `Intl.ListFormat` | Full | Full | Full | Full | "A, B, and C" vs "A、B、C" |
| Unicode regex (`u` flag) | Full | Full | Full | Full | Proper code point handling |
| `Intl.Segmenter` | Full (Chrome) | Full (Chrome) | Full (Chrome) | Full (Chrome) | Not in Firefox/Safari |
| IME composition | N/A | Full | Full | Full | CJK/Arabic input |
| Font fallback | Latin | Han + Latin | Han + Kana + Latin | Arabic + Latin | System fonts |

### 2.2 Locale-Specific Behavior Summary

| Behavior | en | zh | ja | ar |
|----------|----|----|----|----|
| Text alignment | Left | Left | Left | Right |
| Sidebar position | Left | Left | Left | Right |
| Navigation direction | LTR | LTR | LTR | RTL |
| Number grouping | 1,000.00 | 1,000.00 | 1,000 | ١٬٠٠٠٫٠٠ |
| Date format | MM/DD/YYYY | YYYY年MM月DD日 | YYYY年MM月DD日 | DD/MM/YYYY |
| List separator | ", " | "、" | "、" | "، " |
| Quote style | " " | 「」 | 「」 | « » |
| Ellipsis | "..." | "……" | "……" | "..." |
| Line break opportunity | After spaces | After any CJK char | After any CJK char | After spaces |

---

## 3. RTL Layout for Arabic

### 3.1 RTL Layout Requirements

The existing i18n system already sets `dir="rtl"` on `<html>` when Arabic is selected (`packages/shared/src/i18n/index.ts:36`). All new components must respect this directionality.

| Component | RTL Requirement | Implementation |
|-----------|----------------|----------------|
| Command Palette | Mirror layout; search input on right | Logical properties (`margin-inline-start`) |
| Keyboard Shortcuts | Mirror shortcut display; Ctrl shown as "Ctrl" | Text direction neutral |
| LaTeX Renderer | Math layout is direction-neutral | No changes needed |
| Graph View | Node labels may need RTL text | `direction: rtl` on label elements |
| Split Pane | Mirror pane order; resize handle on correct side | Logical properties |
| Regex Search | Mirror search UI; results count on right | Logical properties |
| MDX Editor | Mirror toolbar; text input direction-aware | `dir="rtl"` on editor container |

### 3.2 RTL CSS Patterns

```css
/* Using logical properties for RTL support */
.sidebar {
  margin-inline-start: 0;      /* Left in LTR, Right in RTL */
  padding-inline-end: 1rem;    /* Right in LTR, Left in RTL */
  border-inline-start: 1px solid; /* Left border in LTR, Right in RTL */
  inset-inline-start: 0;       /* left: 0 in LTR, right: 0 in RTL */
}

/* Using [dir="rtl"] overrides only when logical properties are insufficient */
[dir="rtl"] .command-palette {
  text-align: right;
}

[dir="rtl"] .split-pane-handle {
  cursor: col-resize;
}

/* Bidirectional text handling */
.bidi-text {
  unicode-bidi: plaintext;
  direction: auto;
}

/* Icon mirroring for RTL */
[dir="rtl"] .icon-arrow-right {
  transform: scaleX(-1);
}

/* Do NOT mirror these icons */
[dir="rtl"] .icon-logo {
  /* Logo stays the same direction */
}
```

### 3.3 RTL Component Checklist

| Component | Mirrored? | Notes |
|-----------|-----------|-------|
| Navigation sidebar | Yes | Position switches from left to right |
| Search input | Yes | Text input aligns right; magnifying glass on right |
| Command Palette | Yes | Modal opens from right; search on right |
| Keyboard Shortcuts display | Partial | Shortcut keys displayed in LTR order regardless of locale |
| Split Pane | Yes | Pane order mirrors; resize handle position changes |
| Graph View | Partial | Layout is direction-neutral; labels respect `dir` |
| MDX Editor toolbar | Yes | Toolbar buttons mirror; text input aligns right |
| LaTeX Renderer | No | Math is direction-neutral by convention |
| Quiz interface | Yes | Answer options align right |
| Flashcard | Yes | Card content aligns right |
| Toast notifications | Yes | Position switches to right side |
| Dropdown menus | Yes | Menu opens to the left in RTL |

### 3.4 RTL Testing Matrix

| Test Case | Expected Behavior | Pass Criteria |
|-----------|-------------------|---------------|
| Page load in Arabic | All text right-aligned; sidebar on right | Visual inspection |
| Command Palette open | Opens centered; search input right-aligned | Visual inspection |
| Split Pane resize | Handle on correct side; drag works in both directions | Functional test |
| MDX Editor | Toolbar mirrors; text input right-aligned | Functional test |
| Search results | Results right-aligned; pagination mirrors | Visual inspection |
| Quiz flow | Questions right-aligned; answers right-aligned | Visual inspection |
| Flashcard flip | Card content right-aligned after flip | Visual inspection |
| Graph View | Labels right-aligned; layout direction-neutral | Visual inspection |
| Language switch LTR→RTL | Smooth transition; no layout flash | CLS = 0 |
| Language switch RTL→LTR | Smooth transition; no layout flash | CLS = 0 |

### 3.5 Arabic Text Rendering Considerations

| Consideration | Impact | Mitigation |
|---------------|--------|------------|
| Arabic diacritics (tashkeel) | May be lost in search indexing | Normalize text; preserve diacritics in display |
| Ligature rendering | Arabic ligatures (lam-alef) must render correctly | Use system Arabic fonts; no custom font overrides |
| Number rendering | Arabic-Indic numerals (٠١٢٣) vs Western Arabic (0123) | Use `Intl.NumberFormat` with locale; allow user preference |
| Mixed LTR/RTL text | Scientific terms (e.g., peptide names) are LTR | Use `unicode-bidi: plaintext` for mixed content |
| Line wrapping | Arabic words may not break at expected points | Use `word-break: normal` for Arabic; CJK rules for zh/ja |

---

## 4. CJK Text Rendering

### 4.1 Chinese (zh) and Japanese (ja) Text Considerations

| Consideration | zh | ja | Impact | Mitigation |
|---------------|----|----|--------|------------|
| Character set size | ~20,000常用汉字 | ~2,000常用漢字 + ひらがな + カタカナ | Font loading | System fonts; no custom font downloads |
| Line breaking | Break after any CJK character | Break after any CJK character | Layout | `word-break: break-all` or `overflow-wrap: break-word` |
| Text justification | `text-align: justify` works differently | `text-align: justify` works differently | Typography | Use `text-align: start` for body text |
| Vertical text | Traditional layout possible | Traditional layout possible | Not used | Current design is horizontal-only |
| Ruby text (furigana) | Not used | `<ruby>` element for pronunciation | Accessibility | Support `<ruby>` in MDX Editor output |
| Input methods | Pinyin, Wubi | Romaji, Kana | MDX Editor | IME composition event handling |

### 4.2 CJK Text Wrapping

```css
/* CJK text wrapping rules */
.cjk-content {
  /* Allow breaks between any two CJK characters */
  word-break: break-all;
  /* Or use overflow-wrap for English words within CJK text */
  overflow-wrap: break-word;
}

/* Prevent breaking within words for English content */
.latin-content {
  word-break: normal;
  overflow-wrap: break-word;
}

/* Mixed content (most common) */
.mixed-content {
  word-break: break-word;
  overflow-wrap: break-word;
}

/* Japanese-specific: prevent breaking within certain compounds */
.ja-content {
  word-break: normal;
  overflow-wrap: break-word;
  line-break: strict; /* Stricter line breaking rules for Japanese */
}
```

### 4.3 CJK Font Stack

```css
/* System font stack for CJK content */
:root {
  --font-cjk-zh: "PingFang SC", "Microsoft YaHei", "Noto Sans SC", "WenQuanYi Micro Hei", sans-serif;
  --font-cjk-ja: "PingFang JP", "Hiragino Sans", "Yu Gothic", "Noto Sans JP", sans-serif;
  --font-arabic: "PingFang Arabic", "Noto Sans Arabic", "Geeza Pro", "Traditional Arabic", sans-serif;
  --font-latin: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

/* Locale-specific font application */
:lang(zh) { font-family: var(--font-cjk-zh), var(--font-latin); }
:lang(ja) { font-family: var(--font-cjk-ja), var(--font-latin); }
:lang(ar) { font-family: var(--font-arabic), var(--font-latin); }
```

### 4.4 CJK-Specific Rendering Issues

| Issue | Browser | Impact | Workaround |
|-------|---------|--------|------------|
| CJK font metrics differ between OS | All | Line height may vary | Use relative units (em, rem) |
| `text-overflow: ellipsis` with CJK | Safari | May cut mid-character | Use `text-overflow: clip` for CJK |
| `text-align: justify` with CJK | All | May produce uneven spacing | Use `text-align: start` |
| `letter-spacing` with CJK | All | May break kana/kanji grouping | Avoid letter-spacing on CJK text |
| `word-spacing` with CJK | All | No effect (CJK has no word spaces) | N/A |

---

## 5. Unicode Support in Regex Search

### 5.1 Unicode Regex Feature Support

| Feature | Chrome | Firefox | Safari | Purpose |
|---------|--------|---------|--------|---------|
| `u` flag (Unicode mode) | 64+ | 78+ | 11.1+ | Proper code point handling |
| `v` flag (Unicode sets) | 113+ | 116+ | 17+ | Set notation in character classes |
| Unicode property escapes (`\p{L}`) | 64+ | 78+ | 11.1+ | Match by Unicode category |
| `\p{Script=Han}` | 64+ | 78+ | 11.1+ | Match Chinese characters |
| `\p{Script=Hiragana}` | 64+ | 78+ | 11.1+ | Match hiragana |
| `\p{Script=Katakana}` | 64+ | 78+ | 11.1+ | Match katakana |
| `\p{Script=Arabic}` | 64+ | 78+ | 11.1+ | Match Arabic characters |
| `\p{Script=Latin}` | 64+ | 78+ | 11.1+ | Match Latin characters |
| `\p{Emoji}` | 64+ | 78+ | 11.1+ | Match emoji |
| `Intl.Segmenter` (word) | 87+ | — | — | CJK word segmentation |

### 5.2 Unicode Search Patterns

```typescript
// Unicode-aware search patterns for each locale
const SEARCH_PATTERNS = {
  // Match any letter (all scripts)
  anyLetter: /\p{Letter}/u,

  // Match CJK characters (Chinese)
  cjkChinese: /\p{Script=Han}/u,

  // Match Japanese hiragana
  hiragana: /\p{Script=Hiragana}/u,

  // Match Japanese katakana
  katakana: /\p{Script=Katakana}/u,

  // Match all Japanese scripts
  japanese: /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u,

  // Match Arabic characters
  arabic: /\p{Script=Arabic}/u,

  // Match Latin characters (for mixed content)
  latin: /\p{Script=Latin}/u,

  // Match digits (any script)
  digit: /\p{Digit}/u,

  // Match emoji
  emoji: /\p{Emoji}/u,

  // Diacritic-insensitive matching (for accented Latin)
  withDiacritics: /[\p{Letter}\p{Mark}]/u,
};

// Unicode-aware case-insensitive search
function unicodeSearch(query: string, text: string): boolean {
  // Normalize both strings to NFC for consistent comparison
  const normalizedQuery = query.normalize('NFC');
  const normalizedText = text.normalize('NFC');

  try {
    const regex = new RegExp(normalizedQuery, 'iu'); // i: case-insensitive, u: Unicode
    return regex.test(normalizedText);
  } catch {
    // Fallback: simple includes
    return normalizedText.toLowerCase().includes(normalizedQuery.toLowerCase());
  }
}

// CJK word segmentation (Chrome only)
function segmentCJK(text: string): string[] {
  if ('Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter('ja', { granularity: 'word' });
    return Array.from(segmenter.segment(text))
      .filter(s => s.isWordLike)
      .map(s => s.segment);
  }
  // Fallback: character-by-character segmentation
  return Array.from(text);
}
```

### 5.3 Search Normalization

| Normalization | Purpose | When Applied |
|---------------|---------|-------------|
| NFC (Canonical Decomposition + Canonical Composition) | Normalize diacritics | All search queries |
| NFKC (Compatibility Decomposition + Canonical Composition) | Normalize fullwidth characters | Japanese/Chinese search |
| Lowercase folding | Case-insensitive matching | All search queries |
| Diacritic stripping | Accent-insensitive matching (optional) | Latin script search |
| Arabic normalization | Normalize Arabic forms | Arabic search |

```typescript
// Text normalization for search
function normalizeForSearch(text: string, locale: Locale): string {
  let normalized = text.normalize('NFC');

  if (locale === 'ja' || locale === 'zh') {
    // Normalize fullwidth characters to ASCII equivalents
    normalized = normalized.normalize('NFKC');
  }

  if (locale === 'ar') {
    // Normalize Arabic forms (Alef variants, etc.)
    normalized = normalized
      .replace(/[\u0610-\u061A]/g, '') // Remove diacritics (tashkeel)
      .replace(/[\u064B-\u065F]/g, '') // Remove harakat
      .replace(/\u0622/g, '\u0627') // Alef with madda → Alef
      .replace(/\u0623/g, '\u0627') // Alef with hamza above → Alef
      .replace(/\u0625/g, '\u0627') // Alef with hamza below → Alef
      .replace(/\u0649/g, '\u064A'); // Alef maksura → Ya
  }

  return normalized;
}
```

### 5.4 Regex Search Fallback Strategy

| Browser Support | Strategy | Implementation |
|----------------|----------|----------------|
| `u` flag supported | Full Unicode regex | Default |
| `v` flag supported | Unicode sets for advanced patterns | Enhanced |
| `Intl.Segmenter` supported | CJK word segmentation | Chrome |
| `Intl.Segmenter` not supported | Character-by-character fallback | Firefox, Safari |
| Neither `u` nor `v` flag | Basic regex with manual normalization | Legacy browsers (not supported) |

---

## 6. Keyboard Layout Variations

### 6.1 Modifier Key Mapping by OS

| Action | macOS | Windows | Linux | Notes |
|--------|-------|---------|-------|-------|
| Command Palette | `Cmd+K` | `Ctrl+K` | `Ctrl+K` | Meta vs Ctrl |
| Save | `Cmd+S` | `Ctrl+S` | `Ctrl+S` | Meta vs Ctrl |
| Undo | `Cmd+Z` | `Ctrl+Z` | `Ctrl+Z` | Meta vs Ctrl |
| Redo | `Cmd+Shift+Z` | `Ctrl+Y` | `Ctrl+Shift+Z` | Different key |
| Find | `Cmd+F` | `Ctrl+F` | `Ctrl+F` | Meta vs Ctrl |
| Bold | `Cmd+B` | `Ctrl+B` | `Ctrl+B` | Meta vs Ctrl |
| Italic | `Cmd+I` | `Ctrl+I` | `Ctrl+I` | Meta vs Ctrl |
| Select All | `Cmd+A` | `Ctrl+A` | `Ctrl+A` | Meta vs Ctrl |
| Close | `Cmd+W` | `Ctrl+W` | `Ctrl+W` | Meta vs Ctrl |
| New Tab | `Cmd+T` | `Ctrl+T` | `Ctrl+T` | Meta vs Ctrl |
| Print | `Cmd+P` | `Ctrl+P` | `Ctrl+P` | Meta vs Ctrl |
| Delete word | `Option+Backspace` | `Ctrl+Backspace` | `Ctrl+Backspace` | Option vs Ctrl |
| Move to line start | `Cmd+Left` | `Home` | `Home` | Different keys |
| Move to line end | `Cmd+Right` | `End` | `End` | Different keys |

### 6.2 Keyboard Layout Detection

```typescript
// Detect OS for modifier key mapping
export function getModifierKey(): 'metaKey' | 'ctrlKey' {
  return /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'metaKey' : 'ctrlKey';
}

// Platform-specific shortcut labels
export function getShortcutLabel(shortcut: string): string {
  const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  return shortcut
    .replace('Mod', isMac ? '⌘' : 'Ctrl')
    .replace('Alt', isMac ? '⌥' : 'Alt')
    .replace('Shift', isMac ? '⇧' : 'Shift')
    .replace('Enter', isMac ? '↵' : 'Enter')
    .replace('Backspace', isMac ? '⌫' : 'Backspace')
    .replace('Delete', isMac ? '⌦' : 'Delete')
    .replace('Escape', isMac ? 'Esc' : 'Esc');
}

// Keyboard shortcut configuration per locale
export const SHORTCUTS = {
  commandPalette: { key: 'k', modifier: true, shift: false, alt: false },
  save: { key: 's', modifier: true, shift: false, alt: false },
  undo: { key: 'z', modifier: true, shift: false, alt: false },
  redo: {
    key: 'z',
    modifier: true,
    shift: true,
    alt: false,
    windowsFallback: { key: 'y', modifier: true, shift: false, alt: false },
  },
  find: { key: 'f', modifier: true, shift: false, alt: false },
  bold: { key: 'b', modifier: true, shift: false, alt: false },
  italic: { key: 'i', modifier: true, shift: false, alt: false },
  escape: { key: 'Escape', modifier: false, shift: false, alt: false },
  deleteWord: {
    key: 'Backspace',
    modifier: false,
    shift: false,
    alt: true, // Option on Mac, Ctrl on Windows/Linux
    modifierOverride: 'altKey',
  },
};
```

### 6.3 Locale-Specific Keyboard Considerations

| Locale | Input Method | Special Keys | Impact on Components |
|--------|-------------|-------------|---------------------|
| en | QWERTY, AZERTY, QWERTZ | Standard Latin keys | Command Palette, Shortcuts |
| zh | Pinyin (Shift+E), Wubi | Space for candidate selection, Shift to toggle | MDX Editor IME handling |
| ja | Romaji, Kana (Shift+Alt) | Space for conversion, Enter to confirm, Esc to cancel | MDX Editor IME handling |
| ar | Arabic keyboard | Right-to-left typing, Shift for number row | MDX Editor, Command Palette |

### 6.4 Keyboard Shortcut Conflicts

| Shortcut | Browser/OS | Wikisites Action | Conflict | Resolution |
|----------|-----------|-----------------|----------|------------|
| `Cmd+K` | macOS Safari | Command Palette | Safari address bar | Use `Cmd+K` only when page is focused |
| `Ctrl+K` | Windows Chrome | Command Palette | Chrome omnibox | Use `Ctrl+K` only when page is focused |
| `Cmd+Shift+Z` | macOS | Redo | macOS system undo | Acceptable — standard app behavior |
| `Ctrl+Y` | Windows | Redo | No conflict | Primary redo on Windows |
| `Cmd+/` | macOS | Keyboard shortcuts help | VS Code terminal | Acceptable — web app context |
| `Ctrl+/` | Windows | Keyboard shortcuts help | No conflict | Primary shortcut help on Windows |
| `Cmd+P` | macOS | Print | macOS Spotlight (if configured) | Acceptable — standard app behavior |
| `F5` | Windows | Refresh (browser) | N/A | Do not override F5 |
| `Cmd+R` | macOS | Refresh (browser) | N/A | Do not override Cmd+R |

---

## 7. Date/Time/Number Formatting (ICU)

### 7.1 ICU Formatting Support

| Feature | Chrome | Firefox | Safari | Fallback |
|---------|--------|---------|--------|----------|
| `Intl.NumberFormat` | Full | Full | Full | Manual formatting |
| `Intl.DateTimeFormat` | Full | Full | Full | Manual formatting |
| `Intl.DisplayNames` | Full | Full | Full | Hardcoded names |
| `Intl.ListFormat` | Full (99+) | Full (103+) | Full (14.1+) | Manual joining |
| `Intl.RelativeTimeFormat` | Full (71+) | Full (75+) | Full (13.1+) | Manual formatting |
| `Intl.PluralRules` | Full (78+) | Full (78+) | Full (13+) | Manual pluralization |
| `Intl.Segmenter` | Full (87+) | — | — | Manual segmentation |

### 7.2 Locale-Specific Formatting

```typescript
// Date formatting by locale
export function formatDateByLocale(date: Date, locale: Locale): string {
  const formats: Record<Locale, Intl.DateTimeFormatOptions> = {
    en: { year: 'numeric', month: 'long', day: 'numeric' }, // June 19, 2026
    zh: { year: 'numeric', month: 'long', day: 'numeric' }, // 2026年6月19日
    ja: { year: 'numeric', month: 'long', day: 'numeric' }, // 2026年6月19日
    ar: { year: 'numeric', month: 'long', day: 'numeric', numberingSystem: 'latn' }, // 19 يونيو 2026
  };
  return new Intl.DateTimeFormat(locale, formats[locale]).format(date);
}

// Number formatting by locale
export function formatNumberByLocale(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale, {
    numberingSystem: locale === 'ar' ? 'latn' : undefined, // Use Western Arabic numerals
  }).format(value);
}

// Percentage formatting by locale
export function formatPercentByLocale(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

// List formatting by locale
export function formatListByLocale(items: string[], locale: Locale): string {
  if ('ListFormat' in Intl) {
    return new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' }).format(items);
  }
  // Fallback: manual joining
  const separators: Record<Locale, string> = {
    en: ', ',
    zh: '、',
    ja: '、',
    ar: '، ',
  };
  const lastSeparator: Record<Locale, string> = {
    en: ' and ',
    zh: '和',
    ja: 'と',
    ar: ' و',
  };
  if (items.length <= 1) return items.join('');
  const last = items[items.length - 1];
  const rest = items.slice(0, -1);
  return rest.join(separators[locale]) + lastSeparator[locale] + last;
}

// Relative time formatting by locale
export function formatRelativeTimeByLocale(
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
  locale: Locale,
): string {
  if ('RelativeTimeFormat' in Intl) {
    return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(value, unit);
  }
  // Fallback: manual formatting
  const rtf: Record<Locale, Record<string, string>> = {
    en: { 'day': '{n} day(s) ago', 'hour': '{n} hour(s) ago' },
    zh: { 'day': '{n}天前', 'hour': '{n}小时前' },
    ja: { 'day': '{n}日前', 'hour': '{n}時間前' },
    ar: { 'day': 'منذ {n} يوم', 'hour': 'منذ {n} ساعة' },
  };
  const template = rtf[locale]?.[unit] ?? `{n} ${unit}(s) ago`;
  return template.replace('{n}', String(Math.abs(value)));
}
```

### 7.3 Number System Considerations

| Locale | Number System | Digit Grouping | Decimal Separator | Examples |
|--------|--------------|----------------|-------------------|----------|
| en | Western Arabic (0-9) | Comma (,) | Period (.) | 1,234,567.89 |
| zh | Western Arabic (0-9) | Comma (,) | Period (.) | 1,234,567.89 |
| ja | Western Arabic (0-9) | Comma (,) | Period (.) | 1,234,567.89 |
| ar | Arabic-Indic (٠-٩) or Western Arabic | Comma (٬) or Comma (,) | Period (٫) or Period (.) | ١٬٢٣٤٬٥٦٧٫٨٩ |

**Note:** The current i18n system uses `Intl.NumberFormat` which handles locale-specific formatting automatically. Arabic users may prefer Western Arabic numerals (0-9) for scientific content; this can be configured via `numberingSystem: 'latn'`.

### 7.4 Date/Time Format Fallback Matrix

| Feature | Intl Supported | Fallback |
|---------|---------------|----------|
| Date formatting | `Intl.DateTimeFormat` | `date.toLocaleDateString()` |
| Time formatting | `Intl.DateTimeFormat` | `date.toLocaleTimeString()` |
| Relative time | `Intl.RelativeTimeFormat` | Manual template string |
| List formatting | `Intl.ListFormat` | Manual joining |
| Plural rules | `Intl.PluralRules` | Manual pluralization |
| Display names | `Intl.DisplayNames` | Hardcoded locale name map |
| Number formatting | `Intl.NumberFormat` | `Number.prototype.toLocaleString()` |
| Currency formatting | `Intl.NumberFormat` | Manual formatting |

---

## 8. IME Support for MDX Editor

### 8.1 IME Composition Events

| Event | Chrome | Firefox | Safari | Purpose |
|-------|--------|---------|--------|---------|
| `compositionstart` | Full | Full | Full | IME composition begins |
| `compositionupdate` | Full | Full | Full | IME composition updates |
| `compositionend` | Full | Full | Full | IME composition ends |
| `beforeinput` with `inputType` | Full | Full | Partial | Content change detection |
| `inputType: 'insertCompositionText'` | Full | Full | Partial | Composition text insertion |
| `inputType: 'deleteCompositionBackward'` | Full | Full | Partial | Composition deletion |

### 8.2 IME Handling Patterns

```typescript
// IME-safe content change detection for MDX Editor
function setupIMESafeInput(
  element: HTMLElement,
  onChange: (content: string) => void,
): void {
  let isComposing = false;

  // Track composition state
  element.addEventListener('compositionstart', () => {
    isComposing = true;
  });

  element.addEventListener('compositionend', (e) => {
    isComposing = false;
    // Fire change after composition ends
    onChange(element.innerHTML);
  });

  // Use beforeinput for content changes (preferred)
  element.addEventListener('beforeinput', (e: InputEvent) => {
    if (isComposing) return; // Ignore changes during composition

    switch (e.inputType) {
      case 'insertText':
      case 'insertParagraph':
      case 'deleteContentBackward':
      case 'deleteContentForward':
      case 'formatBold':
      case 'formatItalic':
      case 'formatUnderline':
        // These are safe to process immediately
        break;
    }
  });

  // Fallback: use input event (less precise but more compatible)
  element.addEventListener('input', () => {
    if (!isComposing) {
      onChange(element.innerHTML);
    }
  });
}

// Handle IME candidate window positioning
function handleIMEPosition(element: HTMLElement): void {
  // On some browsers, the IME candidate window may overlap the editor
  // Use visualViewport to detect keyboard presence and adjust layout
  if ('visualViewport' in window) {
    window.visualViewport.addEventListener('resize', () => {
      const viewport = window.visualViewport!;
      const editorRect = element.getBoundingClientRect();

      // If editor is above the keyboard, scroll into view
      if (editorRect.bottom > viewport.height + (viewport.offsetTop || 0)) {
        element.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    });
  }
}
```

### 8.3 IME-Specific Issues by Browser

| Issue | Browser | Impact | Workaround |
|-------|---------|--------|------------|
| `beforeinput` not fired during composition | Safari | Content changes missed | Use `compositionend` handler |
| `inputType` not consistently reported | Safari | Cannot detect specific edit type | Use `innerHTML` diffing |
| Candidate window overlaps editor | All mobile | Editor content hidden | Scroll into view on `visualViewport` resize |
| Composition text appears in wrong position | Firefox (rare) | Visual glitch | Reposition caret after composition |
| Auto-commit during composition | Chrome (rare) | Premature content save | Debounce save during composition |
| `contenteditable` loses focus after composition | Safari (rare) | Focus lost | Refocus element after `compositionend` |

### 8.4 CJK Input Method Specifics

| Locale | Input Method | Composition Behavior | Special Handling |
|--------|-------------|---------------------|-----------------|
| zh (Pinyin) | Type pinyin, select from candidates | Multi-character composition | Space selects candidate; arrows navigate |
| zh (Wubi) | Type character codes | Character-by-character | Immediate commit for full codes |
| ja (Romaji) | Type romaji, auto-convert to kana | Multi-step (romaji → kana → kanji) | Enter confirms; Esc cancels conversion |
| ja (Kana) | Direct kana input | Character-by-character | Shift toggles hiragana/katakana |
| ar | Direct character input | Single character | Right-to-left text direction |

---

## 9. Component-Specific i18n

### 9.1 Command Palette i18n

| Feature | i18n Requirement | Implementation |
|---------|------------------|----------------|
| Search placeholder | Localized | `t('commandPalette.searchPlaceholder')` |
| "No results" message | Localized | `t('commandPalette.noResults')` |
| Recent searches | Localized | `t('commandPalette.recentSearches')` |
| Keyboard shortcut labels | OS-aware | `getShortcutLabel()` function |
| Command descriptions | Localized | All commands must have `descriptionKey` |
| Category names | Localized | `t('commandPalette.categories.{category}')` |

### 9.2 Keyboard Shortcuts Help i18n

| Feature | i18n Requirement | Implementation |
|---------|------------------|----------------|
| Section titles | Localized | `t('shortcuts.{section}')` |
| Shortcut descriptions | Localized | `t('shortcuts.{action}')` |
| Modifier key names | OS-aware | `getModifierKeyName()` function |
| Category names | Localized | `t('shortcuts.categories.{category}')` |

### 9.3 LaTeX Renderer i18n

| Feature | i18n Requirement | Implementation |
|---------|------------------|----------------|
| Error messages | Localized | `t('latex.error.{type}')` |
| Loading state | Localized | `t('latex.loading')` |
| Alt text for rendered math | Localized | Math expression as aria-label |
| Number formatting in math | Locale-aware | `Intl.NumberFormat` for displayed numbers |

### 9.4 Graph View i18n

| Feature | i18n Requirement | Implementation |
|---------|------------------|----------------|
| Node labels | Localized | Content from locale-specific collections |
| Tooltip text | Localized | `t('graph.{action}')` |
| "Zoom in/out" labels | Localized | `t('graph.zoomIn')`, `t('graph.zoomOut')` |
| "Reset view" label | Localized | `t('graph.resetView')` |
| Loading state | Localized | `t('graph.loading')` |

### 9.5 Split Pane i18n

| Feature | i18n Requirement | Implementation |
|---------|------------------|----------------|
| Resize handle label | Localized | `t('splitPane.resizeHandle')` |
| "Collapse left/right" | Localized | `t('splitPane.collapseLeft')`, `t('splitPane.collapseRight')` |
| "Reset layout" | Localized | `t('splitPane.resetLayout')` |
| ARIA labels | Localized | `t('splitPane.aria.{element}')` |

### 9.6 Regex Search i18n

| Feature | i18n Requirement | Implementation |
|---------|------------------|----------------|
| Search placeholder | Localized | `t('search.placeholder')` |
| "No results" message | Localized | `t('search.noResults')` |
| Results count | Localized | `t('search.resultsCount', { count })` |
| Filter labels | Localized | `t('search.filters.{filter}')` |
| Regular expression help | Localized | `t('search.regexHelp')` |

### 9.7 MDX Editor i18n

| Feature | i18n Requirement | Implementation |
|---------|------------------|----------------|
| Toolbar button labels | Localized | `t('editor.toolbar.{button}')` |
| Format names | Localized | `t('editor.formats.{format}')` |
| Error messages | Localized | `t('editor.error.{type}')` |
| Help text | Localized | `t('editor.help.{topic}')` |
| Markdown syntax reference | Localized | `t('editor.markdown.{syntax}')` |

---

## 10. Locale-Aware CSS Patterns

### 10.1 Logical Properties

```css
/* All layout uses logical properties for RTL/LTR support */
.component {
  /* Margins */
  margin-inline-start: 0.5rem;   /* Left in LTR, Right in RTL */
  margin-inline-end: 0.5rem;     /* Right in LTR, Left in RTL */
  margin-block-start: 0.25rem;   /* Top (always) */
  margin-block-end: 0.25rem;     /* Bottom (always) */

  /* Padding */
  padding-inline-start: 1rem;
  padding-inline-end: 1rem;
  padding-block-start: 0.5rem;
  padding-block-end: 0.5rem;

  /* Borders */
  border-inline-start: 1px solid var(--border-color);
  border-inline-end: 1px solid var(--border-color);
  border-block-start: 1px solid var(--border-color);
  border-block-end: 1px solid var(--border-color);

  /* Positioning */
  inset-inline-start: 0;        /* left: 0 in LTR, right: 0 in RTL */
  inset-inline-end: 0;          /* right: 0 in LTR, left: 0 in RTL */
  inset-block-start: 0;         /* top: 0 (always) */
  inset-block-end: 0;           /* bottom: 0 (always) */

  /* Text */
  text-align: start;            /* Left in LTR, Right in RTL */
  text-align-last: start;

  /* Flexbox */
  flex-direction: row;          /* Reversed in RTL automatically */
  justify-content: flex-start;

  /* Grid */
  justify-items: start;
}
```

### 10.2 Tailwind CSS RTL Classes

```html
<!-- Tailwind CSS with RTL support via logical properties -->
<div class="ms-4 me-2 ps-3 pe-1 border-s-2 text-start">
  <!-- ms-4: margin-inline-start: 1rem -->
  <!-- me-2: margin-inline-end: 0.5rem -->
  <!-- ps-3: padding-inline-start: 0.75rem -->
  <!-- pe-1: padding-inline-end: 0.25rem -->
  <!-- border-s-2: border-inline-start: 2px solid -->
  <!-- text-start: text-align: start -->
</div>

<!-- RTL-specific overrides (only when logical properties are insufficient) -->
<div class="ltr:hidden rtl:block">RTL-only content</div>
<div class="ltr:block rtl:hidden">LTR-only content</div>
```

### 10.3 Locale-Specific CSS

```css
/* Locale-specific styling */
:lang(zh) {
  line-height: 1.8; /* CJK text needs more line height */
  word-break: break-all;
}

:lang(ja) {
  line-height: 1.8;
  word-break: break-all;
  letter-spacing: 0.05em; /* Slight tracking for Japanese */
}

:lang(ar) {
  line-height: 1.6;
  font-feature-settings: "liga" on, "calt" on; /* Enable Arabic ligatures */
}

/* Scientific notation (always LTR regardless of locale) */
.scientific-notation,
.chemical-formula,
.peptide-sequence {
  direction: ltr;
  unicode-bidi: isolate;
}

/* Mixed content handling */
.mixed-content {
  unicode-bidi: plaintext;
  direction: auto;
}
```

---

## 11. Known i18n Issues

### 11.1 Active i18n Issues

| ID | Locale | Issue | Severity | Status | Workaround |
|----|--------|-------|----------|--------|------------|
| I18N-001 | ar | RTL layout not consistently applied to all new components | High | Open | Audit all components for logical properties |
| I18N-002 | zh/ja | `Intl.Segmenter` not available in Firefox/Safari | Medium | Open | Character-by-character fallback |
| I18N-003 | ja | Furigana (ruby text) not supported in MDX Editor | Low | Open | Use HTML `<ruby>` elements in output |
| I18N-004 | ar | Arabic diacritics lost in search indexing | Medium | Open | Normalize text; preserve diacritics in display |
| I18N-005 | ar | Arabic-Indic numerals vs Western Arabic numerals | Low | Open | Use `numberingSystem: 'latn'` by default |
| I18N-006 | zh | Simplified vs Traditional Chinese not distinguished | Low | Open | Add `zh-hans` and `zh-hant` locales if needed |
| I18N-007 | ja | `contenteditable` IME quirks in Safari | Medium | Open | Use `beforeinput` event; debounce saves |
| I18N-008 | All | RTL text with embedded LTR scientific terms | Medium | Open | Use `unicode-bidi: isolate` for scientific content |
| I18N-009 | zh/ja | CJK line breaking may split compounds incorrectly | Low | Open | Use `line-break: strict` for Japanese |
| I18N-010 | All | Date format inconsistency across locales | Low | Open | Use `Intl.DateTimeFormat` consistently |

### 11.2 Resolved i18n Issues

| ID | Resolution | Date Resolved |
|----|-----------|---------------|
| N/A | No issues resolved yet | N/A |

---

## 12. Testing Protocol

### 12.1 i18n Testing Matrix

| Test Type | Locales | Frequency | Tools |
|-----------|---------|-----------|-------|
| RTL layout verification | ar | Every PR | Playwright + visual regression |
| CJK text rendering | zh, ja | Weekly | Manual + Playwright |
| IME composition testing | zh, ja | Weekly | Manual (Pinyin, Romaji input) |
| Unicode search testing | All | Every PR | Automated test suite |
| Date/number formatting | All | Every PR | `Intl` API validation |
| Keyboard shortcut testing | All | Every PR | Playwright keyboard API |
| Locale switching | All | Every PR | Playwright E2E |
| Screen reader i18n | All | Bi-weekly | VoiceOver, NVDA, TalkBack |

### 12.2 Locale-Specific Test Scenarios

| Scenario | Locale | Expected Behavior | Pass Criteria |
|----------|--------|-------------------|---------------|
| Page load in Arabic | ar | RTL layout; sidebar on right; text right-aligned | Visual inspection |
| Page load in Chinese | zh | CJK text wraps correctly; line height appropriate | Visual inspection |
| Page load in Japanese | ja | Kana/Kanji render correctly; line height appropriate | Visual inspection |
| Command Palette in Arabic | ar | Modal mirrors; search input right-aligned | Visual inspection |
| Split Pane in Arabic | ar | Pane order mirrors; resize handle on correct side | Functional test |
| MDX Editor with Pinyin | zh | IME composition works; candidates appear correctly | Manual test |
| MDX Editor with Romaji | ja | IME composition works; kana/kanji conversion works | Manual test |
| Search with CJK text | zh, ja | Characters match correctly; results are accurate | Functional test |
| Search with Arabic text | ar | Right-to-left search works; results are accurate | Functional test |
| Date display in Arabic | ar | Date formatted correctly; numerals correct | Functional test |
| Number display in Arabic | ar | Number formatted correctly; grouping correct | Functional test |
| Language switch LTR→RTL | en→ar | Smooth transition; no layout flash | CLS = 0 |
| Language switch RTL→LTR | ar→en | Smooth transition; no layout flash | CLS = 0 |

### 12.3 Automated i18n Tests

```typescript
// tests/e2e/i18n.spec.ts
import { test, expect } from '@playwright/test';

test.describe('i18n Compatibility', () => {
  test('Arabic page has RTL direction', async ({ page }) => {
    await page.goto('/ar/');
    const dir = await page.getAttribute('html', 'dir');
    expect(dir).toBe('rtl');
  });

  test('Chinese text wraps correctly', async ({ page }) => {
    await page.goto('/zh/');
    const lineHeight = await page.evaluate(() => {
      const el = document.querySelector('.article-content');
      return window.getComputedStyle(el!).lineHeight;
    });
    // Verify line height is appropriate for CJK (>= 1.6)
    expect(parseFloat(lineHeight)).toBeGreaterThanOrEqual(1.6);
  });

  test('Command Palette mirrors in RTL', async ({ page }) => {
    await page.goto('/ar/');
    await page.keyboard.press('Meta+k'); // or Ctrl+k
    const textAlign = await page.evaluate(() => {
      const input = document.querySelector('.command-palette input');
      return window.getComputedStyle(input!).textAlign;
    });
    expect(textAlign).toBe('end');
  });

  test('Date formatting uses locale', async ({ page }) => {
    await page.goto('/ar/');
    const dateText = await page.textContent('.article-date');
    // Arabic date format
    expect(dateText).toMatch(/\d{1,2}\s+\S+\s+\d{4}/);
  });
});
```

### 12.4 i18n Accessibility Testing

| Test Case | Locale | Screen Reader | Expected Behavior |
|-----------|--------|--------------|-------------------|
| RTL navigation | ar | VoiceOver | Navigation follows RTL reading order |
| CJK content reading | zh/ja | NVDA | Characters read correctly |
| Mixed content (ar + en) | ar | TalkBack | Scientific terms read as LTR |
| IME input announcement | zh/ja | VoiceOver | Composition announced correctly |
| Number announcement | ar | NVDA | Numbers read in correct format |
| Date announcement | all | VoiceOver | Date read in locale-appropriate format |

---

## Cross-References

| Spec File | Relationship |
|-----------|-------------|
| `os_compatibility.md` | OS-level font rendering affects CJK/Arabic display |
| `browser_compatibility.md` | Browser Unicode support enables regex search features |
| `testing_matrix.md` | Locale-specific testing dimensions |
| `os_compatibility.md` | RTL layout requirements feed into component design |

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-06-19 | Platform Engineering Team | Initial release |
