# Handle Lifecycle Management

## Overview

Handle management ensures no resource leaks occur across database connections, network streams, WebSocket connections, event listeners, and abort controllers. Every handle acquired must have a deterministic release path, enforced by code patterns and verified by testing.

## 1. Database Connection Handling (D1)

### D1 Connection Model

Cloudflare D1 is serverless with no persistent connections. Each worker invocation gets a fresh database handle. The management concerns are:

- **Prepared statement reuse**: Statements can be reused across calls within a single request
- **Connection pooling**: Not applicable (D1 handles this internally)
- **Query result memory**: Large result sets must be streamed, not buffered

### Query Execution Pattern

```typescript
// Correct: Scoped query execution with result streaming
async function queryPages(db: D1Database, wikiId: string, limit: number): Promise<Page[]> {
  const stmt = db.prepare(
    'SELECT id, title, slug, updated_at FROM pages WHERE wiki_id = ? ORDER BY updated_at DESC LIMIT ?'
  );
  
  // D1 binds are safe; no SQL injection risk
  const results = await stmt.bind(wikiId, limit).all<Page>();
  
  // Process results immediately; don't hold references
  return results.results.map(normalizePage);
}

// Correct: Batch operations for multiple queries
async function getWikiWithPages(db: D1Database, wikiId: string) {
  const batch = db.batch([
    db.prepare('SELECT * FROM wikis WHERE id = ?').bind(wikiId),
    db.prepare('SELECT * FROM pages WHERE wiki_id = ?').bind(wikiId),
    db.prepare('SELECT * FROM categories WHERE wiki_id = ?').bind(wikiId),
  ]);
  
  const [wiki, pages, categories] = await batch;
  
  // Build and return complete object; don't store raw D1 results
  return {
    wiki: wiki.first<Wiki>(),
    pages: pages.results.map(normalizePage),
    categories: categories.results.map(normalizeCategory),
  };
}
```

### D1 Error Handling

```typescript
async function safeQuery<T>(db: D1Database, query: string, ...args: unknown[]): Promise<T[]> {
  try {
    const stmt = db.prepare(query);
    const result = await stmt.bind(...args).all<T>();
    return result.results;
  } catch (error) {
    // D1 errors are retryable on 500/503
    if (isRetryableError(error)) {
      return retryWithBackoff(() => safeQuery(db, query, ...args));
    }
    
    // Log but don't expose internal error details
    console.error('D1 query failed:', { query: sanitizeQuery(query), error: error.message });
    throw new DatabaseError('Query failed', { cause: error });
  }
}

function sanitizeQuery(query: string): string {
  // Remove parameter values from query for logging
  return query.replace(/\?/g, '<param>');
}
```

### D1 Statement Cleanup

Within a single worker invocation, D1 statements are garbage-collected automatically. The concern is holding references unnecessarily:

```typescript
// Bad: Holding statement reference
const stmt = db.prepare('SELECT * FROM pages WHERE id = ?');
// ... hundreds of lines later ...
await stmt.bind(pageId).first(); // Statement reference held unnecessarily

// Good: Inline statement usage
const page = await db.prepare('SELECT * FROM pages WHERE id = ?').bind(pageId).first();
```

### D1 Rate Limits and Quotas

| Limit | Free Tier | Paid Tier | Handling Strategy |
|---|---|---|---|
| Rows read per day | 5M | 25M | Monitor via analytics; implement read caching |
| Rows written per day | 100K | 50M | Batch writes; use queue for non-critical writes |
| Storage per database | 5GB | 10GB | Implement soft deletes; archive old data |
| Max batch size | 50 statements | 50 statements | Split larger operations into chunks |
| Query timeout | 30 seconds | 30 seconds | Set client-side timeout of 25 seconds |

## 2. R2 Upload/Download Streams

### Stream Lifecycle

Every R2 stream must be explicitly consumed or cancelled. Abandoned streams consume worker resources until they time out.

### Upload Pattern

