import { InputWithButton } from "../ui/InputWithButton";

import { BooksList } from "../BooksList/BooksList";

export const Dashboard = () => {
  return (
    <div className="flex flex-col items-center max-w-7xl mx-auto p-4">
      <InputWithButton />
      <BooksList />
    </div>
  );
};
