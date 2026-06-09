/**
 * Shared theme utility for wikisites monorepo.
 * Manages dark/light/system theme preference via localStorage + cross-subdomain cookie.
 */

export type Theme = "light" | "dark" | "system";

const STORAGE_KEYS = {
  wiki: "starlight-theme",
  encp: "encp-theme",
} as const;

type Site = keyof typeof STORAGE_KEYS;

const COOKIE_NAME = "wikisites-theme";
const COOKIE_DOMAIN = ".pages.dev"; // Share across wikisites-wiki.pages.dev and wikisites-encp.pages.dev

/**
 * Get the current theme preference from localStorage.
 * Falls back to cross-subdomain cookie if localStorage is empty.
 */
export function getTheme(site: Site): Theme {
  if (typeof window === "undefined") return "system";

  // Check localStorage first (site-specific)
  const stored = localStorage.getItem(STORAGE_KEYS[site]);
  if (stored === "dark" || stored === "light") return stored;

  // Fall back to shared cookie (cross-subdomain)
  const cookieTheme = getCookieTheme();
  if (cookieTheme === "dark" || cookieTheme === "light") return cookieTheme;

  return "system";
}

/**
 * Set the theme preference and apply it to the DOM.
 * Writes to both localStorage (site-specific) and cookie (cross-subdomain).
 */
export function setTheme(site: Site, theme: Theme): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS[site], theme);
  setCookieTheme(theme);
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

/**
 * Read theme from cross-subdomain cookie.
 */
function getCookieTheme(): Theme | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  if (!match) return null;
  const value = decodeURIComponent(match[1]);
  if (value === "dark" || value === "light") return value;
  return null;
}

/**
 * Write theme to cross-subdomain cookie.
 */
function setCookieTheme(theme: Theme): void {
  if (typeof document === "undefined") return;
  const value = theme === "system" ? "" : theme;
  if (value) {
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; domain=${COOKIE_DOMAIN}; path=/; max-age=31536000; SameSite=Lax`;
  } else {
    document.cookie = `${COOKIE_NAME}=; domain=${COOKIE_DOMAIN}; path=/; max-age=0`;
  }
}
