import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { dataFormatter } from "../../utils/jsonFormatter";
import { NoticeService } from "../../services/notice";
import { StudentService } from "../../services/student";
import { StaffService } from "../../services/staff";
import { presetMailTemplates, sendEmail } from "../../utils/sendEmail";
import { title } from "process";

// Services
const noticeService = new NoticeService();
const studentService = new StudentService();
const staffService = new StaffService();

//  Get all notices
export const allNotices: RequestHandler = asyncHandler(async (req, res) => {
  const allNotices = await noticeService.allNotices();
  res.status(200).json(dataFormatter(allNotices));
});

// Get single notice
export const singleNotice: RequestHandler = asyncHandler(async (req, res) => {
  const singleNotice = await noticeService.singleNotice(req.params._id);
  res.status(200).json(dataFormatter(singleNotice));
});

// Post a new notice
export const postNewNotice: RequestHandler = asyncHandler(async (req, res) => {
  const { visibility, audience } = req.body;
  await noticeService.newNotice(req.body);
  // sending mails to students and staffs if the notice visibility is true
  if (visibility) {
    let email: string[] = [];
    if (audience.staff) {
      const staffEmails = await staffService.allStaffsEmail();
      email = email.concat(staffEmails);
    }
    if (audience.student) {
      const studentEmails = await studentService.allStudentsEmail();
      email = email.concat(studentEmails);
    }
    sendEmail(
      presetMailTemplates.newNotice(
        // converting array to comma separated string
        email.toString(),
        req.body.title,
        req.body.message
      )
    );

    res.json(dataFormatter("Notice posted successfully"));
  }
});

//  Update a notice
export const updateNotice: RequestHandler = asyncHandler(async (req, res) => {
  const { visibility, audience } = req.body;
  await noticeService.updateNotice(req.params._id, req.body);
  if (visibility) {
    let email: string[] = [];
    if (audience.staff) {
      const staffEmails = await staffService.allStaffsEmail();
      email = email.concat(staffEmails);
    }
    if (audience.student) {
      const studentEmails = await studentService.allStudentsEmail();
      email = email.concat(studentEmails);
    }
    sendEmail(
      presetMailTemplates.newNotice(
        email.toString(),
        req.body.title,
        req.body.message
      )
    );
  }
  res.json(dataFormatter("Notice updated successfully"));
});

// Change visibility
export const changeVisibility: RequestHandler = asyncHandler(
  async (req, res) => {
    const { audience } = req.body;
    // req.body.visibility contains the current state
    await noticeService.changeVisibility(req.params._id, !req.body.visibility);
    // visibility false (changed to true above)
    if (!req.body?.visibility) {
      let email: String[] = [];
      if (audience.staff) {
        const staffEmails = await staffService.allStaffsEmail();
        email = email.concat(staffEmails);
      }
      if (audience.student) {
        const studentEmails = await studentService.allStudentsEmail();
        email = email.concat(studentEmails);
      }
      sendEmail(
        presetMailTemplates.newNotice(
          email.toString(),
          req.body.title,
          req.body.message
        )
      );
    }
    res
      .status(200)
      .json(
        dataFormatter(
          `Notice updated ${!req.body.visibility ? "visible" : "hidden"}`
        )
      );
  }
);

// Delete Notice
export const deleteNotice: RequestHandler = asyncHandler(async (req, res) => {
  await noticeService.deleteNotice(req.params._id);
  res.json(dataFormatter("Notice deleted successfully"));
});

//  Notice statistics
export const noticeStatistics: RequestHandler = asyncHandler(
  async (req, res) => {
    const allNotices = await noticeService.allNotices();
    const activeNotices = await noticeService.activeNotices();
    res.json(dataFormatter([allNotices.length, activeNotices.length]));
  }
);
