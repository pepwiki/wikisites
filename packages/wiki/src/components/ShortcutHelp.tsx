/**
 * ShortcutHelp — Keyboard shortcuts help overlay.
 *
 * Displays all registered shortcuts grouped by scope (global, article, modal).
 * Filter/search input to find shortcuts quickly. Accessible via `?` or `Ctrl+/`.
 * Modal dialog with keyboard navigation and platform-aware key display.
 *
 * Usage: `<ShortcutHelp bindings={bindings} onClose={close} />`
 *
 * @module components/ShortcutHelp
 * @see BP-POWER-USER-SHELL-001 §5.2
 */

import {
  createSignal,
  createMemo,
  For,
  Show,
  onMount,
  onCleanup,
  type Component,
} from "solid-js";
import {
  displayBinding,
  isMac,
  type Keybinding,
  type BindingScope,
} from "../lib/keyboard-shortcuts";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ShortcutHelpProps {
  /** All registered keybindings. */
  bindings: Keybinding[];
  /** Callback to close the overlay. */
  onClose: () => void;
}

/** Scope display labels. */
const SCOPE_LABELS: Record<BindingScope, string> = {
  global: "Global",
  article: "Article",
  modal: "Modal",
};

/** Scope sort order. */
const SCOPE_ORDER: BindingScope[] = ["global", "article", "modal"];

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Keyboard shortcuts help overlay with search, grouped display,
 * and keyboard navigation.
 */
const ShortcutHelp: Component<ShortcutHelpProps> = (props) => {
  const [query, setQuery] = createSignal("");
  const [selectedIndex, setSelectedIndex] = createSignal(0);
  let dialogRef: HTMLDivElement | undefined;
  let searchRef: HTMLInputElement | undefined;

  // Filter and group bindings
  const groupedBindings = createMemo(() => {
    const q = query().toLowerCase();
    const filtered = props.bindings.filter((b) => {
      if (!q) return true;
      return (
        b.description.toLowerCase().includes(q) ||
        b.action.toLowerCase().includes(q) ||
        displayBinding(b).toLowerCase().includes(q)
      );
    });

    const groups = new Map<BindingScope, Keybinding[]>();
    for (const scope of SCOPE_ORDER) {
      const scopeBindings = filtered.filter((b) => b.scope === scope);
      if (scopeBindings.length > 0) {
        groups.set(scope, scopeBindings);
      }
    }
    return groups;
  });

  const flatList = createMemo(() => {
    const list: Keybinding[] = [];
    for (const [, bindings] of groupedBindings()) {
      list.push(...bindings);
    }
    return list;
  });

  // Reset selection when query changes
  const onInput = (e: InputEvent) => {
    setQuery((e.target as HTMLInputElement).value);
    setSelectedIndex(0);
  };

  // Keyboard navigation
  const onKeyDown = (e: KeyboardEvent) => {
    const list = flatList();
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        props.onClose();
        break;
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, list.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setSelectedIndex(0);
        break;
      case "End":
        e.preventDefault();
        setSelectedIndex(list.length - 1);
        break;
    }
  };

  // Focus trap and initial focus
  onMount(() => {
    if (typeof document === "undefined") return;

    searchRef?.focus();

    // Trap focus within dialog
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !dialogRef) return;
      const focusable = dialogRef.querySelectorAll<HTMLElement>(
        'input, button, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTab);
    onCleanup(() => document.removeEventListener("keydown", handleTab));
  });

  return (
    <div
      class="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
      onClick={(e) => {
        if (e.target === e.currentTarget) props.onClose();
      }}
      onKeyDown={onKeyDown}
    >
      <div
        ref={dialogRef}
        class="bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-lg max-h-[80vh] flex flex-col mx-4"
      >
        {/* Header */}
        <div class="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 class="text-lg font-bold text-slate-900 dark:text-slate-100 font-heading">
            Keyboard Shortcuts
          </h2>
          <button
            onClick={props.onClose}
            class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Close shortcuts help"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div class="px-5 py-3 border-b border-slate-200 dark:border-slate-700">
          <div class="relative">
            <svg
              class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search shortcuts..."
              value={query()}
              onInput={onInput}
              class="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent"
              aria-label="Search keyboard shortcuts"
            />
          </div>
        </div>

        {/* Shortcuts list */}
        <div class="overflow-y-auto flex-1 px-5 py-3" role="list">
          <Show
            when={flatList().length > 0}
            fallback={
              <p class="text-sm text-slate-500 dark:text-slate-400 text-center py-8">
                No shortcuts found.
              </p>
            }
          >
            {Array.from(groupedBindings()).map(([scope, bindings]) => (
              <div class="mb-4 last:mb-0">
                <h3 class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  {SCOPE_LABELS[scope]}
                </h3>
                <ul class="space-y-1" role="group" aria-label={`${SCOPE_LABELS[scope]} shortcuts`}>
                  <For each={bindings}>
                    {(binding) => {
                      const globalIndex = flatList().indexOf(binding);
                      const isSelected = () => selectedIndex() === globalIndex;
                      return (
                        <li
                          class={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                            isSelected()
                              ? "bg-[#0D9488]/10 text-[#0D9488] dark:bg-[#0D9488]/20"
                              : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                          }`}
                          role="listitem"
                        >
                          <span class="flex-1 min-w-0 truncate">
                            {binding.description}
                          </span>
                          <span class="ml-3 shrink-0 flex items-center gap-1">
                            {binding.modifiers.map((mod) => (
                              <kbd class="px-1.5 py-0.5 text-xs font-mono bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-600">
                                {isMac()
                                  ? mod === "Meta"
                                    ? "⌘"
                                    : mod === "Alt"
                                      ? "⌥"
                                      : mod === "Shift"
                                        ? "⇧"
                                        : mod
                                  : mod}
                              </kbd>
                            ))}
                            <kbd class="px-1.5 py-0.5 text-xs font-mono bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-600">
                              {binding.key}
                            </kbd>
                          </span>
                        </li>
                      );
                    }}
                  </For>
                </ul>
              </div>
            ))}
          </Show>
        </div>

        {/* Footer hint */}
        <div class="px-5 py-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-400 dark:text-slate-500 flex items-center gap-4">
          <span>
            <kbd class="px-1 py-0.5 font-mono bg-slate-100 dark:bg-slate-700 rounded">↑</kbd>{" "}
            <kbd class="px-1 py-0.5 font-mono bg-slate-100 dark:bg-slate-700 rounded">↓</kbd>{" "}
            navigate
          </span>
          <span>
            <kbd class="px-1 py-0.5 font-mono bg-slate-100 dark:bg-slate-700 rounded">Esc</kbd>{" "}
            close
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShortcutHelp;
