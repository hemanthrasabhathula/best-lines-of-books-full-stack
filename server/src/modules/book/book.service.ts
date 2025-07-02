import { Book, BookModel } from "./book.model";

export const fetchAllBooks = async (): Promise<Book[]> => {
  try {
    const books = await BookModel.find().lean().exec();
    console.log(`Fetched ${books.length} books successfully`);
    return books;
  } catch (error) {
    console.error(
      `Error while fetching quotes: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    throw new Error(
      `Failed to fetch books ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export const fetchBookById = async (id: string): Promise<Book | null> => {
  try {
    return BookModel.findById(id).lean().exec();
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    throw new Error(`Failed to fetch book with ID ${id}`);
  }
};

export const createBook = async (bookData: Partial<Book>): Promise<Book> => {
  try {
    const book = new BookModel(bookData);
    // Validate the book data before saving
    const validationError = book.validateSync();
    if (validationError) {
      console.error("Validation error:", validationError);
      throw new Error("Validation failed");
    }
    // Save the book to the database
    console.log("Saving book:", book);
    return book.save();
  } catch (error) {
    console.error("Error creating book:", error);
    throw new Error("Failed to create book");
  }
};

export const createBooks = async (
  booksData: Partial<Book>[]
): Promise<Book[]> => {
  // try {
  //   const books = booksData.map((data) => new BookModel(data));
  //   const createdBooks = await BookModel.insertMany(books);
  //   console.log(`Created ${createdBooks.length} books successfully`);
  //   return createdBooks;
  // } catch (error) {
  //   console.error("Error creating books:", error);
  //   throw new Error("Failed to create books");
  // }

  const results = await Promise.allSettled(
    booksData.map((bookData) => createBook(bookData))
  );
  const successfulBooks = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => (result as PromiseFulfilledResult<Book>).value);

  return successfulBooks;
};

export const updateBookById = async (
  bookId: string,
  bookData: Partial<Book>
): Promise<Book> => {
  try {
    const book = await BookModel.findByIdAndUpdate(bookId, bookData, {
      new: true,
      runValidators: true,
    })
      .lean()
      .exec();
    if (!book) {
      throw new Error(`Book with ID ${bookId} not found`);
    }
    return book;
  } catch (error) {
    console.error(`Error updating book with ID ${bookId}:`, error);
    throw new Error(`Failed to update book with ID ${bookId}`);
  }
};
