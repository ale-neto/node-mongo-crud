import express from "express";
import BookController from "../controllers/bookController.js";

const routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Gerenciamento de livros
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retorna todos os livros (com paginação)
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Página da listagem
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Quantidade por página
 *     responses:
 *       200:
 *         description: Lista de livros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
routes.get("/books", BookController.getAllBooks);

/**
 * @swagger
 * /books/search:
 *   get:
 *     summary: Busca livros por título ou autor
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: "Termo de busca no título"
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: "Termo de busca no autor"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: "Número da página (padrão: 1)"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: "Quantidade por página (padrão: 10)"
 *     responses:
 *       200:
 *         description: "Livros encontrados"
 *       400:
 *         description: "Falta de parâmetros de busca"
 *       404:
 *         description: "Nenhum livro encontrado"
 */
routes.get("/books/search", BookController.searchBook);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Retorna um livro específico pelo ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Livro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Livro não encontrado
 */
routes.get("/books/:id", BookController.getByIdBook);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Cria um novo livro
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
routes.post("/books", BookController.createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Atualiza os dados de um livro existente
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *       404:
 *         description: Livro não encontrado
 */
routes.put("/books/:id", BookController.putBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Remove um livro pelo ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Livro removido com sucesso
 *       404:
 *         description: Livro não encontrado
 */
routes.delete("/books/:id", BookController.deleteBook);

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         _id:
 *           type: string
 *           description: ID gerado automaticamente pelo MongoDB
 *         title:
 *           type: string
 *           example: Clean Code
 *         author:
 *           type: string
 *           example: Robert C. Martin
 *         year:
 *           type: integer
 *           example: 2008
 *         publisher:
 *           type: string
 *           example: Prentice Hall
 */

export default routes;
