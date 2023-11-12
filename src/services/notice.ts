import { NoticeRepo } from "../repositories/notice";
import { INotice } from "../interfaces/chiefWarden";

//all the services that we can do with notices

export class NoticeService extends NoticeRepo {
  // Get all notices (without any query) for chief warden
  async allNotices() {
    return await this.findAllNotices();
  }

  // active notices
  async activeNotices() {
    return await this.findAllNotices({ visibility: true });
  }

  //   Notices for students
  async studentNotices() {
    return await this.findAllNotices({
      visibility: true,
      "audience.student": true,
    });
  }

  //   Notices for staffs
  async staffNotices() {
    return await this.findAllNotices({
      visibility: true,
      "audience.staff": true,
    });
  }

  //   Post new notice
  async newNotice(data: INotice) {
    return await this.postNewNotice(data);
  }

  //   Single notice
  async singleNotice(_id: string) {
    return await this.single(_id);
  }

  // Update notice
  async updateNotice(_id: string, data: INotice) {
    return await this.update(_id, data);
  }

  //show or hide a notice (visibility)
  async changeVisibility(_id: string, newVisibility: boolean) {
    return await this.update(_id, { visibility: newVisibility });
  }

  // Delete a notice
  async deleteNotice(_id: string) {
    return await this.removeNotice(_id);
  }
}
