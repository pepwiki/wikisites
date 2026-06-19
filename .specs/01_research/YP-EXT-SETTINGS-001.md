---
document_id: YP-EXT-SETTINGS-001
title: "Settings Export/Import for Educational Platforms"
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
  Specification of settings export/import including settings data model (JSON schema),
  import/export flow, conflict resolution (merge vs overwrite), version compatibility,
  and storage (localStorage to file to sync). Defines the user preferences framework
  for both sites.
test_vector_ref: "test_vectors/test_vectors_social_editor_ext.toml"
domain_constraint_ref: "domain_constraints/domain_constraints_social.toml"
bibliography_ref: "bibliography.md"
---

# Yellow Paper: Settings Export/Import for Educational Platforms

**Document ID:** YP-EXT-SETTINGS-001
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

This Yellow Paper specifies the settings export/import system for oligopeptide educational platforms on encyclopeptide.com and wikipept.com. It establishes authoritative architecture decisions for user preference management, including data modeling, import/export workflows, conflict resolution, version compatibility, and storage strategies.

### 1.2 Scope

Covers settings data model (JSON schema, Zod validation), import/export flow (file, clipboard, URL), conflict resolution (merge vs overwrite strategies), version compatibility (migration, downgrade), and storage (localStorage, D1 sync, file). Does not cover theme settings (reserved for YP-EXT-THEMES-001), plugin settings (reserved for YP-EXT-PLUGIN-API-001), or editor settings (reserved for YP-EDITOR-MDX-001).

### 1.3 Audience

Frontend developers implementing settings management, backend engineers configuring sync, and users managing their preferences.

### 1.4 Normative References

- JSON Schema (https://json-schema.org)
- Zod (https://zod.dev)
- Web Storage API (https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- File System Access API (https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API)
- Existing `packages/shared/src/theme.ts`

### 1.5 Definitions and Acronyms

| Term | Definition                                         |
| ---- | -------------------------------------------------- |
| Settings | User preferences and configuration            |
| Schema   | JSON structure definition for settings         |
| Conflict | Incompatible settings between versions         |
| Migration | Converting settings between schema versions   |
| Sync     | Synchronizing settings across devices           |

---

## 2. Executive Summary

### 2.1 Problem Statement

Oligopeptide educational websites require a settings system that enables users to export/import their preferences, sync across devices, and maintain compatibility across platform versions. The system must handle theme preferences, learning settings, notification preferences, and plugin configurations.

### 2.2 Scope of Solution

1. **Settings Data Model**: JSON schema with Zod validation
2. **Import/Export Flow**: File download/upload, clipboard, URL sharing
3. **Conflict Resolution**: Merge vs overwrite strategies
4. **Version Compatibility**: Schema migration and downgrade
5. **Storage Strategy**: localStorage, D1 sync, file export

### 2.3 Key Assumptions

- Existing `theme.ts` for cross-subdomain persistence
- D1 database for server-side sync
- TypeScript strict mode with Zod validation
- Users may have settings on multiple devices

### 2.4 Success Criteria

- Export/import completes in < 500ms
- Settings schema versioned with migration support
- Conflict resolution preserves user intent
- Cross-device sync within 30 seconds
- Settings file size < 10KB

---

## 3. Nomenclature and Notation

| Term               | Definition                                                        |
| ------------------ | ----------------------------------------------------------------- |
| Settings Bundle    | Complete user preferences package                                 |
| Settings Schema    | JSON structure definition                                         |
| Settings Patch     | Partial settings update                                           |
| Conflict           | Incompatible settings between sources                            |
| Migration          | Transform settings between schema versions                       |

---

## 4. Theoretical Foundation

### 4.1 Settings Data Model

#### 4.1.1 JSON Schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://wikisites.com/schemas/settings-v1.json",
  "title": "Wikisites User Settings",
  "version": "1.0.0",
  "type": "object",
  "properties": {
    "meta": {
      "type": "object",
      "properties": {
        "version": { "type": "string" },
        "exportedAt": { "type": "string", "format": "date-time" },
        "schemaVersion": { "type": "integer" }
      }
    },
    "theme": {
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "mode": { "enum": ["light", "dark", "system"] },
        "overrides": { "type": "object" }
      }
    },
    "learning": {
      "type": "object",
      "properties": {
        "dailyGoal": { "type": "integer", "minimum": 1, "maximum": 100 },
        "sessionLength": { "type": "integer", "minimum": 5, "maximum": 60 },
        "showHints": { "type": "boolean" },
        "difficulty": { "enum": ["beginner", "intermediate", "advanced"] }
      }
    },
    "notifications": {
      "type": "object",
      "properties": {
        "email": { "type": "boolean" },
        "push": { "type": "boolean" },
        "reviewReminders": { "type": "boolean" },
        "newContent": { "type": "boolean" }
      }
    },
    "editor": {
      "type": "object",
      "properties": {
        "fontSize": { "type": "integer", "minimum": 12, "maximum": 24 },
        "tabSize": { "type": "integer", "minimum": 2, "maximum": 4 },
        "wordWrap": { "type": "boolean" },
        "spellCheck": { "type": "boolean" }
      }
    },
    "plugins": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "properties": {
          "enabled": { "type": "boolean" },
          "settings": { "type": "object" }
        }
      }
    }
  }
}
```

#### 4.1.2 Zod Validation

```typescript
import { z } from 'zod';

