export class PluginManager {
  constructor() {
    this.plugins = new Map();
  }

  registerPlugin(manifest) {
    if (!manifest.id) throw new Error("Plugin manifest requires a valid ID.");
    this.plugins.set(manifest.id, manifest);
    console.log(`[PluginManager] Registered plugin: ${manifest.name} (v${manifest.version})`);
  }

  getPlugin(id) {
    return this.plugins.get(id);
  }

  getAllPlugins() {
    return Array.from(this.plugins.values());
  }
}

export const pluginManager = new PluginManager();
