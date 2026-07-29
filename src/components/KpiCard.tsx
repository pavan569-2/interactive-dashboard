interface KpiCardProps {
  title: string;
  value: string | number;
  /** Contextual label shown beside the trend arrow, e.g. "vs previous period" */
  subtitle: string;
  /** Pre-formatted delta string, e.g. "+5", "-3%", "0" */
  changeLabel: string;
  trend: "up" | "down" | "neutral";
  /**
   * When true, the comparison row is replaced with a "Previous period
   * unavailable" notice instead of showing a potentially misleading zero delta.
   */
  unavailable?: boolean;
}

const trendConfig = {
  up:      { arrow: "↑", cls: "text-emerald-400" },
  down:    { arrow: "↓", cls: "text-red-400"     },
  neutral: { arrow: "→", cls: "text-gray-400"    },
} as const;

export default function KpiCard({
  title,
  value,
  subtitle,
  changeLabel,
  trend,
  unavailable = false,
}: KpiCardProps) {
  const { arrow, cls } = trendConfig[trend];

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
        {title}
      </p>
      <p className="mt-2 text-4xl font-bold text-white">{value}</p>

      {unavailable ? (
        <p className="mt-2 text-xs text-gray-500 italic">
          Previous period unavailable
        </p>
      ) : (
        <div className="mt-2 flex items-center gap-1.5">
          <span
            className={`text-sm font-semibold ${cls}`}
            aria-label={`Trend: ${trend}, change: ${changeLabel}`}
          >
            {arrow} {changeLabel}
          </span>
          <span className="text-sm text-gray-400">{subtitle}</span>
        </div>
      )}
    </div>
  );
}