const SettingsSchema = z.object({
  meta: z.object({
    version: z.string(),
    exportedAt: z.string().datetime(),
    schemaVersion: z.number(),
  }),
  theme: z.object({
    id: z.string().optional(),
    mode: z.enum(['light', 'dark', 'system']),
    overrides: z.record(z.string()).optional(),
  }).optional(),
  learning: z.object({
    dailyGoal: z.number().min(1).max(100).optional(),
    sessionLength: z.number().min(5).max(60).optional(),
    showHints: z.boolean().optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  }).optional(),
  notifications: z.object({
    email: z.boolean().optional(),
    push: z.boolean().optional(),
    reviewReminders: z.boolean().optional(),
    newContent: z.boolean().optional(),
  }).optional(),
  editor: z.object({
    fontSize: z.number().min(12).max(24).optional(),
    tabSize: z.number().min(2).max(4).optional(),
    wordWrap: z.boolean().optional(),
    spellCheck: z.boolean().optional(),
  }).optional(),
  plugins: z.record(z.object({
    enabled: z.boolean(),
    settings: z.record(z.unknown()).optional(),
  })).optional(),
});

type Settings = z.infer<typeof SettingsSchema>;
```

### 4.2 Import/Export Flow

#### 4.2.1 Export Flow

```
┌─────────────────────────────────────────────────┐
│           Export Flow                            │
│                                                 │
│  1. Collect Settings                            │
│     ├─ localStorage (theme, preferences)       │
│     ├─ D1 (synced settings)                    │
│     └─ Plugin settings                         │
│                                                 │
│  2. Validate with Zod Schema                    │
│     └─ Ensure all fields match schema          │
│                                                 │
│  3. Add Metadata                                │
│     ├─ Version number                          │
│     ├─ Export timestamp                        │
│     └─ Schema version                          │
│                                                 │
│  4. Output Format                               │
│     ├─ .json file download                     │
│     ├─ Clipboard copy                          │
│     └─ QR code (optional)                      │
└─────────────────────────────────────────────────┘
```

#### 4.2.2 Import Flow

```
┌─────────────────────────────────────────────────┐
│           Import Flow                            │
│                                                 │
│  1. Input Source                                │
│     ├─ File upload (.json)                     │
│     ├─ Clipboard paste                         │
│     └─ URL import                              │
│                                                 │
│  2. Parse and Validate                          │
│     ├─ JSON.parse                              │
│     ├─ Zod schema validation                   │
│     └─ Version compatibility check             │
│                                                 │
│  3. Conflict Resolution                         │
│     ├─ Merge (default)                         │
│     ├─ Overwrite                               │
│     └─ Selective import                        │
│                                                 │
│  4. Apply Settings                              │
│     ├─ Update localStorage                     │
│     ├─ Sync to D1                              │
│     └─ Apply theme/UI changes                  │
└─────────────────────────────────────────────────┘
```

#### 4.2.3 Implementation

```typescript
// Export settings
async function exportSettings(): Promise<Blob> {
  const settings = collectSettings();
  const validated = SettingsSchema.parse(settings);
  
  const exportData = {
    meta: {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      schemaVersion: 1,
    },
    ...validated,
  };
  
  return new Blob([JSON.stringify(exportData, null, 2)], {
    type: 'application/json',
  });
}

