import { createAsyncThunk } from "@reduxjs/toolkit";
import { reviewsServices } from "../../app/providers/reviewsService";

export const getProductReviewsThunk = createAsyncThunk(
  "reviews/getProductReviews",
  async ({ shopId, productId }, thunkAPI) => {
    try {
      const response = await reviewsServices.getProductReviews(shopId, productId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createProductReviewThunk = createAsyncThunk(
  "reviews/createProductReview",
  async ({ shopId, productId, reviewData }, thunkAPI) => {
    try {
      const response = await reviewsServices.createProductReview(shopId, productId, reviewData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
