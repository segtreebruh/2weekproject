import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config';
import '@shared/types';

export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.token;
  
  try {
    if (!config.SECRET_KEY) {
      throw new Error('SECRET_KEY is not defined in configuration');
    }
    
    if (!token) {
      return void res.status(401).json({ error: 'No token provided' });
    }
    
    const payload = jwt.verify(token, config.SECRET_KEY);
    if (!payload || typeof payload === 'string') {
      return void res.status(401).json({ error: 'Invalid token' });
    }
    
    req.user = {
      id: payload.id,
      username: payload.username
    };
    
    next();
  } catch (error) {
    return void res.status(401).json({ error: 'Token invalid or expired' });
  }
};