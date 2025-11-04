import { Router } from "express";
import MovieController from "./MovieController";
import { validateBody } from "../../../middlewares/validateBody";
import { createMovieSchema, updateMovieSchema } from "../../../validators/movie.validator";

const router = Router();

router.get("/movies", MovieController.list);
router.get("/movies/:id", MovieController.get);
router.post("/movies", validateBody(createMovieSchema), MovieController.create);
router.put("/movies/:id", validateBody(updateMovieSchema), MovieController.update);
router.delete("/movies/:id", MovieController.remove);

export default router;
