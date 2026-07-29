import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { MonthlySnapshot } from "../data/dashboardData";

interface OpenTasksChartProps {
  snapshots: MonthlySnapshot[];
}

export default function OpenTasksChart({ snapshots }: OpenTasksChartProps) {
  return (
    <div
      className="bg-gray-800 rounded-xl border border-gray-700 p-5"
      aria-label="Open tasks bar chart"
    >
      <h2 className="text-base font-semibold text-white mb-4">
        Open Tasks per Month
      </h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={snapshots} margin={{ top: 4, right: 16, bottom: 0, left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
          <XAxis
            dataKey="month"
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
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
            contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: 8 }}
            labelStyle={{ color: "#f9fafb", fontWeight: 600 }}
            itemStyle={{ color: "#d1d5db" }}
          />
          <Bar dataKey="openTasks" name="Open Tasks" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
