import { Router } from "express";
import UserController from "../controllers/userControllers";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", verifyToken, UserController.getUsers);
router.delete("/delete/:id", verifyToken, UserController.deleteUser);
router.get('/validatetoken', UserController.validateToken)
router.get("/:id", verifyToken, UserController.getUser);
router.put("/update/:id", verifyToken, UserController.updateUser);
router.post("/create", UserController.createUser);
router.post("/login", UserController.loginUser);
router.get("/validusername/:username", UserController.validUsername);

export { router as userRoutes };
