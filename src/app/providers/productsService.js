import api from "./api.js";

export const productsServices = {
  createProduct: async (shopId, productData) => {
    const response = await api.post(`/shops/${shopId}/products/add`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
