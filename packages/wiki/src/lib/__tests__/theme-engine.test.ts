/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  registerThemes,
  getAvailableThemes,
  setActiveTheme,
  getActiveTheme,
  importTheme,
  exportTheme,
  applyThemeToDOM,
  resolveSystemTheme,
  getSystemPreference,
} from "../theme-engine.js";
import type { ThemeDefinition } from "../theme-engine.js";
import { defaultLight } from "../../styles/themes/default-light.js";
import { defaultDark } from "../../styles/themes/default-dark.js";
import { dracula } from "../../styles/themes/dracula.js";
import { nord } from "../../styles/themes/nord.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeTheme(overrides: Partial<ThemeDefinition> = {}): ThemeDefinition {
  return {
    name: "test-theme",
    label: "Test Theme",
    colors: {
      bg: "#000000",
      surface: "#111111",
      surfaceElevated: "#0a0a0a",
      text: "#ffffff",
      textMuted: "#aaaaaa",
      border: "#333333",
      accent: "#ff0000",
      link: "#00ff00",
      codeBg: "#0a0a0a",
      codeText: "#cccccc",
      success: "#00ff00",
      warning: "#ffff00",
      error: "#ff0000",
    },
    fonts: { body: "sans-serif", heading: "sans-serif", mono: "monospace" },
    spacing: { unit: "0.25rem", radius: "0.375rem" },
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

function createLocalStorage(): Storage {
  const store = new Map<string, string>();
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => { store.set(key, value); },
    removeItem: (key: string) => { store.delete(key); },
    clear: () => { store.clear(); },
    get length() { return store.size; },
    key: (index: number) => [...store.keys()][index] ?? null,
  };
}

