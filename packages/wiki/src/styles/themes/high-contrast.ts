import type { ThemeDefinition } from "./theme-type.js";

/** High contrast theme — maximum legibility, black background, bright accents. */
export const highContrast: ThemeDefinition = {
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
    link: "#00ffcc",
    codeBg: "#111111",
    codeText: "#f0f0f0",
    success: "#00ff66",
    warning: "#ffcc00",
    error: "#ff3333",
  },
  fonts: {
    body: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  },
  spacing: {
    unit: "0.25rem",
    radius: "0.25rem",
  },
};
