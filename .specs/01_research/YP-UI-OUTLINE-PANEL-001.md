# Yellow Paper: Outline/Minimap Panel

**Document ID:** YP-UI-OUTLINE-PANEL-001  
**Version:** 1.0.0  
**Date:** 2026-06-19  
**Status:** DRAFT  
**Classification:** Internal — Phase 1 Epistemological Discovery  
**Scope:** Power User Shell — Document Overview Navigation

---

## Executive Summary

The Outline/Minimap Panel provides document overview navigation via heading extraction and scroll-synced position indicator. It implements a collapsible side panel with tree-view structure for headings and a minimap visualization for rapid document scanning.

**Key Design Decisions:**
- AST-based heading extraction from Astro content collections
- IntersectionObserver for scroll-sync (not scroll events)
- CSS-only minimap for static sites (no canvas overhead)
- Virtual scrolling for documents with 100+ headings
- Keyboard-navigable tree view per WAI-ARIA APG

---

## Nomenclature

| Term | Definition |
|------|-----------|
| **Outline** | Hierarchical list of document headings |
| **Minimap** | Scaled visual representation of document structure |
| **Scroll Sync** | Automatic highlighting of outline item matching visible content |
| **Heading Level** | H1-H6 depth in document hierarchy |
| **Virtual Scroll** | Rendering only visible items in large lists |
| **IntersectionObserver** | Browser API for detecting element visibility |
| **Sticky Position** | Panel remains visible while scrolling document |
| **Tree View** | Expandable/collapsible hierarchical list pattern |

---

## Theoretical Foundation

### 1. Heading Extraction

Content is pre-processed at build time via Astro content collections. Headings are extracted from the AST:

```typescript
interface HeadingNode {
  id: string;          // slugified heading text
  level: number;       // 1-6
  text: string;        // plain text content
  children: HeadingNode[];
  element?: HTMLElement; // runtime DOM reference
}

function extractHeadings(markdown: string): HeadingNode[] {
  const headings: HeadingNode[] = [];
  const stack: HeadingNode[] = [{ level: 0, id: '', text: '', children: headings }];
  
  // Parse markdown headings
  const lines = markdown.split('\n');
  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)/);
    if (!match) continue;
    
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugify(text);
    
    const node: HeadingNode = { id, level, text, children: [] };
    
    // Find parent (last heading with lower level)
    while (stack.length > 1 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }
    
    stack[stack.length - 1].children.push(node);
    stack.push(node);
  }
  
  return headings;
}
```

### 2. Scroll Sync Strategy

#### IntersectionObserver (Preferred)

```typescript
function setupScrollSync(
  headings: HeadingNode[],
  container: HTMLElement,
  onActiveChange: (id: string) => void
): () => void {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          onActiveChange(entry.target.id);
        }
      }
    },
    {
      rootMargin: '-10% 0px -80% 0px', // Trigger near top of viewport
      threshold: 0
    }
  );
  
  for (const heading of headings) {
    const el = document.getElementById(heading.id);
    if (el) observer.observe(el);
  }
  
  return () => observer.disconnect();
}
```

#### Scroll Event Fallback

For browsers without IntersectionObserver support (legacy):
```typescript
let ticking = false;
function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateActiveHeading();
      ticking = false;
    });
    ticking = true;
  }
}
```

**Performance Comparison:**
| Method | CPU Usage | Battery Impact | Accuracy |
|--------|-----------|----------------|----------|
| IntersectionObserver | Low | Low | Good |
| Scroll Event + RAF | Medium | Medium | Excellent |
| Scroll Event (no RAF) | High | High | Excellent |

### 3. Minimap Rendering Approaches

#### CSS Transform Scaling (Recommended)

```css
.minimap {
  width: 80px;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.minimap-content {
  transform: scale(0.15);
  transform-origin: top left;
  width: 667%; /* 1/0.15 */
  pointer-events: none;
}

.minimap-viewport {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 122, 204, 0.1);
  border: 1px solid rgba(0, 122, 204, 0.4);
}
```

**Advantages:**
- No canvas overhead
- Hardware-accelerated via GPU
- CSS-only, no JavaScript for rendering
- Automatically updates with content changes

#### Canvas Rendering (Alternative)

For very large documents where CSS scaling causes performance issues:
```typescript
function renderMinimap(
  canvas: HTMLCanvasElement,
  content: HTMLElement,
  viewport: { top: number; height: number }
) {
  const ctx = canvas.getContext('2d');
  const scale = canvas.width / content.scrollWidth;
  
  // Clear and draw simplified content blocks
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw heading blocks
  const headings = content.querySelectorAll('h1, h2, h3');
  for (const h of headings) {
    const rect = h.getBoundingClientRect();
    ctx.fillStyle = getHeadingColor(h.tagName);
    ctx.fillRect(0, rect.top * scale, canvas.width * 0.8, 2 * scale);
  }
  
  // Draw viewport indicator
  ctx.strokeStyle = 'rgba(0, 122, 204, 0.6)';
  ctx.strokeRect(0, viewport.top * scale, canvas.width, viewport.height * scale);
}
```

### 4. Virtual Scrolling for Large Documents

```typescript
function virtualScroll(
  items: HeadingNode[],
  containerHeight: number,
  itemHeight: number,
  scrollTop: number
): { visible: HeadingNode[]; totalHeight: number; offsetY: number } {
  const totalHeight = items.length * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleCount = Math.ceil(containerHeight / itemHeight) + 2; // buffer
  
  return {
    visible: items.slice(startIndex, startIndex + visibleCount),
    totalHeight,
    offsetY: startIndex * itemHeight
  };
}
```

