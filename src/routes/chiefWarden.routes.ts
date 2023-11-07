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
import {
  mealPlanSchema,
  newBlockSchema,
  staffSchema,
} from "../utils/yupSchema";
import { validate_id } from "../middlewares/validateParams";
import {
  allBlocks,
  availableRooms,
  blockData,
  checkRoomAvailability,
  deleteBlock,
  hostelOccupancy,
  newBlock,
  updateRoom,
} from "../controllers/chiefWarden/block";
import {
  allStaffsData,
  newStaff,
  staffsByDept,
} from "../controllers/chiefWarden/staff";

const chiefWarden = Router();

// test route
chiefWarden.get("/test", (req: Request, res: Response) => {
  res.send("chiefWarden route working");
});

//  ------------------ CHIEF WARDEN ROUTES --------------------- //

// signup : not needed in production
chiefWarden.post("/sign-up", signUp);
//login
chiefWarden.post("/auth", login);

// MIDDLEWARE TO VERIFY JWT AUTHENTICATION
chiefWarden.use(checkAuth("chief-warden"));

// ---------------------- Meal Plans -------------------------- //
chiefWarden
  .route("/mealPlans/:_id?")
  .get(allMealPlans)
  .post(validate(mealPlanSchema), newMealPlan)
  .put(validate_id, validate(mealPlanSchema), updateMealPlan)
  .patch(validate_id, changeActivity);

// ------------------- Blocks and Rooms ---------------------- //
chiefWarden.get("/blocks/rooms/availability/:roomCode", checkRoomAvailability);
//available rooms in block
chiefWarden.get("/blocks/rooms/availableRooms/:_id", availableRooms);
//block data
chiefWarden.get("/blocks/name/:name", blockData);
chiefWarden.get("/blocks/occupancyStatistics", hostelOccupancy);
//  these set of routes should be placed below other wise hostel occupancy route won't work
chiefWarden
  .route("/blocks/:_id?")
  .get(allBlocks)
  .post(validate(newBlockSchema), newBlock)
  //update function pending
  .patch(validate_id, updateRoom)
  .delete(validate_id, deleteBlock);

// ------------------------ STAFFS ---------------------------//
chiefWarden
  .route("/staffs")
  .get(allStaffsData)
  .post(validate(staffSchema), newStaff);
// staffs by department
chiefWarden.get("/staffs/department/:department", staffsByDept);

export default chiefWarden;
