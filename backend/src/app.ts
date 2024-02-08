import bodyParser from "body-parser";
import { connectToDb } from "./db";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
const app = express();
// connect to database
connectToDb();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan("dev"));

export { app };
