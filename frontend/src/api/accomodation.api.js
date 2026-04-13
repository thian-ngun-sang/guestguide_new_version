import { api } from './client';

export const getAccomodationList = (query) => api.get(`/api/v1/accomodation${query??""}`)

export const getAccomodation = (id) => api.get(`/api/v1/accomodation/${id}`)

export const createAccomodation = (formData) => api.post(`/api/v1/accomodation`, formData, {
  'Content-Type': 'x-www-form-urlencoded',
  'Content-Encoding': 'multipart/form-data'
})
