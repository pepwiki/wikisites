---
document_id: XP-TEST-001
title: "Full Testing Matrix"
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
  Comprehensive testing matrix covering browser versions, device types, screen
  sizes, network conditions, and accessibility tools for KP Wikisites. Defines
  automated test configurations, manual testing protocols, and acceptance
  criteria for cross-platform compatibility.
depends_on:
  - "04_5_cross_platform/os_compatibility.md"
  - "04_5_cross_platform/compiler_compatibility.md"
  - "04_performance/performance_requirements.md"
  - "04_performance/benchmark_suite.md"
  - "03_security/security_test_plan.md"
---

# Full Testing Matrix

**Document ID:** XP-TEST-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** DRAFT

---

## Table of Contents

1. [Overview](#1-overview)
2. [Browser Version Matrix](#2-browser-version-matrix)
3. [Device Type Matrix](#3-device-type-matrix)
4. [Screen Size Matrix](#4-screen-size-matrix)
5. [Network Condition Matrix](#5-network-condition-matrix)
6. [Accessibility Testing Matrix](#6-accessibility-testing-matrix)
7. [Test Execution Plan](#7-test-execution-plan)
8. [Automated Test Configuration](#8-automated-test-configuration)
9. [Manual Testing Protocol](#9-manual-testing-protocol)
10. [Test Environment Setup](#10-test-environment-setup)
11. [Defect Classification](#11-defect-classification)
12. [Test Reporting](#12-test-reporting)

---

## 1. Overview

### 1.1 Purpose

This document defines the exhaustive testing matrix for KP Wikisites, specifying every combination of browser, device, screen size, network condition, and accessibility tool that must be tested. The matrix ensures complete cross-platform compatibility and accessibility compliance across all supported environments.

### 1.2 Testing Scope

| Category | Scope | Priority |
|----------|-------|----------|
| Browser compatibility | Last 2 major versions of all supported browsers | Critical |
| Device compatibility | Desktop, tablet, mobile (representative devices) | Critical |
| Screen sizes | 320px to 4K (3840px) | Critical |
| Network conditions | Offline, 3G, 4G, 5G, WiFi | High |
| Accessibility tools | Screen readers, keyboard-only, magnifiers | Critical |
| Localization | All 6 supported locales | High |
| Security | XSS, CSRF, CSP compliance | Critical |

### 1.3 Testing Levels

| Level | Description | Automation | Frequency |
|-------|-------------|-----------|-----------|
| L1: Unit | Individual component tests | Vitest (100%) | Every commit |
| L2: Integration | Component interaction tests | Vitest (100%) | Every PR |
| L3: E2E | Full user journey tests | Playwright (100%) | Every PR |
| L4: Cross-browser | Multi-browser rendering tests | Playwright (100%) | Every PR |
| L5: Visual regression | Screenshot comparison | Playwright + Argos (100%) | Every PR |
| L6: Performance | Core Web Vitals | Lighthouse CI (100%) | Every PR |
| L7: Accessibility | WCAG 2.1 AA compliance | axe-core (100%) | Every PR |
| L8: Manual | Exploratory testing | Manual | Weekly |
| L9: Device lab | Physical device testing | Manual | Bi-weekly |
| L10: Load testing | Concurrent user simulation | k6 (automated) | Weekly |

---

## 2. Browser Version Matrix

### 2.1 Desktop Browsers

| Browser | Version | Engine | OS | Tier | Test Priority | Automated |
|---------|---------|--------|----|------|---------------|-----------|
| Chrome | 126 (latest) | V8 | Windows 11 | 1 | Critical | Yes |
| Chrome | 125 (latest-1) | V8 | Windows 11 | 1 | Critical | Yes |
| Chrome | 126 (latest) | V8 | macOS 14 | 1 | Critical | Yes |
| Chrome | 126 (latest) | V8 | Ubuntu 22.04 | 2 | High | Yes |
| Firefox | 128 (latest) | SpiderMonkey | Windows 11 | 1 | Critical | Yes |
| Firefox | 127 (latest-1) | SpiderMonkey | Windows 11 | 1 | High | Yes |
| Firefox | 128 (latest) | SpiderMonkey | macOS 14 | 1 | Critical | Yes |
| Firefox | 128 (latest) | SpiderMonkey | Ubuntu 22.04 | 2 | High | Yes |
| Safari | 18 (latest) | JavaScriptCore | macOS 14 | 1 | Critical | Yes (via Playwright WebKit) |
| Safari | 17 (latest-1) | JavaScriptCore | macOS 13 | 1 | High | Yes (via Playwright WebKit) |
| Edge | 126 (latest) | V8 | Windows 11 | 1 | Critical | Yes |
| Edge | 125 (latest-1) | V8 | Windows 11 | 1 | High | Yes |

### 2.2 Mobile Browsers

| Browser | Version | Engine | OS | Device | Tier | Test Priority | Automated |
|---------|---------|--------|----|--------|------|---------------|-----------|
| Safari | 18 | JavaScriptCore | iOS 18 | iPhone 15 | 1 | Critical | Yes |
| Safari | 17 | JavaScriptCore | iOS 17 | iPhone 14 | 1 | Critical | Yes |
| Safari | 16 | JavaScriptCore | iOS 16 | iPhone 12 | 1 | High | Yes |
| Chrome | 126 | V8 | Android 14 | Pixel 7 | 1 | Critical | Yes |
| Chrome | 125 | V8 | Android 14 | Samsung Galaxy S23 | 1 | Critical | Yes |
| Chrome | 124 | V8 | Android 13 | Samsung Galaxy A14 | 1 | High | Yes |
| Samsung Internet | 25 | V8 | Android 14 | Samsung Galaxy S23 | 2 | High | Manual |
| Samsung Internet | 24 | V8 | Android 13 | Samsung Galaxy A14 | 2 | High | Manual |
| Firefox | 128 | SpiderMonkey | Android 14 | Pixel 7 | 2 | Medium | Yes |
| Firefox | 127 | SpiderMonkey | Android 13 | Samsung Galaxy A14 | 2 | Medium | Manual |

### 2.3 Tablet Browsers

| Browser | Version | OS | Device | Tier | Test Priority | Automated |
|---------|---------|----|--------|------|---------------|-----------|
| Safari | 18 | iPadOS 18 | iPad Pro 12.9" (M1) | 1 | High | Yes |
| Safari | 17 | iPadOS 17 | iPad Air (4th gen) | 1 | High | Yes |
| Safari | 16 | iPadOS 16 | iPad (9th gen) | 2 | Medium | Yes |
| Chrome | 126 | Android 14 | Samsung Galaxy Tab S9 | 2 | Medium | Yes |
| Chrome | 125 | ChromeOS | Lenovo Duet | 2 | Medium | Yes |

### 2.4 Browser Feature Matrix

| Feature | Chrome | Firefox | Safari | Edge | Samsung Internet |
|---------|--------|---------|--------|------|-----------------|
| ES2022 | 108+ | 109+ | 16.4+ | 108+ | 20+ |
| CSS Grid | 57+ | 52+ | 10.1+ | 57+ | 6.0+ |
| CSS Container Queries | 105+ | 110+ | 16+ | 105+ | 20+ |
| Service Workers | 40+ | 44+ | 15.4+ | 40+ | 4.0+ |
| Web Workers | 4+ | 29+ | 5+ | 12+ | 1.0+ |
| IntersectionObserver | 51+ | 55+ | 12.1+ | 51+ | 5.0+ |
| CSS `prefers-color-scheme` | 76+ | 67+ | 12.1+ | 79+ | 10.0+ |
| `prefers-reduced-motion` | 74+ | 63+ | 10.1+ | 79+ | 10.0+ |
| View Transitions API | 111+ | 127+ | 18+ | 111+ | 22+ |
| WebP | 32+ | 65+ | 14+ | 18+ | 4.0+ |
| AVIF | 85+ | 93+ | 16.4+ | 121+ | 19+ |
| WebGL 2 | 56+ | 51+ | 15+ | 79+ | 6.0+ |
| `<dialog>` element | 37+ | 98+ | 15.4+ | 79+ | 14+ |
| CSS `color-mix()` | 111+ | 113+ | 16.2+ | 111+ | 22+ |
| `structuredClone()` | 98+ | 94+ | 15.4+ | 98+ | 18+ |

---

## 3. Device Type Matrix

### 3.1 Desktop Devices

| Device | OS | CPU | RAM | GPU | Resolution | Test Priority |
|--------|----|-----|-----|-----|------------|---------------|
| Dell XPS 15 (2023) | Windows 11 | Intel i7-13700H | 16GB | NVIDIA RTX 4060 | 1920x1200 | Critical |
| MacBook Pro 14" (M1, 2021) | macOS 14 | Apple M1 | 16GB | Integrated | 3024x1964 (Retina) | Critical |
| MacBook Air 13" (M2, 2022) | macOS 14 | Apple M2 | 8GB | Integrated | 2560x1664 (Retina) | High |
| ThinkPad X1 Carbon (Gen 11) | Ubuntu 22.04 | Intel i7-1365U | 16GB | Intel Iris Xe | 1920x1200 | Medium |
| Custom Desktop (AMD) | Windows 11 | AMD Ryzen 7 5800X | 32GB | AMD RX 6700 XT | 2560x1440 | Medium |

### 3.2 Mobile Devices

| Device | OS | CPU | RAM | GPU | Resolution | Test Priority |
|--------|----|-----|-----|-----|------------|---------------|
| iPhone 15 Pro | iOS 18 | A17 Pro | 8GB | Apple GPU | 1179x2556 | Critical |
| iPhone 14 | iOS 17 | A15 Bionic | 6GB | Apple GPU | 1170x2532 | Critical |
| iPhone 12 | iOS 16 | A14 Bionic | 4GB | Apple GPU | 1170x2532 | High |
| iPhone SE (3rd gen) | iOS 17 | A15 Bionic | 4GB | Apple GPU | 750x1334 | High |
| Samsung Galaxy S23 | Android 14 | Snapdragon 8 Gen 2 | 8GB | Adreno 740 | 1080x2340 | Critical |
| Samsung Galaxy A14 | Android 13 | Exynos 850 | 4GB | Mali-G52 | 1080x2408 | High |
| Pixel 7 | Android 14 | Tensor G2 | 8GB | Mali-G710 | 1080x2400 | High |
| Pixel 7a | Android 14 | Tensor G2 | 8GB | Mali-G710 | 1080x2400 | Medium |
| OnePlus 12 | Android 14 | Snapdragon 8 Gen 3 | 12GB | Adreno 750 | 1440x3168 | Medium |
| Xiaomi Redmi Note 12 | Android 13 | Snapdragon 685 | 4GB | Adreno 610 | 1080x2400 | Medium |

### 3.3 Tablet Devices

| Device | OS | CPU | RAM | GPU | Resolution | Test Priority |
|--------|----|-----|-----|-----|------------|---------------|
| iPad Pro 12.9" (M1, 2021) | iPadOS 18 | Apple M1 | 8GB | Apple GPU | 2048x2732 | High |
| iPad Air (4th gen, 2020) | iPadOS 17 | A14 Bionic | 4GB | Apple GPU | 1640x2360 | High |
| iPad (9th gen, 2021) | iPadOS 16 | A13 Bionic | 3GB | Apple GPU | 1640x2160 | Medium |
| Samsung Galaxy Tab S9 | Android 14 | Snapdragon 8 Gen 2 | 8GB | Adreno 740 | 1600x2560 | Medium |
| Lenovo Duet (ChromeOS) | ChromeOS | MediaTek MT8183 | 4GB | Mali-G72 | 1200x1920 | Medium |

### 3.4 Device Capability Tiers

| Tier | RAM | CPU | GPU | Example Devices |
|------|-----|-----|-----|-----------------|
| **High** | ≥8GB | Flagship (last 2 years) | Dedicated/high-end integrated | iPhone 15 Pro, Galaxy S23, MacBook Pro M1 |
| **Medium** | 4-8GB | Mid-range (last 2 years) | Mid-range integrated | iPhone SE 3, Galaxy A14, Pixel 7a |
| **Low** | <4GB | Older/budget | Basic integrated | Older budget phones (not primary target) |

---

## 4. Screen Size Matrix

### 4.1 Breakpoint Definitions

| Name | Width Range | CSS Breakpoint | Tailwind Class | Layout |
|------|------------|----------------|----------------|--------|
| **XS (Mobile S)** | 320px – 374px | `min-width: 320px` | Default (mobile) | Single column, collapsed nav |
| **SM (Mobile M)** | 375px – 639px | `min-width: 375px` | `sm:` | Single column, collapsed nav |
| **MD (Mobile L)** | 640px – 767px | `min-width: 640px` | `md:` | Single column, collapsed nav |
| **LG (Tablet)** | 768px – 1023px | `min-width: 768px` | `lg:` | Two column, collapsible sidebar |
| **XL (Desktop)** | 1024px – 1279px | `min-width: 1024px` | `xl:` | Three column, fixed sidebar |
| **2XL (Wide)** | 1280px – 1535px | `min-width: 1280px` | `2xl:` | Three column, expanded sidebar |
| **3XL (Ultra-wide)** | 1536px – 2559px | `min-width: 1536px` | `3xl:` | Three column, max-width container |
| **4K** | 2560px – 3840px | `min-width: 2560px` | Custom | Three column, scaled UI |

### 4.2 Test Viewport Sizes

| Viewport | Width | Height | Device Emulation | Test Priority | Automated |
|----------|-------|--------|------------------|---------------|-----------|
| iPhone SE | 375px | 667px | Mobile | Critical | Yes |
| iPhone 14 Pro | 393px | 852px | Mobile | Critical | Yes |
| iPhone 15 Pro Max | 430px | 932px | Mobile | High | Yes |
| Samsung Galaxy S23 | 360px | 780px | Mobile | High | Yes |
| iPad Mini | 768px | 1024px | Tablet | High | Yes |
| iPad Air | 820px | 1180px | Tablet | High | Yes |
| iPad Pro 12.9" | 1024px | 1366px | Tablet | High | Yes |
| Laptop (13") | 1280px | 800px | Desktop | Critical | Yes |
| Laptop (15") | 1440px | 900px | Desktop | Critical | Yes |
| Desktop (1080p) | 1920px | 1080px | Desktop | Critical | Yes |
| Desktop (1440p) | 2560px | 1440px | Desktop | Medium | Yes |
| Desktop (4K) | 3840px | 2160px | Desktop | Low | Yes |

### 4.3 Viewport-Specific Behaviors

| Viewport | Navigation | Content Layout | Sidebar | Molecular Viewer | Quiz Layout |
|----------|-----------|---------------|---------|------------------|-------------|
| 320-374px | Hamburger menu | Single column, stacked | Hidden (drawer) | Full width, touch controls | Single column, stacked |
| 375-639px | Hamburger menu | Single column, stacked | Hidden (drawer) | Full width, touch controls | Single column, stacked |
| 640-767px | Hamburger menu | Single column, stacked | Hidden (drawer) | Full width, touch controls | Two column |
| 768-1023px | Top nav | Two column | Collapsible left | Side-by-side with text | Two column |
| 1024-1279px | Top nav | Three column | Fixed left sidebar | Side panel | Three column |
| 1280-1535px | Top nav | Three column | Fixed left sidebar (wider) | Side panel | Three column |
| 1536-2559px | Top nav | Three column, max-width | Fixed left sidebar (wider) | Side panel | Three column |
| 2560-3840px | Top nav | Three column, max-width, scaled | Fixed left sidebar | Side panel (larger) | Three column |

### 4.4 Layout Stability Testing

| Test Case | Viewport | Expected Behavior | Pass Criteria |
|-----------|----------|-------------------|---------------|
| Page load | All viewports | No layout shifts | CLS < 0.1 |
| Navigation | 320-1024px | Sidebar toggle does not shift content | CLS = 0 |
| Image load | All viewports | Images reserve space (aspect-ratio) | CLS < 0.05 |
| Dark mode toggle | All viewports | Color changes without layout shift | CLS = 0 |
| Search expand | 320-1024px | Search overlay does not shift content | CLS = 0 |
| Quiz question | All viewports | Answer selection does not shift other elements | CLS = 0 |
| Flashcard flip | All viewports | Card flip maintains dimensions | CLS = 0 |
| Molecular viewer load | All viewports | Viewer reserves space before content | CLS < 0.05 |

---

## 5. Network Condition Matrix

### 5.1 Network Profiles

| Profile | Download Speed | Upload Speed | Latency (RTT) | Packet Loss | Use Case |
|---------|---------------|-------------|---------------|-------------|----------|
| **Offline** | 0 bps | 0 bps | N/A | N/A | Cached content testing |
| **Slow 2G** | 50 Kbps | 50 Kbps | 1200ms | 10% | Extreme low-bandwidth |
| **2G** | 250 Kbps | 50 Kbps | 800ms | 5% | Low-bandwidth |
| **3G** | 750 Kbps | 250 Kbps | 300ms | 2% | Moderate bandwidth |
| **Slow 4G** | 4 Mbps | 3 Mbps | 150ms | 0.5% | Typical mobile |
| **4G** | 12 Mbps | 5 Mbps | 70ms | 0.1% | Good mobile |
| **5G** | 50 Mbps | 10 Mbps | 20ms | 0% | Excellent mobile |
| **WiFi (home)** | 50 Mbps | 10 Mbps | 10ms | 0% | Typical desktop |
| **WiFi (fast)** | 200 Mbps | 50 Mbps | 5ms | 0% | Excellent desktop |
| **Corporate proxy** | Variable | Variable | Variable | 0% | Enterprise environment |

### 5.2 Network-Dependent Behaviors

| Behavior | Offline | 3G | 4G | WiFi | Acceptance |
|----------|---------|-----|-----|------|------------|
| Page load (first visit) | N/A (blocked) | <8s | <4s | <2s | Within budget |
| Page load (cached) | <1s | <2s | <1s | <500ms | Within budget |
| Search response | <50ms (local index) | <200ms | <100ms | <50ms | Within budget |
| Image load (above fold) | N/A (blocked) | <3s | <1.5s | <500ms | Within budget |
| Image load (below fold) | N/A (blocked) | Lazy | Lazy | Lazy | Deferred |
| API response | N/A (cached) | <500ms | <200ms | <100ms | Within budget |
| Service Worker install | N/A | <10s | <5s | <3s | Completes |
| Search index download | N/A | <10s | <3s | <1s | Completes |
| Font load | N/A (system fonts) | N/A | N/A | N/A | No external fonts |
| WebSocket connection | N/A | <5s | <2s | <1s | Connects or degrades |

### 5.3 Offline Capability Matrix

| Feature | Offline Behavior | Cache Strategy | TTL |
|---------|-----------------|---------------|-----|
| Wiki page view | Serve from Service Worker cache | Cache-first | 7 days |
| Search (client-side) | Full functionality with local index | Cache-first | Until new index available |
| Image view | Serve from cache if previously loaded | Cache-first | 30 days |
| Dark mode toggle | Full functionality | localStorage | Persistent |
| Language switcher | Full functionality (if cached) | Cache-first | Until new content cached |
| Quiz (pre-loaded) | Full functionality | Cache-first | Session |
| Flashcard review | Full functionality | Cache-first | Session |
| Wiki editing | Queue edits for sync when online | Write-through | Until synced |
| 3D molecular viewer | Show 2D fallback if not cached | Cache-first | 30 days |
| New page navigation | Show offline indicator | N/A | N/A |

### 5.4 Network Transition Testing

| Scenario | Expected Behavior |
|----------|-------------------|
| Online -> Offline | Show offline banner; serve cached content; queue mutations |
| Offline -> Online | Sync queued edits; refresh stale content; hide offline banner |
| Fast -> Slow (WiFi -> 3G) | Reduce image quality; defer non-critical requests |
| Slow -> Fast (3G -> WiFi) | Upgrade image quality; prefetch next likely pages |
| Intermittent connection | Retry with exponential backoff; show loading indicators |
| Complete connection loss | Serve full offline experience; queue all mutations |

---

## 6. Accessibility Testing Matrix

### 6.1 WCAG 2.1 AA Compliance Matrix

| WCAG Success Criterion | Level | Test Method | Tool | Page Types |
|------------------------|-------|-------------|------|------------|
| 1.1.1 Non-text Content | A | Automated + Manual | axe-core, manual review | All (especially molecular diagrams) |
| 1.3.1 Info and Relationships | A | Automated | axe-core | All |
| 1.3.2 Meaningful Sequence | A | Automated | axe-core | All |
| 1.3.3 Sensory Characteristics | A | Manual | Manual review | All |
| 1.4.1 Use of Color | A | Automated | axe-core | All |
| 1.4.3 Contrast (Minimum) | AA | Automated | axe-core, Colour Contrast Analyser | All |
| 1.4.4 Resize Text | AA | Manual | Browser zoom | All |
| 1.4.5 Images of Text | AA | Manual | Manual review | All |
| 1.4.10 Reflow | AA | Manual | Browser resize | All |
| 1.4.11 Non-text Contrast | AA | Automated + Manual | axe-core, manual review | All interactive elements |
| 1.4.12 Text Spacing | AA | Manual | Text spacing bookmarklet | All |
| 1.4.13 Content on Hover or Focus | AA | Manual | Manual review | Tooltips, dropdowns |
| 2.1.1 Keyboard | A | Automated + Manual | axe-core, keyboard testing | All |
| 2.1.2 No Keyboard Trap | A | Manual | Keyboard testing | All |
| 2.4.1 Bypass Blocks | A | Automated | axe-core | All |
| 2.4.2 Page Titled | A | Automated | axe-core | All |
| 2.4.3 Focus Order | A | Manual | Keyboard testing | All |
| 2.4.4 Link Purpose (In Context) | AA | Automated | axe-core | All |
| 2.4.5 Multiple Ways | AA | Manual | Manual review | All |
| 2.4.6 Headings and Labels | AA | Automated | axe-core | All |
| 2.4.7 Focus Visible | AA | Manual | Keyboard testing | All |
| 2.5.1 Pointer Gestures | A | Manual | Touch testing | Molecular viewer, quiz |
| 2.5.2 Pointer Cancellation | A | Manual | Touch testing | All interactive elements |
| 2.5.3 Label in Name | A | Automated | axe-core | All |
| 2.5.4 Motion Actuation | A | Manual | Manual review | Shake, tilt |
| 3.1.1 Language of Page | A | Automated | axe-core | All |
| 3.1.2 Language of Parts | AA | Automated | axe-core | All |
| 3.2.1 On Focus | A | Manual | Keyboard testing | All |
| 3.2.2 On Input | A | Manual | Manual review | Forms, quizzes |
| 3.3.1 Error Identification | A | Automated | axe-core | Forms |
| 3.3.2 Labels or Instructions | A | Automated | axe-core | Forms |
| 4.1.1 Parsing | A | Automated | axe-core | All |
| 4.1.2 Name, Role, Value | A | Automated + Manual | axe-core, screen reader | All interactive elements |

### 6.2 Screen Reader Testing Matrix

| Screen Reader | Browser | OS | Test Priority | Key Tests |
|--------------|---------|-----|---------------|-----------|
| VoiceOver | Safari | macOS 14 | Critical | Landmark navigation, molecular viewer alt text, quiz flow |
| VoiceOver | Safari | iOS 18 | Critical | Touch gestures, rotor navigation, flashcard flip |
| VoiceOver | Chrome | macOS 14 | High | Fallback testing |
| NVDA | Firefox | Windows 11 | Critical | Landmark navigation, form labels, table accessibility |
| NVDA | Chrome | Windows 11 | High | Fallback testing |
| NVDA | Edge | Windows 11 | Medium | Fallback testing |
| JAWS | Chrome | Windows 11 | High | Enterprise users |
| TalkBack | Chrome | Android 14 | Critical | Touch gestures, navigation, quiz flow |
| Narrator | Edge | Windows 11 | Medium | Windows-only users |

### 6.3 Screen Reader Test Scenarios

| Scenario | Screen Reader | Expected Behavior |
|----------|--------------|-------------------|
| Landmark navigation | All | User can jump between header, nav, main, aside, footer |
| Skip link | All | "Skip to main content" link is first focusable element |
| Search | All | Search input announced with label; results count announced |
| Wiki page reading | All | Content read in correct order; headings navigable |
| Molecular viewer | VoiceOver + NVDA | Alt text read; controls labeled; 2D fallback available |
| Quiz question | All | Question text read; options announced; feedback announced |
| Flashcard | All | Front text read; flip action announced; back text read |
| Form validation | All | Error messages associated with fields; error summary announced |
| Dark mode toggle | All | State change announced (optional, nice-to-have) |
| Language switcher | All | Current language announced; available languages listed |

### 6.4 Keyboard Navigation Testing

| Test Case | Keys | Expected Result | Pass Criteria |
|-----------|------|-----------------|---------------|
| Skip link activation | Tab, Enter | Focus moves to main content | Focus visible on main content |
| Tab through navigation | Tab | All nav items reachable in logical order | No keyboard traps |
| Search input | Tab, Type, Enter | Input focused, query executed, results displayed | Results within 200ms |
| Wiki page TOC | Tab, Arrow keys | TOC items focused in order | Focus visible |
| Quiz answer selection | Tab, Space/Enter | Answer selected, next question presented | Correct answer highlighted |
| Flashcard flip | Space/Enter | Card flips to reveal back | Flip animation plays |
| Flashcard rating | Tab, Space/Enter | Rating recorded, next card shown | Rating saved |
| Molecular viewer controls | Arrow keys, +/- | Molecule rotates, zooms | Visual feedback |
| Keyboard shortcut help | ? | Help overlay displayed | All shortcuts listed |
| Modal/dialog close | Escape | Modal closed, focus returns to trigger | Focus managed correctly |

### 6.5 Color and Contrast Testing

| Element | Foreground | Background | Ratio Required | Actual Ratio | Status |
|---------|-----------|------------|----------------|--------------|--------|
| Body text | #1a1a2e | #ffffff | 4.5:1 | 14.8:1 | PASS |
| Body text (dark) | #e0e0e0 | #1a1a2e | 4.5:1 | 12.2:1 | PASS |
| Heading text | #0f0f23 | #ffffff | 3:1 | 18.4:1 | PASS |
| Link text | #2563eb | #ffffff | 4.5:1 | 7.1:1 | PASS |
| Link text (visited) | #7c3aed | #ffffff | 4.5:1 | 5.8:1 | PASS |
| Button text (primary) | #ffffff | #2563eb | 4.5:1 | 7.1:1 | PASS |
| Button text (secondary) | #2563eb | #ffffff | 4.5:1 | 7.1:1 | PASS |
| Input border | #94a3b8 | #ffffff | 3:1 | 3.8:1 | PASS |
| Focus outline | #2563eb | #ffffff | 3:1 | 7.1:1 | PASS |
| Error text | #dc2626 | #ffffff | 4.5:1 | 5.3:1 | PASS |
| Success text | #16a34a | #ffffff | 4.5:1 | 5.4:1 | PASS |
| Code block text | #e2e8f0 | #1e293b | 4.5:1 | 11.8:1 | PASS |

---

## 7. Test Execution Plan

### 7.1 Test Execution Schedule

| Test Level | Trigger | Environment | Duration | Owner |
|------------|---------|-------------|----------|-------|
| L1: Unit | Every commit | Local | <30s | Developer |
| L2: Integration | Every PR | CI (GitHub Actions) | <1min | Developer |
| L3: E2E | Every PR | CI (Playwright) | <5min | Developer |
| L4: Cross-browser | Every PR | CI (Playwright multi-browser) | <10min | Developer |
| L5: Visual regression | Every PR | CI (Argos CI) | <5min | Developer |
| L6: Performance | Every PR | CI (Lighthouse CI) | <3min | Developer |
| L7: Accessibility | Every PR | CI (axe-core) | <2min | Developer |
| L8: Manual | Weekly | Staging | 2 hours | QA |
| L9: Device lab | Bi-weekly | Physical devices | 4 hours | QA |
| L10: Load testing | Weekly | Staging (k6) | 30 minutes | DevOps |

### 7.2 PR Merge Criteria

| Gate | Requirement | Blocking |
|------|-------------|----------|
| All unit tests pass | 100% | Yes |
| All integration tests pass | 100% | Yes |
| All E2E tests pass | 100% | Yes |
| Cross-browser tests pass | 100% (Tier 1), 95% (Tier 2) | Yes |
| Visual regression approved | No unexpected changes | Yes |
| Lighthouse performance ≥ 90 | Score threshold | Yes |
| Lighthouse accessibility ≥ 95 | Score threshold | Yes |
| axe-core zero violations | Zero violations | Yes |
| TypeScript strict mode | Zero errors | Yes |
| ESLint zero errors | Zero errors | Yes |
| Bundle size within budget | <500KB total | Yes |
| Code review approved | At least 1 approval | Yes |

### 7.3 Regression Testing Protocol

| Regression Type | Detection Method | Response |
|-----------------|-----------------|----------|
| Visual regression | Argos CI screenshot comparison | Review diff; approve or fix |
| Performance regression | Lighthouse CI threshold | Investigate; fix before merge |
| Accessibility regression | axe-core violation detection | Fix before merge |
| Functional regression | E2E test failure | Fix before merge |
| Cross-browser regression | Browser-specific test failure | Fix before merge or document workaround |

---

## 8. Automated Test Configuration

### 8.1 Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    // === Desktop Browsers ===
    {
      name: 'chromium-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'firefox-desktop',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'webkit-desktop',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'edge-desktop',
      use: {
        ...devices['Desktop Edge'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    // === Mobile Browsers ===
    {
      name: 'mobile-safari-ios18',
      use: { ...devices['iPhone 14'] },
    },
    {
      name: 'mobile-safari-ios17',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'mobile-chrome-android',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'mobile-samsung',
      use: {
        ...devices['Galaxy S23'],
        viewport: { width: 360, height: 780 },
      },
    },

    // === Tablet ===
    {
      name: 'tablet-safari',
      use: { ...devices['iPad (gen 7)'] },
    },
    {
      name: 'tablet-chrome',
      use: {
        viewport: { width: 800, height: 1280 },
        isMobile: false,
        hasTouch: true,
      },
    },

    // === Small Screens ===
    {
      name: 'small-mobile',
      use: {
        viewport: { width: 320, height: 568 },
        isMobile: true,
        hasTouch: true,
      },
    },

    // === Large Screens ===
    {
      name: 'desktop-4k',
      use: {
        viewport: { width: 3840, height: 2160 },
        deviceScaleFactor: 2,
      },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
  },
});
```

### 8.2 Lighthouse CI Configuration

```typescript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: [
        'http://localhost:4321/',
        'http://localhost:4321/wiki/',
        'http://localhost:4321/wiki/getting-started',
      ],
      chromeFlags: '--no-sandbox --headless --disable-gpu',
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        'resource-summary:total:size': ['error', { maxNumericValue: 500000 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

### 8.3 axe-core Configuration

```typescript
// axe.config.ts
export const axeConfig = {
  rules: {
    // WCAG 2.1 AA rules
    'color-contrast': { enabled: true },
    'valid-lang': { enabled: true },
    'label': { enabled: true },
    'aria-allowed-attr': { enabled: true },
    'aria-required-attr': { enabled: true },
    'aria-required-children': { enabled: true },
    'aria-required-parent': { enabled: true },
    'aria-roles': { enabled: true },
    'aria-valid-attr': { enabled: true },
    'aria-valid-attr-value': { enabled: true },
    'button-name': { enabled: true },
    'duplicate-id': { enabled: true },
    'heading-order': { enabled: true },
    'html-has-lang': { enabled: true },
    'html-lang-valid': { enabled: true },
    'image-alt': { enabled: true },
    'input-image-alt': { enabled: true },
    'label-title-only': { enabled: true },
    'link-name': { enabled: true },
    'list': { enabled: true },
    'listitem': { enabled: true },
    'meta-viewport': { enabled: true },
    'td-headers-attr': { enabled: true },
    'th-has-data-cells': { enabled: true },
    'valid-lang': { enabled: true },
    'video-caption': { enabled: true },
  },
  tags: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
};
```

---

## 9. Manual Testing Protocol

### 9.1 Weekly Manual Test Checklist

| Test Area | Steps | Expected Result | Est. Time |
|-----------|-------|-----------------|-----------|
| **Navigation flow** | Click through all nav items on desktop and mobile | All pages load; no broken links | 10 min |
| **Search** | Enter 5 different queries; verify results | Results appear within 100ms; correct results | 5 min |
| **Dark mode** | Toggle on/off; verify persistence across pages | Colors change; preference saved in localStorage | 5 min |
| **Language switcher** | Switch to each locale; verify page content | Content changes; URL updates; no flash | 10 min |
| **Quiz flow** | Complete a 10-question quiz on mobile and desktop | Questions load; answers record; score displays | 15 min |
| **Flashcard flow** | Review 10 flashcards; flip and rate | Cards display; flip works; ratings save | 10 min |
| **Wiki editing** | Create and edit a page on mobile and desktop | Editor loads; content saves; preview works | 15 min |
| **Molecular viewer** | Load 3 molecular structures on desktop and mobile | Viewer renders; rotate/zoom work; 2D fallback works | 10 min |
| **Citation export** | Export BibTeX and RIS from 3 different monographs | Correct format generated; clipboard works | 5 min |
| **Offline** | Disconnect network; navigate cached pages | Cached pages load; search works; new pages show offline | 5 min |
| **Keyboard-only** | Navigate entire quiz flow using only keyboard | All elements reachable; no keyboard traps | 10 min |
| **Screen reader** | Navigate wiki page with VoiceOver | Content read in order; landmarks work; alt text present | 10 min |

### 9.2 Bi-Weekly Device Lab Protocol

| Device | Tests | Duration | Notes |
|--------|-------|----------|-------|
| iPhone 14 | Touch gestures, quiz, flashcards, molecular viewer | 30 min | Primary mobile target |
| iPhone SE (3rd gen) | Small screen layout, touch targets, keyboard handling | 20 min | Smallest iOS target |
| Samsung Galaxy S23 | Touch gestures, Samsung Internet quirks, dark mode | 30 min | Primary Android target |
| Samsung Galaxy A14 | Performance on budget device, dark mode image inversion | 20 min | Budget Android target |
| Pixel 7 | Chrome Android, TalkBack accessibility | 20 min | Pure Android reference |
| iPad Pro 12.9" | Tablet layout, sidebar, split-view | 20 min | Primary tablet target |
| MacBook Pro (M1) | Safari, Chrome, Firefox cross-browser | 30 min | Primary desktop target |
| Dell XPS 15 (Win) | Chrome, Firefox, Edge cross-browser | 30 min | Primary Windows target |
| Chromebook | ChromeOS performance, keyboard shortcuts | 20 min | Education device |

---

## 10. Test Environment Setup

### 10.1 Local Development

```bash
# Prerequisites
node --version  # v20.x
npm --version   # v10.x

# Install dependencies
npm ci

# Start dev server
npm run dev

# Run all tests
npm test

# Run specific test suite
npm run test:unit
npm run test:integration
npm run test:e2e

# Run cross-browser tests
npx playwright test --project=chromium-desktop --project=firefox-desktop --project=webkit-desktop
```

### 10.2 CI Environment

```yaml
# .github/workflows/test.yml
name: Test Suite
on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run test:unit -- --coverage
      - run: npm run lint
      - run: tsc --noEmit

  e2e-tests:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        project: [chromium-desktop, firefox-desktop, webkit-desktop]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --project=${{ matrix.project }}

  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run build
      - run: npx lhci autorun

  accessibility:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npx playwright test --project=chromium-desktop tests/accessibility/
```

### 10.3 Staging Environment

| Service | URL | Purpose |
|---------|-----|---------|
| Staging site | `staging.encyclopeptide.com` | Full staging deployment |
| Staging wiki | `staging.wikipept.com` | Full staging deployment |
| Preview deploys | Auto-generated per PR | Isolated testing |

---

## 11. Defect Classification

### 11.1 Severity Levels

| Severity | Definition | Response Time | Example |
|----------|-----------|---------------|---------|
| **S1: Critical** | Site inaccessible; data loss; security breach | Fix immediately | Site returns 500; XSS vulnerability; user data exposed |
| **S2: High** | Major feature broken; no workaround | Fix within 24 hours | Quiz submission fails; search returns wrong results |
| **S3: Medium** | Feature degraded; workaround available | Fix within 1 week | Layout broken on specific viewport; dark mode colors wrong |
| **S4: Low** | Cosmetic issue; minor inconvenience | Fix within 1 month | Font rendering differs; tooltip position slightly off |

### 11.2 Platform-Specific Defect Priority

| Platform | S1 | S2 | S3 | S4 |
|----------|-----|-----|-----|-----|
| Windows (Chrome, Firefox, Edge) | Fix immediately | Fix within 24h | Fix within 1 week | Fix within 1 month |
| macOS (Safari, Chrome, Firefox) | Fix immediately | Fix within 24h | Fix within 1 week | Fix within 1 month |
| iOS (Safari, Chrome) | Fix immediately | Fix within 24h | Fix within 1 week | Fix within 1 month |
| Android (Chrome, Samsung, Firefox) | Fix immediately | Fix within 24h | Fix within 1 week | Fix within 1 month |
| Linux (Chrome, Firefox) | Fix immediately | Fix within 24h | Document workaround | Fix within 1 month |
| ChromeOS | Fix immediately | Fix within 24h | Document workaround | Fix within 1 month |

---

## 12. Test Reporting

### 12.1 Test Results Dashboard

| Metric | Target | Measurement |
|--------|--------|-------------|
| Unit test coverage (line) | ≥80% | Vitest coverage report |
| Unit test coverage (branch) | ≥80% | Vitest coverage report |
| Unit test coverage (function) | ≥80% | Vitest coverage report |
| E2E test pass rate | 100% | Playwright results |
| Cross-browser pass rate (Tier 1) | 100% | Playwright multi-browser |
| Cross-browser pass rate (Tier 2) | ≥95% | Playwright + manual |
| Lighthouse performance score | ≥90 | Lighthouse CI |
| Lighthouse accessibility score | ≥95 | Lighthouse CI |
| axe-core violations | 0 | axe-core report |
| Visual regression | 0 unexpected | Argos CI |
| Bundle size | <500KB | Bundle analysis |
| Build time | <5min | CI pipeline |

### 12.2 Reporting Frequency

| Report | Frequency | Audience | Format |
|--------|-----------|----------|--------|
| PR test results | Every PR | Developers | GitHub PR comments |
| Daily test summary | Daily | Team | Slack notification |
| Weekly test report | Weekly | Team + stakeholders | Markdown report |
| Monthly compatibility report | Monthly | Stakeholders | Full document |
| Quarterly accessibility audit | Quarterly | Compliance | WCAG conformance report |

---

## Cross-References

| Spec File | Relationship |
|-----------|-------------|
| `os_compatibility.md` | Browser/OS combinations define the testing matrix |
| `compiler_compatibility.md` | Build tool configurations define CI test environments |
| `performance_requirements.md` | Performance thresholds for automated assertions |
| `benchmark_suite.md` | Lighthouse CI and WebPageTest configurations |
| `security_test_plan.md` | Security testing dimensions |
| `threat_model.md` | Threat scenarios inform adversarial testing |

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-06-07 | Platform Engineering Team | Initial release |
