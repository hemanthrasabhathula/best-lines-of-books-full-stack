import type { Book } from "@/types/types";
import { BookItem } from "../BookItem/BookItem";
import { ALL_BOOKS_KEY, BASE_URL } from "@/constants/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const BooksList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [ALL_BOOKS_KEY],
    queryFn: async () =>
      axios.get(`${BASE_URL}/api/books`).then((res) => res.data.data as Book[]),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const books: Book[] = data || [];

  if (isLoading)
    return (
      <div className="h-96 flex justify-center items-center">Loading...</div>
    );
  if (error) return <div>Error loading books</div>;

  return (
    <>
      <h2 className="text-md md:text-2xl mb-4 font-bold mt-4 justify-start w-full items-start">
        All Books
      </h2>
      <div className="space-y-4 grid gap-4 lg:gap-6 w-full grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-6 justify-items-center ">
        {books.map((book) => (
          <BookItem key={book._id} book={book} />
        ))}
      </div>
    </>
  );
};
