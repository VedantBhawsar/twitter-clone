import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5001;
const dburl = process.env.DB_URL || "";

export { port, dburl };
