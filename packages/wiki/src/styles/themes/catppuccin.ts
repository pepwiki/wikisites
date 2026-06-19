import type { ThemeDefinition } from "./theme-type.js";

/** Catppuccin — pastel-toned dark theme with warm palette. */
export const catppuccin: ThemeDefinition = {
  name: "catppuccin",
  label: "Catppuccin",
  colors: {
    bg: "#1e1e2e",
    surface: "#313244",
    surfaceElevated: "#282a3a",
    text: "#cdd6f4",
    textMuted: "#6c7086",
    border: "#45475a",
    accent: "#cba6f7",
    link: "#89dceb",
    codeBg: "#181825",
    codeText: "#cdd6f4",
    success: "#a6e3a1",
    warning: "#f9e2af",
    error: "#f38ba8",
  },
  fonts: {
    body: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  },
  spacing: {
    unit: "0.25rem",
    radius: "0.5rem",
  },
};
