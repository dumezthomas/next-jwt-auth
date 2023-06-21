import nodemailer from "nodemailer";
import TokenModel, { emailTypeList } from "@/models/tokenModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType }: any) => {
  try {
    const token = await bcryptjs.hash(email, 10);

    const newToken = new TokenModel({
      email,
      token,
      emailType,
    });

    await newToken.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      auth: {
        user: process.env.auth_email,
        pass: process.env.auth_password,
      },
    });

    const mailOptions: any = {
      from: process.env.auth_email,
      to: email,
    };

    if (emailType === emailTypeList.emailVerification) {
      mailOptions.subject = "Email Verification";
      mailOptions.html = `
        <h1>Click on the link below to verify your email</h1>
        <a href="${process.env.domain}/verifyemail?token=${token}">Verify Email</a>
      `;
    } else {
      mailOptions.subject = "Reset Password";
      mailOptions.html = `
            <h1>Click on the link below to reset your password</h1>
            <a href="${process.env.domain}/resetpassword?token=${token}">Reset Password</a>
        `;
    }

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
