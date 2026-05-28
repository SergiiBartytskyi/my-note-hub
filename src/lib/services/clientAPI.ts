import axios from 'axios';

export const clientAPI = axios.create({
  baseURL:
    typeof window !== 'undefined' ? '' : (process.env.NOTEHUB_APP_URL ?? 'http://localhost:3000'),
  withCredentials: true,
});
