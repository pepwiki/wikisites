import { createSignal, onMount, onCleanup, Show } from "solid-js";
import type { GraphData } from "../lib/graph-data";
import { truncateData } from "../lib/graph-data";

// ─── Lazy-loaded force-graph wrapper ─────────────────────────────────────────

/**
 * Dynamically imported force-graph instance. This avoids SSR breakage since
 * `force-graph` accesses `window`/`document` at import time.
 *
 * The module has no bundled type declarations, so we define a minimal
 * interface for the instance returned after dynamic import.
 */
interface ForceGraphInstance {
  zoom(): ForceGraphInstance;
  zoom(level: number): ForceGraphInstance;
  zoomToFit(width: number, height: number, padding?: number): ForceGraphInstance;
  width(): ForceGraphInstance;
  width(w: number): ForceGraphInstance;
  height(): ForceGraphInstance;
  height(h: number): ForceGraphInstance;
  graphData(): ForceGraphInstance;
  graphData(data: unknown): ForceGraphInstance;
  nodeLabel(fn: (node: unknown) => string): ForceGraphInstance;
  nodeColor(fn: (node: unknown) => string): ForceGraphInstance;
  nodeVal(fn: (node: unknown) => number): ForceGraphInstance;
  linkColor(fn: (link: unknown) => string): ForceGraphInstance;
  linkWidth(w: number): ForceGraphInstance;
  linkDirectionalParticles(n: number): ForceGraphInstance;
  backgroundColor(color: string): ForceGraphInstance;
  onNodeClick(fn: (node: unknown) => void): ForceGraphInstance;
  _destructor?: () => void;
}

async function loadForceGraph(): Promise<
  (container: HTMLElement) => ForceGraphInstance
> {
  // force-graph is a client-only dependency; SSR will never reach this path
  // but the dynamic import keeps it out of the server bundle.
  // @ts-expect-error — no type declarations for force-graph
  const mod = await import("force-graph");
  // Handle both ESM default-export and CJS interop shapes
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return mod.default ?? mod;
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface GraphViewProps {
  data: GraphData;
  onNodeClick?: (id: string) => void;
  maxNodes?: number;
}

// ─── Controls overlay ────────────────────────────────────────────────────────

function ZoomControls(props: {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}) {
  return (
    <div class="absolute bottom-3 right-3 flex flex-col gap-1 z-10">
      <button
        type="button"
        onClick={props.onZoomIn}
        class="w-8 h-8 flex items-center justify-center rounded bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm font-bold"
        aria-label="Zoom in"
      >
        +
      </button>
      <button
        type="button"
        onClick={props.onZoomOut}
        class="w-8 h-8 flex items-center justify-center rounded bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm font-bold"
        aria-label="Zoom out"
      >
        −
      </button>
      <button
        type="button"
        onClick={props.onReset}
        class="w-8 h-8 flex items-center justify-center rounded bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs"
        aria-label="Reset zoom"
      >
        ⊙
      </button>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function GraphView(props: GraphViewProps) {
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal(false);
  let containerRef: HTMLDivElement | undefined;
  let graphInstance: ForceGraphInstance;

  const graphData = () =>
    props.maxNodes
      ? truncateData(props.data, props.maxNodes)
      : props.data;

  const handleZoomIn = () => {
    if (graphInstance && typeof graphInstance.zoom === "function") {
      graphInstance.zoom(graphInstance.zoom() * 1.3);
    }
  };

  const handleZoomOut = () => {
    if (graphInstance && typeof graphInstance.zoom === "function") {
      graphInstance.zoom(graphInstance.zoom() / 1.3);
    }
  };

  const handleReset = () => {
    if (graphInstance && typeof graphInstance.zoomToFit === "function") {
      const el = containerRef;
      if (el) {
        graphInstance.zoomToFit(el.clientWidth * 0.9, 400);
      }
    }
  };

  onMount(async () => {
    if (!containerRef) return;

    try {
      const ForceGraph = await loadForceGraph();

      const graph = ForceGraph(containerRef)
        .graphData(graphData())
        .nodeLabel((node: { label: string }) => node.label)
        .nodeColor((node: { group: string }) => {
          const groups: Record<string, string> = {
            default: "#0f766e",
            concept: "#7c3aed",
            example: "#ea580c",
          };
          return groups[node.group] ?? groups["default"];
        })
        .nodeVal((node: { degree: number }) => Math.max(1, node.degree))
        .linkColor(() => "#94a3b8")
        .linkWidth(0.5)
        .linkDirectionalParticles(0)
        .backgroundColor("rgba(0,0,0,0)")
        .width(containerRef.clientWidth)
        .height(containerRef.clientHeight);

      if (props.onNodeClick) {
        graph.onNodeClick((node: { id: string }) => {
          props.onNodeClick!(node.id);
        });
      }

      // Fit initial view after a tick
      requestAnimationFrame(() => {
        graph.zoomToFit(containerRef!.clientWidth * 0.9, 400);
      });

      graphInstance = graph;

      // ResizeObserver for responsive sizing
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (width > 0 && height > 0 && graphInstance) {
            graphInstance.width(width).height(height);
          }
        }
      });
      ro.observe(containerRef);

      onCleanup(() => {
        ro.disconnect();
        if (graphInstance && typeof graphInstance._destructor === "function") {
          graphInstance._destructor();
        }
      });

      setLoading(false);
    } catch {
      setError(true);
      setLoading(false);
    }
  });

  return (
    <div
      class="relative w-full h-full min-h-[300px] rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900 shadow-sm"
      role="img"
      aria-label="Knowledge graph visualization"
    >
      <Show
        when={!loading() && !error()}
        fallback={
          <div class="absolute inset-0 flex items-center justify-center bg-slate-50 dark:bg-slate-800">
            <Show
              when={!error()}
              fallback={
                <div class="text-center p-4">
                  <p class="text-sm text-slate-500 dark:text-slate-400">
                    Graph visualization unavailable
                  </p>
                </div>
              }
            >
              <div class="text-center p-4">
                <div class="inline-block w-6 h-6 border-2 border-[#0D9488] border-t-transparent rounded-full animate-spin mb-2" />
                <p class="text-xs text-slate-500 dark:text-slate-400">
                  Loading graph…
                </p>
              </div>
            </Show>
          </div>
        }
      >
        <div ref={containerRef} class="w-full h-full" />
        <ZoomControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={handleReset}
        />
      </Show>
    </div>
  );
}
