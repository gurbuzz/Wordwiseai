import React from "react";

const SlidingText = ({ text }) => {
  return (
    <div className="sliding-text-container">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="sliding-letter"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {char}
        </span>
      ))}
      <style jsx>{`
        .sliding-text-container {
          display: inline-block;
        }
        .sliding-letter {
          opacity: 0;
          transform: translateX(-20px);
          animation: slideIn 0.5s forwards;
        }
        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SlidingText;
