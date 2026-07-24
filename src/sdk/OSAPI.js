import { CCD_SDK } from "./index.js";
import { DecisionEngine } from "../intelligence/DecisionEngine.js";

export const CCD_OS_API = {
  // Mission Operations
  createMission: (missionData) => CCD_SDK.createNode({ type: "mission", ...missionData }),
  
  // Relationship & Link Operations
  createRelationship: (sourceId, targetId, relation) => CCD_SDK.linkNodes(sourceId, targetId, relation),
  
  // Decision Engine & Intelligence
  generateMorningBriefing: () => CCD_SDK.generateExecutiveBriefing(),
  runDecisionEngine: (missionId) => DecisionEngine.evaluateMission(missionId),
  
  // Platform Telemetry
  getSystemTimeline: () => CCD_SDK.getTimeline()
};
