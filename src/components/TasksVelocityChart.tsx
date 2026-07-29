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
import type { MonthlySnapshot } from "../data/dashboardData";

interface TasksVelocityChartProps {
  snapshots: MonthlySnapshot[];
}

export default function TasksVelocityChart({ snapshots }: TasksVelocityChartProps) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
      <h2 className="text-base font-semibold text-white mb-4">
        Tasks Completed vs Team Velocity
      </h2>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={snapshots} margin={{ top: 4, right: 16, bottom: 0, left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
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
            contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: 8 }}
            labelStyle={{ color: "#f9fafb", fontWeight: 600 }}
            itemStyle={{ color: "#d1d5db" }}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: "#9ca3af", paddingTop: 8 }} />
          <Line
            type="monotone"
            dataKey="tasksCompleted"
            name="Tasks Completed"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="teamVelocity"
            name="Team Velocity (pts)"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
