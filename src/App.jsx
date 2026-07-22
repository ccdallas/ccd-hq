import { useState } from "react";
import "./styles.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import AuthModal from "./features/auth/AuthModal.jsx";
import DashboardHome from "./components/dashboard/DashboardHome.jsx";
import { modules } from "./core/modules.js";

export default function App() {
  const [activeTab, setActiveTab] = useState("command-center");

  return (
    <AuthProvider>
      <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
        {/* Sidebar Navigation */}
        <aside style={{ width: "260px", background: "#1E5040", color: "white", padding: "24px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ marginBottom: "20px", padding: "0 8px" }}>
            <h1 style={{ fontSize: "22px", fontFamily: "Playfair Display, serif", color: "#E0A83E", margin: 0 }}>
              CCD-HQ™
            </h1>
            <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px", opacity: 0.8 }}>
              Founder Edition v1.0
            </span>
          </div>

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
                      borderRadius: "8px",
                      border: 0,
                      background: isActive ? "#E0A83E" : "transparent",
                      color: isActive ? "#1E5040" : "white",
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
    </AuthProvider>
  );
}
