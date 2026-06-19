/**
 * Default command registrations for the command palette.
 *
 * Populates the command registry with all known power-user actions,
 * navigation commands, and view toggles.
 *
 * @module commands
 * @see BP-POWER-USER-SHELL-001 §5.3
 */

import { createCommandRegistry, type Command } from "./command-registry";

/** Default commands for the power user command palette. */
const DEFAULT_COMMANDS: Command[] = [
  // ── View ──────────────────────────────────────────────────────────────────
  {
    id: "nav.outline",
    label: "Toggle Outline",
    description: "Show/hide document outline panel",
    category: "view",
    shortcut: "Ctrl+Shift+I",
    enabled: true,
  },
  {
    id: "nav.graph",
    label: "Toggle Graph View",
    description: "Show knowledge graph of linked pages",
    category: "view",
    shortcut: "Ctrl+Shift+E",
    enabled: true,
  },
  {
    id: "nav.split",
    label: "Toggle Split Pane",
    description: "Split view mode for side-by-side reading",
    category: "view",
    shortcut: "Ctrl+Shift+\\",
    enabled: true,
  },

  // ── Action ────────────────────────────────────────────────────────────────
  {
    id: "action.search",
    label: "Regex Search",
    description: "Search with regular expressions",
    category: "action",
    shortcut: "Ctrl+Shift+F",
    enabled: true,
  },
  {
    id: "action.shortcuts",
    label: "Keyboard Shortcuts",
    description: "Show all keyboard shortcuts",
    category: "action",
    shortcut: "Ctrl+/",
    enabled: true,
  },
  {
    id: "action.copy-link",
    label: "Copy Link",
    description: "Copy current page URL to clipboard",
    category: "action",
    shortcut: "Ctrl+Shift+C",
    enabled: true,
  },
  {
    id: "action.command-palette",
    label: "Command Palette",
    description: "Open the command palette",
    category: "action",
    shortcut: "Ctrl+K",
    enabled: true,
  },

  // ── Settings ──────────────────────────────────────────────────────────────
  {
    id: "action.theme",
    label: "Toggle Dark Mode",
    description: "Switch between light and dark theme",
    category: "settings",
    shortcut: "Ctrl+Shift+D",
    enabled: true,
  },

  // ── Navigation ────────────────────────────────────────────────────────────
  {
    id: "nav.random",
    label: "Random Article",
    description: "Navigate to a random article",
    category: "navigation",
    shortcut: "Ctrl+Shift+J",
    enabled: true,
  },
  {
    id: "nav.home",
    label: "Go Home",
    description: "Navigate to the home page",
    category: "navigation",
    enabled: true,
  },
  {
    id: "nav.back",
    label: "Go Back",
    description: "Navigate to the previous page",
    category: "navigation",
    enabled: true,
  },
  {
    id: "nav.forward",
    label: "Go Forward",
    description: "Navigate to the next page",
    category: "navigation",
    enabled: true,
  },
];

/**
 * Create and populate the default command registry.
 *
 * @returns A fully populated CommandRegistryApi instance.
 */
export function createDefaultCommandRegistry() {
  const registry = createCommandRegistry();
  for (const cmd of DEFAULT_COMMANDS) {
    registry.add(cmd);
  }
  return registry;
}
