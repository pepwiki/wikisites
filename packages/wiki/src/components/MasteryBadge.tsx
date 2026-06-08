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
    none: { label: "Not started", color: "bg-slate-100 text-slate-500" },
    beginner: { label: "Beginner", color: "bg-blue-100 text-blue-700" },
    familiar: { label: "Familiar", color: "bg-yellow-100 text-yellow-700" },
    proficient: { label: "Proficient", color: "bg-orange-100 text-orange-700" },
    expert: { label: "Expert", color: "bg-green-100 text-green-700" },
  };

  const c = config[level()];

  return (
    <span class={`text-xs font-bold px-2 py-0.5 rounded-full ${c.color}`}>
      {c.label}
    </span>
  );
}
