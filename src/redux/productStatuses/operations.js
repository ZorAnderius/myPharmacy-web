import { createAsyncThunk } from "@reduxjs/toolkit";
import { othersServices } from "../../app/providers/othersService";

export const getProductStatusesThunk = createAsyncThunk(
  "productStatuses/getProductStatuses",
  async (_, thunkAPI) => {
    try {
      const response = await othersServices.getProductStatuses();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
