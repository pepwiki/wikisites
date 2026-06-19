# Pattern Library — Reusable Patterns from Wikisites

**Document ID:** PAT-LIB-001
**Date:** 2026-06-19
**Phase:** 7.5 / 8.5 — Knowledge Base
**Status:** COMPLETE

---

## 1. SolidJS Component Patterns

### 1.1 Signal-Based State Management

```typescript
// Pattern: Create signals for all reactive state
const [count, setCount] = createSignal(0);
const [items, setItems] = createSignal<Array<Item>>([]);

// Derived state via createMemo
const doubleCount = createMemo(() => count() * 2);
const filteredItems = createMemo(() =>
  items().filter(item => item.active)
);
```

**Used in:** `ScoreTracker.ts`, `SessionStats.tsx`, `ReviewDashboard.tsx`

### 1.2 Effects with Cleanup

```typescript
// Pattern: Always pair onMount with onCleanup for listeners/timers
onMount(() => {
  if (typeof document === "undefined") return; // SSR safety

  const handler = (e: Event) => { /* ... */ };
  document.addEventListener("keydown", handler);

  onCleanup(() => {
    document.removeEventListener("keydown", handler);
  });
});
```

**Used in:** `KeyboardShortcuts.tsx`, `PushNotifications.tsx`, `ReadingProgress.tsx`

### 1.3 <For> Instead of .map()

```typescript
// Pattern: Use <For> for list rendering (DOM reuse)
<For each={items()}>
  {(item, index) => (
    <div data-index={index()}>
      {item.name}
    </div>
  )}
</For>

// Anti-pattern: .map() creates new DOM nodes on every re-render
// items().map(item => <div>{item.name}</div>)  // DON'T DO THIS
```

**Used in:** `FlashcardDeck.tsx`, `QuizSession.tsx`, `ReviewDashboard.tsx`

### 1.4 Props Tracked via Getters

```typescript
// Pattern: Access props inside tracked scopes (createMemo, JSX)
interface CardProps {
  name: string;
  score: number;
}

function Card(props: CardProps) {
  // Anti-pattern: const name = props.name; (outside tracked scope)
  // This reads props.name once and never updates

  // Correct: access inside createMemo or JSX
  const displayName = createMemo(() => props.name.toUpperCase());

  return <div>{displayName()}</div>;
}
```

**Used in:** All SolidJS components

### 1.5 SSR Safety Guards

```typescript
// Pattern: Guard browser-only APIs
onMount(() => {
  if (typeof window === "undefined") return;
  if (typeof document === "undefined") return;

  const data = localStorage.getItem("key");
  // ...
});

// Pattern: Conditional rendering for browser-only features
<Show when={typeof window !== "undefined"}>
  <BrowserOnlyComponent />
</Show>
```

**Used in:** `DailyChallenge.tsx`, `CookieConsent.tsx`, `PushNotifications.tsx`

---

## 2. Astro + SolidJS Integration Patterns

### 2.1 Island Architecture

```astro
---
// Pattern: Static content in Astro, interactive islands via client:* directives
import Quiz from '../components/Quiz.tsx';
import Flashcard from '../components/Flashcard.tsx';
---

<!-- Static content (no JS shipped) -->
<article set:html={content} />

<!-- Interactive island (hydrated on client) -->
<Quiz client:visible questions={questions} />

<!-- Hydrate on load (for above-the-fold interactive content) -->
<Flashcard client:load card={card} />

<!-- Hydrate on media query -->
<MobileNav client:media="(max-width: 768px)" />
```

**Used in:** All Astro pages with SolidJS components

### 2.2 Content Collections + SolidJS

```typescript
// Pattern: Define content schema in content.config.ts
import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { articles };
```

**Used in:** `packages/wiki/src/content.config.ts`, `packages/encp/src/content.config.ts`

### 2.3 Static Data Passing to Islands

```astro
---
// Pattern: Pass Astro frontmatter data as props to SolidJS islands
const { frontmatter, compiledContent } = Astro.props;
const quizData = JSON.parse(frontmatter.quiz);
---

<Quiz client:visible questions={quizData.questions} />
```

**Used in:** MDX files embedding quiz/flashcard components

---

## 3. Cloudflare Workers API Patterns

### 3.1 JSON Response Helper

```typescript
// Pattern: Centralized JSON response with CORS headers
const JSON_HEADERS: Readonly<Record<string, string>> = Object.freeze({
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "public, max-age=3600",
});

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: JSON_HEADERS,
  });
}
```

