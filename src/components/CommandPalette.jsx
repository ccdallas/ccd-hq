import React, { useState, useEffect } from "react";

export default function CommandPalette({ onSelectModule }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const actions = [
    { label: "🎯 Open Mission Graph & Impact", module: "mission-graph" },
    { label: "📍 Open Conference Command (Black Hat 2026)", module: "conference-command" },
    { label: "🤖 View AI Chief of Staff Briefing", module: "ai-chief" },
    { label: "📚 Open Knowledge Vault", module: "knowledge-vault" },
    { label: "🤝 Open Relationship Intelligence", module: "relationship-intelligence" },
    { label: "🔌 Open Integration Hub & Connectors", module: "integration-hub" }
  ].filter((a) => a.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(15, 23, 42, 0.6)",
      backdropFilter: "blur(4px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingTop: "100px",
      zIndex: 9999
    }}>
      <div style={{
        background: "var(--color-surface)",
        width: "100%",
        maxWidth: "580px",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-modal)",
        overflow: "hidden",
        border: "1px solid #cbd5e1"
      }}>
        <div style={{ padding: "16px", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "18px" }}>🔍</span>
          <input
            type="text"
            placeholder="Type a command or navigate... (ESC to exit)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: "100%", border: 0, outline: "none", fontSize: "16px", background: "transparent" }}
            autoFocus
          />
        </div>

        <div style={{ maxHeight: "300px", overflowY: "auto", padding: "8px" }}>
          {actions.length > 0 ? (
            actions.map((act, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelectModule(act.module);
                  setIsOpen(false);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 16px",
                  border: 0,
                  background: "transparent",
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "var(--color-text-main)"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {act.label}
              </button>
            ))
          ) : (
            <div style={{ padding: "16px", textAlign: "center", color: "var(--color-text-muted)", fontSize: "14px" }}>
              No matching commands found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
