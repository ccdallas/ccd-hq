export function generateExecutiveBriefing({ missions = [], contacts = [], knowledge = [], user = "Chaunda" }) {
  // 1. Identify critical missions
  const activeMissions = missions.filter((m) => m.status === "Active" || m.priority === "Critical" || m.priority === "High");
  const topMission = activeMissions[0] || { title: "CCD-HQ Platform Expansion", objective: "Build healthcare cybersecurity OS" };

  // 2. Identify relationship follow-ups
  const pendingContacts = contacts.filter((c) => c.status === "Follow-up needed" || c.status === "Warm");
  const targetContact = pendingContacts[0] || { name: "Healthcare Cybersecurity Leaders", next_action: "Engage post-conference" };

  // 3. Identify knowledge focus
  const recentResearch = knowledge[0] || { title: "Patient-Side Threat Modeling (PTSM)", category: "Research" };

  return {
    greeting: `Good Morning, ${user}.`,
    headline: `Focusing today on: "${topMission.title}"`,
    recommendations: [
      `🎯 Primary Objective: ${topMission.objective || "Advance key strategic deliverables."}`,
      `🤝 Priority Relationship: ${targetContact.name} — Action: "${targetContact.next_action || targetContact.nextAction || "Initiate outreach"}"`,
      `📚 Knowledge Anchor: Synthesize insights on ${recentResearch.title}`
    ]
  };
}
