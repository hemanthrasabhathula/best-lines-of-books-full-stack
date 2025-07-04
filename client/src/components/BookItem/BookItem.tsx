import type { Book } from "@/types/types";
import { useNavigate } from "react-router-dom";

export const BookItem = ({ book }: { book: Book }) => {
  const navigate = useNavigate();

  const handleClick = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div
      className="flex flex-col justify-start items-center gap-2 w-full h-full cursor-pointer"
      onClick={() => handleClick(book._id)}
    >
      <div className="relative h-fit w-full aspect-[2/3]">
        {/* Card background beneath */}
        <div className="absolute inset-0 w-full h-full bg-gray-50 rounded-sm shadow z-0" />
        {/* Image above */}
        <img
          src={book.image}
          alt={book.title}
          className="absolute inset-0 w-full h-full object-cover rounded-sm shadow-md hover:shadow-lg hover:-rotate-3 transition-all duration-200 z-10"
        />
      </div>
      <h3 className="text-center text-sm leading-tight break-words w-full">
        {book.title}
      </h3>
    </div>
  );
};
