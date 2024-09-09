import { useState, useEffect } from "react";
import { Content } from "@google/generative-ai";

const App = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Content[]>([]);

  useEffect(() => {
    console.log("Mount useEffect");
    setPrompt("I have 2 dogs in my house.");
  }, []);

  const sendPrompt = async () => {
    console.log("click");
    try {
      const res = await fetch(import.meta.env.VITE_SERVER_GEMINI_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt, history: chatHistory }),
      });
      const data = await res.json();
      console.log("data:", data);
      setChatHistory(data.chatHistory);
    } catch (error) {
      console.error("Error fetching backend:", error);
    }
  };

  return (
    <div id="app" className="bg-neutral-800 text-white min-h-screen">
      <h1 className="text-4xl">Language Chatbot</h1>
      <button onClick={sendPrompt}>Send prompt</button>
    </div>
  );
};

export default App;
