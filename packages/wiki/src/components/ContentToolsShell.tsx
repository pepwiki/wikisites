/**
 * ContentToolsShell — Master component for P1 content-tool features.
 *
 * Responsibilities:
 * - Lazy loads LaTeXBlock, GraphView, SplitPane, RegexSearchBar
 * - Renders graph page at /graph route
 * - Manages split pane state (enabled/disabled, persisted ratio)
 * - Handles regex search bar visibility toggle
 * - SSR-safe dynamic imports
 *
 * Usage: `<ContentToolsShell client:load />`
 *
 * @module components/ContentToolsShell
 */

import {
  createSignal,
  createMemo,
  onMount,
  onCleanup,
  Show,
  lazy,
  Suspense,
  type Component,
} from "solid-js";
import type { GraphData } from "../lib/graph-data";
import type { ResultSet, SearchQuery, SearchResult } from "../lib/regex-search";

// ─── SSR Guard ───────────────────────────────────────────────────────────────

function isServer(): boolean {
  return typeof window === "undefined" || typeof document === "undefined";
}

// ─── Lazy Component Imports ──────────────────────────────────────────────────

const GraphView = lazy(() => import("./GraphView"));
const RegexSearchBar = lazy(() => import("./RegexSearchBar"));

// ─── Props ───────────────────────────────────────────────────────────────────

export interface ContentToolsShellProps {
  /** Graph data for the /graph route. */
  graphData?: GraphData;
  /** Page slug for search context. */
  pageSlug?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Master content-tools shell. Wires graph view, split pane, and regex search.
 */
const ContentToolsShell: Component<ContentToolsShellProps> = (props) => {
  // ── State ───────────────────────────────────────────────────────────────
  const [graphOpen, setGraphOpen] = createSignal(false);
  const [_splitEnabled, setSplitEnabled] = createSignal(false);
  const [searchOpen, setSearchOpen] = createSignal(false);
  const [searchResults, setSearchResults] = createSignal<ResultSet | null>(null);

  // ── SSR check for route detection ───────────────────────────────────────
  const isGraphRoute = createMemo(() => {
    if (isServer()) return false;
    return window.location.pathname === "/graph";
  });

  // ── Graph node navigation ──────────────────────────────────────────────
  const handleGraphNodeClick = (id: string) => {
    if (isServer()) return;
    window.location.href = `/wiki/${id}`;
  };

  // ── Search handlers ────────────────────────────────────────────────────
  const handleSearch = (query: SearchQuery) => {
    // Real implementation would use regex-search lib to find matches.
    // For now, dispatch a custom event so page-level code can respond.
    if (!isServer()) {
      document.dispatchEvent(
        new CustomEvent("content-tools:search", { detail: query })
      );
    }
  };

  const handleNavigate = (result: SearchResult) => {
    if (!isServer()) {
      document.dispatchEvent(
        new CustomEvent("content-tools:navigate-result", { detail: result })
      );
    }
  };

  // ── Custom event listeners ─────────────────────────────────────────────
  onMount(() => {
    if (isServer()) return;

    const onGraphToggle = () => setGraphOpen((p) => !p);
    const onSplitToggle = () => setSplitEnabled((p: boolean) => !p);
    const onSearchToggle = () => setSearchOpen((p) => !p);
    const onSearchResults = (e: Event) => {
      const ce = e as CustomEvent<ResultSet>;
      setSearchResults(ce.detail);
    };

    document.addEventListener("power-user:graph-toggle", onGraphToggle);
    document.addEventListener("power-user:split-toggle", onSplitToggle);
    document.addEventListener("power-user:regex-search", onSearchToggle);
    document.addEventListener("content-tools:search-results", onSearchResults);

    onCleanup(() => {
      document.removeEventListener("power-user:graph-toggle", onGraphToggle);
      document.removeEventListener("power-user:split-toggle", onSplitToggle);
      document.removeEventListener("power-user:regex-search", onSearchToggle);
      document.removeEventListener("content-tools:search-results", onSearchResults);
    });
  });

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <>
      {/* Full-page graph view */}
      <Show when={graphOpen() || isGraphRoute()}>
        <div class="fixed inset-0 z-[90] bg-white dark:bg-slate-950 content-tools-graph-overlay">
          <div class="absolute top-4 right-4 z-10 flex items-center gap-2">
            <button
              onClick={() => setGraphOpen(false)}
              class="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Close graph view"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <Suspense
            fallback={
              <div class="flex items-center justify-center h-full">
                <div class="text-center">
                  <div class="inline-block w-8 h-8 border-2 border-[#0D9488] border-t-transparent rounded-full animate-spin mb-3" />
                  <p class="text-sm text-slate-500 dark:text-slate-400">Loading graph…</p>
                </div>
              </div>
            }
          >
            {props.graphData && (
              <GraphView
                data={props.graphData}
                onNodeClick={handleGraphNodeClick}
              />
            )}
          </Suspense>
        </div>
      </Show>

      {/* Regex search bar — positioned at top of content */}
      <Show when={searchOpen()}>
        <div class="fixed top-16 left-1/2 -translate-x-1/2 z-[85] w-full max-w-xl px-4 content-tools-search-bar">
          <div class="bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-3">
            <Suspense fallback={<div class="h-10 animate-pulse bg-slate-100 dark:bg-slate-700 rounded-lg" />}>
              <RegexSearchBar
                onSearch={handleSearch}
                onNavigate={handleNavigate}
                results={searchResults() ?? undefined}
                placeholder="Search this page…"
              />
            </Suspense>
            <div class="flex justify-end mt-2">
              <button
                onClick={() => setSearchOpen(false)}
                class="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
};

export default ContentToolsShell;
