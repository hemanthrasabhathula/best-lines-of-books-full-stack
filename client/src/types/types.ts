export type Book = {
  _id: string;
  title: string;
  author: string;
  ISBN: string;
  genre: string;
  published: number;
  pages: number;
  image: string;
  description: string;
};

export type Quote = {
  _id: string;
  quote: string;
  page: number;
  chapter: number;
  bookId: string;
  bookTitle: string;
};
