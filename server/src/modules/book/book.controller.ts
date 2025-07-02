import { Request, Response } from "express";
import * as bookService from "./book.service";
import { Book } from "./book.model";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    console.log("Fetching all books");

    const books: Book[] = await bookService.fetchAllBooks();

    console.log(`Fetched ${books.length} books`);
    if (books.length === 0) {
      res.status(404).json({
        status: "error",
        message: "No books found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Fetched all books successfully",
      data: books,
      total: books.length,
    });
  } catch (error) {
    console.error(`Error fetching books:`, error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch books",
    });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  const bookId = req.params.id;
  console.log(`Fetching book with ID: ${bookId}`);

  try {
    const book: Book | null = await bookService.fetchBookById(bookId);
    if (!book) {
      res.status(404).json({
        status: "error",
        message: `Book with ID ${bookId} not found`,
      });
      return;
    }

    console.log(`Fetched book with Id: ${book?._id}`);
    res.status(200).json({
      status: "success",
      message: `Fetched book with ID ${bookId} successfully`,
      data: book,
    });
  } catch (error) {
    console.error(`Error fetching book with ID ${bookId}:`, error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch book",
    });
  }
};

export const addBook = async (req: Request, res: Response) => {
  const newBook = req.body;
  console.log("Adding new book:", newBook);

  try {
    const createdBook: Book = await bookService.createBook(newBook);
    console.log(`Created book: ${JSON.stringify(createdBook, null, 2)}`);

    res.status(201).json({
      status: "success",
      message: "Book added successfully",
      data: createdBook,
    });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to add book",
    });
  }
};

export const addBulkBooks = async (req: Request, res: Response) => {
  const books = req.body;
  console.log(`Adding ${books.length} new books`);

  try {
    const createdBooks: Book[] = await bookService.createBooks(books);
    console.log(`Created books: ${JSON.stringify(createdBooks, null, 2)}`);

    if (createdBooks.length === 0) {
      res.status(400).json({
        status: "error",
        message: "No books were added. Please check the input data.",
      });
      return;
    }

    res.status(201).json({
      status: "success",
      message: "Books added successfully",
      data: createdBooks,
      total: createdBooks.length,
    });
  } catch (error) {
    console.error("Error adding books:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to add books",
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const bookData = req.body;

  console.log(
    `Received Id : ${bookId} | Book Data : ${JSON.stringify(bookData)}`
  );

  try {
    const updatedBook: Book | null = await bookService.updateBookById(
      bookId,
      bookData
    );

    if (!updateBook) {
      res.status(404).json({
        status: "error",
        message: `Failed to Update book with id ${bookId}`,
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Successfully updated Book",
      data: updatedBook,
    });
  } catch (error) {
    console.error(`Failed to update Book with ID : ${bookId}`);
    res.status(500).json({
      status: "error",
      message: `Error while updating the book ${bookId} : ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
  }
};
