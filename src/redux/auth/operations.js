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

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await authServices.login(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const authenticateWithGoogleOAuth = createAsyncThunk(
  "auth/googleOAuth",
  async (oauthData, thunkAPI) => {
    try {
      const { accessToken, user } = oauthData;
      // Store token and user data
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      return { accessToken, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (__dirname, thunkAPI) => {
    try {
      await authServices.logout();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
