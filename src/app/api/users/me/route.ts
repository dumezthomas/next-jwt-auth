export const dynamic = "force-dynamic";

import { validateTokenAndGetUserEmail } from "@/helpers/tokenValidation";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import { connectDB } from "@/config/dbConfig";

connectDB();

export const GET = async (request: NextRequest) => {
  try {
    const userEmail = await validateTokenAndGetUserEmail(request);
    const user = await UserModel.findOne<IUser>({ email: userEmail }).select("-password");

    return NextResponse.json({
      message: "Users get request accessed successfully",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
