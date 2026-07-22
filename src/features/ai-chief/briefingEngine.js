export function createBriefing(context) {
  return {
    greeting: `Good morning, ${context.user}.`,
    focus: `Today's strategic focus areas: ${context.focusAreas.join(", ")}.`,
    missions: `Active missions: ${context.currentMissions.join(", ")}.`
  };
}
