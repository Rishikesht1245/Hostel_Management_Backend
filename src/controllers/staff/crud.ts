import asyncHandler from "express-async-handler";
import { RequestHandler } from "express";
import { dataFormatter } from "../../utils/jsonFormatter";
import { StaffService } from "../../services/staff";
import { cloudinary } from "../../utils/uploadImage";

//Staff Service
const staffService = new StaffService();

// update staff profile image
export const updateProfileImage: RequestHandler = asyncHandler(
  async (req, res) => {
    const { email } = req.tokenPayload!;
    const { profilePic } = req.body;
    const { url } = await cloudinary.uploader.upload(profilePic, {
      folder: "Hostel Management Project/staffs",
      format: "webp",
      unique_filename: true,
    });
    await staffService.updateStaff(email, { profilePic: url });
    res.status(200).json(dataFormatter(url));
  }
);
