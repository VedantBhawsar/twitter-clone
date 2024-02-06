import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: [3, "The Length of the name must be greater than 3"],
  },
  surname: {
    type: String,
    require: false,
    min: [3, "The Length of the surname must be greater than 3"],
  },
  username: {
    type: String,
    require: false,
    unique: true,
  },
});

export const User = mongoose.model("User", UserSchema);
