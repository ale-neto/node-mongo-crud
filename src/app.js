import express from "express";
import cors from "cors";
import connectDB from "./config/dbConnect.js";
import routes from "./routes/index.js";
import { swaggerUi, swaggerSpec } from "./config/swaggerConfig.js";
import manipulationOfError from "./middleware/minipulation-of-error.js";
import manipulation404 from "./middleware/manipulation404.js";

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

app.use(manipulation404);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(manipulationOfError);

export default app;
