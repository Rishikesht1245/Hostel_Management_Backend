import { Model } from "mongoose";
import { CRUD } from "./CRUD";
import {
  IComplaint,
  IComplaintInput,
  IComplaintPopulated,
} from "../interfaces/complaints";
import { ComplaintModel } from "../models/complaints";
import ErrorResponses from "../errors/ErrorResponse";

//complaint repository
export class ComplaintRepo extends CRUD {
  //abstract property in parent class (Model)
  model: Model<IComplaint> = ComplaintModel;

  //   New complaint
  async createComplaint(data: IComplaintInput) {
    // mention the generic return type (created data will be returned)
    return await this.create<IComplaint>(data);
  }

  //   All complaints
  async fetchAllComplaints(
    filter: Object = {}
  ): Promise<IComplaintPopulated[] | null> {
    const allComplaints = await this.findAndPopulate(filter, [
      { select: "name _id email", path: "student" },
      { select: "name _id email", path: "staff" },
    ]);
    if (allComplaints.length === 0)
      throw ErrorResponses.noDataFound("Complaints");
    // type alias is used here due to some error (missing properties)
    return allComplaints as IComplaintPopulated[];
  }
}
