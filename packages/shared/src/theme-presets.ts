/**
 * Theme presets for wikisites monorepo.
 * Provides predefined color schemes beyond light/dark.
 */

export type ThemePreset = {
  name: string;
  label: string;
  colors: {
    bg: string;
    surface: string;
    surfaceElevated: string;
    text: string;
    textMuted: string;
    border: string;
    accent: string;
  };
};

export const presets: Record<string, ThemePreset> = {
  light: {
    name: "light",
    label: "Light",
    colors: {
      bg: "#f8fafc",
      surface: "#ffffff",
      surfaceElevated: "#ffffff",
      text: "#1e293b",
      textMuted: "#64748b",
      border: "#e2e8f0",
      accent: "#0d9488",
    },
  },
  dark: {
    name: "dark",
    label: "Dark",
    colors: {
      bg: "#020617",
      surface: "#1e293b",
      surfaceElevated: "#0f172a",
      text: "#e2e8f0",
      textMuted: "#94a3b8",
      border: "#334155",
      accent: "#0d9488",
    },
  },
  "high-contrast": {
    name: "high-contrast",
    label: "High Contrast",
    colors: {
      bg: "#000000",
      surface: "#1a1a1a",
      surfaceElevated: "#0d0d0d",
      text: "#ffffff",
      textMuted: "#cccccc",
      border: "#444444",
      accent: "#00ffcc",
    },
  },
  solarized: {
    name: "solarized",
    label: "Solarized Dark",
    colors: {
      bg: "#002b36",
      surface: "#073642",
      surfaceElevated: "#002b36",
      text: "#839496",
      textMuted: "#586e75",
      border: "#073642",
      accent: "#2aa198",
    },
  },
};

/**
 * Apply a theme preset by setting CSS custom properties.
 */
export function applyPreset(presetName: string): void {
  if (typeof document === "undefined") return;
  const preset = presets[presetName];
  if (!preset) return;

  const root = document.documentElement;
  root.style.setProperty("--theme-bg", preset.colors.bg);
  root.style.setProperty("--theme-surface", preset.colors.surface);
  root.style.setProperty("--theme-surface-elevated", preset.colors.surfaceElevated);
  root.style.setProperty("--theme-text", preset.colors.text);
  root.style.setProperty("--theme-text-muted", preset.colors.textMuted);
  root.style.setProperty("--theme-border", preset.colors.border);
  root.style.setProperty("--theme-accent", preset.colors.accent);

  localStorage.setItem("wikisites:theme-preset", presetName);
}

/**
 * Get the current theme preset name.
 */
export function getCurrentPreset(): string {
  if (typeof localStorage === "undefined") return "light";
  return localStorage.getItem("wikisites:theme-preset") || "light";
}

/**
 * Get all available preset names.
 */
export function getAvailablePresets(): string[] {
  return Object.keys(presets);
}
