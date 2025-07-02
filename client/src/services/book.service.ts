import type { Book } from "@/types/types";

export const fetchAllBooks = async (): Promise<Book[]> => {
  const response = await fetch("/api/books");
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  return response.json();
};
