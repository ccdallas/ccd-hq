import LabCard from "./LabCard.jsx";
import { labAreas } from "./labData.js";

export default function HealthcareCyberLab() {
  return (
    <section>
      <span className="ccd-kicker">
        Healthcare Cyber Lab
      </span>
      <h2>
        Clinical Technology Defense Center
      </h2>
      <div className="lab-grid">
        {labAreas.map((area) => (
          <LabCard key={area.id} {...area} />
        ))}
      </div>
    </section>
  );
}
