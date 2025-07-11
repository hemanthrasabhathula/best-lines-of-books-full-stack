import { BASE_URL, colors } from "@/constants/constants";
import type { Book } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { QuotesList } from "../QuotesList/QuotesList";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

export const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  console.log("BookDetail rendered for book ID:", id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      if (!id) throw new Error("Book ID is required");
      const response = await axios.get(`${BASE_URL}/api/books/${id}`);
      return response.data.data as Book;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (!id) {
    return (
      <div className="h-96 flex justify-center items-center">
        No book ID provided
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="h-96 flex justify-center items-center">Loading...</div>
    );
  if (error) return <div>Error loading book details</div>;
  if (!data) return <div>No book found</div>;
  const book = data;
  console.log("Book details:", book);

  const color = colors[Math.floor(Math.random() * colors.length)];
  console.log("Random color for background:", color);
  return (
    <div style={{ backgroundColor: color }}>
      <div className="min-h-[calc(100vh-60px)] sm:min-h-[calc(100vh-68px)]">
        <div className="flex max-w-7xl mx-auto p-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  className="text-gray-600 onhover:text-gray-800 hover:underline"
                >
                  <Link to="/">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Book</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <BookData book={book} />
      </div>
      <QuotesList bookId={id} />
    </div>
  );
};

const BookData = ({ book }: { book: Book }) => {
  const [showFull, setShowFull] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto p-4 sm:mt-4 mt-8">
      <div className="grid grid-cols-1 sm:[grid-template-columns:auto_1fr] gap-6 mb-4">
        <div className="flex flex-col items-center">
          <img
            src={book.image}
            alt={book.title}
            className="w-48 h-72 object-cover rounded-md shadow-md hover:shadow-lg hover:-rotate-3 transition-all duration-200"
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-0.5 p-4">
          <h2 className="text-lg sm:text-2xl font-bold">{book.title}</h2>
          <p className="text-gray-600">by {book.author}</p>
          <p className="text-gray-600">ISBN: {book.ISBN}</p>
          <p className="text-gray-600">Genre: {book.genre}</p>
          <p className="text-gray-600">Published: {book.published}</p>
          <p className="text-gray-600">Pages: {book.pages}</p>
        </div>
      </div>
      {book.description && (
        <div className="mt-2 sm:mt-8 w-full max-w-3xl p-2 ">
          <p
            className={`text-gray-700 text-sm sm:text-base leading-relaxed ${
              showFull ? "" : "line-clamp-6 sm:line-clamp-4"
            }`}
          >
            <b>Description:</b> {book.description}
          </p>

          <Button
            onClick={() => setShowFull(!showFull)}
            className="underline italic text-sm p-0 m-0 h-fit hover:cursor-pointer inline"
            variant={"link"}
          >
            {showFull ? "read less" : "read more"}
          </Button>
        </div>
      )}
    </div>
  );
};
