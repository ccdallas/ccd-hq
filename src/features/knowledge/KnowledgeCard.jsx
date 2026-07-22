export default function KnowledgeCard({ title, category }) {
  return (
    <article className="knowledge-card">
      <h3>{title}</h3>
      <span>{category}</span>
    </article>
  );
}
