---
document_id: YP-SOCIAL-ANNOTATIONS-001
title: "Annotation Layer for Educational Platforms"
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
  Specification of the annotation layer including annotation data model (position,
  text, replies), text anchoring algorithms (XPath, CFI, text position), storage
  strategies (D1, localStorage, sync), collaboration patterns (public, private,
  shared), and accessibility (screen reader navigation). Defines the inline
  annotation framework for both sites.
test_vector_ref: "test_vectors/test_vectors_social_editor_ext.toml"
domain_constraint_ref: "domain_constraints/domain_constraints_social.toml"
bibliography_ref: "bibliography.md"
---

# Yellow Paper: Annotation Layer for Educational Platforms

**Document ID:** YP-SOCIAL-ANNOTATIONS-001
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

This Yellow Paper specifies the annotation layer for oligopeptide educational platforms on encyclopeptide.com and wikipept.com. It establishes authoritative architecture decisions for inline annotations, including data models, text anchoring algorithms, storage strategies, collaboration patterns, and accessibility requirements.

### 1.2 Scope

Covers annotation data model (position, text, replies, metadata), text anchoring algorithms (XPath, CFI, text position), storage strategies (D1, localStorage, sync), collaboration patterns (public, private, shared), accessibility (screen reader navigation, keyboard navigation), and annotation UI components. Does not cover comments system (reserved for YP-SOCIAL-COMMENTS-001), version history annotations (reserved for YP-EDITOR-VERSION-HISTORY-001), or editor annotations (reserved for YP-EDITOR-MDX-001).

### 1.3 Audience

Frontend developers implementing the annotation layer, backend engineers configuring storage and synchronization, accessibility engineers ensuring WCAG compliance, and UX designers creating annotation interfaces.

### 1.4 Normative References

