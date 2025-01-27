import { ApiResponse, JWT_SECRET_KEY } from "../../../common/constant";
import userModel from "../../../server/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/server/db/connectDB";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  const dbConnection =  await connectDB()

  if(!dbConnection) {
    return ApiResponse(500,{ type: "error", message: "Failed to connect server"})
  }

  const user = await userModel.findOne({ email: email });
  if (user) {
    return ApiResponse(400,{ type: "error", message: "Email already exist"})
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const doc = new userModel({
        name: name,
        email: email,
        password: hashPassword,
      });

      await doc.save();
      const savedUser = await userModel.findOne({ email: email }).select("-password")
      if (savedUser) {
        const token = jwt.sign({ userID: savedUser._id }, JWT_SECRET_KEY, {
          expiresIn: "1d",
        });
        return ApiResponse(201,{ data: savedUser, token})
      }
    } catch (error) {
      console.log(error);
    }
  }
}
