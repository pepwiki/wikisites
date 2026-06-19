# Optimization Roadmap

## Overview

Five-phase optimization strategy for Wikisites new components. Each phase is independent and shippable. Phases are ordered by user impact and bundle cost.

## Phase 1: P0 Features — Minimal Bundle Impact

### Duration: 1-2 weeks
### Components: Command Palette, Keyboard Shortcuts, Outline Panel, Breadcrumbs
### Bundle impact: +12KB gzipped (+7KB eager, +5KB lazy)

### 1.1 Eager Components (Keyboard Shortcuts, Breadcrumbs)

**Strategy:** Bundle with app shell. No dynamic import needed.

```typescript
// src/components/Breadcrumbs.tsx
// ~1KB gzipped, pure static content, no external deps
export function Breadcrumbs(props: { items: Array<{ label: string; href: string }> }) {
  return (
    <nav aria-label="Breadcrumb" class="breadcrumbs">
      <ol>
        {props.items.map((item, i) => (
          <li>
            {i < props.items.length - 1 ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

```typescript
// src/components/KeyboardShortcuts.tsx
// ~1KB gzipped, event listener registration
// Registers: Cmd+K (palette), Cmd+Shift+O (outline), Escape (close)
import { onCleanup, onMount } from 'solid-js';

export function KeyboardShortcuts() {
  onMount(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'k') {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('toggle-command-palette'));
      }
      if (e.metaKey && e.shiftKey && e.key === 'o') {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('toggle-outline-panel'));
      }
    };
    document.addEventListener('keydown', handler);
    onCleanup(() => document.removeEventListener('keydown', handler));
  });

  return null; // No DOM output
}
```

### 1.2 Lazy Components (Command Palette, Outline Panel)

**Strategy:** Dynamic import on user trigger. Zero cost until used.

```typescript
// src/components/islands/CommandPaletteIsland.tsx
import { lazy, Suspense, createSignal, onMount, onCleanup } from 'solid-js';

const CommandPalette = lazy(() => import('../CommandPalette'));

export function CommandPaletteIsland() {
  const [open, setOpen] = createSignal(false);

  onMount(() => {
    const handler = () => setOpen(prev => !prev);
    document.addEventListener('toggle-command-palette', handler);
    onCleanup(() => document.removeEventListener('toggle-command-palette', handler));
  });

  return (
    <Show when={open()}>
      <Suspense fallback={<div class="palette-skeleton" />}>
        <CommandPalette onClose={() => setOpen(false)} />
      </Suspense>
    </Show>
  );
}
```

### 1.3 Optimization Actions

- [ ] Add Command Palette dynamic import via `lazy()`
- [ ] Add Outline Panel dynamic import via `lazy()`
- [ ] Bundle Keyboard Shortcuts and Breadcrumbs with app shell
- [ ] Configure Vite manual chunks for P0 UI components
- [ ] Add bundle size check to CI (max +15KB)
- [ ] Run Lighthouse before/after, verify no regression

### Phase 1 Success Criteria

| Metric | Before | Target | Max |
|---|---|---|---|
| JS bundle size | 60KB | 67KB (+7KB) | 72KB |
| LCP | 1.5s | 1.5s | 1.6s |
| TBT | 80ms | 85ms | 95ms |
| Lighthouse score | 95 | 95 | 93 |

---

## Phase 2: P1 Features — Code-Split Heavy Libraries

### Duration: 2-3 weeks
### Components: KaTeX, force-graph, Split Pane, Regex Search
### Bundle impact: +340KB gzipped (all lazy, on-demand)

### 2.1 KaTeX (300KB)

**Strategy:** Dynamic import on math block detection. Preload fonts when KaTeX component loads.

```typescript
// src/components/KaTeXRenderer.tsx
// Loaded only when markdown contains math blocks ($$...$$ or \(...\))
import { lazy, Suspense } from 'solid-js';

