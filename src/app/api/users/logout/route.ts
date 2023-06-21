import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const response = NextResponse.json({
      message: "Logout Successful",
      success: true,
      data: null,
    });

    // clear cookie on logout
    response.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
