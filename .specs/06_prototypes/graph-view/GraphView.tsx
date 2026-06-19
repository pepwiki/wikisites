/**
 * GraphView — Knowledge graph visualization for Wikisites P1.
 *
 * Wraps `force-graph` (lazy-loaded) with a SolidJS interface.
 * Provides zoom/pan, click-to-navigate, tag/category filtering,
 * and responsive canvas sizing.
 *
 * @module graph-view
 * @see BP-CONTENT-TOOLS-001 §5.2 IF-GRAPH-001
 */

import {
  createEffect,
  createMemo,
  createResource,
  createSignal,
  For,
  Match,
  onCleanup,
  onMount,
  Show,
  Switch,
  type Component,
  type JSX,
} from "solid-js";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Zod Schemas
// ---------------------------------------------------------------------------

export const GraphNodeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  group: z.string().optional(),
  size: z.number().positive().optional(),
  color: z.string().optional(),
  href: z.string().optional(),
  meta: z.record(z.unknown()).optional(),
});

export type GraphNode = z.infer<typeof GraphNodeSchema>;

export const GraphEdgeSchema = z.object({
  source: z.string(),
  target: z.string(),
  label: z.string().optional(),
  weight: z.number().positive().optional(),
});

export type GraphEdge = z.infer<typeof GraphEdgeSchema>;

export const GraphDataSchema = z.object({
  nodes: z.array(GraphNodeSchema).min(1),
  edges: z.array(GraphEdgeSchema),
});

export type GraphData = z.infer<typeof GraphDataSchema>;

export const GraphViewPropsSchema = z.object({
  data: GraphDataSchema,
  layout: z.enum(["force", "radial", "hierarchical"]).optional().default("force"),
  maxNodes: z.number().int().positive().optional().default(1000),
  onNodeClick: z.function().args(GraphNodeSchema).returns(z.void()).optional(),
  onNodeHover: z
    .function()
    .args(z.union([GraphNodeSchema, z.null()]))
    .returns(z.void())
    .optional(),
  highlightQuery: z.string().optional(),
  className: z.string().optional(),
});

export type GraphViewProps = z.infer<typeof GraphViewPropsSchema>;

export const GraphMetaSchema = z.object({
  nodeCount: z.number().int(),
  edgeCount: z.number().int(),
  generatedAt: z.string(),
  contentVersion: z.string(),
});

export type GraphMeta = z.infer<typeof GraphMetaSchema>;

// ---------------------------------------------------------------------------
// Group color palette
// ---------------------------------------------------------------------------

const GROUP_COLORS: Record<string, string> = {
  article: "#3b82f6",
  tag: "#f59e0b",
  category: "#10b981",
  peptide: "#8b5cf6",
};

function groupColor(group: string | undefined): string {
  return GROUP_COLORS[group ?? ""] ?? "#6b7280";
}

// ---------------------------------------------------------------------------
// Lazy force-graph loader
// ---------------------------------------------------------------------------

type ForceGraphModule = typeof import("force-graph");

let _fgPromise: Promise<ForceGraphModule> | null = null;

function loadForceGraph(): Promise<ForceGraphModule> {
  if (!_fgPromise) {
    _fgPromise = import("force-graph") as unknown as Promise<ForceGraphModule>;
  }
  return _fgPromise;
}

// ---------------------------------------------------------------------------
// Truncation helper — keeps highest-degree nodes
// ---------------------------------------------------------------------------

