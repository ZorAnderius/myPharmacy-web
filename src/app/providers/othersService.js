import api from "./api.js";

export const othersServices = {
  getCategories: async () => {
    const response = await api.get("/categories");
    return response.data;
  },
  
  getProductStatuses: async () => {
    const response = await api.get("/product-statuses");
    return response.data;
  },
};
