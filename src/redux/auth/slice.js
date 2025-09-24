import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { responseStatuses } from "../../constants/responseStatuses";
import {
  registerThunk,
  authenticateWithGoogleOAuth,
  loginThunk,
} from "./operations";
import { handleAuth, handlePending, handleRejected } from "./handlers";

const sliceAuth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.status = responseStatuses.SUCCEEDED;
      state.error = null;
    },
    clearAuth(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.status = responseStatuses.IDLE;
      state.error = null;
    },
    setLoading(state) {
      state.status = responseStatuses.LOADING;
    },
    setError(state, action) {
      state.status = responseStatuses.FAILED;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetStatus: (state) => {
      state.status = responseStatuses.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          registerThunk.fulfilled,
          authenticateWithGoogleOAuth.fulfilled,
          loginThunk.fulfilled
        ),
        handleAuth
      )
      .addMatcher(
        isAnyOf(
          registerThunk.pending,
          authenticateWithGoogleOAuth.pending,
          loginThunk.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          registerThunk.rejected,
          authenticateWithGoogleOAuth.rejected,
          loginThunk.rejected
        ),
        handleRejected
      );
  },
});

export const {
  setAuth,
  clearAuth,
  setLoading,
  setError,
  clearError,
  resetStatus,
} = sliceAuth.actions;
export const authReducer = sliceAuth.reducer;
