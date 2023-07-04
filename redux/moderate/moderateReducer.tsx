import { createSlice } from "@reduxjs/toolkit";
import { IUserAuth } from "../auth/authReducer";
import { getUser, getUserById } from "./moderateOperations";

export interface IModerateState {
  user: IUserAuth;
  isLoading: boolean;
  error: string;
}

const initialState: IModerateState = {
  user: {
    _id: "",
    email: "",
    token: "",
    role: "",
    avatarURL: "",
  },
  isLoading: false,
  error: "",
};

export const moderateSlice = createSlice({
  name: "moderate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      });
  },
});

export type ModerateState = ReturnType<typeof moderateSlice.reducer>;

export default moderateSlice.reducer;
