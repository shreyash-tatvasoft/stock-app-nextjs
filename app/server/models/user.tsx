import mongoose from "mongoose";

// Define Schema
const userSchema = new mongoose.Schema({
    name: { type : String, required: true, trim: true},
    email: { type : String, required: true, trim: true},
    password: { type : String, required: true, trim: true},
})

// Create Model
const userModel = mongoose.model("User", userSchema)

export default userModel;