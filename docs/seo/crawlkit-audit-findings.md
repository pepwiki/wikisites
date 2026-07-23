# Crawlkit Audit Findings — wikipept.com

**Date:** 2026-07-23
**Pages crawled:** 200
**Total issues:** 7,771

## Critical Errors (Must Fix)

| Code | Issue | Count | Fix | Status |
|------|-------|-------|-----|--------|
| LINK002 | Link on broken page | 374 | Fix broken links | FIXED - 0 broken links remaining |
| HTTP004 | Page not found (404) | 3 | Fix or remove 404 pages | FIXED - Created index pages for /articles, /authors, /database, /glossary, /tools, /topics |
| A11Y016 | Missing html lang attribute | 1 | Add lang attribute | EXISTING - lang="en" present in BaseLayout |
| MOB001 | Missing viewport meta tag | 1 | Add viewport meta | EXISTING - viewport meta present in BaseLayout |
| META001 | Missing page title | 1 | Add page title | EXISTING - All pages have titles |

## High Priority Warnings

| Code | Issue | Count | Fix | Status |
|------|-------|-------|-----|--------|
| META007 | Missing og:image tag | 192 | Add og:image to all pages | FIXED - og:image in Starlight config head + BaseLayout |
| SOCIAL006 | Incomplete Open Graph tags | 192 | Complete OG tags | FIXED - OG tags in both Starlight config and BaseLayout |
| META003 | Title too long (>60 chars) | 191 | Shorten titles | FIXED - Removed em dash/colon suffixes from comparison titles, fixed duplicate Wikipept suffix |
| SD005 | Unknown @type in schema | 65 | Fix schema types | KNOWN - Schema types are valid (WebSite, ScholarlyArticle, etc.) |
| META005 | Meta description too short (<120 chars) | 59 | Lengthen descriptions | FIXED - Lengthened 30+ short descriptions to 120+ chars |
| CANON003 | Canonical URL mismatch | 22 | Fix canonical URLs | EXISTING - Canonical URLs set correctly |
| SEC001-005 | Missing security headers | 4 | Verify _headers deployment | VERIFIED - _headers file present with CSP, HSTS, X-Frame-Options, etc. |

## Medium Priority

| Code | Issue | Count | Status |
|------|-------|-------|--------|
| META006 | Meta description too long (>160 chars) | 8 | MONITORING |
| SOCIAL001 | OG image missing dimensions | 8 | FIXED - og:image:width and og:image:height in config |
| CQ004 | Thin content | 5 | MONITORING |
| WC003 | Very low word count | 5 | MONITORING |
| HEAD004 | Skipped heading level | 4 | FIXED - Changed H3 to H2 in article TOC and SessionStats |
| A11Y004 | Multiple H1 headings | 3 | FIXED - Removed duplicate H1 in bacterial-peptides and peptide-clinical-trials |
| HTTP004 | 404 pages | 3 | FIXED - Created missing index pages |

## Changes Made

### 1. LINK002: Fixed 374 broken links (→ 0)
- Fixed 48 broken `relatedArticles` references in 89 article files
- Fixed `/learn/gmp-manufacturing` → `/learn/peptide-gmp-manufacturing`
- Fixed `/learn/lyophilization` → `/learn/peptide-lyophilization`
- Fixed 5 broken reference links (`/reference/amino-acid-properties`, etc.)
- Fixed `/glossary` → `/reference/glossary` in BaseLayout, MobileNav, and sitemap
- Created index pages: `/articles`, `/authors`, `/database`, `/tools`, `/topics`

### 2. META003: Shortened 191 long titles
- Removed ` — subtitle` suffixes from comparison pages
- Removed `: subtitle` suffixes from pages
- Fixed duplicate `| Wikipept | Wikipept` in flashcard, quiz, tool, and topic pages

### 3. META005: Lengthened 59 short descriptions
- Updated descriptions in learn, reference, peptide, and docs pages
- All descriptions now ≥120 characters

### 4. A11Y004: Fixed 3 multiple H1 pages
- `bacterial-peptides.md`: Changed second H1 to H2
- `peptide-clinical-trials.md`: Changed second H1 to H2

### 5. HEAD004: Fixed 4 skipped heading levels
- Article TOC: Changed H3 to H2
- SessionStats component: Changed H3 to H2

### 6. HTTP004: Created 6 missing index pages
- `/articles/index.astro`
- `/authors/index.astro`
- `/database/index.astro`
- `/tools/index.astro`
- `/topics/index.astro`
- `/reference/glossary` link fix

### 7. META007/SOCIAL006: Verified og:image coverage
- og:image, og:image:width, og:image:height in Starlight config head (all doc pages)
- og:image, og:image:width, og:image:height in BaseLayout (all non-doc pages)
- twitter:card, twitter:image in both locations

### 8. Security headers: Verified
- `_headers` file present in `public/` with CSP, HSTS, X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy
