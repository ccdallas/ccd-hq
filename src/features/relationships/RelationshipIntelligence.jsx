import { useState } from "react";
import ContactCard from "./ContactCard.jsx";
import { useSupabaseData } from "../../hooks/useSupabaseData.js";
import { contacts as fallbackContacts } from "../../data/contacts.js";

export default function RelationshipIntelligence() {
  const { data: contacts, addRecord } = useSupabaseData("contacts", fallbackContacts);
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [nextAction, setNextAction] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    await addRecord({
      name,
      organization,
      relationship_type: "Professional",
      next_action: nextAction || "Follow up",
      status: "Warm"
    });

    setName("");
    setOrganization("");
    setNextAction("");
  };

  return (
    <section>
      <span className="ccd-kicker">Relationship Intelligence</span>
      <h2>Professional Network Command Center</h2>

      <form onSubmit={handleSubmit} style={{ margin: "20px 0", padding: "16px", background: "white", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ margin: "0 0 12px 0", fontSize: "16px", color: "#1E5040" }}>Add Strategic Connection</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Contact Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ flex: 1, minWidth: "180px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
            required
          />
          <input
            type="text"
            placeholder="Organization / Specialty"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            style={{ flex: 1, minWidth: "180px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
          />
          <input
            type="text"
            placeholder="Next Action"
            value={nextAction}
            onChange={(e) => setNextAction(e.target.value)}
            style={{ flex: 1, minWidth: "180px", padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
          />
          <button type="submit" style={{ padding: "8px 18px", background: "#1E5040", color: "white", border: 0, borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
            Save Contact
          </button>
        </div>
      </form>

      <div className="contact-grid">
        {contacts.map((contact, idx) => (
          <ContactCard key={contact.id || idx} {...contact} />
        ))}
      </div>
    </section>
  );
}
