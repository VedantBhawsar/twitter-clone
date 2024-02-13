import { timeStamp } from "console";
import mongoose, { ObjectId } from "mongoose";
import { ITweet } from "./tweet";

interface IImages {
  profileImage?: string | null;
  coverImage?: string | null;
}

interface IUser {
  name: string;
  surname?: string | null;
  email: string;
  password: string;
  dob?: Date | null;
  username: string;
  images?: IImages | null;
  tweets?: ITweet[] | null;
  followers?: any | null;
  followings?: any | null;
}

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      min: [3, "The Length of the name must be greater than 3"],
    },
    surname: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: [6, "The Length of the password must be greater than 6"],
    },
    images: {
      profileImage: {
        type: String,
        required: false,
      },
      coverImage: {
        type: String,
        required: false,
      },
    },
    description: {
      type: String,
    },
    dob: {
      type: Date,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  })
);

export const getUserById = async (id: string) => await User.findById(id);

export const getUserbyUsername = async (userUsername: string) =>
  await User.findOne({ username: userUsername });

export const getUserbyEmail = async (email: string) =>
  await User.findOne({ email: email });

export const createUser = async (user: IUser) => await new User(user).save();

export const updateUserById = async (updateUser: any, id: string) =>
  await User.findByIdAndUpdate(id, {
    ...updateUser,
  });

export const getAllUsers = async () =>
  await User.find({}).sort({ createdAt: -1 });

export const deleteUserById = async (id: string) =>
  await User.findByIdAndDelete(id);

export const followUser = async (id: string, userId: string) =>
  await User.findByIdAndUpdate(id, {
    $addToSet: {
      followings: userId,
    },
  });

export const followingUser = async (id: string, userId: string) =>
  await User.findByIdAndUpdate(id, {
    $addToSet: {
      followers: userId,
    },
  });

export const unfollowUser = async (id: string, userId: string) =>
  await User.findByIdAndUpdate(id, {
    $pull: {
      followings: userId,
    },
  });
