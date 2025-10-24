import express from "express";
import bookRoutes from "./bookRoutes.js";

const router = (app) => {
  app.route("/").get((_, res) => {
    res.send("Welcome to the Book API");
  });

  app.use(express.json(), bookRoutes);
};

export default router;
