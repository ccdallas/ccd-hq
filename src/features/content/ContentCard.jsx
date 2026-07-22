export default function ContentCard({ title, type }) {
  return (
    <article className="content-card">
      <h3>{title}</h3>
      <span>{type}</span>
    </article>
  );
}
