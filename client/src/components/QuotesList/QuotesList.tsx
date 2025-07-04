import { BASE_URL } from "@/constants/constants";
import type { Quote } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getRandomImage } from "@/utils/ImagesImporter";

export const QuotesList = ({ bookId }: { bookId: string }) => {
  console.log("QuotesList rendering for book ID:", bookId);
  const [backgroundImage, setBackgroundImage] = useState<string>(
    getRandomImage()
  );

  const { data, error } = useQuery({
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

  if (!data || data.length === 0) {
    console.log("No quotes found for book ID:", bookId);
    return null;
  }

  if (error) {
    console.error("Error loading quotes:", error);
  }

  console.log("Quotes data:", data);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage || getRandomImage()})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <div className="flex flex-col items-center justify-center h-svh max-w-7xl mx-auto p-4">
        <div className="flex w-full max-w-3xl justify-center p-4">
          {data && (
            <QuotesIterator
              data={data}
              setBackgroundImage={setBackgroundImage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

interface QuotesIteratorProps {
  data: Quote[];
  setBackgroundImage: (image: string) => void;
}

export const QuotesIterator = ({
  data,
  setBackgroundImage,
}: QuotesIteratorProps) => {
  const length = data.length;
  const [quote, setQuote] = useState<Quote | null>(data[0] || null);
  const [index, setIndex] = useState(0);
  const nextQuote = () => {
    if (index < length - 1) {
      setIndex(index + 1);
      setQuote(data[index + 1]);
    } else {
      setIndex(0);
      setQuote(data[0]);
    }
    setBackgroundImage(getRandomImage());
  };
  const prevQuote = () => {
    if (index > 0) {
      setIndex(index - 1);
      setQuote(data[index - 1]);
    } else {
      setIndex(length - 1);
      setQuote(data[length - 1]);
    }
    setBackgroundImage(getRandomImage());
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full max-w-xl p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 backdrop-blur-sm bg-white/30">
        <div className="flex flex-col items-center">
          <h2 className="text-lg sm:text-2xl italic mb-2 ">
            {quote?.bookTitle}
          </h2>
          {quote ? (
            <div className="text-gray-800 text-sm sm:text-lg  italic min-h-32 max-h-fit flex items-center justify-center">
              <p>"{quote.quote}"</p>
            </div>
          ) : (
            <p>No quote available</p>
          )}
        </div>
        <p className="text-gray-700 text-sm mt-2 mb-2 flex w-full justify-end">
          Page {quote?.page} | Chapter {quote?.chapter}
        </p>
        <div className="flex justify-center gap-4 sm:gap-8 mt-4">
          <button
            className="hover:cursor-pointer transition-transform duration-150 active:scale-70"
            onClick={prevQuote}
          >
            <ChevronLeft className="text-gray-700" />
          </button>
          <button
            className="hover:cursor-pointer transition-transform duration-150 active:scale-70"
            onClick={nextQuote}
          >
            <ChevronRight className="text-gray-700" />
          </button>
        </div>
      </div>
    </>
  );
};
