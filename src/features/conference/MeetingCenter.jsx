import React from "react";

export default function MeetingCenter({ meetings }) {
  return (
    <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
      <h3 style={{ margin: "0 0 16px 0", color: "#1E5040", fontSize: "16px" }}>Meeting Center & Strategy Records</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {meetings.map((m) => (
          <div key={m.id} style={{ padding: "14px", borderRadius: "8px", background: "#f8fafc", borderLeft: "4px solid #1E5040" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <strong style={{ color: "#0f172a", fontSize: "14px" }}>{m.goal}</strong>
              <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "4px", background: "#dcfce7", color: "#166534", fontWeight: "bold" }}>
                {m.status}
              </span>
            </div>
            <p style={{ margin: "0 0 4px 0", fontSize: "13px", color: "#475569" }}>
              📍 <strong>{m.company}</strong> — {m.location} ({m.time})
            </p>
            <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>
              <strong>Action Item:</strong> {m.actionItems}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
