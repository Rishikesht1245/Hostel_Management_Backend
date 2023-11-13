import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { dataFormatter } from "../../utils/jsonFormatter";
import { StudentService } from "../../services/student";
import { presetMailTemplates, sendEmail } from "../../utils/sendEmail";
import { monthlyRentAmount, monthsArray } from "../../utils/utilityData";

// student services
const studentService = new StudentService();

//Get all students with status departed and resident
export const allStudents: RequestHandler = asyncHandler(async (req, res) => {
  // setting filterObj
  const filterObj = { ...req.query };
  for (const filter in filterObj) {
    if (!filterObj[filter] || /^(name|status)$/.test(filter))
      delete filterObj[filter];
  }
  //   wardens can handle only departed or resident students not pending or rejected students
  if (typeof filterObj?.status === "string")
    if (/^(departed|resident)$/.test(filterObj.status.toLocaleLowerCase()))
      delete filterObj.status;

  // regex for name
  if (filterObj.name) {
    filterObj.name = {
      $regex: filterObj.name,
      $options: "i",
    };
  }

  const allStudents = await studentService.allStudentsData(filterObj);
  res.json(dataFormatter(allStudents));
});

//  Update student payment amounts
export const updateStudentPayment: RequestHandler = asyncHandler(
  async (req, res) => {
    const { mealPlan, balancePayment } = await studentService.singleStudentById(
      req.params._id
    );

    //total bill amount to pay
    const billAmount =
      monthlyRentAmount +
      balancePayment +
      mealPlan.price +
      req.body.additionalAmount;

    //   Update the bill amount to student details
    const updatedStudent = await studentService.updateSingleStudent(
      req.params._id,
      {
        balancePayment: billAmount,
        lastBilledMonth: `${
          monthsArray[new Date().getMonth()]
        } ${new Date().getFullYear()}`,
      }
    );

    //     send email
    sendEmail(
      presetMailTemplates.monthlyPayment(
        updatedStudent.email,
        billAmount,
        balancePayment
      )
    );
    res.json(dataFormatter("Payment added successfully."));
  }
);
