import React from "react";

const ChatInput = ({
  prompt,
  onPromptChange,
  onSend,
  onRefresh,
  onTextareaKeyDown,
  loading,
  isRefreshing,
  darkMode,
}) => {
  const textareaStyle = {
    width: "100%",
    height: "160px",
    marginBottom: "20px",
    padding: "16px",
    borderRadius: "12px",
    border: darkMode ? "1px solid #4b5563" : "1px solid #e2e8f0",
    fontSize: "18px",
    resize: "none",
    outline: "none",
    transition: "border-color 0.2s",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
    backgroundColor: darkMode ? "#374151" : "#ffffff",
    color: darkMode ? "#e2e8f0" : "#1e293b",
    fontFamily: "inherit",
  };

  const buttonStyle = {
    padding: "14px 28px",
    cursor: "pointer",
    backgroundColor: loading ? "#94a3b8" : (darkMode ? "#2563eb" : "#3b82f6"),
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "18px",
    transition: "background-color 0.2s",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const refreshButtonStyle = {
    padding: "14px 28px",
    cursor: "pointer",
    backgroundColor: loading ? "#94a3b8" : (darkMode ? "#2563eb" : "#3b82f6"),
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "18px",
    transition: "background-color 0.2s",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginLeft: "10px",
    animation: isRefreshing ? "blink 1s infinite" : "none",
  };

  return (
    <div style={{ marginBottom: "24px" }}>
      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        onKeyDown={onTextareaKeyDown}
        placeholder="Enter your guess here..."
        style={textareaStyle}
        onFocus={(e) =>
          (e.target.style.borderColor = darkMode ? "#3b82f6" : "#3b82f6")
        }
        onBlur={(e) =>
          (e.target.style.borderColor = darkMode ? "#4b5563" : "#e2e8f0")
        }
      />
      <div style={{ display: "flex", alignItems: "center" }}>
        <button onClick={onSend} style={buttonStyle} disabled={loading}>
          {loading ? "Waiting for Response..." : "Send"}
        </button>
        <button onClick={onRefresh} style={refreshButtonStyle}>
          Refresh 
          {isRefreshing && <span className="spinner" />}
        </button>
      </div>
      <style jsx>{`
        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-left: 8px;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ChatInput;
