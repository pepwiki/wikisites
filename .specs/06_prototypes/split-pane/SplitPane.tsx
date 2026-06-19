/**
 * SplitPane — CSS Grid-based resizable pane layout for Wikisites P1.
 *
 * Features:
 *  - Drag-to-resize handles
 *  - Keyboard resize (Ctrl+Alt+Arrow)
 *  - Min/max size constraints
 *  - localStorage persistence
 *  - Responsive stacking on mobile (≤768px)
 *
 * @module split-pane
 * @see BP-CONTENT-TOOLS-001 §5.3 IF-SPLIT-001
 */

import {
  createEffect,
  createMemo,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
  type Component,
  type JSX,
} from "solid-js";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Zod Schemas
// ---------------------------------------------------------------------------

export const PaneConfigSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  closable: z.boolean().optional().default(true),
  icon: z.string().optional(),
});

export type PaneConfig = z.infer<typeof PaneConfigSchema>;

export const SplitPanePropsSchema = z.object({
  panes: z.array(PaneConfigSchema).min(1),
  direction: z.enum(["horizontal", "vertical"]).optional().default("horizontal"),
  initialSizes: z.array(z.number().min(0).max(1)).optional(),
  minPaneSize: z.number().int().min(40).optional().default(120),
  persistKey: z.string().optional(),
  className: z.string().optional(),
  /** Render function for each pane content, keyed by pane id. */
  renderPane: z.function().args(z.string()).returns(z.any()),
});

export type SplitPaneProps = z.infer<typeof SplitPanePropsSchema>;

export const SplitPaneStateSchema = z.object({
  sizes: z.array(z.number()),
  activePanes: z.array(z.number()),
  isStacked: z.boolean(),
  responsiveDirection: z.enum(["horizontal", "vertical", "stacked"]),
});

export type SplitPaneState = z.infer<typeof SplitPaneStateSchema>;

// ---------------------------------------------------------------------------
// Persistence helpers
// ---------------------------------------------------------------------------

const STORAGE_PREFIX = "wikisites:split-pane:";

function loadPersistedSizes(key: string): number[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every((v) => typeof v === "number"))
      return null;
    return parsed;
  } catch {
    return null;
  }
}

function persistSizes(key: string, sizes: number[]): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(sizes));
  } catch {
    // localStorage full or unavailable — silently degrade
  }
}

// ---------------------------------------------------------------------------
// Normalize sizes to sum to 1.0
// ---------------------------------------------------------------------------

