export const CONNECTORS = [
  {
    id: "notion",
    name: "Notion",
    category: "Knowledge",
    description: "Sync research, PTSM documentation, and clinical AI findings.",
    status: "disconnected",
    syncInterval: "Manual"
  },
  {
    id: "github",
    name: "GitHub",
    category: "Development",
    description: "Pull commits, build health, and active repo metadata.",
    status: "disconnected",
    syncInterval: "15m"
  },
  {
    id: "calendar",
    name: "Calendar",
    category: "Scheduling",
    description: "Sync event schedules, Black Hat meetings, and travel blocks.",
    status: "planned",
    syncInterval: "Real-time"
  },
  {
    id: "email",
    name: "Email",
    category: "Communications",
    description: "Connect connect@chaundacdallas.com for RSVP event parsing.",
    status: "planned",
    syncInterval: "5m"
  }
];
