import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connectDB } from "@/app/server/db/connectDB";
import { ApiResponse, JWT_SECRET_KEY } from "../../../common/constant";
import userModel from "../../../server/models/user";

export async function PATCH(request: Request) {
  const { new_password } = await request.json();
  const token = request.headers.get("token");

  const dbConnection = await connectDB();

  if (!dbConnection) {
    return ApiResponse(500, {
      type: "error",
      message: "Failed to connect server",
    });
  }

  try {
    if (token) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(new_password, salt);
      const userObj: JwtPayload | string = jwt.verify(token, JWT_SECRET_KEY);

      let userId = ""
      if (typeof userObj !== "string" && userObj && userObj.userID) {
           userId = userObj.userID;
          }
          await userModel.findByIdAndUpdate(
            { _id: userId },
            { password: hashPassword }
          );
          return ApiResponse(200, {
        type: "success",
        message: "Password updated succefully",
      });
    } else {
      return ApiResponse(404, {
        type: "error",
        message: "Invalid Information",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
