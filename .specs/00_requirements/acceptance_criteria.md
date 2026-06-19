# Acceptance Criteria — MUST Requirements

**Version:** 1.0.0
**Date:** 2026-06-19
**Format:** Given/When/Then (where applicable)

---

## P0: Power User Shell

### REQ-P0-001: Command Palette Activation

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | Open on Windows/Linux | User is on any page | User presses Ctrl+Shift+P | Command palette modal appears within 100ms |
| 2 | Open on macOS | User is on any page | User presses Cmd+Shift+P | Command palette modal appears within 100ms |
| 3 | Close with Escape | Command palette is open | User presses Escape | Palette closes, focus returns to previous element |
| 4 | Close on backdrop click | Command palette is open | User clicks outside the palette | Palette closes |
| 5 | Focus trap | Command palette is open | User presses Tab repeatedly | Focus cycles only through interactive elements within the palette |
| 6 | No page interference | Command palette is open | Page content is visible behind overlay | Page content remains interactive when palette closes |
| 7 | Works on all pages | User is on any page (article, quiz, flashcard, settings) | User presses Ctrl+Shift+P | Command palette opens |

### REQ-P0-002: Command Palette Search

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | Fuzzy match | Command palette is open with 20+ commands | User types "nav" | Results filter to navigation-related commands (e.g., "Go to Home", "Go to Flashcards") |
| 2 | Theme filter | Command palette is open | User types "dark" | Results show "Toggle Dark Mode" and related commands |
| 3 | Real-time update | Command palette is open | User types characters one by one | Results update within 50ms of each keystroke |
| 4 | Minimum visibility | Command palette is open with filtered results | Filter leaves 0-1 results | Palette still shows at least the input field and "No results" message |
| 5 | Result metadata | Command palette is open | Results are displayed | Each result shows: command name, keyboard shortcut (if any), and category label |
| 6 | Empty query | Command palette is open | User clears the input | All commands are displayed grouped by category |

### REQ-P0-003: Command Palette Execution

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | Enter executes | Command palette is open with a highlighted command | User presses Enter | Command executes and palette closes within 50ms |
| 2 | Click executes | Command palette is open | User clicks a command | Command executes and palette closes within 50ms |
| 3 | Focus restoration | Command palette is open and command executes | Palette closes | Focus returns to the element that had focus before palette opened |
| 4 | Navigation command | User is on /articles/leucine-enkephalin | User opens palette, types "home", presses Enter | Browser navigates to home page |
| 5 | Toggle command | User is in light mode | User opens palette, types "dark", presses Enter | Theme toggles to dark mode |

### REQ-P0-005: Global Keyboard Shortcuts

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | Search shortcut | User is on any page, not in an input field | User presses ? or / | Search interface opens or focuses |
| 2 | Go to home | User is on any page | User presses g then h (sequential) | Browser navigates to home page |
| 3 | Go to flashcards | User is on any page | User presses g then f | Browser navigates to flashcards page |
| 4 | Go to quizzes | User is on any page | User presses g then q | Browser navigates to quizzes page |
| 5 | Go to settings | User is on any page | User presses g then s | Browser navigates to settings page |
| 6 | Toggle theme | User is on any page | User presses t | Theme toggles between light and dark |
| 7 | Input field exemption | User is focused in a search input | User presses / | Character "/" is typed (shortcut does not fire) |
| 8 | No browser conflict | User is on any page | User presses Ctrl+L | Browser focus goes to address bar (shortcut does not conflict) |

### REQ-P0-006: Shortcut Reference Panel

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | Open panel | User is on any page, not in input | User presses ? (shift+/) | Shortcut reference panel appears |
| 2 | Panel content | Panel is open | User views the panel | All shortcuts listed with key combinations and descriptions, grouped by category |
| 3 | Scroll | Panel is open with many shortcuts | User scrolls | All shortcuts are accessible |
| 4 | Close with Escape | Panel is open | User presses Escape | Panel closes |
| 5 | Tab navigation | Panel is open | User presses Tab | Focus moves through shortcut entries |
| 6 | Customization note | Panel is open | User views the panel | A note indicates "Customize shortcuts in Settings" (if applicable) |

