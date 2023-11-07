import { config } from "dotenv";
// dotenv configuration
config();

import nodemailer from "nodemailer";
import { EmailTemplate } from "../interfaces/chiefWarden";

// send mail to users and staffs

export const sendEmail = ({
  subject,
  body,
  email,
}: {
  subject: string;
  body: string;
  email: string;
}) => {
  //creating transporter

  try {
    //creating transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.TRANSPORTER_USERNAME,
        pass: process.env.TRANSPORTER_PASSWORD,
      },
    });

    //   send email
    const mailOptions = {
      from: process.env.TRANSPORTER_USERNAME,
      to: email,
      subject: subject,
      html: body,
    };

    return transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Email not send :", error);
  }
};

export const presetMailTemplates = {
  //mail template while creating new staff
  newStaff(
    email: string,
    name: string,
    role: string,
    password: string
  ): EmailTemplate {
    return {
      email,
      subject: `Welcome, ${name} | Hostel`,
      body: `Greetings of the day,<br/>
      <br/>
      <b>Hi, ${name}</b>
      <br/>
      <p>Welcome to the School Hostel, </p>
      <br/>
      <p>You will be joining the ${role} team from today onwards.</p>
      <h4>Email: ${email}</h4>
      <h4>Password: ${password}</h4>
      <br/>    
      Please make sure you login to the school hostel portal and change your current password in the profile tab.
      <br/>
      <p>Best regards,<br/>
      Chief Warden</p>`,
    };
  },
};