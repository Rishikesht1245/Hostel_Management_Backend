import asyncHandler from "express-async-handler";
import { RequestHandler } from "express";
import { dataFormatter } from "../../utils/jsonFormatter";
import { cloudinary } from "../../utils/uploadImage";
import { StudentService } from "../../services/student";
import { NoticeService } from "../../services/notice";

// services
const studentService = new StudentService();
const noticeService = new NoticeService();

//Update profile image
export const updateProfileImage = asyncHandler(async (req, res) => {
  const { _id } = req.tokenPayload!;
  const { profilePic } = req.body;

  const { url } = await cloudinary.uploader.upload(profilePic, {
    folder: "Hostel Management Project/staffs",
    format: "webp",
    unique_filename: true,
  });

  await studentService.updateSingleStudent(_id, { profilePic: url });
  res.json(dataFormatter(url));
});

//  Get single student
export const singleStudent: RequestHandler = asyncHandler(async (req, res) => {
  const studentData = await studentService.singleStudentById(
    req.tokenPayload?._id!
  );
  res.status(200).json(dataFormatter(studentData));
});

//  Notices for students
export const notices: RequestHandler = asyncHandler(async (req, res) => {
  const studentNotices = await noticeService.studentNotices();
  res.json(dataFormatter(studentNotices));
});
