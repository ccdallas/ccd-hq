import { integrations } from "../../core/integrations.js";

export default function IntegrationCenter() {
  return (
    <section>
      <span className="ccd-kicker">
        Integrations
      </span>
      <h2>
        Connected Intelligence
      </h2>
      <div className="lab-grid">
        {integrations.map((item) => (
          <div key={item.id} className="lab-card">
            <h3>{item.name}</h3>
            <span>{item.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
