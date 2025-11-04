import MovieRepository from "./MovieRepository";
import Movie from "./Movie";
import {
  CreateMovieDTO,
  UpdateMovieDTO,
} from "../../../validators/movie.validator";

export default class MovieService {
  constructor(private repo: MovieRepository) {}

  async listAll(): Promise<Movie[]> {
    return this.repo.findAll();
  }

  async getById(id: number): Promise<Movie | null> {
    return this.repo.findById(id);
  }

  async create(payload: CreateMovieDTO): Promise<Movie> {
    return this.repo.create(payload);
  }

  async update(id: number, payload: UpdateMovieDTO): Promise<Movie | null> {
    return this.repo.update(id, payload);
  }

  async remove(id: number): Promise<boolean> {
    return this.repo.delete(id);
  }
}
