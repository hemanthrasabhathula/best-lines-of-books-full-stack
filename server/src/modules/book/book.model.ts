import mongoose, { Document, model } from "mongoose";

export interface Book extends Document {
  title: string;
  author: string;
  ISBN: string;
  genre: string;
  published: number;
  pages: number;
  image: string;
  description: string;
}

const BookSchema = new mongoose.Schema<Book>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  ISBN: { type: String, required: true, unique: true },
  genre: { type: String, required: false },
  published: { type: Number, required: true },
  pages: { type: Number, required: true },
  image: { type: String, required: false },
  description: { type: String, required: false },
});

BookSchema.virtual("id").get(function (this: Book) {
  return (this._id as mongoose.Types.ObjectId).toHexString();
});
BookSchema.set("toJSON", { virtuals: true });
export const BookModel = model<Book>("Book", BookSchema);
