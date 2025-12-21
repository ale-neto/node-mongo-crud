import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    nationality: { type: String },
  },
  { versionKey: false }
);

const Author = mongoose.model("Author", authorSchema);

export { Author, authorSchema };
