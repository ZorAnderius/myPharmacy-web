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
  const reviews = action.payload.data || action.payload;
  state.reviews = Array.isArray(reviews) ? reviews : [];
  state.error = null;
};

export const handleCreateProductReview = (state, action) => {
  state.status = responseStatuses.SUCCEEDED;
  if (Array.isArray(state.reviews)) {
    state.reviews.push(action.payload.data || action.payload);
  } else {
    state.reviews = [action.payload.data || action.payload];
  }
  state.error = null;
};
