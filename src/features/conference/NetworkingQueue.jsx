import React from "react";

export default function NetworkingQueue({ targets }) {
  return (
    <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
      <h3 style={{ margin: "0 0 16px 0", color: "#1E5040", fontSize: "16px" }}>Networking Target Queue</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {targets.map((t) => (
          <div key={t.id} style={{ padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#ffffff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong style={{ fontSize: "14px", color: "#1E5040" }}>{t.name}</strong>
              <span style={{ fontSize: "11px", fontWeight: "bold", color: t.priority === "Critical" ? "#8b1e24" : "#e0a83e" }}>
                {t.priority} Priority
              </span>
            </div>
            <p style={{ margin: "4px 0", fontSize: "12px", color: "#64748b" }}>{t.organization}</p>
            <p style={{ margin: 0, fontSize: "12px", color: "#334155" }}>🎯 {t.objective}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
