import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";

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

export const getDealById = createAsyncThunk(
  "posts/getDealById",
  async (dealId: string, thunkAPI) => {
    const initialToken = localStorage.getItem("refreshToken");
    if (initialToken) {
      setAuthHeader(initialToken);
    }
    try {
      const { data } = await axios.get(`/orders/find/${dealId}`);
      return data;
    } catch (error: any) {
      toast.error("An error occurred while fetching product data");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
