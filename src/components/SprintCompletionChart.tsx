import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
} from "recharts";

interface SprintCompletionChartProps {
  value: number;   // 0-100
  month: string;
}

export default function SprintCompletionChart({ value, month }: SprintCompletionChartProps) {
  const data = [{ value }];

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5 flex flex-col items-center">
      <h2 className="text-base font-semibold text-white mb-2 self-start">
        Sprint Completion Rate
      </h2>
      <p className="text-xs text-gray-400 mb-4 self-start">Latest: {month}</p>

      <div className="relative w-full" style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="65%"
            outerRadius="90%"
            startAngle={90}
            endAngle={-270}
            data={data}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            {/* background track */}
            <RadialBar
              dataKey="value"
              cornerRadius={6}
              background={{ fill: "#374151" }}
              fill="#6366f1"
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-bold text-white">{value}%</span>
          <span className="text-xs text-gray-400 mt-1">completed</span>
        </div>
      </div>
    </div>
  );
}
