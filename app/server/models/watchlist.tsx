import mongoose, { Schema} from "mongoose";

// Define Schema
const watchListSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    stockId: { type: Schema.Types.ObjectId, ref: 'Stocks', required: true },
    addedAt: { type: Date, default: Date.now() },
});

// Create Model
const watchListModel = mongoose.model("WatchList", watchListSchema)

export default watchListModel;