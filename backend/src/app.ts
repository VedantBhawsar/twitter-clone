import { connectToDb } from "./db";
import express from "express";

const app = express();

connectToDb();

export { app };
