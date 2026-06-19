/**
 * SplitPane — CSS Grid-based resizable two-pane layout.
 *
 * Features:
 * - Drag-to-resize via pointer events
 * - Keyboard resize (Ctrl+Alt+Arrow)
 * - Min/max ratio constraints
 * - localStorage persistence of split ratio
 * - Responsive: auto-collapse to stacked on mobile (≤768px)
 *
 * @module components/SplitPane
 */

import {
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
  type Component,
  type JSX,
} from "solid-js";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY_PREFIX = "wikisites:split-pane:";
const MOBILE_BREAKPOINT = 768;
const KEYBOARD_STEP = 0.05;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SplitPaneProps {
  left: JSX.Element;
  right: JSX.Element;
  /** Initial split ratio (0–1). Default: 0.5 */
  defaultRatio?: number;
  /** Minimum left pane ratio. Default: 0.2 */
  minRatio?: number;
  /** Maximum left pane ratio. Default: 0.8 */
  maxRatio?: number;
  /** localStorage key for persistence. Omit to disable. */
  persistKey?: string;
  /** Additional class on the root container. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function loadPersisted(key: string): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    if (raw === null) return null;
    const parsed = JSON.parse(raw);
    return typeof parsed === "number" && parsed >= 0 && parsed <= 1 ? parsed : null;
  } catch {
    return null;
  }
}

function persist(key: string, ratio: number): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(ratio));
  } catch {
    // localStorage full or unavailable — silently degrade
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Two-pane CSS Grid split layout with drag resize.
 *
 * @example
 * ```tsx
 * <SplitPane left={<FileTree />} right={<Editor />} persistKey="main" />
 * ```
 */
const SplitPane: Component<SplitPaneProps> = (props) => {
  const minRatio = () => props.minRatio ?? 0.2;
  const maxRatio = () => props.maxRatio ?? 0.8;
  const defaultRatio = () => clamp(props.defaultRatio ?? 0.5, minRatio(), maxRatio());

  const [ratio, setRatio] = createSignal(defaultRatio());
  const [isDragging, setIsDragging] = createSignal(false);
  const [isMobile, setIsMobile] = createSignal(false);

  let containerRef: HTMLDivElement | undefined;

  // --- Responsive stacking ---
  onMount(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    onCleanup(() => mq.removeEventListener("change", onChange));
  });

  // --- Load persisted ratio ---
  onMount(() => {
    if (props.persistKey) {
      const saved = loadPersisted(props.persistKey);
      if (saved !== null) {
        setRatio(clamp(saved, minRatio(), maxRatio()));
      }
    }
  });

  // --- Persist on change ---
  createEffect(() => {
    if (props.persistKey) {
      persist(props.persistKey, ratio());
    }
  });

  // --- Grid style ---
  const gridStyle = createMemo(() => {
    if (isMobile()) return undefined;
    const r = ratio();
    return `grid-template-columns: ${r}fr ${1 - r}fr`;
  });

  // --- Drag handlers ---
  const onPointerDown = (e: PointerEvent) => {
    if (isMobile()) return;
    e.preventDefault();
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    const startX = e.clientX;
    const startRatio = ratio();
    const container = containerRef;
    if (!container) return;
    const totalWidth = container.getBoundingClientRect().width;

    const onPointerMove = (ev: PointerEvent) => {
      const delta = ev.clientX - startX;
      const newRatio = clamp(startRatio + delta / totalWidth, minRatio(), maxRatio());
      setRatio(newRatio);
    };

    const onPointerUp = () => {
      setIsDragging(false);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  // --- Keyboard resize ---
  const onKeyDown = (e: KeyboardEvent) => {
    if (isMobile()) return;
    if (!e.ctrlKey || !e.altKey) return;
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const delta = e.key === "ArrowLeft" ? -KEYBOARD_STEP : KEYBOARD_STEP;
    setRatio((r) => clamp(r + delta, minRatio(), maxRatio()));
  };

  return (
    <div
      ref={containerRef}
      class={`grid h-full ${isMobile() ? "grid-cols-1 gap-2" : "gap-0"} ${props.className ?? ""}`}
      style={gridStyle()}
      role="group"
      aria-label="Split pane layout"
    >
      {/* Left pane */}
      <div class="overflow-auto min-w-0 min-h-0" role="region" aria-label="Left pane">
        {props.left}
      </div>

      {/* Drag handle — hidden on mobile */}
      {!isMobile() && (
        <div
          class={`relative z-10 flex items-center justify-center cursor-col-resize
            ${isDragging() ? "bg-teal-500/30" : "bg-slate-200 dark:bg-slate-700 hover:bg-teal-400/30 dark:hover:bg-teal-500/30"}
            transition-colors`}
          style="width: 4px;"
          role="separator"
          aria-orientation="vertical"
          aria-valuenow={Math.round(ratio() * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Resize panes"
          tabIndex={0}
          onPointerDown={onPointerDown}
          onKeyDown={onKeyDown}
        >
          {/* Grip dots */}
          <div class="flex flex-col gap-1 pointer-events-none">
            <div class="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500" />
            <div class="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500" />
            <div class="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500" />
          </div>
        </div>
      )}

      {/* Right pane */}
      <div class="overflow-auto min-w-0 min-h-0" role="region" aria-label="Right pane">
        {props.right}
      </div>
    </div>
  );
};

export default SplitPane;
