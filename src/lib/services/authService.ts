import { AuthRequest, AuthResponse, CheckSessionRequest, User } from '@/types/auth';
import { clientAPI } from './clientAPI';

export const signUp = async (userData: AuthRequest): Promise<AuthResponse> => {
  const response = await clientAPI.post<AuthResponse>(`/api/auth/register`, userData);
  return response.data;
};
export const signIn = async (userData: AuthRequest): Promise<AuthResponse> => {
  const response = await clientAPI.post<AuthResponse>(`/api/auth/login`, userData);
  return response.data;
};

export const checkSession = async () => {
  const res = await clientAPI.get<CheckSessionRequest>('/api/auth/session');
  console.log('Session check response:', res.data);
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await clientAPI.get<User>('/api/auth/refreshSession');
  return data;
};
