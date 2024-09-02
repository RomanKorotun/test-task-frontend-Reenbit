import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addChat,
  addMessage,
  current,
  deleteChat,
  editChat,
  login,
  logout,
  register,
  registerGoogle,
  updateIsActiveChat,
} from "../api";

interface IMessage {
  _id?: string;
  owner?: string;
  message?: string;
  date?: string;
}

interface IChat {
  firstName: string;
  lastName: string;
  isActive: boolean;
  avatar: string;
  owner: string;
  messages: IMessage[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface IUpdateIsActiveChatResponse {
  chats: IChat[];
}

interface IRegisterResponse {
  username: string;
  avatar: string;
  token: string;
  chats: IChat[];
}

interface ILoginResponse {
  username: string;
  avatar: string;
  token: string;
  chats: IChat[];
}

interface ICurrentResponse {
  username: string;
  avatar: string;
  chats: IChat[];
}

interface IRegisterGoogleResponse {
  username: string;
  avatar: string;
  token: string;
  chats: IChat[];
}

interface IDeleteChatResponse {
  deleteChat: IChat;
  chats: IChat[];
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
  chats: IChat[];
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
  chats: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addRandomQuote: (state, action: PayloadAction<IChat>) => {
      state.chats = state.chats.map((chat) => {
        if (chat._id !== action.payload._id) {
          return chat;
        }
        return action.payload;
      });
    },
  },
  extraReducers: (build) =>
    build
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<IRegisterResponse>) => {
          state.isLoggedIn = true;
          state.username = action.payload.username;
          state.avatar = action.payload.avatar;
          state.token = action.payload.token;
          state.chats = action.payload.chats;
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
          state.chats = action.payload.chats;
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
        state.chats = [];
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<ILoginResponse>) => {
          state.isLoggedIn = true;
          state.username = action.payload.username;
          state.avatar = action.payload.avatar;
          state.token = action.payload.token;
          state.chats = action.payload.chats;
        }
      )
      .addCase(
        registerGoogle.fulfilled,
        (state, action: PayloadAction<IRegisterGoogleResponse>) => {
          state.isLoggedIn = true;
          state.username = action.payload.username;
          state.avatar = action.payload.avatar;
          state.token = action.payload.token;
          state.chats = action.payload.chats;
        }
      )
      .addCase(
        updateIsActiveChat.fulfilled,
        (state, action: PayloadAction<IUpdateIsActiveChatResponse>) => {
          state.chats = action.payload.chats;
        }
      )
      .addCase(addChat.fulfilled, (state, action: PayloadAction<IChat>) => {
        state.chats = [...state.chats, action.payload];
      })
      .addCase(addMessage.fulfilled, (state, action: PayloadAction<IChat>) => {
        state.chats = state.chats.map((chat) => {
          if (chat._id !== action.payload._id) {
            return chat;
          }
          return action.payload;
        });
      })
      .addCase(
        deleteChat.fulfilled,
        (state, action: PayloadAction<IDeleteChatResponse>) => {
          state.chats = action.payload.chats;
        }
      )
      .addCase(editChat.fulfilled, (state, action: PayloadAction<IChat>) => {
        state.chats = state.chats.map((chat) => {
          if (chat._id !== action.payload._id) {
            return chat;
          }
          return action.payload;
        });
      }),
});

export const authReducer = authSlice.reducer;
export const { addRandomQuote } = authSlice.actions;