const KaTeX = lazy(async () => {
  // Preload KaTeX fonts
  const fontPromises = [
    '/fonts/KaTeX_Main-Regular.woff2',
    '/fonts/KaTeX_Math-Italic.woff2',
  ].map(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    return new Promise<void>(r => { link.onload = () => r(); link.onerror = r; });
  });

  await Promise.all(fontPromises);
  return import('katex');
});

// In markdown renderer:
// Detect math blocks and render KaTeX only when present
function renderMath(content: string) {
  if (!/\$\$|\\\(/.test(content)) return content;
  // Split content, wrap math blocks in KaTeX component
  return content.replace(/\$\$(.*?)\$\$/gs, (_, tex) =>
    `<div class="math-block" data-tex="${encodeURIComponent(tex)}"></div>`
  );
}
```

### 2.2 force-graph (45KB)

**Strategy:** Dynamic import on graph view toggle. Canvas-based rendering.

```typescript
// src/components/ForceGraphIsland.tsx
import { lazy, Suspense, createSignal, onMount } from 'solid-js';

const ForceGraph = lazy(() => import('force-graph'));

export function ForceGraphIsland(props: { wikiId: string }) {
  const [showGraph, setShowGraph] = createSignal(false);

  return (
    <div>
      <button onClick={() => setShowGraph(true)}>Show Graph</button>
      <Show when={showGraph()}>
        <Suspense fallback={<div class="graph-skeleton" />}>
          <ForceGraph wikiId={props.wikiId} />
        </Suspense>
      </Show>
    </div>
  );
}
```

### 2.3 Split Pane (0KB)

**Strategy:** Pure CSS implementation. No JS bundle.

```css
/* Split Pane - CSS-only */
.split-pane {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  height: 100%;
}
.split-pane .divider {
  width: 4px;
  cursor: col-resize;
  background: var(--border);
}
.split-pane .divider:hover {
  background: var(--accent);
}
```

### 2.4 Regex Search (0KB)

**Strategy:** Leverages existing search infrastructure. Adds regex toggle to search input.

```typescript
// src/components/RegexSearchToggle.tsx
// ~0KB - just a toggle + regex wrapper around existing search
import { createSignal } from 'solid-js';

export function RegexSearchToggle(props: { onToggle: (enabled: boolean) => void }) {
  const [regexMode, setRegexMode] = createSignal(false);

  return (
    <label class="regex-toggle">
      <input
        type="checkbox"
        checked={regexMode()}
        onChange={(e) => {
          setRegexMode(e.target.checked);
          props.onToggle(e.target.checked);
        }}
      />
      <span>Regex</span>
    </label>
  );
}
```

### 2.5 Optimization Actions

- [ ] Configure Vite to split KaTeX into separate chunk
- [ ] Configure Vite to split force-graph into separate chunk
- [ ] Implement math block detection in markdown renderer
- [ ] Add font preload strategy for KaTeX
- [ ] Implement graph view lazy loading
- [ ] Split Pane as pure CSS component
- [ ] Regex search toggle wired to existing search
- [ ] Add chunk size limits to CI (KaTeX <320KB, force-graph <55KB)
- [ ] Run Lighthouse before/after each component

### Phase 2 Success Criteria

| Metric | After P1 | Target | Max |
|---|---|---|---|
| Base JS (no KaTeX/force-graph) | 72KB | 75KB | 80KB |
| KaTeX chunk | — | 300KB | 320KB |
| force-graph chunk | — | 45KB | 55KB |
| LCP (wiki page) | 1.5s | 1.6s | 1.8s |
| LCP (math page) | — | 2.0s | 2.5s |
| TBT (wiki page) | 85ms | 90ms | 110ms |
| Time to interactive (math) | — | 2.2s | 2.8s |

---

## Phase 3: P2 Features — Lazy Load Social

### Duration: 1-2 weeks
### Components: Giscus, Annotations, User Accounts
### Bundle impact: +30KB gzipped (all lazy)

### 3.1 Giscus (15KB)

**Strategy:** Load only when user scrolls to comments section. Use IntersectionObserver.

```typescript
// src/components/GiscusIsland.tsx
import { lazy, Suspense, createSignal, onMount } from 'solid-js';

const GiscusWidget = lazy(() => import('@giscus/react'));

export function GiscusIsland() {
  const [visible, setVisible] = createSignal(false);
  let sentinelRef!: HTMLDivElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(sentinelRef);
  });

  return (
    <div ref={sentinelRef!}>
      <Show when={visible()}>
        <Suspense fallback={<div class="comments-skeleton" />}>
          <GiscusWidget
            repo="KP/wikisites"
            repoId="..."
            category="Announcements"
            categoryId="..."
            mapping="pathname"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="dark"
            lang="en"
          />
        </Suspense>
      </Show>
    </div>
  );
}
```

### 3.2 Annotations (10KB)

**Strategy:** Load on annotation trigger (text selection or button click).

```typescript
// src/components/AnnotationsIsland.tsx
const Annotations = lazy(() => import('./Annotations'));

