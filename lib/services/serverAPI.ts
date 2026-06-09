import 'server-only';

import axios from 'axios';
import { cookies } from 'next/headers';

export const serverAPI = axios.create({
  baseURL: process.env.NOTEHUB_API_URL,
  withCredentials: true,
});

serverAPI.interceptors.request.use(async config => {
  const token = process.env.NOTEHUB_TOKEN;

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  if (!config.headers.get('Cookie')) {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    if (cookieString) {
      config.headers.set('Cookie', cookieString);
    }
  }
  config.headers.set('Accept', 'application/json');
  return config;
});
