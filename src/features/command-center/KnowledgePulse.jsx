import { commandData } from "./commandData.js";

export default function KnowledgePulse() {
  return (
    <section className="command-card">
      <h2>Knowledge Pulse</h2>
      <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
        {commandData.knowledge.map((item) => (
          <p key={item} style={{ fontSize: "14px", color: "#2d3748", margin: 0 }}>
            • {item}
          </p>
        ))}
      </div>
    </section>
  );
}
