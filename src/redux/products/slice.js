import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { createProductThunk, updateProductThunk } from "./operations";
import {
  handleProductsPending,
  handleProductsRejected,
  handleCreateProduct,
  handleUpdateProduct,
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
      .addMatcher(
        isAnyOf(createProductThunk.pending, updateProductThunk.pending),
        handleProductsPending
      )
      .addMatcher(
        isAnyOf(createProductThunk.rejected, updateProductThunk.rejected),
        handleProductsRejected
      );
  },
});

export const { clearProductsError } = sliceProducts.actions;
export const productsReducer = sliceProducts.reducer;
