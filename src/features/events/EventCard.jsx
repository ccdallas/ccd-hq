export default function EventCard({ name, location, status, objective }) {
  return (
    <article className="event-card">
      <h3>{name}</h3>
      <p>{location}</p>
      <span>{status}</span>
      <p>{objective}</p>
    </article>
  );
}
