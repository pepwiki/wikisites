---
document_id: YP-EXT-PLUGIN-API-001
title: "Plugin API for Educational Platforms"
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
  Specification of the plugin API including plugin architecture (hooks, lifecycle,
  sandboxing), API surface design (read-only vs read-write), security model
  (permissions, sandboxing), SolidJS integration (custom elements, portals), and
  discovery and installation. Defines the extensibility framework for both sites.
test_vector_ref: "test_vectors/test_vectors_social_editor_ext.toml"
domain_constraint_ref: "domain_constraints/domain_constraints_social.toml"
bibliography_ref: "bibliography.md"
---

# Yellow Paper: Plugin API for Educational Platforms

**Document ID:** YP-EXT-PLUGIN-API-001
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

This Yellow Paper specifies the plugin API for oligopeptide educational platforms on encyclopeptide.com and wikipept.com. It establishes authoritative architecture decisions for plugin development, including lifecycle hooks, API surface design, security model, SolidJS integration, and plugin discovery/installation.

### 1.2 Scope

Covers plugin architecture (hooks, lifecycle, sandboxing), API surface design (read-only vs read-write), security model (permissions, sandboxing, capability-based security), SolidJS integration (custom elements, portals, component injection), and plugin marketplace (discovery, installation, versioning). Does not cover core editor functionality (reserved for YP-EDITOR-MDX-001), theme plugins (reserved for YP-EXT-THEMES-001), or settings plugins (reserved for YP-EXT-SETTINGS-001).

### 1.3 Audience

Plugin developers creating extensions, security engineers reviewing plugin isolation, frontend developers integrating plugin UI, and architects reviewing API design.

### 1.4 Normative References

