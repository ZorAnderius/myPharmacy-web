import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { getCategoriesThunk } from "./operations";
import {
  handleCategoriesPending,
  handleCategoriesRejected,
  handleGetCategories,
} from "./handlers";

const sliceCategories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategoriesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesThunk.fulfilled, handleGetCategories)
      .addMatcher(
        isAnyOf(getCategoriesThunk.pending),
        handleCategoriesPending
      )
      .addMatcher(
        isAnyOf(getCategoriesThunk.rejected),
        handleCategoriesRejected
      );
  },
});

export const { clearCategoriesError } = sliceCategories.actions;
export const categoriesReducer = sliceCategories.reducer;
