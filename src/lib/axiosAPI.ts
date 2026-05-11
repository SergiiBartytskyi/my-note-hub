import axios from 'axios';

export const axiosAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NOTEHUB_API_URL,
});
axiosAPI.interceptors.request.use(config => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  config.headers.set('Accept', 'application/json');
  console.log('API URL =', process.env.NEXT_PUBLIC_NOTEHUB_API_URL);
  return config;
});
