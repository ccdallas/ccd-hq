import { knowledgeAssets } from "./knowledgeData.js";
import KnowledgeCard from "./KnowledgeCard.jsx";

export default function KnowledgeVault() {
  return (
    <section className="command-card">
      <h2>Knowledge Vault</h2>
      <div style={{ marginTop: "12px" }}>
        {knowledgeAssets.map((asset) => (
          <KnowledgeCard key={asset.title} {...asset} />
        ))}
      </div>
    </section>
  );
}
