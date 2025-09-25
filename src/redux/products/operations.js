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
