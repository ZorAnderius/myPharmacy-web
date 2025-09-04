import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { responseStatuses } from "../../constants/responseStatuses";

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
      state.status = resetStatus.IDLE;
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
});

export const { setAuth, clearAuth, setLoading, setError, clearError, resetStatus } = sliceAuth.actions;
export const authReducer = sliceAuth.reducer;
