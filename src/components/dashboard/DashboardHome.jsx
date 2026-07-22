import MissionControl from "../../features/mission/MissionControl.jsx";
import JobSearchTracker from "../../features/career/JobSearchTracker.jsx";

export default function DashboardHome({ activeModule }) {
  if (activeModule === "career-intelligence") {
    return <JobSearchTracker />;
  }

  return <MissionControl />;
}
