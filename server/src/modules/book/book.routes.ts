import express from "express";
import {
  addBook,
  addBulkBooks,
  deleteBook,
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
bookRouter.delete("/:id", deleteBook);

export default bookRouter;
