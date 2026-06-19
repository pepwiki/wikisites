import type { ThemeDefinition } from "./theme-type.js";

/** Dracula — popular dark theme with pastel accents. */
export const dracula: ThemeDefinition = {
  name: "dracula",
  label: "Dracula",
  colors: {
    bg: "#282a36",
    surface: "#44475a",
    surfaceElevated: "#383a4e",
    text: "#f8f8f2",
    textMuted: "#6272a4",
    border: "#44475a",
    accent: "#bd93f9",
    link: "#8be9fd",
    codeBg: "#21222c",
    codeText: "#f8f8f2",
    success: "#50fa7b",
    warning: "#f1fa8c",
    error: "#ff5555",
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
