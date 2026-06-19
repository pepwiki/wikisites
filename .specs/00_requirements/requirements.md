# Wikisites Requirements Specification

**Version:** 1.0.0
**Date:** 2026-06-19
**Standard:** EARS (Easy Approach to Requirements Syntax)
**Scope:** Transform Wikisites into a maximal, power-user viewer ("VS Code for content")

---

## P0: Power User Shell (Core Identity)

REQ-P0-001: Command Palette Activation
WHILE the user presses Ctrl+Shift+P (or Cmd+Shift+P on macOS), THE SYSTEM SHALL display a modal command palette overlay listing all available site actions.
RATIONALE: Core power-user interaction pattern; enables keyboard-driven navigation without mouse.
PRIORITY: Must
STANDARD: WCAG 2.1 AA — 2.1.1 Keyboard
ACCEPTANCE_CRITERIA:
- Palette opens within 100ms of keypress
- Palette displays when Ctrl+Shift+P is pressed on any page
- Palette closes on Escape key
- Palette closes on click outside
- Focus is trapped within the palette while open
- Palette is dismissible and does not interfere with page content

REQ-P0-002: Command Palette Search
WHILE the command palette is open, THE SYSTEM SHALL filter available commands in real-time as the user types, matching against command names, aliases, and descriptions.
RATIONALE: Efficient command discovery; power users expect fuzzy matching.
PRIORITY: Must
STANDARD: WCAG 2.1 AA — 3.3.2 Labels or Instructions
ACCEPTANCE_CRITERIA:
- Typing "nav" filters to navigation-related commands
- Typing "dark" filters to theme-related commands
- Filter results update within 50ms of keystroke
- Minimum 3 commands visible at any time (scrollable if more)
- Each result shows command name, keyboard shortcut (if any), and category

REQ-P0-003: Command Palette Execution
WHILE the user selects a command from the palette (via click or Enter), THE SYSTEM SHALL execute the associated action and close the palette.
RATIONALE: Completes the command loop; action must follow selection.
PRIORITY: Must
STANDARD: WCAG 2.1 AA — 4.1.2 Name, Role, Value
ACCEPTANCE_CRITERIA:
- Enter key executes the highlighted command
- Mouse click executes the selected command
- Palette closes within 50ms after execution
- Executed action produces visible result (navigation, toggle, modal, etc.)
- Focus returns to the previously focused element after palette closes

REQ-P0-004: Command Palette Categories
THE SYSTEM SHALL organize commands into categories: Navigation, Appearance, Content Tools, Search, Learning, and System.
RATIONALE: Grouped commands improve discoverability and reduce cognitive load.
PRIORITY: Should
STANDARD: N/A
ACCEPTANCE_CRITERIA:
- Each command belongs to exactly one category
- Categories are displayed as section headers in the palette
- At least 3 commands exist per category at launch
- New features can be added to categories without modifying core palette logic

REQ-P0-005: Global Keyboard Shortcuts
THE SYSTEM SHALL support keyboard shortcuts for all primary navigation actions (go to home, go to search, go to flashcards, go to quizzes, go to settings, toggle theme).
RATIONALE: Keyboard-only navigation is the core power-user value proposition.
PRIORITY: Must
STANDARD: WCAG 2.1 AA — 2.1.1 Keyboard
ACCEPTANCE_CRITERIA:
- ? or / opens search
- g then h navigates to home
- g then f navigates to flashcards
- g then q navigates to quizzes
- g then s navigates to settings
- t toggles dark/light mode
- All shortcuts work without conflicts with browser or screen reader shortcuts
- Shortcut hints are visible in the command palette

