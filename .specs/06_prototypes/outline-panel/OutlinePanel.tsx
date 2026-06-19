/**
 * OutlinePanel — P0 Prototype
 *
 * Document outline panel with heading extraction, IntersectionObserver
 * scroll-sync, click navigation, collapse/expand, and active heading highlight.
 *
 * @module OutlinePanel
 * @see BP-POWER-USER-SHELL-001 §5.3, §7.4.2
 */

import {
  createSignal,
  createMemo,
  For,
  Show,
  onMount,
  onCleanup,
  type JSX,
} from "solid-js";
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
      result.push(
        OutlineHeadingSchema.parse({ id, text, level, slug })
      );
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
  onActiveChange: (id: string | null) => void
): () => void {
  if (typeof IntersectionObserver === "undefined") {
    // Fallback: no-op for SSR
    return () => {};
  }

  const observedElements = new Map<string, Element>();
  let currentActiveId: string | null = null;

  const observer = new IntersectionObserver(
    (entries) => {
      // Find the first intersecting heading (topmost in viewport)
      const intersecting: Array<{ id: string; top: number }> = [];

      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const rect = entry.boundingClientRect;
          intersecting.push({ id, top: rect.top });
        }
      }

      if (intersecting.length > 0) {
        // Pick the one closest to the top of the viewport
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
    }
  );

  // Observe all heading elements
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

// ─── Component ───────────────────────────────────────────────────────────────

export interface OutlinePanelProps {
  headings: OutlineHeading[];
  activeId: string | null;
  isVisible: boolean;
  onNavigate?: (headingId: string) => void;
}

export default function OutlinePanel(props: OutlinePanelProps) {
  const [collapsedLevels, setCollapsedLevels] = createSignal<Set<number>>(
    new Set()
  );

  /**
   * Build a tree structure from flat headings.
   * Groups h3s under the preceding h2.
   */
  const headingTree = createMemo(() => {
    const tree: Array<{
      heading: OutlineHeading;
      children: OutlineHeading[];
    }> = [];

    for (const h of props.headings) {
      if (h.level === 2) {
        tree.push({ heading: h, children: [] });
      } else if (h.level === 3 && tree.length > 0) {
        tree[tree.length - 1]?.children.push(h);
      }
    }

    return tree;
  });

  const toggleCollapse = (level: number) => {
    setCollapsedLevels((prev) => {
      const next = new Set(prev);
      if (next.has(level)) {
        next.delete(level);
      } else {
        next.add(level);
      }
      return next;
    });
  };

  const handleClick = (heading: OutlineHeading, e: MouseEvent) => {
    e.preventDefault();
    props.onNavigate?.(heading.id);
  };

  const handleKeyDown = (heading: OutlineHeading, e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      props.onNavigate?.(heading.id);
    }
  };

  const isCollapsed = (id: string) => {
    // Check if the parent h2 is collapsed
    for (const item of headingTree()) {
      if (item.children.some((c) => c.id === id)) {
        return collapsedLevels().has(item.heading.id);
      }
    }
    return false;
  };

  return (
    <Show when={props.isVisible && props.headings.length > 0}>
      <nav
        class="outline-panel"
        aria-label="Document outline"
        role="navigation"
      >
        <div class="sticky top-20">
          <h2 class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 px-3">
            On this page
          </h2>

          <ul role="tree" class="space-y-0.5">
            <For each={headingTree()}>
              {(item) => (
                <li role="treeitem" aria-expanded={!isCollapsed(item.heading.id)}>
                  {/* h2 heading */}
                  <a
                    href={`#${item.heading.slug}`}
                    class={`block px-3 py-1.5 text-sm rounded-md transition-colors ${
                      props.activeId === item.heading.id
                        ? "bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 font-medium"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                    aria-selected={props.activeId === item.heading.id}
                    onClick={(e) => handleClick(item.heading, e)}
                    onKeyDown={(e) => handleKeyDown(item.heading, e)}
                  >
                    {item.heading.text}
                  </a>

                  {/* h3 children */}
                  <Show
                    when={
                      item.children.length > 0 &&
                      !isCollapsed(item.children[0]?.id ?? "")
                    }
                  >
                    <ul role="group" class="ml-3 space-y-0.5 border-l border-slate-200 dark:border-slate-700">
                      <For each={item.children}>
                        {(child) => (
                          <li role="treeitem">
                            <a
                              href={`#${child.slug}`}
                              class={`block px-3 py-1 text-xs rounded-md transition-colors ${
                                props.activeId === child.id
                                  ? "bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 font-medium"
                                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                              }`}
                              aria-selected={props.activeId === child.id}
                              onClick={(e) => handleClick(child, e)}
                              onKeyDown={(e) => handleKeyDown(child, e)}
                            >
                              {child.text}
                            </a>
                          </li>
                        )}
                      </For>
                    </ul>
                  </Show>
                </li>
              )}
            </For>
          </ul>
        </div>
      </nav>
    </Show>
  );
}
