import express from "express";
import bookRoutes from "./bookRoutes.js";
import authorRoutes from "./authorRoutes.js";

const routes = (app) => {
  app.route("/").get((_, res) => {
    res.status(200).send("Welcome to the Book API");
  });

  app.use(express.json(), bookRoutes, authorRoutes);
};

export default routes;
