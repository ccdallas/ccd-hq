import React from "react";
import { conference, networkingTargets, conferenceMeetings } from "./conferenceData.js";
import MeetingCenter from "./MeetingCenter.jsx";
import NetworkingQueue from "./NetworkingQueue.jsx";

export default function ConferenceDashboard() {
  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <span className="ccd-kicker">Conference Command™</span>
          <h2 style={{ margin: "4px 0" }}>{conference.name}</h2>
          <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>
            📍 {conference.location} | 🗓️ {conference.startDate} – {conference.endDate}
          </p>
        </div>
        <span style={{ padding: "6px 12px", background: "#1E5040", color: "#E0A83E", borderRadius: "8px", fontWeight: "bold", fontSize: "12px" }}>
          Mission Object Attached: {conference.linkedMissionId}
        </span>
      </div>

      {/* Strategic Objectives */}
      <div style={{ background: "#1E5040", color: "white", padding: "16px", borderRadius: "12px", marginBottom: "24px" }}>
        <h3 style={{ margin: "0 0 10px 0", fontSize: "15px", color: "#E0A83E" }}>Strategic Objectives</h3>
        <ul style={{ margin: 0, paddingLeft: "20px", fontSize: "13px" }}>
          {conference.objectives.map((obj, idx) => (
            <li key={idx} style={{ marginBottom: "4px" }}>{obj}</li>
          ))}
        </ul>
      </div>

      {/* Grid Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "20px" }}>
        <MeetingCenter meetings={conferenceMeetings} />
        <NetworkingQueue targets={networkingTargets} />
      </div>
    </section>
  );
}
