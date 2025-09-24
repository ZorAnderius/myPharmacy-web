import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { responseStatuses } from "../../constants/responseStatuses";
import { registerThunk, authenticateWithGoogleOAuth } from "./operations";

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
  extraReducers: builder => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.status = responseStatuses.LOADING;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.status = responseStatuses.SUCCEEDED;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.status = responseStatuses.FAILED;
        state.error = action.payload;
      })
      .addCase(authenticateWithGoogleOAuth.pending, (state) => {
        state.status = responseStatuses.LOADING;
      })
      .addCase(authenticateWithGoogleOAuth.fulfilled, (state, action) => {
        state.status = responseStatuses.SUCCEEDED;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(authenticateWithGoogleOAuth.rejected, (state, action) => {
        state.status = responseStatuses.FAILED;
        state.error = action.payload;
      });
  },
});

export const { setAuth, clearAuth, setLoading, setError, clearError, resetStatus } = sliceAuth.actions;
export const authReducer = sliceAuth.reducer;
