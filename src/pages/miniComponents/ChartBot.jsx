import React, { useState } from "react";

const ChartBot = () => {
  const [isChatOpen, setChatOpen] = useState(false);

  // Toggle the chat section
  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Chat Button */}
      {!isChatOpen && (
        <button
          onClick={toggleChat}
          className="p-3 bg-green-600 text-black rounded-full shadow-lg flex items-center justify-center focus:outline-none hover:bg-green-500 animate-pulse"
          aria-label="Open Chatbot"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
            />
          </svg>
        </button>
      )}

      {/* Chat Section */}
      {isChatOpen && (
        <div
          className="w-80 h-96 bg-black text-green-500 rounded-lg shadow-lg flex flex-col transition-all transform scale-100 animate-fade-in"
          style={{ position: "fixed", bottom: "4rem", left: "1rem" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-green-700">
            <h3 className="text-lg font-semibold">HackerBot</h3>
            <button
              onClick={toggleChat}
              className="text-green-400 hover:text-green-200"
              aria-label="Close Chatbot"
            >
              ✕
            </button>
          </div>

          {/* Iframe for Botpress */}
          <div className="flex-grow overflow-hidden">
            <iframe
              src="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2024/12/31/20/20241231204738-5N2NGCE3.json"
              title="ChatBot"
              style={{ width: "100%", height: "100%", border: "none", background: "black" }}
              allow="microphone; camera"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartBot;

