import React from "react";

export default function WidgetGrid({ children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "20px" }}>
      {children}
    </div>
  );
}
