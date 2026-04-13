import { api } from './client';

export const getEducation = (id) => api.get(`/api/v1/education/${id}`)
