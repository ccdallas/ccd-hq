import { useState } from "react";
import "./styles.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { WorkspaceProvider } from "./core/workspace/WorkspaceContext.jsx";
import WorkspaceSwitcher from "./core/workspace/WorkspaceSwitcher.jsx";
import AuthModal from "./features/auth/AuthModal.jsx";
import DashboardHome from "./components/dashboard/DashboardHome.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import QuickCaptureModal from "./components/QuickCaptureModal.jsx";
import { modules } from "./core/modules.js";

export default function App() {
  const [activeTab, setActiveTab] = useState("command-center");

  return (
    <AuthProvider>
      <WorkspaceProvider>
        <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-background)" }}>
          <CommandPalette onSelectModule={setActiveTab} />
          <QuickCaptureModal />

          {/* Sidebar Navigation */}
          <aside style={{ width: "260px", background: "var(--color-primary)", color: "white", padding: "24px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ marginBottom: "12px", padding: "0 8px" }}>
              <h1 style={{ fontSize: "22px", fontFamily: "Playfair Display, serif", color: "var(--color-accent)", margin: 0 }}>
                CCD-HQ™
              </h1>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
                <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px", opacity: 0.8 }}>
                  v1.0 Daily Driver
                </span>
                <span style={{ fontSize: "10px", background: "rgba(224, 168, 62, 0.2)", color: "var(--color-accent)", padding: "2px 6px", borderRadius: "4px" }}>
                  Press N
                </span>
              </div>
            </div>

            {/* Multi-Context Workspace Switcher */}
            <WorkspaceSwitcher />

            <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {modules
                .filter((m) => m.enabled)
                .map((mod) => {
                  const isActive = activeTab === mod.id;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => setActiveTab(mod.id)}
                      style={{
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        padding: "10px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: 0,
                        background: isActive ? "var(--color-accent)" : "transparent",
                        color: isActive ? "var(--color-primary)" : "white",
                        fontWeight: isActive ? "bold" : "normal",
                        fontSize: "14px",
                        cursor: "pointer"
                      }}
                    >
                      {mod.name}
                    </button>
                  );
                })}
            </nav>
          </aside>

          {/* Main Content View */}
          <main style={{ flex: 1, padding: "30px", maxWidth: "1200px" }}>
            <AuthModal />
            <DashboardHome activeModule={activeTab} />
          </main>
        </div>
      </WorkspaceProvider>
    </AuthProvider>
  );
}
