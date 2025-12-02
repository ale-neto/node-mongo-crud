import express from "express";
import cors from "cors";
import connectDB from "./config/dbConnect.js";
import routes from "./routes/index.js";
import { swaggerUi, swaggerSpec } from "./config/swaggerConfig.js";
import mongoose from "mongoose";

const dbConnection = await connectDB();
dbConnection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
dbConnection.once("open", () => console.log("MongoDB connected!"));

const app = express();

app.use(cors());
app.use(express.json());

routes(app);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err, req, res, next) => {
  console.log("Middleware de erro pegou:", err);

  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).send({ message: "Something is wrong" });
  } else if (err instanceof mongoose.Error.ValidationError) {
    return res
      .status(400)
      .send({ message: `The following errors were found: ${err.message}` });
  } else {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

export default app;
