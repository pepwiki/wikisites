import type { ThemeDefinition } from "./theme-type.js";

/** Default dark theme — slate tones, teal accent. */
export const defaultDark: ThemeDefinition = {
  name: "default-dark",
  label: "Dark",
  colors: {
    bg: "#020617",
    surface: "#1e293b",
    surfaceElevated: "#0f172a",
    text: "#e2e8f0",
    textMuted: "#94a3b8",
    border: "#334155",
    accent: "#0d9488",
    link: "#2dd4bf",
    codeBg: "#0f172a",
    codeText: "#cbd5e1",
    success: "#22c55e",
    warning: "#fbbf24",
    error: "#f87171",
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
