import React from "react";
import { useWorkspace } from "./WorkspaceContext.jsx";

export default function WorkspaceSwitcher() {
  const { activeWorkspace, switchWorkspace, workspaces } = useWorkspace();

  return (
    <div style={{ padding: "0 8px 12px 8px", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: "12px" }}>
      <span style={{ fontSize: "10px", color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: "bold" }}>
        Active Workspace Context
      </span>
      <select
        value={activeWorkspace.id}
        onChange={(e) => switchWorkspace(e.target.value)}
        style={{
          width: "100%",
          marginTop: "4px",
          padding: "6px 10px",
          borderRadius: "var(--radius-sm)",
          background: "rgba(0,0,0,0.25)",
          color: "#ffffff",
          border: "1px solid rgba(224, 168, 62, 0.4)",
          fontSize: "12px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        {workspaces.map((w) => (
          <option key={w.id} value={w.id} style={{ background: "#1E5040", color: "#ffffff" }}>
            {w.name}
          </option>
        ))}
      </select>
    </div>
  );
}
