// all services that a chef can do (Complex operations utilizing the ChefRepo class)
import { ChefRepo } from "../repositories/chef";
import { IMealPlan } from "../interfaces/staff";

export class ChefService extends ChefRepo {
  //  all Meal plans
  async allMealPlans(): Promise<IMealPlan[]> {
    return await this.findMealPlans();
  }

  //   all active meal Plans (with query)
  async showActivePlans(): Promise<IMealPlan[]> {
    return await this.findMealPlans({ active: true });
  }

  //adding a new meal plan
  async newMealPlan(data: IMealPlan) {
    return await this.createPlan(data);
  }

  // single meal plan
  async singleMealPlan(_id: string) {
    return await this.findMealPlan(_id);
  }

  //   updating meal plan
  async updateMealPlan(_id: string, data: any): Promise<IMealPlan> {
    return await this.update(_id, data);
  }

  // add students to meal plan
  async subscribe(_id: string): Promise<IMealPlan> {
    return await this.update(_id, { $inc: { subscribers: 1 } });
  }

  //   remove students from subscribers
  async unSubscribe(_id: string): Promise<IMealPlan> {
    return await this.update(_id, { $inc: { subscribers: -1 } });
  }

  // change activity of meal plan
  async changeActivity(_id: string): Promise<string> {
    const mealPlan = await this.findMealPlan(_id);
    mealPlan.active = !mealPlan.active;
    await this.update(_id, mealPlan);
    return `${mealPlan.title} plan made ${
      mealPlan.active ? "active" : "in-active"
    }`;
  }
}
