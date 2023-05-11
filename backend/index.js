import express from "express";
import { PORT } from "./config.js";
import saesRoutes from "./routes/saes-routes.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(saesRoutes);

app.listen(PORT);
console.log(`Server running on ${PORT}`);
