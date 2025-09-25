import { responseStatuses } from "../../constants/responseStatuses";

export const handleProductStatusesPending = (state) => {
  state.status = responseStatuses.LOADING;
  state.error = null;
};

export const handleProductStatusesRejected = (state, action) => {
  state.status = responseStatuses.REJECTED;
  state.error = action.payload;
};

export const handleGetProductStatuses = (state, action) => {
  state.status = responseStatuses.SUCCEEDED;
  state.productStatuses = action.payload.data;
  state.error = null;
};
