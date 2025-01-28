import { connectDB } from "@/app/server/db/connectDB";
import { ApiResponse } from "../../../common/constant";
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
    const allData = await stockModel.find()

    if (allData.length > 0) {
      return ApiResponse(200, { type: "success", data: allData });
    } else {
      return ApiResponse(404, { type: "error", data: [] });
    }
  } catch (error) {
    console.log(error);
  }
}
