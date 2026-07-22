import { missions } from "./missionData.js";

export default function MissionEngine() {
  return (
    <section className="command-card">
      <h2>Mission Intelligence</h2>
      <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {missions.map((mission) => (
          <div key={mission.title} style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "8px" }}>
            <h3 style={{ fontSize: "16px", color: "#1E5040", margin: "0 0 4px 0" }}>{mission.title}</h3>
            <p style={{ fontSize: "13px", color: "#4a5568", margin: "0 0 6px 0" }}>{mission.objective}</p>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
              <strong style={{ color: "#E0A83E" }}>Priority: {mission.priority}</strong>
              <span style={{ color: "#2d3748" }}>Next: {mission.nextAction}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
