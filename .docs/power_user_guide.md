# Wikisites Power User Guide

> **Version:** 2.0.0 | **Last Updated:** 2026-06-19

This guide covers advanced features for power users of Wikipept and Encyclopeptide — the "VS Code for content" experience.

---

## Table of Contents

1. [Command Palette](#1-command-palette)
2. [Keyboard Shortcuts](#2-keyboard-shortcuts)
3. [Outline Panel Navigation](#3-outline-panel-navigation)
4. [Breadcrumb Navigation](#4-breadcrumb-navigation)
5. [Split Pane Usage](#5-split-pane-usage)
6. [Regex Search Syntax](#6-regex-search-syntax)
7. [LaTeX Rendering](#7-latex-rendering)
8. [Graph View Interaction](#8-graph-view-interaction)
9. [Custom Themes](#9-custom-themes)
10. [Settings Export and Import](#10-settings-export-and-import)
11. [Plugin Installation](#11-plugin-installation)

---

## 1. Command Palette

The command palette provides quick access to all features without leaving the keyboard.

### Opening the Command Palette

- **Windows/Linux:** `Ctrl+Shift+P`
- **Mac:** `Cmd+Shift+P`

### What You Can Do

The command palette accepts fuzzy matching. Type partial words to find commands quickly.

| Action | Example Query |
|--------|---------------|
| Navigate to an article | `amino acids` |
| Start a quiz | `quiz` or `daily challenge` |
| Toggle dark mode | `theme` or `dark` |
| Search flashcards | `flashcard` |
| Export settings | `export` |
| Switch language | `language` or `i18n` |

### Tips

- Press `Escape` to close the command palette at any time.
- Use arrow keys to navigate results, `Enter` to select.
- The palette remembers recent commands for quick re-access.

---

## 2. Keyboard Shortcuts

See the [Keyboard Shortcuts Reference](./keyboard_shortcuts_reference.md) for the complete table.

### Essential Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+P` | Open command palette |
| `Ctrl+K` then `Ctrl+C` | Toggle dark/light theme |
| `/` or `Ctrl+K` | Focus search |
| `Escape` | Close panel / cancel action |
| `?` | Show keyboard shortcut help |

### Flashcard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Space` | Flip card |
| `1` | Rate: Again |
| `2` | Rate: Hard |
| `3` | Rate: Good |
| `4` | Rate: Easy |
| `→` | Next card |
| `←` | Previous card |

### Navigation Shortcuts

| Shortcut | Action |
|----------|--------|
| `g` then `h` | Go to home |
| `g` then `l` | Go to learn |
| `g` then `q` | Go to quizzes |
| `g` then `f` | Go to flashcards |

---

## 3. Outline Panel Navigation

The outline panel displays the heading structure of the current article.

### Using the Outline

1. The outline appears in the sidebar on desktop viewports.
2. Click any heading to scroll directly to that section.
3. The active heading is highlighted as you scroll through the article.

### Keyboard Navigation

- `Tab` to cycle through outline items.
- `Enter` to jump to the selected heading.
- The outline updates dynamically for articles with dynamic content (e.g., quizzes).

### Benefits

- Quickly orient yourself in long reference articles.
- Identify article depth at a glance.
- Jump between major sections without scrolling.

---

## 4. Breadcrumb Navigation

Breadcrumbs show your current location in the content hierarchy.

### Reading Breadcrumbs

Breadcrumbs appear below the navigation bar:

```
Home > Learn > Peptide Bond Chemistry > Formation
```

- Click any segment to navigate to that level.
- The current page is always the last (non-linked) item.
- On mobile, breadcrumbs collapse to show only the parent and current page.

---

## 5. Split Pane Usage

Split panes allow you to view multiple articles or tools side by side.

### Opening a Split Pane

1. Right-click any article link and select **Open in Split View**.
2. Or use the command palette: `Split: Open Right`.
3. The screen divides into two vertical panes.

### Navigating Split Panes

| Action | Shortcut |
|--------|----------|
| Focus left pane | `Ctrl+Shift+←` |
| Focus right pane | `Ctrl+Shift+→` |
| Close active pane | `Ctrl+Shift+W` |
| Swap pane content | `Ctrl+Shift+S` |

### Use Cases

- Compare two peptide articles side by side.
- View a reference article while taking a quiz.
- Read the glossary alongside a learn lesson.

---

## 6. Regex Search Syntax

Both Wikipept and Encyclopeptide support regular expression search via Pagefind with enhanced client-side filtering.

### Basic Syntax

| Pattern | Meaning | Example Match |
|---------|---------|---------------|
| `amino` | Literal string | "amino acids" |
| `amino\|peptide` | Either term | "amino" or "peptide" |
| `^gly` | Starts with | "glycine" |
| `acid$` | Ends with | "amino acid" |
| `amino.{0,5}acid` | Wildcard range | "amino acid" (with any chars between) |
| `[A-Z]{3}` | Three uppercase letters | "GLC", "ARG" |

### Search Filters

Combine text search with content type filters:

| Filter | Syntax | Example |
|--------|--------|---------|
| Article title | `title:query` | `title:glycine` |
| Article content | `body:query` | `body:phosphorylation` |
| Quiz questions | `quiz:query` | `quiz:amino acid structure` |
| Flashcards | `flashcard:query` | `flashcard:peptide bond` |

### Tips

- Search is case-insensitive by default.
- Use quotes for exact phrase matching: `"solid-phase synthesis"`.
- Pagefind indexes are built at deploy time; new content is available after the next build.

---

## 7. LaTeX Rendering

LaTeX math expressions are rendered using KaTeX in articles and annotations.

### Inline Math

Wrap expressions in single dollar signs:

```markdown
The molecular weight is $M_r = \sum_{i=1}^{n} m_i - (n-1) \times 18.015$
```

Result: The molecular weight is rendered with the formula inline.

### Block Math

Wrap expressions in double dollar signs for display mode:

```markdown
$$
K_d = \frac{[R][L]}{[RL]}
$$
```

### Common Peptide Formulas

| Formula | LaTeX | Description |
|---------|-------|-------------|
| Peptide bond formation | `R_1\text{-COOH} + R_2\text{-NH}_2 \rightarrow R_1\text{-CO-NH-}R_2 + H_2O` | Condensation reaction |
| Michaelis-Menten | `v = \frac{V_{max}[S]}{K_m + [S]}` | Enzyme kinetics |
| Henderson-Hasselbalch | `pH = pK_a + \log\frac{[A^-]}{[HA]}` | Buffer equation |
| Binding affinity | `\Delta G = -RT \ln K_a` | Free energy of binding |

### Tips

- Use `\text{}` for text labels inside math mode.
- Use `\mathrm{}` for roman-style identifiers.
- KaTeX supports most standard LaTeX commands; see the [KaTeX supported functions list](https://katex.org/docs/supported.html) for details.

---

## 8. Graph View Interaction

The knowledge graph shows relationships between articles, peptides, and concepts.

### Opening the Graph

- Click the **Graph** icon in the article toolbar.
- Or use the command palette: `Graph: Show knowledge graph`.

### Interacting with the Graph

| Action | How |
|--------|-----|
| Pan | Click and drag the background |
| Zoom | Scroll wheel or pinch gesture |
| Select node | Click on a node |
| Navigate to article | Double-click a node |
| Highlight connections | Hover over a node |
| Reset view | Double-click the background |

### Reading the Graph

- **Node size** indicates the number of incoming links (more references = larger node).
- **Node color** indicates content type:
  - Teal: Learn articles
  - Gold: Reference articles
  - Coral: Glossary terms
  - Slate: Quiz/flashcard content
- **Edge thickness** indicates the number of shared references between articles.

---

## 9. Custom Themes

Wikisites supports multiple theme presets and custom theme configuration.

### Built-in Presets

| Preset | Description | Default Site |
|--------|-------------|--------------|
| Light | Clean white background | Wikipept |
| Dark | Navy/slate background | Encyclopeptide |
| High Contrast | Maximum contrast for accessibility | — |
| Solarized Light | Warm, low-blue-light theme | — |
| Solarized Dark | Dark variant of Solarized | — |

### Switching Themes

1. Click the theme toggle in the navigation bar, or
2. Use the command palette: `Theme: Toggle dark/light`, or
3. Use the shortcut: `Ctrl+K` then `Ctrl+C`.

### Custom Theme Variables

Power users can override CSS custom properties via the Settings panel:

```css
--color-bg: #fafafa;
--color-surface: #ffffff;
--color-text: #1a1a1a;
--color-accent: #6366f1;
```

### Applying a Preset Programmatically

```typescript
import { applyPreset, getAvailablePresets } from "@wikisites/shared";

applyPreset("solarized-dark");
console.log(getAvailablePresets()); // ["light", "dark", "high-contrast", "solarized-light", "solarized-dark"]
```

---

## 10. Settings Export and Import

Your settings, flashcard progress, and preferences can be exported and imported across devices.

### Exporting Settings

1. Open the command palette: `Settings: Export`.
2. Choose what to include:
   - Theme preferences
   - Flashcard review history (FSRS state)
   - Quiz scores and mastery levels
   - Language preference
3. A JSON file downloads to your device.

### Importing Settings

1. Open the command palette: `Settings: Import`.
2. Select the previously exported JSON file.
3. Confirm the import — existing data is merged (not overwritten).

### What Is Included in the Export

| Data | Format | Storage |
|------|--------|---------|
| Theme preference | String | localStorage |
| Flashcard FSRS state | JSON array | localStorage |
| Quiz history | JSON object | localStorage |
| Session statistics | JSON object | localStorage |
| Language preference | String | localStorage + cookie |

### Syncing Across Devices

When authenticated, settings sync automatically to D1 via the Settings Sync API. See the [API Reference](./api_reference.md) for details.

---

## 11. Plugin Installation

Wikisites supports a plugin system for extending functionality (P4 tier).

### Installing Plugins

1. Open the command palette: `Plugins: Browse Registry`.
2. Browse available plugins by category.
3. Click **Install** on the desired plugin.
4. The plugin loads on next page refresh.

### Plugin Categories

| Category | Description | Examples |
|----------|-------------|---------|
| Content | Extend article rendering | 3D Molecular Viewer, Sequence Aligner |
| Analysis | Data analysis tools | MW Calculator Plus, Binding Predictor |
| Study | Learning aids | Mnemonic Generator, Quiz Builder |
| Export | Output formats | PDF Export, LaTeX Export, CSV Export |

### Managing Plugins

| Action | How |
|--------|-----|
| List installed | Command palette: `Plugins: List installed` |
| Disable a plugin | Command palette: `Plugins: Disable [name]` |
| Remove a plugin | Command palette: `Plugins: Remove [name]` |
| Update all | Command palette: `Plugins: Update all` |

### Plugin API (for Developers)

Plugins register via the plugin manifest:

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "My custom plugin",
  "entry": "./plugin.js",
  "permissions": ["content:read", "settings:write"]
}
```

Available permission scopes:

| Scope | Grants |
|-------|--------|
| `content:read` | Read article content |
| `content:write` | Modify article rendering |
| `settings:read` | Access user settings |
| `settings:write` | Modify user settings |
| `ui:inject` | Add UI elements |
| `api:call` | Make API requests |

---

## Accessibility

All features in this guide comply with WCAG 2.1 AA:

- All interactive elements have visible focus indicators.
- Color is never the sole means of conveying information.
- All keyboard shortcuts are documented and discoverable via the `?` key.
- Screen readers announce state changes (card flips, panel toggles, navigation).
- Reduced motion preferences are respected for all animations.

---

*Wikisites Power User Guide — Encyclopeptide & Wikipept*
