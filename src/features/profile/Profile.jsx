import { useUser } from "../../core/UserContext.jsx";

export default function Profile() {
  const user = useUser();

  return (
    <section>
      <span className="ccd-kicker">
        Profile
      </span>
      <h2>
        {user.name}
      </h2>
      <p>
        {user.title}
      </p>
    </section>
  );
}
