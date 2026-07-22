export function generateBriefing(data) {
  return {
    title: "CCD-HQ Daily Briefing",
    summary: `You have ${data.missions} active missions and ${data.tasks} priorities requiring attention.`
  };
}
