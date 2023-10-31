import { Router, Request, Response } from "express";
import { signUp, login } from "../controllers/chiefWarden/auth";
import { checkAuth } from "../middlewares/verifyToken";
import {
  allMealPlans,
  changeActivity,
  newMealPlan,
  updateMealPlan,
} from "../controllers/staff/chef";
import { validate } from "../middlewares/validateBody";
import { mealPlanSchema } from "../utils/yupSchema";
import { validate_id } from "../middlewares/validateParams";

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

// MIDDLEWARE TO VERIFY JWT AUTHENTICATION
chiefWarden.use(checkAuth("chief-warden"));

// ------ Meal Plans --------- //
chiefWarden
  .route("/mealPlans/:_id?")
  .get(allMealPlans)
  .post(validate(mealPlanSchema), newMealPlan)
  .put(validate_id, validate(mealPlanSchema), updateMealPlan)
  .patch(validate_id, changeActivity);

export default chiefWarden;
