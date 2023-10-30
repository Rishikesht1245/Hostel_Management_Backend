import { Router, Request, Response } from "express";
import { validate } from "../middlewares/validateBody";
import { loginSchema } from "../utils/yupSchema";
import { login, newStaff } from "../controllers/staff/auth";

const staff = Router();

// test route
staff.get("/test", (req: Request, res: Response) => {
  res.send("Staff route working");
});

// staff login : with validation middleware using yup library
staff.route("/auth").post(validate(loginSchema), login);

// new staff creation function will be there in chief-warden routes (since warden creates staff)
// for development only
staff.post("/newStaff", newStaff);

export default staff;
