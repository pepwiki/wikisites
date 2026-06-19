/**
 * PowerUserShell — Master component that wires all P0 power-user features.
 *
 * Responsibilities:
 * - Initializes KeyboardShortcutManager with DEFAULT_KEYBINDINGS
 * - Creates command registry with default commands
 * - Handles command execution (dispatches to appropriate action)
 * - Renders CommandPalette, OutlinePanel, Breadcrumbs, ShortcutHelp
 * - Manages open/close state for palette, outline, shortcuts
 * - SSR-safe initialization
 *
 * Usage: `<PowerUserShell client:load />`
 *
 * @module components/PowerUserShell
 * @see BP-POWER-USER-SHELL-001 §5
 */

import {
  createSignal,
  createMemo,
  createEffect,
  onMount,
  onCleanup,
  Show,
  type Component,
} from "solid-js";
import {
  createKeyboardShortcutManager,
  isMac,
  type KeyboardShortcutManagerApi,
} from "../lib/keyboard-shortcuts";
import { DEFAULT_KEYBINDINGS } from "../lib/keybindings";
import { createDefaultCommandRegistry } from "../lib/commands";
import type { CommandRegistryApi } from "../lib/command-registry";
import ShortcutHelp from "./ShortcutHelp";
import Breadcrumbs from "./Breadcrumbs";
import OutlinePanel from "./OutlinePanel";
import { trailFromPath } from "../lib/breadcrumb-builder";
import {
  extractHeadings,
  createScrollSync,
  type OutlineHeading,
} from "../lib/heading-extractor";

// ─── SSR Guard ───────────────────────────────────────────────────────────────

function isServer(): boolean {
  return typeof window === "undefined" || typeof document === "undefined";
}

// ─── Command Execution ───────────────────────────────────────────────────────

/**
 * Execute a command by ID. Dispatches to the appropriate DOM/custom action.
 */
function executeCommand(commandId: string): void {
  if (isServer()) return;

  switch (commandId) {
    case "action.command-palette":
      // Dispatched via state — handled by PowerUserShell
      break;
    case "action.shortcuts":
      // Dispatched via state — handled by PowerUserShell
      break;
    case "nav.outline":
      document.dispatchEvent(new CustomEvent("power-user:outline-toggle"));
      break;
    case "nav.graph":
      document.dispatchEvent(new CustomEvent("power-user:graph-toggle"));
      break;
    case "nav.split":
      document.dispatchEvent(new CustomEvent("power-user:split-toggle"));
      break;
    case "action.search":
      document.dispatchEvent(new CustomEvent("power-user:regex-search"));
      break;
    case "action.theme": {
      const html = document.documentElement;
      const current = html.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      html.setAttribute("data-theme", next);
      try {
        localStorage.setItem("starlight-theme", next);
      } catch {
        // localStorage unavailable
      }
      break;
    }
    case "action.copy-link": {
      const url = window.location.href;
      navigator.clipboard.writeText(url).catch(() => {
        // Clipboard API unavailable — silent fallback
      });
      break;
    }
    case "nav.random": {
      // Navigate to a random article (stub — real impl depends on site routes)
      document.dispatchEvent(new CustomEvent("power-user:random-article"));
      break;
    }
    case "nav.home":
      window.location.href = "/";
      break;
    case "nav.back":
      window.history.back();
      break;
    case "nav.forward":
      window.history.forward();
      break;
    default:
      console.warn(`Unknown command: ${commandId}`);
  }
}

// ─── Props ───────────────────────────────────────────────────────────────────