REQ-P0-006: Shortcut Reference Panel
WHILE the user presses ? (shift+/) on any page, THE SYSTEM SHALL display a keyboard shortcut reference panel listing all available shortcuts grouped by category.
RATIONALE: Users cannot use shortcuts they don't know exist; discoverability is critical.
PRIORITY: Must
STANDARD: WCAG 2.1 AA — 3.3.2 Labels or Instructions
ACCEPTANCE_CRITERIA:
- Panel opens within 100ms
- Panel lists all shortcuts with key combinations and descriptions
- Panel is scrollable if content exceeds viewport
- Panel closes on Escape
- Panel is keyboard-navigable (Tab through shortcuts)
- Panel includes a note about shortcut customization (if applicable)

REQ-P0-007: Outline Panel
WHILE the user clicks the outline/minimap button (or presses a keyboard shortcut), THE SYSTEM SHALL display a side panel showing the document's heading hierarchy as a navigable tree.
RATIONALE: Long articles require structural navigation; outline enables quick scanning.
PRIORITY: Must
STANDARD: WCAG 2.1 AA — 1.3.1 Info and Relationships
ACCEPTANCE_CRITERIA:
- Outline panel renders headings (h1-h6) as a nested tree
- Clicking a heading scrolls the viewport to that section
- Current section is highlighted based on scroll position
- Panel is collapsible/expandable
- Panel persists its open/closed state across page navigation (within session)
- Panel works on all article pages (both encp and wiki)

REQ-P0-008: Breadcrumb Navigation
THE SYSTEM SHALL display breadcrumb navigation at the top of every content page showing the full path from site root to the current page.
RATIONALE: Deep content hierarchies require orientation; breadcrumbs prevent "lost in hyperspace."
PRIORITY: Must
STANDARD: WCAG 2.1 AA — 2.4.8 Location
ACCEPTANCE_CRITERIA:
- Breadcrumbs show: Home > Section > Subsection > Current Page
- Each breadcrumb segment is a clickable link
- Current page segment is visually distinct (non-link, aria-current="page")
- Breadcrumbs truncate with ellipsis for paths longer than 4 segments (with full path on hover/focus)
- Breadcrumbs are present on every content page
- Breadcrumbs use structured data (BreadcrumbList schema.org)

REQ-P0-009: Focus Management
THE SYSTEM SHALL manage focus correctly across all modals, panels, and overlays (command palette, shortcut panel, outline panel, settings modal).
RATIONALE: Focus traps and restoration are WCAG requirements and power-user expectations.
PRIORITY: Must
STANDARD: WCAG 2.1 AA — 2.4.3 Focus Order
ACCEPTANCE_CRITERIA:
- Opening a modal moves focus to the first interactive element within it
- Tab key cycles through interactive elements within the modal (focus trap)
- Shift+Tab cycles backwards
- Closing a modal returns focus to the element that triggered it
- Escape key closes any open modal/panel
- No focus is lost when panels open/close

REQ-P0-010: Skip Links
THE SYSTEM SHALL provide skip links at the top of every page allowing users to jump to main content, navigation, or search.
RATIONALE: Essential for keyboard and screen reader users to bypass repetitive navigation.
PRIORITY: Must
STANDARD: WCAG 2.1 AA — 2.4.1 Bypass Blocks
ACCEPTANCE_CRITERIA:
- Skip links are the first focusable elements on every page
- "Skip to main content" links targets the main content area
- "Skip to search" links targets the search input
- Skip links become visible on focus (hidden by default)
- Skip links work on both encp and wiki sites

---

## P1: Content Tools

REQ-P1-001: LaTeX/KaTeX Math Rendering
THE SYSTEM SHALL render LaTeX mathematical expressions using KaTeX in all MDX article content.
RATIONALE: Academic content requires mathematical notation; KaTeX is the fastest client-side renderer.
PRIORITY: Must
STANDARD: N/A
ACCEPTANCE_CRITERIA:
- Inline math ($...$) renders correctly
- Block math ($$...$$) renders correctly
- KaTeX loads within 200ms on pages with math content
- Math renders correctly in both light and dark modes
- Math is accessible (MathML fallback or aria-label)
- KaTeX CSS is bundled (not fetched from CDN) for offline support

