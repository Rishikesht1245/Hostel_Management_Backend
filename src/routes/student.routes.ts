import { Router, Request, Response } from "express";
import { validate } from "../middlewares/validateBody";
import {
  loginSchema,
  newComplaintSchema,
  newPaymentSchema,
  resetPasswordSchema,
  studentAdmissionSchema,
  successfulPaymentSchema,
  updateProfileSchema,
} from "../utils/yupSchema";
import {
  login,
  newAdmission,
  resetPassword,
} from "../controllers/student/auth";
import { showActiveMealPlans } from "../controllers/staff/chef";
import { allBlocks } from "../controllers/chiefWarden/block";
import {
  mealPlans,
  mealPlan,
  updateMealPlan,
} from "../controllers/student/mealPlans";
import { checkAuth } from "../middlewares/verifyToken";
import {
  notices,
  singleStudent,
  updateProfileImage,
} from "../controllers/student/crud";
import { complaints, newComplaint } from "../controllers/student/complaints";
import {
  allPayments,
  initiatePayment,
  successfulPayment,
} from "../controllers/student/payment";
import { allChatMessages } from "../controllers/student/chat";

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
// get student data
student.route("/").get(singleStudent);

//---------------- reset password & update profile img ----------------- //
// reset password
student.patch("/auth", validate(resetPasswordSchema), resetPassword);

//update profile image
student.patch("/profile", validate(updateProfileSchema), updateProfileImage);

//  --------------------------- MEAL PLANS ---------------------------- //
student.route("/mealPlan").get(mealPlan).post(updateMealPlan);
student.route("/mealPlans").get(mealPlans);

//  --------------------------- COMPLAINTS ---------------------------- //
student
  .route("/complaints")
  .get(complaints)
  .post(validate(newComplaintSchema), newComplaint);

//  --------------------------- PAYMENTS ---------------------------- //
student
  .route("/payments")
  .get(allPayments)
  .patch(validate(newPaymentSchema), initiatePayment)
  .post(validate(successfulPaymentSchema), successfulPayment);

//  --------------------------- DASHBOARD ---------------------------- //
student.get("/notices", notices);

// ------------------------ CHATS ----------------------------- //
student.get("/chats", allChatMessages);

export default student;
