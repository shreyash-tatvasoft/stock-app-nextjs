import mongoose, { Schema} from "mongoose";
import "./stocks";
import "./user"

// Define Schema
const watchListSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    stock: { type: Schema.Types.ObjectId, ref: 'Stocks', required: true },
    addedAt: { type: Date, default: Date.now() },
});

// Create Model
const watchListModel = mongoose.models.watchlists || mongoose.model("WatchList", watchListSchema)

export default watchListModel;