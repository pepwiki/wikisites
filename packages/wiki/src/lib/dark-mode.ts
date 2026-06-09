/**
 * Shared dark mode class patterns for wikisites monorepo.
 * Use these constants to ensure consistent dark mode styling across components.
 *
 * Usage:
 *   import { darkMode } from "../lib/dark-mode";
 *   <div class={darkMode.card}>...</div>
 */

export const darkMode = {
  /** Card/container surface */
  card: "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800",

  /** Elevated card (modals, dropdowns) */
  cardElevated:
    "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-lg dark:shadow-slate-950/50",

  /** Page body background */
  body: "bg-white dark:bg-slate-950",

  /** Primary text */
  text: "text-slate-900 dark:text-slate-100",

  /** Secondary/muted text */
  textMuted: "text-slate-600 dark:text-slate-400",

  /** Tertiary text */
  textSubtle: "text-slate-500 dark:text-slate-400",

  /** Placeholder text */
  textPlaceholder: "text-slate-400 dark:text-slate-500",

  /** Border */
  border: "border-slate-200 dark:border-slate-700",

  /** Border light */
  borderLight: "border-slate-100 dark:border-slate-800",

  /** Input/form field */
  input:
    "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500",

  /** Hover state for interactive elements */
  hover: "hover:bg-slate-50 dark:hover:bg-slate-800",

  /** Hover state for buttons */
  hoverButton: "hover:bg-slate-100 dark:hover:bg-slate-700",

  /** Focus ring offset */
  focusOffset: "focus:ring-offset-2 dark:focus:ring-offset-slate-900",

  /** Success state */
  success: "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400",

  /** Error state */
  error: "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400",

  /** Warning state */
  warning: "bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400",

  /** Info state */
  info: "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400",

  /** Header/navbar */
  header: "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800",

  /** Footer */
  footer: "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800",

  /** Sidebar */
  sidebar: "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800",

  /** Table */
  table: "bg-white dark:bg-slate-900",

  /** Table row hover */
  tableRow: "hover:bg-slate-50 dark:hover:bg-slate-800",

  /** Table header */
  tableHeader: "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400",

  /** Badge */
  badge: "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300",

  /** Code block */
  code: "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200",

  /** Divider */
  divider: "border-slate-200 dark:border-slate-700",

  /** Skeleton loader */
  skeleton: "bg-slate-200 dark:bg-slate-700",
} as const;

/**
 * Combine dark mode classes with custom classes.
 */
export function dm(base: string, custom?: string): string {
  return custom ? `${base} ${custom}` : base;
}

/**
 * Get the appropriate text color for a given background.
 * Returns light text for dark backgrounds, dark text for light backgrounds.
 */
export function textForBg(bgClass: string): string {
  if (bgClass.includes("slate-9") || bgClass.includes("slate-8") || bgClass.includes("[#0A1628]")) {
    return "text-white";
  }
  return "text-slate-900 dark:text-slate-100";
}
