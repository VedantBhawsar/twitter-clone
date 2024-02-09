import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import CommentsController from "../controllers/commentControllers";

const router = Router();

router.post("/give", verifyToken, CommentsController.createComment);
router.delete("/delete/:id", verifyToken, CommentsController.deleteComment);
router.get("/:id", verifyToken, CommentsController.getComments);
router.put("/update/:id", verifyToken, CommentsController.updateComment);

export { router as commentRoutes };
