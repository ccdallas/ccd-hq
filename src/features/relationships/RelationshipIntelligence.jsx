import ContactCard from "./ContactCard.jsx";
import { getContacts } from "./relationshipService.js";

export default function RelationshipIntelligence() {
  const contacts = getContacts();

  return (
    <section>
      <span className="ccd-kicker">
        Relationship Intelligence
      </span>
      <h2>
        Professional Network Command Center
      </h2>
      <div className="contact-grid">
        {contacts.map((contact) => (
          <ContactCard key={contact.id} {...contact} />
        ))}
      </div>
    </section>
  );
}