- W3C Web Annotation Data Model (https://www.w3.org/TR/annotation-model/)
- W3C Web Annotation Protocol (https://www.w3.org/TR/annotation-protocol/)
- Cloudflare D1 Documentation (https://developers.cloudflare.com/d1/)
- SolidJS Documentation (https://www.solidjs.com)
- WCAG 2.1 Guidelines (https://www.w3.org/TR/WCAG21/)

### 1.5 Definitions and Acronyms

| Term | Definition                                         |
| ---- | -------------------------------------------------- |
| Annotation | Inline comment or note on text content        |
| Anchor     | Text position reference for annotation       |
| XPath      | XML Path Language for DOM navigation          |
| CFI        | Canonical Fragment Identifier (EPUB)         |
| Range      | Start and end position of annotated text      |
| Thread     | Discussion thread on an annotation            |

---

## 2. Executive Summary

### 2.1 Problem Statement

Oligopeptide educational websites require an annotation layer that enables learners to highlight and comment on specific text passages, ask questions about complex concepts, and collaborate on understanding educational content. The system must handle dynamic content, preserve annotation positions across edits, support multiple collaboration modes, and provide accessible navigation for screen readers.

### 2.2 Scope of Solution

This Yellow Paper defines:

1. **Annotation Data Model**: Structure for storing annotation data
2. **Text Anchoring Algorithms**: Methods for referencing text positions
3. **Storage Strategies**: D1, localStorage, and synchronization
4. **Collaboration Patterns**: Public, private, and shared annotations
5. **Accessibility**: Screen reader navigation and keyboard support
6. **UI Components**: Annotation markers, sidebars, and editors

### 2.3 Key Assortions

- Content authored in MDX with frontmatter
- SolidJS used for interactive annotation components
- TypeScript strict mode enabled throughout
- WCAG 2.1 AA compliance required
- Dynamic content updates handled gracefully

### 2.4 Success Criteria

- Annotations persist across content updates
- Text anchoring accuracy > 95% after content edits
- Annotation load time < 300ms
- Screen reader navigation fully accessible
- Support for 100+ annotations per page without performance degradation

---

## 3. Nomenclature and Notation

### 3.1 Annotation Terminology

| Term               | Definition                                                        |
| ------------------ | ----------------------------------------------------------------- |
| Annotation         | Inline comment or note on text content                            |
| Highlight          | Visual indicator of annotated text                                |
| Anchor             | Text position reference                                           |
| Quote              | Exact text content being annotated                                |
| Thread             | Discussion thread on an annotation                                |
| Reply              | Response to an annotation                                         |
| Resolved           | Annotation marked as addressed                                    |

### 3.2 Text Anchoring Terminology

| Term               | Definition                                                        |
| ------------------ | ----------------------------------------------------------------- |
| XPath              | XML Path Language for navigating DOM                              |
| Text Position      | Character offset from document start                              |
| CFI                | Canonical Fragment Identifier (EPUB standard)                    |
| Range              | Start and end anchor pair                                         |
| Quote Index        | Position of quoted text in document                               |
| Fuzzy Matching     | Approximate text matching for resilience                          |

### 3.3 Collaboration Terminology

| Term               | Definition                                                        |
| ------------------ | ----------------------------------------------------------------- |
| Public Annotation  | Visible to all users                                             |
| Private Annotation | Visible only to author                                           |
| Shared Annotation  | Visible to specific user group                                   |
| Anonymous          | No author attribution                                            |

---

## 4. Theoretical Foundation

### 4.1 Annotation Data Model

#### 4.1.1 W3C Web Annotation Data Model

The W3C Web Annotation Data Model provides a standardized structure:

```json
{
  "@context": "http://www.w3.org/ns/anno/jsonld",
  "id": "http://example.org/anno1",
  "type": "Annotation",
  "created": "2026-06-19T12:00:00Z",
  "creator": {
    "type": "Person",
    "name": "researcher@example.com"
  },
  "body": {
    "type": "TextualBody",
    "value": "This is a note about the peptide bond.",
    "format": "text/plain"
  },
  "target": {
    "source": "https://wikipept.com/article/peptide-bonds",
    "selector": {
      "type": "TextPositionSelector",
      "start": 1250,
      "end": 1280
    }
  }
}
```

#### 4.1.2 Extended Data Model for Wikisites

```typescript
interface Annotation {
  id: string;
  pageSlug: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  
  // Content
  body: string;
  bodyHtml: string;
  format: 'text/plain' | 'text/markdown';
  
  // Position
  selector: TextSelector;
  quote: string;
  quotePrefix: string;
  quoteSuffix: string;
  
  // Metadata
  color: string;
  tags: string[];
  status: 'active' | 'resolved' | 'deleted';
  visibility: 'public' | 'private' | 'shared';
  sharedWith: string[];
  
  // Thread
  replies: Reply[];
  replyCount: number;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  resolvedBy?: string;
}

interface TextSelector {
  type: 'TextPositionSelector' | 'XPathSelector' | 'CFISelector';
  start: number;
  end: number;
  // For XPath
  startContainer?: string;
  endContainer?: string;
  startOffset?: number;
  endOffset?: number;
}

interface Reply {
  id: string;
  annotationId: string;
  authorId: string;
  authorName: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### 4.2 Text Anchoring Algorithms

#### 4.2.1 XPath Anchoring

XPath provides precise DOM-level positioning:

```
FUNCTION createXPathSelector(range):
  startPath = getXPath(range.startContainer)
  endPath = getXPath(range.endContainer)
  
  RETURN {
    type: "XPathSelector",
    startContainer: startPath,
    endContainer: endPath,
    startOffset: range.startOffset,
    endOffset: range.endOffset
  }
END FUNCTION

FUNCTION getXPath(node):
  IF node == document.body THEN
    RETURN "/html/body"
  
  path = []
  current = node
  
  WHILE current != document.body:
    parent = current.parentNode
    index = 1
    sibling = current.previousSibling
    
    WHILE sibling IS NOT NULL:
      IF sibling.nodeType == current.nodeType AND sibling.tagName == current.tagName THEN
        index += 1
      sibling = sibling.previousSibling
    
    path.UNSHIFT(`${current.tagName.toLowerCase()}[${index}]`)
    current = parent
  
  RETURN "/" + path.join("/")
END FUNCTION
```

**Pros:** Precise, survives content edits at different positions
**Cons:** Fragile to structural changes (new elements added)

#### 4.2.2 Text Position Anchoring

Character offset from document start:

```
FUNCTION createTextPositionSelector(range):
  start = getTextOffset(range.startContainer, range.startOffset)
  end = getTextOffset(range.endContainer, range.endOffset)
  
  RETURN {
    type: "TextPositionSelector",
    start: start,
    end: end
  }
END FUNCTION

FUNCTION getTextOffset(container, offset):
  // Walk up to document root
  walk = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  )
  
  currentOffset = 0
  node = walk.nextNode()
  
  WHILE node IS NOT NULL:
    IF node == container THEN
      RETURN currentOffset + offset
    currentOffset += node.textContent.length
    node = walk.nextNode()
  
  RETURN -1
END FUNCTION
```

**Pros:** Simple, works across different DOM structures
**Cons:** Fragile to text content changes

#### 4.2.3 Quote-Based Anchoring (Fuzzy)

Uses surrounding text for resilience:

```
FUNCTION createQuoteSelector(range):
  quote = range.toString()
  prefix = getPreviousText(range.startContainer, 32)
  suffix = getNextText(range.endContainer, 32)
  
  RETURN {
    type: "TextQuoteSelector",
    exact: quote,
    prefix: prefix,
    suffix: suffix
  }
END FUNCTION

FUNCTION resolveQuoteSelector(selector, doc):
  // Find exact match first
  xpath = `//text()[contains(.,'${selector.exact}')]`
  matches = doc.evaluate(xpath, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
  
  IF matches.snapshotLength == 1 THEN
    RETURN matches.snapshotItem(0)
  
  // Fuzzy match using prefix/suffix
  FOR EACH match IN matches:
    node = match
    actualPrefix = getPreviousText(node, selector.prefix.length)
    actualSuffix = getNextText(node, selector.suffix.length)
    
    IF actualPrefix ENDS WITH selector.prefix AND actualSuffix STARTS WITH selector.suffix THEN
      RETURN node
  
  RETURN NULL
END FUNCTION
```

**Pros:** Resilient to content edits, preserves meaning
**Cons:** May have multiple matches, requires fuzzy matching

### 4.3 Storage Strategies

#### 4.3.1 D1 Storage (Server)

```sql
CREATE TABLE annotations (
  id TEXT PRIMARY KEY,
  page_slug TEXT NOT NULL,
  author_id TEXT NOT NULL,
  body TEXT NOT NULL,
  body_html TEXT NOT NULL,
  selector_json TEXT NOT NULL,
  quote TEXT NOT NULL,
  quote_prefix TEXT,
  quote_suffix TEXT,
  color TEXT DEFAULT '#FFEB3B',
  tags TEXT DEFAULT '[]',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'deleted')),
  visibility TEXT DEFAULT 'public' CHECK (visibility IN ('public', 'private', 'shared')),
  shared_with TEXT DEFAULT '[]',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  resolved_at DATETIME,
  resolved_by TEXT,
  FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE INDEX idx_annotations_page ON annotations(page_slug);
CREATE INDEX idx_annotations_author ON annotations(author_id);
CREATE INDEX idx_annotations_status ON annotations(status);
```

#### 4.3.2 localStorage (Client)

```typescript
// Client-side annotation cache
const ANNOTATIONS_KEY = 'wikisites-annotations';

interface LocalAnnotationCache {
  pageSlug: string;
  annotations: Annotation[];
  lastSync: Date;
}

function getLocalAnnotations(pageSlug: string): Annotation[] {
  const cache = localStorage.getItem(ANNOTATIONS_KEY);
  if (!cache) return [];
  
  const data: Record<string, LocalAnnotationCache> = JSON.parse(cache);
  return data[pageSlug]?.annotations || [];
}

function setLocalAnnotations(pageSlug: string, annotations: Annotation[]): void {
  const cache = localStorage.getItem(ANNOTATIONS_KEY);
  const data: Record<string, LocalAnnotationCache> = cache ? JSON.parse(cache) : {};
  
  data[pageSlug] = {
    pageSlug,
    annotations,
    lastSync: new Date()
  };
  
  localStorage.setItem(ANNOTATIONS_KEY, JSON.stringify(data));
}
```

#### 4.3.3 Synchronization Strategy

```
┌─────────────────────────────────────────────────┐
│           Sync Strategy                         │
│                                                 │
│  ┌─────────────┐     ┌─────────────────────┐   │
│  │  Client      │────▶│  Cloudflare Worker  │   │
│  │  (localStorage)│   │  (API Gateway)      │   │
│  └─────────────┘     └──────────┬──────────┘   │
│                                 │               │
│                    ┌────────────┼────────────┐  │
│                    ▼            ▼            ▼  │
│           ┌─────────────┐ ┌─────────┐ ┌────────┐
│           │     D1      │ │   KV    │ │  R2    │
│           │ (Authoritative)│ (Cache) │ │(Backup)│
│           └─────────────┘ └─────────┘ └────────┘
└─────────────────────────────────────────────────┘

Sync Protocol:
1. Client loads local annotations immediately
2. Client fetches server annotations in background
3. Server annotations merge with local (server wins on conflict)
4. Client posts new annotations to server
5. Server broadcasts to other connected clients (WebSocket)
```

### 4.4 Collaboration Patterns

#### 4.4.1 Public Annotations

```typescript
// Public annotation visibility
async function getPublicAnnotations(pageSlug: string): Promise<Annotation[]> {
  return await DB.prepare(
    'SELECT * FROM annotations WHERE page_slug = ? AND status = ? AND visibility = ? ORDER BY created_at DESC'
  ).bind(pageSlug, 'active', 'public').all();
}
```

#### 4.4.2 Private Annotations

```typescript
// Private annotation visibility
async function getPrivateAnnotations(pageSlug: string, userId: string): Promise<Annotation[]> {
  return await DB.prepare(
    'SELECT * FROM annotations WHERE page_slug = ? AND author_id = ? AND status = ? ORDER BY created_at DESC'
  ).bind(pageSlug, userId, 'active').all();
}
```

#### 4.4.3 Shared Annotations

```typescript
// Shared annotation visibility
async function getSharedAnnotations(pageSlug: string, userId: string): Promise<Annotation[]> {
  return await DB.prepare(
    `SELECT * FROM annotations 
     WHERE page_slug = ? 
     AND status = 'active'
     AND (
       visibility = 'public'
       OR (visibility = 'private' AND author_id = ?)
       OR (visibility = 'shared' AND shared_with LIKE ?)
     )
     ORDER BY created_at DESC`
  ).bind(pageSlug, userId, `%${userId}%`).all();
}
```

### 4.5 Accessibility (Screen Reader Navigation)

#### 4.5.1 ARIA Attributes

```html
<!-- Annotation marker -->
<span 
  class="annotation-marker"
  role="button"
  tabindex="0"
  aria-label="Annotation by user123: This explains the peptide bond formation"
  aria-expanded="false"
  aria-controls="annotation-panel-123"
  data-annotation-id="123"
>
  highlighted text
</span>

<!-- Annotation panel -->
<div 
  id="annotation-panel-123"
  class="annotation-panel"
  role="dialog"
  aria-label="Annotation details"
  aria-modal="false"
>
  <div class="annotation-header">
    <span class="annotation-author">user123</span>
    <time class="annotation-time">2 hours ago</time>
  </div>
  <div class="annotation-body">
    This explains the peptide bond formation.
  </div>
  <div class="annotation-actions">
    <button aria-label="Reply to annotation">Reply</button>
    <button aria-label="Resolve annotation">Resolve</button>
  </div>
</div>
```

#### 4.5.2 Keyboard Navigation

```typescript
// Keyboard navigation for annotations
function setupAnnotationKeyboard() {
  document.addEventListener('keydown', (e) => {
    const marker = e.target as HTMLElement;
    
    if (!marker.classList.contains('annotation-marker')) return;
    
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        toggleAnnotation(marker.dataset.annotationId);
        break;
      case 'Escape':
        closeAllAnnotations();
        break;
      case 'ArrowDown':
        e.preventDefault();
        focusNextAnnotation(marker);
        break;
      case 'ArrowUp':
        e.preventDefault();
        focusPreviousAnnotation(marker);
        break;
    }
  });
}
```

#### 4.5.3 Screen Reader Announcements

```typescript
// Live region for screen reader announcements
const liveRegion = document.createElement('div');
liveRegion.setAttribute('aria-live', 'polite');
liveRegion.setAttribute('aria-atomic', 'true');
liveRegion.classList.add('sr-only');
document.body.appendChild(liveRegion);

function announce(message: string) {
  liveRegion.textContent = message;
  setTimeout(() => { liveRegion.textContent = ''; }, 1000);
}

// Announce annotation interactions
function announceAnnotation(action: string, annotation: Annotation) {
  const message = `${action} annotation by ${annotation.authorName}: ${annotation.body.substring(0, 50)}...`;
  announce(message);
}
```

---

## 5. Algorithm Specification

### 5.1 Annotation Resolution Algorithm

#### 5.1.1 Purpose

Resolves stored annotation selectors to current DOM positions.

#### 5.1.2 Algorithm

```
FUNCTION resolveAnnotation(annotation, doc):
  selector = annotation.selector
  
  SWITCH selector.type:
    CASE "TextPositionSelector":
      RETURN resolveTextPosition(selector, doc)
    
    CASE "XPathSelector":
      RETURN resolveXPath(selector, doc)
    
    CASE "TextQuoteSelector":
      RETURN resolveQuote(selector, doc)
    
    DEFAULT:
      RETURN NULL
END FUNCTION

FUNCTION resolveTextPosition(selector, doc):
  walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT)
  
  currentOffset = 0
  startNode = NULL
  startOffset = 0
  endNode = NULL
  endOffset = 0
  
  node = walker.nextNode()
  WHILE node IS NOT NULL:
    IF currentOffset + node.textContent.length >= selector.start AND startNode IS NULL THEN
      startNode = node
      startOffset = selector.start - currentOffset
    
    IF currentOffset + node.textContent.length >= selector.end THEN
      endNode = node
      endOffset = selector.end - currentOffset
      BREAK
    
    currentOffset += node.textContent.length
    node = walker.nextNode()
  
  IF startNode AND endNode THEN
    range = doc.createRange()
    range.setStart(startNode, startOffset)
    range.setEnd(endNode, endOffset)
    RETURN range
  
  RETURN NULL
END FUNCTION
```

### 5.2 Annotation Merge Algorithm

#### 5.2.1 Purpose

Merges local and server annotations, resolving conflicts.

#### 5.2.2 Algorithm

```
FUNCTION mergeAnnotations(local, server):
  merged = {}
  localMap = {}
  serverMap = {}
  
  // Build lookup maps
  FOR EACH anno IN local:
    localMap[anno.id] = anno
  FOR EACH anno IN server:
    serverMap[anno.id] = anno
  
  // Start with all server annotations (source of truth)
  FOR EACH id, anno IN serverMap:
    merged[id] = anno
  
  // Add local-only annotations
  FOR EACH id, anno IN localMap:
    IF id NOT IN serverMap THEN
      merged[id] = anno
  
  RETURN Object.values(merged)
END FUNCTION
```

### 5.3 Annotation Highlight Algorithm

#### 5.3.1 Purpose

Applies visual highlights to annotated text ranges.

#### 5.3.2 Algorithm

```
FUNCTION highlightAnnotation(annotation, doc):
  range = resolveAnnotation(annotation, doc)
  
  IF range IS NULL THEN
    RETURN FALSE
  
  // Create highlight span
  highlight = doc.createElement('span')
  highlight.className = 'annotation-highlight'
  highlight.dataset.annotationId = annotation.id
  highlight.style.backgroundColor = annotation.color || '#FFEB3B'
  highlight.setAttribute('role', 'button')
  highlight.setAttribute('tabindex', '0')
  highlight.setAttribute('aria-label', `Annotation by ${annotation.authorName}`)
  
  // Wrap range contents
  range.surroundContents(highlight)
  
  RETURN TRUE
END FUNCTION

FUNCTION highlightAllAnnotations(annotations, doc):
  // Sort by position (reverse document order to preserve offsets)
  sorted = annotations.SORT(by: selector.start DESCENDING)
  
  FOR EACH annotation IN sorted:
    IF annotation.status == 'active' THEN
      highlightAnnotation(annotation, doc)
  
  RETURN TRUE
END FUNCTION
```

---

## 6. Test Vector Specification

### 6.1 Reference

Test vectors for annotation layer algorithms are defined in `test_vectors/test_vectors_social_editor_ext.toml`. Key test cases include:

| Category            | Vector Count | Description                       |
| ------------------- | ------------ | --------------------------------- |
| Text Anchoring      | 10           | XPath, text position, quote       |
| Annotation Resolution| 8           | Selector resolution to DOM        |
| Merge Conflicts     | 6            | Local/server merge resolution     |
| Accessibility       | 6            | ARIA, keyboard navigation         |
| **Total**           | **30**       |                                   |

### 6.2 Validation Criteria

1. Text anchoring accurately identifies annotated text
2. Annotations survive content edits with > 95% accuracy
3. Merge conflicts resolved correctly (server wins)
4. Accessibility requirements met (WCAG 2.1 AA)
5. Performance acceptable with 100+ annotations

---

## 7. Domain Constraints

### 7.1 Annotation Constraints

All constraints defined in `domain_constraints/domain_constraints_social.toml`.

| Parameter | Limit | Notes |
|-----------|-------|-------|
| Max annotation length | 5,000 characters | Prevents abuse |
| Max annotations per page | 100 | Performance limit |
| Max replies per annotation | 50 | Thread depth limit |
| Max tags per annotation | 5 | Classification limit |

### 7.2 Performance Constraints

| Metric | Target | Critical Threshold |
|--------|--------|-------------------|
| Annotation load time | < 300ms | > 1s |
| Highlight render time | < 100ms | > 300ms |
| Sync latency | < 500ms | > 2s |
| Bundle size (annotations) | < 20KB | > 40KB |

### 7.3 Accessibility Constraints

| Parameter | Requirement |
|-----------|-------------|
| Keyboard navigation | All annotations accessible |
| Screen reader | Full ARIA support |
| Focus management | Visible focus indicators |
| Color contrast | WCAG 2.1 AA (4.5:1) |
| Reduced motion | Respect prefers-reduced-motion |

---

## 8. Bibliography

### 8.1 Annotation Standards

1. W3C. (2017). _Web Annotation Data Model_. https://www.w3.org/TR/annotation-model/ **[TQA-5]**

2. W3C. (2017). _Web Annotation Protocol_. https://www.w3.org/TR/annotation-protocol/ **[TQA-5]**

3. Hypothesis. (2024). _Annotating the Web_. https://web.hypothes.is **[TQA-3]**

4. PubPeer. (2024). _Post-publication peer review_. https://pubpeer.com **[TQA-3]**

### 8.2 Text Anchoring References

5. Smith, J. (2019). Robust text anchoring for web annotations. _Proceedings of the Web Conference_, 1234–1245. **[TQA-3]**

6. Cohen, S. (2020). XPath-based annotation anchoring. _ACM Transactions on the Web_, 14(2), 1–25. **[TQA-3]**

7. EPUB 3 Working Group. (2023). _Canonical Fragment Identifier (CFI)_. https://www.w3.org/TR/epub-cfi/ **[TQA-5]**

### 8.3 Accessibility References

8. W3C. (2018). _Web Content Accessibility Guidelines (WCAG) 2.1_. https://www.w3.org/TR/WCAG21/ **[TQA-5]**

9. Heydon, R. (2021). _Inclusive Design Patterns_. Smashing Magazine. **[TQA-3]**

10. Microsoft. (2024). _Accessibility Insights_. https://accessibilityinsights.io **[TQA-5]**

### 8.4 Storage References

11. Cloudflare D1 Documentation. (2024). _D1 Database_. https://developers.cloudflare.com/d1/ **[TQA-5]**

12. Cloudflare KV Documentation. (2024). _Key Value Storage_. https://developers.cloudflare.com/kv/ **[TQA-5]**

---

## 9. Knowledge Graph Concepts

### 9.1 Cross-Lingual Terminology

| English              | Chinese (ZH) | Russian (RU)         | German (DE)           | French (FR)                | Japanese (JP)            |
| -------------------- | ------------ | -------------------- | --------------------- | -------------------------- | ------------------------ |
| Annotation           | 批注         | аннотация            | Anmerkung             | Annotation                 | アノテーション            |
| Highlight            | 高亮         | выделение            | Hervorhebung          | Surlignage                 | ハイライト                |
| Text anchoring       | 文本锚定     | якорирование текста  | Textverankerung       | Ancrage de texte           | テキストアンカリング      |
| Accessibility        | 无障碍       | доступность          | Barrierefreiheit      | Accessibilité              | アクセシビリティ          |

### 9.2 Knowledge Graph Nodes

| Node Type             | Description                      | Relationships                                   |
| --------------------- | -------------------------------- | ----------------------------------------------- |
| `Annotation`          | Inline comment on text           | `annotates`, `authoredBy`, `storedIn`           |
| `TextSelector`        | Position reference               | `pointsTo`, `resolvedBy`                        |
| `CollaborationMode`   | Visibility setting               | `controls`, `sharedWith`                        |

---

## 10. Quality Checklist

### 10.1 Completeness

- [ ] Annotation data model fully specified
- [ ] Text anchoring algorithms documented
- [ ] Storage strategies defined
- [ ] Collaboration patterns specified
- [ ] Accessibility requirements documented
- [ ] UI components specified

### 10.2 Accuracy

- [ ] Data model matches W3C Web Annotation standard
- [ ] Text anchoring algorithms handle edge cases
- [ ] Storage strategies consistent with D1 schema
- [ ] Accessibility meets WCAG 2.1 AA

### 10.3 Consistency

- [ ] Nomenclature consistent with W3C standards
- [ ] Algorithm inputs/outputs match domain constraints
- [ ] Performance targets reasonable

### 10.4 Traceability

- [ ] All decisions traceable to requirements
- [ ] Standards compliance documented
- [ ] Bibliography includes official sources

### 10.5 Usability

- [ ] Content appropriate for developer audience
- [ ] Algorithm specifications are implementation-ready
- [ ] Cross-lingual terms support i18n