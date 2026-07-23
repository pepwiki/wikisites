# Crawlkit Schema Recognition — Final Gap Analysis

**Date:** 2026-07-23
**Site:** wikipept.com (500 pages crawled)
**crawlkit version:** 0.1.0 (with fix applied)

## Current State

crawlkit's `RECOGNIZED_TYPES` has 47 types. wikipept.com uses 18 types, of which **10 are not recognized**, causing 88 SD005 warnings.

## Missing Types from crawlkit

| Type | Count on wikipept.com | Valid Schema.org? | crawlkit Status |
|------|----------------------|-------------------|-----------------|
| **ResearchProject** | 12 | ✅ Yes | ❌ Missing |
| **MedicalSubstance** | 7 | ✅ Yes | ❌ Missing |
| **MedicalWebPage** | 6 | ✅ Yes | ❌ Missing |
| **MedicalAudience** | 6 | ✅ Yes | ❌ Missing |
| **DefinedTerm** | 6 | ✅ Yes | ❌ Missing |
| **DefinedTermSet** | 1 | ✅ Yes | ❌ Missing |
| **Dataset** | 1 | ✅ Yes | ❌ Missing |
| **DataDownload** | 1 | ✅ Yes | ❌ Missing |
| **CollectionPage** | 6 | ✅ Yes | ❌ Missing |
| **ImageObject** | 89 | ✅ Yes | ✅ Recognized |

## Required Fix

Add these 9 types to `RECOGNIZED_TYPES` in `crates/crawlkit-core/src/analyzers.rs`:

```rust
const RECOGNIZED_TYPES: &[&str] = &[
    // ... existing 47 types ...
    // Medical & Health
    "MedicalSubstance",
    "MedicalWebPage",
    "MedicalAudience",
    "Drug",
    // Academic & Research
    "ResearchProject",
    "ScholarlyArticle",
    // Data & Knowledge
    "Dataset",
    "DataDownload",
    "DefinedTerm",
    "DefinedTermSet",
    // Navigation & Structure
    "CollectionPage",
];
```

## Impact After Fix

| Metric | Before | After |
|--------|--------|-------|
| SD005 warnings | 88 | 0 |
| Total warnings | 2,006 | 1,918 |
| False positive rate | 4.4% | 0% |

## Validation

All 9 missing types are valid Schema.org types:
- https://schema.org/ResearchProject
- https://schema.org/MedicalSubstance
- https://schema.org/MedicalWebPage
- https://schema.org/MedicalAudience
- https://schema.org/DefinedTerm
- https://schema.org/DefinedTermSet
- https://schema.org/Dataset
- https://schema.org/DataDownload
- https://schema.org/CollectionPage