**Used in:** `packages/workers/src/index.ts`

### 3.2 Rate Limiting Middleware

```typescript
// Pattern: Sliding window rate limiter
const rateLimitResult = checkRateLimit(`search:${ip}`, {
  windowMs: 60_000,
  maxRequests: 30,
});

if (!rateLimitResult.allowed) {
  const response = jsonResponse({ error: "Rate limit exceeded" }, 429);
  response.headers.set("X-RateLimit-Remaining", String(rateLimitResult.remaining));
  response.headers.set("X-RateLimit-Reset", String(Math.ceil(rateLimitResult.resetAt / 1000)));
  return response;
}
```

**Used in:** `packages/workers/src/security/rate-limit.ts`

### 3.3 Security Headers Wrapper

```typescript
// Pattern: Apply security headers to all responses
export function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  headers.set("Content-Security-Policy", "default-src 'self'; ...");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
```

**Used in:** `packages/workers/src/security/headers.ts`

### 3.4 Route-Based Handler

```typescript
// Pattern: Simple route matching in Workers
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      return withSecurityHeaders(await handleApi(request, env));
    }

    return withSecurityHeaders(await env.ASSETS.fetch(request));
  },
};
```

**Used in:** `packages/workers/src/index.ts`

---

## 4. Zod Schema Patterns

### 4.1 Content Validation Schemas

```typescript
// Pattern: Define reusable Zod schemas for content validation
export const QuizQuestionSchema = z.object({
  id: z.string().uuid(),
  question: z.string().min(1),
  options: z.array(z.string()).length(4),
  correctIndex: z.number().int().min(0).max(3),
  explanation: z.string().optional(),
  difficulty: z.enum(["beginner", "intermediate", "advanced", "expert", "master"]),
  tags: z.array(z.string()).default([]),
});

export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;
```

**Used in:** `packages/shared/src/schemas/content.ts`

### 4.2 API Query Validation

```typescript
// Pattern: Validate query parameters with Zod
export const SearchQuerySchema = z.object({
  q: z.string().min(1),
  limit: z.number().int().positive().max(100).default(20),
  offset: z.number().int().nonnegative().default(0),
  filters: z.object({
    minLength: z.number().int().nonnegative().optional(),
    maxLength: z.number().int().positive().optional(),
    sequence: z.string().regex(/^[GAVLIFWMSTCYNQHKRDE]+$/).optional(),
    category: z.string().optional(),
  }).default({}),
});

export type SearchQuery = z.infer<typeof SearchQuerySchema>;
```

**Used in:** `packages/query/src/index.ts`

### 4.3 Schema Composition

```typescript
// Pattern: Compose schemas for complex types
export const OligopeptideSchema = z.object({
  name: z.string().min(1),
  sequence: z.string().regex(/^[GAVLIFWMSTCYNQHKRDE]+$/),
  length: z.number().int().positive(),
  molecularWeight: z.number().positive(),
  therapeuticArea: z.array(z.string()),
  biologicalActivity: z.string(),
  aliases: z.array(z.string()).default([]),
});

export type Oligopeptide = z.infer<typeof OligopeptideSchema>;
```

**Used in:** `packages/shared/src/schemas/oligopeptide.ts`

---

## 5. PWA Patterns

### 5.1 Service Worker Registration

```typescript
// Pattern: Register service worker in Astro layout
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(console.error);
  });
}
```

### 5.2 Offline Fallback

```javascript
// Pattern: Service worker with offline fallback
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        return caches.match("/offline.html");
      });
    })
  );
});
```

### 5.3 Web App Manifest

```json
{
  "name": "Wikipept",
  "short_name": "Wikipept",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#020617",
  "theme_color": "#0d9488",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

**Used in:** `packages/wiki/public/manifest.json`

---

## 6. i18n Patterns

### 6.1 Translation Function

```typescript
// Pattern: Simple translation function with nested keys
type TranslationMessages = Record<string, string | Record<string, string>>;

const translations: Record<Locale, TranslationMessages> = {
  en: { quiz: { start: "Start Quiz", score: "Score" } },
  zh: { quiz: { start: "开始测验", score: "分数" } },
};

