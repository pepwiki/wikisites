---
document_id: XP-BROWSER-001
title: "Browser Compatibility Matrix"
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
  Browser-level compatibility analysis for KP Wikisites. Defines support
  matrix for Chromium, Firefox, and WebKit engines across desktop and mobile
  platforms. Covers feature detection strategy (CSS @supports, JS API checks),
  WebKit quirks, IndexedDB behavior, service worker lifecycle differences,
  mobile browser constraints, and fallback strategies for each new interactive
  component (Command Palette, Keyboard Shortcuts, LaTeX Renderer, Graph View,
  Split Pane, Regex Search, MDX Editor).
depends_on:
  - "04_5_cross_platform/os_compatibility.md"
  - "04_performance/performance_requirements.md"
  - "03_security/security_test_plan.md"
---

# Browser Compatibility Matrix

**Document ID:** XP-BROWSER-001
**Version:** 1.0.0
**Date:** 2026-06-19
**Status:** DRAFT

---

## Table of Contents

1. [Overview](#1-overview)
2. [Engine Support Matrix](#2-engine-support-matrix)
3. [Chromium (Chrome/Edge)](#3-chromium-chromeedge)
4. [Firefox (Gecko)](#4-firefox-gecko)
5. [WebKit (Safari)](#5-webkit-safari)
6. [Mobile Browsers](#6-mobile-browsers)
7. [Feature Detection Strategy](#7-feature-detection-strategy)
8. [Component Compatibility Matrix](#8-component-compatibility-matrix)
9. [IndexedDB Behavior](#9-indexeddb-behavior)
10. [Service Worker Lifecycle](#10-service-worker-lifecycle)
11. [CSS Rendering Differences](#11-css-rendering-differences)
12. [Fallback Strategies](#12-fallback-strategies)
13. [Known Browser Issues](#13-known-browser-issues)
14. [Testing Protocol](#14-testing-protocol)

---

## 1. Overview

### 1.1 Purpose

This document defines the complete browser compatibility landscape for KP Wikisites, covering all three major rendering engines (Blink, Gecko, WebKit) across desktop and mobile form factors. It specifies feature detection strategies, documents engine-specific quirks, and defines fallback strategies for all new interactive components.

### 1.2 Browser Tier Definitions

| Tier | Definition | Support Level |
|------|-----------|---------------|
| **Tier 1** | Primary target — full feature parity, zero blocking issues | Full support, all features tested |
| **Tier 2** | Secondary target — 95%+ feature parity, documented workarounds | Full support, workarounds applied |
| **Tier 3** | Best-effort — core functionality works, advanced features degrade | Core features only, graceful degradation |

### 1.3 Minimum Browser Versions

| Browser | Minimum Version | JS Engine | CSS Grid | ES2022 | View Transitions |
|---------|----------------|-----------|----------|--------|-----------------|
| Chrome | 108+ | V8 | Full | Full | 111+ |
| Edge | 108+ | V8 | Full | Full | 111+ |
| Firefox | 109+ | SpiderMonkey | Full | Full | 127+ |
| Safari | 16.4+ | JavaScriptCore | Full | Partial | 18+ |
| Samsung Internet | 20+ | V8 | Full | Full | 22+ |

---

## 2. Engine Support Matrix

### 2.1 Rendering Engine Overview

| Engine | Browsers | CSS Prefixes | JS Engine | CSS Container Queries | CSS Nesting |
|--------|----------|-------------|-----------|----------------------|-------------|
| **Blink** | Chrome, Edge, Samsung Internet | None (modern) | V8 | 105+ | 120+ |
| **Gecko** | Firefox | None (modern) | SpiderMonkey | 110+ | 117+ |
| **WebKit** | Safari | `-webkit-` for backdrop-filter | JavaScriptCore | 16+ | 17.2+ |

### 2.2 Key Feature Differences by Engine

| Feature | Blink | Gecko | WebKit | Fallback |
|---------|-------|-------|--------|----------|
| CSS Container Queries | 105+ | 110+ | 16+ | Flexbox/Grid layout |
| CSS Nesting | 120+ | 117+ | 17.2+ | Flatten to flat CSS |
| View Transitions API | 111+ | 127+ | 18+ | CSS animation fade |
| `100dvh` | 108+ | 101+ | 15.4+ | `100vh` fallback |
| `backdrop-filter` | Full | Full | `-webkit-` prefix needed | Solid background |
| `gap` in Flexbox | 84+ | 63+ | 14.1+ | Margin-based spacing |
| `@layer` | 99+ | 97+ | 15.4+ | Specificity ordering |
| `color-mix()` | 111+ | 113+ | 16.2+ | Hardcoded color values |
| `text-wrap: balance` | 114+ | 115+ | 17.5+ | `text-wrap: wrap` |
| Subgrid | 117+ | 71+ | 16+ | Manual grid alignment |
| `popover` attribute | 114+ | 125+ | 17+ | `<dialog>` or JS modal |
| `anchor()` positioning | 125+ | — | — | JS-based positioning |

### 2.3 JavaScript API Differences

| API | Blink | Gecko | WebKit | Fallback |
|-----|-------|-------|--------|----------|
| `structuredClone()` | 98+ | 94+ | 15.4+ | JSON parse/stringify |
| `AbortSignal.timeout()` | 103+ | 100+ | 16.4+ | setTimeout + AbortController |
| `navigator.clipboard` | 66+ | 63+ | 13.1+ | `document.execCommand('copy')` |
| `navigator.share()` | 61+ | — | 12.2+ | Clipboard copy fallback |
| `<dialog>` element | 37+ | 98+ | 15.4+ | Custom modal component |
| `contenteditable="plaintext-only"` | Full | — | — | `contenteditable="true"` |
| `ResizeObserver` | 64+ | 62+ | 13.1+ | Window resize event |
| `MutationObserver` | 26+ | 14+ | 6+ | Polling (not recommended) |
| `requestIdleCallback` | 47+ | 55+ | — | setTimeout fallback |
| `Intl.Segmenter` | 87+ | — | — | Manual segmentation |
| `CSS.supports()` | 61+ | 55+ | 9+ | Feature detection via element |
| `customElements` | 54+ | 63+ | 10.1+ | N/A (progressive enhancement) |

---

## 3. Chromium (Chrome/Edge)

### 3.1 Chrome (Last 2 Major Versions)

**Status:** Tier 1 — Full support, zero known blocking issues.

| Feature | Support | Notes |
|---------|---------|-------|
| CSS Grid | Full | No known issues |
| CSS Container Queries | Full | Supported since Chrome 105 |
| CSS Nesting | Full | Supported since Chrome 120 |
| WebP/AVIF | Full | Hardware-accelerated decode |
| Service Workers | Full | Cache API fully functional |
| View Transitions API | Full | Supported since Chrome 111 |
| `<dialog>` element | Full | Native support |
| `popover` attribute | Full | Supported since Chrome 114 |
| WebGL2 | Full | Hardware acceleration available |
| Web Workers | Full | SharedWorker and dedicated Worker |
| ES2022 features | Full | V8 engine |
| Command Palette (kbd events) | Full | `KeyboardEvent.key` and `KeyboardEvent.code` fully supported |
| Canvas/WebGL for Graph View | Full | WebGL2 with ANGLE renderer |
| `contenteditable` | Full | Rich editing support |
| `ResizeObserver` | Full | Used in Split Pane |
| `IntersectionObserver` | Full | Used in lazy loading |

**Known Issues:**
- None at time of writing.

### 3.2 Edge (Last 2 Major Versions)

**Status:** Tier 1 — Full support, identical to Chrome (Chromium-based).

| Feature | Support | Notes |
|---------|---------|-------|
| All Chromium features | Full | Edge is Chromium-based; identical to Chrome |

**Known Issues:**
- None distinct from Chrome. Edge shares the Blink engine.

---

## 4. Firefox (Gecko)

### 4.1 Firefox (Last 2 Major Versions)

**Status:** Tier 1 — Full support, minor rendering differences.

| Feature | Support | Notes |
|---------|---------|-------|
| CSS Grid | Full | No known issues |
| CSS Container Queries | Full | Supported since Firefox 110 |
| CSS Nesting | Full | Supported since Firefox 117 |
| WebP/AVIF | Full | AVIF support since Firefox 93 |
| Service Workers | Full | Cache API fully functional |
| View Transitions API | Partial | Supported since Firefox 127; earlier versions degrade gracefully |
| `<dialog>` element | Full | Supported since Firefox 98 |
| `popover` attribute | Full | Supported since Firefox 125 |
| WebGL2 | Full | WebGL2 supported since Firefox 51 |
| Web Workers | Full | Dedicated Worker only (no SharedWorker) |
| ES2022 features | Full | SpiderMonkey engine |
| Command Palette (kbd events) | Full | `KeyboardEvent.key` and `KeyboardEvent.code` fully supported |
| Canvas/WebGL for Graph View | Full | WebGL2 supported |
| `contenteditable` | Full | Rich editing support |
| `ResizeObserver` | Full | Used in Split Pane |
| `IntersectionObserver` | Full | Used in lazy loading |

**Known Issues:**
- **FF-001**: Firefox renders subpixel text differently from Chrome on Windows. Font rendering may appear slightly heavier. **Impact:** Cosmetic only. **Workaround:** None needed.
- **FF-002**: Firefox's `prefers-contrast` media query may differ from Chrome in edge cases with semi-transparent overlays. **Impact:** Minor visual difference. **Workaround:** Test specific contrast combinations manually.
- **FF-003**: Firefox does not support `requestIdleCallback` as reliably as Chrome; may fire at different timing. **Impact:** Minor — non-critical task scheduling. **Workaround:** Use `setTimeout` fallback for idle scheduling.
- **FF-004**: Firefox SharedWorker not supported. **Impact:** Collaboration features cannot use SharedWorker for connection multiplexing. **Workaround:** Use dedicated Worker or direct WebSocket management.
- **FF-005**: Firefox Canvas measureText() returns slightly different widths than Chrome. **Impact:** Graph View node label sizing may differ. **Workaround:** Add padding tolerance to label width calculations.

---

## 5. WebKit (Safari)

### 5.1 Safari (Last 2 Major Versions)

**Status:** Tier 1 — Full support with specific WebKit quirks.

| Feature | Support | Notes |
|---------|---------|-------|
| CSS Grid | Full | No known issues |
| CSS Container Queries | Full | Supported since Safari 16 |
| CSS Nesting | Full | Supported since Safari 17.2 |
| WebP | Full | Supported since Safari 14 |
| AVIF | Full | Supported since Safari 16.4 |
| Service Workers | Full | Supported since Safari 15.4; cache storage limited to 50MB per origin |
| View Transitions API | Full | Supported since Safari 18 |
| `<dialog>` element | Full | Supported since Safari 15.4 |
| `popover` attribute | Full | Supported since Safari 17 |
| WebGL2 | Full | WebGL2 supported since Safari 15 |
| Web Workers | Full | Dedicated and Service Workers |
| ES2022 features | Partial | Safari 16.4+ supports most; some edge cases (RegExp v flag) require Safari 17+ |
| Command Palette (kbd events) | Full | `KeyboardEvent.key` supported; `KeyboardEvent.code` may differ on some layouts |
| Canvas/WebGL for Graph View | Full | WebGL2 supported; metal backend on Apple Silicon |
| `contenteditable` | Partial | Some rich text features differ; IME handling varies |
| `ResizeObserver` | Full | Used in Split Pane |
| `IntersectionObserver` | Full | Used in lazy loading |
| `Intl.Segmenter` | Not supported | CJK text segmentation requires manual handling |
| `navigator.share()` | Full | Supported since Safari 12.2 |

**Known Issues:**
- **WK-001**: Safari's CSS `backdrop-filter` performance degrades significantly with nested blur layers. **Impact:** Performance — may cause jank on low-end Macs. **Workaround:** Use `will-change: transform` on elements with backdrop-filter; limit nesting depth to 2 levels.
- **WK-002**: Safari 16.x has a bug where `position: sticky` inside a `display: grid` container can cause the element to "jump" during scroll. **Impact:** Layout stability. **Workaround:** Apply `overflow-anchor: auto` to the scroll container; explicitly set `top: 0` on sticky elements.
- **WK-003**: Safari's handling of `<input type="date">` remains inconsistent; date picker UI varies by OS version. **Impact:** Cosmetic. **Workaround:** Use custom date picker component.
- **WK-004**: Safari's content blocking (ITP) may block third-party scripts loaded cross-origin. **Impact:** Analytics and external resources. **Workaround:** Self-host all analytics scripts; use `rel="preconnect"` for third-party origins.
- **WK-005**: Safari does not support `Intl.Segmenter`, which is needed for CJK word segmentation in Regex Search. **Impact:** Japanese/Chinese text search may not segment correctly. **Workaround:** Use polyfill or manual character-class-based segmentation.
- **WK-006**: Safari's `contenteditable` implementation has quirks with IME composition events, particularly for CJK input. **Impact:** MDX Editor IME support may be inconsistent. **Workaround:** Use `beforeinput` event instead of `keyup`/`keydown` for content change detection.
- **WK-007**: Safari IndexedDB transactions auto-commit faster than other browsers; long-running transactions may fail. **Impact:** Graph View data persistence. **Workaround:** Keep transactions short; use multiple smaller transactions.
- **WK-008**: Safari's WebGL implementation uses Metal backend on Apple Silicon, which may produce different rendering output than ANGLE (Chrome) or Mesa (Firefox). **Impact:** Graph View node rendering may differ slightly. **Workaround:** Use standard WebGL features only; avoid vendor-specific extensions.
- **WK-009**: Safari's Service Worker cache size limit (50MB per origin) is lower than Chrome/Firefox. **Impact:** Offline content may be evicted sooner. **Workaround:** Monitor `navigator.storage.estimate()`; implement cache eviction strategy.

---

## 6. Mobile Browsers

### 6.1 Mobile Chrome (Android)

**Status:** Tier 1 — Full support, primary mobile target.

| Feature | Support | Notes |
|---------|---------|-------|
| Touch events | Full | Touch-optimized controls for all interactive components |
| Virtual keyboard | Full | `virtualKeyboard` API available in Chrome 108+ |
| Viewport handling | Full | `100dvh` supported; `visualViewport` API available |
| Service Workers | Full | Full PWA support |
| WebGL2 | Full | WebGL2 on most modern devices; WebGL1 fallback for older devices |
| Command Palette | Full | Keyboard events work with physical keyboards and Bluetooth keyboards |
| Split Pane | Full | Touch resize handles; `pointer events` for unified input |
| Graph View | Full | WebGL2 with hardware acceleration on most devices |

**Known Issues:**
- **MC-001**: Chrome on low-end Android devices (< 4GB RAM) may aggressively kill background tabs, causing Service Worker termination. **Impact:** Offline functionality may be unreliable. **Workaround:** Minimal Service Worker footprint; cache-first strategy.
- **MC-002**: Chrome on Android renders `<select>` elements as native dropdowns that vary by device manufacturer. **Impact:** Custom dropdowns may conflict. **Workaround:** Use custom dropdown components for consistent styling.

### 6.2 Mobile Safari (iOS)

**Status:** Tier 1 — Full support with significant iOS-specific constraints.

| Feature | Support | Notes |
|---------|---------|-------|
| Touch events | Full | Touch-optimized controls |
| Virtual keyboard | Full | `visualViewport` API available |
| Viewport handling | Full | `100dvh` supported; address bar auto-hide causes height changes |
| Service Workers | Full | Supported since iOS 15.4 (PWA support) |
| WebGL2 | Full | WebGL2 on iOS 15+; may hit memory limits on older devices |
| Command Palette | Full | Works with physical keyboards; limited on-screen keyboard shortcuts |
| Split Pane | Full | Touch resize handles; pinch-to-zoom may conflict |
| Graph View | Full | WebGL2 with Metal backend; may hit memory limits on older devices |
| IME/CJK input | Full | Native iOS IME works; composition events supported |

**Known Issues:**
- **MS-001**: iOS Safari blocks `<input type="file">` from triggering the file picker unless triggered directly by a user gesture. **Impact:** Image upload. **Workaround:** Hidden input triggered by button click.
- **MS-002**: iOS Safari's address bar auto-hides on scroll, causing viewport height changes. **Impact:** CLS. **Workaround:** Use `100dvh` CSS unit.
- **MS-003**: iOS Safari does not support `navigator.clipboard.writeText()` without a user gesture. **Impact:** Copy-to-clipboard. **Workaround:** Wrap clipboard operations in a click handler.
- **MS-004**: iOS Safari has a hard limit on WebSocket connections (6 per domain). **Impact:** Real-time collaboration. **Workaround:** Connection pooling.
- **MS-005**: iOS Safari zooms on inputs with `font-size < 16px`. **Impact:** Search and form fields. **Workaround:** Set minimum `font-size: 16px` on mobile inputs.
- **MS-006**: iOS Safari does not support `loading="lazy"` on `<iframe>`. **Impact:** Embedded content. **Workaround:** IntersectionObserver for manual lazy loading.
- **MS-007**: iOS Safari's Split Pane drag may conflict with system swipe gestures (back/forward navigation). **Impact:** Split Pane resize handle may trigger browser navigation. **Workaround:** Use `touch-action: none` on resize handles; detect edge swipes.
- **MS-008**: iOS Safari WebGL memory limits on older devices (iPhone SE, iPhone 12) may cause Graph View to crash. **Impact:** Graph View rendering. **Workaround:** Implement WebGL context lost handler; reduce node count on detected low-memory devices.

### 6.3 Samsung Internet Browser

**Status:** Tier 2 — Full support with documented workarounds.

| Feature | Support | Notes |
|---------|---------|-------|
| Touch events | Full | Chromium-based |
| Virtual keyboard | Full | Chromium-based |
| Service Workers | Full | May have aggressive background cleanup |
| WebGL2 | Full | Chromium-based |
| Dark mode | Full | Respects system preference |

**Known Issues:**
- **SI-001**: Samsung Internet's built-in content blocker may interfere with third-party scripts. **Impact:** Analytics, external resources. **Workaround:** Self-host all critical scripts.
- **SI-002**: Samsung Internet's address bar occupies more vertical space than Chrome. **Impact:** Layout. **Workaround:** Use `100dvh` CSS unit.
- **SI-003**: Samsung Internet's dark mode may invert images if "Dark mode for web pages" is enabled. **Impact:** Molecular diagrams, structural images. **Workaround:** Apply `color-scheme: dark` CSS; use `filter: invert(0)` on images.

---

## 7. Feature Detection Strategy

### 7.1 CSS Feature Detection (`@supports`)

```css
/* Container Queries fallback */
@supports not (container-type: inline-size) {
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

/* CSS Nesting fallback */
@supports not (selector(&)) {
  .component .child { color: red; }
}

/* 100dvh fallback */
.hero {
  height: 100vh; /* Fallback */
  height: 100dvh; /* Dynamic viewport height */
}

/* backdrop-filter fallback */
@supports not (backdrop-filter: blur(1px)) {
  .modal-overlay {
    background-color: rgba(0, 0, 0, 0.85);
  }
}

/* View Transitions fallback */
@supports not (view-transition-name: main) {
  .page-transition {
    animation: fade-in 0.3s ease-in-out;
  }
}

/* Popover fallback */
@supports not selector(:popover-open) {
  .popover {
    display: none;
  }
  .popover[data-open] {
    display: block;
  }
}

/* text-wrap: balance fallback */
@supports not (text-wrap: balance) {
  h1, h2, h3 {
    text-wrap: wrap;
  }
}

/* color-mix() fallback */
@supports not (color: color-mix(in srgb, red, blue)) {
  .gradient-bg {
    background-color: #7f00ff; /* Approximation */
  }
}

/* Subgrid fallback */
@supports not (grid-template-columns: subgrid) {
  .nested-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### 7.2 JavaScript Feature Detection

```typescript
export const BrowserFeatures = {
  // CSS feature detection
  supportsContainerQueries: (): boolean => CSS.supports('container-type', 'inline-size'),
  supportsCSSNesting: (): boolean => CSS.supports('selector(&)'),
  supports100Dvh: (): boolean => {
    const test = document.createElement('div');
    test.style.cssText = 'height: 100dvh; position: fixed; top: -9999px;';
    document.body.appendChild(test);
    const supported = test.offsetHeight > 0;
    document.body.removeChild(test);
    return supported;
  },
  supportsViewTransitions: (): boolean => 'startViewTransition' in document,
  supportsPopover: (): boolean => 'popover' in document.createElement('div'),
  supportsTextWrapBalance: (): boolean => CSS.supports('text-wrap', 'balance'),
  supportsColorMix: (): boolean => CSS.supports('color', 'color-mix(in srgb, red, blue)'),
  supportsSubgrid: (): boolean => CSS.supports('grid-template-columns', 'subgrid'),

  // API support detection
  supportsClipboardWrite: (): boolean => 'clipboard' in navigator && 'writeText' in navigator.clipboard,
  supportsShare: (): boolean => 'share' in navigator,
  supportsWebGL2: (): boolean => {
    const canvas = document.createElement('canvas');
    return !!canvas.getContext('webgl2');
  },
  supportsWebGL: (): boolean => {
    const canvas = document.createElement('canvas');
    return !!canvas.getContext('webgl') || !!canvas.getContext('experimental-webgl');
  },
  supportsCanvas2D: (): boolean => {
    const canvas = document.createElement('canvas');
    return !!canvas.getContext('2d');
  },
  supportsSharedWorker: (): boolean => 'SharedWorker' in window,
  supportsResizeObserver: (): boolean => 'ResizeObserver' in window,
  supportsIntersectionObserver: (): boolean => 'IntersectionObserver' in window,
  supportsAbortSignalTimeout: (): boolean => 'timeout' in AbortSignal.prototype,
  supportsDialogElement: (): boolean => 'HTMLDialogElement' in window,
  supportsIntlSegmenter: (): boolean => 'Segmenter' in Intl,
  supportsRequestIdleCallback: (): boolean => 'requestIdleCallback' in window,
  supportsIndexedDB: (): boolean => 'indexedDB' in window,
  supportsServiceWorker: (): boolean => 'serviceWorker' in navigator,

  // Device capability detection
  isTouchDevice: (): boolean => 'ontouchstart' in window || navigator.maxTouchPoints > 0,
  isLowMemoryDevice: (): boolean => 'deviceMemory' in navigator && (navigator as any).deviceMemory < 4,
  isSlowNetwork: (): boolean => {
    if (!('connection' in navigator)) return false;
    const conn = (navigator as any).connection;
    return conn?.effectiveType === 'slow-2g' || conn?.effectiveType === '2g';
  },
  isRetinaDisplay: (): boolean => window.devicePixelRatio > 1,

  // Browser detection (for logging/analytics only, NOT for feature gating)
  isSafari: (): boolean => /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
  isFirefox: (): boolean => 'InstallTrigger' in window || navigator.userAgent.includes('Firefox'),
  isChrome: (): boolean => !!window.chrome && /Chrome/.test(navigator.userAgent),
  isEdge: (): boolean => /Edg\//.test(navigator.userAgent),
  isSamsungInternet: (): boolean => /SamsungBrowser/.test(navigator.userAgent),
};
```

### 7.3 Feature Detection for New Components

```typescript
// Component-specific feature detection
export const ComponentFeatures = {
  // Command Palette
  commandPalette: {
    supportsKeyboardShortcuts: (): boolean => {
      // All modern browsers support KeyboardEvent.key
      return 'key' in KeyboardEvent.prototype;
    },
    supportsCtrlOrMeta: (): boolean => {
      // Detect Mac vs non-Mac for Cmd vs Ctrl
      return /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    },
  },

  // LaTeX Renderer
  latexRenderer: {
    supportsMathML: (): boolean => {
      // MathML support varies by browser
      return 'mathMLElements' in document.createElement('div') ||
             document.createElementNS !== undefined;
    },
    supportsWebGL: (): boolean => BrowserFeatures.supportsWebGL(),
    supportsCanvas2D: (): boolean => BrowserFeatures.supportsCanvas2D(),
  },

  // Graph View
  graphView: {
    supportsWebGL2: (): boolean => BrowserFeatures.supportsWebGL2(),
    supportsWebGL: (): boolean => BrowserFeatures.supportsWebGL(),
    supportsCanvas2D: (): boolean => BrowserFeatures.supportsCanvas2D(),
    supportsOffscreenCanvas: (): boolean => 'OffscreenCanvas' in window,
    supportsWebWorkers: (): boolean => BrowserFeatures.supportsWebGL(),
  },

  // Split Pane
  splitPane: {
    supportsPointerEvents: (): boolean => 'PointerEvent' in window,
    supportsResizeObserver: (): boolean => BrowserFeatures.supportsResizeObserver(),
    supportsTouchAction: (): boolean => CSS.supports('touch-action', 'none'),
    supportsContainerQueries: (): boolean => BrowserFeatures.supportsContainerQueries(),
  },

  // Regex Search
  regexSearch: {
    supportsRegExpVFlag: (): boolean => {
      try {
        new RegExp('', 'v');
        return true;
      } catch {
        return false;
      }
    },
    supportsIntlSegmenter: (): boolean => BrowserFeatures.supportsIntlSegmenter(),
    supportsUnicodePropertyEscapes: (): boolean => {
      try {
        new RegExp('\\p{L}', 'u');
        return true;
      } catch {
        return false;
      }
    },
  },

  // MDX Editor
  mdxEditor: {
    supportsBeforeInput: (): boolean => 'onbeforeinput' in document.createElement('div'),
    supportsContentEditable: (): boolean => 'contentEditable' in document.createElement('div'),
    supportsExecCommand: (): boolean => typeof document.execCommand === 'function',
    supportsSelectionAPI: (): boolean => 'getSelection' in window,
    supportsIME: (): boolean => 'compositionstart' in document.createElement('div'),
  },
};
```

---

## 8. Component Compatibility Matrix

### 8.1 Command Palette

| Feature | Chrome | Firefox | Safari | Fallback |
|---------|--------|---------|--------|----------|
| `KeyboardEvent.key` | Full | Full | Full | `keyCode` deprecated |
| `KeyboardEvent.code` | Full | Full | Full | Physical key detection |
| `metaKey` / `ctrlKey` | Full | Full | Full | N/A |
| `KeyboardEvent.shiftKey` | Full | Full | Full | N/A |
| `<dialog>` for modal | Full | Full | Full | JS modal overlay |
| Fuzzy search | Full | Full | Full | Fuse.js polyfill |
| `navigator.platform` detection | Full | Full | Full | User-agent sniffing |

**Key Behavior:**
- macOS: `Cmd+K` opens command palette (metaKey)
- Windows/Linux: `Ctrl+K` opens command palette (ctrlKey)
- All browsers: `Escape` closes palette; `Arrow Up/Down` navigates; `Enter` selects

### 8.2 Keyboard Shortcuts

| Feature | Chrome | Firefox | Safari | Fallback |
|---------|--------|---------|--------|----------|
| Global shortcuts | Full | Full | Full | N/A |
| `event.preventDefault()` | Full | Full | Full | N/A |
| `event.stopPropagation()` | Full | Full | Full | N/A |
| `event.repeat` detection | Full | Full | Full | N/A |
| OS detection for modifier keys | Full | Full | Full | User-agent sniffing |
| `KeyboardEvent.code` for physical keys | Full | Full | Full | `KeyboardEvent.key` |

**Key Behavior:**
- macOS: Cmd as primary modifier (except Cmd+Space is Spotlight)
- Windows: Ctrl as primary modifier
- Linux: Ctrl as primary modifier
- All platforms: Escape for cancel/close
- All platforms: Tab for focus navigation

### 8.3 LaTeX Renderer

| Feature | Chrome | Firefox | Safari | Fallback |
|---------|--------|---------|--------|----------|
| MathML (native) | Full | Full | Full (16.4+) | KaTeX/MathJax |
| Canvas 2D rendering | Full | Full | Full | N/A |
| WebGL rendering | Full | Full | Full | Canvas 2D |
| SVG rendering | Full | Full | Full | N/A |
| Font loading | Full | Full | Full | System fonts |
| `Intl.NumberFormat` | Full | Full | Full | Manual formatting |

**Key Behavior:**
- KaTeX preferred over MathJax for performance
- Canvas 2D fallback for WebGL-less environments
- SVG export for accessibility (aria-label on rendered math)
- Unicode math characters for screen reader support

### 8.4 Graph View

| Feature | Chrome | Firefox | Safari | Fallback |
|---------|--------|---------|--------|----------|
| WebGL2 | Full | Full | Full (15+) | WebGL1 → Canvas 2D |
| Canvas 2D | Full | Full | Full | SVG |
| OffscreenCanvas | Full | — | — | Main thread canvas |
| SharedWorker for layout | Full | — | — | Dedicated Worker |
| `requestAnimationFrame` | Full | Full | Full | `setTimeout` |
| Touch pinch-to-zoom | Full | Full | Full | Scroll wheel |
| Touch pan | Full | Full | Full | Mouse drag |

**Key Behavior:**
- WebGL2 primary renderer with Canvas 2D fallback
- WebGL1 fallback for older Chromebooks
- SVG fallback for no-WebGL environments
- Layout computation offloaded to Worker when available
- Force-directed layout with requestAnimationFrame

### 8.5 Split Pane

| Feature | Chrome | Firefox | Safari | Fallback |
|---------|--------|---------|--------|----------|
| Pointer Events | Full | Full | Full | Touch + Mouse events |
| ResizeObserver | Full | Full | Full | Window resize event |
| `touch-action: none` | Full | Full | Full | `preventDefault()` |
| Container Queries | Full (105+) | Full (110+) | Full (16+) | Media queries |
| CSS `resize` property | Full | Full | Full | JS-based resize |
| `user-select: none` | Full | Full | Full | `-webkit-` prefix needed |

**Key Behavior:**
- Pointer Events for unified mouse/touch input
- ResizeObserver for responsive pane sizing
- `touch-action: none` on resize handle to prevent scroll conflicts
- Minimum pane width/height enforced via Container Queries or media queries
- Snap-to-center when within threshold

### 8.6 Regex Search

| Feature | Chrome | Firefox | Safari | Fallback |
|---------|--------|---------|--------|----------|
| `RegExp` with `u` flag | Full | Full | Full | N/A |
| `RegExp` with `v` flag | Full (113+) | Full (116+) | Full (17+) | Basic regex |
| Unicode property escapes (`\p{L}`) | Full (64+) | Full (78+) | Full (11.1+) | Character class ranges |
| `String.prototype.normalize()` | Full | Full | Full | N/A |
| `Intl.Segmenter` | Full (87+) | — | — | Manual segmentation |
| Case-insensitive matching | Full | Full | Full | `toLowerCase()` |
| Diacritic folding | Full | Full | Full | Manual normalization |

**Key Behavior:**
- Unicode regex with `u` flag for proper code point handling
- `v` flag for set notation (Unicode property escapes in character classes)
- `Intl.Segmenter` for CJK word segmentation (Chrome only; polyfill for Firefox/Safari)
- NFD normalization for diacritic-insensitive matching
- Fallback to basic regex for older browsers

### 8.7 MDX Editor

| Feature | Chrome | Firefox | Safari | Fallback |
|---------|--------|---------|--------|----------|
| `contenteditable` | Full | Full | Full | Textarea |
| `beforeinput` event | Full | Full | Partial | `keyup`/`keydown` |
| `execCommand` | Full | Full | Partial | Clipboard API |
| IME composition events | Full | Full | Full | — |
| Selection API | Full | Full | Full | — |
| `inputType` detection | Full | Full | Partial | Manual detection |
| Markdown shortcuts | Full | Full | Full | Toolbar buttons |

**Key Behavior:**
- `contenteditable="true"` with `beforeinput` for content change detection
- IME composition handling for CJK input (zh, ja)
- Markdown shortcuts (e.g., `# ` for heading, `- ` for list)
- Toolbar for formatting when keyboard shortcuts unavailable
- Toolbar for formatting when keyboard shortcuts unavailable
- Paste-as-markdown with HTML sanitization

---

## 9. IndexedDB Behavior

### 9.1 Browser-Specific IndexedDB Differences

| Behavior | Chrome | Firefox | Safari | Workaround |
|----------|--------|---------|--------|------------|
| Max storage per origin | ~unlimited (disk quota) | ~unlimited (disk quota) | ~1GB (may vary) | Monitor quota; implement eviction |
| Transaction auto-commit | After 30s timeout | After 30s timeout | Faster auto-commit (may be <5s) | Keep transactions short (<2s) |
| Schema version upgrade | Full `onupgradeneeded` | Full `onupgradeneeded` | Full `onupgradeneeded` | N/A |
| Cursor iteration | Full | Full | Full | N/A |
| Binary keys | Full | Full | Full | N/A |
| Compound indexes | Full | Full | Full | N/A |
| `getAll()` performance | Fast | Fast | Moderate | Use cursor for large datasets |
| Storage estimate API | Full | Full | Partial | Use `navigator.storage.estimate()` where available |

### 9.2 IndexedDB Usage in Wikisites

| Data | Store | Key | TTL | Eviction |
|------|-------|-----|-----|----------|
| Graph View layout | `graph-layout` | node ID | 30 days | LRU |
| Search index cache | `search-index` | locale | Until new index | Version-based |
| Offline wiki pages | `wiki-pages` | slug | 7 days | LRU |
| Quiz progress | `quiz-progress` | quiz ID | Session | Session-only |
| Flashcard review state | `flashcard-state` | card ID | Persistent | Manual clear |
| User preferences | `preferences` | key | Persistent | Manual clear |

---

## 10. Service Worker Lifecycle

### 10.1 Browser Differences

| Behavior | Chrome | Firefox | Safari | Workaround |
|----------|--------|---------|--------|------------|
| Registration | Fast | Fast | Moderate | N/A |
| Installation | Standard | Standard | Standard | N/A |
| Activation (skipWaiting) | Standard | Standard | Standard | Use `clients.claim()` |
| Background fetch | Full | Full | Partial | Use Cache API directly |
| Push notifications | Full | Full | Full (APNs) | N/A |
| Cache storage limit | ~unlimited (quota) | ~unlimited (quota) | 50MB per origin | Implement cache eviction |
| Offline page serving | Full | Full | Full | N/A |
| Stale-while-revalidate | Full | Full | Full | Custom caching strategy |

### 10.2 Cache Strategy by Content Type

| Content | Strategy | TTL | Max Size | Notes |
|---------|----------|-----|----------|-------|
| Static assets | Cache-first | Permanent | 50MB | Hashed filenames |
| HTML pages | Stale-while-revalidate | 7 days | 20MB | Network update in background |
| Search index | Cache-first | Until new version | 10MB | Version-checked |
| Images | Cache-first | 30 days | 30MB | LRU eviction |
| API responses | Network-first | 1 hour | 5MB | Fallback to cache |
| Offline page | Cache-first | Permanent | 1MB | Precached at install |

---

## 11. CSS Rendering Differences

### 11.1 Font Rendering

| Property | Chrome (Windows) | Chrome (macOS) | Firefox (Windows) | Firefox (macOS) | Safari (macOS) |
|----------|-----------------|----------------|-------------------|-----------------|---------------|
| Font smoothing | ClearType | Subpixel AA | ClearType | Subpixel AA | Subpixel AA |
| Font weight rendering | Standard | Standard | Slightly heavier | Standard | Standard |
| Line height calculation | Ascent + descent | Ascent + descent | Ascent + descent + leading | Ascent + descent | Ascent + descent |
| `text-rendering` | `optimizeLegibility` | `optimizeLegibility` | `optimizeLegibility` | `optimizeLegibility` | `optimizeLegibility` |
| `-webkit-font-smoothing` | Ignored | `antialiased` | Ignored | `antialiased` | `antialiased` |

**Impact on Wikisites:**
- Body text may appear slightly heavier on Firefox/Windows
- System font stack minimizes cross-platform differences
- No custom font loading means no FOIT/FOUT issues

### 11.2 Layout Rendering

| Behavior | Chrome | Firefox | Safari | Impact |
|----------|--------|---------|--------|--------|
| Subpixel layout | Yes | No (rounded pixels) | Yes | Minor alignment differences |
| `gap` in flexbox | Full | Full | Full (14.1+) | Gap-based spacing works everywhere |
| `aspect-ratio` | Full | Full | Full | Image containers consistent |
| Container queries | 105+ | 110+ | 16+ | Fallback needed for older browsers |
| `backdrop-filter` | Full | Full | `-webkit-` prefix | Must include prefix for Safari |
| `box-decoration-break` | `clone` only | `clone` only | `slice` and `clone` | Use `clone` for consistent behavior |

### 11.3 Dark Mode Rendering

| Behavior | Chrome | Firefox | Safari | Impact |
|----------|--------|---------|--------|--------|
| `prefers-color-scheme` | Full | Full | Full | Dark mode toggle works everywhere |
| `color-scheme` CSS | Full | Full | Full | Native form elements themed |
| Image auto-inversion | No | No | No | Samsung Internet may invert |
| `color-mix()` in dark mode | 111+ | 113+ | 16.2+ | Fallback: hardcoded dark colors |
| `filter: invert()` performance | GPU | GPU | GPU | Performance impact minimal |

---

## 12. Fallback Strategies

### 12.1 Progressive Enhancement Matrix

| Component | Minimum Capability | Enhanced With | Fallback UI |
|-----------|-------------------|---------------|-------------|
| Command Palette | `KeyboardEvent.key` | `<dialog>`, fuzzy search | Text input with static list |
| Keyboard Shortcuts | `KeyboardEvent` | OS detection | Default shortcuts only |
| LaTeX Renderer | Canvas 2D or MathML | WebGL for 3D, KaTeX for rendering | Unicode math characters |
| Graph View | Canvas 2D | WebGL2 for performance | SVG static graph |
| Split Pane | Pointer Events | ResizeObserver, Container Queries | Fixed pane widths |
| Regex Search | `RegExp` with `u` flag | `v` flag, `Intl.Segmenter` | Basic substring search |
| MDX Editor | `contenteditable` | `beforeinput`, IME | `<textarea>` with toolbar |

### 12.2 Fallback Implementation Pattern

```typescript
// Generic component fallback pattern
function withFallback<T>(
  featureCheck: () => boolean,
  enhanced: () => T,
  fallback: () => T,
): T {
  return featureCheck() ? enhanced() : fallback();
}

// Example: Graph View with fallback
const GraphRenderer = withFallback(
  () => BrowserFeatures.supportsWebGL2(),
  () => new WebGLGraphRenderer(canvas),
  () => BrowserFeatures.supportsCanvas2D()
    ? new Canvas2DGraphRenderer(canvas)
    : new SVGGraphRenderer(container),
);
```

### 12.3 CSS Fallback Pattern

```css
/* Feature: Container Queries */
@supports (container-type: inline-size) {
  .responsive-card {
    container-type: inline-size;
    container-name: card;
  }
  @container card (min-width: 400px) {
    .card-content {
      display: grid;
      grid-template-columns: 1fr 2fr;
    }
  }
}

@supports not (container-type: inline-size) {
  .responsive-card .card-content {
    display: grid;
    grid-template-columns: 1fr;
  }
  @media (min-width: 400px) {
    .responsive-card .card-content {
      grid-template-columns: 1fr 2fr;
    }
  }
}

/* Feature: CSS Nesting */
@supports (selector(&)) {
  .component {
    color: red;
    & .child {
      color: blue;
    }
  }
}

@supports not (selector(&)) {
  .component { color: red; }
  .component .child { color: blue; }
}

/* Feature: Popover */
@supports selector(:popover-open) {
  .popover {
    popover: auto;
  }
}

@supports not selector(:popover-open) {
  .popover {
    display: none;
    position: absolute;
  }
  .popover[data-open] {
    display: block;
  }
}
```

---

## 13. Known Browser Issues

### 13.1 Active Browser-Specific Issues

| ID | Browser | Issue | Severity | Status | Workaround |
|----|---------|-------|----------|--------|------------|
| BK-001 | Safari | `backdrop-filter` performance with nested blurs | Medium | Open | `will-change: transform`; limit nesting |
| BK-002 | Safari | `position: sticky` jump in grid container | Medium | Open | `overflow-anchor: auto`; explicit `top: 0` |
| BK-003 | Safari | `<input type="date">` UI inconsistency | Low | Open | Custom date picker component |
| BK-004 | Safari | ITP blocking third-party scripts | Medium | Open | Self-host analytics; `preconnect` |
| BK-005 | Safari | `Intl.Segmenter` not supported | Medium | Open | Polyfill or manual segmentation |
| BK-006 | Safari | `contenteditable` IME quirks for CJK | Medium | Open | Use `beforeinput` event |
| BK-007 | Safari | IndexedDB transaction auto-commit faster | Low | Open | Keep transactions short (<2s) |
| BK-008 | Safari | Service Worker cache limit (50MB) | Low | Open | Cache eviction strategy |
| BK-009 | Firefox | SharedWorker not supported | Medium | Open | Dedicated Worker or direct WebSocket |
| BK-010 | Firefox | `requestIdleCallback` timing differences | Low | Open | `setTimeout` fallback |
| BK-011 | Firefox | `Canvas.measureText()` width differences | Low | Open | Padding tolerance in label sizing |
| BK-012 | Samsung Internet | Dark mode image inversion | Medium | Open | `color-scheme: dark`; `filter: invert(0)` |
| BK-013 | Samsung Internet | Content blocker interference | Low | Open | Self-host critical scripts |
| BK-014 | All mobile | iOS WebSocket connection limit (6/domain) | Medium | Open | Connection pooling |
| BK-015 | All mobile | iOS input zoom on small fonts | High | Open | Minimum 16px font on mobile inputs |
| BK-016 | Chrome (low-RAM) | Background tab killing on low-RAM Android | Medium | Open | Minimal Service Worker footprint |
| BK-017 | All | `RegExp` v flag not supported in Safari <17 | Low | Open | Basic regex fallback |

### 13.2 Resolved Browser Issues

| ID | Resolution | Date Resolved |
|----|-----------|---------------|
| N/A | No issues resolved yet | N/A |

---

## 14. Testing Protocol

### 14.1 Browser Testing Matrix

| Test Type | Browsers | Frequency | Tools |
|-----------|----------|-----------|-------|
| Cross-browser visual regression | Chrome, Firefox, Safari (WebKit) | Every PR | Playwright multi-browser |
| Feature detection validation | All target browsers | Every PR | Custom test suite |
| CSS fallback validation | All target browsers | Every PR | Visual regression |
| Keyboard shortcut testing | Chrome, Firefox, Safari | Every PR | Playwright keyboard API |
| WebGL fallback testing | Chrome, Firefox, Safari | Weekly | Manual + Playwright |
| IME input testing | Chrome, Firefox, Safari | Weekly | Manual (CJK input) |
| IndexedDB testing | Chrome, Firefox, Safari | Every PR | Playwright + idb polyfill |
| Service Worker testing | Chrome, Firefox, Safari | Every PR | Playwright SW lifecycle |

### 14.2 Playwright Cross-Browser Configuration

```typescript
// playwright.config.ts (browser-specific projects)
export default defineConfig({
  projects: [
    // Chromium (Chrome/Edge)
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    // Firefox
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    // WebKit (Safari)
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    // Mobile Chrome
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },
    },
    // Mobile Safari
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 14'] },
    },
    // Tablet
    {
      name: 'tablet-safari',
      use: { ...devices['iPad (gen 7)'] },
    },
  ],
});
```

### 14.3 Automated Browser Feature Tests

```typescript
// tests/e2e/browser-features.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Browser Feature Detection', () => {
  test('detects CSS Container Queries support', async ({ page }) => {
    const supported = await page.evaluate(() => CSS.supports('container-type', 'inline-size'));
    // Verify fallback layout when not supported
  });

  test('detects WebGL2 support', async ({ page }) => {
    const supported = await page.evaluate(() => {
      const canvas = document.createElement('canvas');
      return !!canvas.getContext('webgl2');
    });
    // Verify Canvas 2D fallback when WebGL2 not available
  });

  test('detects RegExp v flag support', async ({ page }) => {
    const supported = await page.evaluate(() => {
      try { new RegExp('', 'v'); return true; } catch { return false; }
    });
    // Verify basic regex fallback when v flag not available
  });

  test('detects SharedWorker support', async ({ page }) => {
    const supported = await page.evaluate(() => 'SharedWorker' in window);
    // Verify dedicated Worker fallback on Firefox
  });
});
```

---

## Cross-References

| Spec File | Relationship |
|-----------|-------------|
| `os_compatibility.md` | OS-level constraints inform browser support tiers |
| `compiler_compatibility.md` | Build target (ES2022) must match browser ES support |
| `testing_matrix.md` | Browser configurations feed into the full testing matrix |
| `i18n_compatibility.md` | Browser IME and Unicode support for i18n features |

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-06-19 | Platform Engineering Team | Initial release |
