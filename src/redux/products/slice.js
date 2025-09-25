import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { createProductThunk } from "./operations";
import {
  handleProductsPending,
  handleProductsRejected,
  handleCreateProduct,
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
      .addMatcher(
        isAnyOf(createProductThunk.pending),
        handleProductsPending
      )
      .addMatcher(
        isAnyOf(createProductThunk.rejected),
        handleProductsRejected
      );
  },
});

export const { clearProductsError } = sliceProducts.actions;
export const productsReducer = sliceProducts.reducer;
