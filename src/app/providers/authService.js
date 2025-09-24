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
};
