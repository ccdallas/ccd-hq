import ContentCard from "./ContentCard.jsx";

const content = [
  {
    title: "Healthcare Cybersecurity Thought Leadership",
    type: "LinkedIn"
  },
  {
    title: "Patient-Side Threat Modeling Research",
    type: "Article"
  },
  {
    title: "Clinical AI Security Insights",
    type: "Speaking"
  }
];

export default function ContentStudio() {
  return (
    <section>
      <span className="ccd-kicker">
        Content Studio
      </span>
      <h2>
        Knowledge Distribution Engine
      </h2>
      <div className="content-grid">
        {content.map((item) => (
          <ContentCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
