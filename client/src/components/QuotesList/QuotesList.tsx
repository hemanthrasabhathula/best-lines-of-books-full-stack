import { BASE_URL } from "@/constants/constants";
import type { Quote } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const QuotesList = ({ bookId }: { bookId: string }) => {
  console.log("QuotesList rendering for book ID:", bookId);

  const { data, isLoading, error } = useQuery({
    queryKey: ["quotes", bookId],
    queryFn: async () => {
      if (!bookId) throw new Error("Book ID is required");
      const response = await axios.get(`${BASE_URL}/api/quotes/book/${bookId}`);
      return response.data.data as Quote[];
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (!isLoading && !data) {
    return <div>No quotes found.</div>;
  }
  if (isLoading) {
    return (
      <div className="h-96 flex justify-center items-center">Loading...</div>
    );
  }
  if (error) {
    return (
      <div className="h-96 flex justify-center items-center">
        Error loading quotes.
      </div>
    );
  }

  console.log("Quotes data:", data);

  return (
    <div className="flex flex-col items-center max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quotes List</h1>
      <div className="w-full max-w-3xl">
        {data &&
          data.map((quote) => (
            <div
              key={quote._id}
              className="p-4 mb-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-gray-800">{quote.quote}</p>
              <p className="text-gray-600 text-sm mt-2">
                Page: {quote.page}, Chapter: {quote.chapter}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};
