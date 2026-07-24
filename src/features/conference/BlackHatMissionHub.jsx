import React, { useState } from "react";
import { WorkflowEngine } from "../../intelligence/WorkflowEngine.js";
import { IngestionEngine } from "../../intelligence/IngestionEngine.js";

export default function BlackHatMissionHub() {
  const workflow = WorkflowEngine.getMissionWorkflow("mission-bh-2026");
  const [ingestText, setIngestText] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  const handleIngest = async (e) => {
    e.preventDefault();
    if (!ingestText.trim()) return;

    const res = await IngestionEngine.ingest({
      sourceName: "Black Hat Raw Notes / Transcript",
      sourceType: "transcript",
      rawContent: ingestText,
      patientImpact: "Critical",
      missionId: "mission-bh-2026"
    });

    setStatusMsg(res.summary);
    setIngestText("");
  };

  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <span className="ccd-kicker">User Story #001</span>
          <h2 style={{ margin: "4px 0" }}>Black Hat 2026 Mission Command</h2>
          <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
            Las Vegas, NV | August 1–9, 2026 | Mission: Midnight in the War Room Premiere & WISP Lead
          </p>
        </div>
        <span style={{ padding: "6px 12px", background: "var(--color-primary)", color: "var(--color-accent)", borderRadius: "8px", fontWeight: "bold", fontSize: "12px" }}>
          Workflow Active
        </span>
      </div>

      {/* Executable Workflow Phases */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px", marginBottom: "24px" }}>
        {workflow.phases.map((p) => (
          <div key={p.id} style={{ background: "white", padding: "16px", borderRadius: "12px", border: p.status === "Active" ? "2px solid var(--color-primary)" : "1px solid #cbd5e1" }}>
            <span style={{ fontSize: "10px", padding: "2px 6px", borderRadius: "4px", background: p.status === "Active" ? "#fef3c7" : "#f1f5f9", fontWeight: "bold", color: p.status === "Active" ? "#92400e" : "#64748b" }}>
              {p.status}
            </span>
            <h4 style={{ margin: "8px 0 6px 0", fontSize: "14px", color: "var(--color-primary)" }}>{p.title}</h4>
            <ul style={{ margin: 0, paddingLeft: "16px", fontSize: "12px", color: "#475569" }}>
              {p.tasks.map((t, idx) => (
                <li key={idx} style={{ marginBottom: "4px" }}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* In-Conference Rapid Note Ingestion */}
      <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "var(--shadow-card)" }}>
        <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", color: "var(--color-primary)" }}>📥 Rapid Conference Intelligence Ingestion</h3>
        <p style={{ margin: "0 0 14px 0", fontSize: "13px", color: "#64748b" }}>
          Paste raw transcripts, session notes, or business card details to link directly to this mission.
        </p>
        <form onSubmit={handleIngest} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <textarea
            rows={3}
            placeholder="Met with CISO at Biohacking Village regarding clinical AI risk mitigation..."
            value={ingestText}
            onChange={(e) => setIngestText(e.target.value)}
            style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: "#166534", fontWeight: "bold" }}>{statusMsg}</span>
            <button
              type="submit"
              style={{ padding: "8px 16px", background: "var(--color-primary)", color: "white", border: 0, borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
            >
              Ingest to Memory Graph
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
