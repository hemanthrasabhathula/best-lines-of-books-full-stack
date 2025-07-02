import express from "express";
import {
  addBook,
  addBulkBooks,
  getAllBooks,
  getBookById,
  updateBook,
} from "./book.controller";

const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);
bookRouter.get("/:id", getBookById);
bookRouter.post("/", addBook);
bookRouter.put("/:id", updateBook);
bookRouter.post("/bulk", addBulkBooks);

export default bookRouter;
