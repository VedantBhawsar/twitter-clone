import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtsecret } from "../config";
export function verifyToken(
  request: any,
  response: Response,
  next: NextFunction
) {
  const token = request.cookies.user
  if (!token) return response.status(401).json({ error: "Access denied" });
  try {
    const decoded: any = jwt.verify(token, jwtsecret);
    request.user_id = decoded?.user_id || decoded;
    next();
  } catch (error) {
    response.status(401).json({ error: "Invalid token" });
  }
}
