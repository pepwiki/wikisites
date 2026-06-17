interface MasteryBadgeProps {
  /** Accuracy percentage 0-100 */
  accuracy: number;
  /** Number of reviews completed */
  reviews: number;
}

export default function MasteryBadge(props: MasteryBadgeProps) {
  const level = () => {
    if (props.accuracy >= 90 && props.reviews >= 10) return "expert";
    if (props.accuracy >= 75 && props.reviews >= 5) return "proficient";
    if (props.accuracy >= 50 && props.reviews >= 3) return "familiar";
    if (props.reviews > 0) return "beginner";
    return "none";
  };

  const config = {
    none: {
      label: "Not started",
      color:
        "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400",
    },
    beginner: {
      label: "Beginner",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    },
    familiar: {
      label: "Familiar",
      color:
        "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
    },
    proficient: {
      label: "Proficient",
      color:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
    },
    expert: {
      label: "Expert",
      color:
        "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    },
  };

  const c = () => config[level()];

  return (
    <span class={`text-xs font-bold px-2 py-0.5 rounded-full ${c().color}`}>
      {c().label}
    </span>
  );
}
