import api from "./api.js";

export const reviewsServices = {
  getProductReviews: async (shopId, productId) => {
    const response = await api.get(`/shops/${shopId}/products/${productId}/reviews`);
    return response.data;
  },

  createProductReview: async (shopId, productId, reviewData) => {
    const response = await api.post(`/shops/${shopId}/products/${productId}/reviews`, reviewData);
    return response.data;
  },
};
