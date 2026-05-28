import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';

export type ApiError = AxiosError<{ error: string }>;

export const serverAPI = axios.create({
  baseURL: process.env.NOTEHUB_API_URL,
});

serverAPI.interceptors.request.use(async config => {
  const token = process.env.NOTEHUB_TOKEN;

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  if (cookieString) {
    config.headers.set('Cookie', cookieString);
  }

  config.headers.set('Accept', 'application/json');

  return config;
});
