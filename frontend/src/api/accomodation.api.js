import { api } from './client';

export const getAccomodationList = (query) => api.get(`/api/v1/accommodation${query??""}`)

export const getAccomodation = (id) => api.get(`/api/v1/accommodation/${id}`)

export const createAccomodation = (formData) => api.post(`/api/v1/accommodation`, formData, {
    headers: {
      'Content-Type': 'x-www-form-urlencoded',
      'Content-Encoding': 'multipart/form-data'
    }
  })
