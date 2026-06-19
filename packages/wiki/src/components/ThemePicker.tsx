/**
 * ThemePicker — Grid-based theme selector with live preview.
 *
 * Displays available themes as a 3-column grid of preview cards.
 * Each card shows color swatches, theme name, and an active indicator.
 * Supports keyboard navigation with arrow keys and is fully accessible.
 *
 * @module components/ThemePicker
 */

import { createSignal, createMemo, For, Show } from "solid-js";
import {
  getAvailableThemes,
  getActiveTheme,
  setActiveTheme,
  type ThemeDefinition,
} from "../lib/theme-engine";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ThemePickerProps {
  /** Callback when theme is changed. */
  onThemeChange?: (themeName: string) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ThemePicker(props: ThemePickerProps) {
  const [selectedIndex, setSelectedIndex] = createSignal(0);

  const themes = createMemo(() => getAvailableThemes());
  const activeTheme = createMemo(() => getActiveTheme());

  const columns = 3;

  const handleSelect = (theme: ThemeDefinition) => {
    try {
      setActiveTheme(theme.name);
      props.onThemeChange?.(theme.name);
    } catch (err) {
      console.error("Failed to set theme:", err);
    }
  };

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    const items = themes();
    let newIndex = index;

    switch (e.key) {
      case "ArrowRight": {
        e.preventDefault();
        newIndex = Math.min(index + 1, items.length - 1);
        break;
      }
      case "ArrowLeft": {
        e.preventDefault();
        newIndex = Math.max(index - 1, 0);
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        newIndex = Math.min(index + columns, items.length - 1);
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        newIndex = Math.max(index - columns, 0);
        break;
      }
      case "Enter":
      case " ": {
        e.preventDefault();
        const theme = items[index];
        if (theme) handleSelect(theme);
        return;
      }
      default:
        return;
    }

    setSelectedIndex(newIndex);
  };

  return (
    <div role="radiogroup" aria-label="Theme picker" class="grid grid-cols-3 gap-3">
      <For each={themes()}>
        {(theme, index) => {
          const isActive = () => theme.name === activeTheme().name;
          const isSelected = () => index() === selectedIndex();

          return (
            <button
              type="button"
              role="radio"
              aria-checked={isActive()}
              aria-label={`${theme.label} theme`}
              tabindex={isSelected() ? 0 : -1}
              class={`relative flex flex-col items-center p-3 rounded-xl border-2 transition-all cursor-pointer ${
                isActive()
                  ? "border-[#0D9488] shadow-md"
                  : isSelected()
                    ? "border-slate-300 dark:border-slate-600"
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
              }`}
              onClick={() => handleSelect(theme)}
              onKeyDown={(e) => handleKeyDown(e, index())}
              onFocus={() => setSelectedIndex(index())}
            >
              {/* Active indicator */}
              <Show when={isActive()}>
                <div class="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
              </Show>

              {/* Color swatch preview */}
              <div class="flex w-full gap-1 mb-2 h-6 rounded overflow-hidden">
                <div
                  class="flex-1"
                  style={{ "background-color": theme.colors.bg }}
                  aria-hidden="true"
                />
                <div
                  class="flex-1"
                  style={{ "background-color": theme.colors.surface }}
                  aria-hidden="true"
                />
                <div
                  class="flex-1"
                  style={{ "background-color": theme.colors.accent }}
                  aria-hidden="true"
                />
                <div
                  class="flex-1"
                  style={{ "background-color": theme.colors.text }}
                  aria-hidden="true"
                />
              </div>

              {/* Theme name */}
              <span class="text-xs font-medium text-center text-slate-700 dark:text-slate-300 leading-tight">
                {theme.label}
              </span>
            </button>
          );
        }}
      </For>
    </div>
  );
}
