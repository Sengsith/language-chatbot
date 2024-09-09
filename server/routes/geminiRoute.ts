import { Router, Request, Response } from "express";
import { Content, GoogleGenerativeAI } from "@google/generative-ai";

const router = Router();

// Send/receive chatHistory between frontend/backend
let chatHistory: Content[] = [];

router.post("/", async (req: Request, res: Response) => {
  console.log("/api/openAI route request received.");
  if (!req.body) return;
  // Get up to date chat history
  chatHistory = req.body.history || [];
  await getPrompt(req.body.prompt);
  res.send({ chatHistory });
});

const getPrompt = async (prompt: string) => {
  try {
    // Setup chat bot
    if (!process.env.GEMINI_API_KEY)
      throw new Error("GEMINI_API_KEY not found in environment variables.");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat({ history: chatHistory });

    // message
    const result = await chat.sendMessage(prompt);
    console.log("chatbot response:", result.response.text());
  } catch (error) {
    console.error("Error fetching API:", error);
  }
};

export default router;
