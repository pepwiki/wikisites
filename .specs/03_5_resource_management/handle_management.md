# Handle Lifecycle Management

## Overview

Handle management ensures no resource leaks occur across database connections, network streams, WebSocket connections, event listeners, Web Workers, BroadcastChannel, Observers, AbortControllers, and all new components (Command Palette, Outline Panel, Graph View, TipTap Editor, Plugin Workers). Every handle acquired must have a deterministic release path, enforced by code patterns and verified by testing.

## 1. Web Worker Lifecycle

### Worker Lifecycle States

```
[Uncreated] -> create() -> [Created] -> postMessage() -> [Active]
    |                                                        |
    |<------------ terminate() / onerror <-------------------|
    |                                                        v
    +<-------------------- onCleanup <------------------[Idle/Errored]
```

### Worker Creation and Termination

```typescript
class ManagedWorker {
  private worker: Worker | null = null;
  private id: string;
  private heartbeat: ReturnType<typeof setInterval> | null = null;
  private onMessage: ((data: any) => void) | null = null;
  private onError: ((error: ErrorEvent) => void) | null = null;

  constructor(private url: URL, private options?: WorkerOptions) {}

  start(): Worker {
    if (this.worker) return this.worker;

    this.worker = new Worker(this.url, this.options);

    this.worker.onerror = (e) => {
      console.error(`Worker ${this.id} error:`, e);
      this.onError?.(e);
      this.restart();
    };

    this.worker.onmessageerror = () => {
      console.error(`Worker ${this.id} message error`);
      this.restart();
    };

    // Heartbeat: detect dead workers
    this.heartbeat = setInterval(() => {
      if (this.worker) {
        this.worker.postMessage({ type: 'ping' });
      }
    }, 30_000);

    return this.worker;
  }

  terminate(): void {
    if (this.heartbeat) {
      clearInterval(this.heartbeat);
      this.heartbeat = null;
    }
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }

  private restartCount = 0;
  private restart(): void {
    this.restartCount++;
    if (this.restartCount > 3) {
      console.error(`Worker ${this.id} exceeded restart limit`);
      this.terminate();
      return;
    }

    this.terminate();
    setTimeout(() => {
      this.restartCount++;
      this.start();
    }, 1000 * Math.pow(2, this.restartCount));
  }

  // SolidJS integration
  registerCleanup(): void {
    onCleanup(() => this.terminate());
  }
}
```

### Worker Handle Registry

```typescript
class WorkerRegistry {
  private workers: Map<string, ManagedWorker> = new Map();
  private maxConcurrent = 3;

  register(id: string, url: URL, options?: WorkerOptions): ManagedWorker {
    if (this.workers.size >= this.maxConcurrent) {
      this.terminateOldest();
    }

    const worker = new ManagedWorker(url, options);
    worker.start();
    worker.registerCleanup();
    this.workers.set(id, worker);
    return worker;
  }

  get(id: string): ManagedWorker | undefined {
    return this.workers.get(id);
  }

  terminateOldest(): void {
    const oldest = Array.from(this.workers.entries())[0];
    if (oldest) {
      oldest[1].terminate();
      this.workers.delete(oldest[0]);
    }
  }

  terminateAll(): void {
    for (const [id, worker] of this.workers) {
      worker.terminate();
    }
    this.workers.clear();
  }
}
```

### Worker Message Protocol

```typescript
interface WorkerMessage<T = unknown> {
  id: string;
  type: 'request' | 'response' | 'error' | 'cancel' | 'ping' | 'pong';
  payload: T;
  transferables?: Transferable[];
}

// Request-response with timeout
function workerRequest<TReq, TRes>(
  worker: Worker,
  type: string,
  payload: TReq,
  timeoutMs = 5000
): Promise<TRes> {
  return new Promise((resolve, reject) => {
    const id = crypto.randomUUID();
    const timer = setTimeout(() => {
      reject(new Error(`Worker request timed out: ${type}`));
    }, timeoutMs);

    const handler = (e: MessageEvent<WorkerMessage>) => {
      if (e.data.id === id) {
        clearTimeout(timer);
        worker.removeEventListener('message', handler);
        if (e.data.type === 'error') {
          reject(new Error(e.data.payload));
        } else {
          resolve(e.data.payload as TRes);
        }
      }
    };

    worker.addEventListener('message', handler);
    worker.postMessage({ id, type, payload }, payload.transferables || []);
  });
}
```

## 2. BroadcastChannel Lifecycle

### BroadcastChannel for Cross-Tab Communication

