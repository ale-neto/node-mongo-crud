import express from "express";
import BookController from "../controllers/bookController.js";
import pagination from "../middleware/pagination.js";
import sorting from "../middleware/sorting.js";

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
routes.get("/books", pagination, sorting    , BookController.getAllBooks);

/**
 * @swagger
 * /books/search:
 *   get:
 *     summary: Busca livros por título ou nome do autor
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: "Termo de busca no título"
 *       - in: query
 *         name: authorName
 *         schema:
 *           type: string
 *         description: "Termo de busca no nome do autor"
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
routes.get("/books/search",pagination, BookController.searchBook);

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
 *             $ref: '#/components/schemas/BookInput'
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Autor não encontrado
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
 *             $ref: '#/components/schemas/BookInput'
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Livro ou autor não encontrado
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
 *     BookInput:
 *       type: object
 *       required:
 *         - title
 *         - authorId
 *       properties:
 *         title:
 *           type: string
 *           example: Clean Code
 *         authorId:
 *           type: string
 *           example: 673abc123def456789012345
 *           description: ID do autor existente
 *         genre:
 *           type: string
 *           example: Technology
 *         year:
 *           type: integer
 *           example: 2008
 *         pages:
 *           type: integer
 *           example: 464
 *         price:
 *           type: number
 *           example: 49.99
 *     Book:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID gerado automaticamente pelo MongoDB
 *         title:
 *           type: string
 *           example: Clean Code
 *         author:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: Robert C. Martin
 *             nationality:
 *               type: string
 *               example: American
 *         genre:
 *           type: string
 *           example: Technology
 *         year:
 *           type: integer
 *           example: 2008
 *         pages:
 *           type: integer
 *           example: 464
 *         price:
 *           type: number
 *           example: 49.99
 */

export default routes;
