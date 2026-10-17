
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async ({ email, subject, html }) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("SMTP_USER or SMTP_PASS is missing");
  }

  const info = await transport.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject,
    html,
  });

  console.log("Email sent successfully:", info.messageId);

  return info;
};