```typescript
async function uploadToR2(
  bucket: R2Bucket,
  key: string,
  body: ReadableStream | ArrayBuffer,
  options?: R2PutOptions
): Promise<R2Object> {
  // Wrap in AbortController for timeout
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);
  
  try {
    const object = await bucket.put(key, body, {
      ...options,
      signal: controller.signal,
    });
    
    return object;
  } finally {
    clearTimeout(timeout);
  }
}

// Streaming upload for large files
async function uploadLargeFile(
  bucket: R2Bucket,
  key: string,
  file: File
): Promise<R2Object> {
  const stream = file.stream();
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      
      // Memory check: if accumulated chunks exceed 50MB, use multipart
      const totalSize = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
      if (totalSize > 50 * 1024 * 1024) {
        return uploadMultipart(bucket, key, chunks, file.type);
      }
    }
    
    // Combine chunks into single upload
    const combined = new Uint8Array(chunks.length);
    let offset = 0;
    for (const chunk of chunks) {
      combined.set(chunk, offset);
      offset += chunk.length;
    }
    
    return bucket.put(key, combined, { httpMetadata: { contentType: file.type } });
  } finally {
    reader.releaseLock();
  }
}
```

### Download Pattern

```typescript
async function downloadFromR2(
  bucket: R2Bucket,
  key: string,
  options?: R2GetOptions
): Promise<{ body: ReadableStream; metadata: R2Object }> {
  const object = await bucket.get(key, options);
  
  if (!object) {
    throw new NotFoundError(`Object not found: ${key}`);
  }
  
  // The body is a ReadableStream that MUST be consumed
  // Return it to the caller who is responsible for consumption
  return {
    body: object.body,
    metadata: object,
  };
}

// Helper: Consume stream to completion
async function streamToResponse(
  bucket: R2Bucket,
  key: string
): Promise<Response> {
  const { body, metadata } = await downloadFromR2(bucket, key);
  
  return new Response(body, {
    headers: {
      'Content-Type': metadata.httpMetadata?.contentType || 'application/octet-stream',
      'Content-Length': metadata.size.toString(),
      'ETag': metadata.httpEtag,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

// Helper: Read stream to buffer (for small files)
async function streamToBuffer(bucket: R2Bucket, key: string): Promise<ArrayBuffer> {
  const { body, metadata } = await downloadFromR2(bucket, key);
  
  // Use Response to consume the stream
  const response = new Response(body);
  return response.arrayBuffer();
}
```

### R2 Stream Error Recovery

```typescript
async function resilientDownload(
  bucket: R2Bucket,
  key: string,
  maxRetries: number = 3
): Promise<ArrayBuffer> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const buffer = await streamToBuffer(bucket, key);
      return buffer;
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < maxRetries) {
        // Exponential backoff: 100ms, 200ms, 400ms
        await delay(100 * Math.pow(2, attempt - 1));
      }
    }
  }
  
  throw lastError!;
}
```

### R2 Cleanup Patterns

```typescript
// Batch delete with pagination
async function cleanupR2Prefix(
  bucket: R2Bucket,
  prefix: string,
  maxAge: number
): Promise<number> {
  const cutoff = Date.now() - maxAge;
  let deleted = 0;
  let cursor: string | undefined;
  
  do {
    const listing = await bucket.list({ prefix, cursor, limit: 100 });
    
    const toDelete = listing.objects.filter(
      obj => obj.uploaded.getTime() < cutoff
    );
    
    if (toDelete.length > 0) {
      await bucket.delete(toDelete.map(obj => obj.key));
      deleted += toDelete.length;
    }
    
    cursor = listing.truncated ? listing.cursor : undefined;
  } while (cursor);
  
  return deleted;
}
```

## 3. WebSocket Connections

### WebSocket Lifecycle

KP Wikisites uses WebSockets for real-time collaboration features (future phase). Current implementation uses polling. When WebSocket support is added:

```typescript
class WebSocketManager {
  private connections: Map<string, WebSocket> = new Map();
  private heartbeatIntervals: Map<string, NodeJS.Timeout> = new Map();
  
  connect(url: string, wikiId: string): WebSocket {
    const ws = new WebSocket(url);
    
    this.connections.set(wikiId, ws);
    
    // Setup heartbeat to detect dead connections
    const heartbeat = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.ping();
      }
    }, 30_000);
    
    this.heartbeatIntervals.set(wikiId, heartbeat);
    
    ws.onclose = () => {
      this.cleanup(wikiId);
      // Auto-reconnect with backoff
      this.scheduleReconnect(url, wikiId);
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      ws.close();
    };
    
    return ws;
  }
  
  private cleanup(wikiId: string) {
    const ws = this.connections.get(wikiId);
    if (ws) {
      ws.close(1000, 'Cleanup');
      this.connections.delete(wikiId);
    }
    
    const heartbeat = this.heartbeatIntervals.get(wikiId);
    if (heartbeat) {
      clearInterval(heartbeat);
      this.heartbeatIntervals.delete(wikiId);
    }
  }
  
  disposeAll() {
    for (const wikiId of this.connections.keys()) {
      this.cleanup(wikiId);
    }
  }
}
```

