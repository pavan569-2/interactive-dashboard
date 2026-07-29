const RANGES = [
  { label: "Last 30 days",   days: 30  },
  { label: "Last 90 days",   days: 90  },
  { label: "Last 6 months",  days: 180 },
  { label: "Last 12 months", days: 365 },
] as const;

interface DateRangeSelectorProps {
  value: number;
  onChange: (days: number) => void;
}

export default function DateRangeSelector({
  value,
  onChange,
}: DateRangeSelectorProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Date range filter"
    >
      {RANGES.map((r) => {
        const active = value === r.days;
        return (
          <button
            key={r.days}
            type="button"
            onClick={() => onChange(r.days)}
            aria-pressed={active}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              active
                ? "bg-indigo-600 text-white"
                : "bg-gray-800 text-gray-400 border border-gray-700 hover:border-indigo-500 hover:text-white"
            }`}
          >
            {r.label}
          </button>
        );
      })}
    </div>
  );
}
