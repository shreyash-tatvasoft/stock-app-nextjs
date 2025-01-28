import { ApiResponse, JWT_SECRET_KEY, generateDummyStockData } from "../../../common/constant";
import { connectDB } from "@/app/server/db/connectDB";
import stockModel from "@/app/server/models/stocks";

export async function POST(_request: Request) {

  const dbConnection =  await connectDB()

  if(!dbConnection) {
    return ApiResponse(500,{ type: "error", message: "Failed to connect server"})
  }
    try {
      const dummyArrayOfStocks = Array.from({ length : 15 }, () => generateDummyStockData())
      await stockModel.insertMany(dummyArrayOfStocks)
      return ApiResponse(201,{ type: "success", data: dummyArrayOfStocks, message: "Stocks added successfully"})
    } catch (error) {
      console.log(error);
    }
}
