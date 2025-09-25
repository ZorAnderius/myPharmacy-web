import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import initialState from "./initialState";
import {
  getAllShopsThunk,
  getUserShopsThunk,
  createShopThunk,
  getShopByIdThunk,
  updateShopThunk,
} from "./operations";
import {
  handleShopsPending,
  handleShopsRejected,
  handleGetAllShops,
  handleCreateShop,
  handleGetShopById,
  handleUpdateShop,
} from "./handlers";

const sliceShops = createSlice({
  name: "shops",
  initialState,
  reducers: {
    clearShopsError: (state) => {
      state.error = null;
    },
    clearCurrentShop: (state) => {
      state.currentShop = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllShopsThunk.fulfilled, handleGetAllShops)
      .addCase(getUserShopsThunk.fulfilled, handleGetAllShops)
      .addCase(createShopThunk.fulfilled, handleCreateShop)
      .addCase(getShopByIdThunk.fulfilled, handleGetShopById)
      .addCase(updateShopThunk.fulfilled, handleUpdateShop)
      .addMatcher(
        isAnyOf(
          getAllShopsThunk.pending,
          getUserShopsThunk.pending,
          createShopThunk.pending,
          getShopByIdThunk.pending,
          updateShopThunk.pending
        ),
        handleShopsPending
      )
      .addMatcher(
        isAnyOf(
          getAllShopsThunk.rejected,
          getUserShopsThunk.rejected,
          createShopThunk.rejected,
          getShopByIdThunk.rejected,
          updateShopThunk.rejected
        ),
        handleShopsRejected
      );
  },
});

export const { clearShopsError, clearCurrentShop } = sliceShops.actions;
export const shopsReducer = sliceShops.reducer;
