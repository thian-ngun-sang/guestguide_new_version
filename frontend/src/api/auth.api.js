import { api } from './client';

export const login = (credentials) => api.post('/api/auth/login', credentials)

export const register = (credentials) => api.post('/api/auth/register', credentials)

export const fetchUser = () => api.get('/api/v1/user/me')

export const changePassword = (form) => api.post(`/api/auth/change-password`, form)
