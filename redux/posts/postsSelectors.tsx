// import { IUserAuth } from "../auth/authReducer";
import { IPosts, IPostState } from "./postsReducer";

export const getAllPost = (state: { post: { post: IPosts } }) => state.post;
export const getPost = (state: { post: { post: IPosts } }) => state.post.post;

// export const selectIsLoggedIn = (state: { auth: { isLoggedIn: boolean } }) =>
//   state.auth.isLoggedIn;

export const selectToken = (state: { auth: { user: { token: string } } }) =>
  state.auth.user.token;

export const getOwner = (state: { post: { post: IPostState } }) =>
  state.post.post;
