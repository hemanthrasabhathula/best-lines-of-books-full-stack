import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import cron from "node-cron";
import { keepAliveService } from "./utils/helper";

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

cron.schedule("*/5 * * * *", keepAliveService);
