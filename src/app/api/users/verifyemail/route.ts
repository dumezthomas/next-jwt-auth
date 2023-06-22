import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import TokenModel from "@/models/tokenModel";
import { connectDB } from "@/config/dbConfig";
import { isTokenExpired } from "@/helpers/isTokenExpired";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const tokenBody = reqBody.token;

    const token = await TokenModel.findOne<IToken>({ token: tokenBody });
    if (!token) {
      throw new Error("Invalid link");
    }

    if (isTokenExpired(token)) {
      throw new Error("Link has expired");
    }

    await UserModel.updateOne<IUser>({ email: token.email }, { isEmailVerified: true });

    // delete token
    await TokenModel.deleteOne({ token: tokenBody });

    return NextResponse.json({
      message: "Email verified successfully",
      data: null,
    });
  } catch (error: any) {
    return NextResponse.json({ error, message: error.message }, { status: 500 });
  }
};
