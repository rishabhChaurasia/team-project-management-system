import nodemailer from "nodemailer";
import { config } from "../config/app.config";

const transporter = nodemailer.createTransport({
  host: config.EMAIL_HOST,
  port: parseInt(config.EMAIL_PORT),
  secure: parseInt(config.EMAIL_PORT) === 465,
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (
  email: string,
  otp: string,
  name: string
) => {
  const mailOptions = {
    from: `"TeamFlow" <${config.EMAIL_USER}>`,
    to: email,
    subject: "🔑 Password Reset OTP",
    text: `Hi ${name},\nYour OTP is: ${otp}\nThis OTP expires in 10 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: #f9fafb;">
        <h2 style="color: #111827; text-align: center;">Password Reset Request</h2>
        <p style="font-size: 14px; color: #374151;">Hi <strong>${name}</strong>,</p>
        <p style="font-size: 14px; color: #374151;">
          You requested to reset your password. Use the OTP below to complete the process:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #2563eb; background: #e0f2fe; padding: 12px 24px; border-radius: 8px; letter-spacing: 4px;">
            ${otp}
          </span>
        </div>
        <p style="font-size: 14px; color: #374151; text-align: center;">
          ⏳ This OTP will expire in <strong>10 minutes</strong>.
        </p>
        <p style="font-size: 12px; color: #6b7280; margin-top: 30px; text-align: center;">
          If you didn't request this, you can safely ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="font-size: 12px; color: #9ca3af; text-align: center;">
          &copy; ${new Date().getFullYear()} TeamFlow. All rights reserved.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};
