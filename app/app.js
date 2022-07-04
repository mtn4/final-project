import express from "express";
import { indexRoute } from "./routes/index.routes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", indexRoute);
export { app };
