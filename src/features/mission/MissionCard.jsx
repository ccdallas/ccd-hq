export default function MissionCard({ title, status, priority }) {
  return (
    <article className="mission-card">
      <h3>{title}</h3>
      <div>
        <span>{status}</span>
        <span>{priority}</span>
      </div>
    </article>
  );
}
