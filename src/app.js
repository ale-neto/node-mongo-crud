import express from "express";

const app = express();

const books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
];

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/books", (req, res) => {
  res.status(200).json(books);
});

app.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const book =
    books.findIndex((book) => book.id === Number(bookId)) !== -1
      ? books.find((book) => book.id === Number(bookId))
      : null;
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).send("Book not found.");
  }
});

app.post("/books", express.json(), (req, res) => {
  const newBook = req.body;
  if (newBook && newBook.title && newBook.author) {
    newBook.id = books.length + 1;
    books.push(newBook);
    res.status(201).json(newBook);
  } else {
    res.status(400).send("Invalid book data Title and Author are required.");
  }
});

app.put("/books/:id", express.json(), (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const bookIndex = books.findIndex((book) => book.id === Number(bookId));
  if (bookIndex !== -1) {
    const updatedBook = { ...books[bookIndex], ...req.body };
    books[bookIndex] = updatedBook;
    res.status(200).json(updatedBook);
  } else {
    res.status(404).send("Book not found.");
  }
});

app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const bookIndex = books.findIndex((book) => book.id === Number(bookId));
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.status(200).send("Book deleted successfully.");
  } else {
    res.status(404).send("Book not found.");
  }
});

export default app;
