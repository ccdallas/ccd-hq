import { currentUser } from "../../core/user.js";
import Sidebar from "./Sidebar.jsx";

export default function AppShell({ children, activeModule, setActiveModule }) {
  return (
    <div className="ccd-platform">
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
      />

      <div className="ccd-main">
        <header className="ccd-header">
          <span className="ccd-kicker">
            CCD-HQ Platform
          </span>
          <h1>
            {currentUser.name}
          </h1>
          <p>
            {currentUser.role}
          </p>
        </header>

        <main className="ccd-content">
          {children}
        </main>
      </div>
    </div>
  );
}
