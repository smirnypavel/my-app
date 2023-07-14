import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import toast from "react-hot-toast";

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
// axios.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     if (error.response.status === 401) {
//       const refreshToken = localStorage.getItem("refreshToken");
//       if (!refreshToken) {
//         return Promise.reject(error);
//       }
//       try {
//         const { data } = await axios.post("/auth/refresh", { refreshToken });
//         setAuthHeader(data.token);
//         localStorage.setItem("refreshToken", data.token);
//         return axios(error.config);
//       } catch (error) {
//         // toast.error("An error occurred during authentication");
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export const getUser = createAsyncThunk(
  "moderate/getUser",
  async (userId: string, thunkAPI) => {
    const initialToken = localStorage.getItem("refreshToken");
    if (initialToken) {
      setAuthHeader(initialToken);
    }
    try {
      const { data } = await axios.get(`/users/?_id=${userId}`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserById = createAsyncThunk(
  "moderate/getUserById",
  async (userId: string, thunkAPI) => {
    const initialToken = localStorage.getItem("refreshToken");
    if (initialToken) {
      setAuthHeader(initialToken);
    }
    try {
      const { data } = await axios.get(`/users/find/${userId}`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const roleSelect = createAsyncThunk(
  "moderate/roleSelect",
  async (userId: string, thunkAPI) => {
    const initialToken = localStorage.getItem("refreshToken");
    if (initialToken) {
      setAuthHeader(initialToken);
    }
    try {
      const { data } = await axios.patch(`/users/role/${userId}`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