REQ-P1-002: Knowledge Graph View
WHILE the user activates the graph view (via command palette or sidebar button), THE SYSTEM SHALL display an interactive node-link graph of article relationships based on internal links and shared tags.
RATIONALE: Visual knowledge mapping enables discovery of related content; Obsidian-style graph is a power-user favorite.
PRIORITY: Should
STANDARD: N/A
ACCEPTANCE_CRITERIA:
- Graph renders within 2 seconds for up to 500 nodes
- Nodes represent articles; edges represent links between them
- Node size reflects backlink count
- Clicking a node navigates to that article
- Graph supports zoom (scroll wheel) and pan (drag)
- Current article is highlighted in the graph
- Graph filters by tag/category
- Graph degrades gracefully if >500 nodes (pagination or density threshold)

REQ-P1-003: Split Pane View
WHILE the user activates split view (via command palette or drag handle), THE SYSTEM SHALL display two content panes side-by-side, each showing an independent article.
RATIONALE: Side-by-side comparison is essential for research and learning workflows.
PRIORITY: Should
STANDARD: N/A
ACCEPTANCE_CRITERIA:
- Split view divides viewport 50/50 by default
- Divider is draggable to resize panes (min 25% each side)
- Each pane has independent scroll
- Each pane has a URL or article selector
- Command palette can open an article in the left or right pane
- Split view state persists across page reloads (session storage)
- Split view works on screens >= 1024px wide; falls back to single pane on smaller screens

REQ-P1-004: Regex Search
WHILE the user activates regex search mode in the search interface, THE SYSTEM SHALL interpret the search query as a regular expression and return matching content.
RATIONALE: Power users need pattern-based search for technical content (e.g., finding all peptide sequences matching a pattern).
PRIORITY: Should
STANDARD: N/A
ACCEPTANCE_CRITERIA:
- Toggle button switches between literal and regex search modes
- Regex syntax errors display a user-friendly error message (not a crash)
- Regex search returns results within 500ms for <1000 articles
- Matched text is highlighted in search results
- Regex flags (i, g, m) can be toggled in the search UI
- Regex search works offline with Pagefind index

REQ-P1-005: Advanced Search Filters
THE SYSTEM SHALL provide search filters for content type (article, quiz, flashcard, glossary), topic/tag, difficulty level, and date range.
RATIONALE: As content scales to 500+ articles, filtering becomes essential for findability.
PRIORITY: Should
STANDARD: N/A
ACCEPTANCE_CRITERIA:
- Filter chips are visible above search results
- Filters can be combined (AND logic)
- Filter state is reflected in the URL (shareable)
- Filters work offline with Pagefind index
- Filter counts update in real-time as filters are applied
- Clear all filters button is available

REQ-P1-006: Table of Contents Scroll Spy
WHILE the user scrolls through an article, THE SYSTEM SHALL highlight the current heading in the outline panel based on scroll position.
RATIONALE: Users need to know where they are in a long document; scroll spy provides orientation.
PRIORITY: Should
STANDARD: WCAG 2.1 AA — 2.4.8 Location
ACCEPTANCE_CRITERIA:
- Current heading is highlighted within 100px of viewport top
- Highlight updates smoothly as user scrolls
- Works with headings at any depth (h1-h6)
- Works with dynamically loaded content (lazy sections)

REQ-P1-007: Reading Time Estimate
THE SYSTEM SHALL display an estimated reading time at the top of each article based on word count and average reading speed (250 WPM).
RATIONALE: Users need to assess time commitment before reading.
PRIORITY: Could
STANDARD: N/A
ACCEPTANCE_CRITERIA:
- Reading time is displayed near the article title
- Estimate is within +/- 20% of actual reading time for a typical reader
- Reading time accounts for images (adds ~10s per image)
- Reading time is not displayed for quiz/flashcard pages

---

## P2: Social Layer

