import { Router, Request, Response } from "express";
import { signUp, login, resetPassword } from "../controllers/chiefWarden/auth";
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
  noticeSchema,
  staffSchema,
  updateComplaintSchema,
  updateStudentSchema,
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
import {
  allStudentsData,
  allStudentsEmail,
  paymentStatistics,
  updateSingleStudent,
} from "../controllers/chiefWarden/student";
import {
  allComplaints,
  complaintsByStaff,
  complaintsStatistics,
  singleComplaint,
  updateComplaint,
} from "../controllers/chiefWarden/complaints";
import {
  allNotices,
  changeVisibility,
  deleteNotice,
  noticeStatistics,
  postNewNotice,
  singleNotice,
  updateNotice,
} from "../controllers/chiefWarden/notice";
import { yearlyRevenue } from "../controllers/chiefWarden/payments";
import { allChatMessages } from "../controllers/chiefWarden/chat";

const chiefWarden = Router();

// test route
chiefWarden.get("/test", (req: Request, res: Response) => {
  res.send("chiefWarden route working");
});

//  ------------------------ AUTH ----------------------------- //

// signup : not needed in production
chiefWarden.post("/sign-up", signUp);
//login
chiefWarden.post("/auth", login);

// MIDDLEWARE TO VERIFY JWT AUTHENTICATION
chiefWarden.use(checkAuth("chief-warden"));

//reset password
chiefWarden.patch("/auth", resetPassword);

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

//staffs complaints ---- Pending, need complaints service to proceed with this - Dummy request handler
chiefWarden.get("/staffs/:_id", validate_id, complaintsByStaff);

// ------------------------- STUDENTS -----------------------------//
chiefWarden.get("/students/all", allStudentsData);
chiefWarden.get("/students/email", allStudentsEmail);
chiefWarden.get("/students/paymentStatus", paymentStatistics);
// update students approve student to resident and other updates
chiefWarden.patch(
  "/students/:_id",
  validate_id,
  validate(updateStudentSchema),
  updateSingleStudent
);

// ----------------------- COMPLAINTS --------------------------- //
chiefWarden.get("/complaints", allComplaints);
chiefWarden.get("/complaints/statistics", complaintsStatistics);
//Middleware to validate _id in params
chiefWarden.use("/complaints/:_id", validate_id);
// _id will be the id of complaint
chiefWarden
  .route("/complaints/:_id")
  .get(singleComplaint)
  .patch(validate(updateComplaintSchema), updateComplaint);

// ------------------------ NOTICES ----------------------------- //
chiefWarden.get("/notices/all", allNotices);
chiefWarden.get("/notices/statistics", noticeStatistics);
chiefWarden
  .route("/notices/:_id?")
  .get(validate_id, singleNotice)
  .post(validate(noticeSchema), postNewNotice)
  .put(validate(noticeSchema), updateNotice)
  .patch(validate_id, validate(noticeSchema), changeVisibility)
  .delete(validate_id, deleteNotice);

// ------------------------ PAYMENT ----------------------------- //
chiefWarden.get("/payments/yearlyRevenue", yearlyRevenue);

// ------------------------ CHAT ----------------------------- //
// chat by room
chiefWarden.get("/chats/:room", allChatMessages);

export default chiefWarden;
