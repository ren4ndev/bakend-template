import prisma from "../../../config/prisma/client";
import Movie from "./Movie";

export type MovieCreateInput = {
  title: string;
  description?: string | null;
  releaseYear?: number | null;
  rating?: number | null;
};

export default class MovieRepository {
  async findAll(): Promise<Movie[]> {
    const rows = await prisma.movie.findMany({
      orderBy: { createdAt: "desc" },
    });
    return rows.map((r) => new Movie(r as any));
  }

  async findById(id: number): Promise<Movie | null> {
    const row = await prisma.movie.findUnique({ where: { id } });
    return row ? new Movie(row as any) : null;
  }

  async create(data: MovieCreateInput): Promise<Movie> {
    const row = await prisma.movie.create({ data });
    return new Movie(row as any);
  }

  async update(
    id: number,
    data: Partial<MovieCreateInput>
  ): Promise<Movie | null> {
    try {
      const row = await prisma.movie.update({
        where: { id },
        data,
      });
      return new Movie(row as any);
    } catch (err: any) {
      // se não existir, Prisma lança erro; retornamos null para o service lidar
      if (err.code === "P2025") return null;
      throw err;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await prisma.movie.delete({ where: { id } });
      return true;
    } catch (err: any) {
      if (err.code === "P2025") return false;
      throw err;
    }
  }
}
