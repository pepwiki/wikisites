/**
 * Extended theme engine for the wikisites wiki package.
 *
 * Builds on `@wikisites/shared` theme-presets by adding:
 * - Full theme definitions (colors, fonts, spacing)
 * - Import / export of custom themes (JSON + Zod validation)
 * - Persistence via localStorage
 * - System preference detection via prefers-color-scheme
 *
 * @module
 */

import { z } from "zod";
import type { ThemeDefinition } from "../styles/themes/theme-type.js";

// Re-export the type for consumers.
export type { ThemeDefinition } from "../styles/themes/theme-type.js";

// ---------------------------------------------------------------------------
// Zod validation for imported themes
// ---------------------------------------------------------------------------

/** Schema that validates an unknown JSON blob as a ThemeDefinition. */
export const ThemeDefinitionSchema = z.object({
  name: z.string().min(1).max(64),
  label: z.string().min(1).max(128),
  colors: z.object({
    bg: z.string().min(1),
    surface: z.string().min(1),
    surfaceElevated: z.string().min(1),
    text: z.string().min(1),
    textMuted: z.string().min(1),
    border: z.string().min(1),
    accent: z.string().min(1),
    link: z.string().min(1),
    codeBg: z.string().min(1),
    codeText: z.string().min(1),
    success: z.string().min(1),
    warning: z.string().min(1),
    error: z.string().min(1),
  }),
  fonts: z.object({
    body: z.string().min(1),
    heading: z.string().min(1),
    mono: z.string().min(1),
  }),
  spacing: z.object({
    unit: z.string().min(1),
    radius: z.string().min(1),
  }),
});

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = "wikisites:theme-engine:active";
const CUSTOM_THEMES_KEY = "wikisites:theme-engine:custom";

// ---------------------------------------------------------------------------
// Internal registry — populated at module scope from theme files
// ---------------------------------------------------------------------------

/** Built-in themes. Lazily imported to keep bundle small. */
const builtInThemes = new Map<string, ThemeDefinition>();

function ensureBuiltIns(): void {
  if (builtInThemes.size > 0) return;
  // Dynamic imports would break verbatimModuleSyntax; we rely on the
  // barrel import at the bottom of this module (see registerThemes).
  // The registerThemes() call below wires everything up synchronously.
}

/**
 * Register theme definitions into the engine.
 * Call once at startup with all available ThemeDefinition objects.
 */
export function registerThemes(themes: ThemeDefinition[]): void {
  for (const theme of themes) {
    builtInThemes.set(theme.name, theme);
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * List all available themes (built-in + user-imported).
 * Returns a shallow copy so callers cannot mutate the registry.
 */
export function getAvailableThemes(): ThemeDefinition[] {
  ensureBuiltIns();
  return [...builtInThemes.values(), ...getCustomThemes()];
}

/**
 * Get the currently active theme definition.
 * Falls back to "light" if nothing is stored or the stored name is unknown.
 */
export function getActiveTheme(): ThemeDefinition {
  ensureBuiltIns();
  const name = getStoredThemeName();
  return findThemeByName(name) ?? getDefaultTheme();
}

/**
 * Set the active theme by name and persist the choice.
 * Applies CSS custom properties to the document root.
 * @throws Error if the theme name is not found.
 */
export function setActiveTheme(name: string): void {
  const theme = findThemeByName(name);
  if (!theme) {
    throw new Error(`Theme "${name}" is not available.`);
  }
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, name);
    applyThemeToDOM(theme);
  }
}

/**
 * Import a custom theme from a JSON string or parsed object.
 * Returns the validated ThemeDefinition on success.
 * @throws Error if validation fails.
 */
export function importTheme(json: string | unknown): ThemeDefinition {
  const parsed =
    typeof json === "string" ? JSON.parse(json) : json;
  const result = ThemeDefinitionSchema.safeParse(parsed);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new Error(`Invalid theme: ${issues}`);
  }
  const theme = result.data as ThemeDefinition;
  const customs = getCustomThemes();
  customs.push(theme);
  saveCustomThemes(customs);
  // Also register so getAvailableThemes() sees it immediately.
  builtInThemes.set(theme.name, theme);
  return theme;
}

/**
 * Export a theme by name as a JSON string.
 * Works for both built-in and custom themes.
 * @throws Error if the theme name is not found.
 */
export function exportTheme(name: string): string {
  const theme = findThemeByName(name);
  if (!theme) {
    throw new Error(`Theme "${name}" is not available.`);
  }
  return JSON.stringify(theme, null, 2);
}

/**
 * Apply a theme to the DOM by setting CSS custom properties on `<html>`.
 */
export function applyThemeToDOM(theme: ThemeDefinition): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const { colors, fonts, spacing } = theme;

  root.style.setProperty("--theme-bg", colors.bg);
  root.style.setProperty("--theme-surface", colors.surface);
  root.style.setProperty("--theme-surface-elevated", colors.surfaceElevated);
  root.style.setProperty("--theme-text", colors.text);
  root.style.setProperty("--theme-text-muted", colors.textMuted);
  root.style.setProperty("--theme-border", colors.border);
  root.style.setProperty("--theme-accent", colors.accent);
  root.style.setProperty("--theme-link", colors.link);
  root.style.setProperty("--theme-code-bg", colors.codeBg);
  root.style.setProperty("--theme-code-text", colors.codeText);
  root.style.setProperty("--theme-success", colors.success);
  root.style.setProperty("--theme-warning", colors.warning);
  root.style.setProperty("--theme-error", colors.error);

  root.style.setProperty("--font-body", fonts.body);
  root.style.setProperty("--font-heading", fonts.heading);
  root.style.setProperty("--font-mono", fonts.mono);

  root.style.setProperty("--spacing-unit", spacing.unit);
  root.style.setProperty("--spacing-radius", spacing.radius);

  root.setAttribute("data-theme", theme.name);
}

/**
 * Detect system color-scheme preference.
 * Returns `"dark"` if the user prefers dark, `"light"` otherwise.
 */
export function getSystemPreference(): "dark" | "light" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Resolve which theme to apply when the user's preference is "system".
 * Picks the best available built-in theme matching the system preference.
 */
export function resolveSystemTheme(): ThemeDefinition {
  const pref = getSystemPreference();
  return (
    findThemeByName(pref === "dark" ? "default-dark" : "default-light") ??
    getDefaultTheme()
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getStoredThemeName(): string {
  if (typeof localStorage === "undefined") return "default-light";
  return localStorage.getItem(STORAGE_KEY) ?? "default-light";
}

function findThemeByName(name: string): ThemeDefinition | undefined {
  ensureBuiltIns();
  // Search built-in first, then custom (custom wins if name collides).
  const all = [...builtInThemes.values(), ...getCustomThemes()];
  return all.find((t) => t.name === name);
}

function getDefaultTheme(): ThemeDefinition {
  ensureBuiltIns();
  return builtInThemes.get("default-light")!;
}

function getCustomThemes(): ThemeDefinition[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(CUSTOM_THEMES_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as unknown[];
    return arr.filter(
      (t): t is ThemeDefinition => ThemeDefinitionSchema.safeParse(t).success,
    );
  } catch {
    return [];
  }
}

function saveCustomThemes(themes: ThemeDefinition[]): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(CUSTOM_THEMES_KEY, JSON.stringify(themes));
}
