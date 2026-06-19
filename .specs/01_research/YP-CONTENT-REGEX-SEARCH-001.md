---
document_id: YP-CONTENT-REGEX-SEARCH-001
title: "Regex Search"
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
  Specification of power-user regex search with regular expression support.
  Covers regex engine evaluation (browser native, re2, regexp-tree), search
  index integration with Pagefind, UI patterns (search panel, match highlighting,
  result navigation), performance constraints for static site deployment,
  ReDoS prevention via escaping and sanitization, and advanced search syntax
  (field-specific, boolean operators). Enables precise content discovery for
  scientific oligopeptide reference materials.
test_vector_ref: "test_vectors/test_vectors_content_tools.toml"
domain_constraint_ref: "domain_constraints/domain_constraints_content.toml"
bibliography_ref: "bibliography.md"
---

# Yellow Paper: Regex Search

**Document ID:** YP-CONTENT-REGEX-SEARCH-001
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

This Yellow Paper specifies the regex-powered search system that gives power users precise content discovery tools. Beyond Pagefind's full-text search, regex search enables scientists and students to find specific patterns: peptide sequences matching `^[ACDEFGHIKLMNPQRSTVWY]{5}$` (all pentapeptides), articles containing molecular weight ranges like `\d{3,5}\.\d+\s*Da`, or terms matching `^K\d{2}` (kinin nomenclature). The system integrates with the existing Pagefind index while providing a regex-capable search layer.

### 1.2 Scope

Covers regex engine evaluation (browser native `RegExp`, re2 via WebAssembly, regexp-tree AST analysis), integration with Pagefind search index, regex search UI (search panel, pattern input, match highlighting, result navigation), performance constraints for client-side execution on static sites, ReDoS (Regular Expression Denial of Service) prevention, and advanced search syntax (field-specific search, boolean operators, case sensitivity). Does not cover server-side regex search (reserved for Cloudflare Workers API), NLP-based semantic search (future phase), or search indexing internals (covered by `YP-WEB-TECH-001`).

### 1.3 Audience

Frontend developers implementing the search UI, security engineers validating ReDoS prevention, content architects designing search syntax, accessibility engineers validating keyboard/screen reader support, and power users (scientists, bioinformaticians) who will use regex search.

### 1.4 Normative References

