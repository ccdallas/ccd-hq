import { NotionConnector } from "./notion/NotionConnector.js";
import { GitHubConnector } from "./github/GitHubConnector.js";
import { CONNECTORS } from "./ConnectorRegistry.js";

class ConnectorManager {
  constructor() {
    this.connectors = new Map();

    // Register active connectors
    this.registerConnector(new NotionConnector());
    this.registerConnector(new GitHubConnector());
  }

  registerConnector(instance) {
    this.connectors.set(instance.id, instance);
  }

  getAvailableConnectors() {
    return CONNECTORS.map((c) => {
      const activeInstance = this.connectors.get(c.id);
      return {
        ...c,
        status: activeInstance ? activeInstance.getStatus() : c.status,
        lastSync: activeInstance ? activeInstance.getLastSync() : null
      };
    });
  }

  async connect(id, credentials) {
    const connector = this.connectors.get(id);
    if (!connector) throw new Error(`Connector '${id}' not registered.`);
    return await connector.connect(credentials);
  }

  async disconnect(id) {
    const connector = this.connectors.get(id);
    if (!connector) throw new Error(`Connector '${id}' not registered.`);
    return await connector.disconnect();
  }

  async sync(id) {
    const connector = this.connectors.get(id);
    if (!connector) throw new Error(`Connector '${id}' not registered.`);
    return await connector.sync();
  }
}

export const connectorManager = new ConnectorManager();
