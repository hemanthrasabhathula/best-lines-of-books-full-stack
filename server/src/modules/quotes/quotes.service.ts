import { BookModel } from "../book/book.model";
import { Quote, QuoteModel } from "./quotes.model";

export const fetchAllQuotes = async (): Promise<Quote[]> => {
  try {
    const quotes = await QuoteModel.find().lean().exec();
    console.log(`Fetched ${quotes.length} quotes successfully`);
    return quotes;
  } catch (error) {
    console.error(
      `Error while fetching quotes: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    throw new Error(
      `Failed to fetch quotes ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export const createQuote = async (
  quoteData: Partial<Quote>
): Promise<Quote> => {
  const { bookId, ...rest } = quoteData;
  try {
    const book = await BookModel.findById(bookId).exec();
    if (!book) {
      console.error(`Book with ID ${bookId} not found`);
      throw new Error(`Book with ID ${bookId} not found`);
    }

    const quote = await QuoteModel.create({
      ...rest,
      bookId: book._id,
      bookTitle: book.title,
    });
    console.log("Quote created successfully:", quote);
    return quote;
  } catch (error) {
    console.error("Error creating quote:", error);
    throw new Error("Failed to create quote");
  }
};

export const createQuotes = async (
  quotesData: Partial<Quote>[]
): Promise<Quote[]> => {
  //   const createdQuotes: Quote[] = [];
  //   for (const quoteData of quotesData) {
  //     try {
  //       const createdQuote = await createQuote(quoteData);
  //       createdQuotes.push(createdQuote);
  //     } catch (error) {
  //       console.warn(
  //         `Skipping quote: ${error instanceof Error ? error.message : error}`
  //       );
  //     }
  //   }
  //   return createdQuotes;

  const results = await Promise.allSettled(
    quotesData.map((quoteData) => createQuote(quoteData))
  );
  const successfulQuotes = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => (result as PromiseFulfilledResult<Quote>).value);
  return successfulQuotes;
};

export const updateQuote = async (
  quoteId: string,
  updateData: Partial<Quote>
): Promise<Quote | null> => {
  try {
    const updatedQuote = await QuoteModel.findByIdAndUpdate(
      quoteId,
      updateData,
      {
        new: true,
      }
    )
      .lean()
      .exec();

    if (!updatedQuote) {
      console.error(`Quote with ID ${quoteId} not found`);
      throw new Error(`Quote with ID ${quoteId} not found`);
    }

    console.log("Quote updated successfully:", updatedQuote);
    return updatedQuote;
  } catch (error) {
    console.error("Error updating quote:", error);
    throw new Error("Failed to update quote");
  }
};

export const deleteQuote = async (quoteId: string): Promise<void> => {
  try {
    const result = await QuoteModel.findByIdAndDelete(quoteId).exec();
    if (!result) {
      console.error(`Quote with ID ${quoteId} not found`);
      throw new Error(`Quote with ID ${quoteId} not found`);
    }
    console.log(`Quote with ID ${quoteId} deleted successfully`);
  } catch (error) {
    console.error("Error deleting quote:", error);
    throw new Error("Failed to delete quote");
  }
};
export const fetchQuoteById = async (
  quoteId: string
): Promise<Quote | null> => {
  try {
    const quote = await QuoteModel.findById(quoteId).lean().exec();
    if (!quote) {
      console.error(`Quote with ID ${quoteId} not found`);
      throw new Error(`Quote with ID ${quoteId} not found`);
    }
    return quote;
  } catch (error) {
    console.error("Error fetching quote by ID:", error);
    throw new Error("Failed to fetch quote");
  }
};

export const fetchQuotesByBookId = async (bookId: string): Promise<Quote[]> => {
  try {
    const quotes = await QuoteModel.find({ bookId }).lean().exec();
    if (!quotes || quotes.length === 0) {
      console.error(`No quotes found for book with ID ${bookId}`);
      throw new Error(`No quotes found for book with ID ${bookId}`);
    }
    return quotes;
  } catch (error) {
    console.error("Error fetching quotes by book ID:", error);
    throw new Error("Failed to fetch quotes");
  }
};