export function AnnotationsIsland(props: { pageId: string }) {
  const [active, setActive] = createSignal(false);

  return (
    <div>
      <button onClick={() => setActive(true)}>Annotations</button>
      <Show when={active()}>
        <Suspense fallback={null}>
          <Annotations pageId={props.pageId} onClose={() => setActive(false)} />
        </Suspense>
      </Show>
    </div>
  );
}
```

### 3.3 User Accounts (5KB)

**Strategy:** Load on login button click. Minimal initial footprint.

```typescript
// src/components/UserAccountsIsland.tsx
const UserAuth = lazy(() => import('./UserAuth'));

export function UserAccountsIsland() {
  const [showLogin, setShowLogin] = createSignal(false);

  return (
    <div>
      <button onClick={() => setShowLogin(true)}>Sign In</button>
      <Show when={showLogin()}>
        <Suspense fallback={<div class="auth-skeleton" />}>
          <UserAuth onClose={() => setShowLogin(false)} />
        </Suspense>
      </Show>
    </div>
  );
}
```

### 3.4 Optimization Actions

- [ ] Giscus loaded via IntersectionObserver
- [ ] Annotations loaded on trigger
- [ ] User Accounts loaded on login click
- [ ] All P2 components use `client:idle` or `client:visible` Astro directive
- [ ] Verify no third-party scripts load until triggered
- [ ] Run Lighthouse before/after

### Phase 3 Success Criteria

| Metric | After P2 | Target | Max |
|---|---|---|---|
| Base JS | 75KB | 78KB | 85KB |
| Giscus chunk | — | 15KB | 20KB |
| Annotations chunk | — | 10KB | 15KB |
| LCP | 1.6s | 1.6s | 1.7s |
| TBT | 90ms | 92ms | 100ms |
| Third-party count | 0 | 0 (until triggered) | 0 |

---

## Phase 4: P3 Features — Lazy Load Editor

### Duration: 2-3 weeks
### Components: TipTap, Diff Viewer
### Bundle impact: +210KB gzipped (all lazy)

### 4.1 TipTap (200KB)

**Strategy:** Load only in edit mode. Show loading skeleton during load.

```typescript
// src/components/TipTapIsland.tsx
import { lazy, Suspense, createSignal, Show } from 'solid-js';

const TipTapEditor = lazy(() => import('./TipTapEditor'));

