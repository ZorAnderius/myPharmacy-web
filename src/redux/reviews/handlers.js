import { responseStatuses } from "../../constants/responseStatuses";

export const handleReviewsPending = (state) => {
  state.status = responseStatuses.LOADING;
  state.error = null;
};

export const handleReviewsRejected = (state, action) => {
  state.status = responseStatuses.REJECTED;
  state.error = action.payload;
};

export const handleGetProductReviews = (state, action) => {
  state.status = responseStatuses.SUCCEEDED;
  state.reviews = action.payload.data || action.payload;
  state.error = null;
};

export const handleCreateProductReview = (state, action) => {
  state.status = responseStatuses.SUCCEEDED;
  state.reviews.push(action.payload.data);
  state.error = null;
};
