import { Router, Request, Response } from "express";
import { validate } from "../middlewares/validateBody";
import { loginSchema, studentAdmissionSchema } from "../utils/yupSchema";
import { login, newAdmission } from "../controllers/student/auth";

const student = Router();

// test route
student.get("/test", (req: Request, res: Response) => {
  res.send("Student route working");
});

// login
student.route("/auth").post(validate(loginSchema), login);

// sign up | new Admission
student.route("newAdmission/mealPlans");
student.route("newAdmission/blocks");
student
  .route("/newAdmission")
  .post(validate(studentAdmissionSchema), newAdmission);

export default student;
