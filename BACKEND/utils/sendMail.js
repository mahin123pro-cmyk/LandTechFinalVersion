
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ email, subject, html }) => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is missing");
  }

  const { data, error } = await resend.emails.send({
    from: "LandTech <onboarding@resend.dev>",
    to: [email],
    subject,
    html,
  });

  if (error) {
    console.error("RESEND ERROR:", error);
    throw new Error(error.message || "Email sending failed");
  }

  console.log("Email sent:", data?.id);
  return data;
};