- ECMAScript Language Specification — RegExp (https://tc39.es/ecma262/#sec-regular-expressions)
- Google re2 Library (https://github.com/google/re2)
- regexp-tree Documentation (https://github.com/nicolo-ribaudo/regexp-tree)
- Pagefind Documentation (https://pagefind.app)
- WAI-ARIA Authoring Practices (https://www.w3.org/WAI/ARIA/apg/)
- OWASP ReDoS Prevention (https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)

### 1.5 Definitions and Acronyms

| Term     | Definition                                         |
| -------- | -------------------------------------------------- |
| Regex    | Regular expression — pattern matching syntax       |
| ReDoS    | Regular Expression Denial of Service — attack      |
| DFA      | Deterministic Finite Automaton                     |
| NFA      | Non-deterministic Finite Automaton                 |
| Catastrophic Backtracking | Exponential time complexity from nested quantifiers |
| Anchor   | Regex metacharacter constraining match position (^, $) |
| Capture Group | Parenthesized sub-pattern extracting matched text |

---

## 2. Executive Summary

### 2.1 Problem Statement

Full-text search via Pagefind handles 90% of search needs, but scientific content requires pattern-based discovery. Bioinformaticians need to find articles mentioning specific molecular weight ranges, peptide sequence patterns, or chemical formula patterns. Students need to find articles containing specific equation structures. Without regex support, users resort to manual browsing — defeating the purpose of a searchable platform.

### 2.2 Scope of Solution

This Yellow Paper defines:

1. **Regex Engine**: Browser-native `RegExp` with safety layer for ReDoS prevention
2. **Search Integration**: Regex layer on top of Pagefind results
3. **UI Patterns**: Search panel with regex toggle, syntax highlighting, match navigation
4. **Performance**: Client-side regex execution with time limits
5. **Security**: ReDoS prevention via complexity analysis, timeout, and sanitization
6. **Advanced Syntax**: Field-specific search (`title:`, `tag:`), boolean operators (`AND`, `OR`, `NOT`)

### 2.3 Key Assumptions

- Content corpus: ~190 articles, ~500KB of searchable text
- Primary users: scientists, bioinformaticians, graduate students
- Regex patterns are typically simple (sequence matching, number ranges)
- Client-side execution acceptable for corpus size
- Pagefind provides the base search index; regex refines results
- Search UI available on both sites

### 2.4 Success Criteria

- Regex search finds correct results for standard scientific patterns
- ReDoS-resistant: no user-input regex causes >500ms execution
- UI provides syntax highlighting for regex patterns
- Match highlighting navigable via keyboard (F3/Enter)
- Field-specific search works across all article metadata
- Search panel accessible via keyboard shortcut (Ctrl+K or /)

---

## 3. Nomenclature and Notation

### 3.1 Regex Terminology

| Term              | Definition                                           |
| ----------------- | ---------------------------------------------------- |
| Pattern           | Regex expression string                              |
| Literal           | Character matching itself (e.g., `a`, `1`)          |
| Metacharacter     | Character with special meaning (e.g., `.`, `*`, `+`)|
| Quantifier        | Specifies repetition count (`*`, `+`, `{n,m}`)      |
| Character Class   | Set of characters (`[a-z]`, `\d`, `\w`)              |
| Anchor            | Position constraint (`^` start, `$` end)            |
| Alternation       | OR pattern (`a|b`)                                   |
| Capture Group     | Parenthesized sub-pattern `(...)`                    |
| Lookahead         | Zero-width assertion for following context          |
| Backtracking      | NFA trying multiple paths to find match             |

### 3.2 Search Terminology

| Term              | Definition                                           |
| ----------------- | ---------------------------------------------------- |
| Query             | User-entered search expression                       |
| Match             | Substring satisfying the regex pattern               |
| Hit               | Document containing at least one match               |
| Snippet           | Preview text surrounding a match                     |
| Highlight         | Visual markup of matched text in results             |
| Field Search      | Searching within specific metadata fields            |
| Boolean Search    | Combining terms with AND, OR, NOT operators          |

---

## 4. Theoretical Foundation

### 4.1 Regex Engine Evaluation

#### 4.1.1 Browser-Native `RegExp`

**Characteristics**:
- ECMAScript specification (ES2022)
- NFA-based backtracking engine
- Zero bundle size (built into browser)
- Full regex syntax support
- No guaranteed time complexity

**ReDoS Vulnerability**: Browser-native `RegExp` is susceptible to catastrophic backtracking:

```
// Vulnerable pattern (catastrophic backtracking)
/a]+$/.test('aaaaaaaaaaaaaaaaaaaaaaaaaaa!')
// O(2^n) time complexity — hangs browser
```

**Mitigation**: Complexity analysis + execution timeout.

#### 4.1.2 Google re2 (WebAssembly)

**Characteristics**:
- DFA-based, guaranteed linear time O(n)
- No backtracking, no ReDoS
- ~500KB WASM module
- Limited regex syntax (no backreferences, limited lookahead)
- C++ implementation compiled to WASM

**ReDoS Safety**: Guaranteed — DFA cannot backtrack.

**Bundle Impact**: ~500KB WASM + ~200KB JS wrapper = ~700KB total. Exceeds 60KB gzip budget.

#### 4.1.3 regexp-tree (AST Analysis)

**Characteristics**:
- Parses regex into AST
- Analyzes complexity statically
- ~30KB bundle
- Can detect potentially catastrophic patterns
- Can transform/optimize regex

**ReDoS Safety**: Partial — detects patterns at parse time, not runtime.

#### 4.1.4 Recommendation: Browser-Native + Safety Layer

**Rationale**:

1. **Zero bundle impact**: No additional libraries needed
2. **Full syntax support**: All ECMAScript regex features available
3. **Performance**: Native engine is fastest for simple patterns
4. **ReDoS mitigation**: Implement complexity analysis + execution timeout
5. **Content corpus is small**: ~500KB — regex execution fast for most patterns

**ReDoS Defense-in-Depth**:

```
Layer 1: Static analysis (regexp-tree) — detect known vulnerable patterns
Layer 2: Pattern complexity scoring — reject patterns with high complexity
Layer 3: Execution timeout — abort after 100ms
Layer 4: Result limit — cap matches at 1000
```

### 4.2 Pagefind Integration

#### 4.2.1 Current Pagefind Architecture

```
User Query → Pagefind WASM Index → Ranked Results → UI Display
```

Pagefind provides:
- Full-text search across all pages
- BM25 ranking
- Snippet generation
- Pre-built WASM search engine

#### 4.2.2 Regex Integration Strategy

```
User Query → Parse Query Type → Branch:
  IF plain text → Pagefind search → Results
  IF regex pattern → Pagefind search (escape regex chars) → Filter results with regex → Results
  IF field search → Pagefind field filter → Apply regex → Results
```

**Key insight**: Pagefind doesn't support regex natively. The strategy is:

1. Use Pagefind for initial document retrieval (fast, indexed)
2. Apply regex filtering on retrieved documents (client-side)
3. Highlight matches in snippets and full content

#### 4.2.3 Search Flow

```
1. User enters query in search panel
2. Query parsed:
   a. Detect regex delimiters (/pattern/flags)
   b. Detect field prefixes (title:, tag:, category:)
   c. Detect boolean operators (AND, OR, NOT)
3. Build Pagefind query (stripped of regex syntax)
4. Execute Pagefind search → get candidate documents
5. For each candidate:
   a. Load full text from Pagefind fragment index
   b. Apply regex pattern to text
   c. Record matches with positions
6. Rank results by match count + Pagefind relevance score
7. Generate snippets with highlighted matches
8. Display results in search panel
```

### 4.3 UI Patterns

#### 4.3.1 Search Panel Layout

```
┌─────────────────────────────────────────────────┐
│ 🔍 Search                              [×]      │
├─────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐     │
│ │ /pentapeptide.*MW\s+\d{3}/i            │     │
│ └─────────────────────────────────────────┘     │
│ [✓] Regex  [✓] Case Sensitive  [Field: All ▾]  │
├─────────────────────────────────────────────────┤
│ Results (42 matches in 8 documents)             │
│                                                 │
│ ┌─ Glutathione ────────────────────────────┐   │
│ │ ...the pentapeptide MW 555.62 corresponds │   │
│ │ to leucine-enkephalin (YGGFL)...         │   │
│ └───────────────────────────────────────────┘   │
│                                                 │
│ ┌─ Angiotensin II ─────────────────────────┐   │
│ │ ...angiotensin II (MW 1046.18) is an     │   │
│ │ octapeptide with MW in the 1000 range... │   │
│ └───────────────────────────────────────────┘   │
│                                                 │
│ [← Prev] [1/42] [Next →]                       │
└─────────────────────────────────────────────────┘
```

#### 4.3.2 Search Panel Interaction Patterns

| Action              | Behavior                                      |
| ------------------- | --------------------------------------------- |
| Ctrl+K or /         | Open search panel (global shortcut)           |
| Escape              | Close search panel                            |
| Type in input       | Live search (debounced 300ms)                  |
| Toggle Regex        | Enable/disable regex mode                     |
| Toggle Case         | Enable/disable case sensitivity               |
| Field dropdown      | Select field to search (all, title, tag, etc.)|
| Click result        | Navigate to article, scroll to match          |
| F3 or Enter         | Jump to next match in current article         |
| Shift+F3            | Jump to previous match                        |
| Arrow keys          | Navigate between results                      |

#### 4.3.3 Regex Syntax Highlighting

```typescript
interface RegexHighlight {
  pattern: string;       // highlighted HTML
  groups: Array<{
    start: number;
    end: number;
    type: 'literal' | 'metacharacter' | 'quantifier' | 'class' | 'group' | 'anchor';
  }>;
}
```

Color scheme:
- Literals: `text-slate-900 dark:text-slate-100` (normal text color)
- Metacharacters: `text-blue-600 dark:text-blue-400`
- Quantifiers: `text-purple-600 dark:text-purple-400`
- Character classes: `text-amber-600 dark:text-amber-400`
- Groups: `text-green-600 dark:text-green-400`
- Anchors: `text-red-600 dark:text-red-400`

### 4.4 ReDoS Prevention

#### 4.4.1 Vulnerable Pattern Detection

```
FUNCTION analyzeComplexity(pattern):
  // Parse regex into AST
  ast = regexpTree.parse(pattern)

  // Check for known vulnerable patterns
  vulnerabilities = []

  // Nested quantifiers: (a+)+ — exponential backtracking
  IF hasNestedQuantifiers(ast) THEN
    vulnerabilities.APPEND({
      type: 'nested_quantifiers',
      severity: 'high',
      message: 'Nested quantifiers can cause exponential backtracking'
    })

  // Overlapping alternations: (a|a)+ — exponential
  IF hasOverlappingAlternations(ast) THEN
    vulnerabilities.APPEND({
      type: 'overlapping_alternations',
      severity: 'high',
      message: 'Overlapping alternatives can cause exponential backtracking'
    })

  // Adjacent quantified groups with overlap: \d+\d+ — polynomial
  IF hasAdjacentQuantifiedGroups(ast) THEN
    vulnerabilities.APPEND({
      type: 'adjacent_quantified_groups',
      severity: 'medium',
      message: 'Adjacent quantified groups may cause polynomial backtracking'
    })

  // Complexity score (0-100)
  score = computeComplexityScore(ast)

  RETURN {
    score,
    vulnerabilities,
    safe: vulnerabilities.length == 0 AND score < 50
  }
END FUNCTION
```

#### 4.4.2 Execution Timeout

```
FUNCTION safeRegexMatch(pattern, text, options):
  // Pre-check: complexity analysis
  analysis = analyzeComplexity(pattern)
  IF NOT analysis.safe THEN
    IF analysis.score >= 80 THEN
      RETURN { error: 'Pattern too complex. Simplify your regex.' }
    // Allow execution but with strict timeout

  // Compile regex
  TRY:
    regex = new RegExp(pattern, options)
  CATCH error:
    RETURN { error: `Invalid regex: ${error.message}` }

  // Execute with timeout
  startTime = performance.now()
  TIMEOUT_MS = 100

  // Use a web worker for complex patterns
  IF analysis.score > 30 THEN
    RETURN executeInWorker(pattern, text, options, TIMEOUT_MS)

  // Direct execution for simple patterns
  matches = []
  match = regex.exec(text)

  WHILE match IS NOT NULL:
    IF performance.now() - startTime > TIMEOUT_MS THEN
      RETURN { error: 'Search timed out. Try a simpler pattern.' }

    matches.APPEND({
      index: match.index,
      length: match[0].length,
      groups: match.slice(1)
    })

    // Prevent infinite loops with zero-length matches
    IF match[0].length == 0 THEN
      regex.lastIndex++
    ELSE
      match = regex.exec(text)

    IF LENGTH(matches) > 1000 THEN
      break  // Cap matches

  RETURN { matches, time: performance.now() - startTime }
END FUNCTION
```

#### 4.4.3 User Input Sanitization

```
FUNCTION sanitizeRegexInput(input):
  // Remove control characters
  sanitized = input.replace(/[\x00-\x1f\x7f]/g, '')

  // Validate regex syntax
  TRY:
    new RegExp(sanitized)
  CATCH error:
    RETURN { valid: false, error: error.message }

  // Analyze complexity
  analysis = analyzeComplexity(sanitized)

  RETURN {
    valid: true,
    pattern: sanitized,
    warnings: analysis.vulnerabilities,
    complexityScore: analysis.score
  }
END FUNCTION
```

### 4.5 Advanced Search Syntax

#### 4.5.1 Query Grammar

```
query       := term (BOOLEAN_OP term)*
term        := [field_prefix]? (regex_pattern | phrase | word)
field_prefix := "title:" | "tag:" | "category:" | "difficulty:" | "author:" | "citation:"
regex_pattern := "/" .+ "/" [flags]
phrase       := '"' .+ '"'
word         := [^\s]+
BOOLEAN_OP   := "AND" | "OR" | "NOT"
```

#### 4.5.2 Examples

| Query                                       | Interpretation                                      |
| ------------------------------------------- | --------------------------------------------------- |
| `insulin`                                   | Simple text search                                  |
| `/insulin.*chain/i`                         | Regex search for "insulin" + "chain"                |
| `title:"Leucine-Enkephalin"`                | Search in title only                                |
| `tag:pharmacology AND tag:receptor`         | Articles with both tags                             |
| `category:chemistry NOT beginner`           | Chemistry articles excluding beginner difficulty    |
| `/MW\s+\d{3,5}/i title:"molecular weight"` | Regex in body AND exact title match                 |
| `author:"Smith" OR author:"Jones"`          | Articles by either author                           |

#### 4.5.3 Query Parser Algorithm

```
FUNCTION parseSearchQuery(input):
  tokens = tokenize(input)
  AST = []

  i = 0
  WHILE i < LENGTH(tokens):
    token = tokens[i]

    IF token.type == 'FIELD_PREFIX' THEN
      // Field-specific search
      field = token.value.rstrip(':')
      value = tokens[i + 1]
      AST.APPEND({ type: 'field', field, value })
      i += 2

    ELSE IF token.type == 'REGEX' THEN
      // Regex pattern
      pattern = token.value.slice(1, token.value.lastIndexOf('/'))
      flags = token.value.slice(token.value.lastIndexOf('/') + 1)
      AST.APPEND({ type: 'regex', pattern, flags })
      i += 1

    ELSE IF token.type == 'BOOLEAN_OP' THEN
      AST.APPEND({ type: 'operator', op: token.value })
      i += 1

    ELSE IF token.type == 'PHRASE' THEN
      AST.APPEND({ type: 'phrase', value: token.value.slice(1, -1) })
      i += 1

    ELSE
      AST.APPEND({ type: 'term', value: token.value })
      i += 1

  RETURN AST
END FUNCTION
```

---

## 5. Algorithm Specification

### 5.1 Combined Search Algorithm

#### 5.1.1 Purpose

Executes a search query combining Pagefind full-text search with regex pattern matching.

#### 5.1.2 Algorithm

```
FUNCTION executeSearch(query):
  startTime = performance.now()

  // Step 1: Parse query
  parsed = parseSearchQuery(query)

  // Step 2: Extract plain text terms for Pagefind
  pagefindTerms = extractPagefindTerms(parsed)
  pagefindQuery = pagefindTerms.join(' ')

  // Step 3: Execute Pagefind search
  pagefindResults = await pagefind.search(pagefindQuery)

  // Step 4: Filter and rank with regex
  results = []
  FOR EACH hit IN pagefindResults.results:
    doc = await hit.data()

    // Apply field filters
    IF hasFieldFilters(parsed) THEN
      IF NOT matchesFieldFilters(doc, parsed) THEN
        CONTINUE

    // Apply regex patterns
    IF hasRegexPatterns(parsed) THEN
      regexPatterns = extractRegexPatterns(parsed)
      allMatches = []

      FOR EACH pattern IN regexPatterns:
        matchResult = safeRegexMatch(pattern.pattern, doc.content, pattern.flags)
        IF matchResult.error THEN
          results.APPEND({ error: matchResult.error })
          CONTINUE
        allMatches.push(...matchResult.matches)

      IF LENGTH(allMatches) == 0 THEN
        CONTINUE  // No regex matches in this document

      // Boost score by match count
      score = doc.score * (1 + LENGTH(allMatches) * 0.1)
    ELSE
      score = doc.score

    results.APPEND({
      url: doc.url,
      title: doc.title,
      excerpt: doc.excerpt,
      matches: allMatches,
      score,
      metadata: doc.meta
    })

  // Step 5: Sort by score
  results = SORT(results, by: score DESCENDING)

  // Step 6: Generate highlighted snippets
  FOR EACH result IN results:
    result.snippet = generateHighlightedSnippet(
      result.excerpt,
      result.matches
    )

  RETURN {
    results: results.slice(0, 20),  // Cap at 20
    totalCount: LENGTH(results),
    queryTime: performance.now() - startTime
  }
END FUNCTION
```

### 5.2 Match Highlighting Algorithm

#### 5.2.1 Purpose

Generates HTML with highlighted regex matches for display in search results.

#### 5.2.2 Algorithm

```
FUNCTION highlightMatches(text, matches):
  IF LENGTH(matches) == 0 THEN
    return escapeHtml(text)

  // Sort matches by position
  sortedMatches = SORT(matches, by: index ASCENDING)

  // Build highlighted HTML
  html = ''
  lastEnd = 0

  FOR EACH match IN sortedMatches:
    // Add text before match
    html += escapeHtml(text.slice(lastEnd, match.index))

    // Add highlighted match
    html += `<mark class="bg-yellow-200 dark:bg-yellow-800 text-slate-900 dark:text-yellow-100 rounded px-0.5">`
    html += escapeHtml(text.slice(match.index, match.index + match.length))
    html += `</mark>`

    lastEnd = match.index + match.length

  // Add remaining text
  html += escapeHtml(text.slice(lastEnd))

  RETURN html
END FUNCTION
```

### 5.3 Regex Syntax Highlighter

#### 5.3.1 Purpose

Provides real-time syntax highlighting in the regex input field.

#### 5.3.2 Algorithm

```
FUNCTION highlightRegexSyntax(pattern):
  tokens = []
  i = 0

  WHILE i < LENGTH(pattern):
    char = pattern[i]

    IF char == '\\' THEN
      // Escaped character
      tokens.APPEND({ text: pattern.slice(i, i + 2), type: 'escaped' })
      i += 2

    ELSE IF char IN '[(' THEN
      // Group or character class opener
      tokens.APPEND({ text: char, type: 'group' })
      i += 1

    ELSE IF char IN ')]' THEN
      // Group or character class closer
      tokens.APPEND({ text: char, type: 'group' })
      i += 1

    ELSE IF char IN '*+?{=' THEN
      // Quantifier
      tokens.APPEND({ text: char, type: 'quantifier' })
      i += 1

    ELSE IF char IN '^$.' THEN
      // Anchor or metacharacter
      tokens.APPEND({ text: char, type: 'metacharacter' })
      i += 1

    ELSE IF char == '|' THEN
      // Alternation
      tokens.APPEND({ text: char, type: 'alternation' })
      i += 1

    ELSE
      // Literal character
      tokens.APPEND({ text: char, type: 'literal' })
      i += 1

  // Render tokens as styled spans
  html = tokens.map(t =>
    `<span class="regex-${t.type}">${escapeHtml(t.text)}</span>`
  ).join('')

  RETURN html
END FUNCTION
```

### 5.4 Search Index Augmentation

#### 5.4.1 Purpose

Extends Pagefind index with regex-searchable fields at build time.

#### 5.4.2 Algorithm

```
FUNCTION augmentSearchIndex(contentCollection):
  augmentedDocs = []

  FOR EACH article IN contentCollection:
    doc = {
      id: article.slug,
      title: article.title,
      body: article.body,
      tags: article.tags,
      category: article.category,
      difficulty: article.difficulty,
      author: article.author,
      // Augmented fields for regex search
      sequences: extractSequences(article.body),     // Peptide sequences
      numbers: extractNumbers(article.body),          // Numerical values
      formulas: extractFormulas(article.body),        // Chemical formulas
      citations: extractCitations(article.body)       // DOI, PMID
    }
    augmentedDocs.APPEND(doc)

  RETURN augmentedDocs
END FUNCTION

FUNCTION extractSequences(text):
  // Find peptide sequences (amino acid one-letter codes)
  pattern = /[ACDEFGHIKLMNPQRSTVWY]{2,50}/g
  RETURN text.match(pattern) ?? []
END FUNCTION

FUNCTION extractNumbers(text):
  // Find numerical values with units
  pattern = /\d+\.?\d*\s*(Da|kDa|nM|μM|mM|M|mg|kg|pH|°C)/g
  RETURN text.match(pattern) ?? []
END FUNCTION

FUNCTION extractFormulas(text):
  // Find chemical formulas
  pattern = /[A-Z][a-z]?\d*(?:[A-Z][a-z]?\d*)*/g
  RETURN text.match(pattern) ?? []
END FUNCTION
```

---

## 6. Test Vector Specification

### 6.1 Reference

Test vectors for regex search are defined in `test_vectors/test_vectors_content_tools.toml`. Key test cases include:

| Category                  | Vector Count | Description                            |
| ------------------------- | ------------ | -------------------------------------- |
| Basic Regex Matching      | 8            | Literal, character class, quantifier   |
| Complex Regex Patterns    | 6            | Groups, alternation, anchors           |
| Field-Specific Search     | 5            | title:, tag:, category: filters        |
| Boolean Operators         | 5            | AND, OR, NOT combinations              |
| ReDoS Prevention          | 6            | Vulnerable patterns, timeout, analysis |
| Performance               | 4            | Execution time for various corpus sizes|
| **Total**                 | **34**       |                                        |

### 6.2 Validation Criteria

1. Basic regex patterns match correct documents
2. Complex patterns (groups, alternation) work correctly
3. Field-specific search filters to correct metadata
4. Boolean operators combine results correctly
5. ReDoS patterns are detected and rejected/timed out
6. Execution time stays within 100ms for all test patterns
7. Match highlighting is accurate (no off-by-one)
8. Search UI is accessible via keyboard

---

## 7. Domain Constraints

### 7.1 Performance Constraints

All constraints defined in `domain_constraints/domain_constraints_content.toml`.

| Metric                         | Target  | Critical Threshold |
| ------------------------------ | ------- | ------------------ |
| Regex execution time (per doc) | <10ms   | >100ms             |
| Total search time (with regex) | <200ms  | >500ms             |
| Complex pattern timeout        | 100ms   | >200ms             |
| Pagefind query time            | <50ms   | >100ms             |
| Snippet generation time        | <10ms   | >50ms              |

### 7.2 Security Constraints

| Constraint                       | Requirement                            |
| -------------------------------- | -------------------------------------- |
| ReDoS complexity score           | <50 (of 100)                           |
| Execution timeout                | 100ms maximum                          |
| Maximum pattern length           | 200 characters                         |
| Maximum matches per document     | 100                                    |
| Maximum results displayed        | 20                                     |
| User input sanitization          | Required before compilation            |

### 7.3 Accessibility Constraints

| Constraint                       | Requirement                            |
| -------------------------------- | -------------------------------------- |
| Search panel keyboard shortcut   | Ctrl+K or / globally                   |
| Result navigation                | F3/Enter for next, Shift+F3 for prev   |
| ARIA labels                      | Search input, results list, navigation |
| Screen reader result count       | "N results found" announcement         |
| Focus management                 | Focus moves to results on search       |
| Reduced motion                   | No animated result transitions         |

### 7.4 Search Syntax Constraints

| Constraint                       | Limit                                  |
| -------------------------------- | -------------------------------------- |
| Maximum query length             | 500 characters                         |
| Maximum nested groups            | 5                                      |
| Maximum alternation branches     | 10                                     |
| Maximum capture groups           | 10                                     |
| Supported regex flags            | g, i, m, s                            |

---

## 8. Bibliography

### 8.1 Regex References

1. ECMA International. (2024). _ECMAScript Language Specification — Regular Expressions_. https://tc39.es/ecma262/#sec-regular-expressions

2. Friedl, J. E. F. (2006). _Mastering Regular Expressions_ (3rd ed.). O'Reilly Media. ISBN: 978-0596528126.

3. Goyvaerts, J., & Levithan, S. (2012). _Regular Expressions Cookbook_ (2nd ed.). O'Reilly Media. ISBN: 978-1449319434.

4. Cox, R. (2007). Regular expression matching can be simple and fast. _Regular-Expressions.info_. https://swtch.com/~rsc/regexp/

### 8.2 ReDoS References

5. OWASP. (2023). _Regular expression Denial of Service (ReDoS)_. https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS

6. Weideman, N. (2016). Regular expression denial of service (ReDoS). _University of Cape Town Technical Report_.

7. Davis, J. C., et al. (2018). Static detection of regular expression denial of service vulnerabilities. _ISSTA '18_.

8. Galán, S., et al. (2022). Regulator: A fast and cost-effective ReDoS detection tool. _ASE '22_.

### 8.3 Search References

9. Pagefind Contributors. (2024). _Pagefind: Static search at build time_. https://pagefind.app

10. Google. (2024). _re2: A fast, safe, alternative to backtracking regex_. https://github.com/google/re2

11. Ribaudo, N. (2024). _regexp-tree: A parser, transformer, and validator for regex_. https://github.com/nicolo-ribaudo/regexp-tree

12. Manning, C. D., Raghavan, P., & Schütze, H. (2008). _Introduction to Information Retrieval_. Cambridge University Press. ISBN: 978-0521865739.

### 8.4 Accessibility References

13. W3C WAI. (2023). _WAI-ARIA Authoring Practices Guide_. https://www.w3.org/WAI/ARIA/apg/

14. W3C WAI. (2018). _WCAG 2.1_. https://www.w3.org/TR/WCAG21/

---

## 9. Knowledge Graph Concepts

### 9.1 Cross-Lingual Terminology

| English          | Chinese (ZH) | Russian (RU)              | German (DE)            | French (FR)                | Japanese (JP)          |
| ---------------- | ------------ | ------------------------- | ---------------------- | -------------------------- | ---------------------- |
| Regex search     | 正则搜索     | поиск по регулярному выражению | Regex-Suche         | Recherche par regex        | 正規表現検索           |
| Pattern matching | 模式匹配     | сопоставление шаблонов    | Mustervergleich        | Correspondance de motifs    | パターンマッチング     |
| Full-text search | 全文搜索     | полнотекстовый поиск      | Volltextsuche          | Recherche plein texte       | 全文検索               |
| Highlight        | 高亮         | выделение                 | Hervorhebung           | Surlignage                 | ハイライト             |
| Boolean search   | 布尔搜索     | булев поиск               | Boolesche Suche        | Recherche booléenne         | ブール検索             |

### 9.2 Knowledge Graph Nodes

| Node Type           | Description                  | Relationships                                                   |
| ------------------- | ---------------------------- | --------------------------------------------------------------- |
| `RegexSearch`       | The regex search feature     | `usesIndex`, `supportsSyntax`, `preventsReDoS`                 |
| `SearchPattern`     | A regex pattern              | `matchesDocuments`, `hasComplexity`, `requiresFlags`           |
| `SearchResult`      | A matched document           | `containsMatches`, `hasScore`, `displaysSnippet`               |
| `FieldFilter`       | Metadata field restriction   | `appliesTo`, `constrains`, `enhancesPrecision`                 |

### 9.3 Cross-References

- Search index structure defined in `YP-WEB-TECH-001` Section 4.5
- Pagefind integration aligned with `YP-WEB-TECH-001` Section 5.1
- Security constraints per `YP-WEB-TECH-001` Section 7.5
- Accessibility requirements per `YP-WEB-TECH-001` Section 7.6
- Performance budgets per `domain_constraints_content.toml`

---

## 10. Quality Checklist

### 10.1 Completeness

- [ ] Regex engine evaluation complete with recommendation
- [ ] Pagefind integration strategy specified
- [ ] UI patterns fully designed (search panel, highlighting, navigation)
- [ ] ReDoS prevention strategy documented (analysis, timeout, sanitization)
- [ ] Advanced search syntax grammar defined
- [ ] Query parser algorithm specified
- [ ] Accessibility approach documented

### 10.2 Accuracy

- [ ] ReDoS examples validated against known vulnerability patterns
- [ ] Performance targets based on browser RegExp benchmarks
- [ ] Pagefind integration compatible with Pagefind API
- [ ] Accessibility features aligned with WCAG 2.1 AA
- [ ] All technical claims traceable to documentation

### 10.3 Consistency

- [ ] Performance budgets consistent with `domain_constraints_content.toml`
- [ ] Accessibility constraints consistent with `YP-WEB-TECH-001`
- [ ] Search syntax compatible with existing Pagefind queries
- [ ] Dark mode approach consistent with existing design system

### 10.4 Traceability

- [ ] Engine selection rationale documented
- [ ] ReDoS prevention strategy traceable to OWASP guidelines
- [ ] Search syntax compatible with existing content metadata
- [ ] Test vectors traceable to algorithm specification

### 10.5 Usability

- [ ] Search panel is discoverable (Ctrl+K shortcut documented)
- [ ] Regex syntax highlighting aids pattern authoring
- [ ] Error messages help users fix invalid patterns
- [ ] Match navigation is intuitive
- [ ] Advanced syntax is optional (plain text works)
