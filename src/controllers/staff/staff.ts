import asyncHandler from "express-async-handler";
import { NoticeService } from "../../services/notice";
import { dataFormatter } from "../../utils/jsonFormatter";
import { ComplaintService } from "../../services/complaints";
import { StudentService } from "../../services/student";
import { BlockService } from "../../services/block";
import { RequestHandler } from "express";

const noticeService = new NoticeService();
const complaintService = new ComplaintService();
const studentService = new StudentService();
const blockService = new BlockService();

// all Notices for staff
export const notices: RequestHandler = asyncHandler(async (req, res) => {
  const staffNotices = await noticeService.staffNotices();
  res.json(dataFormatter(staffNotices));
});

// Statistics for dashboard
export const dashBoardStatistics: RequestHandler = asyncHandler(
  async (req, res) => {
    const complaintStatistics =
      await complaintService.complaintStatisticsByStaff(req.tokenPayload?._id!);

    const noticeForStaffs = await noticeService.staffNotices();
    const noticeStatistics = {
      title: "Notices",
      count: noticeForStaffs.filter(({ visibility }) => visibility).length,
      total: noticeForStaffs.length,
    };

    const hostelData = await blockService.hostelOccupancy();
    const occupancyStatistics = {
      title: "Occupancy",
      count: hostelData?.occupancy,
      total: hostelData?.availableRooms,
    };

    res.json(
      dataFormatter([
        occupancyStatistics,
        complaintStatistics,
        noticeStatistics,
      ])
    );
  }
);
