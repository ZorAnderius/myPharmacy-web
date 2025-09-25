import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { getProductStatusesThunk } from "./operations";
import {
  handleProductStatusesPending,
  handleProductStatusesRejected,
  handleGetProductStatuses,
} from "./handlers";

const sliceProductStatuses = createSlice({
  name: "productStatuses",
  initialState,
  reducers: {
    clearProductStatusesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductStatusesThunk.fulfilled, handleGetProductStatuses)
      .addMatcher(
        isAnyOf(getProductStatusesThunk.pending),
        handleProductStatusesPending
      )
      .addMatcher(
        isAnyOf(getProductStatusesThunk.rejected),
        handleProductStatusesRejected
      );
  },
});

export const { clearProductStatusesError } = sliceProductStatuses.actions;
export const productStatusesReducer = sliceProductStatuses.reducer;
