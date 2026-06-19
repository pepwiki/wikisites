/**
 * Canonical ThemeDefinition type used by the theme engine.
 *
 * Every theme file in this directory exports an object conforming to this type.
 */

export interface ThemeDefinition {
  /** Machine-readable name (used as CSS data-theme attribute). */
  name: string;
  /** Human-readable label shown in the UI. */
  label: string;
  /** Color tokens mapped to CSS custom properties. */
  colors: {
    bg: string;
    surface: string;
    surfaceElevated: string;
    text: string;
    textMuted: string;
    border: string;
    accent: string;
    link: string;
    codeBg: string;
    codeText: string;
    success: string;
    warning: string;
    error: string;
  };
  /** Font family stacks. */
  fonts: {
    body: string;
    heading: string;
    mono: string;
  };
  /** Spacing tokens. */
  spacing: {
    unit: string;
    radius: string;
  };
}
