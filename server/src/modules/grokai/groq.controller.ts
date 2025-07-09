import { Request, Response } from "express";
import * as groqService from "./groq.service";
import { Book } from "../book/book.model";

export const generateBookData = async (req: Request, res: Response) => {
  const title = req.body.title;
  try {
    const book: Book | null = await groqService.generateBookData(title);

    if (!book) {
      res.status(500).json({
        status: "error",
        message: "Failed to generate book data",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      message: "Book data generated successfully",
      data: book,
    });
  } catch (error) {
    console.error("Error generating book data:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to generate book data",
    });
  }
};