REQ-P2-001: Comment System
THE SYSTEM SHALL provide a comment system on article pages allowing authenticated users to post, reply to, and like comments.
RATIONALE: Community engagement transforms passive readers into active contributors.
PRIORITY: Should
STANDARD: OWASP Top 10 — A03:2021 Injection
ACCEPTANCE_CRITERIA:
- Comments display below article content
- Unauthenticated users see comments but cannot post
- Comments support Markdown formatting (sanitized)
- Comments support nested replies (max 3 levels)
- Comments are sortable by newest, oldest, most liked
- Comment count is displayed on article cards
- Comments load lazily (not blocking article render)
- XSS protection: all comment content is sanitized server-side

REQ-P2-002: Annotation Layer
WHILE the user selects text in an article, THE SYSTEM SHALL display a contextual tooltip offering "Annotate" action, and user annotations are displayed as highlighted text with sidebar notes.
RATIONALE: Annotations enable personal and collaborative knowledge layering on top of content.
PRIORITY: Could
STANDARD: N/A
ACCEPTANCE_CRITERIA:
- Text selection shows annotation tooltip within 200ms
- Annotation tooltip appears within 50px of selection
- Annotations are stored per-user in D1
- Annotations display as highlighted background with click-to-expand note
- Annotations can be shared (public) or private
- Annotation count is shown in article header
- Annotations work offline (cached locally, synced on reconnect)

REQ-P2-003: User Accounts
THE SYSTEM SHALL provide user registration and authentication via OAuth (GitHub, Google) with role-based access (reader, contributor, moderator, admin).
RATIONALE: User identity is required for comments, annotations, and personalized features.
PRIORITY: Should
STANDARD: OWASP Top 10 — A07:2021 Identification and Authentication Failures
ACCEPTANCE_CRITERIA:
- Registration via OAuth completes within 3 clicks
- Session persists across browser tabs (JWT in httpOnly cookie)
- Roles are enforced server-side (not just client-side)
- Account settings page allows profile editing (display name, avatar)
- Account deletion request triggers GDPR data erasure
- Rate limiting on auth endpoints (5 attempts/minute)
- CSRF protection on all state-changing endpoints

REQ-P2-004: User Profiles
THE SYSTEM SHALL display a public user profile page showing display name, avatar, contribution count (articles, comments, annotations), and join date.
RATIONALE: Profiles create social identity and recognition for contributors.
PRIORITY: Could
STANDARD: N/A
ACCEPTANCE_CRITERIA:
- Profile page is accessible at /users/:username
- Profile displays avatar (from OAuth provider or uploaded)
- Profile shows contribution stats (comments, annotations, flashcards mastered)
- Profile privacy settings control visibility (public/private)
- Profile pages are crawlable by search engines (public profiles only)

REQ-P2-005: Like/Reaction System
THE SYSTEM SHALL allow authenticated users to like comments and annotations.
RATIONALE: Lightweight engagement mechanism; reduces noise vs. full reply.
PRIORITY: Could
STANDARD: N/A
ACCEPTANCE_CRITERIA:
- Like button toggles like/unlike
- Like count updates optimistically
- Duplicate likes are prevented (one per user)
- Like counts are cached in KV for performance

---

## P3: Editor

REQ-P3-001: Web-Based MDX Editor
THE SYSTEM SHALL provide a browser-based MDX editor for authenticated contributors to create and edit article content.
RATIONALE: Lowers the barrier to content contribution; no local toolchain required.
PRIORITY: Could
STANDARD: OWASP Top 10 — A04:2021 Insecure Design
ACCEPTANCE_CRITERIA:
- Editor supports MDX syntax with live preview
- Editor supports syntax highlighting for Markdown, code blocks, and MDX components
- Editor auto-saves draft every 30 seconds
- Editor validates frontmatter against Zod schema before save
- Editor supports image upload (via R2 or Cloudflare Images)
- Editor supports keyboard shortcuts (bold, italic, heading, link, code block)
- Editor renders LaTeX/KaTeX in preview
- Editor is accessible (keyboard-navigable, screen reader compatible)

