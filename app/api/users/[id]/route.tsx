import { connectDB } from "@/app/server/db/connectDB";
import { ApiResponse } from "@/app/common/constant";
import userModel from "@/app/server/models/user";

export async function GET(_request: Request, { params } : { params: {id : string}}) {
  const dbConnection = await connectDB();
  const { id } = await params

  if (!dbConnection) {
    return ApiResponse(500, {
      type: "error",
      message: "Failed to connect server",
    });
  }

  try {
    const allData = await userModel.findById({ _id : id}).select("-password");

    if (allData) {
      return ApiResponse(200, { type: "success", data: allData });
    } else {
      return ApiResponse(404, { type: "error", message : "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
  }
}
