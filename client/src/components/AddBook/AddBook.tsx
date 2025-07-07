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
import { useEffect, useState } from "react";

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(2, "Author must be at least 2 characters."),
  isbn: z.string().min(10, "ISBN must be at least 10 characters."),
  genre: z.string().min(3, "Genre must be at least 3 characters."),
  published: z.string().optional(),
  pages: z.string().optional(),
  image: z.string().url("Invalid URL for cover image").optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
});
export const AddBook = () => {
  const [bookData, setBookData] = useState<null | Partial<
    z.infer<typeof bookSchema>
  >>(null);

  const handleBookData = (data: Partial<z.infer<typeof bookSchema>>) => {
    setBookData(data);
    console.log("Book data submitted:", data);
  };

  return (
    <div className="flex flex-col items-center max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
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
              <div>
                <h3 className="text-lg font-bold"> Title: {bookData.title}</h3>
                <p className="text-gray-600"> Author: {bookData.author}</p>
                <p className="text-gray-600"> ISBN: {bookData.isbn}</p>
                <p className="text-gray-600"> Genre: {bookData.genre}</p>
                <p className="text-gray-600">Published: {bookData.published}</p>
                <p className="text-gray-600"> Pages: {bookData.pages}</p>
                {/* <img
                  src={bookData.image}
                  alt={bookData.title}
                  className="w-32 h-32 object-cover"
                /> */}
                <p className="text-gray-600 break-words ">
                  {" "}
                  Description: {bookData.description}
                </p>
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
  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
      genre: "",
      published: "",
      pages: "",
      image: "",
      description: "",
    },
  });

  const onSubmit = (data: z.infer<typeof bookSchema>) => {
    // Handle form submission, e.g., send data to the server
    console.log("Form submitted with data:", data);
  };

  useEffect(() => {
    const subscription = form.watch(async (values) => {
      onBookData(values);
      console.log("Form values changed:", values);
    });
    return () => subscription.unsubscribe();
  }, [form, onBookData]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl">Title</FormLabel>
                <FormControl>
                  <Input placeholder="Book Title" {...field} />
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
                <FormLabel className="text-xl">Author</FormLabel>
                <FormControl>
                  <Input placeholder="Book Author" {...field} />
                </FormControl>
                <FormMessage className="w-fit h-fit" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">ISBN</FormLabel>
                  <FormControl>
                    <Input placeholder="ISBN Number" {...field} />
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
                  <FormLabel className="text-xl">Genre</FormLabel>
                  <FormControl>
                    <Input placeholder="Genre" {...field} />
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
                  <FormLabel className="text-xl">Published</FormLabel>
                  <FormControl>
                    <Input placeholder="Published Year" {...field} />
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
                  <FormLabel className="text-xl">Pages</FormLabel>
                  <FormControl>
                    <Input placeholder="Number of Pages" {...field} />
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
                <FormLabel className="text-xl">Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Image URL" {...field} />
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
                <FormLabel className="text-xl">Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="cursor-pointer">
            Add Book
          </Button>
        </form>
      </Form>
    </>
  );
};
