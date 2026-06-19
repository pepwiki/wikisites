# Plugin API

Plugins extend Wikipept with custom hooks, UI elements, and commands.

## Plugin Manifest

Every plugin must export a manifest object conforming to `PluginManifestSchema`.

```json
{
  "id": "com.example.my-plugin",
  "name": "My Plugin",
  "version": "1.0.0",
  "author": "Your Name",
  "description": "A brief description of what the plugin does.",
  "hooks": ["onPageLoad", "onThemeChange"],
  "extensionPoints": ["toolbar", "command"],
  "permissions": ["read-content", "read-settings"]
}
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Unique ID (reverse-domain recommended) |
| `name` | `string` | Yes | Display name (max 64 chars) |
| `version` | `string` | Yes | SemVer (`x.y.z`) |
| `author` | `string` | Yes | Author name |
| `description` | `string` | Yes | Short description (max 256 chars) |
| `hooks` | `string[]` | No | Lifecycle hooks to register |
| `extensionPoints` | `string[]` | No | UI extension points to use |
| `permissions` | `string[]` | No | Required permissions |

## Hooks

Lifecycle callbacks fired by the plugin host.

| Hook | When | Context Data |
|------|------|--------------|
| `onPageLoad` | Page first loads | `{ url, title }` |
| `onContentLoaded` | Content rendered | `{ slug, headings }` |
| `onThemeChange` | Theme switches | `{ theme, previous }` |

### Registering a Hook

```typescript
import { createPluginAPI } from "./lib/plugin-api.js";

const api = createPluginAPI();

api.register({
  id: "com.example.demo",
  name: "Demo",
  version: "1.0.0",
  author: "Demo",
  description: "Example plugin",
  hooks: ["onPageLoad"],
  extensionPoints: [],
  permissions: ["read-content"],
});

api.onHook("com.example.demo", "onPageLoad", (ctx) => {
  console.log("Page loaded:", ctx.data.url);
});

await api.init();
```

## Extension Points

UI locations where plugins can register components.

| Extension Point | Location | Component Type |
|-----------------|----------|----------------|
| `toolbar` | Editor toolbar | Button/menu item |
| `command` | Command palette | Command entry |
| `shortcut` | Keyboard shortcuts | Keybinding |
| `sidebar` | Side panel | Panel component |
| `theme` | Theme picker | Theme definition |

## Permission Model

Plugins declare permissions in their manifest. The host enforces these at runtime.

| Permission | Allows |
|------------|--------|
| `read-content` | Read article content and metadata |
| `write-content` | Modify article content |
| `read-settings` | Read user preferences |
| `write-settings` | Modify user preferences |

- Hooks require at least `read-content`
- Extension points check permissions based on their context
- Missing permissions cause the operation to fail with a warning

## Plugin Lifecycle

1. **Register** — Manifest validated and stored
2. **Enable** — Plugin state set to `active`
3. **Hooks** — Handlers called at lifecycle events
4. **Disable** — Plugin state set to `disabled`, hooks cleared
5. **Unregister** — Plugin removed from registry

## Example Plugin

```typescript
// my-plugin.ts
import type { PluginManifest } from "./lib/plugin-schema.js";

export const manifest: PluginManifest = {
  id: "com.example.word-count",
  name: "Word Count",
  version: "1.0.0",
  author: "Example",
  description: "Shows word count in the article footer",
  hooks: ["onContentLoaded"],
  extensionPoints: ["sidebar"],
  permissions: ["read-content"],
};

export function activate(api: ReturnType<typeof createPluginAPI>) {
  api.onHook("com.example.word-count", "onContentLoaded", (ctx) => {
    const content = ctx.data.content as string;
    const words = content.split(/\s+/).length;
    console.log(`Word count: ${words}`);
  });
}
```

## API Reference

### `createPluginAPI()`

Factory function returning a `PluginAPI` instance.

#### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `register(manifest)` | `boolean` | Register a plugin |
| `unregister(id)` | `boolean` | Remove a plugin |
| `getPlugins()` | `PluginManifest[]` | List all plugins |
| `getPlugin(id)` | `PluginManifest?` | Get plugin by ID |
| `enable(id)` | `boolean` | Enable a plugin |
| `disable(id)` | `boolean` | Disable a plugin |
| `onHook(id, hook, handler)` | `boolean` | Register hook handler |
| `executeHook(hook, data)` | `Promise<void>` | Fire all handlers for hook |
| `hasPermission(id, perm)` | `boolean` | Check plugin permission |
| `getExtensionPoints()` | `Map<point, id[]>` | List extension points |
| `init()` | `Promise<void>` | Initialize all plugins |
| `destroy()` | `Promise<void>` | Tear down all plugins |
