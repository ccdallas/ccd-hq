import { eventBus } from "../../core/events/EventBus.js";

export class BaseConnector {
  constructor(id, name, category) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.status = "disconnected";
    this.lastSync = null;
  }

  async connect() {
    this.status = "connected";
    this.emitEvents("CONNECTOR_CONNECTED", { id: this.id });
    return { success: true };
  }

  async sync() {
    if (this.status !== "connected") throw new Error(`${this.name} is not connected.`);
    this.lastSync = new Date().toISOString();
    this.emitEvents("CONNECTOR_SYNCED", { id: this.id, timestamp: this.lastSync });
    return { success: true };
  }

  ingest(rawPayload) {
    return this.normalize(rawPayload);
  }

  normalize(payload) {
    return { id: `norm-${Date.now()}`, source: this.id, data: payload };
  }

  emitEvents(eventType, payload) {
    eventBus.emit(eventType, payload);
  }
}
