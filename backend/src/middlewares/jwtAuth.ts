import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import config from "../config";
import type { CustomJwtPayload } from "@shared/types";


export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.token;

  try {
    if (!token) {
      return void res.status(401).json({ error: "No token provided" });
    }

    const payload = jwt.verify(token, config.SECRET_KEY) as CustomJwtPayload;
    if (!payload) {
      return void res.status(401).json({ error: "Invalid token" });
    }

    req.user = {
      id: payload.id,
      username: payload.username,
      name: payload.name
    };

    next();
  } catch (error) {
    return void res.status(401).json({ error: "Token invalid or expired" });
  }
};
