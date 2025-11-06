import { author as Author } from "../models/authors.js";

class AuthorController {
  static async getAllAuthors(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const skip = (page - 1) * limit;

      const authors = await Author.find({})
        .skip(Number(skip))
        .limit(Number(limit));

      const total = await Author.countDocuments();

      res.status(200).json({
        page: Number(page),
        totalPages: Math.ceil(total / limit),
        totalAuthors: total,
        authors,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving authors", error: error.message });
    }
  }

  static async getByIdAuthor(req, res) {
    try {
      const { id } = req.params;
      const author = await Author.findById(id);

      if (!author) {
        return res.status(404).json({ message: "Author not found" });
      }

      res.status(200).json(author);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving author", error: error.message });
    }
  }

  static async searchAuthor(req, res) {
    try {
      const { title, author, page = 1, limit = 10 } = req.query;
      const query = {};

      if (title) query.title = new RegExp(title, "i");
      if (author) query.author = new RegExp(author, "i");

      const skip = (page - 1) * limit;

      const authors = await Author.find(query).skip(skip).limit(Number(limit));
      const total = await Author.countDocuments(query);

      res.status(200).json({
        total,
        page: Number(page),
        limit: Number(limit),
        results: authors,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error in search author",
        error: error.message,
      });
    }
  }

  static async createAuthor(req, res) {
    try {
      const newAuthor = new Author(req.body);
      const savedAuthor = await newAuthor.save();
      res
        .status(201)
        .json({ message: "Author created successfully", author: savedAuthor });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating author", error: error.message });
    }
  }

  static async putAuthor(req, res) {
    try {
      const { id } = req.params;
      const updatedAuthor = await Author.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!updatedAuthor) {
        return res.status(404).json({ message: "Author not found" });
      }

      res.status(200).json({
        message: "Author updated successfully",
        author: updatedAuthor,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating author", error: error.message });
    }
  }

  static async deleteAuthor(req, res) {
    try {
      const { id } = req.params;
      const deletedAuthor = await Author.findByIdAndDelete(id);

      if (!deletedAuthor) {
        return res.status(404).json({ message: "Author not found" });
      }

      res.status(200).json({ message: "Author deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting author", error: error.message });
    }
  }
}

export default AuthorController;
