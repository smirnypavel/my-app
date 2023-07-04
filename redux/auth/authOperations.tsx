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

axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        return Promise.reject(error);
      }
      try {
        const { data } = await axios.post("/users/refresh", { refreshToken });
        setAuthHeader(data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        return axios(error.config);
      } catch (error) {
        toast.error("An error occurred during authentication");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (credentials: {}, thunkAPI) => {
    try {
      const { data } = await axios.post("/users", credentials);
      toast.success("Registration successful");
      localStorage.setItem("refreshToken", data.refreshToken);
      return data;
    } catch (error: any) {
      if (error.response.data.message === "Email in use") {
        toast.error("Email is already in use");
      } else {
        toast.error("Wrong login or password");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials: {}, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/login", credentials);
      setAuthHeader(data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      toast.success("Welcome!");
      return data;
    } catch (error: any) {
      if (error.response.status === 401) {
        toast.error("Wrong login or password");
      } else {
        toast.error("An error occurred during login");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader();
    localStorage.removeItem("refreshToken");
    localStorage.clear();
    toast.success("Logged out successfully");
  } catch (error: any) {
    localStorage.clear();
    toast.error("An error occurred during logout");
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (credentials: {}, thunkAPI) => {
    try {
      const { data } = await axios.put("/users", credentials);
      toast.success("User updated successfully");
      return data;
    } catch (error: any) {
      toast.error("An error occurred during user update");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (userId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`/users/?_id=${userId}`);
      return data;
    } catch (error: any) {
      // toast.error('An error occurred while fetching user data');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// export const getAllUser = createAsyncThunk(
//   "auth/getAllUser",
//   async (_, thunkAPI) => {
//     try {
//       const { data } = await axios.get("/users");
//       return data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
export const signInGoogle = createAsyncThunk(
  "auth/signInGoogle",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("auth/google/login");
      return data;
    } catch (error: any) {
      if (error.response.status === 401) {
        toast.error("Wrong login or password");
      } else {
        toast.error("An error occurred during login");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
