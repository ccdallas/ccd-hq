export default function MissionTask({ mission, task, status }) {
  return (
    <article className="lab-card">
      <h3>{mission}</h3>
      <p>{task}</p>
      <span>{status}</span>
    </article>
  );
}
