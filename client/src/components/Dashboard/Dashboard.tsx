import { InputWithButton } from "../ui/InputWithButton";

import { BooksList } from "../BooksList/BooksList";
import { useState } from "react";

export const Dashboard = () => {
  console.log("Dashboard component rendered");

  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col items-center max-w-7xl mx-auto p-4 mt-10">
      <InputWithButton setSearch={setSearch} />
      <BooksList search={search} />
    </div>
  );
};
