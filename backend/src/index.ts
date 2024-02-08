import { port } from "./config";
import {app} from "./app";
import { userRoutes } from "./routes/userRoutes";


app.use("/users", userRoutes);

app.get("/", (req: Request, res: any) => {
  res.status(200).json("Server is running successfully!");
});

app.get("*", (req: Request, res: any) => {
  res.status(200).json("Invalid Request");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
