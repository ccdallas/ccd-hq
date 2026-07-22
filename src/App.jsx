import { useState } from "react";
import AppShell from "./components/layout/AppShell.jsx";
import DashboardHome from "./components/dashboard/DashboardHome.jsx";

export default function App() {
  const [activeModule, setActiveModule] = useState("mission-control");

  return (
    <AppShell
      activeModule={activeModule}
      setActiveModule={setActiveModule}
    >
      <DashboardHome activeModule={activeModule} />
    </AppShell>
  );
}
