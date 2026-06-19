/**
 * Heading extraction, scroll-sync, and outline data schemas.
 *
 * @module heading-extractor
 * @see BP-POWER-USER-SHELL-001 §5.3, §7.4.2
 */

import { z } from "zod";

// ─── Zod Schemas ─────────────────────────────────────────────────────────────

export const HeadingLevelSchema = z.union([z.literal(2), z.literal(3)]);

export const OutlineHeadingSchema = z.object({
  id: z.string().min(1).max(128),
  text: z.string().min(1).max(256),
  level: HeadingLevelSchema,
  slug: z.string().min(1).max(128),
});

export const OutlineDataSchema = z.object({
  headings: z.array(OutlineHeadingSchema),
  activeId: z.string().nullable(),
  extractedAt: z.coerce.date(),
});

// ─── Types ───────────────────────────────────────────────────────────────────

export type HeadingLevel = z.infer<typeof HeadingLevelSchema>;
export type OutlineHeading = z.infer<typeof OutlineHeadingSchema>;
export type OutlineData = z.infer<typeof OutlineDataSchema>;

// ─── DOM Utilities ───────────────────────────────────────────────────────────

/**
 * Extract h2/h3 headings from a container element.
 * Each heading must have an `id` attribute for scroll-sync.
 *
 * @param container - The article content container
 * @returns Array of OutlineHeading objects
 *
 * Time: O(n) where n = number of heading elements
 * Space: O(k) where k = number of h2/h3 headings
 */
export function extractHeadings(container: HTMLElement): OutlineHeading[] {
  const headings = container.querySelectorAll("h2, h3");
  const result: OutlineHeading[] = [];

  for (const el of headings) {
    const id = el.id;
    if (!id) continue;

    const level = parseInt(el.tagName.charAt(1), 10);
    if (level !== 2 && level !== 3) continue;

    const slug = id;
    const text = el.textContent?.trim() ?? "";

    if (text.length > 0) {
      result.push(OutlineHeadingSchema.parse({ id, text, level, slug }));
    }
  }

  return result;
}

// ─── Scroll Sync ─────────────────────────────────────────────────────────────

/**
 * Create an IntersectionObserver-based scroll sync.
 * Calls onActiveChange when the visible heading changes.
 *
 * @param container - Scroll container (defaults to viewport)
 * @param headingIds - IDs of headings to observe
 * @param onActiveChange - Callback when active heading changes
 * @returns Cleanup function
 */
export function createScrollSync(
  container: HTMLElement | null,
  headingIds: string[],
  onActiveChange: (id: string | null) => void,
): () => void {
  if (typeof IntersectionObserver === "undefined") {
    return () => {};
  }

  const observedElements = new Map<string, Element>();
  let currentActiveId: string | null = null;

  const observer = new IntersectionObserver(
    (entries) => {
      const intersecting: Array<{ id: string; top: number }> = [];

      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const rect = entry.boundingClientRect;
          intersecting.push({ id, top: rect.top });
        }
      }

      if (intersecting.length > 0) {
        intersecting.sort((a, b) => a.top - b.top);
        const newActiveId = intersecting[0]?.id ?? null;
        if (newActiveId !== currentActiveId) {
          currentActiveId = newActiveId;
          onActiveChange(newActiveId);
        }
      }
    },
    {
      root: container,
      rootMargin: "-10% 0px -80% 0px",
      threshold: 0,
    },
  );

  for (const id of headingIds) {
    const el = document.getElementById(id);
    if (el) {
      observer.observe(el);
      observedElements.set(id, el);
    }
  }

  return () => {
    observer.disconnect();
    observedElements.clear();
  };
}
