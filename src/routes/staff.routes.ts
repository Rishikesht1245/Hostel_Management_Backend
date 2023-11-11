import { Router, Request, Response } from "express";
import { validate } from "../middlewares/validateBody";
import {
  loginSchema,
  mealPlanSchema,
  resetPasswordSchema,
  updateComplaintByStaff,
  updateComplaintSchema,
  updateProfileSchema,
} from "../utils/yupSchema";
import { login, resetPassword } from "../controllers/staff/auth";
import { checkAuth } from "../middlewares/verifyToken";
import { validateStaffRole } from "../middlewares/validateStaffDepartment";
import {
  allMealPlans,
  changeActivity,
  newMealPlan,
  showActiveMealPlans,
  singleMealPlan,
  updateMealPlan,
} from "../controllers/staff/chef";
import { validate_id } from "../middlewares/validateParams";
import {
  allBlocksData,
  blockData,
  changeRoomAvailability,
} from "../controllers/staff/maintenance";
import { updateProfileImage } from "../controllers/staff/crud";
import { complaints, updateComplaint } from "../controllers/staff/complaints";

const staff = Router();

// test route
staff.get("/test", (req: Request, res: Response) => {
  res.send("Staff route working");
});

// --------------------------- AUTH -----------------------------//

// staff login : with validation middleware using yup library
staff.route("/auth").post(validate(loginSchema), login);

// MIDDLEWARE TO VERIFY JWT AUTHENTICATION : will work for all the below routes
staff.use(checkAuth("staff"));

//Reset password
staff.patch("/auth", validate(resetPasswordSchema), resetPassword);

// change profile pic
staff.patch("/profile", validate(updateProfileSchema), updateProfileImage);

// --------------------------- CHEF ----------------------------//
// MIDDLEWARE TO VERIFY  JWT AUTHENTICATION AND CHEF ROLE
staff.use("/meals", validateStaffRole("chef"));

staff.route("/meals/all").get(allMealPlans);
staff.route("/meals/activePlans").get(showActiveMealPlans);

// ? optional
staff
  .route("/meals/:_id?")
  .get(validate_id, singleMealPlan)
  .post(validate(mealPlanSchema), newMealPlan)
  .put(validate_id, validate(mealPlanSchema), updateMealPlan)
  .patch(validate_id, changeActivity);

// ---------------------- MAINTENANCE -------------------------- //

// MIDDLEWARE TO VERIFY THE STAFF IS FROM MAINTENANCE DEPARTMENT
staff.use("/maintenance", validateStaffRole("maintenance"));

staff.route("/maintenance").get(allBlocksData);
staff.route("/maintenance/room/:code").patch(changeRoomAvailability);
//  single block data
staff.route("/maintenance/:name").get(blockData);

// ----------------------- COMPLAINTS ------------------------- //
// fetch all complaints assigned to staff and update (only status to approval and remarks updates)
staff
  .route("/complaints/:_id?")
  .get(complaints)
  .patch(validate_id, validate(updateComplaintByStaff), updateComplaint);

export default staff;
