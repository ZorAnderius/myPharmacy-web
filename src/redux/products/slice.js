import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { createProductThunk, updateProductThunk, deleteProductThunk } from "./operations";
import {
  handleProductsPending,
  handleProductsRejected,
  handleCreateProduct,
  handleUpdateProduct,
  handleDeleteProduct,
} from "./handlers";

const sliceProducts = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProductThunk.fulfilled, handleCreateProduct)
      .addCase(updateProductThunk.fulfilled, handleUpdateProduct)
      .addCase(deleteProductThunk.fulfilled, handleDeleteProduct)
      .addMatcher(
        isAnyOf(createProductThunk.pending, updateProductThunk.pending, deleteProductThunk.pending),
        handleProductsPending
      )
      .addMatcher(
        isAnyOf(createProductThunk.rejected, updateProductThunk.rejected, deleteProductThunk.rejected),
        handleProductsRejected
      );
  },
});

export const { clearProductsError } = sliceProducts.actions;
export const productsReducer = sliceProducts.reducer;
