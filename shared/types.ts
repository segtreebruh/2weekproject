
export interface LoginRequest {
  username: string, 
  password: string 
};

export interface RegisterRequest {
  username: string, 
  email: string, 
  name: string, 
  password: string
}

export interface Contact {
  id: string,
  name: string, 
  number: string,
  belongsTo: {
    username: string
  }
};

export interface NotificationType {
  msg: string,
  type: string
}

// custom jwt for both be/fr
export interface JwtPayload {
  id: string;
  username: string;
  name: string;
  exp?: number;
  iat?: number;
}

// extend express.Request
declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        username: string;
        name: string;
      }
      token?: string;
    }
  }
}