import { useState, useMemo } from "react";
import { dashboardData } from "./data/dashboardData";
import Header from "./components/Header";
import KpiCard from "./components/KpiCard";
import RevenueLineChart from "./components/RevenueLineChart";
import OpenTasksChart from "./components/OpenTasksChart";
import TasksPieChart from "./components/TasksPieChart";
import DateRangeSelector from "./components/DateRangeSelector";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type Snap = (typeof dashboardData.snapshots)[number];

/** Sum a numeric field over an array of snapshots. */
function sum(arr: Snap[], key: keyof Snap): number {
  return arr.reduce((acc, s) => acc + (s[key] as number), 0);
}

/** Average a numeric field, rounded to the nearest integer. Returns 0 for empty arrays. */
function avg(arr: Snap[], key: keyof Snap): number {
  if (arr.length === 0) return 0;
  return Math.round(sum(arr, key) / arr.length);
}

/** Map a numeric delta to a trend direction. */
function trendDir(d: number): "up" | "down" | "neutral" {
  if (d > 0) return "up";
  if (d < 0) return "down";
  return "neutral";
}

/** Format a delta with an explicit sign and an optional unit suffix. */
function fmtChange(d: number, suffix = ""): string {
  return (d > 0 ? "+" : "") + String(d) + suffix;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function App() {
  const { projectName, snapshots } = dashboardData;

  // Default: show all 12 months (Last 12 months).
  const [dateRangeDays, setDateRangeDays] = useState(365);

  // ---------------------------------------------------------------------------
  // Date filtering — no external date library.
  // ---------------------------------------------------------------------------
  const { filtered, prevFiltered, prevAvailable } = useMemo(() => {
    const now = new Date();

    // Current window: [now - dateRangeDays, now]
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - dateRangeDays);
    const filtered = snapshots.filter((s) => new Date(s.isoDate) >= cutoff);

    // Previous equivalent window: [now - 2*dateRangeDays, now - dateRangeDays)
    const prevCutoff = new Date(now);
    prevCutoff.setDate(prevCutoff.getDate() - dateRangeDays * 2);
    const prevFiltered = snapshots.filter(
      (s) => new Date(s.isoDate) >= prevCutoff && new Date(s.isoDate) < cutoff
    );

    // A fair comparison requires the prior window to have the same length.
    const prevAvailable = prevFiltered.length === filtered.length && filtered.length > 0;

    return { filtered, prevFiltered, prevAvailable };
  }, [dateRangeDays, snapshots]);

  // ---------------------------------------------------------------------------
  // KPI values — derived from the current filtered period.
  // ---------------------------------------------------------------------------
  const tasksCompleted   = sum(filtered, "tasksCompleted");           // period total
  const teamVelocity     = avg(filtered, "teamVelocity");             // period average
  const openTasks        = avg(filtered, "openTasks");                // period average
  const sprintCompletion = avg(filtered, "sprintCompletionPct");      // period average %

  // ---------------------------------------------------------------------------
  // Period-over-period deltas (only used when prevAvailable is true).
  // ---------------------------------------------------------------------------
  const tasksChange  = sum(filtered, "tasksCompleted")  - sum(prevFiltered, "tasksCompleted");
  const velChange    = avg(filtered, "teamVelocity")     - avg(prevFiltered, "teamVelocity");
  const openChange   = avg(filtered, "openTasks")        - avg(prevFiltered, "openTasks");
  const sprintChange = avg(filtered, "sprintCompletionPct") - avg(prevFiltered, "sprintCompletionPct");

  return (
    <div className="w-full min-h-screen bg-gray-950 text-gray-100">
      <Header projectName={projectName} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ── Date range selector ───────────────────────────────────────── */}
        <section aria-label="Date range filter">
          <DateRangeSelector value={dateRangeDays} onChange={setDateRangeDays} />
        </section>

        {/* ── KPI cards (top row) ───────────────────────────────────────── */}
        <section aria-label="Key performance indicators">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              title="Tasks Completed"
              value={tasksCompleted}
              subtitle="vs previous period"
              changeLabel={fmtChange(tasksChange)}
              trend={trendDir(tasksChange)}
              unavailable={!prevAvailable}
            />
            <KpiCard
              title="Team Velocity"
              value={`${teamVelocity} pts`}
              subtitle="vs previous period"
              changeLabel={fmtChange(velChange)}
              trend={trendDir(velChange)}
              unavailable={!prevAvailable}
            />
            <KpiCard
              title="Open Tasks"
              value={openTasks}
              subtitle="vs previous period"
              changeLabel={fmtChange(openChange)}
              trend={
                /* Fewer open tasks is positive — invert direction */
                openChange < 0 ? "up" : openChange > 0 ? "down" : "neutral"
              }
              unavailable={!prevAvailable}
            />
            <KpiCard
              title="Sprint Completion"
              value={`${sprintCompletion}%`}
              subtitle="vs previous period"
              changeLabel={fmtChange(sprintChange, "%")}
              trend={trendDir(sprintChange)}
              unavailable={!prevAvailable}
            />
          </div>
        </section>

        {/* ── Full-width line chart (middle row) ───────────────────────── */}
        <section aria-label="Tasks completed trend">
          <RevenueLineChart
            data={filtered}
            xKey="month"
            yKey="tasksCompleted"
            color="#6366f1"
            name="Tasks Completed"
            title="Tasks Completed Over Time"
          />
        </section>

        {/* ── Bar chart (60%) + Pie chart (40%) (bottom row) ───────────── */}
        <section aria-label="Task distribution charts">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3">
              <OpenTasksChart snapshots={filtered} />
            </div>
            <div className="lg:col-span-2">
              <TasksPieChart snapshots={filtered} />
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
