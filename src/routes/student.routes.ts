import { Router, Request, Response } from "express";

const student = Router();

// test route
student.get("/test", (req: Request, res: Response) => {
  res.send("Student route working");
});

export default student;
