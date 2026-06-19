import type { ThemeDefinition } from "./theme-type.js";

/** Default light theme — clean, readable, teal accent. */
export const defaultLight: ThemeDefinition = {
  name: "default-light",
  label: "Light",
  colors: {
    bg: "#f8fafc",
    surface: "#ffffff",
    surfaceElevated: "#ffffff",
    text: "#1e293b",
    textMuted: "#64748b",
    border: "#e2e8f0",
    accent: "#0d9488",
    link: "#0d9488",
    codeBg: "#f1f5f9",
    codeText: "#334155",
    success: "#16a34a",
    warning: "#d97706",
    error: "#dc2626",
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
