import React, { useState } from "react";
import { SEED_MISSIONS } from "../../core/MissionGraph.js";

export default function MissionGraphViewer() {
  const [missions] = useState(SEED_MISSIONS);
  const [selectedMission, setSelectedMission] = useState(SEED_MISSIONS[0]);

  const getImpactBadgeStyle = (impact) => {
    switch (impact) {
      case "Critical":
        return { background: "#fee2e2", color: "#991b1b", border: "1px solid #f87171" };
      case "High":
        return { background: "#fef3c7", color: "#92400e", border: "1px solid #fbbf24" };
      case "Medium":
        return { background: "#e0f2fe", color: "#075985", border: "1px solid #38bdf8" };
      default:
        return { background: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1" };
    }
  };

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div>
          <span className="ccd-kicker">Intelligence Graph (Phases 31–35)</span>
          <h2 style={{ margin: "4px 0" }}>Mission Ecosystem Center</h2>
        </div>
        <span style={{ fontSize: "12px", background: "#1E5040", color: "#E0A83E", padding: "6px 12px", borderRadius: "8px", fontWeight: "bold" }}>
          Patient Impact Engine Active
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "20px" }}>
        {/* Mission Selector Panel */}
        <div style={{ background: "white", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ fontSize: "14px", color: "#1E5040", margin: "0 0 12px 0" }}>Active Missions</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {missions.map((m) => {
              const isSelected = selectedMission.id === m.id;
              const badgeStyle = getImpactBadgeStyle(m.patientImpact);
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMission(m)}
                  style={{
                    textAlign: "left",
                    padding: "12px",
                    borderRadius: "8px",
                    border: isSelected ? "2px solid #1E5040" : "1px solid #e2e8f0",
                    background: isSelected ? "#f0fdf4" : "#ffffff",
                    cursor: "pointer"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontSize: "10px", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold", ...badgeStyle }}>
                      Patient Impact: {m.patientImpact}
                    </span>
                  </div>
                  <strong style={{ fontSize: "13px", color: "#0f172a", display: "block" }}>{m.title}</strong>
                </button>
              );
            })}
          </div>
        </div>

        {/* Intelligence Graph Detail Screen */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Main Mission Node Card */}
          <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "20px", color: "#1E5040" }}>{selectedMission.title}</h3>
                <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "14px" }}>{selectedMission.objective}</p>
              </div>
              <span style={{ padding: "4px 10px", borderRadius: "6px", fontWeight: "bold", fontSize: "11px", ...getImpactBadgeStyle(selectedMission.patientImpact) }}>
                Patient Impact: {selectedMission.patientImpact}
              </span>
            </div>
            <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#475569", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
              <span>🗓️ <strong>Due:</strong> {selectedMission.dueDate || "Ongoing"}</span>
              <span>⚡ <strong>Priority:</strong> {selectedMission.priority}</span>
              <span>👤 <strong>Owner:</strong> {selectedMission.owner}</span>
            </div>
          </div>

          {/* Connected Satellite Nodes */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
            {/* Meetings Node */}
            <div style={{ background: "#ffffff", padding: "14px", borderRadius: "10px", border: "1px solid #cbd5e1" }}>
              <h4 style={{ margin: "0 0 8px 0", color: "#1E5040", fontSize: "13px" }}>📅 Connected Meetings ({selectedMission.meetings.length})</h4>
              {selectedMission.meetings.map((item) => (
                <div key={item.id} style={{ fontSize: "12px", color: "#334155", padding: "6px 0", borderBottom: "1px dashed #e2e8f0" }}>
                  <strong>{item.title}</strong>
                  <br />
                  <span style={{ color: "#64748b", fontSize: "11px" }}>{item.time}</span>
                </div>
              ))}
            </div>

            {/* Contacts Node */}
            <div style={{ background: "#ffffff", padding: "14px", borderRadius: "10px", border: "1px solid #cbd5e1" }}>
              <h4 style={{ margin: "0 0 8px 0", color: "#1E5040", fontSize: "13px" }}>🤝 Strategic Network ({selectedMission.contacts.length})</h4>
              {selectedMission.contacts.map((item) => (
                <div key={item.id} style={{ fontSize: "12px", color: "#334155", padding: "6px 0", borderBottom: "1px dashed #e2e8f0" }}>
                  <strong>{item.name}</strong>
                  <br />
                  <span style={{ color: "#64748b", fontSize: "11px" }}>{item.role}</span>
                </div>
              ))}
            </div>

            {/* Knowledge Node */}
            <div style={{ background: "#ffffff", padding: "14px", borderRadius: "10px", border: "1px solid #cbd5e1" }}>
              <h4 style={{ margin: "0 0 8px 0", color: "#1E5040", fontSize: "13px" }}>📚 Research Assets ({selectedMission.knowledge.length})</h4>
              {selectedMission.knowledge.map((item) => (
                <div key={item.id} style={{ fontSize: "12px", color: "#334155", padding: "6px 0", borderBottom: "1px dashed #e2e8f0" }}>
                  <strong>{item.title}</strong>
                  <br />
                  <span style={{ color: "#64748b", fontSize: "11px" }}>{item.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline Engine (Phase 32) */}
          <div style={{ background: "#ffffff", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <h4 style={{ margin: "0 0 12px 0", color: "#1E5040", fontSize: "14px" }}>⏳ Mission Timeline Engine</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {selectedMission.activities.map((act) => (
                <div key={act.id} style={{ display: "flex", gap: "12px", alignItems: "center", fontSize: "12px" }}>
                  <span style={{ color: "#94a3b8", fontFamily: "monospace", minWidth: "140px" }}>
                    {new Date(act.timestamp).toLocaleDateString()} {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span style={{ color: "#0f172a" }}>{act.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
