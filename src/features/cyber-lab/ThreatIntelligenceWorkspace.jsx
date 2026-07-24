import React from "react";

export const threatIntelRecords = [
  {
    id: "threat-1",
    vulnerability: "CVE-2026-8812 - Medical Device Gateway Auth Bypass",
    affectedDevice: "Infusion Pump Wireless Gateway",
    careSetting: "ICU & Emergency Department",
    deviceClass: "Class II Medical Device",
    patientImpact: "Critical",
    regulatoryFramework: "FDA Guidance & HIPAA Security Rule",
    mitigationStatus: "Vendor Patch Verification Pending"
  },
  {
    id: "threat-2",
    vulnerability: "Clinical AI Model Parameter Drift / Adversarial Noise",
    affectedDevice: "Diagnostic Imaging AI Decision Support",
    careSetting: "Radiology",
    deviceClass: "Software as a Medical Device (SaMD)",
    patientImpact: "Critical",
    regulatoryFramework: "Clinical AI Risk Assessment & NIST CSF",
    mitigationStatus: "Continuous Validation Pipeline Active"
  }
];

export default function ThreatIntelligenceWorkspace() {
  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <span className="ccd-kicker">Healthcare Cyber Lab</span>
          <h2 style={{ margin: "4px 0" }}>Clinical Threat & IoMT Intelligence</h2>
        </div>
        <span style={{ padding: "6px 12px", background: "#fee2e2", color: "#991b1b", border: "1px solid #f87171", borderRadius: "8px", fontWeight: "bold", fontSize: "12px" }}>
          Active Vulnerability Radar
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {threatIntelRecords.map((t) => (
          <div key={t.id} style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "var(--shadow-card)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "16px", color: "var(--color-primary)" }}>{t.vulnerability}</h3>
                <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "13px" }}>
                  <strong>Device / Target:</strong> {t.affectedDevice} ({t.deviceClass})
                </p>
              </div>
              <span style={{ padding: "4px 10px", background: "#fee2e2", color: "#991b1b", borderRadius: "6px", fontWeight: "bold", fontSize: "11px" }}>
                Patient Impact: {t.patientImpact}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", background: "#f8fafc", padding: "12px", borderRadius: "8px", fontSize: "12px", color: "#334155" }}>
              <div>🏥 <strong>Care Setting:</strong> {t.careSetting}</div>
              <div>⚖️ <strong>Regulatory:</strong> {t.regulatoryFramework}</div>
              <div>🛡️ <strong>Mitigation:</strong> {t.mitigationStatus}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
