import { StaffService } from "../../services/staff";
import asyncHandler from "express-async-handler";
import { RequestHandler } from "express";
import { dataFormatter } from "../../utils/jsonFormatter";
// for creating staff
import { StaffAuth } from "../../repositories/staff";
import { presetMailTemplates, sendEmail } from "../../utils/sendEmail";
import { Department } from "../../interfaces/staff";

const staffService = new StaffService();
const staffAuth = new StaffAuth();

// new Staff
export const newStaff: RequestHandler = asyncHandler(async (req, res) => {
  const { email, name, role, password } = req.body;
  await staffAuth.signUp(req.body);
  await sendEmail(presetMailTemplates.newStaff(email, name, role, password));
  res.status(201).json(dataFormatter(`Created Successfully`));
});

// get all staffs by filter and search
export const allStaffsData: RequestHandler = asyncHandler(async (req, res) => {
  //   for filtering
  let filterObj;
  if (req.query) {
    // destructuring query
    filterObj = { ...req.query };

    for (const filter in filterObj) {
      //ensuring only name or role based query is there and filter property has a truthy value
      if (!filterObj[filter] || !/^(name|role)$/.test(filter))
        delete filterObj[filter];
    }

    if (filterObj.name) {
      // regex query for name
      filterObj.name = {
        $regex: filterObj.name,
        $options: "i",
      };
    }

    const allStaffsData = await staffService.allStaffs(filterObj);
    res.status(200).json(dataFormatter(allStaffsData));
  }
});

// staffs data by department
export const staffsByDept: RequestHandler = asyncHandler(async (req, res) => {
  const staffsData = await staffService.staffsByDepartment(
    req.params.department as Department
  );
  res.status(200).json(dataFormatter(staffsData));
});
