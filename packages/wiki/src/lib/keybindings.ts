/**
 * Default keybindings for the power user shell.
 *
 * Maps action IDs to human-readable keyboard shortcuts.
 * Used by KeyboardShortcutManager and ShortcutHelp overlay.
 *
 * @module keybindings
 */

import type { Keybinding } from "./keyboard-shortcuts";

/**
 * Default keybindings for all power-user actions.
 */
export const DEFAULT_KEYBINDINGS: Keybinding[] = [
  {
    id: "global.command-palette",
    key: "k",
    modifiers: ["Ctrl"],
    action: "command-palette.open",
    scope: "global",
    description: "Open command palette",
  },
  {
    id: "global.shortcut-help",
    key: "/",
    modifiers: ["Ctrl"],
    action: "shortcut-help.toggle",
    scope: "global",
    description: "Show keyboard shortcuts",
  },
  {
    id: "article.outline-toggle",
    key: "i",
    modifiers: ["Ctrl", "Shift"],
    action: "outline.toggle",
    scope: "article",
    description: "Toggle outline panel",
  },
  {
    id: "article.graph-toggle",
    key: "e",
    modifiers: ["Ctrl", "Shift"],
    action: "graph.toggle",
    scope: "article",
    description: "Toggle graph view",
  },
  {
    id: "article.split-toggle",
    key: "\\",
    modifiers: ["Ctrl", "Shift"],
    action: "split.toggle",
    scope: "article",
    description: "Toggle split pane",
  },
  {
    id: "article.regex-search",
    key: "f",
    modifiers: ["Ctrl", "Shift"],
    action: "search.regex",
    scope: "article",
    description: "Regex search",
  },
  {
    id: "global.toggle-theme",
    key: "D",
    modifiers: ["Ctrl", "Shift"],
    action: "theme.toggle",
    scope: "global",
    description: "Toggle dark mode",
  },
  {
    id: "global.copy-link",
    key: "c",
    modifiers: ["Ctrl", "Shift"],
    action: "action.copy-link",
    scope: "global",
    description: "Copy page link",
  },
  {
    id: "global.random-article",
    key: "j",
    modifiers: ["Ctrl", "Shift"],
    action: "nav.random",
    scope: "global",
    description: "Random article",
  },
  // Flashcard navigation (modal scope)
  {
    id: "flashcard.flip",
    key: " ",
    modifiers: [],
    action: "flashcard.flip",
    scope: "modal",
    description: "Flip card",
  },
  {
    id: "flashcard.rate-again",
    key: "1",
    modifiers: [],
    action: "flashcard.rate-again",
    scope: "modal",
    description: "Rate: Again",
  },
  {
    id: "flashcard.rate-hard",
    key: "2",
    modifiers: [],
    action: "flashcard.rate-hard",
    scope: "modal",
    description: "Rate: Hard",
  },
  {
    id: "flashcard.rate-good",
    key: "3",
    modifiers: [],
    action: "flashcard.rate-good",
    scope: "modal",
    description: "Rate: Good",
  },
  {
    id: "flashcard.rate-easy",
    key: "4",
    modifiers: [],
    action: "flashcard.rate-easy",
    scope: "modal",
    description: "Rate: Easy",
  },
];
