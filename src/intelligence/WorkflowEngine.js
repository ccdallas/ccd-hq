export const BLACK_HAT_WORKFLOW_PHASES = [
  { id: "pre-conf", title: "Before Conference", status: "Completed", tasks: ["Sync WISP Shift Lead schedule", "Review Midnight in the War Room premiere deck"] },
  { id: "travel", title: "Travel & Arrival", status: "Active", tasks: ["Atlanta → Las Vegas travel block", "Hotel check-in & badge pickup"] },
  { id: "networking", title: "Vendor & CISO Outreach", status: "Pending", tasks: ["Execute HIMSS / CISO coffee syncs", "Biohacking Village engagement"] },
  { id: "post-conf", title: "Follow-ups & ROI Review", status: "Pending", tasks: ["Process business card queue", "Publish LinkedIn research article"] }
];

export class WorkflowEngine {
  static getMissionWorkflow(missionId) {
    return {
      missionId,
      currentPhase: "Travel & Arrival",
      phases: BLACK_HAT_WORKFLOW_PHASES
    };
  }
}
