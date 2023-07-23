import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  getPostById,
  updatePostStatus,
  addPostComment,
  replyPostComment,
  offerPostExchange,
} from "./postsOperations";

export interface IOwner {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatarURL: string;
  location: string;
}
export interface IComment {
  text: string;
  id: string;
  user: User;
  answer: Answer[];
}
export interface Answer {
  text: string;
  id: string;
  user: User;
}
export interface User {
  firstName: string;
  lastName: string;
  avatarURL: string;
  isOnline: boolean;
}

export interface IPosts {
  _id: string;
  title: string;
  description: string;
  img: string;
  price: number;
  verify: string;
  views?: number;
  favorite?: any[];
  createdAt?: string;
  updatedAt?: string;
  owner: IOwner;
  comments?: IComment[];
  toExchange?: any[];
  isActive?: boolean;
  location: string;
}

export interface IPostState {
  post: IPosts;
  isLoading: boolean;
  error: string | any;
}

const initialState: IPostState = {
  post: {
    _id: "",
    title: "",
    description: "",
    img: "",
    location: "",
    favorite: [],
    owner: {
      id: "",
      firstName: "",
      lastName: "",
      phone: "",
      avatarURL: "",
      location: "",
    },
    price: 0,
    verify: "",
    views: 0,
    comments: [],
  },
  isLoading: false,
  error: "",
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(getPostById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.post = action.payload;
        state.isLoading = false;
      })
      .addCase(updatePostStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePostStatus.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(updatePostStatus.fulfilled, (state, action) => {
        state.post = action.payload;
        state.isLoading = false;
      })
      .addCase(addPostComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPostComment.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(addPostComment.fulfilled, (state, action) => {
        state.post = action.payload;
        state.isLoading = false;
      })
      .addCase(replyPostComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(replyPostComment.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(replyPostComment.fulfilled, (state, action) => {
        state.post = action.payload;
        state.isLoading = false;
      })
      .addCase(offerPostExchange.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(offerPostExchange.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(offerPostExchange.fulfilled, (state, action) => {
        state.post = action.payload;
        state.isLoading = false;
      });
  },
});

export type PostState = ReturnType<typeof postsSlice.reducer>;

export default postsSlice.reducer;
