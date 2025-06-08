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

export interface RegisterResponse {
  
}

export interface Contact {
  name: string, 
  number: string,
  belongsTo: {
    username: string
  }
};

// Renamed from User to LocalStorageJwt
export interface LocalStorageJwt {
  token: string,
  username: string
}

export interface JwtToken {
  id: string, 
  username: string, 
  name: string
}
