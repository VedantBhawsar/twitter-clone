import mongoose from "mongoose";

interface ILike {
  tweet_id: string;
  user_id: string;
}

const Like = mongoose.model(
  "Like",
  new mongoose.Schema({
    tweet_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tweet" },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    created_at: { type: Date, default: Date.now },
  })
);

export const getLikeByTweetId = async (tweetId: string) =>
  await Like.find({ tweet_id: tweetId });

export const giveLike = async (like: ILike) =>
  await new Like({
    ...like,
  }).save();

export const removeLikeById = async (id: string) =>
  await Like.findByIdAndDelete(id);