function truncateData(data: GraphData, max: number): GraphData {
  if (data.nodes.length <= max) return data;
  // Build degree map
  const deg = new Map<string, number>();
  for (const n of data.nodes) deg.set(n.id, 0);
  for (const e of data.edges) {
    deg.set(e.source, (deg.get(e.source) ?? 0) + 1);
    deg.set(e.target, (deg.get(e.target) ?? 0) + 1);
  }
  const sorted = [...data.nodes].sort(
    (a, b) => (deg.get(b.id) ?? 0) - (deg.get(a.id) ?? 0),
  );
  const keep = new Set(sorted.slice(0, max).map((n) => n.id));
  return {
    nodes: data.nodes.filter((n) => keep.has(n.id)),
    edges: data.edges.filter((e) => keep.has(e.source) && keep.has(e.target)),
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Interactive knowledge graph visualization.
 * Canvas-based via force-graph, with SolidJS signal integration.
 */
const GraphView: Component<GraphViewProps> = (props) => {
  const resolved = () => GraphViewPropsSchema.parse(props);

  const containerRef: { current?: HTMLDivElement } = {};
  const [dimensions, setDimensions] = createSignal({ width: 800, height: 600 });
  const [hoveredNode, setHoveredNode] = createSignal<GraphNode | null>(null);
  const [activeGroups, setActiveGroups] = createSignal<Set<string> | null>(null);

  const truncatedData = createMemo(() =>
    truncateData(resolved().data, resolved().maxNodes),
  );

  const filteredData = createMemo(() => {
    const groups = activeGroups();
    if (!groups) return truncatedData();
    return {
      nodes: truncatedData().nodes.filter((n) => groups.has(n.group ?? "")),
      edges: truncatedData().edges.filter(
        (e) =>
          truncatedData().nodes.some((n) => n.id === e.source) &&
          truncatedData().nodes.some((n) => n.id === e.target),
      ),
    };
  });

  // Collect unique groups
  const groups = createMemo(() => {
    const g = new Set<string>();
    for (const n of truncatedData().nodes) {
      if (n.group) g.add(n.group);
    }
    return [...g];
  });

  // ---- force-graph integration ----
  let graphInstance: ReturnType<typeof import("force-graph").default> | null =
    null;

  const [forceGraphMod] = createResource(() => loadForceGraph());

  const initGraph = () => {
    const mod = forceGraphMod();
    if (!mod || !containerRef.current) return;
    const data = filteredData();

    const fg = mod.default(containerRef.current);
    graphInstance = fg;

    fg.graphData(data)
      .nodeId("id")
      .nodeLabel("label")
      .nodeColor((n: GraphNode) => n.color ?? groupColor(n.group))
      .nodeVal((n: GraphNode) => n.size ?? 4)
      .linkColor(() => "#999")
      .linkLabel((l: GraphEdge) => l.label ?? "")
      .linkWidth((l: GraphEdge) => l.weight ? Math.min(l.weight, 4) : 1)
      .onNodeClick((n: GraphNode) => {
        if (n.href) window.location.href = n.href;
        resolved().onNodeClick?.(n);
      })
      .onNodeHover((n: GraphNode | null) => {
        setHoveredNode(n);
        resolved().onNodeHover?.(n);
        containerRef.current!.style.cursor = n ? "pointer" : "default";
      })
      .width(dimensions().width)
      .height(dimensions().height);

    // Zoom to fit after initial render
    requestAnimationFrame(() => fg.zoomToFit(400));
  };

  onMount(() => initGraph());

  createEffect(() => {
    // React to filter changes
    void filteredData();
    if (graphInstance) {
      graphInstance.graphData(filteredData());
      requestAnimationFrame(() => graphInstance?.zoomToFit(400));
    }
  });

  onCleanup(() => {
    if (graphInstance) {
      graphInstance._destructor?.();
      graphInstance = null;
    }
  });

  // Responsive sizing via ResizeObserver
  onMount(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
        graphInstance?.width(width).height(height);
      }
    });
    ro.observe(containerRef.current);
    onCleanup(() => ro.disconnect());
  });

  // Toggle group filter
  const toggleGroup = (group: string) => {
    const current = activeGroups();
    if (!current) {
      // First toggle — exclude this group
      const next = new Set(groups());
      next.delete(group);
      setActiveGroups(next.size === groups().size ? null : next);
    } else if (current.has(group)) {
      current.delete(group);
      setActiveGroups(current.size === 0 ? null : new Set(current));
    } else {
      current.add(group);
      setActiveGroups(
        current.size === groups().size ? null : new Set(current),
      );
    }
  };

  const isTruncated = () => resolved().data.nodes.length > resolved().maxNodes;

  return (
    <div class={`relative ${resolved().className ?? ""}`}>
      <Show when={isTruncated()}>
        <div
          class="absolute top-2 right-2 z-10 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-1 rounded"
          role="alert"
        >
          Showing {resolved().maxNodes} of {resolved().data.nodes.length} nodes
        </div>
      </Show>

      <Show when={groups().length > 1}>
        <div class="flex gap-1 mb-2" role="group" aria-label="Filter by category">
          <For each={groups()}>
            {(group) => (
              <button
                type="button"
                class={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
                  !activeGroups() || activeGroups()!.has(group)
                    ? "bg-blue-100 dark:bg-blue-800 border-blue-300 dark:border-blue-600"
                    : "bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 opacity-50"
                }`}
                onClick={() => toggleGroup(group)}
                aria-pressed={!activeGroups() || activeGroups()!.has(group)}
              >
                <span
                  class="inline-block w-2 h-2 rounded-full mr-1"
                  style={{ "background-color": groupColor(group) }}
                />
                {group}
              </button>
            )}
          </For>
        </div>
      </Show>

      <div
        ref={(el) => (containerRef.current = el)}
        class="w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700"
        role="img"
        aria-label={`Knowledge graph with ${filteredData().nodes.length} nodes and ${filteredData().edges.length} edges`}
      />

      <Show when={hoveredNode()}>
        <div class="absolute bottom-2 left-2 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur text-xs px-2 py-1 rounded shadow">
          {hoveredNode()!.label}
          {hoveredNode()!.group ? ` (${hoveredNode()!.group})` : ""}
        </div>
      </Show>
    </div>
  );
};

export default GraphView;
