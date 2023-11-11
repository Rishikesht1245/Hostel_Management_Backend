import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { ComplaintService } from "../../services/complaints";
import { dataFormatter } from "../../utils/jsonFormatter";

// Complaint service
const complaintService = new ComplaintService();

// get all complaints assigned to the staff
export const complaints: RequestHandler = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const complaints = await complaintService.complaintsByStaff(
    req.tokenPayload._id,
    status && { status: status }
  );
  res.status(200).json(dataFormatter(complaints));
});

// Update remarks of complaint and status to approval
export const updateComplaint: RequestHandler = asyncHandler(
  async (req, res) => {
    const updatedComplaint = await complaintService.updateComplaint(
      req.params?._id,
      req.body
    );
    res.status(200).json(dataFormatter(updatedComplaint));
  }
);
