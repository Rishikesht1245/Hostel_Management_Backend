import { Router, Request, Response } from "express";
import { signUp, login } from "../controllers/chiefWarden/auth";

const chiefWarden = Router();

// test route
chiefWarden.get("/test", (req: Request, res: Response) => {
  res.send("chiefWarden route working");
});

//  -------------- CHIEF WARDEN ROUTES --------------- //

// signup : not needed in production
chiefWarden.post("/sign-up", signUp);
//login
chiefWarden.post("/auth", login);

export default chiefWarden;
