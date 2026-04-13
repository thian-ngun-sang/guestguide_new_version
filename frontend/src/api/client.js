import axios from 'axios';

import store from '@/store';

export const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 300000, // 5 minutes
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = store.state.token; // or from store / helper
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