export function TipTapIsland(props: { content: string; pageId: string }) {
  const [editing, setEditing] = createSignal(false);

  return (
    <div>
      <Show when={!editing()}>
        <div class="wiki-content" innerHTML={props.content} />
        <button onClick={() => setEditing(true)}>Edit</button>
      </Show>

      <Show when={editing()}>
        <Suspense fallback={
          <div class="editor-skeleton">
            <div class="toolbar-skeleton" />
            <div class="content-skeleton" />
          </div>
        }>
          <TipTapEditor
            content={props.content}
            pageId={props.pageId}
            onSave={() => setEditing(false)}
            onCancel={() => setEditing(false)}
          />
        </Suspense>
      </Show>
    </div>
  );
}
```

### 4.2 Diff Viewer (10KB)

**Strategy:** Load on diff view toggle. Compare two content versions.

```typescript
// src/components/DiffViewerIsland.tsx
import { lazy, Suspense, createSignal, Show } from 'solid-js';

const DiffViewer = lazy(() => import('./DiffViewer'));

export function DiffViewerIsland(props: { oldContent: string; newContent: string }) {
  const [showDiff, setShowDiff] = createSignal(false);

  return (
    <div>
      <button onClick={() => setShowDiff(true)}>Show Changes</button>
      <Show when={showDiff()}>
        <Suspense fallback={<div class="diff-skeleton" />}>
          <DiffViewer
            oldContent={props.oldContent}
            newContent={props.newContent}
            onClose={() => setShowDiff(false)}
          />
        </Suspense>
      </Show>
    </div>
  );
}
```

### 4.3 Optimization Actions

- [ ] TipTap loaded only on edit button click
- [ ] Diff Viewer loaded only on diff toggle
- [ ] TipTap vendor chunk split from main bundle
- [ ] Editor skeleton shown during load
- [ ] Verify INP remains <200ms with editor loaded
- [ ] Memory budget: editor <8MB heap after load
- [ ] Run full benchmark suite before/after

### Phase 4 Success Criteria

| Metric | After P3 | Target | Max |
|---|---|---|---|
| Base JS | 78KB | 80KB | 88KB |
| TipTap chunk | — | 200KB | 220KB |
| Diff Viewer chunk | — | 10KB | 15KB |
| LCP (edit mode) | — | 2.0s | 2.5s |
| TBT (edit mode) | — | 120ms | 180ms |
| INP (typing) | — | 40ms | 80ms |
| Memory (edit mode) | — | 15MB | 25MB |

---

## Phase 5: P4 Features — Minimal Overhead

### Duration: 1 week
### Components: Plugin API, Theme Engine, Settings
### Bundle impact: +8KB gzipped (2KB eager, 6KB lazy)

### 5.1 Theme Engine (2KB eager)

**Strategy:** Bundle with app shell. Applies theme on page load to prevent FOUC.

```typescript
// src/components/ThemeEngine.tsx
// ~2KB gzipped, eager load
import { createSignal, onMount } from 'solid-js';

type Theme = 'light' | 'dark' | 'system';

export function ThemeEngine() {
  const [theme, setTheme] = createSignal<Theme>('system');

  onMount(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) setTheme(saved);
    applyTheme(theme());
  });

  return null; // No visual output, applies to :root
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = prefersDark ? 'dark' : 'light';
  } else {
    root.dataset.theme = theme;
  }
}
```

### 5.2 Plugin API (5KB lazy)

**Strategy:** Load only when first plugin is registered.

```typescript
// src/components/PluginAPI.tsx
import { lazy, Suspense } from 'solid-js';

const PluginLoader = lazy(() => import('./PluginLoader'));

export function PluginAPI(props: { wikiId: string }) {
  return (
    <Suspense fallback={null}>
      <PluginLoader wikiId={props.wikiId} />
    </Suspense>
  );
}
```

### 5.3 Settings (1KB lazy)

**Strategy:** Load on settings icon click.

```typescript
// src/components/SettingsIsland.tsx
import { lazy, Suspense, createSignal, Show } from 'solid-js';

const Settings = lazy(() => import('./Settings'));

