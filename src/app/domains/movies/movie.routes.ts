import { Router } from "express";
import MovieController from "./MovieController";

const router = Router();

router.get("/movies", MovieController.list);
router.get("/movies/:id", MovieController.get);
router.post("/movies", MovieController.create);
router.put("/movies/:id", MovieController.update);
router.delete("/movies/:id", MovieController.remove);

export default router;
