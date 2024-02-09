import { Router } from "express";
import TweetController from "../controllers/tweetControllers";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", verifyToken, TweetController.getTweets);
router.delete("/delete/:id", verifyToken, TweetController.deleteTweet);
router.get("/:id", verifyToken, TweetController.getTweet);
router.put("/update/:id", verifyToken, TweetController.updateTweet);
router.post("/create", verifyToken, TweetController.createTweet);

export { router as tweetRoutes };
