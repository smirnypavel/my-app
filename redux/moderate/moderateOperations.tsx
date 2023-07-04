import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// axios.defaults.baseURL = "https://test-server-thing.onrender.com/";

// const setAuthHeader = (token: string) => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// const clearAuthHeader = () => {
//   axios.defaults.headers.common.Authorization = "";
// };

export const getUser = createAsyncThunk(
  "moderate/getUser",
  async (userId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`/users/?_id=${userId}`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
