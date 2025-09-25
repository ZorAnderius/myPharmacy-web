import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { getProductReviewsThunk, createProductReviewThunk } from "./operations";
import {
  handleReviewsPending,
  handleReviewsRejected,
  handleGetProductReviews,
  handleCreateProductReview,
} from "./handlers";

const sliceReviews = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviewsError: (state) => {
      state.error = null;
    },
    clearReviews: (state) => {
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductReviewsThunk.fulfilled, handleGetProductReviews)
      .addCase(createProductReviewThunk.fulfilled, handleCreateProductReview)
      .addMatcher(
        isAnyOf(getProductReviewsThunk.pending, createProductReviewThunk.pending),
        handleReviewsPending
      )
      .addMatcher(
        isAnyOf(getProductReviewsThunk.rejected, createProductReviewThunk.rejected),
        handleReviewsRejected
      );
  },
});

export const { clearReviewsError, clearReviews } = sliceReviews.actions;
export const reviewsReducer = sliceReviews.reducer;
