---
document_id: BP-EXTENSIBILITY-001
title: "Extensibility Layer"
version: "1.0.0"
date: "2026-06-19"
status: DRAFT
authors:
  - name: "Wikisites Architecture Team"
    role: "Primary Authors"
classification: "Internal — Phase 2 Architectural Specification"
ieee_standard: "IEEE 1016-2024"
applicable_sites:
  - ENCP
  - WIKI
abstract: >-
  IEEE 1016 compliant architectural specification for the extensibility layer
  encompassing plugin API, theme engine, and settings manager. Covers Web Worker
  sandboxed plugin execution, capability-based permissions, CSS custom properties
  theme system, theme marketplace data model, JSON Schema + Zod settings validation,
  and import/export flow with conflict resolution.
yellow_paper_refs:
  - "YP-EXT-PLUGIN-API-001"
  - "YP-EXT-THEMES-001"
  - "YP-EXT-SETTINGS-001"
---

# Blue Paper: Extensibility Layer

**Document ID:** BP-EXTENSIBILITY-001
**Version:** 1.0.0
**Date:** 2026-06-19
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

The Extensibility Layer provides the plugin, theme, and settings infrastructure for both encyclopeptide.com and wikipept.com. It enables third-party developers to extend functionality via sandboxed Web Worker plugins, allows users to customize appearance through a CSS custom properties theme system with marketplace support, and manages user preferences with JSON Schema validation, import/export, and conflict resolution. The layer is split across `packages/shared` (schemas, types, theme engine), `packages/wiki` and `packages/encp` (plugin/theme UI), and `packages/workers` (plugin registry API).

### 1.2 System Scope

1. **PluginAPI**: Web Worker sandboxed plugin execution, lifecycle hooks (onLoad, onNavigate, onEdit, onRender), capability-based permissions, SolidJS component injection, and plugin marketplace (discovery, installation, versioning)
2. **ThemeEngine**: CSS custom properties architecture, theme inheritance (base → user → plugin), dark/light mode system, theme marketplace data model, and performance (critical CSS, lazy loading)
3. **SettingsManager**: JSON Schema + Zod dual validation, import/export (file, clipboard, URL), conflict resolution (merge vs overwrite), version compatibility (migration), and storage (localStorage → D1 sync)

### 1.3 Context Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                       EXTENSIBILITY LAYER                             │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │ PluginAPI         │  │ ThemeEngine       │  │ SettingsManager  │  │
│  │                   │  │                   │  │                  │  │
│  │ ┌───────────────┐ │  │ ┌───────────────┐ │  │ ┌──────────────┐│  │
│  │ │ Plugin        │ │  │ │ CSS Custom    │ │  │ │ JSON Schema  ││  │
│  │ │ Registry      │ │  │ │ Properties    │ │  │ │ Validator    ││  │
│  │ └───────────────┘ │  │ └───────────────┘ │  │ └──────────────┘│  │
│  │ ┌───────────────┐ │  │ ┌───────────────┐ │  │ ┌──────────────┐│  │
│  │ │ Web Worker    │ │  │ │ Theme         │ │  │ │ Import/      ││  │
│  │ │ Sandbox       │ │  │ │ Inheritance   │ │  │ │ Export       ││  │
│  │ └───────────────┘ │  │ └───────────────┘ │  │ └──────────────┘│  │
│  │ ┌───────────────┐ │  │ ┌───────────────┐ │  │ ┌──────────────┐│  │
│  │ │ Capability    │ │  │ │ Dark/Light    │ │  │ │ Conflict     ││  │
│  │ │ Permissions   │ │  │ │ Mode          │ │  │ │ Resolver     ││  │
│  │ └───────────────┘ │  │ └───────────────┘ │  │ └──────────────┘│  │
│  │ ┌───────────────┐ │  │ ┌───────────────┐ │  │ ┌──────────────┐│  │
│  │ │ Lifecycle     │ │  │ │ Theme         │ │  │ │ Version      ││  │
│  │ │ Hooks         │ │  │ │ Marketplace   │ │  │ │ Migration    ││  │
│  │ └───────────────┘ │  │ └───────────────┘ │  │ └──────────────┘│  │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
         │                        │                        │
         ▼                        ▼                        ▼
   ┌──────────┐            ┌──────────┐            ┌──────────┐
   │ Web      │            │ CSS      │            │ localStorage│
   │ Worker   │            │ Runtime  │            │ + D1      │
   │ API      │            │          │            │           │
   └──────────┘            └──────────┘            └──────────┘
