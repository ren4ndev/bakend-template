import MovieRepository, { MovieCreateInput } from "./MovieRepository";
import Movie from "./Movie";

export default class MovieService {
  constructor(private repo = new MovieRepository()) {}

  async listAll(): Promise<Movie[]> {
    return this.repo.findAll();
  }

  async getById(id: number): Promise<Movie | null> {
    return this.repo.findById(id);
  }

  async create(payload: MovieCreateInput): Promise<Movie> {
    // exemplo: regra simples de negócio
    if (!payload.title || payload.title.trim().length === 0) {
      throw new Error("Title is required");
    }
    return this.repo.create(payload);
  }

  async update(
    id: number,
    payload: Partial<MovieCreateInput>
  ): Promise<Movie | null> {
    // poderia ter validações adicionais
    return this.repo.update(id, payload);
  }

  async remove(id: number): Promise<boolean> {
    return this.repo.delete(id);
  }
}
