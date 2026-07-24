import React, { useState } from "react";
import { CCD_SDK } from "../../sdk/index.js";

export default function NetworkingCircuit() {
  const [quickNotes, setQuickNotes] = useState({});

  const handleLogDropIn = (eventId, eventTitle) => {
    const note = quickNotes[eventId] || "Dropped by for 15-min circuit chat.";
    
    // Capture rapid contact/event drop-in directly into Universal Node Graph
    CCD_SDK.createNode({
      type: "contact",
      title: `[Circuit Stop] ${eventTitle}`,
      patientImpact: "Medium",
      metadata: {
        note,
        loggedAt: new Date().toISOString(),
        strategy: "15-Minute Drop-In"
      }
    });

    setQuickNotes((prev) => ({ ...prev, [eventId]: "✓ Logged to Node Graph!" }));
  };

  return (
    <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #cbd5e1", boxShadow: "var(--shadow-card)", marginTop: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <div>
          <span className="ccd-kicker">Black Hat & DEF CON Circuit</span>
          <h3 style={{ margin: "2px 0", fontSize: "16px", color: "var(--color-primary)" }}>⚡ 15-Minute Networking Hop Engine</h3>
        </div>
        <span style={{ fontSize: "11px", background: "#fef3c7", color: "#92400e", padding: "4px 8px", borderRadius: "6px", fontWeight: "bold" }}>
          Overlap Mode: Active
        </span>
      </div>

      <p style={{ fontSize: "13px", color: "#475569", margin: "0 0 14px 0" }}>
        Handling 15+ overlapping daily receptions, VIP happy hours, and wargame sessions. Tap <strong>Log Drop-In</strong> to instantly record a quick contact or takeaway before moving to the next room!
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {[
          { id: "cir-1", name: "WWT VIP Happy Hour", location: "Mandalay Bay Suite", window: "4:00 PM - 7:00 PM" },
          { id: "cir-2", name: "AI Wargame & Biohacking Briefing", location: "Oceanside Foyer", window: "4:30 PM - 6:00 PM" },
          { id: "cir-3", name: "Semperis Defender VIP Meet & Greet", location: "Oceanside A", time: "5:30 PM - 6:15 PM" }
        ].map((item) => (
          <div key={item.id} style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px", borderLeft: "4px solid var(--color-accent)", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong style={{ fontSize: "13px", color: "var(--color-primary)" }}>{item.name}</strong>
                <span style={{ fontSize: "11px", color: "#64748b", marginLeft: "8px" }}>📍 {item.location} ({item.window || item.time})</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                placeholder="Met CISO, exchanged QR code, discussed clinical AI..."
                value={quickNotes[item.id] || ""}
                onChange={(e) => setQuickNotes({ ...quickNotes, [item.id]: e.target.value })}
                style={{ flex: 1, padding: "6px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "12px" }}
              />
              <button
                type="button"
                onClick={() => handleLogDropIn(item.id, item.name)}
                style={{ padding: "6px 12px", background: "var(--color-primary)", color: "white", border: 0, borderRadius: "6px", fontWeight: "bold", fontSize: "12px", cursor: "pointer" }}
              >
                Log 15-Min Hop
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
