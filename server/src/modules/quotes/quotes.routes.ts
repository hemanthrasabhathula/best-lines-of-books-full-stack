import express from "express";
import {
  addBulkQuotes,
  addQuote,
  deleteQuote,
  getAllQuotes,
  getQuoteById,
  getQuotesByBookId,
  updateQuote,
} from "./quotes.controller";

const quoteRouter = express.Router();

quoteRouter.get("/", getAllQuotes);
quoteRouter.post("/", addQuote);
quoteRouter.get("/:id", getQuoteById);
quoteRouter.put("/:id", updateQuote);
quoteRouter.delete("/:id", deleteQuote);
quoteRouter.post("/bulk", addBulkQuotes);
quoteRouter.get("/book/:bookId", getQuotesByBookId);

export default quoteRouter;
