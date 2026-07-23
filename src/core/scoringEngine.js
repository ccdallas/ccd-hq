export function calculateOpportunityScore({
  strategicValue = 5,  // 1-10
  revenuePotential = 5,// 1-10
  patientImpact = "High",
  brandGrowth = 5      // 1-10
}) {
  const impactMultiplier = patientImpact === "Critical" ? 2.0 : patientImpact === "High" ? 1.5 : 1.0;
  const baseScore = (strategicValue * 0.3) + (revenuePotential * 0.3) + (brandGrowth * 0.4);
  const finalScore = Math.min(100, Math.round(baseScore * 10 * impactMultiplier / 1.5));
  return finalScore;
}

export function calculateMissionHealth({ progress = 0, activityCount = 0, openBlockers = 0 }) {
  let health = 100;
  if (openBlockers > 0) health -= openBlockers * 20;
  if (activityCount === 0) health -= 15;
  health = Math.max(0, Math.min(100, health + (progress * 0.2)));
  return Math.round(health);
}
