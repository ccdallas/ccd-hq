export function calculateWeightedImpactScore({
  patientSafetyRisk = 10,  // 1 - 10
  clinicalOpsImpact = 9,   // 1 - 10
  cyberThreatLevel = 9,    // 1 - 10
  strategicValue = 8,      // 1 - 10
  regulatoryExposure = 8   // 1 - 10
}) {
  // Clinical weights favoring patient safety above all else
  const weights = {
    patientSafety: 0.35,
    clinicalOps: 0.25,
    cyberThreat: 0.20,
    regulatory: 0.10,
    strategic: 0.10
  };

  const rawScore =
    patientSafetyRisk * weights.patientSafety +
    clinicalOpsImpact * weights.clinicalOps +
    cyberThreatLevel * weights.cyberThreat +
    regulatoryExposure * weights.regulatory +
    strategicValue * weights.strategic;

  const percentage = Math.round((rawScore / 10) * 100);

  return {
    score: percentage,
    category: percentage >= 85 ? "Critical Patient Impact" : percentage >= 65 ? "High Patient Impact" : "Standard Impact"
  };
}
