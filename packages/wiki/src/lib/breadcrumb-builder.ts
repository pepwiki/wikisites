/**
 * Breadcrumb utility module.
 *
 * Pure functions for building breadcrumb trails, generating Schema.org
 * JSON-LD, and computing responsive overflow. No framework dependencies.
 *
 * @module breadcrumb-builder
 * @see BP-POWER-USER-SHELL-001 §5.4, §7.4.3
 */

import { z } from "zod";

// ─── Zod Schemas ─────────────────────────────────────────────────────────────

/** Single breadcrumb entry. */
export const BreadcrumbItemSchema = z.object({
  label: z.string().min(1).max(128),
  href: z.string().min(1),
  current: z.boolean().default(false),
});

/** Ordered breadcrumb trail with overflow configuration. */
export const BreadcrumbTrailSchema = z.object({
  items: z.array(BreadcrumbItemSchema).min(1),
  maxItems: z.number().int().min(1).max(10).default(5),
});

/** Schema.org BreadcrumbList JSON-LD structure. */
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

// ─── Types ───────────────────────────────────────────────────────────────────

export type BreadcrumbItem = z.infer<typeof BreadcrumbItemSchema>;
export type BreadcrumbTrail = z.infer<typeof BreadcrumbTrailSchema>;
export type SchemaOrgBreadcrumb = z.infer<typeof SchemaOrgBreadcrumbSchema>;

/** Sentinel for collapsed middle items in responsive overflow. */
export type EllipsisPlaceholder = { readonly type: "ellipsis" };

/** A visible breadcrumb item or an ellipsis collapse marker. */
export type VisibleBreadcrumbItem = BreadcrumbItem | EllipsisPlaceholder;

// ─── Path-Based Trail Generator ──────────────────────────────────────────────

/**
 * Convert a URL segment to a human-readable label.
 * Replaces hyphens with spaces and capitalises each word.
 *
 * @param segment - URL path segment (e.g., `"amino-acids"`)
 * @returns Label string (e.g., `"Amino Acids"`)
 *
 * @example
 * segmentToLabel("alanine") // "Alanine"
 * segmentToLabel("amino-acids") // "Amino Acids"
 * segmentToLabel("ATP-synthase") // "ATP Synthase"
 */
export function segmentToLabel(segment: string): string {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Generate a breadcrumb trail from a URL path.
 *
 * The first path segment is treated as the site root and receives
 * `rootLabel`. Subsequent segments are converted via {@link segmentToLabel}.
 * The final item is marked as `current`.
 *
 * @param pathname - URL path (e.g., `"/learn/amino-acids/alanine"`)
 * @param rootLabel - Label for the root item (default: `"Home"`)
 * @returns BreadcrumbItem array, always at least length 1
 *
 * @example
 * trailFromPath("/learn/alanine", "Learn")
 * // [{ label: "Learn", href: "/" },
 * //  { label: "Learn", href: "/learn" },
 * //  { label: "Alanine", href: "/learn/alanine", current: true }]
 */
export function trailFromPath(
  pathname: string,
  rootLabel = "Home"
): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return [{ label: rootLabel, href: "/", current: true }];
  }

  const items: BreadcrumbItem[] = [{ label: rootLabel, href: "/", current: false }];

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

// ─── Responsive Overflow ─────────────────────────────────────────────────────

/**
 * Compute visible items for responsive breadcrumb display.
 *
 * When the trail exceeds `maxItems`, the first item is always shown
 * and the remaining budget is allocated to the end of the trail,
 * with an ellipsis placeholder in between.
 *
 * @param items - Full breadcrumb trail
 * @param maxItems - Maximum visible items (must be ≥ 2)
 * @returns Array with possible ellipsis placeholder
 *
 * @example
 * const items = [
 *   { label: "Home", href: "/", current: false },
 *   { label: "A", href: "/a", current: false },
 *   { label: "B", href: "/a/b", current: false },
 *   { label: "C", href: "/a/b/c", current: true },
 * ];
 * computeVisibleItems(items, 3)
 * // [{ label: "Home", href: "/" }, { type: "ellipsis" }, { label: "C", href: "/a/b/c", current: true }]
 */
export function computeVisibleItems(
  items: readonly BreadcrumbItem[],
  maxItems: number
): VisibleBreadcrumbItem[] {
  if (items.length <= maxItems) {
    return [...items];
  }

  // Always show first item, last (maxItems - 1) items, with ellipsis in between
  const first = items[0];
  if (!first) return [...items];

  const lastCount = maxItems - 1;
  const lastItems = items.slice(-lastCount);

  return [first, { type: "ellipsis" }, ...lastItems];
}

// ─── Schema.org Generator ────────────────────────────────────────────────────

/**
 * Generate Schema.org BreadcrumbList JSON-LD from a trail.
 *
 * @param trail - Array of breadcrumb items
 * @returns Schema.org BreadcrumbList object
 *
 * @example
 * toJsonLd([
 *   { label: "Home", href: "/", current: false },
 *   { label: "Learn", href: "/learn", current: true },
 * ])
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
