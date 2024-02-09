import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import LikeController from "../controllers/likeControllers";

const router = Router();

router.post("/give", verifyToken, LikeController.giveLike);
router.delete("/remove/:id", verifyToken, LikeController.removeLike);
router.get("/:id", verifyToken, LikeController.getLike);

export { router as likesRoutes };
