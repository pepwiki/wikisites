---
document_id: YP-CONTENT-LATEX-001
title: "LaTeX/KaTeX Math Rendering"
version: "1.0.0"
date: "2026-06-19"
status: DRAFT
authors:
  - name: "Wikisites Knowledge Engineering Team"
    role: "Primary Authors"
classification: "Internal — Phase 1 Epistemological Discovery"
applicable_sites:
  - ENCP
  - WIKI
abstract: >-
  Specification of LaTeX/KaTeX math rendering for oligopeptide educational content.
  Covers KaTeX vs MathJax comparison, SSR vs client-side rendering strategies
  for Astro islands, bundle size impact analysis, MDX pipeline integration,
  font loading strategies, and accessibility via MathML fallback. Enables
  scientific notation throughout peptide chemistry, pharmacology, and
  biochemistry content.
test_vector_ref: "test_vectors/test_vectors_content_tools.toml"
domain_constraint_ref: "domain_constraints/domain_constraints_content.toml"
bibliography_ref: "bibliography.md"
---

# Yellow Paper: LaTeX/KaTeX Math Rendering

**Document ID:** YP-CONTENT-LATEX-001
**Version:** 1.0.0
**Date:** 2026-06-19
**Status:** DRAFT

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

This Yellow Paper specifies the LaTeX/KaTeX math rendering system required for displaying scientific notation on oligopeptide educational platforms. It establishes the rendering engine choice, integration strategy with the Astro/MDX content pipeline, performance constraints, and accessibility requirements. Mathematical notation is essential for expressing molecular weight calculations, binding affinity equations, pharmacokinetic models, and thermodynamic formulas throughout encyclopeptide.com and wikipept.com.

### 1.2 Scope

Covers KaTeX engine selection and comparison with MathJax, server-side rendering (SSR) vs client-side rendering (CSR) strategies within Astro islands, bundle size impact analysis, MDX content pipeline integration, KaTeX font loading and subsetting, MathML accessibility fallback, and theming (dark mode support). Does not cover full LaTeX document compilation (not applicable to web), chemical structure drawing (reserved for MoleculeViewer), or 3D molecular visualization (reserved for 3Dmol.js integration).

### 1.3 Audience

Frontend developers implementing math rendering, content authors writing scientific notation in MDX, accessibility engineers validating screen reader compatibility, and performance engineers monitoring bundle impact.

### 1.4 Normative References

