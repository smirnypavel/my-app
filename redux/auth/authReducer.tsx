import { createSlice } from "@reduxjs/toolkit";
import {
  signUp,
  signIn,
  logOut,
  updateUser,
  getUser,
  signInGoogle,
} from "./authOperations";

export interface IUserAuth {
  _id: string;
  email: string;
  phone?: string;
  location?: string;
  avatarURL: string;
  role: string;
  isOnline?: boolean;
  postsId?: string[];
  token: string;
  createdAt?: string;
  updatedAt?: string;
  firstName?: string;
  lastName?: string;
}

export interface IAuthState {
  user: IUserAuth;
  isLoggedIn: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | any;
}

const initialState: IAuthState = {
  user: {
    _id: "",
    email: "",
    token: "",
    role: "",
    isOnline: false,
    avatarURL: "",
  },
  isLoggedIn: false,
  isLoading: false,
  isRefreshing: false,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.user.token = "";
        state.isLoggedIn = false;
        state.error = action.error.message || "";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.user.token = "";
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = action.error.message || "";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOut.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = initialState.user;
        state.isLoggedIn = false;
        state.isLoading = false;
        state.isRefreshing = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.data.posts;
        state.isLoading = false;
      })
      .addCase(signInGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInGoogle.rejected, (state, action) => {
        state.user.token = "";
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = action.error.message || "";
      })
      .addCase(signInGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
      });
  },
});

export type AuthState = ReturnType<typeof authSlice.reducer>;

export default authSlice.reducer;
