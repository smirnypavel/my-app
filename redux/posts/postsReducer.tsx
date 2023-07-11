import { createSlice } from "@reduxjs/toolkit";
import { createPost } from "./postsOperations";

export interface Owner {
  id: string;
  email: string;
  phone: string;
}
export interface IPosts {
  title: string;
  description: string;
  category: string;
  img: string;
  favorite: string[];
  owner: Owner;
  price: number;
  verify: boolean;
  views: number;
}

export interface IPostState {
  post: IPosts;
  isLoading: boolean;
  error: string | any;
}

const initialState: IPostState = {
  post: {
    title: "",
    description: "",
    category: "",
    img: "",
    favorite: [],
    owner: {
      id: "",
      email: "",
      phone: "",
    },
    price: 0,
    verify: false,
    views: 0,
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
      });
    // .addCase(getUser.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(getUser.rejected, (state, action) => {
    //   state.error = action.payload;
    //   state.isLoading = false;
    // })
    // .addCase(getUser.fulfilled, (state, action) => {
    //   state.user = action.payload.data.posts;
    //   state.isLoading = false;
    // });
  },
});

export type PostState = ReturnType<typeof postsSlice.reducer>;

export default postsSlice.reducer;
