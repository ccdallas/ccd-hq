import React, { createContext, useContext, useState } from "react";

export const WORKSPACES = [
  {
    id: "ccd-hq",
    name: "Chaunda C. Dallas HQ",
    type: "executive",
    description: "Primary Executive Command Center & Strategy OS",
    activeMission: "mission-bh-2026",
    theme: "emerald"
  },
  {
    id: "healthcare-cyber-lab",
    name: "Healthcare Cyber Lab",
    type: "research",
    description: "IoMT Risk Assessments, PTSM Framework, & Medical Device Security",
    activeMission: "mission-ptsm-pub",
    theme: "cobalt"
  },
  {
    id: "black-hat-2026",
    name: "Black Hat 2026 & DEF CON",
    type: "conference",
    description: "Documentary Premiere, WISP Booth Lead, & Executive Networking",
    activeMission: "mission-bh-2026",
    theme: "amber"
  }
];

const WorkspaceContext = createContext();

export function WorkspaceProvider({ children }) {
  const [activeWorkspace, setActiveWorkspace] = useState(WORKSPACES[0]);

  const switchWorkspace = (workspaceId) => {
    const found = WORKSPACES.find((w) => w.id === workspaceId);
    if (found) {
      setActiveWorkspace(found);
    }
  };

  return (
    <WorkspaceContext.Provider value={{ activeWorkspace, switchWorkspace, workspaces: WORKSPACES }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export const useWorkspace = () => useContext(WorkspaceContext);
