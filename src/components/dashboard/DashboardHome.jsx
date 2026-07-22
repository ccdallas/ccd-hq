import CommandCenter from "../../features/command-center/CommandCenter.jsx";
import MissionControl from "../../features/mission/MissionControl.jsx";
import MissionBoard from "../../features/mission/MissionBoard.jsx";
import JobSearchTracker from "../../features/career/JobSearchTracker.jsx";
import RelationshipIntelligence from "../../features/relationships/RelationshipIntelligence.jsx";
import KnowledgeVault from "../../features/knowledge/KnowledgeVault.jsx";
import HealthcareCyberLab from "../../features/healthcare-lab/HealthcareCyberLab.jsx";
import EventCommand from "../../features/events/EventCommand.jsx";
import ContentStudio from "../../features/content/ContentStudio.jsx";
import IntegrationCenter from "../../features/integrations/IntegrationCenter.jsx";
import ProfessionalProfile from "../../features/profile/ProfessionalProfile.jsx";
import Profile from "../../features/profile/Profile.jsx";
import Settings from "../../features/settings/Settings.jsx";

export default function DashboardHome({ activeModule }) {
  if (activeModule === "command-center") return <CommandCenter />;
  if (activeModule === "mission-operations") return <MissionBoard />;
  if (activeModule === "career-intelligence") return <JobSearchTracker />;
  if (activeModule === "relationship-intelligence") return <RelationshipIntelligence />;
  if (activeModule === "knowledge-vault") return <KnowledgeVault />;
  if (activeModule === "healthcare-cyber-lab") return <HealthcareCyberLab />;
  if (activeModule === "event-command") return <EventCommand />;
  if (activeModule === "content-studio") return <ContentStudio />;
  if (activeModule === "integrations") return <IntegrationCenter />;
  if (activeModule === "professional-profile") return <ProfessionalProfile />;
  if (activeModule === "profile") return <Profile />;
  if (activeModule === "settings") return <Settings />;
  if (activeModule === "mission-control") return <MissionControl />;

  return <CommandCenter />;
}