export interface PowerUserShellProps {
  /** Current page pathname for breadcrumbs. */
  pathname?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Master power-user shell. Wires keyboard shortcuts, command palette,
 * outline panel, breadcrumbs, and shortcut help overlay.
 */
const PowerUserShell: Component<PowerUserShellProps> = (props) => {
  // ── State ───────────────────────────────────────────────────────────────
  const [paletteOpen, setPaletteOpen] = createSignal(false);
  const [outlineOpen, setOutlineOpen] = createSignal(false);
  const [shortcutsOpen, setShortcutsOpen] = createSignal(false);
  const [headings, setHeadings] = createSignal<OutlineHeading[]>([]);
  const [activeHeadingId, setActiveHeadingId] = createSignal<string | null>(null);

  // ── Manager singletons (created once) ───────────────────────────────────
  let shortcutManager: KeyboardShortcutManagerApi | undefined;
  let commandRegistry: CommandRegistryApi | undefined;

  if (!isServer()) {
    shortcutManager = createKeyboardShortcutManager(DEFAULT_KEYBINDINGS);
    commandRegistry = createDefaultCommandRegistry();
  }

  // ── Keyboard shortcut handler ───────────────────────────────────────────
  onMount(() => {
    if (isServer()) return;

    function handleKeydown(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Check for ? key (no modifiers)
      if (e.key === "?" && !e.ctrlKey && !e.altKey && !e.metaKey) {
        e.preventDefault();
        setShortcutsOpen((prev) => !prev);
        return;
      }

      // Check for Ctrl+/ (or Cmd+/ on Mac)
      const modPressed = isMac() ? e.metaKey : e.ctrlKey;
      if (modPressed && e.key === "/") {
        e.preventDefault();
        setShortcutsOpen((prev) => !prev);
        return;
      }

      // Check for Ctrl+K (or Cmd+K on Mac) — command palette
      if (modPressed && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
        return;
      }

      // Delegate to shortcut manager for remaining bindings
      if (shortcutManager) {
        const action = shortcutManager.handleKeydown(e);
        if (action) {
          e.preventDefault();
          handleAction(action);
        }
      }
    }

    document.addEventListener("keydown", handleKeydown);
    onCleanup(() => document.removeEventListener("keydown", handleKeydown));

    // Listen for custom events from commands
    const onOutlineToggle = () => setOutlineOpen((prev) => !prev);
    const onShortcutsToggle = () => setShortcutsOpen((prev) => !prev);
    const onPaletteToggle = () => setPaletteOpen((prev) => !prev);

    document.addEventListener("power-user:outline-toggle", onOutlineToggle);
    document.addEventListener("power-user:shortcuts-toggle", onShortcutsToggle);
    document.addEventListener("power-user:palette-toggle", onPaletteToggle);

    onCleanup(() => {
      document.removeEventListener("power-user:outline-toggle", onOutlineToggle);
      document.removeEventListener("power-user:shortcuts-toggle", onShortcutsToggle);
      document.removeEventListener("power-user:palette-toggle", onPaletteToggle);
    });

    // Extract headings from page content and set up scroll sync
    const contentEl =
      document.querySelector('[data-page-content]') ??
      document.querySelector("article") ??
      document.querySelector("main");
    if (contentEl) {
      const extracted = extractHeadings(contentEl as HTMLElement);
      setHeadings(extracted);

      if (extracted.length > 0) {
        const cleanup = createScrollSync(
          null,
          extracted.map((h) => h.id),
          (id) => setActiveHeadingId(id),
        );
        onCleanup(cleanup);
      }
    }
  });

  // ── Action dispatcher ───────────────────────────────────────────────────
  function handleAction(action: string) {
    switch (action) {
      case "command-palette.toggle":
        setPaletteOpen((prev) => !prev);
        break;
      case "shortcuts.toggle":
        setShortcutsOpen((prev) => !prev);
        break;
      case "outline.toggle":
        setOutlineOpen((prev) => !prev);
        break;
      default:
        executeCommand(action);
    }
  }

  // ── Command palette handler ─────────────────────────────────────────────
  function handlePaletteSelect(commandId: string) {
    setPaletteOpen(false);
    executeCommand(commandId);
    if (commandId === "action.shortcuts") {
      setShortcutsOpen(true);
    }
  }

  // ── Breadcrumb trail ────────────────────────────────────────────────────
  const trail = () => {
    const path = props.pathname ?? (isServer() ? "/" : window.location.pathname);
    return trailFromPath(path);
  };

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <>
      {/* Breadcrumbs — rendered at top of content */}
      <Show when={trail().length > 1}>
        <div class="mb-4">
          <Breadcrumbs trail={trail()} />
        </div>
      </Show>

      {/* Outline panel toggle button */}
      <button
        onClick={() => setOutlineOpen((prev) => !prev)}
        class="fixed bottom-6 right-6 z-[70] p-3 rounded-full bg-[#0D9488] text-white shadow-lg hover:bg-[#0f766e] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        aria-label={outlineOpen() ? "Close outline panel" : "Open outline panel"}
        aria-expanded={outlineOpen()}
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>

      {/* Shortcut help overlay */}
      <Show when={shortcutsOpen() && shortcutManager}>
        <ShortcutHelp
          bindings={shortcutManager!.getAll()}
          onClose={() => setShortcutsOpen(false)}
        />
      </Show>

      {/* Command palette (minimal inline implementation) */}
      <Show when={paletteOpen()}>
        <CommandPaletteInline
          registry={commandRegistry!}
          onSelect={handlePaletteSelect}
          onClose={() => setPaletteOpen(false)}
        />
      </Show>

      {/* Outline panel sidebar */}
      <Show when={outlineOpen()}>
        <div class="fixed top-0 left-0 bottom-0 z-[80] w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 shadow-xl power-user-outline-panel overflow-y-auto">
          <div class="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700">
            <h2 class="text-sm font-bold text-slate-900 dark:text-slate-100 font-heading">
              Outline
            </h2>
            <button
              onClick={() => setOutlineOpen(false)}
              class="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Close outline"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="p-4">
            <OutlinePanel
              headings={headings()}
              activeId={activeHeadingId()}
              isVisible={true}
              onNavigate={(headingId) => {
                const el = document.getElementById(headingId);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                  setActiveHeadingId(headingId);
                }
              }}
            />
            {headings().length === 0 && (
              <p class="text-xs text-slate-400 dark:text-slate-500 italic">
                No headings found on this page.
              </p>
            )}
          </div>
        </div>
        {/* Backdrop */}
        <div
          class="fixed inset-0 z-[75] bg-black/20 backdrop-blur-sm"
          onClick={() => setOutlineOpen(false)}
          aria-hidden="true"
        />
      </Show>
    </>
  );
};

