# Crawlkit Warnings Deep Analysis — Both Sites

**Date:** 2026-07-24
**crawlkit version:** 2.0.0
**Sites:** wikipept.com (500 pages), encyclopeptide.com (500 pages)

## Summary

| Site | Errors | Warnings | Info |
|------|--------|----------|------|
| wikipept.com | 0 | 1,434 | 13,187 |
| encyclopeptide.com | 0 | 3,313 | 13,989 |
| **Total** | **0** | **4,747** | **27,176** |

## Warning Classification

### Category 1: Actually Fixable (Non-Astro)

These warnings are real issues that can be fixed regardless of framework.

#### encyclopeptide.com

| Warning | Count | Severity | Fix | Effort |
|---------|-------|----------|-----|--------|
| SEC001: Missing CSP header | 500 | HIGH | Add _headers file | 10min |
| SEC002: Missing HSTS header | 500 | HIGH | Add _headers file | 10min |
| SEC003: Missing X-Frame-Options | 500 | HIGH | Add _headers file | 10min |
| SOCIAL001: OG image missing dimensions | 500 | MEDIUM | Add width/height to OG tags | 30min |
| META005: Description too short | 448 | MEDIUM | Add descriptions to articles | 4h |
| META002: Title too short | 131 | LOW | Extend titles | 2h |
| META003: Title too long | 56 | LOW | Shorten titles | 1h |
| META006: Description too long | 14 | LOW | Shorten descriptions | 30min |

#### wikipept.com

| Warning | Count | Severity | Fix | Effort |
|---------|-------|----------|-----|--------|
| META005: Description too short | 418 | MEDIUM | Add descriptions to pages | 4h |
| META002: Title too short | 96 | LOW | Extend titles | 2h |
| META006: Description too long | 2 | LOW | Shorten | 5min |
| META003: Title too long | 1 | LOW | Shorten | 5min |
| AI-CS008: Missing date | 3 | LOW | Add dates to special pages | 10min |
| AI-CS009: Missing author | 1 | LOW | Add author | 5min |

### Category 2: Content Structure (Not Framework)

These warnings are about content quality/structure, not Astro.

| Warning | Sites | Count | Notes |
|---------|-------|-------|-------|
| CQ004: Thin content | Both | 887 | Short reference/comparison pages |
| WC003: Low word count | Both | 391 | Same as above |
| SD005: Unknown @type | encp | 23 | Schema types not in crawlkit |

### Category 3: Framework/Template Related

These are inherent to Starlight's layout structure.

| Warning | Sites | Count | Notes |
|---------|-------|-------|-------|
| A11Y004: Multiple H1 | Both | 137 | Starlight puts H1 in header + content |
| HEAD003: Multiple H1 | Both | 137 | Same as above |
| A11Y005: Skipped heading | wiki | 1 | Minor |
| AI-CS008: Missing date | wiki | 3 | Special pages |
| AI-CS009: Missing author | wiki | 1 | Special pages |

## Priority Fix Plan

### Phase 1: Security Headers (encp) — HIGH, 30min

Add `_headers` file to `packages/encp/public/`:
```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://plausible.io; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

**Impact:** Eliminates 1,500 warnings (31% of encp total).

### Phase 2: OG Image Dimensions (encp) — MEDIUM, 30min

Add width/height to OG tags in encp BaseLayout.astro:
```html
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

**Impact:** Eliminates 500 warnings.

### Phase 3: Meta Descriptions (Both) — MEDIUM, 8h

Add/extend descriptions on pages with short descriptions.
- encp: 448 pages need longer descriptions
- wiki: 418 pages need longer descriptions

**Impact:** Eliminates 866 warnings.

### Phase 4: Titles (Both) — LOW, 3h

Extend short titles, shorten long titles.
- encp: 131 short, 56 long
- wiki: 96 short, 1 long

**Impact:** Eliminates 284 warnings.

### Phase 5: Content Depth (Both) — LOW, Ongoing

Short content pages (CQ004, WC003) are by design for reference/comparison pages. These are acceptable.

**Impact:** 887 warnings (acceptable).

## What Can't Be Fixed

| Warning | Count | Reason |
|---------|-------|--------|
| CQ004: Thin content | 887 | By design — short reference pages |
| WC003: Low word count | 391 | Same as above |
| A11Y004: Multiple H1 | 137 | Starlight layout — H1 in header + content |
| HEAD003: Multiple H1 | 137 | Same as above |
| SD005: Unknown @type | 23 | Schema types not in crawlkit |

## Projected Results After Fixes

| Metric | Current | After Phase 1-4 |
|--------|---------|-----------------|
| wikipept.com errors | 0 | 0 |
| wikipept.com warnings | 1,434 | ~500 |
| encp errors | 0 | 0 |
| encp warnings | 3,313 | ~1,300 |
| **Total warnings** | **4,747** | **~1,800** |

## Recommendation

Fix Phase 1 (security headers) and Phase 2 (OG dimensions) immediately — they're quick wins that eliminate 2,000 warnings. Phase 3-4 are worth doing for SEO. Phase 5 is acceptable as-is.
