import { ApiResponse, JWT_SECRET_KEY, generateDummyStockData, getIDFromToken } from "../../../common/constant";
import { connectDB } from "@/app/server/db/connectDB";
import stockModel from "@/app/server/models/stocks";
import watchListModel from "@/app/server/models/watchlist";
import jwt, {JwtPayload} from "jsonwebtoken"

export async function POST(request: Request) {

  const dbConnection =  await connectDB()

  if(!dbConnection) {
    return ApiResponse(500,{ type: "error", message: "Failed to connect server"})
  }

  try {
    const { stock_id } = await request.json()
    const token = request.headers.get("token")

    if(token && stock_id) {
        const availableStocks = await stockModel.findById({ _id : stock_id})

        if(availableStocks) {
            let userId = getIDFromToken(token)
            const newWatchList = new watchListModel({
                userId : userId,
                stockId: stock_id,
                addedAt: Date.now()
            })

            await newWatchList.save()

            return ApiResponse(201,{ type: "success", message: "Added to watchlist"})

        } else {
            return ApiResponse(404,{ type: "error", message: "Invalid Stock Details"})
       }

    } else {
         return ApiResponse(404,{ type: "error", message: "Invalid User Details"})
    }
  } catch (error) {
     console.log(error)
  }
    
}
