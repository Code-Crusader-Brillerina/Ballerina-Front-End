import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatWindow from "./ChatWindow"; // we'll move your chatbot code here

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 
                   text-white p-4 rounded-full shadow-lg transition 
                   flex items-center justify-center z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle size={28} />
      </button>

      {/* Popup Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 h-[500px] bg-white shadow-xl rounded-2xl flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between bg-purple-600 text-white px-4 py-2 rounded-t-2xl">
            <h2 className="text-sm font-semibold">Hospital Chatbot</h2>
            <button onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Chat Window (your chatbot logic here) */}
          <ChatWindow />
        </div>
      )}
    </>
  );
}
