export const AI_SKILLS = {
  CLINICAL_CYBER_ADVISOR: {
    id: "clinical-cyber",
    name: "Clinical AI & IoMT Risk Advisor",
    focus: "Medical device vulnerabilities, HIPAA compliance, Patient-Side Threat Modeling (PTSM)",
    evaluateRisk: (context) => "Patient Impact evaluated as CRITICAL. Recommend prioritizing IoMT threat assessment."
  },
  CONFERENCE_STRATEGIST: {
    id: "conference-strategist",
    name: "Conference & Media Strategist",
    focus: "Black Hat, DEF CON, documentary premiere logistics, and WISP shift lead coordination",
    evaluateRisk: (context) => "Black Hat 2026 premiere and DEF CON shift lead preparation on schedule."
  },
  RELATIONSHIP_ADVISOR: {
    id: "relationship-advisor",
    name: "Executive Network Advisor",
    focus: "HIMSS, WiCyS mentorship, and healthcare CISO outreach velocity",
    evaluateRisk: (context) => "3 conference leads require follow-up within 48 hours."
  }
};
