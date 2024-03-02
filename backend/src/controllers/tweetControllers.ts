import { Request, Response } from "express";
import {
  createTweet,
  deleteTweetById,
  getAllTweet,
  getTweetById,
  updateTweetById,
} from "../modals/tweet";

class TweetController {
  public getTweets = async (request: Request, response: Response) => {
    try {
      let tweets = await getAllTweet();
      tweets = tweets.reverse();
      response.status(200).json(tweets);
    } catch (error: any) {
      console.log(`[tweet]: ${error.message}`);
      response.status(500).json({ error: error.message });
    }
  };

  public getTweet = async (request: Request, response: Response) => {
    try {
      console.log(request.params.id);
      const tweet = await getTweetById(request.params.id);
      if (!tweet) {
        response.status(404).json({
          message: "Tweet not found",
        });
        return;
      }
      response.status(200).json(tweet);
    } catch (error: any) {
      console.log(`[tweet]: ${error.message}`);
      response.status(500).json({ error: error.message });
    }
  };

  public createTweet = async (request: Request, response: Response) => {
    try {
      const { author_id, message, images, comments } = request.body;
      const tweet = { author_id, message, images, comments };
      const newTweet = await createTweet(tweet);
      response.status(200).json(newTweet);
      return;
    } catch (error: any) {
      console.log(`[createTweet]: ${error.message}`);
      response.status(500).json({ error: error.message });
    }
  };

  public deleteTweet = async (request: Request, response: Response) => {
    try {
      await deleteTweetById(request.params.id);
      response.status(200).json({
        message: "Tweet deleted",
      });
      return;
    } catch (error: any) {
      console.log(`[createTweet]: ${error.message}`);
      response.status(500).json({ error: error.message });
    }
  };

  public updateTweet = async (request: Request, response: Response) => {
    try {
      let existTweet = await getTweetById(request.params.id);
      if (!existTweet) {
        response.status(404).json({
          message: "Tweet not found",
        });
        return;
      }
      existTweet = await updateTweetById(request.params.id, request.body);
      response.status(200).json(existTweet);
    } catch (error: any) {
      response.status(500).json({
        message: error.message,
      });
    }
  };
}

export default new TweetController();
