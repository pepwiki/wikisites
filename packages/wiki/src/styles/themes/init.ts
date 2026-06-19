/**
 * Theme engine wiring — imports all theme definitions and registers them
 * with the engine. Import this module once at app startup.
 */

import {
  registerThemes,
  setActiveTheme,
  getActiveTheme,
  applyThemeToDOM,
} from "../../lib/theme-engine.js";
import { defaultLight } from "./default-light.js";
import { defaultDark } from "./default-dark.js";
import { highContrast } from "./high-contrast.js";
import { solarizedLight } from "./solarized-light.js";
import { solarizedDark } from "./solarized-dark.js";
import { dracula } from "./dracula.js";
import { nord } from "./nord.js";
import { catppuccin } from "./catppuccin.js";

/** All built-in themes. */
export const allThemes = [
  defaultLight,
  defaultDark,
  highContrast,
  solarizedLight,
  solarizedDark,
  dracula,
  nord,
  catppuccin,
] as const;

/** Register all built-in themes with the theme engine. */
export function initThemes(): void {
  registerThemes([...allThemes]);
  const active = getActiveTheme();
  applyThemeToDOM(active);
}

export {
  setActiveTheme,
  getActiveTheme,
  applyThemeToDOM,
};
