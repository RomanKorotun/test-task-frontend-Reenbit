import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { current, login, logout, register, registerGoogle } from "../api";

interface IRegisterResponse {
  username: string;
  avatar: string;
  token: string;
}

interface ILoginResponse {
  username: string;
  avatar: string;
  token: string;
}

interface ICurrentResponse {
  username: string;
  avatar: string;
}

interface IRegisterGoogleResponse {
  username: string;
  avatar: string;
  token: string;
}

interface IAuthInitialState {
  username: string | null;
  email: string | null;
  avatar: string | null;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  loading: boolean;
  error: boolean;
}

const initialState: IAuthInitialState = {
  username: null,
  email: null,
  avatar: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (build) =>
    build
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<IRegisterResponse>) => {
          state.isLoggedIn = true;
          state.username = action.payload.username;
          state.avatar = action.payload.avatar;
          state.token = action.payload.token;
        }
      )
      .addCase(current.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(
        current.fulfilled,
        (state, action: PayloadAction<ICurrentResponse>) => {
          state.isRefreshing = false;
          state.isLoggedIn = true;
          state.username = action.payload.username;
          state.avatar = action.payload.avatar;
        }
      )
      .addCase(current.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.username = null;
        state.avatar = null;
        state.isLoggedIn = false;
        state.token = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<ILoginResponse>) => {
          state.isLoggedIn = true;
          state.username = action.payload.username;
          state.avatar = action.payload.avatar;
          state.token = action.payload.token;
        }
      )
      .addCase(
        registerGoogle.fulfilled,
        (state, action: PayloadAction<IRegisterGoogleResponse>) => {
          state.isLoggedIn = true;
          state.username = action.payload.username;
          state.avatar = action.payload.avatar;
          state.token = action.payload.token;
        }
      ),
});

export const authReducer = authSlice.reducer;
