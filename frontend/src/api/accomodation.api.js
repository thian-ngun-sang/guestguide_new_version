import { api } from './client';

export const getAccomodation = (id) => api.get(`/api/v1/accomodation/${id}`)
