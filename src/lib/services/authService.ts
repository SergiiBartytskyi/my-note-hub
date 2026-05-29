import { AuthRequest, AuthResponse } from '@/types/auth';
import { clientAPI } from './clientAPI';

export const signUp = async (userData: AuthRequest): Promise<AuthResponse> => {
  const response = await clientAPI.post<AuthResponse>(`/api/auth/register`, userData);
  return response.data;
};
