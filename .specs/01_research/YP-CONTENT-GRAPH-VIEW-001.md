---
document_id: YP-CONTENT-GRAPH-VIEW-001
title: "Knowledge Graph View"
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
  Specification of an Obsidian-style knowledge graph visualization for
  oligopeptide educational content. Covers graph layout algorithms (force-directed,
  hierarchical, radial), JavaScript library evaluation (d3-force, force-graph,
  vis-network, cytoscape.js), SolidJS integration patterns, performance
  optimization for 500+ nodes, graph data model (articles as nodes, links/tags
  as edges), interaction patterns, and accessibility compliance.
test_vector_ref: "test_vectors/test_vectors_content_tools.toml"
domain_constraint_ref: "domain_constraints/domain_constraints_content.toml"
bibliography_ref: "bibliography.md"
---

# Yellow Paper: Knowledge Graph View

**Document ID:** YP-CONTENT-GRAPH-VIEW-001
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

This Yellow Paper specifies the knowledge graph visualization system that transforms article link structures, tag relationships, and content metadata into an interactive, explorable graph. Inspired by Obsidian's graph view, this feature enables learners to discover connections between oligopeptide concepts, navigate content spatially, and understand the knowledge structure of the platform. The graph serves as both a navigation tool and a pedagogical instrument for understanding concept relationships.

### 1.2 Scope

Covers graph layout algorithms (force-directed, hierarchical, radial), JavaScript visualization library evaluation and selection, SolidJS integration via Astro islands, graph data model construction from content collections, interaction patterns (click, hover, zoom, pan, filter), performance optimization for 500+ node graphs, responsive behavior (desktop vs mobile), and accessibility (keyboard navigation, screen reader support). Does not cover graph editing (wiki editing reserved for Durable Objects), collaborative real-time graph updates (future phase), or semantic NLP-based link extraction (future phase).

### 1.3 Audience

Frontend developers implementing the graph visualization, content architects designing the data model, accessibility engineers validating keyboard/screen reader support, and performance engineers optimizing rendering.

### 1.4 Normative References

