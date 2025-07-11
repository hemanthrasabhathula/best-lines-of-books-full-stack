import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useEffect, useRef, useState } from "react";
import { BASE_URL, GROQ_API_PATH } from "@/constants/constants";
import { Loader2, Wand2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const bookSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  author: z.string().trim().min(2, "Author must be at least 2 characters."),
  ISBN: z.string().trim().min(10, "ISBN must be at least 10 characters."),
  genre: z.string().trim().min(3, "Genre must be at least 3 characters."),
  published: z
    .string()
    .trim()
    .min(4, "Published year must be at least 4 characters.")
    .max(4, "Published year cannot exceed 4 characters.")
    .optional(),
  pages: z
    .string()
    .trim()
    .min(1, "Pages must be at least 1 character.")
    .max(5, "Pages cannot exceed 5 characters.")
    .optional(),
  image: z.string().trim().url("Invalid URL for cover image").optional(),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters."),
});
export const AddBook = () => {
  const [bookData, setBookData] = useState<null | Partial<
    z.infer<typeof bookSchema>
  >>({
    title: "",
    author: "",
    ISBN: "",
    genre: "",
    published: "",
    pages: "",
    image: "",
    description: "",
  });

  const [imageError, setImageError] = useState<boolean>(false);

  const handleBookData = (data: Partial<z.infer<typeof bookSchema>>) => {
    setBookData(data);
    console.log("Book data submitted:", data);
  };

  useEffect(() => {
    if (bookData?.image) {
      setImageError(false);
    }
  }, [bookData?.image]);

  return (
    <div className="flex flex-col items-center max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-4  w-full">
        <div className="flex flex-col items-center w-full">
          <h2 className="flex flex-col items-center text-xl font-bold w-full p-4">
            Add a New Book
          </h2>
          <div className="w-full p-4 bg-white rounded-lg shadow-md">
            <BookForm onBookData={handleBookData} />
          </div>
        </div>
        <div className="flex flex-col items-center w-full">
          <h2 className="flex flex-col items-center text-xl font-bold w-full p-4">
            Book Preview
          </h2>
          <div className="w-full h-full p-4 bg-white rounded-lg shadow-md overflow-auto">
            {/* Book preview content goes here */}
            {bookData && (
              <div className="flex flex-col items-center max-w-5xl mx-auto sm:mt-4 mb-4 mt-8 ">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
                  <div className="flex flex-col items-center">
                    {bookData.image && !imageError ? (
                      <img
                        src={bookData.image}
                        alt={bookData.title}
                        className="w-48 h-72 object-cover rounded-md shadow hover:shadow-lg hover:-rotate-3 transition-all duration-200"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="w-48 h-72 bg-gray-200 rounded-md shadow flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-start justify-center gap-0.5 overflow-auto">
                    <h2 className="text-lg sm:text-2xl font-bold whitespace-break-spaces">
                      {bookData.title ? bookData.title : "Title"}
                    </h2>
                    <p className="text-gray-600 break-all">
                      by {bookData.author}
                    </p>
                    <p className="text-gray-600 break-all">
                      ISBN: {bookData.ISBN}
                    </p>
                    <p className="text-gray-600 break-all">
                      Genre: {bookData.genre}
                    </p>
                    <p className="text-gray-600 break-all">
                      Published: {bookData.published}
                    </p>
                    <p className="text-gray-600 break-all">
                      Pages: {bookData.pages}
                    </p>
                  </div>
                </div>
                {bookData.description && (
                  <div className="mt-2 sm:mt-8 w-full max-w-3xl p-2 overflow-auto">
                    <p
                      className={`text-gray-700 text-sm sm:text-base leading-relaxed break-words `}
                    >
                      <b>Description:</b> {bookData.description}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface BookFormProps {
  onBookData: (data: Partial<z.infer<typeof bookSchema>>) => void;
}

export const BookForm = ({ onBookData }: BookFormProps) => {
  const [generating, setGenerating] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      ISBN: "",
      genre: "",
      published: "",
      pages: "",
      image: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof bookSchema>) => {
    // Handle form submission, e.g., send data to the server
    console.log("Form submitted with data:", data);

    const newBookData = {
      ...data,
      published: data.published ? parseInt(data.published) : 0,
      pages: data.pages ? parseInt(data.pages) : 0,
    };

    const response = await axios.post(`${BASE_URL}/api/books`, newBookData);

    if (response.status === 201) {
      toast.success("Book added successfully!");
      console.log("Book added successfully:");
      form.reset({
        title: "",
        author: "",
        ISBN: "",
        genre: "",
        published: "",
        pages: "",
        image: "",
        description: "",
      });
    } else {
      console.error("Failed to add book:", response.data);
    }
  };

  useEffect(() => {
    const subscription = form.watch(async (values) => {
      onBookData(values);
      console.log("Form values changed:", values);
    });
    return () => subscription.unsubscribe();
  }, [form, onBookData]);

  const handleGenerateClick = async () => {
    console.log("Generating book data...");
    if (!titleRef.current?.value) {
      toast.error("Please enter a book title to generate data.");
      // alert("Please enter a book title to generate data.");
      return;
    }
    const title = titleRef.current.value;
    setGenerating(true);
    try {
      const response = await axios.post(`${BASE_URL}${GROQ_API_PATH}`, {
        title,
      });

      if (response.status !== 200) {
        throw new Error("Failed to generate book data");
      }

      const data = response.data;
      if (data.status === "success") {
        toast.success("Book data generated successfully!");
        console.log("Book data generated successfully:", data.data);
        form.reset(data.data);
        console.log("Generated book data:", data.data);
      } else {
        toast.error("Failed to generate book data");
        console.error("Error generating book data:", data);
        throw new Error(data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error generating book data:", error);
      toast.error("Failed to generate book data. Please try again.");
      // alert("Failed to generate book data. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. The Great Gatsby"
                    {...field}
                    ref={titleRef}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Author</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. J.K. Rowling" {...field} />
                </FormControl>
                <FormMessage className="w-fit h-fit" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="ISBN"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">ISBN</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 950-05-0703-8" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Genre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Fiction, Mystery, Sci-Fi"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Published</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 1990" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Pages</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 300" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. https://example.com/image.jpg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g. A thrilling mystery novel that keeps you on the edge of your seat."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center mt-6 mb-2">
            <Button
              type="button"
              className="cursor-pointer transition-transform duration-150 active:scale-90"
              onClick={handleGenerateClick}
            >
              {generating ? (
                <>
                  <Loader2
                    className={`inline-block mr-1 ${
                      generating ? "animate-spin" : ""
                    }`}
                  />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Wand2 className="inline-block mr-1" />
                  <span>Generate</span>
                </>
              )}
            </Button>
            <Button
              type="submit"
              className="cursor-pointer transition-transform duration-150 active:scale-90"
            >
              Add Book
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
