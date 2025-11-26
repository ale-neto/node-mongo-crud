import express from "express";
import cors from "cors";
import connectDB from "./config/dbConnect.js";
import routes from "./routes/index.js";
import { swaggerUi, swaggerSpec } from "./config/swaggerConfig.js";
import { mongo } from "mongoose";

const dbConnection = await connectDB();
dbConnection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
dbConnection.once("open", () => console.log("MongoDB connected!"));

const app = express();

app.use(cors());

app.use(express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).send({ message: "Invalid JSON payload" });
  }

  if (err instanceof mongo.Error.CastError) {
    return res.status(400).send({ message: "Something is wrong" });
  }
  res.status(500).send("Something broke!");
});

routes(app);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
