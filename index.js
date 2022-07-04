import { app } from "./app/app.js";
import express from "express";
import "./app/db/mongoose.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
});

app.listen(process.env.PORT, (error) => {
  if (error) console.error("Error: ", error);
  console.log("SERVER IS UP AND RUNNING ON PORT ", process.env.PORT);
});
