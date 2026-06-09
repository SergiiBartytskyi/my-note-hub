export type AuthRequest = {
  email: string;
  password?: string;
};

export interface AuthResponse {
  username: string;
  email: string;
  avatar: string;
}

export type User = {
  email: string;
  username: string;
  avatar: string;
};

export type CheckSessionRequest = {
  success: boolean;
};
