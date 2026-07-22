import { useState } from "react";
import KnowledgeCard from "./KnowledgeCard.jsx";
import { useSupabaseData } from "../../hooks/useSupabaseData.js";
import { knowledgeAssets as fallbackKnowledge } from "./knowledgeData.js";

export default function KnowledgeVault() {
  const { data: knowledge, addRecord } = useSupabaseData("knowledge", fallbackKnowledge);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Healthcare Security");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await addRecord({
      title,
      category,
      status: "Active",
      content: "Captured via CCD-HQ Command Center"
    });

    setTitle("");
  };

  return (
    <section className="command-card">
      <span className="ccd-kicker">Knowledge Vault</span>
      <h2 style={{ fontSize: "24px", margin: "8px 0 16px 0" }}>
        Healthcare Cybersecurity Intelligence Library
      </h2>

      <form onSubmit={handleSubmit} style={{ margin: "0 0 20px 0", padding: "14px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#1E5040" }}>Capture Research Asset</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Topic or Article Title (e.g. Patient-Side Threat Modeling)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ flex: 2, minWidth: "220px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ flex: 1, minWidth: "160px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
          >
            <option value="Healthcare Security">Healthcare Security</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Medical Devices">Medical Devices</option>
            <option value="Emerging Research">Emerging Research</option>
          </select>
          <button type="submit" style={{ padding: "8px 18px", background: "#1E5040", color: "white", border: 0, borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
            Save Asset
          </button>
        </div>
      </form>

      <div className="knowledge-grid">
        {knowledge.map((item, idx) => (
          <KnowledgeCard key={item.id || item.title || idx} {...item} />
        ))}
      </div>
    </section>
  );
}
