import type { ThemeDefinition } from "./theme-type.js";

/** Solarized Light — warm, low-contrast, easy on the eyes. */
export const solarizedLight: ThemeDefinition = {
  name: "solarized-light",
  label: "Solarized Light",
  colors: {
    bg: "#fdf6e3",
    surface: "#eee8d5",
    surfaceElevated: "#fdf6e3",
    text: "#586e75",
    textMuted: "#93a1a1",
    border: "#d3cbb7",
    accent: "#2aa198",
    link: "#268bd2",
    codeBg: "#eee8d5",
    codeText: "#657b83",
    success: "#859900",
    warning: "#b58900",
    error: "#dc322f",
  },
  fonts: {
    body: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  },
  spacing: {
    unit: "0.25rem",
    radius: "0.375rem",
  },
};