---

## ARIA Tree View Pattern

Per WAI-ARIA APG Tree View:

```html
<nav aria-label="Document outline">
  <ul role="tree" aria-label="Headings">
    <li role="treeitem" aria-expanded="true">
      <span>Introduction</span>
      <ul role="group">
        <li role="treeitem">
          <a href="#background">Background</a>
        </li>
        <li role="treeitem">
          <a href="#scope">Scope</a>
        </li>
      </ul>
    </li>
    <li role="treeitem" aria-expanded="false">
      <span>Methods</span>
      <ul role="group" hidden>
        <!-- children -->
      </ul>
    </li>
  </ul>
</nav>
```

**Keyboard Navigation:**
- Up/Down Arrow: Move between visible items
- Right Arrow: Expand node or move to first child
- Left Arrow: Collapse node or move to parent
- Home: Move to first item
- End: Move to last visible item
- Enter: Navigate to heading (scroll into view)

---

## Algorithm Specification

### Heading to Outline Tree

```typescript
function headingsToTree(headings: HeadingNode[]): OutlineNode[] {
  const root: OutlineNode[] = [];
  const stack: OutlineNode[] = [];
  
  for (const h of headings) {
    const node: OutlineNode = {
      id: h.id,
      text: h.text,
      level: h.level,
      children: [],
      isActive: false,
      isExpanded: h.level <= 2 // Auto-expand H1, H2
    };
    
    // Pop stack until we find a parent
    while (stack.length > 0 && stack[stack.length - 1].level >= h.level) {
      stack.pop();
    }
    
    if (stack.length === 0) {
      root.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }
    
    stack.push(node);
  }
  
  return root;
}
```

### Active Heading Detection

```typescript
function findActiveHeading(
  headings: HeadingNode[],
  scrollY: number,
  viewportHeight: number
): string | null {
  // Find heading closest to viewport top (not below fold)
  let activeId: string | null = null;
  const triggerPoint = scrollY + viewportHeight * 0.2;
  
  for (const h of headings) {
    const el = document.getElementById(h.id);
    if (!el) continue;
    
    const rect = el.getBoundingClientRect();
    const absoluteTop = scrollY + rect.top;
    
    if (absoluteTop <= triggerPoint) {
      activeId = h.id;
    } else {
      break; // headings are in document order
    }
  }
  
  return activeId;
}
```

---

## Test Vector Specification

### TV-OP-001: Heading Extraction
```toml
[[test]]
id = "TV-OP-001"
description = "Extract headings from markdown"
input = """
# Main Title
## Section 1
### Subsection 1.1
## Section 2
"""
expected = [
  { level = 1, text = "Main Title", id = "main-title" },
  { level = 2, text = "Section 1", id = "section-1" },
  { level = 3, text = "Subsection 1.1", id = "subsection-11" },
  { level = 2, text = "Section 2", id = "section-2" }
]
```

### TV-OP-002: Scroll Sync Accuracy
```toml
[[test]]
id = "TV-OP-002"
description = "Active heading updates on scroll"
scroll_to = 500
viewport_height = 800
expected_active = "section-2"
tolerance_px = 50
```

### TV-OP-003: Tree Navigation
```toml
[[test]]
id = "TV-OP-003"
description = "Keyboard navigation in outline"
sequence = ["Focus outline", "ArrowDown", "ArrowRight", "Enter"]
expected = { navigated_to = true, scrolled_to_heading = true }
```

---

## Domain Constraints

| Constraint | Value | Rationale |
|------------|-------|-----------|
| Max headings before virtualization | 100 | DOM performance threshold |
| Scroll sync debounce | 16ms | 60fps frame budget |
| Minimap width | 80px | Readable without overwhelming |
| Minimap scale factor | 0.15 | 15% of original size |
| Tree expand animation | 150ms | Smooth visual feedback |
| Active heading highlight | CSS only | No JS overhead |
| Panel width | 250px default | Resizable by user |
| Keyboard navigable | true | Power user requirement |

---

## Bibliography

| # | Source | URL | Relevance |
|---|--------|-----|-----------|
| 1 | WAI-ARIA Tree View Pattern | https://www.w3.org/WAI/ARIA/apg/patterns/treeview/ | Accessibility pattern |
| 2 | IntersectionObserver MDN | https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver | Scroll sync |
| 3 | VS Code minimap | https://code.visualstudio.com/docs/editing/editingevolved#minimap | UX reference |
| 4 | Astro Content Collections | https://docs.astro.build/en/guides/content-collections/ | Build-time extraction |
| 5 | Virtual Scrolling | https://www.patterns.dev/posts/virtual-listing/ | Performance pattern |
| 6 | CSS transforms performance | https://web.dev/stick-to-compositor-friendly-properties/ | Rendering optimization |

---

## Quality Checklist

- [ ] Heading extraction accurate for all heading levels
- [ ] Scroll sync updates within 16ms
- [ ] Minimap renders without canvas overhead
- [ ] Tree view keyboard navigation works
- [ ] ARIA roles and properties correct
- [ ] Virtual scrolling handles 100+ headings
- [ ] Panel resizable and collapsible
- [ ] Active heading visually highlighted
