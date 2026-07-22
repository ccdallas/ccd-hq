import KnowledgeCard from "./KnowledgeCard.jsx";

const knowledge = [
  {
    title: "Patient-Side Threat Modeling",
    category: "Healthcare Security"
  },
  {
    title: "Clinical AI Security",
    category: "Artificial Intelligence"
  },
  {
    title: "IoMT Risk Assessment",
    category: "Medical Devices"
  }
];

export default function KnowledgeVault() {
  return (
    <section>
      <span className="ccd-kicker">
        Knowledge Vault
      </span>
      <h2>
        Healthcare Cybersecurity Intelligence Library
      </h2>
      <div className="knowledge-grid">
        {knowledge.map((item) => (
          <KnowledgeCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
