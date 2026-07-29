import { dashboardData } from "./data/dashboardData";
import Header from "./components/Header";
import KpiCard from "./components/KpiCard";
import TasksVelocityChart from "./components/TasksVelocityChart";
import OpenTasksChart from "./components/OpenTasksChart";
import SprintCompletionChart from "./components/SprintCompletionChart";

export default function App() {
  const { projectName, velocityUnit, snapshots } = dashboardData;

  // KPI values from the most recent month
  const latest = snapshots[snapshots.length - 1];

  // Totals / averages across all 12 months
  const totalTasksCompleted = snapshots.reduce((sum, s) => sum + s.tasksCompleted, 0);
  const avgVelocity = Math.round(
    snapshots.reduce((sum, s) => sum + s.teamVelocity, 0) / snapshots.length
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header projectName={projectName} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* KPI Cards */}
        <section aria-label="Key performance indicators">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              title="Tasks Completed"
              value={latest.tasksCompleted}
              subtitle={`${totalTasksCompleted} total over 12 months`}
            />
            <KpiCard
              title="Team Velocity"
              value={`${latest.teamVelocity}`}
              subtitle={`${velocityUnit} · avg ${avgVelocity} / month`}
            />
            <KpiCard
              title="Open Tasks"
              value={latest.openTasks}
              subtitle={`as of ${latest.month}`}
            />
            <KpiCard
              title="Sprint Completion"
              value={`${latest.sprintCompletionPct}%`}
              subtitle={`latest sprint · ${latest.month}`}
            />
          </div>
        </section>

        {/* Charts — top row */}
        <section aria-label="Trend charts">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 h-full">
              <TasksVelocityChart snapshots={snapshots} />
            </div>
            <div className="h-full">
              <SprintCompletionChart
                value={latest.sprintCompletionPct}
                month={latest.month}
              />
            </div>
          </div>
        </section>

        {/* Charts — bottom row */}
        <section aria-label="Open tasks chart">
          <OpenTasksChart snapshots={snapshots} />
        </section>

      </main>
    </div>
  );
}
