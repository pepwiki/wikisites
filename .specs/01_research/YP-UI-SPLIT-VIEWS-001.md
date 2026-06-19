---
document_id: YP-UI-SPLIT-VIEWS-001
title: "Split/Multi-Pane Views"
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
  Specification of split and multi-pane view layout system for side-by-side
  content comparison. Covers layout algorithms (split, grid, tabbed), resize
  handle interaction patterns, responsive behavior (mobile stacking vs desktop
  side-by-side), persisted pane state management, SolidJS layout patterns, and
  CSS Grid vs Flexbox vs dedicated layout library evaluation. Enables VS Code-style
  content comparison for oligopeptide reference materials.
test_vector_ref: "test_vectors/test_vectors_content_tools.toml"
domain_constraint_ref: "domain_constraints/domain_constraints_content.toml"
bibliography_ref: "bibliography.md"
---

# Yellow Paper: Split/Multi-Pane Views

**Document ID:** YP-UI-SPLIT-VIEWS-001
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

This Yellow Paper specifies the split and multi-pane view layout system that enables side-by-side content comparison — a core "VS Code for content" feature. Learners comparing peptide properties (e.g., oxytocin vs vasopressin), reading an article alongside its glossary terms, or viewing a quiz next to its source article need resizable, stateful pane layouts. The system provides VS Code-style drag-to-resize panels, tabbed pane groups, and responsive stacking behavior.

### 1.2 Scope

Covers layout algorithms (binary split, grid, tabbed pane groups), resize handle interaction patterns (drag, keyboard, double-click reset), responsive behavior (mobile stacking, desktop side-by-side), state persistence (pane configuration in localStorage), SolidJS layout component architecture, CSS Grid vs Flexbox evaluation, and accessibility (keyboard resize, screen reader pane descriptions). Does not cover floating windows (reserved for desktop app), picture-in-picture (future phase), or drag-to-tear-off panes (future phase).

### 1.3 Audience

Frontend developers implementing the layout system, UI/UX designers defining interaction patterns, accessibility engineers validating keyboard/screen reader support, and performance engineers optimizing layout reflow.

### 1.4 Normative References