### REQ-P0-007: Outline Panel

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | Open outline | User is on an article page | User clicks outline button or uses keyboard shortcut | Outline panel appears (side panel or overlay) |
| 2 | Heading tree | Article has h2, h3, h4 headings | Outline renders | Headings display as a nested tree structure |
| 3 | Click to navigate | Outline panel is open | User clicks a heading in the outline | Page scrolls to that heading's position |
| 4 | Current section highlight | User scrolls through article | Scroll position passes a heading | That heading is highlighted in the outline panel |
| 5 | Collapse/expand | Outline panel is open | User clicks the panel toggle button | Panel collapses (hides) or expands (shows) |
| 6 | Session persistence | User opens outline panel, navigates to another article | New article loads | Outline panel remains in its previous open/closed state |
| 7 | Both sites | User is on encyclopeptide.com or wikipept.com | User activates outline | Outline panel works on both sites |

### REQ-P0-008: Breadcrumb Navigation

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | Full path display | User is on a deeply nested article | Page loads | Breadcrumbs show: Home > Section > Subsection > Current Page |
| 2 | Clickable segments | Breadcrumbs are displayed | User clicks a segment | Browser navigates to that section |
| 3 | Current page distinct | Breadcrumbs are displayed | User views the last segment | Last segment is not a link, has aria-current="page" |
| 4 | Truncation | Path has 5+ segments | Breadcrumbs render | Breadcrumbs show first 2 and last 2 segments with "..." ellipsis in between |
| 5 | Hover reveals full path | Breadcrumbs are truncated | User hovers/focuses the "..." | Full path is revealed (tooltip or expansion) |
| 6 | Schema.org | Breadcrumbs are displayed | An inspector views the page source | BreadcrumbList structured data is present |
| 7 | All pages | User navigates to any content page | Page loads | Breadcrumbs are present at the top |

### REQ-P0-009: Focus Management

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | Modal focus entry | A modal (command palette, settings) is triggered | Modal opens | Focus moves to the first interactive element inside the modal |
| 2 | Focus trap | A modal is open | User presses Tab repeatedly | Focus cycles through interactive elements within the modal only |
| 3 | Reverse focus trap | A modal is open | User presses Shift+Tab on the first element | Focus moves to the last element in the modal |
| 4 | Focus restoration | A modal is open | User closes the modal (Escape or close button) | Focus returns to the element that opened the modal |
| 5 | Panel open | Outline panel is toggled open | Panel appears | Focus moves to the panel's first interactive element |
| 6 | Panel close | Outline panel is open | User toggles it closed | Focus returns to the toggle button |

### REQ-P0-010: Skip Links

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | First focusable | User loads any page | User presses Tab once | Skip link "Skip to main content" receives focus and becomes visible |
| 2 | Skip to content | Skip link is focused | User presses Enter | Focus and viewport jump to the main content area |
| 3 | Skip to search | User presses Tab again | Second skip link receives focus | "Skip to search" link is visible |
| 4 | Skip to search action | "Skip to search" link is focused | User presses Enter | Focus moves to the search input |
| 5 | Hidden by default | Page loads (no Tab pressed) | User views the top of the page | Skip links are not visible (visually hidden) |
| 6 | Both sites | User is on encyclopeptide.com or wikipept.com | User presses Tab | Skip links appear on both sites |

---

## P1: Content Tools

### REQ-P1-001: LaTeX/KaTeX Math Rendering

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | Inline math | Article contains `$E = mc^2$` | Page renders | KaTeX renders the equation inline with surrounding text |
| 2 | Block math | Article contains `$$\int_0^\infty e^{-x} dx = 1$$` | Page renders | KaTeX renders the equation as a centered block |
| 3 | Load time | Article with math is opened on 4G connection | Page loads | KaTeX rendering completes within 200ms of page load |
| 4 | Dark mode | User is in dark mode | Math renders | Math text and symbols are visible against dark background |
| 5 | Accessibility | Math is rendered | Screen reader encounters the math | Math has an aria-label or MathML fallback providing text description |
| 6 | Offline | User is offline | Article with math loads from cache | KaTeX renders correctly (CSS bundled, not from CDN) |

