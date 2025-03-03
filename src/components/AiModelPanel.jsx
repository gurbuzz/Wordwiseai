"use client";
import React from "react";
import { useApp } from "../context/AppContext";

const models = [
  { name: "Llama", active: true },
  { name: "ChatGPT", active: false },
  { name: "Gemini", active: true },
  { name: "DeepSeek", active: false },
  { name: "Claude", active: false },
];

const AiModelPanel = () => {
  const { darkMode, selectedModel, setSelectedModel } = useApp();

  // Kapsayıcı panel stili
  const panelClass = darkMode
    ? "bg-gray-800 text-white shadow-md rounded-lg p-6 mb-6"
    : "bg-white text-gray-800 shadow-md rounded-lg p-6 mb-6";

  // Başlık stili
  const headingClass = darkMode
    ? "text-2xl font-bold text-white mb-4"
    : "text-2xl font-bold text-gray-800 mb-4";

  // Açıklama stili
  const infoClass = darkMode
    ? "text-lg text-gray-100"
    : "text-lg text-gray-700";

  // Seçim kutusu stili
  const selectClass = darkMode
    ? "w-full p-3 mb-4 bg-gray-700 text-white border border-gray-600 rounded"
    : "w-full p-3 mb-4 bg-white text-gray-800 border border-gray-300 rounded";

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  return (
    <div className={panelClass}>
      <h2 className={headingClass}>AI Model</h2>
      <select className={selectClass} value={selectedModel} onChange={handleModelChange}>
        {models.map((model) => (
          <option key={model.name} value={model.name} disabled={!model.active}>
            {model.name} {!model.active && "(Coming Soon)"}
          </option>
        ))}
      </select>
      <div className={infoClass}>
        <strong>Seçili Model:</strong> {selectedModel}
      </div>
    </div>
  );
};

export default AiModelPanel;
