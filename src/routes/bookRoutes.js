import express from "express";
import bookController from "../controllers/bookController.js";

const routes = express.Router();

routes.get("/books", bookController.getAllBooks);

export default routes;