```

---

## BP-2: Design Decomposition

### 2.1 Component Hierarchy

```
packages/shared/src/extensibility/
├── plugin/
│   ├── pluginRegistry.ts          (Plugin discovery, installation, versioning)
│   ├── pluginSandbox.ts           (Web Worker execution environment)
│   ├── capabilityMatrix.ts        (Permission definitions and checks)
│   ├── lifecycleHooks.ts          (Hook registration and dispatch)
│   └── pluginSchemas.ts           (Zod schemas for plugin manifests)
├── theme/
│   ├── themeEngine.ts             (CSS custom properties management)
│   ├── themeInheritance.ts        (Base → user → plugin theme cascade)
│   ├── darkLightMode.ts           (System preference detection, toggle)
│   ├── themeRegistry.ts           (Theme marketplace data model)
│   └── themeSchemas.ts            (Zod schemas for theme definitions)
├── settings/
│   ├── settingsSchema.ts          (JSON Schema + Zod settings definition)
│   ├── settingsValidator.ts       (Dual validation: JSON Schema + Zod)
│   ├── settingsImporter.ts        (Import from file, clipboard, URL)
│   ├── settingsExporter.ts        (Export to file, clipboard)
│   ├── conflictResolver.ts        (Merge vs overwrite strategies)
│   ├── versionMigrator.ts         (Schema version migration)
│   └── settingsStorage.ts         (localStorage + D1 sync)
└── extensibilityTypes.ts          (Shared TypeScript type definitions)

packages/wiki/src/components/extensibility/
├── PluginManager.tsx              (Plugin install/uninstall UI)
├── ThemePicker.tsx                (Theme selection gallery)
├── ThemeCustomizer.tsx            (Live theme preview and editing)
├── SettingsPanel.tsx              (User settings interface)
└── SettingsImportExport.tsx       (Import/export UI)