- CSS Grid Layout Module Level 2 (https://www.w3.org/TR/css-grid-2/)
- CSS Flexible Box Layout Module Level 1 (https://www.w3.org/TR/css-flexbox-1/)
- WAI-ARIA Authoring Practices (https://www.w3.org/WAI/ARIA/apg/)
- SolidJS Documentation (https://www.solidjs.com)
- VS Code Layout Architecture (https://github.com/microsoft/vscode)

### 1.5 Definitions and Acronyms

| Term            | Definition                                              |
| --------------- | ------------------------------------------------------- |
| Pane            | A single content panel within a split layout            |
| Split           | Division line between two adjacent panes                |
| Pane Group      | A collection of panes sharing a layout container        |
| Tab             | Selector for switching visible pane within a group      |
| Resize Handle   | Draggable element for adjusting pane proportions        |
| Reflow          | Browser recalculating layout after DOM/style changes    |
| Layout Thrashing| Rapid repeated reflows causing performance degradation  |

---

## 2. Executive Summary

### 2.1 Problem Statement

Content comparison is essential for oligopeptide education: comparing peptide properties side-by-side, reading an article while viewing its references, studying a quiz alongside source material, or examining synthesis pathways in parallel. Without split views, users must toggle between tabs or windows, losing context and increasing cognitive load. The layout system must be lightweight (no dedicated layout library), performant (no layout thrashing during resize), and responsive (stack on mobile).

### 2.2 Scope of Solution

This Yellow Paper defines:

1. **Layout System**: CSS Grid-based binary splits with nested pane groups
2. **Resize Handles**: Mouse drag, keyboard arrow keys, double-click reset
3. **Tabbed Panes**: Multiple content sources per pane with tab switching
4. **State Persistence**: Pane sizes and open tabs stored in localStorage
5. **Responsive Behavior**: Automatic stacking below breakpoint
6. **SolidJS Architecture**: Reactive signals for pane state
7. **Accessibility**: ARIA roles, keyboard resize, screen reader descriptions

### 2.3 Key Assumptions

- Maximum panes: 4 (2×2 grid) on desktop, 2 on tablet, 1 on mobile
- Pane content loaded via Astro islands or article links
- State persistence across page reloads (localStorage)
- No cross-origin content (same-site only)
- Dark mode required (project convention)
- Resize interactions are direct manipulation (mouse/touch drag)

### 2.4 Success Criteria

- Resize handles respond within 16ms (60fps)
- No layout thrashing during drag resize
- Pane state persists across page reloads
- Mobile stacking is automatic and seamless
- Keyboard resize available for accessibility
- Screen reader describes pane configuration

---

## 3. Nomenclature and Notation

### 3.1 Layout Terms

| Term               | Definition                                          |
| ------------------ | --------------------------------------------------- |
| Binary Split       | Two panes divided by a single split line            |
| Nested Split       | Split within a split (recursive partitioning)       |
| Grid Layout        | Panes arranged in rows and columns                  |
| Tabbed Group       | Multiple panes stacked with tab selectors           |
| Flex Layout        | Flexbox-based pane arrangement                      |
| Proportional Size  | Pane size as percentage of container                |
| Fixed Size         | Pane size in pixels (min/max constraints)           |

### 3.2 Interaction Terms

| Term               | Definition                                          |
| ------------------- | --------------------------------------------------- |
| Drag Resize        | Mouse/touch drag on resize handle to adjust pane    |
| Keyboard Resize    | Arrow keys adjust focused resize handle             |
| Double-Click Reset | Double-click handle resets to 50/50 split           |
| Snap               | Handle snaps to common positions (33%, 50%, 67%)    |
| Ghost Overlay      | Semi-transparent overlay during resize showing target|

---

## 4. Theoretical Foundation

### 4.1 Layout Algorithm Evaluation

#### 4.1.1 CSS Grid Approach

```css
/* Two-pane horizontal split */
.split-container {
  display: grid;
  grid-template-columns: 1fr 4px 1fr; /* pane | handle | pane */
  grid-template-rows: 1fr;
  height: 100%;
  overflow: hidden;
}

.pane { overflow: auto; }
.resize-handle {
  grid-column: 2;
  cursor: col-resize;
  background: theme('colors.slate.300');
}
```

**Advantages**:
- Native browser layout engine (no JS overhead)
- Automatic reflow on resize
- Simple CSS-only static layouts
- No library dependency

**Disadvantages**:
- Dynamic resizing requires JS to update `grid-template-columns`
- No built-in snap, persistence, or tab management
- Nested splits create deep DOM

#### 4.1.2 CSS Flexbox Approach

```css
.split-container {
  display: flex;
  height: 100%;
}
.pane { flex: 1; overflow: auto; min-width: 200px; }
.resize-handle {
  width: 4px;
  cursor: col-resize;
  flex-shrink: 0;
}
```

**Advantages**:
- Simpler than Grid for linear splits
- `flex-basis` and `min-width` naturally constrain
- Well-supported

**Disadvantages**:
- Same as Grid for dynamic resizing
- Less suitable for 2D grid layouts

#### 4.1.3 Dedicated Layout Libraries

| Library           | Size (gzip) | Features                        | Maintenance |
| ----------------- | ----------- | ------------------------------- | ----------- |
| allotment         | ~12KB       | VS Code-style split views       | Active      |
| react-resizable   | ~8KB        | Basic resize handles            | Moderate    |
| react-split-pane  | ~6KB        | Split panes                     | Low         |
| golden-layout     | ~30KB       | Full IDE layout                 | Low         |
| flexlayout-react  | ~25KB       | Complex tabbed layouts          | Moderate    |

**Evaluation**: Allotment is the closest match (VS Code's actual layout library), but adds 12KB for features mostly already achievable with CSS Grid + JS. For Wikisites' simpler needs (binary splits, not full IDE), custom implementation is lighter and more maintainable.

#### 4.1.4 Recommendation: Custom CSS Grid + JS

**Rationale**:

1. **Bundle size**: 0KB library overhead vs 12-30KB
2. **Simplicity**: Wikisites needs binary splits, not complex IDE layouts
3. **Control**: Full control over resize behavior, snap points, accessibility
4. **Consistency**: Matches existing component patterns (no new dependencies)
5. **Performance**: Direct DOM manipulation without reconciliation

**Implementation**: CSS Grid for layout structure, SolidJS signals for reactive state, pointer events for drag resize.

### 4.2 Resize Handle Interaction Patterns

#### 4.2.1 Mouse Drag Resize

```
START: PointerDown on resize handle
  1. Capture pointer (setPointerCapture)
  2. Add 'mousemove' and 'mouseup' listeners
  3. Show ghost overlay (optional)

MOVE: PointerMove
  1. Calculate delta from initial position
  2. Compute new pane proportions (proportional to container)
  3. Apply min/max constraints (min: 200px, max: container - 200px)
  4. Update grid-template-columns via style
  5. Cancel any pending requestAnimationFrame

END: PointerUp
  1. Release pointer capture
  2. Remove listeners
  3. Hide ghost overlay
  4. Persist final sizes to localStorage
  5. Dispatch 'pane-resize' event
```

#### 4.2.2 Keyboard Resize

```
FOCUS: Tab to resize handle
  - Handle receives visible focus ring (gold accent)
  - aria-label="Resize pane divider. Use left and right arrow keys to adjust."

ARROW KEYS:
  - Left/Down arrow: Decrease left pane by 5%
  - Right/Up arrow: Increase left pane by 5%
  - Hold Shift: Adjust by 20% (coarse)
  - Home: Set left pane to minimum (200px)
  - End: Set left pane to maximum (container - 200px)
  - Enter: Reset to 50/50

UPDATE:
  1. Update grid-template-columns
  2. Persist to localStorage
  3. Announce new proportions via aria-live region
```

#### 4.2.3 Double-Click Reset

```
DOUBLE-CLICK: resize-handle
  1. Animate from current position to 50/50 over 200ms
  2. Use CSS transition on grid-template-columns
  3. Persist to localStorage
  4. Announce "Panes reset to equal size" via aria-live
```

### 4.3 Responsive Behavior

#### 4.3.1 Breakpoint Strategy

| Viewport              | Layout               | Resize Handle | Max Panes |
| --------------------- | -------------------- | ------------- | --------- |
| Mobile (<640px)       | Single pane, stacked | None          | 1 (serial)|
| Tablet (640-1024px)   | Two-pane vertical    | Horizontal    | 2         |
| Desktop (>1024px)     | Multi-pane grid      | Both          | 4         |

#### 4.3.2 Responsive Algorithm

```
FUNCTION updateResponsiveLayout(viewportWidth):
  IF viewportWidth < 640 THEN
    // Mobile: stack panes vertically, no resize handle
    container.style.gridTemplateColumns = '1fr'
    container.style.gridTemplateRows = 'auto'
    hideResizeHandles()
    showPaneTabs()  // Tab switching between stacked panes

  ELSE IF viewportWidth < 1024 THEN
    // Tablet: two-column, horizontal split
    container.style.gridTemplateColumns = `${leftSize}px 4px 1fr`
    container.style.gridTemplateRows = '1fr'
    showResizeHandles('horizontal')
    MAX_PANES = 2

  ELSE
    // Desktop: full grid layout
    container.style.gridTemplateColumns = `${leftSize}px 4px ${rightSize}px`
    container.style.gridTemplateRows = '1fr'
    showResizeHandles('both')
    MAX_PANES = 4
END FUNCTION
```

### 4.4 State Persistence

#### 4.4.1 State Schema

```typescript
interface PaneState {
  version: 1;
  panes: Array<{
    id: string;
    contentId: string;        // article slug or component ID
    contentType: 'article' | 'glossary' | 'quiz' | 'calculator';
  }>;
  layout: {
    type: 'binary' | 'grid-2x2' | 'tabs';
    proportions: number[];    // percentages, e.g., [50, 50]
    direction: 'horizontal' | 'vertical';
  };
  activePaneIndex: number;
  lastModified: string;       // ISO timestamp
}
```

#### 4.4.2 Persistence Algorithm

```
FUNCTION savePaneState(state):
  state.version = 1
  state.lastModified = NOW().toISOString()
  localStorage.setItem('wikisites:pane-state', JSON.stringify(state))

FUNCTION loadPaneState():
  raw = localStorage.getItem('wikisites:pane-state')
  IF raw IS NULL THEN
    RETURN DEFAULT_STATE

  state = JSON.parse(raw)

  // Validate version
  IF state.version != 1 THEN
    RETURN DEFAULT_STATE

  // Validate pane content still exists
  FOR EACH pane IN state.panes:
    IF NOT articleExists(pane.contentId) THEN
      pane.contentId = DEFAULT_ARTICLE_ID
      pane.contentType = 'article'

  RETURN state

CONSTANT DEFAULT_STATE = {
  version: 1,
  panes: [{ id: 'main', contentId: 'glutathione', contentType: 'article' }],
  layout: { type: 'binary', proportions: [50, 50], direction: 'horizontal' },
  activePaneIndex: 0,
  lastModified: NOW().toISOString()
}
```

### 4.5 SolidJS Layout Architecture

#### 4.5.1 Component Tree

```
<PaneContainer>                    // SolidJS component (Astro island)
  <PaneGroup layout={layout}>     // Manages grid template
    <Pane id="left" size={leftSize}>
      <PaneHeader>                // Tab bar for pane
        <TabList>
          <Tab active>Article</Tab>
          <Tab>Glossary</Tab>
        </TabList>
      </PaneHeader>
      <PaneContent>
        {/* Dynamic content loaded here */}
      </PaneContent>
    </Pane>
    <ResizeHandle
      direction="horizontal"
      onResize={(delta) => updateLeftSize(delta)}
      aria-label="Resize article and reference panels"
    />
    <Pane id="right" size={rightSize}>
      <PaneContent>
        {/* Second article or tool */}
      </PaneContent>
    </Pane>
  </PaneGroup>
</PaneContainer>
```

#### 4.5.2 State Management with Signals

```typescript
// PaneContainer.tsx
import { createSignal, createEffect, onCleanup } from 'solid-js';

export default function PaneContainer() {
  const [state, setState] = createSignal(loadPaneState());
  const [isResizing, setIsResizing] = createSignal(false);

  // Persist state changes
  createEffect(() => {
    savePaneState(state());
  });

  // Keyboard resize handler
  const handleKeyDown = (e: KeyboardEvent, paneIndex: number) => {
    const step = e.shiftKey ? 20 : 5;
    const proportions = [...state().layout.proportions];

    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      proportions[paneIndex] = Math.max(10, proportions[paneIndex] - step);
      proportions[paneIndex + 1] = 100 - proportions[paneIndex];
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      proportions[paneIndex] = Math.min(90, proportions[paneIndex] + step);
      proportions[paneIndex + 1] = 100 - proportions[paneIndex];
    } else if (e.key === 'Home') {
      proportions[paneIndex] = 10;
      proportions[paneIndex + 1] = 90;
    } else if (e.key === 'End') {
      proportions[paneIndex] = 90;
      proportions[paneIndex + 1] = 10;
    } else if (e.key === 'Enter') {
      proportions[paneIndex] = 50;
      proportions[paneIndex + 1] = 50;
    }

    setState(s => ({
      ...s,
      layout: { ...s.layout, proportions }
    }));

    e.preventDefault();
  };

  return (
    <div
      class="pane-container"
      style={{
        'grid-template-columns': `${state().layout.proportions[0]}% 4px ${state().layout.proportions[1]}%`
      }}
      role="region"
      aria-label="Split pane view"
    >
      {/* Panes and handles rendered here */}
    </div>
  );
}
```

---

## 5. Algorithm Specification

### 5.1 Resize Drag Algorithm

#### 5.1.1 Purpose

Handles pointer-based resize of split panes with smooth, lag-free interaction.

#### 5.1.2 Algorithm

```
FUNCTION setupResizeHandle(handleElement, container, paneIndex):
  let isDragging = false
  let startX = 0
  let startProportion = 0

  handleElement.addEventListener('pointerdown', (e) => {
    isDragging = true
    startX = e.clientX
    startProportion = getCurrentProportion(paneIndex)
    handleElement.setPointerCapture(e.pointerId)
    container.classList.add('resizing')
    e.preventDefault()
  })

  handleElement.addEventListener('pointermove', (e) => {
    IF NOT isDragging THEN RETURN

    deltaX = e.clientX - startX
    containerWidth = container.getBoundingClientRect().width
    handleWidth = 4  // px
    availableWidth = containerWidth - handleWidth

    // Convert delta to percentage
    deltaPercent = (deltaX / availableWidth) * 100

    // Compute new proportions
    newLeft = clamp(startProportion + deltaPercent, 10, 90)
    newRight = 100 - newLeft

    // Apply to container (direct DOM update for performance)
    container.style.gridTemplateColumns = `${newLeft}% ${handleWidth}px ${newRight}%`

    // Update state (batched via requestAnimationFrame)
    requestAnimationFrame(() => {
      setState(s => ({
        ...s,
        layout: { ...s.layout, proportions: [newLeft, newRight] }
      }))
    })
  })

  handleElement.addEventListener('pointerup', (e) => {
    IF NOT isDragging THEN RETURN
    isDragging = false
    container.classList.remove('resizing')
    handleElement.releasePointerCapture(e.pointerId)
    persistState(state())
  })
END FUNCTION
```

### 5.2 Tab Switching Algorithm

#### 5.2.1 Purpose

Manages tab-based content switching within a pane.

#### 5.2.2 Algorithm

```
FUNCTION switchTab(paneId, tabIndex):
  pane = state().panes.find(p => p.id == paneId)
  IF pane IS NULL THEN RETURN

  // Update active tab
  setState(s => ({
    ...s,
    panes: s.panes.map(p =>
      p.id == paneId ? { ...p, activeTabIndex: tabIndex } : p
    )
  }))

  // Load content if not cached
  contentId = pane.tabs[tabIndex].contentId
  IF NOT contentCache.has(contentId) THEN
    content = await loadContent(contentId, pane.tabs[tabIndex].contentType)
    contentCache.set(contentId, content)

  // Announce tab change for screen readers
  announceToScreenReader(`Switched to ${pane.tabs[tabIndex].label} tab`)
END FUNCTION
```

### 5.3 Pane Split Algorithm

#### 5.3.1 Purpose

Adds or removes panes dynamically (e.g., "Open in new pane").

#### 5.3.2 Algorithm

```
FUNCTION addPane(contentId, contentType, position):
  currentState = state()

  IF LENGTH(currentState.panes) >= MAX_PANES THEN
    showNotification("Maximum panes reached")
    RETURN

  IF currentState.layout.type == 'binary' THEN
    // Convert to grid layout
    newPane = { id: generateId(), contentId, contentType, tabs: [] }
    newProportions = computeNewProportions(currentState.layout.proportions, position)

    setState(s => ({
      ...s,
      panes: [...s.panes, newPane],
      layout: {
        type: 'grid-2x2',
        proportions: newProportions,
        direction: s.layout.direction
      }
    }))

  ELSE IF currentState.layout.type == 'grid-2x2' THEN
    // Add to existing tab group
    targetPane = selectTargetPane(currentState, position)
    setState(s => ({
      ...s,
      panes: s.panes.map(p =>
        p.id == targetPane.id
          ? { ...p, tabs: [...p.tabs, { contentId, contentType }] }
          : p
      )
    }))
END FUNCTION

FUNCTION removePane(paneId):
  currentState = state()
  IF LENGTH(currentState.panes) <= 1 THEN RETURN

  setState(s => ({
    ...s,
    panes: s.panes.filter(p => p.id != paneId),
    layout: {
      ...s.layout,
      type: LENGTH(s.panes) <= 2 ? 'binary' : s.layout.type,
      proportions: redistributeProportions(s.layout.proportions, paneId)
    }
  }))
END FUNCTION
```

---

## 6. Test Vector Specification

### 6.1 Reference

Test vectors for split views are defined in `test_vectors/test_vectors_content_tools.toml`. Key test cases include:

| Category                  | Vector Count | Description                            |
| ------------------------- | ------------ | -------------------------------------- |
| Resize Interaction        | 6            | Drag, keyboard, reset, constraints     |
| Tab Switching             | 4            | Tab add, remove, switch, persistence   |
| State Persistence         | 4            | Save, load, version migration          |
| Responsive Behavior       | 5            | Mobile/tablet/desktop transitions      |
| Accessibility             | 4            | Keyboard resize, ARIA, focus management|
| **Total**                 | **23**       |                                        |

### 6.2 Validation Criteria

1. Resize handle responds to mouse drag without lag
2. Keyboard resize adjusts proportions by correct step size
3. Double-click resets to 50/50 split
4. State persists across page reloads
5. Mobile stacking occurs below 640px viewport
6. Tab switching loads correct content
7. Screen reader announces pane proportions
8. Focus management follows logical order

---

## 7. Domain Constraints

### 7.1 Layout Constraints

All constraints defined in `domain_constraints/domain_constraints_content.toml`.

| Metric                         | Target  | Critical Threshold |
| ------------------------------ | ------- | ------------------ |
| Maximum panes (desktop)        | 4       | >4                 |
| Maximum panes (tablet)         | 2       | >2                 |
| Maximum panes (mobile)         | 1       | >1                 |
| Minimum pane size              | 200px   | <100px             |
| Maximum pane count per group   | 4       | >4                 |
| Maximum nesting depth          | 2       | >3                 |

### 7.2 Performance Constraints

| Metric                         | Target          | Critical Threshold |
| ------------------------------ | --------------- | ------------------ |
| Resize response time           | <16ms (1 frame) | >50ms              |
| Layout reflow during resize    | 0 forced reflows| >2 reflows         |
| State persistence write        | <5ms            | >50ms              |
| State persistence read         | <5ms            | >20ms              |
| Tab switch render              | <100ms          | >300ms             |

### 7.3 Accessibility Constraints

| Constraint                       | Requirement                            |
| -------------------------------- | -------------------------------------- |
| Resize handle focusable          | Required (Tab key)                     |
| Resize handle ARIA label         | Required                               |
| Keyboard resize                  | Arrow keys, Home, End, Enter           |
| Focus ring                       | Visible gold accent ring               |
| Screen reader pane description   | Proportions and content summary        |
| Reduced motion                   | No animated transitions on resize      |
| Touch targets                    | ≥44px on mobile resize handles         |

### 7.4 Persistence Constraints

| Metric                         | Limit                               |
| ------------------------------ | ----------------------------------- |
| Max localStorage size per pane | 10KB                                |
| State version                  | 1 (migration required for changes)  |
| Stale state expiry             | 30 days                             |
| Max cached content per pane    | 5 articles (LRU eviction)           |

---

## 8. Bibliography

### 8.1 Layout References

1. W3C CSS Working Group. (2023). _CSS Grid Layout Module Level 2_. https://www.w3.org/TR/css-grid-2/

2. W3C CSS Working Group. (2018). _CSS Flexible Box Layout Module Level 1_. https://www.w3.org/TR/css-flexbox-1/

3. Fineman, R. (2019). _CSS Grid: The Complete Guide_. Smashing Magazine.

4. W3C WAI. (2023). _WAI-ARIA Authoring Practices Guide_. https://www.w3.org/WAI/ARIA/apg/

### 8.2 Interaction Design References

5. Norman, D. A. (2013). _The Design of Everyday Things_ (Revised ed.). Basic Books.

6. Johnson, J. (2010). _Designing with the Mind in Mind_ (2nd ed.). Morgan Kaufmann.

7. Microsoft. (2024). _VS Code Architecture — Layout_. https://github.com/microsoft/vscode

8. Microsoft. (2024). _Allotment: VS Code-style split views_. https://github.com/johnwalley/allotment

### 8.3 SolidJS References

9. SolidJS Contributors. (2024). _SolidJS Documentation_. https://www.solidjs.com

10. Carniato, R. (2024). _SolidJS Signals_. https://www.solidjs.com/tutorial/reactive_signals

### 8.4 Browser API References

11. Mozilla Developer Network. (2024). _Pointer Events API_. https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events

12. Mozilla Developer Network. (2024). _CSS Containment_. https://developer.mozilla.org/en-US/docs/Web/CSS/contain

13. Mozilla Developer Network. (2024). _requestAnimationFrame_. https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

---

## 9. Knowledge Graph Concepts

### 9.1 Cross-Lingual Terminology

| English          | Chinese (ZH) | Russian (RU)             | German (DE)           | French (FR)             | Japanese (JP)          |
| ---------------- | ------------ | ------------------------ | --------------------- | ----------------------- | ---------------------- |
| Split view       | 分屏视图     | разделённый вид          | Gespaltene Ansicht    | Vue partagée            | スプリットビュー       |
| Pane             | 窗格         | панель                   | Bereich               | Volet                   | ペイン                 |
| Resize handle    | 调整大小手柄 | ручка изменения размера  | Grif zum Ändern       | Poignée de redimensionnement | リサイズハンドル  |
| Layout           | 布局         | макет                    | Layout                | Mise en page            | レイアウト             |
| Responsive       | 响应式       | адаптивный               | Reaktionsfähig        | Réactif                 | レスポンシブ           |
| Persistence      | 持久化       | устойчивость             | Persistenz            | Persistance             | 永続化                 |

### 9.2 Knowledge Graph Nodes

| Node Type           | Description                  | Relationships                                                   |
| ------------------- | ---------------------------- | --------------------------------------------------------------- |
| `SplitView`         | The split pane layout feature| `containsPanes`, `hasLayout`, `persistsState`                  |
| `Pane`              | Content panel in the layout  | `hasContent`, `hasSize`, `hasTabs`, `adjacentTo`               |
| `ResizeHandle`      | Draggable divider            | `separates`, `adjustsSize`, `accessibleVia`                    |
| `TabGroup`          | Multiple content sources     | `containsTabs`, `switchesContent`, `belongsToPane`             |
| `PaneState`         | Persisted configuration      | `describesLayout`, `storedIn`, `validUntil`                    |

### 9.3 Cross-References

- Layout performance constraints align with `YP-WEB-TECH-001` bundle and render budgets
- Accessibility requirements per `YP-WEB-TECH-001` Section 7.6
- State persistence uses localStorage (same mechanism as FSRS progress in `YP-EDU-CONTENT-001`)
- Responsive breakpoints match `YP-WEB-TECH-001` Section 7.7

---

## 10. Quality Checklist

### 10.1 Completeness

- [ ] Layout algorithms documented (CSS Grid, Flexbox, library comparison)
- [ ] Resize interaction patterns fully specified (mouse, keyboard, double-click)
- [ ] Responsive behavior defined for all viewports
- [ ] State persistence schema and algorithm specified
- [ ] SolidJS component architecture designed
- [ ] Tab management system specified
- [ ] Accessibility approach documented

### 10.2 Accuracy

- [ ] Performance targets based on browser layout engine characteristics
- [ ] CSS Grid approach validated against browser support data
- [ ] Accessibility features aligned with WCAG 2.1 AA
- [ ] State persistence compatible with localStorage API
- [ ] All technical claims traceable to documentation

### 10.3 Consistency

- [ ] Performance budgets consistent with `domain_constraints_content.toml`
- [ ] Accessibility constraints consistent with `YP-WEB-TECH-001`
- [ ] Responsive breakpoints match project conventions
- [ ] Dark mode approach consistent with existing design system

### 10.4 Traceability

- [ ] Library selection rationale documented
- [ ] Layout algorithm rationale documented
- [ ] State schema compatible with existing content model
- [ ] Test vectors traceable to algorithm specification

### 10.5 Usability

- [ ] Split view interaction follows VS Code conventions
- [ ] Resize handles are discoverable and intuitive
- [ ] Mobile experience is functional (stacking)
- [ ] Tab switching is fast and responsive
- [ ] Keyboard navigation is complete
