# Yellow Paper: Breadcrumb Navigation

**Document ID:** YP-UI-BREADCRUMBS-001  
**Version:** 1.0.0  
**Date:** 2026-06-19  
**Status:** DRAFT  
**Classification:** Internal — Phase 1 Epistemological Discovery  
**Scope:** Power User Shell — Deep Hierarchy Navigation

---

## Executive Summary

Breadcrumb navigation provides hierarchical context and navigation for deeply nested content. It implements Schema.org BreadcrumbList structured data, WAI-ARIA breadcrumb pattern, and responsive overflow handling for mobile devices.

**Key Design Decisions:**
- Schema.org BreadcrumbList for SEO and structured data
- ARIA breadcrumb pattern with `aria-current="page"`
- Responsive: horizontal on desktop, collapsible on mobile
- URL-based hierarchy resolution (no content parsing required)
- Maximum 5 visible items with overflow menu

---

## Nomenclature

| Term | Definition |
|------|-----------|
| **Breadcrumb** | A single link in the navigation trail |
| **Trail** | Complete sequence of breadcrumbs from root to current page |
| **Separator** | Visual element between breadcrumbs (e.g., `/`, `>`) |
| **Collapse** | Hiding middle items with ellipsis on small screens |
| **Hierarchy** | Parent-child relationship between pages |
| **Landmark** | ARIA navigation region |
| **Structured Data** | Schema.org markup for search engines |
| **Overflow Menu** | Dropdown for collapsed breadcrumb items |

---

## Theoretical Foundation

### 1. Hierarchy Resolution from URL

```typescript
interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent: boolean;
}

function resolveBreadcrumbs(pathname: string, siteConfig: SiteConfig): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [];
  const segments = pathname.split('/').filter(Boolean);
  
  // Always start with home
  crumbs.push({
    label: siteConfig.homeLabel || 'Home',
    href: '/',
    isCurrent: segments.length === 0
  });
  
  // Build hierarchy from URL segments
  let currentPath = '';
  for (let i = 0; i < segments.length; i++) {
    currentPath += `/${segments[i]}`;
    const isLast = i === segments.length - 1;
    
    crumbs.push({
      label: formatLabel(segments[i]),
      href: currentPath,
      isCurrent: isLast
    });
  }
  
  return crumbs;
}

function formatLabel(segment: string): string {
  // Convert URL slug to human-readable label
  return segment
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}
```

### 2. Content-Based Hierarchy (Alternative)

For content with explicit parent relationships (e.g., Starlight docs):

```typescript
interface ContentHierarchy {
  parent?: string;  // slug of parent page
  order?: number;   // sort order within parent
}

function buildHierarchyFromContent(
  pages: Page[],
  config: ContentHierarchy
): BreadcrumbItem[] {
  const crumbs: BreadcrumbItem[] = [];
  let current = pages.find(p => p.slug === config.currentPage);
  
  while (current) {
    crumbs.unshift({
      label: current.data.title,
      href: current.slug,
      isCurrent: current.slug === config.currentPage
    });
    
    current = current.data.parent
      ? pages.find(p => p.slug === current!.data.parent)
      : undefined;
  }
  
  return crumbs;
}
```

---

## Schema.org BreadcrumbList Markup

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://encyclopedipeptide.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Peptides",
      "item": "https://encyclopedipeptide.com/peptides"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "GLP-1 Receptor Agonists",
      "item": "https://encyclopedipeptide.com/peptides/glp1-agonists"
    }
  ]
}
```

**Implementation:**
```html
<script type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} />

<nav aria-label="Breadcrumb">
  <ol class="breadcrumb">
    {breadcrumbs.map((crumb, i) => (
      <li>
        {crumb.isCurrent ? (
          <span aria-current="page">{crumb.label}</span>
        ) : (
          <a href={crumb.href}>{crumb.label}</a>
        )}
        {i < breadcrumbs.length - 1 && (
          <span class="separator" aria-hidden="true">/</span>
        )}
      </li>
    ))}
  </ol>
</nav>
```

---

## ARIA Breadcrumb Pattern

Per WAI-ARIA APG Breadcrumb:

```html
<nav aria-label="Breadcrumb" class="breadcrumb">
  <ol>
    <li>
      <a href="/">Home</a>
      <span aria-hidden="true">/</span>
    </li>
    <li>
      <a href="/peptides">Peptides</a>
      <span aria-hidden="true">/</span>
    </li>
    <li>
      <span aria-current="page">GLP-1 Receptor Agonists</span>
    </li>
  </ol>
