import { ApiResponse, getIDFromToken } from "../../../common/constant";
import { connectDB } from "@/app/server/db/connectDB";
import watchListModel from "@/app/server/models/watchlist";

export async function DELETE(request: Request) {
  const dbConnection = await connectDB();

  if (!dbConnection) {
    return ApiResponse(500, {
      type: "error",
      message: "Failed to connect server",
    });
  }

  try {
    const { watchlist_id } = await request.json();
    const token = request.headers.get("token");

    if (token) {
      const user_id = getIDFromToken(token);
      const watchListExist = await watchListModel.findOne({
        _id: watchlist_id,
        user: user_id,
      });
      if (watchListExist) {
        await watchListModel.findByIdAndDelete(watchlist_id);
        return ApiResponse(200, {
          type: "success",
          message: "Stock is deleted from watchlist",
        });
      } else {
        return ApiResponse(404, {
          type: "error",
          message: "Stock not found in wishlist",
        });
      }
    } else {
      return ApiResponse(404, {
        type: "error",
        message: "Invalid User Details",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
