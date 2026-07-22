import MissionBrief from "./MissionBrief.jsx";
import ChiefOfStaff from "../ai-chief/ChiefOfStaff.jsx";
import MissionEngine from "../missions/MissionEngine.jsx";
import ActionQueue from "./ActionQueue.jsx";
import RelationshipRadar from "./RelationshipRadar.jsx";
import OpportunityPulse from "./OpportunityPulse.jsx";
import KnowledgeVault from "../knowledge/KnowledgeVault.jsx";

export default function CommandCenter() {
  return (
    <section className="command-center">
      <MissionBrief />
      <ChiefOfStaff />
      <div className="command-grid">
        <MissionEngine />
        <OpportunityPulse />
        <RelationshipRadar />
        <KnowledgeVault />
        <ActionQueue />
      </div>
    </section>
  );
}
