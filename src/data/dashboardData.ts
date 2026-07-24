/**
 * dashboardData.ts
 * -----------------
 * Mock data for the Project Tracker Dashboard.
 * Covers the last 12 months with realistic month-to-month variance.
 *
 * TypeScript 5 - no external dependencies required.
 */

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

/**
 * A single KPI snapshot for one calendar month.
 */
export interface MonthlySnapshot {
  /** Full month label, e.g. "Aug 2024" */
  month: string;

  /** ISO year-month string for sorting/keying, e.g. "2024-08" */
  yearMonth: string;

  /** Total number of tasks marked done during this month. */
  tasksCompleted: number;

  /**
   * Team velocity - story points (or equivalent units) delivered
   * across all sprints that ended in this month.
   */
  teamVelocity: number;

  /**
   * Number of tasks still in an open/in-progress state
   * at the end of the month.
   */
  openTasks: number;

  /**
   * Percentage of sprint goals fully completed for all
   * sprints that closed in this month (0-100).
   */
  sprintCompletionPct: number;
}

/**
 * Top-level shape of the dashboard data export.
 */
export interface DashboardData {
  /** Human-readable name for this dataset. */
  projectName: string;

  /**
   * Unit label used for Team Velocity values
   * (e.g. "story points", "points").
   */
  velocityUnit: string;

  /** Ordered array of monthly snapshots, oldest to newest. */
  snapshots: MonthlySnapshot[];
}

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

/**
 * 12 months of mock data (Aug 2024 - Jul 2025).
 *
 * Variance rationale:
 *  - Q4 (Oct-Dec) shows a dip typical of holiday slowdowns then a push.
 *  - Q1 (Jan-Feb) starts slow as teams re-orient after the new year.
 *  - Q2-Q3 picks up as the team finds rhythm; velocity grows steadily.
 *  - openTasks fluctuates inversely with tasksCompleted (backlog refills).
 *  - sprintCompletionPct stays in a realistic 68-95 % band.
 */
const snapshots: MonthlySnapshot[] = [
  {
    month: "Aug 2024",
    yearMonth: "2024-08",
    tasksCompleted: 47,
    teamVelocity: 62,
    openTasks: 34,
    sprintCompletionPct: 78,
  },
  {
    month: "Sep 2024",
    yearMonth: "2024-09",
    tasksCompleted: 53,
    teamVelocity: 68,
    openTasks: 31,
    sprintCompletionPct: 82,
  },
  {
    month: "Oct 2024",
    yearMonth: "2024-10",
    tasksCompleted: 41,
    teamVelocity: 55,
    openTasks: 38,
    sprintCompletionPct: 71,
  },
  {
    month: "Nov 2024",
    yearMonth: "2024-11",
    tasksCompleted: 38,
    teamVelocity: 50,
    openTasks: 42,
    sprintCompletionPct: 68,
  },
  {
    month: "Dec 2024",
    yearMonth: "2024-12",
    tasksCompleted: 44,
    teamVelocity: 58,
    openTasks: 36,
    sprintCompletionPct: 74,
  },
  {
    month: "Jan 2025",
    yearMonth: "2025-01",
    tasksCompleted: 39,
    teamVelocity: 52,
    openTasks: 45,
    sprintCompletionPct: 70,
  },
  {
    month: "Feb 2025",
    yearMonth: "2025-02",
    tasksCompleted: 46,
    teamVelocity: 61,
    openTasks: 40,
    sprintCompletionPct: 76,
  },
  {
    month: "Mar 2025",
    yearMonth: "2025-03",
    tasksCompleted: 55,
    teamVelocity: 72,
    openTasks: 33,
    sprintCompletionPct: 85,
  },
  {
    month: "Apr 2025",
    yearMonth: "2025-04",
    tasksCompleted: 60,
    teamVelocity: 78,
    openTasks: 29,
    sprintCompletionPct: 88,
  },
  {
    month: "May 2025",
    yearMonth: "2025-05",
    tasksCompleted: 58,
    teamVelocity: 75,
    openTasks: 31,
    sprintCompletionPct: 86,
  },
  {
    month: "Jun 2025",
    yearMonth: "2025-06",
    tasksCompleted: 64,
    teamVelocity: 83,
    openTasks: 27,
    sprintCompletionPct: 92,
  },
  {
    month: "Jul 2025",
    yearMonth: "2025-07",
    tasksCompleted: 71,
    teamVelocity: 90,
    openTasks: 24,
    sprintCompletionPct: 95,
  },
];

export const dashboardData: DashboardData = {
  projectName: "Alpha Release Tracker",
  velocityUnit: "story points",
  snapshots,
};