// ─── Inline Command Palette ──────────────────────────────────────────────────

interface CommandPaletteInlineProps {
  registry: CommandRegistryApi;
  onSelect: (commandId: string) => void;
  onClose: () => void;
}

/**
 * Minimal inline command palette with fuzzy search, recent commands, and scroll-into-view.
 */
function CommandPaletteInline(props: CommandPaletteInlineProps) {
  const [query, setQuery] = createSignal("");
  const [selectedIndex, setSelectedIndex] = createSignal(0);
  let inputRef: HTMLInputElement | undefined;
  let listRef: HTMLUListElement | undefined;

  const RECENT_KEY = "wikisites-recent-commands";
  const MAX_RECENT = 5;

  function getRecentCommands(): string[] {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveRecentCommand(id: string) {
    try {
      const recent = getRecentCommands().filter((r) => r !== id);
      recent.unshift(id);
      localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
    } catch {
      // localStorage unavailable
    }
  }

  const allCommands = createMemo(() => props.registry.getAll());
  const results = createMemo(() => props.registry.search(query()));

  const displayList = createMemo(() => {
    if (query().trim()) return results();
    const recentIds = getRecentCommands();
    if (recentIds.length === 0) return results();
    const recentCmds = recentIds
      .map((id) => allCommands().find((c) => c.id === id))
      .filter(Boolean) as typeof results extends () => (infer T)[] ? T[] : never;
    const remaining = results().filter((c) => !recentIds.includes(c.id));
    return [...recentCmds, ...remaining];
  });

  const recentIds = createMemo(() => getRecentCommands());
  const isRecent = (id: string) => !query().trim() && recentIds().includes(id);

  onMount(() => {
    inputRef?.focus();
  });

  // Scroll selected item into view
  createEffect(() => {
    const idx = selectedIndex();
    if (!listRef) return;
    const item = listRef.children[idx] as HTMLElement | undefined;
    if (item) {
      item.scrollIntoView({ block: "nearest" });
    }
  });

  const onKeyDown = (e: KeyboardEvent) => {
    const list = displayList();
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
      case "Enter":
        e.preventDefault();
        if (list[selectedIndex()]) {
          saveRecentCommand(list[selectedIndex()].id);
          props.onSelect(list[selectedIndex()].id);
        }
        break;
    }
  };

  return (
    <div
      class="fixed inset-0 z-[95] flex items-start justify-center pt-[15vh] bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) props.onClose();
      }}
      onKeyDown={onKeyDown}
    >
      <div class="bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-md mx-4 overflow-hidden">
        {/* Search input */}
        <div class="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          <svg class="w-5 h-5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command..."
            value={query()}
            onInput={(e) => {
              setQuery((e.target as HTMLInputElement).value);
              setSelectedIndex(0);
            }}
            class="flex-1 bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            aria-label="Search commands"
          />
          <kbd class="px-1.5 py-0.5 text-xs font-mono bg-slate-100 dark:bg-slate-700 text-slate-500 rounded border border-slate-200 dark:border-slate-600">
            esc
          </kbd>
        </div>

        {/* Results */}
        <ul ref={listRef} class="max-h-64 overflow-y-auto py-2" role="listbox">
          {!query().trim() && recentIds().length > 0 && (
            <li class="px-4 py-1.5 text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider select-none">
              Recent
            </li>
          )}
          {displayList().map((cmd: { id: string; label: string; description: string; shortcut?: string }, i: () => number) => (
            <li
              class={`px-4 py-2.5 cursor-pointer text-sm flex items-center justify-between ${
                i() === selectedIndex()
                  ? "bg-[#0D9488]/10 text-[#0D9488]"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
              }`}
              role="option"
              aria-selected={i() === selectedIndex()}
              onClick={() => {
                saveRecentCommand(cmd.id);
                props.onSelect(cmd.id);
              }}
              onMouseEnter={() => setSelectedIndex(i())}
            >
              <div class="min-w-0">
                <div class="font-medium truncate">{cmd.label}</div>
                <div class="text-xs text-slate-400 dark:text-slate-500 truncate">
                  {cmd.description}
                </div>
              </div>
              {cmd.shortcut && (
                <kbd class="ml-3 shrink-0 px-1.5 py-0.5 text-xs font-mono bg-slate-100 dark:bg-slate-700 text-slate-500 rounded border border-slate-200 dark:border-slate-600">
                  {cmd.shortcut}
                </kbd>
              )}
            </li>
          ))}
          {displayList().length === 0 && (
            <li class="px-4 py-6 text-sm text-slate-400 dark:text-slate-500 text-center">
              No commands found.
            </li>
          )}
        </ul>

        {/* Footer */}
        <div class="px-4 py-2 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-400 dark:text-slate-500 flex items-center gap-3">
          <span>
            <kbd class="px-1 py-0.5 font-mono bg-slate-100 dark:bg-slate-700 rounded">↑↓</kbd> navigate
          </span>
          <span>
            <kbd class="px-1 py-0.5 font-mono bg-slate-100 dark:bg-slate-700 rounded">↵</kbd> select
          </span>
          <span>
            <kbd class="px-1 py-0.5 font-mono bg-slate-100 dark:bg-slate-700 rounded">esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  );
}

export default PowerUserShell;
