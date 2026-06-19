# Yellow Paper: Keyboard Shortcut System

**Document ID:** YP-UI-KEYBOARD-SHORTCUTS-001  
**Version:** 1.0.0  
**Date:** 2026-06-19  
**Status:** DRAFT  
**Classification:** Internal — Phase 1 Epistemological Discovery  
**Scope:** Power User Shell — Full Keyboard Navigation

---

## Executive Summary

The keyboard shortcut system enables mouse-free navigation and actions across the entire site. It implements a remappable keybinding registry with conflict detection, modal/modeless shortcut layers, and accessible shortcut hints via ARIA live regions.

**Key Design Decisions:**
- Declarative keybinding registry with priority-based conflict resolution
- Modal shortcuts (insert mode vs normal mode) for power users
- Platform-aware modifier keys (Ctrl on Windows/Linux, Cmd on macOS)
- Persistent user preferences via localStorage
- ARIA live region for shortcut discovery

---

## Nomenclature

| Term | Definition |
|------|-----------|
| **Keybinding** | Mapping of keyboard combination to action |
| **Modifier** | Ctrl, Shift, Alt, or Meta (Cmd) key |
| **Chord** | Multi-key sequence (e.g., Ctrl+K, Ctrl+C) |
| **Scope** | Context where shortcuts are active (global, page, modal) |
| **Layer** | Modal state (e.g., "navigation mode" vs "editing mode") |
| **Conflict** | Two bindings mapped to same key combination in same scope |
| **Precedence** | Rule for resolving conflicts (most specific scope wins) |
| **Passthrough** | Allowing browser/OS shortcuts to function normally |

---

## Theoretical Foundation

### 1. Keybinding Registry Design

```typescript
interface Keybinding {
  id: string;
  keys: string;           // e.g., "Ctrl+Shift+P"
  action: string;         // action identifier
  scope: Scope;           // "global" | "page" | "component"
  description: string;    // human-readable for shortcut hints
  priority: number;       // higher = wins on conflict
  enabled: boolean;       // allows disabling without removing
  category: string;       // for grouped display in settings
}

type Scope = "global" | "page" | "component";

interface ShortcutAction {
  id: string;
  handler: () => void | Promise<void>;
  requiresModal?: boolean;  // only active in certain modes
  preventDefault?: boolean; // prevent browser default
  stopPropagation?: boolean;
}
```

### 2. Conflict Resolution Algorithm

1. **Scope Precedence:** component > page > global
2. **Priority Precedence:** higher priority number wins
3. **Recency Precedence:** most recently registered wins (if same priority)
4. **Platform Override:** user customizations override defaults

```typescript
function resolveConflicts(bindings: Keybinding[]): Map<string, Keybinding> {
  const byKey = new Map<string, Keybinding[]>();
  
  for (const b of bindings) {
    if (!b.enabled) continue;
    const normalized = normalizeKey(b.keys);
    const existing = byKey.get(normalized) || [];
    existing.push(b);
    byKey.set(normalized, existing);
  }
  
  const resolved = new Map<string, Keybinding>();
  for (const [key, candidates] of byKey) {
    candidates.sort((a, b) => {
      // Scope: component > page > global
      const scopeOrder = { component: 3, page: 2, global: 1 };
      const scopeDiff = scopeOrder[b.scope] - scopeOrder[a.scope];
      if (scopeDiff !== 0) return scopeDiff;
      // Priority
      return b.priority - a.priority;
    });
    resolved.set(key, candidates[0]);
  }
  
  return resolved;
}
```

### 3. Modal vs Modeless Shortcuts

**Modeless (Default):**
- Always active regardless of input focus
- Examples: Ctrl+Shift+P (palette), / (search focus)

**Modal (Power User):**
- Vim-like modes: Normal, Insert, Visual
- `Esc` returns to Normal mode
- Mode indicator visible in UI
- Mode-specific shortcuts only active in that mode

### 4. Platform Detection

```typescript
function getModifierKey(): string {
  return navigator.platform.includes('Mac') ? '⌘' : 'Ctrl';
}

function normalizeKey(event: KeyboardEvent): string {
  const parts: string[] = [];
  if (event.ctrlKey) parts.push('Ctrl');
  if (event.shiftKey) parts.push('Shift');
  if (event.altKey) parts.push('Alt');
  if (event.metaKey) parts.push('Meta');
  
  // Map event.key to canonical form
  const key = mapKey(event.key);
  if (!MODIFIERS.includes(key)) parts.push(key);
  
  return parts.join('+');
}
```

---

## Algorithm Specification

### Keypress Handler

```typescript
function createKeyHandler(registry: ShortcutRegistry) {
  const chordBuffer: string[] = [];
  let chordTimeout: number | null = null;
  
  return (event: KeyboardEvent) => {
    const key = normalizeKey(event);
    chordBuffer.push(key);
    
    // Clear previous chord timeout
    if (chordTimeout) clearTimeout(chordTimeout);
    
    // Check for exact match
    const chord = chordBuffer.join(' ');
    const binding = registry.resolve(chord, getCurrentScope());
    
    if (binding) {
      event.preventDefault();
      event.stopPropagation();
      binding.action.handler();
      chordBuffer.length = 0;
      return;
    }
    
    // Check for prefix match (possible chord in progress)
    const hasPrefix = registry.hasPrefix(chord, getCurrentScope());
    
    if (hasPrefix) {
      // Wait for next key (chord timeout)
      chordTimeout = window.setTimeout(() => {
        chordBuffer.length = 0;
      }, 1000); // 1 second chord timeout
    } else {
      // No match, clear buffer
      chordBuffer.length = 0;
    }
  };
}
```

---

## Accessibility Patterns

### ARIA Live Region for Shortcut Hints

