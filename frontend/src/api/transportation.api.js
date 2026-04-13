import { api } from './client';

export const getTransportation = (id) => api.get(`/api/v1/transportation/${id}`)
