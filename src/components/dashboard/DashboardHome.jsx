import DailyBriefing from "../intelligence/DailyBriefing.jsx";
import MissionControl from "../../features/mission/MissionControl.jsx";
import JobSearchTracker from "../../features/career/JobSearchTracker.jsx";
import RelationshipIntelligence from "../../features/relationships/RelationshipIntelligence.jsx";
import KnowledgeVault from "../../features/knowledge/KnowledgeVault.jsx";
import HealthcareCyberLab from "../../features/healthcare-lab/HealthcareCyberLab.jsx";
import EventCommand from "../../features/events/EventCommand.jsx";
import ContentStudio from "../../features/content/ContentStudio.jsx";
import IntegrationCenter from "../../features/integrations/IntegrationCenter.jsx";
import Profile from "../../features/profile/Profile.jsx";
import Settings from "../../features/settings/Settings.jsx";
import MetricCard from "./MetricCard.jsx";
import ModuleCard from "./ModuleCard.jsx";
import { platformMetrics } from "../../core/metrics.js";
import { modules } from "../../core/modules.js";

export default function DashboardHome({ activeModule }) {
  if (activeModule === "career-intelligence") return <JobSearchTracker />;
  if (activeModule === "relationship-intelligence") return <RelationshipIntelligence />;
  if (activeModule === "knowledge-vault") return <KnowledgeVault />;
  if (activeModule === "healthcare-cyber-lab") return <HealthcareCyberLab />;
  if (activeModule === "event-command") return <EventCommand />;
  if (activeModule === "content-studio") return <ContentStudio />;
  if (activeModule === "integrations") return <IntegrationCenter />;
  if (activeModule === "profile") return <Profile />;
  if (activeModule === "settings") return <Settings />;
  if (activeModule === "mission-control") return <MissionControl />;

  return (
    <section className="ccd-dashboard">
      <DailyBriefing />

      <div className="ccd-dashboard-header">
        <span className="ccd-kicker">Command Center</span>
        <h2>CCD-HQ Mission Overview</h2>
        <p>Your healthcare cybersecurity operating system.</p>
      </div>

      <div className="ccd-metric-grid">
        {platformMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="ccd-module-grid">
        {modules
          .filter((module) => module.enabled)
          .map((module) => (
            <ModuleCard
              key={module.id}
              name={module.name}
              description="Operational module"
              status="Online"
            />
          ))}
      </div>
    </section>
  );
}
