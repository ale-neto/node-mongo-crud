import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Authors",
      autopopulate: true
    },
    genre: { type: String },
    year: { type: Number },
    pages: { type: Number },
    price: { type: Number },
  },
  { versionKey: false }
);

bookSchema.plugin(autopopulate);

const Book = mongoose.model("Books", bookSchema);
export default Book;