packages/workers/src/routes/extensibility/
├── plugins.ts                     (REST: /api/plugins/*)
├── themes.ts                      (REST: /api/themes/*)
└── settings-sync.ts               (REST: /api/settings/*)
```

### 2.2 Component Descriptions

| Component | Module | Responsibility | Dependencies |
|-----------|--------|----------------|--------------|
| PluginRegistry | plugin/ | Discover, install, version plugins | R2 (plugin bundles) |
| PluginSandbox | plugin/ | Execute plugins in Web Worker sandbox | Web Workers API |
| CapabilityMatrix | plugin/ | Define and enforce plugin permissions | None (pure logic) |
| LifecycleHooks | plugin/ | Register and dispatch lifecycle events | None (event emitter) |
| ThemeEngine | theme/ | Apply CSS custom properties to document | CSS DOM API |
| ThemeInheritance | theme/ | Cascade theme layers (base → user → plugin) | ThemeEngine |
| DarkLightMode | theme/ | Detect system preference, manage toggle | matchMedia API |
| ThemeRegistry | theme/ | Theme marketplace metadata | R2 (theme bundles) |
| SettingsValidator | settings/ | Dual JSON Schema + Zod validation | Zod, Ajv |
| SettingsImporter | settings/ | Parse and validate imported settings | SettingsValidator |
| ConflictResolver | settings/ | Merge or overwrite conflicting settings | None (pure logic) |
| VersionMigrator | settings/ | Migrate settings between schema versions | None (migration fns) |

---

## BP-3: Design Rationale

### 3.1 Web Worker Sandbox vs iframe

| Criterion | iframe | Web Worker | Decision |
|-----------|--------|------------|----------|
| DOM access | Yes | No | iframe — but Worker is safer |
| CPU isolation | Process | Thread | Worker — lighter weight |
| Communication | postMessage | postMessage | Same |
| CSP enforcement | Full | Full | Same |
| Memory limit | Per-process | Per-origin | Worker — simpler |
| SolidJS integration | Manual bridge | Message protocol | Worker — cleaner API |

**Decision**: Web Worker sandbox for plugin execution. No DOM access prevents UI manipulation attacks. Communication via structured `postMessage` protocol. SolidJS UI components rendered via dedicated plugin portal components that receive data from Worker.

### 3.2 CSS Custom Properties vs CSS-in-JS

| Criterion | CSS-in-JS (styled-components) | CSS Custom Properties | Decision |
|-----------|------------------------------|----------------------|----------|
| SSR compatibility | Runtime injection | Native | Custom Properties |
| Performance | Runtime overhead | Zero overhead | Custom Properties |
| Tailwind 4.x integration | Conflicts | Native | Custom Properties |
| Theme switching | Re-render | CSS variable swap | Custom Properties |
| Critical CSS | Difficult | Native | Custom Properties |

**Decision**: CSS custom properties for theming. Zero runtime overhead, native SSR compatibility, aligns with Tailwind CSS 4.x architecture. Theme switching is a CSS variable swap — no re-render required.

### 3.3 JSON Schema + Zod Dual Validation

| Criterion | JSON Schema only | Zod only | Dual | Decision |
|-----------|-----------------|----------|------|----------|
| Runtime validation | Via Ajv | Native TS | Both | Dual |
| Compile-time types | Manual | Inferred | Zod | Dual |
| Import/export schema | Yes (JSON) | No (TS only) | JSON Schema | Dual |
| Migration support | Manual | Manual | JSON Schema | Dual |
| Ecosystem | Broad | TS-focused | Both | Dual |

**Decision**: JSON Schema as the canonical portable format for import/export. Zod as the runtime validation and TypeScript type inference layer. Both schemas are generated from a single source of truth.

### 3.4 Merge vs Overwrite for Settings Import

| Criterion | Overwrite | Deep Merge | User Choice | Decision |
|-----------|-----------|------------|-------------|----------|
| Simplicity | High | Medium | Medium | — |
| Data loss risk | High | Low | Low | — |
| User control | None | None | High | — |
| Conflict detection | None | Required | Required | — |

**Decision**: Default to deep merge with conflict detection. When conflicts exist, present user with side-by-side comparison and per-field resolution choice. Overwrite mode available as explicit option.

---

## BP-4: Traceability

| Requirement ID | Component | Verification |
|----------------|-----------|--------------|
| FR-058 | PluginAPI.PluginRegistry | Install plugin, verify manifest validation |
| FR-059 | PluginAPI.PluginSandbox | Plugin crash doesn't affect host (isolation test) |
| FR-060 | PluginAPI.CapabilityMatrix | Plugin denied permission → action blocked |
| FR-061 | PluginAPI.LifecycleHooks | Plugin.onNavigate fires on route change |
| FR-062 | ThemeEngine | Apply theme, verify CSS variables updated |
| FR-063 | ThemeEngine.ThemeInheritance | Plugin theme overrides base theme |
| FR-064 | ThemeEngine.DarkLightMode | System preference change → theme toggle |
| FR-065 | ThemeEngine.ThemeRegistry | List themes, verify marketplace metadata |
| FR-066 | SettingsManager.SettingsValidator | Invalid settings → validation error |
| FR-067 | SettingsManager.SettingsImporter | Import valid file → settings applied |
| FR-068 | SettingsManager.ConflictResolver | Merge conflicting settings → per-field resolution |
| FR-069 | SettingsManager.VersionMigrator | Migrate v1 settings → v2 format |
| FR-070 | SettingsManager.SettingsStorage | Settings persist across sessions |

---

## BP-5: Interface Design

### 5.1 IF-PLUGIN-001: Plugin Interface

```typescript
interface PluginManifest {
  id: string;                       // Unique plugin ID (npm-style)
  name: string;                     // Display name
  version: string;                  // Semver
  description: string;
  author: string;
  license: string;
  homepage?: string;
  capabilities: PluginCapability[];
  hooks: PluginHook[];
  entryPoint: string;               // JS file path in plugin bundle
  dependencies?: string[];          // Other plugin IDs
  minAppVersion?: string;           // Minimum host version
}

type PluginCapability =
  | "read:pages"
  | "write:pages"
  | "read:annotations"
  | "write:annotations"
  | "read:comments"
  | "write:comments"
  | "read:user-profile"
  | "write:user-profile"
  | "ui:inject"
  | "ui:sidebar"
  | "ui:modal"
  | "theme:override"
  | "settings:read"
  | "settings:write"
  | "analytics:read"
  | "network:fetch";

type PluginHook =
  | "onLoad"
  | "onUnload"
  | "onNavigate"
  | "onEdit"
  | "onRender"
  | "onSave"
  | "onCommentCreate"
  | "onAnnotationCreate"
  | "onThemeChange";

interface PluginAPI {
  // Lifecycle
  onLoad(callback: () => void | Promise<void>): void;
  onUnload(callback: () => void): void;
  onNavigate(callback: (route: string) => void): void;
  onEdit(callback: (doc: EditorDocument) => void): void;

  // Data access (capability-gated)
  pages: {
    get(id: string): Promise<PluginPage>;
    list(opts: PluginListOpts): Promise<PluginPageList>;
  };
  annotations: {
    list(pageId: string): Promise<PluginAnnotation[]>;
    create(req: PluginCreateAnnotation): Promise<PluginAnnotation>;
  };
  comments: {
    list(pageId: string): Promise<PluginComment[]>;
    create(req: PluginCreateComment): Promise<PluginComment>;
  };

  // UI injection (capability-gated)
  ui: {
    injectSidebar(component: string, props?: Record<string, unknown>): void;
    injectModal(component: string, props?: Record<string, unknown>): void;
    injectToolbar(component: string, props?: Record<string, unknown>): void;
  };

  // Settings access (capability-gated)
  settings: {
    get(pluginId: string): Record<string, unknown>;
    set(pluginId: string, settings: Record<string, unknown>): void;
    getSchema(pluginId: string): JSONSchema;
  };

  // Storage
  storage: {
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
    delete(key: string): Promise<void>;
  };
}

interface PluginInstalled {
  manifest: PluginManifest;
  installedAt: string;
  enabled: boolean;
  settings: Record<string, unknown>;
  lastUsed?: string;
}

interface PluginListRequest {
  query?: string;
  category?: string;
  sort?: "popular" | "recent" | "name";
  limit?: number;
  offset?: number;
}

interface PluginListResponse {
  plugins: PluginManifest[];
  total: number;
  hasMore: boolean;
}

interface PluginInstallRequest {
  pluginId: string;
  version?: string;                 // Default: latest
}

interface PluginInstallResponse {
  success: boolean;
  plugin: PluginInstalled;
  warnings?: string[];
}
```

### 5.2 IF-THEME-001: Theme Interface

```typescript
interface ThemeDefinition {
  id: string;                       // Unique theme ID
  name: string;                     // Display name
  version: string;                  // Semver
  description: string;
  author: string;
  preview: ThemePreview;            // Preview images
  tokens: ThemeTokens;             // CSS custom property values
  darkTokens?: ThemeTokens;        // Dark mode overrides
  meta: ThemeMeta;
}

interface ThemePreview {
  thumbnail: string;                // URL to 300x200 thumbnail
  screenshot: string;               // URL to full screenshot
  colors: string[];                 // Primary palette (5 colors)
}

interface ThemeTokens {
  // Colors
  "color-primary": string;          // Hex color
  "color-primary-hover": string;
  "color-secondary": string;
  "color-background": string;
  "color-surface": string;
  "color-text": string;
  "color-text-muted": string;
  "color-border": string;
  "color-accent": string;
  "color-success": string;
  "color-warning": string;
  "color-error": string;

  // Typography
  "font-sans": string;              // Font family stack
  "font-serif": string;
  "font-mono": string;
  "font-size-xs": string;           // CSS length
  "font-size-sm": string;
  "font-size-base": string;
  "font-size-lg": string;
  "font-size-xl": string;
  "font-size-2xl": string;
  "line-height-tight": string;
  "line-height-normal": string;
  "line-height-relaxed": string;

  // Spacing
  "space-unit": string;             // Base spacing unit
  "radius-sm": string;
  "radius-md": string;
  "radius-lg": string;

  // Layout
  "content-width": string;
  "sidebar-width": string;
  "header-height": string;
}

interface ThemeMeta {
  tags: string[];
  createdAt: string;
  updatedAt: string;
  downloads: number;
  rating: number;                   // 0–5
  verified: boolean;                // Marketplace verified
}

interface ThemeApplyRequest {
  themeId: string;
  mode?: "light" | "dark" | "system";
}

interface ThemeCustomizeRequest {
  themeId: string;
  overrides: Partial<ThemeTokens>;
}

interface ThemeListRequest {
  query?: string;
  tags?: string[];
  sort?: "popular" | "recent" | "rating" | "name";
  limit?: number;
  offset?: number;
}

interface ThemeListResponse {
  themes: ThemeDefinition[];
  total: number;
  hasMore: boolean;
  installed: string[];              // IDs of installed themes
}

interface ThemeInstallRequest {
  themeId: string;
}

interface ThemeInstallResponse {
  success: boolean;
  theme: ThemeDefinition;
}
```

### 5.3 IF-SETTINGS-001: Settings Interface

```typescript
interface SettingsSchema {
  $schema: string;                  // JSON Schema meta-schema URL
  $id: string;                      // Schema identifier
  title: string;
  version: string;                  // Schema version
  type: "object";
  properties: Record<string, SettingsProperty>;
  required: string[];
  additionalProperties: false;
}

interface SettingsProperty {
  type: string;
  title?: string;
  description?: string;
  default?: unknown;
  enum?: unknown[];
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  properties?: Record<string, SettingsProperty>;  // Nested objects
  items?: SettingsProperty;         // Array items
}

interface UserSettings {
  version: string;                  // Schema version
  updatedAt: string;
  theme: {
    activeTheme: string;
    mode: "light" | "dark" | "system";
    customTokens?: Partial<ThemeTokens>;
  };
  editor: {
    fontSize: number;               // 12–24
    fontFamily: string;
    lineNumbers: boolean;
    wordWrap: boolean;
    tabSize: number;                // 2 or 4
    autoSave: boolean;
    autoSaveDelay: number;          // milliseconds
    previewPosition: "right" | "bottom" | "hidden";
  };
  comments: {
    showByDefault: boolean;
    sortBy: "newest" | "oldest" | "most_reactions";
    emailOnReply: boolean;
  };
  annotations: {
    showByDefault: boolean;
    highlightColor: string;
    emailOnReply: boolean;
  };
  notifications: {
    email: boolean;
    browser: boolean;
    digestFrequency: "daily" | "weekly" | "never";
  };
  plugins: Record<string, Record<string, unknown>>; // Per-plugin settings
}

interface SettingsExport {
  version: string;
  exportedAt: string;
  source: "encp" | "wiki";
  settings: UserSettings;
  installedPlugins: PluginInstalled[];
  installedThemes: string[];
  checksum: string;                 // SHA-256 of settings JSON
}

interface ImportSettingsRequest {
  data: string;                     // JSON string or file content
  format: "json" | "file";
  strategy: "merge" | "overwrite" | "prompt";
}

interface ImportSettingsResponse {
  success: boolean;
  imported: UserSettings;
  conflicts: SettingsConflict[];
  warnings: string[];
  requiresMigration: boolean;
  fromVersion: string;
  toVersion: string;
}

interface SettingsConflict {
  path: string;                     // e.g. "theme.mode"
  local: unknown;
  remote: unknown;
  resolution?: "local" | "remote" | "merged";
  merged?: unknown;                 // If auto-merged
}

interface MigrationPlan {
  fromVersion: string;
  toVersion: string;
  steps: MigrationStep[];
  breakingChanges: string[];
}

interface MigrationStep {
  version: string;
  description: string;
  migrate: (settings: Record<string, unknown>) => Record<string, unknown>;
}
```

---

## BP-6: Data Design

### 6.1 Plugin Bundle Structure (R2)

```
plugins/
├── registry.json                   (Plugin manifest list, updated daily)
├── {pluginId}/
│   ├── manifest.json               (Plugin manifest)
│   ├── bundle.js                   (Web Worker bundle, minified)
│   ├── bundle.js.map              (Source map)
│   ├── styles.css                  (Optional plugin styles)
│   └── versions/
│       ├── 1.0.0/
│       │   ├── manifest.json
│       │   ├── bundle.js
│       │   └── bundle.js.map
│       └── 1.1.0/
│           └── ...
```

### 6.2 Theme Bundle Structure (R2)

```
themes/
├── registry.json                   (Theme manifest list)
├── {themeId}/
│   ├── manifest.json               (Theme definition)
│   ├── tokens.json                 (ThemeTokens)
│   ├── dark-tokens.json            (Dark mode tokens)
│   ├── preview/
│   │   ├── thumbnail.webp          (300x200)
│   │   └── screenshot.webp         (1920x1080)
│   └── versions/
│       └── ...
```

### 6.3 D1 Schema: Installed Plugins

```sql
CREATE TABLE installed_plugins (
  user_id TEXT NOT NULL,
  plugin_id TEXT NOT NULL,
  version TEXT NOT NULL,
  enabled INTEGER NOT NULL DEFAULT 1,
  settings TEXT NOT NULL DEFAULT '{}',
  installed_at TEXT NOT NULL,
  last_used_at TEXT,
  PRIMARY KEY (user_id, plugin_id)
);

CREATE INDEX idx_plugins_user ON installed_plugins(user_id);
```

### 6.4 D1 Schema: Settings Sync

```sql
CREATE TABLE user_settings (
  user_id TEXT PRIMARY KEY,
  settings_json TEXT NOT NULL,       -- Serialized UserSettings
  version TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  sync_token TEXT NOT NULL           -- For conflict detection
);

CREATE TABLE settings_history (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  settings_json TEXT NOT NULL,
  version TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX idx_settings_history_user ON settings_history(user_id);
```

---

## BP-7: Component Design

### 7.1 Plugin Lifecycle Flow

```
Host App        PluginRegistry    PluginSandbox     CapabilityMatrix
  │                  │                │                │
  │ install plugin   │                │                │
  │─────────────────>│                │                │
  │                  │ validate manifest               │
  │                  │───────────────────────────────>│
  │                  │ valid/capabilities ok           │
  │                  │<───────────────────────────────│
  │                  │                │                │
  │                  │ fetch bundle  │                │
  │                  │ from R2       │                │
  │                  │──────>        │                │
  │                  │ bundle.js     │                │
  │                  │<──────        │                │
  │                  │                │                │
  │                  │ new Worker()  │                │
  │                  │───────────────>│                │
  │                  │                │ importScripts  │
  │                  │                │ (bundle.js)    │
  │                  │                │                │
  │                  │ postMessage({ │                │
  │                  │   type: "init"│                │
  │                  │   capabilities│                │
  │                  │ })            │                │
  │                  │───────────────>│                │
  │                  │                │ plugin.onLoad()│
  │                  │                │                │
  │ plugin ready     │                │                │
  │<─────────────────│                │                │
```

### 7.2 Theme Application Flow

```
User            ThemeEngine    ThemeInheritance   CSS DOM
  │                │                │                │
  │ select theme   │                │                │
  │───────────────>│                │                │
  │                │ resolve cascade│                │
  │                │───────────────>│                │
  │                │ base tokens    │                │
  │                │<───────────────│                │
  │                │                │                │
  │                │ merge user     │                │
  │                │ customizations │                │
  │                │───────────────>│                │
  │                │ merged tokens  │                │
  │                │<───────────────│                │
  │                │                │                │
  │                │ apply to       │                │
  │                │ :root          │                │
  │                │───────────────────────────────>│
  │                │                │   CSS variables│
  │                │                │   updated      │
  │                │                │                │<─────
  │                │                │                │
  │ theme applied  │                │                │
  │<───────────────│                │                │
```

### 7.3 Settings Import Flow

```
User            SettingsImporter   ConflictResolver   SettingsStorage
  │                │                   │                   │
  │ import file    │                   │                   │
  │───────────────>│                   │                   │
  │                │ parse JSON        │                   │
  │                │ validate checksum │                   │
  │                │                   │                   │
  │                │ validate schema   │                   │
  │                │ (Zod + JSON Schema)                  │
  │                │                   │                   │
  │                │ detect version    │                   │
  │                │                   │                   │
  │                │ if needs migration│                   │
  │                │ run migrator      │                   │
  │                │                   │                   │
  │                │ compare with      │                   │
  │                │ current settings  │                   │
  │                │──────────────────>│                   │
  │                │ conflicts[]       │                   │
  │                │<──────────────────│                   │
  │                │                   │                   │
  │ show conflicts │                   │                   │
  │ per-field      │                   │                   │
  │<───────────────│                   │                   │
  │                │                   │                   │
  │ resolve each   │                   │                   │
  │───────────────>│                   │                   │
  │                │ merge resolved    │                   │
  │                │──────────────────────────────────────>│
  │                │                   │    settings saved  │
  │                │                   │                   │<─────
  │ import done    │                   │                   │
  │<───────────────│                   │                   │
```

---

## BP-8: Deployment Design

### 8.1 Worker Route Topology

```
┌─────────────────────────────────────────────────────────┐
│                  CLOUDFLARE WORKERS                       │
│                                                           │
│  Routes:                                                  │
│  ├── /api/plugins/registry     → PluginRegistry           │
│  ├── /api/plugins/install      → PluginRegistry           │
│  ├── /api/plugins/:id          → PluginRegistry           │
│  ├── /api/plugins/:id/settings → PluginSettings           │
│  │                                                        │
│  ├── /api/themes/registry      → ThemeRegistry            │
│  ├── /api/themes/install       → ThemeRegistry            │
│  ├── /api/themes/:id           → ThemeRegistry            │
│  │                                                        │
│  ├── /api/settings/sync        → SettingsSync             │
│  ├── /api/settings/export      → SettingsExport           │
│  │                                                        │
│  R2 Bindings:                                             │
│  ├── PLUGIN_BUNDLES (plugin JS bundles + manifests)      │
│  ├── THEME_BUNDLES (theme CSS + manifests)               │
│                                                           │
│  D1 Bindings:                                             │
│  ├── WIKISITES_DB (installed_plugins, user_settings)     │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### 8.2 Plugin Sandbox Security Model

```
┌─────────────────────────────────────────────────────────┐
│                    PLUGIN SANDBOX                         │
│                                                           │
│  ┌───────────────────────────────────────────────────┐   │
│  │                  Web Worker Thread                 │   │
│  │                                                    │   │
│  │  ┌──────────────┐  ┌──────────────┐              │   │
│  │  │ Plugin Code  │  │ Plugin API   │              │   │
│  │  │ (untrusted)  │──│ (capability  │              │   │
│  │  │              │  │  gated)      │              │   │
│  │  └──────────────┘  └──────┬───────┘              │   │
│  │                            │                       │   │
│  └────────────────────────────│───────────────────────┘   │
│                               │                           │
│                     postMessage│ (structured clone)        │
│                               │                           │
│  ┌────────────────────────────│───────────────────────┐   │
│  │                  Host Thread                        │   │
│  │                     │                               │   │
│  │  ┌─────────────────▼──────────────────┐           │   │
│  │  │         Message Router              │           │   │
│  │  │  • Validates message type           │           │   │
│  │  │  • Checks capability                │           │   │
│  │  │  • Rate limits                      │           │   │
│  │  │  • Serializes responses             │           │   │
│  │  └────────────────────────────────────┘           │   │
│  └────────────────────────────────────────────────────┘   │
│                                                           │
│  Blocked APIs in Worker:                                  │
│  ✗ DOM access (no document, window, navigator)           │
│  ✗ Dynamic import()                                       │
│  ✗ eval()                                                 │
│  ✗ SharedArrayBuffer                                      │
│  ✗ WebSocket (except via host proxy)                      │
│  ✗ IndexedDB (except via host proxy)                      │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## BP-9: Formal Verification

| Property ID | Property Description | Proof Method | Status |
|-------------|---------------------|--------------|--------|
| FV-EXT-001 | Plugin cannot access DOM | Security test: plugin code references document → error | Pending |
| FV-EXT-002 | Plugin cannot exceed capability | Permission test: plugin calls denied API → error | Pending |
| FV-EXT-003 | Plugin crash doesn't affect host | Isolation test: plugin throws → host unaffected | Pending |
| FV-EXT-004 | Theme CSS variables are complete | Completeness test: all 34 tokens defined | Pending |
| FV-EXT-005 | Theme switching is O(1) | Performance test: time theme switch < 16ms | Pending |
| FV-EXT-006 | Settings validation catches all invalid inputs | Fuzz test: random inputs → validation errors | Pending |
| FV-EXT-007 | Settings migration is idempotent | Property test: migrate(migrate(s)) = migrate(s) | Pending |
| FV-EXT-008 | Settings import checksum is verified | Integrity test: corrupted file → rejection | Pending |

---

## BP-10: HAL Specification

```typescript
interface ExtensibilityHAL {
  // Plugin management
  plugins: {
    list(opts?: PluginListRequest): Promise<PluginListResponse>;
    install(req: PluginInstallRequest): Promise<PluginInstallResponse>;
    uninstall(pluginId: string): Promise<void>;
    enable(pluginId: string): Promise<void>;
    disable(pluginId: string): Promise<void>;
    getSettings(pluginId: string): Promise<Record<string, unknown>>;
    updateSettings(pluginId: string, settings: Record<string, unknown>): Promise<void>;
  };

  // Theme management
  themes: {
    list(opts?: ThemeListRequest): Promise<ThemeListResponse>;
    install(req: ThemeInstallRequest): Promise<ThemeInstallResponse>;
    uninstall(themeId: string): Promise<void>;
    apply(req: ThemeApplyRequest): Promise<void>;
    customize(req: ThemeCustomizeRequest): Promise<void>;
    preview(themeId: string): Promise<ThemeDefinition>;
    getCurrent(): Promise<ThemeDefinition>;
  };

  // Settings management
  settings: {
    get(): Promise<UserSettings>;
    update(settings: Partial<UserSettings>): Promise<UserSettings>;
    export(): Promise<SettingsExport>;
    import(req: ImportSettingsRequest): Promise<ImportSettingsResponse>;
    getSchema(): Promise<SettingsSchema>;
    getMigrationPlan(fromVersion: string): Promise<MigrationPlan>;
  };

  // Sandbox
  sandbox: {
    createWorker(pluginId: string, bundleUrl: string): Promise<PluginWorker>;
    sendMessage(workerId: string, message: PluginMessage): Promise<PluginResponse>;
    destroyWorker(workerId: string): Promise<void>;
  };
}
```

---

## BP-11: Compliance Matrix

| Standard | Requirement | Component | Status |
|----------|------------|-----------|--------|
| IEEE 1016-2024 | Software design description | This document | Compliant |
| JSON Schema Draft 2020-12 | Settings validation | SettingsValidator | Target |
| SemVer 2.0 | Plugin/theme versioning | PluginRegistry, ThemeRegistry | Target |
| WCAG 2.1 AA | Settings/theme UI accessibility | All UI components | Target |
| Content Security Policy | Plugin sandbox isolation | PluginSandbox | Target |
| Web Workers API | Plugin execution isolation | PluginSandbox | Target |

---

## BP-12: Quality Checklist

### 12.1 Component Completeness

- [ ] PluginAPI: Registry + sandbox + capability matrix + lifecycle hooks
- [ ] ThemeEngine: CSS custom properties + inheritance + dark/light mode + marketplace
- [ ] SettingsManager: JSON Schema + Zod validation + import/export + conflict resolver + migration

### 12.2 Interface Completeness

- [ ] IF-PLUGIN-001: PluginManifest, PluginAPI, PluginInstalled, PluginInstallRequest/Response
- [ ] IF-THEME-001: ThemeDefinition, ThemeTokens, ThemeApplyRequest, ThemeListRequest/Response
- [ ] IF-SETTINGS-001: UserSettings, SettingsExport, ImportSettingsRequest/Response, SettingsConflict, MigrationPlan

### 12.3 Security

- [ ] Plugin sandbox blocks DOM access
- [ ] Plugin capability enforcement on all API calls
- [ ] Plugin crash isolation (Worker thread termination)
- [ ] Plugin bundle integrity verification (SHA-256 checksum)
- [ ] Settings import checksum verification

### 12.4 Theme System

- [ ] All 34 CSS custom properties defined in base theme
- [ ] Theme inheritance cascade: base → user → plugin
- [ ] Dark mode toggle applies correct token set
- [ ] Theme switching is < 16ms (no re-render)
- [ ] Critical CSS includes base theme tokens

### 12.5 Settings Management

- [ ] Dual validation: JSON Schema + Zod
- [ ] Import/export preserves all settings
- [ ] Conflict resolution: merge, overwrite, or per-field prompt
- [ ] Version migration handles breaking changes
- [ ] Settings sync across devices via D1

### 12.6 Performance

- [ ] Plugin install < 1s (including bundle download)
- [ ] Plugin message roundtrip < 50ms (p95)
- [ ] Theme application < 16ms (p95)
- [ ] Settings save < 100ms (p95)
- [ ] Settings import < 500ms (p95)

---

**End of Document**
**Document Status:** DRAFT — Pending architecture review
**Owner:** Wikisites Architecture Team
