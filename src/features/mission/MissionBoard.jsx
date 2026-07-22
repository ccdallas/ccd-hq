import MissionTask from "./MissionTask.jsx";
import { missionTasks } from "./missionTasks.js";

export default function MissionBoard() {
  return (
    <section>
      <span className="ccd-kicker">
        Mission Operations
      </span>
      <h2>
        Active Objectives
      </h2>
      <div className="lab-grid">
        {missionTasks.map((item) => (
          <MissionTask key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
