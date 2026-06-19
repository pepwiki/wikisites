/**
 * Graph data model and builder for knowledge-graph visualisation.
 *
 * Pure functions that convert a page collection into a graph structure
 * suitable for force-graph rendering. No DOM dependencies.
 *
 * @module graph-data
 */

import { z } from "zod";

// ─── Zod Schemas ─────────────────────────────────────────────────────────────

export const GraphNodeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  group: z.string().default("default"),
  degree: z.number().int().nonnegative().default(0),
});

export const GraphEdgeSchema = z.object({
  source: z.string().min(1),
  target: z.string().min(1),
  weight: z.number().positive().default(1),
});

export const GraphDataSchema = z.object({
  nodes: z.array(GraphNodeSchema),
  edges: z.array(GraphEdgeSchema),
});

// ─── Types ───────────────────────────────────────────────────────────────────

export type GraphNode = z.infer<typeof GraphNodeSchema>;
export type GraphEdge = z.infer<typeof GraphEdgeSchema>;
export type GraphData = z.infer<typeof GraphDataSchema>;

/** Minimal page shape accepted by {@link buildGraphFromPages}. */
export interface PageEntry {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly group?: string;
  readonly links?: readonly string[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Compute degree (number of incident edges) for every node in the graph.
 *
 * Mutates each node's `degree` field in-place **and** returns the updated
 * data for convenience.
 */
export function computeDegrees(data: GraphData): GraphData {
  const degreeMap = new Map<string, number>();

  for (const edge of data.edges) {
    degreeMap.set(edge.source, (degreeMap.get(edge.source) ?? 0) + 1);
    degreeMap.set(edge.target, (degreeMap.get(edge.target) ?? 0) + 1);
  }

  for (const node of data.nodes) {
    node.degree = degreeMap.get(node.id) ?? 0;
  }

  return data;
}

// ─── Builder ─────────────────────────────────────────────────────────────────

/**
 * Build graph nodes and edges from a page collection.
 *
 * Each page becomes a node. For every outbound link that resolves to another
 * page in the collection an edge is created. Links to unknown pages are
 * silently ignored.
 *
 * @param pages - Array of page entries (from a content collection)
 * @returns GraphData with degrees computed
 */
export function buildGraphFromPages(pages: readonly PageEntry[]): GraphData {
  const slugToId = new Map<string, string>();
  for (const page of pages) {
    slugToId.set(page.slug, page.id);
  }

  const nodes: GraphNode[] = pages.map((page) => ({
    id: page.id,
    label: page.title,
    group: page.group ?? "default",
    degree: 0,
  }));

  const edgeSet = new Set<string>();
  const edges: GraphEdge[] = [];

  for (const page of pages) {
    if (!page.links) continue;
    for (const link of page.links) {
      const targetId = slugToId.get(link);
      if (!targetId || targetId === page.id) continue;

      const key = [page.id, targetId].sort().join("::");
      if (edgeSet.has(key)) continue;
      edgeSet.add(key);

      edges.push({ source: page.id, target: targetId, weight: 1 });
    }
  }

  const graph: GraphData = { nodes, edges };
  return computeDegrees(graph);
}

// ─── Truncation ──────────────────────────────────────────────────────────────

/**
 * Keep only the `maxNodes` highest-degree nodes (and their connecting edges).
 *
 * If `maxNodes` is 0 or greater than the current node count the data is
 * returned unchanged.
 *
 * @param data - Original graph data
 * @param maxNodes - Maximum number of nodes to keep
 * @returns New GraphData with at most `maxNodes` nodes
 */
export function truncateData(data: GraphData, maxNodes: number): GraphData {
  if (maxNodes <= 0 || data.nodes.length <= maxNodes) {
    return data;
  }

  const sorted = [...data.nodes].sort((a, b) => b.degree - a.degree);
  const kept = sorted.slice(0, maxNodes);
  const keptIds = new Set(kept.map((n) => n.id));

  return {
    nodes: kept,
    edges: data.edges.filter(
      (e) => keptIds.has(e.source) && keptIds.has(e.target)
    ),
  };
}