- KaTeX Documentation (https://katex.org/docs)
- KaTeX GitHub Repository (https://github.com/KaTeX/KaTeX)
- MathJax Documentation (https://docs.mathjax.org)
- W3C MathML Specification (https://www.w3.org/TR/MathML3/)
- Astro MDX Integration (https://docs.astro.build/en/guides/integrations-guide/mdx/)
- WAI-ARIA Authoring Practices (https://www.w3.org/WAI/ARIA/apg/)

### 1.5 Definitions and Acronyms

| Term     | Definition                                         |
| -------- | -------------------------------------------------- |
| KaTeX    | KaTeX TeX — fast math typesetting for the web      |
| MathJax  | JavaScript library for rendering MathML/TeX        |
| SSR      | Server-Side Rendering                              |
| CSR      | Client-Side Rendering                              |
| MDX      | Markdown with JSX — content authoring format       |
| MathML   | Mathematical Markup Language (W3C standard)        |
| CLS      | Cumulative Layout Shift                            |
| FOIT     | Flash of Invisible Text                            |
| FOUT     | Flash of Unstyled Text                             |

---

## 2. Executive Summary

### 2.1 Problem Statement

Oligopeptide educational content requires extensive mathematical notation: molecular weight formulas, Hill equations for binding kinetics, pharmacokinetic differential equations, charge-state distributions, and thermodynamic calculations. Without a rendering system, these expressions are either rendered as plain text (unreadable) or as images (inaccessible, non-scalable, non-searchable). The system must integrate seamlessly with the existing MDX content pipeline, maintain the project's strict performance budget (<200KB JS/page, <60KB gzip), and support dark mode theming.

### 2.2 Scope of Solution

This Yellow Paper defines:

1. **Engine Selection**: KaTeX chosen over MathJax for performance and bundle size
2. **Rendering Strategy**: SSR at build time with client-side hydration for dynamic expressions
3. **MDX Integration**: Custom remark/rehype plugin pipeline for `$...$` and `$$...$$` syntax
4. **Font Strategy**: Preloaded KaTeX fonts with subset optimization
5. **Accessibility**: MathML fallback for screen readers
6. **Theming**: Dark mode CSS variable integration

### 2.3 Key Assumptions

- Math expressions are primarily inline ($...$) and display ($$...$$) TeX
- Most expressions are static (defined in MDX authoring time)
- A small subset of expressions may be dynamically generated (e.g., MW calculator results)
- Current content contains ~50-100 math expressions across both sites
- Expression complexity: elementary algebra through calculus (no advanced LaTeX packages)
- Dark mode is required (project convention)

### 2.4 Success Criteria

- KaTeX SSR renders all static expressions at build time (zero client JS for static math)
- Client-side bundle addition <15KB gzip for dynamic math support
- MathML fallback provides equivalent content for screen readers
- Font loading does not cause CLS >0.1
- Dark mode rendering is visually consistent with existing design system
- All expressions render within 100ms on mid-range mobile devices

---

## 3. Nomenclature and Notation

### 3.1 Math Rendering Terminology

| Term              | Definition                                              |
| ----------------- | ------------------------------------------------------- |
| Inline Math       | Mathematical expression within a text paragraph ($...$) |
| Display Math      | Centered, standalone mathematical expression ($$...$$)  |
| TeX               | Typesetting system and its expression syntax            |
| Delimiter         | Characters marking math boundaries ($, $$, \\[ \\])     |
| Macro             | Reusable TeX command definition                         |
| Package           | Extension providing additional TeX commands              |

### 3.2 Rendering Strategy Terms

| Term              | Definition                                              |
| ----------------- | ------------------------------------------------------- |
| SSR Math          | Math rendered to HTML/CSS at build time                 |
| CSR Math          | Math rendered client-side via JavaScript                |
| Hydration         | Attaching JS behavior to server-rendered HTML           |
| Island            | Interactive component within static Astro page          |
| Rehype Plugin     | AST transformation for HTML output                     |
| Remark Plugin     | AST transformation for Markdown AST                    |

---

## 4. Theoretical Foundation

### 4.1 KaTeX vs MathJax Comparison

#### 4.1.1 Performance Comparison

| Metric                    | KaTeX                          | MathJax 3.x                    |
| ------------------------- | ------------------------------ | ------------------------------ |
| Bundle Size (min+gzip)    | ~7KB (core)                    | ~30KB (CHTML output)           |
| Bundle Size (with fonts)  | ~22KB + font files             | ~40KB + font files             |
| Render Speed (100 exprs)  | ~50ms                          | ~300ms                         |
| CSS-in-JS                 | Yes (single CSS file)          | Yes (dynamic generation)       |
| Support Server-Side       | Yes (node API)                 | Yes (node API, less mature)    |
| npm Weekly Downloads      | ~4.5M                          | ~2.5M                          |
| Active Maintenance        | Yes (regular releases)         | Yes (v3.x active)              |
| Startup Time              | Near-instant                   | ~100ms initialization          |

**Source**: KaTeX GitHub README benchmarks; MathJax documentation performance notes.

#### 4.1.2 Feature Coverage

| Feature                        | KaTeX | MathJax 3.x |
| ------------------------------ | ----- | ----------- |
| LaTeX math mode                | Yes   | Yes         |
| Common TeX commands            | Yes   | Yes         |
| AMS math environments          | Yes   | Yes         |
| `\require{}` packages          | No    | Yes         |
| Chemistry (`\ce{}` from mhchem)| No*   | Yes         |
| Custom macros                  | Yes   | Yes         |
| RTL text                       | No    | Yes         |
| Font loading (CommonHTML/CHTML)| Built-in | Configurable |
| MathML input                   | No    | Yes         |
| MathML output                  | Partial | Yes       |

*KaTeX supports `\ce{}` via the `mhchem` extension loaded separately.

#### 4.1.3 Recommendation: KaTeX

**Rationale for Wikisites**:

1. **Performance**: 6x faster rendering; critical for pages with many expressions (e.g., pharmacokinetic equations)
2. **Bundle Size**: ~7KB core vs ~30KB MathJax — fits within the 50KB/island budget
3. **SSR Support**: `katex` npm package provides `renderToString()` for build-time rendering
4. **Astro Integration**: remark/rehype plugins exist for KaTeX in MDX pipelines
5. **Sufficient Feature Set**: Covers all needed notation (fractions, superscripts, Greek letters, operators, matrices)
6. **Chemistry Notation**: `\ce{}` extension covers molecular formulas (H₂O, Ca²⁺, CH₃COOH)

**Mitigation for Missing Features**:
- `\require{}` not needed — all needed packages are built-in or loadable as extensions
- MathML output not required — use `aria-label` on rendered HTML for accessibility
- RTL not required — content is English-only in Phase 1

### 4.2 Rendering Strategies

#### 4.2.1 Strategy A: Full SSR (Build-Time Rendering)

```
MDX Source → Remark Plugin (parse $..$) → KaTeX renderToString() → Static HTML + CSS → No client JS
```

**Advantages**:
- Zero JavaScript shipped for static math
- Instant render (no client-side processing)
- SEO-friendly (math content in HTML)
- No CLS from math rendering

**Disadvantages**:
- No dynamic math (calculator results, user-generated expressions)
- Build time increases with expression count
- Cannot update expressions without rebuild

#### 4.2.2 Strategy B: Full CSR (Client-Side Rendering)

```
MDX Source → Passthrough ($..$ as text) → Client JS detects delimiters → KaTeX.render() in DOM
```

**Advantages**:
- Dynamic math support
- No build-time cost
- User-generated expressions possible

**Disadvantages**:
- ~22KB JS shipped per page
- FOUC (Flash of Unstyled Content) during render
- CLS from math replacing text
- No SSR for SEO

#### 4.2.3 Strategy C: Hybrid SSR + Selective CSR (Recommended)

```
MDX Source → Remark Plugin → KaTeX renderToString() (all static) → Static HTML
                                  ↓
                          Client JS loaded for dynamic expressions only
```

**Implementation**:

1. **Static expressions** (95% of use cases): Rendered at build time via remark/rehype plugin. Zero client JS.
2. **Dynamic expressions** (5% — calculator outputs, interactive formulas): Wrapped in `<MathExpr client:load>` SolidJS island. KaTeX loaded only for these components.

**Advantages**:
- Zero JS for most pages (static math)
- Dynamic math available when needed
- Minimal bundle impact (KaTeX only loaded on pages with dynamic math)
- No CLS for static content

#### 4.2.4 Strategy Selection Matrix

| Criterion               | Strategy A (SSR) | Strategy B (CSR) | Strategy C (Hybrid) |
| ----------------------- | ---------------- | ---------------- | ------------------- |
| Static Math Performance | Excellent        | Poor             | Excellent           |
| Dynamic Math Support    | None             | Excellent        | Good                |
| Bundle Size Impact      | None             | ~22KB            | ~0-22KB (lazy)      |
| CLS Impact              | None             | High             | None (static)       |
| SEO                     | Excellent        | Poor             | Excellent           |
| Build Time Impact       | Low              | None             | Low                 |
| **Overall**             | Good (limited)   | Poor             | **Best**            |

### 4.3 MDX Pipeline Integration

#### 4.3.1 Current Pipeline

```
Content Collection (src/content/articles/*.mdx)
  → Astro Content Layer (getCollection)
  → MDX Renderer (@astrojs/mdx)
  → Shiki Syntax Highlighting
  → HTML Output
```

#### 4.3.2 Extended Pipeline with KaTeX

```
Content Collection (src/content/articles/*.mdx)
  → Astro Content Layer (getCollection)
  → MDX Renderer (@astrojs/mdx)
  → Remark KaTeX Plugin (parse $..$, $$..$$)
  → Rehype KaTeX Plugin (render to HTML + CSS)
  → Shiki Syntax Highlighting
  → HTML Output (static math inline)
```

#### 4.3.3 Delimiter Detection

Standard TeX delimiters recognized by the remark plugin:

| Delimiter     | Type         | Example                          |
| ------------- | ------------ | -------------------------------- |
| `$...$`       | Inline math  | `$\Delta G = -RT \ln K$`        |
| `$$...$$`     | Display math | `$$\frac{-b \pm \sqrt{b^2-4ac}}{2a}$$` |
| `\\[...\\]`   | Display math | `\\[E = mc^2\\]`                |
| `\\(...\\)`   | Inline math  | `\\(x = \\frac{y}{z}\\)`        |

**Note**: The `$` delimiter must not be escaped or inside code blocks. The remark plugin handles this via MDX AST parsing.

### 4.4 Font Loading Strategy

#### 4.4.1 KaTeX Font Files

| Font               | Format | Size (Approx) | Usage                    |
| ------------------ | ------ | ------------- | ------------------------ |
| KaTeX_Main-Regular | WOFF2  | ~20KB         | Normal text              |
| KaTeX_Main-Bold    | WOFF2  | ~22KB         | Bold text                |
| KaTeX_Main-Italic  | WOFF2  | ~22KB         | Italic variables         |
| KaTeX_Math-Italic  | WOFF2  | ~25KB         | Math mode italics        |
| KaTeX_Math-BoldItalic | WOFF2 | ~25KB       | Bold math italics        |
| KaTeX_Size1-Regular | WOFF2 | ~8KB          | Superscripts, subscripts |
| KaTeX_Size2-Regular | WOFF2 | ~6KB          | Script-size elements     |
| KaTeX_Size3-Regular | WOFF2 | ~5KB          | Scriptscript-size        |
| KaTeX_Size4-Regular | WOFF2 | ~5KB          | Display-style size       |
| KaTeX_AMS-Regular  | WOFF2 | ~15KB         | AMS symbols              |
| KaTeX_Script-Regular | WOFF2 | ~8KB        | Calligraphic scripts     |
| KaTeX_Caligraphic-Regular | WOFF2 | ~10KB    | Caligraphic letters      |
| KaTeX_Fraktur-Regular | WOFF2 | ~10KB      | Fraktur letters          |
| KaTeX_SansSerif-Regular | WOFF2 | ~10KB    | Sans-serif letters       |
| KaTeX_Typewriter-Regular | WOFF2 | ~10KB    | Typewriter letters       |

**Total font budget**: ~200KB WOFF2 (before subset optimization)

#### 4.4.2 Font Subsetting Strategy

For oligopeptide content, most font glyphs are unused. Subset to include:

- Latin letters (a-z, A-Z)
- Digits (0-9)
- Common math symbols (∑, ∫, √, ±, ×, ÷, ≤, ≥, ≠, ≈, ∈, ∉, ⊂, ∪, ∩)
- Greek letters (α, β, γ, δ, ε, θ, λ, μ, π, σ, ω, Δ, Σ, Ω)
- Arrow symbols (→, ←, ⇌, ↑, ↓)
- Subscript/superscript digits (₀-₉, ⁰-⁹)

**Estimated subset size**: ~60KB WOFF2 (70% reduction from full fonts)

#### 4.4.3 Font Loading Protocol

```html
<!-- Preload critical KaTeX fonts -->
<link rel="preload" href="/fonts/KaTeX_Main-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/KaTeX_Math-Italic.woff2" as="font" type="font/woff2" crossorigin>

<!-- KaTeX CSS with font-face declarations -->
<link rel="stylesheet" href="/katex.min.css">
```

**CSS Strategy**:
- `font-display: swap` — prevents FOIT, shows fallback then swaps to KaTeX font
- `unicode-range` — browser only loads font if math characters are present
- Subset fonts served from same origin (no CDN dependency)

### 4.5 Accessibility (MathML Fallback)

#### 4.5.1 ARIA Approach

KaTeX renders to HTML/CSS, not MathML. For screen readers:

```html
<!-- KaTeX rendered output -->
<span class="katex-mathml" aria-label="Delta G equals negative R T times natural log of K">
  <span class="katex-html">
    <span class="katex-math">...</span>
  </span>
</span>
```

**Key accessibility features**:
- `aria-label` on the `.katex-mathml` container provides verbal description
- `role="math"` on the outer container
- Visually hidden text alternative for screen readers

#### 4.5.2 MathML Fallback Strategy

For browsers supporting MathML (Firefox native, Chrome behind flag):

```typescript
// During SSR, generate both HTML and MathML output
const htmlOutput = katex.renderToString(tex, { output: 'html' });
const mathmlOutput = katex.renderToString(tex, { output: 'mathml' });

// Render with MathML as fallback
`<span role="math" aria-label="${texToSpeech(tex)}">
  ${htmlOutput}
  <math xmlns="http://www.w3.org/1998/Math/MathML" class="sr-only">
    ${mathmlOutput}
  </math>
</span>`
```

#### 4.5.3 Speech Rule Engine

For complex expressions, provide a `data-speech` attribute with a human-readable description:

```html
<span class="katex" data-speech="Delta G equals minus R T times natural log of K equilibrium">
  ...
</span>
```

The speech text can be generated by:
1. Manual authoring in MDX frontmatter (`math_alt`)
2. Auto-generation from TeX using KaTeX's `defineEmote` (basic)
3. Manual override for critical equations

---

## 5. Algorithm Specification

### 5.1 MDX KaTeX Pipeline Plugin

#### 5.1.1 Purpose

Transforms `$...$` and `$$...$$` delimiters in MDX content into rendered KaTeX HTML at build time.

#### 5.1.2 Input

```typescript
interface KaTeXPluginOptions {
  /** Enable inline math ($) */
  inlineDelimiters: boolean;  // default: true
  /** Enable display math ($$) */
  displayDelimiters: boolean; // default: true
  /** KaTeX rendering options */
  katexOptions: katex.Options;
  /** Output mode: 'html' | 'htmlAndMathml' */
  output: 'html' | 'htmlAndMathml';
  /** Generate aria-label for accessibility */
  ariaLabel: boolean;         // default: true
  /** Error handling: 'throw' | 'warn' | 'ignore' */
  errorHandler: 'throw' | 'warn' | 'ignore';
}
```

#### 5.1.3 Plugin Algorithm

```
FUNCTION remarkKaTeX(options):
  RETURN function transformMDXAST(tree):
    visit(tree, 'paragraph', (node) => {
      FOR EACH child IN node.children:
        IF child.type == 'text' THEN
          // Find inline math delimiters
          matches = findDelimiters(child.value, '$', '$')
          FOR EACH match IN matches:
            tex = extractTeX(match)
            TRY:
              html = katex.renderToString(tex, {
                displayMode: false,
                output: options.output,
                throwOnError: options.errorHandler == 'throw'
              })
              replaceWithHTML(child, match, html, 'inline')
            CATCH error:
              IF options.errorHandler == 'throw' THEN
                throw error
              ELSE IF options.errorHandler == 'warn' THEN
                logWarning(error, tex)
                replaceWithRawTeX(child, match)
              ELSE
                replaceWithRawTeX(child, match)
    })

    visit(tree, 'math', (node) => {
      // Handle display math ($$...$$)
      TRY:
        html = katex.renderToString(node.value, {
          displayMode: true,
          output: options.output,
          throwOnError: options.errorHandler == 'throw'
        })
        replaceNode(node, {
          type: 'html',
          value: wrapDisplayMath(html, node.value, options.ariaLabel)
        })
      CATCH error:
        handleMathError(error, node, options)
    })

    visit(tree, 'inlineMath', (node) => {
      // Handle inline math (\(...\))
      TRY:
        html = katex.renderToString(node.value, {
          displayMode: false,
          output: options.output,
          throwOnError: options.errorHandler == 'throw'
        })
        replaceNode(node, {
          type: 'html',
          value: wrapInlineMath(html, node.value, options.ariaLabel)
        })
      CATCH error:
        handleMathError(error, node, options)
    })
END FUNCTION
```

#### 5.1.4 Output

```typescript
interface RenderedMath {
  html: string;          // KaTeX HTML output
  mathml?: string;       // Optional MathML output
  ariaLabel: string;     // Human-readable description
  cssClasses: string;    // katex, katex-display, etc.
}
```

### 5.2 Dynamic Math Component (SolidJS Island)

#### 5.2.1 Purpose

Provides client-side rendering for dynamic math expressions (e.g., calculator outputs, user-generated formulas).

#### 5.2.2 Input

```typescript
interface DynamicMathProps {
  tex: string;                    // TeX expression
  displayMode?: boolean;          // Display vs inline mode
  onError?: (error: Error) => void;
  className?: string;
}
```

#### 5.2.3 Component Algorithm

```typescript
// DynamicMath.tsx — SolidJS component
import { createSignal, onMount, onCleanup, Show } from 'solid-js';
import katex from 'katex';

export default function DynamicMath(props: DynamicMathProps) {
  const [rendered, setRendered] = createSignal('');
  const [error, setError] = createSignal<string | null>(null);

  onMount(async () => {
    try {
      // Lazy-load KaTeX CSS if not already loaded
      if (!document.querySelector('link[href*="katex"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/katex.min.css';
        document.head.appendChild(link);
      }

      const html = katex.renderToString(props.tex, {
        displayMode: props.displayMode ?? false,
        throwOnError: true,
      });
      setRendered(html);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Math rendering failed');
      props.onError?.(e instanceof Error ? e : new Error(String(e)));
    }
  });

  return (
    <Show
      when={!error()}
      fallback={
        <span class="math-error text-red-500" role="alert">
          [Math Error: {error()}]
        </span>
      }
    >
      <span
        class={`katex ${props.className ?? ''}`}
        innerHTML={rendered()}
        role="math"
        aria-label={props.tex}
      />
    </Show>
  );
}
```

### 5.3 TeX-to-Speech Description Generator

#### 5.3.1 Purpose

Generates human-readable speech text for complex mathematical expressions to improve screen reader accessibility.

#### 5.3.2 Algorithm

```
FUNCTION texToSpeech(tex):
  // Map common TeX patterns to speech
  speechMap = {
    '\\frac{a}{b}': 'a over b',
    '\\sqrt{a}': 'square root of a',
    '\\sum': 'sum',
    '\\prod': 'product',
    '\\int': 'integral',
    '\\alpha': 'alpha',
    '\\beta': 'beta',
    '\\gamma': 'gamma',
    '\\delta': 'delta',
    '\\Delta G': 'Delta G',
    '\\Delta G = -RT \\ln K': 'Delta G equals minus R T times natural log of K',
    // ... expandable mapping
  }

  // Try exact match first
  IF tex IN speechMap THEN
    RETURN speechMap[tex]

  // Pattern-based generation for common forms
  IF tex MATCHES '\\frac{(.*?)}{(.*?)' THEN
    RETURN texToSpeech(group1) + ' over ' + texToSpeech(group2)

  IF tex MATCHES '\\sqrt{(.*?)' THEN
    RETURN 'square root of ' + texToSpeech(group1)

  // Fallback: return raw TeX
  RETURN tex
END FUNCTION
```

### 5.4 KaTeX CSS Integration with Tailwind

#### 5.4.1 Purpose

Ensures KaTeX styles integrate with Tailwind CSS 4.x without conflicts.

#### 5.4.2 Strategy

```css
/* katex-overrides.css — loaded after Tailwind */
@layer components {
  .katex-display {
    @apply my-6 overflow-x-auto;
  }

  .katex-display > .katex {
    @apply text-center;
  }

  .katex {
    @apply text-slate-900 dark:text-slate-100;
  }

  /* Dark mode overrides */
  .dark .katex .mord,
  .dark .katex .mbin,
  .dark .katex .mrel {
    color: var(--color-slate-100);
  }

  /* Math error styling */
  .math-error {
    @apply text-red-500 font-mono text-sm;
  }
}
```

---

## 6. Test Vector Specification

### 6.1 Reference

Test vectors for math rendering are defined in `test_vectors/test_vectors_content_tools.toml`. Key test cases include:

| Category                  | Vector Count | Description                            |
| ------------------------- | ------------ | -------------------------------------- |
| Inline Math Rendering     | 8            | Basic inline expressions               |
| Display Math Rendering    | 8            | Centered display expressions           |
| Complex Expressions       | 6            | Multi-line, aligned, matrix            |
| Chemistry Notation        | 5            | Molecular formulas, ion notation       |
| Accessibility             | 5            | aria-label, role, MathML fallback      |
| Error Handling            | 4            | Invalid TeX, unclosed delimiters       |
| Dark Mode                 | 4            | Color contrast, visibility             |
| **Total**                 | **40**       |                                        |

### 6.2 Validation Criteria

1. All inline math renders correctly within paragraph flow
2. All display math renders centered with proper spacing
3. Complex expressions (fractions, integrals, matrices) render without overflow
4. Chemistry notation (H₂O, Ca²⁺, CH₃COOH) renders correctly
5. Dark mode maintains ≥4.5:1 contrast ratio for all math symbols
6. `aria-label` provides meaningful description for all expressions
7. Invalid TeX produces visible error, not broken layout
8. Fonts load without FOIT or CLS

---

## 7. Domain Constraints

### 7.1 Bundle Size Impact

All constraints defined in `domain_constraints/domain_constraints_content.toml`.

| Component                   | Limit (Uncompressed) | Limit (Gzipped) | Notes                           |
| --------------------------- | -------------------- | --------------- | ------------------------------- |
| KaTeX Core JS               | 12KB                 | 4KB             | Only on pages with dynamic math |
| KaTeX CSS                   | 25KB                 | 5KB             | Loaded on all math pages        |
| KaTeX Fonts (subset)        | 60KB total           | N/A (WOFF2)     | Preloaded, cached               |
| DynamicMath Island          | 8KB                  | 3KB             | SolidJS component               |
| Total Per Page (static math)| 25KB CSS + fonts     | 5KB CSS + fonts | Zero JS for static math         |
| Total Per Page (dynamic)    | 45KB                 | 12KB            | Includes JS island              |

### 7.2 Render Time Constraints

| Metric                         | Target  | Critical Threshold |
| ------------------------------ | ------- | ------------------ |
| SSR render time (100 expressions) | <200ms | >1000ms            |
| Client render time (10 expressions) | <50ms | >200ms            |
| Font load time (first paint)   | <100ms  | >300ms             |
| CSS parse time                 | <10ms   | >50ms              |

### 7.3 Accessibility Constraints

| Constraint                       | Requirement                            |
| -------------------------------- | -------------------------------------- |
| ARIA label for all math          | Required                               |
| Role="math" on containers        | Required                               |
| Contrast ratio (dark mode)       | ≥4.5:1 for all text                    |
| Screen reader output             | Equivalent to visual representation    |
| Keyboard navigation              | Math containers focusable if interactive |
| Reduced motion                   | KaTeX animations disabled              |

### 7.4 Expression Complexity Limits

| Metric                         | Limit   | Rationale                              |
| ------------------------------ | ------- | -------------------------------------- |
| Max expression length (chars)  | 500     | Prevents performance degradation       |
| Max nested groups              | 10      | Prevents deep recursion                |
| Max matrix dimensions          | 10×10   | Limits DOM node count                  |
| Max expressions per page       | 200     | Bundle size and render time budget     |
| Max `\newcommand` definitions  | 20      | Limits macro expansion complexity      |

---

## 8. Bibliography

### 8.1 Math Rendering References

1. KaTeX Contributors. (2024). _KaTeX: The fastest math typesetting library for the web_. https://katex.org

2. KaTeX Contributors. (2024). _KaTeX GitHub Repository_. https://github.com/KaTeX/KaTeX

3. MathJax Consortium. (2024). _MathJax Documentation v3_. https://docs.mathjax.org

4. Cline, D. (2024). KaTeX performance benchmarks. _KaTeX GitHub README_.

5. W3C Math Working Group. (2014). _Mathematical Markup Language (MathML) Version 3.0_. https://www.w3.org/TR/MathML3/

### 8.2 Accessibility References

6. W3C WAI. (2023). _WAI-ARIA Authoring Practices Guide_. https://www.w3.org/WAI/ARIA/apg/

7. W3C WAI. (2018). _Web Content Accessibility Guidelines (WCAG) 2.1_. https://www.w3.org/TR/WCAG21/

8. NSIT. (2023). _Accessible Math on the Web: Best Practices_. W3C WAI.

9. Mozilla Developer Network. (2024). _MathML: Adding math to the web_. https://developer.mozilla.org/en-US/docs/Web/MathML

### 8.3 Astro and MDX References

10. Astro Contributors. (2024). _Astro MDX Integration_. https://docs.astro.build/en/guides/integrations-guide/mdx/

11. Astro Contributors. (2024). _Astro Content Collections_. https://docs.astro.build/en/guides/content-collections/

12. unified Contributors. (2024). _remark-math: Math support in remark_. https://github.com/remarkjs/remark-math

13. unified Contributors. (2024). _rehype-katex: KaTeX support in rehype_. https://github.com/remarkjs/rehype-katex

### 8.4 Performance References

14. Addy Osmani. (2020). _Learning Core Web Vitals_. https://web.dev/vitals/

15. Ilyes Khemakhem. (2023). Font loading strategies for web performance. _Smashing Magazine_.

16. Jake Archibald. (2022). _In Defense of Font display_. https://web.dev/font-display/

---

## 9. Knowledge Graph Concepts

### 9.1 Cross-Lingual Terminology

| English          | Chinese (ZH) | Russian (RU)              | German (DE)            | French (FR)               | Japanese (JP)            |
| ---------------- | ------------ | ------------------------- | ---------------------- | ------------------------- | ------------------------ |
| Math rendering   | 数学渲染     | отображение математики    | Mathematische Darstellung | Rendu mathématique      | 数式レンダリング          |
| LaTeX            | LaTeX        | LaTeX                     | LaTeX                  | LaTeX                     | LaTeX                    |
| KaTeX            | KaTeX        | KaTeX                     | KaTeX                  | KaTeX                     | KaTeX                    |
| Inline math      | 行内数学     | математика в строке       | Inline-Mathematik      | Mathématique en ligne     | インライン数式           |
| Display math     | 显示数学     | выносная математика       | Block-Mathematik       | Mathématique displayed    | ディスプレイ数式         |
| Accessibility    | 无障碍       | доступность               | Barrierefreiheit       | Accessibilité             | アクセシビリティ         |

### 9.2 Knowledge Graph Nodes

| Node Type          | Description                          | Relationships                                   |
| ------------------ | ------------------------------------ | ----------------------------------------------- |
| `MathExpression`   | Rendered mathematical formula        | `usedIn`, `describesProperty`, `belongsToArticle` |
| `TeXCommand`       | Individual TeX command               | `rendersAs`, `requiresFont`, `hasAltText`       |
| `MathFont`         | Font file for rendering              | `supportsGlyphs`, `loadedBy`, `cachedAs`        |
| `AccessibilityFallback` | Alternative representation    | `equivalentTo`, `format`, `targetAudience`      |

### 9.3 Cross-References

- Mathematical notation used in molecular weight calculations connects to `YP-CHEM-OLIGO-001`
- Pharmacokinetic equations connect to `YP-BIO-OLIGO-001`
- Performance constraints align with `YP-WEB-TECH-001` bundle size budgets
- Accessibility requirements per `YP-WEB-TECH-001` Section 7.6

---

## 10. Quality Checklist

### 10.1 Completeness

- [ ] KaTeX vs MathJax comparison complete with performance data
- [ ] SSR + CSR hybrid strategy fully specified
- [ ] MDX pipeline integration algorithm defined
- [ ] Font loading strategy with subsetting plan documented
- [ ] Accessibility (MathML + ARIA) approach specified
- [ ] Dark mode theming strategy defined
- [ ] Dynamic math SolidJS component designed

### 10.2 Accuracy

- [ ] Bundle size estimates validated against KaTeX documentation
- [ ] Render performance targets based on KaTeX benchmarks
- [ ] Font file sizes verified against KaTeX distribution
- [ ] Accessibility features aligned with WCAG 2.1 AA requirements
- [ ] All technical claims traceable to KaTeX/MathJax documentation

### 10.3 Consistency

- [ ] Bundle budgets consistent with `domain_constraints_content.toml`
- [ ] Accessibility constraints consistent with `YP-WEB-TECH-001`
- [ ] Dark mode approach consistent with existing design system
- [ ] Plugin architecture compatible with Astro MDX integration

### 10.4 Traceability

- [ ] Engine selection rationale documented
- [ ] Rendering strategy rationale documented
- [ ] Font strategy traceable to performance requirements
- [ ] Test vectors traceable to algorithm specification

### 10.5 Usability

- [ ] MDX authoring syntax intuitive for content authors
- [ ] Error messages helpful for debugging invalid TeX
- [ ] Accessibility output verified with screen reader testing
- [ ] Dark mode rendering visually verified
