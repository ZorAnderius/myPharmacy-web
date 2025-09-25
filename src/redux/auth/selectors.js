export const selectIsAuthenticate = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectIsLoading = (state) => state.auth.status === "loading";
export const selectAuthStatus = (state) => state.auth.status;