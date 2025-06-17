export interface LoginRequest {
  username: string, 
  password: string 
};

export interface LoginResponse {
  token: string, 
  username: string, 
  name: string
}

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

export interface JwtAccessToken {
  token: string,
  username: string
}

export interface NotificationType {
  msg: string,
  type: string
}


// extend express.Request
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
      }
      token?: string;
    }
  }
}