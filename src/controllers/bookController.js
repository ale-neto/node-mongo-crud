import { Book, author } from "../models/index.js";

class BookController {
  static async getAllBooks(req, res, next) {
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
      next(error);
    }
  }

  static async getByIdBook(req, res, next) {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);

      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  }

static async searchBook(req, res, next) {
  try {
    const { title, authorName, minPages, maxPages } = req.query;
    const { page, limit, skip } = req.pagination;

    const pipeline = [];

    const bookMatch = {};

    if (title) {
      bookMatch.title = new RegExp(title, "i");
    }

    if (minPages || maxPages) {
      bookMatch.pages = {};
      if (minPages) bookMatch.pages.$gte = Number(minPages);
      if (maxPages) bookMatch.pages.$lte = Number(maxPages);
    }

    if (Object.keys(bookMatch).length) {
      pipeline.push({ $match: bookMatch });
    }

    pipeline.push({
      $lookup: {
        from: "authors",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    });

    pipeline.push({ $unwind: "$author" });

    if (authorName) {
      pipeline.push({
        $match: {
          "author.name": new RegExp(authorName, "i"),
        },
      });
    }

    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });

    const [results, totalCount] = await Promise.all([
      Book.aggregate(pipeline),
      Book.aggregate([
        ...pipeline.filter(
          stage => !("$skip" in stage || "$limit" in stage)
        ),
        { $count: "total" }
      ])
    ]);

    const total = totalCount[0]?.total || 0;

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      results,
    });
  } catch (error) {
    next(error);
  }
}


  static async createBook(req, res, next) {
    try {
      const bookBody = req.body;

      const authorData = await author.findById(bookBody.authorId);
      if (!authorData) {
        return res.status(404).json({ message: "Author not found" });
      }

      const newBook = new Book({
        ...bookBody,
        author: authorData._id,
      });

      const savedBook = await newBook.save();

      res.status(201).json({
        message: "Book created successfully",
        book: savedBook,
      });
    } catch (error) {
      next(error);
    }
  }

  static async putBook(req, res, next) {
    try {
      const { id } = req.params;
      const { authorId, ...rest } = req.body;

      const updateData = { ...rest };

      if (authorId) {
        const authorData = await author.findById(authorId);
        if (!authorData) {
          return res.status(404).json({ message: "Author not found" });
        }
        updateData.author = authorData._id;
      }

      const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.status(200).json({
        message: "Book updated successfully",
        book: updatedBook,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBook(req, res, next) {
    try {
      const { id } = req.params;
      const deletedBook = await Book.findByIdAndDelete(id);

      if (!deletedBook) {
        return res.status(404).json({ message: "Book not found" });
      }

      res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default BookController;
