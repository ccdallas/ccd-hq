import { NODE_TYPES } from "./NodeTypes.js";

export class Node {
  constructor({
    id = `node-${Date.now()}`,
    type = NODE_TYPES.MISSION,
    title = "",
    patientImpact = "Low", // Critical, High, Medium, Low
    metadata = {}
  }) {
    this.id = id;
    this.type = type;
    this.title = title;
    this.patientImpact = patientImpact;
    this.metadata = metadata;
    this.createdAt = new Date().toISOString();
  }
}