---

## Cross-Cutting: Performance

### REQ-PERF-001: Initial Load Performance

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | LCP on mobile | Lighthouse runs on a representative article page on mobile emulation | Performance metrics are collected | LCP < 2.5 seconds |
| 2 | FID on mobile | User interacts with the page within first load | First input is processed | FID < 100ms |
| 3 | CLS on mobile | Page loads completely | Layout shifts are measured | CLS < 0.1 |
| 4 | TTI on mobile | Page loads on 4G throttled connection | Time to interactive is measured | TTI < 3.5 seconds |
| 5 | Bundle regression | A new feature is added | CI build runs | Total JS bundle does not increase by more than 50KB gzipped |

### REQ-PERF-002: Search Performance

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | Query speed | Search index has 500 articles | User types a search query | Results appear within 200ms |
| 2 | Offline search | User is offline | User performs a search | Search works using cached Pagefind WASM index |
| 3 | Index size | Search index is built for 500 articles | Index file is measured | Index is < 500KB gzipped |
| 4 | Progressive results | User types a multi-character query | Results are being found | Results appear incrementally as they match |

### REQ-PERF-003: Command Palette Performance

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | Open speed | User is on any page | User presses Ctrl+Shift+P | Palette UI is visible within 100ms |
| 2 | Filter speed | Palette is open with 30+ commands | User types a filter query | Filtered results update within 50ms |
| 3 | Offline | User is offline | User opens command palette | Palette works with pre-indexed command list |

---

## Cross-Cutting: Accessibility

### REQ-A11Y-001: WCAG 2.1 AA Compliance

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | axe-core audit | axe-core runs on every page of both sites | Audit completes | 0 violations reported |
| 2 | Image alt text | Any page with images loads | All images are inspected | Every image has a descriptive alt attribute |
| 3 | Keyboard navigation | User navigates using only Tab, Shift+Tab, Enter, Escape | All interactive elements are visited | Every interactive element is reachable and operable |
| 4 | Color contrast | All text and UI elements are inspected | Contrast ratios are measured | Normal text >= 4.5:1, large text >= 3:1, UI components >= 3:1 |
| 5 | ARIA validity | All ARIA attributes are inspected | Attributes are validated | No invalid ARIA roles, states, or properties |
| 6 | Screen reader | NVDA or VoiceOver tests the site | Core workflows are tested | All content and actions are announced correctly |

### REQ-A11Y-002: Reduced Motion Support

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | System preference | User has prefers-reduced-motion: reduce set in OS | Any page loads | All non-essential animations are disabled |
| 2 | Graph viewer | Knowledge graph is opened with reduced motion | Graph renders | Nodes appear instantly (no animation) |
| 3 | Panel transitions | Outline panel is toggled with reduced motion | Panel opens/closes | Panel appears/disappears instantly (no slide animation) |
| 4 | Auto-play | Any page loads with reduced motion | Media elements are checked | No auto-playing animations or videos |

---

## Cross-Cutting: Security

### REQ-SEC-001: Content Security Policy

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | CSP header | Any page loads | HTTP response headers are inspected | Content-Security-Policy header is present |
| 2 | Script restriction | CSP is active | An inline script tag is injected via console | Script is blocked by CSP |
| 3 | Style restriction | CSP is active | An external style from unauthorized origin is loaded | Style is blocked by CSP |
| 4 | No unsafe-eval | CSP is active in production | CSP header is inspected | No 'unsafe-eval' in script-src |
| 5 | Violation reporting | A CSP violation occurs | Violation is logged | Report is sent to the configured reporting endpoint |

