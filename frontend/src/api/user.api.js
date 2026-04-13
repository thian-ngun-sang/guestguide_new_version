import { api } from './client';

export const getCurrentUser = () => api.get("/api/v1/user/me")
export const updateUser = (user) => api.post(`/api/v1/user/update-profile`, user)
export const updateUserBio = (form) => api.patch(`/api/v1/user/update-bio`, form)

export const updateProfileImage = (formData) =>
  api.post(`/api/v1/user/update-profile-image`, formData, {
    headers: {
      'Content-Type': 'x-www-form-urlencoded',
      'Content-Encoding': 'multipart/form-data'
    }
  });

export const updateCoverImage = (formData) =>
  api.post(`/api/v1/user/update-cover-image`, formData, {
    headers: {
      'Content-Type': 'x-www-form-urlencoded',
      'Content-Encoding': 'multipart/form-data'
    }
  });

export const deleteProfileImage = () => api.post(`/api/v1/user/delete-profile-image`)

export const deleteCoverImage = () => api.post(`/api/v1/user/delete-cover-image`)
