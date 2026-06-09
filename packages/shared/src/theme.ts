/**
 * Shared theme utility for wikisites monorepo.
 * Manages dark/light/system theme preference via localStorage.
 */

export type Theme = "light" | "dark" | "system";

const STORAGE_KEYS = {
  wiki: "starlight-theme",
  encp: "encp-theme",
} as const;

type Site = keyof typeof STORAGE_KEYS;

/**
 * Get the current theme preference from localStorage.
 */
export function getTheme(site: Site): Theme {
  if (typeof window === "undefined") return "system";
  const stored = localStorage.getItem(STORAGE_KEYS[site]);
  if (stored === "dark" || stored === "light") return stored;
  return "system";
}

/**
 * Set the theme preference and apply it to the DOM.
 */
export function setTheme(site: Site, theme: Theme): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS[site], theme);
  applyTheme(theme);
}

/**
 * Apply the theme to the DOM by setting data-theme on <html>.
 */
export function applyTheme(theme: Theme): void {
  if (typeof window === "undefined") return;
  const html = document.documentElement;
  if (theme === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    html.setAttribute("data-theme", prefersDark ? "dark" : "light");
  } else {
    html.setAttribute("data-theme", theme);
  }
}

/**
 * Initialize theme on page load (call before paint to prevent FOUC).
 */
export function initTheme(site: Site): void {
  if (typeof window === "undefined") return;
  const theme = getTheme(site);
  applyTheme(theme);
}

/**
 * Listen for system theme changes (when user has "system" preference).
 */
export function watchSystemTheme(site: Site, callback?: (isDark: boolean) => void): void {
  if (typeof window === "undefined") return;
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (getTheme(site) === "system") {
      applyTheme("system");
      callback?.(e.matches);
    }
  });
}
