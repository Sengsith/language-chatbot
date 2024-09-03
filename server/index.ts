import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

//Root route
app.get("/", (req: Request, res: Response) => {
  console.log("Root route request received.");
  res.send({ message: "Hello from the backend!" });
});

app.listen(port, () => {
  console.log("Server is running.");
});
