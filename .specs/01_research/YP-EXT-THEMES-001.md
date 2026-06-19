---
document_id: YP-EXT-THEMES-001
title: "Custom Themes for Educational Platforms"
version: "1.0.0"
date: "2026-06-19"
status: DRAFT
authors:
  - name: "Wikisites Knowledge Engineering Team"
    role: "Primary Authors"
classification: "Internal — Phase 1 Epistemological Discovery"
applicable_sites:
  - ENCP
  - WIKI
abstract: >-
  Specification of custom themes including CSS custom properties architecture, theme
  inheritance (base to override), dark/light mode system (existing + extension),
  theme marketplace patterns, and performance (critical CSS, lazy loading). Defines
  the theming framework for both sites.
test_vector_ref: "test_vectors/test_vectors_social_editor_ext.toml"
domain_constraint_ref: "domain_constraints/domain_constraints_social.toml"
bibliography_ref: "bibliography.md"
---

# Yellow Paper: Custom Themes for Educational Platforms

**Document ID:** YP-EXT-THEMES-001
**Version:** 1.0.0
**Date:** 2026-06-19
**Status:** DRAFT

---

## Table of Contents

1. [Document Header](#1-document-header)
2. [Executive Summary](#2-executive-summary)
3. [Nomenclature and Notation](#3-nomenclature-and-notation)
4. [Theoretical Foundation](#4-theoretical-foundation)
5. [Algorithm Specification](#5-algorithm-specification)
6. [Test Vector Specification](#6-test-vector-specification)
7. [Domain Constraints](#7-domain-constraints)
8. [Bibliography](#8-bibliography)
9. [Knowledge Graph Concepts](#9-knowledge-graph-concepts)
10. [Quality Checklist](#10-quality-checklist)

---

## 1. Document Header

### 1.1 Purpose

This Yellow Paper specifies the custom themes system for oligopeptide educational platforms on encyclopeptide.com and wikipept.com. It establishes authoritative architecture decisions for theming, including CSS custom properties, theme inheritance, dark/light mode, marketplace patterns, and performance optimization.

### 1.2 Scope

Covers CSS custom properties architecture, theme inheritance (base, override, plugin), dark/light mode system (extending existing `theme.ts`), theme marketplace (discovery, installation, preview), and performance (critical CSS, lazy loading). Does not cover plugin API (reserved for YP-EXT-PLUGIN-API-001), editor themes (reserved for YP-EDITOR-MDX-001), or settings export (reserved for YP-EXT-SETTINGS-001).

### 1.3 Audience

Frontend developers implementing theming, designers creating themes, and users customizing their experience.

### 1.4 Normative References

- CSS Custom Properties (https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- CSS `@property` (https://developer.mozilla.org/en-US/docs/Web/CSS/@property)
- Tailwind CSS 4.x (https://tailwindcss.com)
- Existing `packages/shared/src/theme.ts`

### 1.5 Definitions and Acronyms

| Term | Definition                                         |
| ---- | -------------------------------------------------- |
| CSS Custom Property | CSS variable defined with `--` prefix       |
| Theme                | Collection of CSS custom properties           |
| Design Token         | Named CSS custom property value               |
| Critical CSS         | CSS required for initial render               |

---

## 2. Executive Summary

### 2.1 Problem Statement

Oligopeptide educational websites require a theme system that enables users to customize the visual appearance, supports dark/light mode with cross-subdomain persistence (already implemented), and allows community-contributed themes via a marketplace. The system must maintain performance while supporting dynamic theme switching.

### 2.2 Scope of Solution

1. **CSS Custom Properties Architecture**: Design token system
2. **Theme Inheritance**: Base to override cascade
3. **Dark/Light Mode**: Extending existing implementation
4. **Theme Marketplace**: Discovery and installation
5. **Performance**: Critical CSS and lazy loading

### 2.3 Key Assumptions

- Existing dark/light mode in `packages/shared/src/theme.ts`
- Tailwind CSS 4.x design system
- CSS custom properties used throughout
- Cross-subdomain cookie persistence already works

### 2.4 Success Criteria

- Theme switching in < 50ms
- No FOUC (Flash of Unstyled Content)
- All design tokens overridable
- Critical CSS inlined for performance
- Theme marketplace with 10+ themes at launch

---

## 3. Nomenclature and Notation

| Term               | Definition                                                        |
| ------------------ | ----------------------------------------------------------------- |
| Design Token       | Named value in design system (color, spacing, typography)         |
| Base Theme         | Default theme with all tokens defined                             |
| Override Theme     | Theme that extends base with partial overrides                    |
| Plugin Theme       | Theme provided by plugin                                          |
| Theme Switcher     | UI component for changing themes                                  |

---

## 4. Theoretical Foundation

### 4.1 CSS Custom Properties Architecture

#### 4.1.1 Design Token Categories

```css
/* Base theme: packages/shared/src/theme-tokens.css */
:root,
[data-theme="light"] {
  /* Colors */
  --color-primary: #1a73e8;
  --color-primary-hover: #1557b0;
  --color-secondary: #5f6368;
  --color-background: #ffffff;
  --color-surface: #f8f9fa;
  --color-text: #202124;
  --color-text-secondary: #5f6368;
  --color-border: #dadce0;
  --color-accent: #e8f0fe;
  
  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  
  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  
  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  --shadow-xl: 0 20px 25px rgba(0,0,0,0.15);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 350ms ease;
  
  /* Layout */
  --sidebar-width: 280px;
  --content-max-width: 768px;
  --header-height: 64px;
}

[data-theme="dark"] {
  --color-primary: #8ab4f8;
  --color-primary-hover: #aecbfa;
  --color-secondary: #9aa0a6;
  --color-background: #1f1f1f;
  --color-surface: #2d2d2d;
  --color-text: #e8eaed;
  --color-text-secondary: #9aa0a6;
  --color-border: #5f6368;
  --color-accent: #1a3a5c;
}
```

#### 4.1.2 Theme Inheritance

```
┌─────────────────────────────────────────────────┐
│           Theme Inheritance                      │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  Base Theme (tokens.css)                │   │
│  │  All tokens defined with defaults       │   │
│  └─────────────────────┬───────────────────┘   │
│                        │                        │
│                        ▼                        │
│  ┌─────────────────────────────────────────┐   │
│  │  Site Theme (site-specific overrides)   │   │
│  │  Encyclopeptide or Wikipept branding    │   │
│  └─────────────────────┬───────────────────┘   │
│                        │                        │
│                        ▼                        │
│  ┌─────────────────────────────────────────┐   │
│  │  User Theme (localStorage override)     │   │
│  │  Custom colors, fonts, spacing          │   │
│  └─────────────────────┬───────────────────┘   │
│                        │                        │
│                        ▼                        │
│  ┌─────────────────────────────────────────┐   │
│  │  Plugin Theme (plugin-provided)         │   │
│  │  Community-contributed themes           │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### 4.2 Dark/Light Mode System

#### 4.2.1 Existing Implementation

From `packages/shared/src/theme.ts`:
- `getTheme(site)`: Returns current theme preference
- `setTheme(site, theme)`: Sets theme and persists
- `applyTheme(theme)`: Sets `data-theme` attribute on `<html>`
- `initTheme(site)`: Initializes on page load (prevents FOUC)
- Cross-subdomain cookie persistence via `.pages.dev` domain

#### 4.2.2 Extension Points

```typescript
// Extended theme type
type Theme = 'light' | 'dark' | 'system' | string; // String = custom theme ID

// Theme registry
interface ThemeDefinition {
  id: string;
  name: string;
  author: string;
  description: string;
  colors: Record<string, string>;
  fonts: Record<string, string>;
  // ... other tokens
}

// Register custom theme
function registerTheme(theme: ThemeDefinition): void {
  const style = document.createElement('style');
  style.id = `theme-${theme.id}`;
  style.textContent = generateThemeCSS(theme);
  document.head.appendChild(style);
}
```

### 4.3 Theme Marketplace

#### 4.3.1 Theme Package Structure

```
theme-package/
  manifest.json          # Theme metadata
  tokens.css             # CSS custom properties
  preview.png            # Preview image (1200x630)
  README.md              # Documentation
```

#### 4.3.2 Theme Manifest

```json
{
  "id": "midnight-science",
  "name": "Midnight Science",
  "version": "1.0.0",
  "description": "Dark theme optimized for scientific content",
  "author": "community",
  "license": "MIT",
  "preview": "preview.png",
  "colors": {
    "background": "#0d1117",
    "surface": "#161b22",
    "text": "#c9d1d9",
    "primary": "#58a6ff"
  },
  "tags": ["dark", "scientific", "minimal"],
  "downloads": 1234,
  "rating": 4.8
}
```

### 4.4 Performance Optimization

#### 4.4.1 Critical CSS Inlining

```html
<!-- Critical theme CSS inlined in <head> -->
<style>
  /* Minimal tokens for FOUC prevention */
  :root {
    --color-primary: #1a73e8;
    --color-background: #ffffff;
    --color-text: #202124;
  }
  [data-theme="dark"] {
    --color-primary: #8ab4f8;
    --color-background: #1f1f1f;
    --color-text: #e8eaed;
  }
</style>
```

#### 4.4.2 Theme CSS Loading

```typescript
// Dynamic theme CSS loading
async function loadThemeCSS(themeId: string): Promise<void> {
  // Check if already loaded
  if (document.getElementById(`theme-${themeId}`)) return;
  
  // Fetch theme CSS
  const response = await fetch(`/themes/${themeId}/tokens.css`);
  const css = await response.text();
  
  // Inject style
  const style = document.createElement('style');
  style.id = `theme-${themeId}`;
  style.textContent = css;
  document.head.appendChild(style);
}

// Preload theme CSS on hover
function preloadTheme(themeId: string): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = `/themes/${themeId}/tokens.css`;
  link.as = 'style';
  document.head.appendChild(link);
}
```

---

## 5. Algorithm Specification

### 5.1 Theme Application Algorithm

```
FUNCTION applyTheme(themeId, mode):
  // 1. Set data-theme attribute
  document.documentElement.setAttribute('data-theme', mode)
  
  // 2. Load theme CSS if custom
  IF themeId != 'default' THEN
    await loadThemeCSS(themeId)
  
  // 3. Apply theme-specific overrides
  FOR EACH [token, value] IN themeOverrides:
    document.documentElement.style.setProperty(token, value)
  
  // 4. Persist preference
  localStorage.setItem('theme-preference', JSON.stringify({
    themeId,
    mode,
    timestamp: Date.now()
  }))
  
  // 5. Cross-subdomain sync
  setCookieTheme(mode)
  
  // 6. Notify listeners
  emit('themeChange', { themeId, mode })
END FUNCTION
```

### 5.2 Theme Inheritance Resolution

```
FUNCTION resolveThemeTokens(themeId):
  tokens = {}
  
  // 1. Load base theme
  baseTokens = loadCSSVariables(':root')
  Object.assign(tokens, baseTokens)
  
  // 2. Load site theme (if different from base)
  siteTokens = loadCSSVariables(`[data-site="${site}"]`)
  Object.assign(tokens, siteTokens)
  
  // 3. Load custom theme (if specified)
  IF themeId != 'default' THEN
    customTokens = loadThemeCSS(themeId)
    Object.assign(tokens, customTokens)
  
  // 4. Apply user overrides (from settings)
  userOverrides = getUserThemeOverrides()
  Object.assign(tokens, userOverrides)
  
  RETURN tokens
END FUNCTION
```

---

## 6. Test Vector Specification

| Category            | Vector Count | Description                       |
| ------------------- | ------------ | --------------------------------- |
| Token Application   | 8            | CSS variable injection            |
| Theme Inheritance   | 6            | Override cascade resolution       |
| Dark/Light Mode     | 6            | Mode switching, persistence       |
| Performance         | 6            | FOUC prevention, loading          |
| **Total**           | **26**       |                                   |

---

## 7. Domain Constraints

| Parameter | Limit | Notes |
|-----------|-------|-------|
| Critical CSS size | < 2KB | Inlined in head |
| Theme CSS size | < 10KB | Full theme |
| Theme switch time | < 50ms | No visible delay |
| Max custom tokens | 200 | Performance limit |
| Theme cache TTL | 7 days | Browser cache |

---

## 8. Bibliography

1. MDN. (2024). _Using CSS custom properties_. https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties **[TQA-5]**

2. MDN. (2024). _@property_. https://developer.mozilla.org/en-US/docs/Web/CSS/@property **[TQA-5]**

3. Tailwind CSS. (2024). _CSS Variables_. https://tailwindcss.com **[TQA-5]**

4. Frost, B. (2016). _Atomic Design_. https://atomicdesign.bradfrost.com **[TQA-3]**

5. Smashing Magazine. (2023). _Design Tokens_. https://www.smashingmagazine.com **[TQA-3]**

---

## 9. Knowledge Graph Concepts

| English              | Chinese (ZH) | Russian (RU)         | German (DE)           | French (FR)                | Japanese (JP)            |
| -------------------- | ------------ | -------------------- | --------------------- | -------------------------- | ------------------------ |
| Theme                | 主题         | тема                 | Thema                 | Theme                      | テーマ                    |
| Design token         | 设计令牌     | токен дизайна        | Design-Token          | Jeton de design            | デザイントークン          |
| Dark mode            | 暗色模式     | тёмная тема          | Dunkelmodus           | Mode sombre                | ダークモード              |

---

## 10. Quality Checklist

### 10.1 Completeness

- [ ] CSS custom properties architecture documented
- [ ] Theme inheritance cascade specified
- [ ] Dark/light mode extension points defined
- [ ] Theme marketplace structure documented
- [ ] Performance optimization strategies specified

### 10.2 Accuracy

- [ ] CSS variables follow MDN specification
- [ ] Existing `theme.ts` integration verified
- [ ] Performance targets realistic

### 10.3 Consistency

- [ ] Token naming follows Tailwind conventions
- [ ] Inheritance model is predictable

### 10.4 Traceability

- [ ] All decisions traceable to existing implementation
- [ ] References cited correctly

### 10.5 Usability

- [ ] Theme creation workflow is simple
- [ ] Override mechanism is intuitive
