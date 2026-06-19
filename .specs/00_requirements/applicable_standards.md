# Applicable Standards Mapping — Power-User Viewer

**Document ID:** STD-MAP-002
**Version:** 2.0.0
**Date:** 2026-06-19
**Status:** Active
**Scope:** encyclopeptide.com and wikipept.com — Power-User Viewer Upgrade

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Accessibility Standards](#2-accessibility-standards)
3. [Privacy Standards](#3-privacy-standards)
4. [Security Standards](#4-security-standards)
5. [Web Standards](#5-web-standards)
6. [Content Standards](#6-content-standards)
7. [Quality Standards](#7-quality-standards)
8. [Educational Standards](#8-educational-standards)
9. [Internationalization Standards](#9-internationalization-standards)
10. [Standards-to-Feature-Tier Matrix](#10-standards-to-feature-tier-matrix)
11. [Conflict Resolution](#11-conflict-resolution)

---

## 1. Executive Summary

This document maps all applicable standards to the Wikisites power-user viewer transformation. Each standard includes its ID, full name, applicable clauses, relevance to specific feature tiers (P0-P4), verification methods, and evidence locations. The mapping ensures the power-user viewer meets regulatory, accessibility, security, and quality requirements while maintaining the project's existing compliance posture.

---

## 2. Accessibility Standards

### 2.1 WCAG 2.1

| Field | Value |
|-------|-------|
| **Standard ID** | WCAG 2.1 |
| **Full Name** | Web Content Accessibility Guidelines 2.1 |
| **Domain** | Accessibility |
| **Conformance Target** | AA (baseline), AAA (selected criteria) |

**Applicable Clauses and Feature Tier Mapping:**

| WCAG Criterion | Clause | Power-User Viewer Applicability | Tier |
|----------------|--------|--------------------------------|------|
| 1.1.1 Non-text Content | SC 1.1.1 | Graph visualization text alternatives, command palette icon labels | P0 |
| 1.3.1 Info and Relationships | SC 1.3.1 | Multi-panel layout semantic structure, command palette listbox role | P0 |
| 1.3.2 Meaningful Sequence | SC 1.3.2 | Dense mode reading order, multi-panel tab order | P0 |
| 1.3.4 Orientation | SC 1.3.4 | Multi-panel layout must not lock orientation | P0 |
| 1.3.5 Identify Input Purpose | SC 1.3.5 | Command palette input autocomplete | P1 |
| 1.4.1 Use of Color | SC 1.4.1 | Graph edge differentiation, keyboard shortcut indicators | P0 |
| 1.4.3 Contrast (Minimum) | SC 1.4.3 | Dense mode text contrast (4.5:1 normal, 3:1 large) | P0 |
| 1.4.4 Resize Text | SC 1.4.4 | Multi-panel layout zoom to 200% | P0 |
| 1.4.5 Images of Text | SC 1.4.5 | No text-as-image in command palette | P1 |
| 1.4.10 Reflow | SC 1.4.10 | Multi-panel reflows to single column at 320px | P0 |
| 1.4.11 Non-text Contrast | SC 1.4.11 | Graph node borders, command palette focus ring | P1 |
| 1.4.12 Text Spacing | SC 1.4.12 | Dense mode respects text spacing overrides | P1 |
| 1.4.13 Content on Hover/Focus | SC 1.4.13 | Command palette tooltip/dismissable popups | P0 |
| 2.1.1 Keyboard | SC 2.1.1 | All power-user features keyboard accessible | P0 |
| 2.1.2 No Keyboard Trap | SC 2.1.2 | Command palette focus management, graph viz focus | P0 |
| 2.1.4 Character Key Shortcuts | SC 2.1.4 | Keyboard shortcuts remappable or disableable | P0 |
| 2.2.1 Timing Adjustable | SC 2.2.1 | No auto-advance in power-user viewer (quiz has own rules) | P1 |
| 2.3.1 Three Flashes | SC 2.3.1 | Graph animation, command palette open/close | P1 |
| 2.4.1 Bypass Blocks | SC 2.4.1 | Skip-to-content, command palette as bypass mechanism | P0 |
| 2.4.2 Page Titled | SC 2.4.2 | Multi-panel page titles | P0 |
| 2.4.3 Focus Order | SC 2.4.3 | Multi-panel focus order, command palette focus | P0 |
| 2.4.5 Multiple Ways | SC 2.4.5 | Search + command palette + navigation = multiple ways | P0 |
| 2.4.6 Headings and Labels | SC 2.4.6 | Multi-panel section headings, command palette labels | P0 |
| 2.4.7 Focus Visible | SC 2.4.7 | Command palette focus indicator, graph node focus | P0 |
| 3.1.1 Language of Page | SC 3.1.1 | `lang` attribute per locale | P0 |
| 3.1.2 Language of Parts | SC 3.1.2 | Mixed-language peptide names in articles | P1 |
| 3.2.1 On Focus | SC 3.2.1 | No unexpected context change on command palette focus | P0 |
| 3.2.2 On Input | SC 3.2.2 | Command palette search filters results, no page change | P0 |
| 3.2.3 Consistent Navigation | SC 3.2.3 | Navigation consistent across multi-panel layouts | P1 |
| 3.3.1 Error Identification | SC 3.3.1 | Command palette "no results" messaging | P1 |
| 4.1.2 Name, Role, Value | SC 4.1.2 | Command palette ARIA roles, graph node semantics | P0 |
| 4.1.3 Status Messages | SC 4.1.3 | Command palette result count, graph load status | P0 |

**AAA Targets for Power-User Viewer:**

| WCAG Criterion | Clause | Rationale |
|----------------|--------|-----------|
| 1.4.6 Contrast (Enhanced) | SC 1.4.6 | Dense mode needs 7:1 contrast for extended reading |
| 2.4.9 Link Purpose (Link Only) | SC 2.4.9 | Graph edge labels must be self-explanatory |
| 2.4.10 Section Headings | SC 2.4.10 | Multi-panel sections must be clearly headed |
| 1.4.8 Visual Presentation | SC 1.4.8 | Dense mode line height, paragraph spacing control |

### 2.2 Section 508

| Field | Value |
|-------|-------|
| **Standard ID** | Section 508 (29 U.S.C. § 508) |
| **Full Name** | Rehabilitation Act Section 508 |
| **Domain** | Accessibility (US Federal) |

**Applicable Clauses:**

| Clause | Requirement | Power-User Viewer Applicability |
|--------|-------------|--------------------------------|
| §1194.22(a) | Text equivalents for non-text content | Graph visualization alt text |
| §1194.22(b) | Multimedia alternatives | No multimedia in power-user viewer |
| §1194.22(d) | Readable without stylesheets | Multi-panel layout degrades gracefully |
| §1194.22(g) | Row/column headers in data tables | Peptide comparison tables in dense mode |
| §1194.22(h) | Data table association | Table headers in multi-panel view |
| §1194.22(i) | Frames usable without assistive tech | Multi-panel iframes (if used) |
| §1194.22(j) | Applets/scripting alternatives | Command palette fallback |
| §1194.22(k) | Input field labels | Command palette input label |
| §1194.22(l) | Form field navigation | Keyboard navigation through forms |
| §1194.22(m) | No timing required | No auto-advance in viewer |
| §1194.22(n) | No blinking content | Graph animations respect `prefers-reduced-motion` |
| §1194.22(o) | No seizure-inducing content | Graph animations limited to safe frequencies |
| §1194.22(p) | Keyboard operable | Full keyboard accessibility |
| §1194.22(q) | No interference with AT | Command palette doesn't interfere with screen readers |
| §1194.22(r) | Focus visible | Clear focus indicators on all interactive elements |
| §1194.22(s) | Page skip mechanism | Command palette serves as skip mechanism |
| §1194.22(t) | Time limits adjustable | No time limits in viewer |
| §1194.22(u) | Searchable text | All content is text-searchable |
| §1194.22(v) | Navigation bar/frame usage | Consistent navigation across panels |

### 2.3 ARIA 1.2

| Field | Value |
|-------|-------|
| **Standard ID** | WAI-ARIA 1.2 |
| **Full Name** | Accessible Rich Internet Applications 1.2 |
| **Domain** | Accessibility (RIA) |

**Applicable Roles for Power-User Viewer:**

| Component | Required Role | Properties | States |
|-----------|--------------|------------|--------|
| Command palette | `role="combobox"` | `aria-expanded`, `aria-controls`, `aria-autocomplete` | `aria-activedescendant` |
| Command palette results | `role="listbox"` | `aria-label` | — |
| Command palette item | `role="option"` | `aria-label` | `aria-selected` |
| Multi-panel container | `role="tablist"` | `aria-label` | — |
| Multi-panel tab | `role="tab"` | `aria-controls` | `aria-selected` |
| Multi-panel panel | `role="tabpanel"` | `aria-labelledby` | — |
| Graph node | `role="button"` or custom | `aria-label`, `aria-describedby` | `aria-pressed` |
| Graph edge | `role="img"` or `role="presentation"` | `aria-label` | — |
| Keyboard shortcut overlay | `role="dialog"` | `aria-label` | `aria-modal` |
| Dense mode toggle | `role="switch"` | `aria-label` | `aria-checked` |
| Progress bar | `role="progressbar"` | `aria-valuenow`, `aria-valuemin`, `aria-valuemax` | `aria-valuetext` |
| Search input | `role="searchbox"` | `aria-label`, `aria-autocomplete` | — |
| Breadcrumb | `role="navigation"` | `aria-label="Breadcrumb"` | — |

---

## 3. Privacy Standards

### 3.1 GDPR

| Field | Value |
|-------|-------|
| **Standard ID** | Regulation (EU) 2016/679 |
| **Full Name** | General Data Protection Regulation |
| **Domain** | Privacy (EU) |

**Applicable Articles and Feature Tier Mapping:**

| Article | Requirement | Power-User Viewer Applicability | Tier |
|---------|-------------|--------------------------------|------|
| Art. 5(1)(a) | Lawfulness, fairness, transparency | Cookie consent covers analytics; power-user preferences must be disclosed | P0 |
| Art. 5(1)(b) | Purpose limitation | localStorage data used only for stated purposes | P0 |
| Art. 5(1)(c) | Data minimization | Collect only needed user preferences | P1 |
| Art. 5(1)(d) | Accuracy | User profile data must be current | P1 |
| Art. 5(1)(e) | Storage limitation | FSRS progress data retention policy | P2 |
| Art. 5(1)(f) | Integrity and confidentiality | CSRF protection on annotation endpoints | P0 |
| Art. 6(1)(a) | Consent for processing | Opt-in for cloud sync of preferences | P1 |
| Art. 6(1)(f) | Legitimate interests | Analytics for product improvement | P1 |
| Art. 12 | Transparent information | Privacy policy covers power-user features | P0 |
| Art. 13 | Information to be provided | Disclose data collected by power-user viewer | P0 |
| Art. 15 | Right of access | User can export their data (FSRS, preferences) | P2 |
| Art. 17 | Right to erasure | Delete user data on request | P2 |
| Art. 20 | Right to data portability | Export user data as JSON | P2 |
| Art. 21 | Right to object | Opt-out of analytics | P0 |
| Art. 22 | Automated decision-making | No automated decisions in power-user viewer | N/A |
| Art. 25 | Data protection by design | Privacy-first architecture, local-first storage | P0 |
| Art. 32 | Security of processing | CSRF, XSS, input sanitization | P0 |
| Art. 33 | Breach notification | Incident response runbook | P1 |
| Art. 35 | DPIA | Required if processing scales significantly | P3 |

### 3.2 CCPA

| Field | Value |
|-------|-------|
| **Standard ID** | California Consumer Privacy Act |
| **Full Name** | California Civil Code §§ 1798.100–1798.199 |
| **Domain** | Privacy (California) |

**Applicable Sections:**

| Section | Requirement | Power-User Viewer Applicability | Tier |
|---------|-------------|--------------------------------|------|
| §1798.100 | Right to know | Disclose data collection in privacy policy | P0 |
| §1798.105 | Right to delete | Delete user data on request | P2 |
| §1798.110 | Right to access | Provide data export | P2 |
| §1798.120 | Right to opt-out | Do Not Sell My Personal Information link | P1 |
| §1798.125 | Non-discrimination | No degraded service for privacy choices | P0 |
| §1798.130 | Notice at collection | Disclose at point of data collection | P0 |
| §1798.135 | Opt-out link | "Do Not Sell" link in footer | P1 |

---

## 4. Security Standards

### 4.1 OWASP Top 10 (2021)

| Field | Value |
|-------|-------|
| **Standard ID** | OWASP Top 10:2021 |
| **Full Name** | OWASP Top Ten Web Application Security Risks |
| **Domain** | Security |

**Applicable Risks and Feature Tier Mapping:**

| OWASP ID | Risk | Power-User Viewer Applicability | Tier | Existing Controls |
|----------|------|--------------------------------|------|-------------------|
| A01:2021 | Broken Access Control | Annotation endpoints, user preference sync | P0 | CSRF tokens, role-based access |
| A02:2021 | Cryptographic Failures | JWT session tokens, HTTPS enforcement | P0 | HSTS, TLS 1.3 |
| A03:2021 | Injection | Command palette input (XSS), SQL injection (D1) | P0 | Input sanitization, parameterized queries |
| A04:2021 | Insecure Design | Multi-panel architecture, graph data flow | P1 | Threat modeling |
| A05:2021 | Security Misconfiguration | CSP headers, CORS policy | P0 | CSP, HSTS, rate limiting |
| A06:2021 | Vulnerable Components | npm dependency chain | P1 | Dependency scanning in CI |
| A07:2021 | Auth Failures | User authentication for annotations | P0 | Cloudflare Access, JWT |
| A08:2021 | Data Integrity Failures | Offline data sync, service worker updates | P1 | Subresource integrity |
| A09:2021 | Logging Failures | Error tracking, security event logging | P1 | Sentry integration |
| A10:2021 | SSRF | External API calls (UniProt, RCSB PDB) | P2 | URL validation, allowlisting |

### 4.2 NIST SP 800-53 Rev. 5

| Field | Value |
|-------|-------|
| **Standard ID** | NIST SP 800-53 Rev. 5 |
| **Full Name** | Security and Privacy Controls for Information Systems and Organizations |
| **Domain** | Security Controls |

**Applicable Control Families:**

| Family | Controls | Power-User Viewer Applicability | Tier |
|--------|----------|--------------------------------|------|
| AC (Access Control) | AC-1, AC-2, AC-3, AC-6, AC-7 | User authentication, role-based access, session management | P0 |
| AU (Audit and Accountability) | AU-2, AU-3, AU-6, AU-12 | Security event logging, audit trails | P1 |
| CA (Assessment) | CA-2, CA-7 | Security assessment, continuous monitoring | P2 |
| CM (Configuration Management) | CM-2, CM-3, CM-6, CM-7 | Baseline configuration, change control | P0 |
| CP (Contingency Planning) | CP-9, CP-10 | Backup, disaster recovery | P1 |
| IA (Identification and Authentication) | IA-2, IA-5, IA-8 | Multi-factor auth, credential management | P1 |
| IR (Incident Response) | IR-4, IR-5, IR-6 | Incident handling, monitoring, reporting | P2 |
| RA (Risk Assessment) | RA-3, RA-5 | Risk analysis, vulnerability scanning | P1 |
| SC (System and Communications Protection) | SC-7, SC-8, SC-13, SC-28 | Boundary protection, encryption, data protection | P0 |
| SI (System and Information Integrity) | SI-2, SI-3, SI-4, SI-10 | Flaw remediation, malware protection, monitoring, input validation | P0 |

### 4.3 CSP Level 3

| Field | Value |
|-------|-------|
| **Standard ID** | Content Security Policy Level 3 |
| **Full Name** | W3C Candidate Recommendation |
| **Domain** | Security (Browser) |

**Applicable Directives:**

| Directive | Value | Power-User Viewer Impact |
|-----------|-------|-------------------------|
| `default-src` | `'self'` | Baseline |
| `script-src` | `'self'` | Command palette scripts must be inline or from origin |
| `style-src` | `'self' 'unsafe-inline'` | Tailwind CSS inline styles |
| `img-src` | `'self' data: https:` | Graph node images, molecular structures |
| `font-src` | `'self'` | Custom fonts |
| `connect-src` | `'self' https://api.cloudflare.com` | KV/D1 API calls |
| `worker-src` | `'self'` | Service worker |
| `frame-ancestors` | `'none'` | Prevent clickjacking |
| `base-uri` | `'self'` | Prevent base tag injection |
| `form-action` | `'self'` | Prevent form hijacking |

---

## 5. Web Standards

### 5.1 HTML Living Standard

| Clause | Power-User Viewer Applicability | Tier |
|--------|--------------------------------|------|
| Semantic elements (nav, main, aside, section, article) | Multi-panel layout structure | P0 |
| `<dialog>` element | Command palette, shortcut overlay | P0 |
| `<template>` element | Graph node templates | P1 |
| `<details>` / `<summary>` | Collapsible graph legends | P2 |
| `contenteditable` | Inline editing (contributor mode) | P2 |
| `datalist` | Command palette autocomplete | P0 |
| Microdata (itemscope, itemtype) | Schema.org structured data | P1 |

### 5.2 CSS Custom Properties

| Property | Power-User Viewer Applicability | Tier |
|----------|--------------------------------|------|
| CSS variables for theming | Dense mode, graph colors, panel colors | P0 |
| `@property` for registered custom properties | Animated graph edges | P2 |
| Container queries | Responsive multi-panel layout | P1 |
| `color-scheme` | Dark mode preference detection | P0 |
| `prefers-reduced-motion` | Graph animation respect | P0 |
| `prefers-color-scheme` | Theme auto-detection | P0 |
| `prefers-contrast` | Dense mode auto-activation | P1 |

### 5.3 ECMAScript 2024

| Feature | Power-User Viewer Applicability | Tier |
|---------|--------------------------------|------|
| `Array.prototype.groupBy` | Grouping search results by category | P1 |
| `Object.groupBy` | Grouping graph nodes by type | P1 |
| `Promise.withResolvers` | Async graph loading | P2 |
| Decorators (Stage 3) | Component metadata (if supported) | P3 |
| `Set` methods (union, intersection) | Graph traversal operations | P2 |
| `structuredClone` | Deep-copying panel state | P1 |
| `Temporal` API | Date formatting in progress dashboard | P2 |

### 5.4 URL Standard

| Feature | Power-User Viewer Applicability | Tier |
|---------|--------------------------------|------|
| URL parsing | Multi-panel route parameters | P0 |
| History API | Panel state in URL hash/query | P0 |
| `pushState` / `replaceState` | Command palette navigation | P0 |
| URL pattern matching | Route-based panel configuration | P1 |

---

## 6. Content Standards

### 6.1 Dublin Core

| Element | Power-User Viewer Applicability | Tier |
|---------|--------------------------------|------|
| `dc:title` | Article titles in command palette results | P0 |
| `dc:creator` | Author attribution in multi-panel view | P1 |
| `dc:subject` | Graph node categorization, search facets | P0 |
| `dc:description` | Search result snippets | P0 |
| `dc:publisher` | Site attribution | P1 |
| `dc:date` | Last modified date in dense mode | P1 |
| `dc:type` | Article type filtering (monograph, study guide, quiz) | P0 |
| `dc:format` | Content format metadata | P2 |
| `dc:identifier` | DOI/PMID cross-references | P1 |
| `dc:language` | Locale-specific content | P0 |
| `dc:relation` | Cross-reference graph edges | P0 |
| `dc:coverage` | Topic coverage metadata | P2 |
| `dc:rights` | Licensing information | P1 |

### 6.2 Schema.org

| Type | Power-User Viewer Applicability | Tier |
|------|--------------------------------|------|
| `Article` | Structured article data for search | P0 |
| `Course` | Learn lesson structured data | P1 |
| `Quiz` | Quiz structured data | P1 |
| `FlashCard` | Flashcard structured data | P2 |
| `BreadcrumbList` | Multi-panel navigation breadcrumbs | P0 |
| `SearchAction` | Search box structured data | P1 |
| `Dataset` | Peptide database structured data | P2 |
| `DefinedTerm` | Glossary structured data | P1 |
| `HowTo` | Study guide structured data | P2 |
| `WebPageElement` | Panel, tab, command palette structured data | P1 |

### 6.3 IMS Common Cartridge

| Element | Power-User Viewer Applicability | Tier |
|---------|--------------------------------|------|
| `imsccv1p1/1.0` | Export quizzes as Common Cartridge | P3 |
| `organization` | Course structure mapping | P3 |
| `item` | Content item mapping | P3 |
| `resource` | Resource file mapping | P3 |

### 6.4 LTI (Learning Tools Interoperability)

| Element | Power-User Viewer Applicability | Tier |
|---------|--------------------------------|------|
| LTI 1.3 Advantage | Embed Wikipept in LMS (Canvas, Moodle) | P3 |
| Names and Roles Provisioning | Student roster sync | P3 |
| Assignment and Grade Services | Quiz score passback | P3 |
| Deep Linking | Link specific articles in LMS | P3 |

---

## 7. Quality Standards

### 7.1 ISO/IEC 25010:2011

| Characteristic | Subcharacteristic | Power-User Viewer Applicability | Tier |
|---------------|-------------------|--------------------------------|------|
| Functional Suitability | Functional completeness | All power-user features implemented | P0 |
| | Functional correctness | Command palette returns correct results | P0 |
| | Functional appropriateness | Features match user needs | P1 |
| Performance Efficiency | Time behaviour | TTFB < 100ms, command palette < 100ms | P0 |
| | Resource utilization | JS < 50KB gzipped per page | P0 |
| | Capacity | Support 10K+ articles in search | P1 |
| Compatibility | Co-existence | Works alongside existing features | P0 |
| | Interoperability | Integrates with Astro, SolidJS, Cloudflare | P0 |
| Usability | Appropriateness recognisability | Users understand power-user features | P1 |
| | Learnability | Progressive disclosure, onboarding | P1 |
| | Operability | Keyboard-first, command palette | P0 |
| | User error prevention | Confirmation for destructive actions | P1 |
| | User interface aesthetics | Dense mode is visually clean | P1 |
| | Accessibility | WCAG 2.1 AA+ compliance | P0 |
| Reliability | Maturity | No crashes in power-user viewer | P0 |
| | Availability | Offline support via PWA | P1 |
| | Fault tolerance | Graceful degradation if graph fails | P0 |
| | Recoverability | Session state restoration | P1 |
| Security | Confidentiality | User data encrypted in transit/at rest | P0 |
| | Integrity | CSRF protection, input sanitization | P0 |
| | Non-repudiation | Audit trail for content edits | P2 |
| | Accountability | User authentication for annotations | P0 |
| | Authenticity | Verified contributor badges | P2 |
| Maintainability | Modularity | Command palette as separate component | P0 |
| | Reusability | Shared component library | P1 |
| | Analysability | TypeScript types, structured logging | P0 |
| | Modifiability | Tailwind CSS tokens, CSS variables | P0 |
| | Testability | 80%+ test coverage for new components | P0 |
| Portability | Adaptability | Responsive multi-panel layout | P0 |
| | Installability | PWA installability | P1 |
| | Replaceability | Cloudflare vendor-neutral code | P2 |

### 7.2 ISO/IEC 25012

| Characteristic | Subcharacteristic | Power-User Viewer Applicability | Tier |
|---------------|-------------------|--------------------------------|------|
| Accuracy | Accuracy | Correct peptide data in graph | P0 |
| Completeness | Completeness | All cross-references populated | P1 |
| Consistency | Consistency | Data consistent across panels | P0 |
| Credibility | Credibility | Expert-verified content markers | P1 |
| Currentness | Currentness | Last-modified timestamps | P1 |
| Accessibility | Accessibility | All data accessible to AT | P0 |
| Compliance | Compliance | GDPR data handling | P0 |
| Confidentiality | Confidentiality | User data access control | P0 |
| Efficiency | Efficiency | Fast data loading | P0 |
| Precision | Precision | Exact values in dense mode | P1 |
| Traceability | Traceability | Citation links to sources | P1 |
| Understandability | Understandability | Clear labels in command palette | P0 |

---

## 8. Educational Standards

### 8.1 SCORM 2004 4th Edition

| Element | Power-User Viewer Applicability | Tier |
|---------|--------------------------------|------|
| Content Aggregation | Package learn lessons for LMS | P3 |
| Runtime Environment | Track completion, scores | P3 |
| Sequencing | Lesson prerequisites | P3 |
| Navigation | SCORM nav controls | P3 |
| Data Model | cmi.core.*, cmi.interactions.* | P3 |

### 8.2 xAPI (Experience API)

| Element | Power-User Viewer Applicability | Tier |
|---------|--------------------------------|------|
| Statement format | Track user interactions (quiz, flashcard, article read) | P2 |
| Activity profiles | Define learning activities | P2 |
| Agent profiles | User learning profiles | P2 |
| Activity state | In-progress learning states | P2 |
| Statement API | Send statements to LRS | P3 |
| Verb registry | Standard verbs (completed, answered, experienced) | P2 |
| Activity type registry | Standard activity types | P2 |

### 8.3 IEEE 1484.12.1 (LOM)

| Element | Power-User Viewer Applicability | Tier |
|---------|--------------------------------|------|
| General | Title, language, description | P1 |
| Lifecycle | Version, status, contribute | P1 |
| Technical | Format, size, duration | P1 |
| Educational | Learning resource type, interactivity | P1 |
| Rights | Cost, copyright | P1 |
| Relation | Kind, resource | P0 (graph edges) |
| Annotation | Entity, date, description | P0 (community annotations) |
| Classification | Purpose, path, entry | P0 (topic taxonomy) |

---

## 9. Internationalization Standards

### 9.1 ICU (International Components for Unicode)

| Feature | Power-User Viewer Applicability | Tier |
|---------|--------------------------------|------|
| MessageFormat | Plural forms in command palette ("1 result" / "5 results") | P0 |
| NumberFormat | Locale-aware numbers in dense mode | P1 |
| DateTimeFormat | Locale-aware dates in progress dashboard | P1 |
| Collator | Locale-aware sorting in search results | P2 |
| RelativeTimeFormat | "3 days ago" in progress view | P2 |
| ListFormat | "A, B, and C" in peptide lists | P2 |
| DisplayNames | Language/region names in settings | P1 |

### 9.2 CLDR (Common Locale Data Repository)

| Feature | Power-User Viewer Applicability | Tier |
|---------|--------------------------------|------|
| Locale data | All locale-specific formatting | P0 |
| Plural rules | Chinese/Japanese/Arabic plural forms | P0 |
| Date/time patterns | Locale-specific date formatting | P1 |
| Number patterns | Locale-specific number formatting | P1 |
| Currency patterns | Not applicable (no payments) | N/A |
| Collation | Locale-aware string comparison | P2 |
| Time zone data | Time zone display | P2 |

### 9.3 BCP 47

| Feature | Power-User Viewer Applicability | Tier |
|---------|--------------------------------|------|
| Language tags | `en`, `zh-Hans`, `ja`, `ar` locale identifiers | P0 |
| Script subtags | `Hans` (Simplified Chinese) | P0 |
| Region subtags | `en-US`, `zh-CN` | P1 |
| Variant subtags | Future locale variants | P3 |

### 9.4 Unicode Bidirectional Algorithm (UAX #9)

| Feature | Power-User Viewer Applicability | Tier |
|---------|--------------------------------|------|
| Bidi algorithm | RTL layout for Arabic command palette | P0 |
| Bidi isolation | `dir="auto"` for mixed content | P1 |
| Bidi controls | `U+2066`–`U+2069` for embedding | P1 |
| Mirroring | RTL mirror for arrows, chevrons | P1 |

---

## 10. Standards-to-Feature-Tier Matrix

| Standard | P0 | P1 | P2 | P3 | P4 |
|----------|----|----|----|----|----|
| WCAG 2.1 AA | Full | Full | Full | Full | Full |
| WCAG 2.1 AAA | Select | Select | Select | Select | Select |
| Section 508 | Full | Full | Full | Full | Full |
| ARIA 1.2 | Full | Full | Full | Partial | Partial |
| GDPR | Core | Core | Full | Full | Full |
| CCPA | Core | Core | Full | Full | Full |
| OWASP Top 10 | Full | Full | Full | Full | Full |
| NIST SP 800-53 | Core | Core | Full | Full | Full |
| CSP Level 3 | Full | Full | Full | Full | Full |
| HTML Living | Full | Full | Full | Full | Full |
| CSS Custom Props | Full | Full | Full | Full | Full |
| ES2024 | Core | Core | Core | Core | Core |
| Dublin Core | Core | Full | Full | Full | Full |
| Schema.org | Core | Full | Full | Full | Full |
| ISO/IEC 25010 | Full | Full | Full | Full | Full |
| SCORM | — | — | — | Core | Full |
| xAPI | — | — | Core | Full | Full |
| ICU/CLDR | Core | Full | Full | Full | Full |
| BCP 47 | Full | Full | Full | Full | Full |
| UAX #9 | Full | Full | Full | Full | Full |

---

## 11. Conflict Resolution

### 11.1 Priority Matrix

When standards impose contradictory requirements:

| Conflict Type | Resolution |
|---------------|-----------|
| Accessibility vs. Aesthetics | Accessibility wins (WCAG 2.1 AA mandatory) |
| Security vs. Performance | Security wins (OWASP, CSP mandatory) |
| Privacy vs. Analytics | Privacy wins (GDPR mandatory) |
| i18n vs. Bundle Size | i18n wins for P0 locales; lazy-load others |
| Standards Compliance vs. Feature Delivery | Compliance for P0 features; iterate for P1+ |

### 11.2 Existing Compliance Baseline

The project already meets:

- ✅ WCAG 2.1 AA (axe-core E2E tests)
- ✅ GDPR (cookie consent, privacy policy)
- ✅ CSP Level 2 (CSP headers in Workers)
- ✅ HSTS (security headers)
- ✅ Rate limiting (Cloudflare Workers)
- ✅ Input sanitization (Zod validation)
- ✅ Dark mode (prefers-color-scheme + toggle)
- ✅ i18n (4 locales: en, zh, ja, ar)
- ✅ RTL support (Arabic)
- ✅ prefers-reduced-motion (all animations)

---

**Document Status:** Complete
**Next Action:** Proceed to capability requirements specification
**Owner:** Wikisites Development Team
**Review Cycle:** Update after each sprint
