import mongoose, { Document, model } from "mongoose";

export interface Quote extends Document {
  quote: string;
  page: number;
  chapter: number;
  bookId: mongoose.Types.ObjectId;
  bookTitle?: string;
}

const QuoteSchema = new mongoose.Schema<Quote>({
  quote: { type: String, required: true },
  page: { type: Number, required: true },
  chapter: { type: Number, required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Book" },
  bookTitle: { type: String, required: false },
});

QuoteSchema.virtual("id").get(function (this: Quote) {
  return (this._id as mongoose.Types.ObjectId).toHexString();
});

QuoteSchema.set("toJSON", { virtuals: true });
export const QuoteModel = model<Quote>("Quote", QuoteSchema);
