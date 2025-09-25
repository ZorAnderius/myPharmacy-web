import { createAsyncThunk } from "@reduxjs/toolkit";
import { othersServices } from "../../app/providers/othersService";

export const getCategoriesThunk = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    try {
      const response = await othersServices.getCategories();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
