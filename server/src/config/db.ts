import mongoose from "mongoose";

const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb+srv://Admin:Admin%40123@mongo-cluster.gpmpddo.mongodb.net/BestLinesOfBooks";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with failure
  }
};
