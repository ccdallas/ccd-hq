import MissionBrief from "./MissionBrief.jsx";
import ActionQueue from "./ActionQueue.jsx";
import OpportunityPulse from "./OpportunityPulse.jsx";
import RelationshipRadar from "./RelationshipRadar.jsx";
import KnowledgePulse from "./KnowledgePulse.jsx";

export default function CommandCenter() {
  return (
    <section className="command-center">
      <MissionBrief />
      <div className="command-grid">
        <OpportunityPulse />
        <RelationshipRadar />
        <KnowledgePulse />
        <ActionQueue />
      </div>
    </section>
  );
}