Used for: search index sharing, settings sync, session validation, version conflict detection.

```typescript
class ManagedBroadcastChannel {
  private channel: BroadcastChannel | null = null;
  private listeners: Map<string, Set<Function>> = new Map();
  private id: string;

  constructor(private name: string) {
    this.id = `bc_${name}`;
    this.open();
  }

  open(): void {
    if (this.channel) return;

    this.channel = new BroadcastChannel(this.name);

    this.channel.onmessage = (e: MessageEvent) => {
      const { type, payload } = e.data;
      const handlers = this.listeners.get(type);
      if (handlers) {
        for (const handler of handlers) {
          handler(payload);
        }
      }
    };
  }

  post(type: string, payload: unknown): void {
    this.channel?.postMessage({ type, payload });
  }

  on(type: string, handler: Function): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(handler);

    // Return unsubscribe function
    return () => {
      this.listeners.get(type)?.delete(handler);
    };
  }

  close(): void {
    if (this.channel) {
      this.channel.close();
      this.channel = null;
    }
    this.listeners.clear();
  }

  registerCleanup(): void {
    onCleanup(() => this.close());
  }
}
```

### BroadcastChannel Usage by Component

| Component | Channel Name | Purpose | Lifecycle |
|---|---|---|---|
| Search Index | `ws_search_sync` | Share index across tabs | Open on search, close after 5min idle |
| Settings Manager | `ws_settings_sync` | Sync settings across tabs | Long-lived, close on page unload |
| Version History | `ws_version_conflict` | Detect edit conflicts | Open during edit session only |
| User Accounts | `ws_session_sync` | Sync auth state | Long-lived |
| Theme Engine | `ws_theme_sync` | Sync theme across tabs | Long-lived |

## 3. IntersectionObserver Lifecycle

### Observer Management

Used for: lazy loading, outline panel scroll tracking, infinite scroll, Graph View visibility.

```typescript
class ObserverManager {
  private observers: Map<string, IntersectionObserver> = new Map();

  create(
    id: string,
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ): IntersectionObserver {
    // Disconnect existing observer with same ID
    this.disconnect(id);

    const observer = new IntersectionObserver(callback, options);
    this.observers.set(id, observer);
    return observer;
  }

  disconnect(id: string): void {
    const observer = this.observers.get(id);
    if (observer) {
      observer.disconnect();
      this.observers.delete(id);
    }
  }

  disconnectAll(): void {
    for (const [id, observer] of this.observers) {
      observer.disconnect();
    }
    this.observers.clear();
  }

  registerCleanup(): void {
    onCleanup(() => this.disconnectAll());
  }
}
```

### Component-Specific Observer Patterns

**Outline Panel — scroll tracking:**
```typescript
function useOutlineTracking(headings: () => Heading[]) {
  const [activeId, setActiveId] = createSignal<string>('');

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -80% 0px', threshold: 0 }
    );

    for (const heading of headings()) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    onCleanup(() => observer.disconnect());
  });

  return activeId;
}
```

**Command Palette — search result visibility:**
```typescript
function useVirtualList(items: () => unknown[], containerRef: () => HTMLElement) {
  const [visibleRange, setVisibleRange] = createSignal({ start: 0, end: 20 });

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Update visible range based on intersecting items
      },
      { root: containerRef(), threshold: 0 }
    );

    onCleanup(() => observer.disconnect());
  });

  return visibleRange;
}
```

**Graph View — visibility-based rendering:**
```typescript
function useGraphVisibility(canvasRef: () => HTMLCanvasElement) {
  const [isVisible, setIsVisible] = createSignal(false);

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        // Pause/resume simulation based on visibility
      },
      { threshold: 0.1 }
    );

    observer.observe(canvasRef());
    onCleanup(() => observer.disconnect());
  });

  return isVisible;
}
```

### Observer Limits

| Observer | Max Observed Elements | Root Margin | Cleanup Trigger |
|---|---|---|---|
| Lazy images | 100 | 200px | Image load |
| Outline scroll | 50 | -20%/-80% | Route change |
| Infinite scroll | 1 | 0px | List end |
| Graph visibility | 1 | 0px | Unmount |
| Split Pane drag | 2 | 0px | Pane close |

## 4. ResizeObserver Lifecycle

### ResizeObserver Management

Used for: responsive layout, Split Pane, Graph View canvas sizing, TipTap editor height.

