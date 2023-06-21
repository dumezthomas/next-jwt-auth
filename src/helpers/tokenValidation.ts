import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const validateTokenAndGetUserEmail = async (request: NextRequest): Promise<string> => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.jwt_secret!);
    return decodedToken.email;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
