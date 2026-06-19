/**
 * HAL Mock — Power User Shell
 *
 * Mock implementations for testing P0 prototypes without a real DOM.
 * Provides mock IntersectionObserver, localStorage, navigator, and
 * minimal DOM elements for heading extraction tests.
 *
 * @module hal_mock_power_user
 * @see BP-POWER-USER-SHELL-001 §10 (HAL N/A — this is test infrastructure)
 */

// ─── Mock IntersectionObserver ───────────────────────────────────────────────

export interface MockIntersectionObserverEntry {
  target: Element;
  isIntersecting: boolean;
  boundingClientRect: DOMRect;
  intersectionRatio: number;
}

export class MockIntersectionObserver {
  private callback: IntersectionObserverCallback;
  private options: IntersectionObserverInit | undefined;
  private observed = new Map<Element, boolean>();

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    this.callback = callback;
    this.options = options;
  }

  observe(target: Element): void {
    this.observed.set(target, false);
  }

  unobserve(target: Element): void {
    this.observed.delete(target);
  }

  disconnect(): void {
    this.observed.clear();
  }

  /**
   * Simulate intersection changes for testing.
   */
  simulateIntersection(
    entries: Array<{ target: Element; isIntersecting: boolean }>
  ): void {
    const observerEntries: IntersectionObserverEntry[] = entries.map(
      (entry) => ({
        target: entry.target,
        isIntersecting: entry.isIntersecting,
        boundingClientRect: {
          top: 0,
          left: 0,
          right: 100,
          bottom: 50,
          width: 100,
          height: 50,
          x: 0,
          y: 0,
          toJSON: () => ({}),
        } as DOMRect,
        intersectionRect: {
          top: 0,
          left: 0,
          right: 100,
          bottom: 50,
          width: 100,
          height: 50,
          x: 0,
          y: 0,
          toJSON: () => ({}),
        } as DOMRect,
        intersectionRatio: entry.isIntersecting ? 1 : 0,
        rootBounds: null,
        time: performance.now(),
      })
    );

    this.callback(observerEntries, this as unknown as IntersectionObserver);
  }
}

// ─── Mock localStorage ───────────────────────────────────────────────────────

export class MockLocalStorage {
  private store = new Map<string, string>();

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  get length(): number {
    return this.store.size;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }
}

// ─── Mock navigator ──────────────────────────────────────────────────────────

export function mockNavigatorPlatform(platform: string): () => void {
  const original = Object.getOwnPropertyDescriptor(
    globalThis.navigator,
    "platform"
  );

  Object.defineProperty(globalThis.navigator, "platform", {
    value: platform,
    configurable: true,
    writable: true,
  });

  return () => {
    if (original) {
      Object.defineProperty(globalThis.navigator, "platform", original);
    }
  };
}

// ─── Mock DOM Elements ───────────────────────────────────────────────────────

export interface MockElement {
  tagName: string;
  id: string;
  textContent: string | null;
  children: MockElement[];
}

/**
 * Create a mock DOM element for testing heading extraction.
 */
export function mockElement(
  tag: string,
  id: string,
  text: string
): MockElement {
  return { tagName: tag.toUpperCase(), id, textContent: text, children: [] };
}

/**
 * Create a mock HTMLElement that quacks enough like the real thing
 * for extractHeadings to work.
 */
export function mockHTMLElement(
  tag: string,
  id: string,
  text: string
): Element {
  const el = document.createElement(tag);
  el.id = id;
  el.textContent = text;
  return el;
}

/**
 * Build a mock article container with h2/h3 headings.
 */
export function mockArticleContainer(
  headings: Array<{ tag: "h2" | "h3"; id: string; text: string }>
): HTMLElement {
  const container = document.createElement("div");
  for (const h of headings) {
    const el = document.createElement(h.tag);
    el.id = h.id;
    el.textContent = h.text;
    container.appendChild(el);
    // Add some filler paragraphs between headings
    const p = document.createElement("p");
    p.textContent = "Filler content for scroll testing.";
    container.appendChild(p);
  }
  return container;
}

// ─── Mock KeyboardEvent ──────────────────────────────────────────────────────

/**
 * Create a mock KeyboardEvent for testing shortcut matching.
 */
export function mockKeyboardEvent(
  key: string,
  options: {
    ctrlKey?: boolean;
    altKey?: boolean;
    shiftKey?: boolean;
    metaKey?: boolean;
  } = {}
): KeyboardEvent {
  return new KeyboardEvent("keydown", {
    key,
    ctrlKey: options.ctrlKey ?? false,
    altKey: options.altKey ?? false,
    shiftKey: options.shiftKey ?? false,
    metaKey: options.metaKey ?? false,
    bubbles: true,
    cancelable: true,
  });
}

// ─── Mock Focus ──────────────────────────────────────────────────────────────

export function mockDocumentFocus(): {
  focused: Element | null;
  restore: () => void;
} {
  let focused: Element | null = null;

  const originalActiveElement = Object.getOwnPropertyDescriptor(
    Document.prototype,
    "activeElement"
  );

  Object.defineProperty(Document.prototype, "activeElement", {
    get(this: Document) {
      return focused;
    },
    configurable: true,
  });

  const originalFocus = HTMLElement.prototype.focus;
  HTMLElement.prototype.focus = function (this: HTMLElement) {
    focused = this;
  } as typeof originalFocus;

  return {
    get focused() {
      return focused;
    },
    restore() {
      if (originalActiveElement) {
        Object.defineProperty(
          Document.prototype,
          "activeElement",
          originalActiveElement
        );
      }
      HTMLElement.prototype.focus = originalFocus;
    },
  };
}

// ─── Test Runner Helpers ─────────────────────────────────────────────────────

export interface TestResult {
  id: string;
  description: string;
  passed: boolean;
  error?: string;
  durationMs: number;
}

/**
 * Run a test vector and collect results.
 */
export function runTest(
  id: string,
  description: string,
  fn: () => void | Promise<void>
): TestResult {
  const start = performance.now();
  try {
    const result = fn();
    if (result instanceof Promise) {
      return {
        id,
        description,
        passed: false,
        error: "Async test — use runTestAsync",
        durationMs: performance.now() - start,
      };
    }
    return {
      id,
      description,
      passed: true,
      durationMs: performance.now() - start,
    };
  } catch (e) {
    return {
      id,
      description,
      passed: false,
      error: e instanceof Error ? e.message : String(e),
      durationMs: performance.now() - start,
    };
  }
}

export async function runTestAsync(
  id: string,
  description: string,
  fn: () => Promise<void>
): Promise<TestResult> {
  const start = performance.now();
  try {
    await fn();
    return {
      id,
      description,
      passed: true,
      durationMs: performance.now() - start,
    };
  } catch (e) {
    return {
      id,
      description,
      passed: false,
      error: e instanceof Error ? e.message : String(e),
      durationMs: performance.now() - start,
    };
  }
}

/**
 * Summary of test results.
 */
export interface TestSuiteResult {
  total: number;
  passed: number;
  failed: number;
  results: TestResult[];
  totalDurationMs: number;
}

export function summarizeResults(results: TestResult[]): TestSuiteResult {
  return {
    total: results.length,
    passed: results.filter((r) => r.passed).length,
    failed: results.filter((r) => !r.passed).length,
    results,
    totalDurationMs: results.reduce((sum, r) => sum + r.durationMs, 0),
  };
}
