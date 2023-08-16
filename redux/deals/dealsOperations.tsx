import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";
import { IDeals } from "../../types/IDeals";

// axios.defaults.baseURL = "https://test-server-thing.onrender.com/";
axios.defaults.baseURL = "https://swap-server.cyclic.cloud";

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
  "deal/getDealById",
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
export const addDealComment = createAsyncThunk<
  IDeals,
  { dealId: string; credentials: {} },
  { rejectValue: string }
>("deal/addDealComment", async ({ dealId, credentials }, thunkAPI) => {
  const initialToken = localStorage.getItem("refreshToken");
  if (initialToken) {
    setAuthHeader(initialToken);
  }
  try {
    const { data } = await axios.post(`/orders/message/${dealId}`, credentials);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
