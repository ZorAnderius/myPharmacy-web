import api from "./api.js";

export const shopsServices = {
  getAllShops: async () => {
    const response = await api.get("/shops");
    return response.data;
  },
  
  getUserShops: async () => {
    const response = await api.get("/shops/my-shop");
    return response.data;
  },
  
  createShop: async (shopData) => {
    const response = await api.post("/shops/create", shopData);
    return response.data;
  },
  
  getShopById: async (shopId) => {
    const response = await api.get(`/shops/${shopId}`);
    return response.data;
  },
  
  updateShop: async (shopId, shopData) => {
    const response = await api.patch(`/shops/${shopId}/update`, shopData);
    return response.data;
  },
};
