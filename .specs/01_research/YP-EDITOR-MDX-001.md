---
document_id: YP-EDITOR-MDX-001
title: "Web-based MDX Editor for Educational Platforms"
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
  Specification of the web-based MDX editor including editor engines (CodeMirror 6,
  Monaco, ProseMirror, TipTap), MDX-specific editing (JSX component insertion,
  frontmatter), preview rendering (Astro SSR vs client-side), conflict resolution
  (concurrent editing), and performance (large documents). Defines the content
  authoring framework for both sites.
test_vector_ref: "test_vectors/test_vectors_social_editor_ext.toml"
domain_constraint_ref: "domain_constraints/domain_constraints_social.toml"
bibliography_ref: "bibliography.md"
---

# Yellow Paper: Web-based MDX Editor for Educational Platforms

**Document ID:** YP-EDITOR-MDX-001
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

This Yellow Paper specifies the web-based MDX editor for oligopeptide educational platforms on encyclopeptide.com and wikipept.com. It establishes authoritative architecture decisions for browser-based content authoring, including editor engine selection, MDX-specific features, preview rendering, conflict resolution, and performance optimization.

### 1.2 Scope

Covers editor engine comparison (CodeMirror 6, Monaco, ProseMirror, TipTap), MDX-specific editing (JSX component insertion, frontmatter editing, markdown formatting), preview rendering (Astro SSR vs client-side), conflict resolution (concurrent editing, version control), and performance optimization (large documents, syntax highlighting). Does not cover version history (reserved for YP-EDITOR-VERSION-HISTORY-001), plugin-based editor extensions (reserved for YP-EXT-PLUGIN-API-001), or editor themes (reserved for YP-EXT-THEMES-001).

### 1.3 Audience

Frontend developers implementing the editor, content authors testing the interface, and architects reviewing technology decisions.

### 1.4 Normative References

