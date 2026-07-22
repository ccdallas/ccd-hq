export default function ModuleCard({ name, description, status }) {
  return (
    <article className="ccd-module-card">
      <h3>{name}</h3>
      <p>{description}</p>
      <span>{status}</span>
    </article>
  );
}
