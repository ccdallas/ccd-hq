import React from "react";
import { conference, wispShiftSchedule, conferenceMeetings } from "./conferenceData.js";
import NetworkingCircuit from "../calendar/NetworkingCircuit.jsx";

export default function BlackHatMissionHub() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Header Badge */}
      <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #cbd5e1", boxShadow: "var(--shadow-card)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <span className="ccd-kicker">Featured Defender & WISP Shift Lead</span>
            <h2 style={{ margin: "4px 0", color: "var(--color-primary)" }}>{conference.name}</h2>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
              📍 {conference.location} | 🏨 {conference.lodging}
            </p>
          </div>
          <span style={{ padding: "6px 12px", background: "#1E5040", color: "#E0A83E", borderRadius: "8px", fontWeight: "bold", fontSize: "12px" }}>
            Total Sponsorship: {conference.sponsorshipSummary.totalSponsorshipValue}
          </span>
        </div>
      </div>

      {/* 15-Minute Rapid Hop Engine Component */}
      <NetworkingCircuit />

      {/* Conference Meetings & WISP Shifts */}
      <div style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ margin: "0 0 12px 0", fontSize: "16px", color: "var(--color-primary)" }}>📅 Confirmed WISP Shift Lead Schedule</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {wispShiftSchedule.map((shift, idx) => (
            <div key={idx} style={{ padding: "10px", background: "#f8fafc", borderRadius: "6px", display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
              <div>
                <strong>{shift.date}</strong> — {shift.location} ({shift.role})
              </div>
              <span style={{ fontWeight: "bold", color: "#166534" }}>{shift.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
