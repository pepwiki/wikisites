# Yellow Paper: Command Palette

**Document ID:** YP-UI-COMMAND-PALETTE-001  
**Version:** 1.0.0  
**Date:** 2026-06-19  
**Status:** DRAFT  
**Classification:** Internal — Phase 1 Epistemological Discovery  
**Scope:** Power User Shell — Universal Action Launcher

---

## Executive Summary

The Command Palette implements a keyboard-driven universal action launcher following the VS Code `Ctrl+Shift+P` paradigm. It provides fuzzy search over commands, navigation, settings, and content with <50ms perceived latency. The system uses a combobox pattern per WAI-ARIA APG with custom fuzzy matching optimized for static site performance.

**Key Design Decisions:**
- WAI-ARIA Combobox pattern with `aria-activedescendant` focus management
- Fuzzy matching via `fzy` algorithm (O(n) per keystroke)
- SolidJS reactive store for command registry
- Portal-based rendering with focus trap
- Maximum 2000 commands before virtual scrolling required

---

## Nomenclature

| Term | Definition |
|------|-----------|
| **Command** | An executable action with id, label, keywords, and handler function |
| **Palette** | The modal dialog containing the search input and results list |
| **Fuzzy Match** | Scoring algorithm that matches query against items without requiring exact substring |
| **Focus Trap** | Keyboard confinement within modal dialog until dismissed |
| **Combobox** | ARIA pattern combining input with popup listbox |
| **Portal** | DOM element rendered outside component tree (typically `document.body`) |
| **Action** | Higher-level abstraction wrapping command with category and shortcut |
| **Scope** | Context-dependent command filtering (e.g., "page commands" vs "global commands") |

---

## Theoretical Foundation

### 1. Command Pattern (GoF)

The command pattern decouples invoker from receiver. Each command encapsulates:
- `id: string` — unique identifier
- `label: string` — human-readable name
- `keywords: string[]` — aliases for fuzzy matching
- `shortcut?: string` — keyboard shortcut binding
- `handler: () => void | Promise<void>` — execution function
- `icon?: string` — optional icon identifier
- `category?: string` — grouping label

### 2. Fuzzy Matching Algorithms

#### 2.1 Substring Matching — O(n·m)
Simple `String.includes()` check. Fast but poor UX for partial matches.

#### 2.2 Subsequence Matching — O(n·m)
Checks if query characters appear in order within item. No gap requirement.

#### 2.3 Fuzzy Scoring (fzy/fzf) — O(n·m)
Weighted scoring that rewards:
- Consecutive character matches (+10 per consecutive)
- Word boundary matches (+15 for match at word start)
- CamelCase boundary matches (+12 for match after uppercase)
- First character bonus (+5)

**Score formula:**
```
score(item, query) = Σ(match_bonus[i]) + consecutive_bonus + boundary_bonus
```

#### 2.4 Smith-Waterman Local Alignment — O(n·m)
Biological sequence alignment adapted for fuzzy matching. Overkill for <1000 items but excellent for large command sets.

**Recommendation:** Use fzy-style scoring for O(n) per-keystroke performance with excellent UX.

### 3. Accessibility Model

Per WAI-ARIA Combobox Pattern:
- `role="combobox"` on input element
- `aria-controls` pointing to listbox
- `aria-expanded` toggles on open/close
- `aria-activedescendant` for virtual focus in list
- DOM focus stays on input; assistive tech focus moves via `aria-activedescendant`

---

## Algorithm Specification

### Fuzzy Match Implementation

```typescript
interface MatchResult {
  score: number;
  indices: number[]; // matched character positions for highlighting
}

function fuzzyMatch(query: string, item: string): MatchResult | null {
  const queryLower = query.toLowerCase();
  const itemLower = item.toLowerCase();
  
  // Quick rejection: all query chars must exist in item
  let qi = 0;
  for (let ii = 0; ii < itemLower.length && qi < queryLower.length; ii++) {
    if (itemLower[ii] === queryLower[qi]) qi++;
  }
  if (qi < queryLower.length) return null;
  
  // Score computation
  let score = 0;
  let consecutive = 0;
  let lastMatchIndex = -2;
  const indices: number[] = [];
  
  qi = 0;
  for (let ii = 0; ii < itemLower.length && qi < queryLower.length; ii++) {
    if (itemLower[ii] === queryLower[qi]) {
      indices.push(ii);
      
      // Base score
      score += 1;
      
      // Consecutive bonus
      if (ii === lastMatchIndex + 1) {
        consecutive++;
        score += consecutive * 10;
      } else {
        consecutive = 0;
      }
      
      // Word boundary bonus
      if (ii === 0 || item[ii - 1] === ' ' || item[ii - 1] === '-') {
        score += 15;
      }
      
      // CamelCase bonus
      if (ii > 0 && item[ii] === item[ii].toUpperCase()) {
        score += 12;
      }
      
      // First character bonus
      if (qi === 0) score += 5;
      
      lastMatchIndex = ii;
      qi++;
    }
  }
  
  // Penalize long items (prefer shorter matches)
  score -= (item.length - query.length) * 0.5;
  
  return { score, indices };
}
```

