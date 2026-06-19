# Theme Customization

## Available Themes

| Name | Label | Type |
|------|-------|------|
| `default-light` | Default Light | Light |
| `default-dark` | Default Dark | Dark |
| `high-contrast` | High Contrast | Dark |
| `solarized-light` | Solarized Light | Light |
| `solarized-dark` | Solarized Dark | Dark |
| `dracula` | Dracula | Dark |
| `nord` | Nord | Dark |
| `catppuccin` | Catppuccin | Dark |

Themes are applied via the `data-theme` attribute on `<html>`.

## CSS Custom Properties

Themes define these tokens, set on `:root` by the theme engine:

### Colors

| Property | Description |
|----------|-------------|
| `--theme-bg` | Page background |
| `--theme-surface` | Card/panel background |
| `--theme-surface-elevated` | Elevated surfaces (modals, dropdowns) |
| `--theme-text` | Primary text |
| `--theme-text-muted` | Secondary/muted text |
| `--theme-border` | Border color |
| `--theme-accent` | Accent/brand color |
| `--theme-link` | Link text color |
| `--theme-code-bg` | Inline code background |
| `--theme-code-text` | Inline code text |
| `--theme-success` | Success states |
| `--theme-warning` | Warning states |
| `--theme-error` | Error states |

### Typography

| Property | Description |
|----------|-------------|
| `--font-body` | Body text font stack |
| `--font-heading` | Heading font stack |
| `--font-mono` | Monospace font stack |

### Spacing

| Property | Description |
|----------|-------------|
| `--spacing-unit` | Base spacing unit |
| `--spacing-radius` | Border radius |

## Creating a Custom Theme

### 1. Define the Theme Object

```typescript
import type { ThemeDefinition } from "../styles/themes/theme-type.js";

export const myTheme: ThemeDefinition = {
  name: "my-theme",
  label: "My Custom Theme",
  colors: {
    bg: "#ffffff",
    surface: "#f8fafc",
    surfaceElevated: "#f1f5f9",
    text: "#0f172a",
    textMuted: "#64748b",
    border: "#e2e8f0",
    accent: "#8b5cf6",
    link: "#7c3aed",
    codeBg: "#f1f5f9",
    codeText: "#334155",
    success: "#22c55e",
    warning: "#f59e0b",
    error: "#ef4444",
  },
  fonts: {
    body: "'Inter', system-ui, sans-serif",
    heading: "'Plus Jakarta Sans', system-ui, sans-serif",
    mono: "'Fira Code', monospace",
  },
  spacing: {
    unit: "4px",
    radius: "8px",
  },
};
```

### 2. Register the Theme

Add to `src/styles/themes/index.ts`:

```typescript
export { myTheme } from "./my-theme.js";
```

### 3. Register with Theme Engine

```typescript
import { registerThemes } from "./lib/theme-engine.js";
import { myTheme } from "./styles/themes/index.js";

registerThemes([myTheme]);
```

## Import/Export

### Export a Theme

```typescript
import { exportTheme } from "./lib/theme-engine.js";

const json = exportTheme("my-theme");
// Download or share the JSON string
```

### Import a Theme

```typescript
import { importTheme } from "./lib/theme-engine.js";

try {
  const theme = importTheme(themeJsonString);
  console.log(`Imported: ${theme.name}`);
} catch (err) {
  console.error("Invalid theme:", err.message);
}
```

Imported themes are:
- Validated against `ThemeDefinitionSchema`
- Stored in `localStorage` under `wikisites:theme-engine:custom`
- Immediately available in the theme picker

### Theme JSON Format

```json
{
  "name": "my-theme",
  "label": "My Theme",
  "colors": {
    "bg": "#ffffff",
    "surface": "#f8fafc",
    "surfaceElevated": "#f1f5f9",
    "text": "#0f172a",
    "textMuted": "#64748b",
    "border": "#e2e8f0",
    "accent": "#8b5cf6",
    "link": "#7c3aed",
    "codeBg": "#f1f5f9",
    "codeText": "#334155",
    "success": "#22c55e",
    "warning": "#f59e0b",
    "error": "#ef4444"
  },
  "fonts": {
    "body": "'Inter', system-ui, sans-serif",
    "heading": "'Plus Jakarta Sans', system-ui, sans-serif",
    "mono": "'Fira Code', monospace"
  },
  "spacing": {
    "unit": "4px",
    "radius": "8px"
  }
}
```

## System Preference

The theme engine detects `prefers-color-scheme` and applies the corresponding theme when the user's preference is set to "system":

- **Light preference** → `default-light`
- **Dark preference** → `default-dark`

Override with `setActiveTheme(name)` or through the UI theme picker.
