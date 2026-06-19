# Anti-Patterns Discovered

**Document ID:** ANTI-001
**Date:** 2026-06-19
**Phase:** 7.5 / 8.5 — Knowledge Base
**Status:** COMPLETE

---

## 1. Astro + SolidJS Anti-Patterns

### 1.1 Hydration Mismatch from Browser-Only APIs

**Anti-pattern:** Accessing `window`, `document`, `localStorage`, or `navigator` at module scope or outside `onMount`.

```typescript
// WRONG: Accesses localStorage at module level — crashes during SSR
const theme = localStorage.getItem("theme");

// WRONG: Accesses window in component body — hydration mismatch
function Component() {
  const width = window.innerWidth; // SSR renders undefined, client renders 1920
  return <div>{width}</div>;
}
```

**Correct pattern:**
```typescript
// Guard all browser-only access inside onMount
onMount(() => {
  if (typeof window === "undefined") return;
  const theme = localStorage.getItem("theme");
  // ...
});
```

**Found in:** `DailyChallenge.tsx` — localStorage access outside onMount caused hydration mismatch. Fixed with `typeof window` guard.

### 1.2 Using .map() Instead of <For>

**Anti-pattern:** Using `.map()` for list rendering in SolidJS components.

```typescript
// WRONG: .map() creates new DOM nodes on every re-render
<ul>
  {items().map(item => <li>{item.name}</li>)}
</ul>
```

**Correct pattern:**
```typescript
// <For> reuses DOM nodes — only updates changed items
<ul>
  <For each={items()}>
    {(item) => <li>{item.name}</li>}
  </For>
</ul>
```

**Found in:** 7 components migrated from `.map()` to `<For>` during Phase 7 audit.

### 1.3 Reading Props Outside Tracked Scopes

**Anti-pattern:** Reading props values outside of `createMemo`, `createEffect`, or JSX.

```typescript
// WRONG: Props read once, never updates
function Card(props: { name: string }) {
  const name = props.name; // Captures initial value only
  return <div>{name}</div>;
}
```

**Correct pattern:**
```typescript
// Props accessed inside tracked scopes update reactively
function Card(props: { name: string }) {
  const displayName = createMemo(() => props.name.toUpperCase());
  return <div>{displayName()}</div>;
}
```

**Found in:** 4 components fixed during Phase 7 audit.

### 1.4 Missing onCleanup for Event Listeners

**Anti-pattern:** Adding event listeners or timers without cleanup.

```typescript
// WRONG: Memory leak — listener never removed
onMount(() => {
  document.addEventListener("keydown", handler);
  // No cleanup!
});

// WRONG: Timer leak — setTimeout never cleared
onMount(() => {
  setTimeout(() => { /* ... */ }, 5000);
  // No cleanup!
});
```

**Correct pattern:**
```typescript
onMount(() => {
  document.addEventListener("keydown", handler);
  setTimeout(() => { /* ... */ }, 5000);

  onCleanup(() => {
    document.removeEventListener("keydown", handler);
    clearTimeout(timerId);
  });
});
```

**Found in:** `PushNotifications.tsx` — setTimeout leak fixed with onCleanup.

---

## 2. Cloudflare Workers Gotchas

### 2.1 No Node.js Built-ins Without Compatibility Flag

**Anti-pattern:** Using `node:` imports without `nodejs_compat` compatibility flag.

```toml
# WRONG: Worker will fail to deploy
compatibility_flags = []

# Correct: Enable nodejs_compat
compatibility_flags = ["nodejs_compat"]
```

### 2.2 KV Write Limits

**Anti-pattern:** Writing to KV on every request.

```
KV write limits:
- 1 write per second per key
- 1000 writes per 10 seconds per namespace
- 500,000 writes per day per namespace
```

**Correct pattern:** Batch writes, use caching headers, accept eventual consistency.

### 2.3 Workers CPU Time Limit

**Anti-pattern:** Performing expensive computation in Workers (10ms CPU time limit on free plan, 30s on paid).

```typescript
// WRONG: Expensive search in Worker
app.get("/api/search", async (c) => {
  const results = await expensiveSearch(c.req.query("q")); // May exceed CPU limit
  return c.json(results);
});
```

**Correct pattern:** Pre-compute results, use KV for caching, or move to Pages Functions.

**Found in:** Phase 5 risk register — CPR-009 (Workers CPU time exceeded during search).

### 2.4 Durable Object Cold Start

**Anti-pattern:** Assuming Durable Objects are always warm.

```
Durable Object cold start:
- First request: ~100-500ms additional latency
- Subsequent requests: normal latency
- After ~30s idle: evicted from memory
```

**Correct pattern:** Design for cold starts; use WebSocket connections to keep objects warm for critical paths.

---

## 3. Bundle Size Traps

### 3.1 Importing Entire Libraries

**Anti-pattern:** Importing large libraries when only a subset is needed.

```typescript
// WRONG: Imports entire lodash (~70KB gzipped)
import _ from "lodash";
_.debounce(fn, 300);

// Correct: Import specific function
import debounce from "lodash/debounce";
debounce(fn, 300);

// Better: Use native implementation
const debounce = (fn: Function, ms: number) => {
  let timer: number;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};
```

### 3.2 Shipping Server Code to Client

**Anti-pattern:** Accidentally bundling server-side code into client bundles.

```typescript
// WRONG: This import ships the entire Zod library to the client
import { z } from "zod";
```

**Correct pattern:** Use Zod schemas only in Astro frontmatter (server-side) or API routes. For client-side validation, use simpler runtime checks.

### 3.3 Not Using Dynamic Imports for Heavy Components

**Anti-pattern:** Eagerly importing heavy components (3D viewer, code editors).

