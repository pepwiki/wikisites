---
document_id: BP-EDITOR-001
title: "Editor Component"
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
  IEEE 1016 compliant architectural specification for the editor component
  encompassing MDX editing and version history. Covers TipTap + SolidJS
  integration, Yjs CRDT for conflict resolution, MDX-specific extensions,
  diff rendering, git-backed version storage, and interface contracts for
  editor and diff subsystems.
yellow_paper_refs:
  - "YP-EDITOR-MDX-001"
  - "YP-EDITOR-VERSION-HISTORY-001"
---

# Blue Paper: Editor Component

**Document ID:** BP-EDITOR-001
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

The Editor Component provides browser-based MDX content authoring for both encyclopeptide.com (formal reference articles) and wikipept.com (collaborative wiki pages). It combines TipTap (ProseMirror-based) with SolidJS for the UI layer, Yjs CRDT for real-time collaborative conflict resolution, and a git-backed version history system with visual diff rendering. The editor runs as a SolidJS island within Astro's static shell.

### 1.2 System Scope

1. **MDXEditor**: TipTap-based WYSIWYG editor with MDX extensions (JSX components, frontmatter, math blocks, mermaid diagrams)
2. **VersionHistory**: Git-backed version storage via Forgejo, visual diff rendering (side-by-side, inline), branch/merge workflows, and attribution tracking
3. **CollaborationEngine**: Yjs CRDT for concurrent multi-user editing with conflict-free merge
4. **PreviewRenderer**: Live MDX preview via Astro SSR endpoint or client-side rendering

### 1.3 Context Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                        EDITOR COMPONENT                               │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                     MDXEditor                                 │   │
│  │                                                               │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │   │
│  │  │ TipTap       │  │ MDX          │  │ Collaboration    │  │   │
│  │  │ Core         │  │ Extensions   │  │ Engine (Yjs)     │  │   │
│  │  │ (ProseMirror)│  │              │  │                  │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘  │   │
│  │                                                               │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │   │
│  │  │ Toolbar      │  │ Frontmatter  │  │ Preview          │  │   │
│  │  │ (SolidJS)    │  │ Editor       │  │ Renderer         │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘  │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                              │                                       │
│                              ▼                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                   VersionHistory                              │   │
│  │                                                               │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │   │
│  │  │ Diff         │  │ Version      │  │ Branch           │  │   │
│  │  │ Renderer     │  │ Browser      │  │ Manager          │  │   │
│  │  │ (side/inline)│  │              │  │                  │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘  │   │
│  │                                                               │   │
│  │  ┌──────────────┐  ┌──────────────┐                         │   │
│  │  │ Git Backend  │  │ Attribution  │                         │   │
│  │  │ (Forgejo)    │  │ Tracker      │                         │   │
│  │  └──────────────┘  └──────────────┘                         │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
         │                        │                        │
         ▼                        ▼                        ▼
   ┌──────────┐            ┌──────────┐            ┌──────────┐
   │ Forgejo  │            │ Yjs      │            │ Astro    │
   │ Git API  │            │ WebSocket│            │ SSR      │
   └──────────┘            └──────────┘            └──────────┘
```

---

## BP-2: Design Decomposition

### 2.1 Component Hierarchy

```
packages/shared/src/editor/
├── editorSchemas.ts               (Zod schemas for editor state)
└── editorTypes.ts                 (TypeScript type definitions)

packages/wiki/src/components/editor/
├── MDXEditor.tsx                  (SolidJS TipTap wrapper)
├── EditorToolbar.tsx              (Formatting toolbar, SolidJS)
├── FrontmatterEditor.tsx          (YAML frontmatter form)
├── PreviewPane.tsx                (Live MDX preview)
├── CollaborationCursor.tsx        (Yjs awareness cursors)
├── VersionHistory/
│   ├── VersionBrowser.tsx         (Timeline sidebar)
│   ├── DiffViewer.tsx             (Side-by-side diff)
│   ├── InlineDiff.tsx             (Inline diff view)
│   └── BranchManager.tsx          (Branch creation/merge)
└── extensions/
    ├── mdxExtension.ts            (TipTap MDX node types)
    ├── jsxComponentNode.ts        (JSX component insertion)
    ├── mathBlock.ts               (KaTeX math blocks)
    ├── mermaidBlock.ts            (Mermaid diagram blocks)
    ├── frontmatterNode.ts         (YAML frontmatter node)
    └── calloutBlock.ts            (Admonition/callout blocks)

