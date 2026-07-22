import { integrations } from "./integrationData.js";

export default function IntegrationHub() {
  return (
    <section className="command-card">
      <h2>Integration Hub</h2>
      <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {integrations.map((item) => (
          <div key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f0f0f0", paddingBottom: "6px" }}>
            <div>
              <h3 style={{ fontSize: "14px", color: "#1E5040", margin: 0 }}>{item.name}</h3>
              <p style={{ fontSize: "12px", color: "#4a5568", margin: "2px 0 0 0" }}>{item.purpose}</p>
            </div>
            <span className="integration-status">{item.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
