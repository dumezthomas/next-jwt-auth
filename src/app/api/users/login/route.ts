import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import UserModel from "@/models/userModel";
import jwt from "jsonwebtoken";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    // check if user exists
    const user = await UserModel.findOne<IUser>({ email: reqBody.email });
    if (!user) {
      throw new Error("User does not exist");
    }

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(reqBody.password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Invalid Credentials");
    }

    // check if user has verified email
    if (!user.isEmailVerified) {
      throw new Error("Email not verified");
    }

    // return token
    const dataToEncrypt = {
      userName: user.userName,
      email: user.email,
    };

    const token = jwt.sign(dataToEncrypt, process.env.jwt_secret!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
      data: null,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
