import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,   // my gmail id
    pass: process.env.APP_PASSWORD,   //  my gmail app password
  },
});

export default transporter;