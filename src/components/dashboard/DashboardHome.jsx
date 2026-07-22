import MetricCard from "./MetricCard.jsx";
import ModuleCard from "./ModuleCard.jsx";
import { platformMetrics } from "../../core/metrics.js";
import { modules } from "../../core/modules.js";

export default function DashboardHome() {
  return (
    <section className="ccd-dashboard">
      <div className="ccd-dashboard-header">
        <span className="ccd-kicker">
          Command Center
        </span>
        <h2>
          CCD-HQ Mission Overview
        </h2>
        <p>
          Your healthcare cybersecurity operating system.
        </p>
      </div>

      <div className="ccd-metric-grid">
        {platformMetrics.map((metric) => (
          <MetricCard
            key={metric.label}
            {...metric}
          />
        ))}
      </div>

      <div className="ccd-module-grid">
        {modules
          .filter((module) => module.enabled)
          .map((module) => (
            <ModuleCard
              key={module.id}
              name={module.name}
              description="Operational module"
              status="Online"
            />
          ))}
      </div>
    </section>
  );
}
