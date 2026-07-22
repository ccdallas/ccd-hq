import { useSupabaseData } from "../../hooks/useSupabaseData.js";
import { generateExecutiveBriefing } from "../../services/ai/chiefEngine.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function ChiefOfStaff() {
  const { user } = useAuth();
  const { data: missions } = useSupabaseData("missions");
  const { data: contacts } = useSupabaseData("contacts");
  const { data: knowledge } = useSupabaseData("knowledge");

  const userName = user?.email ? user.email.split("@")[0] : "Chaunda";
  const briefing = generateExecutiveBriefing({
    missions: missions || [],
    contacts: contacts || [],
    knowledge: knowledge || [],
    user: userName
  });

  return (
    <section className="chief-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="ccd-kicker" style={{ color: "#E0A83E" }}>
          AI Chief of Staff Engine
        </span>
        <span style={{ fontSize: "11px", background: "rgba(224, 168, 62, 0.2)", color: "#E0A83E", padding: "4px 8px", borderRadius: "6px", fontWeight: "bold" }}>
          Live Intelligence Active
        </span>
      </div>

      <h2>{briefing.greeting}</h2>
      <p style={{ fontSize: "16px", fontWeight: "600", color: "#F3ECDD", margin: "8px 0 16px 0" }}>
        {briefing.headline}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", background: "rgba(0,0,0,0.18)", padding: "16px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
        {briefing.recommendations.map((rec, idx) => (
          <p key={idx} style={{ margin: 0, fontSize: "14px", color: "#ffffff" }}>
            {rec}
          </p>
        ))}
      </div>
    </section>
  );
}
