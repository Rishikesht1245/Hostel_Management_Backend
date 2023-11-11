import { StudentService } from "../../services/student";
import asyncHandler from "express-async-handler";
import { RequestHandler } from "express";
import { dataFormatter } from "../../utils/jsonFormatter";
import { ChefService } from "../../services/chef";

// Services
const studentService = new StudentService();
const chefService = new ChefService();

// selected meal plan
export const mealPlan: RequestHandler = asyncHandler(async (req, res) => {
  const studentData = await studentService.singleStudentById(
    req.tokenPayload._id
  );
  res.status(200).json(dataFormatter(studentData?.mealPlan));
});

// Get all meal plans
export const mealPlans: RequestHandler = asyncHandler(async (req, res) => {
  const mealPlans = await chefService.showActivePlans();
  res.status(200).json(dataFormatter(mealPlans));
});

// update meal plan
export const updateMealPlan: RequestHandler = asyncHandler(async (req, res) => {
  const { _id } = req?.tokenPayload!;
  const updatedMealPlan = await studentService.updateSingleStudent(_id, {
    mealPlan: req.body.mealPlan,
  });
  res.json(dataFormatter(updatedMealPlan));
});
