/**
 * Breadcrumbs — Schema.org BreadcrumbList navigation.
 *
 * ARIA breadcrumb pattern with responsive overflow (→ ellipsis on mobile),
 * JSON-LD injection for SEO, and dark mode support.
 *
 * Usage: `<Breadcrumbs trail={trail} client:load />`
 *
 * @module Breadcrumbs
 * @see BP-POWER-USER-SHELL-001 §5.4, §7.4.3
 */

import { createSignal, createMemo, For, Show, onMount, onCleanup } from "solid-js";
import {
  toJsonLd,
  computeVisibleItems,
} from "../lib/breadcrumb-builder";
import type {
  BreadcrumbItem,
  VisibleBreadcrumbItem,
} from "../lib/breadcrumb-builder";

// ─── SSR Guard ───────────────────────────────────────────────────────────────

function isServer(): boolean {
  return typeof window === "undefined" || typeof document === "undefined";
}

// ─── Props ───────────────────────────────────────────────────────────────────

export interface BreadcrumbsProps {
  /** Ordered breadcrumb trail. */
  trail: BreadcrumbItem[];
  /** Maximum items before overflow collapse (default: 5). */
  maxItems?: number;
}

const MOBILE_MAX_ITEMS = 3;

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Render a breadcrumb navigation bar with Schema.org JSON-LD.
 *
 * On mobile (≤ 640px) the trail collapses to {@link MOBILE_MAX_ITEMS}
 * items via an ellipsis placeholder. The JSON-LD script is always
 * rendered with the full (un-collapsed) trail.
 */
export default function Breadcrumbs(props: BreadcrumbsProps) {
  const [isMobile, setIsMobile] = createSignal(false);

  onMount(() => {
    if (isServer()) return;

    const mql = window.matchMedia("(max-width: 640px)");
    setIsMobile(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);

    onCleanup(() => {
      mql.removeEventListener("change", handler);
    });
  });

  const effectiveMax = () =>
    isMobile() ? MOBILE_MAX_ITEMS : (props.maxItems ?? 5);

  const visibleItems = createMemo<VisibleBreadcrumbItem[]>(() =>
    computeVisibleItems(props.trail, effectiveMax())
  );

  const schemaOrg = createMemo(() => toJsonLd(props.trail));

  if (props.trail.length === 0) return null;

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        innerHTML={JSON.stringify(schemaOrg())}
      />

      {/* ARIA breadcrumb navigation */}
      <nav aria-label="Breadcrumb" class="breadcrumbs">
        <ol class="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 flex-wrap max-w-full overflow-hidden">
          <For each={visibleItems()}>
            {(item, index) => {
              // Ellipsis placeholder
              if ("type" in item && item.type === "ellipsis") {
                return (
                  <li class="flex items-center" aria-hidden="true">
                    <span class="mx-1 text-slate-400 dark:text-slate-500 select-none">
                      &hellip;
                    </span>
                  </li>
                );
              }

              const breadcrumb = item as BreadcrumbItem;
              const isLast = index() === visibleItems().length - 1;

              return (
                <li class="flex items-center gap-1 min-w-0">
                  {/* Separator */}
                  <Show when={index() > 0}>
                    <svg
                      class="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Show>

                  {/* Last item: current page, not a link */}
                  <Show
                    when={isLast || breadcrumb.current}
                    fallback={
                      <a
                        href={breadcrumb.href}
                        class="hover:text-[#0f766e] dark:hover:text-[#2dd4bf] transition-colors truncate"
                      >
                        {breadcrumb.label}
                      </a>
                    }
                  >
                    <span
                      class="text-slate-900 dark:text-slate-100 font-medium truncate"
                      aria-current="page"
                    >
                      {breadcrumb.label}
                    </span>
                  </Show>
                </li>
              );
            }}
          </For>
        </ol>
      </nav>
    </>
  );
}
