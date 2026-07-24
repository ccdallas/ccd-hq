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
    originalReturn: "2026-08-08 (Extension to Aug 9/10 required for 11 AM Sunday shift)",
    status: "Flight Change Pending"
  },
  medicalTravelRequirements: [
    "Portable Oxygen Concentrator (POC) - Check 150% battery capacity for LAS->ATL flight",
    "CPAP Machine (Medical Device - Exempt from Carry-on limits)",
    "Doctor-signed United Airlines Medical Clearance Form",
    "Call United Accessibility Desk (1-800-228-2744) to tag reservation"
  ],
  keyMilestones: [
    { date: "2026-08-05", event: "Midnight in the War Room World Premiere", location: "Oceanside A", time: "5:30 PM - 8:10 PM" },
    { date: "2026-08-06", event: "DEF CON Badge Pickup", location: "Mandalay Bay Ballroom Foyer Level 2", time: "7:00 AM - 4:00 PM" },
    { date: "2026-08-06", event: "Semperis Booth Swag Signing", location: "Semperis Booth", time: "1:00 PM - 2:00 PM" }
  ]
};

export const wispShiftSchedule = [
  { date: "2026-08-07", location: "Vendor Booth", time: "12:00 PM - 2:00 PM", role: "Shift Lead" },
  { date: "2026-08-07", location: "Community Center", time: "4:00 PM - 6:00 PM", role: "Shift Lead" },
  { date: "2026-08-08", location: "Community Space", time: "12:00 PM - 2:00 PM", role: "Shift Lead" },
  { date: "2026-08-08", location: "Vendor Booth", time: "4:00 PM - 6:00 PM", role: "Shift Lead" },
  { date: "2026-08-09", location: "Community Space", time: "11:00 AM - 12:00 PM", role: "Shift Lead" }
];

export const conferenceMeetings = [
  {
    id: "mtg-1",
    person: "Semperis Production Team & Featured Defenders",
    company: "Midnight in the War Room Premiere (Semperis)",
    location: "Oceanside A (Mandalay Bay)",
    time: "2026-08-05 17:30",
    goal: "VIP Reception (5:30 PM), Red Carpet (5:45 PM), Screening (6:30 PM)",
    notes: "Featured defender appearance. General public admitted at 6:15 PM.",
    status: "Confirmed"
  },
  {
    id: "mtg-2",
    person: "Semperis Booth Team",
    company: "Semperis Swag Signing",
    location: "Semperis Booth (Black Hat Expo)",
    time: "2026-08-06 13:00 - 14:00",
    goal: "Featured Defender Swag Signing",
    notes: "1:00 PM - 2:00 PM session.",
    status: "Confirmed"
  },
  {
    id: "mtg-3",
    person: "WISP Operations Team",
    company: "DEF CON WISP Booth & Community Space",
    location: "DEF CON Expo Floor / Community Space",
    time: "2026-08-07 to 2026-08-09",
    goal: "WISP Shift Lead Duties (5 shifts total)",
    notes: "Requires extension of United flight to Aug 9 evening or Aug 10.",
    status: "Confirmed (Flight Change Needed)"
  }
];
