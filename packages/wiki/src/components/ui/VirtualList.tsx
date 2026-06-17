import type { JSX } from "solid-js";
import { VList, type VListProps } from "virtua";

export interface VirtualListProps<T> extends Omit<VListProps<T>, "children"> {
  /** Render function for each item */
  children: (item: T, index: number) => JSX.Element;
  /** Estimated item height for scroll calculation */
  estimateSize?: number;
  /** Additional CSS class on the scroll container */
  class?: string;
}

/**
 * Virtua-backed virtual list for SolidJS.
 * Use when rendering 500+ items to avoid frame drops.
 *
 * Usage:
 * ```tsx
 * <VirtualList items={cards} estimateSize={120}>
 *   {(card) => <FlashcardCard data={card} />}
 * </VirtualList>
 * ```
 */
export default function VirtualList<T>(props: VirtualListProps<T>) {
  return (
    <VList {...props} class={`w-full ${props.class ?? ""}`}>
      {(item: T, index: number) => props.children(item, index)}
    </VList>
  );
}
