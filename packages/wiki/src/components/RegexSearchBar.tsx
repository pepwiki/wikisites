/**
 * RegexSearchBar — Search input with regex toggle, result count, and match navigation.
 *
 * Features:
 * - Regex toggle (/pattern/flags format)
 * - Result count display
 * - Match navigation (Enter/Shift+Enter)
 * - Invalid regex error display
 * - Teal accent styling matching design system
 *
 * @module components/RegexSearchBar
 */

import { createSignal, createEffect, Show, type Component } from "solid-js";
import {
  compileRegex,
  analyzePattern,
  type SearchQuery,
  type SearchResult,
  type ResultSet,
} from "../lib/regex-search";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RegexSearchBarProps {
  /** Callback when a valid search is executed. */
  onSearch: (query: SearchQuery) => void;
  /** Callback when a result is selected for navigation. */
  onNavigate?: (result: SearchResult) => void;
  /** Current search results for count display. */
  results?: ResultSet;
  /** Placeholder text for the input. */
  placeholder?: string;
  /** Additional class on the root element. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Search bar with regex support, error display, and match navigation.
 *
 * @example
 * ```tsx
 * <RegexSearchBar onSearch={handleSearch} results={resultSet} />
 * ```
 */
const RegexSearchBar: Component<RegexSearchBarProps> = (props) => {
  const [inputValue, setInputValue] = createSignal("");
  const [regexMode, setRegexMode] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);
  const [currentMatchIndex, setCurrentMatchIndex] = createSignal(0);

  // Reset match index when results change
  createEffect(() => {
    props.results;
    setCurrentMatchIndex(0);
  });

  const totalMatches = () => props.results?.totalMatches ?? 0;
  const hasResults = () => totalMatches() > 0;

  /** Parse "/pattern/flags" format or plain text. */
  const parseInput = (raw: string): SearchQuery | null => {
    if (regexMode()) {
      // Expect /pattern/flags format
      const match = /^\/(.*)\/([gimsuy]*)$/.exec(raw);
      if (match) {
        const pattern = match[1] ?? "";
        const flags = match[2] ?? "";
        const safety = analyzePattern(pattern);
        if (safety.rating === "blocked") {
          setError(safety.message);
          return null;
        }
        setError(null);
        return {
          pattern,
          flags,
          caseSensitive: flags.includes("i") ? false : true,
        };
      }
      // Not yet in /pattern/flags format — try as raw pattern
      if (raw.length === 0) {
        setError(null);
        return null;
      }
      const safety = analyzePattern(raw);
      if (safety.rating === "blocked") {
        setError(safety.message);
        return null;
      }
      const { regex, error: compileError } = compileRegex(raw, "");
      if (compileError) {
        setError(compileError);
        return null;
      }
      if (!regex) {
        setError("Invalid regex pattern");
        return null;
      }
      setError(null);
      return { pattern: raw, flags: "" };
    }

    // Plain text mode — use as literal search
    if (raw.trim().length === 0) {
      setError(null);
      return null;
    }
    setError(null);
    return {
      pattern: raw,
      flags: "",
      caseSensitive: false,
    };
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const query = parseInput(inputValue());
    if (query) {
      props.onSearch(query);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!hasResults()) return;

    const results = props.results?.results ?? [];
    if (results.length === 0) return;

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const next = (currentMatchIndex() + 1) % results.length!;
      setCurrentMatchIndex(next);
      props.onNavigate?.(results[next]!);
    } else if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      const prev = (currentMatchIndex() - 1 + results.length!) % results.length!;
      setCurrentMatchIndex(prev);
      props.onNavigate?.(results[prev]!);
    }
  };

  const toggleRegex = () => {
    setRegexMode((r) => !r);
    setError(null);
    // Re-parse current input in new mode
    const query = parseInput(inputValue());
    if (query) {
      props.onSearch(query);
    }
  };

  return (
    <div class={`flex flex-col gap-1 ${props.className ?? ""}`}>
      <form onSubmit={handleSubmit} class="flex items-stretch gap-2">
        {/* Regex toggle button */}
        <button
          type="button"
          onClick={toggleRegex}
          class={`flex-shrink-0 px-2.5 py-1.5 rounded-lg text-sm font-mono font-bold border transition-colors
            ${regexMode()
              ? "bg-teal-500 text-white border-teal-600 hover:bg-teal-600"
              : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-600 hover:border-teal-400 dark:hover:border-teal-500"
            }`}
          title={regexMode() ? "Regex mode ON" : "Regex mode OFF"}
          aria-label={regexMode() ? "Disable regex mode" : "Enable regex mode"}
        >
          .*
        </button>

        {/* Input */}
        <input
          type="text"
          value={inputValue()}
          onInput={(e) => setInputValue(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          placeholder={regexMode()
            ? "Enter regex: /pattern/flags"
            : (props.placeholder ?? "Search...")}
          class={`flex-1 px-3 py-1.5 rounded-lg text-sm border transition-colors
            bg-white dark:bg-slate-800
            text-slate-900 dark:text-slate-100
            placeholder-slate-400 dark:placeholder-slate-500
            focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500
            ${error()
              ? "border-red-400 dark:border-red-500"
              : "border-slate-300 dark:border-slate-600"
            }`}
          aria-label="Search input"
          aria-invalid={error() !== null}
        />

        {/* Search button */}
        <button
          type="submit"
          class="flex-shrink-0 px-4 py-1.5 rounded-lg text-sm font-medium
            bg-teal-500 text-white hover:bg-teal-600 active:bg-teal-700
            transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
            dark:focus:ring-offset-slate-900"
        >
          Search
        </button>
      </form>

      {/* Error display */}
      <Show when={error()}>
        <div
          class="text-xs text-red-600 dark:text-red-400 px-1"
          role="alert"
        >
          {error()}
        </div>
      </Show>

      {/* Result count & navigation */}
      <Show when={hasResults()}>
        <div class="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 px-1">
          <span>
            {totalMatches()} {totalMatches() === 1 ? "match" : "matches"}
            {props.results?.truncated ? " (truncated)" : ""}
          </span>
          <span class="text-slate-400 dark:text-slate-600">|</span>
          <span>
            {currentMatchIndex() + 1} of {props.results?.results.length ?? 0}
          </span>
          <span class="text-slate-400 dark:text-slate-600">|</span>
          <span class="text-teal-600 dark:text-teal-400">
            Enter / Shift+Enter to navigate
          </span>
        </div>
      </Show>
    </div>
  );
};

export default RegexSearchBar;
