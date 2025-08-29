import React, { useState } from "react";
import axios from "axios";
import uiText from "./uiData.txt?raw";

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I am the hospital receptionist bot. How can I help you?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const safeParseLLM = (rawContent) => {
    try {
      let cleaned = rawContent
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();
      return JSON.parse(cleaned);
    } catch (err) {
      console.warn("⚠️ Failed to parse LLM JSON:", err);
      return null;
    }
  };

  const handleUIQuestion = async (question) => {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3.1-405b-instruct:free",
        messages: [
          {
            role: "system",
            content: `You are a hospital receptionist AI. Answer ONLY based on the provided website guide. 
          Do not invent information. Respond concisely. Always JSON format:
          { "mode": "ui", "answer": string }`,
          },
          { role: "system", content: uiText },
          { role: "user", content: question },
        ],
      },
      {
        headers: {
          Authorization: import.meta.env.VITE_OPENROUTER_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const rawContent = response.data.choices[0].message.content;
    const parsed = safeParseLLM(rawContent);
    return parsed?.answer || rawContent;
  };

  const handleSend = async () => {
    if (!input) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    try {
      setIsTyping(true);

      // classification request
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "meta-llama/llama-3.1-405b-instruct:free",
          messages: [
            {
              role: "system",
              content: `You are a hospital receptionist AI assistant. 
                Always respond strictly in JSON format. 
                JSON structure: 
                {
                  "mode": "general" | "database" | "website",
                  "answer": string (if mode = "general"),
                  "endpoint": string (if mode = "database")
                }

                If the question can be answered conversationally, use "mode": "general" and provide the "answer".  
                If the user asked website user interface related question use "mode": "website" do not need any answer I will create second call with related data.  
                If the user asks for data that exists in the hospital system, use "mode": "database" and respond with the correct endpoint name.  

                Available endpoints are:
                - getAllDetailsOfDoctors
                - getAllDetailsOfPharmacies
                - getQueues

                Only use these exact endpoint names in your JSON. Do not invent new ones.`,
            },
            ...newMessages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
          ],
        },
        {
          headers: {
            Authorization: import.meta.env.VITE_OPENROUTER_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      const rawContent = response.data.choices[0].message.content;
      console.log("🟢 Raw LLM content:", rawContent);
      const parsed = safeParseLLM(rawContent);

      if (parsed) {
        if (parsed.mode === "general") {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: parsed.answer },
          ]);
        } else if (parsed.mode === "database") {
          const backendResponse = await axios.post(
            "http://localhost:8080/patient/chat",
            { requiredData: parsed.endpoint, question: input }
          );
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: `${JSON.stringify(backendResponse.data.data, null, 2)}`,
            },
          ]);
        } else if (parsed.mode === "website") {
          const uiAnswer = await handleUIQuestion(input);
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: uiAnswer },
          ]);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: rawContent },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Could not get response." },
      ]);
    } finally {
      setIsTyping(false);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg max-w-[75%] ${
              msg.role === "user"
                ? "bg-purple-100 self-end ml-auto"
                : "bg-gray-200"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {isTyping && (
          <div className="italic text-gray-500">Assistant is typing...</div>
        )}
      </div>

      {/* Input box */}
      <div className="p-2 border-t flex">
        <input
          type="text"
          className="flex-1 border rounded-lg px-3 py-1 text-sm focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-purple-600 text-white px-3 py-1 rounded-lg text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}
