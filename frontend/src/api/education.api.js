import { api } from './client';

export const getEducationList = (query) => api.get(`/api/v1/education${query??""}`)

export const getEducation = (id) => api.get(`/api/v1/education/${id}`)

export const createEducation = (formData) => api.post(`/api/v1/education`, formData, {
  'Content-Type': 'x-www-form-urlencoded',
  'Content-Encoding': 'multipart/form-data'
})
