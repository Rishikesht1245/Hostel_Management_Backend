import { Router, Request, Response } from "express";

const staff = Router();

// test route
staff.get("/test", (req: Request, res: Response) => {
  res.send("Staff route working");
});

export default staff;
