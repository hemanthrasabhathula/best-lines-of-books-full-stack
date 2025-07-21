import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BookDetail } from "./components/BookDetail/BookDetail";
import { Navbar } from "./components/ui/navbar";
import { AddBook } from "./components/AddBook/AddBook";
import { Toaster } from "./components/ui/sonner";
import { About } from "./components/About/About";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/books/:id" element={<BookDetail />} />
              <Route path="/addbook" element={<AddBook />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
