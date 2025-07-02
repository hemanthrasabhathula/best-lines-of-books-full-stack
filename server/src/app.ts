import express, { Request, Response } from "express";
import bookRouter from "./modules/book/book.routes";
import quoteRouter from "./modules/quotes/quotes.routes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/books", bookRouter);
app.use("/api/quotes", quoteRouter);

app.get("/health", (req: Request, res: Response) => {
  console.log("Health check endpoint hit");
  res.status(200).json({
    status: "OK",
    message: "Server is running fine",
    timestamp: new Date().toISOString(),
  });
});

export default app;
