export default function ContactCard({ name, organization, relationship, nextAction }) {
  return (
    <article className="contact-card">
      <h3>{name}</h3>
      <p>{organization}</p>
      <span>{relationship}</span>
      <p>Next: {nextAction}</p>
    </article>
  );
}