### Command Registry Query

```typescript
function queryCommands(
  commands: Command[],
  query: string,
  maxResults = 20
): RankedCommand[] {
  if (!query) return commands.slice(0, maxResults);
  
  const results: RankedCommand[] = [];
  
  for (const cmd of commands) {
    // Check label
    const labelMatch = fuzzyMatch(query, cmd.label);
    // Check keywords
    let bestKeywordMatch: MatchResult | null = null;
    for (const kw of cmd.keywords) {
      const m = fuzzyMatch(query, kw);
      if (m && (!bestKeywordMatch || m.score > bestKeywordMatch.score)) {
        bestKeywordMatch = m;
      }
    }
    
    // Take best match
    const best = [labelMatch, bestKeywordMatch]
      .filter(Boolean)
      .sort((a, b) => b!.score - a!.score)[0];
    
    if (best) {
      results.push({ command: cmd, match: best });
    }
  }
  
  return results
    .sort((a, b) => b.match.score - a.match.score)
    .slice(0, maxResults);
}
```

---

## Complexity Analysis

| Operation | Time | Space | Notes |
|-----------|------|-------|-------|
| Fuzzy match single item | O(n·m) | O(m) | n=item length, m=query length |
| Query all commands | O(n·m) | O(n·k) | n=commands, m=query, k=max results |
| Initial render | O(1) | O(1) | Portal mount + focus trap setup |
| Re-render on keystroke | O(n·m) | O(k) | Only top k results re-rendered |
| Keyboard navigation | O(1) | O(1) | Index update + scroll-into-view |

**Target Metrics:**
- 100 commands: <5ms per keystroke
- 1000 commands: <20ms per keystroke  
- 2000+ commands: virtual scrolling required

---

## Test Vector Specification

### TV-CP-001: Fuzzy Match Scoring
```toml
[[test]]
id = "TV-CP-001"
description = "Fuzzy match produces correct scores"
query = "gth"
items = [
  { item = "Go to Home", should_match = true, min_score = 20 },
  { item = "Generate Thumbnail", should_match = true, min_score = 15 },
  { item = "Settings", should_match = false },
]
```

### TV-CP-002: Keyboard Navigation
```toml
[[test]]
id = "TV-CP-002"
description = "Arrow keys navigate results list"
sequence = ["Ctrl+Shift+P", "g", "ArrowDown", "ArrowDown", "Enter"]
expected_action = "Go to Home"
```

### TV-CP-003: Escape Dismissal
```toml
[[test]]
id = "TV-CP-003"
description = "Escape closes palette without executing"
sequence = ["Ctrl+Shift+P", "search", "Escape"]
expected_action = null
expected_state = "palette_closed"
```

### TV-CP-004: Command Execution
```toml
[[test]]
id = "TV-CP-004"
description = "Enter executes selected command"
sequence = ["Ctrl+Shift+P", "dark", "Enter"]
expected_action = "toggle_theme"
```

---

## Domain Constraints

| Constraint | Value | Rationale |
|------------|-------|-----------|
| Max commands before virtualization | 2000 | Performance threshold for DOM rendering |
| Fuzzy match latency budget | 20ms | 60fps frame budget (16.67ms) with headroom |
| Palette open animation | 150ms | Perceived instant response |
| Max visible results | 20 | Avoids information overload |
| Min match score threshold | 5 | Filters noise from partial matches |
| Focus trap active | true | Accessibility requirement |
| Keyboard-only operable | true | Core power user requirement |
| Screen reader announcements | aria-live polite | Non-intrusive status updates |

---

## Bibliography

| # | Source | URL | Relevance |
|---|--------|-----|-----------|
| 1 | WAI-ARIA Combobox Pattern | https://www.w3.org/WAI/ARIA/apg/patterns/combobox/ | ARIA semantics |
| 2 | cmdk (Paco Coursey) | https://github.com/pacocoursey/cmdk | React implementation reference |
| 3 | kbar (Tim Chang) | https://github.com/timc1/kbar | Action registry pattern |
| 4 | fzf algorithm | https://github.com/junegunn/fzf | Fuzzy matching reference |
| 5 | VS Code Command Palette | https://code.visualstudio.com/docs/getstarted/userinterface#command-palette | UX paradigm reference |
| 6 | SolidJS Dialog | https://docs.solidjs.com/reference/components/dialog | Component reference |
| 7 | Kobalte Combobox | https://kobalte.dev/docs/components/combobox | SolidJS accessible combobox |
| 8 | Core Web Vitals | https://web.dev/vitals/ | Performance budget reference |

---

## Quality Checklist

- [ ] All commands keyboard-accessible
- [ ] ARIA roles and properties correct
- [ ] Focus trap implemented and tested
- [ ] Fuzzy match scoring validated against test vectors
- [ ] Performance meets latency budget (<20ms)
- [ ] Screen reader testing completed
- [ ] Escape dismissal works in all contexts
- [ ] Command registry supports dynamic registration
