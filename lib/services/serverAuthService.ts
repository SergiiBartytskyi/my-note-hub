import { serverAPI } from './serverAPI';
import type { User } from '../../types/auth';

export const serverGetMe = async () => {
  const { data } = await serverAPI.get<User>('users/me');
  return data;
};
