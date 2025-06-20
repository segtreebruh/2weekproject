import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import config from '../config';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, String(user!.passwordHash))))
    return void res.status(401).send({ err: "Invalid credentials "});

  const payload = {
    username: user.username,
    id: user._id
  };
 
  if (!config.SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in config");
  }

  const token = jwt.sign(payload, config.SECRET_KEY, { expiresIn: 60*60 });

  res.status(200).send({ token, username: username, name: user.name});
} 