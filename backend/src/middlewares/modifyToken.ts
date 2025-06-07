import { Request, Response, NextFunction } from 'express';

const modifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.get("authorization");
  if (authorization != null) console.log("modifyToken " + authorization);

  if (authorization && authorization.startsWith("Bearer ")) {
    // delete 'Bearer' and add new field 'token'
    (req as any).token = authorization.substring(7);
  }

  next();
}

export default modifyToken;