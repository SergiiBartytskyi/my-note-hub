import axios from 'axios';

export const axiosAPI = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

axiosAPI.interceptors.request.use(config => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  config.headers.set('Accept', 'application/json');

  return config;
});
