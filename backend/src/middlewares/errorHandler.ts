import { Request, Response, NextFunction } from 'express';

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("ErrorHandler intercepted: ", error);

  if (error.name === "CastError") {
    return void res.status(400).send({ error: "Invalid id" });
  } else if (error.name === "ValidationError") {
    return void res.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    const duplicate = error.message.includes("email")
      ? "Email"
      : "Username"
    return void res
      .status(400)
      .json({ error: `${duplicate} has already existed` });
  } else if (error.name === "JsonWebTokenError") {
    return void res.status(401).json({ error: "invalid token" });
  } else if (error.name === "TokenExpiredError") {
    return void res.status(401).json({
      error: "token expired",
    });
  }

  next(error);
};

export default errorHandler;