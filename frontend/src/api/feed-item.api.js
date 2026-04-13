import { api } from './client';

export const getFeedItemList = (query) => api.get(`/api/v1/feed-item${query??""}`)
