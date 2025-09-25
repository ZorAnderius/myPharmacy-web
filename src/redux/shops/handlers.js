import { responseStatuses } from "../../constants/responseStatuses";

export const handleShopsPending = (state) => {
  state.status = responseStatuses.LOADING;
  state.error = null;
};

export const handleShopsRejected = (state, action) => {
  state.status = responseStatuses.REJECTED;
  state.error = action.payload;
};

export const handleGetAllShops = (state, action) => {
  state.status = responseStatuses.SUCCEEDED;
  state.shops = action.payload.data.shops;
  state.error = null;
};

export const handleCreateShop = (state, action) => {
  state.status = responseStatuses.SUCCEEDED;
  state.currentShop = action.payload.data;
  state.shops.push(action.payload.data);
  state.error = null;
};

export const handleGetShopById = (state, action) => {
  state.status = responseStatuses.SUCCEEDED;
  state.currentShop = action.payload.data;
  state.error = null;
};
