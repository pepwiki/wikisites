import type { ThemeDefinition } from "./theme-type.js";

/** Nord — arctic, north-bluish color palette. */
export const nord: ThemeDefinition = {
  name: "nord",
  label: "Nord",
  colors: {
    bg: "#2e3440",
    surface: "#3b4252",
    surfaceElevated: "#353c4a",
    text: "#d8dee9",
    textMuted: "#7b88a1",
    border: "#434c5e",
    accent: "#88c0d0",
    link: "#81a1c1",
    codeBg: "#2e3440",
    codeText: "#d8dee9",
    success: "#a3be8c",
    warning: "#ebcb8b",
    error: "#bf616a",
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
