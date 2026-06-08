import { Rating } from "@wikisites/query/fsrs";

interface RatingButtonsProps {
  onSelect: (rating: Rating) => void;
  /** Visual size variant */
  size?: "sm" | "md";
  /** Show labels */
  showLabels?: boolean;
}

const RATINGS = [
  {
    rating: Rating.Again,
    label: "Again",
    colors:
      "bg-red-50 dark:bg-red-950/30 border-red-200 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40 focus:ring-red-400",
  },
  {
    rating: Rating.Hard,
    label: "Hard",
    colors:
      "bg-orange-50 dark:bg-orange-950/30 border-orange-200 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/40 focus:ring-orange-400",
  },
  {
    rating: Rating.Good,
    label: "Good",
    colors:
      "bg-teal-50 dark:bg-teal-950/30 border-teal-200 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/40 focus:ring-teal-400",
  },
  {
    rating: Rating.Easy,
    label: "Easy",
    colors:
      "bg-green-50 dark:bg-green-950/30 border-green-200 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/40 focus:ring-green-400",
  },
] as const;

export default function RatingButtons(props: RatingButtonsProps) {
  const sizeClasses = () =>
    props.size === "sm" ? "px-3 py-2 text-sm rounded-lg" : "px-4 py-3 rounded-xl font-medium";

  return (
    <div class="grid grid-cols-4 gap-2 sm:gap-3">
      {RATINGS.map(({ rating, label, colors }) => (
        <button
          type="button"
          class={`${sizeClasses()} border-2 transition-colors focus:outline-none focus:ring-2 ${colors}`}
          onClick={() => props.onSelect(rating)}
          aria-label={`Rate: ${label}`}
        >
          {props.showLabels !== false && label}
        </button>
      ))}
    </div>
  );
}
