import asyncHandler from "express-async-handler";
import { RequestHandler } from "express";
import { dataFormatter } from "../../utils/jsonFormatter";
import { StudentService } from "../../services/student";
import { BlockService } from "../../services/block";
import ErrorResponses from "../../errors/ErrorResponse";
import { StudentStatus } from "../../interfaces/student";
import { presetMailTemplates, sendEmail } from "../../utils/sendEmail";
import { ChefService } from "../../services/chef";

// services
const studentService = new StudentService();
const roomService = new BlockService();
const chefService = new ChefService();

// get all students data
export const allStudentsData: RequestHandler = asyncHandler(
  async (req, res) => {
    // refactoring query
    let filterObj;
    if (req.query) {
      filterObj = { ...req.query };
      for (const filter in filterObj) {
        //ensuring only name and status keys are present in filterObj
        if (!filterObj[filter] || !/^(name|status)$/.test(filter))
          delete filterObj[filter];
      }
      if (filterObj.name) {
        filterObj.name = { $regex: filterObj.name, options: "i" };
      }
    }
    const allStudentsData = await studentService.allStudentsData(filterObj);
    res.status(200).json(dataFormatter(allStudentsData));
  }
);

//  fetch all students email addresses
export const allStudentsEmail: RequestHandler = asyncHandler(
  async (req, res) => {
    const allEmails = await studentService.allStudentsEmail();
    res.status(200).json(dataFormatter(allEmails));
  }
);

// Payment statistics of all students
export const paymentStatistics: RequestHandler = asyncHandler(
  async (req, res) => {
    const paymentStatistics = await studentService.paymentStatistics();
    res.status(200).json(dataFormatter(paymentStatistics));
  }
);

//   Update single student room and status (pending to resident after signup)
export const updateSingleStudent: RequestHandler = asyncHandler(
  async (req, res) => {
    switch (req.body.status as StudentStatus) {
      case "resident":
        if (
          req.body.oldStatus === "pending" ||
          req.body.oldStatus === "resident"
        ) {
          // allotting new student to the room (pending to resident)
          if (req.body.oldStatus === "pending") {
            await roomService.allotRoom(req.body.room, req.params._id);
            // subscribing to the meal plan (_id as req.body.student.mealPlan)
            await chefService.subscribe(req.body.student.mealPlan);
            sendEmail(
              presetMailTemplates.newAdmission(req.body.student, req.body.room)
            );
          }
          //reassigning new room to the student
          if (req.body.oldStatus === "resident") {
            // checking availability , vacate room and allot the new room
            await roomService.reassignStudent(req.body.oldRoom, req.body.room);
            sendEmail(
              presetMailTemplates.roomUpdated(req.body.student, req.body.room)
            );
          }
          //update the student details
          await studentService.updateSingleStudent(req.params._id, req.body);
        } else {
          throw ErrorResponses.customError(
            "Student must be pending or resident"
          );
        }
        break;
      case "rejected":
        if (req.body.oldStatus === "pending") {
          // making the student rejected
          await studentService.updateSingleStudent(req.params._id, req.body);
          sendEmail(presetMailTemplates.rejectedAdmission(req.body.student));
        } else {
          throw ErrorResponses.customError(
            "Only pending students can be rejected"
          );
        }
        break;
      case "departed":
        // only resident students can be departed
        if (req.body.oldStatus === "resident") {
          // vacate room
          await roomService.vacateRoom(req.body.oldRoom);
          //     delete room details to update in DB
          delete req.body.room;
          //unsubscribe meal plan -- reduce count
          await chefService.unSubscribe(req.body.student.mealPlan);
          //update
          await studentService.updateSingleStudent(req.params._id, req.body);
          sendEmail(presetMailTemplates.departedStudent(req.body.student));
        } else {
          throw ErrorResponses.customError(
            "Only resident students can be departed"
          );
        }
        break;
      case "pending" || "default":
        throw ErrorResponses.customError("Change status from default");
    }
    res.status(200).json(dataFormatter("Student updated"));
  }
);