</nav>
```

**Requirements:**
1. Contained within `<nav>` landmark
2. `<nav>` labeled via `aria-label="Breadcrumb"`
3. Current page has `aria-current="page"`
4. Separators marked `aria-hidden="true"`
5. Order implies hierarchy (ol, not ul)

---

## Responsive Design

### Desktop (≥768px)
```
Home / Peptides / GLP-1 Receptor Agonists
```

### Tablet (480-767px)
```
Home / ... / GLP-1 Receptor Agonists
```

### Mobile (<480px)
```
← Peptides
```
(Back button with previous item)

### Overflow Handling Algorithm

```typescript
function responsiveBreadcrumbs(
  items: BreadcrumbItem[],
  maxWidth: number
): BreadcrumbItem[] {
  // Always show first and last items
  if (items.length <= 3) return items;
  
  // Calculate available width for middle items
  const firstItem = items[0];
  const lastItem = items[items.length - 1];
  
  // Show first, ellipsis, and last
  return [
    firstItem,
    { label: '...', href: '', isCurrent: false, isCollapsed: true },
    lastItem
  ];
}
```

### CSS for Responsive Breadcrumbs

```css
.breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.breadcrumb-item {
  display: inline-flex;
  align-items: center;
}

.breadcrumb-separator {
  color: var(--color-muted);
  margin: 0 0.25rem;
}

/* Mobile: collapse middle items */
@media (max-width: 480px) {
  .breadcrumb-item:nth-child(n+2):nth-last-child(n+2) {
    display: none;
  }
  
  .breadcrumb-collapse-indicator {
    display: inline;
  }
}

/* Overflow menu for collapsed items */
.breadcrumb-overflow {
  position: relative;
}

.breadcrumb-overflow-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

---

## Test Vector Specification

### TV-BC-001: URL-Based Resolution
```toml
[[test]]
id = "TV-BC-001"
description = "Resolve breadcrumbs from URL"
pathname = "/peptides/glp1-agonists"
expected = [
  { label = "Home", href = "/" },
  { label = "Peptides", href = "/peptides" },
  { label = "GLP-1 Agonists", href = "/peptides/glp1-agonists", isCurrent = true }
]
```

### TV-BC-002: Schema.org Validation
```toml
[[test]]
id = "TV-BC-002"
description = "Schema.org BreadcrumbList valid"
breadcrumbs = [
  { name = "Home", item = "https://example.com" },
  { name = "Peptides", item = "https://example.com/peptides" }
]
expected_json_ld = true
schema_type = "BreadcrumbList"
```

### TV-BC-003: Responsive Collapse
```toml
[[test]]
id = "TV-BC-003"
description = "Breadcrumbs collapse on small screens"
items = 5
viewport_width = 375
expected_visible = 2  # first + last
expected_collapsed = true
```

---

## Domain Constraints

| Constraint | Value | Rationale |
|------------|-------|-----------|
| Max visible items | 5 | Prevents horizontal overflow |
| Min items before collapse | 4 | Threshold for responsive behavior |
| Separator character | `/` | Industry standard |
| Label max length | 30 chars | Prevents overflow |
| Schema.org required | true | SEO requirement |
| ARIA label required | true | Accessibility requirement |
| Keyboard navigable | true | Tab through all links |
| Current page not linked | true | UX best practice |

---

## Bibliography

| # | Source | URL | Relevance |
|---|--------|-----|-----------|
| 1 | WAI-ARIA Breadcrumb Pattern | https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/ | Accessibility pattern |
| 2 | Schema.org BreadcrumbList | https://schema.org/BreadcrumbList | Structured data |
| 3 | Google Breadcrumb Guidelines | https://developers.google.com/search/docs/appearance/structured-data/breadcrumb | SEO requirements |
| 4 | Astro Navigation | https://docs.astro.build/en/guides/navigation/ | Implementation reference |
| 5 | Starlight Breadcrumbs | https://starlight.astro.build/ | Static site reference |
| 6 | CSS Overflow Patterns | https://web.dev/css-content-visibility/ | Performance optimization |

---

## Quality Checklist

- [ ] Schema.org BreadcrumbList valid
- [ ] ARIA breadcrumb pattern implemented
- [ ] Responsive collapse works on mobile
- [ ] Keyboard navigation functional
- [ ] Current page marked with aria-current
- [ ] Separators hidden from screen readers
- [ ] Labels formatted from URL slugs
- [ ] Overflow menu accessible
