import type { ThemeDefinition } from "./theme-type.js";

/** Solarized Dark — warm dark, teal/cyan accent. */
export const solarizedDark: ThemeDefinition = {
  name: "solarized-dark",
  label: "Solarized Dark",
  colors: {
    bg: "#002b36",
    surface: "#073642",
    surfaceElevated: "#002b36",
    text: "#839496",
    textMuted: "#586e75",
    border: "#073642",
    accent: "#2aa198",
    link: "#268bd2",
    codeBg: "#073642",
    codeText: "#93a1a1",
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
