export const conference = {
  id: "blackhat-2026",
  name: "Black Hat USA 2026 & DEF CON",
  location: "Las Vegas, NV",
  startDate: "2026-08-01",
  endDate: "2026-08-09",
  linkedMissionId: "mission-bh-2026",
  objectives: [
    "Attend Midnight in the War Room World Premiere (Aug 5)",
    "Lead WISP Shift Lead duties at DEF CON booth (Aug 7-9)",
    "Strengthen healthcare cybersecurity network & IoMT research",
    "Identify healthcare GRC & clinical AI consulting opportunities",
    "Support Biohacking Village & WiCyS community partners"
  ]
};

export const networkingTargets = [
  {
    id: "net-1",
    name: "Healthcare CISOs & Risk Leads",
    organization: "Health Systems / HIMSS Network",
    priority: "Critical",
    objective: "Discuss clinical AI risk frameworks and medical device security assessments",
    status: "Pending Intro",
    followUp: false
  },
  {
    id: "net-2",
    name: "WISP / WiCyS Leadership",
    organization: "Women in Security and Privacy",
    priority: "High",
    objective: "Align shift lead coordination and mentorship initiatives",
    status: "Confirmed",
    followUp: false
  }
];

export const conferenceMeetings = [
  {
    id: "mtg-1",
    person: "Documentary Production & Defender Team",
    company: "Midnight in the War Room Premiere",
    location: "Black Hat USA Premier Hall",
    time: "2026-08-05 18:00",
    goal: "World Premiere & Defender Panel",
    notes: "Official debut appearance as featured defender.",
    actionItems: "Review media talking points and sync with production team.",
    status: "Confirmed"
  },
  {
    id: "mtg-2",
    person: "WISP Volunteer Team",
    company: "DEF CON WISP Booth",
    location: "DEF CON Expo Floor",
    time: "2026-08-07 09:00",
    goal: "Shift Lead Oversight",
    notes: "Coordinate booth staffing and volunteer schedules.",
    actionItems: "Confirm shift lead roster and badge handoffs.",
    status: "Confirmed"
  }
];
