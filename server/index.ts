import express, { Request, Response } from "express";
import cors from "cors";
import openAIRouter from "./routes/openAIRoute";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

//Root route
app.get("/", (req: Request, res: Response) => {
  console.log("Root route request received.");
  res.send({ message: "Hello from the backend!" });
});

app.use("/api/openAI", openAIRouter);

app.listen(port, () => {
  console.log("Server is running.");
});
