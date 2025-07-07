import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BookDetail } from "./components/BookDetail/BookDetail";
import { Navbar } from "./components/ui/navbar";
import { AddBook } from "./components/AddBook/AddBook";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/addbook" element={<AddBook />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
