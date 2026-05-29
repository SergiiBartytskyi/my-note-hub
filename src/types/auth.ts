export type AuthRequest = {
  email: string;
  password?: string;
};

export interface AuthResponse {
  username: string;
  email: string;
  avatar: string;
}
