import { createAsyncThunk } from "@reduxjs/toolkit";
import { authServices } from "../../app/providers/authService";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await authServices.register(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
