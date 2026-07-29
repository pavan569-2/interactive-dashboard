import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { MonthlySnapshot } from "../data/dashboardData";

interface TasksPieChartProps {
  snapshots: MonthlySnapshot[];
}

const SLICE_COLORS = ["#6366f1", "#f59e0b"] as const;

export default function TasksPieChart({ snapshots }: TasksPieChartProps) {
  const totalCompleted = snapshots.reduce((s, r) => s + r.tasksCompleted, 0);
  const totalOpen = snapshots.reduce((s, r) => s + r.openTasks, 0);

  const pieData = [
    { name: "Completed Tasks", value: totalCompleted },
    { name: "Open Tasks",      value: totalOpen      },
  ];

  return (
    <div
      className="bg-gray-800 rounded-xl border border-gray-700 p-5"
      aria-label="Tasks distribution pie chart"
    >
      <h2 className="text-base font-semibold text-white mb-4">
        Tasks Distribution
      </h2>

      {snapshots.length === 0 ? (
        <div className="flex items-center justify-center h-[260px]">
          <p className="text-gray-400 text-sm">No data for selected period</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              isAnimationActive={true}
            >
              {pieData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={SLICE_COLORS[index % SLICE_COLORS.length]}
                />
              ))}
            </Pie>
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
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
