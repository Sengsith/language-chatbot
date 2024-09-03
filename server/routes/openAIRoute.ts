import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  console.log("/api/openAI route request received.");
  res.send({ message: "Hello from openAI!" });
});

export default router;
