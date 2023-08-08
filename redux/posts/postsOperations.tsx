import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";

export interface MyPostResponse {
  _id: string;
  title: string;
  description: string;
  category: string;
  img: string;
  price: number;
  verify: string;
  views: number;
  favorite: any[];
  createdAt: string;
  updatedAt: string;
  location: string;
  toExchange: [];

  comments?: [];
  owner: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    avatarURL: string;
    location: string;
  };
}

axios.defaults.baseURL = "https://test-server-thing.onrender.com/";

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};
export const restoreToken = () => {
  const token = localStorage.getItem("refreshToken");
  if (token) {
    setAuthHeader(token);
  }
};

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (credentials: {}, thunkAPI) => {
    try {
      const { data } = await axios.post("/posts", credentials);
      toast.success("Post updated successfully");
      return data;
    } catch (error: any) {
      toast.error("An error occurred during post update");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, thunkAPI) => {
    const initialToken = localStorage.getItem("refreshToken");
    if (initialToken) {
      setAuthHeader(initialToken);
    }
    try {
      const { data } = await axios.get(`/posts`);
      return data;
    } catch (error: any) {
      toast.error("An error occurred while fetching post data");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getPostById = createAsyncThunk(
  "posts/getPostById",
  async (postId: string, thunkAPI) => {
    const initialToken = localStorage.getItem("refreshToken");
    if (initialToken) {
      setAuthHeader(initialToken);
    }
    try {
      const { data } = await axios.get(`/posts/find/${postId}`);
      return data;
    } catch (error: any) {
      toast.error("An error occurred while fetching product data");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const getView = createAsyncThunk(
  "posts/getView",
  async (id: string, thunkAPI) => {
    const initialToken = localStorage.getItem("refreshToken");
    if (initialToken) {
      setAuthHeader(initialToken);
    }
    try {
      const { data } = await axios.patch(`/posts/view/${id}`);
      return data;
    } catch (error: any) {
      toast.error("An error occurred while fetching product data");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const hidePost = createAsyncThunk(
  "posts/hidePost",
  async (postId: string, thunkAPI) => {
    const initialToken = localStorage.getItem("refreshToken");
    if (initialToken) {
      setAuthHeader(initialToken);
    }
    try {
      const { data } = await axios.patch(`/posts/active/${postId}`);
      return data;
    } catch (error: any) {
      toast.error("failed to Hide post");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId: string, thunkAPI) => {
    const initialToken = localStorage.getItem("refreshToken");
    if (initialToken) {
      setAuthHeader(initialToken);
    }
    try {
      const { data } = await axios.delete(`/posts/${postId}`);
      return data;
    } catch (error: any) {
      toast.error("failed to delete post");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updatePost = createAsyncThunk<
  MyPostResponse,
  { productId: string; credentials: {} },
  { rejectValue: string }
>("posts/updatePost", async ({ productId, credentials }, thunkAPI) => {
  const initialToken = localStorage.getItem("refreshToken");
  if (initialToken) {
    setAuthHeader(initialToken);
  }
  try {
    const { data } = await axios.put(`/posts/${productId}`, credentials);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const updatePostStatus = createAsyncThunk<
  MyPostResponse,
  { postId: string; credentials: {} },
  { rejectValue: string }
>("posts/updatePostStatus", async ({ postId, credentials }, thunkAPI) => {
  const initialToken = localStorage.getItem("refreshToken");
  if (initialToken) {
    setAuthHeader(initialToken);
  }
  try {
    const { data } = await axios.patch(`/posts/verify/${postId}`, credentials);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/////////////////////////////////POST COMMENT////////////////////////////////////////////

export const addPostComment = createAsyncThunk<
  MyPostResponse,
  { postId: string; credentials: {} },
  { rejectValue: string }
>("posts/addPostComment", async ({ postId, credentials }, thunkAPI) => {
  const initialToken = localStorage.getItem("refreshToken");
  if (initialToken) {
    setAuthHeader(initialToken);
  }
  try {
    const { data } = await axios.post(`/posts/comments/${postId}`, credentials);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const replyPostComment = createAsyncThunk<
  MyPostResponse,
  { postId: string; commentId: string; credentials: {} },
  { rejectValue: string }
>(
  "posts/replyPostComment",
  async ({ postId, commentId, credentials }, thunkAPI) => {
    const initialToken = localStorage.getItem("refreshToken");
    if (initialToken) {
      setAuthHeader(initialToken);
    }
    try {
      const { data } = await axios.post(
        `/posts/comments/${postId}/${commentId}`,
        credentials
      );
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deletePostComment = createAsyncThunk<
  MyPostResponse,
  { postId: string; commentId: string },
  { rejectValue: string }
>("posts/deletePostComment", async ({ postId, commentId }, thunkAPI) => {
  const initialToken = localStorage.getItem("refreshToken");
  if (initialToken) {
    setAuthHeader(initialToken);
  }
  try {
    const { data } = await axios.delete(
      `/posts/comments/${postId}/${commentId}`
    );
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

///////////////////// EXCHANGE////////////////////////////////
export const offerPostExchange = createAsyncThunk<
  MyPostResponse,
  { postId: string; offerId: string },
  { rejectValue: string }
>("posts/offerPostExchange", async ({ postId, offerId }, thunkAPI) => {
  const initialToken = localStorage.getItem("refreshToken");
  if (initialToken) {
    setAuthHeader(initialToken);
  }
  try {
    const { data } = await axios.post(
      `/posts/to-exchange/${postId}/${offerId}`
    );
    toast.success("You have successfully made an offer");

    return data;
  } catch (error: any) {
    toast.error("Something went wrong. Please try again later.");
    return thunkAPI.rejectWithValue(error.message);
  }
});
