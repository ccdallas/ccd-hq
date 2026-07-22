import React, { useState } from "react";
import { connectorManager } from "../../services/connectors/ConnectorManager.js";
import ConnectorCard from "./ConnectorCard.jsx";

export default function IntegrationHub() {
  const [connectors, setConnectors] = useState(() => connectorManager.getAvailableConnectors());

  const refreshList = () => {
    setConnectors(connectorManager.getAvailableConnectors());
  };

  const handleConnect = async (id) => {
    await connectorManager.connect(id, {});
    refreshList();
  };

  const handleDisconnect = async (id) => {
    await connectorManager.disconnect(id);
    refreshList();
  };

  const handleSync = async (id) => {
    await connectorManager.sync(id);
    refreshList();
  };

  return (
    <section>
      <span className="ccd-kicker">Satellite Ecosystem</span>
      <h2>Integration Hub & Connectors</h2>
      <p style={{ color: "#64748b", marginBottom: "20px" }}>
        Pluggable architecture connecting external tools directly into the CCD-HQ OS.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
        {connectors.map((c) => (
          <ConnectorCard
            key={c.id}
            connector={c}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            onSync={handleSync}
          />
        ))}
      </div>
    </section>
  );
}
