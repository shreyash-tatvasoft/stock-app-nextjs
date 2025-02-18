import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/server/db/connectDB";
import { ApiResponse, JWT_SECRET_KEY } from "../../../common/constant";
import userModel from "../../../server/models/user";
import { serialize } from "cookie"
import { NextResponse } from "next/server";

export async function POST(request: Request, response : NextResponse) {
  const { email, password } = await request.json();

  const dbConnection = await connectDB();

  if (!dbConnection) {
    return ApiResponse(500, {
      type: "error",
      message: "Failed to connect server",
    });
  }

  try {
    if (email && password) {
      const user = await userModel.findOne({ email: email });
      if (user === null) {
        return ApiResponse(400, {
          type: "error",
          message: "Invalid details",
        });
      } else {
        const isPwdMatch = await bcrypt.compare(password, user.password);
        if (email === user.email && isPwdMatch) {
          const token = jwt.sign({ userID: user._id }, JWT_SECRET_KEY, {
            expiresIn: "1d",
          });

          const cookie = serialize("authToken", token, {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 24, // 1 week
            path: "/",
          })

          const response = NextResponse.json({
            type: "success", 
            message: "Login success", 
            token: token
          });
          response.headers.set("Set-Cookie", cookie);
          return response
        } else {
          return ApiResponse(400, {
            type: "error",
            message: "Email or Password is incorrect",
          });
        }
      }
    } else {
      return ApiResponse(400, {
        type: "error",
        message: "All fields are required",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
