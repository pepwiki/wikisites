# @wikisites/shared API Documentation

## Overview

The `@wikisites/shared` package provides common schemas, types, and utilities used across the wikisites monorepo.

## Exports

### Schemas

#### `AminoAcidSchema`

Zod schema for validating amino acid single-letter codes (A, C, D, E, F, G, H, I, K, L, M, N, P, Q, R, S, T, V, W, Y).

```typescript
import { AminoAcidSchema } from "@wikisites/shared";
AminoAcidSchema.parse("G"); // "G"
AminoAcidSchema.parse("X"); // throws ZodError
```

#### `OligopeptideSchema`

Zod schema for validating oligopeptide data structures.

```typescript
import { OligopeptideSchema } from "@wikisites/shared";
const peptide = OligopeptideSchema.parse({
  id: "glycine",
  name: "Glycine",
  sequence: "G",
  length: 1,
  molecularWeight: 75.03,
});
```

#### `ArticleSchema`

Zod schema for wiki articles.

#### `GlossaryTermSchema`

Zod schema for glossary entries.

#### `QuizQuestionSchema`

Zod schema for quiz questions.

#### `FlashcardSchema`

Zod schema for flashcards.

### Functions

#### `calculateMolecularWeight(sequence: string): number`

Calculates the molecular weight of a peptide from its amino acid sequence.

```typescript
import { calculateMolecularWeight } from "@wikisites/shared";
calculateMolecularWeight("G"); // 75.03 (Glycine)
calculateMolecularWeight("GC"); // 207.24 (Gly-Cys dipeptide)
```

### Types

```typescript
type AminoAcid =
  | "A"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "K"
  | "L"
  | "M"
  | "N"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "V"
  | "W"
  | "Y";
type SecondaryStructure = "alpha-helix" | "beta-sheet" | "turn" | "coil";
type DifficultyLevel = "beginner" | "intermediate" | "advanced";
```

### Theme Utilities

#### `getTheme(site: "wiki" | "encp"): Theme`

Get the current theme preference.

#### `setTheme(site: "wiki" | "encp", theme: Theme): void`

Set the theme preference and apply it.

#### `applyTheme(theme: Theme): void`

Apply a theme to the DOM.

#### `initTheme(site: "wiki" | "encp"): void`

Initialize theme on page load (call before paint).

#### `watchSystemTheme(site: "wiki" | "encp", callback?: Function): void`

Listen for system theme changes.

#### `applyPreset(presetName: string): void`

Apply a theme preset (light, dark, high-contrast, solarized).

#### `getAvailablePresets(): string[]`

Get all available theme preset names.
