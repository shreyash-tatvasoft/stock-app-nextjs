import mongoose from "mongoose";

const DATABASE_URL: string = process.env.MONGODB_URI!;

export const connectDB = async () => {
    try {
     const DB_OPTIONS = {
         dbName : "stockApp",
     }
 
     await mongoose.connect(DATABASE_URL, DB_OPTIONS)
     console.log("Server Connected Succeffully.....")
     return true
    } catch (error) {
      console.log(error)
      return false
    }
 }