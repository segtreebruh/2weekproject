import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config';

export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = (req as any).token;
  
  try {
    if (!config.SECRET_KEY) {
      throw new Error('SECRET_KEY is not defined in configuration');
    }
    
    const decodedToken = jwt.verify(token, config.SECRET_KEY);
    if (!decodedToken || typeof decodedToken === 'string') {
      return void res.status(401).json({ error: 'Token invalid' });
    }
    
    // You can add the decoded token to the request for use in subsequent middleware/routes
    // (req as any).user = decodedToken;
    
    next();
  } catch (error) {
    return void res.status(401).json({ error: 'Token invalid or expired' });
  }
};