import { generateBriefing } from "../../intelligence/assistant.js";

export default function DailyBriefing() {
  const briefing = generateBriefing({
    missions: 3,
    tasks: 5
  });

  return (
    <section className="briefing-card">
      <span className="ccd-kicker">
        AI Briefing
      </span>
      <h2>
        {briefing.title}
      </h2>
      <p>
        {briefing.summary}
      </p>
    </section>
  );
}
