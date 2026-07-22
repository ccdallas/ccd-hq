import { aiContext } from "./aiData.js";
import { createBriefing } from "./briefingEngine.js";

export default function ChiefOfStaff() {
  const briefing = createBriefing(aiContext);

  return (
    <section className="chief-card">
      <span className="ccd-kicker">AI Chief of Staff</span>
      <h2>{briefing.greeting}</h2>
      <p style={{ marginTop: "8px" }}>{briefing.focus}</p>
      <p style={{ marginTop: "4px" }}>{briefing.missions}</p>
    </section>
  );
}
