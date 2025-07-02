import { Request, Response } from "express";
import * as quoteService from "./quotes.service";

export const getAllQuotes = async (req: Request, res: Response) => {
  console.log("Fetching all quotes");

  try {
    const quotes = await quoteService.fetchAllQuotes();
    console.log(`Fetched ${quotes.length} quotes successfully`);
    if (quotes.length === 0) {
      res.status(404).json({
        status: "error",
        message: "No quotes found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Fetched all quotes successfully",
      data: quotes,
      total: quotes.length,
    });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    res.status(500).json({
      status: "error",
      message: `Failed to fetch quotes : ${
        error instanceof Error ? error.message : "An unknown error occurred"
      }`,
    });
  }
};

export const addQuote = async (req: Request, res: Response) => {
  const newQuote = req.body;
  console.log("Adding new quote:", newQuote);

  try {
    const createdQuote = await quoteService.createQuote(newQuote);
    console.log(`Created quote: ${JSON.stringify(createdQuote, null, 2)}`);

    res.status(201).json({
      status: "success",
      message: "Quote added successfully",
      data: createdQuote,
    });
  } catch (error) {
    console.error("Error adding quote:", error);
    res.status(500).json({
      status: "error",
      message: `Failed to add quote : ${
        error instanceof Error ? error.message : "An unknown error occurred"
      }`,
    });
  }
};

export const addBulkQuotes = async (req: Request, res: Response) => {
  const quotes = req.body;
  console.log(`Adding ${quotes.length} new quotes`);
  try {
    const createdQuotes = await quoteService.createQuotes(quotes);
    console.log(`Created quotes: ${JSON.stringify(createdQuotes, null, 2)}`);
    if (createdQuotes.length === 0) {
      res.status(400).json({
        status: "error",
        message: "No quotes were added. Please check the input data.",
      });
      return;
    }
    res.status(201).json({
      status: "success",
      message: "Quotes added successfully",
      data: createdQuotes,
      count: createdQuotes.length,
    });
  } catch (error) {
    console.error("Error adding quotes:", error);
    res.status(500).json({
      status: "error",
      message: `Failed to add quotes : ${
        error instanceof Error ? error.message : "An unknown error occurred"
      }`,
    });
  }
};

export const updateQuote = async (req: Request, res: Response) => {
  const quoteId = req.params.id;
  const updateData = req.body;
  console.log(`Updating quote with ID: ${quoteId}`, updateData);

  try {
    const updatedQuote = await quoteService.updateQuote(quoteId, updateData);
    if (!updatedQuote) {
      res.status(404).json({
        status: "error",
        message: `Quote with ID ${quoteId} not found`,
      });
      return;
    }

    console.log(`Updated quote: ${JSON.stringify(updatedQuote, null, 2)}`);
    res.status(200).json({
      status: "success",
      message: "Quote updated successfully",
      data: updatedQuote,
    });
  } catch (error) {
    console.error("Error updating quote:", error);
    res.status(500).json({
      status: "error",
      message: `Failed to update quote : ${
        error instanceof Error ? error.message : "An unknown error occurred"
      }`,
    });
  }
};
export const deleteQuote = async (req: Request, res: Response) => {
  const quoteId = req.params.id;
  console.log(`Deleting quote with ID: ${quoteId}`);

  try {
    await quoteService.deleteQuote(quoteId);

    console.log(`Deleted quote: ${quoteId}`);
    res.status(200).json({
      status: "success",
      message: "Quote deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting quote:", error);
    res.status(500).json({
      status: "error",
      message: `Failed to delete quote : ${
        error instanceof Error ? error.message : "An unknown error occurred"
      }`,
    });
  }
};

export const getQuoteById = async (req: Request, res: Response) => {
  const quoteId = req.params.id;
  console.log(`Fetching quote with ID: ${quoteId}`);

  try {
    const quote = await quoteService.fetchQuoteById(quoteId);
    if (!quote) {
      res.status(404).json({
        status: "error",
        message: `Quote with ID ${quoteId} not found`,
      });
      return;
    }

    console.log(`Fetched quote: ${JSON.stringify(quote, null, 2)}`);
    res.status(200).json({
      status: "success",
      message: "Quote fetched successfully",
      data: quote,
    });
  } catch (error) {
    console.error("Error fetching quote:", error);
    res.status(500).json({
      status: "error",
      message: `Failed to fetch quote : ${
        error instanceof Error ? error.message : "An unknown error occurred"
      }`,
    });
  }
};

export const getQuotesByBookId = async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  console.log(`Fetching quotes for book with ID: ${bookId}`);

  try {
    const quotes = await quoteService.fetchQuotesByBookId(bookId);
    if (!quotes || quotes.length === 0) {
      res.status(404).json({
        status: "error",
        message: `No quotes found for book with ID ${bookId}`,
      });
      return;
    }

    console.log(
      `Fetched quotes: ${quotes.length} quotes found for book ID ${bookId}`
    );
    res.status(200).json({
      status: "success",
      message: "Quotes fetched successfully",
      data: quotes,
      total: quotes.length,
    });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    res.status(500).json({
      status: "error",
      message: `Failed to fetch quotes : ${
        error instanceof Error ? error.message : "An unknown error occurred"
      }`,
    });
  }
};
