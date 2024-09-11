import { useState, useEffect } from "react";
import { Content } from "@google/generative-ai";

const useGemini = () => {
  const CHAT_HISTORY: string = "chat-history";
  const [loading, setLoading] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<Content[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem(CHAT_HISTORY);
    if (!storedHistory) return;
    setChatHistory(JSON.parse(storedHistory));
  }, []);

  useEffect(() => {
    if (chatHistory.length === 0) return;
    localStorage.setItem(CHAT_HISTORY, JSON.stringify(chatHistory));
  }, [chatHistory]);

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

  const clearHistory = () => {
    setChatHistory([]);
    localStorage.removeItem(CHAT_HISTORY);
  };

  return { loading, sendPrompt, isChatEmpty, getChatHistory, clearHistory };
};

export default useGemini;
