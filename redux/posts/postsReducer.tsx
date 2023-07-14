import { createSlice } from "@reduxjs/toolkit";
import { createPost } from "./postsOperations";

export interface Owner {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatarURL: string;
  location: string;
}
export interface IPosts {
  _id: string;
  title: string;
  description: string;
  category: string;
  img: string;
  price: number;
  verify: string;
  views: number;
  favorite: string[];
  createdAt?: string;
  updatedAt?: string;
  owner: Owner;
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
    category: "",
    img: "",
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
