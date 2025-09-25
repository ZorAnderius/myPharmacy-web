import { responseStatuses } from "../../constants/responseStatuses";

export const handleCategoriesPending = (state) => {
  state.status = responseStatuses.LOADING;
  state.error = null;
};

export const handleCategoriesRejected = (state, action) => {
  state.status = responseStatuses.REJECTED;
  state.error = action.payload;
};

export const handleGetCategories = (state, action) => {
  state.status = responseStatuses.SUCCEEDED;
  state.categories = action.payload.data;
  state.error = null;
};
