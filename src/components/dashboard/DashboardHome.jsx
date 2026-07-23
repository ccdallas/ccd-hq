import React from "react";
import ExecutiveBriefing from "./ExecutiveBriefing.jsx";
import ChiefOfStaff from "../../features/ai-chief/ChiefOfStaff.jsx";
import MissionControl from "../../features/mission/MissionControl.jsx";
import KnowledgeVault from "../../features/knowledge/KnowledgeVault.jsx";
import RelationshipIntelligence from "../../features/relationships/RelationshipIntelligence.jsx";
import ContentStudio from "../../features/content/ContentStudio.jsx";
import IntegrationHub from "../../features/integrations/IntegrationHub.jsx";
import ConferenceDashboard from "../../features/conference/ConferenceDashboard.jsx";
import MissionGraphViewer from "../../features/mission/MissionGraphViewer.jsx";

export default function DashboardHome({ activeModule }) {
  switch (activeModule) {
    case "mission-graph":
      return <MissionGraphViewer />;
    case "conference-command":
      return <ConferenceDashboard />;
    case "ai-chief":
      return <ChiefOfStaff />;
    case "mission-intelligence":
      return <MissionControl />;
    case "knowledge-vault":
      return <KnowledgeVault />;
    case "relationship-intelligence":
      return <RelationshipIntelligence />;
    case "content-studio":
      return <ContentStudio />;
    case "integration-hub":
      return <IntegrationHub />;
    case "command-center":
    default:
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <ExecutiveBriefing />
          <ChiefOfStaff />
        </div>
      );
  }
}
