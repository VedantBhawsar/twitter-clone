import mongoose from "mongoose";
import { dburl } from "../config";

export function connectToDb() {
  mongoose
    .connect(dburl, {
      connectTimeoutMS: 5000,
    })
    .then(() => console.log("[database]: Connected to database!"))
    .catch(() => console.log("[database]: Error while connecting to database"));
}