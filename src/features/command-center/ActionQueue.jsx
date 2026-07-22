import { commandData } from "./commandData.js";

export default function ActionQueue() {
  return (
    <section className="command-card">
      <h2>Priority Actions</h2>
      <div className="action-list" style={{ marginTop: "12px" }}>
        {commandData.priorityActions.map((action) => (
          <p key={action} className="action-item">
            <span className="checkbox-icon">☐</span> {action}
          </p>
        ))}
      </div>
    </section>
  );
}
