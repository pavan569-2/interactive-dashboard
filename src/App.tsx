import { dashboardData } from "./data/dashboardData";

function App() {
  const { projectName, snapshots } = dashboardData;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <h1 className="text-3xl font-bold text-indigo-400 mb-6">
        {projectName} — Dashboard
      </h1>

      <p className="text-gray-400 mb-4">
        Showing {snapshots.length} months of KPI data.
      </p>

      <ul className="space-y-2">
        {snapshots.map((s) => (
          <li
            key={s.yearMonth}
            className="flex gap-6 bg-gray-800 rounded-lg px-4 py-3 text-sm"
          >
            <span className="w-24 font-medium text-gray-300">{s.month}</span>
            <span>Tasks completed: <strong>{s.tasksCompleted}</strong></span>
            <span>Velocity: <strong>{s.teamVelocity}</strong> pts</span>
            <span>Open tasks: <strong>{s.openTasks}</strong></span>
            <span>Sprint: <strong>{s.sprintCompletionPct}%</strong></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
