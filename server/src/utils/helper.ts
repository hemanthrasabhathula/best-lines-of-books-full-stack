import axios from "axios";
const KEEP_ALIVE_URL =
  process.env.BASE_URL || "https://best-lines-of-books-full-stack.onrender.com";

export const keepAliveService = async () => {
  try {
    const response = await axios.get(`${KEEP_ALIVE_URL}/health`);
    if (response.status === 200) {
      console.log("Keep-alive service is running successfully.");
    } else {
      console.error("Keep-alive service failed with status:", response.status);
    }
  } catch (error) {
    console.error("Error occurred while checking keep-alive service:", error);
  }
};
