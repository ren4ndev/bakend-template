import express from "express";
import dotenv from "dotenv";
import pino from "pino";

dotenv.config();
const logger = pino();
const app = express();

app.use(express.json());
app.get("/health", (req, res) => res.json({ status: "ok" }));

export { app, logger };
