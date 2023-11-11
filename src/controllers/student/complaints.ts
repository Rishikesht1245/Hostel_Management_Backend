import asyncHandler from "express-async-handler";
import { RequestHandler } from "express";
import { dataFormatter } from "../../utils/jsonFormatter";
import { ComplaintService } from "../../services/complaints";
import { presetMailTemplates, sendEmail } from "../../utils/sendEmail";

// complaint service
const complaintService = new ComplaintService();

// Post new complaint
export const newComplaint: RequestHandler = asyncHandler(async (req, res) => {
  // adding student id to body
  req.body.student = req.tokenPayload?._id;
  const data = await complaintService.newComplaint(req.body);
  sendEmail(
    presetMailTemplates.newComplaint(req.tokenPayload?.email, data._id)
  );
  res.status(201).json(dataFormatter("Complaint raised successfully"));
});

// All complaints
export const complaints: RequestHandler = asyncHandler(async (req, res) => {
  const filterObj = { ...req.query };
  for (const filter in filterObj) {
    // only allowing status based filters
    if (!filterObj[filter] || filter !== "status") delete filterObj[filter];
  }
  const allComplaints = await complaintService.complaintsBySingleStudent(
    req.tokenPayload?._id!,
    filterObj
  );
  res.status(200).json(dataFormatter(allComplaints));
});
