import { responseStatuses } from "../../constants/responseStatuses";

export const handlePending = (state) => {
  state.status = responseStatuses.LOADING;
  state.error = null;
};

export const handleRejected = (state, action) => {
  state.status = responseStatuses.FAILED;
  state.error = action.payload;
};

export const handleAuth = (state, action) => {
  state.status = responseStatuses.SUCCEEDED;
  state.isAuthenticated = true;
  state.user = action.payload.user;
  state.error = null;
};

export const handleLogout = (state) => {
  state.isAuthenticated = false;
  state.user = null;
  state.status = responseStatuses.IDLE;
  state.error = null;
};
