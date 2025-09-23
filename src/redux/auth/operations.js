import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/providers/api";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await api.post("/users/register", {
        headers: {
          "Content-Type": "application/json",
        },
        body:userData,
      });
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
