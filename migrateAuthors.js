import mongoose from "mongoose";
import Book from "./src/models/books.js";

const MONGO_URI = "mongodb://localhost:27017/library";

async function migrateAuthors() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ Conectado ao MongoDB");

  // Buscar livros onde author é string OU não existe OU é null
  const books = await Book.find({
    $or: [
      { author: { $type: "string" } },
      { author: { $exists: false } },
      { author: null },
    ],
  });

  console.log(`📚 Encontrados ${books.length} livros para atualizar.`);

  for (const book of books) {
    // Se author for string, usa o valor; senão, usa "Desconhecido"
    const authorName =
      typeof book.author === "string" ? book.author : "Arthur Conan Doyle";

    book.author = {
      name: authorName,
      nationality: "British",
    };

    await book.save();
    console.log(`✔️ Atualizado: ${book.title} (Autor: ${authorName})`);
  }

  console.log("🎉 Migração concluída!");
  await mongoose.disconnect();
}

migrateAuthors().catch((err) => {
  console.error("❌ Erro durante a migração:", err);
  mongoose.disconnect();
});
