import mongoose from "mongoose";

// Define Schema
const stocksSchema = new mongoose.Schema({
  symbol: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  sector: { type: String, required: true },
  marketCap: { type: Number, required: true },
  price: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now() }
});

// Create Model
const stockModel = mongoose.models.stocks ||  mongoose.model("Stocks", stocksSchema)

export default stockModel;