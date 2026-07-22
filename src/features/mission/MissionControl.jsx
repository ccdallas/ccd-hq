import MissionCard from "./MissionCard.jsx";
import { getMissions } from "./missionService.js";

export default function MissionControl() {
  const missions = getMissions();

  return (
    <section>
      <span className="ccd-kicker">
        Mission Control
      </span>
      <h2>
        Strategic Operations Center
      </h2>
      <div className="mission-grid">
        {missions.map((mission) => (
          <MissionCard key={mission.id} {...mission} />
        ))}
      </div>
    </section>
  );
}
