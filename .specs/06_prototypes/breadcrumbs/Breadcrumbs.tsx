/**
 * Breadcrumbs — P0 Prototype
 *
 * Schema.org BreadcrumbList navigation with ARIA breadcrumb pattern,
 * responsive overflow (→ dropdown on mobile), and JSON-LD injection.
 *
 * @module Breadcrumbs
 * @see BP-POWER-USER-SHELL-001 §5.4, §7.4.3
 */

import {
  createSignal,
  createMemo,
  For,
  Show,
  onMount,
  onCleanup,
} from "solid-js";
import { z } from "zod";

// ─── Zod Schemas ─────────────────────────────────────────────────────────────

export const BreadcrumbItemSchema = z.object({
  label: z.string().min(1).max(128),
  href: z.string().min(1),
  current: z.boolean().default(false),
});

export const BreadcrumbTrailSchema = z.object({
  items: z.array(BreadcrumbItemSchema).min(1),
  maxItems: z.number().int().min(1).max(10).default(5),
});

export const SchemaOrgBreadcrumbSchema = z.object({
  "@context": z.literal("https://schema.org"),
  "@type": z.literal("BreadcrumbList"),
  itemListElement: z.array(
    z.object({
      "@type": z.literal("ListItem"),
      position: z.number().int().positive(),
      name: z.string(),
      item: z.string(),
    })
  ),
});

export type BreadcrumbItem = z.infer<typeof BreadcrumbItemSchema>;
export type BreadcrumbTrail = z.infer<typeof BreadcrumbTrailSchema>;
export type SchemaOrgBreadcrumb = z.infer<typeof SchemaOrgBreadcrumbSchema>;

// ─── Schema.org Generator ────────────────────────────────────────────────────

/**
 * Generate Schema.org BreadcrumbList JSON-LD from a trail.
 *
 * @param trail - Array of breadcrumb items
 * @returns Schema.org BreadcrumbList object
 *
 * Time: O(n)
 * Space: O(n)
 */
export function toJsonLd(trail: BreadcrumbItem[]): SchemaOrgBreadcrumb {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      name: item.label,
      item: item.href,
    })),
  };
}

// ─── Path-Based Trail Generator ──────────────────────────────────────────────

/**
 * Generate breadcrumb trail from a URL path.
 * First segment is treated as the root label.
 *
 * @param pathname - URL path (e.g., "/learn/amino-acids/alanine")
 * @param rootLabel - Label for the root item (default: "Home")
 * @returns BreadcrumbItem array
 *
 * Time: O(n) where n = path segments
 * Space: O(n)
 */
export function trailFromPath(
  pathname: string,
  rootLabel = "Home"
): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return [{ label: rootLabel, href: "/", current: true }];
  }

  const items: BreadcrumbItem[] = [
    { label: rootLabel, href: "/" },
  ];

  let path = "";
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (!segment) continue;
    path += `/${segment}`;
    const isLast = i === segments.length - 1;
    items.push({
      label: segmentToLabel(segment),
      href: path,
      current: isLast,
    });
  }

  return items;
}

function segmentToLabel(segment: string): string {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Responsive Overflow ─────────────────────────────────────────────────────

/**
 * Compute visible items for responsive breadcrumb display.
 * Collapses middle items into an ellipsis when count exceeds maxItems.
 *
 * @param items - Full breadcrumb trail
 * @param maxItems - Maximum items to display
 * @returns Array with possible ellipsis placeholder
 */
export function computeVisibleItems(
  items: readonly BreadcrumbItem[],
  maxItems: number
): Array<BreadcrumbItem | { type: "ellipsis" }> {
  if (items.length <= maxItems) {
    return [...items];
  }

  // Always show first item, last (maxItems - 2) items, with ellipsis in between
  const first = items[0];
  if (!first) return [...items];

  const lastCount = maxItems - 1;
  const lastItems = items.slice(-lastCount);

  return [first, { type: "ellipsis" }, ...lastItems];
}

// ─── Component ───────────────────────────────────────────────────────────────

export interface BreadcrumbsProps {
  trail: BreadcrumbItem[];
  maxItems?: number;
}

const MOBILE_MAX_ITEMS = 3;

export default function Breadcrumbs(props: BreadcrumbsProps) {
  const [isMobile, setIsMobile] = createSignal(false);

  onMount(() => {
    if (typeof window === "undefined") return;

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

  const visibleItems = createMemo(() =>
    computeVisibleItems(props.trail, effectiveMax())
  );

  const schemaOrg = createMemo(() => toJsonLd(props.trail));

  // Only render if there's something in the trail
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
        <ol class="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 flex-wrap">
          <For each={visibleItems()}>
            {(item, index) => {
              // Ellipsis placeholder
              if ("type" in item && item.type === "ellipsis") {
                return (
                  <li class="flex items-center" aria-hidden="true">
                    <span class="mx-1 text-slate-400">…</span>
                  </li>
                );
              }

              const breadcrumb = item as BreadcrumbItem;
              const isLast = index() === visibleItems().length - 1;

              return (
                <li class="flex items-center gap-1">
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
                        class="hover:text-[#0f766e] dark:hover:text-[#2dd4bf] transition-colors"
                      >
                        {breadcrumb.label}
                      </a>
                    }
                  >
                    <span
                      class="text-slate-900 dark:text-slate-100 font-medium"
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
