/**
 * CommandPalette — P0 Prototype
 *
 * VS Code-style fuzzy command palette with O(n·m) scoring,
 * keyboard navigation, ARIA combobox pattern, and command registry.
 *
 * @module CommandPalette
 * @see BP-POWER-USER-SHELL-001 §5.1, §7.2
 */

import {
  createSignal,
  createMemo,
  For,
  Show,
  onMount,
  onCleanup,
  batch,
  type JSX,
} from "solid-js";
import { z } from "zod";

// ─── Zod Schemas ─────────────────────────────────────────────────────────────

export const CommandCategorySchema = z.enum([
  "navigation",
  "action",
  "settings",
  "view",
]);

export const CommandSchema = z.object({
  id: z.string().min(1).max(64),
  label: z.string().min(1).max(128),
  description: z.string().min(1).max(256),
  category: CommandCategorySchema,
  shortcut: z.string().optional(),
  icon: z.string().optional(),
  enabled: z.boolean().default(true),
});

export type CommandCategory = z.infer<typeof CommandCategorySchema>;
export type Command = z.infer<typeof CommandSchema>;

// ─── Fuzzy Scoring (O(n·m)) ─────────────────────────────────────────────────

/**
 * Compute fuzzy match score between a query and a label.
 * Returns 0 for no match, higher scores for better matches.
 * Consecutive matches and prefix matches score higher.
 *
 * @param query - Search query string
 * @param label - Label to match against
 * @returns Score (0 = no match)
 *
 * Time: O(n·m) where n = query length, m = label length
 * Space: O(1)
 */
export function fuzzyScore(query: string, label: string): number {
  if (query.length === 0) return 1;
  if (label.length === 0) return 0;

  const qLower = query.toLowerCase();
  const lLower = label.toLowerCase();

  let score = 0;
  let qi = 0;
  let prevMatchIndex = -2;
  let consecutiveBonus = 0;

  for (let li = 0; li < lLower.length && qi < qLower.length; li++) {
    if (lLower[li] === qLower[qi]) {
      score += 1;
      // Consecutive match bonus
      if (li === prevMatchIndex + 1) {
        consecutiveBonus += 2;
        score += consecutiveBonus;
      } else {
        consecutiveBonus = 0;
      }
      // Prefix bonus
      if (li === 0) {
        score += 5;
      }
      // After-separator bonus (space, -, /, etc.)
      if (li > 0 && (lLower[li - 1] === " " || lLower[li - 1] === "-" || lLower[li - 1] === "/")) {
        score += 3;
      }
      prevMatchIndex = li;
      qi++;
    }
  }

  // All query characters must match
  return qi === qLower.length ? score : 0;
}

// ─── Command Registry ────────────────────────────────────────────────────────

export interface CommandRegistry {
  add(command: Command): void;
  remove(id: string): void;
  getAll(): Command[];
  getById(id: string): Command | undefined;
  search(query: string): Command[];
}

export function createCommandRegistry(): CommandRegistry {
  const commands = new Map<string, Command>();

  return {
    add(command: Command) {
      const parsed = CommandSchema.safeParse(command);
      if (!parsed.success) {
        console.warn(`Invalid command: ${parsed.error.message}`);
        return;
      }
      commands.set(parsed.data.id, parsed.data);
    },

    remove(id: string) {
      commands.delete(id);
    },

    getAll() {
      return Array.from(commands.values());
    },

    getById(id: string) {
      return commands.get(id);
    },

    search(query: string) {
      const all = Array.from(commands.values()).filter((c) => c.enabled);
      if (query.length === 0) return all;
      return all
        .map((c) => ({ command: c, score: fuzzyScore(query, c.label) }))
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((r) => r.command);
    },
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onExecute: (commandId: string) => void;
  registry: CommandRegistry;
  category?: CommandCategory;
}

const MAX_RESULTS = 20;

export default function CommandPalette(props: CommandPaletteProps) {
  let inputRef: HTMLInputElement | undefined;
  let previouslyFocused: HTMLElement | undefined;

  const [query, setQuery] = createSignal("");
  const [selectedIndex, setSelectedIndex] = createSignal(0);

  const filteredResults = createMemo(() => {
    const results = props.registry.search(query());
    const filtered = props.category
      ? results.filter((c) => c.category === props.category)
      : results;
    return filtered.slice(0, MAX_RESULTS);
  });

  const debouncedQuery = createMemo(() => {
    // createMemo acts as a derived signal; real debounce is in the effect
    return query();
  });

  // Reset state on open
  const resetState = () => {
    batch(() => {
      setQuery("");
      setSelectedIndex(0);
    });
  };

  // Focus management
  onMount(() => {
    if (typeof document === "undefined") return;

    if (props.isOpen) {
      previouslyFocused = document.activeElement as HTMLElement | undefined;
      resetState();
      requestAnimationFrame(() => {
        inputRef?.focus();
      });
    }
  });

  // Watch for open/close transitions
  let wasOpen = props.isOpen;
  const checkOpen = () => {
    if (props.isOpen && !wasOpen) {
      previouslyFocused = document.activeElement as HTMLElement | undefined;
      resetState();
      requestAnimationFrame(() => {
        inputRef?.focus();
      });
    } else if (!props.isOpen && wasOpen) {
      previouslyFocused?.focus();
    }
    wasOpen = props.isOpen;
  };

  // Keyboard navigation
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
          i <= 0 ? Math.max(results.length - 1, 0) : i - 1
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
        <div class="relative w-full max-w-lg mx-4 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Search input — combobox role */}
          <div class="flex items-center border-b border-slate-200 dark:border-slate-700">
            <svg
              class="ml-4 w-5 h-5 text-slate-400 shrink-0"
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
              class="w-full px-3 py-4 bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none text-sm"
              placeholder="Type a command…"
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
                <li class="px-4 py-3 text-sm text-slate-500 dark:text-slate-400 text-center">
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
                        ? "bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                    onMouseEnter={() => setSelectedIndex(index())}
                    onClick={() => props.onExecute(command.id)}
                  >
                    <span class="font-medium flex-1">{command.label}</span>
                    <span class="text-xs text-slate-400 dark:text-slate-500 truncate max-w-[200px]">
                      {command.description}
                    </span>
                    <Show when={command.shortcut}>
                      <kbd class="px-1.5 py-0.5 text-xs font-mono bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
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
            class="border-t border-slate-200 dark:border-slate-700 px-4 py-2 text-xs text-slate-500 dark:text-slate-400 flex justify-between"
          >
            <span>
              {filteredResults().length} command
              {filteredResults().length !== 1 ? "s" : ""}
            </span>
            <span>
              ↑↓ navigate · ↵ select · esc close
            </span>
          </div>
        </div>
      </div>
    </Show>
  );
}
