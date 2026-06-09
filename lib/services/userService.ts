import { User } from '../../types/auth';
import { clientAPI } from './clientAPI';

export const getMe = async () => {
  const { data } = await clientAPI.get<User>('/api/users/me');
  return data;
};

export const updateMe = async (userData: Partial<User>): Promise<User> => {
  const { data } = await clientAPI.patch<User>('/api/users/me', userData);
  return data;
};

// export const uploadImage = async (file: File): Promise<string> => {
//   const formData = new FormData();
//   formData.append('file', file);

//   const { data } = await clientAPI.post<{ url: string }>('/api/upload', formData);
//   return data.url;
// };