REQ-P3-002: Version History
THE SYSTEM SHALL maintain a version history for each article, allowing users to view, compare, and revert to previous versions.
RATIONALE: Version history prevents accidental content loss and enables collaborative editing.
PRIORITY: Could
STANDARD: N/A
ACCEPTANCE_CRITERIA:
- Each save creates a versioned snapshot
- Version list shows timestamp, author, and diff summary
- Visual diff highlights additions (green) and deletions (red)
- User can revert to any previous version (with confirmation)
- Version history retains at least 50 versions per article
- Diff view renders within 1 second for articles up to 10,000 words

REQ-P3-003: Content Validation
THE SYSTEM SHALL validate all submitted content against Zod schemas before publishing, rejecting invalid content with specific error messages.
RATIONALE: Prevents malformed content from reaching production; maintains quality.
PRIORITY: Should
STANDARD: OWASP Top 10 — A04:2021 Insecure Design
ACCEPTANCE_CRITERIA:
- Frontmatter is validated against article schema (title, tags, date, etc.)
- MDX body is checked for prohibited patterns (script injection, etc.)
- Validation errors are displayed with line numbers
- Content is not published until all validation errors are resolved
- Validation runs both client-side (instant feedback) and server-side (enforcement)

---

## P4: Extensibility

REQ-P4-001: Plugin API
THE SYSTEM SHALL expose a plugin API allowing users to register custom components, commands, and themes via a JSON configuration file.
RATIONALE: Extensibility is the differentiator for power users; enables community contributions.
PRIORITY: Could
STANDARD: N/A
ACCEPTANCE_CRITERIA:
- Plugin config file is validated against a JSON schema
- Plugins can register new commands in the command palette
- Plugins can register new components rendered in article content
- Plugins can register custom themes
- Plugins are sandboxed (cannot access other plugins or core state)
- Plugin loading does not block page render (async/deferred)
- Plugin errors are caught and logged without breaking the page

REQ-P4-002: Custom Theme System
THE SYSTEM SHALL allow users to customize the site's appearance via CSS custom properties, with a theme editor UI.
RATIONALE: Personalization increases engagement; CSS variables enable zero-build customization.
PRIORITY: Could
STANDARD: N/A
ACCEPTANCE_CRITERIA:
- Theme editor provides controls for: primary color, background, text, accent, border, font
- Changes are applied in real-time via CSS custom properties
- Themes are stored in localStorage and persist across sessions
- Theme export produces a JSON file; import restores it
- Predefined themes are available (Default Light, Default Dark, High Contrast, Solarized)
- Custom themes do not break accessibility (contrast ratio checks)

REQ-P4-003: Settings Export/Import
THE SYSTEM SHALL allow users to export all settings (theme, shortcuts, annotations, preferences) as a JSON file and import them on another device.
RATIONALE: Power users customize extensively; portability prevents lock-in.
PRIORITY: Could
STANDARD: N/A
ACCEPTANCE_CRITERIA:
- Export produces a valid JSON file downloadable via browser
- Import validates the JSON structure before applying
- Import merges with or overwrites existing settings (user choice)
- Export includes: theme, keyboard shortcuts, review progress, annotations, preferences
- Import handles partial exports gracefully (defaults for missing fields)

REQ-P4-004: Settings Schema Validation
THE SYSTEM SHALL validate all settings against a Zod schema on import and at application startup.
RATIONALE: Prevents corrupted settings from breaking the UI.
PRIORITY: Should
STANDARD: N/A
ACCEPTANCE_CRITERIA:
- Invalid settings are rejected with a clear error message
- Corrupted settings are reset to defaults (with user notification)
- Schema validation runs in < 10ms
- Schema is versioned to handle migrations across releases

---

## Cross-Cutting: Performance

