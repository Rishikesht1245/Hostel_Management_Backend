import { Router, Request, Response } from "express";
import { validate } from "../middlewares/validateBody";
import { loginSchema, studentAdmissionSchema } from "../utils/yupSchema";
import { login, newAdmission } from "../controllers/student/auth";
import { showActiveMealPlans } from "../controllers/staff/chef";
import { allBlocks } from "../controllers/chiefWarden/block";
import {
  mealPlans,
  mealPlan,
  updateMealPlan,
} from "../controllers/student/mealPlans";
import { checkAuth } from "../middlewares/verifyToken";

const student = Router();

// test route
student.get("/test", (req: Request, res: Response) => {
  res.send("Student route working");
});

// ------------------------------- AUTH -------------------------------- //
// login
student.route("/auth").post(validate(loginSchema), login);

// sign up | new Admission
student.route("/newAdmission/mealPlans").get(showActiveMealPlans);
student.route("/newAdmission/blocks").get(allBlocks);
student
  .route("/newAdmission")
  .post(validate(studentAdmissionSchema), newAdmission);

// ---------------- Middleware to verify JWT Token-----------------------//

student.use(checkAuth("student"));

//  --------------------------- MEAL PLANS ---------------------------- //
student.route("/mealPlan").get(mealPlan).post(updateMealPlan);
student.route("/mealPlans").get(mealPlans);

export default student;
