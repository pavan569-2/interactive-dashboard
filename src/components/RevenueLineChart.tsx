import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RevenueLineChartProps {
  /** Any array of plain objects — Recharts accesses keys at runtime. */
  data: object[];
  /** Key of the x-axis field (e.g. "month") */
  xKey: string;
  /** Key of the y-axis field (e.g. "tasksCompleted") */
  yKey: string;
  /** Stroke colour for the line (e.g. "#6366f1") */
  color: string;
  /** Human-readable series label shown in the legend */
  name?: string;
  /** Optional card heading */
  title?: string;
}

/**
 * RevenueLineChart
 *
 * A reusable single-series line chart card built on Recharts.
 * Tailwind classes are used only for the wrapper div; all chart
 * styling is done via Recharts props.
 */
export default function RevenueLineChart({
  data,
  xKey,
  yKey,
  color,
  name,
  title,
}: RevenueLineChartProps) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
      {title && (
        <h2 className="text-base font-semibold text-white mb-4">{title}</h2>
      )}
      <ResponsiveContainer width="100%" height={260}>
        <LineChart
          data={data}
          margin={{ top: 4, right: 16, bottom: 0, left: -10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey={xKey}
            tick={{ fill: "#9ca3af", fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: "#374151" }}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: "#9ca3af", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: 8,
            }}
            labelStyle={{ color: "#f9fafb", fontWeight: 600 }}
            itemStyle={{ color: "#d1d5db" }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, color: "#9ca3af", paddingTop: 8 }}
          />
          <Line
            type="monotone"
            dataKey={yKey}
            name={name ?? yKey}
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