```typescript
class ResizeObserverManager {
  private observers: Map<string, ResizeObserver> = new Map();

  observe(
    id: string,
    element: HTMLElement,
    callback: ResizeObserverCallback,
    options?: ResizeObserverOptions
  ): void {
    this.unobserve(id);

    const observer = new ResizeObserver(callback);
    observer.observe(element, options);
    this.observers.set(id, observer);
  }

  unobserve(id: string): void {
    const observer = this.observers.get(id);
    if (observer) {
      observer.disconnect();
      this.observers.delete(id);
    }
  }

  disconnectAll(): void {
    for (const observer of this.observers.values()) {
      observer.disconnect();
    }
    this.observers.clear();
  }

  registerCleanup(): void {
    onCleanup(() => this.disconnectAll());
  }
}
```

### Component-Specific Resize Patterns

**Split Pane:**
```typescript
function useSplitPane(containerRef: () => HTMLElement) {
  const [dimensions, setDimensions] = createSignal({ width: 0, height: 0 });

  onMount(() => {
    const observer = new ResizeObserver(([entry]) => {
      setDimensions({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(containerRef());
    onCleanup(() => observer.disconnect());
  });

  return dimensions;
}
```

**TipTap Editor auto-resize:**
```typescript
function useAutoResizeEditor(editorRef: () => HTMLElement) {
  onMount(() => {
    const observer = new ResizeObserver(([entry]) => {
      const height = entry.contentRect.height;
      editorRef().style.height = `${Math.min(height, 800)}px`;
    });

    observer.observe(editorRef());
    onCleanup(() => observer.disconnect());
  });
}
```

### ResizeObserver Limits

| Usage | Debounce | Max Frequency | Cleanup |
|---|---|---|---|
| Split Pane | 16ms | 60fps | Pane close |
| Graph canvas | 100ms | 10fps | Unmount |
| TipTap editor | 50ms | 20fps | Editor destroy |
| Responsive layout | 200ms | 5fps | Route change |

## 5. AbortController for Fetch Cancellation

### Centralized Abort Management

```typescript
class AbortManager {
  private controllers: Map<string, AbortController> = new Map();

  create(id: string): AbortController {
    this.cancel(id);

    const controller = new AbortController();
    this.controllers.set(id, controller);
    return controller;
  }

  cancel(id: string): void {
    const existing = this.controllers.get(id);
    if (existing) {
      existing.abort();
      this.controllers.delete(id);
    }
  }

  cancelAll(): void {
    for (const controller of this.controllers.values()) {
      controller.abort();
    }
    this.controllers.clear();
  }

  registerCleanup(id: string): void {
    onCleanup(() => this.cancel(id));
  }
}
```

### Component-Specific Abort Patterns

**Command Palette — search abort:**
```typescript
function useCommandSearch() {
  const manager = new AbortManager();

  const search = async (query: string) => {
    const controller = manager.create('command-search');
    try {
      const res = await fetch(`/api/commands?q=${encodeURIComponent(query)}`, {
        signal: controller.signal,
      });
      return res.json();
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') {
        return []; // Previous search cancelled
      }
      throw e;
    }
  };

  onCleanup(() => manager.cancelAll());
  return search;
}
```

**Regex Search — incremental search abort:**
```typescript
function useRegexSearch() {
  const manager = new AbortManager();

  const search = async (pattern: string, scope: string) => {
    const controller = manager.create('regex-search');
    try {
      const res = await fetch(`/api/search/regex`, {
        method: 'POST',
        signal: controller.signal,
        body: JSON.stringify({ pattern, scope }),
      });
      return res.json();
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') {
        return { matches: [], truncated: false };
      }
      throw e;
    }
  };

  onCleanup(() => manager.cancelAll());
  return search;
}
```

**TipTap Editor — autosave abort:**
```typescript
function useAutosave(editor: () => Editor, pageId: string) {
  const manager = new AbortManager();

  createEffect(
    on(
      () => editor()?.getJSON(),
      debounce(async (json) => {
        const controller = manager.create(`autosave-${pageId}`);
        try {
          await fetch(`/api/pages/${pageId}`, {
            method: 'PUT',
            signal: controller.signal,
            body: JSON.stringify({ content: json }),
          });
        } catch (e) {
          if (e instanceof DOMException && e.name === 'AbortError') return;
          console.error('Autosave failed:', e);
        }
      }, 1000)
    )
  );

  onCleanup(() => manager.cancelAll());
}
```

**Route data loading abort:**
```typescript
function useRouteData<T>(loader: (signal: AbortSignal) => Promise<T>) {
  const [data, setData] = createSignal<T | undefined>();
  const controller = new AbortController();

  onCleanup(() => controller.abort());

  createEffect(() => {
    loader(controller.signal).then(setData);
  });

  return data;
}
```

