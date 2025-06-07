import { Request, Response } from 'express';

const unknownEndpoint = (req: Request, res: Response) => {
  return void res.status(404).send({ error: "unknown endpoint" });
};

export default unknownEndpoint;