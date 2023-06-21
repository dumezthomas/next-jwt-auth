import { sendEmail } from "@/helpers/sendEmail";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import TokenModel, { emailTypeList } from "@/models/tokenModel";
import bcrypt from "bcryptjs";
import { connectDB } from "@/config/dbConfig";

connectDB();

// for sending password reset link to email
export const POST = async (request: NextRequest) => {
  try {
    const { email } = await request.json();
    const user = await UserModel.findOne<IUser>({ email });
    if (!user) throw new Error("User with this email does not exist");

    await sendEmail({
      email: user.email,
      emailType: emailTypeList.resetPassword,
    });

    return NextResponse.json(
      { message: "Password reset link sent to your email" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error, message: error.message }, { status: 500 });
  }
};

// for resetting password
export const PUT = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const token = reqBody.token;
    const tokenObj = await TokenModel.findOne<IToken>({ token });
    if (!tokenObj) throw new Error("Invalid or expired password reset token");

    const email = tokenObj.email;

    // hash password
    const hashedPassword = await bcrypt.hash(reqBody.password, 10);

    await UserModel.findOneAndUpdate<IUser>({ email }, { password: hashedPassword });

    return NextResponse.json({ message: "Password reset successful" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error, message: error.message }, { status: 500 });
  }
};
