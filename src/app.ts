import express from "express";
import dotenv from "dotenv";
import pino from "pino";
import movieRoutes from "./app/domains/movies/movie.routes";

dotenv.config();
const logger = pino();
const app = express();

app.use(express.json());
app.get("/health", (req, res) => res.json({ status: "ok" }));

// montar rotas de domínio
app.use(movieRoutes);

// middleware de erro genérico (opcional)
app.use(
  (err: any, _req: express.Request, res: express.Response, _next: any) => {
    logger.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
);

export { app, logger };
