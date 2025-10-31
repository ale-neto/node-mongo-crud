import Book from "../models/books.js";

class BookController {
  static async getAllBooks(req, res) {
    try {
      const books = await Book.find({});
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving books", error });
    }
  }

  static async createBook(req, res) {
    try {
      const newBook = new Book(req.body);
      const savedBook = await newBook.save();
      res
        .status(201)
        .json({ message: "Book created successfully", book: savedBook });
    } catch (error) {
      res.status(500).json({ message: "Error creating book", error });
    }
  }
}

export default BookController;
