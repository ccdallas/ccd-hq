import React from "react";

export default function ConnectorCard({ connector, onConnect, onDisconnect, onSync }) {
  const isConnected = connector.status === "connected";
  const isPlanned = connector.status === "planned";

  return (
    <div style={{
      background: "white",
      borderRadius: "12px",
      padding: "20px",
      border: "1px solid #e2e8f0",
      display: "flex",
      flexDirection: "column",
      justify: "space-between",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
    }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <h3 style={{ margin: 0, fontSize: "18px", color: "#1E5040" }}>{connector.name}</h3>
          <span style={{
            fontSize: "11px",
            padding: "4px 8px",
            borderRadius: "6px",
            fontWeight: "bold",
            background: isConnected ? "#dcfce7" : isPlanned ? "#f1f5f9" : "#fee2e2",
            color: isConnected ? "#166534" : isPlanned ? "#64748b" : "#991b1b"
          }}>
            {connector.status.toUpperCase()}
          </span>
        </div>
        <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px 0" }}>
          {connector.description}
        </p>
      </div>

      <div style={{ display: "flex", gap: "8px", marginTop: "auto", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
        {!isPlanned && (
          <>
            {isConnected ? (
              <>
                <button
                  onClick={() => onSync(connector.id)}
                  style={{ flex: 1, padding: "8px", background: "#1E5040", color: "white", border: 0, borderRadius: "6px", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}
                >
                  Sync Now
                </button>
                <button
                  onClick={() => onDisconnect(connector.id)}
                  style={{ padding: "8px 12px", background: "#f8fafc", color: "#8b1e24", border: "1px solid #cbd5e1", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                onClick={() => onConnect(connector.id)}
                style={{ flex: 1, padding: "8px", background: "#1E5040", color: "white", border: 0, borderRadius: "6px", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}
              >
                Connect Service
              </button>
            )}
          </>
        )}
        {isPlanned && (
          <span style={{ fontSize: "12px", color: "#94a3b8", italic: "true" }}>Sprint Roadmap Item</span>
        )}
      </div>
    </div>
  );
}
