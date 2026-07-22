const actions = [
  "Log New Mission",
  "Add Contact",
  "Capture Research",
  "Update Career Pipeline"
];

export default function QuickActions() {
  return (
    <section>
      <h3>Quick Actions</h3>
      <div>
        {actions.map((action) => (
          <button key={action}>
            {action}
          </button>
        ))}
      </div>
    </section>
  );
}
