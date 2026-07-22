import { commandData } from "./commandData.js";

export default function MissionBrief() {
  return (
    <section className="mission-brief">
      <span className="ccd-kicker">
        Daily Intelligence Brief
      </span>
      <h1>
        Good Morning, Chaunda.
      </h1>
      <p>
        Your healthcare cybersecurity command center is online.
      </p>
      <div className="brief-metrics">
        <div>
          <strong>{commandData.missionCount}</strong>
          <span>Active Missions</span>
        </div>
        <div>
          <strong>{commandData.relationshipCount}</strong>
          <span>Relationships</span>
        </div>
        <div>
          <strong>{commandData.knowledgeCount}</strong>
          <span>Knowledge Assets</span>
        </div>
      </div>
    </section>
  );
}