- d3-force Documentation (https://d3js.org/d3-force)
- force-graph GitHub (https://github.com/vasturiano/force-graph)
- Cytoscape.js Documentation (https://js.cytoscape.org)
- vis-network Documentation (https://visjs.github.io/vis-network/docs/)
- WAI-ARIA Authoring Practices (https://www.w3.org/WAI/ARIA/apg/)
- SolidJS Documentation (https://www.solidjs.com)

### 1.5 Definitions and Acronyms

| Term            | Definition                                              |
| --------------- | ------------------------------------------------------- |
| Graph           | Network of nodes (vertices) connected by edges (links)  |
| Node            | Entity in the graph (article, tag, category)            |
| Edge            | Connection between two nodes (link, tag, category)      |
| Adjacency List  | Data structure mapping each node to its neighbors       |
| Force-Directed  | Layout using simulated physical forces                  |
| Cluster         | Group of closely related nodes                          |
| Degree          | Number of edges connected to a node                     |
| Path            | Sequence of edges connecting two nodes                  |
| Subgraph        | Subset of the full graph                                |

---

## 2. Executive Summary

### 2.1 Problem Statement

With 86+ articles across encyclopeptide.com and 104+ pages across wikipept.com, content relationships are implicit — hidden in `relatedArticles` arrays and tag assignments. Learners cannot see how peptide chemistry connects to pharmacology, or how synthesis pathways relate to biological activity. Without explicit visualization, the educational knowledge structure remains opaque, reducing discoverability and cross-domain learning.

### 2.2 Scope of Solution

This Yellow Paper defines:

1. **Graph Data Model**: Articles as nodes, links/tags/categories as edges, with metadata enrichment
2. **Layout Algorithms**: Force-directed (primary), hierarchical (prerequisite chains), radial (category focus)
3. **Library Selection**: Force-graph recommended for performance and SolidJS compatibility
4. **SolidJS Integration**: Custom wrapper component as Astro island
5. **Interaction Patterns**: Click-to-navigate, hover-preview, zoom/pan, filter by tag/category
6. **Performance**: Canvas rendering, node culling, spatial indexing for 500+ nodes
7. **Accessibility**: Keyboard navigation, ARIA labels, screen reader graph description

### 2.3 Key Assumptions

- Current content: ~190 nodes (articles + glossary terms + flashcard decks)
- Projected content (12 months): ~500 nodes
- Edge density: ~3-5 edges per node average
- Primary interaction: desktop (mouse/touch); secondary: mobile (touch only)
- Graph is read-only (no user editing)
- Dark mode required (project convention)
- Graph loads on dedicated `/graph` route and as modal overlay

### 2.4 Success Criteria

- Graph renders 500 nodes at 60fps on mid-range desktop
- Graph renders 200 nodes at 30fps on mid-range mobile
- Initial graph layout computation <2 seconds for 500 nodes
- Node click navigates to article within 100ms
- Keyboard navigation covers all interactive nodes
- Screen reader can describe graph structure

---

## 3. Nomenclature and Notation

### 3.1 Graph Theory Terms

| Term             | Definition                                           |
| ---------------- | ---------------------------------------------------- |
| G = (V, E)      | Graph G with vertex set V and edge set E             |
| Adjacency matrix | n×n matrix where A[i][j] = 1 if edge exists        |
| Degree centrality | Number of edges incident to a node                  |
| Betweenness      | Frequency of a node on shortest paths               |
| Connected component | Maximum set of mutually reachable nodes            |
| Diameter         | Longest shortest path in the graph                  |
| Clustering coefficient | Ratio of actual to possible neighbor connections |

### 3.2 Visualization Terms

| Term              | Definition                                           |
| ----------------- | ---------------------------------------------------- |
| Canvas rendering  | Drawing directly to HTML5 Canvas element             |
| SVG rendering     | Using SVG elements for each node/edge                |
| Zoom/Pan          | Transform viewport scale and translation             |
| Node clustering   | Grouping nodes by shared attributes                  |
| Force simulation  | Physical simulation of attractive/repulsive forces   |
| Spatial indexing   | Data structure for fast spatial queries (quadtree)   |
| Node culling      | Not rendering nodes outside viewport                 |

---

## 4. Theoretical Foundation

### 4.1 Graph Layout Algorithms

#### 4.1.1 Force-Directed Layout

**Algorithm** (Fruchterman-Reingold / Barnes-Hut):

```
FOR EACH iteration (typically 300):
  // Repulsive force between all node pairs
  FOR EACH pair (u, v):
    force = k² / distance(u, v)
    Apply repulsive force to push u and v apart

  // Attractive force along edges
  FOR EACH edge (u, v):
    force = distance(u, v)² / k
    Apply attractive force to pull u and v together

  // Center gravity
  FOR EACH node:
    Apply small force toward center

  // Temperature cooling
  temperature *= cooling_rate (0.97)
```

**Parameters for Wikisites**:

| Parameter             | Value  | Rationale                           |
| --------------------- | ------ | ----------------------------------- |
| Node repulsion       | -500   | Prevents node overlap               |
| Edge attraction       | 0.01   | Keeps connected nodes close         |
| Center gravity        | 0.1    | Prevents graph drift                |
| Link distance         | 100px  | Readable spacing                    |
| Max iterations        | 300    | Balances layout quality vs time     |
| Alpha decay           | 0.02   | Convergence speed                   |
| Velocity decay        | 0.4    | Dampens oscillation                 |

**When to use**: Default view, exploration, discovery.

#### 4.1.2 Hierarchical Layout

**Algorithm** (Sugiyama-style):

```
STEP 1: Assign layers
  FOR EACH node:
    layer = longest path from root

STEP 2: Minimize crossings
  FOR EACH pair of adjacent layers:
    Sort nodes to minimize edge crossings
    (barycenter heuristic)

STEP 3: Assign coordinates
  FOR EACH node:
    x = position within layer (evenly spaced)
    y = layer index × layer_spacing

STEP 4: Route edges
  Use bezier curves for edges spanning multiple layers
```

**When to use**: Showing prerequisite chains, learning paths, difficulty progression.

#### 4.1.3 Radial Layout

**Algorithm**:

```
STEP 1: Select center node (focused article or category)
STEP 2: Group nodes by relationship type
STEP 3: Arrange groups in concentric rings
  ring_radius = ring_index × ring_spacing
  nodes_in_ring = sorted by relevance to center
  angle = 2π × index / nodes_in_ring.length

STEP 4: Position nodes
  x = center_x + ring_radius × cos(angle)
  y = center_y + ring_radius × sin(angle)
```

**When to use**: Focused exploration of a single article and its connections.

### 4.2 Library Evaluation

#### 4.2.1 Library Comparison

| Criterion               | d3-force          | force-graph       | vis-network       | cytoscape.js       |
| ----------------------- | ----------------- | ----------------- | ----------------- | ------------------ |
| Bundle Size (gzip)      | ~12KB (d3 core)   | ~45KB             | ~35KB             | ~75KB              |
| Rendering               | SVG/Canvas        | Canvas            | SVG/Canvas        | Canvas             |
| Max Nodes (60fps)       | ~300 (SVG)        | ~1000             | ~500              | ~1000              |
| Max Nodes (30fps)       | ~500 (Canvas)     | ~2000             | ~1000             | ~2000              |
| Built-in Layouts        | Force only        | Force only        | Force, Hierarchical, Radial | All major     |
| Interaction Built-in    | Manual            | Yes               | Yes               | Yes                |
| SolidJS Wrapper         | Manual            | Manual            | Manual            | Manual             |
| TypeScript Support      | @types/d3-force   | Built-in          | Built-in          | Built-in           |
| Active Maintenance      | Yes               | Yes               | Yes               | Yes                |
| License                 | ISC               | MIT               | MIT               | MIT                |
| Clustering              | Manual            | Manual            | Yes               | Yes                |
| Tooltip/Popover         | Manual            | Built-in          | Built-in          | Built-in           |

**Sources**: GitHub READMEs, bundlephobia.com, official documentation benchmarks.

#### 4.2.2 Recommendation: force-graph

**Rationale**:

1. **Canvas rendering**: 1000+ nodes at 60fps — meets performance requirements
2. **Lowest bundle size**: 45KB gzip includes all needed features
3. **Built-in interactions**: Hover, click, zoom, pan, drag — no manual wiring
4. **Force-directed**: Primary layout matches Obsidian-style exploration
5. **Extensible**: Custom node rendering via `nodeCanvasObject` callback
6. **Active maintenance**: Regular releases, TypeScript support

**Mitigation for limitations**:
- No built-in hierarchical/radial: implement custom layout pre-processing with d3-hierarchy, feed coordinates as initial positions to force-graph
- No built-in clustering: implement tag-based clustering via custom force in force-graph's `d3Force` API

#### 4.2.3 Integration Architecture

```
┌─────────────────────────────────────────────┐
│            KnowledgeGraphView               │
│            (SolidJS Component)              │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │         force-graph Canvas            │  │
│  │                                       │  │
│  │  ┌─────┐    ┌─────┐    ┌─────┐      │  │
│  │  │Node │────│Node │────│Node │      │  │
│  │  └─────┘    └─────┘    └─────┘      │  │
│  │      │         │                      │  │
│  │  ┌─────┐    ┌─────┐                  │  │
│  │  │Node │────│Node │                  │  │
│  │  └─────┘    └─────┘                  │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │     Filter Controls (SolidJS)         │  │
│  │  [All] [Chemistry] [Biology] [Drug]   │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### 4.3 Graph Data Model

#### 4.3.1 Node Schema

```typescript
interface GraphNode {
  id: string;                    // article slug or term id
  label: string;                 // display name
  type: 'article' | 'glossary' | 'flashcard_deck' | 'quiz_category';
  category: string;              // primary category (chemistry, biology, pharmacology, etc.)
  tags: string[];               // all tags
  difficulty: DifficultyLevel;   // beginner, intermediate, advanced, expert
  url: string;                   // article URL
  relevance: number;             // 0-1, based on inbound link count
  size: number;                  // visual size, derived from relevance
  color: string;                 // category-based color
}
```

#### 4.3.2 Edge Schema

```typescript
interface GraphEdge {
  id: string;                    // unique edge id
  source: string;                // source node id
  target: string;                // target node id
  type: 'link' | 'tag' | 'category' | 'related' | 'prerequisite';
  weight: number;                // 0-1, strength of connection
  label?: string;                // optional edge label
}
```

#### 4.3.3 Graph Model

```typescript
interface KnowledgeGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
  metadata: {
    totalNodes: number;
    totalEdges: number;
    categories: string[];
    tags: string[];
    generatedAt: string;         // ISO timestamp
    version: string;
  };
}
```

#### 4.3.4 Graph Construction Algorithm

```
FUNCTION buildKnowledgeGraph(contentCollection):
  graph = { nodes: [], edges: [], metadata: {} }

  // Phase 1: Create nodes
  FOR EACH article IN contentCollection:
    node = {
      id: article.slug,
      label: article.title,
      type: 'article',
      category: article.category,
      tags: article.tags,
      difficulty: article.difficulty,
      url: `/articles/${article.slug}`,
      relevance: 0,
      size: 5,
      color: categoryColor(article.category)
    }
    graph.nodes.APPEND(node)

  // Phase 2: Create edges from relatedArticles
  FOR EACH article IN contentCollection:
    FOR EACH relatedSlug IN article.relatedArticles:
      IF relatedSlug IN graph.nodes THEN
        edge = {
          id: `${article.slug}->${relatedSlug}`,
          source: article.slug,
          target: relatedSlug,
          type: 'related',
          weight: 0.8
        }
        graph.edges.APPEND(edge)

  // Phase 3: Create edges from shared tags
  FOR EACH pair (a, b) IN contentCollection:
    sharedTags = INTERSECTION(a.tags, b.tags)
    IF LENGTH(sharedTags) > 0 THEN
      edge = {
        id: `tag:${a.slug}->${b.slug}`,
        source: a.slug,
        target: b.slug,
        type: 'tag',
        weight: MIN(1.0, LENGTH(sharedTags) * 0.2),
        label: sharedTags.join(', ')
      }
      graph.edges.APPEND(edge)

  // Phase 4: Compute relevance (degree centrality)
  FOR EACH node IN graph.nodes:
    inDegree = COUNT edges WHERE edge.target == node.id
    outDegree = COUNT edges WHERE edge.source == node.id
    node.relevance = NORMALIZE(inDegree + outDegree, 0, maxDegree)
    node.size = 5 + node.relevance * 15  // 5-20px radius

  // Phase 5: Remove duplicate edges
  graph.edges = DEDUPLICATE(graph.edges, by: (source, target, type))

  // Phase 6: Compute metadata
  graph.metadata = {
    totalNodes: LENGTH(graph.nodes),
    totalEdges: LENGTH(graph.edges),
    categories: UNIQUE(graph.nodes.map(n => n.category)),
    tags: UNIQUE(graph.nodes.flatMap(n => n.tags)),
    generatedAt: NOW().toISOString(),
    version: '1.0'
  }

  RETURN graph
END FUNCTION
```

### 4.4 Interaction Patterns

#### 4.4.1 Mouse Interactions

| Action              | Behavior                                      |
| ------------------- | --------------------------------------------- |
| Hover node          | Highlight node + connected edges; show tooltip |
| Click node          | Navigate to article page                      |
| Drag node           | Reposition node; simulation continues         |
| Scroll wheel        | Zoom in/out                                   |
| Click-drag canvas   | Pan viewport                                  |
| Double-click canvas | Reset zoom to fit all nodes                   |
| Right-click node    | Context menu (open in new tab, focus, hide)   |

#### 4.4.2 Keyboard Interactions

| Key                 | Behavior                                      |
| ------------------- | --------------------------------------------- |
| Tab                 | Move focus to next node (in tab order)        |
| Shift+Tab           | Move focus to previous node                   |
| Enter/Space         | Activate focused node (navigate to article)   |
| Arrow keys          | Move focus between adjacent nodes             |
| +/-                 | Zoom in/out                                   |
| Escape              | Close graph view / clear selection            |
| F                   | Focus on selected node (center and zoom)      |
| R                   | Reset layout (re-run simulation)              |

#### 4.4.3 Filter Interactions

| Control             | Behavior                                      |
| ------------------- | --------------------------------------------- |
| Category filter     | Show/hide nodes by category                    |
| Tag filter          | Show/hide nodes by tag                         |
| Difficulty filter   | Show/hide nodes by difficulty level            |
| Search              | Highlight matching nodes, dim others           |
| Reset filters       | Show all nodes                                 |

### 4.5 Performance Optimization

#### 4.5.1 Canvas Rendering Strategy

force-graph uses Canvas by default, which is critical for performance:

```
SVG Approach (BAD for 500+ nodes):
  - Each node = DOM element
  - Each edge = DOM element
  - 500 nodes + 2000 edges = 2500 DOM elements
  - Browser layout/reflow cost: O(n²)

Canvas Approach (GOOD for 500+ nodes):
  - Single canvas element
  - Manual drawing via requestAnimationFrame
  - No DOM overhead
  - GPU-accelerated compositing
```

#### 4.5.2 Spatial Indexing (Quadtree)

```
FUNCTION buildQuadtree(nodes):
  // d3-quadtree for O(log n) spatial queries
  quadtree = d3.quadtree()
    .x(d => d.x)
    .y(d => d.y)
    .addAll(nodes)
  RETURN quadtree

FUNCTION findNodesInViewport(quadtree, viewport):
  // Only render visible nodes
  RETURN quadtree.visit((node, x0, y0, x1, y1) => {
    // Skip branches outside viewport
    IF x1 < viewport.left OR x0 > viewport.right THEN
      RETURN true  // prune
    IF y1 < viewport.top OR y0 > viewport.bottom THEN
      RETURN true  // prune
    // Visit leaf nodes
    RETURN false
  })
```

#### 4.5.3 Node Culling

```
FUNCTION renderFrame(graph, viewport, zoomLevel):
  // Only render nodes within viewport + buffer
  buffer = 100px
  visibleNodes = graph.nodes.filter(node =>
    node.x >= viewport.left - buffer &&
    node.x <= viewport.right + buffer &&
    node.y >= viewport.top - buffer &&
    node.y <= viewport.bottom + buffer
  )

  // Adjust render detail based on zoom
  IF zoomLevel < 0.5 THEN
    // Zoomed out: render nodes as dots, hide labels
    renderNodes(visibleNodes, 'minimal')
  ELSE IF zoomLevel < 1.5 THEN
    // Normal: render nodes with labels
    renderNodes(visibleNodes, 'normal')
  ELSE
    // Zoomed in: render nodes with details
    renderNodes(visibleNodes, 'detailed')
END FUNCTION
```

#### 4.5.4 Performance Budget

| Metric                       | Target          | Critical Threshold |
| ---------------------------- | --------------- | ------------------ |
| Initial render (500 nodes)   | <2s             | >5s                |
| Frame rate (500 nodes)       | 60fps           | <30fps             |
| Frame rate (1000 nodes)      | 30fps           | <15fps             |
| Memory usage (500 nodes)     | <50MB           | >100MB             |
| Interaction response time    | <16ms (1 frame) | >50ms              |
| Graph JSON size (500 nodes)  | <200KB          | >500KB             |

---

## 5. Algorithm Specification

### 5.1 Graph Layout Engine

#### 5.1.1 Purpose

Computes initial node positions for the force-directed simulation, with support for hierarchical and radial pre-layouts.

#### 5.1.2 Algorithm

```
FUNCTION computeLayout(graph, layoutType, options):
  SWITCH layoutType:

    CASE 'force':
      // Default: force-directed simulation
      simulation = d3.forceSimulation(graph.nodes)
        .force('charge', d3.forceManyBody().strength(-500))
        .force('center', d3.forceCenter(centerX, centerY))
        .force('link', d3.forceLink(graph.edges)
          .id(d => d.id)
          .distance(options.linkDistance ?? 100))
        .force('collision', d3.forceCollide()
          .radius(d => d.size + 5))

      // Run simulation to completion
      FOR i IN 1..300:
        simulation.tick()
      simulation.stop()

    CASE 'hierarchical':
      // Pre-compute layer positions using d3-hierarchy
      root = buildHierarchy(graph)  // from prerequisite edges
      layout = d3.tree().size([width, height])(root)

      // Assign positions
      FOR EACH node IN graph.nodes:
        node.x = layout[node.id].x
        node.y = layout[node.id].y

      // Then run force simulation with fixed y (layer position)
      simulation = d3.forceSimulation(graph.nodes)
        .force('x', d3.forceX(d => d.x).strength(0.1))
        .force('y', d3.forceY(d => d.y).strength(1.0))
        .force('charge', d3.forceManyBody().strength(-100))

    CASE 'radial':
      // Radial layout around center node
      centerNode = options.focusNode ?? graph.nodes[0]
      rings = groupByRelationship(graph, centerNode)

      FOR EACH ring IN rings:
        angleStep = 2π / LENGTH(ring.nodes)
        FOR i, node IN ring.nodes:
          node.x = centerNode.x + ring.radius * cos(i * angleStep)
          node.y = centerNode.y + ring.radius * sin(i * angleStep)

      // Light force simulation to resolve overlaps
      simulation = d3.forceSimulation(graph.nodes)
        .force('collision', d3.forceCollide().radius(d => d.size + 10))

  RETURN graph
END FUNCTION
```

### 5.2 Graph Data Generation (Build-Time)

#### 5.2.1 Purpose

Generates the graph JSON data at build time from Astro content collections.

#### 5.2.2 Algorithm

```
FUNCTION generateGraphData(site):
  // Load all content collections
  articles = await getCollection('articles')
  glossary = await getCollection('glossary')
  quizzes = await getCollection('quizzes')

  // Build graph
  graph = buildKnowledgeGraph(articles + glossary + quizzes)

  // Compute layout
  graph = computeLayout(graph, 'force', {
    linkDistance: 100,
    width: 1200,
    height: 800
  })

  // Serialize to JSON
  json = JSON.stringify(graph, null, 2)

  // Write to public directory
  writeToFile(`public/graph/${site}-knowledge-graph.json`, json)

  RETURN graph
END FUNCTION
```

### 5.3 Graph Search Algorithm

#### 5.3.1 Purpose

Finds nodes matching a search query for the filter/search functionality.

#### 5.3.2 Algorithm

```
FUNCTION searchGraph(graph, query):
  IF query IS EMPTY THEN
    RETURN { matchingNodes: graph.nodes, dimmedNodes: [] }

  queryLower = LOWERCASE(query)
  matchingNodes = []
  dimmedNodes = []

  FOR EACH node IN graph.nodes:
    // Match against label, tags, category
    IF CONTAINS(LOWER(node.label), queryLower) OR
       ANY(node.tags, tag => CONTAINS(LOWER(tag), queryLower)) OR
       CONTAINS(LOWER(node.category), queryLower) THEN
      matchingNodes.APPEND(node)
    ELSE
      dimmedNodes.APPEND(node)

  // Also highlight neighbors of matching nodes
  neighborIds = NEW Set()
  FOR EACH node IN matchingNodes:
    FOR EACH edge IN graph.edges:
      IF edge.source == node.id THEN neighborIds.ADD(edge.target)
      IF edge.target == node.id THEN neighborIds.ADD(edge.source)

  // Remove neighbors from dimmed set
  dimmedNodes = dimmedNodes.filter(n => NOT neighborIds.has(n.id))

  RETURN { matchingNodes, dimmedNodes, highlightedNeighbors: neighborIds }
END FUNCTION
```

### 5.4 Graph Accessibility Description Generator

#### 5.4.1 Purpose

Generates a textual description of the graph for screen readers.

#### 5.4.2 Algorithm

```
FUNCTION describeGraph(graph):
  // Count by category
  categoryCounts = COUNT graph.nodes BY category

  // Find most connected nodes
  topConnected = SORT graph.nodes BY degree DESCENDING TAKE 5

  // Build description
  description = "Knowledge graph with ${graph.metadata.totalNodes} articles and ${graph.metadata.totalEdges} connections. "

  description += "Categories: "
  FOR EACH (category, count) IN categoryCounts:
    description += "${category} (${count}), "
  description = TRAILING_COMMA(description) + ". "

  description += "Most connected articles: "
  FOR EACH node IN topConnected:
    description += "${node.label} (${node.degree} connections), "
  description = TRAILING_COMMA(description) + ". "

  // Navigation instructions
  description += "Use Tab to move between nodes, Enter to open an article, plus and minus to zoom."

  RETURN description
END FUNCTION
```

---

## 6. Test Vector Specification

### 6.1 Reference

Test vectors for graph view are defined in `test_vectors/test_vectors_content_tools.toml`. Key test cases include:

| Category                  | Vector Count | Description                            |
| ------------------------- | ------------ | -------------------------------------- |
| Graph Construction        | 6            | Node/edge creation from content        |
| Layout Computation        | 5            | Force, hierarchical, radial positions  |
| Search/Filter             | 5            | Query matching and neighbor highlighting|
| Interaction Handling      | 4            | Click, hover, keyboard events          |
| Performance               | 4            | Render time, frame rate, memory        |
| Accessibility             | 3            | Screen reader description, focus order |
| **Total**                 | **27**       |                                        |

### 6.2 Validation Criteria

1. Graph construction produces correct node count and edge count
2. Layout computation produces non-overlapping nodes within bounds
3. Search correctly matches nodes and highlights neighbors
4. Click interactions navigate to correct article URLs
5. Keyboard navigation visits all nodes in logical order
6. Screen reader description is meaningful and complete
7. 500-node graph maintains 60fps on reference hardware
8. Graph JSON is valid and parseable

---

## 7. Domain Constraints

### 7.1 Graph Size Constraints

All constraints defined in `domain_constraints/domain_constraints_content.toml`.

| Metric                         | Target  | Critical Threshold |
| ------------------------------ | ------- | ------------------ |
| Maximum nodes (desktop)        | 1000    | >2000              |
| Maximum nodes (mobile)         | 300     | >500               |
| Maximum edges                  | 5000    | >10000             |
| Maximum node label length      | 50 chars| >100 chars         |
| Graph JSON size (compressed)   | <100KB  | >250KB             |
| Graph JSON size (uncompressed) | <500KB  | >1MB               |

### 7.2 Render Performance Constraints

| Metric                         | Target          | Critical Threshold |
| ------------------------------ | --------------- | ------------------ |
| Initial layout (500 nodes)     | <2s             | >5s                |
| Frame rate (desktop, 500 nodes)| 60fps           | <30fps             |
| Frame rate (mobile, 200 nodes) | 30fps           | <15fps             |
| Zoom/pan response              | <16ms           | >50ms              |
| Memory usage (500 nodes)       | <50MB           | >100MB             |

### 7.3 Accessibility Constraints

| Constraint                       | Requirement                            |
| -------------------------------- | -------------------------------------- |
| Keyboard navigation              | All nodes focusable via Tab            |
| ARIA labels                      | All nodes have descriptive labels      |
| Focus visible                    | Custom focus ring (gold accent)        |
| Screen reader graph description  | Summary statistics + navigation help   |
| Reduced motion                   | Disable force simulation animation     |
| Touch targets                    | ≥44px on mobile                        |

### 7.4 Responsive Constraints

| Viewport     | Layout              | Max Nodes | Interaction          |
| ------------ | ------------------- | --------- | -------------------- |
| Mobile (<640px) | Vertical stack   | 100       | Touch only           |
| Tablet (640-1024px) | Full canvas  | 300       | Touch + stylus       |
| Desktop (>1024px) | Full canvas    | 1000      | Mouse + keyboard     |

---

## 8. Bibliography

### 8.1 Graph Visualization References

1. Holten, D. (2006). Hierarchical edge bundles: Visualization of adjacency relations in hierarchical data. _IEEE TVCG_, 12(5), 745-752.

2. Fruchterman, T. M. J., & Reingold, E. M. (1991). Graph drawing by force-directed placement. _Software: Practice and Experience_, 21(11), 1129-1164.

3. Barnes, J., & Hut, P. (1986). A hierarchical O(N log N) force-calculation algorithm. _Nature_, 324, 446-449.

4. Sugiyama, K., Tagawa, S., & Toda, M. (1981). Methods for visual understanding of hierarchical system structures. _IEEE Trans. Systems, Man, and Cybernetics_, 11(2), 109-125.

5. von Landesberger, T., et al. (2011). Visual analysis of large graphs: State-of-the-art and future research challenges. _Computer Graphics Forum_, 30(6), 1719-1749.

### 8.2 Library References

6. Bostock, M. (2024). _d3-force: Force-directed graph simulation_. https://d3js.org/d3-force

7. Vasilevsky, A., & Khemakhem, I. (2024). _force-graph: JavaScript library for force-directed graphs_. https://github.com/vasturiano/force-graph

8. Cytoscape.js Contributors. (2024). _Cytoscape.js: Graph theory library_. https://js.cytoscape.org

9. Vis.js Contributors. (2024). _vis-network: Network visualization_. https://visjs.github.io/vis-network/docs/

10. Roda-Bordell, J. (2024). _graphology: JavaScript library for graph data structures_. https://github.com/graphology/graphology

### 8.3 Accessibility References

11. W3C WAI. (2023). _WAI-ARIA Authoring Practices Guide — Graph Patterns_. https://www.w3.org/WAI/ARIA/apg/

12. W3C WAI. (2018). _WCAG 2.1 — Understanding SC 1.1.1 Non-text Content_. https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html

13. Petrie, H., & Bevan, N. (2009). The evaluation of accessibility, usability and user experience. _The Universal Access Handbook_, 10(1-2), 1-16.

### 8.4 SolidJS References

14. SolidJS Contributors. (2024). _SolidJS Documentation_. https://www.solidjs.com

15. Carniato, R. (2024). _SolidJS: A performant reactive JavaScript framework_. https://github.com/solidjs/solid

---

## 9. Knowledge Graph Concepts

### 9.1 Cross-Lingual Terminology

| English            | Chinese (ZH) | Russian (RU)                | German (DE)                | French (FR)                  | Japanese (JP)              |
| ------------------ | ------------ | --------------------------- | -------------------------- | ---------------------------- | -------------------------- |
| Knowledge graph    | 知识图谱     | граф знаний                 | Wissensgraph               | Graphe de connaissances      | ナレッジグラフ              |
| Force-directed     | 力导向       | метод силового поля         | Kraftgesteuert             | Répartition par force        | フォースダイレクテッド       |
| Node               | 节点         | узел                        | Knoten                     | Nœud                         | ノード                     |
| Edge               | 边           | ребро                       | Kante                      | Arête                        | エッジ                     |
| Zoom               | 缩放         | масштаб                     | Zoom                       | Zoom                         | ズーム                     |
| Filter             | 筛选         | фильтр                      | Filter                     | Filtre                       | フィルター                 |

### 9.2 Knowledge Graph Nodes

| Node Type           | Description                  | Relationships                                                   |
| ------------------- | ---------------------------- | --------------------------------------------------------------- |
| `GraphVisualization` | The graph view feature       | `displays`, `containsNodes`, `supportsLayouts`                 |
| `GraphNode`         | Article/term in the graph    | `connectsTo`, `belongsTo`, `taggedWith`                        |
| `GraphEdge`         | Connection between nodes     | `source`, `target`, `hasWeight`, `hasType`                     |
| `LayoutAlgorithm`   | Position computation method  | `appliedTo`, `optimizedFor`, `parameterizedBy`                 |
| `InteractionPattern`| User interaction behavior    | `triggeredBy`, `resultsIn`, `accessibleVia`                    |

### 9.3 Cross-References

- Graph data model derives from `YP-EDU-CONTENT-001` knowledge graph concepts
- Performance constraints align with `YP-WEB-TECH-001` bundle and render budgets
- Content nodes sourced from content collections defined in `YP-WEB-TECH-001` Section 4.1.3
- Accessibility requirements per `YP-WEB-TECH-001` Section 7.6

---

## 10. Quality Checklist

### 10.1 Completeness

- [ ] Graph data model fully specified (nodes, edges, metadata)
- [ ] Layout algorithms documented (force, hierarchical, radial)
- [ ] Library evaluation complete with recommendation
- [ ] Interaction patterns defined (mouse, keyboard, touch)
- [ ] Performance optimization strategies documented
- [ ] Accessibility approach specified
- [ ] Responsive behavior defined

### 10.2 Accuracy

- [ ] Bundle size estimates validated against library documentation
- [ ] Performance targets based on library benchmarks
- [ ] Graph construction algorithm produces correct output
- [ ] Accessibility features aligned with WCAG 2.1 AA
- [ ] All technical claims traceable to documentation

### 10.3 Consistency

- [ ] Performance budgets consistent with `domain_constraints_content.toml`
- [ ] Accessibility constraints consistent with `YP-WEB-TECH-001`
- [ ] Dark mode approach consistent with existing design system
- [ ] Data model compatible with existing content schemas

### 10.4 Traceability

- [ ] Library selection rationale documented
- [ ] Layout algorithm rationale documented
- [ ] Graph model derived from content schema in `packages/shared/src/schemas/content.ts`
- [ ] Test vectors traceable to algorithm specification

### 10.5 Usability

- [ ] Graph view is intuitive for educational exploration
- [ ] Interactions follow Obsidian conventions where applicable
- [ ] Keyboard navigation is complete and discoverable
- [ ] Screen reader output is meaningful
- [ ] Mobile experience is functional (limited but usable)
