import React from "react";
import MorningReport from "./MorningReport.jsx";
import ExecutiveBriefing from "./ExecutiveBriefing.jsx";
import ChiefOfStaff from "../../features/ai-chief/ChiefOfStaff.jsx";
import MissionControl from "../../features/mission/MissionControl.jsx";
import KnowledgeVault from "../../features/knowledge/KnowledgeVault.jsx";
import RelationshipIntelligence from "../../features/relationships/RelationshipIntelligence.jsx";
import IntegrationHub from "../../features/integrations/IntegrationHub.jsx";
import ConferenceDashboard from "../../features/conference/ConferenceDashboard.jsx";
import MissionGraphViewer from "../../features/mission/MissionGraphViewer.jsx";
import ThreatIntelligenceWorkspace from "../../features/cyber-lab/ThreatIntelligenceWorkspace.jsx";
import PlatformObservability from "../../features/ops/PlatformObservability.jsx";
import BlackHatMissionHub from "../../features/conference/BlackHatMissionHub.jsx";
import FounderDashboard from "../../features/founder/FounderDashboard.jsx";

export default function DashboardHome({ activeModule }) {
  switch (activeModule) {
    case "founder-dashboard":
      return <FounderDashboard />;
    case "blackhat-hub":
      return <BlackHatMissionHub />;
    case "threat-intelligence":
      return <ThreatIntelligenceWorkspace />;
    case "platform-ops":
      return <PlatformObservability />;
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
    case "integration-hub":
      return <IntegrationHub />;
    case "command-center":
    default:
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <MorningReport />
          <ExecutiveBriefing />
          <ChiefOfStaff />
        </div>
      );
  }
}
