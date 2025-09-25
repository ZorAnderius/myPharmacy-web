import { responseStatuses } from "../../constants/responseStatuses";

export const handleProductsPending = (state) => {
  state.status = responseStatuses.LOADING;
  state.error = null;
};

export const handleProductsRejected = (state, action) => {
  state.status = responseStatuses.REJECTED;
  state.error = action.payload;
};

export const handleCreateProduct = (state, action) => {
  state.status = responseStatuses.SUCCEEDED;
  state.products.push(action.payload.data);
  state.error = null;
};

export const handleUpdateProduct = (state, action) => {
  state.status = responseStatuses.SUCCEEDED;
  const updatedProduct = action.payload.data;
  const index = state.products.findIndex(product => product.id === updatedProduct.id);
  if (index !== -1) {
    state.products[index] = updatedProduct;
  }
  state.error = null;
};
