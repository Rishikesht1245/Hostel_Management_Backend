import { Router, Request, Response } from "express";

const chiefWarden = Router();

// test route
chiefWarden.get("/test", (req: Request, res: Response) => {
  res.send("chiefWarden route working");
});

export default chiefWarden;
