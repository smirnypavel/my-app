import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  getPostById,
  updatePostStatus,
  addPostComment,
  replyPostComment,
  offerPostExchange,
  deletePostComment,
  hidePost,
  deletePost,
  setPostExchangeTrue,
  setPostExchangeFalse,
} from "./postsOperations";
import { IPostState } from "../../types/IPost";

const initialState: IPostState = {
  post: {
    _id: "",
    title: "",
    description: "",
    img: "",
    location: "",
    favorite: [],
    createdAt: "",
    toExchange: [],
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
      .addCase(hidePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(hidePost.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(hidePost.fulfilled, (state, action) => {
        state.post = action.payload;
        state.isLoading = false;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
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
      .addCase(deletePostComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePostComment.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(deletePostComment.fulfilled, (state, action) => {
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
      })
      .addCase(setPostExchangeTrue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setPostExchangeTrue.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(setPostExchangeTrue.fulfilled, (state, action) => {
        state.post = action.payload;
        state.isLoading = false;
      })
      .addCase(setPostExchangeFalse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setPostExchangeFalse.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(setPostExchangeFalse.fulfilled, (state, action) => {
        state.post = action.payload;
        state.isLoading = false;
      });
  },
});

export type PostState = ReturnType<typeof postsSlice.reducer>;

export default postsSlice.reducer;
