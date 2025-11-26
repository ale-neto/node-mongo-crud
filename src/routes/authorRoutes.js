import express from "express";
import AuthorController from "../controllers/authorController.js";

const routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Gerenciamento de autores
 */

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Retorna todos os autores (com paginação)
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
 *         description: Lista de autores
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
 *     summary: Busca autores por nome ou nacionalidade
 *     tags: [Authors]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: "Termo de busca no nome do autor"
 *       - in: query
 *         name: nationality
 *         schema:
 *           type: string
 *         description: "Termo de busca na nacionalidade"
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
 *         description: "Autores encontrados"
 *       400:
 *         description: "Falta de parâmetros de busca"
 *       404:
 *         description: "Nenhum autor encontrado"
 */
routes.get("/authors/search", AuthorController.searchAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Retorna um autor específico pelo ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do autor
 *     responses:
 *       200:
 *         description: Autor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: Autor não encontrado
 */
routes.get("/authors/:id", AuthorController.getByIdAuthor);

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Cria um novo autor
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       201:
 *         description: Autor criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
routes.post("/authors", AuthorController.createAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Atualiza os dados de um autor existente
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do autor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: Autor atualizado com sucesso
 *       404:
 *         description: Autor não encontrado
 */
routes.put("/authors/:id", AuthorController.putAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Remove um autor pelo ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do autor
 *     responses:
 *       200:
 *         description: Autor removido com sucesso
 *       404:
 *         description: Autor não encontrado
 */
routes.delete("/authors/:id", AuthorController.deleteAuthor);

/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: ID gerado automaticamente pelo MongoDB
 *         name:
 *           type: string
 *           example: Robert C. Martin
 *         nationality:
 *           type: string
 *           example: American
 */

export default routes;
