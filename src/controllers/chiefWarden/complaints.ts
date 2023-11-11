import asyncHandler from "express-async-handler";
import { ComplaintService } from "../../services/complaints";
import { dataFormatter } from "../../utils/jsonFormatter";
import { RequestHandler } from "express";
import { presetMailTemplates, sendEmail } from "../../utils/sendEmail";

//Service - complaints
const complaintService = new ComplaintService();

//Fetch all complaints with filter
export const allComplaints: RequestHandler = asyncHandler(async (req, res) => {
  const filterObj = { ...req.query };
  for (const filter in filterObj) {
    if (!filterObj[filter] || filter !== "status") delete filterObj[filter];
  }
  const allComplaints = await complaintService.fetchAllComplaints(filterObj);
  res.status(200).json(dataFormatter(allComplaints));
});

// Fetch single complaint
export const singleComplaint: RequestHandler = asyncHandler(
  async (req, res) => {
    const singleComplaint = await complaintService.getSingleComplaint(
      req?.params?._id
    );
    res.status(200).json(dataFormatter(singleComplaint));
  }
);

// Update complaint
export const updateComplaint: RequestHandler = asyncHandler(
  async (req, res) => {
    const updatedComplaint = await complaintService.updateComplaint(
      req.params._id,
      req.body
    );
    //     student and staff details for sending mail
    const { student, staff } = await complaintService.getSingleComplaint(
      req.params._id
    );
    // send email to student
    sendEmail(
      presetMailTemplates.complaintUpdate(
        student.email,
        req.params._id,
        updatedComplaint.status,
        staff
      )
    );

    res.status(200).json(dataFormatter(updatedComplaint));
  }
);

// Complaints by staff : In staffs page in CW (count of total and resolved complaints)
export const complaintsByStaff: RequestHandler = asyncHandler(
  async (req, res) => {
    const complaintsByStaff = await complaintService.complaintStatisticsByStaff(
      req.params._id
    );
    res.json(dataFormatter(complaintsByStaff));
  }
);

//  Complaints statistics (all complaints resolved count)
export const complaintsStatistics: RequestHandler = asyncHandler(
  async (req, res) => {
    const complaintStatistics = await complaintService.statistics();
    res.json(dataFormatter(complaintStatistics));
  }
);
