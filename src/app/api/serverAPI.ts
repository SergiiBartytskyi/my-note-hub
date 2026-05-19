import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

export const serverAPI = axios.create({
  baseURL: process.env.NOTEHUB_API_URL,
});

serverAPI.interceptors.request.use(config => {
  const token = process.env.NOTEHUB_TOKEN;

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  config.headers.set('Accept', 'application/json');

  return config;
});
