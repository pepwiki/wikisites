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

  /** Page body background */
  body: "bg-white dark:bg-slate-950",

  /** Primary text */
  text: "text-slate-900 dark:text-slate-100",

  /** Secondary/muted text */
  textMuted: "text-slate-600 dark:text-slate-400",

  /** Tertiary text */
  textSubtle: "text-slate-500 dark:text-slate-400",

  /** Border */
  border: "border-slate-200 dark:border-slate-700",

  /** Border light */
  borderLight: "border-slate-100 dark:border-slate-800",

  /** Input/form field */
  input:
    "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100",

  /** Hover state for interactive elements */
  hover: "hover:bg-slate-50 dark:hover:bg-slate-800",

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
} as const;

/**
 * Combine dark mode classes with custom classes.
 */
export function dm(base: string, custom?: string): string {
  return custom ? `${base} ${custom}` : base;
}
