import { author } from "../models/authors.js";
import Book from "../models/books.js";

class BookController {
  static async getAllBooks(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const skip = (page - 1) * limit;

      const books = await Book.find({}).skip(Number(skip)).limit(Number(limit));

      const total = await Book.countDocuments();

      res.status(200).json({
        page: Number(page),
        totalPages: Math.ceil(total / limit),
        totalBooks: total,
        books,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving books", error: error.message });
    }
  }

  static async getByIdBook(req, res) {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);

      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.status(200).json(book);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving book", error: error.message });
    }
  }

  static async searchBook(req, res) {
    try {
      const { title, authorName, page = 1, limit = 10 } = req.query;
      const query = {};

      if (title) query.title = new RegExp(title, "i");
      if (authorName) query["author.name"] = new RegExp(authorName, "i");

      const skip = (page - 1) * limit;

      const books = await Book.find(query).skip(skip).limit(Number(limit));
      const total = await Book.countDocuments(query);

      res.status(200).json({
        total,
        page: Number(page),
        limit: Number(limit),
        results: books,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error in search book",
        error: error.message,
      });
    }
  }

  static async createBook(req, res) {
    try {
      const bookBody = req.body;

      const authorData = await author.findById(bookBody.authorId);

      if (!authorData) {
        return res.status(404).json({ message: "Author not found" });
      }

      const newBook = new Book({
        ...bookBody,
        author: {
          name: authorData.name,
          nationality: authorData.nationality,
        },
      });

      const savedBook = await newBook.save();

      res
        .status(201)
        .json({ message: "Book created successfully", book: savedBook });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating book", error: error.message });
    }
  }

  static async putBook(req, res) {
    try {
      const { id } = req.params;
      const { title, authorId, genre, year, pages, price } = req.body;

      let updateData = { title, genre, year, pages, price };

      if (authorId) {
        const authorData = await author.findById(authorId);

        if (!authorData) {
          return res.status(404).json({ message: "Author not found" });
        }

        updateData.author = {
          name: authorData.name,
          nationality: authorData.nationality,
        };
      }

      const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }

      res
        .status(200)
        .json({ message: "Book updated successfully", book: updatedBook });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating book", error: error.message });
    }
  }

  static async deleteBook(req, res) {
    try {
      const { id } = req.params;
      const deletedBook = await Book.findByIdAndDelete(id);

      if (!deletedBook) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting book", error: error.message });
    }
  }
}

export default BookController;
