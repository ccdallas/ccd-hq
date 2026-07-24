export const conference = {
  id: "blackhat-2026",
  name: "Black Hat USA 2026 & DEF CON",
  location: "Las Vegas, NV",
  startDate: "2026-08-01",
  endDate: "2026-08-09",
  linkedMissionId: "mission-bh-2026",
  lodging: "Fontainebleau Las Vegas (Co-hosted with Cybersis)",
  sponsorshipSummary: {
    blackHatBriefingsPass: "$2,999 (Covered by Semperis - Featured Defender)",
    defconBadge: "$550 (Covered by WISP - Shift Lead)",
    lodgingSavings: "Fontainebleau Las Vegas (Covered with Cybersis)",
    totalSponsorshipValue: "$3,549+"
  },
  flightDetails: {
    airline: "United Airlines (via Priceline)",
    arrival: "2026-08-01 @ 1:50 PM PST (LAS)",
    originalReturn: "2026-08-08 (Targeting Extension to Aug 9/10)",
    status: "Priceline Flight Extension Pending"
  },
  medicalTravelRequirements: [
    "Portable Oxygen Concentrator (POC) - Check 150% battery capacity for LAS->ATL flight",
    "CPAP Machine (Medical Device - Exempt from Carry-on limits)",
    "Doctor-signed United Airlines Medical Clearance Form",
    "Call United Accessibility Desk (1-800-228-2744) to tag reservation"
  ],
  objectives: [
    "Attend & Present at Midnight in the War Room World Premiere by Semperis (Aug 5)",
    "Lead WISP Shift Lead duties at DEF CON booth (Aug 7-9 - $550 Badge Sponsored)",
    "Strengthen healthcare cybersecurity network & IoMT research",
    "Identify healthcare GRC & clinical AI consulting opportunities",
    "Support Biohacking Village & WiCyS community partners"
  ]
};

export const networkingTargets = [
  {
    id: "net-1",
    name: "Semperis Executive & Media Production Team",
    organization: "Semperis / Midnight in the War Room",
    priority: "Critical",
    objective: "Film premiere alignment, media interviews, and defender panel sync ($2,999 Pass Sponsor)",
    status: "Confirmed",
    followUp: true
  },
  {
    id: "net-2",
    name: "Healthcare CISOs & Risk Leads",
    organization: "Health Systems / HIMSS Network",
    priority: "Critical",
    objective: "Discuss clinical AI risk frameworks and medical device security assessments",
    status: "Pending Intro",
    followUp: false
  },
  {
    id: "net-3",
    name: "WISP / WiCyS Leadership",
    organization: "Women in Security and Privacy",
    priority: "Critical",
    objective: "Confirm Sunday Aug 9 shift lead coverage & $550 badge pickup",
    status: "Confirmed (Badge Covered)",
    followUp: true
  }
];

export const conferenceMeetings = [
  {
    id: "mtg-1",
    person: "Semperis Production Team & Featured Defenders",
    company: "Midnight in the War Room Premiere (Semperis)",
    location: "Black Hat USA Premier Hall",
    time: "2026-08-05 18:00",
    goal: "World Premiere & Defender Panel ($2,999 Pass Sponsor)",
    notes: "Official debut appearance as featured defender in Semperis documentary.",
    actionItems: "Review media talking points, sync with Semperis team, attend VIP reception.",
    status: "Confirmed"
  },
  {
    id: "mtg-2",
    person: "WISP Volunteer Team",
    company: "DEF CON WISP Booth",
    location: "DEF CON Expo Floor",
    time: "2026-08-07 to 2026-08-09",
    goal: "Shift Lead Oversight",
    notes: "Coordinate booth staffing, volunteer schedules, and badge coverage through Sunday Aug 9.",
    actionItems: "1. Call Priceline/United to extend flight. 2. Contact United Accessibility Desk for POC/CPAP tag.",
    status: "Action Required (Flight & Medical Flag)"
  }
];
