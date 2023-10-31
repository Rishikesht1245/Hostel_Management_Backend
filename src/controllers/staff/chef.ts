import asyncHandler from "express-async-handler";
import { RequestHandler } from "express";
import { dataFormatter } from "../../utils/jsonFormatter";
import { ChefService } from "../../services/chef";

const service = new ChefService();

//  All meal plans
export const allMealPlans: RequestHandler = asyncHandler(async (req, res) => {
  const allMealPlans = await service.allMealPlans();
  res.status(200).json(dataFormatter(allMealPlans));
});

// Get Active meal plans
export const showActiveMealPlans: RequestHandler = asyncHandler(
  async (req, res) => {
    const activeMealPlans = await service.showActivePlans();
    res.status(200).json(dataFormatter(activeMealPlans));
  }
);

// creating new meal plan
export const newMealPlan: RequestHandler = asyncHandler(async (req, res) => {
  await service.newMealPlan(req.body);
  res
    .status(201)
    .json(dataFormatter(`${req.body.title} plan created successfully`));
});

//  single meal plan details
export const singleMealPlan: RequestHandler = asyncHandler(async (req, res) => {
  const mealPlan = await service.singleMealPlan(req.params._id);
  res.status(200).json(dataFormatter(mealPlan));
});

// updating existing meal plan data
export const updateMealPlan: RequestHandler = asyncHandler(async (req, res) => {
  await service.updateMealPlan(req.params._id, req.body);
  res
    .status(200)
    .json(dataFormatter(`${req.body.title} plan updated successfully`));
});

// change activity
export const changeActivity: RequestHandler = asyncHandler(async (req, res) => {
  const mealAvailability = await service.changeActivity(req.params._id);
  res.status(200).json(dataFormatter(mealAvailability));
});
