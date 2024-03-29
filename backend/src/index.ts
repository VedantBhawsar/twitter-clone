import { port } from "./config";
import { app } from "./app";
import { userRoutes } from "./routes/userRoutes";
import { tweetRoutes } from "./routes/tweetRoutes";
import { likesRoutes } from "./routes/LikeRoutes";
import { commentRoutes } from "./routes/commentRoutes";

app.use("/user", userRoutes);
app.use("/tweet", tweetRoutes);
app.use("/like", likesRoutes);
app.use("/comment", commentRoutes);

app.get("/", (req: Request, res: any) => {
  res.status(200).json("Server is running successfully!");
});

app.get("*", (req: Request, res: any) => {
  res.status(200).json("Invalid Request");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
