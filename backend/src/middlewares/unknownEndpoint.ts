import { Request, Response } from "express";
import path from "path";

const unknownEndpoint = (req: Request, res: Response) => {
  // return a 404 for API requests
  if (req.path.startsWith("/api/")) {
    return void res.status(404).send({ error: "unknown endpoint" });
  }

  // else use not found page in frontend
  return void res.sendFile(path.resolve(__dirname, "../../dist/index.html"));
};

export default unknownEndpoint;