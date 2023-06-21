import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import UserModel from "@/models/userModel";
import { emailTypeList } from "@/models/tokenModel";
import { sendEmail } from "@/helpers/sendEmail";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    // check if user already exists
    const user = await UserModel.findOne<IUser>({ email: reqBody.email });
    if (user) {
      throw new Error("User already exists");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(reqBody.password, 10);
    reqBody.password = hashedPassword;

    // create user
    const newUser = new UserModel(reqBody);
    await newUser.save();

    // send email verification
    await sendEmail({
      email: newUser.email,
      emailType: emailTypeList.emailVerification,
    });

    return NextResponse.json({
      message: "User Registered Successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