describe("theme-engine", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal("localStorage", createLocalStorage());
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );
    registerThemes([defaultLight, defaultDark, dracula, nord]);
  });

  // ----- getAvailableThemes -----

  describe("getAvailableThemes", () => {
    it("returns registered themes", () => {
      const themes = getAvailableThemes();
      const names = themes.map((t: ThemeDefinition) => t.name);
      expect(names).toContain("default-light");
      expect(names).toContain("default-dark");
      expect(names).toContain("dracula");
      expect(names).toContain("nord");
    });

    it("returns at least the 4 built-in themes", () => {
      expect(getAvailableThemes().length).toBeGreaterThanOrEqual(4);
    });
  });

  // ----- setActiveTheme / getActiveTheme -----

  describe("setActiveTheme / getActiveTheme", () => {
    it("returns default-light when nothing is stored", () => {
      const theme = getActiveTheme();
      expect(theme.name).toBe("default-light");
    });

    it("persists and retrieves the active theme", () => {
      setActiveTheme("dracula");
      const theme = getActiveTheme();
      expect(theme.name).toBe("dracula");
    });

    it("throws for unknown theme name", () => {
      expect(() => setActiveTheme("nonexistent")).toThrow(
        'Theme "nonexistent" is not available',
      );
    });

    it("sets data-theme attribute on documentElement", () => {
      setActiveTheme("nord");
      expect(document.documentElement.getAttribute("data-theme")).toBe("nord");
    });
  });

  // ----- applyThemeToDOM -----

  describe("applyThemeToDOM", () => {
    it("sets CSS custom properties on the root element", () => {
      applyThemeToDOM(dracula);
      const style = document.documentElement.style;
      expect(style.getPropertyValue("--theme-bg")).toBe("#282a36");
      expect(style.getPropertyValue("--theme-surface")).toBe("#44475a");
      expect(style.getPropertyValue("--theme-text")).toBe("#f8f8f2");
      expect(style.getPropertyValue("--theme-accent")).toBe("#bd93f9");
      expect(style.getPropertyValue("--theme-link")).toBe("#8be9fd");
      expect(style.getPropertyValue("--theme-code-bg")).toBe("#21222c");
      expect(style.getPropertyValue("--theme-success")).toBe("#50fa7b");
      expect(style.getPropertyValue("--theme-warning")).toBe("#f1fa8c");
      expect(style.getPropertyValue("--theme-error")).toBe("#ff5555");
    });

    it("sets font custom properties", () => {
      applyThemeToDOM(dracula);
      const style = document.documentElement.style;
      expect(style.getPropertyValue("--font-body")).toBeTruthy();
      expect(style.getPropertyValue("--font-heading")).toBeTruthy();
      expect(style.getPropertyValue("--font-mono")).toBeTruthy();
    });

    it("sets spacing custom properties", () => {
      applyThemeToDOM(dracula);
      const style = document.documentElement.style;
      expect(style.getPropertyValue("--spacing-unit")).toBe("0.25rem");
      expect(style.getPropertyValue("--spacing-radius")).toBe("0.5rem");
    });

    it("sets data-theme attribute", () => {
      applyThemeToDOM(defaultDark);
      expect(document.documentElement.getAttribute("data-theme")).toBe(
        "default-dark",
      );
    });
  });

  // ----- importTheme / exportTheme -----

  describe("importTheme / exportTheme", () => {
    it("imports a valid theme from JSON string", () => {
      const json = JSON.stringify(makeTheme({ name: "custom-1", label: "Custom 1" }));
      const theme = importTheme(json);
      expect(theme.name).toBe("custom-1");
      expect(theme.label).toBe("Custom 1");
    });

    it("imports a valid theme from parsed object", () => {
      const theme = importTheme(makeTheme({ name: "custom-2", label: "Custom 2" }));
      expect(theme.name).toBe("custom-2");
    });

    it("makes imported theme available in the list", () => {
      importTheme(makeTheme({ name: "custom-3", label: "Custom 3" }));
      const names = getAvailableThemes().map((t: ThemeDefinition) => t.name);
      expect(names).toContain("custom-3");
    });

    it("persists custom themes across sessions (localStorage)", () => {
      importTheme(makeTheme({ name: "custom-persist", label: "Persist" }));
      // Simulate re-registration (fresh engine instance)
      registerThemes([defaultLight, defaultDark]);
      const names = getAvailableThemes().map((t: ThemeDefinition) => t.name);
      expect(names).toContain("custom-persist");
    });

    it("rejects theme with missing required fields", () => {
      expect(() => importTheme({ name: "bad" })).toThrow("Invalid theme");
    });

    it("rejects theme with empty name", () => {
      const bad = makeTheme({ name: "" });
      expect(() => importTheme(bad)).toThrow("Invalid theme");
    });

    it("rejects theme with missing color", () => {
      const bad = makeTheme();
      delete (bad.colors as Record<string, unknown>)["accent"];
      expect(() => importTheme(bad)).toThrow("Invalid theme");
    });

    it("rejects invalid JSON string", () => {
      expect(() => importTheme("{not json")).toThrow();
    });

    it("exports a built-in theme as JSON string", () => {
      const json = exportTheme("dracula");
      const parsed = JSON.parse(json) as ThemeDefinition;
      expect(parsed.name).toBe("dracula");
      expect(parsed.colors.bg).toBe("#282a36");
    });

    it("exports an imported custom theme", () => {
      importTheme(makeTheme({ name: "export-me", label: "Export Me" }));
      const json = exportTheme("export-me");
      const parsed = JSON.parse(json) as ThemeDefinition;
      expect(parsed.name).toBe("export-me");
    });

    it("throws when exporting unknown theme", () => {
      expect(() => exportTheme("nonexistent")).toThrow(
        'Theme "nonexistent" is not available',
      );
    });
  });

  // ----- System preference -----

  describe("system preference", () => {
    it("getSystemPreference returns light by default in test env", () => {
      expect(getSystemPreference()).toBe("light");
    });

    it("getSystemPreference returns dark when matchMedia matches", () => {
      vi.spyOn(window, "matchMedia").mockImplementation(
        (query: string) =>
          ({
            matches: query === "(prefers-color-scheme: dark)",
            media: query,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
          }) as unknown as MediaQueryList,
      );
      expect(getSystemPreference()).toBe("dark");
    });

    it("resolveSystemTheme returns default-dark when system prefers dark", () => {
      vi.spyOn(window, "matchMedia").mockImplementation(
        (query: string) =>
          ({
            matches: query === "(prefers-color-scheme: dark)",
            media: query,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
          }) as unknown as MediaQueryList,
      );
      const theme = resolveSystemTheme();
      expect(theme.name).toBe("default-dark");
    });

    it("resolveSystemTheme returns default-light when system prefers light", () => {
      vi.spyOn(window, "matchMedia").mockImplementation(
        () =>
          ({
            matches: false,
            media: "(prefers-color-scheme: dark)",
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
          }) as unknown as MediaQueryList,
      );
      const theme = resolveSystemTheme();
      expect(theme.name).toBe("default-light");
    });
  });
});
