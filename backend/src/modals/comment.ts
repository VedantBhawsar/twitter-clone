import mongoose, { ObjectId } from "mongoose";

export interface IComments {
  tweet_id: ObjectId;
  author_id: ObjectId;
  message: string;
}

const Comments = mongoose.model(
  "Comments",
  new mongoose.Schema({
    tweet_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tweet" },
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: {
      type: String,
      required: true,
    },
    created_at: { type: Date, default: Date.now },
  })
);

export const getAllComments = async (id: string) =>
  await Comments.find({ tweet_id: id });

export const getCommentById = async (id: string) => await Comments.findById(id);

export const createComment = async (comment: IComments) =>
  await new Comments(comment).save();

export const updateComment = async (id: string, comment: IComments) =>
  await Comments.findByIdAndUpdate(id, { ...comment });

export const deleteComment = async (id: string) =>
  await Comments.findByIdAndDelete(id);
