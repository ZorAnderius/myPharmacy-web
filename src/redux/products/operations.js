import { createAsyncThunk } from "@reduxjs/toolkit";
import { productsServices } from "../../app/providers/productsService";

export const createProductThunk = createAsyncThunk(
  "products/createProduct",
  async ({ shopId, productData }, thunkAPI) => {
    try {
      const response = await productsServices.createProduct(shopId, productData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateProductThunk = createAsyncThunk(
  "products/updateProduct",
  async ({ shopId, productId, productData }, thunkAPI) => {
    try {
      const response = await productsServices.updateProduct(shopId, productId, productData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProductThunk = createAsyncThunk(
  "products/deleteProduct",
  async ({ shopId, productId }, thunkAPI) => {
    try {
      const response = await productsServices.deleteProduct(shopId, productId);
      return { productId, response };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
