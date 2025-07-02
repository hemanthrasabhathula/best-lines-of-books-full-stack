import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BookDetail } from "./components/BookDetail/BookDetail";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/books/:id" element={<BookDetail />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
