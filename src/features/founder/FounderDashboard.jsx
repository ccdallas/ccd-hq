import React, { useState } from "react";
import { DecisionEngine } from "../../intelligence/DecisionEngine.js";

export default function FounderDashboard() {
  const decision = DecisionEngine.evaluateMission("mission-bh-2026");
  const [frictions, setFrictions] = useState([
    { id: "f-1", appReachedFor: "Apple Notes", reason: "Quick dictation on phone during travel prep", resolution: "Use Quick Capture ('N') modal" }
  ]);
  const [app, setApp] = useState("");
  const [reason, setReason] = useState("");

  const handleLogFriction = (e) => {
    e.preventDefault();
    if (!app || !reason) return;
    setFrictions([...frictions, { id: `f-${Date.now()}`, appReachedFor: app, reason, resolution: "Backlog Item" }]);
    setApp("");
    setReason("");
  };

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <span className="ccd-kicker">Operation Black Hat</span>
          <h2 style={{ margin: "4px 0" }}>Founder Dashboard & Hardening</h2>
        </div>
        <span style={{ padding: "6px 12px", background: "#1E5040", color: "#E0A83E", borderRadius: "8px", fontWeight: "bold", fontSize: "12px" }}>
          Target: v1.0 Personal
        </span>
      </div>

      {/* Grounded Decision Engine Card */}
      <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #cbd5e1", boxShadow: "var(--shadow-card)", marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
          <div>
            <span style={{ fontSize: "11px", color: "var(--color-primary)", fontWeight: "bold", textTransform: "uppercase" }}>
              Grounded Decision Engine Output
            </span>
            <h3 style={{ margin: "4px 0", fontSize: "18px", color: "var(--color-text-main)" }}>
              {decision.recommendation}
            </h3>
          </div>
          <span style={{ padding: "4px 10px", background: "#dcfce7", color: "#166534", borderRadius: "6px", fontWeight: "bold", fontSize: "12px" }}>
            Confidence: {decision.confidence}%
          </span>
        </div>
        <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px" }}>
          <strong style={{ fontSize: "12px", color: "#475569", display: "block", marginBottom: "6px" }}>Evidence Rationale:</strong>
          <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "12px", color: "#334155" }}>
            {decision.evidence.map((item, idx) => (
              <li key={idx} style={{ marginBottom: "4px" }}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Platform Friction Log ("Why did I leave CCD-HQ?") */}
      <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", color: "var(--color-primary)" }}>⚠️ Platform Friction Log</h3>
        <p style={{ margin: "0 0 14px 0", fontSize: "13px", color: "#64748b" }}>
          Every time you reach for Apple Notes, a spreadsheet, or another app, log it here to turn friction into product improvements.
        </p>

        <form onSubmit={handleLogFriction} style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
          <input
            type="text"
            placeholder="App reached for (e.g., Apple Notes)"
            value={app}
            onChange={(e) => setApp(e.target.value)}
            style={{ flex: 1, padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px" }}
          />
          <input
            type="text"
            placeholder="Why did you leave CCD-HQ?"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            style={{ flex: 2, padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px" }}
          />
          <button
            type="submit"
            style={{ padding: "8px 16px", background: "var(--color-primary)", color: "white", border: 0, borderRadius: "6px", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}
          >
            Log Friction
          </button>
        </form>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {frictions.map((f) => (
            <div key={f.id} style={{ padding: "10px", background: "#f8fafc", borderRadius: "6px", borderLeft: "3px solid var(--color-accent)", fontSize: "12px" }}>
              <strong>Reached for {f.appReachedFor}:</strong> {f.reason}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
