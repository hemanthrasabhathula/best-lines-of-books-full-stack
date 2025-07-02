import type { Book } from "@/types/types";
import { useNavigate } from "react-router-dom";

export const BookItem = ({ book }: { book: Book }) => {
  const navigate = useNavigate();

  const handleClick = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div
      className="flex flex-col justify-start items-center gap-2"
      onClick={() => handleClick(book._id)}
    >
      <img
        src={book.image}
        alt={book.title}
        className="w-full aspect-[2/3] object-cover rounded-sm shadow-md hover:shadow-lg hover:cursor-pointer transition-shadow duration-200"
      />
      <h3 className="text-center text-sm leading-tight break-words w-full">
        {book.title}
      </h3>
    </div>
  );
};