### REQ-SEC-002: Input Sanitization

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | Script tag in comment | User submits a comment containing `<script>alert('xss')</script>` | Comment is saved and rendered | Script tag is stripped; only text appears |
| 2 | iframe injection | User submits content containing an iframe tag | Content is saved | iframe tag is stripped |
| 3 | javascript: URL | User submits a link with javascript: protocol | Link is saved | Link is stripped or converted to plain text |
| 4 | Server-side enforcement | Client-side sanitization is bypassed via API call | Content is submitted directly to API | Server-side sanitizer strips malicious content |
| 5 | OWASP vectors | OWASP XSS cheat sheet payloads are submitted | Each payload is processed | All payloads are neutralized |

### REQ-SEC-003: Rate Limiting

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | Authenticated limit | User is authenticated | 101 requests are sent in 1 minute | 101st request returns 429 Too Many Requests |
| 2 | Unauthenticated limit | User is not authenticated | 21 requests are sent in 1 minute | 21st request returns 429 Too Many Requests |
| 3 | Retry-After header | 429 response is received | Response headers are inspected | Retry-After header is present with seconds value |
| 4 | X-RateLimit headers | Any API request is made | Response headers are inspected | X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset headers are present |
| 5 | Edge sharing | Rate limit is hit from instance A | Request is made from instance B within same window | Rate limit is enforced (KV-backed shared state) |

### REQ-SEC-004: CSRF Protection

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | Token present | Any state-changing form is rendered | Form HTML is inspected | Hidden CSRF token field is present |
| 2 | Token validated | State-changing request is made with valid token | Server processes request | Request succeeds |
| 3 | Missing token | State-changing request is made without CSRF token | Server processes request | Request returns 403 Forbidden |
| 4 | Invalid token | State-changing request is made with tampered token | Server processes request | Request returns 403 Forbidden |
| 5 | SameSite cookie | Session cookie is inspected | Cookie attributes are checked | SameSite is set to Lax or Strict |

---

## Cross-Cutting: i18n

### REQ-I18N-001: Full i18n for All Feature Tiers

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | No hardcoded strings | All new feature files are inspected | Text content is checked | All user-facing strings use the i18n framework |
| 2 | Translation keys follow convention | New translation keys are added | Key naming is checked | Keys follow existing namespace convention |
| 3 | RTL support | Arabic locale is selected | New UI components render | Layout is correctly mirrored for RTL |
| 4 | Date/number formatting | User is in Japanese locale | Dates and numbers display | Formatting respects ja locale conventions |
| 5 | Missing translation detection | CI runs | Translation coverage check executes | Missing translations are flagged as warnings or errors |

---

## Cross-Cutting: Offline

### REQ-OFFL-001: Offline Feature Parity

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | Article offline | Article is cached by service worker | User goes offline | Article renders correctly |
| 2 | Flashcards offline | Flashcard data is cached | User goes offline | Flashcard review session works |
| 3 | Quizzes offline | Quiz data is cached | User goes offline | Quiz session works |
| 4 | FSRS offline | FSRS review queue is in localStorage | User goes offline | Review scheduling works, syncs on reconnect |
| 5 | Command palette offline | Command list is pre-indexed | User goes offline | Command palette opens and filters commands |
| 6 | Outline offline | Article headings are parsed from cached content | User goes offline | Outline panel renders heading tree |
| 7 | Offline indicator | User is offline | Any page loads | Offline indicator banner is displayed |

### REQ-OFFL-002: Data Sync

| # | Scenario | Given | When | Then |
|---|----------|-------|------|------|
| 1 | Auto sync | User was offline and now has connectivity | Network is restored | Sync begins automatically within 5 seconds |
| 2 | Conflict resolution | Local and remote have different data for same record | Sync runs | Last-write-wins based on timestamp |
| 3 | Sync progress | Sync is in progress | User views UI | Sync progress indicator is visible |
| 4 | No duplication | Sync completes | Database is inspected | No duplicate records exist |
| 5 | Auth features sync | User has offline annotations and comments | Sync runs | All authenticated feature data is synced |
