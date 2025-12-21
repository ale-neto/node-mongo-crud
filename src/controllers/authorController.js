import NotFound from "../errors/NotFound.js";
import { author as Author } from "../models/index.js";

class AuthorController {
static async getAllAuthors(req, res, next) {
  try {
    const { page, limit, skip } = req.pagination;
    const sortOptions = req.sorting;

    const authors = await Author.find({})
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await Author.countDocuments();

    res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      totalAuthors: total,
      authors,
    });
  } catch (error) {
    next(error);
  }
}



  static async getByIdAuthor(req, res, next) {
    try {
      const { id } = req.params;
      const author = await Author.findById(id);

      if (!author) {
        return res.status(404).json({ message: "Author not found" });
      }

      res.status(200).json(author);
    } catch (error) {
      next(error);
    }
  }

static async searchAuthor(req, res, next) {
  try {
    const { title, author } = req.query;
    const { page, limit, skip } = req.pagination;
    const sortOptions = req.sorting;

    const query = {};

    if (title) query.title = new RegExp(title, "i");
    if (author) query.author = new RegExp(author, "i");

    const authors = await Author.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await Author.countDocuments(query);

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      results: authors,
    });
  } catch (error) {
    next(error);
  }
}


  static async createAuthor(req, res, next) {
    try {
      const newAuthor = new Author(req.body);
      const savedAuthor = await newAuthor.save();
      res
        .status(201)
        .json({ message: "Author created successfully", author: savedAuthor });
    } catch (error) {
      next(error);
    }
  }

  static async putAuthor(req, res, next) {
    try {
      const { id } = req.params;
      const updatedAuthor = await Author.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!updatedAuthor) {
        next(new NotFound("Author not found"));
      }

      res.status(200).json({
        message: "Author updated successfully",
        author: updatedAuthor,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteAuthor(req, res, next) {
    try {
      const { id } = req.params;
      const deletedAuthor = await Author.findByIdAndDelete(id);

      if (!deletedAuthor) {
        next(new NotFound("Author not found"));
      }

      res.status(200).json({ message: "Author deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthorController;
