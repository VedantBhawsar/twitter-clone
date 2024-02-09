import mongoose, { Types } from "mongoose";
import { IComments } from "./comment";

export interface ITweet {
  author_id: Types.ObjectId;
  message: string;
  images?: string[] | null;
  comments?: IComments | null;
}

const Tweet = mongoose.model(
  "Tweet",
  new mongoose.Schema({
    author_id: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: false,
      min: [3, "The Length of the surname must be greater than 3"],
    },
    images: [
      {
        type: String,
        required: false,
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);

export const getAllTweet = async () => await Tweet.find({});
export const getTweetById = async (id: string) => await Tweet.findById(id);
export const deleteTweetById = async (id: string) =>
  await Tweet.findByIdAndDelete(id);

export const updateTweetById = async (id: string, tweet: ITweet) =>
  await Tweet.findByIdAndUpdate(id, {
    ...tweet,
  });

export const createTweet = async (tweetData: ITweet) =>
  await new Tweet(tweetData).save();