export function t(key: string, locale: Locale): string {
  const keys = key.split(".");
  let value: any = translations[locale];
  for (const k of keys) {
    value = value?.[k];
  }
  return typeof value === "string" ? value : key;
}
```

**Used in:** `packages/shared/src/i18n/index.ts`

### 6.2 Locale Detection Priority

```typescript
// Pattern: Locale detection with fallback chain
export function getLocale(): Locale {
  // 1. URL path prefix (e.g., /zh/articles)
  const urlLocale = detectFromUrl();
  if (urlLocale) return urlLocale;

  // 2. localStorage
  const stored = localStorage.getItem("locale");
  if (stored && isValidLocale(stored)) return stored;

  // 3. Accept-Language header
  const browser = navigator.language.split("-")[0];
  if (isValidLocale(browser)) return browser;

  // 4. Default
  return "en";
}
```

### 6.3 RTL Support

```typescript
// Pattern: RTL detection and application
export function isRTL(locale: Locale): boolean {
  return ["ar"].includes(locale);
}

// In CSS: use logical properties
// margin-inline-start instead of margin-left
// padding-inline-end instead of padding-right
```

**Used in:** `packages/shared/src/i18n/index.ts`, `packages/shared/src/i18n/locales/ar.ts`

---

## 7. Keyboard Shortcut Patterns

### 7.1 Global Keyboard Handler

```typescript
// Pattern: Global keyboard shortcuts with input field exclusion
onMount(() => {
  if (typeof document === "undefined") return;

  const handler = (e: KeyboardEvent) => {
    // Don't intercept when typing in inputs
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

    switch (e.key) {
      case " ":
        e.preventDefault();
        props.onFlip?.();
        break;
      case "1": case "2": case "3": case "4":
        props.onRate?.(Number(e.key));
        break;
      case "ArrowRight":
        props.onNext?.();
        break;
      case "ArrowLeft":
        props.onPrevious?.();
        break;
    }
  };

  document.addEventListener("keydown", handler);
  onCleanup(() => document.removeEventListener("keydown", handler));
});
```

**Used in:** `packages/wiki/src/components/KeyboardShortcuts.tsx`

### 7.2 Shortcut Documentation

```typescript
// Pattern: Document shortcuts for help/tooltip display
const SHORTCUTS = [
  { key: "Space", action: "Flip card" },
  { key: "1-4", action: "Rate difficulty" },
  { key: "→", action: "Next card" },
  { key: "←", action: "Previous card" },
] as const;
```

---

## 8. Dark Mode Patterns

### 8.1 Theme Toggle with Persistence

```typescript
// Pattern: Theme toggle with localStorage + cookie persistence
export function setTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("wikisites-theme", theme);
  // Cross-subdomain cookie
  document.cookie = `wikisites-theme=${theme}; path=/; domain=.pages.dev; max-age=31536000`;
}
```

### 8.2 Tailwind Dark Mode Classes

```astro
---
// Pattern: Consistent dark mode class usage
---
<div class="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
  <p class="text-slate-600 dark:text-slate-400">Content</p>
  <span class="border-slate-200 dark:border-slate-700">Border</span>
</div>
```

### 8.3 System Theme Detection

```typescript
// Pattern: Watch system theme changes
export function watchSystemTheme(callback: (theme: Theme) => void): () => void {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = (e: MediaQueryListEvent) => callback(e.matches ? "dark" : "light");
  mediaQuery.addEventListener("change", handler);
  return () => mediaQuery.removeEventListener("change", handler);
}
```

**Used in:** `packages/shared/src/theme.ts`

---

## 9. Testing Patterns

### 9.1 Vitest Component Testing

```typescript
// Pattern: Test SolidJS components with testing-library
import { render } from "solid-testing-library";
import { Quiz } from "../components/Quiz";

describe("Quiz", () => {
  it("renders questions", () => {
    const { getByText } = render(() => (
      <Quiz questions={mockQuestions} />
    ));
    expect(getByText(mockQuestions[0].question)).toBeTruthy();
  });
});
```

### 9.2 SSR Environment Guard

```typescript
// Pattern: Test files that access browser APIs need jsdom environment
// @vitest-environment jsdom
import { describe, it, expect } from "vitest";

describe("Component with localStorage", () => {
  it("persists data", () => {
    localStorage.setItem("key", "value");
    expect(localStorage.getItem("key")).toBe("value");
  });
});
```

**Used in:** `packages/wiki/src/__tests__/toast.test.ts`

### 9.3 E2E Accessibility Testing

```typescript
// Pattern: axe-core integration with Playwright
import AxeBuilder from "@axe-core/playwright";

test("page has no accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(results.violations).toEqual([]);
});
```

**Used in:** `tests/e2e/accessibility.spec.ts`

---

_Report generated: 2026-06-19T00:00:00Z_
_Phase status: COMPLETE_
_Classification: Internal_
