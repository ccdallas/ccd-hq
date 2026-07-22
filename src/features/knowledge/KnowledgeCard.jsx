export default function KnowledgeCard({ title, category, status }) {
  return (
    <div style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "8px", marginBottom: "8px" }}>
      <h3 style={{ fontSize: "15px", color: "#1E5040", margin: "0 0 2px 0" }}>{title}</h3>
      <p style={{ fontSize: "12px", color: "#4a5568", margin: 0 }}>{category}</p>
      <span style={{ fontSize: "11px", color: "#E0A83E", fontWeight: "bold" }}>{status}</span>
    </div>
  );
}
