import jwt from "jsonwebtoken";
import { connectDB } from "@/app/server/db/connectDB";
import { ApiResponse, JWT_SECRET_KEY } from "../../../common/constant";
import userModel from "../../../server/models/user";

export async function POST(request: Request) {
  const { email } = await request.json();

  const dbConnection = await connectDB();

  if (!dbConnection) {
    return ApiResponse(500, {
      type: "error",
      message: "Failed to connect server",
    });
  }

  try {
    if (email) {
      const user = await userModel.findOne({ email: email });
      if (user === null) {
        return ApiResponse(404, {
          type: "error",
          message: "Please enter valid Email.",
        });
      } else {
        const token = jwt.sign({ userID: user._id }, JWT_SECRET_KEY, {
          expiresIn: "1d",
        });
        return ApiResponse(200, {
          type: "success",
          message: "Redirect to reset page",
          token,
        });
      }
    } else {
      return ApiResponse(404, {
        type: "error",
        message: "Please provide valid email",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