- CodeMirror 6 Documentation (https://codemirror.net)
- Monaco Editor Documentation (https://microsoft.github.io/monaco-editor)
- ProseMirror Documentation (https://prosemirror.net)
- TipTap Documentation (https://tiptap.dev)
- MDX Specification (https://mdxjs.com)
- Astro Documentation (https://docs.astro.build)

### 1.5 Definitions and Acronyms

| Term | Definition                                         |
| ---- | -------------------------------------------------- |
| MDX  | Markdown with JSX components                       |
| JSX  | JavaScript XML syntax extension                    |
| WYSIWYG | What You See Is What You Get                    |
| AST  | Abstract Syntax Tree                               |
| LSP  | Language Server Protocol                           |

---

## 2. Executive Summary

### 2.1 Problem Statement

Oligopeptide educational websites require a web-based editor that enables content authors to create and edit MDX articles with JSX components, scientific notation, and interactive elements. The editor must provide real-time preview, handle large documents efficiently, support collaborative editing, and integrate with the existing Astro build pipeline.

### 2.2 Scope of Solution

This Yellow Paper defines:

1. **Editor Engine Selection**: Comparison and recommendation
2. **MDX-Specific Editing**: JSX components, frontmatter, markdown
3. **Preview Rendering**: Real-time preview options
4. **Conflict Resolution**: Concurrent editing strategies
5. **Performance Optimization**: Large document handling

### 2.3 Key Assumptions

- Content authored in MDX format
- SolidJS used for editor UI components
- TypeScript strict mode enabled throughout
- Cloudflare Workers available for preview API
- Existing MDX component library (Callout, SequenceBlock, MoleculeViewer)

### 2.4 Success Criteria

- Editor loads in < 2 seconds
- Real-time preview latency < 500ms
- Support for documents up to 100KB
- MDX component insertion in < 100ms
- Collaborative editing with < 100ms sync

---

## 3. Nomenclature and Notation

### 3.1 Editor Terminology

| Term               | Definition                                                        |
| ------------------ | ----------------------------------------------------------------- |
| CodeMirror 6       | Modular code editor framework                                     |
| Monaco Editor      | VS Code-based code editor                                         |
| ProseMirror        | WYSIWYG editor framework                                          |
| TipTap             | Headless WYSIWYG editor based on ProseMirror                      |
| MDX                | Markdown with JSX components                                      |
| Frontmatter        | YAML header in MDX files                                          |

### 3.2 MDX Terminology

| Term               | Definition                                                        |
| ------------------ | ----------------------------------------------------------------- |
| JSX Component      | Custom React/SolidJS component in MDX                             |
| Content Collection | Astro type-safe content directory                                 |
| MDX Component Map  | Registry of allowed components                                    |
| Rehype Plugin      | HTML transformation plugin                                        |
| Remark Plugin      | Markdown transformation plugin                                    |

### 3.3 Collaboration Terminology

| Term               | Definition                                                        |
| ------------------ | ----------------------------------------------------------------- |
| Operational Transform | Conflict resolution for concurrent editing                    |
| CRDT               | Conflict-free Replicated Data Type                                |
| Cursor Presence    | Real-time display of other editors                                |
| Version Vector     | Logical clock for ordering edits                                  |

---

## 4. Theoretical Foundation

### 4.1 Editor Engine Comparison

#### 4.1.1 CodeMirror 6

**Architecture:** Modular, state-driven editor with immutable Document, Selection, Extensions, and Transactions states feeding into EditorView for DOM rendering.

**Pros:**
- Modular architecture (only load what you need)
- Excellent performance (virtual document, handles million-line files)
- Strong TypeScript support
- Custom language support via Lezer parser
- Built-in collaboration support
- Accessibility: works with screen readers and keyboard-only users
- Mobile support with native selection

**Cons:**
- Learning curve for extension system
- Smaller ecosystem than Monaco
- No built-in WYSIWYG mode

**Bundle Size:** ~150KB (core + markdown) | Gzipped: ~50KB
**References:** https://codemirror.net

#### 4.1.2 Monaco Editor

**Architecture:** VS Code-based editor with Editor Model (text buffer, language service, undo/redo), feeding into Editor Widget.

**Pros:**
- VS Code-like experience familiar to developers
- Rich IntelliSense support
- Built-in diff editor (useful for version history)
- Multi-cursor editing
- Large community and extensions

**Cons:**
- Large bundle size (~2MB uncompressed, ~600KB gzipped)
- Heavy for simple use cases
- Complex webpack/vite configuration
- React-specific wrapper (tiptap wrapper exists but Monaco is less flexible)

**Bundle Size:** ~2MB (full editor) | Gzipped: ~600KB
**References:** https://microsoft.github.io/monaco-editor

#### 4.1.3 ProseMirror

**Architecture:** Schema-based WYSIWYG editor with EditorState (Document, Selection, Stored Marks, Plugins) feeding into EditorView (DOM rendering, Decorations, Node views).

**Pros:**
- WYSIWYG editing experience
- Schema-based document model (structure-aware)
- Excellent collaborative editing (Yjs integration)
- Rich plugin ecosystem
- Used by many production apps (NYT, New York Times, Atlassian)

**Cons:**
- Steeper learning curve
- More opinionated architecture
- Requires schema definition
- Pro: collaboration features in Yjs require understanding of CRDT

**Bundle Size:** ~200KB (core + markdown) | Gzipped: ~70KB
**References:** https://prosemirror.net

#### 4.1.4 TipTap

**Architecture:** Headless WYSIWYG editor wrapping ProseMirror with Extensions, Commands, Input Rules, and Keyboard Shortcuts.

**Pros:**
- Headless UI (framework agnostic, works with SolidJS)
- Excellent extension system
- Built-in collaboration (Hocuspocus)
- Good documentation
- Active development, YC-backed

**Cons:**
- Collaboration features require paid Pro license for cloud
- Less control than raw ProseMirror
- Larger than CodeMirror

**Bundle Size:** ~250KB (core + extensions) | Gzipped: ~85KB
**References:** https://tiptap.dev

#### 4.1.5 Recommendation Matrix

| Criterion | CodeMirror 6 | Monaco | ProseMirror | TipTap |
|-----------|-------------|--------|-------------|--------|
| Bundle Size | ★★★★★ | ★★ | ★★★★ | ★★★ |
| MDX Support | ★★★★ | ★★★ | ★★★★★ | ★★★★★ |
| WYSIWYG | ★★ | ★★ | ★★★★★ | ★★★★★ |
| Collaboration | ★★★★ | ★★★ | ★★★★★ | ★★★★ |
| SolidJS Integration | ★★★★ | ★★★ | ★★★★ | ★★★★★ |
| Learning Curve | ★★★ | ★★★★ | ★★ | ★★★★ |
| Plugin Ecosystem | ★★★★ | ★★★★ | ★★★★★ | ★★★★★ |
| Performance | ★★★★★ | ★★★ | ★★★★ | ★★★★ |

**Recommendation:** **TipTap** for primary editor (best SolidJS integration, WYSIWYG, extensible), with **CodeMirror 6** as lightweight fallback for quick edits.

### 4.2 MDX-Specific Editing

#### 4.2.1 Frontmatter Editing

The editor must support structured frontmatter editing with Zod validation matching existing content collections in `packages/shared/src/schemas/content.ts`.

**Schema fields:** title, description, author, date, tags, classification, sequence, molecularWeight.

#### 4.2.2 JSX Component Insertion

Component registry maps MDX components (Callout, SequenceBlock, MoleculeViewer, QuizEmbed, FlashcardEmbed) to insertable templates with schema-validated props.

#### 4.2.3 Markdown Formatting Toolbar

Standard formatting: bold, italic, code, headings (h2-h4), lists, links, images, tables, code blocks with language selection.

### 4.3 Preview Rendering

#### 4.3.1 Astro SSR Preview (Recommended)

Content sent to Cloudflare Worker which runs Astro build pipeline and returns rendered HTML. Provides pixel-perfect preview matching production rendering. Trade-off: ~500ms latency per preview update.

#### 4.3.2 Client-Side Preview

Using `xdm` or `@astrojs/mdx` browser build for instant preview. Trade-off: may not perfectly match server-rendered output (missing server-side components, image optimization).

#### 4.3.3 Hybrid Approach (Recommended)

Debounced client-side preview for immediate feedback (300ms debounce), with periodic server-side sync (every 5 seconds) for accuracy. User can force server preview on demand.

### 4.4 Conflict Resolution

#### 4.4.1 Operational Transform (OT)

Standard approach used by Google Docs, VS Code Live Share. Requires central server for coordination. Well-understood but complex to implement correctly.

#### 4.4.2 CRDT (Conflict-free Replicated Data Type)

Used by Yjs and Automerge. Decentralized, works offline, naturally handles merges. Recommended for Cloudflare edge deployment where Durable Objects provide coordination.

**Implementation:** Yjs + Hocuspocus (TipTap's collaboration backend) + Durable Objects as persistence layer.

### 4.5 Performance Optimization

- **Lazy loading:** Editor bundle loaded only when user navigates to edit mode
- **Syntax highlighting:** Lezer-based incremental parsing (CodeMirror) or TextMate grammars (Monaco)
- **Large documents:** Virtual scrolling, chunked loading for files > 50KB
- **Debounced preview:** 300ms debounce on preview updates
- **Web Workers:** Syntax highlighting and linting offloaded to Web Workers

---

## 5. Algorithm Specification

### 5.1 MDX Compilation Pipeline

```
FUNCTION compileMDX(content, frontmatter):
  // 1. Parse frontmatter
  parsed = parseYAML(frontmatter)
  validated = ZodSchema.parse(parsed)
  
  // 2. Parse markdown to AST
  mdast = remarkParse(content)
  
  // 3. Transform MDX (replace JSX with components)
  mdast = remarkMdx().processSync(mdast)
  
  // 4. Apply remark plugins (GFM, math, etc.)
  FOR EACH plugin IN remarkPlugins:
    mdast = plugin(mdast)
  
  // 5. Transform to HTML AST
  hast = rehypeRaw().processSync(mdast)
  
  // 6. Apply rehype plugins (sanitize, format)
  FOR EACH plugin IN rehypePlugins:
    hast = plugin(hast)
  
  // 7. Serialize to HTML
  html = rehypeStringify().processSync(hast)
  
  RETURN { frontmatter: validated, html }
END FUNCTION
```

### 5.2 Preview Debounce Algorithm

```
FUNCTION debouncedPreview(editorState, debounceMs = 300):
  IF previewTimer IS NOT NULL THEN
    CLEAR_TIMEOUT(previewTimer)
  
  previewTimer = SET_TIMEOUT(async () => {
    content = editorState.doc.toString()
    frontmatter = extractFrontmatter(content)
    body = extractBody(content)
    
    // Client-side quick preview
    quickHtml = compileMDXClient(body, frontmatter)
    updatePreviewFrame(quickHtml)
    
    // Server-side accurate preview (debounced longer)
    IF serverPreviewTimer IS NOT NULL THEN
      CLEAR_TIMEOUT(serverPreviewTimer)
    
    serverPreviewTimer = SET_TIMEOUT(async () => {
      accurateHtml = await compileMDXServer(body, frontmatter)
      updatePreviewFrame(accurateHtml)
    }, 2000)
  }, debounceMs)
END FUNCTION
```

### 5.3 Conflict Resolution Algorithm (Yjs-based)

```
FUNCTION syncDocument(ydoc, provider):
  // On connect: sync full state
  provider.on('sync', (state) => {
    IF state == -1 THEN
      // Server is newer, pull
      Y.applyUpdate(ydoc, provider.awareness)
    ELSE IF state == 1 THEN
      // Client is newer, push
      provider.send('update', Y.encodeStateAsUpdate(ydoc))
  })
  
  // On update: apply incremental changes
  ydoc.on('update', (update) => {
    provider.send('update', update)
  })
  
  // On remote update: apply
  provider.on('update', (update) => {
    Y.applyUpdate(ydoc, update)
  })
END FUNCTION
```

---

## 6. Test Vector Specification

### 6.1 Reference

Test vectors for MDX editor algorithms are defined in `test_vectors/test_vectors_social_editor_ext.toml`. Key test cases include:

| Category            | Vector Count | Description                       |
| ------------------- | ------------ | --------------------------------- |
| MDX Compilation     | 10           | Frontmatter parsing, JSX rendering|
| Preview Rendering   | 6            | SSR vs client-side accuracy       |
| Conflict Resolution | 8            | Concurrent edit merge             |
| Performance         | 6            | Large document handling           |
| **Total**           | **30**       |                                   |

### 6.2 Validation Criteria

1. MDX compilation produces valid HTML
2. Frontmatter validation catches schema violations
3. JSX components render correctly in preview
4. Conflict resolution produces consistent state
5. Editor remains responsive with 100KB documents

---

## 7. Domain Constraints

### 7.1 Editor Constraints

| Parameter | Limit | Notes |
|-----------|-------|-------|
| Max document size | 100KB | Performance limit |
| Preview debounce | 300ms | Client-side |
| Server preview timeout | 5s | SSR preview |
| Auto-save interval | 30s | Background save |
| Max undo depth | 100 steps | Memory limit |

### 7.2 Performance Constraints

| Metric | Target | Critical Threshold |
|--------|--------|-------------------|
| Editor load time | < 2s | > 4s |
| Syntax highlight | < 100ms | > 300ms |
| Preview render | < 500ms | > 2s |
| Auto-save latency | < 1s | > 3s |
| Bundle size | < 100KB | > 200KB |

### 7.3 Security Constraints

| Parameter | Requirement |
|-----------|-------------|
| Content sanitization | HTML sanitized on server |
| File upload | Restricted to images (R2) |
| Rate limiting | 10 saves/minute |
| CSRF protection | Token required |

---

## 8. Bibliography

### 8.1 Editor References

1. Haverbeke, M. (2024). _CodeMirror 6 Documentation_. https://codemirror.net **[TQA-5]**

2. Microsoft. (2024). _Monaco Editor Documentation_. https://microsoft.github.io/monaco-editor **[TQA-5]**

3. Haverbeke, M. (2024). _ProseMirror Documentation_. https://prosemirror.net **[TQA-5]**

4. Ueberdosis. (2024). _TipTap Documentation_. https://tiptap.dev **[TQA-5]**

### 8.2 MDX References

5. Astro Contributors. (2024). _MDX Integration_. https://docs.astro.build/guides/integrations-guide/mdx/ **[TQA-5]**

6. MDX Contributors. (2024). _MDX Specification_. https://mdxjs.com **[TQA-5]**

### 8.3 Collaboration References

7. Nicolo, K. (2023). _Yjs Documentation_. https://docs.yjs.dev **[TQA-5]**

8. TipTap. (2024). _Hocuspocus Collaboration_. https://tiptap.dev/docs/hocuspocus/introduction **[TQA-5]**

9. Shapiro, M., et al. (2011). Conflict-free Replicated Data Types. _SSS 2011_, 386–400. **[TQA-1]**

### 8.4 Performance References

10. Haverbeke, M. (2024). CodeMirror: Performance. https://codemirror.net/examples/million/ **[TQA-5]**

11. Addy Osmani. (2020). _Learning Core Web Vitals_. https://web.dev/vitals/ **[TQA-5]**

---

## 9. Knowledge Graph Concepts

### 9.1 Cross-Lingual Terminology

| English              | Chinese (ZH) | Russian (RU)         | German (DE)           | French (FR)                | Japanese (JP)            |
| -------------------- | ------------ | -------------------- | --------------------- | -------------------------- | ------------------------ |
| Code editor          | 代码编辑器   | редактор кода        | Code-Editor           | Editeur de code            | コードエディタ            |
| MDX                  | MDX          | MDX                  | MDX                   | MDX                        | MDX                      |
| Preview              | 预览         | предпросмотр        | Vorschau              | Apercu                     | プレビュー                |
| Collaboration        | 协作         | сотрудничество       | Zusammenarbeit        | Collaboration              | コラボレーション          |

### 9.2 Knowledge Graph Nodes

| Node Type             | Description                      | Relationships                                   |
| --------------------- | -------------------------------- | ----------------------------------------------- |
| `EditorEngine`        | Text editing framework           | `renders`, `extends`, `integratesWith`          |
| `MDXComponent`        | Custom content block             | `insertedVia`, `validatedBy`, `renderedBy`      |
| `ConflictStrategy`    | Merge algorithm                  | `resolves`, `appliesTo`                         |

---

## 10. Quality Checklist

### 10.1 Completeness

- [ ] Editor engine comparison complete with recommendation
- [ ] MDX-specific editing features specified
- [ ] Preview rendering options documented
- [ ] Conflict resolution strategy defined
- [ ] Performance optimization strategies documented

### 10.2 Accuracy

- [ ] Bundle sizes match official documentation
- [ ] Feature comparison verified against official docs
- [ ] Performance targets realistic for framework

### 10.3 Consistency

- [ ] Nomenclature consistent with editor documentation
- [ ] Algorithm inputs/outputs match domain constraints

### 10.4 Traceability

- [ ] All decisions traceable to requirements
- [ ] Technology choices traceable to project goals
- [ ] Bibliography includes official documentation links

### 10.5 Usability

- [ ] Content appropriate for developer audience
- [ ] Algorithm specifications are implementation-ready
- [ ] Cross-lingual terms support i18n implementation
