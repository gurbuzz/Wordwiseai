"use client";
import React, { useState } from "react";

const models = [
  { name: "Llama", active: true },
  { name: "ChatGPT", active: false },
  { name: "Gemimi", active: false },
  { name: "DeepSeek", active: false },
  { name: "Claude", active: false },
];

const AiModelPanel = () => {
  const [selectedModel, setSelectedModel] = useState("Llama");
  const [responseTime, setResponseTime] = useState(null);

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  const panelStyle = {
    padding: "40px",
    backgroundColor: "#ffffff",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.08)",
    borderRadius: "12px",
    marginBottom: "20px",
  };

  const headingStyle = {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "28px",
  };

  const selectStyle = {
    width: "100%",
    padding: "12px",
    fontSize: "18px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    marginBottom: "20px",
  };

  const infoStyle = {
    fontSize: "18px",
    fontWeight: "500",
    color: "#1e293b",
  };

  return (
    <div style={panelStyle}>
      <h2 style={headingStyle}>AI Model</h2>
      <select style={selectStyle} value={selectedModel} onChange={handleModelChange}>
        {models.map((model) => (
          <option key={model.name} value={model.name} disabled={!model.active}>
            {model.name} {!model.active && "(Coming Soon)"}
          </option>
        ))}
      </select>
      <div style={infoStyle}>
        <strong>Selected Model:</strong> {selectedModel}
      </div>
      <div style={{ marginTop: "10px", ...infoStyle }}>
        <strong>Response Time:</strong> {responseTime !== null ? `${responseTime} ms` : "N/A"}
      </div>
    </div>
  );
};

export default AiModelPanel;
