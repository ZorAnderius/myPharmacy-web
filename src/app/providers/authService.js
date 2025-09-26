import { setAccessToken } from "./tokenManager.js";
import api from "./api.js";

export const authServices = {
  register: async (userData) => {
    const response = await api.post("/users/register", userData);
    const { accessToken, user } = response.data.data;
    setAccessToken(accessToken, user);
    return { accessToken, user };
  },
  login: async (userData) => {
    const response = await api.post("/users/login", userData);
    const { accessToken, user } = response.data.data;
    setAccessToken(accessToken, user);
    return { accessToken, user };
  },
  logout: async () => {
    await api.post("users/logout");
    setAccessToken(null);
  },
  refresh: async () => {
    const response = await api.post("/users/refresh");
    const { accessToken, user } = response.data.data;
    setAccessToken(accessToken, user);
    return { accessToken, user };
  },
  getCurrentUser: async () => {
    const response = await api.get("/users/current");
    const { user } = response.data.data;
    return { user };
  },
  updateAvatar: async (avatarFile) => {
    const formData = new FormData();
    formData.append('avatar', avatarFile);
    
    const response = await api.patch("/users/update-avatar", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    // Backend returns only avatar URL
    const avatarUrl = response.data?.data || response.data;
    
    return { avatarUrl };
  },
};
