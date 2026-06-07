---
document_id: BP-COMP-SHARED-001
title: "Shared Components Library"
version: "1.0.0"
date: "2026-06-07"
status: DRAFT
authors:
  - name: "Wikisites Architecture Team"
    role: "Primary Authors"
classification: "Internal — Phase 2 Architectural Specification"
ieee_standard: "IEEE 1016-2024"
applicable_sites:
  - SHARED
abstract: >-
  IEEE 1016 compliant architectural specification for the shared component
  library consumed by both encyclopeptide.com and wikipept.com. Covers
  oligopeptide data models, molecular structure renderer integration, search
  engine abstraction, internationalization system, authentication/authorization
  subsystem, and analytics pipeline.
yellow_paper_refs:
  - "YP-CHEM-OLIGO-001"
  - "YP-BIO-OLIGO-001"
  - "YP-WEB-TECH-001"
---

# Blue Paper: Shared Components Library

**Document ID:** BP-COMP-SHARED-001
**Version:** 1.0.0
**Date:** 2026-06-07
**Status:** DRAFT
**IEEE Standard:** IEEE 1016-2024

---

## Table of Contents

1. [BP-1: Design Overview](#bp-1-design-overview)
2. [BP-2: Design Decomposition](#bp-2-design-decomposition)
3. [BP-3: Design Rationale](#bp-3-design-rationale)
4. [BP-4: Traceability](#bp-4-traceability)
5. [BP-5: Interface Design](#bp-5-interface-design)
6. [BP-6: Data Design](#bp-6-data-design)
7. [BP-7: Component Design](#bp-7-component-design)
8. [BP-8: Deployment Design](#bp-8-deployment-design)
9. [BP-9: Formal Verification](#bp-9-formal-verification)
10. [BP-10: HAL Specification](#bp-10-hal-specification)
11. [BP-11: Compliance Matrix](#bp-11-compliance-matrix)
12. [BP-12: Quality Checklist](#bp-12-quality-checklist)

---

## BP-1: Design Overview

### 1.1 System Purpose

The Shared Components Library (`@wikisites/shared`) provides reusable, framework-agnostic modules consumed by both encyclopeptide.com and wikipept.com. The library eliminates code duplication for domain logic, ensures consistent data models across both sites, and provides a single source of truth for oligopeptide calculations, search indexing, internationalization, authentication, and analytics. The library is designed as a TypeScript package with zero framework dependencies, importable by both Astro/SolidJS sites.

### 1.2 System Scope

The library encompasses:

1. **Oligopeptide Data Models**: TypeScript interfaces and Zod schemas shared across both sites
2. **Calculation Engine**: Molecular weight, charge, pI, extinction coefficient calculators per YP-CHEM-OLIGO-001
3. **Molecular Structure Renderer**: Abstraction layer for Mol*, NGL Viewer, and 3Dmol.js
4. **Search Engine**: Index generation, query execution, ranking, and faceted filtering
5. **Internationalization (i18n)**: Locale detection, translation management, URL routing
6. **Authentication/Authorization**: OAuth integration, session management, role-based access control
7. **Analytics Pipeline**: Event tracking, learning analytics, engagement metrics

### 1.3 Stakeholders

| Stakeholder | Role | Primary Concern |
|-------------|------|-----------------|
| Site Developers | Consumers of shared library | API consistency, type safety, documentation |
| Content Authors | Indirect consumers | Consistent content schemas |
| QA Engineers | Testers | Testable, predictable interfaces |
| DevOps Engineers | Deployers | Build performance, bundle size |

### 1.4 Context Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                  @WIKISITES/SHARED LIBRARY                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │ Data Models  │    │ Calculation  │    │  Search      │  │
│  │ (TypeScript) │    │ Engine       │    │  Engine      │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│                                                               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │ i18n         │    │ Auth/AuthZ   │    │ Analytics    │  │
│  │ System       │    │ Subsystem    │    │ Pipeline     │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            Molecular Structure Renderer               │   │
│  │  (Mol* / NGL Viewer / 3Dmol.js abstraction)          │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
         │                        │
         ▼                        ▼
┌──────────────┐          ┌──────────────┐
│  ENCP Site   │          │  WIKI Site   │
│  (Astro)     │          │  (Astro)     │
└──────────────┘          └──────────────┘
```

---

## BP-2: Design Decomposition

### 2.1 Component Hierarchy

```
@wikisites/shared
├── models/
│   ├── peptide.ts          (Oligopeptide, Classification, StructuralFeatures)
│   ├── aminoacid.ts        (AminoAcid, ResidueProperties, mass/pKa tables)
│   ├── pharmacology.ts     (ReceptorBinding, PharmacokineticProfile)
│   ├── content.ts          (WikiPage, StudyGuide, QuizQuestion, Flashcard)
│   ├── user.ts             (User, UserProgress, Reputation)
│   ├── citation.ts         (Reference, CitationExport)
│   └── schemas/            (Zod schemas for all models)
├── calculations/
│   ├── molecularWeight.ts  (MW calculation from sequence)
│   ├── charge.ts           (Charge prediction at pH)
│   ├── isoelectricPoint.ts (pI calculation)
│   ├── extinctionCoeff.ts  (ε₂₈₀ estimation)
│   ├── classification.ts   (Length and chemical classification)
│   └── constants.ts        (Residue mass table, pKa table)
├── renderer/
│   ├── viewer3d.ts         (Mol*/NGL abstraction)
│   ├── viewer2d.ts         (SVG 2D fallback)
│   ├── sequence.ts         (Sequence rendering with selectable residues)
│   └── pdb-parser.ts       (PDB file parsing utilities)
├── search/
│   ├── indexer.ts          (Pagefind index generation)
│   ├── query.ts            (Search query execution)
│   ├── ranking.ts          (BM25 + domain-specific ranking)
│   ├── facets.ts           (Faceted search filtering)
│   └── autocomplete.ts     (Autocomplete suggestions)
├── i18n/
│   ├── detector.ts         (Locale detection from header/URL/storage)
│   ├── router.ts           (Locale-prefixed URL generation)
│   ├── translator.ts       (Translation lookup and interpolation)
│   └── validators.ts       (hreflang validation, locale format checks)
├── auth/
│   ├── provider.ts         (OAuth provider abstraction)
│   ├── session.ts          (Session management)
│   ├── rbac.ts             (Role-based access control)
│   └── middleware.ts       (Auth middleware for Workers)
├── analytics/
│   ├── tracker.ts          (Event tracking abstraction)
│   ├── learning.ts         (Learning analytics aggregation)
│   └── report.ts           (Report generation)
└── utils/
    ├── format.ts           (Number, date, locale-aware formatting)
    ├── validation.ts       (Input validation utilities)
    └── hashing.ts          (Content hashing for cache keys)
```

### 2.2 Component Descriptions

| Component | Module | Responsibility | Dependencies |
|-----------|--------|----------------|--------------|
| CalculationEngine | calculations/ | Compute oligopeptide properties from sequence | constants.ts (residue table) |
| SearchEngine | search/ | Generate index, execute queries, rank results | Pagefind (static), FlexSearch (dynamic) |
| I18nSystem | i18n/ | Detect locale, route URLs, translate content | Accept-Language header, localStorage |
| AuthSystem | auth/ | Authenticate users, manage sessions, enforce RBAC | Cloudflare Workers, JWT |
| AnalyticsPipeline | analytics/ | Track events, aggregate learning metrics | Cloudflare Web Analytics, D1 |
| MolecularRenderer | renderer/ | Render 3D/2D molecular visualizations | Mol*, NGL Viewer, WebGL |
| DataModels | models/ | Type-safe data models with Zod validation | Zod |

### 2.3 Coupling Metrics

| Module A | Module B | Coupling Type | Strength |
|----------|----------|---------------|----------|
| models/ | calculations/ | Data coupling | Low — calculations use model types |
| models/ | search/ | Data coupling | Low — search indexes model data |
| i18n/ | models/ | Stamp coupling | Low — models include locale fields |
| auth/ | analytics/ | Content coupling | Medium — auth events tracked |
| All modules | utils/ | Utility coupling | Low — shared utility functions |

---

## BP-3: Design Rationale

### 3.1 Monorepo Package Over Separate Libraries

| Criterion | Monorepo Package | Separate NPM Packages | Decision |
|-----------|------------------|----------------------|----------|
| Versioning | Single version, atomic updates | Independent versioning | Monorepo — simpler coordination |
| Dependency management | Shared lockfile | Separate lockfiles | Monorepo — no version conflicts |
| Build performance | Single build pipeline | Per-package builds | Monorepo — shared caching |
| Code sharing | Direct imports | Published packages | Monorepo — instant updates |

**Decision**: Monorepo package with workspace imports — both sites import from the same source.

### 3.2 Zod Over JSON Schema

| Criterion | Zod | JSON Schema | Decision |
|-----------|-----|-------------|----------|
| TypeScript inference | Native | Requires codegen | Zod — zero codegen |
| Runtime validation | Built-in | Requires Ajv | Zod — simpler |
| Bundle size | ~12KB | ~25KB (Ajv) | Zod — smaller |
| Ecosystem | Growing | Massive | JSON Schema — but Zod sufficient |

**Decision**: Zod for runtime validation with native TypeScript inference.

### 3.3 Pagefind + FlexSearch Hybrid

| Criterion | Pagefind (static) | FlexSearch (dynamic) | Decision |
|-----------|-------------------|---------------------|----------|
| Index generation | Build-time | Runtime | Both — different use cases |
| Query latency | <50ms | <20ms | FlexSearch for wiki |
| Bundle size | ~30KB (WASM) | ~15KB | FlexSearch for dynamic |
| Faceted search | Limited | Full support | FlexSearch for wiki facets |

**Decision**: Pagefind for static content (encyclopeptide.com), FlexSearch for dynamic wiki content (wikipept.com).

---

## BP-4: Traceability

### 4.1 Requirements Traceability Matrix

| Requirement ID | Shared Module | Component | Verification |
|----------------|--------------|-----------|--------------|
| FR-001 | search/ | SearchEngine.query | Automated performance test |
| FR-002 | search/ | SearchEngine.facets | Facet filter verification |
| FR-005 | search/ | SearchEngine.results | Highlighting and pagination test |
| FR-008 | models/ | Breadcrumb generation | Hierarchy accuracy test |
| FR-010 | utils/ | Responsive utilities | Playwright breakpoint tests |
| FR-011 | utils/ | Theme persistence | localStorage persistence test |
| FR-013 | i18n/ | I18nSystem | Locale URL resolution test |
| FR-014 | i18n/ | I18nSystem.localeSwitcher | Native name rendering test |
| FR-015 | i18n/ | I18nSystem.invariantTranslation | IUPAC nomenclature preservation test |
| FR-049 | renderer/ | MolecularRenderer | Code block, math, component rendering test |
| FR-050 | models/ | Schema.org generation | JSON-LD validation test |
| NFR-001 | search/ | SearchEngine performance | <200ms response test |
| NFR-007 | auth/ | AuthSystem accessibility | axe-core a11y test |
| NFR-012 | auth/ | AuthSystem.security | HTTPS + HSTS header test |
| NFR-013 | auth/ | AuthSystem.csp | CSP header audit |
| NFR-014 | auth/ | AuthSystem.rateLimit | Rate limiting test |
| NFR-017 | all/ | Code coverage | Vitest coverage ≥80% |
| NFR-018 | all/ | TypeScript strict mode | tsc --noEmit zero errors |

---

## BP-5: Interface Design

### 5.1 Calculation Engine Interface

```typescript
// calculations/molecularWeight.ts
interface MolecularWeightInput {
  sequence: string;           // One-letter amino acid codes
  cyclic?: boolean;
  disulfideBonds?: number;
  modifications?: ResidueModification[];
}

interface MolecularWeightOutput {
  molecularWeight: number;    // Monoisotopic MW in Da
  averageWeight: number;      // Average MW in Da
  unit: string;
}

export function calculateMolecularWeight(input: MolecularWeightInput): MolecularWeightOutput;
```

```typescript
// calculations/charge.ts
interface ChargeInput {
  sequence: string;
  pH: number;
  temperature?: number;       // Default: 25°C
  ionicStrength?: number;     // Default: 0.1 M
}

interface ChargeOutput {
  netCharge: number;
  chargeStates: number[];
  majorChargeState: number;
}

export function calculateCharge(input: ChargeInput): ChargeOutput;
```

```typescript
// calculations/isoelectricPoint.ts
interface PIInput {
  sequence: string;
}

interface PIOutput {
  pI: number;
  confidence: "high" | "medium";
}

export function calculateIsoelectricPoint(input: PIInput): PIOutput;
```

```typescript
// calculations/extinctionCoeff.ts
interface ExtinctionInput {
  sequence: string;
  disulfideBonds?: number;
}

interface ExtinctionOutput {
  extinction280: number;      // M⁻¹cm⁻¹
  unit: string;
  method: string;
}

export function calculateExtinctionCoefficient(input: ExtinctionInput): ExtinctionOutput;
```

```typescript
// calculations/classification.ts
interface ClassificationInput {
  sequence: string;
  chainLength: number;
  cyclic?: boolean;
  disulfideBonds?: number;
}

interface ClassificationOutput {
  lengthCategory: string;     // dipeptide, tripeptide, ..., oligopeptide
  chemicalClass: string;      // hydrophobic, hydrophilic, charged, amphipathic
  residueRange: [number, number];
}

export function classifyPeptide(input: ClassificationInput): ClassificationOutput;
```

### 5.2 Search Engine Interface

```typescript
// search/query.ts
interface SearchQuery {
  query: string;
  language?: string;
  filters?: SearchFilters;
  limit?: number;             // Default: 20
  offset?: number;            // Default: 0
}

interface SearchFilters {
  chainLength?: [number, number];
  classification?: string[];
  functionalCategory?: string[];
  sourceOrganism?: string[];
  therapeuticArea?: string[];
  tags?: string[];
}

interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  url: string;
  score: number;
  highlights: HighlightRange[];
  metadata: Record<string, unknown>;
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
  facets: FacetCounts;
  queryTime: number;
}

interface FacetCounts {
  [facetName: string]: { [value: string]: number };
}

export function search(query: SearchQuery): Promise<SearchResponse>;
export function buildIndex(documents: ContentDocument[]): Promise<void>;
```

### 5.3 i18n Interface

```typescript
// i18n/detector.ts
type LocaleSource = "url" | "header" | "storage" | "cookie" | "cf-locale";

interface LocaleDetection {
  locale: string;
  source: LocaleSource;
  confidence: number;
}

export function detectLocale(request?: Request): LocaleDetection;
```

```typescript
// i18n/router.ts
interface I18nRoute {
  path: string;               // e.g., "/en/angiotensin-ii"
  locale: string;
  alternateLinks: Array<{
    locale: string;
    href: string;
  }>;
}

export function generateI18nRoutes(
  content: ContentItem[],
  supportedLocales: string[]
): I18nRoute[];

export function getAlternateLinks(
  currentPath: string,
  currentLocale: string,
  allLocales: string[]
): Array<{ lang: string; href: string; hreflang: string }>;
```

```typescript
// i18n/translator.ts
interface TranslationOptions {
  locale: string;
  namespace?: string;
  interpolation?: Record<string, string | number>;
}

export function t(key: string, options: TranslationOptions): string;
export function hasTranslation(key: string, locale: string): boolean;
```

### 5.4 Auth Interface

```typescript
// auth/provider.ts
interface OAuthConfig {
  provider: "github" | "google" | "orcid";
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  role: "contributor" | "reviewer" | "moderator" | "admin";
}

export function authenticate(token: string): Promise<AuthUser | null>;
export function createSession(user: AuthUser): Promise<string>;
export function destroySession(sessionToken: string): Promise<void>;
```

```typescript
// auth/rbac.ts
type Permission =
  | "page:create"
  | "page:edit"
  | "page:delete"
  | "page:review"
  | "quiz:create"
  | "quiz:moderate"
  | "annotation:create"
  | "annotation:moderate"
  | "user:manage"
  | "analytics:view";

export function hasPermission(role: string, permission: Permission): boolean;
export function requireAuth(request: Request): Promise<AuthUser>;
export function requirePermission(request: Request, permission: Permission): Promise<AuthUser>;
```

### 5.5 Analytics Interface

```typescript
// analytics/tracker.ts
interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean>;
  timestamp?: Date;
  userId?: string;
  sessionId?: string;
}

export function trackEvent(event: AnalyticsEvent): void;
export function trackPageView(path: string, locale: string): void;
export function trackLearningActivity(activity: LearningActivity): void;

interface LearningActivity {
  type: "quiz_complete" | "flashcard_review" | "page_read" | "annotation_add";
  conceptId: string;
  duration?: number;
  score?: number;
  mastery?: number;
}
```

---

## BP-6: Data Design

### 6.1 Amino Acid Data Table

```typescript
// calculations/constants.ts
export const AMINO_ACID_TABLE: Record<string, AminoAcidProperties> = {
  G: { name: "Glycine", threeLetter: "Gly", formula: "C2H5NO2", residueMass: 57.02146, pKa: null, hydropathy: -0.4 },
  A: { name: "Alanine", threeLetter: "Ala", formula: "C3H7NO2", residueMass: 71.03711, pKa: null, hydropathy: 1.8 },
  V: { name: "Valine", threeLetter: "Val", formula: "C5H11NO2", residueMass: 99.06841, pKa: null, hydropathy: 4.2 },
  L: { name: "Leucine", threeLetter: "Leu", formula: "C6H13NO2", residueMass: 113.08406, pKa: null, hydropathy: 3.8 },
  I: { name: "Isoleucine", threeLetter: "Ile", formula: "C6H13NO2", residueMass: 113.08406, pKa: null, hydropathy: 4.5 },
  P: { name: "Proline", threeLetter: "Pro", formula: "C5H9NO2", residueMass: 97.05276, pKa: null, hydropathy: -1.6 },
  F: { name: "Phenylalanine", threeLetter: "Phe", formula: "C9H11NO2", residueMass: 147.06841, pKa: null, hydropathy: 2.8 },
  W: { name: "Tryptophan", threeLetter: "Trp", formula: "C11H12N2O2", residueMass: 186.07931, pKa: null, hydropathy: -0.9 },
  M: { name: "Methionine", threeLetter: "Met", formula: "C5H11NO2S", residueMass: 131.04049, pKa: null, hydropathy: 1.9 },
  S: { name: "Serine", threeLetter: "Ser", formula: "C3H7NO3", residueMass: 87.03203, pKa: 13.6, hydropathy: -0.8 },
  T: { name: "Threonine", threeLetter: "Thr", formula: "C4H9NO3", residueMass: 101.04768, pKa: 13.6, hydropathy: -0.7 },
  C: { name: "Cysteine", threeLetter: "Cys", formula: "C3H7NO2S", residueMass: 103.00919, pKa: 8.18, hydropathy: 2.5 },
  Y: { name: "Tyrosine", threeLetter: "Tyr", formula: "C9H11NO3", residueMass: 163.06333, pKa: 10.07, hydropathy: -1.3 },
  H: { name: "Histidine", threeLetter: "His", formula: "C6H9N3O2", residueMass: 137.05891, pKa: 6.00, hydropathy: -3.2 },
  D: { name: "Aspartic Acid", threeLetter: "Asp", formula: "C4H7NO4", residueMass: 115.02694, pKa: 3.65, hydropathy: -3.5 },
  E: { name: "Glutamic Acid", threeLetter: "Glu", formula: "C5H9NO4", residueMass: 129.04259, pKa: 4.25, hydropathy: -3.5 },
  N: { name: "Asparagine", threeLetter: "Asn", formula: "C4H8N2O3", residueMass: 114.04293, pKa: null, hydropathy: -3.5 },
  Q: { name: "Glutamine", threeLetter: "Gln", formula: "C5H10N2O3", residueMass: 128.05858, pKa: null, hydropathy: -3.5 },
  K: { name: "Lysine", threeLetter: "Lys", formula: "C6H14N2O2", residueMass: 128.09496, pKa: 10.53, hydropathy: -3.9 },
  R: { name: "Arginine", threeLetter: "Arg", formula: "C6H14N4O2", residueMass: 156.10111, pKa: 12.48, hydropathy: -4.5 },
};

export interface AminoAcidProperties {
  name: string;
  threeLetter: string;
  formula: string;
  residueMass: number;        // Monoisotopic residue mass in Da
  pKa: number | null;         // Side chain pKa (null if not ionizable)
  hydropathy: number;         // Kyte-Doolittle hydropathy index
}

// Terminus masses
export const TERMINUS_MASS = {
  H: 1.00794,                 // N-terminus hydrogen
  OH: 15.99491,               // C-terminus hydroxyl
  DISULFIDE_H: 2.01588,       // H2 lost per disulfide bond
};

// Ionizable group pKa values
export const IONIZABLE_PKA = {
  N_TERMINUS: 9.69,
  C_TERMINUS: 2.34,
  ASP: 3.65,
  GLU: 4.25,
  CYS: 8.18,
  TYR: 10.07,
  LYS: 10.53,
  ARG: 12.48,
  HIS: 6.00,
} as const;
```

### 6.2 Content Schema Definitions

```typescript
// models/schemas/peptide.ts
import { z } from 'zod';

export const peptideSchema = z.object({
  id: z.string().regex(/^ENCP-\d{5}$/),
  name: z.string().min(1).max(200),
  iupacName: z.string().min(1),
  aliases: z.array(z.string()).default([]),
  casNumber: z.string().regex(/^\d{2,7}-\d{2}-\d$/).optional(),
  sequence: z.string().regex(/^[ACDEFGHIKLMNPQRSTVWY]+$/).min(2).max(50),
  chainLength: z.number().int().min(2).max(50),
  molecularWeight: z.number().positive(),
  averageWeight: z.number().positive(),
  molecularFormula: z.string(),
  netCharge: z.number(),
  isoelectricPoint: z.number().min(0).max(14),
  extinctionCoefficient: z.number().min(0),
  classification: z.enum([
    "dipeptide", "tripeptide", "tetrapeptide", "pentapeptide",
    "hexapeptide", "heptapeptide", "octapeptide", "nonapeptide",
    "decapeptide", "oligopeptide"
  ]),
  chemicalClass: z.enum(["hydrophobic", "hydrophilic", "charged", "amphipathic"]),
  structuralType: z.enum(["linear", "cyclic", "branched"]),
  functionalCategory: z.string(),
  sourceOrganisms: z.array(z.string()).min(1),
  therapeuticAreas: z.array(z.string()).default([]),
  pdbEntries: z.array(z.string()).default([]),
  uniprotId: z.string().optional(),
  chemblId: z.string().optional(),
  lastReviewed: z.string().datetime(),
  nextReview: z.string().datetime(),
});

export const studyGuideSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  difficulty: z.number().int().min(1).max(5),
  prerequisites: z.array(z.string()).default([]),
  learningObjectives: z.array(z.string()).min(1),
  estimatedMinutes: z.number().int().min(1).max(120),
  lang: z.enum(["en", "es", "fr", "de", "zh", "ja"]),
  status: z.enum(["draft", "review", "published", "deprecated"]),
  lastReviewed: z.string().datetime().optional(),
  authorId: z.string(),
});
```

---

## BP-7: Component Design

### 7.1 CalculationEngine Internal Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  CalculationEngine Flow                       │
│                                                               │
│  Input: "ACDEF" (sequence)                                   │
│                                                               │
│  ┌──────────────┐                                            │
│  │ Validate     │ → Check regex ^[ACDEFGHIKLMNPQRSTVWY]+$   │
│  └──────┬───────┘                                            │
│         │ Valid                                               │
│         ▼                                                     │
│  ┌──────────────┐                                            │
│  │ Lookup Masses│ → A:71.037, C:103.009, D:115.027,         │
│  │              │   E:129.043, F:147.068                     │
│  └──────┬───────┘                                            │
│         │                                                     │
│         ▼                                                     │
│  ┌──────────────┐                                            │
│  │ Sum Residues │ → 71.037+103.009+115.027+129.043+147.068 │
│  │              │   = 565.184                                 │
│  └──────┬───────┘                                            │
│         │                                                     │
│         ▼                                                     │
│  ┌──────────────┐                                            │
│  │ Add Termini  │ → 565.184 + 1.008 + 15.995               │
│  │ (linear)     │   = 582.187                                 │
│  └──────┬───────┘                                            │
│         │                                                     │
│         ▼                                                     │
│  ┌──────────────┐                                            │
│  │ Adjust for   │ → (no disulfide bonds)                     │
│  │ Disulfides   │   582.187 Da                               │
│  └──────┬───────┘                                            │
│         │                                                     │
│         ▼                                                     │
│  Output: { molecularWeight: 582.187, unit: "Da" }           │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 SearchEngine Index Flow

```
Content Documents (MDX)
        │
        ▼
┌──────────────┐
│ Tokenize     │ → Split text into tokens
│              │   Lowercase, remove stopwords
│              │   Stem (optional)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Build        │ → Inverted index: token → document list
│ Inverted     │   With term frequency weights
│ Index        │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Compute      │ → TF-IDF weights for each token
│ TF-IDF       │   IDF = log(N/df)
│ Weights      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Generate     │ → Compress index to WASM binary
│ Pagefind     │   Store in dist/_pagefind/
│ Index        │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Generate     │ → Create facet counts for each filter
│ Facet Index  │   Store in JSON alongside main index
└──────────────┘
```

### 7.3 i18n Locale Detection Flow

```
Request arrives
        │
        ▼
┌──────────────┐
│ Check URL    │ → /en/angiotensin-ii → "en"
│ Path Prefix  │   /zh/angiotensin-ii → "zh"
└──────┬───────┘
       │ No URL prefix
       ▼
┌──────────────┐
│ Check        │ → "Accept-Language: zh-CN,zh;q=0.9,en;q=0.8"
│ Accept-      │   → "zh"
│ Language     │
└──────┬───────┘
       │ No Accept-Language
       ▼
┌──────────────┐
│ Check        │ → localStorage.getItem("locale")
│ localStorage │   → "fr"
└──────┬───────┘
       │ No localStorage
       ▼
┌──────────────┐
│ Check        │ → cf-locale header (Cloudflare)
│ CF Header    │   → "de"
└──────┬───────┘
       │ No CF header
       ▼
┌──────────────┐
│ Default      │ → "en"
│ Fallback     │
└──────────────┘
```

---

## BP-8: Deployment Design

### 8.1 Package Structure

```
@wikisites/shared
├── src/
│   ├── models/          (TypeScript interfaces, Zod schemas)
│   ├── calculations/    (Pure functions, no side effects)
│   ├── renderer/        (Framework-agnostic rendering utilities)
│   ├── search/          (Index generation, query execution)
│   ├── i18n/            (Locale detection, translation)
│   ├── auth/            (OAuth, session, RBAC)
│   ├── analytics/       (Event tracking, metrics)
│   └── utils/           (Shared utilities)
├── dist/
│   ├── esm/             (ES modules for modern bundlers)
│   └── cjs/             (CommonJS for Node.js tooling)
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

### 8.2 Build Configuration

| Property | Value |
|----------|-------|
| Module format | ESM (primary), CJS (compatibility) |
| TypeScript target | ES2022 |
| Tree shaking | Enabled (ESM) |
| Bundle size budget | <50KB (gzipped) total |
| Test coverage threshold | 90% (higher than site-level 80%) |
| Linting | ESLint + Prettier |
| Documentation | TypeDoc auto-generated |

### 8.3 Versioning Strategy

| Change Type | Version Bump | Example |
|-------------|-------------|---------|
| Bug fix (patch) | 1.0.x | Fix charge calculation precision |
| New feature (minor) | 1.x.0 | Add new calculation algorithm |
| Breaking change (major) | x.0.0 | Change CalculationEngine interface |

Both sites pin to the same major version. Minor/patch updates are atomic across the monorepo.

---

## BP-9: Formal Verification

### 9.1 Properties to Prove

| Property ID | Property Description | Proof Method | Status |
|-------------|---------------------|--------------|--------|
| FV-SHARED-001 | MW calculation is commutative (order-independent) | Property test: ∀ perm(seq), MW(perm) = MW(seq) | Pending |
| FV-SHARED-002 | Charge at pI ≈ 0 within tolerance | Unit test: charge(calculatePI(seq).pI) ≈ 0 | Pending |
| FV-SHARED-003 | Classification covers all sequences 2–50 residues | Exhaustive test: ∀ n∈[2,50], classify valid seq | Pending |
| FV-SHARED-004 | Search results ⊆ indexed documents | Property test: results.every(r => docs.includes(r)) | Pending |
| FV-SHARED-005 | i18n detection returns valid locale | Property test: result.locale ∈ supportedLocales | Pending |
| FV-SHARED-006 | RBAC denies unauthorized access | Unit test: requirePermission(user, perm) | Pending |
| FV-SHARED-007 | Rate limiter blocks at N+1 requests | Stress test: N+1 requests → 429 | Pending |
| FV-SHARED-008 | Residue mass table has exactly 20 entries | Unit test: Object.keys(table).length = 20 | Pending |

### 9.2 Invariant Properties

```
// Invariant 1: MW is always positive for valid sequences
∀ seq ∈ validSequences: calculateMolecularWeight(seq).molecularWeight > 0

// Invariant 2: MW is monotonically non-decreasing with sequence length
∀ seq1, seq2: length(seq1) ≤ length(seq2) → MW(seq1) ≤ MW(seq2) + max_residue_mass

// Invariant 3: pI is within [0, 14]
∀ seq: 0 ≤ calculateIsoelectricPoint(seq).pI ≤ 14

// Invariant 4: Charge is bounded for physiological pH range
∀ seq: |calculateCharge(seq, 7.4).netCharge| < 50

// Invariant 5: Search results are ranked in descending score order
∀ results: results[i].score ≥ results[i+1].score for all i

// Invariant 6: Locale detection always returns a supported locale
∀ request: detectLocale(request).locale ∈ SUPPORTED_LOCALES

// Invariant 7: Session tokens are unique
∀ token1, token2: token1 ≠ token2 → session1.userId ≠ session2.userId
```

---

## BP-10: HAL Specification

### 10.1 Hardware Abstraction Layer

The shared library HAL provides framework-agnostic interfaces for platform services.

```typescript
interface SharedHAL {
  // Storage abstraction (site-specific implementations)
  storage: {
    get<T>(key: string): Promise<T | null>;
    put<T>(key: string, value: T): Promise<void>;
    delete(key: string): Promise<void>;
    list(prefix: string): Promise<string[]>;
  };

  // HTTP abstraction
  http: {
    fetch(url: string, options?: RequestInit): Promise<Response>;
    cache(url: string, ttl: number): Promise<Response | null>;
  };

  // Event abstraction
  events: {
    emit(name: string, data: unknown): void;
    on(name: string, handler: Function): void;
  };
}
```

### 10.2 Site-Specific Implementations

| HAL Interface | encyclopeptide.com | wikipept.com |
|---------------|-------------------|--------------|
| storage.get | Cloudflare KV | Cloudflare KV |
| storage.put | Cloudflare KV | Cloudflare D1 |
| http.fetch | Cloudflare Workers fetch | Cloudflare Workers fetch |
| http.cache | Cloudflare KV (cache) | Cloudflare KV (cache) |
| events.emit | Cloudflare Analytics | Cloudflare Analytics + D1 logging |

---

## BP-11: Compliance Matrix

| Standard | Requirement | Module | Status |
|----------|------------|--------|--------|
| IEEE 1016-2024 | Software design description | This document | Compliant |
| IUPAC-IUBMB | Nomenclature | models/aminoacid.ts, calculations/ | Target |
| TypeScript strict | Type safety | All modules | Target |
| Vitest | Test coverage ≥90% | All modules | Target |
| ESLint | Zero lint errors | All modules | Target |
| Prettier | Code formatting | All modules | Target |

---

## BP-12: Quality Checklist

### 12.1 Library Completeness

- [ ] All 7 module directories documented with interfaces
- [ ] Calculation engine interfaces match YP-CHEM-OLIGO-001 algorithms
- [ ] Search engine interfaces support both Pagefind and FlexSearch
- [ ] i18n interfaces support all 6 required locales
- [ ] Auth interfaces support OAuth + RBAC
- [ ] Analytics interfaces track learning events
- [ ] Zod schemas validate all content types
- [ ] Amino acid data table complete (20 residues)

### 12.2 Testability

- [ ] All calculation functions are pure (no side effects)
- [ ] All interfaces have input/output type definitions
- [ ] All modules have unit test coverage ≥90%
- [ ] Property-based tests for calculation correctness
- [ ] Integration tests for search indexing and querying

### 12.3 Performance

- [ ] Total bundle size < 50KB (gzipped)
- [ ] Calculation functions execute in <1ms for any valid sequence
- [ ] Search index generation < 10 seconds for 1000 documents
- [ ] i18n locale detection < 1ms
- [ ] No circular dependencies between modules

### 12.4 Documentation

- [ ] All public interfaces have JSDoc comments
- [ ] TypeDoc documentation generated
- [ ] README with usage examples for each module
- [ ] CHANGELOG maintained

---

**End of Document**
**Document Status:** DRAFT — Pending architecture review
**Owner:** Wikisites Architecture Team