function normalizeSizes(raw: number[], count: number): number[] {
  if (raw.length !== count || raw.length === 0) {
    return Array(count).fill(1 / count);
  }
  const sum = raw.reduce((a, b) => a + b, 0);
  if (sum === 0) return Array(count).fill(1 / count);
  return raw.map((s) => s / sum);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * CSS Grid split-pane layout with drag-to-resize.
 */
const SplitPane: Component<SplitPaneProps> = (props) => {
  const resolved = () => SplitPanePropsSchema.parse(props);

  const paneCount = () => resolved().panes.length;
  const isSingle = () => paneCount() === 1;

  // Initialize sizes
  const [sizes, setSizes] = createSignal<number[]>(() => {
    const persisted = resolved().persistKey
      ? loadPersistedSizes(resolved().persistKey)
      : null;
    return normalizeSizes(
      persisted ?? resolved().initialSizes ?? Array(paneCount()).fill(1 / paneCount()),
      paneCount(),
    );
  });

  // Persist on size change
  createEffect(() => {
    if (resolved().persistKey) {
      persistSizes(resolved().persistKey, sizes());
    }
  });

  const [isStacked, setIsStacked] = createSignal(false);

  // Responsive: stack at ≤768px
  onMount(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsStacked(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsStacked(e.matches);
    mq.addEventListener("change", handler);
    onCleanup(() => mq.removeEventListener("change", handler));
  });

  // ---- Drag resize logic ----
  const [dragging, setDragging] = createSignal(false);
  let containerRef: HTMLDivElement | undefined;

  const handleMouseDown = (index: number, e: MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    const container = containerRef;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const isHoriz = resolved().direction === "horizontal" && !isStacked();
    const totalSize = isHoriz ? rect.width : rect.height;
    const minRatio = resolved().minPaneSize / totalSize;
    const startSizes = [...sizes()];

    const onMove = (ev: MouseEvent) => {
      const pos = isHoriz ? ev.clientX - rect.left : ev.clientY - rect.top;
      let ratio = Math.max(0, Math.min(1, pos / totalSize));

      // Clamp to min
      const leftMin = minRatio;
      const rightMin = minRatio;
      ratio = Math.max(leftMin, Math.min(1 - rightMin, ratio));

      // Compute new sizes
      const leftSize = ratio;
      const rightSize = 1 - ratio;
      const sumLeft = startSizes.slice(0, index).reduce((a, b) => a + b, 0);
      const sumRight = startSizes
        .slice(index + 1)
        .reduce((a, b) => a + b, 0);

      const newSizes = [...startSizes];
      newSizes[index] = leftSize - sumLeft;
      newSizes[index + 1] = rightSize - sumRight;

      // Normalize
      const total = newSizes.reduce((a, b) => a + b, 0);
      if (total > 0) setSizes(newSizes.map((s) => s / total));
    };

    const onUp = () => {
      setDragging(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  // ---- Keyboard resize ----
  const handleKeyDown = (index: number, e: KeyboardEvent) => {
    if (!e.ctrlKey || !e.altKey) return;
    const step = 0.05;
    const newSizes = [...sizes()];
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      if (index > 0) {
        const delta = Math.min(step, newSizes[index] - resolved().minPaneSize / 800);
        newSizes[index] -= delta;
        newSizes[index - 1] += delta;
      }
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      if (index < newSizes.length - 1) {
        const delta = Math.min(
          step,
          newSizes[index + 1] - resolved().minPaneSize / 800,
        );
        newSizes[index] += delta;
        newSizes[index + 1] -= delta;
      }
    } else {
      return;
    }
    e.preventDefault();
    const sum = newSizes.reduce((a, b) => a + b, 0);
    if (sum > 0) setSizes(newSizes.map((s) => s / sum));
  };

  const gridTemplate = createMemo(() => {
    if (isStacked()) return "1fr";
    const fractionStr = sizes().map((s) => `${s}fr`).join(" ");
    return resolved().direction === "horizontal"
      ? `grid-template-columns: ${fractionStr}`
      : `grid-template-rows: ${fractionStr}`;
  });

  return (
    <div
      ref={containerRef}
      class={`grid ${resolved().className ?? ""} ${
        dragging() ? "select-none" : ""
      } ${isStacked() ? "grid-cols-1 gap-2" : "gap-0"}`}
      style={isStacked() ? undefined : gridTemplate()}
      role="group"
      aria-label="Split pane layout"
    >
      <For each={resolved().panes}>
        {(pane, i) => (
          <>
            <Show when={i() > 0 && !isStacked()}>
              <div
                class={`${
                  resolved().direction === "horizontal"
                    ? "w-1 cursor-col-resize hover:bg-blue-400 dark:hover:bg-blue-500"
                    : "h-1 cursor-row-resize hover:bg-blue-400 dark:hover:bg-blue-500"
                } bg-slate-300 dark:bg-slate-600 transition-colors z-10`}
                role="separator"
                aria-orientation={resolved().direction === "horizontal" ? "vertical" : "horizontal"}
                aria-valuenow={Math.round(sizes()[i()] * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Resize between ${resolved().panes[i() - 1].title} and ${pane.title}`}
                tabIndex={0}
                onMouseDown={(e) => handleMouseDown(i(), e)}
                onKeyDown={(e) => handleKeyDown(i() - 1, e)}
              />
            </Show>
            <div
              class="overflow-auto p-2"
              role="region"
              aria-label={`${pane.title} pane`}
            >
              <div class="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                {pane.title}
              </div>
              {resolved().renderPane(pane.id)}
            </div>
          </>
        )}
      </For>
    </div>
  );
};

export default SplitPane;
