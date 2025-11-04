import { Request, Response, NextFunction } from "express";
import MovieService from "./MovieService";
import MovieRepository from "./MovieRepository";

const movieRepository = new MovieRepository();
const movieService = new MovieService(movieRepository);

export default class MovieController {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const movies = await movieService.listAll();
      return res.json(movies);
    } catch (error) {
      next(error);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const movie = await movieService.getById(Number(id));
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }
      return res.json(movie);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const movie = await movieService.create(payload);
      return res.status(201).json(movie);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const payload = req.body;
      const movie = await movieService.update(Number(id), payload);
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }
      return res.json(movie);
    } catch (error) {
      next(error);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const ok = await movieService.remove(Number(id));
      if (!ok) {
        return res.status(404).json({ message: "Movie not found" });
      }
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
