import { createAsyncThunk } from "@reduxjs/toolkit";
import { shopsServices } from "../../app/providers/shopsService";

// Get all shops
export const getAllShopsThunk = createAsyncThunk(
  "shops/getAllShops",
  async (_, thunkAPI) => {
    try {
      const response = await shopsServices.getAllShops();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get user shops
export const getUserShopsThunk = createAsyncThunk(
  "shops/getUserShops",
  async (_, thunkAPI) => {
    try {
      const response = await shopsServices.getUserShops();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create shop
export const createShopThunk = createAsyncThunk(
  "shops/createShop",
  async (shopData, thunkAPI) => {
    try {
      const response = await shopsServices.createShop(shopData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get shop by ID
export const getShopByIdThunk = createAsyncThunk(
  "shops/getShopById",
  async (shopId, thunkAPI) => {
    try {
      const response = await shopsServices.getShopById(shopId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update shop
export const updateShopThunk = createAsyncThunk(
  "shops/updateShop",
  async ({ shopId, shopData }, thunkAPI) => {
    try {
      const response = await shopsServices.updateShop(shopId, shopData);
      return response;
    } catch (error) {
      console.error('updateShopThunk error:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
