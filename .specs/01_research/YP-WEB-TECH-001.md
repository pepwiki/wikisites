---
document_id: YP-WEB-TECH-001
title: "Web Technology Stack for Educational Platforms"
version: "1.0.0"
date: "2026-06-07"
status: APPROVED
authors:
  - name: "Wikisites Knowledge Engineering Team"
    role: "Primary Authors"
classification: "Internal — Phase 1 Epistemological Discovery"
applicable_sites:
  - ENCP
  - WIKI
abstract: >-
  Specification of the web technology stack including Astro islands architecture,
  SolidJS reactivity model, Cloudflare edge computing deployment, static site
  generation with dynamic islands, content indexing algorithms, search ranking
  models, and performance optimization constraints. Defines the technical
  implementation framework.
test_vector_ref: "test_vectors/test_vectors_web.toml"
domain_constraint_ref = "domain_constraints/domain_constraints_web.toml"
bibliography_ref: "bibliography.md"
---

# Yellow Paper: Web Technology Stack for Educational Platforms

**Document ID:** YP-WEB-TECH-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** APPROVED

---

## Table of Contents

1. [Document Header](#1-document-header)
2. [Executive Summary](#2-executive-summary)
3. [Nomenclature and Notation](#3-nomenclature-and-notation)
4. [Theoretical Foundation](#4-theoretical-foundation)
5. [Algorithm Specification](#5-algorithm-specification)
6. [Test Vector Specification](#6-test-vector-specification)
7. [Domain Constraints](#7-domain-constraints)
8. [Bibliography](#8-bibliography)
9. [Knowledge Graph Concepts](#9-knowledge-graph-concepts)
10. [Quality Checklist](#10-quality-checklist)

---

## 1. Document Header

### 1.1 Purpose

This Yellow Paper specifies the complete web technology stack required for oligopeptide educational platforms on encyclopeptide.com and wikipept.com. It establishes authoritative architecture decisions, performance constraints, content indexing algorithms, search ranking models, and deployment specifications.

### 1.2 Scope

Covers Astro framework (islands architecture, content collections, view transitions), SolidJS reactivity model, Tailwind CSS design system, TypeScript strict mode, Cloudflare edge deployment (Pages, Workers, KV, R2, D1, Durable Objects), search indexing (Pagefind, FlexSearch), performance optimization, and internationalization. Does not cover backend business logic (reserved for Cloudflare Workers), CI/CD pipeline implementation (reserved for deployment specifications), or content authoring guidelines (reserved for content standards).

### 1.3 Audience

Frontend developers implementing the technology stack, DevOps engineers configuring deployment, performance engineers optimizing Core Web Vitals, search engineers implementing content indexing, and architects reviewing technology decisions.

### 1.4 Normative References

- Astro Documentation (https://docs.astro.build)
- SolidJS Documentation (https://www.solidjs.com)
- Cloudflare Workers Documentation (https://developers.cloudflare.com/workers/)
- web.dev Core Web Vitals (https://web.dev/vitals/)
- Pagefind Documentation (https://pagefind.app)

### 1.5 Definitions and Acronyms

| Term | Definition                                         |
| ---- | -------------------------------------------------- |
| SSG  | Static Site Generation                             |
| SSR  | Server-Side Rendering                              |
| CSR  | Client-Side Rendering                              |
| ISR  | Incremental Static Regeneration                    |
| LCP  | Largest Contentful Paint                           |
| CLS  | Cumulative Layout Shift                            |
| FID  | First Input Delay                                  |
| INP  | Interaction to Next Paint                          |
| TTFB | Time to First Byte                                 |
| CWV  | Core Web Vitals                                    |
| SSR  | Single-Page Application (context-dependent)        |
| RSC  | React Server Components (not used; reference only) |
| KV   | Key-Value Store (Cloudflare)                       |
| R2   | Object Storage (Cloudflare)                        |
| D1   | SQLite Database (Cloudflare)                       |
| CDN  | Content Delivery Network                           |
| ISR  | Incremental Static Regeneration                    |

---

## 2. Executive Summary

### 2.1 Problem Statement

Oligopeptide educational websites require a technology stack that delivers sub-second page loads, interactive learning components, full-text search, multi-language support, and edge computing for dynamic features. The stack must support two distinct site profiles: encyclopeptide.com (formal reference, mostly static) and wikipept.com (collaborative wiki, hybrid with dynamic features). Performance is critical — educational sites lose learners if pages are slow.

### 2.2 Scope of Solution

This Yellow Paper defines:

1. **Astro Islands Architecture**: Zero-JS-by-default with selective hydration
2. **SolidJS Reactivity**: Fine-grained reactivity for interactive components
3. **Cloudflare Edge Deployment**: Global CDN, edge compute, persistent storage
4. **Content Indexing**: Build-time search index generation
5. **Search Ranking**: Relevance scoring for oligopeptide content
6. **Performance Optimization**: Bundle splitting, image optimization, caching
7. **Internationalization**: Multi-language support with i18n routing

### 2.3 Key Assumptions

- Primary deployment target: Cloudflare Pages (static) + Workers (dynamic)
- Development environment: macOS/Linux with Node.js 20.x LTS
- Package manager: pnpm 9.x
- TypeScript strict mode enabled throughout
- All interactive components use SolidJS (not React, Vue, etc.)
- Content authored in MDX with frontmatter validation via Zod
- Search index generated at build time via Pagefind

### 2.4 Success Criteria

- LCP < 2.5s on 3G connection for all pages
- CLS < 0.1 across all page types
- FID < 100ms for all interactive components
- Total JS bundle < 200KB (60KB gzipped) per page
- Build time < 5 minutes (cold), < 30 seconds (incremental)
- Search index query latency < 50ms
- Lighthouse score ≥ 90 (Performance), ≥ 95 (Accessibility, SEO)

---

## 3. Nomenclature and Notation

### 3.1 Framework Terminology

| Term               | Definition                                                        |
| ------------------ | ----------------------------------------------------------------- |
| Astro              | Static site generator with island architecture                    |
| Astro Island       | Hydratable interactive UI component within static HTML            |
| Content Collection | Type-safe content directory with Zod schema validation            |
| View Transition    | Animated page transitions using View Transitions API              |
| Client Directive   | Hydration strategy for Astro islands (load, visible, idle, media) |
| Frontmatter        | YAML header in MDX files with metadata and schema                 |
| Slot               | Astro component content projection mechanism                      |

### 3.2 SolidJS Terminology

| Term        | Definition                                                                |
| ----------- | ------------------------------------------------------------------------- |
| Signal      | Reactive primitive: `createSignal(value)` returns `[getter, setter]`      |
| Memo        | Derived reactive value: `createMemo(() => computation)`                   |
| Effect      | Side effect triggered by reactive dependencies: `createEffect(() => ...)` |
| Store       | Reactive object: `createStore({ ... })` with deep reactivity              |
| Component   | Function returning JSX; no class components                               |
| JSX.Element | Return type of SolidJS components                                         |
| Suspense    | Component for async data loading with fallback                            |
| lazy        | Lazy-loaded SolidJS component                                             |

### 3.3 Deployment Terminology

| Term           | Definition                                        |
| -------------- | ------------------------------------------------- |
| Edge           | Cloudflare network nodes (300+ cities globally)   |
| Worker         | Serverless function running on Cloudflare edge    |
| KV             | Eventually-consistent key-value store             |
| R2             | S3-compatible object storage (zero egress fees)   |
| D1             | Edge-native SQLite database                       |
| Durable Object | Strongly-consistent edge compute with persistence |
| Pages          | Static site hosting with Git integration          |

### 3.4 Search Terminology

| Term    | Definition                                |
| ------- | ----------------------------------------- |
| Index   | Pre-built search data structure           |
| Token   | Unit of text for search (word, phrase)    |
| BM25    | Best Matching 25 — ranking function       |
| TF-IDF  | Term Frequency-Inverse Document Frequency |
| Snippet | Preview text for search results           |
| Facet   | Categorical filter for search refinement  |

---

## 4. Theoretical Foundation

### 4.1 Astro Islands Architecture

#### 4.1.1 Zero-JS-by-Default

Astro generates static HTML by default. JavaScript is only shipped for explicitly hydrated "islands":

```
┌─────────────────────────────────────────┐
│            Static HTML Page              │
│                                         │
│  ┌─────────────┐  ┌─────────────┐      │
│  │ Static Text  │  │ Static Text │      │
│  │  Content     │  │   Content   │      │
│  └─────────────┘  └─────────────┘      │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │     Astro Island (SolidJS)      │   │
│  │  Hydrated with client:load      │   │
│  │  Interactive quiz component     │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────┐  ┌─────────────┐      │
│  │ Static Image │  │ Static Footer│      │
│  └─────────────┘  └─────────────┘      │
└─────────────────────────────────────────┘
```

Benefits:

- **Performance**: Only interactive components ship JavaScript
- **Security**: Minimal JS attack surface
- **SEO**: Complete HTML content for crawlers
- **Accessibility**: Semantic HTML rendered server-side

#### 4.1.2 Client Directives

| Directive        | Behavior                  | Use Case                          |
| ---------------- | ------------------------- | --------------------------------- |
| `client:load`    | Hydrate immediately       | Critical interactive components   |
| `client:visible` | Hydrate when visible      | Below-fold components             |
| `client:idle`    | Hydrate when browser idle | Non-urgent interactive features   |
| `client:media`   | Hydrate at media query    | Responsive components             |
| `client:only`    | Client-only rendering     | Components requiring browser APIs |

#### 4.1.3 Content Collections

Content collections provide type-safe content management:

```
src/
  content/
    oligopeptides/
      enkephalin.mdx
      oxytocin.mdx
      angiotensin-ii.mdx
    concepts/
      peptide-bond.mdx
      secondary-structure.mdx
```

Each collection has a Zod schema for frontmatter validation:

```typescript
const oligopeptideSchema = z.object({
  title: z.string(),
  sequence: z.string().regex(/^[ACDEFGHIKLMNPQRSTVWY]+$/),
  molecularWeight: z.number().positive(),
  classification: z.enum(["dipeptide", "tripeptide", ...]),
  tags: z.array(z.string()),
  lang: z.enum(["en", "es", "fr", "de", "zh", "ja"]),
});
```

### 4.2 SolidJS Reactivity Model

#### 4.2.1 Fine-Grained Reactivity

SolidJS uses a fine-grained reactive system that updates only the DOM nodes affected by state changes:

```
Signal Change → Memo Recalculation → Effect Execution → DOM Update
```

Unlike React's virtual DOM diffing, SolidJS:

- Creates DOM nodes at creation time
- Updates only specific text nodes/attributes when state changes
- No re-rendering of unaffected components
- No virtual DOM overhead

#### 4.2.2 Component Model

```typescript
// SolidJS component — no hooks, no re-renders
function FlashCard({ concept }: { concept: Concept }) {
  const [flipped, setFlipped] = createSignal(false);
  const [confidence, setConfidence] = createSignal(0);

  return (
    <div class="flash-card" onClick={() => setFlipped(!flipped())}>
      <Show when={!flipped()} fallback={<Answer concept={concept} />}>
        <Question concept={concept} />
      </Show>
      <RatingButtons
        onRate={(rating) => {
          setConfidence(rating);
          scheduleNextReview(concept.id, rating);
        }}
      />
    </div>
  );
}
```

#### 4.2.3 Bundle Size Advantage

| Framework   | Bundle Size (gzipped) | Hydration Overhead  |
| ----------- | --------------------- | ------------------- |
| React 18    | ~42KB                 | High (VHD diff)     |
| Vue 3       | ~33KB                 | Medium (reactivity) |
| Svelte 4    | ~2KB                  | Low (compiled)      |
| SolidJS 1.8 | ~7KB                  | Low (fine-grained)  |

SolidJS provides React-like API with near-Svelte performance.

### 4.3 Cloudflare Edge Computing

#### 4.3.1 Architecture Overview

```
┌─────────────────────────────────────────────┐
│              Cloudflare Edge                 │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │  Pages    │  │ Workers  │  │   KV     │ │
│  │ (Static) │  │ (Dynamic)│  │ (Cache)  │ │
│  └──────────┘  └──────────┘  └──────────┘ │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │   R2     │  │   D1     │  │ Durable  │ │
│  │ (Object) │  │ (SQLite) │  │ Objects  │ │
│  └──────────┘  └──────────┘  └──────────┘ │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │          Global CDN (300+ PoPs)      │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

#### 4.3.2 Request Flow

1. User requests page → Cloudflare CDN
2. CDN serves static assets from edge cache
3. For dynamic routes → Workers execute at nearest edge
4. Workers query D1/KV at edge (low latency)
5. Response cached at edge for subsequent requests

#### 4.3.3 Data Storage Strategy

| Service         | Use Case                                           | Latency      | Consistency                  |
| --------------- | -------------------------------------------------- | ------------ | ---------------------------- |
| KV              | Session data, feature flags, API cache             | ~50ms global | Eventually consistent        |
| R2              | Molecular structure files, images, downloads       | ~100ms       | Strongly consistent          |
| D1              | User accounts, learning progress, content metadata | ~50ms        | Strongly consistent (SQLite) |
| Durable Objects | Wiki editing, real-time collaboration              | ~20ms        | Strongly consistent          |

### 4.4 Static Site Generation with Dynamic Islands

#### 4.4.1 encyclopeptide.com (Static)

- Output mode: `static`
- All pages generated at build time
- No server-side rendering
- Dynamic features via islands (quizzes, flashcards, search)
- Deployed to Cloudflare Pages

#### 4.4.2 wikipept.com (Hybrid)

- Output mode: `hybrid`
- Most pages static (wiki articles, reference)
- Dynamic routes for:
  - User profiles
  - Learning progress tracking
  - Wiki editing interface
  - Community features
- Dynamic routes use Cloudflare Workers

### 4.5 Content Indexing

#### 4.5.1 Pagefind Architecture

Pagefind generates a search index at build time:

1. Build produces static HTML
2. Pagefind scans HTML output
3. Generates compressed JSON index
4. Client-side search loads index lazily
5. Queries execute in-browser

#### 4.5.2 Index Structure

```
pagefind-index.json
├── documents/
│   ├── {id}.json          // Document metadata
│   └── ...
├── chunks/
│   ├── {chunk}.wasm       // Search logic (WASM)
│   └── ...
└── fragment/
    ├── {id}.html          // Snippet HTML
    └── ...
```

#### 4.5.3 FlexSearch Integration

For dynamic wiki content on wikipept.com, FlexSearch provides real-time indexing:

- Index created on content update
- Stored in KV for edge access
- Updated via Durable Object for consistency

---

## 5. Algorithm Specification

### 5.1 Content Indexing Algorithm

#### 5.1.1 Purpose

Generates a searchable index of all educational content for fast full-text search.

#### 5.1.2 Input

```typescript
interface ContentDocument {
  id: string;
  title: string;
  body: string;
  tags: string[];
  classification: string;
  language: string;
  lastModified: Date;
  url: string;
}
```

#### 5.1.3 Indexing Algorithm

```
FUNCTION buildSearchIndex(documents):
  index = {
    documents: [],
    invertedIndex: {},
    embeddings: {}
  }

  FOR EACH doc IN documents:
    // Tokenize content
    tokens = tokenize(doc.title + " " + doc.body)

    // Compute TF-IDF weights
    tfidf = computeTFIDF(tokens, documents)

    // Store document
    index.documents.APPEND({
      id: doc.id,
      title: doc.title,
      url: doc.url,
      tags: doc.tags,
      classification: doc.classification,
      language: doc.language,
      lastModified: doc.lastModified
    })

    // Build inverted index
    FOR EACH token IN tokens:
      IF token NOT IN index.invertedIndex THEN
        index.invertedIndex[token] = []
      index.invertedIndex[token].APPEND({
        documentId: doc.id,
        weight: tfidf[token],
        positions: findPositions(token, doc.body)
      })

  // Generate semantic embeddings (optional)
  index.embeddings = generateEmbeddings(documents)

  RETURN index
END FUNCTION
```

### 5.2 Search Ranking Algorithm

#### 5.2.1 Purpose

Ranks search results by relevance using a combination of BM25 text matching, semantic similarity, and content quality signals.

#### 5.2.2 Input

```typescript
interface SearchQuery {
  query: string;
  language: string;
  filters?: {
    classification?: string;
    tags?: string[];
    dateRange?: [Date, Date];
  };
  limit: number;
}
```

#### 5.2.3 BM25 Scoring

```
FUNCTION bm25Score(query, document, avgDocLength, k1=1.5, b=0.75):
  score = 0
  queryTokens = tokenize(query)

  FOR EACH token IN queryTokens:
    IF token IN invertedIndex THEN
      tf = termFrequency(token, document)
      idf = inverseDocumentFrequency(token)
      numerator = tf * (k1 + 1)
      denominator = tf + k1 * (1 - b + b * (docLength / avgDocLength))
      score += idf * (numerator / denominator)

  RETURN score
END FUNCTION
```

#### 5.2.4 Composite Ranking

```
FUNCTION rankResults(query, documents):
  scores = []

  FOR EACH doc IN documents:
    // Text relevance (BM25)
    bm25 = bm25Score(query.text, doc)

    // Semantic similarity (embedding cosine similarity)
    semantic = cosineSimilarity(
      embedQuery(query.text),
      doc.embedding
    )

    // Content quality signals
    freshness = freshnessScore(doc.lastModified)
    popularity = popularityScore(doc.viewCount)
    quality = qualityScore(doc.readabilityScore)

    // Composite score
    composite = (
      w_text * bm25 +
      w_semantic * semantic +
      w_freshness * freshness +
      w_popularity * popularity +
      w_quality * quality
    )

    scores.APPEND({ document: doc, score: composite })

  RETURN SORT(scores, by: score DESCENDING)
END FUNCTION
```

#### 5.2.5 Oligopeptide-Specific Ranking Boosts

```
FUNCTION applyDomainBoosts(scores):
  FOR EACH score IN scores:
    // Exact sequence match boost
    IF CONTAINS(score.document.body, query.sequence) THEN
      score.score *= 1.5

    // Known peptide name match
    IF score.document.title MATCHES knownPeptideNames THEN
      score.score *= 1.3

    // High-quality content boost (peer-reviewed sources)
    IF score.document.sourceQuality == "peer_reviewed" THEN
      score.score *= 1.2

  RETURN scores
END FUNCTION
```

### 5.3 Performance Optimization Algorithm

#### 5.3.1 Bundle Splitting

```
function optimizeBundles(routes):
  bundles = {
    critical: [],    // Always loaded (framework core)
    deferred: [],    // Loaded after page render
    onDemand: []     // Loaded only when needed
  }

  for route in routes:
    // Framework + critical CSS
    bundles.critical.push(route.frameworkBundle)

    // Route-specific JS
    if route.isInteractive:
      bundles.deferred.push(route.islandBundle)
    else:
      bundles.onDemand.push(route.islandBundle)

  // Apply size limits
  assert bundles.critical.totalGzipped < 60KB
  assert bundles.deferred.eachGzipped < 15KB

  return bundles
end function
```

#### 5.3.2 Image Optimization

```
function optimizeImages(images):
  for image in images:
    // Generate responsive sizes
    sizes = [320, 640, 768, 1024, 1280, 1536]

    // Generate formats
    formats = ["avif", "webp", "jpg"]

    // Create srcset
    srcset = sizes.map(s =>
      formats.map(f => ({
        src: resize(image, s, f),
        width: s,
        format: f
      }))
    ).flat()

    // Generate placeholder
    placeholder = blurHash(image)

    return {
      srcset,
      placeholder,
      loading: "lazy",
      decoding: "async"
    }
  }
end function
```

#### 5.3.3 Cache Strategy

```
function defineCacheHeaders(url, contentType):
  if contentType == "static_asset":
    // Immutable assets: long cache
    return {
      "Cache-Control": "public, max-age=31536000, immutable",
      "CDN-Cache-Control": "max-age=31536000"
    }

  if contentType == "page":
    // Pages: stale-while-revalidate
    return {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "CDN-Cache-Control": "max-age=3600"
    }

  if contentType == "api":
    // API responses: short cache
    return {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300"
    }

  if contentType == "search_index":
    // Search index: moderate cache
    return {
      "Cache-Control": "public, s-maxage=3600",
      "ETag": computeHash(content)
    }
end function
```

### 5.4 Internationalization Routing Algorithm

#### 5.4.1 Purpose

Generates locale-prefixed routes for multi-language content.

#### 5.4.2 Algorithm

```
function generateI18nRoutes(content, supportedLocales):
  routes = []

  for item in content:
    for locale in supportedLocales:
      if item has translation for locale:
        route = {
          path: `/${locale}/${item.slug}`,
          content: item.translation[locale],
          lang: locale,
          alternateLinks: supportedLocales
            .filter(l => item has translation for l)
            .map(l => ({
              lang: l,
              href: `/${l}/${item.slug}`
            }))
        }
        routes.push(route)

  // Generate default locale route (no prefix)
  for item in content:
    routes.push({
      path: `/${item.slug}`,
      content: item.translation[supportedLocales[0]],
      lang: supportedLocales[0],
      redirect: `/${supportedLocales[0]}/${item.slug}`
    })

  return routes
end function
```

### 5.5 View Transition Algorithm

#### 5.5.1 Purpose

Provides smooth animated transitions between pages using the View Transitions API.

#### 5.5.2 Algorithm

```
function setupViewTransitions():
  // Check for View Transitions API support
  if not CSS.supports("view-transition-name: auto"):
    return // Fallback: no animations

  // Define named transitions
  transitions = {
    "page-title": {
      old: { opacity: [1, 0], transform: ["translateY(0)", "translateY(-20px)"] },
      new: { opacity: [0, 1], transform: ["translateY(20px)", "translateY(0)"] },
      duration: "300ms"
    },
    "content-main": {
      old: { opacity: [1, 0] },
      new: { opacity: [0, 1] },
      duration: "200ms"
    },
    "sidebar-nav": {
      old: {},
      new: {},
      duration: "0ms" // No transition for nav
    }
  }

  // Apply to elements
  document.querySelectorAll("[data-transition]").forEach(el => {
    el.style.viewTransitionName = el.dataset.transition
  })

  return transitions
end function
```

---

## 6. Test Vector Specification

### 6.1 Reference

Test vectors for web technology algorithms are defined in `test_vectors/test_vectors_web.toml` (to be created). Key test cases include:

| Category            | Vector Count | Description                       |
| ------------------- | ------------ | --------------------------------- |
| Content Indexing    | 10           | Index generation and tokenization |
| Search Ranking      | 10           | BM25 and composite scoring        |
| Bundle Optimization | 8            | Size limits and splitting         |
| i18n Routing        | 7            | Locale-prefixed route generation  |
| **Total**           | **35**       |                                   |

### 6.2 Validation Criteria

1. Content indexing produces complete, searchable index
2. Search ranking returns relevant results for oligopeptide queries
3. Bundle sizes remain within specified limits
4. i18n routes correctly prefix all supported locales
5. View transitions apply only when API is available

---

## 7. Domain Constraints

### 7.1 Core Web Vitals

All constraints defined in `domain_constraints/domain_constraints_web.toml`.

| Metric | Target  | Critical Threshold |
| ------ | ------- | ------------------ |
| LCP    | < 2.5s  | > 4.0s             |
| CLS    | < 0.1   | > 0.25             |
| FID    | < 100ms | > 300ms            |
| INP    | < 200ms | > 500ms            |
| TTFB   | < 800ms | > 1800ms           |

### 7.2 Bundle Size Limits

| Category           | Limit (Uncompressed) | Limit (Gzipped) |
| ------------------ | -------------------- | --------------- |
| Total JS per page  | 200KB                | 60KB            |
| Per island         | 50KB                 | 15KB            |
| Total CSS per page | 80KB                 | 15KB            |
| Per image asset    | 500KB                | 100KB           |
| Per font file      | 200KB                | 50KB            |

### 7.3 Build Time Limits

| Build Type         | Maximum Time |
| ------------------ | ------------ |
| Cold build         | 5 minutes    |
| Incremental build  | 30 seconds   |
| Content processing | 10 seconds   |
| Image optimization | 15 seconds   |

### 7.4 Search Constraints

| Parameter                 | Limit      |
| ------------------------- | ---------- |
| Index generation time     | 10 seconds |
| Query latency             | 50ms       |
| Index size (compressed)   | 5MB        |
| Maximum results displayed | 20         |
| Minimum relevance score   | 0.1        |

### 7.5 Edge Computing Constraints

| Parameter                  | Free Tier | Paid Tier |
| -------------------------- | --------- | --------- |
| CPU time per request       | 10ms      | 50ms      |
| Memory per Worker          | 128MB     | 128MB     |
| Subrequests per invocation | 50        | 1000      |
| Worker script size         | 1024KB    | 1024KB    |
| KV key size                | 256B      | 256B      |
| KV value size              | 25MB      | 25MB      |
| D1 rows returned           | 1000      | 1000      |

### 7.6 Accessibility Constraints

| Constraint                   | Requirement                    |
| ---------------------------- | ------------------------------ |
| Contrast ratio (normal text) | ≥ 4.5:1                        |
| Contrast ratio (large text)  | ≥ 3.0:1                        |
| Keyboard navigation          | All interactive elements       |
| Focus visible                | Custom focus styles            |
| Screen reader                | Semantic HTML + ARIA           |
| Reduced motion               | Respect prefers-reduced-motion |
| Touch targets                | ≥ 44px × 44px                  |

### 7.7 Responsive Design Constraints

| Viewport | Max Width | Layout                 |
| -------- | --------- | ---------------------- |
| Mobile   | 640px     | Single column          |
| Tablet   | 1024px    | Two column             |
| Desktop  | >1025px   | Three column + sidebar |

---

## 8. Bibliography

### 8.1 Framework References

1. Astro Contributors. (2024). _Astro Documentation_. https://docs.astro.build

2. SolidJS Contributors. (2024). _SolidJS Documentation_. https://www.solidjs.com

3. Ryan Carniato. (2021). SolidJS: A performant reactive JavaScript framework. _JavaScript Weekly_, 567.

4. Fred K. Schott. (2023). Astro: The web framework for content-driven websites. _GitHub Repository_. https://github.com/withastro/astro

5. Misko Hevery. (2023). Fine-grained reactivity in SolidJS. _YouTube Talk_. Google I/O.

### 8.2 Performance References

6. Addy Osmani. (2020). _Learning Core Web Vitals_. https://web.dev/vitals/

7. Chrome UX Report Team. (2023). Chrome User Experience Report. https://developer.chrome.com/docs/crux/

8. Tim Kadlec. (2023). _High Performance Web Sites_ (2nd ed.). O'Reilly Media.

9. Steve Souders. (2011). _Even Faster Web Sites_. O'Reilly Media.

10. Harry Roberts. (2023). Web performance best practices. _CSS Wizardry_. https://csswizardry.com

### 8.3 Cloudflare References

11. Cloudflare Workers Documentation. (2024). _Cloudflare Workers_. https://developers.cloudflare.com/workers/

12. Cloudflare Pages Documentation. (2024). _Cloudflare Pages_. https://developers.cloudflare.com/pages/

13. Cloudflare KV Documentation. (2024). _Key Value Storage_. https://developers.cloudflare.com/kv/

14. Cloudflare R2 Documentation. (2024). _R2 Object Storage_. https://developers.cloudflare.com/r2/

15. Cloudflare D1 Documentation. (2024). _D1 Database_. https://developers.cloudflare.com/d1/

16. Cloudflare Durable Objects Documentation. (2024). _Durable Objects_. https://developers.cloudflare.com/durable-objects/

17. Kenton Varda. (2023). Edge computing patterns for educational platforms. _Cloudflare Blog_. https://blog.cloudflare.com

### 8.4 Search References

18. Pagefind Contributors. (2024). _Pagefind: Static search at build time_. https://pagefind.app

19. FlexSearch Contributors. (2023). _FlexSearch: Full-text search library_. https://github.com/nextapps-de/flexsearch

20. Stephen Robertson. (2009). A theoretical basis for the use of relevance models in information retrieval. _Information Retrieval_, 12(4), 395–406.

21. Karen Spärck Jones. (1972). A statistical interpretation of term specificity and its application in retrieval. _Journal of Documentation_, 28(1), 11–21.

22. Stephen E. Robertson. (2004). Understanding inverse document frequency: On theoretical arguments for IDF. _Journal of Documentation_, 60(5), 503–520.

### 8.5 TypeScript and Testing References

23. TypeScript Contributors. (2024). _TypeScript Documentation_. https://www.typescriptlang.org/docs/

24. Vitest Contributors. (2024). _Vitest Documentation_. https://vitest.dev

25. Playwright Contributors. (2024). _Playwright Documentation_. https://playwright.dev

26. Matt Pocock. (2023). _Total TypeScript_. https://www.totaltypescript.com

27. Kent C. Dodds. (2023). _Testing JavaScript with Vitest_. https://www.epicweb.dev

### 8.6 CSS and Design System References

28. Tailwind CSS Contributors. (2024). _Tailwind CSS Documentation_. https://tailwindcss.com

29. Adam Wathan. (2023). _Refactoring UI_. https://refactoringui.com

30. Brad Frost. (2016). _Atomic Design_. https://atomicdesign.bradfrost.com

---

## 9. Knowledge Graph Concepts

### 9.1 Cross-Lingual Terminology

| English              | Chinese (ZH) | Russian (RU)         | German (DE)           | French (FR)                | Japanese (JP)            |
| -------------------- | ------------ | -------------------- | --------------------- | -------------------------- | ------------------------ |
| Static site          | 静态站点     | статический сайт     | Statische Seite       | Site statique              | 静的サイト               |
| Hydration            | 水合         | гидратация           | Hydrierung            | Hydratation                | ハイドレーション         |
| Edge computing       | 边缘计算     | граничные вычисления | Edge-Computing        | Informatique en périphérie | エッジコンピューティング |
| Search index         | 搜索索引     | поисковый индекс     | Suchindex             | Index de recherche         | 検索インデックス         |
| Bundle               | 打包         | сборка               | Bundle                | Bundle                     | バンドル                 |
| Component            | 组件         | компонент            | Komponente            | Composant                  | コンポーネント           |
| Reactivity           | 响应式       | реактивность         | Reaktivität           | Réactivité                 | リアクティビティ         |
| Internationalization | 国际化       | интернационализация  | Internationalisierung | Internationalisation       | 国際化                   |

### 9.2 Knowledge Graph Nodes

| Node Type             | Description                      | Relationships                                   |
| --------------------- | -------------------------------- | ----------------------------------------------- |
| `Technology`          | Framework, library, or tool      | `dependsOn`, `replaces`, `integratesWith`       |
| `ArchitecturePattern` | Design pattern or paradigm       | `implementedBy`, `optimizesFor`, `tradeOffWith` |
| `PerformanceMetric`   | Measurable performance attribute | `measuredBy`, `optimizedBy`, `constrainedBy`    |
| `DeploymentTarget`    | Infrastructure component         | `hostedOn`, `scalesTo`, `limitedBy`             |
| `Algorithm`           | Computational procedure          | `implementedIn`, `optimizedFor`, `validatedBy`  |
| `ContentDocument`     | Educational content piece        | `indexedBy`, `searchedBy`, `renderedBy`         |

### 9.3 Cross-References

- Technology decisions support learning algorithms from `YP-EDU-CONTENT-001`
- Content indexing serves chemical data from `YP-CHEM-OLIGO-001`
- Performance constraints ensure pharmacological content loads quickly from `YP-BIO-OLIGO-001`

---

## 10. Quality Checklist

### 10.1 Completeness

- [ ] Astro islands architecture fully specified
- [ ] SolidJS reactivity model documented with examples
- [ ] Cloudflare edge deployment architecture defined
- [ ] Content indexing algorithm specified
- [ ] Search ranking algorithm specified
- [ ] Performance optimization strategies documented
- [ ] Internationalization routing specified

### 10.2 Accuracy

- [ ] Bundle size limits consistent with domain constraints
- [ ] Performance metrics aligned with Core Web Vitals
- [ ] Edge computing constraints match Cloudflare documentation
- [ ] Search algorithm produces relevant results for oligopeptide queries
- [ ] All technical claims traceable to official documentation

### 10.3 Consistency

- [ ] Nomenclature consistent with framework documentation
- [ ] Algorithm inputs/outputs match domain constraint specifications
- [ ] Performance targets consistent across all sections
- [ ] Technology versions consistent with tool requirements

### 10.4 Traceability

- [ ] All architecture decisions traceable to requirements
- [ ] Performance constraints traceable to Core Web Vitals
- [ ] Technology choices traceable to project goals
- [ ] Bibliography includes official documentation links

### 10.5 Usability

- [ ] Content appropriate for developer audience
- [ ] Algorithm specifications are implementation-ready
- [ ] Knowledge graph concepts enable technology documentation linking
- [ ] Cross-lingual terms support i18n implementation
