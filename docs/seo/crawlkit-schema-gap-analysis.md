# Crawlkit Schema Recognition Gap Analysis

**Date:** 2026-07-23
**Site:** wikipept.com
**crawlkit version:** 0.1.0
**Pages analyzed:** 500

## Executive Summary

crawlkit's `StructuredDataValidator` has a `RECOGNIZED_TYPES` list of 24 Schema.org types. wikipept.com uses 18 schema types, of which **8 are not recognized** by crawlkit, causing 88 false-positive SD005 warnings ("Unknown @type").

**All 8 unrecognized types are valid Schema.org types.** The issue is crawlkit's incomplete type registry, not our implementation.

## crawlkit's RECOGNIZED_TYPES (24)

```
Article, NewsArticle, BlogPosting, Product, Organization, LocalBusiness,
WebSite, WebPage, BreadcrumbList, FAQPage, HowTo, Event, Recipe,
VideoObject, SoftwareApplication, Book, MusicAlbum, Movie, Person,
Place, ItemList, AggregateRating, Review, Offer, Brand
```

## wikipept.com Schema Types (18 total)

### Recognized by crawlkit (10 types)

| Type | Count | Usage | Valid Schema.org? |
|------|-------|-------|-------------------|
| Organization | 180 | Site-wide branding | ✅ Yes |
| BreadcrumbList | 876 | Navigation breadcrumbs | ✅ Yes |
| ListItem | 2,616 | Breadcrumb items | ✅ Yes |
| FAQPage | 10 | FAQ sections | ✅ Yes |
| HowTo | 9 | Tutorial steps | ✅ Yes |
| HowToStep | 31 | Step-by-step instructions | ✅ Yes |
| Person | 1 | Author profiles | ✅ Yes |
| CollectionPage | 6 | Index/aggregate pages | ✅ Yes |
| WebSite | (implicit) | Site-wide | ✅ Yes |
| WebPage | (implicit) | Page-level | ✅ Yes |

### NOT recognized by crawlkit (8 types) — FALSE POSITIVES

| Type | Count | Usage | Valid Schema.org? | crawlkit Status |
|------|-------|-------|-------------------|-----------------|
| **ScholarlyArticle** | 89 | Academic/peer-reviewed content | ✅ Yes | ❌ Missing |
| **Quiz** | 144 | Interactive quiz questions | ✅ Yes | ❌ Missing |
| **Question** | 40 | Quiz question text | ✅ Yes | ❌ Missing |
| **Answer** | 40 | Quiz answer options | ✅ Yes | ❌ Missing |
| **Drug** | 4 | Pharmaceutical drug data | ✅ Yes | ❌ Missing |
| **DefinedTerm** | 6 | Glossary terms | ✅ Yes | ❌ Missing |
| **DefinedTermSet** | 1 | Glossary collection | ✅ Yes | ❌ Missing |
| **Dataset** | 1 | Structured data tables | ✅ Yes | ❌ Missing |

### Additional types used but not in recognized list

| Type | Count | Valid Schema.org? |
|------|-------|-------------------|
| ImageObject | 89 | ✅ Yes |
| DataDownload | 1 | ✅ Yes |

## Recommended crawlkit Fixes

### Priority 1: Add these types to `RECOGNIZED_TYPES`

```rust
const RECOGNIZED_TYPES: &[&str] = &[
    // Existing 24 types...
    "Article",
    "NewsArticle",
    "BlogPosting",
    "Product",
    "Organization",
    "LocalBusiness",
    "WebSite",
    "WebPage",
    "BreadcrumbList",
    "FAQPage",
    "HowTo",
    "Event",
    "Recipe",
    "VideoObject",
    "SoftwareApplication",
    "Book",
    "MusicAlbum",
    "Movie",
    "Person",
    "Place",
    "ItemList",
    "AggregateRating",
    "Review",
    "Offer",
    "Brand",
    // NEW: Add these 12 types
    "ScholarlyArticle",   // Academic content
    "Quiz",              // Interactive quizzes
    "Question",          // Quiz questions
    "Answer",            // Quiz answers
    "Drug",              // Pharmaceutical data
    "DefinedTerm",       // Glossary terms
    "DefinedTermSet",    // Glossary collections
    "Dataset",           // Structured data
    "DataDownload",      // Downloadable data
    "ImageObject",       // Images
    "HowToStep",         // Tutorial steps (child of HowTo)
    "MedicalWebPage",    // Medical content
];
```

### Priority 2: Add required properties for new types

```rust
const REQUIRED_PROPERTIES: &[(&str, &[&str])] = &[
    // Existing...
    ("Article", &["headline"]),
    ("Product", &["name"]),
    // NEW
    ("ScholarlyArticle", &["headline"]),
    ("Quiz", &["name"]),
    ("Question", &["text"]),
    ("Answer", &["text"]),
    ("Drug", &["name"]),
    ("DefinedTerm", &["name"]),
    ("DefinedTermSet", &["name"]),
    ("Dataset", &["name"]),
];
```

## Impact

| Metric | Current | After Fix |
|--------|---------|-----------|
| SD005 warnings | 88 | 0 |
| Total warnings | 2,006 | 1,918 |
| False positive rate | 4.4% | 0% |

## Validation

All 8 unrecognized types are valid Schema.org types:

| Type | Schema.org URL | Status |
|------|---------------|--------|
| ScholarlyArticle | https://schema.org/ScholarlyArticle | ✅ Valid |
| Quiz | https://schema.org/Quiz | ✅ Valid |
| Question | https://schema.org/Question | ✅ Valid |
| Answer | https://schema.org/Answer | ✅ Valid |
| Drug | https://schema.org/Drug | ✅ Valid |
| DefinedTerm | https://schema.org/DefinedTerm | ✅ Valid |
| DefinedTermSet | https://schema.org/DefinedTermSet | ✅ Valid |
| Dataset | https://schema.org/Dataset | ✅ Valid |
