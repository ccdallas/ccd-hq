export default function LabCard({ title, description }) {
  return (
    <article className="lab-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <span>Research Area</span>
    </article>
  );
}
