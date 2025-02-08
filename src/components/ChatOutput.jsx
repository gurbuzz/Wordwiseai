import React from "react";
import SlidingText from "./SlidingText";

const ChatOutput = ({ promptResult, loading, darkMode }) => {
  const responseAreaStyle = {
    flex: 1,
    padding: "20px",
    background: darkMode ? "#374151" : "#f1f5f9",
    border: darkMode ? "1px solid #4b5563" : "1px solid #e2e8f0",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
    color: darkMode ? "#e2e8f0" : "#475569",
    fontSize: "18px",
    lineHeight: 1.6,
    overflowY: "auto",
  };

  return (
    <div style={responseAreaStyle}>
      {loading ? <SlidingText text="Awaiting response..." /> : promptResult || ""}
    </div>
  );
};

export default ChatOutput;
