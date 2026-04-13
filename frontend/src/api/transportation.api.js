import { api } from './client';

export const getTransportationList = (query) => api.get(`/api/v1/transportation${query??""}`)

export const getTransportation = (id) => api.get(`/api/v1/transportation/${id}`)

export const createTransportation = (formData) =>
  api.post(`/api/v1/transportation`, formData, {
    headers: {
      'Content-Type': 'x-www-form-urlencoded',
      'Content-Encoding': 'multipart/form-data'
    }
  })