### Abort Controller Best Practices

1. Always use `finally` blocks to clean up timeouts and intervals
2. Chain abort signals when multiple operations depend on the same lifecycle
3. Never swallow abort errors silently — log them for debugging
4. Use unique IDs for abort controllers to prevent cross-cancellation
5. Test abort behavior — verify resources are released when abort fires
6. Set explicit timeouts — don't rely on default timeouts which may be too long

### Abort Signal Composition

```typescript
function combineSignals(...signals: AbortSignal[]): AbortSignal {
  const controller = new AbortController();

  for (const signal of signals) {
    if (signal.aborted) {
      controller.abort(signal.reason);
      return controller.signal;
    }

    signal.addEventListener('abort', () => {
      controller.abort(signal.reason);
    }, { once: true });
  }

  return controller.signal;
}

// Usage: Abort on both component unmount AND timeout
const combined = combineSignals(
  componentSignal,
  AbortSignal.timeout(5000),
);
```

## 6. Event Listener Cleanup

### Cleanup Patterns

Every event listener registered must have a corresponding cleanup in `onCleanup()`:

```typescript
// Pattern 1: Direct cleanup
function Component() {
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
  };

  onMount(() => document.addEventListener('keydown', handler));
  onCleanup(() => document.removeEventListener('keydown', handler));
}

// Pattern 2: Helper utility
function addTrackedListener<K extends keyof DocumentEventMap>(
  element: EventTarget,
  event: K,
  handler: (e: DocumentEventMap[K]) => void,
  options?: AddEventListenerOptions
): void {
  element.addEventListener(event, handler as EventListener, options);
  onCleanup(() => {
    element.removeEventListener(event, handler as EventListener, options);
  });
}

// Pattern 3: AbortController-based cleanup
function addAbortableListener<K extends keyof DocumentEventMap>(
  element: EventTarget,
  event: K,
  handler: (e: DocumentEventMap[K]) => void
): AbortController {
  const controller = new AbortController();
  element.addEventListener(event, handler as EventListener, {
    signal: controller.signal,
  });
  return controller;
}
```

### Component-Specific Event Cleanup

**Command Palette — keyboard shortcut listener:**
```typescript
function useCommandPalette() {
  const [isOpen, setIsOpen] = createSignal(false);

  onMount(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen());
      }
      if (e.key === 'Escape' && isOpen()) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handler);
    onCleanup(() => document.removeEventListener('keydown', handler));
  });
}
```

**Graph View — drag/zoom listeners:**
```typescript
function useGraphInteraction(canvasRef: () => HTMLCanvasElement) {
  onMount(() => {
    const canvas = canvasRef();

    const onWheel = (e: WheelEvent) => { /* zoom */ };
    const onPointerDown = (e: PointerEvent) => { /* start drag */ };
    const onPointerMove = (e: PointerEvent) => { /* drag */ };
    const onPointerUp = (e: PointerEvent) => { /* end drag */ };

    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);

    onCleanup(() => {
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
    });
  });
}
```

**Split Pane — resize handle listeners:**
```typescript
function useSplitPaneDrag(handleRef: () => HTMLElement, onDrag: (delta: number) => void) {
  onMount(() => {
    const handle = handleRef();
    let startPos = 0;

    const onPointerDown = (e: PointerEvent) => {
      startPos = e.clientX;
      handle.setPointerCapture(e.pointerId);

      const onPointerMove = (e: PointerEvent) => {
        onDrag(e.clientX - startPos);
      };

      const onPointerUp = (e: PointerEvent) => {
        handle.releasePointerCapture(e.pointerId);
        handle.removeEventListener('pointermove', onPointerMove);
        handle.removeEventListener('pointerup', onPointerUp);
      };

      handle.addEventListener('pointermove', onPointerMove);
      handle.addEventListener('pointerup', onPointerUp);
    };

    handle.addEventListener('pointerdown', onPointerDown);
    onCleanup(() => handle.removeEventListener('pointerdown', onPointerDown));
  });
}
```

### Event Listener Audit Points

| Event | Element | Risk | Cleanup Required |
|---|---|---|---|
| `keydown` | `document` | Command palette, shortcuts | `onCleanup` remove |
| `scroll` | `window` | Outline panel, infinite scroll | `onCleanup` remove |
| `resize` | `window` | Responsive layout | `onCleanup` remove |
| `wheel` | canvas | Graph view zoom | `onCleanup` remove |
| `pointermove` | canvas/handle | Graph drag, split pane | Capture release + `onCleanup` |
| `popstate` | `window` | Navigation | `onCleanup` remove |
| `hashchange` | `window` | Anchor navigation | `onCleanup` remove |