packages/wiki/src/lib/collaboration/
├── yjsProvider.ts                 (Yjs WebSocket provider)
├── awarenessManager.ts            (Cursor presence awareness)
└── conflictResolver.ts            (CRDT merge strategies)

packages/wiki/src/lib/version/
├── gitBackend.ts                  (Forgejo Git API client)
├── diffEngine.ts                  (Myers/patience diff computation)
├── diffRenderer.ts                (Diff → visual output)
└── attributionTracker.ts          (Author attribution chain)

packages/workers/src/routes/editor/
├── versions.ts                    (REST: /api/versions/*)
├── collaborate.ts                 (WebSocket: /ws/collaborate)
└── preview.ts                     (REST: /api/preview/*)
```

### 2.2 Component Descriptions

| Component | Module | Responsibility | Dependencies |
|-----------|--------|----------------|--------------|
| MDXEditor | MDXEditor.tsx | TipTap editor with SolidJS bindings | TipTap, SolidJS |
| EditorToolbar | EditorToolbar.tsx | Formatting controls (bold, italic, headings, etc.) | MDXEditor |
| FrontmatterEditor | FrontmatterEditor.tsx | YAML frontmatter editing form | MDXEditor |
| PreviewPane | PreviewPane.tsx | Live MDX preview rendering | Astro SSR or client MDX |
| CollaborationCursor | CollaborationCursor.tsx | Remote user cursor display | Yjs, Awareness |
| DiffViewer | DiffViewer.tsx | Side-by-side diff rendering | diffEngine |
| InlineDiff | InlineDiff.tsx | Inline diff rendering | diffEngine |
| gitBackend | gitBackend.ts | Forgejo Git operations (commit, diff, log) | Forgejo API |
| diffEngine | diffEngine.ts | Myers/patience diff computation | diff library |
| yjsProvider | yjsProvider.ts | Yjs document synchronization | Yjs, WebSocket |

---

## BP-3: Design Rationale

### 3.1 TipTap Over Alternatives

| Criterion | CodeMirror 6 | Monaco | ProseMirror | TipTap | Decision |
|-----------|-------------|--------|-------------|--------|----------|
| WYSIWYG mode | No | No | Possible | Native | TipTap |
| SolidJS integration | Manual | Manual | Manual | Via vanilla adapter | Tie |
| MDX/JSX support | Via LSP | Via LSP | Custom | Custom extensions | Tie |
| Collaborative editing | y-codemirror.next | y-monaco | y-prosemirror | y-prosemirror | Tie |
| Bundle size | ~150KB | ~2MB | ~200KB | ~180KB | CodeMirror |
| Learning curve | High | Medium | High | Low | TipTap |
| Extension ecosystem | Good | Limited | Good | Excellent | TipTap |

**Decision**: TipTap for WYSIWYG MDX editing. ProseMirror foundation provides solid CRDT integration via y-prosemirror. Extension ecosystem covers math, diagrams, callouts. Bundle size acceptable for wiki editing use case.

### 3.2 Yjs CRDT Over Operational Transforms

| Criterion | OT (ShareDB) | Yjs CRDT | Decision |
|-----------|-------------|----------|----------|
| Server dependency | Required | Optional (p2p capable) | Yjs — works offline |
| Conflict resolution | Central server | Peer-to-peer | Yjs — edge-friendly |
| Branching | Complex | Native (Y.Map) | Yjs — natural fit |
| Latency tolerance | Low | High | Yjs — edge network |
| Community momentum | Declining | Growing | Yjs |

**Decision**: Yjs CRDT for collaborative editing. Works without central server (peer-to-peer capable), natural branching via Y.Map, high latency tolerance suitable for Cloudflare edge network.

### 3.3 Git-backed Version Storage

| Criterion | D1 Snapshots | Git (Forgejo) | Hybrid | Decision |
|-----------|-------------|---------------|--------|----------|
| Diff support | Manual | Native | Both | Git |
| Branch/merge | Manual | Native | Git | Git |
| Storage cost | Low | Medium | Medium | Acceptable |
| Query speed | Fast | Medium | Fast (D1 cache) | Hybrid |
| Audit trail | Basic | Full history | Full | Git |

**Decision**: Git via Forgejo as source of truth for version history. D1 caches recent snapshots for fast reads. Forgejo provides native diff, branching, merge, and full audit trail.

### 3.4 Side-by-Side vs Inline Diff Default

| Criterion | Side-by-Side | Inline | Decision |
|-----------|-------------|--------|----------|
| Small changes | Excellent | Good | — |
| Large changes | Hard to compare | Excellent | — |
| Mobile | Poor | Good | — |
| Screen space | 2x width | 1x width | — |

**Decision**: Side-by-side default on desktop, inline on mobile (< 768px). User can toggle. Both modes use the same underlying diff computation.

---

## BP-4: Traceability

| Requirement ID | Component | Verification |
|----------------|-----------|--------------|
| FR-046 | MDXEditor | Create page with JSX component, verify render |
| FR-047 | MDXEditor.FrontmatterEditor | Edit frontmatter fields, verify persistence |
| FR-048 | MDXEditor.PreviewPane | Live preview updates within 200ms of edit |
| FR-049 | CollaborationEngine.yjsProvider | Two users edit same page, verify merge |
| FR-050 | CollaborationEngine.awarenessManager | Remote cursor visible to other users |
| FR-051 | VersionHistory.gitBackend | Commit page, verify Forgejo commit created |
| FR-052 | VersionHistory.diffEngine | Compute diff, verify correctness (Myers test vectors) |
| FR-053 | VersionHistory.DiffViewer | Render side-by-side diff, verify visual accuracy |
| FR-054 | VersionHistory.InlineDiff | Render inline diff, verify visual accuracy |
| FR-055 | VersionHistory.attributionTracker | Verify author chain is完整 for merged content |
| FR-056 | MDXEditor.mathBlock | Insert KaTeX math, verify rendering |
| FR-057 | MDXEditor.mermaidBlock | Insert Mermaid diagram, verify rendering |

---

## BP-5: Interface Design

### 5.1 IF-EDITOR-001: Editor Interface

```typescript
interface EditorDocument {
  id: string;                       // Page/entry ID
  title: string;
  content: string;                  // MDX source
  frontmatter: FrontmatterData;
  format: "mdx" | "md";
  createdAt: string;
  updatedAt: string;
  authorId: string;
  authorName: string;
}

interface FrontmatterData {
  title: string;
  description?: string;
  tags?: string[];
  category?: string;
  difficulty?: number;              // 1–5
  language?: string;                // ISO 639-1
  status?: "draft" | "review" | "published";
  customFields?: Record<string, unknown>;
}

interface EditorState {
  document: EditorDocument;
  isDirty: boolean;                 // Unsaved changes
  isCollaborating: boolean;
  collaborators: Collaborator[];
  cursor: EditorCursor;
  selection: EditorSelection | null;
}

interface Collaborator {
  userId: string;
  name: string;
  color: string;                    // Hex color for cursor
  cursor: EditorCursor | null;
  lastActive: string;
}

interface EditorCursor {
  position: number;
  selection?: {
    anchor: number;
    head: number;
  };
}

interface EditorSelection {
  from: number;
  to: number;
  content: string;                  // Selected text
}

interface SaveDocumentRequest {
  id: string;
  content: string;
  frontmatter: FrontmatterData;
  commitMessage?: string;           // For version history
  branch?: string;                  // Target branch
}

interface SaveDocumentResponse {
  success: boolean;
  version: string;                  // Git commit SHA
  conflict?: ConflictInfo;          // If concurrent edit detected
}

interface ConflictInfo {
  remoteVersion: string;
  remoteContent: string;
  remoteAuthor: string;
  remoteUpdatedAt: string;
  resolution: "auto" | "manual";
}

interface InsertComponentRequest {
  componentType: "jsx" | "math" | "mermaid" | "callout" | "image";
  props: Record<string, unknown>;
  position?: number;                // Cursor position, default: current
}

interface PreviewRequest {
  content: string;
  frontmatter: FrontmatterData;
  format: "mdx" | "md";
}

interface PreviewResponse {
  html: string;
  errors: PreviewError[];
  renderTimeMs: number;
}

interface PreviewError {
  line: number;
  column: number;
  message: string;
  severity: "error" | "warning";
}
```

### 5.2 IF-DIFF-001: Diff Interface

```typescript
interface DiffRequest {
  oldContent: string;
  newContent: string;
  algorithm?: "myers" | "patience" | "lcs";
  context?: number;                 // Lines of context, default: 3
}

interface DiffResponse {
  hunks: DiffHunk[];
  stats: DiffStats;
  algorithm: string;
}

interface DiffHunk {
  oldStart: number;
  oldLines: number;
  newStart: number;
  newLines: number;
  lines: DiffLine[];
}

interface DiffLine {
  type: "equal" | "insert" | "delete";
  content: string;
  oldLineNumber?: number;
  newLineNumber?: number;
}

interface DiffStats {
  totalLines: number;
  additions: number;
  deletions: number;
  hunks: number;
}

interface VersionInfo {
  sha: string;                      // Git commit SHA
  message: string;
  author: string;
  authorEmail: string;
  date: string;                     // ISO 8601
  parents: string[];                // Parent commit SHAs
}

interface VersionListRequest {
  pageId: string;
  branch?: string;                  // Default: main
  limit?: number;                   // Default: 50
  offset?: number;
}

interface VersionListResponse {
  versions: VersionInfo[];
  total: number;
  hasMore: boolean;
  currentBranch: string;
  branches: string[];
}

interface VersionDiffRequest {
  pageId: string;
  fromSha: string;
  toSha: string;
}

interface VersionDiffResponse {
  diff: DiffResponse;
  from: VersionInfo;
  to: VersionInfo;
}

interface BranchCreateRequest {
  pageId: string;
  branchName: string;               // e.g. "feature/new-section"
  fromBranch?: string;              // Default: main
}

interface MergeRequest {
  pageId: string;
  sourceBranch: string;
  targetBranch: string;
  commitMessage?: string;
  strategy?: "merge" | "squash" | "rebase";
}

interface MergeResponse {
  success: boolean;
  mergeSha?: string;
  conflicts?: MergeConflict[];
}

interface MergeConflict {
  path: string;
  ours: string;
  theirs: string;
  base: string;
}

interface AttributionEntry {
  userId: string;
  userName: string;
  contributedLines: number;
  dateRange: [string, string];      // ISO 8601 range
  sections: string[];               // Sections contributed to
}
```

---

## BP-6: Data Design

### 6.1 Yjs Document Structure

```typescript
// Yjs document shared between collaborators
interface YjsEditorDoc {
  // Main content
  content: Y.XmlFragment;           // ProseMirror XML document
  // Frontmatter as structured data
  frontmatter: Y.Map<unknown>;      // Key-value pairs
  // Metadata
  metadata: Y.Map<{
    title: string;
    format: "mdx" | "md";
    lastSavedBy: string;
    lastSavedAt: string;
  }>;
}
```

### 6.2 Forgejo Git Storage Model

```
repositories/
└── wiki-content/
    ├── pages/
    │   ├── {pageId}/
    │   │   ├── main/
    │   │   │   ├── index.mdx      (Current main branch content)
    │   │   │   └── frontmatter.json
    │   │   ├── branches/
    │   │   │   ├── feature-xxx/   (Branch working copies)
    │   │   │   └── ...
    │   │   └── ...
    │   └── ...
    └── ...
```

### 6.3 D1 Version Cache Schema

```sql
CREATE TABLE version_cache (
  page_id TEXT NOT NULL,
  sha TEXT NOT NULL,
  branch TEXT NOT NULL DEFAULT 'main',
  content_hash TEXT NOT NULL,       -- SHA-256 of content
  content_preview TEXT,             -- First 500 chars
  author TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (page_id, sha)
);

CREATE INDEX idx_version_cache_page ON version_cache(page_id);
CREATE INDEX idx_version_cache_branch ON version_cache(page_id, branch);

CREATE TABLE diff_cache (
  page_id TEXT NOT NULL,
  from_sha TEXT NOT NULL,
  to_sha TEXT NOT NULL,
  diff_json TEXT NOT NULL,          -- Serialized DiffResponse
  computed_at TEXT NOT NULL,
  PRIMARY KEY (page_id, from_sha, to_sha)
);
```

---

## BP-7: Component Design

### 7.1 Collaborative Editing Flow

```
User A           MDXEditor        YjsProvider       User B
  │                  │                │                │
  │ type "Hello"     │                │                │
  │─────────────────>│                │                │
  │                  │ Y.doc.apply()  │                │
  │                  │───────────────>│                │
  │                  │                │ WS broadcast   │
  │                  │                │───────────────>│
  │                  │                │                │ Y.doc.apply()
  │                  │                │                │
  │                  │                │  "Hello" appears│
  │                  │                │                │<─────────────
  │                  │                │                │
  │ cursor position  │                │                │
  │ update           │                │                │
  │─────────────────>│ awareness.set()│                │
  │                  │───────────────>│ WS awareness   │
  │                  │                │───────────────>│
  │                  │                │                │ cursor visible
  │                  │                │                │
```

### 7.2 Version History Flow

```
User            VersionBrowser    DiffEngine        Forgejo
  │                  │                │                │
  │ click "History"  │                │                │
  │─────────────────>│                │                │
  │                  │ GET /versions  │                │
  │                  │───────────────────────────────>│
  │                  │ version list   │                │
  │                  │<───────────────────────────────│
  │                  │                │                │
  │ select two       │                │                │
  │ versions         │                │                │
  │─────────────────>│                │                │
  │                  │ computeDiff()  │                │
  │                  │───────────────>│                │
  │                  │                │ git diff       │
  │                  │                │───────────────>│
  │                  │                │ diff output    │
  │                  │                │<───────────────│
  │                  │ DiffResponse   │                │
  │                  │<───────────────│                │
  │                  │                │                │
  │ render diff      │                │                │
  │<─────────────────│                │                │
```

### 7.3 Merge Conflict Resolution Flow

```
User            BranchManager    MergeResolver     Forgejo
  │                  │                │                │
  │ click "Merge"    │                │                │
  │─────────────────>│                │                │
  │                  │ attemptMerge() │                │
  │                  │───────────────>│                │
  │                  │                │ git merge      │
  │                  │                │───────────────>│
  │                  │                │ CONFLICT       │
  │                  │                │<───────────────│
  │                  │ MergeConflict[]│                │
  │                  │<───────────────│                │
  │                  │                │                │
  │ show conflicts   │                │                │
  │<─────────────────│                │                │
  │                  │                │                │
  │ resolve conflict │                │                │
  │─────────────────>│                │                │
  │                  │ commit resolve │                │
  │                  │───────────────>│                │
  │                  │                │ git commit     │
  │                  │                │───────────────>│
  │                  │                │ success        │
  │                  │                │<───────────────│
  │ merge complete   │                │                │
  │<─────────────────│                │                │
```

---

## BP-8: Deployment Design

### 8.1 Worker Route Topology

```
┌─────────────────────────────────────────────────────────┐
│                  CLOUDFLARE WORKERS                       │
│                                                           │
│  Routes:                                                  │
│  ├── /api/versions/:pageId        → VersionHistory        │
│  ├── /api/versions/:pageId/diff   → DiffEngine            │
│  ├── /api/versions/:pageId/merge  → MergeResolver         │
│  ├── /api/versions/:pageId/branch → BranchManager         │
│  ├── /api/preview                 → PreviewRenderer       │
│  │                                                        │
│  WebSocket:                                               │
│  ├── /ws/collaborate/:pageId     → Yjs WebSocket         │
│  │   (routed to Durable Object per page)                  │
│  │                                                        │
│  D1 Bindings:                                             │
│  ├── WIKISITES_DB (version_cache, diff_cache)            │
│                                                           │
│  Durable Object Bindings:                                 │
│  ├── YJS_DOCUMENT (per-page collaboration state)         │
│                                                           │
│  External:                                                │
│  ├── Forgejo Git API (wiki-content repository)           │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### 8.2 Resource Requirements

| Resource | Editor Sessions | Version History |
|----------|----------------|-----------------|
| Durable Objects | 1 per active page | N/A |
| D1 reads/day | N/A | ~5,000 (cache hits) |
| D1 writes/day | N/A | ~500 (new versions) |
| Forgejo API calls/day | N/A | ~1,000 (commits, diffs) |
| WebSocket connections | ~50 concurrent | N/A |
| Latency (p95) | <50ms (CRDT apply) | <200ms (diff compute) |

---

## BP-9: Formal Verification

| Property ID | Property Description | Proof Method | Status |
|-------------|---------------------|--------------|--------|
| FV-EDITOR-001 | Yjs CRDT merge is commutative | Property test: merge(a, b) = merge(b, a) | Pending |
| FV-EDITOR-002 | Yjs CRDT merge is associative | Property test: merge(merge(a, b), c) = merge(a, merge(b, c)) | Pending |
| FV-EDITOR-003 | Diff algorithm is symmetric | Property test: diff(a, b).deletions = diff(b, a).insertions | Pending |
| FV-EDITOR-004 | Merge conflict detection is complete | Property test: conflicting edits → conflict reported | Pending |
| FV-EDITOR-005 | Version history is append-only | Property test: cannot modify committed version | Pending |
| FV-EDITOR-006 | Preview rendering is deterministic | Property test: same input → same HTML | Pending |
| FV-EDITOR-007 | Frontmatter validation rejects invalid YAML | Property test: invalid YAML → parse error | Pending |
| FV-EDITOR-008 | Attribution chain is完整 after merge | Property test: all lines traceable to author | Pending |

---

## BP-10: HAL Specification

```typescript
interface EditorHAL {
  // Document operations
  documents: {
    get(id: string): Promise<EditorDocument>;
    save(req: SaveDocumentRequest): Promise<SaveDocumentResponse>;
    preview(req: PreviewRequest): Promise<PreviewResponse>;
    insertComponent(req: InsertComponentRequest): void;
  };

  // Collaboration
  collaboration: {
    connect(pageId: string): YjsWebSocketProvider;
    disconnect(pageId: string): void;
    getCollaborators(pageId: string): Collaborator[];
  };

  // Version history
  versions: {
    list(pageId: string, opts?: VersionListRequest): Promise<VersionListResponse>;
    diff(req: VersionDiffRequest): Promise<VersionDiffResponse>;
    createBranch(req: BranchCreateRequest): Promise<void>;
    merge(req: MergeRequest): Promise<MergeResponse>;
    getAttribution(pageId: string): Promise<AttributionEntry[]>;
  };

  // Diff engine
  diff: {
    compute(req: DiffRequest): Promise<DiffResponse>;
    computeHunks(oldLines: string[], newLines: string[], algorithm: string): DiffHunk[];
  };
}
```

---

## BP-11: Compliance Matrix

| Standard | Requirement | Component | Status |
|----------|------------|-----------|--------|
| IEEE 1016-2024 | Software design description | This document | Compliant |
| MDX Specification | MDX syntax conformance | MDXEditor | Target |
| Yjs CRDT | Conflict-free merge properties | CollaborationEngine | Target |
| Myers Diff Algorithm | Diff computation correctness | DiffEngine | Target |
| WebSockets (RFC 6455) | Real-time collaboration transport | YjsProvider | Target |
| Core Web Vitals | Editor interaction latency <100ms | MDXEditor | Target |

---

## BP-12: Quality Checklist

### 12.1 Component Completeness

- [ ] MDXEditor: TipTap + SolidJS + MDX extensions + toolbar + frontmatter editor
- [ ] CollaborationEngine: Yjs provider + awareness manager + conflict resolver
- [ ] VersionHistory: git backend + diff engine + diff renderer + branch manager + attribution tracker

### 12.2 Interface Completeness

- [ ] IF-EDITOR-001: EditorDocument, EditorState, SaveDocumentRequest/Response, PreviewRequest/Response
- [ ] IF-DIFF-001: DiffRequest/Response, DiffHunk, DiffLine, VersionInfo, VersionListRequest/Response, MergeRequest/Response

### 12.3 Collaboration

- [ ] Real-time merge is conflict-free (Yjs CRDT guarantees)
- [ ] Cursor presence is visible to all collaborators
- [ ] Offline edits merge correctly when reconnected
- [ ] Maximum 10 concurrent collaborators per document

### 12.4 Version History

- [ ] Every save creates a git commit on Forgejo
- [ ] Diff computation uses Myers algorithm (patience for large changes)
- [ ] Side-by-side and inline diff views render correctly
- [ ] Merge conflicts are detected and presented for manual resolution
- [ ] Attribution tracks per-line authorship across merges

### 12.5 Performance

- [ ] Editor keystroke → visible < 16ms (60fps)
- [ ] Collaboration message propagation < 100ms (p95)
- [ ] Diff computation < 200ms for 10,000-line documents
- [ ] Version history list < 300ms (p95)
- [ ] Preview render < 500ms (p95)

---

**End of Document**
**Document Status:** DRAFT — Pending architecture review
**Owner:** Wikisites Architecture Team
