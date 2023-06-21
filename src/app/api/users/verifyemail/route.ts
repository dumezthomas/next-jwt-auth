import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import TokenModel from "@/models/tokenModel";
import { connectDB } from "@/config/dbConfig";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const token = reqBody.token;

    const tokenObj = await TokenModel.findOne<IToken>({ token });
    const userEmail = tokenObj?.email;
    await UserModel.updateOne<IUser>({ email: userEmail }, { isEmailVerified: true });

    return NextResponse.json({
      message: "Email verified successfully",
      data: null,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
