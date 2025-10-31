import express from "express";
import bookRoutes from "./bookRoutes.js";

const routes = (app) => {
  app.route("/").get((_, res) => {
    res.status(200).send("Welcome to the Book API");
  });

  app.use(express.json(), bookRoutes);
};

export default routes;
