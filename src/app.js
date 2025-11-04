import express from "express";
import cors from "cors";
import connectDB from "./config/dbConnect.js";
import routes from "./routes/index.js";
import { swaggerUi, swaggerSpec } from "./config/swaggerConfig.js";

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

export default app;
