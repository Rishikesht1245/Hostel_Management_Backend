//  all the services that chief-warden can do on staffs
import { StaffRepo } from "../repositories/staff";
import ErrorResponses from "../errors/ErrorResponse";
import { IStaff, Department } from "../interfaces/staff";

export class StaffService extends StaffRepo {
  //get all staffs data
  async allStaffs(filter?: Object): Promise<IStaff[]> {
    const data = await this.allStaffsByFilter(filter);
    if (data.length === 0) throw ErrorResponses.noDataFound("Staffs Data");
    return data;
  }

  //Staffs by department
  async staffsByDepartment(department: Department): Promise<IStaff[]> {
    const data = await this.allStaffsByFilter({ role: department });
    if (data.length === 0) throw ErrorResponses.noDataFound("Staffs Data");
    return data;
  }

  //get single staff data
  async singleStaff(email: string): Promise<IStaff | null> {
    const staffData = await this.single(email);
    if (!staffData) throw ErrorResponses.noDataFound("Staff Data");
    return staffData;
  }

  //Update staff Details
  async updateStaff(email: string, data: any) {
    const updateStaff = await this.update(email, data);
    if (!updateStaff) throw ErrorResponses.noDataFound("Staff Data");
    return updateStaff;
  }
}
