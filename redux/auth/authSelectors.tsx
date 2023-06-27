export const getUser = (state: { auth: { user: any } }) => state.auth.user;

export const selectIsLoggedIn = (state: { auth: { isLoggedIn: boolean } }) =>
  state.auth.isLoggedIn;

export const selectToken = (state: { auth: { user: { token: string } } }) =>
  state.auth.user.token;
