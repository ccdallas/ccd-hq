import { useState } from "react";
import ContentCard from "./ContentCard.jsx";

const initialContent = [
  {
    title: "Healthcare Cybersecurity Thought Leadership",
    type: "LinkedIn"
  },
  {
    title: "Patient-Side Threat Modeling Research",
    type: "Article"
  },
  {
    title: "Clinical AI Security Insights",
    type: "Speaking"
  }
];

export default function ContentStudio() {
  const [contentList, setContentList] = useState(initialContent);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("LinkedIn");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setContentList([{ title, type }, ...contentList]);
    setTitle("");
  };

  return (
    <section>
      <span className="ccd-kicker">Content Studio</span>
      <h2>Knowledge Distribution Engine</h2>

      <form onSubmit={handleSubmit} style={{ margin: "20px 0", padding: "16px", background: "white", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ margin: "0 0 12px 0", fontSize: "16px", color: "#1E5040" }}>Draft Content Idea</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Content Title or Topic"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ flex: 2, minWidth: "220px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
            required
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{ flex: 1, minWidth: "140px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
          >
            <option value="LinkedIn">LinkedIn</option>
            <option value="Article">Article</option>
            <option value="Speaking">Speaking / Panel</option>
            <option value="Research Paper">Research Paper</option>
          </select>
          <button type="submit" style={{ padding: "8px 18px", background: "#1E5040", color: "white", border: 0, borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
            Add Concept
          </button>
        </div>
      </form>

      <div className="content-grid">
        {contentList.map((item) => (
          <ContentCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
