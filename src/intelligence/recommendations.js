export function generateRecommendations(profile) {
  const recommendations = [];

  if (profile.specialties.includes("Healthcare Cybersecurity")) {
    recommendations.push("Review IoMT security research opportunities");
  }

  if (profile.specialties.includes("Clinical AI Security")) {
    recommendations.push("Capture emerging AI governance trends");
  }

  return recommendations;
}
