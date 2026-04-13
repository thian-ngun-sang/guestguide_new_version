import { api } from './client';

export const createBookmark = (data) => api.post(`/api/v1/bookmarks`, data)
export const getBookmarkList = (query) => api.get(`/api/v1/bookmarks${query??""}`)
export const deleteBookmark = (id) => api.delete(`/api/v1/bookmarks/${id}`)
