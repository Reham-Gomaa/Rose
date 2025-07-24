export interface AuthResponse {
  message: string;
  token: string;
  user?: {
    email: string;
    name?: string;
    id?: string;
  };
}

export interface AdaptedAuthResponse {
  message: string;
  token: string;
  userEmail: string;
}
