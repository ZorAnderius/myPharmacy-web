export const selectProductStatuses = (state) => state.productStatuses.productStatuses;
export const selectProductStatusesStatus = (state) => state.productStatuses.status;
export const selectProductStatusesError = (state) => state.productStatuses.error;
export const selectIsProductStatusesLoading = (state) => state.productStatuses.status === "loading";
