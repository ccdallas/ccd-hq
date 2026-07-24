import React from "react";
import { CCD_SDK } from "../../sdk/index.js";

export default function PlatformObservability() {
  const timeline = CCD_SDK.getTimeline();

  return (
    <section>
      <span className="ccd-kicker">Platform Control</span>
      <h2>System Operations & Event Bus Logs</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        <div style={{ background: "white", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <span style={{ fontSize: "12px", color: "#64748b" }}>Event Bus Stream</span>
          <h3 style={{ margin: "4px 0 0 0", fontSize: "20px", color: "var(--color-primary)" }}>{timeline.length} Events Logged</h3>
        </div>
        <div style={{ background: "white", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <span style={{ fontSize: "12px", color: "#64748b" }}>Supabase Cloud DB</span>
          <h3 style={{ margin: "4px 0 0 0", fontSize: "20px", color: "#166534" }}>Connected & Synced</h3>
        </div>
        <div style={{ background: "white", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <span style={{ fontSize: "12px", color: "#64748b" }}>SDK Core Engine</span>
          <h3 style={{ margin: "4px 0 0 0", fontSize: "20px", color: "var(--color-accent)" }}>v1.0.0 Active</h3>
        </div>
      </div>

      <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "15px", color: "var(--color-primary)" }}>Real-Time System Event Log</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontFamily: "monospace", fontSize: "12px" }}>
          {timeline.length > 0 ? (
            timeline.map((evt) => (
              <div key={evt.id} style={{ padding: "8px 12px", background: "#f8fafc", borderRadius: "6px", borderLeft: "3px solid var(--color-primary)", display: "flex", justifyContent: "space-between" }}>
                <span><strong>[{evt.type}]</strong> {JSON.stringify(evt.payload)}</span>
                <span style={{ color: "#94a3b8" }}>{new Date(evt.timestamp).toLocaleTimeString()}</span>
              </div>
            ))
          ) : (
            <div style={{ color: "#94a3b8" }}>No active events recorded in current session.</div>
          )}
        </div>
      </div>
    </section>
  );
}
