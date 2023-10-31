import { CRUD } from "./CRUD";
import { IMealPlan } from "../interfaces/staff";
import { MealPlanModel } from "../models/mealPlan";
import { Model } from "mongoose";
import ErrorResponses from "../errors/ErrorResponse";

export abstract class ChefRepo extends CRUD {
  // abstract property in the parent class
  public model: Model<IMealPlan> = MealPlanModel;

  //Basic crud operation with in the MealPlan collection

  // find all meal plans with optional filter
  protected async findMealPlans(filter?: Object, options?: Object) {
    const mealPlans = await this.findAll<IMealPlan>(filter, options);
    if (mealPlans.length === 0) throw ErrorResponses.noDataFound("Meal Plans");
    return mealPlans;
  }

  // create new Meal plan
  protected async createPlan(data: IMealPlan) {
    return await this.create<IMealPlan>(data);
  }

  // find single meal plan
  protected async findMealPlan(_id: string) {
    const mealPlan = await this.findOne<IMealPlan>({ _id });
    if (!mealPlan) throw ErrorResponses.noDataFound("Meal Plan");
    return mealPlan;
  }

  // update meal Plan : return promise only other wise throw error
  protected async update(_id: string, data: any) {
    const updatedMealPlan = await this.findByIdAndUpdate<IMealPlan>(_id, data);
    if (!updatedMealPlan) throw ErrorResponses.noDataFound("Updated Meal Plan");
    return updatedMealPlan;
  }
}
