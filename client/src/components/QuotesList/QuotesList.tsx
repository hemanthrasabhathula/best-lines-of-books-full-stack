import { BASE_URL } from "@/constants/constants";
import type { Quote } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useCallback, memo, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  getRandomCurrentAndNextImage,
  getRandomImage,
} from "@/utils/ImagesImporter";

export const QuotesList = ({ bookId }: { bookId: string }) => {
  console.log("QuotesList rendering for book ID:", bookId);
  const { currentImage, nextImage } = getRandomCurrentAndNextImage();
  const [currentBg, setCurrentBg] = useState<string>(
    currentImage || getRandomImage()
  );
  const [nextBg, setNextBg] = useState<string>(nextImage || getRandomImage());

  const preloadImageRef = useRef<HTMLImageElement | null>(null);

  const preloadImage = useCallback((imageSrc: string) => {
    if (preloadImageRef.current) {
      preloadImageRef.current.onload = null; // Clean up previous
    }

    const img = new Image();
    img.onload = () => {
      console.log("Next image preloaded:", imageSrc);
    };

    img.onerror = () => {
      console.log("Failed to preload image: ", imageSrc);
    };

    img.src = imageSrc;
    preloadImageRef.current = img;
  }, []);

  useEffect(() => {
    preloadImage(nextBg);
  }, [preloadImage, nextBg]);

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

  // Stable callback using useCallback
  const handleBackgroundChange = useCallback(() => {
    console.log("Current background image:", currentBg);
    console.log("Next background image:", nextBg);
    console.log("Changing background image");
    // Use nextBg for the next transition
    setCurrentBg(nextBg);
    // Get a new nextBg for the next iteration
    const newNext = getRandomImage(currentBg);
    setNextBg(newNext);
    console.log("New background images set:", {
      current: currentBg,
      next: newNext,
    });
    preloadImage(newNext);
  }, [currentBg, nextBg, preloadImage]);

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
        backgroundImage: `url(${currentBg})`,
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
              onBackgroundChange={handleBackgroundChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

interface QuotesIteratorProps {
  data: Quote[];
  onBackgroundChange: () => void;
}

// Memoized component - only re-renders when props actually change
export const QuotesIterator = memo(
  ({ data, onBackgroundChange }: QuotesIteratorProps) => {
    console.log("QuotesIterator rendering with data length:", data.length);

    // Only store index, derive quote from data + index
    const [index, setIndex] = useState(0);
    const quote = data[index] || null; // Derived state
    const length = data.length;

    // Memoized callbacks with stable references
    const nextQuote = useCallback(() => {
      const newIndex = index < length - 1 ? index + 1 : 0;
      setIndex(newIndex);
      onBackgroundChange(); // Trigger background change in parent
    }, [index, length, onBackgroundChange]);

    const prevQuote = useCallback(() => {
      const newIndex = index > 0 ? index - 1 : length - 1;
      setIndex(newIndex);
      // Don't change background on previous (as per your code)
    }, [index, length]);

    return (
      <div className="flex flex-col items-center justify-center w-full max-w-xl p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 backdrop-blur-sm bg-white/30">
        <div className="flex flex-col items-center">
          <h2 className="text-lg sm:text-2xl italic mb-2 ">
            {quote?.bookTitle}
          </h2>
          {quote ? (
            <div className="text-gray-800 text-lg italic min-h-32 max-h-fit flex items-center justify-center">
              <p>"{quote.quote}"</p>
            </div>
          ) : (
            <p>No quote available</p>
          )}
        </div>
        <p className="text-gray-700 text-sm mt-2 mb-2 flex w-full justify-end">
          Page {quote?.page} | Chapter {quote?.chapter}
        </p>
        <div className="flex justify-center gap-8 mt-4">
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
    );
  }
);

// Set display name for debugging
QuotesIterator.displayName = "QuotesIterator";
