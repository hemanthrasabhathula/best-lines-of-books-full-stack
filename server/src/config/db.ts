import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL || "";
// console.log("Connecting to MongoDB with URL:", MONGO_URL);

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with failure
  }
};