REQ-PERF-001: Initial Load Performance
THE SYSTEM SHALL achieve a Largest Contentful Paint (LCP) of < 2.5 seconds and a First Input Delay (FID) of < 100ms on a 4G connection.
RATIONALE: Performance is a competitive advantage; current Lighthouse score is 90+.
PRIORITY: Must
STANDARD: Core Web Vitals
ACCEPTANCE_CRITERIA:
- LCP < 2.5s on mobile (Lighthouse)
- FID < 100ms on mobile
- CLS < 0.1 on mobile
- Time to Interactive < 3.5s on mobile
- Bundle size increase < 50KB per feature tier

REQ-PERF-002: Search Performance
THE SYSTEM SHALL return search results within 200ms for queries on a dataset of up to 500 articles.
RATIONALE: Search is the primary navigation method for power users; slow search kills workflow.
PRIORITY: Must
STANDARD: N/A
ACCEPTANCE_CRITERIA:
- Search results appear within 200ms of query completion
- Search works offline (Pagefind WASM)
- Search index is < 500KB gzipped for 500 articles
- Progressive search results (show matches as they're found)

REQ-PERF-003: Command Palette Performance
THE SYSTEM SHALL open the command palette and display results within 100ms of the activation keypress.
RATIONALE: The command palette must feel instant to be adopted by power users.
PRIORITY: Must
STANDARD: N/A
ACCEPTANCE_CRITERIA:
- Palette opens within 100ms
- Command list is pre-indexed (no computation on open)
- Filtering results update within 50ms
- Palette works offline

REQ-PERF-004: Bundle Size Budget
THE SYSTEM SHALL maintain a total JavaScript bundle size < 300KB gzipped per page (excluding Pagefind index).
RATIONALE: Bundle size directly impacts load time on mobile and low-bandwidth connections.
PRIORITY: Should
STANDARD: N/A
ACCEPTANCE_CRITERIA:
- Each feature tier adds < 50KB gzipped
- Code splitting ensures only required features are loaded per page
- Heavy components (graph viewer, diff viewer) are lazy-loaded
- Bundle size is tracked in CI (build size regression check)

---

## Cross-Cutting: Accessibility

REQ-A11Y-001: WCAG 2.1 AA Compliance
THE SYSTEM SHALL conform to all Level A and Level AA success criteria of WCAG 2.1.
RATIONALE: Accessibility is a legal requirement in many jurisdictions and a competitive advantage.
PRIORITY: Must
STANDARD: WCAG 2.1 AA
ACCEPTANCE_CRITERIA:
- axe-core audit passes with 0 violations on all pages
- All images have descriptive alt text
- All interactive elements are keyboard-navigable
- Color contrast ratio >= 4.5:1 for normal text, >= 3:1 for large text
- All ARIA attributes are valid and meaningful
- Screen reader testing passes on NVDA/VoiceOver

REQ-A11Y-002: Reduced Motion Support
THE SYSTEM SHALL respect the prefers-reduced-motion media query by disabling all non-essential animations.
RATIONALE: Essential for users with vestibular disorders; already partially implemented.
PRIORITY: Must
STANDARD: WCAG 2.1 AA — 2.3.3 Animation from Interactions
ACCEPTANCE_CRITERIA:
- All transitions and animations are disabled when prefers-reduced-motion: reduce
- No auto-playing animations exist
- Graph viewer, split view transitions, and panel animations all respect this setting

REQ-A11Y-003: High Contrast Mode
THE SYSTEM SHALL support Windows High Contrast Mode and provide a high-contrast theme option.
RATIONALE: Some users require enhanced contrast beyond standard dark/light modes.
PRIORITY: Should
STANDARD: WCAG 2.1 AA — 1.4.11 Non-text Contrast
ACCEPTANCE_CRITERIA:
- High contrast theme meets 7:1 contrast ratio
- All UI elements remain visible in Windows High Contrast Mode
- High contrast theme is selectable from settings and command palette

---

## Cross-Cutting: Security

REQ-SEC-001: Content Security Policy
THE SYSTEM SHALL enforce a Content Security Policy (CSP) that prevents XSS, clickjacking, and code injection attacks.
RATIONALE: CSP is the primary defense against XSS in a content-heavy site.
PRIORITY: Must
STANDARD: OWASP Top 10 — A03:2021 Injection
ACCEPTANCE_CRITERIA:
- CSP header is set on all responses
- Script-src allows only self and KaTeX CDN (if used)
- Style-src allows only self and inline styles (with nonce)
- No unsafe-inline or unsafe-eval in production
- CSP violations are reported to a logging endpoint

REQ-SEC-002: Input Sanitization
THE SYSTEM SHALL sanitize all user-generated content (comments, annotations, profile data) using a whitelist-based HTML sanitizer.
RATIONALE: Prevents stored XSS from user-generated content.
PRIORITY: Must
STANDARD: OWASP Top 10 — A03:2021 Injection
ACCEPTANCE_CRITERIA:
- HTML tags are stripped from user input (only Markdown allowed)
- Script, iframe, object, embed tags are always stripped
- URLs are validated (no javascript: protocol)
- Sanitization runs server-side (not just client-side)
- Sanitization is tested against OWASP XSS cheat sheet vectors

REQ-SEC-003: Rate Limiting
THE SYSTEM SHALL enforce rate limits on all API endpoints: 100 req/min for authenticated, 20 req/min for unauthenticated.
RATIONALE: Prevents abuse and ensures service availability.
PRIORITY: Must
STANDARD: OWASP Top 10 — A05:2021 Security Misconfiguration
ACCEPTANCE_CRITERIA:
- Rate limits are enforced via Cloudflare Workers
- Rate limit headers (X-RateLimit-*) are included in responses
- 429 Too Many Requests response includes Retry-After header
- Rate limits are configurable per endpoint
- Rate limit state is shared across edge instances (KV-backed)

REQ-SEC-004: CSRF Protection
THE SYSTEM SHALL use CSRF tokens on all state-changing requests (POST, PUT, DELETE).
RATIONALE: Prevents cross-site request forgery on authenticated endpoints.
PRIORITY: Must
STANDARD: OWASP Top 10 — A01:2021 Broken Access Control
ACCEPTANCE_CRITERIA:
- CSRF token is included in all forms and AJAX state-changing requests
- Token is validated server-side on every state-changing request
- Token rotates on each session
- SameSite cookie attribute is set to Lax or Strict

---

## Cross-Cutting: i18n

REQ-I18N-001: Full i18n for All Feature Tiers
THE SYSTEM SHALL support internationalization (i18n) for all user-facing text in new features across all 4 locales (en, zh, ja, ar).
RATIONALE: i18n is a competitive advantage; all new features must maintain parity.
PRIORITY: Must
STANDARD: N/A
ACCEPTANCE_CRITERIA:
- All new UI strings use the existing i18n framework (no hardcoded strings)
- Translation keys follow the existing naming convention
- RTL layout support is maintained for Arabic
- Date/number formatting respects locale
- i18n coverage is tracked in CI (missing translation detection)

REQ-I18N-002: Locale-Aware Search
THE SYSTEM SHALL provide locale-specific search results, prioritizing content in the user's selected language.
RATIONALE: Users searching in Chinese should see Chinese content first.
PRIORITY: Should
STANDARD: N/A
ACCEPTANCE_CRITERIA:
- Search results are weighted by locale match
- User can filter search by language
- Search index is built per-locale
- Locale switching updates search results immediately

---

## Cross-Cutting: Offline Capability

REQ-OFFL-001: Offline Feature Parity
THE SYSTEM SHALL maintain offline capability for core features (reading articles, flashcards, quizzes, FSRS reviews) across all feature tiers.
RATIONALE: PWA offline support is a competitive advantage; new features must not break it.
PRIORITY: Must
STANDARD: N/A
ACCEPTANCE_CRITERIA:
- Service worker caches all static assets
- Articles are readable offline (pre-cached or cached on first visit)
- Flashcards and quizzes work offline
- FSRS review queue works offline and syncs on reconnect
- Offline indicator is displayed when network is unavailable
- New features (command palette, outline, breadcrumbs) work offline

REQ-OFFL-002: Data Sync
THE SYSTEM SHALL synchronize user data (annotations, comments, review progress) between local storage and D1 when network connectivity is restored.
RATIONALE: Offline-first requires eventual consistency; sync must be conflict-free.
PRIORITY: Should
STANDARD: N/A
ACCEPTANCE_CRITERIA:
- Sync occurs automatically when connectivity is restored
- Sync handles conflicts (last-write-wins with timestamp)
- Sync progress is displayed to the user
- Sync does not duplicate data
- Sync works for all authenticated features

---

## Requirement Index

| ID | Tier | Title | Priority |
|----|------|-------|----------|
| REQ-P0-001 | P0 | Command Palette Activation | Must |
| REQ-P0-002 | P0 | Command Palette Search | Must |
| REQ-P0-003 | P0 | Command Palette Execution | Must |
| REQ-P0-004 | P0 | Command Palette Categories | Should |
| REQ-P0-005 | P0 | Global Keyboard Shortcuts | Must |
| REQ-P0-006 | P0 | Shortcut Reference Panel | Must |
| REQ-P0-007 | P0 | Outline Panel | Must |
| REQ-P0-008 | P0 | Breadcrumb Navigation | Must |
| REQ-P0-009 | P0 | Focus Management | Must |
| REQ-P0-010 | P0 | Skip Links | Must |
| REQ-P1-001 | P1 | LaTeX/KaTeX Math Rendering | Must |
| REQ-P1-002 | P1 | Knowledge Graph View | Should |
| REQ-P1-003 | P1 | Split Pane View | Should |
| REQ-P1-004 | P1 | Regex Search | Should |
| REQ-P1-005 | P1 | Advanced Search Filters | Should |
| REQ-P1-006 | P1 | Table of Contents Scroll Spy | Should |
| REQ-P1-007 | P1 | Reading Time Estimate | Could |
| REQ-P2-001 | P2 | Comment System | Should |
| REQ-P2-002 | P2 | Annotation Layer | Could |
| REQ-P2-003 | P2 | User Accounts | Should |
| REQ-P2-004 | P2 | User Profiles | Could |
| REQ-P2-005 | P2 | Like/Reaction System | Could |
| REQ-P3-001 | P3 | Web-Based MDX Editor | Could |
| REQ-P3-002 | P3 | Version History | Could |
| REQ-P3-003 | P3 | Content Validation | Should |
| REQ-P4-001 | P4 | Plugin API | Could |
| REQ-P4-002 | P4 | Custom Theme System | Could |
| REQ-P4-003 | P4 | Settings Export/Import | Could |
| REQ-P4-004 | P4 | Settings Schema Validation | Should |
| REQ-PERF-001 | Cross | Initial Load Performance | Must |
| REQ-PERF-002 | Cross | Search Performance | Must |
| REQ-PERF-003 | Cross | Command Palette Performance | Must |
| REQ-PERF-004 | Cross | Bundle Size Budget | Should |
| REQ-A11Y-001 | Cross | WCAG 2.1 AA Compliance | Must |
| REQ-A11Y-002 | Cross | Reduced Motion Support | Must |
| REQ-A11Y-003 | Cross | High Contrast Mode | Should |
| REQ-SEC-001 | Cross | Content Security Policy | Must |
| REQ-SEC-002 | Cross | Input Sanitization | Must |
| REQ-SEC-003 | Cross | Rate Limiting | Must |
| REQ-SEC-004 | Cross | CSRF Protection | Must |
| REQ-I18N-001 | Cross | Full i18n for All Feature Tiers | Must |
| REQ-I18N-002 | Cross | Locale-Aware Search | Should |
| REQ-OFFL-001 | Cross | Offline Feature Parity | Must |
| REQ-OFFL-002 | Cross | Data Sync | Should |

**Total Requirements:** 44
**Must:** 24 | **Should:** 13 | **Could:** 7
