import { useState } from "react";
import { Content } from "@google/generative-ai";

const useGemini = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<Content[]>([]);

  const sendPrompt = async (prompt: string) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const isChatEmpty = () => {
    return chatHistory.length === 0;
  };

  const getChatHistory = () => {
    return chatHistory;
  };

  return { loading, sendPrompt, isChatEmpty, getChatHistory };
};

export default useGemini;
