import express from "express";
import AuthorController from "../controllers/authorController.js";

const routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Gerenciamento de livros
 */

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Retorna todos os livros (com paginação)
 *     tags: [Authors]
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
 *                 $ref: '#/components/schemas/Author'
 */
routes.get("/authors", AuthorController.getAllAuthors);

/**
 * @swagger
 * /authors/search:
 *   get:
 *     summary: Busca livros por título ou autor
 *     tags: [Authors]
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
routes.get("/authors/search", AuthorController.searchAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Retorna um livro específico pelo ID
 *     tags: [Authors]
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
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: Livro não encontrado
 */
routes.get("/authors/:id", AuthorController.getByIdAuthor);

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Cria um novo livro
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
routes.post("/authors", AuthorController.createAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Atualiza os dados de um livro existente
 *     tags: [Authors]
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
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *       404:
 *         description: Livro não encontrado
 */
routes.put("/authors/:id", AuthorController.putAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Remove um livro pelo ID
 *     tags: [Authors]
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
routes.delete("/authors/:id", AuthorController.deleteAuthor);

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
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
