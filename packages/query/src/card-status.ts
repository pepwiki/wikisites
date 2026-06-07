/**
 * Card status derivation utilities.
 *
 * Pure functions that map CardState to display labels and CSS classes.
 * Shared across Flashcard and Quiz components to eliminate duplication.
 */

import type { CardState } from "./fsrs";

/** Human-readable card status label. */
export function getStatusLabel(card: CardState | null): string {
  if (!card || card.repetitions === 0) return "New";
  if (card.lapses > 0 && card.repetitions <= 1) return "Learning";
  if (card.scheduledDays <= 1) return "Learning";
  return "Review";
}

/** Tailwind CSS class string for card status badge. */
export function getStatusColor(card: CardState | null): string {
  if (!card || card.repetitions === 0) return "bg-blue-100 text-blue-700";
  if (card.lapses > 0 && card.repetitions <= 1) return "bg-orange-100 text-orange-700";
  if (card.scheduledDays <= 1) return "bg-orange-100 text-orange-700";
  return "bg-green-100 text-green-700";
}
