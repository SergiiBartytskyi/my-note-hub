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
  id: string;
  email: string;
  username: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
};

export type CheckSessionRequest = {
  success: boolean;
};
