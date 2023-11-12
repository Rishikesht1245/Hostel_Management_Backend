import { Model } from "mongoose";
import { CRUD } from "./CRUD";
import { INotice } from "../interfaces/chiefWarden";
import { NoticeModel } from "../models/notice";
import ErrorResponses from "../errors/ErrorResponse";

// all basic crud functionalities implementation using CRUD class
export abstract class NoticeRepo extends CRUD {
  model: Model<INotice> = NoticeModel;

  // All notices
  protected async findAllNotices(query?: object): Promise<INotice[] | []> {
    const notices = await this.findAll<INotice>(query);
    if (notices.length < 1) throw ErrorResponses.noDataFound("Notices");
    return notices;
  }

  // New Notice
  protected async postNewNotice(data: INotice): Promise<INotice> {
    return await this.create<INotice>(data);
  }

  // Get single notice
  protected async single(_id: string): Promise<INotice | null> {
    const notice = await this.findOne<INotice>({ _id });
    if (!notice) throw ErrorResponses.noDataFound("Notice");
    return notice;
  }

  // Update Notice
  protected async update(_id: string, data: Object) {
    const updatedNotice = await this.findByIdAndUpdate(_id, data);
    if (!updatedNotice) throw ErrorResponses.noDataFound("Notice");
    return updatedNotice;
  }

  //Delete a notice
  protected async removeNotice(_id: string) {
    const deletedNotice = await this.findByIdAndDelete({ _id });
    if (!deletedNotice) throw ErrorResponses.noDataFound("Notice");
    return deletedNotice;
  }
}
