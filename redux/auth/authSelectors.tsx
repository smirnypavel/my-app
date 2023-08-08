import { IUserAuth } from "../../types/IAuth";

export const getUser = (state: { auth: { user: IUserAuth } }) =>
  state.auth.user;

export const selectIsLoggedIn = (state: { auth: { isLoggedIn: boolean } }) =>
  state.auth.isLoggedIn;

export const isLoading = (state: { auth: { isLoading: boolean } }) =>
  state.auth.isLoading;

export const selectToken = (state: { auth: { user: { token: string } } }) =>
  state.auth.user.token;

export const getRole = (state: { auth: { user: IUserAuth } }) =>
  state.auth.user.role;
