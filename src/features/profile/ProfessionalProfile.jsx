import { useUser } from "../../core/UserContext.jsx";

export default function ProfessionalProfile() {
  const user = useUser();

  return (
    <section>
      <span className="ccd-kicker">
        Professional Identity
      </span>
      <h2>
        {user.name}
      </h2>
      <p>
        {user.title}
      </p>
      <div style={{ marginTop: "16px" }}>
        <strong>Healthcare Cybersecurity Focus</strong>
        <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
          <li>IoMT Security</li>
          <li>Clinical AI Security</li>
          <li>Healthcare Risk Management</li>
        </ul>
      </div>
    </section>
  );
}
