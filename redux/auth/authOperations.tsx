import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axios from "axios";

// axios.defaults.baseURL = "https://test-server-thing.onrender.com/";
axios.defaults.baseURL = "https://swap-server.cyclic.clouds/";

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

axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Помечаем запрос, чтобы избежать бесконечного цикла повторов

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        // Если отсутствует refresh-токен, делаем выход пользователя
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.patch("/auth/refresh");
        setAuthHeader(data.token);
        localStorage.setItem("refreshToken", data.token);
        originalRequest.headers["Authorization"] = `Bearer ${data.token}`;
        return axios(originalRequest); // Повторяем исходный запрос с обновленным токеном
      } catch (error) {
        // toast.error("An error occurred during authentication");
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
      localStorage.setItem("refreshToken", data.token);
      return data;
    } catch (error: any) {
      if (error.response.status === 409) {
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
      localStorage.setItem("refreshToken", data.token);
      // toast.success("Welcome!");
      return data;
    } catch (error: any) {
      if (error.response.status === 404) {
        toast.error("Wrong login or password");
      } else {
        toast.error("Wrong login or password");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const googleAuth = createAsyncThunk(
  "auth/googleAuth",
  async (token: string, thunkAPI) => {
    try {
      setAuthHeader(token);
      const { data } = await axios.patch("/auth/refresh");
      setAuthHeader(data.token);
      localStorage.setItem("refreshToken", data.token);
      toast.success("Welcome!");
      return data;
    } catch (error: any) {
      if (error.response.status === 404) {
        toast.error("Wrong login or password");
      } else {
        toast.error("Wrong login or password");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader();
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
    const initialToken = localStorage.getItem("refreshToken");
    if (initialToken) {
      setAuthHeader(initialToken);
    }
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
    const initialToken = localStorage.getItem("refreshToken");
    if (initialToken) {
      setAuthHeader(initialToken);
    }
    try {
      const { data } = await axios.get(`/users/?_id=${userId}`);
      return data;
    } catch (error: any) {
      // toast.error('An error occurred while fetching user data');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
