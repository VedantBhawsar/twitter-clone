import { Request, Response } from "express";
import { getLikeByTweetId, giveLike, removeLikeById } from "../modals/like";

class LikeControllers {
  public giveLike = async (request: Request, response: Response) => {
    try {
      const { tweet_id, user_id } = request.body;
      const like = { tweet_id, user_id };
      const newLike = await giveLike(like);
      response.status(200).json({
        message: `[giveLike]: ${newLike} `,
      });
    } catch (error: any) {
      console.log(`[giveLike]: ${error.message}`);
      response.status(500).json({ error: error.message });
    }
  };

  public getLike = async (request: Request, response: Response) => {
    try {
      const like = await getLikeByTweetId(request.params.id);
      response.status(200).json(like);
    } catch (error: any) {
      console.log(`[getLike]: ${error.message}`);
      response.status(500).json({ error: error.message });
    }
  };

  public removeLike = async (request: Request, response: Response) => {
    try {
      await removeLikeById(request.params.id);
      response.status(200).json({
        message: "Deleted Like!",
      });
    } catch (error: any) {
      console.log(`[removeLike]: ${error.message}`);
      response.status(500).json({ error: error.message });
    }
  };
}

export default new LikeControllers();
