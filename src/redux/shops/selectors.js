export const selectShops = (state) => state.shops.shops;
export const selectCurrentShop = (state) => state.shops.currentShop;
export const selectShopsStatus = (state) => state.shops.status;
export const selectShopsError = (state) => state.shops.error;
export const selectIsShopsLoading = (state) => state.shops.status === "loading";
