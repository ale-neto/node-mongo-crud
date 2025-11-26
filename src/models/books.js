import mongoose from "mongoose";
import { authorSchema } from "./authors.js";
const bookSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    title: { type: String, required: true },
    author: authorSchema,
    genre: { type: String },
    year: { type: Number },
    pages: { type: Number },
    price: { type: Number },
  },
  { versionKey: false }
);

const Book = mongoose.model("Books", bookSchema);

export default Book;