### Connection Limits

| Limit | Value | Strategy |
|---|---|---|
| Max concurrent per client | 5 | Queue additional connections |
| Max concurrent per wiki | 100 | Implement connection multiplexing |
| Idle timeout | 60 seconds | Send periodic pings; close if no pong |
| Max message size | 64KB | Reject oversized messages |
| Reconnect attempts | 5 | Exponential backoff; then fallback to polling |

## 4. Event Listener Cleanup

### Cleanup Patterns

Every event listener registered must have a corresponding cleanup in `onCleanup()`:

```typescript
// Pattern 1: Direct cleanup
function Component() {
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };
  
  onMount(() => {
    document.addEventListener('keydown', handler);
  });
  
  onCleanup(() => {
    document.removeEventListener('keydown', handler);
  });
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
  // Caller calls controller.abort() when done
}
```

### Common Event Listener Audit Points

| Event | Element | Risk | Cleanup Required |
|---|---|---|---|
| `scroll` | `window` | Continuous firing; memory leak | `onCleanup` remove |
| `resize` | `window` | Continuous firing; memory leak | `onCleanup` remove |
| `keydown` | `document` | Stack accumulation | `onCleanup` remove |
| `mousemove` | `document` | Performance degradation | Debounce + `onCleanup` |
| `popstate` | `window` | Navigation leaks | `onCleanup` remove |
| `hashchange` | `window` | Navigation leaks | `onCleanup` remove |
| `beforeunload` | `window` | Registration accumulation | Single registration; never remove |

### Event Listener Inventory

Track all registered event listeners in development:

```typescript
// Development-only listener tracking
const activeListeners = new Map<string, number>();

if (import.meta.env.DEV) {
  const originalAdd = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, ...args) {
    const key = `${this.constructor.name}:${type}`;
    activeListeners.set(key, (activeListeners.get(key) || 0) + 1);
    return originalAdd.call(this, type, ...args);
  };
  
  // Periodic audit
  setInterval(() => {
    console.table(Object.fromEntries(activeListeners));
  }, 30_000);
}
```

## 5. Abort Controller Patterns

### Centralized Abort Management

```typescript
class AbortManager {
  private controllers: Map<string, AbortController> = new Map();
  
  create(id: string): AbortController {
    // Cancel existing controller with same ID
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
    for (const [id, controller] of this.controllers) {
      controller.abort();
    }
    this.controllers.clear();
  }
  
  // Cleanup on component disposal
  registerCleanup(id: string): void {
    onCleanup(() => this.cancel(id));
  }
}
```

### Usage Patterns

**Fetch with abort:**
```typescript
async function fetchWithAbort(url: string, signal?: AbortSignal): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  
  try {
    const response = await fetch(url, {
      signal: signal ? AbortSignal.any([signal, controller.signal]) : controller.signal,
    });
    return response;
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      throw new TimeoutError(`Request timed out: ${url}`);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
```

**Search with abort:**
```typescript
function createSearchWithAbort() {
  const manager = new AbortManager();
  
  return async function search(query: string): Promise<SearchResults> {
    const controller = manager.create('search');
    
    try {
      const results = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
        signal: controller.signal,
      });
      return results.json();
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        // Previous search was cancelled; this is expected
        return { results: [], total: 0 };
      }
      throw error;
    }
  };
}
```

**Route transition with abort:**
```typescript
function useRouteData<T>(loader: (signal: AbortSignal) => Promise<T>): () => T | undefined {
  const [data, setData] = createSignal<T | undefined>();
  const controller = new AbortController();
  
  onCleanup(() => controller.abort());
  
  createEffect(() => {
    // Re-runs on route change; previous fetch is aborted
    loader(controller.signal).then(setData);
  });
  
  return data;
}
```

### Abort Controller Best Practices

1. **Always use `finally` blocks** to clean up timeouts and intervals
2. **Chain abort signals** when multiple operations depend on the same lifecycle
3. **Never swallow abort errors silently** — log them for debugging
4. **Use unique IDs** for abort controllers to prevent cross-cancellation
5. **Test abort behavior** — verify resources are released when abort fires
6. **Set explicit timeouts** — don't rely on default timeouts which may be too long

### Abort Signal Composition

```typescript
// Combine multiple abort signals
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
  componentSignal,  // from onCleanup
  AbortSignal.timeout(5000),  // 5 second timeout
);
```
