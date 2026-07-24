class EventBusService {
  constructor() {
    this.listeners = new Map();
    this.timeline = [];
  }

  subscribe(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(callback);
    return () => {
      const callbacks = this.listeners.get(eventType) || [];
      this.listeners.set(eventType, callbacks.filter((cb) => cb !== callback));
    };
  }

  emit(eventType, payload) {
    const eventRecord = {
      id: `evt-${Date.now()}`,
      type: eventType,
      payload,
      timestamp: new Date().toISOString()
    };

    this.timeline.unshift(eventRecord);

    if (this.listeners.has(eventType)) {
      this.listeners.get(eventType).forEach((cb) => cb(eventRecord));
    }
  }

  getTimeline() {
    return this.timeline;
  }
}

export const eventBus = new EventBusService();
