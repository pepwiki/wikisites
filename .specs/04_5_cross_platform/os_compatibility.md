---
document_id: XP-OS-001
title: "OS Compatibility Analysis"
version: "1.0.0"
date: "2026-06-07"
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
  Comprehensive OS-level compatibility analysis for KP Wikisites across all
  supported operating systems and browser combinations. Defines known issues,
  workarounds, feature detection strategies, and polyfill requirements for
  Windows, macOS, iOS, Android, Linux, and ChromeOS. Includes compatibility
  analysis for new interactive components (Command Palette, Keyboard Shortcuts,
  LaTeX Renderer, Graph View, Split Pane, Regex Search, MDX Editor) and
  RTL layout support for Arabic.
depends_on:
  - "04_performance/performance_requirements.md"
  - "04_performance/optimization_roadmap.md"
  - "01_research/domain_constraints/domain_constraints_web.toml"
---

# OS Compatibility Analysis

**Document ID:** XP-OS-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** DRAFT

---

## Table of Contents

1. [Overview](#1-overview)
2. [Supported Operating Systems](#2-supported-operating-systems)
3. [Windows](#3-windows)
4. [macOS](#4-macos)
5. [iOS](#5-ios)
6. [Android](#6-android)
7. [Linux](#7-linux)
8. [ChromeOS](#8-chromeos)
9. [Feature Detection Strategy](#9-feature-detection-strategy)
10. [Polyfill and Fallback Matrix](#10-polyfill-and-fallback-matrix)
11. [Known Issues Registry](#11-known-issues-registry)
12. [Workaround Catalog](#12-workaround-catalog)
13. [Testing Protocol](#13-testing-protocol)

---

## 1. Overview

### 1.1 Purpose

This document defines the complete OS compatibility landscape for KP Wikisites (encyclopeptide.com and wikipept.com). It identifies browser-specific behavior differences, OS-level rendering variations, known bugs, and required workarounds across all supported platforms. The goal is to ensure consistent user experience for the educational oligopeptide content regardless of the user's device.

### 1.2 Compatibility Tiers

| Tier | Definition | Support Level |
|------|-----------|---------------|
| **Tier 1** | Primary target — full feature parity, zero known blocking issues | Full support, all features tested |
| **Tier 2** | Secondary target — 95%+ feature parity, known issues with documented workarounds | Full support, workarounds applied |
| **Tier 3** | Best-effort — core functionality works, advanced features may degrade gracefully | Core features only, graceful degradation |

### 1.3 Browser Support Policy

- **Last 2 major versions** of each supported browser
- **Chrome/Safari/Firefox/Edge**: Auto-update assumed; only current + previous major version tested
- **Samsung Internet**: Last 2 major versions (Android-specific)
- **Browsers below minimum**: Serve functional HTML-only fallback with warning banner

### 1.4 Minimum Browser Requirements

| Browser | Minimum Version | JavaScript Engine | CSS Grid | ES2022 |
|---------|----------------|-------------------|----------|--------|
| Chrome | 108 | V8 | Full | Full |
| Firefox | 109 | SpiderMonkey | Full | Full |
| Safari | 16.4 | JavaScriptCore | Full | Partial |
| Edge | 108 | V8 | Full | Full |
| Samsung Internet | 20 | V8 | Full | Full |
| Opera | 94 | V8 | Full | Full |

---

## 2. Supported Operating Systems

### 2.1 OS Coverage Matrix

| OS | Browsers Tested | Tier | Est. User Share | Priority |
|----|----------------|------|-----------------|----------|
| Windows 10/11 | Chrome, Firefox, Edge | 1 | 45% | Critical |
| macOS 12+ (Monterey) | Safari, Chrome, Firefox | 1 | 25% | Critical |
| iOS 16+ | Safari, Chrome | 1 | 15% | Critical |
| Android 10+ | Chrome, Samsung Browser, Firefox | 1 | 10% | High |
| Linux (Ubuntu 22+, Fedora 38+) | Chrome, Firefox | 2 | 3% | Medium |
| ChromeOS | Chrome | 2 | 2% | Medium |

### 2.2 Rendering Engine Matrix

| Rendering Engine | Browsers | OS Coverage |
|-----------------|----------|-------------|
| Blink | Chrome, Edge, Samsung Internet | Windows, macOS, Android, ChromeOS, Linux |
| WebKit | Safari | macOS, iOS |
| Gecko | Firefox | Windows, macOS, Android, Linux, ChromeOS |

---

## 3. Windows

### 3.1 Chrome (Last 2 Major Versions)

**Status:** Tier 1 — Full support, zero known blocking issues.

| Feature | Support | Notes |
|---------|---------|-------|
| CSS Grid | Full | No known issues |
| CSS Container Queries | Full | Supported since Chrome 105 |
| WebP/AVIF | Full | Full hardware-accelerated decode |
| Service Workers | Full | Cache API fully functional |
| Web Workers | Full | SharedWorker and dedicated Worker |
| IntersectionObserver | Full | Used for lazy loading images |
| CSS `prefers-color-scheme` | Full | Dark mode toggle works correctly |
| `prefers-reduced-motion` | Full | Animations disable correctly |
| View Transitions API | Full | Astro view transitions work |
| 3D Molecular Viewer (WebGL) | Full | Hardware acceleration available |
| ES2022 features | Full | All target features supported |

**Known Issues:**
- None at time of writing.

### 3.2 Firefox (Last 2 Major Versions)

**Status:** Tier 1 — Full support, minor rendering differences.

| Feature | Support | Notes |
|---------|---------|-------|
| CSS Grid | Full | No known issues |
| CSS Container Queries | Full | Supported since Firefox 110 |
| WebP/AVIF | Full | AVIF support since Firefox 93 |
| Service Workers | Full | Cache API fully functional |
| Web Workers | Full | Dedicated Worker only (no SharedWorker) |
| IntersectionObserver | Full | No known issues |
| CSS `prefers-color-scheme` | Full | Dark mode toggle works correctly |
| `prefers-reduced-motion` | Full | Animations disable correctly |
| View Transitions API | Partial | Supported since Firefox 127; earlier versions degrade gracefully |
| 3D Molecular Viewer (WebGL) | Full | WebGL2 supported since Firefox 51 |
| ES2022 features | Full | All target features supported |

**Known Issues:**
- **FI-001**: Firefox renders subpixel text differently from Chrome on Windows. Font rendering may appear slightly heavier. **Impact:** Cosmetic only. **Workaround:** None needed; text remains legible.
- **FI-002**: Firefox's implementation of `prefers-contrast` media query may differ from Chrome in edge cases with semi-transparent overlays. **Impact:** Minor visual difference in high-contrast mode. **Workaround:** Test specific contrast combinations manually.

### 3.3 Edge (Last 2 Major Versions)

**Status:** Tier 1 — Full support, identical to Chrome (Chromium-based).

| Feature | Support | Notes |
|---------|---------|-------|
| All Chromium features | Full | Edge is Chromium-based; identical to Chrome |

**Known Issues:**
- None distinct from Chrome. Edge shares the Blink engine.

---

## 4. macOS

### 4.1 Safari (Last 2 Major Versions)

**Status:** Tier 1 — Full support, with specific WebKit quirks.

| Feature | Support | Notes |
|---------|---------|-------|
| CSS Grid | Full | No known issues |
| CSS Container Queries | Full | Supported since Safari 16 |
| WebP | Full | Supported since Safari 14 |
| AVIF | Full | Supported since Safari 16.4 |
| Service Workers | Full | Supported since Safari 15.4; cache storage limited to 50MB per origin |
| Web Workers | Full | Dedicated and Service Workers |
| IntersectionObserver | Full | No known issues |
| CSS `prefers-color-scheme` | Full | Dark mode toggle works correctly |
| `prefers-reduced-motion` | Full | Animations disable correctly |
| View Transitions API | Full | Supported since Safari 18 |
| 3D Molecular Viewer (WebGL) | Full | WebGL2 supported since Safari 15 |
| ES2022 features | Partial | Safari 16.4+ supports most; some edge cases (RegExp v flag) require Safari 17+ |
| `<dialog>` element | Full | Supported since Safari 15.4 |
| `AbortSignal.timeout()` | Full | Supported since Safari 16.4 |

**Known Issues:**
- **MI-001**: Safari's CSS `backdrop-filter` performance degrades significantly with nested blur layers. **Impact:** Performance — may cause jank on low-end Macs. **Workaround:** Use `will-change: transform` on elements with backdrop-filter; limit nesting depth to 2 levels.
- **MI-002**: Safari 16.x has a bug where `position: sticky` inside a `display: grid` container can cause the element to "jump" during scroll. **Impact:** Layout stability. **Workaround:** Apply `overflow-anchor: auto` to the scroll container and explicitly set `top: 0` on sticky elements.
- **MI-003**: Safari's handling of `<input type="date">` remains inconsistent with other browsers; the date picker UI varies by OS version. **Impact:** Cosmetic. **Workaround:** Use custom date picker component (already planned for quiz creation UI).
- **MI-004**: Safari's content blocking (Intelligent Tracking Prevention) may block third-party scripts if loaded cross-origin. **Impact:** Analytics and external font loading. **Workaround:** Self-host all analytics scripts; use `rel="preconnect"` for third-party origins.

### 4.2 Chrome on macOS

**Status:** Tier 1 — Full support, identical to Chrome on Windows.

**Known Issues:**
- **MI-005**: Chrome on macOS uses macOS-native font rendering, which may differ subtly from Chrome on Windows. **Impact:** Cosmetic. **Workaround:** None needed.

### 4.3 Firefox on macOS

**Status:** Tier 1 — Full support.

**Known Issues:**
- **MI-006**: Firefox on macOS does not support `prefers-color-scheme: no-preference` (deprecated but still referenced in some contexts). **Impact:** None — the media query is deprecated. **Workaround:** N/A.

---

## 5. iOS

### 5.1 Safari on iOS (Last 2 Major Versions)

**Status:** Tier 1 — Full support with significant iOS-specific constraints.

| Feature | Support | Notes |
|---------|---------|-------|
| CSS Grid | Full | No known issues |
| CSS Container Queries | Full | Supported since iOS 16 |
| WebP | Full | Supported since iOS 14 |
| AVIF | Full | Supported since iOS 16 |
| Service Workers | Full | Supported since iOS 15.4 (PWA support) |
| Web Workers | Full | Dedicated Workers functional |
| IntersectionObserver | Full | No known issues |
| CSS `prefers-color-scheme` | Full | Dark mode toggle works correctly |
| `prefers-reduced-motion` | Full | Animations disable correctly |
| View Transitions API | Full | Supported since iOS 18 |
| 3D Molecular Viewer (WebGL) | Full | WebGL2 on iOS 15+; may hit memory limits on older devices |
| ES2022 features | Partial | Same limitations as macOS Safari |
| Touch events | Full | Touch-optimized molecular viewer controls |
| Virtual keyboard handling | Full | `visualViewport` API available |

**Known Issues:**
- **IO-001**: Safari on iOS blocks `<input type="file">` from triggering the file picker unless triggered directly by a user gesture (tap). **Impact:** Image upload for wiki pages. **Workaround:** Ensure file input is hidden and triggered by a visible button click handler.
- **IO-002**: iOS Safari's address bar auto-hides on scroll, causing viewport height changes. This can cause layout shifts if using `100vh`. **Impact:** CLS (Cumulative Layout Shift). **Workaround:** Use `100dvh` (dynamic viewport height) CSS unit. Fallback: use `window.visualViewport.height` JavaScript measurement.
- **IO-003**: iOS Safari does not support `navigator.clipboard.writeText()` without a user gesture. **Impact:** Copy-to-clipboard for citation export. **Workaround:** Wrap clipboard operations in a click handler; use `document.execCommand('copy')` as fallback for older iOS versions.
- **IO-004**: iOS Safari has a hard limit on the number of simultaneous WebSocket connections (6 per domain). **Impact:** Real-time wiki collaboration via Durable Objects. **Workaround:** Implement connection pooling; reuse connections for multiple subscriptions.
- **IO-005**: iOS Safari's zoom behavior on `<input type="text">` with `font-size < 16px` causes unexpected viewport scaling. **Impact:** Search input and form fields. **Workaround:** Set all text inputs to `font-size: 16px` minimum on mobile viewports.
- **IO-006**: iOS Safari does not support the `loading="lazy"` attribute on `<iframe>` elements. **Impact:** Embedded molecular viewer iframes. **Workaround:** Use IntersectionObserver for manual lazy loading of iframes.

### 5.2 Chrome on iOS

**Status:** Tier 1 — Full support. Chrome on iOS uses WebKit (Apple requirement).

**Known Issues:**
- **IO-007**: Chrome on iOS is a WebKit wrapper; all Safari-specific quirks apply identically. **Impact:** Same as Safari iOS. **Workaround:** Same as Safari iOS workarounds.

---

## 6. Android

### 6.1 Chrome on Android (Last 2 Major Versions)

**Status:** Tier 1 — Full support, primary mobile target.

| Feature | Support | Notes |
|---------|---------|-------|
| CSS Grid | Full | No known issues |
| CSS Container Queries | Full | Supported since Chrome 105 |
| WebP/AVIF | Full | Hardware-accelerated on most devices |
| Service Workers | Full | Full PWA support |
| Web Workers | Full | Dedicated and Service Workers |
| IntersectionObserver | Full | No known issues |
| CSS `prefers-color-scheme` | Full | Dark mode toggle works correctly |
| `prefers-reduced-motion` | Full | Animations disable correctly |
| View Transitions API | Full | Supported since Chrome 111 |
| 3D Molecular Viewer (WebGL) | Full | WebGL2 on most modern devices; WebGL1 fallback for older devices |
| ES2022 features | Full | V8 engine supports all target features |
| Touch events | Full | Touch-optimized controls |
| Virtual keyboard handling | Full | `virtualKeyboard` API available in Chrome 108+ |

**Known Issues:**
- **AN-001**: Chrome on low-end Android devices (< 4GB RAM) may aggressively kill background tabs, causing Service Worker termination. **Impact:** Offline functionality may be unreliable. **Workaround:** Implement cache-first strategy with minimal Service Worker footprint; test on low-memory devices.
- **AN-002**: Chrome on Android 10-12 may not support `navigator.share()` for the Web Share API on all devices. **Impact:** Share peptide page functionality. **Workaround:** Feature-detect `navigator.share` and fall back to clipboard copy.
- **AN-003**: Chrome on Android renders `<select>` elements as native dropdowns that vary by device manufacturer (Samsung, Pixel, OnePlus). **Impact:** Quiz answer selection styling. **Workaround:** Use custom dropdown components for consistent styling.

### 6.2 Samsung Internet Browser (Last 2 Major Versions)

**Status:** Tier 2 — Full support with documented workarounds.

| Feature | Support | Notes |
|---------|---------|-------|
| CSS Grid | Full | Chromium-based, full support |
| CSS Container Queries | Full | Supported since Samsung Internet 20 |
| WebP/AVIF | Full | Chromium-based |
| Service Workers | Full | Supported; may have aggressive background cleanup |
| Web Workers | Full | Dedicated Workers functional |
| IntersectionObserver | Full | No known issues |
| Dark mode | Full | Respects system preference |
| 3D Molecular Viewer (WebGL) | Full | WebGL2 supported |
| ES2022 features | Full | Chromium-based |

**Known Issues:**
- **AN-004**: Samsung Internet has a built-in content blocker (Samsung AdBlock) that may interfere with third-party scripts. **Impact:** Analytics, external resources. **Workaround:** Self-host all critical scripts; add self to Samsung Internet's whitelist documentation.
- **AN-005**: Samsung Internet's address bar occupies more vertical space than Chrome, reducing visible viewport height on mobile. **Impact:** Layout — content may shift when address bar shows/hides. **Workaround:** Use `100dvh` CSS unit; account for 48px address bar height in mobile layouts.
- **AN-006**: Samsung Internet's dark mode may invert images if the "Dark mode for web pages" setting is enabled. **Impact:** Molecular diagrams, structural images appear incorrectly. **Workaround:** Apply `color-scheme: dark` CSS to signal to the browser that dark mode is already handled; use `filter: invert(0)` on images that should not be inverted.

### 6.3 Firefox on Android (Last 2 Major Versions)

**Status:** Tier 2 — Full support.

| Feature | Support | Notes |
|---------|---------|-------|
| CSS Grid | Full | Gecko engine, full support |
| CSS Container Queries | Full | Supported since Firefox 110 |
| WebP/AVIF | Full | Supported since Firefox 93 |
| Service Workers | Full | Functional |
| Web Workers | Full | Dedicated Workers |
| IntersectionObserver | Full | No known issues |
| Dark mode | Full | Respects system preference |
| 3D Molecular Viewer (WebGL) | Full | WebGL2 supported |
| ES2022 features | Full | SpiderMonkey engine |

**Known Issues:**
- **AN-007**: Firefox on Android may not support `navigator.share()` Web Share API. **Impact:** Share functionality. **Workaround:** Feature detect and fall back to clipboard.
- **AN-008**: Firefox on Android uses more memory per tab than Chrome on Android. **Impact:** May cause tab killing on low-memory devices. **Workaround:** Minimize DOM size; keep total page weight under budget.

---

## 7. Linux

### 7.1 Chrome on Linux (Last 2 Major Versions)

**Status:** Tier 2 — Full support with font rendering differences.

| Feature | Support | Notes |
|---------|---------|-------|
| CSS Grid | Full | No known issues |
| CSS Container Queries | Full | Full support |
| WebP/AVIF | Full | Depends on system codec availability; WebP always works |
| Service Workers | Full | Supported |
| Web Workers | Full | Supported |
| IntersectionObserver | Full | No known issues |
| Dark mode | Full | Respects system preference (freedesktop) |
| 3D Molecular Viewer (WebGL) | Full | Depends on GPU driver; software fallback available |
| ES2022 features | Full | V8 engine |

**Known Issues:**
- **LI-001**: Linux font rendering differs significantly from Windows/macOS. Font smoothing (antialiasing) varies by distribution. **Impact:** Text may appear thinner or more jagged depending on the user's font configuration. **Workaround:** Use web-safe fallback fonts; test with common Linux font stacks (Noto Sans, DejaVu Sans).
- **LI-002**: AVIF support on Linux Chrome depends on system-level codec libraries (libavif). Not all Linux distributions ship with AVIF support. **Impact:** AVIF images may not display; WebP fallback used. **Workaround:** Always provide WebP fallback alongside AVIF sources in `<picture>` elements.
- **LI-003**: WebGL performance on Linux may be degraded with certain GPU drivers (e.g., older Mesa drivers on AMD GPUs). **Impact:** 3D molecular viewer may run at reduced frame rate. **Workaround:** Implement FPS monitoring; reduce molecular complexity on detected low-performance devices.

### 7.2 Firefox on Linux (Last 2 Major Versions)

**Status:** Tier 2 — Full support.

| Feature | Support | Notes |
|---------|---------|-------|
| CSS Grid | Full | No known issues |
| CSS Container Queries | Full | Full support |
| WebP/AVIF | Full | AVIF supported since Firefox 93 |
| Service Workers | Full | Supported |
| Web Workers | Full | Supported |
| IntersectionObserver | Full | No known issues |
| Dark mode | Full | Respects system preference |
| 3D Molecular Viewer (WebGL) | Full | WebGL2 supported |
| ES2022 features | Full | SpiderMonkey engine |

**Known Issues:**
- **LI-004**: Same font rendering differences as Chrome on Linux. **Impact:** Cosmetic. **Workaround:** Test with Noto Sans and DejaVu Sans fallback fonts.
- **LI-005**: Firefox on Linux has a known issue with `backdrop-filter` performance on older compositing window managers. **Impact:** May cause visual tearing on dropdown menus. **Workaround:** Use solid backgrounds instead of backdrop-filter where possible.

---

## 8. ChromeOS

### 8.1 Chrome on ChromeOS (Last 2 Major Versions)

**Status:** Tier 2 — Full support.

| Feature | Support | Notes |
|---------|---------|-------|
| CSS Grid | Full | Chromium-based |
| CSS Container Queries | Full | Full support |
| WebP/AVIF | Full | Hardware-accelerated on ARM devices; software on x86 |
| Service Workers | Full | Full PWA support |
| Web Workers | Full | Supported |
| IntersectionObserver | Full | No known issues |
| Dark mode | Full | Respects system preference |
| 3D Molecular Viewer (WebGL) | Full | Depends on device; WebGL2 on modern Chromebooks |
| ES2022 features | Full | V8 engine |

**Known Issues:**
- **CO-001**: ChromeOS devices with limited storage may cause Service Worker cache eviction. **Impact:** Offline content may not persist. **Workaround:** Keep cached content size minimal; implement cache quota monitoring.
- **CO-002**: Older Chromebooks (pre-2020) may have limited WebGL support, falling back to WebGL1. **Impact:** 3D molecular viewer may have reduced rendering quality. **Workaround:** Implement WebGL feature detection; provide 2D fallback diagram when WebGL2 unavailable.
- **CO-003**: ChromeOS tablet mode uses touch-optimized UI that may interfere with keyboard navigation for quizzes. **Impact:** Accessibility. **Workaround:** Ensure all interactive elements support both touch and keyboard input.

---

## 9. Feature Detection Strategy

### 9.1 JavaScript Feature Detection

```typescript
// Feature detection utilities
export const FeatureFlags = {
  // CSS support detection
  supportsContainerQueries: () => CSS.supports('container-type', 'inline-size'),
  supportsColorScheme: () => window.matchMedia('(prefers-color-scheme: dark)').media !== 'not all',
  supportsReducedMotion: () => window.matchMedia('(prefers-reduced-motion: reduce)').media !== 'not all',
  supportsViewTransitions: () => 'startViewTransition' in document,
  supportsBackdropFilter: () => CSS.supports('backdrop-filter', 'blur(1px)') || CSS.supports('-webkit-backdrop-filter', 'blur(1px)'),
  supports100Dvh: () => {
    const test = document.createElement('div');
    test.style.cssText = 'height: 100dvh; position: fixed; top: -9999px;';
    document.body.appendChild(test);
    const supported = test.offsetHeight > 0;
    document.body.removeChild(test);
    return supported;
  },

  // API support detection
  supportsClipboardWrite: () => 'clipboard' in navigator && 'writeText' in navigator.clipboard,
  supportsShare: () => 'share' in navigator,
  supportsWebGL2: () => {
    const canvas = document.createElement('canvas');
    return !!canvas.getContext('webgl2');
  },
  supportsWebP: () => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  },
  supportsAVIF: () => {
    const canvas = document.createElement('canvas');
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  },
  supportsAbortSignalTimeout: () => 'timeout' in AbortSignal.prototype,
  supportsDialogElement: () => 'HTMLDialogElement' in window,
  supportsDateInput: () => {
    const input = document.createElement('input');
    input.type = 'date';
    return input.type === 'date';
  },

  // Device capability detection
  isTouchDevice: () => 'ontouchstart' in window || navigator.maxTouchPoints > 0,
  isLowMemoryDevice: () => 'deviceMemory' in navigator && (navigator as any).deviceMemory < 4,
  isSlowNetwork: () => 'connection' in navigator && (navigator as any).connection?.effectiveType === 'slow-2g' || (navigator as any).connection?.effectiveType === '2g',
};
```

### 9.2 CSS Feature Detection

```css
/* Fallback for browsers without 100dvh support */
.hero {
  height: 100vh; /* Fallback */
  height: 100dvh; /* Dynamic viewport height */
}

/* Fallback for browsers without container queries */
@supports not (container-type: inline-size) {
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

/* Fallback for backdrop-filter */
@supports not (backdrop-filter: blur(1px)) {
  .modal-overlay {
    background-color: rgba(0, 0, 0, 0.85); /* Higher opacity fallback */
  }
}

/* Fallback for View Transitions */
@supports not (view-transition-name: main) {
  .page-transition {
    animation: fade-in 0.3s ease-in-out;
  }
}
```

### 9.3 Astro Component Feature Detection

```typescript
// Astro island with feature detection
import type { Component } from 'solid-js';

// Molecular viewer component with fallback
export const MolecularViewer: Component<{ pdbId: string }> = (props) => {
  const [webglAvailable, setWebglAvailable] = createSignal<boolean | null>(null);

  onMount(() => {
    setWebglAvailable(FeatureFlags.supportsWebGL2());
  });

  return (
    <Show
      when={webglAvailable()}
      fallback={<MolecularDiagram2D pdbId={props.pdbId} />}
    >
      <MolecularViewer3D pdbId={props.pdbId} />
    </Show>
  );
};
```

---

## 10. Polyfill and Fallback Matrix

### 10.1 Polyfill Requirements

| Feature | Polyfill Needed | Polyfill Strategy | Size Impact |
|---------|----------------|-------------------|-------------|
| `Array.prototype.at()` | No (ES2022 target) | Native in all target browsers | 0KB |
| `structuredClone()` | No | Supported since Chrome 98, Firefox 98, Safari 15.4 | 0KB |
| `AbortSignal.timeout()` | No | Supported since Chrome 103, Firefox 100, Safari 16.4 | 0KB |
| `URL.canParse()` | No | Supported since Chrome 119, Firefox 115, Safari 17 | 0KB |
| CSS `color-mix()` | No | Supported since Chrome 111, Firefox 113, Safari 16.2 | 0KB |
| CSS `text-wrap: balance` | No | Supported since Chrome 114, Firefox 115, Safari 17.5 | 0KB |
| CSS `@layer` | No | Supported since Chrome 99, Firefox 97, Safari 15.4 | 0KB |
| `navigator.clipboard` | Yes (partial) | Fallback to `document.execCommand('copy')` for older iOS | ~0.5KB |
| Web Share API | Yes (partial) | Fallback to clipboard copy | ~0.3KB |
| `<dialog>` element | Yes (partial) | Use custom modal for browsers without support | ~2KB |

### 10.2 CSS Fallback Strategy

| Modern CSS Feature | Fallback | Applied Automatically |
|-------------------|----------|----------------------|
| `container-type` | Grid layout | Yes, via `@supports` |
| `color-mix()` | Hardcoded color values | Yes, via `@supports` |
| `text-wrap: balance` | `text-wrap: wrap` | Yes, via `@supports` |
| `100dvh` | `100vh` | Yes, via `@supports` |
| `backdrop-filter` | Higher opacity background | Yes, via `@supports` |
| `view-transition-name` | CSS animation | Yes, via `@supports` |
| Subgrid | Fallback grid layout | Yes, via `@supports` |

### 10.3 JavaScript Fallback Strategy

| Modern JS Feature | Fallback | Applied Automatically |
|-------------------|----------|----------------------|
| `structuredClone()` | JSON parse/stringify | Yes, polyfill loaded conditionally |
| `AbortSignal.timeout()` | Manual setTimeout + AbortController | Yes, utility wrapper |
| `navigator.clipboard.writeText()` | `document.execCommand('copy')` | Yes, wrapper function |
| `navigator.share()` | Clipboard copy + alert | Yes, wrapper function |
| IntersectionObserver | Scroll event listener | No — minimum browser requirement enforced |
| Service Worker | No fallback | No — minimum browser requirement enforced |

---

## 11. Known Issues Registry

### 11.1 Active Issues

| ID | OS | Browser | Issue | Severity | Status | Workaround |
|----|----|---------|-------|----------|--------|------------|
| MI-001 | macOS | Safari | `backdrop-filter` performance with nested blurs | Medium | Open | Use `will-change: transform`; limit nesting |
| MI-002 | macOS | Safari | `position: sticky` jump in grid container | Medium | Open | Set `overflow-anchor: auto`; explicit `top: 0` |
| MI-003 | macOS | Safari | `<input type="date">` UI inconsistency | Low | Open | Use custom date picker component |
| MI-004 | macOS | Safari | ITP blocking third-party scripts | Medium | Open | Self-host analytics; use `preconnect` |
| IO-001 | iOS | Safari | File input requires direct user gesture | High | Open | Hidden input triggered by button click |
| IO-002 | iOS | Safari | Address bar auto-hide causes viewport shift | High | Open | Use `100dvh` CSS unit |
| IO-003 | iOS | Safari | Clipboard API requires user gesture | Medium | Open | Wrap in click handler; execCommand fallback |
| IO-004 | iOS | Safari | WebSocket connection limit (6/domain) | Medium | Open | Connection pooling for Durable Objects |
| IO-005 | iOS | Safari | Zoom on inputs with `font-size < 16px` | High | Open | Set minimum `font-size: 16px` on mobile inputs |
| IO-006 | iOS | Safari | `loading="lazy"` on iframes unsupported | Low | Open | IntersectionObserver manual lazy load |
| AN-001 | Android | Chrome | Background tab killing on low-RAM devices | Medium | Open | Minimal Service Worker footprint |
| AN-006 | Android | Samsung | Dark mode image inversion | Medium | Open | Apply `color-scheme: dark`; `filter: invert(0)` |
| LI-001 | Linux | Chrome/Firefox | Font rendering varies by distro | Low | Open | Use web-safe fallback font stack |
| LI-002 | Linux | Chrome | AVIF depends on system codecs | Low | Open | Provide WebP fallback in `<picture>` |
| LI-003 | Linux | Chrome | WebGL performance varies by GPU driver | Medium | Open | FPS monitoring; reduce molecular complexity |
| CO-001 | ChromeOS | Chrome | Cache eviction on limited storage | Low | Open | Keep cached content minimal |
| CO-002 | ChromeOS | Chrome | Older devices fall back to WebGL1 | Low | Open | WebGL feature detection; 2D fallback |

### 11.2 Resolved Issues

| ID | Resolution | Date Resolved |
|----|-----------|---------------|
| N/A | No issues resolved yet | N/A |

---

## 12. New Component OS Compatibility

### 12.1 Command Palette

| Feature | macOS | Windows | Linux | iOS | Android | Notes |
|---------|-------|---------|-------|-----|---------|-------|
| `Cmd+K` / `Ctrl+K` | Cmd+K | Ctrl+K | Ctrl+K | Limited (on-screen keyboard) | Limited (on-screen keyboard) | Physical keyboard required |
| `Escape` to close | Full | Full | Full | Full | Full | Universal |
| Arrow key navigation | Full | Full | Full | N/A (touch) | N/A (touch) | Touch: swipe or tap |
| Fuzzy search | Full | Full | Full | Full | Full | Fuse.js — JS-based |
| `<dialog>` modal | Full | Full | Full | Full | Full | All modern browsers |
| Focus trap | Full | Full | Full | Full | Full | Accessibility requirement |
| RTL mirror (Arabic) | Full | Full | Full | Full | Full | Logical CSS properties |

**OS-Specific Considerations:**
- **macOS:** Cmd as primary modifier; Cmd+K may conflict with Safari address bar focus
- **Windows:** Ctrl as primary modifier; Ctrl+K may conflict with Chrome omnibox
- **Linux:** Ctrl as primary modifier; may conflict with window manager shortcuts (e.g., KWin)
- **iOS/Android:** Command Palette accessible via button tap; keyboard shortcuts require external keyboard

### 12.2 Keyboard Shortcuts

| Feature | macOS | Windows | Linux | iOS | Android | Notes |
|---------|-------|---------|-------|-----|---------|-------|
| Modifier key detection | `metaKey` | `ctrlKey` | `ctrlKey` | N/A | N/A | OS detection via `navigator.platform` |
| Shortcut display labels | ⌘ ⌥ ⇧ | Ctrl Alt Shift | Ctrl Alt Shift | N/A | N/A | Platform-aware labels |
| `event.repeat` detection | Full | Full | Full | Full | Full | Prevents key repeat actions |
| `event.code` for physical keys | Full | Full | Full | N/A | N/A | Layout-independent detection |
| Conflict detection | Manual | Manual | Manual | N/A | N/A | Browser shortcuts documented |

**OS-Specific Considerations:**
- **macOS:** Cmd-based shortcuts; Option for alternate modifier; Cmd+Space reserved for Spotlight
- **Windows:** Ctrl-based shortcuts; Alt for menu access; Win key reserved for OS
- **Linux:** Ctrl-based shortcuts; may conflict with window manager (e.g., Alt+F4, Ctrl+Alt+T)
- **iOS/Android:** Shortcuts disabled without external keyboard; on-screen keyboard shortcuts limited

### 12.3 LaTeX Renderer

| Feature | macOS | Windows | Linux | iOS | Android | Notes |
|---------|-------|---------|-------|-----|---------|-------|
| KaTeX rendering | Full | Full | Full | Full | Full | JS-based rendering |
| Canvas 2D output | Full | Full | Full | Full | Full | Fallback renderer |
| WebGL 3D math | Full | Full | Depends on GPU driver | Full | Full | Hardware acceleration |
| Font rendering | SF Pro | Segoe UI | Noto Sans | SF Pro | Roboto | System font stack |
| MathML native | Full (Safari 16.4+) | Full | Full | Full (Safari 16.4+) | N/A | Not primary renderer |
| Touch zoom on equations | Full | Full | Full | Full | Full | Pinch-to-zoom |

**OS-Specific Considerations:**
- **macOS:** Metal backend for WebGL; Retina rendering; SF Pro font for math labels
- **Windows:** Direct3D/ANGLE backend; ClearType font rendering; Segoe UI for math labels
- **Linux:** Mesa/OpenGL backend; font rendering varies by distro; Noto Sans fallback
- **iOS:** Metal backend; Retina rendering; memory limits on older devices
- **Android:** OpenGL ES backend; varies by GPU vendor; font rendering varies

### 12.4 Graph View

| Feature | macOS | Windows | Linux | iOS | Android | Notes |
|---------|-------|---------|-------|-----|---------|-------|
| WebGL2 renderer | Full | Full | Full (15+) | Full (15+) | Full | Primary renderer |
| Canvas 2D fallback | Full | Full | Full | Full | Full | Fallback for no-WebGL |
| SVG fallback | Full | Full | Full | Full | Full | Final fallback |
| Force-directed layout | Full | Full | Full | Full | Full | JS-based computation |
| Touch pan/zoom | Full | Full | Full | Full | Full | Pointer events |
| Worker-based layout | Full | Full | Full | N/A (Safari) | N/A | SharedWorker not in Firefox |
| Node label rendering | Full | Full | Full | Full | Full | Canvas 2D text |

**OS-Specific Considerations:**
- **macOS:** Metal WebGL backend; efficient on Apple Silicon; Retina rendering
- **Windows:** ANGLE WebGL backend; hardware acceleration on most GPUs
- **Linux:** Mesa WebGL backend; may have reduced performance on older AMD GPUs; software fallback available
- **iOS:** Metal backend; memory limits (may crash on iPhone SE with large graphs); `OffscreenCanvas` not supported
- **Android:** OpenGL ES backend; varies by device; low-end devices may need reduced node count

### 12.5 Split Pane

| Feature | macOS | Windows | Linux | iOS | Android | Notes |
|---------|-------|---------|-------|-----|---------|-------|
| Pointer Events | Full | Full | Full | Full | Full | Unified mouse/touch |
| ResizeObserver | Full | Full | Full | Full | Full | Responsive sizing |
| `touch-action: none` | Full | Full | Full | Full | Full | Prevents scroll conflict |
| Container Queries | Full | Full | Full | Full | Full | Responsive breakpoints |
| Mouse drag resize | Full | Full | Full | N/A | N/A | Desktop only |
| Touch drag resize | Full | Full | Full | Full | Full | Touch handles |
| Snap-to-center | Full | Full | Full | Full | Full | JS-based detection |
| Keyboard resize (arrows) | Full | Full | Full | N/A | N/A | Accessibility |

**OS-Specific Considerations:**
- **macOS:** Smooth resize with hardware acceleration; may conflict with Mission Control gestures
- **Windows:** Smooth resize; may conflict with Aero Snap (window edge snapping)
- **Linux:** Resize may conflict with window manager tiling shortcuts
- **iOS:** Touch resize handle may conflict with system swipe gestures (back/forward); use `touch-action: none`
- **Android:** Touch resize handle; may conflict with system navigation gestures on gesture-based navigation

### 12.6 Regex Search

| Feature | macOS | Windows | Linux | iOS | Android | Notes |
|---------|-------|---------|-------|-----|---------|-------|
| `RegExp` with `u` flag | Full | Full | Full | Full | Full | Unicode mode |
| `RegExp` with `v` flag | Full (17+) | Full (113+) | Full (116+) | Full (17+) | Full (113+) | Unicode sets |
| Unicode property escapes | Full | Full | Full | Full | Full | `\p{L}`, `\p{Script=Han}` |
| `Intl.Segmenter` | Chrome only | Chrome only | Chrome only | Chrome only | Chrome only | CJK word segmentation |
| NFD normalization | Full | Full | Full | Full | Full | Diacritic-insensitive |
| Case-insensitive | Full | Full | Full | Full | Full | Unicode case folding |

**OS-Specific Considerations:**
- **macOS/Windows/Linux:** Full Unicode support; `Intl.Segmenter` only in Chromium browsers
- **iOS:** Full Unicode support; Safari may have different regex performance characteristics
- **Android:** Full Unicode support; performance varies by device

### 12.7 MDX Editor

| Feature | macOS | Windows | Linux | iOS | Android | Notes |
|---------|-------|---------|-------|-----|---------|-------|
| `contenteditable` | Full | Full | Full | Full | Full | Rich text editing |
| `beforeinput` event | Full | Full | Full | Full | Partial | Content change detection |
| IME composition | Full | Full | Full | Full | Full | CJK/Arabic input |
| `execCommand` | Full | Full | Full | Full | Partial | Formatting commands |
| Paste as markdown | Full | Full | Full | Full | Full | Clipboard API |
| Toolbar formatting | Full | Full | Full | Full | Full | Touch/click targets |
| Markdown shortcuts | Full | Full | Full | Full | Full | `# `, `- `, `> `, etc. |
| Split view (edit/preview) | Full | Full | Full | Full | Full | Side-by-side layout |

**OS-Specific Considerations:**
- **macOS:** Smooth IME for Japanese (Romaji → Kana → Kanji); Cmd-based formatting shortcuts
- **Windows:** Smooth IME for Chinese (Pinyin); Ctrl-based formatting shortcuts
- **Linux:** IME support varies by desktop environment (IBus, Fcitx); may need configuration
- **iOS:** Native iOS IME works well; virtual keyboard may obscure editor; use `visualViewport` API
- **Android:** Native Android IME works well; virtual keyboard handling similar to iOS

### 12.8 RTL Layout Support (Arabic)

| Component | RTL Support | Implementation | Known Issues |
|-----------|------------|----------------|--------------|
| Navigation sidebar | Full | Logical properties | None |
| Command Palette | Full | Logical CSS | Modal positioning |
| Keyboard Shortcuts | Partial | Text direction neutral | Shortcut labels always LTR |
| LaTeX Renderer | N/A | Math is direction-neutral | None |
| Graph View | Partial | Labels respect `dir` | Node positions are LTR |
| Split Pane | Full | Logical properties | Pane order mirrors |
| Regex Search | Full | Logical CSS | Search input aligns right |
| MDX Editor | Full | `dir="rtl"` on container | Toolbar mirrors |
| Toast notifications | Full | Logical positioning | Position switches to right |

**RTL-Specific Considerations:**
- **All platforms:** Use CSS logical properties (`margin-inline-start`, `padding-inline-end`, etc.) instead of physical properties
- **iOS/Android:** RTL layout works correctly on mobile; no platform-specific quirks
- **macOS/Windows/Linux:** RTL layout works correctly on desktop; font rendering for Arabic is consistent

---

## 13. Workaround Catalog

### 12.1 Viewport Height Workaround

```typescript
// Dynamic viewport height measurement
export function useViewportHeight(): () => number {
  const [height, setHeight] = createSignal(window.innerHeight);

  onMount(() => {
    const updateHeight = () => {
      if ('visualViewport' in window) {
        setHeight(window.visualViewport!.height);
      } else {
        setHeight(window.innerHeight);
      }
    };

    window.visualViewport?.addEventListener('resize', updateHeight);
    window.addEventListener('resize', updateHeight);
    onCleanup(() => {
      window.visualViewport?.removeEventListener('resize', updateHeight);
      window.removeEventListener('resize', updateHeight);
    });
  });

  return height;
}
```

### 12.2 Clipboard Workaround

```typescript
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to fallback
  }

  // Fallback: document.execCommand
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch {
    return false;
  }
}
```

### 12.3 Share API Workaround

```typescript
export async function shareContent(data: ShareData): Promise<boolean> {
  try {
    if (navigator.share) {
      await navigator.share(data);
      return true;
    }
  } catch {
    // Fall through to fallback
  }

  // Fallback: copy URL to clipboard
  if (data.url) {
    return copyToClipboard(data.url);
  }
  return false;
}
```

### 12.4 Image Inversion Prevention

```css
/* Prevent Samsung Internet dark mode from inverting images */
.molecular-diagram,
.structural-image,
.hero-image {
  color-scheme: light dark;
  filter: invert(0);
}

/* Ensure images maintain correct colors in dark mode */
@media (prefers-color-scheme: dark) {
  .molecular-diagram {
    filter: none; /* Override any global inversion */
  }
}
```

---

## 13. Testing Protocol

### 13.1 Testing Matrix

| Test Type | Frequency | Tools | Scope |
|-----------|-----------|-------|-------|
| Cross-browser visual regression | Every PR | Playwright (Chromium, Firefox, WebKit) | All key pages |
| Mobile device testing | Weekly | BrowserStack / Sauce Labs | iOS Safari, Android Chrome, Samsung Internet |
| Feature detection validation | Every PR | Custom test suite | All `FeatureFlags` checks |
| CSS fallback validation | Every PR | Visual regression | All `@supports` blocks |
| Accessibility (keyboard/screen reader) | Every PR | axe-core, manual | All interactive elements |

### 13.2 Device Lab

| Device | OS | Browser | Priority |
|--------|----|---------|----------|
| iPhone 14 | iOS 17 | Safari | Critical |
| iPhone 12 | iOS 16 | Safari | Critical |
| iPad Air (M1) | iPadOS 17 | Safari | High |
| Samsung Galaxy S23 | Android 14 | Chrome, Samsung Internet | Critical |
| Samsung Galaxy A14 | Android 13 | Chrome, Samsung Internet | High |
| Pixel 7 | Android 14 | Chrome | High |
| MacBook Pro 14" (M1) | macOS 14 | Safari, Chrome, Firefox | Critical |
| Dell XPS 15 | Windows 11 | Chrome, Firefox, Edge | Critical |
| Lenovo ThinkPad | Ubuntu 22.04 | Chrome, Firefox | Medium |
| Chromebook (Lenovo Duet) | ChromeOS | Chrome | Medium |

### 13.3 Automated Test Configuration

```typescript
// Playwright cross-browser test configuration
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    // Desktop browsers
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox-desktop', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit-desktop', use: { ...devices['Desktop Safari'] } },
    { name: 'edge-desktop', use: { ...devices['Desktop Edge'] } },

    // Mobile browsers
    { name: 'mobile-safari-ios17', use: { ...devices['iPhone 14'] } },
    { name: 'mobile-safari-ios16', use: { ...devices['iPhone 12'] } },
    { name: 'mobile-chrome-android', use: { ...devices['Pixel 7'] } },
    { name: 'mobile-samsung', use: { ...devices['Galaxy S23'] } },

    // Tablet
    { name: 'tablet-safari', use: { ...devices['iPad (gen 7)'] } },
  ],
});
```

---

## Cross-References

| Spec File | Relationship |
|-----------|-------------|
| `performance_requirements.md` | OS-specific performance baselines inform testing thresholds |
| `optimization_roadmap.md` | Cross-browser optimization strategies referenced in Phase 1-4 |
| `domain_constraints_web.toml` | Minimum browser versions and feature requirements derived from constraints |
| `testing_matrix.md` | Device/OS combinations feed into the full testing matrix |
| `compiler_compatibility.md` | Build targets must match OS/browser ES feature support |

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-06-07 | Platform Engineering Team | Initial release |
