export class MissionNode {
  constructor({
    id = `mission-${Date.now()}`,
    title = "",
    objective = "",
    status = "Active", // Active, Pending, Completed, Archived
    priority = "High", // Critical, High, Medium, Low
    patientImpact = "Critical", // Critical, High, Medium, Low
    owner = "Chaunda C. Dallas",
    dueDate = null,
    contacts = [],
    meetings = [],
    knowledge = [],
    opportunities = [],
    content = [],
    tasks = [],
    activities = []
  }) {
    this.id = id;
    this.title = title;
    this.objective = objective;
    this.status = status;
    this.priority = priority;
    this.patientImpact = patientImpact;
    this.owner = owner;
    this.dueDate = dueDate;
    this.contacts = contacts;
    this.meetings = meetings;
    this.knowledge = knowledge;
    this.opportunities = opportunities;
    this.content = content;
    this.tasks = tasks;
    this.activities = activities;
  }

  addActivity(description, type = "event") {
    this.activities.unshift({
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type,
      description
    });
  }
}

// Default Seed Missions with Patient Impact Mapping
export const SEED_MISSIONS = [
  new MissionNode({
    id: "mission-bh-2026",
    title: "Black Hat USA 2026 & DEF CON Operations",
    objective: "Execute featured documentary premiere for Midnight in the War Room, WISP shift lead duties, and IoMT security networking.",
    status: "Active",
    priority: "Critical",
    patientImpact: "Critical",
    dueDate: "2026-08-09",
    contacts: [
      { id: "c-1", name: "WISP / WiCyS Leadership", role: "DEF CON Coordination" },
      { id: "c-2", name: "Healthcare CISOs & HIMSS Network", role: "IoMT & GRC Leads" }
    ],
    meetings: [
      { id: "m-1", title: "Midnight in the War Room World Premiere", time: "2026-08-05 18:00", location: "Black Hat Hall" },
      { id: "m-2", title: "DEF CON WISP Booth Shift Lead", time: "2026-08-07 09:00", location: "DEF CON Expo Floor" }
    ],
    knowledge: [
      { id: "k-1", title: "Patient-Side Threat Modeling (PTSM) Framework", category: "Medical Devices" },
      { id: "k-2", title: "Clinical AI Risk Assessment Matrix", category: "Artificial Intelligence" }
    ],
    content: [
      { id: "cnt-1", title: "Behind the Scenes of Midnight in the War Room", type: "Speaking / Panel" }
    ],
    activities: [
      { id: "act-1", timestamp: "2026-07-23T11:00:00Z", type: "system", description: "Mission graph initialized with Patient Impact: Critical" },
      { id: "act-2", timestamp: "2026-07-22T16:30:00Z", type: "event", description: "Synchronized WISP Shift Lead schedules for DEF CON" }
    ]
  }),
  new MissionNode({
    id: "mission-ptsm-pub",
    title: "Patient-Side Threat Modeling (PTSM) Publication",
    objective: "Draft and distribute formal whitepaper on clinical IoMT vulnerability assessment methodologies.",
    status: "Active",
    priority: "High",
    patientImpact: "Critical",
    dueDate: "2026-09-15",
    knowledge: [
      { id: "k-1", title: "Patient-Side Threat Modeling (PTSM) Framework", category: "Medical Devices" }
    ],
    content: [
      { id: "cnt-2", title: "Patient-Side Threat Modeling Research Paper", type: "Article" }
    ],
    activities: [
      { id: "act-3", timestamp: "2026-07-20T14:15:00Z", type: "research", description: "Added medical device risk classification notes" }
    ]
  })
];