// Import settings
async function importSettings(data: string): Promise<ImportResult> {
  const parsed = JSON.parse(data);
  const result = SettingsSchema.safeParse(parsed);
  
  if (!result.success) {
    return { success: false, errors: result.error.issues };
  }
  
  const settings = result.data;
  
  // Check version compatibility
  if (settings.meta.schemaVersion > CURRENT_SCHEMA_VERSION) {
    // Need migration
    const migrated = migrateSettings(settings);
    return applySettings(migrated, { strategy: 'merge' });
  }
  
  return applySettings(settings, { strategy: 'merge' });
}

// File download
async function downloadSettings(): Promise<void> {
  const blob = await exportSettings();
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `wikisites-settings-${Date.now()}.json`;
  a.click();
  
  URL.revokeObjectURL(url);
}
```

### 4.3 Conflict Resolution

#### 4.3.1 Merge Strategy (Default)

```typescript
function mergeSettings(local: Settings, imported: Settings): Settings {
  return {
    meta: imported.meta, // Use imported metadata
    theme: imported.theme ?? local.theme,
    learning: { ...local.learning, ...imported.learning },
    notifications: { ...local.notifications, ...imported.notifications },
    editor: { ...local.editor, ...imported.editor },
    plugins: mergePlugins(local.plugins ?? {}, imported.plugins ?? {}),
  };
}

function mergePlugins(local: Record<string, PluginSettings>, imported: Record<string, PluginSettings>): Record<string, PluginSettings> {
  const merged = { ...local };
  
  for (const [key, value] of Object.entries(imported)) {
    if (key in merged) {
      merged[key] = { ...merged[key], ...value };
    } else {
      merged[key] = value;
    }
  }
  
  return merged;
}
```

#### 4.3.2 Overwrite Strategy

```typescript
function overwriteSettings(local: Settings, imported: Settings): Settings {
  return imported; // Complete replacement
}
```

#### 4.3.3 Selective Import

```typescript
interface ImportOptions {
  theme: boolean;
  learning: boolean;
  notifications: boolean;
  editor: boolean;
  plugins: boolean | string[]; // true = all, string[] = specific plugins
}

function selectiveImport(local: Settings, imported: Settings, options: ImportOptions): Settings {
  return {
    meta: imported.meta,
    theme: options.theme ? imported.theme : local.theme,
    learning: options.learning ? imported.learning : local.learning,
    notifications: options.notifications ? imported.notifications : local.notifications,
    editor: options.editor ? imported.editor : local.editor,
    plugins: options.plugins === true 
      ? imported.plugins 
      : options.plugins === false 
        ? local.plugins 
        : selectiveMergePlugins(local.plugins ?? {}, imported.plugins ?? {}, options.plugins),
  };
}
```

### 4.4 Version Compatibility

#### 4.4.1 Migration System

```typescript
interface Migration {
  from: number;
  to: number;
  migrate: (settings: Record<string, unknown>) => Record<string, unknown>;
}

const migrations: Migration[] = [
  {
    from: 1,
    to: 2,
    migrate: (settings) => {
      // Example: Rename field
      settings.learning = settings.learningProfile ?? settings.learning;
      delete settings.learningProfile;
      return settings;
    },
  },
];