### Development-Only Listener Tracking

```typescript
if (import.meta.env.DEV) {
  const activeListeners = new Map<string, number>();

  const originalAdd = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, ...args) {
    const key = `${this.constructor.name}:${type}`;
    activeListeners.set(key, (activeListeners.get(key) || 0) + 1);
    return originalAdd.call(this, type, ...args);
  };

  setInterval(() => {
    console.table(Object.fromEntries(activeListeners));
  }, 30_000);
}
```

## 7. Plugin API Resource Lifecycle

### Plugin Resource Handle Management

Plugins spawned via the Plugin API create resources that must be tracked and cleaned up:

```typescript
class PluginResourceHandle {
  id: string;
  type: 'worker' | 'channel' | 'observer' | 'timer' | 'cache';
  resource: any;
  createdAt: number;
  cleanup: () => void;
}

class PluginResourceTracker {
  private handles: Map<string, PluginResourceHandle[]> = new Map();

  track(pluginId: string, handle: PluginResourceHandle): void {
    if (!this.handles.has(pluginId)) {
      this.handles.set(pluginId, []);
    }
    this.handles.get(pluginId)!.push(handle);
  }

  cleanupPlugin(pluginId: string): void {
    const handles = this.handles.get(pluginId) || [];
    for (const handle of handles) {
      try {
        handle.cleanup();
      } catch (e) {
        console.error(`Failed to cleanup plugin resource ${handle.id}:`, e);
      }
    }
    this.handles.delete(pluginId);
  }

  cleanupAll(): void {
    for (const [pluginId] of this.handles) {
      this.cleanupPlugin(pluginId);
    }
  }
}
```

### Plugin Resource Limits

| Resource Type | Max Per Plugin | Max Total | Cleanup Trigger |
|---|---|---|---|
| Web Workers | 1 | 3 | Plugin disable |
| BroadcastChannels | 2 | 5 | Plugin disable |
| IntersectionObservers | 5 | 10 | Plugin disable |
| ResizeObservers | 2 | 5 | Plugin disable |
| Timers (setTimeout/setInterval) | 10 | 20 | Plugin disable |
| Event listeners | 20 | 50 | Plugin disable |
| Cache entries | 100 | 300 | LRU eviction |

## 8. Summary Handle Registry

### All Managed Handles

| Handle Type | Creation Pattern | Cleanup Pattern | SolidJS Integration |
|---|---|---|---|
| Web Worker | `new Worker()` | `worker.terminate()` | `onCleanup(() => worker.terminate())` |
| BroadcastChannel | `new BroadcastChannel()` | `channel.close()` | `onCleanup(() => channel.close())` |
| IntersectionObserver | `new IntersectionObserver()` | `observer.disconnect()` | `onCleanup(() => observer.disconnect())` |
| ResizeObserver | `new ResizeObserver()` | `observer.disconnect()` | `onCleanup(() => observer.disconnect())` |
| AbortController | `new AbortController()` | `controller.abort()` | `onCleanup(() => controller.abort())` |
| Event listeners | `addEventListener()` | `removeEventListener()` | `onCleanup(() => el.removeEventListener())` |
| Timers | `setTimeout/setInterval` | `clearTimeout/clearInterval` | `onCleanup(() => clearTimeout(id))` |
| Fetch streams | `fetch().then(r => r.body)` | `reader.cancel()` | `onCleanup(() => reader.cancel())` |
| Canvas context | `canvas.getContext('2d')` | `ctx.clearRect()` | `onCleanup(() => { ctx.clearRect(); })` |
| Plugin resources | Plugin API calls | `cleanupPlugin()` | `onCleanup(() => tracker.cleanupPlugin())` |

### Handle Lifecycle Testing

```typescript
// Automated handle leak detection
function detectHandleLeaks(
  componentName: string,
  renderFn: () => void,
  destroyFn: () => void
) {
  const getOpenHandles = () => ({
    workers: performance.getEntriesByName('worker').length,
    // Use DevTools API or custom tracking
  });

  const before = getOpenHandles();

  for (let i = 0; i < 50; i++) {
    renderFn();
    destroyFn();
  }

  const after = getOpenHandles();

  for (const [type, count] of Object.entries(after)) {
    const leaked = count - (before as any)[type];
    if (leaked > 0) {
      throw new Error(`Handle leak in ${componentName}: ${leaked} open ${type}`);
    }
  }
}
```
