/**
 * OutlinePanel — Document outline with heading hierarchy, active highlight,
 * click navigation, ARIA tree pattern, and TailwindCSS styling.
 *
 * @module OutlinePanel
 * @see BP-POWER-USER-SHELL-001 §5.3, §7.4.2
 */

import { createSignal, createMemo, For, Show } from "solid-js";
import type { OutlineHeading } from "../lib/heading-extractor";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface OutlinePanelProps {
  headings: OutlineHeading[];
  activeId: string | null;
  isVisible: boolean;
  onNavigate?: (headingId: string) => void;
}

// ─── SSR Guard ───────────────────────────────────────────────────────────────

function isServer(): boolean {
  return typeof window === "undefined";
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function OutlinePanel(props: OutlinePanelProps) {
  if (isServer()) return null;

  const [collapsedIds, setCollapsedIds] = createSignal<Set<string>>(new Set());

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

  const toggleCollapse = (id: string) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isCollapsed = (h2Id: string) => collapsedIds().has(h2Id);

  const handleClick = (heading: OutlineHeading, e: MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(heading.id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    props.onNavigate?.(heading.id);
  };

  const handleKeyDown = (heading: OutlineHeading, e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      props.onNavigate?.(heading.id);
    }
  };

  return (
    <Show when={props.isVisible && props.headings.length > 0}>
      <nav
        aria-label="Document outline"
        role="navigation"
        class="text-sm text-slate-600 dark:text-slate-400"
      >
        <div class="sticky top-20">
          <h2
            class="text-xs font-semibold uppercase tracking-wider mb-3 px-3"
            style={{ color: "var(--text-muted, #64748b)" }}
          >
            On this page
          </h2>

          <ul role="tree" class="space-y-0.5">
            <For each={headingTree()}>
              {(item) => (
                <li
                  role="treeitem"
                  aria-expanded={!isCollapsed(item.heading.id)}
                >
                  <a
                    href={`#${item.heading.slug}`}
                    class="block px-3 py-1.5 text-sm rounded-md transition-colors"
                    style={
                      props.activeId === item.heading.id
                        ? {
                            "background-color": "var(--accent-bg, #f0fdfa)",
                            color: "var(--accent-text, #0d9488)",
                            "font-weight": "500",
                          }
                        : {
                            color: "var(--text-primary, #334155)",
                          }
                    }
                    aria-selected={props.activeId === item.heading.id}
                    onClick={(e) => handleClick(item.heading, e)}
                    onKeyDown={(e) => handleKeyDown(item.heading, e)}
                  >
                    {item.heading.text}
                  </a>

                  <Show
                    when={
                      item.children.length > 0 &&
                      !isCollapsed(item.heading.id)
                    }
                  >
                    <ul
                      role="group"
                      class="ml-3 space-y-0.5 border-l"
                      style={{
                        "border-color": "var(--border-color, #e2e8f0)",
                      }}
                    >
                      <For each={item.children}>
                        {(child) => (
                          <li role="treeitem">
                            <a
                              href={`#${child.slug}`}
                              class="block px-3 py-1 text-xs rounded-md transition-colors"
                              style={
                                props.activeId === child.id
                                  ? {
                                      "background-color":
                                        "var(--accent-bg, #f0fdfa)",
                                      color:
                                        "var(--accent-text, #0d9488)",
                                      "font-weight": "500",
                                    }
                                  : {
                                      color:
                                        "var(--text-muted, #64748b)",
                                    }
                              }
                              aria-selected={props.activeId === child.id}
                              onClick={(e) => handleClick(child, e)}
                              onKeyDown={(e) =>
                                handleKeyDown(child, e)
                              }
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
