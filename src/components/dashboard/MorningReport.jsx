import React from "react";
import { CCD_SDK } from "../../sdk/index.js";

export default function MorningReport() {
  const briefing = CCD_SDK.generateExecutiveBriefing();

  return (
    <div style={{
      background: "linear-gradient(135deg, #1E5040 0%, #14372C 100%)",
      color: "#FFFFFF",
      padding: "24px",
      borderRadius: "16px",
      boxShadow: "0 10px 25px -5px rgba(30, 80, 64, 0.4)",
      border: "1px solid rgba(224, 168, 62, 0.3)",
      marginBottom: "24px"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div>
          <span style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#E0A83E", fontWeight: "bold" }}>
            Executive Morning Report
          </span>
          <h2 style={{ margin: "4px 0 0 0", fontFamily: "Playfair Display, serif", fontSize: "24px", color: "#F3ECDD" }}>
            Good Morning, Chaunda.
          </h2>
        </div>
        <div style={{ textAlign: "right", background: "rgba(0,0,0,0.2)", padding: "10px 16px", borderRadius: "12px", border: "1px solid rgba(224, 168, 62, 0.2)" }}>
          <span style={{ fontSize: "11px", color: "#94a3b8", display: "block" }}>Mission Health</span>
          <strong style={{ fontSize: "20px", color: "#E0A83E" }}>{briefing.missionHealth}%</strong>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", background: "rgba(0,0,0,0.15)", padding: "16px", borderRadius: "12px" }}>
        <div>
          <h4 style={{ margin: "0 0 8px 0", color: "#E0A83E", fontSize: "13px" }}>🎯 Today's Strategic Priorities</h4>
          <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", color: "#e2e8f0" }}>
            {briefing.priorities.map((item, idx) => (
              <li key={idx} style={{ marginBottom: "6px" }}>{item}</li>
            ))}
          </ul>
        </div>
        <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: "16px" }}>
          <h4 style={{ margin: "0 0 8px 0", color: "#E0A83E", fontSize: "13px" }}>🤖 Chief Recommendation</h4>
          <p style={{ margin: 0, fontSize: "13px", color: "#F3ECDD", lineHeight: 1.5 }}>
            "{briefing.recommendation}"
          </p>
        </div>
      </div>
    </div>
  );
}
