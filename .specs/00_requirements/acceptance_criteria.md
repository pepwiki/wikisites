# Acceptance Criteria Specification

**Document ID:** AC-SPEC-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** Approved
**Scope:** encyclopeptide.com and wikipept.com

---

## Table of Contents

1. [Functional Acceptance Criteria (FR)](#1-functional-acceptance-criteria)
2. [Non-Functional Acceptance Criteria (NFR)](#2-non-functional-acceptance-criteria)
3. [Data Acceptance Criteria (DR)](#3-data-acceptance-criteria)
4. [Integration Acceptance Criteria (IR)](#4-integration-acceptance-criteria)
5. [Design Acceptance Criteria (DesR)](#5-design-acceptance-criteria)
6. [Security Acceptance Criteria (SR)](#6-security-acceptance-criteria)
7. [Compliance Acceptance Criteria (CR)](#7-compliance-acceptance-criteria)

---

## 1. Functional Acceptance Criteria

### AC-FR-001-1

- **Requirement**: FR-001 (Astro Static Site Generation)
- **Criterion**: All static pages on encyclopeptide.com must be pre-rendered to HTML at build time with zero client-side JavaScript by default
- **Measurement Method**: Run `pnpm build`, inspect `dist/` output for `.html` files; verify no `<script>` tags except analytics and view-transition scripts on static pages via DOM inspection
- **Expected Result**: 100% of static pages contain zero `<script>` tags for application JavaScript; only Cloudflare Web Analytics script and Astro view-transition script permitted
- **Priority**: Must

### AC-FR-001-2

- **Requirement**: FR-001 (Astro Static Site Generation)
- **Criterion**: Build output must produce valid HTML5 documents with correct doctype, charset, and viewport meta tags on every page
- **Measurement Method**: Validate all generated HTML files using W3C HTML Validator; automated check in CI/CD pipeline
- **Expected Result**: Zero HTML validation errors across all generated pages
- **Priority**: Must

### AC-FR-001-3

- **Requirement**: FR-001 (Astro Static Site Generation)
- **Criterion**: wikipept.com hybrid mode must correctly serve both static pre-rendered pages and server-rendered dynamic routes
- **Measurement Method**: Verify static pages served from CDN cache; verify dynamic routes (e.g., `/api/progress`, user profile pages) trigger Cloudflare Workers execution; inspect response headers for `x-powered-by` and cache status
- **Expected Result**: Static pages return `cf-cache-status: HIT` or `HIT (stale)`; dynamic routes return `cf-cache-status: DYNAMIC` and execute worker code
- **Priority**: Must

### AC-FR-002-1

- **Requirement**: FR-002 (SolidJS Interactive Islands)
- **Criterion**: Every interactive component (molecular viewer, quiz engine, flashcard system, wiki editor, progress tracker) must be implemented as an Astro island with explicit `client:*` hydration directive
- **Measurement Method**: Source code review of all `.astro` files; grep for `client:` directives on interactive component imports
- **Expected Result**: 100% of interactive components have `client:load`, `client:idle`, or `client:visible` directives; zero interactive components rendered without hydration directives
- **Priority**: Must

### AC-FR-002-2

- **Requirement**: FR-002 (SolidJS Interactive Islands)
- **Criterion**: Each SolidJS island must be independently bundleable and tree-shakeable; no shared runtime overhead between islands
- **Measurement Method**: Analyze Vite build output for chunk splitting; verify each island produces its own JavaScript chunk; verify no shared commons chunk exceeding 5KB
- **Expected Result**: Each island's JavaScript bundle is isolated; total shared runtime overhead is ≤5KB gzipped
- **Priority**: Should

### AC-FR-002-3

- **Requirement**: FR-002 (SolidJS Interactive Islands)
- **Criterion**: SolidJS components must compile to vanilla DOM operations without virtual DOM overhead
- **Measurement Method**: Inspect compiled output in `dist/_astro/` for `createElement`, `appendChild`, and direct DOM manipulation patterns; verify absence of `diffing`, `reconcile`, or VDOM-related code
- **Expected Result**: Compiled SolidJS output contains direct DOM manipulation calls; no virtual DOM diffing or reconciliation code present
- **Priority**: Must

### AC-FR-003-1

- **Requirement**: FR-003 (Content Collections with Zod Validation)
- **Criterion**: All MDX content files must have frontmatter validated against Zod schemas at build time; invalid frontmatter must cause build failure
- **Measurement Method**: Intentionally introduce invalid frontmatter (missing required field, wrong type) into one content file; run `pnpm build`; verify build exits with non-zero status and descriptive error message
- **Expected Result**: Build fails with exit code ≠ 0; error message identifies the specific file, field, and validation rule violated
- **Priority**: Must

### AC-FR-003-2

- **Requirement**: FR-003 (Content Collections with Zod Validation)
- **Criterion**: encyclopeptide.com monograph collection must enforce all required fields: title, chainLength, chemicalClass, functionalCategory, sourceOrganisms, molecularFormula, molecularWeight, netCharge, sequence, references
- **Measurement Method**: Attempt to build with a monograph missing each required field (one at a time); verify build failure for each omission
- **Expected Result**: Build fails for each missing required field; all 10 required fields are enforced
- **Priority**: Must

### AC-FR-003-3

- **Requirement**: FR-003 (Content Collections with Zod Validation)
- **Criterion**: wikipept.com study guide collection must enforce educationalLevel enum values restricted to: foundational, intermediate, advanced, expert
- **Measurement Method**: Create test study guide with `educationalLevel: "invalid"`; run build; verify schema validation error
- **Expected Result**: Build fails with Zod error indicating `educationalLevel` must be one of the four enum values
- **Priority**: Must

### AC-FR-004-1

- **Requirement**: FR-004 (View Transitions)
- **Criterion**: Both sites must enable Astro View Transitions with smooth page navigation animations on all internal links
- **Measurement Method**: Manual testing in Chrome/Firefox; verify no full-page reload on internal navigation; verify transition animations execute; verify browser back/forward buttons work correctly
- **Expected Result**: Internal navigation completes without full-page reload; transition animation plays within 300ms; browser history is correctly maintained
- **Priority**: Should

### AC-FR-004-2

- **Requirement**: FR-004 (View Transitions)
- **Criterion**: View transitions must not cause layout shift (CLS >0.1) during page transitions
- **Measurement Method**: Run Playwright tests with CLS monitoring during view transitions; measure CLS for 10 consecutive page transitions
- **Expected Result**: Average CLS across 10 transitions is ≤0.1; maximum single-transition CLS is ≤0.15
- **Priority**: Must

### AC-FR-005-1

- **Requirement**: FR-005 (3D Molecular Viewer)
- **Criterion**: Molecular viewer must load and render 3D molecular structures from PDB format files within 2 seconds on desktop (4G connection, 4x CPU slowdown)
- **Measurement Method**: Playwright performance test: navigate to monograph page with molecular viewer; measure time from viewer mount to first render frame using Performance API
- **Expected Result**: Time to first render ≤2000ms under throttled conditions
- **Priority**: Must

### AC-FR-005-2

- **Requirement**: FR-005 (3D Molecular Viewer)
- **Criterion**: Molecular viewer must support rotation, zoom, and pan interactions at 60fps on desktop and 30fps on mobile
- **Measurement Method**: Playwright test: interact with viewer (rotate 360°, zoom in/out, pan); measure frame rate using requestAnimationFrame callback timing
- **Expected Result**: Desktop frame rate ≥60fps; mobile frame rate ≥30fps during continuous interaction
- **Priority**: Must

### AC-FR-005-3

- **Requirement**: FR-005 (3D Molecular Viewer)
- **Criterion**: 2D fallback representation must be provided for all 3D molecular structures; fallback must be accessible to screen readers
- **Measurement Method**: Disable JavaScript in browser; verify 2D structural image loads; run axe-core accessibility check on fallback element; verify alt text is present and descriptive
- **Expected Result**: 2D fallback image loads without JavaScript; axe-core reports zero violations; alt text contains peptide name and sequence
- **Priority**: Must

### AC-FR-005-4

- **Requirement**: FR-005 (3D Molecular Viewer)
- **Criterion**: Molecular viewer must not exceed 500MB memory usage for any structure with ≤5000 atoms
- **Measurement Method**: Chrome DevTools Performance tab: load molecular viewer with 5000-atom structure; measure JS heap size at steady state
- **Expected Result**: JS heap size ≤500MB after 30 seconds of interaction
- **Priority**: Should

### AC-FR-006-1

- **Requirement**: FR-006 (Quiz Engine)
- **Criterion**: Quiz engine must support multiple choice, fill-in-the-blank, true/false, and sequence ordering question types
- **Measurement Method**: Create test quiz with one of each question type; complete quiz via Playwright; verify each question type renders correctly and accepts input
- **Expected Result**: All four question types render with correct UI, accept user input, and evaluate answers correctly
- **Priority**: Must

### AC-FR-006-2

- **Requirement**: FR-006 (Quiz Engine)
- **Criterion**: Quiz scoring must calculate percentage correct and store results with timestamp, question IDs, user answers, and correct answers
- **Measurement Method**: Complete a 10-question quiz; inspect D1 database record for quiz result; verify all required fields are present and correct
- **Expected Result**: Database record contains: quizId, userId, timestamp (ISO 8601), totalQuestions, correctAnswers, percentage, array of {questionId, userAnswer, correctAnswer, isCorrect}
- **Priority**: Must

### AC-FR-006-3

- **Requirement**: FR-006 (Quiz Engine)
- **Criterion**: Quiz must provide immediate feedback after each answer submission showing correct answer and brief explanation
- **Measurement Method**: Playwright test: answer a quiz question; verify feedback element appears within 500ms; verify feedback contains correct answer text and explanation
- **Expected Result**: Feedback element visible within 500ms; contains "Correct" or "Incorrect" label; contains explanation text; contains correct answer
- **Priority**: Must

### AC-FR-007-1

- **Requirement**: FR-007 (Flashcard System)
- **Criterion**: Flashcard system must implement FSRS (Free Spaced Repetition Scheduler) algorithm for scheduling card reviews
- **Measurement Method**: Create test flashcard deck with 5 cards; review cards with known difficulty ratings; verify next review dates are calculated per FSRS algorithm; compare output against reference FSRS implementation
- **Expected Result**: Next review dates match FSRS algorithm output within ±1 minute tolerance for all tested cards
- **Priority**: Must

### AC-FR-007-2

- **Requirement**: FR-007 (Flashcard System)
- **Criterion**: Flashcard flip animation must complete within 300ms with no layout shift
- **Measurement Method**: Playwright test: click flashcard to flip; measure animation duration using CSS transition end event; measure CLS during flip
- **Expected Result**: Animation completes within 300ms; CLS during flip is 0
- **Priority**: Should

### AC-FR-007-3

- **Requirement**: FR-007 (Flashcard System)
- **Criterion**: Flashcard system must support "Know", "Forgot", and "Hard" rating buttons that influence FSRS scheduling
- **Measurement Method**: Review flashcard; click each rating button; verify FSRS algorithm receives correct rating input; verify next review date adjusts accordingly
- **Expected Result**: "Know" produces longest interval; "Forgot" produces shortest interval; "Hard" produces intermediate interval; all intervals differ by at least 1 day
- **Priority**: Must

### AC-FR-008-1

- **Requirement**: FR-008 (Search Functionality)
- **Criterion**: Pagefind search index must be generated at build time and include all static content from both sites
- **Measurement Method**: Run `pagefind --site dist`; verify `dist/_pagefind/` directory exists; verify index files contain entries for all monograph and study guide pages
- **Expected Result**: Search index contains entries for 100% of static content pages; index files total ≤500KB gzipped for 1000 pages
- **Priority**: Must

### AC-FR-008-2

- **Requirement**: FR-008 (Search Functionality)
- **Criterion**: Search response time must be ≤100ms for queries on typical hardware after initial index load
- **Measurement Method**: Playwright performance test: type search query; measure time from input to first result render using Performance API; run 10 queries and calculate average
- **Expected Result**: Average search response ≤100ms; maximum single query response ≤200ms
- **Priority**: Must

### AC-FR-008-3

- **Requirement**: FR-008 (Search Functionality)
- **Criterion**: Search must support faceted filtering by collection, category, difficulty level, and chain length
- **Measurement Method**: Execute search with each facet filter applied; verify results are correctly filtered; verify facet counts are accurate
- **Expected Result**: Each facet filter returns only matching results; facet counts match actual result counts
- **Priority**: Should

### AC-FR-009-1

- **Requirement**: FR-009 (Community Editing)
- **Criterion**: Wiki-style editing must support create, edit, and revert operations with full version history
- **Measurement Method**: Create new page; edit page; revert to previous version; inspect D1 database for version records; verify each operation creates a new version entry
- **Expected Result**: Three version records in database; each contains: pageId, versionNumber, content, authorId, timestamp, operation (create/edit/revert)
- **Priority**: Must

### AC-FR-009-2

- **Requirement**: FR-009 (Community Editing)
- **Criterion**: Edit conflict detection must prevent simultaneous edits from overwriting each other; conflicting edits must be presented to user for resolution
- **Measurement Method**: Open same page in two browser tabs; edit in tab A and save; edit in tab B and save; verify conflict resolution UI appears in tab B
- **Expected Result**: Tab B shows conflict resolution UI with both versions displayed; user can choose to merge, overwrite, or cancel
- **Priority**: Must

### AC-FR-009-3

- **Requirement**: FR-009 (Community Editing)
- **Criterion**: All edits must be attributed to the editing user with timestamp and must be auditable
- **Measurement Method**: Submit edit as authenticated user; query version history; verify authorId, displayName, and ISO 8601 timestamp are recorded
- **Expected Result**: Version record contains valid userId, displayName string, and timestamp within 1 second of actual edit time
- **Priority**: Must

### AC-FR-010-1

- **Requirement**: FR-010 (Progress Tracking)
- **Criterion**: User learning progress must track: quiz scores, flashcard mastery levels, study time, and topic completion
- **Measurement Method**: Complete quiz, review flashcards, and navigate study guides as authenticated user; query D1 database for progress records
- **Expected Result**: Database contains records for: quiz score (with percentage), flashcard mastery (per card, with FSRS state), study time (in seconds, per session), topic completion (boolean per topic)
- **Priority**: Must

### AC-FR-010-2

- **Requirement**: FR-010 (Progress Tracking)
- **Criterion**: Progress dashboard must display visual progress bars, streak counters, and mastery badges
- **Measurement Method**: Playwright test: navigate to progress dashboard; verify presence of progress bars, streak counter element, and badge elements
- **Expected Result**: Dashboard contains ≥1 progress bar, ≥1 streak counter with numeric value, ≥1 badge (if earned)
- **Priority**: Should

### AC-FR-011-1

- **Requirement**: FR-011 (Internationalization)
- **Criterion**: Default locale (English) must be accessible at both `/en/path` and `/path` (root-level) URLs
- **Measurement Method**: Request `/en/angiotensin-ii` and `/angiotensin-ii`; verify both return 200 with identical content
- **Expected Result**: Both URLs return HTTP 200; HTML content is identical (ignoring canonical URL tag)
- **Priority**: Must

### AC-FR-011-2

- **Requirement**: FR-011 (Internationalization)
- **Criterion**: Non-default locales must redirect from root to locale-prefixed path (e.g., `/path` → `/en/path` when Accept-Language indicates English)
- **Measurement Method**: Send request to `/angiotensin-ii` with `Accept-Language: en-US`; verify redirect or direct serve; send with `Accept-Language: zh-CN`; verify redirect to `/zh/angiotensin-ii`
- **Expected Result**: English request serves directly or redirects to `/en/`; Chinese request redirects to `/zh/angiotensin-ii`
- **Priority**: Should

### AC-FR-011-3

- **Requirement**: FR-011 (Internationalization)
- **Criterion**: Missing translations must fall back to English without broken UI elements
- **Measurement Method**: Request a page in a locale where translation is incomplete; verify page renders with English fallback text; verify no empty strings, missing labels, or broken layout
- **Expected Result**: Page renders completely; missing translations display English text; layout is not broken
- **Priority**: Must

### AC-FR-012-1

- **Requirement**: FR-012 (Dark Mode)
- **Criterion**: Dark mode toggle must persist user preference across page navigations via localStorage
- **Measurement Method**: Toggle dark mode; navigate to different page; verify dark mode is still active; clear cookies but not localStorage; verify dark mode persists
- **Expected Result**: Dark mode preference survives page navigation and cookie clearing; preference is stored in localStorage under key `theme`
- **Priority**: Should

### AC-FR-012-2

- **Requirement**: FR-012 (Dark Mode)
- **Criterion**: Dark mode must respect `prefers-color-scheme: dark` media query as initial default when no user preference is stored
- **Measurement Method**: Clear localStorage; set OS/browser to dark mode; load page; verify dark mode is active; switch to light mode; reload; verify light mode is active
- **Expected Result**: Page initially reflects OS color scheme preference; user override takes precedence after first toggle
- **Priority**: Should

### AC-FR-013-1

- **Requirement**: FR-013 (Navigation System)
- **Criterion**: encyclopeptide.com must provide fixed left sidebar navigation with collapsible sections for monograph categories
- **Measurement Method**: Playwright test: load any monograph page; verify sidebar is visible and fixed during scroll; verify sections can be collapsed/expanded
- **Expected Result**: Sidebar remains fixed during vertical scroll; all sections collapse/expand on click; collapsed state persists across page loads
- **Priority**: Must

### AC-FR-013-2

- **Requirement**: FR-013 (Navigation System)
- **Criterion**: wikipept.com must provide top header navigation with dropdown menus and optional right sidebar for progress display
- **Measurement Method**: Playwright test: load any study guide page; verify header navigation with dropdowns; verify right sidebar shows progress elements
- **Expected Result**: Header navigation visible at top; dropdowns open on hover/click; right sidebar displays progress indicators
- **Priority**: Must

### AC-FR-014-1

- **Requirement**: FR-014 (Breadcrumbs)
- **Criterion**: Both sites must display breadcrumb navigation reflecting the page hierarchy with clickable links at each level
- **Measurement Method**: Navigate to nested page; verify breadcrumb trail is present; verify each breadcrumb level links to correct parent page
- **Expected Result**: Breadcrumb trail shows full hierarchy; each link navigates to correct parent; current page is not linked
- **Priority**: Must

### AC-FR-015-1

- **Requirement**: FR-015 (Citation Export)
- **Criterion**: encyclopeptide.com must support exporting references in BibTeX, RIS, and APA formats
- **Measurement Method**: Navigate to monograph page; click export citation; verify BibTeX, RIS, and APA options are available; download each format; verify content validity
- **Expected Result**: BibTeX file parses correctly; RIS file parses correctly; APA format matches citation style guide
- **Priority**: Should

### AC-FR-016-1

- **Requirement**: FR-016 (Data Export)
- **Criterion**: encyclopeptide.com must support exporting peptide data in CSV, JSON, and FASTA formats
- **Measurement Method**: Navigate to monograph page; click export data; verify CSV, JSON, and FASTA options; download each; verify data integrity
- **Expected Result**: CSV is valid comma-separated with headers; JSON is valid and parseable; FASTA contains correct header line and sequence
- **Priority**: Should

### AC-FR-017-1

- **Requirement**: FR-017 (Structured Data / JSON-LD)
- **Criterion**: encyclopeptide.com monograph pages must include valid `ScholarlyArticle` JSON-LD structured data
- **Measurement Method**: Inspect page source for `<script type="application/ld+json">` blocks; validate against Schema.org using Google Rich Results Test
- **Expected Result**: JSON-LD present; contains @type: ScholarlyArticle; contains name, citation, about, identifier fields; validates without errors
- **Priority**: Must

### AC-FR-017-2

- **Requirement**: FR-017 (Structured Data / JSON-LD)
- **Criterion**: wikipept.com study guide pages must include valid `LearningResource` JSON-LD structured data
- **Measurement Method**: Inspect page source for `<script type="application/ld+json">` blocks; validate against Schema.org
- **Expected Result**: JSON-LD present; contains @type: LearningResource; contains educationalLevel, teaches, assesses, timeRequired fields; validates without errors
- **Priority**: Must

### AC-FR-018-1

- **Requirement**: FR-018 (Open Graph Meta Tags)
- **Criterion**: All pages on both sites must include complete Open Graph meta tags: og:title, og:type, og:image, og:url, og:description, og:site_name
- **Measurement Method**: Inspect `<head>` section of every page type; verify all six required OG tags are present with non-empty content
- **Expected Result**: All six OG tags present; og:image references a valid 1200x630px image; og:url matches canonical URL
- **Priority**: Should

### AC-FR-019-1

- **Requirement**: FR-019 (Responsive Design)
- **Criterion**: All pages must render correctly across breakpoints: 320px (mobile), 768px (tablet), 1024px (desktop), 1280px (wide), 1536px (ultrawide)
- **Measurement Method**: Playwright screenshot tests at each breakpoint; visual regression comparison against approved baselines
- **Expected Result**: Layout adapts correctly at each breakpoint; no horizontal overflow; no content truncation; no overlapping elements
- **Priority**: Must

### AC-FR-019-2

- **Requirement**: FR-019 (Responsive Design)
- **Criterion**: Touch targets on mobile must be ≥44x44px for all interactive elements (buttons, links, form controls)
- **Measurement Method**: Playwright test at 375px viewport; measure dimensions of all interactive elements; flag any below 44x44px
- **Expected Result**: 100% of interactive elements have touch target dimensions ≥44x44px
- **Priority**: Must

### AC-FR-020-1

- **Requirement**: FR-020 (Error Handling)
- **Criterion**: 404 pages on both sites must display a custom error page with search functionality and navigation links
- **Measurement Method**: Request non-existent URL; verify custom 404 page loads (not default server 404); verify search input is present; verify navigation links are present
- **Expected Result**: Custom 404 page loads with site branding; search input functional; ≥3 navigation links to popular pages
- **Priority**: Should

### AC-FR-020-2

- **Requirement**: FR-020 (Error Handling)
- **Criterion**: Cloudflare Workers must return structured JSON error responses with error code, message, and request ID for all API endpoints
- **Measurement Method**: Trigger error conditions on API endpoints (invalid input, unauthorized access, resource not found); verify JSON error response format
- **Expected Result**: Error responses contain: `{ "error": { "code": "string", "message": "string", "requestId": "string" } }` with appropriate HTTP status code
- **Priority**: Must

---

## 2. Non-Functional Acceptance Criteria

### AC-NFR-001-1

- **Requirement**: NFR-001 (Performance - LCP)
- **Criterion**: Largest Contentful Paint (LCP) must be ≤2.5 seconds at the 75th percentile across all pages on both sites
- **Measurement Method**: Lighthouse CI runs on 10 key pages per site; CrUX field data when available; web-vitals library for real-user monitoring
- **Expected Result**: Lighthouse LCP score ≤2.5s for all tested pages; 75th percentile field data ≤2.5s
- **Priority**: Must

### AC-NFR-001-2

- **Requirement**: NFR-001 (Performance - CLS)
- **Criterion**: Cumulative Layout Shift (CLS) must be ≤0.1 at the 75th percentile across all pages
- **Measurement Method**: Lighthouse CI CLS measurement; Playwright CLS monitoring during page load and interaction
- **Expected Result**: Lighthouse CLS ≤0.1 for all tested pages; no individual interaction causes CLS >0.1
- **Priority**: Must

### AC-NFR-001-3

- **Requirement**: NFR-001 (Performance - INP)
- **Criterion**: Interaction to Next Paint (INP) must be ≤200ms at the 75th percentile for all interactive elements
- **Measurement Method**: Lighthouse CI INP measurement; Playwright interaction timing tests for quiz buttons, flashcard flips, molecular viewer controls, navigation clicks
- **Expected Result**: INP ≤200ms for all tested interactions; no individual interaction exceeds 300ms
- **Priority**: Must

### AC-NFR-001-4

- **Requirement**: NFR-001 (Performance - FCP)
- **Criterion**: First Contentful Paint (FCP) must be ≤1.8 seconds at the 75th percentile
- **Measurement Method**: Lighthouse CI FCP measurement across 10 key pages per site
- **Expected Result**: FCP ≤1.8s for all tested pages
- **Priority**: Must

### AC-NFR-001-5

- **Requirement**: NFR-001 (Performance - TTI)
- **Criterion**: Time to Interactive (TTI) must be ≤3.5 seconds for interactive pages
- **Measurement Method**: Lighthouse CI TTI measurement on pages with interactive islands (quiz, flashcard, molecular viewer)
- **Expected Result**: TTI ≤3.5s for all interactive pages; ≤2.0s for static pages
- **Priority**: Must

### AC-NFR-001-6

- **Requirement**: NFR-001 (Performance - Page Weight)
- **Criterion**: Total initial page weight must be ≤500KB (gzipped) for interactive pages and ≤100KB for static pages
- **Measurement Method**: Chrome DevTools Network tab: load each page type; measure total transfer size; verify gzip compression
- **Expected Result**: Interactive pages ≤500KB total; static pages ≤100KB total; all assets served with gzip/brotli compression
- **Priority**: Must

### AC-NFR-001-7

- **Requirement**: NFR-001 (Performance - TTFB)
- **Criterion**: Time to First Byte (TTFB) must be ≤800ms at the 75th percentile from global edge locations
- **Measurement Method**: Lighthouse CI TTFB measurement; synthetic monitoring from multiple geographic locations
- **Expected Result**: TTFB ≤800ms from all tested edge locations
- **Priority**: Must

### AC-NFR-002-1

- **Requirement**: NFR-002 (Performance - Lighthouse Scores)
- **Criterion**: Lighthouse Performance score must be ≥90 for all pages
- **Measurement Method**: Lighthouse CI runs on 10 key pages per site; average score calculated
- **Expected Result**: All pages score ≥90; no page scores below 85
- **Priority**: Must

### AC-NFR-002-2

- **Requirement**: NFR-002 (Performance - Lighthouse Scores)
- **Criterion**: Lighthouse Accessibility score must be ≥95 for all pages
- **Measurement Method**: Lighthouse CI accessibility audit on all page types
- **Expected Result**: All pages score ≥95; no page scores below 90
- **Priority**: Must

### AC-NFR-002-3

- **Requirement**: NFR-002 (Performance - Lighthouse Scores)
- **Criterion**: Lighthouse Best Practices score must be ≥90 for all pages
- **Measurement Method**: Lighthouse CI best practices audit on all page types
- **Expected Result**: All pages score ≥90
- **Priority**: Must

### AC-NFR-002-4

- **Requirement**: NFR-002 (Performance - Lighthouse Scores)
- **Criterion**: Lighthouse SEO score must be ≥95 for all pages
- **Measurement Method**: Lighthouse CI SEO audit on all page types
- **Expected Result**: All pages score ≥95
- **Priority**: Must

### AC-NFR-003-1

- **Requirement**: NFR-003 (Accessibility - WCAG 2.1 AA Contrast)
- **Criterion**: All normal text must meet 4.5:1 contrast ratio against background; all large text (≥18px bold or ≥24px) must meet 3:1 contrast ratio
- **Measurement Method**: axe-core automated testing; manual contrast ratio calculation for key color combinations using WebAIM Contrast Checker
- **Expected Result**: Zero contrast ratio violations across all pages; specific verification: Dark Navy (#1B2A4A) on White (#FFFFFF) = 13.5:1 ✓; Teal (#0097A7) on White (#FFFFFF) = 4.6:1 ✓; Gold (#C9A84C) on Dark Navy (#1B2A4A) = 5.2:1 ✓
- **Priority**: Must

### AC-NFR-003-2

- **Requirement**: NFR-003 (Accessibility - Keyboard Navigation)
- **Criterion**: All interactive elements must be reachable and operable via keyboard only; no keyboard traps must exist
- **Measurement Method**: Playwright keyboard navigation test: Tab through all interactive elements on each page; verify focus is visible; verify all elements can be activated via Enter/Space; verify no focus traps
- **Expected Result**: 100% of interactive elements keyboard-accessible; visible focus indicator on all focused elements; zero keyboard traps
- **Priority**: Must

### AC-NFR-003-3

- **Requirement**: NFR-003 (Accessibility - Screen Reader)
- **Criterion**: All pages must be navigable and understandable using NVDA/VoiceOver screen readers; all ARIA roles, labels, and live regions must be correctly implemented
- **Measurement Method**: Manual screen reader testing on key page flows (navigation, monograph reading, quiz completion, flashcard review); axe-core ARIA validation
- **Expected Result**: All page content announced correctly; all interactive elements have accessible names; ARIA live regions update for dynamic content; zero axe-core ARIA violations
- **Priority**: Must

### AC-NFR-003-4

- **Requirement**: NFR-003 (Accessibility - Semantic HTML)
- **Criterion**: Pages must use semantic HTML elements (headings, landmarks, lists, tables) correctly; heading hierarchy must be sequential without skipping levels
- **Measurement Method**: axe-core heading-order validation; manual review of landmark regions; automated check for heading level sequence
- **Expected Result**: Heading levels sequential (h1 → h2 → h3, no skipping); all pages have exactly one h1; landmark regions (nav, main, aside, footer) present and correctly nested
- **Priority**: Must

### AC-NFR-003-5

- **Requirement**: NFR-003 (Accessibility - Images)
- **Criterion**: All images must have alt text; decorative images must have empty alt attributes; complex images (molecular visualizations, diagrams) must have extended descriptions
- **Measurement Method**: axe-core image-alt validation; manual review of alt text quality for molecular visualizations
- **Expected Result**: 100% of informational images have descriptive alt text; decorative images have `alt=""`; molecular visualizations have both alt text and linked long description
- **Priority**: Must

### AC-NFR-003-6

- **Requirement**: NFR-003 (Accessibility - Forms)
- **Criterion**: All form inputs must have associated labels; error messages must be programmatically associated with inputs; form validation must not rely solely on color
- **Measurement Method**: axe-core label and form-field-multiple-labels validation; manual testing of form error states
- **Expected Result**: 100% of form inputs have associated labels; error messages appear adjacent to inputs with `aria-describedby`; error states use text icons, not color alone
- **Priority**: Must

### AC-NFR-003-7

- **Requirement**: NFR-003 (Accessibility - Focus Management)
- **Criterion**: Focus must be managed correctly during view transitions, modal open/close, and dynamic content updates
- **Measurement Method**: Playwright focus tracking test: trigger view transition; verify focus moves to new page heading; open modal; verify focus trapped in modal; close modal; verify focus returns to trigger element
- **Expected Result**: Focus moves to new content heading after navigation; focus trapped in modal when open; focus returns to trigger element on modal close
- **Priority**: Must

### AC-NFR-004-1

- **Requirement**: NFR-004 (Security - HTTPS)
- **Criterion**: All pages on both sites must be served over HTTPS with HSTS header including preload and minimum max-age of 31536000 seconds
- **Measurement Method**: `curl -I https://encyclopeptide.com` and `curl -I https://wikipept.com`; verify 301 redirect from HTTP to HTTPS; verify HSTS header
- **Expected Result**: HTTP → HTTPS redirect (301); `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload` header present
- **Priority**: Must

### AC-NFR-004-2

- **Requirement**: NFR-004 (Security - CSP)
- **Criterion**: Content Security Policy must be configured to prevent XSS, inline script execution, and unauthorized resource loading
- **Measurement Method**: Inspect Content-Security-Policy header; verify script-src, style-src, img-src, connect-src directives; test with inline script injection attempt
- **Expected Result**: CSP header present with: `script-src 'self'`; `style-src 'self' 'unsafe-inline'` (required for Tailwind); `img-src 'self' https:`; `connect-src 'self'`; inline script blocked by CSP
- **Priority**: Must

### AC-NFR-004-3

- **Requirement**: NFR-004 (Security - Headers)
- **Criterion**: Security headers must include: X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy
- **Measurement Method**: `curl -I` on key pages; verify all four headers present with correct values
- **Expected Result**: All four security headers present with specified values on every response
- **Priority**: Must

### AC-NFR-005-1

- **Requirement**: NFR-005 (Reliability - Uptime)
- **Criterion**: Both sites must maintain 99.9% uptime (measured monthly) excluding scheduled maintenance windows
- **Measurement Method**: External uptime monitoring (UptimeRobot, Betterstack); Cloudflare analytics availability data
- **Expected Result**: Monthly uptime ≥99.9%; maximum unplanned downtime ≤43.8 minutes per month
- **Priority**: Must

### AC-NFR-005-2

- **Requirement**: NFR-005 (Reliability - Recovery)
- **Criterion**: Recovery Time Objective (RTO) must be ≤4 hours; Recovery Point Objective (RPO) must be ≤1 hour
- **Measurement Method**: Annual disaster recovery drill; measure time from incident declaration to service restoration; measure data loss window
- **Expected Result**: RTO met in drill; RPO met in drill; documented DR procedure exists and is tested annually
- **Priority**: Should

### AC-NFR-006-1

- **Requirement**: NFR-006 (Scalability)
- **Criterion**: Sites must handle 5,000 concurrent users without degradation of Core Web Vitals thresholds
- **Measurement Method**: Load testing with k6 or Artillery simulating 5,000 concurrent users; monitor LCP, CLS, INP, error rates during load
- **Expected Result**: LCP ≤2.5s, CLS ≤0.1, INP ≤200ms maintained under 5,000 concurrent users; error rate <0.1%
- **Priority**: Should

### AC-NFR-007-1

- **Requirement**: NFR-007 (Offline Support)
- **Criterion**: Search functionality must work offline after initial index load; service worker must cache search index
- **Measurement Method**: Load search page; go offline via DevTools; execute search query; verify results returned from cache
- **Expected Result**: Search returns results when offline; service worker caches search index; cache size ≤1MB
- **Priority**: Could

---

## 3. Data Acceptance Criteria

### AC-DR-001-1

- **Requirement**: DR-001 (Content Schema Validation)
- **Criterion**: Zod schemas for all content collections must enforce data types, required fields, enum constraints, and regex patterns at build time
- **Measurement Method**: Create test content files violating each schema rule (wrong type, missing field, invalid enum, bad regex); run build for each; verify build failure with descriptive error
- **Expected Result**: Build fails for each schema violation; error messages identify file, field, and specific rule violated; 100% of schema rules enforceable
- **Priority**: Must

### AC-DR-002-1

- **Requirement**: DR-002 (Peptide Sequence Validation)
- **Criterion**: Peptide sequences must be validated against the regex pattern `^[ACDEFGHIKLMNPQRSTVWY]+$` (20 standard amino acid single-letter codes)
- **Measurement Method**: Create test monographs with valid and invalid sequences; verify build passes for valid, fails for invalid
- **Expected Result**: Sequences containing non-standard letters (B, J, O, U, X, Z) are rejected; valid sequences accepted
- **Priority**: Must

### AC-DR-003-1

- **Requirement**: DR-003 (Reference Integrity)
- **Criterion**: All DOI references in content must be valid and resolvable; broken DOIs must be detected at build time
- **Measurement Method**: Build script validates all DOI references by querying `https://doi.org/api/handles/{doi}`; broken DOIs cause build warning (not failure for v1)
- **Expected Result**: Build output lists all DOI validation results; broken DOIs flagged with warnings; ≥95% of DOIs validated as resolvable
- **Priority**: Should

### AC-DR-004-1

- **Requirement**: DR-004 (Data Consistency)
- **Criterion**: Molecular weight values in monograph frontmatter must match calculated values from the peptide sequence (±0.1 Da tolerance)
- **Measurement Method**: Build-time validation script: calculate molecular weight from sequence using amino acid residue weights; compare against frontmatter value
- **Expected Result**: All molecular weight values within ±0.1 Da of calculated value; mismatches flagged as build warnings
- **Priority**: Should

### AC-DR-005-1

- **Requirement**: DR-005 (Content Completeness)
- **Criterion**: Each monograph must contain minimum content sections: Classification, Structural Information, Biological Activity, References
- **Measurement Method**: Build-time validation: check that each monograph MDX file contains at least the four required H2 headings
- **Expected Result**: Monographs missing required sections flagged at build time; 100% of published monographs contain all four sections
- **Priority**: Must

### AC-DR-006-1

- **Requirement**: DR-006 (Search Index Freshness)
- **Criterion**: Search index must be regenerated within 1 hour of content changes being deployed
- **Measurement Method**: Deploy content change; measure time from deployment to search index update using automated test
- **Expected Result**: Search index reflects content changes within 60 minutes of deployment
- **Priority**: Should

### AC-DR-007-1

- **Requirement**: DR-007 (Data Backup)
- **Criterion**: D1 database must be backed up daily with point-in-time recovery capability
- **Measurement Method**: Verify Cloudflare D1 backup configuration; perform test restore from backup; verify data integrity
- **Expected Result**: Daily backups configured; test restore completes within 30 minutes; restored data matches source within RPO
- **Priority**: Must

### AC-DR-008-1

- **Requirement**: DR-008 (Data Migration)
- **Criterion**: Content migration from MDX files to D1 (for wikipept.com community features) must preserve all frontmatter fields, markdown body, and embedded component references
- **Measurement Method**: Migrate test content set (10 pages); compare source MDX with D1-stored content; verify all fields, body text, and component references preserved
- **Expected Result**: 100% of migrated content matches source; zero data loss; component references functional after migration
- **Priority**: Should

### AC-DR-009-1

- **Requirement**: DR-009 (Content Versioning)
- **Criterion**: Every content change must create a new version entry with full diff capability
- **Measurement Method**: Edit content; query version history; generate diff between versions; verify diff accuracy
- **Expected Result**: Version history contains sequential version numbers; diff accurately shows added, removed, and modified lines
- **Priority**: Must

### AC-DR-010-1

- **Requirement**: DR-010 (Cross-Site Data Sharing)
- **Criterion**: Peptide data referenced by both sites must be stored in a canonical shared schema; site-specific views must derive from canonical data without duplication
- **Measurement Method**: Verify that encyclopeptide.com monograph data and wikipept.com study guide peptide references use the same underlying data source; verify no duplicate peptide records
- **Expected Result**: Single canonical peptide data source; both sites query the same data; no duplicate records across sites
- **Priority**: Must

---

## 4. Integration Acceptance Criteria

### AC-IR-001-1

- **Requirement**: IR-001 (Cloudflare Pages Deployment)
- **Criterion**: Push to main branch must trigger automatic build and deployment to Cloudflare Pages within 5 minutes
- **Measurement Method**: Push commit to main; monitor CI/CD pipeline; measure time from push to live deployment
- **Expected Result**: Build and deployment complete within 5 minutes; site updated at all edge locations
- **Priority**: Must

### AC-IR-001-2

- **Requirement**: IR-001 (Cloudflare Pages Deployment)
- **Criterion**: Pull requests must generate preview deployments with unique URLs
- **Measurement Method**: Create pull request; verify preview deployment URL is generated; verify preview site is accessible and functional
- **Expected Result**: Preview URL accessible within 5 minutes of PR creation; preview site includes all features except production-only integrations
- **Priority**: Must

### AC-IR-002-1

- **Requirement**: IR-002 (Cloudflare Workers Integration)
- **Criterion**: Cloudflare Workers must respond to API requests within 50ms CPU time on paid plan
- **Measurement Method**: Load test API endpoints; measure worker CPU time via `wrangler tail` logs; verify CPU time stays within limits
- **Expected Result**: 95th percentile CPU time ≤50ms; maximum CPU time ≤50ms for paid plan
- **Priority**: Must

### AC-IR-002-2

- **Requirement**: IR-002 (Cloudflare Workers Integration)
- **Criterion**: Workers must not exceed 128MB memory usage per request
- **Measurement Method**: Monitor worker memory usage during peak load; verify memory stays within limits
- **Expected Result**: Maximum memory usage ≤128MB per request under all tested conditions
- **Priority**: Must

### AC-IR-003-1

- **Requirement**: IR-003 (Cloudflare KV Integration)
- **Criterion**: KV read operations must complete within 5ms at edge locations; writes must propagate within 60 seconds
- **Measurement Method**: Measure KV read latency from multiple edge locations; write value and measure time until read returns updated value from different edge location
- **Expected Result**: KV read latency ≤5ms; KV write propagation ≤60 seconds
- **Priority**: Must

### AC-IR-004-1

- **Requirement**: IR-004 (Cloudflare R2 Integration)
- **Criterion**: R2 object storage must serve static assets with ≤10ms TTFB from edge locations
- **Measurement Method**: Serve test asset from R2; measure TTFB from multiple edge locations
- **Expected Result**: R2 TTFB ≤10ms from all tested edge locations
- **Priority**: Should

### AC-IR-005-1

- **Requirement**: IR-005 (Cloudflare D1 Integration)
- **Criterion**: D1 queries must complete within 50ms for simple CRUD operations and within 200ms for complex joins
- **Measurement Method**: Benchmark D1 queries with realistic data volumes (10K rows); measure query execution time for simple and complex queries
- **Expected Result**: Simple CRUD queries ≤50ms; complex join queries ≤200ms; queries execute at edge location closest to user
- **Priority**: Must

### AC-IR-006-1

- **Requirement**: IR-006 (External API Integration - UniProt)
- **Criterion**: UniProt API integration must fetch protein data with rate limiting (≤100 req/sec) and graceful degradation on failure
- **Measurement Method**: Call UniProt API for 100 proteins; verify rate limiting; simulate API failure; verify fallback to cached data
- **Expected Result**: Rate limiting enforced at ≤100 req/sec; on API failure, cached data served with stale indicator; error logged
- **Priority**: Should

### AC-IR-006-2

- **Requirement**: IR-006 (External API Integration - PDB)
- **Criterion**: PDB API integration must fetch structural data with caching (1 hour TTL) and fallback to stale cache on failure
- **Measurement Method**: Request PDB structure; verify cache created; request same structure within TTL; verify cache hit; simulate failure; verify stale cache served
- **Expected Result**: First request fetches from API; subsequent requests within TTL served from cache; failed requests served from stale cache with warning
- **Priority**: Should

### AC-IR-007-1

- **Requirement**: IR-007 (CI/CD Pipeline)
- **Criterion**: CI/CD pipeline must execute: install → type check → lint → unit test → build → E2E test → Lighthouse audit → deploy
- **Measurement Method**: Review GitHub Actions workflow definition; verify all pipeline stages are present and execute in correct order
- **Expected Result**: All 8 pipeline stages present; each stage must pass before next stage begins; pipeline fails fast on any stage failure
- **Priority**: Must

### AC-IR-007-2

- **Requirement**: IR-007 (CI/CD Pipeline)
- **Criterion**: CI/CD pipeline must complete within 15 minutes for standard builds
- **Measurement Method**: Measure total pipeline execution time for 10 consecutive builds
- **Expected Result**: Average pipeline time ≤15 minutes; maximum pipeline time ≤20 minutes
- **Priority**: Should

### AC-IR-008-1

- **Requirement**: IR-008 (Analytics Integration)
- **Criterion**: Cloudflare Web Analytics must be integrated on all pages without requiring cookie consent banner
- **Measurement Method**: Verify Cloudflare Web Analytics script tag present on all page types; verify no cookies are set; verify no consent banner displayed
- **Expected Result**: Analytics script present on 100% of pages; zero cookies set; no consent banner; data appears in Cloudflare dashboard
- **Priority**: Must

---

## 5. Design Acceptance Criteria

### AC-DesR-001-1

- **Requirement**: DesR-001 (Design Tokens)
- **Criterion**: encyclopeptide.com must use the specified color palette: Dark Navy (#1B2A4A), White (#FFFFFF), Gold (#C9A84C), with supporting neutrals
- **Measurement Method**: Automated CSS custom property audit: verify `--color-primary: #1B2A4A`, `--color-secondary: #FFFFFF`, `--color-accent: #C9A84C` are defined and used
- **Expected Result**: All three primary colors defined as CSS custom properties; used consistently across all components
- **Priority**: Must

### AC-DesR-001-2

- **Requirement**: DesR-001 (Design Tokens)
- **Criterion**: wikipept.com must use the specified color palette: Teal (#0097A7), White (#FFFFFF), Coral (#FF6F61), with supporting neutrals
- **Measurement Method**: Automated CSS custom property audit: verify `--color-primary: #0097A7`, `--color-secondary: #FFFFFF`, `--color-accent: #FF6F61` are defined and used
- **Expected Result**: All three primary colors defined as CSS custom properties; used consistently across all components
- **Priority**: Must

### AC-DesR-002-1

- **Requirement**: DesR-002 (Typography)
- **Criterion**: encyclopeptide.com headings must use Playfair Display serif font; body text must use Inter sans-serif font
- **Measurement Method**: Inspect computed styles for heading and body elements; verify font-family declarations match specification
- **Expected Result**: Headings: `font-family: 'Playfair Display', serif`; Body: `font-family: 'Inter', sans-serif`; fonts loaded via Google Fonts or self-hosted
- **Priority**: Must

### AC-DesR-002-2

- **Requirement**: DesR-002 (Typography)
- **Criterion**: wikipept.com must use Inter sans-serif font for all text (headings and body)
- **Measurement Method**: Inspect computed styles for heading and body elements; verify font-family is Inter throughout
- **Expected Result**: All text elements use `font-family: 'Inter', sans-serif`; no serif fonts used
- **Priority**: Must

### AC-DesR-002-3

- **Requirement**: DesR-002 (Typography)
- **Criterion**: Body text must be 16px with line-height 1.7 on encyclopeptide.com and 1.75 on wikipept.com
- **Measurement Method**: Inspect computed styles for body/paragraph elements; verify font-size and line-height
- **Expected Result**: encyclopeptide.com: 16px/1.7; wikipept.com: 16px/1.75
- **Priority**: Should

### AC-DesR-003-1

- **Requirement**: DesR-003 (Layout)
- **Criterion**: encyclopeptide.com content width must be 960px maximum; wikipept.com content width must be 720px maximum
- **Measurement Method**: Measure content container max-width at desktop breakpoints; verify values match specification
- **Expected Result**: encyclopeptide.com: max-width 960px; wikipept.com: max-width 720px
- **Priority**: Must

### AC-DesR-003-2

- **Requirement**: DesR-003 (Layout)
- **Criterion**: encyclopeptide.com must use 0px border-radius (no rounded corners) on cards, buttons, and containers
- **Measurement Method**: Inspect border-radius on card, button, and container components; verify all are 0px
- **Expected Result**: All border-radius values are 0px on encyclopeptide.com
- **Priority**: Must

### AC-DesR-003-3

- **Requirement**: DesR-003 (Layout)
- **Criterion**: wikipept.com must use 16px border-radius on cards and 8px border-radius on buttons
- **Measurement Method**: Inspect border-radius on card and button components; verify values match specification
- **Expected Result**: Cards: border-radius 16px; Buttons: border-radius 8px
- **Priority**: Must

### AC-DesR-004-1

- **Requirement**: DesR-004 (Component Design - Buttons)
- **Criterion**: encyclopeptide.com buttons must be rectangular with no border-radius, thin borders, and no fill on secondary variants
- **Measurement Method**: Inspect button component styles; verify border-radius, border, and background properties
- **Expected Result**: border-radius: 0px; border: 1px solid; secondary buttons: background: transparent
- **Priority**: Should

### AC-DesR-004-2

- **Requirement**: DesR-004 (Component Design - Buttons)
- **Criterion**: wikipept.com buttons must have 8px border-radius, solid fill, and hover elevation effect
- **Measurement Method**: Inspect button component styles; verify border-radius, background, and box-shadow on hover
- **Expected Result**: border-radius: 8px; solid background color; hover state adds box-shadow for elevation
- **Priority**: Should

### AC-DesR-005-1

- **Requirement**: DesR-005 (Component Design - Cards)
- **Criterion**: wikipept.com cards must have 16px border-radius, 8px padding, and shadow `0 2px 8px rgba(0,0,0,0.08)`
- **Measurement Method**: Inspect card component styles; verify border-radius, padding, and box-shadow values
- **Expected Result**: border-radius: 16px; padding: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08)
- **Priority**: Should

### AC-DesR-005-2

- **Requirement**: DesR-005 (Component Design - Cards)
- **Criterion**: encyclopeptide.com cards must have 0px border-radius, 1px solid border, and subtle shadow
- **Measurement Method**: Inspect card component styles; verify border-radius, border, and box-shadow values
- **Expected Result**: border-radius: 0px; border: 1px solid var(--color-border); subtle shadow
- **Priority**: Should

### AC-DesR-006-1

- **Requirement**: DesR-006 (Responsive Breakpoints)
- **Criterion**: Mobile-first responsive design must use breakpoints: sm=640px, md=768px, lg=1024px, xl=1280px, 2xl=1536px
- **Measurement Method**: Verify Tailwind config contains exact breakpoint values; test layout changes at each breakpoint
- **Expected Result**: Layout changes occur at exact breakpoint values; no layout changes between breakpoints
- **Priority**: Must

### AC-DesR-007-1

- **Requirement**: DesR-007 (Spacing)
- **Criterion**: Minimum section gap must be 24px on encyclopeptide.com; consistent spacing scale must be used throughout
- **Measurement Method**: Measure vertical gaps between sections; verify minimum 24px; verify spacing follows defined scale
- **Expected Result**: All section gaps ≥24px; spacing values are multiples of the base spacing unit
- **Priority**: Should

### AC-DesR-008-1

- **Requirement**: DesR-008 (Loading States)
- **Criterion**: All async operations (data fetches, search queries, form submissions) must display loading indicators within 200ms of initiation
- **Measurement Method**: Playwright test: trigger async operations; verify loading indicator appears within 200ms; verify loading indicator disappears on completion
- **Expected Result**: Loading indicator visible within 200ms of operation start; disappears within 100ms of operation completion
- **Priority**: Should

---

## 6. Security Acceptance Criteria

### AC-SR-001-1

- **Requirement**: SR-001 (Input Validation)
- **Criterion**: All user inputs (wiki edits, search queries, form fields) must be validated and sanitized on the server side before processing
- **Measurement Method**: Submit malicious input payloads (XSS scripts, SQL injection strings, oversized inputs) to all input endpoints; verify they are rejected or sanitized
- **Expected Result**: XSS payloads rejected or escaped; SQL injection attempts fail gracefully; oversized inputs rejected with 413 or 400 status
- **Priority**: Must

### AC-SR-002-1

- **Requirement**: SR-002 (Authentication)
- **Criterion**: wikipept.com user authentication must use OAuth 2.0 / OpenID Connect with support for MFA
- **Measurement Method**: Verify OAuth 2.0 flow implementation; test login with MFA enabled; verify JWT token structure and expiration
- **Expected Result**: OAuth 2.0 authorization code flow implemented; JWT tokens contain sub, exp, iat claims; MFA required for admin accounts; tokens expire within 24 hours
- **Priority**: Must

### AC-SR-002-2

- **Requirement**: SR-002 (Authentication)
- **Criterion**: Failed login attempts must be rate-limited: 5 attempts per 15-minute window per IP address; account lockout after 10 consecutive failures
- **Measurement Method**: Submit 10 failed login attempts from same IP; verify rate limiting kicks in at attempt 5; verify account lockout at attempt 10
- **Expected Result**: Attempts 1-4 succeed normally; attempt 5 returns 429 Too Many Requests; attempt 10 returns 403 with lockout message; lockout duration ≥15 minutes
- **Priority**: Must

### AC-SR-003-1

- **Requirement**: SR-003 (Password Security)
- **Criterion**: Passwords must be hashed using bcrypt (cost factor ≥12) or argon2id before storage; plaintext passwords must never be stored or logged
- **Measurement Method**: Create user account; inspect D1 database record; verify password field contains bcrypt/argon2 hash; verify plaintext password not in logs
- **Expected Result**: Database contains bcrypt hash (starting with `$2b$` or `$2a$`) or argon2id hash (starting with `$argon2id$`); plaintext password absent from all storage and logs
- **Priority**: Must

### AC-SR-004-1

- **Requirement**: SR-004 (Authorization / RBAC)
- **Criterion**: Role-based access control must enforce: viewer (read-only), editor (create/edit own), moderator (edit all, review), admin (full access)
- **Measurement Method**: Test each role's permissions: viewer cannot edit; editor can edit own but not others'; moderator can edit all; admin can manage users
- **Expected Result**: Each role restricted to its defined permissions; privilege escalation attempts are rejected with 403
- **Priority**: Must

### AC-SR-005-1

- **Requirement**: SR-005 (CSRF Protection)
- **Criterion**: All state-changing operations (POST, PUT, DELETE) must require valid CSRF token
- **Measurement Method**: Submit state-changing request without CSRF token; verify 403 response; submit with valid token; verify success
- **Expected Result**: Requests without CSRF token return 403; requests with valid token succeed
- **Priority**: Must

### AC-SR-006-1

- **Requirement**: SR-006 (API Rate Limiting)
- **Criterion**: API endpoints must enforce rate limiting: 100 requests/minute for authenticated users, 30 requests/minute for unauthenticated users
- **Measurement Method**: Send 150 rapid requests as authenticated user; verify rate limiting at 100; send 50 rapid requests as unauthenticated user; verify rate limiting at 30
- **Expected Result**: Authenticated: requests 1-100 succeed; 101+ return 429. Unauthenticated: requests 1-30 succeed; 31+ return 429
- **Priority**: Must

### AC-SR-007-1

- **Requirement**: SR-007 (Dependency Scanning)
- **Criterion**: npm dependencies must be scanned for known vulnerabilities; critical and high vulnerabilities must block deployment
- **Measurement Method**: Run `pnpm audit` in CI/CD pipeline; verify critical/high vulnerabilities cause pipeline failure; verify medium/low vulnerabilities produce warnings
- **Expected Result**: Critical/high vulnerabilities: pipeline fails (exit code ≠ 0); medium/low: warnings logged but pipeline continues
- **Priority**: Must

### AC-SR-008-1

- **Requirement**: SR-008 (Session Security)
- **Criterion**: Session cookies must be Secure, HttpOnly, SameSite=Lax, with configurable expiration (default 24 hours)
- **Measurement Method**: Inspect Set-Cookie header on authentication response; verify all cookie attributes
- **Expected Result**: Cookie attributes: Secure; HttpOnly; SameSite=Lax; Max-Age=86400 (24 hours)
- **Priority**: Must

### AC-SR-009-1

- **Requirement**: SR-009 (Community Content Sanitization)
- **Criterion**: User-generated wiki content must be sanitized to prevent XSS while preserving safe HTML (bold, italic, links, lists, code blocks)
- **Measurement Method**: Submit wiki edit containing `<script>alert('xss')</script>`, `<img onerror="alert(1)">`, `<a href="javascript:alert(1)">`; verify scripts stripped; verify safe HTML preserved
- **Expected Result**: `<script>` tags stripped; `onerror` attributes stripped; `javascript:` hrefs stripped; `<b>`, `<i>`, `<a href="https://...">`, `<code>` preserved
- **Priority**: Must

### AC-SR-010-1

- **Requirement**: SR-010 (Audit Logging)
- **Criterion**: All administrative actions, user authentication events, and content modifications must be logged with timestamp, user ID, action type, and affected resource
- **Measurement Method**: Perform admin action (user role change); perform login; perform content edit; query audit log; verify entries exist for all three actions
- **Expected Result**: Audit log contains entries with: timestamp (ISO 8601), userId, actionType (enum), resourceId, ipAddress, userAgent
- **Priority**: Must

---

## 7. Compliance Acceptance Criteria

### AC-CR-001-1

- **Requirement**: CR-001 (GDPR Compliance)
- **Criterion**: Privacy notice must be accessible from every page footer; must disclose: data collected, purpose, legal basis, retention period, third-party sharing, and data subject rights
- **Measurement Method**: Navigate to privacy notice via footer link; verify all required disclosures are present; verify notice is available in all supported languages
- **Expected Result**: Privacy notice accessible from footer on all pages; contains all GDPR Article 13 required information; available in EN, ZH, RU, DE, FR, JP
- **Priority**: Must

### AC-CR-001-2

- **Requirement**: CR-001 (GDPR Compliance)
- **Criterion**: Data subject rights mechanisms must be implemented: access, rectification, erasure, portability, and objection
- **Measurement Method**: As authenticated user, request data export; request account deletion; verify export contains all user data; verify deletion removes all personal data
- **Expected Result**: Data export returns JSON with all user data within 72 hours; account deletion removes all personal data within 30 days; confirmation email sent
- **Priority**: Must

### AC-CR-001-3

- **Requirement**: CR-001 (GDPR Compliance)
- **Criterion**: User consent must be explicitly collected before processing personal data for non-essential purposes (analytics, marketing); consent must be freely given, specific, informed, and unambiguous
- **Measurement Method**: Visit site as new user; verify no non-essential cookies/scripts execute before consent; verify consent banner/flow is presented; verify consent can be withdrawn
- **Expected Result**: No non-essential tracking before consent; consent banner clearly states purposes; consent can be withdrawn via preference center; withdrawal takes effect immediately
- **Priority**: Must

### AC-CR-002-1

- **Requirement**: CR-002 (CCPA Compliance)
- **Criterion**: "Do Not Sell My Personal Information" link must be present in site footer on both sites
- **Measurement Method**: Navigate to any page; verify footer contains "Do Not Sell My Personal Information" link; verify link leads to functional opt-out page
- **Expected Result**: Link present in footer; link navigates to opt-out page; opt-out preference is recorded and enforced
- **Priority**: Must

### AC-CR-002-2

- **Requirement**: CR-002 (CCPA Compliance)
- **Criterion**: California consumers must be able to request disclosure of personal information collected, sources, purposes, and third-party sharing
- **Measurement Method**: Submit data access request via designated mechanism; verify response within 45 days; verify response covers all CCPA §1798.110 requirements
- **Expected Result**: Response within 45 days; contains categories of PI collected, sources, purposes, third parties; provided in readily usable format
- **Priority**: Must

### AC-CR-003-1

- **Requirement**: CR-003 (WCAG 2.1 AA Compliance)
- **Criterion**: Both sites must achieve WCAG 2.1 Level AA conformance as measured by axe-core automated testing and manual expert evaluation
- **Measurement Method**: Run axe-core on all page types; manual WCAG 2.1 conformance evaluation by certified accessibility specialist
- **Expected Result**: axe-core reports zero violations on all pages; manual evaluation confirms AA conformance; VPAT/ACR document completed
- **Priority**: Must

### AC-CR-003-2

- **Requirement**: CR-003 (WCAG 2.1 AA Compliance)
- **Criterion**: 3D molecular viewer must provide accessible alternatives meeting WCAG 2.1 SC 1.1.1 (Non-text Content) and SC 1.3.1 (Info and Relationships)
- **Measurement Method**: Disable WebGL; verify 2D fallback with descriptive alt text; test with screen reader; verify molecular data available in accessible format
- **Expected Result**: 2D structural image with alt text; text description of key features; molecular data table available in accessible HTML format
- **Priority**: Must

### AC-CR-004-1

- **Requirement**: CR-004 (Schema.org Compliance)
- **Criterion**: Structured data on both sites must validate against Schema.org vocabulary without errors using Google Rich Results Test
- **Measurement Method**: Submit key pages to Google Rich Results Test; verify zero errors; verify all required properties present for each schema type
- **Expected Result**: Zero Schema.org validation errors; all required properties present; rich results eligible for all tested pages
- **Priority**: Must

### AC-CR-005-1

- **Requirement**: CR-005 (IUPAC Nomenclature)
- **Criterion**: All peptide nomenclature must conform to IUPAC-IUB Joint Commission standards; amino acid codes must use standard 1-letter and 3-letter designations
- **Measurement Method**: Audit all monograph content for nomenclature compliance; verify amino acid codes match IUPAC-IUB standard; verify sequence notation follows N→C convention
- **Expected Result**: 100% of amino acid codes match IUPAC-IUB standard; all sequences use N→C convention; all modifications use standard notation
- **Priority**: Must

---

## Appendix A: Summary Statistics

| Category             | Must   | Should | Could | Total   |
| -------------------- | ------ | ------ | ----- | ------- |
| Functional (FR)      | 30     | 14     | 0     | 44      |
| Non-Functional (NFR) | 22     | 4      | 1     | 27      |
| Data (DR)            | 5      | 4      | 0     | 9       |
| Integration (IR)     | 10     | 4      | 0     | 14      |
| Design (DesR)        | 8      | 8      | 0     | 16      |
| Security (SR)        | 10     | 0      | 0     | 10      |
| Compliance (CR)      | 7      | 0      | 0     | 7       |
| **Total**            | **92** | **34** | **1** | **130** |

---

**End of Acceptance Criteria Specification**

_This document is version-controlled. Changes require review by the project lead. Acceptance criteria are derived from capability requirements (CAP-REQ-001) and applicable standards (STD-MAP-001)._