```typescript
// WRONG: MoleculeViewer (~200KB) loaded on every page
import MoleculeViewer from "./MoleculeViewer";

// Correct: Dynamic import with client:visible
// In Astro:
<MoleculeViewer client:visible />
```

---

## 4. Performance Anti-Patterns

### 4.1 Unnecessary Re-renders in SolidJS

**Anti-pattern:** Creating new objects/arrays in props on every render.

```typescript
// WRONG: New object created every render, triggers child re-render
<Child style={{ color: "red" }} />

// Correct: Use memo or stable reference
const style = { color: "red" }; // Stable reference
<Child style={style} />
```

### 4.2 Not Using createMemo for Expensive Computations

**Anti-pattern:** Recomputing expensive values on every access.

```typescript
// WRONG: filteredItems recomputed every time items() or filter() changes
function List() {
  const filteredItems = () => items().filter(item => item.active); // Not memoized
  return <For each={filteredItems()}>{...}</For>;
}

// Correct: Memoize expensive computation
function List() {
  const filteredItems = createMemo(() => items().filter(item => item.active));
  return <For each={filteredItems()}>{...}</For>;
}
```

### 4.3 Preloading All Resources

**Anti-painting:** Adding `<link rel="preload">` for every resource.

```html
<!-- WRONG: Preloading everything defeats the purpose -->
<link rel="preload" href="/font1.woff2" as="font" />
<link rel="preload" href="/font2.woff2" as="font" />
<link rel="preload" href="/script1.js" as="script" />
<link rel="preload" href="/script2.js" as="script" />

<!-- Correct: Preload only critical resources -->
<link rel="preload" href="/font1.woff2" as="font" crossorigin />
<!-- Let browser discover other resources naturally -->
```

---

## 5. Accessibility Anti-Patterns

### 5.1 Missing ARIA Roles on Interactive Elements

**Anti-pattern:** Custom interactive elements without proper ARIA roles.

```html
<!-- WRONG: div with click handler has no semantic meaning -->
<div class="button" onclick="handleClick()">Click me</div>

<!-- Correct: Use semantic HTML or add ARIA roles -->
<button onclick="handleClick()">Click me</button>

<!-- Or if you must use div: -->
<div role="button" tabindex="0" onclick="handleClick()" onkeydown="handleKey(event)">
  Click me
</div>
```

**Found in:** `CookieConsent.tsx` and `PushNotifications.tsx` — missing `role=dialog` and `role=alertdialog` added during Phase 7 audit.

### 5.2 Missing Focus Management

**Anti-pattern:** Modal/dialog opens without moving focus, or closes without returning focus.

```typescript
// WRONG: Dialog opens but focus stays on background
<Show when={isOpen()}>
  <dialog>Content</dialog>
</Show>

// Correct: Move focus to dialog on open, return on close
onMount(() => {
  dialogRef.current?.focus();
});
```

### 5.3 Insufficient Color Contrast

**Anti-painting:** Using colors that don't meet WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large text).

```css
/* WRONG: #64748b on #f8fafc = 3.9:1 ratio (fails AA for normal text) */
.muted { color: #64748b; }

/* Correct: #475569 on #f8fafc = 5.9:1 ratio (passes AA) */
.muted { color: #475569; }
```

### 5.4 Missing prefers-reduced-motion

**Anti-pattern:** Animations without respecting user motion preferences.

```css
/* WRONG: Always animates — causes vestibular distress */
.card { transition: transform 0.3s ease; }

/* Correct: Respect reduced motion preference */
@media (prefers-reduced-motion: no-preference) {
  .card { transition: transform 0.3s ease; }
}
```

**Found in:** `packages/wiki/` — no `prefers-reduced-motion` support before Phase 7 audit. Fixed with comprehensive reduced-motion support.

---

## 6. Testing Anti-Patterns

### 6.1 Testing Implementation Details

**Anti-pattern:** Testing internal state rather than behavior.

```typescript
// WRONG: Tests internal state machine
it("sets internal state to 'loading'", () => {
  component.setState("loading");
  expect(component.internalState).toBe("loading");
});

// Correct: Test observable behavior
it("shows loading indicator while fetching", () => {
  render(() => <Component />);
  expect(screen.getByText("Loading...")).toBeTruthy();
});
```

### 6.2 Not Mocking Browser APIs in Unit Tests

**Anti-painting:** Unit tests that access `window`, `document`, or `localStorage` without jsdom.

```typescript
// WRONG: Crashes in Node.js test environment
it("reads from localStorage", () => {
  const value = localStorage.getItem("key"); // ReferenceError: localStorage is not defined
});
```

**Correct pattern:** Use `@vitest-environment jsdom` or mock explicitly.

**Found in:** `toast.test.ts` — crashed because `window` was not defined. Fixed with `@vitest-environment jsdom`.

### 6.3 Flaky E2E Tests from Timing

**Anti-painting:** Hardcoded waits in E2E tests.

```typescript
// WRONG: Hardcoded wait — may be too short or too long
await page.waitForTimeout(3000);
await page.click("button");

// Correct: Wait for specific condition
await page.waitForSelector("button:not([disabled])");
await page.click("button");
```

---

## 7. CSS Anti-Patterns

### 7.1 CSS Duplication Across Packages

**Anti-painting:** Same CSS defined in multiple files.

**Found in:** `.spatial-card` class duplicated in 3 files during Phase 7 audit. Consolidated into shared component.

### 7.2 Hardcoded Theme Values

**Anti-painting:** Hardcoded light/dark colors without using Tailwind dark: variants.

```html
<!-- WRONG: Hardcoded light theme colors -->
<div class="bg-white text-gray-900">

<!-- Correct: Use dark: variants -->
<div class="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
```

---

_Report generated: 2026-06-19T00:00:00Z_
_Phase status: COMPLETE_
_Classification: Internal_
