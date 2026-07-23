# Crawlkit Audit Findings — wikipept.com

**Date:** 2026-07-23
**Pages crawled:** 200
**Total issues:** 7,771

## Critical Errors (Must Fix)

| Code | Issue | Count | Fix |
|------|-------|-------|-----|
| LINK002 | Link on broken page | 374 | Fix broken links |
| HTTP004 | Page not found (404) | 3 | Fix or remove 404 pages |
| A11Y016 | Missing html lang attribute | 1 | Add lang attribute |
| MOB001 | Missing viewport meta tag | 1 | Add viewport meta |
| META001 | Missing page title | 1 | Add page title |

## High Priority Warnings

| Code | Issue | Count | Fix |
|------|-------|-------|-----|
| META007 | Missing og:image tag | 192 | Add og:image to all pages |
| SOCIAL006 | Incomplete Open Graph tags | 192 | Complete OG tags |
| META003 | Title too long (>60 chars) | 191 | Shorten titles |
| SD005 | Unknown @type in schema | 65 | Fix schema types |
| META005 | Meta description too short (<120 chars) | 59 | Lengthen descriptions |
| CANON003 | Canonical URL mismatch | 22 | Fix canonical URLs |
| SEC001-005 | Missing security headers | 4 | Verify _headers deployment |

## Medium Priority

| Code | Issue | Count |
|------|-------|-------|
| META006 | Meta description too long (>160 chars) | 8 |
| SOCIAL001 | OG image missing dimensions | 8 |
| CQ004 | Thin content | 5 |
| WC003 | Very low word count | 5 |
| HEAD004 | Skipped heading level | 4 |
| A11Y004 | Multiple H1 headings | 3 |
| HTTP004 | 404 pages | 3 |
