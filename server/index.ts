import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load env variables
dotenv.config();
import geminiRouter from "./routes/geminiRoute";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req: Request, res: Response) => {
  console.log("Root route request received.");
  res.send({ message: "Hello from the backend!" });
});

// Gemini route
app.use("/api/gemini", geminiRouter);

app.listen(port, () => {
  console.log("Server is running.");
});
