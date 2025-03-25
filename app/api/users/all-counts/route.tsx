import { connectDB } from "@/app/server/db/connectDB";
import { ApiResponse, getIDFromToken } from "../../../common/constant";
import userModel from "@/app/server/models/user";
import watchListModel from "@/app/server/models/watchlist";
import stockModel from "@/app/server/models/stocks";

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
    const watchList = await watchListModel.find({ user : user_id })
    const watchListCount = watchList.length || 0
    const stocksDataCount = await stockModel.countDocuments()

    if (allData && Object.keys(allData).length > 0) {
      return ApiResponse(200, { type: "success", watchlist_count : watchListCount, stocks_count : stocksDataCount, purchased_stock_count : 0});
    } else {
      return ApiResponse(404, { type: "error", watchlist_count : 0, stocks_count : 0, purchased_stock_count : 0 });
    }
  } catch (error) {
    console.log(error);
  }
}
