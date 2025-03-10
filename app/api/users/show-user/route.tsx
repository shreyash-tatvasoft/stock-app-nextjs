import { connectDB } from "@/app/server/db/connectDB";
import { ApiResponse, getIDFromToken } from "../../../common/constant";
import userModel from "@/app/server/models/user";


export async function GET(request: Request) {
  const dbConnection = await connectDB();

  if (!dbConnection) {
    return ApiResponse(500, {
      type: "error",
      message: "Failed to connect server",
    });
  }

  try {
    const token = request.headers.get("token")
    if(!token) {
        return ApiResponse(404,{ type: "error", message: "Invalid User Details"})
    }

    const user_id = getIDFromToken(token)

    const allData = await userModel.findById(user_id).select("-password")

    if (allData && Object.keys(allData).length > 0) {
      return ApiResponse(200, { type: "success", data: allData});
    } else {
      return ApiResponse(404, { type: "error", data: [] });
    }
  } catch (error) {
    console.log(error);
  }
}
