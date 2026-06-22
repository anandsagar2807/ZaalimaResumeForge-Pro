import axios from 'axios';

// Normalize the base URL so it always ends with /api, regardless of whether
// VITE_API_URL includes the /api suffix (e.g. "http://localhost:5001/api")
// or just the origin (e.g. "http://localhost:5001"). This keeps every service
// that builds on this client consistent with the Express route mounting
// (server mounts routes under /api/*).
const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const API_URL = rawApiUrl.replace(/\/$/, '').endsWith('/api')
  ? rawApiUrl.replace(/\/$/, '')
  : `${rawApiUrl.replace(/\/$/, '')}/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;