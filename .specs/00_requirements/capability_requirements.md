# Capability Requirements

**Document ID:** CAP-REQ-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** Approved
**Scope:** encyclopeptide.com and wikipept.com

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Frontend Framework](#2-frontend-framework)
3. [Styling](#3-styling)
4. [Content Management](#4-content-management)
5. [Deployment Infrastructure](#5-deployment-infrastructure)
6. [Build Tools](#6-build-tools)
7. [Testing](#7-testing)
8. [Analytics](#8-analytics)
9. [Search](#9-search)
10. [Internationalization](#10-internationalization)
11. [Tool Requirements Table](#11-tool-requirements-table)

---

## 1. Executive Summary

This document specifies every required capability for the two oligopeptide educational websites: **encyclopeptide.com** (formal encyclopedic reference) and **wikipept.com** (collaborative wiki-style educational platform). Each capability is defined with its name, version, purpose, integration method, and criticality level. The tool requirements table at the end provides a complete inventory of all tools with version constraints, installation methods, and criticality classifications.

---

## 2. Frontend Framework

### 2.1 Astro v5.x

| Field                  | Value                                                                                                                                                                                                                                                                   |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**               | Astro                                                                                                                                                                                                                                                                   |
| **Version**            | v5.x (minimum 5.0.0, latest 5.x patch)                                                                                                                                                                                                                                  |
| **Purpose**            | Primary static site generator providing island architecture, content collections, view transitions, and zero-JS-by-default page rendering. Generates fully static HTML for content pages with selective hydration for interactive components.                           |
| **Integration Method** | Core dependency installed via `pnpm add astro`. Configuration in `astro.config.mjs` per site. Content collections defined in `src/content/config.ts`. Component authoring in `.astro` single-file components. Layout system via `src/layouts/`. Pages via `src/pages/`. |
| **Criticality**        | Critical                                                                                                                                                                                                                                                                |

**Detailed Requirements:**

- **Island Architecture:** All interactive UI components (molecular viewer, quiz engine, flashcard system, wiki editor) must be implemented as Astro islands — standalone framework components with `client:*` directives for selective hydration. Non-interactive pages must ship zero JavaScript.
- **Content Collections:** Both sites use Astro Content Collections for typed, validated content. encyclopeptide.com defines collections for monographs, structural data, and references. wikipept.com defines collections for study guides, quizzes, flashcards, and community annotations. Collection schemas enforced via Zod.
- **View Transitions:** Both sites use Astro's built-in View Transitions API integration for smooth page navigation. Transition types include `fade`, `slide`, and custom named transitions. Prefetching enabled for common navigation paths.
- **Server Integration:** wikipept.com uses Astro's server mode for dynamic features (user authentication, community editing, progress tracking) deployed to Cloudflare Workers/Pages Functions. encyclopeptide.com uses static generation mode only.
- **Output Targets:** encyclopeptide.com: `output: 'static'`. wikipept.com: `output: 'hybrid'` (static pages + server-rendered dynamic routes).

### 2.2 SolidJS Integration

| Field                  | Value                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Name**               | SolidJS                                                                                                                                                                                                                                                                                                                                                            |
| **Version**            | v1.x (minimum 1.8.0, latest 1.x patch)                                                                                                                                                                                                                                                                                                                             |
| **Purpose**            | Reactive UI framework for interactive components requiring fine-grained reactivity, high performance, and small bundle size. Provides the runtime for quiz engine, flashcard system, molecular viewer wrapper, progress tracking dashboard, and wiki editing interface.                                                                                            |
| **Integration Method** | Installed via `pnpm add solid-js @astrojs/solid-js`. Configured as Astro integration in `astro.config.mjs` with `integrations: [solid()]`. Interactive components authored as `.tsx`/`.jsx` files with SolidJS reactive primitives (createSignal, createEffect, createMemo, onCleanup). Components hydrated via Astro's `client:load` or `client:idle` directives. |
| **Criticality**        | Critical                                                                                                                                                                                                                                                                                                                                                           |

**Detailed Requirements:**

- **Fine-Grained Reactivity:** SolidJS's signal-based reactivity is required for the molecular viewer controls (rotation, zoom, atom selection), quiz engine (answer evaluation, score calculation), flashcard system (flip animation, spaced repetition scheduling), and wiki editor (real-time preview, diff visualization).
- **Small Bundle Size:** SolidJS compiles to minimal vanilla JavaScript (~7KB gzipped for typical components), essential for meeting Core Web Vitals thresholds on mobile devices.
- **Suspense and Error Boundaries:** Use SolidJS Suspense for async data loading (molecular structure data, quiz questions) and Error Boundaries for graceful degradation when external APIs are unavailable.
- **TypeScript Support:** All SolidJS components must be authored in TypeScript with strict mode enabled. Component props defined via TypeScript interfaces.

### 2.3 Islands Architecture Pattern

| Field                  | Value                                                                                                                                                                                                                                                       |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**               | Islands Architecture                                                                                                                                                                                                                                        |
| **Version**            | N/A (architectural pattern)                                                                                                                                                                                                                                 |
| **Purpose**            | Ensures content-heavy pages render as static HTML with JavaScript shipped only for interactive "islands." Reduces page weight, improves LCP, eliminates render-blocking JavaScript, and enhances accessibility.                                             |
| **Integration Method** | Applied via Astro's component model. Static content rendered at build time as HTML. Interactive components marked with `client:*` directives. Each island is independently hydrated. Shared state between islands managed via SolidJS context or URL state. |
| **Criticality**        | Critical                                                                                                                                                                                                                                                    |

**Detailed Requirements:**

- **Zero-JS Default:** All pages must ship zero JavaScript unless explicitly marked for hydration. This includes monograph pages, study guide pages, landing pages, and reference pages.
- **Selective Hydration:** Interactive islands use `client:load` (hydrate immediately), `client:idle` (hydrate when browser is idle), or `client:visible` (hydrate when scrolled into view) based on interaction criticality.
- **Island Boundaries:** Each island must be self-contained with its own state management. Islands communicate via URL parameters, shared stores, or custom events. No direct DOM manipulation between islands.
- **Bundle Analysis:** Each island's JavaScript bundle must be individually analyzed and sized. Total JavaScript per page must not exceed 50KB gzipped for interactive pages or 0KB for static pages.

---

## 3. Styling

### 3.1 Tailwind CSS v4.x

| Field                  | Value                                                                                                                                                                                                                                                                                                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**               | Tailwind CSS                                                                                                                                                                                                                                                                                                                                                        |
| **Version**            | v4.x (minimum 4.0.0, latest 4.x patch)                                                                                                                                                                                                                                                                                                                              |
| **Purpose**            | Utility-first CSS framework providing design system primitives, responsive design utilities, dark mode support, and CSS custom properties integration. Enables rapid development of site-specific visual identities while maintaining design consistency.                                                                                                           |
| **Integration Method** | Installed via `pnpm add tailwindcss @tailwindcss/vite`. Configured as Astro integration or Vite plugin. Tailwind config files per site (`tailwind.config.encyclopeptide.ts`, `tailwind.config.wikipept.ts`). Custom design tokens defined in CSS custom properties via `@theme` directive in v4. Utility classes applied directly in Astro/TSX component templates. |
| **Criticality**        | Critical                                                                                                                                                                                                                                                                                                                                                            |

**Detailed Requirements:**

- **CSS Custom Properties Integration:** Tailwind v4's native CSS custom properties support is required for design token definition. Tokens defined in `:root` CSS blocks and referenced via Tailwind utilities.
- **Purge Configuration:** All unused CSS must be purged in production builds. Tailwind's content scanning must include all `.astro`, `.tsx`, `.jsx`, `.md`, `.mdx` files.
- **Dark Mode:** Both sites support dark mode via Tailwind's `dark:` variant. Dark mode toggle persists via localStorage. Respects `prefers-color-scheme` media query as default.
- **Responsive Design:** Mobile-first responsive design using Tailwind's breakpoint system (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`). Breakpoints: sm=640px, md=768px, lg=1024px, xl=1280px, 2xl=1536px.
- **Typography Plugin:** `@tailwindcss/typography` for prose styling of long-form content (monographs, study guides).

### 3.2 Custom Design Tokens

| Field                  | Value                                                                                                                                                                                                                                                       |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**               | Design Tokens                                                                                                                                                                                                                                               |
| **Version**            | N/A (custom specification)                                                                                                                                                                                                                                  |
| **Purpose**            | Site-specific visual identity tokens defined as CSS custom properties and Tailwind theme extensions. Ensures design consistency, enables theme switching, and provides a single source of truth for visual design.                                          |
| **Integration Method** | Tokens defined in CSS files imported by each site's Astro layout. Tailwind theme extended via `@theme` directive (v4) or `theme.extend` in config. Tokens organized into categories: color, typography, spacing, border-radius, shadow, animation, z-index. |
| **Criticality**        | Critical                                                                                                                                                                                                                                                    |

**Detailed Requirements:**

**encyclopeptide.com Tokens:**

```
--color-primary: #1B2A4A (Dark Navy)
--color-secondary: #FFFFFF (White)
--color-accent: #C9A84C (Gold)
--color-text: #333333 (Charcoal)
--color-text-muted: #666666
--color-bg: #FFFFFF
--color-bg-alt: #F5F5F5
--color-border: #E0E0E0
--color-success: #1B5E20 (Forest Green)
--color-warning: #B71C1C (Deep Red)
--font-heading: 'Playfair Display', serif
--font-body: 'Inter', sans-serif
--font-mono: 'JetBrains Mono', monospace
--content-width: 960px
--section-gap: 24px
--border-radius: 0px (no rounded corners)
```

**wikipept.com Tokens:**

```
--color-primary: #0097A7 (Teal)
--color-secondary: #FFFFFF (White)
--color-accent: #FF6F61 (Coral)
--color-text: #333333
--color-text-muted: #666666
--color-bg: #FFFFFF
--color-bg-alt: #F8F6F3 (Warm Gray)
--color-border: #E0E0E0
--color-success: #66BB6A (Mint Green)
--color-warning: #FFC107 (Amber)
--color-error: #EF5350 (Coral Red)
--font-heading: 'Inter', sans-serif
--font-body: 'Inter', sans-serif
--font-mono: 'JetBrains Mono', monospace
--content-width: 720px
--card-radius: 16px
--card-shadow: 0 2px 8px rgba(0,0,0,0.08)
```

---

## 4. Content Management

### 4.1 MDX

| Field                  | Value                                                                                                                                                                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**               | MDX                                                                                                                                                                                                                                     |
| **Version**            | v3.x (minimum 3.0.0)                                                                                                                                                                                                                    |
| **Purpose**            | Markdown authoring with JSX component embedding. Enables content authors to write Markdown with embedded interactive components (molecular viewers, quiz widgets, comparison tables, flashcard decks) directly in content files.        |
| **Integration Method** | Installed via `pnpm add mdx @astrojs/mdx`. Configured as Astro integration. MDX files placed in `src/content/` collections. Frontmatter parsed via content collection schemas. MDX components registered globally or imported per-file. |
| **Criticality**        | Critical                                                                                                                                                                                                                                |

**Detailed Requirements:**

- **Frontmatter Validation:** All MDX files must have frontmatter validated against Zod schemas defined in `src/content/config.ts`. Required fields vary by collection type.
- **Component Embedding:** MDX content can embed any Astro or SolidJS component. Components must be imported explicitly or registered globally. Interactive components must include appropriate `client:*` directives.
- **Code Highlighting:** MDX content supports fenced code blocks with syntax highlighting via Shiki. Chemical notation (SMILES, InChI) rendered in monospace font.
- **Table of Contents:** Auto-generated from MDX heading structure. Rendered as sidebar navigation or in-page anchor list.
- **Math Rendering:** LaTeX math expressions rendered via KaTeX or MathJax. Required for pharmacokinetic equations, binding affinity calculations, and structural formulas.

### 4.2 Content Collections

| Field                  | Value                                                                                                                                                                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**               | Astro Content Collections                                                                                                                                                                                                           |
| **Version**            | Built-in to Astro v5.x                                                                                                                                                                                                              |
| **Purpose**            | Typed, validated, and queryable content collections with Zod schema enforcement. Provides type-safe content access, build-time validation, and optimized content loading.                                                           |
| **Integration Method** | Collections defined in `src/content/config.ts` with Zod schemas. Content files placed in `src/content/{collection-name}/`. Content queried via `getCollection()` and `getEntry()` APIs. Types generated automatically from schemas. |
| **Criticality**        | Critical                                                                                                                                                                                                                            |

**Detailed Requirements:**

**encyclopeptide.com Collections:**

```typescript
// Monograph collection
const monographSchema = z.object({
  title: z.string(),
  iupacName: z.string().optional(),
  aliases: z.array(z.string()).default([]),
  chainLength: z.number().min(2).max(20),
  chemicalClass: z.enum(['linear', 'cyclic', 'branched']),
  functionalCategory: z.enum([...]),
  sourceOrganisms: z.array(z.string()),
  casNumber: z.string().optional(),
  uniprotId: z.string().optional(),
  pdbIds: z.array(z.string()).default([]),
  molecularFormula: z.string(),
  molecularWeight: z.number(),
  netCharge: z.number(),
  sequence: z.string().regex(/^[ACDEFGHIKLMNPQRSTVWY]+$/),
  threeLetterSequence: z.string(),
  discoveryYear: z.number().optional(),
  therapeuticArea: z.enum([...]),
  references: z.array(z.object({
    doi: z.string(),
    title: z.string(),
    authors: z.array(z.string()),
    journal: z.string(),
    year: z.number(),
  })),
  pdbStructure: z.string().optional(),
  smiles: z.string().optional(),
  inchi: z.string().optional(),
});
```

**wikipept.com Collections:**

```typescript
// Study guide collection
const studyGuideSchema = z.object({
  title: z.string(),
  description: z.string(),
  educationalLevel: z.enum(["foundational", "intermediate", "advanced", "expert"]),
  estimatedTime: z.string(), // ISO 8601 duration
  prerequisites: z.array(z.string()).default([]),
  learningObjectives: z.array(z.string()),
  difficulty: z.number().min(1).max(5),
  topics: z.array(z.string()),
  quizIds: z.array(z.string()).default([]),
  flashcardDeckId: z.string().optional(),
  lastReviewed: z.string().datetime(),
  reviewerName: z.string().optional(),
  reviewerCredentials: z.string().optional(),
  communityRating: z.number().min(0).max(5).optional(),
  communityRatingCount: z.number().min(0).optional(),
});
```

### 4.3 Astro Content Layer

| Field                  | Value                                                                                                                                                                                                                                                                |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**               | Astro Content Layer                                                                                                                                                                                                                                                  |
| **Version**            | Built-in to Astro v5.x                                                                                                                                                                                                                                               |
| **Purpose**            | Unified content loading system that supports local files, remote data sources, and custom loaders. Enables integration with external peptide databases (UniProt, PDB, ChEMBL) as content sources alongside local MDX files.                                          |
| **Integration Method** | Content sources defined in `astro.config.mjs` via `content.config.ts`. Loaders implemented as TypeScript modules that fetch, transform, and cache remote data. Local content uses the `glob` loader. Remote content uses custom loaders with fetch/cache strategies. |
| **Criticality**        | High                                                                                                                                                                                                                                                                 |

**Detailed Requirements:**

- **Local Content Loader:** `glob` loader for MDX files in `src/content/`. Supports `base` directory, `pattern` glob, and `generateId` function.
- **Remote Content Loader:** Custom loaders for UniProt, PDB, and ChEMBL APIs. Loaders must implement caching (KV-based), rate limiting, error handling, and fallback to stale data.
- **Data Normalization:** Remote data must be normalized to match local content schemas. Peptide sequences, structural data, and references must be consistent across sources.
- **Incremental Updates:** Content Layer must support incremental updates without full rebuilds. Remote content cached with configurable TTL.

---

## 5. Deployment Infrastructure

### 5.1 Cloudflare Pages (Static)

| Field                  | Value                                                                                                                                                                                                                                                            |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**               | Cloudflare Pages                                                                                                                                                                                                                                                 |
| **Version**            | Current (managed platform)                                                                                                                                                                                                                                       |
| **Purpose**            | Static site hosting and deployment platform. Provides global edge network (300+ cities), automatic HTTPS, Brotli/HTTP3 compression, preview deployments, and integrated CI/CD. Primary deployment target for encyclopeptide.com and wikipept.com static content. |
| **Integration Method** | Connected to Git repository (GitHub/GitLab). Automatic builds triggered on push to main branch. Build command: `pnpm build`. Build output directory: `dist/`. Preview deployments for pull requests. Custom domain configuration via Cloudflare DNS.             |
| **Criticality**        | Critical                                                                                                                                                                                                                                                         |

**Detailed Requirements:**

- **Build Configuration:** Node.js 20+ runtime for builds. pnpm package manager. Build command produces static HTML in `dist/` directory. Build logs captured and available for debugging.
- **Domain Configuration:** Both sites configured with custom domains (encyclopeptide.com, wikipept.com). SSL/TLS certificates auto-provisioned. DNS records managed via Cloudflare.
- **Preview Deployments:** Every pull request generates a unique preview URL for testing. Preview environments include all features except production-only integrations (analytics, user data).
- **Headers and Redirects:** `_headers` and `_redirects` files for custom HTTP headers (CSP, HSTS, Permissions-Policy) and URL redirects.
- **Functions:** Cloudflare Pages Functions for server-side logic on wikipept.com (authentication, community editing, progress tracking).

### 5.2 Cloudflare Workers (Dynamic)

| Field                  | Value                                                                                                                                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Name**               | Cloudflare Workers                                                                                                                                                                                                                               |
| **Version**            | v2 (current)                                                                                                                                                                                                                                     |
| **Purpose**            | Serverless compute at the edge for dynamic features. Handles user authentication, community edit processing, progress tracking, search API, and webhook processing. Runs in Cloudflare's V8 isolates with sub-millisecond cold starts.           |
| **Integration Method** | Implemented as Cloudflare Pages Functions (in `src/pages/api/` or `functions/` directory). Deployed alongside static pages. Workers configured via `wrangler.toml` or `wrangler.jsonc`. Bindings configured for KV, R2, D1, and Durable Objects. |
| **Criticality**        | Critical                                                                                                                                                                                                                                         |

**Detailed Requirements:**

- **Function Format:** ESM (ES Modules) format. TypeScript supported via build step.
- **CPU Limits:** 10ms (free plan) or 50ms (paid plan) CPU time per request. Complex operations must be decomposed into smaller tasks.
- **Memory Limits:** 128MB per request. Large data processing must stream data rather than buffering.
- **Subrequest Limits:** 50 subrequests per request (free) or 1000 (paid). External API calls (UniProt, PDB, ChEMBL) must be counted and rate-limited.
- **Error Handling:** Functions must implement try/catch with appropriate HTTP error responses. Graceful degradation when upstream services are unavailable.
- **Logging:** Console logs available via `wrangler tail` or logpush configuration.

### 5.3 Cloudflare R2 (Assets)

| Field                  | Value                                                                                                                                                                                                                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**               | Cloudflare R2                                                                                                                                                                                                                                                                                            |
| **Version**            | Current (managed platform)                                                                                                                                                                                                                                                                               |
| **Purpose**            | S3-compatible object storage with zero egress fees. Stores static assets: molecular structure files (PDB, SDF, MOL2), images (molecular diagrams, educational illustrations, social cards), downloadable data files (CSV, JSON exports), user-generated content (wiki attachments), and build artifacts. |
| **Integration Method** | R2 bucket created per site (or shared). Assets uploaded during build process or on-demand via Workers API. Cloudflare Images integration for image optimization. Public assets served via R2 public access or via Workers reverse proxy. Private assets accessed via signed URLs.                        |
| **Criticality**        | High                                                                                                                                                                                                                                                                                                     |

**Detailed Requirements:**

- **Bucket Configuration:** Separate buckets for each site's assets. Lifecycle rules for transitioning old assets to infrequent access class. Versioning enabled for critical assets.
- **Image Optimization:** Cloudflare Images for resizing, format conversion (WebP, AVIF), and CDN delivery. Responsive image sizing via `srcset` attributes.
- **File Size Limits:** Individual files up to 5TB (R2 limit). Practical limit: 100MB per file for web-served assets.
- **Access Control:** Public assets accessible via custom domain or R2 public URL. Private assets accessible via Workers-generated signed URLs with configurable expiration.
- **Metadata:** Custom metadata on objects for content type, version, and cache control.

### 5.4 Cloudflare KV (Caching)

| Field                  | Value                                                                                                                                                                                                                                                            |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**               | Cloudflare KV                                                                                                                                                                                                                                                    |
| **Version**            | Current (managed platform)                                                                                                                                                                                                                                       |
| **Purpose**            | Global low-latency key-value store for caching, session storage, feature flags, and rate limiting data. Provides eventual consistency with sub-millisecond reads at edge. Used for caching API responses, user sessions, search indices, and configuration data. |
| **Integration Method** | KV namespace created per environment (production, preview). Bindings configured in `wrangler.toml`. Operations via `env.KV_NAMESPACE.get()`, `.put()`, `.delete()`, `.list()` from Workers/Pages Functions. TTL-based expiration via `expirationTtl` parameter.  |
| **Criticality**        | High                                                                                                                                                                                                                                                             |

**Detailed Requirements:**

- **Eventual Consistency:** KV is eventually consistent. Write-after-read may return stale data. This is acceptable for: session data, cached API responses, search indices, feature flags. NOT acceptable for: real-time edit conflict detection (use Durable Objects), atomic counters (use Durable Objects).
- **Storage Limits:** 1GB free, 10KB per value, 25MB per namespace (free). Paid plan: 10GB+ storage, 25MB per value, unlimited namespaces.
- **Expiration:** TTL-based expiration for cached data. API response cache: 1 hour TTL. Session data: 24 hour TTL. Search index: 6 hour TTL.
- **Key Naming Convention:** `{site}:{collection}:{id}:{version}` pattern for hierarchical key organization.

---

## 6. Build Tools

### 6.1 Node.js

| Field                  | Value                                                                                                                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**               | Node.js                                                                                                                                                                             |
| **Version**            | v20.x LTS (minimum 20.11.0, recommended 20.x latest LTS)                                                                                                                            |
| **Purpose**            | JavaScript runtime for build processes, development server, and tooling. Provides the execution environment for Astro, Vite, Tailwind, TypeScript, and all build-time dependencies. |
| **Integration Method** | Installed via system package manager, nvm, or fnm. Version pinned in `.nvmrc` or `.node-version` file. CI/CD pipeline uses `setup-node` action with version from pin file.          |
| **Criticality**        | Critical                                                                                                                                                                            |

**Detailed Requirements:**

- **Version Pinning:** `.nvmrc` file in repository root specifies exact version. All environments (local development, CI/CD, preview, production build) must use the same major.minor version.
- **Package Manager:** pnpm (see 6.2). npm and yarn are not supported.
- **Global Packages:** No global package installations. All tools installed as project dependencies.
- **Engine Constraints:** `package.json` `engines` field enforces minimum Node.js version.

### 6.2 pnpm

| Field                  | Value                                                                                                                                                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**               | pnpm                                                                                                                                                                                                                                     |
| **Version**            | v9.x (minimum 9.0.0, latest 9.x patch)                                                                                                                                                                                                   |
| **Purpose**            | Fast, disk-efficient package manager with strict dependency resolution, content-addressable storage, and workspace support. Prevents phantom dependencies and ensures reproducible builds.                                               |
| **Integration Method** | Installed via `corepack enable && corepack prepare pnpm@9.x --activate`. Version pinned in `package.json` `packageManager` field. Lockfile (`pnpm-lock.yaml`) committed to repository. Workspace configuration in `pnpm-workspace.yaml`. |
| **Criticality**        | Critical                                                                                                                                                                                                                                 |

**Detailed Requirements:**

- **Lockfile Integrity:** `pnpm-lock.yaml` must be committed and never manually edited. CI/CD runs `pnpm install --frozen-lockfile` to ensure reproducibility.
- **Workspace Configuration:** Monorepo structure with `pnpm-workspace.yaml` defining package locations. Shared dependencies hoisted to workspace root.
- **Strict Mode:** `node-linker=isolated` (default) for strict dependency resolution. No phantom dependencies.
- **Store:** Content-addressable store for deduplication. Store location configurable via `.npmrc`.

### 6.3 TypeScript

| Field                  | Value                                                                                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**               | TypeScript                                                                                                                                                                                        |
| **Version**            | v5.x (minimum 5.3.0, latest 5.x patch)                                                                                                                                                            |
| **Purpose**            | Static type checking for JavaScript. Provides type safety for component props, API responses, content schemas, and build configuration. Catches type errors at build time rather than runtime.    |
| **Integration Method** | Installed via `pnpm add -D typescript`. Configuration in `tsconfig.json` per site. Strict mode enabled globally. Path aliases configured for imports. Astro provides built-in TypeScript support. |
| **Criticality**        | Critical                                                                                                                                                                                          |

**Detailed Requirements:**

- **Strict Mode Configuration:**

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "exactOptionalPropertyTypes": false,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

- **Path Aliases:** `@/` alias for `src/` directory. `@components/`, `@layouts/`, `@utils/`, `@types/` aliases for common directories.
- **Type Generation:** Astro generates types from content collection schemas. These types must be checked into the repository for IDE support.
- **No `any`:** The `any` type is prohibited. Use `unknown` for untyped data and narrow via type guards.

---

## 7. Testing

### 7.1 Vitest

| Field                  | Value                                                                                                                                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**               | Vitest                                                                                                                                                                                                                                            |
| **Version**            | v2.x (minimum 2.0.0, latest 2.x patch)                                                                                                                                                                                                            |
| **Purpose**            | Unit and integration testing framework. Vite-native, fast, compatible with Jest API. Tests component logic, utility functions, content collection schemas, API handlers, and build outputs.                                                       |
| **Integration Method** | Installed via `pnpm add -D vitest`. Configuration in `vitest.config.ts`. Test files in `src/**/*.test.ts`, `src/**/*.test.tsx`, `tests/**/*.test.ts`. Run via `pnpm test`. Coverage via `@vitest/coverage-v8`. CI integration via GitHub Actions. |
| **Criticality**        | Critical                                                                                                                                                                                                                                          |

**Detailed Requirements:**

- **Test File Naming:** `*.test.ts` for unit tests, `*.test.tsx` for component tests. Test files colocated with source files or in `tests/` directory.
- **Coverage Thresholds:** Minimum 80% line coverage, 80% branch coverage, 80% function coverage for all source files. Coverage enforced in CI/CD pipeline.
- **Component Testing:** SolidJS components tested via `@solidjs/testing-library`. Astro components tested via snapshot testing or integration tests.
- **Mocking:** Mock external API calls (UniProt, PDB, ChEMBL) in unit tests. Mock KV/R2/D1 operations in Worker tests.
- **Test Isolation:** Each test runs in isolation. No shared state between tests. beforeEach/afterEach for setup/teardown.

### 7.2 Playwright

| Field                  | Value                                                                                                                                                                                                                                                |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**               | Playwright                                                                                                                                                                                                                                           |
| **Version**            | v1.x (minimum 1.40.0, latest 1.x patch)                                                                                                                                                                                                              |
| **Purpose**            | End-to-end (E2E) testing framework. Tests full user journeys across both sites in real browsers. Validates navigation, interactive features, responsive design, accessibility, and cross-browser compatibility.                                      |
| **Integration Method** | Installed via `pnpm add -D @playwright/test`. Configuration in `playwright.config.ts`. Test files in `tests/e2e/**/*.spec.ts`. Browsers: Chromium, Firefox, WebKit. Run via `pnpm test:e2e`. CI integration via GitHub Actions with browser caching. |
| **Criticality**        | Critical                                                                                                                                                                                                                                             |

**Detailed Requirements:**

- **Browser Coverage:** Tests run on Chromium (primary), Firefox, and WebKit (Safari). Mobile testing via device emulation (iPhone 14, Pixel 7, iPad Pro).
- **Test Scenarios:**
  - **encyclopeptide.com:** Monograph navigation, 3D molecular viewer interaction, search functionality, data table sorting/filtering, citation export, responsive layout, dark mode toggle.
  - **wikipept.com:** Study guide navigation, quiz completion flow, flashcard flip and review, community edit submission, user authentication flow, progress tracking, responsive layout, dark mode toggle.
- **Accessibility Testing:** Playwright tests include `@axe-core/playwright` integration for automated WCAG 2.1 AA compliance checks on every page.
- **Visual Regression:** Playwright screenshot comparison for visual regression testing. Baseline screenshots stored in repository. Diff tolerance configured per component.
- **CI Integration:** E2E tests run on every pull request against preview deployment. Full browser matrix on main branch push.

### 7.3 Lighthouse CI

| Field                  | Value                                                                                                                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**               | Lighthouse CI (LHCI)                                                                                                                                                                                      |
| **Version**            | v0.14.x (minimum 0.14.0)                                                                                                                                                                                  |
| **Purpose**            | Automated performance, accessibility, SEO, and best practices auditing. Runs Lighthouse in CI/CD pipeline to enforce Core Web Vitals thresholds and catch regressions.                                    |
| **Integration Method** | Installed via `pnpm add -D @lhci/cli`. Configuration in `lighthouserc.js`. Run via `pnpm lighthouse`. CI integration via GitHub Actions. Results uploaded to Lighthouse CI server or stored as artifacts. |
| **Criticality**        | Critical                                                                                                                                                                                                  |

**Detailed Requirements:**

- **Performance Budgets:**
  - Performance score: ≥90
  - Accessibility score: ≥95
  - Best Practices score: ≥90
  - SEO score: ≥95
  - LCP: ≤2.5s
  - CLS: ≤0.1
  - INP: ≤200ms
  - FCP: ≤1.8s
  - TTI: ≤3.5s
  - Total page weight: ≤500KB (initial load)
- **Assertions:** LHCI assert configuration enforces budgets. Build fails if any budget is exceeded.
- **Multi-page Testing:** Lighthouse runs on key pages: homepage, monograph pages, study guide pages, quiz pages, search results page.
- **Historical Tracking:** Lighthouse results tracked over time to detect performance regressions. Results stored in `.reports/lighthouse/`.

---

## 8. Analytics

### 8.1 Cloudflare Web Analytics

| Field                  | Value                                                                                                                                                                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**               | Cloudflare Web Analytics                                                                                                                                                                                                                     |
| **Version**            | Current (managed platform)                                                                                                                                                                                                                   |
| **Purpose**            | Privacy-first, cookie-free web analytics. Provides page views, unique visitors, referrers, top pages, browsers, operating systems, countries, and Core Web Vitals data without tracking individuals. Compliant with GDPR and CCPA by design. |
| **Integration Method** | Enabled via Cloudflare dashboard. Single `<script>` tag added to page `<head>` (or injected via Cloudflare Rules). No cookie consent banner required (cookie-free). Data available in Cloudflare dashboard and via API.                      |
| **Criticality**        | High                                                                                                                                                                                                                                         |

**Detailed Requirements:**

- **Privacy Compliance:** No cookies set. No personal data collected. No cross-site tracking. Fully compliant with GDPR (no consent required) and CCPA (no "Do Not Sell" required).
- **Core Web Vitals:** Automatically collects LCP, CLS, INP, FCP, TTFB field data from real users. Data available per page, per device type, and per country.
- **Dashboard:** Cloudflare dashboard provides: page views, unique visitors (privacy-preserving count), top pages, referrers, browsers, OS, countries, device types.
- **API Access:** Analytics data accessible via Cloudflare API for custom reporting and integration with internal dashboards.
- **Sampling:** No sampling for standard metrics. All visitor data processed.

### 8.2 Plausible Analytics (Fallback)

| Field                  | Value                                                                                                                                                                                                                                         |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**               | Plausible Analytics                                                                                                                                                                                                                           |
| **Version**            | v2.x (self-hosted) or Current (cloud)                                                                                                                                                                                                         |
| **Purpose**            | Privacy-first, lightweight web analytics alternative. Serves as fallback if Cloudflare Web Analytics insufficient or if self-hosted analytics desired. Cookie-free, GDPR/CCPA/ePrivacy compliant without consent banners. Script size <1KB.   |
| **Integration Method** | Cloud: Plausible Cloud script tag. Self-hosted: Plausible Community Edition deployed to Cloudflare Workers or separate server. Script tag added to page `<head>`. Custom events for quiz completions, flashcard reviews, and community edits. |
| **Criticality**        | Low                                                                                                                                                                                                                                           |

**Detailed Requirements:**

- **Privacy Compliance:** No cookies. No personal data. EU-hosted option available. Fully GDPR/CCPA compliant.
- **Custom Events:** Track: page views, quiz completions, flashcard reviews, community edits, search queries, molecular viewer interactions, export downloads.
- **Goal Tracking:** Define conversion goals for key user actions (first quiz completed, first flashcard reviewed, first community edit).
- **Revenue Tracking:** Optional integration with Stripe for premium features (if applicable).

---

## 9. Search

### 9.1 Pagefind

| Field                  | Value                                                                                                                                                                                                                                                             |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**               | Pagefind                                                                                                                                                                                                                                                          |
| **Version**            | v1.x (minimum 1.0.0, latest 1.x patch)                                                                                                                                                                                                                            |
| **Purpose**            | Static search library that generates a search index at build time. Provides client-side full-text search with zero server infrastructure. Index served as static JSON files from Cloudflare Pages. Supports faceted search, filtering, and ranking.               |
| **Integration Method** | Installed via `pnpm add -D pagefind`. Integrated into build process: `pagefind --site dist`. Search UI built as Astro island with SolidJS. Pagefind JavaScript loaded on demand when search UI is activated. Index files served from `dist/_pagefind/` directory. |
| **Criticality**        | High                                                                                                                                                                                                                                                              |

**Detailed Requirements:**

- **Index Generation:** Pagefind indexes all static HTML output. Supports Chinese, Japanese, and Korean (CJK) text segmentation. Custom weightings for titles, headings, and body text.
- **Search UI:** Custom search interface built as SolidJS island. Features: text input with debounced search, result preview with highlighted terms, faceted filtering (by collection, category, difficulty level), pagination, keyboard navigation.
- **Performance:** Search index loaded lazily when user activates search. Initial search response <100ms for queries on typical hardware. Index size <500KB gzipped for 1000 pages.
- **Offline Support:** Search works offline after initial index load. Service worker caches search index for offline access.

### 9.2 FlexSearch

| Field                  | Value                                                                                                                                                                                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**               | FlexSearch                                                                                                                                                                                                                                                                             |
| **Version**            | v0.7.x (minimum 0.7.0)                                                                                                                                                                                                                                                                 |
| **Purpose**            | High-performance client-side full-text search library. Provides faster and more flexible search than Pagefind for advanced use cases. Supports custom scoring, field weighting, fuzzy matching, and wildcard search. Used for the internal search API on wikipept.com's dynamic pages. |
| **Integration Method** | Installed via `pnpm add flexsearch`. Indexed at build time for static content or at request time for dynamic content. Search index stored in memory or serialized to JSON. Integrated with SolidJS search component.                                                                   |
| **Criticality**        | Medium                                                                                                                                                                                                                                                                                 |

**Detailed Requirements:**

- **Index Configuration:** Custom field weights: title (10x), headings (5x), body (1x), tags (3x). Fuzzy matching with configurable tolerance. Wildcard search support.
- **Tokenizer:** Custom tokenizer for scientific content. Handles amino acid sequences (single-letter codes), chemical formulas, and mixed alphanumeric identifiers (PDB IDs, UniProt IDs).
- **Performance:** Index 10,000 documents in <2 seconds. Search response <50ms for typical queries.
- **Worker Support:** Optional Web Worker for index building and search to avoid blocking main thread.

---

## 10. Internationalization

### 10.1 astro-i18next

| Field                  | Value                                                                                                                                                                                                                        |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**               | astro-i18next                                                                                                                                                                                                                |
| **Version**            | v2.x (minimum 2.0.0)                                                                                                                                                                                                         |
| **Purpose**            | Internationalization integration for Astro. Provides i18n routing, locale detection, translation functions, and namespace-based message organization. Integrates with i18next ecosystem for ICU MessageFormat support.       |
| **Integration Method** | Installed via `pnpm add astro-i18next`. Configured in `astro.config.mjs` as Astro integration. Translation files in `src/i18n/locales/{locale}.json`. Routing configured for locale-prefixed paths (`/en/`, `/es/`, `/fr/`). |
| **Criticality**        | High                                                                                                                                                                                                                         |

**Detailed Requirements:**

- **Supported Locales:** Initial launch: `en` (English). Phase 2: `es` (Spanish), `fr` (French), `de` (German), `zh` (Chinese), `ja` (Japanese). Architecture must support additional locales without code changes.
- **Routing Strategy:** Locale-prefixed URLs (`/en/angiotensin-ii`, `/es/angiotensin-ii`). Default locale (`en`) accessible without prefix or with `/en/` prefix. Non-default locales redirect from root to locale-prefixed path.
- **Content Translation:** MDX content available in multiple locales via parallel directory structure: `src/content/en/`, `src/content/es/`, etc. Missing translations fall back to English.
- **Metadata Translation:** Page titles, descriptions, and Open Graph tags translated per locale. Schema.org structured data includes `inLanguage` property.

### 10.2 Custom i18n Routing

| Field                  | Value                                                                                                                                                                              |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**               | Custom i18n Routing                                                                                                                                                                |
| **Version**            | N/A (custom implementation)                                                                                                                                                        |
| **Purpose**            | Fallback i18n routing for cases where astro-i18next is insufficient. Handles locale detection from Accept-Language header, URL-based locale switching, and locale-aware redirects. |
| **Integration Method** | Middleware in `src/middleware.ts` for locale detection and redirect. Locale switcher component in site header. URL helper functions in `src/utils/i18n.ts`.                        |
| **Criticality**        | Medium                                                                                                                                                                             |

**Detailed Requirements:**

- **Locale Detection:** Detect locale from: URL path prefix, Accept-Language header, localStorage preference, Cloudflare cf-locale header. Priority order: URL > localStorage > Accept-Language > Cloudflare header > default.
- **Locale Switcher:** Language selector in site header. Shows current locale name in native language (English, Español, Français, etc.). Available locales listed with their native names.
- **Fallback:** Missing translations fall back to English. Missing locale-specific pages show English version with locale indicator.
- **SEO:** `<link rel="alternate" hreflang="...">` tags for all locale variants. Canonical URL reflects correct locale.

---

## 11. Tool Requirements Table

| Tool Name                      | Version              | Purpose                                                         | Installation Method                                                      | Criticality |
| ------------------------------ | -------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------- |
| **Astro**                      | v5.x (≥5.0.0)        | Static site generator, island architecture, content collections | `pnpm add astro`                                                         | Critical    |
| **SolidJS**                    | v1.x (≥1.8.0)        | Reactive UI framework for interactive components                | `pnpm add solid-js @astrojs/solid-js`                                    | Critical    |
| **Tailwind CSS**               | v4.x (≥4.0.0)        | Utility-first CSS framework, design tokens                      | `pnpm add tailwindcss @tailwindcss/vite`                                 | Critical    |
| **TypeScript**                 | v5.x (≥5.3.0)        | Static type checking                                            | `pnpm add -D typescript`                                                 | Critical    |
| **Node.js**                    | v20.x LTS (≥20.11.0) | JavaScript runtime for builds and tooling                       | System package manager / nvm / fnm                                       | Critical    |
| **pnpm**                       | v9.x (≥9.0.0)        | Package manager with strict dependency resolution               | `corepack enable && corepack prepare pnpm@9.x --activate`                | Critical    |
| **MDX**                        | v3.x (≥3.0.0)        | Markdown with JSX component embedding                           | `pnpm add mdx @astrojs/mdx`                                              | Critical    |
| **Vitest**                     | v2.x (≥2.0.0)        | Unit and integration testing                                    | `pnpm add -D vitest @vitest/coverage-v8`                                 | Critical    |
| **Playwright**                 | v1.x (≥1.40.0)       | End-to-end testing in real browsers                             | `pnpm add -D @playwright/test`                                           | Critical    |
| **Lighthouse CI**              | v0.14.x (≥0.14.0)    | Performance and accessibility auditing in CI/CD                 | `pnpm add -D @lhci/cli`                                                  | Critical    |
| **Pagefind**                   | v1.x (≥1.0.0)        | Static full-text search index generation                        | `pnpm add -D pagefind`                                                   | High        |
| **FlexSearch**                 | v0.7.x (≥0.7.0)      | High-performance client-side search                             | `pnpm add flexsearch`                                                    | Medium      |
| **astro-i18next**              | v2.x (≥2.0.0)        | i18n integration for Astro                                      | `pnpm add astro-i18next`                                                 | High        |
| **Cloudflare Pages**           | Current              | Static site hosting and deployment                              | Cloudflare dashboard + Git integration                                   | Critical    |
| **Cloudflare Workers**         | v2                   | Serverless edge compute                                         | Pages Functions / wrangler                                               | Critical    |
| **Cloudflare R2**              | Current              | Object storage for assets                                       | Cloudflare dashboard + Workers API                                       | High        |
| **Cloudflare KV**              | Current              | Key-value store for caching                                     | Cloudflare dashboard + Workers API                                       | High        |
| **Cloudflare D1**              | Current              | Edge SQLite database                                            | Cloudflare dashboard + Workers API                                       | High        |
| **Cloudflare Durable Objects** | Current              | Strongly consistent edge compute                                | Workers API                                                              | High        |
| **Cloudflare Web Analytics**   | Current              | Privacy-first analytics                                         | Cloudflare dashboard                                                     | High        |
| **Plausible Analytics**        | v2.x                 | Privacy-first analytics (fallback)                              | Script tag / self-hosted                                                 | Low         |
| **Zod**                        | v3.x (≥3.22.0)       | Schema validation for content collections                       | `pnpm add zod`                                                           | Critical    |
| **@astrojs/mdx**               | v4.x                 | Astro MDX integration                                           | `pnpm add @astrojs/mdx`                                                  | Critical    |
| **@astrojs/solid-js**          | v4.x                 | Astro SolidJS integration                                       | `pnpm add @astrojs/solid-js`                                             | Critical    |
| **@solidjs/testing-library**   | v1.x                 | SolidJS component testing                                       | `pnpm add -D @solidjs/testing-library`                                   | High        |
| **@vitest/coverage-v8**        | v2.x                 | Code coverage reporting                                         | `pnpm add -D @vitest/coverage-v8`                                        | High        |
| **@axe-core/playwright**       | v4.x                 | Accessibility testing in Playwright                             | `pnpm add -D @axe-core/playwright`                                       | High        |
| **Shiki**                      | v1.x                 | Syntax highlighting for code blocks                             | Built-in with Astro                                                      | High        |
| **KaTeX**                      | v0.16.x              | LaTeX math rendering                                            | `pnpm add katex`                                                         | Medium      |
| **Wrangler**                   | v3.x                 | Cloudflare Workers CLI and development                          | `pnpm add -D wrangler`                                                   | Critical    |
| **Git**                        | v2.x                 | Version control                                                 | System package manager                                                   | Critical    |
| **GitHub Actions**             | N/A                  | CI/CD pipeline                                                  | `.github/workflows/` configuration                                       | Critical    |
| **ESLint**                     | v9.x                 | Code linting                                                    | `pnpm add -D eslint @eslint/js`                                          | High        |
| **Prettier**                   | v3.x                 | Code formatting                                                 | `pnpm add -D prettier`                                                   | High        |
| **@typescript-eslint**         | v8.x                 | TypeScript ESLint integration                                   | `pnpm add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser` | High        |
| **sharp**                      | v0.33.x              | Image processing and optimization                               | `pnpm add sharp`                                                         | Medium      |
| **@cloudflare/workers-types**  | v4.x                 | TypeScript types for Workers API                                | `pnpm add -D @cloudflare/workers-types`                                  | High        |

---

## Appendix A: Version Constraint Summary

| Tool         | Minimum Version | Recommended Version | Maximum Version | Breaking Change Risk |
| ------------ | --------------- | ------------------- | --------------- | -------------------- |
| Astro        | 5.0.0           | 5.x latest          | <6.0.0          | High (major)         |
| SolidJS      | 1.8.0           | 1.x latest          | <2.0.0          | High (major)         |
| Tailwind CSS | 4.0.0           | 4.x latest          | <5.0.0          | High (major)         |
| TypeScript   | 5.3.0           | 5.x latest          | <6.0.0          | Medium (minor)       |
| Node.js      | 20.11.0         | 20.x LTS latest     | <21.0.0         | High (major)         |
| pnpm         | 9.0.0           | 9.x latest          | <10.0.0         | Medium (major)       |
| Vitest       | 2.0.0           | 2.x latest          | <3.0.0          | Medium (major)       |
| Playwright   | 1.40.0          | 1.x latest          | <2.0.0          | Low (minor)          |
| LHCI         | 0.14.0          | 0.14.x latest       | <1.0.0          | Low (minor)          |
| Pagefind     | 1.0.0           | 1.x latest          | <2.0.0          | Low (major)          |

## Appendix B: Criticality Classification

| Level        | Definition                                                                         | Examples                                                                                                                 | Requirements                                                                                                 |
| ------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| **Critical** | Failure prevents site from functioning. No workaround.                             | Astro, SolidJS, Tailwind, TypeScript, Node.js, pnpm, Vitest, Playwright, LHCI, Cloudflare Pages, Cloudflare Workers, Zod | Must be present and correctly configured for any build or deployment. Version constraints must be satisfied. |
| **High**     | Failure degrades significant functionality. Workaround exists but is inconvenient. | Pagefind, astro-i18next, Cloudflare R2, Cloudflare KV, Cloudflare D1, Cloudflare Web Analytics, ESLint, Prettier         | Must be present for full functionality. Can be temporarily disabled with degraded experience.                |
| **Medium**   | Failure affects non-critical feature. User can accomplish goals without it.        | FlexSearch, KaTeX, sharp, Custom i18n routing                                                                            | Can be deferred to post-launch without blocking core functionality.                                          |
| **Low**      | Failure is cosmetic or organizational. No user impact.                             | Plausible Analytics                                                                                                      | Optional. Can be added or removed without affecting core functionality.                                      |

## Appendix C: Build Pipeline Dependencies

```
Install Dependencies (pnpm install)
    ↓
Type Check (tsc --noEmit)
    ↓
Lint (eslint src/)
    ↓
Unit Tests (vitest run)
    ↓
Build (astro build)
    ↓
Generate Search Index (pagefind --site dist)
    ↓
E2E Tests (playwright test)
    ↓
Lighthouse Audit (lhci autorun)
    ↓
Deploy to Cloudflare Pages (wrangler pages deploy dist)
```

Each step must succeed before proceeding to the next. Failure at any step blocks deployment. Test artifacts and reports stored as CI/CD artifacts for debugging.
