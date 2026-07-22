import { modules } from "../../core/modules.js";

export default function Sidebar({ activeModule, setActiveModule }) {
  return (
    <aside className="ccd-sidebar">
      <div className="ccd-brand">
        <span>CCD-HQ</span>
        <small>Platform Alpha</small>
      </div>

      <nav>
        {modules
          .filter((module) => module.enabled)
          .map((module) => (
            <button
              key={module.id}
              className={activeModule === module.id ? "active" : ""}
              onClick={() => setActiveModule(module.id)}
            >
              {module.name}
            </button>
          ))}
      </nav>
    </aside>
  );
}
