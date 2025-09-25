import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { responseStatuses } from "../../constants/responseStatuses";
import {
  registerThunk,
  authenticateWithGoogleOAuth,
  loginThunk,
  logoutThunk,
  refreshThunk,
  getCurrentUserThunk,
} from "./operations";
import {
  handleAuth,
  handleLogout,
  handlePending,
  handleRejected,
} from "./handlers";

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
    syncWithToken: (state) => {
      // This will be called to sync state with token from localStorage
      const token = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user");
      
      if (token && user) {
        try {
          const userData = JSON.parse(user);
          state.isAuthenticated = true;
          state.user = userData;
          state.status = responseStatuses.SUCCEEDED;
          state.error = null;
        } catch (error) {
          console.error("Failed to parse user data from localStorage:", error);
          state.isAuthenticated = false;
          state.user = null;
        }
      } else {
        state.isAuthenticated = false;
        state.user = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutThunk.fulfilled, handleLogout)
      .addMatcher(
        isAnyOf(
          registerThunk.fulfilled,
          authenticateWithGoogleOAuth.fulfilled,
          loginThunk.fulfilled,
          refreshThunk.fulfilled,
          getCurrentUserThunk.fulfilled
        ),
        handleAuth
      )
      .addMatcher(
        isAnyOf(
          registerThunk.pending,
          authenticateWithGoogleOAuth.pending,
          loginThunk.pending,
          logoutThunk.pending,
          refreshThunk.pending,
          getCurrentUserThunk.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          registerThunk.rejected,
          authenticateWithGoogleOAuth.rejected,
          loginThunk.rejected,
          logoutThunk.rejected,
          refreshThunk.rejected,
          getCurrentUserThunk.rejected
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
  syncWithToken,
} = sliceAuth.actions;
export const authReducer = sliceAuth.reducer;
