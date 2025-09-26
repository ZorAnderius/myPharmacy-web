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

export const handleGetUserShops = (state, action) => {
  state.status = responseStatuses.SUCCEEDED;
  
  // Correctly handle API response structure where shops are nested
  let shopsData = [];
  const payloadData = action.payload.data || action.payload;
  
  if (payloadData && payloadData.shops && Array.isArray(payloadData.shops)) {
    shopsData = payloadData.shops;
  } else if (Array.isArray(payloadData)) {
    shopsData = payloadData;
  }
  
  state.shops = shopsData;
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

export const handleUpdateShop = (state, action) => {
  state.status = responseStatuses.SUCCEEDED;
  
  // Get the updated shop data
  const updatedShopData = action.payload.data;
  
  // Update currentShop
  state.currentShop = updatedShopData;
  
  // Update the shop in the shops array
  // Since the API doesn't return the shop ID, we need to find it by other means
  // Let's update the first shop (user's shop) since this is the user's shop update
  if (state.shops.length > 0) {
    // Update the first shop (user's shop) with the new data
    const existingShop = state.shops[0];
    state.shops[0] = {
      ...existingShop,
      ...updatedShopData,
      // Preserve the original ID
      id: existingShop.id
    };
  }
  
  state.error = null;
};
