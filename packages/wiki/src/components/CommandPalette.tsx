/**
 * CommandPalette — VS Code-style fuzzy command palette.
 *
 * ARIA combobox pattern, keyboard navigation, status bar, teal accent,
 * dark mode via data-theme attribute, SSR-safe.
 *
 * @module CommandPalette
 * @see BP-POWER-USER-SHELL-001 §5.1, §7.2
 */

import {
  createSignal,
  createMemo,
  For,
  Show,
} from "solid-js";
import {
  type Command,
  type CommandRegistryApi,
} from "../lib/command-registry";

type CommandCategory = Command["category"];

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onExecute: (commandId: string) => void;
  registry: CommandRegistryApi;
  category?: CommandCategory;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const MAX_RESULTS = 20;

// ─── SSR Guard ───────────────────────────────────────────────────────────────

function isServer(): boolean {
  return typeof window === "undefined";
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function CommandPalette(props: CommandPaletteProps) {
  if (isServer()) return null;

  let inputRef: HTMLInputElement | undefined;

  const [query, setQuery] = createSignal("");
  const [selectedIndex, setSelectedIndex] = createSignal(0);

  const filteredResults = createMemo(() => {
    const results = props.registry.search(query());
    const filtered = props.category
      ? results.filter((c: Command) => c.category === props.category)
      : results;
    return filtered.slice(0, MAX_RESULTS);
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    const results = filteredResults();
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % Math.max(results.length, 1));
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        setSelectedIndex((i) =>
          i <= 0 ? Math.max(results.length - 1, 0) : i - 1,
        );
        break;
      }
      case "Enter": {
        e.preventDefault();
        const selected = results[selectedIndex()];
        if (selected) {
          props.onExecute(selected.id);
        }
        break;
      }
      case "Escape": {
        e.preventDefault();
        props.onClose();
        break;
      }
    }
  };

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setQuery(target.value);
    setSelectedIndex(0);
  };

  const resultId = (index: number) => `command-palette-option-${index}`;

  return (
    <Show when={props.isOpen}>
      <div
        class="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        {/* Backdrop */}
        <div
          class="absolute inset-0 bg-black/50"
          onClick={() => props.onClose()}
        />

        {/* Palette */}
        <div class="relative w-full max-w-lg mx-4 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          {/* Search input */}
          <div class="flex items-center border-b border-slate-200 dark:border-slate-700">
            <svg
              class="ml-4 w-5 h-5 shrink-0 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              class="w-full px-3 py-4 bg-transparent placeholder-slate-400 focus:outline-none text-sm text-slate-900 dark:text-slate-100"
              placeholder="Type a command\u2026"
              value={query()}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              role="combobox"
              aria-expanded={filteredResults().length > 0}
              aria-controls="command-palette-list"
              aria-activedescendant={
                filteredResults().length > 0
                  ? resultId(selectedIndex())
                  : undefined
              }
              aria-autocomplete="list"
            />
          </div>

          {/* Results */}
          <ul
            id="command-palette-list"
            role="listbox"
            class="max-h-72 overflow-y-auto py-2"
            aria-label="Commands"
          >
            <Show
              when={filteredResults().length > 0}
              fallback={
                <li
                  class="px-4 py-3 text-sm text-center text-slate-400 dark:text-slate-500"
                >
                  No commands found
                </li>
              }
            >
              <For each={filteredResults()}>
                {(command, index) => (
                  <li
                    id={resultId(index())}
                    role="option"
                    aria-selected={index() === selectedIndex()}
                    class={`px-4 py-2.5 cursor-pointer flex items-center gap-3 text-sm transition-colors ${
                      index() === selectedIndex()
                        ? "bg-[#0D9488]/10 text-[#0D9488]"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                    }`}
                    onMouseEnter={() => setSelectedIndex(index())}
                    onClick={() => props.onExecute(command.id)}
                  >
                    <span class="font-medium flex-1">{command.label}</span>
                    <span
                      class="text-xs truncate max-w-[200px] text-slate-400 dark:text-slate-500"
                    >
                      {command.description}
                    </span>
                    <Show when={command.shortcut}>
                      <kbd
                        class="px-1.5 py-0.5 text-xs font-mono rounded border bg-slate-100 dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400"
                      >
                        {command.shortcut}
                      </kbd>
                    </Show>
                  </li>
                )}
              </For>
            </Show>
          </ul>

          {/* Status bar */}
          <div
            role="status"
            aria-live="polite"
            class="border-t border-slate-200 dark:border-slate-700 px-4 py-2 text-xs flex justify-between text-slate-400 dark:text-slate-500"
          >
            <span>
              {filteredResults().length} command
              {filteredResults().length !== 1 ? "s" : ""}
            </span>
            <span>
              {"\u2191\u2193"} navigate {"\u00B7"} {"\u21B5"} select{" "}
              {"\u00B7"} esc close
            </span>
          </div>
        </div>
      </div>
    </Show>
  );
}
