import { AuthRequest, AuthResponse, CheckSessionRequest, User } from '@/types/auth';
import { clientAPI } from './clientAPI';

export const signUp = async (userData: AuthRequest): Promise<AuthResponse> => {
  const { data } = await clientAPI.post<AuthResponse>(`/api/auth/register`, userData);
  return data;
};
export const signIn = async (userData: AuthRequest): Promise<AuthResponse> => {
  const { data } = await clientAPI.post<AuthResponse>(`/api/auth/login`, userData);
  return data;
};

export const checkSession = async () => {
  const { data } = await clientAPI.get<CheckSessionRequest>('/api/auth/session');
  return data.success;
};

export const getMe = async () => {
  const { data } = await clientAPI.get<User>('/api/users/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await clientAPI.post('/api/auth/logout');
};
