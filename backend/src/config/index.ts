import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5001;
const dburl = process.env.DB_URL || "";
const jwtsecret = process.env.JWT_SECRET || "admin";
export { port, dburl, jwtsecret };
