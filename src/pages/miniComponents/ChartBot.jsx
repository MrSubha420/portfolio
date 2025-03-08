import React, { useState } from "react";

const ChartBot = () => {
  const [isChatOpen, setChatOpen] = useState(false);

  // Toggle the chat section
  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Chat Button with Larger GIF */}
      {!isChatOpen && (
        <button
          onClick={toggleChat}
          className="focus:outline-none"
          aria-label="Open Chatbot"
        >
          <img src="/pihu.gif" alt="ChatBot Logo" className="w-28 h-28" />
        </button>
      )}

      {/* Chat Section */}
      {isChatOpen && (
        <div
          className="w-80 h-96 bg-black text-green-500 rounded-lg shadow-lg flex flex-col transition-all transform scale-100"
          style={{ position: "fixed", bottom: "6rem", left: "1rem" }}
        >
          {/* Header with Smaller GIF */}
          <div className="flex items-center justify-between p-3 border-b border-green-700">
            <div className="flex items-center gap-2">
              <img src="/pihu.gif" alt="Bot Logo" className="w-12 h-12" />
              <h3 className="text-lg font-semibold">HackerBot</h3>
            </div>
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
