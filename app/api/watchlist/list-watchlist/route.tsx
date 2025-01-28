import { connectDB } from "@/app/server/db/connectDB";
import { ApiResponse } from "../../../common/constant";
import watchListModel from "@/app/server/models/watchlist";

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


    const allData = await watchListModel.find()


    if (allData && allData.length > 0) {
      return ApiResponse(200, { type: "success", data: allData});
    } else {
      return ApiResponse(404, { type: "error", data: [] });
    }
  } catch (error) {
    console.log(error);
  }
}