function migrateSettings(settings: Settings): Settings {
  let current = settings.meta.schemaVersion;
  let data = settings as unknown as Record<string, unknown>;
  
  while (current < CURRENT_SCHEMA_VERSION) {
    const migration = migrations.find(m => m.from === current);
    if (!migration) break;
    
    data = migration.migrate(data);
    current = migration.to;
  }
  
  data.meta = { ...data.meta, schemaVersion: CURRENT_SCHEMA_VERSION };
  return data as Settings;
}
```

### 4.5 Storage Strategy

```
┌─────────────────────────────────────────────────┐
│           Storage Strategy                       │
│                                                 │
│  ┌─────────────┐     ┌─────────────────────┐   │
│  │  localStorage│     │  Cloudflare D1      │   │
│  │  (Primary)   │────▶│  (Synced Copy)     │   │
│  └─────────────┘     └──────────┬──────────┘   │
│                                 │               │
│                    ┌────────────┼────────────┐  │
│                    ▼            ▼            ▼  │
│           ┌────────────┐ ┌─────────┐ ┌────────┐│
│           │   Device A  │ │ Device B│ │Device C││
│           │  (Local)    │ │ (Local) │ │(Local) ││
│           └────────────┘ └─────────┘ └────────┘│
└─────────────────────────────────────────────────┘
```

---

## 5. Algorithm Specification

### 5.1 Settings Sync Algorithm

```
FUNCTION syncSettings(userId, localSettings):
  // 1. Get server settings
  serverSettings = await DB.get(`settings:${userId}`)
  
  // 2. Compare timestamps
  localTimestamp = localSettings.meta.exportedAt
  serverTimestamp = serverSettings?.meta?.exportedAt ?? 0
  
  IF localTimestamp > serverTimestamp THEN
    // Local is newer, push to server
    await DB.put(`settings:${userId}`, localSettings)
    RETURN { direction: 'push', settings: localSettings }
  
  ELSE IF serverTimestamp > localTimestamp THEN
    // Server is newer, pull to client
    merged = mergeSettings(localSettings, serverSettings)
    localStorage.setItem('settings', JSON.stringify(merged))
    RETURN { direction: 'pull', settings: merged }
  
  ELSE
    // Same timestamp, no sync needed
    RETURN { direction: 'none', settings: localSettings }
  
END FUNCTION
```

---

## 6. Test Vector Specification

| Category            | Vector Count | Description                       |
| ------------------- | ------------ | --------------------------------─ |
| Schema Validation   | 8            | Valid/invalid settings             |
| Import/Export       | 8            | File, clipboard, merge             |
| Conflict Resolution | 8            | Merge, overwrite, selective        |
| Version Migration   | 6            | Upgrade, downgrade, compatibility  |
| **Total**           | **30**       |                                   |

---

## 7. Domain Constraints

| Parameter | Limit | Notes |
|-----------|-------|-------|
| Max settings size | 10KB | localStorage limit |
| Sync interval | 30s | Real-time sync |
| Schema versions | 10 max | Migration chain |
| Export formats | JSON only | Standard format |
| Import file size | 50KB | Security limit |

---

## 8. Bibliography

1. MDN. (2024). _Web Storage API_. https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API **[TQA-5]**

2. MDN. (2024). _File System Access API_. https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API **[TQA-5]**

3. JSON Schema. (2024). _JSON Schema_. https://json-schema.org **[TQA-5]**

4. Zod. (2024). _Zod Documentation_. https://zod.dev **[TQA-5]**

5. Cloudflare D1. (2024). _D1 Database_. https://developers.cloudflare.com/d1/ **[TQA-5]**

---

## 9. Knowledge Graph Concepts

| English              | Chinese (ZH) | Russian (RU)         | German (DE)           | French (FR)                | Japanese (JP)            |
| -------------------- | ------------ | -------------------- | --------------------- | -------------------------- | ------------------------ |
| Settings             | 设置         | настройки            | Einstellungen         | Paramètres                 | 設定                    |
| Export/Import        | 导出/导入    | экспорт/импорт       | Export/Import         | Export/Import              | エクスポート/インポート  |
| Sync                 | 同步         | синхронизация        | Synchronisation       | Synchronisation            | 同期                    |
| Schema               | 架构         | схема               | Schema                | Schema                     | スキーマ                |

---

## 10. Quality Checklist

### 10.1 Completeness

- [ ] Settings data model fully specified
- [ ] Import/export flow documented
- [ ] Conflict resolution strategies defined
- [ ] Version compatibility system specified
- [ ] Storage strategy documented

### 10.2 Accuracy

- [ ] JSON Schema follows 2020-12 draft
- [ ] Zod validation matches schema
- [ ] Migration system handles edge cases

### 10.3 Consistency

- [ ] Nomenclature consistent with web standards
- [ ] Storage strategy aligns with existing `theme.ts`

### 10.4 Traceability

- [ ] All decisions traceable to requirements
- [ ] References cited correctly

### 10.5 Usability

- [ ] Export/import workflow is intuitive
- [ ] Conflict resolution preserves user intent
