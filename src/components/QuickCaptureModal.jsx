import React, { useState, useEffect } from "react";
import { CCD_SDK } from "../sdk/index.js";

export default function QuickCaptureModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("research");
  const [title, setTitle] = useState("");
  const [patientImpact, setPatientImpact] = useState("High");

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle modal with 'N' (when not focused in inputs) or 'Ctrl+Shift+Space'
      if (
        (e.key === "n" || e.key === "N") &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)
      ) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.ctrlKey && e.shiftKey && e.code === "Space") {
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

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Capture using SDK and emit to Universal Node Graph
    CCD_SDK.createNode({
      type,
      title,
      patientImpact,
      metadata: { capturedAt: new Date().toISOString() }
    });

    setTitle("");
    setIsOpen(false);
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(15, 23, 42, 0.65)",
      backdropFilter: "blur(4px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10000
    }}>
      <div style={{
        background: "var(--color-surface)",
        padding: "24px",
        borderRadius: "var(--radius-md)",
        width: "100%",
        maxWidth: "500px",
        boxShadow: "var(--shadow-modal)",
        border: "1px solid var(--color-accent)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ margin: 0, color: "var(--color-primary)", fontSize: "18px" }}>⚡ Quick Capture</h3>
          <span style={{ fontSize: "11px", background: "var(--color-paper)", padding: "2px 8px", borderRadius: "4px", color: "#64748b" }}>
            Press N to Toggle
          </span>
        </div>

        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "flex", gap: "10px" }}>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ padding: "8px", borderRadius: "var(--radius-sm)", border: "1px solid #cbd5e1" }}
            >
              <option value="research">📚 Research Note</option>
              <option value="contact">🤝 Contact</option>
              <option value="mission">🎯 Mission</option>
              <option value="opportunity">💼 Opportunity</option>
            </select>

            <select
              value={patientImpact}
              onChange={(e) => setPatientImpact(e.target.value)}
              style={{ padding: "8px", borderRadius: "var(--radius-sm)", border: "1px solid #cbd5e1" }}
            >
              <option value="Critical">Patient Impact: Critical</option>
              <option value="High">Patient Impact: High</option>
              <option value="Medium">Patient Impact: Medium</option>
              <option value="Low">Patient Impact: Low</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Capture idea, contact name, or research insight..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid #cbd5e1", fontSize: "14px" }}
            autoFocus
          />

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "8px" }}>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{ padding: "8px 14px", background: "#f1f5f9", border: 0, borderRadius: "var(--radius-sm)", cursor: "pointer" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{ padding: "8px 16px", background: "var(--color-primary)", color: "white", border: 0, borderRadius: "var(--radius-sm)", fontWeight: "bold", cursor: "pointer" }}
            >
              Save to Node Graph
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
