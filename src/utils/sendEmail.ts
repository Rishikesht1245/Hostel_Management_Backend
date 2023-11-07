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
  // new student
  newAdmission(
    { name, email }: { name: string; email: string },
    roomCode: string
  ): EmailTemplate {
    return {
      email,
      subject: "Congratulations! You have been admitted to School Hostel",
      body: `Greetings of the day, ${name},<br/>
      Welcome to the hostel, The chief warden has verified your details and has alloted you to the hostel.
      <br/>
      <h4>Room No: ${roomCode}</h4>
      <h4>Please login to your account on the hostel portal using <b>${email}</b>.</h4>
      <p>Best regards,<br/>
      Chief Warden</p>`,
    };
  },
  roomUpdated(
    { name, email }: { name: string; email: string },
    roomCode: string
  ): EmailTemplate {
    return {
      email,
      subject: "Your room has been changed | School Hostel",
      body: `Greetings of the day, ${name},<br/>
      Your Room has been changed. Please move to the following room with your belongings.
      <h4>Room No: ${roomCode}</h4>
      <h4>Incase of any enquiry, Please login to your account on the hostel portal using <b>${email}</b>.</h4>
      <p>Best regards,<br/>
      Chief Warden</p>`,
    };
  },

  //rejected admission
  rejectedAdmission({
    name,
    email,
  }: {
    name: string;
    email: string;
  }): EmailTemplate {
    return {
      email,
      subject: `Admission request rejected | School Hostel`,
      body: `Greetings of the day, ${name},<br/>
      We are sorry to inform you that your request for accomodation in the school hostel has been rejected.
      <h4>Incase of any enquiry, Please get in touch with chief warden on hostel portal.</h4>
      <p>Best regards,<br/>
      Chief Warden</p>`,
    };
  },
  departedStudent({
    name,
    email,
  }: {
    name: string;
    email: string;
  }): EmailTemplate {
    return {
      email,
      subject: `Departing request approved | School Hostel`,
      body: `Greetings of the day, ${name},<br/>
        The chief warden has approved your request for departing from the hostel. Please take all your belongings and report to warden.
        <br/> You can no longer login in the school hostel portal.
        <h4>Incase of any enquiry, Please get in touch with chief warden on hostel portal.</h4>
        <p>Best regards,<br/>
        Chief Warden</p>`,
    };
  },
};
