import {
  IComplaint,
  IComplaintInput,
  IComplaintPopulated,
} from "../interfaces/complaints";
import ErrorResponses from "../errors/ErrorResponse";
import { ComplaintRepo } from "../repositories/complaints";

// Complaint service
export class ComplaintService extends ComplaintRepo {
  // New Complaint
  async newComplaint(data: IComplaintInput) {
    return await this.createComplaint(data);
  }

  // Update complaint
  async updateComplaint(_id: string, data: any) {
    if (
      //we can't update the status to initiated or from oldStatus of rejected or resolved to any other status
      data.status === "initiated" ||
      data.oldStatus === "rejected" ||
      data.oldStatus === "resolved"
    )
      throw ErrorResponses.customError("Invalid Status");
    console.log("reached");

    const updatedComplaint = await this.findByIdAndUpdate<IComplaintInput>(
      _id,
      data
    );

    if (!updatedComplaint) throw ErrorResponses.noDataFound("Complaints");
    console.log(updatedComplaint);
    return updatedComplaint;
  }

  //   Complaints for single staff
  async complaintsByStaff(_id: string, filter?: Object) {
    return await this.fetchAllComplaints({ ...filter, staff: _id } as Object);
  }

  //complaint statistics of single staff
  async complaintStatisticsByStaff(staff: string) {
    try {
      const allComplaints = await this.fetchAllComplaints({ staff });
      const resolvedComplaints = allComplaints?.filter(
        ({ status }) => status === "resolved"
      ).length;

      return {
        title: "Complaints",
        count: resolvedComplaints,
        total: allComplaints?.length,
      };
    } catch (error) {
      return {
        title: "Complaints",
        count: 0,
        total: 0,
      };
    }
  }

  //   Complaints for single student
  async complaintsBySingleStudent(_id: string, status: Object = {}) {
    return await this.fetchAllComplaints({ student: _id, ...status });
  }

  //single complaint
  async getSingleComplaint(_id: string): Promise<IComplaintPopulated> {
    const singleComplaint = await this.findOneAndPopulate({ _id }, [
      { path: "student", select: "email" },
      { path: "staff", select: "email name" },
    ]);
    if (!singleComplaint) throw ErrorResponses.noDataFound("complaint");
    return singleComplaint;
  }

  //   Complaint statistics for chief warden
  async statistics() {
    try {
      const allComplaints = await this.fetchAllComplaints();
      const resolvedComplaints = allComplaints?.filter(
        ({ status }) => status === "resolved"
      ).length;

      return {
        title: "Complaints",
        count: resolvedComplaints,
        total: allComplaints?.length,
      };
    } catch (error) {
      return {
        title: "Complaints",
        count: 0,
        total: 0,
      };
    }
  }
}
