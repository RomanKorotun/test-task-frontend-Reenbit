import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUserRegister } from "../components/Register/Register";
import { RootState } from "./store";
import { IUserLogin } from "../components/Login/Login";

const instance = axios.create({
  baseURL: "https://test-task-backend-reenbit.onrender.com",
});

function setAuthToken(token: string) {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

function clearAuthToken() {
  instance.defaults.headers.common.Authorization = "";
}

export const register = createAsyncThunk(
  "auth/register",
  async (user: IUserRegister, thunkApi) => {
    try {
      const response = await instance.post("/api/auth/register", user);
      setAuthToken(response.data.token);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const current = createAsyncThunk("auth/current", async (_, thunkApi) => {
  try {
    const state = thunkApi.getState() as RootState;
    const persistedtoken = state.auth.token;
    if (!persistedtoken) {
      return thunkApi.rejectWithValue("Unable to fetch user");
    }
    setAuthToken(persistedtoken);
    const response = await instance.get("/api/auth/current");
    return response.data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    await instance.post("/api/auth/logout");
    clearAuthToken();
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const login = createAsyncThunk(
  "auth/login",
  async (user: IUserLogin, thunkApi) => {
    try {
      const response = await instance.post("/api/auth/login", user);
      setAuthToken(response.data.token);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const registerGoogle = createAsyncThunk(
  "auth/registerGoogle",
  async (token: string, thunkAPI) => {
    try {
      setAuthToken(token);
      const response = await instance.get("/api/auth/current");
      response.data.token = token;
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
