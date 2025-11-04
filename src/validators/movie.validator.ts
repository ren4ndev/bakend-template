import { z } from "zod";

export const createMovieSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  releaseYear: z.number().int().min(1888).optional(),
  rating: z.number().min(0).max(10).optional(),
});
export type CreateMovieDTO = z.infer<typeof createMovieSchema>;

export const updateMovieSchema = createMovieSchema.partial();
export type UpdateMovieDTO = z.infer<typeof updateMovieSchema>;