export function SettingsIsland() {
  const [open, setOpen] = createSignal(false);

  return (
    <div>
      <button onClick={() => setOpen(true)} aria-label="Settings">
        {/* gear icon */}
      </button>
      <Show when={open()}>
        <Suspense fallback={<div class="settings-skeleton" />}>
          <Settings onClose={() => setOpen(false)} />
        </Suspense>
      </Show>
    </div>
  );
}
```

### 5.4 Optimization Actions

- [ ] Theme Engine bundled with app shell
- [ ] Plugin API loaded on first plugin use
- [ ] Settings loaded on icon click
- [ ] Verify theme applies without FOUC
- [ ] Final full benchmark suite run
- [ ] Update performance report

### Phase 5 Success Criteria

| Metric | After P4 | Target | Max |
|---|---|---|---|
| Base JS | 80KB | 82KB | 88KB |
| Plugin API chunk | — | 5KB | 8KB |
| LCP | 1.6s | 1.6s | 1.7s |
| TBT | 92ms | 95ms | 105ms |
| Lighthouse score | 95 | 95 | 93 |

---

## Tree-Shaking Analysis

### Libraries Tree-Shakeable?

| Library | Tree-Shakeable | Notes |
|---|---|---|
| KaTeX | Partial | Core CSS must be included; individual functions can be imported |
| force-graph | Yes | ESM build available |
| TipTap | Yes | Modular; only import needed extensions |
| Giscus | Yes | Single component import |
| SolidJS | Yes | Already in app; no additional cost |
| @kobalte/core | Yes | Already in app |

### Bundle Impact Summary

```
Phase 1 (P0):  +7KB eager  +5KB lazy   = +12KB total
Phase 2 (P1):  +0KB eager  +345KB lazy = +345KB total (lazy only)
Phase 3 (P2):  +0KB eager  +30KB lazy  = +30KB total (lazy only)
Phase 4 (P3):  +0KB eager  +210KB lazy = +210KB total (lazy only)
Phase 5 (P4):  +2KB eager  +6KB lazy   = +8KB total
───────────────────────────────────────────────────────────────
Total:          +9KB eager  +596KB lazy = +605KB total

Eager impact on initial load: +9KB (within 100KB budget)
Lazy impact on initial load:  0KB (loaded on demand)
```

## Dynamic Imports Strategy

```typescript
// Central dynamic import registry
export const LAZY_COMPONENTS = {
  commandPalette: () => import('./CommandPalette'),
  outlinePanel: () => import('./OutlinePanel'),
  katex: () => import('./KaTeXRenderer'),
  forceGraph: () => import('./ForceGraph'),
  tiptap: () => import('./TipTapEditor'),
  diffViewer: () => import('./DiffViewer'),
  giscus: () => import('./GiscusWidget'),
  annotations: () => import('./Annotations'),
  userAccounts: () => import('./UserAuth'),
  pluginApi: () => import('./PluginLoader'),
  settings: () => import('./Settings'),
} as const;

// Prefetch on hover/focus
export function prefetchComponent(key: keyof typeof LAZY_COMPONENTS) {
  LAZY_COMPONENTS[key](); // Triggers webpack/vite chunk loading
}
```

## Prefetch Strategy

| Trigger | Action | Components |
|---|---|---|
| Hover Cmd+K hint | Prefetch palette chunk | Command Palette |
| Hover outline toggle | Prefetch outline chunk | Outline Panel |
| Scroll to math block | Prefetch KaTeX | KaTeX |
| Hover graph button | Prefetch force-graph | force-graph |
| Click edit button | Prefetch TipTap | TipTap |
| Click diff button | Prefetch diff viewer | Diff Viewer |
| Scroll to comments | Prefetch Giscus | Giscus |
| Click settings | Prefetch settings | Settings |
| First plugin load | Prefetch plugin API | Plugin API |

```typescript
// Astro prefetch integration
// <a> tags with data-astro-prefetch trigger automatic prefetching
<a href="/wiki/page" data-astro-prefetch>Page</a>

// Component prefetch on hover
<button
  onmouseenter={() => prefetchComponent('katex')}
  onClick={() => setShowMath(true)}
>
  Show Math
</button>
```
