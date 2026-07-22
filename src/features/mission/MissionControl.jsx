import { useState } from "react";
import MissionCard from "./MissionCard.jsx";
import { useSupabaseData } from "../../hooks/useSupabaseData.js";
import { missions as fallbackMissions } from "../../data/missions.js";

export default function MissionControl() {
  const { data: missions, addRecord } = useSupabaseData("missions", fallbackMissions);
  const [title, setTitle] = useState("");
  const [objective, setObjective] = useState("");
  const [priority, setPriority] = useState("High");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await addRecord({
      title,
      objective,
      priority,
      status: "Active",
      next_action: "Initiate mission tasks"
    });

    setTitle("");
    setObjective("");
  };

  return (
    <section>
      <span className="ccd-kicker">Mission Control</span>
      <h2>Strategic Operations Center</h2>

      <form onSubmit={handleSubmit} style={{ margin: "20px 0", padding: "16px", background: "white", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ margin: "0 0 12px 0", fontSize: "16px", color: "#1E5040" }}>Log New Mission</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Mission Title (e.g. PTSM Publication)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ flex: 1, minWidth: "200px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
            required
          />
          <input
            type="text"
            placeholder="Strategic Objective"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            style={{ flex: 1, minWidth: "200px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
          >
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
          </select>
          <button type="submit" style={{ padding: "8px 18px", background: "#1E5040", color: "white", border: 0, borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
            Add Mission
          </button>
        </div>
      </form>

      <div className="mission-grid">
        {missions.map((mission, idx) => (
          <MissionCard key={mission.id || idx} {...mission} />
        ))}
      </div>
    </section>
  );
}
