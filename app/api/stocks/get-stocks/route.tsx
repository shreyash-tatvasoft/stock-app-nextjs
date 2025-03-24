import { connectDB } from "@/app/server/db/connectDB";
import { ApiResponse } from "../../../common/constant";
import stockModel from "@/app/server/models/stocks";

export async function GET(request: Request ) {
  const dbConnection = await connectDB();

  if (!dbConnection) {
    return ApiResponse(500, {
      type: "error",
      message: "Failed to connect server",
    });
  }

  try {

    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const per_page = parseInt(searchParams.get("per_page") || "5", 10);
    const skip = (page - 1) * per_page;
    const query = searchParams.get("query") || "";

    // Build the search filter
    const filter = query
      ? {
          $or: [
            { name: { $regex: query, $options: "i" } }, // Case-insensitive search in 'name'
            { sector: { $regex: query, $options: "i" } }, // Case-insensitive search in 'sector'
          ],
        }
      : {};

    // Fetch paginated data
    const items = await stockModel.find(filter).skip(skip).limit(per_page);

    // Get total count
    const totalItems = await stockModel.countDocuments(filter);

    // Get total pages
    const totalPages = Math.ceil(totalItems / per_page)

    if (items.length > 0) {
      return ApiResponse(200, {
        type: "success",
        page,
        totalPages,
        totalItems,
        data: items,
      });
    } else {
      return ApiResponse(404, { type: "error", data: [] });
    }
  } catch (error) {
    console.log(error);
  }
}
