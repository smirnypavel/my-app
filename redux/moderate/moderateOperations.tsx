import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

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