```html
<div 
  aria-live="polite" 
  aria-atomic="true"
  class="sr-only"
  id="shortcut-announcer"
>
  <!-- Dynamically updated with shortcut hints -->
</div>
```

**Announcements:**
- On palette open: "Command palette opened. Type to search commands."
- On mode change: "Navigation mode active. Press i for insert mode."
- On shortcut conflict: "Shortcut Ctrl+K conflicts with existing binding."
- On help: "Press ? for keyboard shortcuts reference."

### Keyboard Navigation Requirements

- All interactive elements must be reachable via Tab
- Skip links for main content
- Focus indicator visible (WCAG 2.4.7)
- No keyboard traps (except modal focus trap)

---

## Conflict Resolution with OS/Browser Shortcuts

### Reserved Shortcuts (Never Override)

| Platform | Shortcuts | Reason |
|----------|-----------|--------|
| All | Ctrl+C, Ctrl+V, Ctrl+X | Clipboard |
| All | Ctrl+Z, Ctrl+Y | Undo/Redo |
| All | Ctrl+A | Select All |
| All | Ctrl+S | Save (prevent browser save) |
| macOS | Cmd+Q, Cmd+W | App close |
| Windows | Alt+F4 | App close |
| All | F5, Ctrl+R | Refresh |
| All | Ctrl+L | Address bar |
| All | F11 | Fullscreen |

### Configurable Passthrough

Users can configure which browser shortcuts should pass through:
```typescript
interface PassthroughConfig {
  allowBrowserShortcuts: boolean;  // default: false
  reserved: string[];              // never override
  custom: string[];                // user-added reservations
}
```

---

## SolidJS State Management

```typescript
// Shortcut store using SolidJS signals
import { createStore } from "solid-js/store";

interface ShortcutState {
  bindings: Keybinding[];
  mode: "normal" | "insert" | "visual";
  isPaused: boolean;
  conflicts: ConflictReport[];
}

const [state, setState] = createStore<ShortcutState>({
  bindings: defaultBindings,
  mode: "normal",
  isPaused: false,
  conflicts: []
});

// Derived: active bindings for current mode
function activeBindings() {
  return state.bindings.filter(b => {
    if (b.requiresModal && state.mode !== "insert") return false;
    if (!b.enabled) return false;
    return true;
  });
}

// Action: register new binding with conflict check
function registerBinding(binding: Keybinding) {
  const allBindings = [...state.bindings, binding];
  const report = detectConflicts(allBindings);
  
  if (report.hasBlockingConflicts) {
    setState("conflicts", report.conflicts);
    return { success: false, conflicts: report.conflicts };
  }
  
  setState("bindings", allBindings);
  persistBindings(state.bindings);
  return { success: true };
}
```

---

## Test Vector Specification

### TV-KS-001: Global Shortcut Activation
```toml
[[test]]
id = "TV-KS-001"
description = "Ctrl+Shift+P opens command palette"
platform = "linux"
sequence = ["Control+Shift+P"]
expected = { action = "open_palette", mode = "global" }
```

### TV-KS-002: Scope-Based Resolution
```toml
[[test]]
id = "TV-KS-002"
description = "Page shortcut overrides global"
bindings = [
  { keys = "Ctrl+K", action = "global_action", scope = "global" },
  { keys = "Ctrl+K", action = "page_action", scope = "page" }
]
expected_winner = "page_action"
```

### TV-KS-003: Chord Sequences
```toml
[[test]]
id = "TV-KS-003"
description = "Multi-key chord sequence"
sequence = ["Control+K", "Control+C"]
timeout_ms = 1000
expected = { action = "chord_action" }
```

### TV-KS-004: Conflict Detection
```toml
[[test]]
id = "TV-KS-004"
description = "Conflicting bindings detected"
bindings = [
  { keys = "Ctrl+K", action = "action_a", scope = "global", priority = 1 },
  { keys = "Ctrl+K", action = "action_b", scope = "global", priority = 2 }
]
expected = { conflict_detected = true, winner = "action_b" }
```

---

## Domain Constraints

| Constraint | Value | Rationale |
|------------|-------|-----------|
| Chord timeout | 1000ms | Allows multi-key sequences without confusion |
| Max chord depth | 3 | Prevents overly complex sequences |
| Conflict detection latency | <5ms | Real-time validation |
| Preference persistence | localStorage | No server round-trip |
| Screen reader support | aria-live polite | Non-intrusive announcements |
| Custom binding limit | 100 | Prevents memory bloat |
| Default bindings | 25-40 | Covers all core actions |

---

## Bibliography

| # | Source | URL | Relevance |
|---|--------|-----|-----------|
| 1 | WAI-ARIA Keyboard Patterns | https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/ | Accessibility patterns |
| 2 | VS Code Keybindings | https://code.visualstudio.com/docs/getstarted/keybindings | UX reference |
| 3 | Vim Modal Editing | https://vimdoc.sourceforge.net/ | Modal interaction model |
| 4 | hotkeys.js | https://github.com/jaywcjlove/hotkeys | JavaScript key handling |
| 5 | SolidJS Store | https://docs.solidjs.com/reference/stores/create-store | State management |
| 6 | Kobalte | https://kobalte.dev/ | SolidJS accessible components |
| 7 | Web Keyboard Shortcuts | https://web.dev/keyboard-shortcuts/ | Best practices |

---

## Quality Checklist

- [ ] All core actions have keyboard shortcuts
- [ ] Conflict detection works correctly
- [ ] Platform-specific modifier keys handled
- [ ] Chord sequences functional
- [ ] ARIA live region announces changes
- [ ] User preferences persist correctly
- [ ] Reserved browser shortcuts not overridden
- [ ] Modal/modeless layers work correctly
