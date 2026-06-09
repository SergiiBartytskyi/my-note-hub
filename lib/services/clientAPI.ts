import axios from 'axios';

export const clientAPI = axios.create({
  baseURL:
    typeof window !== 'undefined' ? '' : (process.env.NOTEHUB_APP_URL ?? 'http://localhost:3000'),
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(null);
  });
  failedQueue = [];
};

clientAPI.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Якщо не 401 або запит вже повторювався — одразу відхиляємо
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Якщо вже йде оновлення токенів — ставимо запит у чергу
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => clientAPI(originalRequest))
        .catch(err => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Оновлюємо токени через наш Next.js route
      await clientAPI.get('/api/auth/session');
      processQueue(null);
      // Повторюємо оригінальний запит із новим токеном
      return clientAPI(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
