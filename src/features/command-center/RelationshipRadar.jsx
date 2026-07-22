import { commandData } from "./commandData.js";

export default function RelationshipRadar() {
  return (
    <section className="command-card">
      <h2>Relationship Radar</h2>
      <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {commandData.relationships.map((person) => (
          <div key={person.name} style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "6px" }}>
            <strong style={{ display: "block", fontSize: "14px", color: "#1E5040" }}>
              {person.name}
            </strong>
            <p style={{ fontSize: "12px", color: "#8B1E24", margin: "2px 0 0 0", fontWeight: "bold" }}>
              {person.status}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