- WebExtensions API (https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- VS Code Extension API (https://code.visualstudio.com/api)
- SolidJS Documentation (https://www.solidjs.com)
- Web Workers API (https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- Content Security Policy (https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

### 1.5 Definitions and Acronyms

| Term | Definition                                         |
| ---- | -------------------------------------------------- |
| Plugin | User-installable extension                        |
| Hook   | Lifecycle callback point                          |
| Sandboxed | Isolated execution environment                |
| Capability | Specific permission granted to plugin       |
| Registry | Plugin discovery/installation marketplace          |

---

## 2. Executive Summary

### 2.1 Problem Statement

Oligopeptide educational websites require a plugin API that enables users to extend functionality with custom features, integrate third-party tools, and customize the platform behavior. The system must provide safe plugin isolation, intuitive API design, seamless SolidJS integration, and a discovery/installation mechanism.

### 2.2 Scope of Solution

This Yellow Paper defines:

1. **Plugin Architecture**: Hooks, lifecycle, sandboxing model
2. **API Surface**: Read-only vs read-write capabilities
3. **Security Model**: Permissions, sandboxing, capability-based security
4. **SolidJS Integration**: Custom elements, portals, component injection
5. **Discovery & Installation**: Marketplace, versioning, updates

### 2.3 Key Assumptions

- Plugins loaded as ES modules via dynamic import
- Web Workers available for sandboxed execution
- SolidJS used for plugin UI components
- TypeScript strict mode for plugin SDK
- D1/KV available for plugin metadata storage

### 2.4 Success Criteria

- Plugin load time < 100ms
- Plugin crash does not affect host application
- API covers 80% of common extension use cases
- Security model prevents unauthorized data access
- Plugin SDK provides TypeScript types

---

## 3. Nomenclature and Notation

### 3.1 Plugin Terminology

| Term               | Definition                                                        |
| ------------------ | ----------------------------------------------------------------- |
| Plugin             | User-installable extension module                                 |
| Extension          | Alternative term for plugin                                       |
| Hook               | Lifecycle callback point                                          |
| Plugin Manifest    | JSON metadata describing plugin                                   |
| Plugin SDK         | TypeScript library for plugin development                         |

### 3.2 Architecture Terminology

| Term               | Definition                                                        |
| ------------------ | ----------------------------------------------------------------- |
| Host               | Main application hosting plugins                                  |
| Guest              | Plugin running within host                                        |
| Sandboxed          | Isolated execution environment                                    |
| Capability         | Specific permission granted                                       |
| Lifecycle          | Plugin initialization to destruction sequence                     |

### 3.3 Integration Terminology

| Term               | Definition                                                        |
| ------------------ | ----------------------------------------------------------------- |
| Custom Element     | Web Component for plugin UI                                       |
| Portal             | SolidJS component rendered in different DOM location              |
| Injection Point    | Designated location where plugin UI can render                    |
| Content Script     | Plugin code that modifies page content                            |

---

## 4. Theoretical Foundation

### 4.1 Plugin Architecture

#### 4.1.1 Lifecycle Hooks

```
┌─────────────────────────────────────────────────┐
│           Plugin Lifecycle                       │
│                                                 │
│  onInstall()                                    │
│    │                                            │
│    ▼                                            │
│  onActivate()                                   │
│    │                                            │
│    ├──▶ onArticleLoad(article)                  │
│    ├──▶ onEditorOpen(editor)                    │
│    ├──▶ onSearchQuery(query)                    │
│    └──▶ onThemeChange(theme)                    │
│    │                                            │
│    ▼                                            │
│  onDeactivate()                                 │
│    │                                            │
│    ▼                                            │
│  onUninstall()                                  │
└─────────────────────────────────────────────────┘
```

#### 4.1.2 Plugin Manifest

```json
{
  "id": "wikisites-sequence-viewer",
  "name": "Sequence Viewer 3D",
  "version": "1.0.0",
  "description": "3D visualization of peptide sequences",
  "author": "community",
  "license": "MIT",
  "entry": "./dist/plugin.js",
  "sdkVersion": "1.0.0",
  "permissions": ["read:articles", "read:sequences", "ui:panels"],
  "hooks": ["onArticleLoad", "onEditorOpen"],
  "injectionPoints": ["article:sidebar", "editor:toolbar"],
  "dependencies": [],
  "peerDependencies": {
    "@wikisites/sdk": ">=1.0.0"
  }
}
```

#### 4.1.3 Plugin SDK Interface

```typescript
// Plugin SDK core interface
interface WikisitesPlugin {
  // Metadata
  manifest: PluginManifest;
  
  // Lifecycle hooks
  onInstall?(): Promise<void>;
  onActivate?(): Promise<void>;
  onDeactivate?(): Promise<void>;
  onUninstall?(): Promise<void>;
  
  // Feature hooks
  onArticleLoad?(article: Article): Promise<void>;
  onEditorOpen?(editor: EditorContext): Promise<void>;
  onSearchQuery?(query: string): Promise<SearchResult[]>;
  onThemeChange?(theme: Theme): Promise<void>;
}

// Article context
interface Article {
  slug: string;
  title: string;
  content: string;
  frontmatter: Record<string, unknown>;
  annotations: Annotation[];
}

// Editor context
interface EditorContext {
  getContent(): string;
  setContent(content: string): void;
  insertAtCursor(text: string): void;
  getSelection(): Selection;
  setSelection(range: Range): void;
}
```

### 4.2 API Surface Design

#### 4.2.1 Read-Only API

```typescript
// Read-only capabilities (no authentication required)
interface ReadOnlyAPI {
  // Article access
  articles: {
    get(slug: string): Promise<Article>;
    list(options?: ListOptions): Promise<Article[]>;
    search(query: string): Promise<SearchResult[]>;
  };
  
  // Sequence data
  sequences: {
    get(sequence: string): Promise<SequenceData>;
    validate(sequence: string): boolean;
    calculateMW(sequence: string): number;
  };
  
  // User preferences (read-only)
  preferences: {
    getTheme(): Theme;
    getLanguage(): string;
  };
}
```

#### 4.2.2 Read-Write API

```typescript
// Read-write capabilities (authentication + specific permission required)
interface ReadWriteAPI extends ReadOnlyAPI {
  // Annotation management
  annotations: {
    create(annotation: CreateAnnotation): Promise<Annotation>;
    update(id: string, data: Partial<Annotation>): Promise<Annotation>;
    delete(id: string): Promise<void>;
  };
  
  // Content modification (editor only)
  content: {
    update(slug: string, content: string): Promise<void>;
    addComponent(slug: string, component: Component): Promise<void>;
  };
  
  // UI extension
  ui: {
    addPanel(config: PanelConfig): Panel;
    addToolbarButton(config: ToolbarButton): ToolbarButton;
    showNotification(message: string, type: NotificationType): void;
  };
}
```

### 4.3 Security Model

#### 4.3.1 Capability-Based Security

```
┌─────────────────────────────────────────────────┐
│           Security Model                         │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │           Permission System              │   │
│  │                                         │   │
│  │  read:articles    - View articles       │   │
│  │  read:sequences   - Access sequence data│   │
│  │  read:annotations - View annotations    │   │
│  │  write:annotations- Create/edit annotations│
│  │  write:content    - Modify content      │   │
│  │  ui:panels        - Add UI panels       │   │
│  │  ui:toolbar       - Add toolbar buttons │   │
│  │  ui:notifications - Show notifications  │   │
│  │  network:external - Make external requests│  │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │           Sandboxing                    │   │
│  │                                         │   │
│  │  Plugins run in Web Worker              │   │
│  │  No direct DOM access                   │   │
│  │  API-only communication                 │   │
│  │  CSP enforced                           │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

#### 4.3.2 Plugin Sandbox (Web Worker)

```typescript
// Plugin sandbox using Web Workers
class PluginSandbox {
  private worker: Worker;
  private permissions: Set<string>;
  
  constructor(plugin: PluginManifest) {
    this.permissions = new Set(plugin.permissions);
    this.worker = new Worker(plugin.entry, { type: 'module' });
    
    // Set up message handling
    this.worker.onmessage = (event) => {
      this.handleMessage(event.data);
    };
    
    // Enforce CSP
    this.worker.addEventListener('error', (error) => {
      console.error(`Plugin ${plugin.id} error:`, error);
      this.terminate();
    });
  }
  
  async callAPI(method: string, ...args: unknown[]): Promise<unknown> {
    // Check permissions
    if (!this.hasPermission(method)) {
      throw new Error(`Plugin does not have permission for ${method}`);
    }
    
    // Send to sandboxed worker
    return new Promise((resolve, reject) => {
      const requestId = crypto.randomUUID();
      
      this.worker.postMessage({
        type: 'api-call',
        requestId,
        method,
        args,
      });
      
      // Set up response handler
      const handler = (event: MessageEvent) => {
        if (event.data.requestId === requestId) {
          this.worker.removeEventListener('message', handler);
          if (event.data.error) {
            reject(new Error(event.data.error));
          } else {
            resolve(event.data.result);
          }
        }
      };
      
      this.worker.addEventListener('message', handler);
    });
  }
  
  private hasPermission(method: string): boolean {
    const requiredPermission = this.getRequiredPermission(method);
    return this.permissions.has(requiredPermission);
  }
  
  terminate(): void {
    this.worker.terminate();
  }
}
```

### 4.4 SolidJS Integration

#### 4.4.1 Custom Elements

```typescript
// Plugin UI as SolidJS component
function PluginPanel({ plugin }: { plugin: PluginInstance }) {
  const [component, setComponent] = createSignal<JSX.Element>();
  
  onMount(async () => {
    // Load plugin's UI component
    const uiModule = await import(plugin.manifest.entry);
    setComponent(() => uiModule.default);
  });
  
  return (
    <div class="plugin-panel" data-plugin-id={plugin.manifest.id}>
      <Show when={component()} fallback={<Loading />}>
        {component()!()}
      </Show>
    </div>
  );
}
```

#### 4.4.2 Portals

```typescript
// Portal for plugin UI injection
function PluginPortal({ 
  pluginId, 
  injectionPoint 
}: { 
  pluginId: string;
  injectionPoint: string;
}) {
  return (
    <Portal mount={document.getElementById(injectionPoint)}>
      <Suspense fallback={<PluginLoading />}>
        <PluginPanel plugin={getPlugin(pluginId)} />
      </Suspense>
    </Portal>
  );
}
```

### 4.5 Discovery & Installation

#### 4.5.1 Plugin Registry

```typescript
// Plugin registry interface
interface PluginRegistry {
  // Discovery
  search(query: string, filters?: PluginFilters): Promise<PluginMetadata[]>;
  getFeatured(): Promise<PluginMetadata[]>;
  getByCategory(category: string): Promise<PluginMetadata[]>;
  
  // Installation
  install(pluginId: string): Promise<PluginInstance>;
  uninstall(pluginId: string): Promise<void>;
  update(pluginId: string): Promise<PluginInstance>;
  
  // Management
  listInstalled(): Promise<PluginInstance[]>;
  enable(pluginId: string): Promise<void>;
  disable(pluginId: string): Promise<void>;
  getPermissions(pluginId: string): Promise<Permission[]>;
}
```

---

## 5. Algorithm Specification

### 5.1 Plugin Loading Algorithm

```
FUNCTION loadPlugin(manifest):
  // 1. Validate manifest
  IF NOT validateManifest(manifest) THEN
    THROW Error("Invalid manifest")
  
  // 2. Check permissions
  requiredPermissions = manifest.permissions
  grantedPermissions = getUserPermissions()
  
  FOR EACH permission IN requiredPermissions:
    IF NOT grantedPermissions CONTAINS permission THEN
      // Request permission from user
      granted = await requestPermission(permission)
      IF NOT granted THEN
        THROW Error("Permission denied")
  
  // 3. Create sandbox
  sandbox = new PluginSandbox(manifest)
  
  // 4. Load plugin code
  await sandbox.loadModule(manifest.entry)
  
  // 5. Initialize plugin
  await sandbox.callAPI('onInstall')
  await sandbox.callAPI('onActivate')
  
  // 6. Register hooks
  FOR EACH hook IN manifest.hooks:
    registerHook(hook, sandbox)
  
  // 7. Register UI injection points
  FOR EACH point IN manifest.injectionPoints:
    registerInjectionPoint(point, sandbox)
  
  RETURN sandbox
END FUNCTION
```

### 5.2 Permission Resolution Algorithm

```
FUNCTION resolvePermissions(pluginPermissions, userPreferences):
  resolved = []
  
  FOR EACH permission IN pluginPermissions:
    // Check if user has pre-approved
    IF userPreferences.autoApprove CONTAINS permission THEN
      resolved.PUSH({ permission, granted: true, automatic: true })
      CONTINUE
    
    // Check if user has denied
    IF userPreferences.autoDeny CONTAINS permission THEN
      resolved.PUSH({ permission, granted: false, automatic: true })
      CONTINUE
    
    // Request from user
    resolved.PUSH({ permission, granted: null, automatic: false })
  
  RETURN resolved
END FUNCTION
```

---

## 6. Test Vector Specification

### 6.1 Reference

| Category            | Vector Count | Description                       |
| ------------------- | ------------ | --------------------------------- |
| Plugin Lifecycle    | 8            | Install, activate, deactivate     |
| Permission System   | 8            | Grant, deny, check                |
| API Surface         | 8            | Read-only, read-write operations  |
| Sandboxing          | 6            | Isolation, error containment      |
| **Total**           | **30**       |                                   |

---

## 7. Domain Constraints

| Parameter | Limit | Notes |
|-----------|-------|-------|
| Max plugins installed | 20 | Memory limit |
| Plugin bundle size | 500KB | Load time limit |
| Plugin load time | < 100ms | UX requirement |
| API call timeout | 5s | Prevent blocking |
| Max panels per plugin | 3 | UI limit |

---

## 8. Bibliography

1. Mozilla. (2024). _WebExtensions API_. https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions **[TQA-5]**

2. Microsoft. (2024). _VS Code Extension API_. https://code.visualstudio.com/api **[TQA-5]**

3. SolidJS Contributors. (2024). _SolidJS Documentation_. https://www.solidjs.com **[TQA-5]**

4. W3C. (2024). _Web Workers API_. https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API **[TQA-5]**

5. Miller, M. (2003). Object-capabilities for secure programming. _Google Tech Talk_. **[TQA-3]**

6. Chrome Extensions. (2024). _Permissions_. https://developer.chrome.com/docs/extensions/reference/permissions-list **[TQA-5]**

---

## 9. Knowledge Graph Concepts

| English              | Chinese (ZH) | Russian (RU)         | German (DE)           | French (FR)                | Japanese (JP)            |
| -------------------- | ------------ | -------------------- | --------------------- | -------------------------- | ------------------------ |
| Plugin               | 插件         | плагин               | Plugin                | Plugin                     | プラグイン                |
| Sandboxing           | 沙箱         | песочница            | Sandboxing            | Sandboxing                 | サンドボックス            |
| API                  | API          | API                  | API                   | API                        | API                      |
| Lifecycle            | 生命周期     | жизненный цикл      | Lebenszyklus          | Cycle de vie               | ライフサイクル            |

---

## 10. Quality Checklist

### 10.1 Completeness

- [ ] Plugin architecture fully specified
- [ ] API surface documented
- [ ] Security model defined
- [ ] SolidJS integration documented
- [ ] Discovery/installation workflow specified

### 10.2 Accuracy

- [ ] API follows established patterns (VS Code, WebExtensions)
- [ ] Security model follows capability-based principles
- [ ] SolidJS integration uses correct primitives

### 10.3 Consistency

- [ ] Nomenclature consistent with extension platforms
- [ ] Permissions system aligns with security best practices

### 10.4 Traceability

- [ ] All decisions traceable to requirements
- [ ] References cited correctly

### 10.5 Usability

- [ ] SDK documentation is developer-friendly
- [ ] Plugin development workflow is intuitive
