import { Request, Response } from "express";
import MovieService from "./MovieService";

const service = new MovieService();

export default class MovieController {
  static async list(req: Request, res: Response) {
    const movies = await service.listAll();
    return res.json(movies);
  }

  static async get(req: Request, res: Response) {
    const { id } = req.params;
    const movie = await service.getById(Number(id));
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    return res.json(movie);
  }

  static async create(req: Request, res: Response) {
    try {
      const payload = req.body;
      const movie = await service.create(payload);
      return res.status(201).json(movie);
    } catch (err: any) {
      return res.status(400).json({ message: err.message ?? "Bad request" });
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const payload = req.body;
    const movie = await service.update(Number(id), payload);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    return res.json(movie);
  }

  static async remove(req: Request, res: Response) {
    const { id } = req.params;
    const ok = await service.remove(Number(id));
    if (!ok) return res.status(404).json({ message: "Movie not found" });
    return res.status(204).send();
  }
}
