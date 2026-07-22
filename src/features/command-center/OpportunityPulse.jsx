import { commandData } from "./commandData.js";

export default function OpportunityPulse() {
  return (
    <section className="command-card">
      <h2>Opportunity Pulse</h2>
      <h3 style={{ fontSize: "32px", color: "#1E5040", margin: "10px 0 4px 0" }}>
        {commandData.opportunities}
      </h3>
      <p style={{ fontSize: "14px", color: "#4a5568" }}>
        Active healthcare cybersecurity opportunities
      </p>
    </section>
  );
}
