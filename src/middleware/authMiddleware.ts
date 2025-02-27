import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

export interface CustomRequest extends Request {
  user?: { userId: string };
}

export const verifyTokenMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).send("Access denied. No token provided.");
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
    return;
  }
};
