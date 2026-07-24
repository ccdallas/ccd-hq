import { eventBus } from "../core/events/EventBus.js";
import { EVENTS } from "../core/events/EventTypes.js";
import { globalGraph } from "../core/node/NodeRelations.js";
import { Node } from "../core/node/Node.js";
import { calculateMissionHealth, calculateOpportunityScore } from "../core/scoringEngine.js";

export const CCD_SDK = {
  // Node Creation
  createNode: (data) => {
    const node = new Node(data);
    globalGraph.addNode(node);
    eventBus.emit(EVENTS.KNOWLEDGE_ADDED, { node });
    return node;
  },

  // Link Nodes in Graph
  linkNodes: (sourceId, targetId, relation) => {
    globalGraph.addEdge(sourceId, targetId, relation);
  },

  // Scoring Utilities
  getMissionHealth: calculateMissionHealth,
  getOpportunityScore: calculateOpportunityScore,

  // Event & Timeline Access
  emitEvent: (type, payload) => eventBus.emit(type, payload),
  getTimeline: () => eventBus.getTimeline(),

  // Recommendation Engine Helper
  generateExecutiveBriefing: () => {
    return {
      missionHealth: 94,
      priorities: [
        "Finalize Black Hat 2026 outreach & WISP shift lead prep",
        "Review clinical AI risk & IoMT whitepaper drafts",
        "Engage HIMSS & healthcare cybersecurity leadership contacts"
      ],
      recommendation: "Focus on networking preparation and seminar briefs before starting new technical research."
    };
  }
};
